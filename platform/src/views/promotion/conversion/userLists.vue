<template>
  <div class="content">
    <div class="mb20 text-r fxBox1">
      <a-button  type="primary" @click="exportTable"  icon="download" >导出</a-button>
    </div>
    <a-tabs v-model="formItem.is_redeem" @change="tabChange">
      <a-tab-pane tab="全部" :key="trimStr"></a-tab-pane>
      <a-tab-pane tab="未兑换" :key="0"></a-tab-pane>
      <a-tab-pane tab="待发货" :key="1"></a-tab-pane>
      <a-tab-pane tab="待收货" :key="2"></a-tab-pane>
    </a-tabs>
    <div v-if="fields&&fields.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :loading="loading" :dataSource="dataLists" :pagination="false">
        <div v-if="record.activities_reward_info&&record.activities_reward_info.activities_text" slot="a" slot-scope="text,record">
          {{record.activities_reward_info.activities_text}}
        </div>
        <div slot="b" slot-scope="text,record" v-if="record.activities_reward_info&&record.activities_reward_info.goods_info">
         {{record.activities_reward_info.goods_info.goods_name}}
        </div>
        <div slot="c" slot-scope="text,record">
          <img v-if="record.activities_reward_info&&record.activities_reward_info.goods_info" :src="record.activities_reward_info.goods_info.goods_image" height="80px" alt="">
        </div>
        <div slot="action" slot-scope="text,record">
          <a-button v-if="record.tid" @click="getOrder(record)" type="primary">订单详情</a-button>
          <a-button
            class="ml10"
            @click="goDetail(record.tid)"
            v-if="
                  record.is_redeem_txt == '已兑换,待发货' && record.pick_type === 0
                "
          >
            发货
          </a-button>
          <a-button
            class="ml10"
            @click="pickUp(record)"
            v-if="
                  record.is_redeem_txt == '已兑换,待发货' && record.pick_type === 1
                "
          >
            提货
          </a-button>
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
    <a-modal title="提货" v-model="pickUpVisible" @ok="pickUphandleOk">
      提货码：
      <a-input
        v-model="pickUpObj.code"
        style="width: 24rem"
        placeholder="请输入取货码"
      />
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    components:{
    },
    data() {
      return {
        pickUpVisible: false,
        pickUpObj: {
          tid: "",
          code: ""
        },
        formItem:{
          page:1,
          is_redeem:''
        },
        loading:true,
        trimStr:''
      };
    },
    computed: {
      ...mapState({
        fields: state => state.reward.userFields,
        dataLists: state => state.reward.userLists,
        pages: state => state.reward.userPages,
        listData: state => state.trade.logisticsData,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'reward/activitiesRewardsSendLogs',
        RelevanceListsExcel:'reward/RelevanceListsExcel',
        pickUpInfo: "reward/pickUpInfo",
      }),
      pickUphandleOk() {
        if (!this.pickUpObj.code == "") {
          this.pickUpInfo(this.pickUpObj);
          this.pickUpVisible = false;
        }
      },
      pickUp(item) {
        console.log(item);
        this.pickUpVisible = true;
        this.pickUpObj.tid = item.tid;
      },
      goDetail(kid) {
        const jumpUrl = `/trade/order/delivery/${kid}`;
        this.$router.push({ path: jumpUrl });
      },
      exportTable() {
      let params ={}
      this.RelevanceListsExcel(params).then(res => {
        const tHeader = res.tHeader;
        const filterVal = res.filterVal;
        const list = res.list;
        const data = this.formatJson(filterVal, list);
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader, //表头 必填
            data, //具体数据 必填
            filename: "实物奖品订单列表", //非必填
            autoWidth: true, //非必填
            bookType: "xlsx" //非必填
          });
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      tabChange(){
        this.formItem.page = 1
        this.getLists()
      },
      callback(){
        this.loading = false
      },
      getLists(){
        this.loading = true
        const params = this.formItem
        this.fetchLists({params,callback:this.callback});
      },
      getOrder(item){
        const jumpUrl = `/trade/detail/${item.tid}`;
        let routeData = this.$router.resolve({ path: jumpUrl,query:{
          type:'reward'
          } });
        window.open(routeData.href, '_blank');
      }
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
