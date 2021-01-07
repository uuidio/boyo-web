<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
		    <a-button class="mr10" icon="download" type="primary" @click="selectBtn">导出勾选的数据</a-button>
		    <a-button class="mr10" type="primary" @click="excelModelShow">高级导出</a-button>
		  </div>
		  <!--<div>-->
				<!--<a-select defaultValue="order" v-model="selectVal" style="width: 150px">-->
				  <!--<a-select-option value="order">订单号搜索</a-select-option>-->
				  <!--<a-select-option value="name">收货人姓名搜索</a-select-option>-->
				<!--</a-select>-->
				<!--<a-input-search enterButton style="width: 16rem;" :placeholder="selectVal=='order'? '请输入订单号搜素' : '请输入收货人姓名搜素'" @search="orderSearch" />&lt;!&ndash; nameSearch &ndash;&gt;-->
		  <!--</div>-->
		</div>
    <searchItem class="mb20" @on-search="getSearch"></searchItem>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
		<div v-if="listField&& listField.length>0">
			<a-tabs @tabClick="onGetData" :defaultActiveKey="trim">
				<a-tab-pane v-for="(item, index) in tabLists" :tab="item.tab" :key="item.key">
					<a-table :scroll="{ x: 3000,y:700 }"  :rowKey="record => record.id" :rowSelection="{onChange: onChange}" :columns="listField" :dataSource="listData" :loading="loadingState" :pagination="false">
						<div slot="action" slot-scope="text, record">
							<a class="mr10" @click="goDetails(record)">订单详情</a>
							<a style="color:red" @click="modelShow(record)" v-if="(record.trade_cancel == 'null' && record.status_text == '待发货') || record.status_text == '待付款'">取消订单</a>
						</div>
            <a-table  :columns="order_item.trade_order.field" :dataSource="order_item.trade_order.data"
                     slot="expandedRowRender" slot-scope="order_item" :pagination="false">
              <a slot="goods_image" target="_blank" slot-scope="text" :href="text">
                <img height="50px" :src="text" alt="">
              </a>
            </a-table>
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
		</div>
		<a-modal title="取消订单" v-model="visible" @ok="handleOk" @cancel="cancel">
			<div class="mb10">订单号：{{ formItem.tid }}</div>
			<div>
				订单取消原因：
				<a-textarea v-model="formItem.cancel_reason" placeholder="请输入订单取消原因" class="mt10" :rows="4" />
			</div>
		</a-modal>
		<a-modal title="请按需选择导出的内容" :confirmLoading="exportLoading" v-model="dataVisible" okText="导出" @ok="dataHandleOk" @cancel="dataCancel">
			<a-form layout="horizontal">
				<a-form-item label="订单状态:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select v-model="exportForm.status" placeholder="请选择订单状态" allowClear>
						<a-select-option value="WAIT_BUYER_PAY">待付款</a-select-option>
						<a-select-option value="WAIT_SELLER_SEND_GOODS">待发货</a-select-option>
						<a-select-option value="WAIT_BUYER_CONFIRM_GOODS">待收货</a-select-option>
						<a-select-option value="TRADE_FINISHED">已完成</a-select-option>
						<a-select-option value="TRADE_CLOSED">已关闭</a-select-option>
						<a-select-option value="TRADE_CLOSED_BY_SYSTEM">系统关闭</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="店铺名称:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input v-model="exportForm.shop_name" placeholder="请输入店铺名称" />
				</a-form-item>
				<a-form-item label="手机号:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input v-model="exportForm.mobile" placeholder="请输入手机号" />
				</a-form-item>
				<!-- <a-form-item label="取消订单状态:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select @change="unOrderStatus" placeholder="请选择取消订单状态" allowClear>
						<a-select-option value="NO_APPLY_CANCEL">无取消</a-select-option>
						<a-select-option value="WAIT_PROCESS">等待审核</a-select-option>
						<a-select-option value="REFUND_PROCESS">正在退款</a-select-option>
						<a-select-option value="SUCCESS">成功</a-select-option>
						<a-select-option value="FAILS">失败</a-select-option>
					</a-select>
				</a-form-item> -->
				<a-form-item label="提货方式:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select v-model="exportForm.pick_type" placeholder="请选择提货方式" allowClear>
						<a-select-option value="0">快递</a-select-option>
						<a-select-option value="1">自提</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item label="筛选时间:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select @change="timeType" v-model="timeItem.type" placeholder="请选择时间类型" allowClear>
						<a-select-option value="pay_time">支付时间</a-select-option>
						<a-select-option value="end_time">完成时间</a-select-option>
						<a-select-option value="created_at">生成时间</a-select-option>
					</a-select>
					<div class="timeHide" v-if="timeHide">
						<a-range-picker showTime  format="YYYY/MM/DD HH:mm:ss" @change="timeSelect" />
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
import searchItem from './components/search'
const tabLists = [
	{ tab: '全部', key: '' },
	{ tab: '待付款', key: 1 },
	{ tab: '待发货', key: 2 },
	{ tab: '待收货', key: 3 },
	{ tab: '已完成', key: 4 },
  { tab: '已关闭', key: 5 },
  // { tab: '系统关闭', key: 6 },
];

