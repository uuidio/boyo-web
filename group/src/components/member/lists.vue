<template>
  <div>
    <div @click="selectTableModal = true">
      <slot></slot>
    </div>
    <a-modal
      destroyOnClose
      title="请点击选择列表数据"
      width="80%"
      :visible="selectTableModal"
      @ok="selectOk"
      @cancel="handleCancel"
    >
      <a-input-search enterButton class="mb10" style="width: 18rem;" placeholder="请输入手机号" @search="shopSearch"/>
      <div>
        <a-table :rowKey="record => record.id" :columns="listField" :dataSource="listData" :pagination="false"
                 :rowSelection="{selectedRowKeys:selectedRowKeys,type: 'radio', onChange: selectRows}">
        </a-table>
      </div>
      <div class="pageBox">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="1"
          @change="pageChange"
        />
      </div>
    </a-modal>
  </div>
</template>
<script>
import helper from '@/utils/helper';
import fetch from '@/api/fetch';
import Server from '@/config/server';
export default {
  name: 'TableSelect',
  props:{
    type:{
      type:Number,
      default :0
    },
    partner_role:{
      type:Number,
      default :2
    }
  },
  data() {
    return {
      selectTableModal: false,
      selectedRowKeys: [],
      listField: [],
      listData: [],
      pages: {},
      params:{
        page:1,
        mobile:''
      },
      selectData:[]
    };
  },
  methods: {
    pageChange(page) {
      this.params.page=page
      this.getLists();
    },
    shopSearch(val) {
      this.params.mobile =val
      this.getLists();
    },
    getLists() {
      if(this.type==0){
        this.params.partner_id = 0;
        this.params.is_promoter = 1;
        this.params.partner_role = 1;
      }else if(this.type==1){
        this.params.partner_id = 0;
        this.params.partner_role = 2;
      }else if(this.type==2){
        this.params.partner_role = 3;
      }
      fetch
        .get(Server.action.member_search, {
          params: this.params,
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.listField = response.data.result.field;
            this.pages = response.data.result.lists;
            this.listData = response.data.result.lists.data;
          } else {
            helper.showError(response.data.code);
          }
        })
        .catch((error) => {
          helper.showError(error);
        });
    },
    selectRows(selectionKey, selection) {
      this.selectedRowKeys = selectionKey;
      this.selectData = selection;
    },
    selectOk() {
      if(this.selectedRowKeys.length==0){
        helper.showError('请选择推广员')
        return
      }
      this.$emit('on-getid',{keys:this.selectedRowKeys,item:this.selectData})
      this.selectTableModal = false;
    },
    handleCancel() {
      this.selectTableModal = false;
    },
  },
  mounted() {
    this.getLists()
  },
  watch: {
  },
};
</script>
<style scoped>
</style>
