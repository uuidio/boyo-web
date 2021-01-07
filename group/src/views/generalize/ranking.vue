<template>
  <div class="content">
    <div>
      <div class="mb20">
        <a-button icon="arrow-down" type="primary" @click="medalShow = true">导出</a-button>
      </div>
      <a-table
        :columns="listField"
        :dataSource="listData"
        :pagination="false"
        :scroll="{ y: 1300 }"
      >
      </a-table>
      <!--<div class="pageBox">-->
        <!--<a-pagination-->
          <!--:total="pages.total"-->
          <!--:showTotal="total => `共 ${total} 条数据`"-->
          <!--:pageSize="pages.per_page"-->
          <!--:defaultCurrent="1"-->
          <!--@change="pageChange" />-->
      <!--</div>-->
    </div>
    <a-modal
      title="导出表格"
      :visible="medalShow"
      @ok="handleOk"
      :confirmLoading="confirmLoading"
      @cancel="handleCancel"
    >
      <a-range-picker @change="onChange" />
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    inject: ['reload'],
    components:{
    },
    name: 'lists',
    computed: {
      ...mapState({
        listData: state => state.generalize.RankingLists,
        listField: state => state.generalize.RankingFields,
        pages: state => state.generalize.RankingPages,
      }),
    },
    data() {
      return {
        medalShow:false,
        confirmLoading:false,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
        menuForm: this.$form.createForm(this),
        listform: {
          page: 1,
        },
        dowm:{
          created_start_at:'',
          created_end_at:'',
        }
      };
    },
    methods: {
      ...mapActions({
        depLists: 'generalize/rankingLists',
        rankingDown: 'generalize/rankingDown',
      }),
      handleCancel(){
        this.medalShow = false
      },
      onChange(a,b){
       if(b[0]){
         this.dowm.created_start_at = b[0]
         this.dowm.created_end_at = b[1]
       }else{
         this.dowm.created_start_at = ''
         this.dowm.created_end_at = ''
       }
      },
      pageChange(page){
        this.listform.page = page;
        this.depLists(this.listform)
      },
      handleOk(){
          this.confirmLoading = true
          this.rankingDown({params:this.dowm,callback:this.callback})
      },
      callback(){
        this.confirmLoading = false
        this.medalShow = false
      }
    },
    mounted() {
      this.depLists(this.listform)
    },
  };
</script>

<style  scoped lang="stylus">
  >>>.imgItem
    display flex
    justify-content center
</style>