export default {
	name: 'lists',
  components:{
    searchItem
  },
	computed: {
		...mapState({
			listData: state => state.trade.lists,
			listField: state => state.trade.fields,
			pages: state => state.trade.pages,
			exportData: state => state.trade.exportData,
			total_data:state => state.trade.total_fee_data,
		})
	},
	data() {
		return {
			tabLists,
      trim:'',
			selectVal: 'order',		//筛选搜索
			searchVal: '',
			selectLists: [],
			loadingState: false, //列表加载状态
			exportLoading: false,//导出加载状态
			dataVisible: false,	//导出弹窗状态
			timeHide: false,		//导出时间hide
			visible: false,
			formItem: {
				tid: '',
				cancel_reason: ''
			},
			timeItem: {},
			exportForm: {},
      searchOptions: {},
      getListsItem: {
        status: '',
        page: 1,
        per_page: 15,
      },
		};
	},
	methods: {
		...mapActions({
			fetchLists: 'trade/fetchLists',
			cancelOrder: 'trade/cancelOrder',
			exportFilter: 'trade/exportFilter',
			orderAccountDown: 'trade/orderAccountDown',
		}),
    getLists(){
      let obj1 = this.getListsItem
      let obj2 = this.searchOptions
      const obj = Object.assign(obj2,obj1)
      this.fetchLists(obj)
      setTimeout(() => {
        this.loadingState = false;
      }, 1000);
    },
		//日期类型
		timeType(value){
			if(value == undefined){
				this.timeHide = false
				this.timeItem = {}
				delete(this.exportForm['time'])
			} else {
				this.timeHide = true
				this.timeItem.type = value
				this.timeItem.from = ''
				this.timeItem.to = ''
				this.exportForm.time = this.timeItem
			}
		},
		//日期选择
		timeSelect(date, dateString){
			this.timeItem.from = dateString[0]
			this.timeItem.to = dateString[1]
			this.exportForm.time = this.timeItem
		},
		dataHandleOk(){
			let that = this
			if(this.exportForm.mobile == '' ) delete(this.exportForm['mobile'])
			if(Object.keys(this.exportForm).length == 0 ){
				this.$warning({
				  title: '温馨提示！',
				  content: '需选择导出条件才可导出数据',
				});
			} else {
				this.exportLoading = true
				//this.exportFilter({ exportForm: this.exportForm} ) // 请求数据
				this.orderAccountDown({ exportForm: this.exportForm,callback:this.excelBack});
				setTimeout(()=>{
				this.exportLoading=false
				},3000)
      	}
		},
		excelBack(){
			const _this = this;
			setTimeout(() => {
				_this.exportLoading = false;
				_this.dataVisible = false;
				const jumpUrl = '/statistics/downLoadList';
				const routeData = _this.$router.resolve({ path: jumpUrl });
				window.open(routeData.href, '_blank');
			}, 1000);
			//this.$router.push({path:'/statistics/downLoadList'});
		},
    orderCallback() {
      this.exportLoading = false
      this.dataVisible = false
      // this.orderStatusBool = false
      this.exportPathMethod(this.exportData)
      this.exportForm = {}
      this.timeItem = {}
      this.timeHide = false
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
					filename: "品牌订单管理列表", //非必填
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
		const tHeader = TableData.order.tHeader;
		const filterVal = TableData.order.filterVal;
		const list = TableData.order.list;
		const data = this.formatJson(filterVal, list);
		import("@/vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
			header: tHeader, //表头 必填
			data, //具体数据 必填
			filename: "品牌订单管理列表", //非必填
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
		  let status = this.getListsItem.status;
		  if (!this.selectLists[status ? status : 0]) {
        this.selectLists[status ? status : 0] = [];
      }
      this.selectLists[status ? status : 0][this.getListsItem.page - 1] = selectedRows;
		},
		goDetails(item) {
			const jumpUrl = `/trade/detail/${item.tid}`;
			let routeData = this.$router.resolve({ path: jumpUrl });
			window.open(routeData.href, '_blank');
			// this.$router.push({ path: jumpUrl });
		},
		handleOk() {
			this.cancelOrder({
				formItem: this.formItem
			});
		},
		modelShow(item) {
			this.formItem.tid = item.tid;
			this.visible = true;
		},
		cancel() {
			this.formItem.cancel_reason = '';
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
      this.getListsItem.status = key;
      this.getListsItem.page = 1
      this.getLists()
		},
    getSearch(item){
      this.searchOptions = item
      this.getListsItem.page = 1
      this.getLists()
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
