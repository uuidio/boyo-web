<template>
  <div class="content">
    <div class="mb20">
      <search @search="getSearch"></search>
    </div>
    <div class="mb20">
      <a-button @click="downloadDay" type="primary">数据导出</a-button>
    </div>
    <div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
    <template v-if="fields&&fields.length>0">
      <a-table :scroll="{ x: 1100,y:700 }"
               class="mr10"
               :columns="fields"
               :dataSource="lists"
               :pagination="false"
      >
<!--        <div slot="action" slot-scope="text, item">-->
<!--          <a @click="toDetail(item)">查看明细</a>-->
<!--        </div>-->
      </a-table>
      <div class="pageBox" >
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          v-model="params.page"
          @change="pageChange"

        />
      </div>
    </template>
  </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
  import { export2Excel } from "@/utils/tools";
  import search from "./components/search";
  export default {
    components: {
      search
    },
    computed: {
      ...mapState({
        lists: state => state.settle.dayLists,
        pages: state => state.settle.dayPages,
        fields: state => state.settle.dayFields,
        dayDownload: state => state.settle.dayDownload,
        total_data:state => state.settle.total_fee_data,
      })
    },
    data() {
      return {
        params: {
          page: 1,
          shop_id: undefined,
          settle_time_start: "",
          settle_time_end: ""
        }
      };
    },
    watch: {
      dayDownload() {
        this.fields.pop(); // 删除表头 操作
        export2Excel(this.dayDownload.list, this.fields, "门店日结算报表");
      }
    },
    methods: {
      ...mapActions({
        getTradeDay: "settle/getTradeDay",
        getDownloadDay: "settle/getDownloadDay"
      }),
      downloadDay() {
        this.$success({
          title: "温馨提示！",
          content: "数据正在导出,请稍后"
        });
        const params = {
          shop_id: this.params.shop_id,
          settle_time_start: this.params.settle_time_start,
          settle_time_end: this.params.settle_time_end
        };
        this.getDownloadDay(params);
      },
      toDetail(item) {
        const _url = "/settle/tradeDayDetail";
        let routeData = this.$router.resolve({
          path: _url,
          query: { id: item.shop_id, settle_time: item.settle_time }
        });
        window.open(routeData.href, "_blank");
      },
      pageChange(page) {
        this.params.page = page;
        this.getTradeDay(this.params);
      },
      getSearch(item) {
        this.params = item;
        this.params.page = 1;
        this.getTradeDay(this.params);
      }
    },
    mounted() {
      this.getTradeDay(this.params);
    }
  };
</script>

<style scoped>
  .total{
    text-align: right;
    flex-wrap: wrap;
    margin-bottom: 10px;
    display: flex;
    flex-direction: row-reverse;
  }
  .span{
    margin-right:20px;
    font-size:14px;
  }
  .text{
    font-weight: 600;
    color: #4c4949;
  }
</style>
