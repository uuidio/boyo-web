<template>
  <div class="mr24">
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1200,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="action" slot-scope="text, record">
            <a  @click="goDetail(record)">查看</a>
          </div>
          <div slot="verify_status_text" slot-scope="text, record">
            <span class="col-red" v-if="record.verify_status_text==='待审核'">{{record.verify_status_text}}</span>
            <span v-else>{{record.verify_status_text}}</span>
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
    </a-card>
    <a-modal
      title="秒杀活动店铺审核"
      :visible="visible"
      @ok="handleOk"
    >
      <a-form >
        <a-form-item label="活动名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{seckill_name}}
        </a-form-item>
        <a-form-item label="店铺名称" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          {{shop_name}}
        </a-form-item>
        <a-form-item label="审核接口" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-radio-group v-model="params.status" name="radioGroup" >
            <a-radio  :value="1">通过</a-radio>
            <a-radio  :value="0">不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="审核备注" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-textarea v-model="params.reason" style="width:200px" placeholder="选填（不通过审核必填）" :rows="4" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'coupon',
    data() {
      return {
        visible:false,
        formItem:{
          page:1,
        },
        shop_name:'',
        seckill_name:'',
        params:{
          registers_id:'',
          shop_id:'',
          status:1,
          reason:''
        }
      };
    },
    computed: {
      ...mapState({
        fields: state => state.seckill.registerField,
        dataLists: state => state.seckill.registerDataLists,
        pages: state => state.seckill.registerPages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'seckill/registerLists',
      }),
      handleOk(){

      },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },
      goDetail(item) {
        const routeUrl = this.$router.resolve({
          path: `/promotion/seckill/shopDetail/${item.id}`,
        });
        window.open(routeUrl.href, '_blank');
        // this.params.shop_id = item.spec_id;
        // this.params.registers_id = item.seckill_ap_id;
        // this.shop_name = item.shop_name
        // this.seckill_name = item.activity_name
        // this.visible = true
      },
    },
    mounted() {
      this.getLists()
    },
  };
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
