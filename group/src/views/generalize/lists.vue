<template>
  <div class="content">
    <div>
      <div class="mb20 text-r">
        <a-input-search style="width:250px" placeholder="输入手机号" v-model="formItem.mobile" @search="onSearch" enterButton />
      </div>
      <a-tabs v-model="formItem.apply_status" @change="listsChange">
        <a-tab-pane tab="全部" :key="trimStr"></a-tab-pane>
        <a-tab-pane tab="已通过" key="success"></a-tab-pane>
        <a-tab-pane tab="待审核" key="apply"></a-tab-pane>
        <a-tab-pane tab="已驳回" key="fail"></a-tab-pane>
      </a-tabs>
     <div v-if="fields&&fields.length>0">
       <a-table :columns="fields" :dataSource="dataLists" :pagination="false">
         <div slot-scope="text,item" slot="action">
           <a-button @click="showDetail(item)" type="primary" v-if="item.apply_status=='apply'">审核</a-button>
           <a-button @click="showDetail(item)" type="primary" v-else-if="item.apply_status!=='apply'">查看详情</a-button>
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
        :type="type"
        @on-getLists="getDataLists"
      >
      </applyDetail>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import applyDetail from './components/detail'
  export default {
    components:{
      applyDetail
    },
    inject: ['reload'],
    data() {
      return {
        trimStr:'',
        formItem:{
          page:1,
          apply_status: '',
          mobile:''
        },
        type:true,
        formParams:{
          verified_info: {
            card: '',
          },
        },
        addVisible:false
      };
    },
    computed: {
      ...mapState({
        fields: state => state.generalize.fields,
        dataLists: state => state.generalize.lists,
        pages: state => state.generalize.pages,
        detail: state => state.generalize.detail,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'generalize/fetchLists',
        getDetail: 'generalize/getDetail',
      }),
      onSearch(){
        this.formItem.page=1
        this.getLists()
      },
      listsChange(){
        this.formItem.page=1
        this.getLists()
      },
      getDataLists(){
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
        if(item.apply_status==='apply'){
          this.type=true
        }else{
          this.type=false
        }
        console.log(item)
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
      detail(){
        this.formParams = this.detail
        this.addVisible = true
      }
    }
  };
</script>

<style scoped lang="stylus">
</style>
