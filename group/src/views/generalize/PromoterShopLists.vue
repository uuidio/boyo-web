<template>
  <div class="content">
    <div>
      <div class="mb20">
        <a-button icon="arrow-down" type="primary" @click="medalShow = true">导出</a-button>
      </div>
      <div class="mb20 text-r">
        <a-input-search style="width:250px" v-model="listform.mobile" placeholder="输入会员手机号" @search="onSearch" enterButton />
        <!--<a-button icon="arrow-down" type="primary" @click="medalShow = true">导出</a-button>-->
      </div>
      <div v-if="listField && listField.length>0">
        <a-table
          :columns="listField"
          :dataSource="listData"
          :pagination="false"
        >
          <div slot="action" slot-scope="text,item">
            <div class="mb10">
              <a-button type="primary" @click="toFx(item)">
                会员分销收入
              </a-button>
            </div>
            <div>
              <a-button @click="toYj(item)">
                会员预估佣金
              </a-button>
            </div>
          </div>
        </a-table>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :pageSize="pages.per_page"
            v-model="listform.page"
            @change="pageChange" />
        </div>
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
        listData: state => state.generalize.PromoterShopLists,
        listField: state => state.generalize.PromoterShopFields,
        pages: state => state.generalize.PromoterShopPages,
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
          mobile:''
        },
        dowm:{
          created_start_at:'',
          created_end_at:'',
        }
      };
    },
    methods: {
      ...mapActions({
        depLists: 'generalize/promoterShopLists',
        promoterDown: 'generalize/promoterShopDown',
      }),
      toFx(item){
        const jumpUrl = `/generalize/trade/${item.user_id}`;
        const  routeData = this.$router.resolve({ path: jumpUrl,query:{
            mobile:item.mobile
        }});
        window.open(routeData.href, '_blank');
      },
      toYj(item){
        const jumpUrl = `/generalize/userDepositLogsLists/${item.user_id}`;
        const  routeData = this.$router.resolve({ path: jumpUrl,query:{
            mobile:item.mobile
          }});
        window.open(routeData.href, '_blank');
      },
      handleCancel(){
        this.medalShow = false
      },
      onSearch(){
        this.listform.page = 1
        this.depLists(this.listform)
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
          this.promoterDown({params:this.dowm,callback:this.callback})
      },
      callback(){
        const _this = this
        setTimeout(()=>{
          _this.confirmLoading = false
          _this.medalShow = false
          const jumpUrl = `/statistics/downLoadList`;
          const routeData = this.$router.resolve({ path: jumpUrl })
          window.open(routeData.href, '_blank');
        },1000)
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
