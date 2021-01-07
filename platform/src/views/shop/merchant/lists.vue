<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
				<router-link to="/shop/merchant/add">
					<a-button class="mr10" type="primary" icon="plus">添加店铺</a-button>
				</router-link>
				<a-button type="primary" @click="exportTable" icon="download" >导出</a-button>
			</div>
		  <div>
			<a-input-search enterButton placeholder="请输入店铺ID" style="width: 22rem;" @search="onIdSearch" />
		    <a-input-search class="ml10" enterButton placeholder="请输入店铺名称搜索" style="width: 22rem;" @search="onSearch" />
		  </div>
		</div>
		<template v-if="listField&&listField.length>0">
			<a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
				<a-table  :columns="item.account.field" :dataSource="item.account.data"
					slot="expandedRowRender" slot-scope="item,index,text" :pagination="false">
				</a-table>
				<div slot="action" slot-scope="text,item">
					店铺状态
					<a-switch class="mr10" checkedChildren="开" unCheckedChildren="关" :defaultChecked="item.is_open ? true : false "
					 :key="item.id" @change="act(item)" />
					 <a @click="edit(item)"  class="mr10">编辑</a>
         <div class="mt10">
           <a @click="setRate(item)">设置店铺扣点</a>
         </div>
          <div class="mt10">
            <a @click="setManage_fee(item)">设置店铺管理费</a>
          </div>
          <div class="mt10">
            <a @click="setIntegral(item)">设置店铺积分功能</a>
          </div>
					<!-- <a @click="del(item)" class="mr10 col-red">删除店铺</a> -->
				</div>
			</a-table>

		<div class="pageBox">
		  <a-pagination
		    :total="pages.total"
		    :showTotal="total => `共 ${total} 条数据`"
		    :pageSize="formItem.per_page"
		    :defaultCurrent="formItem.page"
		    @change="pageChange"
		  />
		</div>
		</template>
	  <a-modal title="店铺扣点编辑" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item label="店铺名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shopName}}
        </a-form-item>
        <a-form-item label="店铺扣点" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="params.shopRate" placeholder="请输入店铺扣点" type="number" :min="0" :max="100"/>
          <p class="col-666 mt10">*请输入0~100之间的值</p>
        </a-form-item>
      </a-form>
		</a-modal>
    <a-modal title="店铺管理费编辑" v-model="visible2" @ok="handleOk2">
      <a-form>
        <a-form-item label="店铺名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shopName}}
        </a-form-item>
        <a-form-item label="店铺管理费" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input style="width:150px;" v-model="manage_fee.manage_fee" placeholder="请输入店铺管理费" type="number" :min="0" /> 元
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal title="店铺积分功能" v-model="integralShow" @ok="integralOK">
      <a-form>
        <a-form-item label="店铺名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shopName}}
        </a-form-item>
        <a-form-item label="积分开启" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-switch checkedChildren="开" unCheckedChildren="关" :checked="open_point_deduction" @change="changePointDeduction"/>
        </a-form-item>
        <a-form-item label="" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }">
          <div class="wrapper-content">
            <p> 开启积分功能：</p>
            <p>1. 支持在该店铺下单确认收货增积分（品牌可按店铺业务需求配置增积分比例）</p>
            <p>2.支持在该店铺下单使用积分抵扣功能（根据品牌统一设置的积分抵扣规则）</p>
            <p>关闭积分功能：</p>
            <p>1.该店铺无法使用增积分和积分抵扣功能</p>
          </div>
        </a-form-item>
        <div v-if="open_point_deduction">
          <p class="tit-box">确认收货增积分比例设置</p>
          <a-form-item label="条件金额" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input style="width:150px;" v-model="point_params.user_obtain_point.fee" placeholder="请输入条件金额" type="number" :min="0" /> 元
          </a-form-item>
          <a-form-item label="获得积分" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
            <a-input style="width:150px;" v-model="point_params.user_obtain_point.point" placeholder="请输入获得积分" type="number" :min="0" />
          </a-form-item>
        </div>
      </a-form>
    </a-modal>
	<a-modal title="请按需选择导出的内容" v-model="dataVisible" okText="导出" @ok="dataHandleOk">
			<a-form layout="horizontal">
				<a-form-item label="店铺ID" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input  placeholder="请输入店铺ID" v-model="exportForm.id"/>
				</a-form-item>
				<a-form-item label="名称" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input  placeholder="请输入店铺名称" v-model="exportForm.keyword"/>
				</a-form-item>
			</a-form>
	</a-modal>
	</div>
</template>

