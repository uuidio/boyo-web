<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
<!-- 				<router-link to="/shop/merchant/add">
					<a-button class="mr10" type="primary" icon="plus">添加店铺</a-button>
				</router-link> -->
				<a-button type="primary" @click="exportTable" icon="download" >导出</a-button>
			</div>
		  <div>
		    <a-input-search enterButton placeholder="请输入店铺名称搜索" style="width: 22rem;" @search="onSearch" />
		  </div>
		</div>
		<template v-if="listField&&listField.length>0">
			<a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
				<a-table  :columns="item.account.field" :dataSource="item.account.data"
					slot="expandedRowRender" slot-scope="item,index,text" :pagination="false">
				</a-table>
				<div slot="action" slot-scope="text,item">
          <div>
            店铺分销
            <a-switch checkedChildren="开" unCheckedChildren="关" :defaultChecked="item.promo_person==1 ? true : false "
                      :key="item.id" @change="promoChange(item)" />
          </div>
          <!--					店铺状态-->
<!--					<a-switch class="mr10" checkedChildren="开" unCheckedChildren="关" :defaultChecked="item.is_open ? true : false "-->
<!--					 :key="item.id" @change="act(item)" />-->
<!--					 <a @click="edit(item)"  class="mr10">编辑</a>-->
<!--         <div class="mt10">-->
<!--           <a @click="setRate(item)">设置店铺扣点</a>-->
<!--         </div>-->
<!--          <div class="mt10">-->
<!--            <a @click="setManage_fee(item)">设置店铺管理费</a>-->
<!--          </div>-->
<!--          <div class="mt10">-->
<!--            <a @click="setIntegral(item)">设置店铺积分比例</a>-->
<!--          </div>-->
					<!-- <a @click="del(item)" class="mr10 col-red">删除店铺</a> -->
				</div>
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
    <a-modal title="店铺积分比例编辑" v-model="integralShow" @ok="integralOK">
      <a-form>
        <a-form-item label="店铺名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shopName}}
        </a-form-item>
        <a-form-item label="条件金额" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input style="width:150px;" v-model="point_params.user_obtain_point.fee" placeholder="请输入条件金额" type="number" :min="0" /> 元
        </a-form-item>
        <a-form-item label="获得积分" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input style="width:150px;" v-model="point_params.user_obtain_point.point" placeholder="请输入获得积分" type="number" :min="0" />
        </a-form-item>
      </a-form>
    </a-modal>
	<a-modal title="请按需选择导出的内容" v-model="dataVisible" okText="导出" @ok="dataHandleOk">
			<a-form layout="horizontal">
				<!-- <a-form-item label="店铺ID" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
					<a-input  placeholder="请输入店铺ID" v-model="exportForm.id"/>
				</a-form-item> -->
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
				  page:1,
          keyword:''
        },
        manage_fee:{
          id :'',
          manage_fee:''
        },
        params:{
				  id :'',
          shopRate:''
        },
        point_params:{
				  id:'',
          user_obtain_point:{
            fee:'',
            point:''
          }
		},
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
		promoShop: 'shop/promoShop',
		exportFilter: 'shop/exportShopList',
      }),
      promoChange(item){
        item.promo_person = item.promo_person > 0 ? 0 : 1;
        console.log(item)
        const formItem = {
          shop_id: item.id,
          promo_person: item.promo_person
        }
        this.promoShop({formItem})
      },

      integralOK(){
        this.editShop({formItem:this.point_params,callback:this.getLists})
        this.integralShow = false
      },
      setIntegral(item){
			  this.shopName = item.shop_name
        console.log(item)
        this.point_params = {
			    id:item.id,
          user_obtain_point:{
            fee:item.user_obtain_point.fee,
            point:item.user_obtain_point.point,
          }
        }
        this.integralShow = true
      },
      handleOk2(){
        this.editShop({formItem:this.manage_fee,callback:this.getLists})
        this.visible2 = false
      },
			//搜索
			onSearch(value) {
			  this.keyword = value;
			  // this.current = 1;
        this.formItem.page = 1
        this.formItem.keyword = value
        this.getLists()
			},
			pageChange(page) {
        this.formItem.page = page
			  this.getLists()
			},
      setRate(item){
			  this.shopName = item.shop_name
			  this.params.id = item.id
			  this.params.shopRate = item.shopRate
        this.visible = true
      },
      setManage_fee(item){
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
				//this.exportFilter({ exportForm: this.exportForm} ) // 请求数据
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
						filename: "平台端店铺列表", //非必填
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
</style>
