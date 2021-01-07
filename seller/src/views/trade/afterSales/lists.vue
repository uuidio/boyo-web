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
	<template v-if="listField&&listField.length>0">
    <a-tabs @tabClick="tabClick" v-model="currentAct">
      <a-tab-pane
        :tab="item.title"
        :key="item.key"
        v-for="(item, index) in afterStatus"
      >
        <a-table :scroll="{x:1600,y:700}"
          :columns="listField"
          :dataSource="listsData"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, item">
            <a href="javascript:;" @click="goDetails(item)">查看</a>
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
        label="生成时间:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-range-picker @change="timeSelect" showTime.defaultValue="00:00:00" />
      </a-form-item>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      listsData: state => state.afterSales.afterSales,
      pages: state => state.afterSales.pages,
      listField: state => state.afterSales.fields
    })
  },
  data() {
    return {
      getData: {
        page: 1
      },
      searchObj: {
        select: "name",
        param: {},
        value: ""
      },
      exportForm: {
        status: "",
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
      fetchLists: "afterSales/fetchLists",
      afterExport: "trade/afterExport"
    }),
    pageChange(page) {
      let params = this.isFillter ? this.filterParams : this.currentParam;
      params.status = params.status >= 0 ? params.status : "";
      params.page = page;
      this.fetchLists(params);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    goDetails(item) {
      const jumpUrl = `/trade/afterSales/detail/${item.aftersales_bn}`;
      let routeData = this.$router.resolve({ path: jumpUrl });
      window.open(routeData.href, "_blank");
      // this.$router.push({ path: jumpUrl });
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
	  this.$nextTick(()=>{
		  this.exportForm={}
	  })
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
      this.fetchLists({
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
      this.fetchLists({
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
      this.fetchLists(this.filterParams);
      //初始筛选条件
      this.searchObj.value = "";
      this.exportForm = {
        page: 1,
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
  mounted() {
    this.fetchLists({
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
