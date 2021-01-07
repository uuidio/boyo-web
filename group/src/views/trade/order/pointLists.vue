<template>
  <div class="content">
    <div class="title_h4">
      <a-button type="primary" @click="exportBtn">导出</a-button>
    </div>
	<template v-if="listField&&listField.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      :rowKey="record => record.id"
      :columns="listField"
      :dataSource="listData"
      :pagination="false"
    >
      <a-table  :columns="order_item.refund_order.field" :dataSource="order_item.refund_order.data"
        slot="expandedRowRender" slot-scope="order_item" :pagination="false">
        <a slot="goods_image" target="_blank" slot-scope="text" :href="text">
          <img height="50px" :src="text" alt="">
        </a>
      </a-table>
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
export default {
  computed: {
    ...mapState({
      listData: state => state.trade.pointLists,
      listField: state => state.trade.pointFields,
      pages: state => state.trade.pointPages,
      expoetData: state => state.point.exportData
    })
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchLists: "trade/pointLists",
      exportExcel: "point/exportPoint"
    }),
    pageChange(page) {
      this.fetchLists(page);
    },
    exportBtn() {
      this.exportExcel().then(() => {
        this.export2Excel(this.expoetData);
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel(lists) {
      this.$success({
        title: "温馨提示！",
        content: "数据正在导出,请稍后查看下载目录！"
      });
      const that = this;
      const field = this.expoetData.trade.tHeader; // 标题
      const filterVal = this.expoetData.trade.filterVal; // 内容过滤
      const list = this.expoetData.trade.list;
      const data = this.formatJson(filterVal, list);
      console.log(filterVal, data);
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: field, //表头 必填
          data, //具体数据 必填
          filename: "订单积分明细", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx" //非必填
        });
      });
    }
  },
  mounted() {
    this.fetchLists(1);
  }
};
</script>

<style scoped>
</style>
