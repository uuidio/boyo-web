<template>
  <div class="content">
    <div>
      <div class="mb10 fxBox2 text-r">
        <a-button @click="downLists" type="primary">导出</a-button>
        <a-input-search  v-model="formItem.user_phone" placeholder="输入用户手机号" style="width: 250px" @search="callback"  enterButton/>
      </div>
      <a-tabs v-model="formItem.status" @change="callback">
          <a-tab-pane tab="全部" :key="trimStr"></a-tab-pane>
          <a-tab-pane tab="未审核" key="TO_VERIFY"></a-tab-pane>
          <a-tab-pane tab="已审核" key="VERIFIED"></a-tab-pane>
          <a-tab-pane tab="已驳回" key="DENIED"></a-tab-pane>
          <a-tab-pane tab="已完成" key="COMPELETE"></a-tab-pane>
      </a-tabs>
     <div v-if="fields&&fields.length>0">
       <a-table :columns="fields" :dataSource="dataLists" :pagination="false">
         <div slot-scope="text,item" slot="action">
           <a-button @click="showDetail(item)" type="primary" v-if="item.status=='TO_VERIFY'">审核</a-button>
         </div>
       </a-table>
       <div class="pageBox">
         <a-pagination
           :total="pages.total"
           :showTotal="total => `共 ${total} 条数据`"
           :pageSize="pages.per_page"
           v-model="formItem.page"
           @change="pageChange"
         />
       </div>
     </div>
      <applyDetail
        :formParams="formParams"
        :addVisible="addVisible"
        @on-change="changeAdd"
      >
      </applyDetail>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import applyDetail from './components/depDetail';
  import { export2Excel } from "@/utils/tools";

  export default {
    components:{
      applyDetail
    },
    inject: ['reload'],
    data() {
      return {
        formItem:{
          page:1,
          status:'',
          user_phone:''
        },
        trimStr:'',
        formParams:{},
        addVisible:false
      };
    },
    computed: {
      ...mapState({
        fields: state => state.generalize.DepFields,
        dataLists: state => state.generalize.DepLists,
        pages: state => state.generalize.DepPages,
        detail: state => state.generalize.DepDetail,
        withdrawalRecord: state => state.generalize.withdrawalRecord,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'generalize/depLists',
        getDetail: 'generalize/getDepDetail',
        userDepositDown: 'generalize/userDepositDown',
      }),
      downLists() {
        this.$success({
          title: "温馨提示！",
          content: "数据正在导出,请稍后"
        });
        const obj = {};
        const params = Object.assign(obj, this.formItem);
        delete params.page;
        this.userDepositDown(params);
      },
      callback(){
        this.formItem.page = 1
        this.getLists()
      },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },
      showDetail(item){
        const params = {
          id:item.id
        }
        this.getDetail(params)
      },
      changeAdd(visible) {
        this.addVisible = !visible;
      },
    },
    mounted() {
      this.getLists()
    },
    watch:{
      withdrawalRecord() {
        this.fields.pop(); // 删除表头 操作
        export2Excel(this.withdrawalRecord.list.data, this.fields, '提现记录列表');
      },
      detail(){
        this.formParams = this.detail
        console.log(this.formParams)
        this.addVisible = true
      }
    }
  };
</script>

<style scoped lang="stylus">
</style>
