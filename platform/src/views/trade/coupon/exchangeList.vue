<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
		    <a-button class="mr10" icon="download" type="primary" @click="selectBtn">导出勾选的数据</a-button>
		    <a-button class="mr10" type="primary" @click="excelModelShow">高级导出</a-button>
		  </div>
		</div>
    <searchItem class="mb20" @on-search="getSearch" :searchType='2'></searchItem>
		<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
		<template v-if="listField&&listField.length>0">
			<a-tabs @tabClick="onGetData" :defaultActiveKey="getListsItem.scenes">
				<a-tab-pane v-for="(item) in tabLists" :tab="item.tab" :key="item.key">
					<a-table :scroll="{x:1800}" :rowKey="record => record.id" :rowSelection="{onChange: onChange}" :columns="listField" :dataSource="listData" :loading="loadingState" :pagination="false">
            <a slot="voucher" target="_blank" :href="text" slot-scope="text">
              <img style="height:50px" :src="text" alt="">
            </a>
					</a-table>
					<div class="pageBox">
						<a-pagination
							:total="pages.total"
							:showTotal="total => `共 ${total} 条数据`"
							:pageSize="getListsItem.per_page"
							:defaultCurrent="1"
							@change="pageChange" />
					</div>
				</a-tab-pane>
			</a-tabs>
		</template>
		<a-modal title="请按需选择导出的内容" :confirmLoading="exportLoading" v-model="dataVisible" okText="导出" @ok="dataHandleOk" @cancel="dataCancel">
			<a-form layout="horizontal">
        <a-form-item label="券场景:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
          <a-select v-model="exportForm.scenes" placeholder="请选择券场景" allowClear>
            <a-select-option value="1">线上</a-select-option>
            <a-select-option value="2">线下</a-select-option>
            <a-select-option value="3">全渠道</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="是否手动推送:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
          <a-select v-model="exportForm.is_hand_push" placeholder="请选择领取状态" allowClear>
            <a-select-option value="0">否</a-select-option>
            <a-select-option value="1">是</a-select-option>
          </a-select>
        </a-form-item>
				<a-form-item label="使用状态:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select v-model="exportForm.status" placeholder="请选择使用状态" allowClear>
						<a-select-option value="1">未使用</a-select-option>
						<a-select-option value="2">已使用</a-select-option>
            <a-select-option value="3">已过期</a-select-option>
          </a-select>
				</a-form-item>
				<a-form-item label="筛选时间:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select @change="timeType" v-model="timeItem.type" placeholder="请选择时间类型" allowClear>
						<a-select-option value="created_time">领取时间</a-select-option>
						<a-select-option value="used_at_time">核销时间</a-select-option>
					</a-select>
					<div class="timeHide" v-if="timeHide">
						<a-range-picker showTime  @change="timeSelect" />
						<h4 style="line-height: 1.2em;"><a-icon style="color: red;margin-right: 5px;" type="exclamation-circle" />开始时间和结束时间必填,否则导出数据为空</h4>
					</div>
				</a-form-item>
			</a-form>
		</a-modal>
		<!-- <a-drawer
      title="高级导出"
      placement="right"
      @close="dataCancel"
      :visible="dataVisible"
    >
			<a-button class="mb10 mr10" icon="download" type="primary" @click="allCurrent">导出当前页所有数据</a-button>
    </a-drawer> -->
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import searchItem from '../../promotion/coupon/components/search';

const tabLists = [
  { tab: '全部', key: '' },
  { tab: '线上', key: 1 },
	{ tab: '线下', key: 2 },
  { tab: '全渠道', key: 3 },
];

