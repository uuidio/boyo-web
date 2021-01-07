<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10">
        <router-link to="/shop/account/add">
          <a-button type="primary" icon="plus">添加店铺账号</a-button>
        </router-link>
      </div>
      <div>
        <a-input-search enterButton placeholder="请输入店铺账号搜索" @search="onSearch"/>
      </div>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
        <a-table  :columns="item.bind_shop.field" :dataSource="item.bind_shop.data" slot="expandedRowRender"
                 slot-scope="item,index,text"
                 :pagination="false">
        </a-table>
        <!-- 账号启用按钮 -->
        <a-switch slot="status" slot-scope="text, item" :defaultChecked="item.status === 1 ? true : false"
                  checkedChildren="开"
                  unCheckedChildren="关" :key="item.id" @change="onSwitch(item)"/>
        <a slot="action" @click="editPassword(record)" slot-scope="text, record">
          修改密码
        </a>
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
      <a-modal title="修改密码" v-model="visible" @ok="handleOk">
        <a-form :model="formItem">
          <a-form-item label="店铺账号" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 12,xs:24}">
            <span>{{shopName}}</span>
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
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.shop.accountlists,
      listField: state => state.shop.accountfields,
      pages: state => state.shop.accountPages,
    }),
  },
  data() {
    return {
      visible: false,
      accChecked: '',
      shopName: '',
      itemList: '',
      keyword: '',
      formItem: {
        id: '',
        password: '',
        password_confirmation: '',
      },
      items:{
        keyword:'',
        page:1
      }
    };
  },
  methods: {
    ...mapActions({
      accountLists: 'shop/accountLists',
      editAccount: 'shop/editAccount',
      accountSwitch: 'shop/accountSwitch',
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
    pageChange(page){
      this.items.page=page
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
        statue: item.status,
      });
    },
    handleOk() {
      this.editAccount({
        formItem: this.formItem,
      });
      this.formItem.password = '';
      this.formItem.password_confirmation = '';
      this.visible = false;
    },
    editPassword(item) {
      console.log(item);
      this.visible = true;
      this.shopName = item.username;
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
