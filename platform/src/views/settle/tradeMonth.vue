<template>
  <div class="content">
    <div class="mb20">
      <search @search="getSearch" type="month"></search>
    </div>
    <div class="mb20">
      <a-button @click="downloadMonth" type="primary">数据导出</a-button>
    </div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="fields&&fields.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      class="mr10"
      :columns="fields"
      :dataSource="lists"
      :pagination="false"
    >
      <div slot="action" slot-scope="text, item">
        <a-popconfirm
          title="确认结算此条月结数据？"
          @confirm="submitTrade(item)"
          okText="确认"
          cancelText="取消"
          v-if="item.status === 0"
        >
          <a href="#">确认结算</a>
        </a-popconfirm>
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
      lists: state => state.settle.monthLists,
      pages: state => state.settle.monthPages,
      fields: state => state.settle.monthFields,
	  monthDownload: state => state.settle.monthDownload,
	  total_data:state => state.settle.total_fee_data,
    })
  },
  data() {
    return {
      params: {
        pages: 1,
        shop_id: undefined,
        settle_time_start: "",
        settle_time_end: ""
      }
    };
  },
  watch: {
    monthDownload() {
      this.fields.pop(); // 删除表头 操作
      export2Excel(this.monthDownload.list, this.fields, "店铺月结算报表");
    }
  },
  methods: {
    ...mapActions({
      getTradeMonth: "settle/getTradeMonth",
      submitOrderSettle: "settle/submitOrderSettle",
      getDownloadMonth: "settle/getDownloadMonth"
    }),
    downloadMonth() {
      this.$success({
        title: "温馨提示！",
        content: "数据正在导出,请稍后"
      });
      const params = {
        shop_id: this.params.shop_id,
        settle_time_start: this.params.settle_time_start,
        settle_time_end: this.params.settle_time_end
      };
      this.getDownloadMonth(params);
    },
    pageChange(page) {
      this.params.page = page;
      this.getTradeMonth(this.params);
    },
    submitTrade(item) {
      const _this = this;
      this.submitOrderSettle({
        params: {
          id: item.id,
          status: 1
        },
        callback: this.getTradeMonth(this.params)
      });
    },
    getSearch(item) {
      this.params = item;
      this.params.page = 1;
      this.getTradeMonth(this.params);
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
    this.getTradeMonth(this.params);
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
