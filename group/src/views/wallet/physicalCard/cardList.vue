<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10">
      </div>
      <div>
        <a-input-search enterButton placeholder="请输入店铺账号搜索" @search="onSearch"/>
      </div>
    </div>
    <div v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
        <!-- <a-table :scroll="{ x: 1100,y:700 }" :columns="item.bind_shop.field" :dataSource="item.bind_shop.data" slot="expandedRowRender"
                 slot-scope="item,index,text"
                 :pagination="false">
        </a-table> -->
        <div slot="action" slot-scope="text,item">
          账号启用状态
          <a-switch class="mr10" checkedChildren="开" unCheckedChildren="关" :defaultChecked="item.status  === 1 ? true : false "
           :key="item.id" @change="onSwitch(item)" /> <!-- 账号启用按钮 -->
           <div class="mt10">
             <a @click="editPassword(item)">修改密码</a>
           </div>
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
      <a-modal title="修改密码" v-model="visible" @ok="handleOk">
        <a-form :model="formItem">
          <a-form-item label="平台账号" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 12,xs:24}">
            <span>{{platformName}}</span>
          </a-form-item>
          <a-form-item label="新密码" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 12,xs:24}">
            <a-input v-model="formItem.password"/>
          </a-form-item>
          <a-form-item label="确认新密码" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 12,xs:24}">
            <a-input v-model="formItem.password_confirmation"/>
          </a-form-item>
        </a-form>
      </a-modal>
    </div>
  </div>
</template>

<script>
import fetch from '@/api/fetch';
import Server from '@/config/server';
import helper from '@/utils/helper';
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.project.accountlists,
      listField: state => state.project.accountfields,
      pages: state => state.project.accountPages,
    }),
  },
  data() {
    return {
      // listField:[],
			// listData:[],
			// pages:{

			// },
      visible: false,
      accChecked: '',
      platformName: '',
      itemList: '',
      keyword: '',
      formItem: {
        id: '',
        password: '',
        password_confirmation: '',
      },
      items:{
        page:1
      }
    };
  },
  methods: {
    ...mapActions({
      accountLists: 'project/accountLists',
      // editAccount: 'shop/editAccount',
      accountSwitch: 'project/accountSwitch',
    }),
    // 搜索
    onSearch(value) {
      this.items.keyword = value;
      this.getLists()
    },
    getLists(){
      this.accountLists({
        obj:this.items
      })
    },
    // getLists(){
    //   console.log(this.items);
	   // fetch.get(Server.action.adminuserLists,{
    //     obj:this.items
    //   })
    //     .then((res) => {
    //       // console.log('平台账号列表',res);
    //         if (res.data.code === 0) {
    //       this.listField=res.data.result.field;
    //       this.listField[2].scopedSlots= { customRender: 'status' }
    //        this.listField.push({
    //        title: '操作', dataIndex: 'action', key: 'action', scopedSlots: { customRender: 'action' },
    //      });
				// 	this.listData=res.data.result.lists.data;
				// 	this.pages=res.data.result.lists;
    //       }
    //     });
    // },
    pageChange(page){
      this.items.page=page
      console.log(this.items)
      this.getLists()
    },
    // 账号是否启用
    onSwitch(item) {
      if (item.status) {
        item.status = 0;
      } else {
        item.status = 1;
      }
      this.accountSwitch({
        id: item.id,
        status: item.status,
      });
    },
    handleOk() {
      // this.editAccount({
      //   formItem: this.formItem,
      // });
       fetch.post(Server.action.adminuserEdit,this.formItem)
        .then((resData) => {
             if (resData.data.code === 0) {
            helper.showSuccess(resData.data.message);
          }else{
            helper.showError(resData.data.message);
          }
        });
      this.formItem.password = '';
      this.formItem.password_confirmation = '';
      this.visible = false;
    },
    editPassword(item) {
      console.log(item);
      this.visible = true;
      this.platformName = item.username;
      this.formItem.id = item.id;
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