export default {
	name: 'lists',
  components:{
    searchItem
  },
	computed: {
		...mapState({
			listData: state => state.coupon.exchangeData,
			listField: state => state.coupon.exchangeField,
			pages: state => state.coupon.exchangePages,
			exportData: state => state.coupon.exportData,
			total_data:state => state.coupon.total_fee_data,
		})
	},
	data() {
		return {
			tabLists,
			selectVal: 'order',		//筛选搜索
			searchVal: '',
			selectLists: [],
			loadingState: false, //列表加载状态
			exportLoading: false,//导出加载状态
			dataVisible: false,	//导出弹窗状态
			timeHide: false,		//导出时间hide
			timeItem: {},
			exportForm: {},
      searchOptions:{},
      getListsItem: {
        scenes: '',
        page: 1,
        per_page: 15,
      },
		};
	},
  methods: {
    ...mapActions({
      fetchLists: 'coupon/fetchExchangeLists',
      exportFilter: 'coupon/exportFilter',
    }),
    getSearch(item){
      this.searchOptions = item;
      this.getListsItem.page = 1;
      this.getLists();
    },
    getLists() {
      let obj1 = this.getListsItem
      let obj2 = this.searchOptions
      const obj = Object.assign(obj2, obj1)
      this.fetchLists(obj)
      setTimeout(() => {
        this.loadingState = false;
      }, 1000);
    },
		// 日期类型
		timeType(value) {
			if (value == undefined) {
				this.timeHide = false;
				this.timeItem = {};
				delete(this.exportForm['created_start']);
        delete(this.exportForm['created_end']);
        delete(this.exportForm['used_at_start']);
        delete(this.exportForm['used_at_end']);
      } else {
				this.timeHide = true;
				this.timeItem.type = value;
			}
		},
		// 日期选择
		timeSelect(date, dateString){
			this.timeItem.from = dateString[0]
			this.timeItem.to = dateString[1]
      if (this.timeItem.type === 'created_time') {
        this.exportForm.created_start = dateString[0];
        this.exportForm.created_end = dateString[1];
      } else if (this.timeItem.type === 'used_at_time') {
        this.exportForm.used_at_start = dateString[0];
        this.exportForm.used_at_end = dateString[1];
      }
		},
		dataHandleOk() {
			let that = this
			// if(this.exportForm.mobile == '' ) delete(this.exportForm['mobile'])
			if(Object.keys(this.exportForm).length == 0 ){
				this.$warning({
				  title: '温馨提示！',
				  content: '需选择导出条件才可导出数据',
				});
			} else {
				this.exportLoading = true
        this.exportFilter({ exportForm: this.exportForm}) // 请求数据
      }
		},
    orderCallback() {
      this.exportLoading = false;
      this.dataVisible = false;
      this.exportPathMethod(this.exportData);
      this.exportForm = {};
      this.timeItem = {};
      this.timeHide = false;
    },
		allCurrent(){
			this.export2Excel(this.listData)
		},
		selectBtn(){
			if(this.selectLists.length == 0){
				this.$warning({
				  title: '温馨提示！',
				  content: '请勾选需要导出的数据',
				});
			}else{
				let field = [] //标题
				let filter = [] //内容过滤
				this.listField.forEach(function(item,i){
					field.push(item.title)
					filter.push(item.dataIndex)
				})
				field.splice(field.length-1, 1)
				filter.splice(filter.length-1, 1)
				this.export2Excel(field, filter, this.OneDimensionalArray(this.selectLists, true))
				this.$success({
					title: '温馨提示！',
					content: '数据正在导出,请稍后查看下载目录！',
				});
			}
			this.dataVisible = false;
		},
		formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		},
		export2Excel(tHeaders, filterVals, lists) {
				const tHeader = tHeaders;
				const filterVal = filterVals;
				const list = lists;
				const data = this.formatJson(filterVal, list);
				import("@/vendor/Export2Excel").then(excel => {
					excel.export_json_to_excel({
					header: tHeaders, //表头 必填
					data, //具体数据 必填
					filename: "优惠券使用列表", //非必填
					autoWidth: true, //非必填
					bookType: "xlsx" //非必填
					});
				});
			this.dataVisible = false;
		},
    exportPathMethod(TableData) {
		this.$success({
			title: '温馨提示！',
			content: '数据正在导出,请稍后查看下载目录！',
		});
		const tHeader = TableData.trade.tHeader;
		const filterVal = TableData.trade.filterVal;
		const list = TableData.trade.list;
		const data = this.formatJson(filterVal, list);
		import("@/vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
			header: tHeader, //表头 必填
			data, //具体数据 必填
			filename: "优惠券使用列表", //非必填
			autoWidth: true, //非必填
			bookType: "xlsx" //非必填
			});
		});
    },
		excelModelShow() {
			this.dataVisible = true;
		},
		dataCancel(){
			this.dataVisible = false
		},
		onChange(selectedRowKeys, selectedRows){
      let scenes = this.getListsItem.scenes;
      if (!this.selectLists[scenes ? scenes : 0]) {
        this.selectLists[scenes ? scenes : 0] = [];
      }
      this.selectLists[scenes ? scenes : 0][this.getListsItem.page - 1] = selectedRows;
		},
		goDetails(item) {
			const jumpUrl = `/trade/detail/${item.tid}`;
			let routeData = this.$router.resolve({ path: jumpUrl });
			window.open(routeData.href, '_blank');
			// this.$router.push({ path: jumpUrl });
		},
		pageChange(page) {
      this.getListsItem.page = page;
      this.getLists()
		},
		// 搜索
		orderSearch(value) {
			this.searchVal = value
			if(this.selectVal == 'order') {
				this.fetchLists({
					tid: value,
					page: 1,
          per_page: this.getListsItem.per_page,
        });
			} else {
				this.fetchLists({
					receiver_name: value,
					page: 1,
          per_page: this.getListsItem.per_page,
        });
			}
		},
		onGetData(key) {
      this.getListsItem.scenes = key;
      this.getListsItem.page = 1;
      this.getLists();
		},
	},
	mounted() {
		this.getLists()
	},
  watch:{
    exportData(){
      this.orderCallback()
    }
  }
};
</script>

<style scoped lang="stylus">
	.list-nav
	  display flex
	  justify-content space-between
	  flex-wrap wrap
	.total
		text-align right
		.span
			margin-right 20px
			font-size 14px
			.text
				font-weight 600
				color #4c4949
</style>
