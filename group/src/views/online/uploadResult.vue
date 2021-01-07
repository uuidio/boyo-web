<template>
  <div class="content">
    <div class="list-nav mb20">
      <div class="fxBox1">
        <a-button
          type="primary"
          @click="exportTable"
        >导出</a-button>
        <a-button
          v-if="formItem.type === 1 && formItem.uploadType == 2"
          @click="handleConfirmRefund">批量确认返款</a-button>
      </div>
    </div>

    <template v-if="listField&&listField.length>0">
      <a-table
        v-if="formItem.type === 1 && formItem.uploadType == 2"
        :rowSelection="{onChange: onChange,getCheckboxProps: getCheckboxProps}"
        :scroll="{ x: 1600,y:700 }"
        :columns="listField"
        :dataSource="listsData"
        :pagination="false">
        <div slot="action" slot-scope="text, item">
<!--          <a href="javascript:;" @click="goUpdate(item)">修改</a>-->
          <a v-if="item.status == 3 && item.deal_status == 2" href="javascript:;" class="ml10" @click="handleConfirmRefund(item)">确认返款</a>
          <span v-else>---</span>
        </div>
      </a-table>
      <a-table
        v-else
        :scroll="{ x: 1600,y:700 }"
        :columns="listField"
        :dataSource="listsData"
        :pagination="false">
<!--        <div slot="action" slot-scope="text, item">-->
<!--          <a href="javascript:;" @click="goUpdate(item)">修改</a>-->
<!--        </div>-->
      </a-table>
      <div class="pageBox" v-if="listsData.length !== 0">
        <a-pagination
          :total="listsData.length"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="listsData.length"
          v-model="formItem.page"
          @change="pageChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Server from '@/config/server';
import env from '@/config/env';
import { getAccessToken } from '@/utils/util';

export default {
  computed: {
    ...mapState({
      listsData: state => state.online.importLists,
      pages: state => state.online.importListPages,
      listField: state => state.online.importListFields,
      exportData1: state => state.online.exportData1,
    }),
  },
  data() {
    return {
      selectedRows: [],
      uploadResult: {},
      showResult: false,
      formItem: {
        uploadType: '',
        type: '',
        page: 1,
        download: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'online/getImportList',
      wechatCheckUpdate: 'online/wechatCheckUpdate',
      exportFilter: 'online/exportWechatCheck',
      confirmRefund: 'online/confirmRefund',

    }),
    getCheckboxProps: record => ({
      props: {
        disabled: record.deal_status == 5,
        // name: record.name,
      },
    }),
    handleConfirmRefund(item) {
      const arr = [];
      if (item.id) {
        arr.push(item.id);
      } else {
        if (this.selectedRows.length === 0) {
          this.$warning({
            title: '温馨提示！',
            content: '请先选择数据',
          });
          return;
        } else {
          for (let i = 0; i < this.selectedRows.length; i++) {
            if (this.selectedRows[i].status == 3 && this.selectedRows[i].deal_status == 2) {
              arr.push(this.selectedRows[i].id);
            }
          }
        }
      }
      this.confirmRefund({
        deal_status: 5,
        id: arr,
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    exportTable() {
      this.formItem.download = 1;
      this.formItem.callback = this.orderCallback;
      this.getLists();
    },
    orderCallback() {
      this.exportPathMethod(this.exportData1);
    },

    exportPathMethod(TableData) {
      this.$success({
        title: '温馨提示！',
        content: '数据正在导出,请稍后查看下载目录！',
      });
      const fileName = this.formItem.uploadType === 1 ? '微信订单导入' + (this.formItem.type === 1 ? '成功列表' : '失败列表') : '项目交易返款订单导入' + (this.formItem.type === 1 ? '成功列表' : '失败列表');
      const tHeader = TableData.trade.tHeader;
      const filterVal = TableData.trade.filterVal;
      const list = TableData.trade.list;
      const data = this.formatJson(filterVal, list);
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: fileName, // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        });
      });
    },
    getLists() {
      this.fetchLists(this.formItem);
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectedRows = selectedRows;
    },
    pageChange(page) {
      // let params = this.isFillter ? this.filterParams : this.currentParam;
      // params.status = params.status >= 0 ? params.status : '';
      // params.page = page;
      // this.fetchLists(params);
      this.getListsItem.page = page;
      this.getLists();
    },
  },
  mounted() {
    this.formItem.uploadType = this.$route.query.uploadType;
    this.formItem.type = this.$route.query.dataType === 'success' ? 1 : 2;
    this.getLists();
  },
  watch: {

  },
};
</script>

<style scoped lang="stylus">
  >>>.ant-modal-body{
    padding: 0 20px;
  }
  .result-item{
    border-bottom: 1px solid #ddd;
    line-height: 50px;
    &:last-of-type{
      border: 0;
    }
  }
.list-nav {
  display: flex;
  justify-content: space-between;
}
.list-nav button {
  margin-right: 20px;
}
.total{
  text-align:right;
  margin-bottom:10px;
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
