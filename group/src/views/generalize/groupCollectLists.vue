<template>
  <div class="content">
    <div class="mb20 text-r">
      <a-range-picker @change="searchTimeChange" />
      <a-button type="primary" @click="timeSearch">搜索</a-button>
    </div>
    <div v-if="listField&&listField.length>0">
      <a-table
        :columns="listField"
        :dataSource="listData"
        :pagination="false"
      >
        <div  slot="user_img" slot-scope="text,item">
          <img width="70px" :src="item.wx_info.headimgurl" alt="">
        </div>
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="1"
          @change="pageChange" />
      </div>
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
        listData: state => state.generalize.CollectLists,
        listField: state => state.generalize.CollectFields,
        pages: state => state.generalize.CollectPages,
      }),
    },
    data() {
      return {
        medalShow:false,
        confirmLoading:false,
        mobile:'',
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
          created_start_at:'',
          created_end_at:'',
        },
        dowm:{
          created_start_at:'',
          created_end_at:'',
        }
      };
    },
    methods: {
      ...mapActions({
        depLists: 'generalize/groupCollectLists',
      }),
      timeSearch(){
        this.listform.page = 1
        this.depLists(this.listform)
      },
      handleCancel(){
        this.medalShow = false
      },
      onSearch(){
        this.listform.page = 1
        this.depLists(this.listform)
      },
      searchTimeChange(a,b){
        if(b[0]){
          this.listform.created_start_at = b[0]
          this.listform.created_end_at = b[1]
        }else{
          this.listform.created_end_at = ''
          this.listform.created_end_at = ''
        }
      },
      onChange(a,b){
       if(b[0]){
         this.dowm.created_start_at = b[0]
         this.dowm.created_end_at = b[1]
       }else{
         this.dowm.created_end_at = ''
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
