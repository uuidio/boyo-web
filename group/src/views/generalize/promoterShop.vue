<template>
  <div class="content">
    <div class="mb10" v-if="partner_role">
      <memberLists :type="partner_role==3 ? 1 : 0" @on-getid="getid">
        <a-button icon="plus">
          添加下级
        </a-button>
      </memberLists>
    </div>
    <div class="mb10">
      {{tel}}的下级列表
    </div>
    <div v-if="listField&&listField.length>0">
      <a-table
        :columns="listField"
        :dataSource="listData"
        :pagination="false"
      >
        <div slot="action" slot-scope="text,item">
          <a-popconfirm
            :title="'确定解绑'+item.mobile+'跟该会员的关系？'"
            @confirm="setStatus(item)"
            okText="确认"
            cancelText="取消"
          >
            <a-button type="dashed">解绑关系</a-button>
          </a-popconfirm>
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
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import memberLists  from '@C/member/lists'
  export default {
    inject: ['reload'],
    components:{
      memberLists
    },
    name: 'lists',
    computed: {
      ...mapState({
        listData: state => state.member.lists,
        listField: state => state.member.fields,
        pages: state => state.member.pages,
      }),
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
        listform: {
          partner_id:'',
          page:1
        },
        partner_role:'',
        tel:''
      };
    },
    methods: {
      ...mapActions({
        depLists: 'member/fetchSearch',
        setPartnersRelated: 'generalize/setPartnersRelated',
        changePartnerStatus: 'generalize/changePartnerStatus',
      }),
      setStatus(item){
         this.changePartnerStatus({params:{id:item.id},callback:this.reload})
      },
      pageChange(page){
        this.listform.page = page;
        this.getLists()
      },
      getLists(){
        this.depLists(this.listform)
      },
      getid(item){
        console.log(item)
        const params = {
          user_id:this.listform.partner_id,
          partner_ids:item.keys
        }
        this.setPartnersRelated({formItem:params,callback:this.reload})
      }
    },
    mounted() {
      this.listform.partner_id =this.$route.params.id
      this.tel = this.$route.query.tel
      this.partner_role = this.$route.query.partner_role
      this.getLists()
    },
  };
</script>

<style  scoped lang="stylus">
  >>>.imgItem
    display flex
    justify-content center
</style>