<script>
	import {
		mapState,
		mapActions
	} from 'vuex';
	const action = {
		title: 'action',
		key: 'action',
		scopedSlots: {
			customRender: 'action'
		},
	}
	export default {
		name: 'lists',
		computed: {
			...mapState({
				listData: state => state.shop.lists,
				listField: state => state.shop.fields,
				pages: state => state.shop.pages,
				exportData: state => state.shop.exportData,
			}),

			// this.listMixData = this.listData
		},
		data() {
			return {
				visible: false,
        visible2:false,
        integralShow:false,
        keyword:'',
				shopName: '',
        formItem:{
				  page: 1,
          keyword: '',
          per_page: 15,
        },
        manage_fee:{
          id :'',
          manage_fee:''
        },
        params:{
				  id :'',
          shopRate:''
        },
        point_params: {
				  id: '',
          user_obtain_point: {
            fee: '',
            point: '',
          },
        },
		open_point_deduction: false,
		exportForm:{},
		dataVisible:false
			};
		},
		methods: {
			...mapActions({
				fetchLists: 'shop/fetchLists',
				delShop: 'shop/delShop',
				actShop: 'shop/actShop',
				editShop: 'shop/editShop',
				editPoint: 'shop/editPoint',
				exportFilter: 'shop/exportShopList',
      }),
      // 是否开启积分抵扣
      changePointDeduction(check) {
			  this.open_point_deduction = check;
      },
      integralOK() {
        this.point_params.open_point_deduction = this.open_point_deduction ? 1 : 0;
        this.editPoint({ formItem: this.point_params, callback: this.getLists })
        this.integralShow = false;
      },
      setIntegral(item) {
			  this.shopName = item.shop_name
        this.point_params = {
			    id: item.id,
          user_obtain_point: {
            fee: item.user_obtain_point.fee,
            point: item.user_obtain_point.point,
          },
        }
        if (item.open_point_deduction === 1) {
          this.open_point_deduction = true;
        } else {
          this.open_point_deduction = false;
        }
        this.integralShow = true;
      },
      handleOk2(){
        this.editShop({formItem:this.manage_fee,callback:this.getLists})
        this.visible2 = false
      },
			//搜索
			onSearch(value) {
			  	this.keyword = value;
				this.formItem.page = 1
				this.formItem.keyword = value
				this.getLists()
			},
			onIdSearch(value){
				this.formItem.page = 1
				this.formItem.id = value
				this.getLists()
			},
			pageChange(page) {
        		this.formItem.page = page
			  	this.getLists()
			},
      setRate(item){
      	this.params.shop_name = item.shop_name
      	this.params.seller_name = item.seller_name
      	this.params.shop_type = item.shop_type
      	this.params.store_code = item.store_code
      	this.params.erp_storeCode = item.erp_storeCode?item.erp_storeCode:0;
      	this.params.erp_posCode = item.erp_posCode?item.erp_posCode:0;
	  	this.shopName = item.shop_name
	  	this.params.id = item.id
	  	this.params.shopRate = item.shopRate
        this.visible = true
      },
      setManage_fee(item){
      	this.manage_fee.shop_name = item.shop_name
      	this.manage_fee.seller_name = item.seller_name
      	this.manage_fee.shop_type = item.shop_type
      	this.manage_fee.store_code = item.store_code
      	this.manage_fee.erp_storeCode = item.erp_storeCode?item.erp_storeCode:0;
      	this.manage_fee.erp_posCode = item.erp_posCode?item.erp_posCode:0;
        this.shopName = item.shop_name
        this.manage_fee.id = item.id
        this.manage_fee.manage_fee = item.manage_fee
        this.visible2 = true
      },
      getLists(){
			  const params = this.formItem
        this.fetchLists(params);
      },
			//编辑
			edit(item) {
				const goLink = `/shop/merchant/edit/${item.id}`;
				this.$router.push({
					path: goLink,
				});
			},
			act(item) {
				let statusBool = ''
				if (item.is_open) {
					statusBool = "close"
					item.is_open = false
					item.shop_state = "关闭"
				} else if (!item.is_open) {
					statusBool = "open"
					item.is_open = true
					item.shop_state = "开启"
				}
				const params = {
					id: item.id,
					status: statusBool,
				};
				this.actShop({params});
			},
			del(item) {
				if (confirm('确认删除店铺？')) {
					this.delShop({
						id: item.id,
					});
					setTimeout(()=>{
						this.getLists()
					},500)
				}
			},
			handleOk() {
			  	this.editShop({formItem:this.params,callback:this.getLists})
        		this.visible = false
			},
			exportTable(){
				this.dataVisible=true
				this.exportForm={}

			},
			dataHandleOk(){
				this.exportFilter(this.exportForm) // 请求数据
			},
			orderCallback() {
				this.dataVisible=false
				this.exportPathMethod(this.exportData)
				},
				formatJson(filterVal, jsonData) {
				return jsonData.map(v => filterVal.map(j => v[j]));
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
						filename: "品牌端店铺列表", //非必填
						autoWidth: true, //非必填
						bookType: "xlsx" //非必填
						});
					});
				},
		},
		mounted() {
		this.getLists()
		},
		 watch:{
			exportData(){
			  this.orderCallback()
			},
		}
	};
</script>
<style scoped lang="stylus">
.list-nav
  display flex
  justify-content space-between
  flex-wrap wrap
.wrapper-content
  padding-left 6%
  line-height 28px
.tit-box
  color rgba(0, 0, 0, 0.85)
  font-size 14px
  margin-left 6%
  border-top 1px solid #e8e8e8
  padding 15px 0
</style>
