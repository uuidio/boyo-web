<template>
  <div class="content">
    <div class="mb20">
      <search @search="getSearch"></search>
    </div>
    <div class="mb20">
      <a-button @click="downloadUv" type="primary">数据导出</a-button>
    </div>
	<template v-if="fields&&fields.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      class="mr10"
      :columns="fields"
      :dataSource="lists"
      :pagination="false"
    >
      <div slot="action" slot-scope="text, item">
        <span v-if="item.status === 0" class="col-666">未结算</span>
        <span v-else class="col-666">已结算</span>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import search from "./components/search";
import { export2Excel } from "@/utils/tools";
export default {
  components: {
    search
  },
  computed: {
    ...mapState({
      lists: state => state.settle.uvLists,
      pages: state => state.settle.uvPages,
      fields: state => state.settle.uvFields,
      uvDownload: state => state.settle.uvDownload,
    })
  },
  data() {
    return {
      params: {
        pages: 1,
        shop_id: undefined,
        gm_id: '',
        trading_day_start: '',
        trading_day_end: '',
      }
    };
  },
  watch: {
    uvDownload() {
      this.fields.pop(); // 删除表头 操作
      export2Excel(this.uvDownload.list, this.fields, "UV结算报表");
    }
  },
  methods: {
    ...mapActions({
      getTradeUv: "settle/getTradeUv",
      getDownloadUv: "settle/getDownloadUv"
    }),
    downloadUv() {
      this.$success({
        title: "温馨提示！",
        content: "数据正在导出,请稍后"
      });
      const params = {
        shop_id: this.params.shop_id,
        gm_id: this.params.gm_id,
        trading_day_start: this.params.trading_day_start,
        trading_day_end: this.params.trading_day_end,
      };
      this.getDownloadUv(params);
    },
    pageChange(page) {
      this.params.page = page;
      this.getTradeUv(this.params);
    },
    getSearch(item) {
      this.params.trading_day_start = item.settle_time_start;
      this.params.trading_day_end = item.settle_time_end;
      this.params.shop_id = item.shop_id;
      this.params.gm_id = item.gm_id;
      this.params.page = 1;
      this.getTradeUv(this.params);
    },
    export2Excels(lists, fieldsData, name) {
      const field = []; // 标题
      const filter = []; // 内容过滤
      const list = lists;
      fieldsData.forEach((item, i) => {
        field.push(item.title);
        filter.push(item.dataIndex);
      });
      // field.splice(field.length - 1, 1);
      // filter.splice(filter.length - 1, 1);
      console.log(lists, fieldsData);
      const data = this.formatJson(filter, list);
      console.log(data);
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: field, //表头 必填
          data, //具体数据 必填
          filename: name, //非必填
          autoWidth: true, //非必填
          bookType: "xlsx" //非必填
        });
      });
      // this.dataVisible = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    }
  },
  mounted() {
    this.getTradeUv(this.params);
  }
};
</script>

<style scoped>
</style>
