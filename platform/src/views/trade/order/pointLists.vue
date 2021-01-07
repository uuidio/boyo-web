<template>
  <div class="content">
    <div class="title_h4">
      <a-button type="primary" @click="exportBtn">高级导出</a-button>
    </div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="listField&&listField.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      :rowKey="record => record.id"
      :columns="listField"
      :dataSource="listData"
      :pagination="false"
    >
      <a-table 
        :columns="order_item.refund_order.field"
        :dataSource="order_item.refund_order.data"
        slot="expandedRowRender"
        slot-scope="order_item"
        :pagination="false"
      >
        <a slot="goods_image" target="_blank" slot-scope="text" :href="text">
          <img height="50px" :src="text" alt="" />
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
    <!-- 导出筛选 -->
    <a-modal title="导出筛选" v-model="visible" @ok="handleOk" @cancel="cancel">
      <a-form-item
        label="增加积分时间段:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
        v-if="timeVisible"
      >
        <a-range-picker @change="dateChange" />
      </a-form-item>
    </a-modal>
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
	  expoetData: state => state.point.exportData,
	  total_data:state => state.trade.total_fee_data,
    })
  },
  data() {
    return {
      visible: false,
      exportForm: {},
      timeVisible:true
    };
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
      this.visible = true;
       this.timeVisible=false
			this.$nextTick(()=>{
				this.timeVisible=true
      })
      this.exportForm={}
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel(lists) {
      const that = this;
      const field = this.expoetData.trade.tHeader; // 标题
      const filterVal = this.expoetData.trade.filterVal; // 内容过滤
      const list = this.expoetData.trade.list;
      const data = this.formatJson(filterVal, list);
      import("@/vendor/Export2Excel").then(excel => {
        excel.export_json_to_excel({
          header: field, //表头 必填
          data, //具体数据 必填
          filename: "订单积分明细", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx" //非必填
        });
      });
    },
    handleOk() {
      if (JSON.stringify(this.exportForm) === "{}") {
        this.$message.info('请选择筛选时间');
        return false;
      }

      this.visible = false;
      this.$success({
        title: "温馨提示！",
        content: "数据正在导出,请稍后查看下载目录！"
      });
      this.exportExcel(this.exportForm)
        .then(() => {
          this.export2Excel(this.expoetData);
        })
        .catch(err => {
          alert("导出数据量过大，建议筛选部分数据");
        });
      this.exportForm = {};
    },
    cancel() {
      this.visible = false;
    },
    dateChange(date, dateString) {
      this.exportForm.created_start = dateString[0];
      this.exportForm.created_end = dateString[1];
    }
  },
  mounted() {
    this.fetchLists(1);
  }
};
</script>

<style scoped>
.total{
		text-align: right;
		margin-bottom: 10px;
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
