<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div>
          <a-button
            type="primary"
            @click="exportTable"
            :disabled="listsData.length === 0"
            icon="download"
            >导出</a-button
          >
          <a-button type="primary" @click="filterAlert" icon="filter"
            >筛选</a-button
          >
        </div>
        <div>
          <a-input-search
            enterButton
            placeholder="请输入订单号"
            style="width:400px;"
            @search="toSearch"
            v-model="searchObj.value"
          />
        </div>
      </div>
    </div>
	<template v-if="fieldsData&&fieldsData.length>0">
    <a-tabs @tabClick="tabClick" v-model="currentAct">
      <a-tab-pane
        :tab="item.title"
        :key="item.key"
        v-for="(item, index) in afterStatus"
      >
        <a-table :scroll="{ x: 1900,y:700 }"
          class="mr10"
          :columns="fieldsData"
          :dataSource="listsData"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a href="javascript:;" @click="details(record)">明细</a>
          </div>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <div class="pageBox" v-show="listsData.length !== 0">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :pageSize="pages.per_page"
        v-model="currentPages"
        @change="pageChange"
      />
    </div>
	</template>
    <a-modal
      title="查看售后明细"
      v-if="visible"
      v-model="visible"
      @ok="handleOk"
      @cancel="cancel"
      class="rateModel"
    >
      <a-row style="border-bottom:1px solid #e8e8e8;padding-bottom:10px">
        <a-col :xs="24" :md="4">
          订单号:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.tid }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          实付金额:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.amount }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          分类名称:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.gc_name }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          商品ID:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.goods_id }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          商品名称:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.goods_name }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          商品价格:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.goods_price }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          商品货号:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.goods_serial }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          购买数量:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.quantity }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          发货量:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.sendnum }}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          状态:
        </a-col>
        <a-col :xs="24" :md="20">
          {{ detail.trade.status_text }}
        </a-col>
      </a-row>
    </a-modal>

    <a-modal title="售后列表筛选" v-model="exportModel" @ok="filterOk">
      <a-form-item
        label="售后状态:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.status" placeholder="请选择订单状态" style="width:100%">
          <a-select-option value="2">已处理</a-select-option>
          <a-select-option value="1">处理中</a-select-option>
          <a-select-option value="0">待处理</a-select-option>
          <a-select-option value="3">已驳回</a-select-option>
          <a-select-option value="-1">全部</a-select-option>
        </a-select>
      </a-form-item>
	  <a-form-item
        label="售后类型:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.aftersales_type" placeholder="请选择售后类型" style="width:100%">
          <a-select-option value="ONLY_REFUND">仅退款</a-select-option>
          <a-select-option value="REFUND_GOODS">退货退款</a-select-option>
          <a-select-option value="EXCHANGING_GOODS">换货</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="店铺名称:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-input v-model="exportForm.shop_name" placeholder="请输入店铺名称" />
      </a-form-item>

      <a-form-item
        label="生成时间:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-range-picker @change="timeSelect" />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { constants } from "crypto";

export default {
  name: "aftersales",
  data() {
    return {
      visible: false,
      searchObj: {
        select: "name",
        param: {},
        value: ""
      },
      exportForm: {
        status: "-1",
        page: "1"
      },
      currentParam: {},
      filterParams: {},
      afterStatus: [
        {
          title: "全部",
          key: "-1"
        },
        {
          title: "已处理",
          key: "2"
        },
        {
          title: "处理中",
          key: "1"
        },
        {
          title: "待处理",
          key: "0"
        },
        {
          title: "已驳回",
          key: "3"
        }
      ],
      exportModel: false,
      isFillter: false,
      currentAct: "-1",
      currentPages: 1
    };
  },

  methods: {
    ...mapActions({
      getAfterSalesLists: "trade/getAfterSalesLists",
      AfterSaleseDetails: "trade/AfterSaleseDetails",
      afterExport: "trade/afterExport"
    }),
    pageChange(currentPage) {
      let params = this.isFillter ? this.filterParams : this.currentParam;
      params.status = params.status >= 0 ? params.status : "";
      params.page = currentPage;
      this.getAfterSalesLists(params);
    },
    handleOk() {
      this.visible = false;
    },
    cancel() {},
    details(item) {
      this.AfterSaleseDetails({
        id: item.id
      });
      this.visible = true;
    },
    exportTable() {
      let params = this.isFillter ? this.filterParams : this.currentParam;
      params.status = params.status >= 0 ? params.status : "";
      this.afterExport(params).then(res => {
        const tHeader = res.tHeader;
        const filterVal = res.filterVal;
        const list = res.list;
        const data = this.formatJson(filterVal, list);
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader, //表头 必填
            data, //具体数据 必填
            filename: "售后订单列表", //非必填
            autoWidth: true, //非必填
            bookType: "xlsx" //非必填
          });
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    toSearch() {
      if (!this.searchObj.value) {
        this.$message.info("订单号不能为空");
        return;
      }
      this.currentParam = {};
      this.currentParam.tid = this.searchObj.value;
      this.getAfterSalesLists({
        page: 1,
        tid: this.searchObj.value
      });
    },
    tabClick(active) {
      console.log(active);
      this.exportForm.status = active;
      this.currentAct = active;
      this.currentParam = {};
      this.currentParam.status = active;
      this.isFillter = false;
      this.searchObj.value = "";
      this.getAfterSalesLists({
        page: 1,
        status: active >= 0 ? active : ""
      });
      this.currentPages = 1;
    },
    filterAlert() {
	  this.exportModel = true;
	  this.exportForm={}
    },
    filterOk() {
      this.isFillter = true;
      this.currentAct = this.exportForm.status?this.exportForm.status:'-1';
      this.filterParams = Object.assign({}, this.exportForm);
      this.filterParams.status =
        this.filterParams.status >= 0 ? this.filterParams.status : "";
      this.exportModel = false;
      this.getAfterSalesLists(this.filterParams);
      //初始筛选条件
      this.searchObj.value = "";
      this.exportForm = {
        page: 1,
        status: this.currentAct
      };
      console.log(this.filterParams);
    },
    timeSelect(d, arr) {
      if (arr[0] === arr[1]) {
        arr[0] = arr[0] + " 00:00:00";
        arr[1] = arr[1] + " 23:59:59";
      }
      this.exportForm.created_start = arr[0];
      this.exportForm.created_end = arr[1];
    }
  },
  computed: {
    ...mapState({
      listsData: state => state.trade.afterSalesLists,
      fieldsData: state => state.trade.afterSalesFields,
      pages: state => state.trade.afterSalesPages,
      detail: state => state.trade.afterSalesDetail
    })
  },
  mounted() {
    this.getAfterSalesLists({
      page: 1
    });
  }
};
</script>

<style scoped>
.list-nav {
  display: flex;
  justify-content: space-between;
}
.list-nav button {
  margin-right: 20px;
}
</style>
