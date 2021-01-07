<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <a-button type="primary" icon="plus" @click="addModel"
          >添加物流公司</a-button
        >
        <div>
          <a-select
            slot="addonBefore"
            defaultValue="公司全名"
            @select="selectSearch"
            v-model="searchObj.select"
          >
            <a-select-option value="name">公司名称</a-select-option>
            <a-select-option value="code">公司代码</a-select-option>
            <a-select-option value="all">显示全部</a-select-option>
          </a-select>
          <a-input-search
            enterButton
            :placeholder="searchObj.tip"
            style="width:400px;"
            @search="logSearch"
            v-model="searchObj.value"
          />
        </div>
      </div>
    </div>
   <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }"
        :columns="listField"
        :dataSource="listData"
        :loading="loadingState"
        :pagination="false"
      >
        <div slot="action" slot-scope="text, record">
          <a-button type="primary" @click="editModel(record)" class="mr10"
            >编辑</a-button
          >
          <a-button type="danger" @click="del(record)" class="mr10"
            >删除</a-button
          >
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
    <a-modal
      title="添加物流公司"
      v-model="addVisible"
      @ok="addHandleOk"
      @cancel="cancel"
    >
      <a-form layout="horizontal">
        <a-form-item
          required
          label="物流公司代码："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.corp_code"
            placeholder="请输入物流公司代码"
          />
        </a-form-item>
        <a-form-item
          required
          label="物流公司简称："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.corp_name"
            placeholder="请输入物流公司简称"
          />
        </a-form-item>
        <a-form-item
          required
          label="物流公司全名："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.full_name"
            placeholder="请输入物流公司全名"
          />
        </a-form-item>
        <a-form-item
          label="物流公司网址："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.website"
            placeholder="请输入物流公司网址"
          />
        </a-form-item>
        <a-form-item
          label="查询接口网址："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.request_url"
            placeholder="请输入查询接口网址"
          />
        </a-form-item>
        <a-form-item
          label="排序："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="addFromItem.order_sort"
            placeholder="请输入排序 (不填默认为0)"
          />
        </a-form-item>
      </a-form>
    </a-modal>
    <a-modal
      title="编辑物流公司"
      v-model="editVisible"
      @ok="editHandleOk"
      @cancel="cancel"
    >
      <a-form layout="horizontal">
        <a-form-item
          required
          label="物流公司代码："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.corp_code"
            placeholder="请输入物流公司代码"
          />
        </a-form-item>
        <a-form-item
          required
          label="物流公司简称："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.corp_name"
            placeholder="请输入物流公司简称"
          />
        </a-form-item>
        <a-form-item
          required
          label="物流公司全名："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.full_name"
            placeholder="请输入物流公司全名"
          />
        </a-form-item>
        <a-form-item
          label="物流公司网址："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.website"
            placeholder="请输入物流公司网址"
          />
        </a-form-item>
        <a-form-item
          label="查询接口网址："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.request_url"
            placeholder="请输入查询接口网址"
          />
        </a-form-item>
        <a-form-item
          label="排序："
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input
            v-model="editFromItem.order_sort"
            placeholder="请输入排序 (不填默认为0)"
          />
        </a-form-item>
        <a-form-item
          label="显示"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-switch
            checkedChildren="开"
            unCheckedChildren="关"
            :v-model="editFromItem.is_show > 0"
            @change="isOpen"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import { setTimeout } from "timers";

export default {
  name: "logisticsLists",
  computed: {
    ...mapState({
      listData: state => state.trade.logisticsData,
      listField: state => state.trade.logisticsFields,
      pages: state => state.trade.logisticsPages
    })
  },
  data() {
    return {
      status: 0,
      loadingState: false, //列表加载状态
      addVisible: false,
      editVisible: false,
      addFromItem: {
        corp_code: "",
        corp_name: "",
        full_name: "",
        website: "",
        request_url: "",
        order_sort: ""
      },
      editFromItem: {
        id: "",
        corp_code: "",
        corp_name: "",
        full_name: "",
        website: "",
        request_url: "",
        order_sort: "",
        is_show: 0,
        temp_show: false
      },
      searchObj: {
        tip: "请输入物流公司名称",
        select: "name",
        param: {},
        value: ""
      }
    };
  },
  methods: {
    ...mapActions({
      logisticsLists: "trade/logisticsLists",
      logisticsDel: "trade/logisticsDel",
      logisticsAdd: "trade/logisticsAdd",
      logisticsEdit: "trade/logisticsEdit"
    }),
    // 搜索
    orderSearch(value) {
      this.fetchLists({
        tid: value
        // page: 1,
      });
    },
    selectSearch(value) {
      if (value === "all") {
        this.logisticsLists({ page: 1 });
        setTimeout(() => {
          this.searchObj.select = "name";
          this.searchObj.value = "";
          this.searchObj.tip = "请输入物流公司名称";
        }, 100);
        return;
      }
      if (value === "name") {
        this.searchObj.tip = "请输入物流公司名称";
      } else {
        this.searchObj.tip = "请输入物流公司代码";
      }
      this.searchObj.select = value;
    },
    //添加物流
    addHandleOk() {
      this.loadingState = true;
      if (this.addFromItem.order_sort == "") {
        this.addFromItem.order_sort = 0;
        this.logisticsAdd(this.addFromItem);
      }
      setTimeout(() => {
        this.addVisible = false;
        (this.addFromItem = {
          corp_code: "",
          corp_name: "",
          full_name: "",
          website: "",
          request_url: "",
          order_sort: ""
        }),
          this.logisticsLists({ page: 1 });
        this.loadingState = false;
      }, 500);
    },
    addModel() {
      this.addVisible = true;
    },
    cancel() {},
    pageChange(page) {
      this.logisticsLists({
        status: this.status,
        page: page
      });
    },
    //删除物流
    del(item) {
      if (confirm("确认删除该物流公司？")) {
        this.logisticsDel({
          id: item.id
        });
        this.loadingState = true;
        setTimeout(() => {
          this.logisticsLists({ page: 1 });
          this.loadingState = false;
        }, 500);
      }
    },
    //编辑物流
    editModel(item) {
      this.editVisible = true;
      let keyArr = Object.keys(this.editFromItem);
      keyArr.map(keyItem => {
        this.editFromItem[keyItem] = item[keyItem];
      });
    },
    isOpen(check) {
      this.editFromItem.is_show = check ? 1 : 0;
    },
    //编辑确定
    editHandleOk() {
      this.loadingState = true;
      if (this.editFromItem.order_sort == "") {
        this.editFromItem.order_sort = 0;
      }
      this.logisticsEdit(this.editFromItem);
      setTimeout(() => {
        this.editVisible = false;
        (this.editFromItem = {
          id: "",
          corp_code: "",
          corp_name: "",
          full_name: "",
          website: "",
          request_url: "",
          order_sort: ""
        }),
          this.logisticsLists({ page: 1 });
        this.loadingState = false;
      }, 500);
    },
    logSearch(value) {
      if (this.searchObj.select === "name") {
        this.searchObj.param = {
          full_name: value
        };
      } else {
        this.searchObj.param = {
          corp_code: value
        };
      }
      this.logisticsLists(this.searchObj.param);
    }
  },
  mounted() {
    this.logisticsLists({ page: 1 });
  }
};
</script>

<style scoped>
.list-nav {
  display: flex;
  justify-content: space-between;
}
</style>
