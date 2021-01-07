<template>
	<div class="content">
		<div class="list-nav">
		  <div class="mb10">
				<router-link to="/project/platform/add/-1">
					<a-button class="mr10" type="primary" icon="plus">添加平台</a-button>
				</router-link>
			</div>
		  <div>
		    <!-- <a-input-search enterButton placeholder="请输入店铺名称搜索" style="width: 22rem;" @search="onSearch" /> -->
		  </div>
		</div>
		<template v-if="listField&&listField.length>0">
			<a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
				<!-- <a-table :scroll="{ x: 1100,y:700 }" :columns="item.account.field" :dataSource="item.account.data"
					slot="expandedRowRender" slot-scope="item,index,text" :pagination="false">
				</a-table> -->
				<div slot="action" slot-scope="text, item">
					项目展示
					<a-switch class="mr10" checkedChildren="开" unCheckedChildren="关" :checked="item.status ? true : false"
					 :key="item.id" @change="act(item)" />
					 <a @click="edit(item)"  class="mr10">编辑</a>
		         <div class="mt10">
		           <a @click="setRate(item)">设置项目权重</a>
		         </div>
		          <!-- <div class="mt10"> -->
		            <!-- <a @click="setManage_fee(item)">设置店铺管理费</a> -->
		          <!-- </div> -->
		          <div class="mt10">
		            <a @click="setIntegral(item)">设置积分配置</a>
              </div>
          <div class="mt10">
            <a @click="setAllowLogin(item)">设置项目登录</a>
          </div>
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
		<a-modal title="项目权重设置" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item label="项目名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shopName}}
        </a-form-item>
        <a-form-item label="项目权重" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input v-model="params.listorder" placeholder="请输入项目权重" type="number" :min="0" :max="100"/>
          <p class="col-666 mt10">*请输入0~999之间的值</p>
          <p class="col-666 mt10">数值越大排在越前面</p>
        </a-form-item>
      </a-form>
		</a-modal>
		<a-modal title="项目积分配置" v-model="integralShow" @ok="integralOK">
	      <a-form>
	        <a-form-item label="项目名称" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
	          {{shopName}}
	        </a-form-item>
	        <a-form-item label="项目积分" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
	          <a-input style="width:150px;" v-model="point_params.use_obtain_point.use_point" placeholder="请输入消耗积分" type="number" :min="0" /> 元
	        </a-form-item>
	        <a-form-item label="平台牛币" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
	          <a-input style="width:150px;" v-model="point_params.use_obtain_point.obtain_point" placeholder="请输入获得牛币" type="number" :min="0" />
	        </a-form-item>
	        <a-form-item label="是否开启积分兑换" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
	          <a-switch checkedChildren="开" unCheckedChildren="关" v-model="point_params.open_point_exchange == 1 ? true : false" @change="changePointDeduction"/>
	        </a-form-item>
	      </a-form>
    </a-modal>
    <a-modal title="项目登录配置" v-model="showAllowLogin" @ok="allowLoginOK">
      <a-form>
        <a-form-item label="是否允许项目登录" :label-col="{ span: 7 }" :wrapper-col="{ span: 12 }">
          <a-switch v-model="allowLoginData.allow_login == 1 ? true : false" checkedChildren="开" unCheckedChildren="关" @change="changeAllowLogin"/>
        </a-form-item>
      </a-form>
    </a-modal>
	</div>
</template>

<script>
import fetch from '@/api/fetch';
import Server from '@/config/server';
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
				listData: state => state.project.lists,
				listField: state => state.project.fields,
				pages: state => state.project.pages,
			}),

			// this.listMixData = this.listData
		},
		data() {
			return {
        allowLoginData: {
          id: '',
          allow_login: '',
        },
        showAllowLogin: false,
				visible: false,
				visible2:false,
				integralShow:false,
				keyword:'',
						shopName: '',
				formItem:{
						page:1,
				},
				manage_fee:{
				id :'',
				manage_fee:''
				},
				params:{
						id :'',
				listorder:''
				},
				point_params:{
					open_point_exchange:0,
						id:'',
				use_obtain_point:{
					use_point:'',
					obtain_point:''
				}
				}
			};
		},
		methods: {
			...mapActions({
				fetchLists: 'project/fetchLists',
				// delShop: 'shop/delShop',
				actShop: 'project/actShop',
        editShop: 'project/editShop',
        updateOrder: 'project/updateOrder',
        settingAllowLogin: 'project/settingAllowLogin',
			}),
      integralOK(){
        this.editShop({formItem:this.point_params,callback:this.getLists})
        this.integralShow = false
      },
      setIntegral(item){
			  this.shopName = item.platform_name
        console.log(item)
        this.point_params = {
			    id:item.gm_id,
			    open_point_exchange:item.open_point_exchange,
          use_obtain_point:{
            use_point:item.use_obtain_point.use_point,
            obtain_point:item.use_obtain_point.obtain_point,
          }
        }
        this.integralShow = true
      },

      setAllowLogin(item){
        this.allowLoginData.id = item.gm_id;
        this.allowLoginData.allow_login = item.allow_login;
        this.showAllowLogin = true;
      },
      changeAllowLogin(check) {
        this.allowLoginData.allow_login = check ? 1 : 0;
      },
      allowLoginOK() {
			  // console.log(this.allowLoginData, 678)
        this.settingAllowLogin(this.allowLoginData)
        this.showAllowLogin = false;
      },
      // 是否开启积分抵扣
      changePointDeduction(check) {
		    this.point_params.open_point_exchange = check ? 1 : 0;
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
			  this.shopName = item.platform_name
			  this.params.id = item.gm_id
			  this.params.listorder = item.listorder
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
				const goLink = `/project/platform/add/${item.gm_id}`;
				this.$router.push({
					path: goLink,
				});
			},
			act(item) {
				let statusBool = ''
				if (item.status) {
					statusBool = "close"
					item.status = false
					item.shop_state = "关闭"
				} else if (!item.status) {
					statusBool = "open"
					item.status = true
					item.shop_state = "开启"
				}
				const params = {
					id: item.gm_id,
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
			  this.updateOrder({formItem:this.params,callback:this.getLists})
        this.visible = false
			},
		},
		mounted() {
		this.getLists()
		},
	};
</script>
<style scoped lang="stylus">
	.list-nav
	  display flex
	  justify-content space-between
	  flex-wrap wrap
</style>
