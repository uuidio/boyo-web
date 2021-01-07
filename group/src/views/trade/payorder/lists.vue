<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
		    <!-- <a-button class="mr10" icon="download" type="primary" @click="selectBtn">导出勾选的数据</a-button> -->
		    <a-button class="mr10" type="primary" @click="excelModelShow">高级导出</a-button>
		  </div>
		</div>
    <searchItem class="mb20" @on-search="getSearch"></searchItem>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
		<div v-if="listField&& listField.length>0">
					<a-table :scroll="{ x: 1800,y:700 }"  :rowKey="record => record.id"  :columns="listField" :dataSource="listData" :loading="loadingState" :pagination="false">
						<!-- <div slot="action" slot-scope="text, record">
							<a class="mr10" @click="goDetails(record)">订单详情</a>
							<a style="color:red" @click="modelShow(record)" v-if="(record.trade_cancel == 'null' && record.status_text == '待发货') || record.status_text == '待付款'">取消订单</a>
						</div> -->
						<!-- <a-table :scroll="{ x: 1100,y:700 }" :columns="order_item.trade_order.field" :dataSource="order_item.trade_order.data"
								slot="expandedRowRender" slot-scope="order_item" :pagination="false">
						<a slot="goods_image" target="_blank" slot-scope="text" :href="text">
							<img height="50px" :src="text" alt="">
						</a>
						</a-table> -->
					</a-table>
					<div class="pageBox">
					<a-pagination
						:total="pages.total"
						:showTotal="total => `共 ${total} 条数据`"
						:pageSize="pages.per_page"
						:defaultCurrent="1"
						@change="pageChange"
					/>
					</div>
		</div>
		<a-modal title="请按需选择导出的内容" :confirmLoading="exportLoading" v-model="dataVisible" okText="导出" @ok="dataHandleOk" @cancel="dataCancel">
			<a-form layout="horizontal">
				<a-form-item label="项目选择:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-select v-model="exportForm.gm_id" placeholder="请选择项目"  >
						<a-select-option v-for="(item,index) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
					</a-select>
				</a-form-item>
				<a-form-item
				label="店铺名称:"
				:label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }"
        		>
				<a-select v-model="exportForm.shop_id" placeholder="请选择店铺"  >
					<a-select-option v-for="(item,index) in shoplist" :value="item.id" :key="index">{{item.shop_name}}</a-select-option>
				</a-select>
        		</a-form-item>
				<a-form-item label="商户订单号:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input v-model="exportForm.payment_id" placeholder="支付单号" />
				</a-form-item>
				<a-form-item label="订单号:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input v-model="exportForm.tid" placeholder="订单号" />
				</a-form-item>
				<a-form-item
					label="支付时间"
					:label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }"
				>
					<a-range-picker
						:show-time="{ format: 'HH:mm' }"
						format="YYYY-MM-DD HH:mm"
						:placeholder="['开始时间', '结束时间']"
						@change="timeChange"
						@ok="timeOk"
						v-if="timeVisible"
						/>
				</a-form-item>
			</a-form>
		</a-modal>
	</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import searchItem from './component/search'

export default {
	name: 'lists',
  components:{
    searchItem
  },
	computed: {
		...mapState({
			listData: state => state.trade.payorderData,
			listField: state => state.trade.payorderFields,
			pages: state => state.trade.payorderPages,
			exportData: state => state.trade.exportData,
			gmlistData: state => state.project.lists,
			shoplist: state => state.shop.lists,
			total_data:state => state.trade.total_fee_data,
		})
	},
	data() {
		return {
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
			searchOptions:{
				payment_id:'',
				tid:'',
				created_start:'',
				created_end:''
			},
			getListsItem:{
				page:1
			},
			timeVisible:true
		};
	},
	methods: {
		...mapActions({
			fetchLists: 'trade/payorderLists',
			cancelOrder: 'trade/cancelOrder',
			exportFilter: 'trade/payorderExcel',
			paymentAccountDown: 'trade/paymentAccountDown'
		}),
		getLists(){
			let obj1 = this.getListsItem
			let obj2 = this.searchOptions
			const obj = Object.assign(obj2,obj1)
			this.fetchLists(obj)
		},
		 timeChange(value, dateString) {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
			this.exportForm.payed_time_start = dateString[0];
			this.exportForm.payed_time_end = dateString[1];
		},
		timeOk(value) {
		console.log('onOk: ', value);
		},
		dataHandleOk(){
			let that = this
			if(Object.keys(this.exportForm).length == 0 ){
				this.$warning({
				  title: '温馨提示！',
				  content: '需选择导出条件才可导出数据',
				});
			} else {
				this.exportLoading = true
       //this.exportFilter({ exportForm: this.exportForm} ) // 请求数据
		this.paymentAccountDown({ exportForm: this.exportForm,callback:this.excelBack});
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
				this.export2Excel(field, filter, this.selectLists)
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
					filename: "平台端支付订单列表", //非必填
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
			filename: "平台端支付订单列表", //非必填
			autoWidth: true, //非必填
			bookType: "xlsx" //非必填
			});
		});
    },
		excelModelShow() {
			this.dataVisible = true;
			this.exportForm={}
			 this.timeVisible=false
			this.$nextTick(()=>{
				this.timeVisible=true
			})
		},
		dataCancel(){
			this.dataVisible = false
		},
		onChange(selectedRowKeys, selectedRows){
			this.selectLists = selectedRows
      console.log(selectedRows)
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
		},
		cancel() {
			this.formItem.cancel_reason = '';
		},
		pageChange(page) {
		this.getListsItem.page = page;
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
		margin-bottom 10px
		.span
			margin-right 20px
			font-size 14px
			.text
				font-weight 600
				color #4c4949
</style>
