<template>
  <div class="content">
    <div>
      <div class="search-box">
        <searchItem @on-search="getSearch"></searchItem>
      </div>
      <div class="list-nav" style="padding: 15px 10px">
        <div>
          <div class="fxBox1">
            <div class="fxBox1">
              <a-upload
                name="document"
                :multiple="true"
                :action="action1"
                :headers="headers"
                @change="handleChange"
                style="display:inline-block;margin-right:10px"
                :showUploadList="false"
              >
                <a-button> <a-icon type="upload" />微信交易订单导入</a-button>
              </a-upload>
              <!--            <a-upload-->
              <!--              name="document"-->
              <!--              :multiple="true"-->
              <!--              :action="action2"-->
              <!--              :headers="headers"-->
              <!--              @change="handleChange"-->
              <!--              style="display:inline-block;margin-right:10px"-->
              <!--             >-->
              <!--               <a-button> <a-icon type="upload" />微信退款订单导入</a-button>-->
              <!--             </a-upload>-->
              <a-upload
                name="document"
                :multiple="true"
                :action="action3"
                :headers="headers"
                @change="handleChange1"
                style="display:inline-block;margin-right:10px"
                :showUploadList="false"
              >
                <a-button> <a-icon type="upload" />项目交易返款订单导入</a-button>
              </a-upload>
            </div>
            <div>
              <a-button
                type="primary"
                @click="exportTable"
                icon="download"
              >高级导出</a-button>
<!--              <a-button type="primary" @click="filterAlert" icon="filter"-->
<!--              >筛选</a-button>-->
            </div>

          </div>
          <div class="col-red " style="margin-top: 5px;font-size: 15px;">*导入表格格式仅支持xlsx</div>
        </div>
      </div>
    </div>
    <div style="padding: 0 10px;">
      <template v-if="listField&&listField.length>0">
        <a-tabs @tabClick="onGetData" :defaultActiveKey="tabLists[0].key">
          <a-tab-pane v-for="(item) in tabLists" :tab="item.tab" :key="item.key">
            <a-table
              :scroll="{ x: 1600,y:700 }"
              :columns="listField"
              :dataSource="listsData"
              :pagination="false">
              <div slot="action" slot-scope="text, item">
<!--                <a href="javascript:;" @click="goUpdate(item)">修改</a>-->
                <a v-if="item.status == 3 && item.deal_status == 2" href="javascript:;" class="ml10" @click="handleConfirmRefund(item)">确认返款</a>
                <span v-else>---</span>
              </div>
            </a-table>

            <div class="pageBox" v-if="listsData.length !== 0">
              <a-pagination
                :total="pages.total"
                :showTotal="total => `共 ${total} 条数据`"
                :pageSize="pages.per_page"
                v-model="currentPages"
                @change="pageChange"
              />
            </div>
          </a-tab-pane>
        </a-tabs>

      </template>
    </div>
    <a-modal :title="title" v-model="exportModel" @ok="filterOk" @cancel="filterCancel">
      <a-form-item
        label="项目名称:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.gm_id" placeholder="请选择项目" style="width:100%"  @change="changeGm">
          <a-select-option v-for="(item,index) in gmlistData" :value="item.gm_id" :key="index">{{item.platform_name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="店铺名称:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select :value="exportForm.shop_id" placeholder="请选择店铺" style="width:100%" @change="changeShop">
          <a-select-option v-for="(item,index) in shoplist" :value="item.id" :key="index">{{item.shop_name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="对账状态:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.status" placeholder="请选择对账状态" style="width:100%" >
          <a-select-option  value="0" >未对账</a-select-option>
          <a-select-option  value="1" >对账成功</a-select-option>
          <a-select-option  value="2" >对账失败</a-select-option>
        </a-select>
        </a-form-item>
        <a-form-item
          label="处理状态:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
           <a-select v-model="exportForm.deal_status" placeholder="请选择处理状态" style="width:100%" >
              <a-select-option  value="0" >待对账</a-select-option>
              <a-select-option  value="1" >待返款</a-select-option>
              <a-select-option  value="2" >可返款</a-select-option>
<!--              <a-select-option  value="3" >已处理</a-select-option>-->
              <a-select-option  value="4" >不可返款</a-select-option>
              <a-select-option  value="5" >已返款</a-select-option>
           </a-select>
        </a-form-item>
        <a-form-item
          label="微信交易日期:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-range-picker
            :show-time="{ format: 'HH:mm' }"
            format="YYYY-MM-DD HH:mm"
            :placeholder="['开始时间', '结束时间']"
            @change="timeChange"
            @ok="timeOk"
            v-if="timeVisible"
          />
        </a-form-item>
      <a-form-item
        label="微信退款日期:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-range-picker
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @change="timeChange3"
          v-if="timeVisible"
        />
      </a-form-item>
        <a-form-item
          label="处理日期:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
        <a-range-picker
          :show-time="{ format: 'HH:mm' }"
          format="YYYY-MM-DD HH:mm"
          :placeholder="['开始时间', '结束时间']"
          @change="timeChange2"
          @ok="timeOk2"
          v-if="timeVisible"
        />
      </a-form-item>
      <a-form-item
        label="交易类型:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.trade_type" placeholder="请选择交易类型" style="width:100%" >
          <a-select-option  value="TRADE" >交易</a-select-option>
          <a-select-option  value="REFUND" >退款</a-select-option>
        </a-select>
        </a-form-item>
      <a-form-item
        label="异常原因:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.abnormal_reason_text" placeholder="请选择异常原因" style="width:100%" >
          <a-select-option  value="1" >重复</a-select-option>
          <a-select-option  value="2" >数据为空</a-select-option>
          <a-select-option  value="3" >数据不匹配</a-select-option>
          <a-select-option  value="4" >无交易订单</a-select-option>
          <a-select-option  value="5" >金额不匹配</a-select-option>
        </a-select>
        </a-form-item>
    </a-modal>
    <a-modal title="处理状态" v-model="visable" @ok="updateOk" @cancel="updateCancel">
      <a-form-item
        label="处理状态:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="submitParams.deal_status" placeholder="请选择处理状态" style="width:100%" >
          <a-select-option  value="3" >已处理</a-select-option>
        </a-select>
      </a-form-item>
    </a-modal>
    <!--导入结果-->
    <a-modal
      v-model="showResult"
      :title="uploadType === 1 ? '微信订单导入结果' : '项目交易返款订单导入结果'"
      @cancel="handleOk"
    >
      <div class="result-item fxBox2" v-if="uploadResult && uploadResult.success > 0">
        <div>{{uploadType === 1 ? '微信交易订单导入成功' : '返款账单导入成功'}}：{{uploadResult.success}}条数据</div>
        <div>
          <a href="javascript:;" class="mr10" @click="goDetails('success')">查看</a>
          <a href="javascript:;" @click="downLoad(1)">下载</a>
        </div>
      </div>
      <div class="result-item fxBox2" v-if="uploadResult && uploadResult.error > 0">
        <div>{{uploadType === 1 ? '微信交易订单导入异常' : '返款账单导入异常'}}：{{uploadResult.error}}条数据</div>
        <div>
          <a href="javascript:;" class="mr10" @click="goDetails('error')">查看</a>
          <a href="javascript:;" @click="downLoad(2)">下载</a>
        </div>
      </div>
      <div class="result-item fxBox2" v-if="uploadResult && uploadResult.abnormal > 0">
        <div>{{uploadType === 1 ? '微信交易订单导入商户订单号不匹配' : '返款账单导入商户订单号不匹配'}}：{{uploadResult.abnormal}}条数据</div>
        <div>
        </div>
      </div>
      <div class="result-item fxBox2" v-if="uploadResult && uploadResult.repeat > 0">
        <div>{{uploadType === 1 ? '微信交易订单导入数据重复' : '返款账单导入数据重复'}}：{{uploadResult.repeat}}条数据</div>
        <div>
        </div>
      </div>

      <div slot="footer" class="fxBox2">
        <span></span>
        <a-button type="primary" @click="handleOk">
          确定
        </a-button>
      </div>
    </a-modal>
    <!--上传进度-->
    <a-modal
      v-model="showProgress"
      title="正在导入"
    >
      <div class="mt10 mb10">
        <a-progress :percent="percent" size="small" status="active" />
      </div>
      <div slot="footer" class="fxBox2">
        <span></span>
        <a-button @click="closeProgress">
          取消
        </a-button>
      </div>
    </a-modal>

  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Server from '@/config/server';
import env from '@/config/env';
import { getAccessToken } from '@/utils/util';
import searchItem from './components/search';

// const tabLists = [
//   { tab: '全部', key: '' },
//   { tab: '未对账', key: 0 },
//   { tab: '对账成功', key: 1 },
//   { tab: '对账失败', key: 2 },
// ];
export default {
  computed: {
    ...mapState({
      listsData: state => state.online.chatCheckData,
      pages: state => state.online.chatCheckPages,
      listField: state => state.online.chatCheckFields,
      exportData: state => state.online.exportData,
      shoplist: state => state.shop.lists,
      gmlistData: state => state.project.lists,
      dataCount: state => state.online.dataCount,
      exportData1: state => state.online.exportData1,
      tabLists() {
        const arr = [];
        for (let key in this.dataCount) {
          switch (key) {
            case 'all':
              arr.push({
                tab: '全部（' + this.dataCount[key] + '）',
                key: '',
              });
              break;
            case 'wait_do':
              arr.push({
                tab: '未对账（' + this.dataCount[key] + '）',
                key: 0,
              });
              break;
            case 'wechat_success':
              arr.push({
                tab: '微信对账成功（' + this.dataCount[key] + '）',
                key: 1,
              });
              break;
            case 'wechat_failure':
              arr.push({
                tab: '微信对账失败（' + this.dataCount[key] + '）',
                key: 2,
              });
              break;
            case 'pro_success':
              arr.push({
                tab: '项目返款对账成功（' + this.dataCount[key] + '）',
                key: 3,
              });
              break;
            case 'pro_failure':
              arr.push({
                tab: '项目返款对账失败（' + this.dataCount[key] + '）',
                key: 4,
              });
              break;
            default:
          }
        }
        return arr;
      },
    }),
  },
  components: {
    searchItem,
  },
  data() {
    return {
      percent: 0,
      showProgress: false,
      dataType: '',
      uploadResult: {},
      uploadType: 1,
      showResult: false,
      // tabLists,
      getListsItem: {
        status: '',
        page: 1,
      },
      searchOptions: {},

      action1: env.baseURL + Server.action.wechat_trade_import,
      action2: env.baseURL + Server.action.wechat_refund_import,
      action3: env.baseURL + Server.action.wechat_project_import,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      searchObj: {
        select: 'name',
        param: {},
        value: '',
      },
      exportForm: {
        page: '1',
        shop_id: '',
      },
      currentParam: {},
      filterParams: {},
      exportModel: false,
      isFillter: false,
      currentAct: '-1',
      currentPages: 1,
      title: '成本结算列表筛选',
      timeVisible: true,
      visable: false,
      shopParams: {
        per_page: 1000000,
        is_open: 1,
      },
      submitParams: {
        id: '',
        deal_status: '',
      },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'online/wechatCheckLists',
      wechatCheckUpdate: 'online/wechatCheckUpdate',
      exportFilter: 'online/exportWechatCheck',
      fetchShopLists: 'shop/fetchLists',
      gmfetchLists: 'project/fetchLists',
      getImportList: 'online/getImportList',
      confirmRefund: 'online/confirmRefund',
    }),
    handleConfirmRefund(item) {
      this.confirmRefund({
        deal_status: 5,
        id: [item.id],
      });
    },
    closeProgress() {
      this.showProgress = false;
    },
    downLoad(type) {
      this.dataType = type;
      const obj = {
        uploadType: this.uploadType,
        type: type,
        download: 1,
        callback: this.orderCallback1,
      }
      this.getImportList(obj);
    },
    orderCallback1() {
      this.exportPathMethod1(this.exportData1);
    },

    exportPathMethod1(TableData) {
      this.$success({
        title: '温馨提示！',
        content: '数据正在导出,请稍后查看下载目录！',
      });
      const fileName = this.uploadType === 1 ? '微信订单导入' + (this.dataType === 1 ? '成功列表' : '失败列表') : '项目交易返款订单导入' + (this.dataType === 1 ? '成功列表' : '失败列表');
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
    goDetails(status) {
      const jumpUrl = '/online/uploadResult';
      const routeData = this.$router.resolve({
        path: jumpUrl,
        query: {
          uploadType: this.uploadType,
          dataType: status,
        },
      });
      window.open(routeData.href, '_blank');
      // this.$router.push({ path: jumpUrl });
    },
    handleOk() {
      this.showResult = false;
      location.reload();
    },
    onGetData(key) {
      this.getListsItem.status = key;
      this.getListsItem.page = 1;
      this.getLists();
    },
    getLists() {
      const obj1 = this.getListsItem;
      const obj2 = this.searchOptions;
      const obj = Object.assign(obj2, obj1);
      this.fetchLists(obj);
    },
    getSearch(item) {
      this.searchOptions = item;
      this.getListsItem.page = 1;
      this.getLists();
    },
    changeShop(id) {
      this.exportForm.shop_id = id;
      this.$forceUpdate(); // 强制刷新数据
    },
    changeGm(id) {
      this.exportForm.shop_id = '';
      const obj1 = this.shopParams;
      const obj2 = { gm_id: id };
      const obj = Object.assign(obj1, obj2);
      this.fetchShopLists(obj);
    },
    handleChange(info) {
      this.uploadType = 1;
      this.handleShowResult(info);
    },
    handleChange1(info) {
      this.uploadType = 2;
      this.handleShowResult(info);
    },
    handleShowResult(info) {
      this.percent = Math.ceil(90 + 9 * Math.random());
      this.showProgress = true;
      // if (info.event) {
      //   this.percent = info.event.percent;
      // }
      if (info.file.status !== 'uploading') {
        // console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        const that = this;
        setTimeout(() => { that.percent = 100; }, 1000)
        setTimeout(() => {
          that.showProgress = false;
          // this.$message.success(`${info.file.name} 文件上传成功！`);
          if (info.file.response.code === 0) {
            that.uploadResult = info.file.response.result;
            that.showResult = true;
          } else {
            console.log(info.file.response);
          }
        }, 1500);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} 文件上传失败！`);
      }
    },
    pageChange(page) {
      // let params = this.isFillter ? this.filterParams : this.currentParam;
      // params.status = params.status >= 0 ? params.status : '';
      // params.page = page;
      // this.fetchLists(params);
      this.getListsItem.page = page;
      this.getLists();
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    goUpdate(item) {
      this.visable = true;
      this.submitParams.id = item.id;
    },
    exportTable() {
      this.exportModel = true;
      this.type = 'export';
      this.title = '对账单列表导出';
      this.timeVisible = false;
      this.exportForm = {};
      this.$nextTick(() => {
        this.timeVisible = true;
      });
    //   let params = this.isFillter ? this.filterParams : this.currentParam;
    //   params.status = params.status >= 0 ? params.status : "";
    //   this.afterExport(params).then(res => {
    //     const tHeader = res.tHeader;
    //     const filterVal = res.filterVal;
    //     const list = res.list;
    //     const data = this.formatJson(filterVal, list);
    //     import("@/vendor/Export2Excel").then(excel => {
    //       excel.export_json_to_excel({
    //         header: tHeader, //表头 必填
    //         data, //具体数据 必填
    //         filename: "商家端退货列表", //非必填
    //         autoWidth: true, //非必填
    //         bookType: "xlsx" //非必填
    //       });
    //     });
    //   });
    },
    dataHandleOk() {
      let that = this
      if (Object.keys(this.exportForm).length == 0) {
        this.$warning({
          title: '温馨提示！',
          content: '需选择导出条件才可导出数据',
        });
      } else {
        this.exportLoading = true
        this.exportFilter({ exportForm: this.exportForm }); // 请求数据
      }
    },
    orderCallback() {
      this.exportLoading = false;
      this.dataVisible = false;
      // this.orderStatusBool = false
      this.exportPathMethod(this.exportData);
      this.exportForm = {};
      this.timeItem = {};
      this.timeHide = false;
    },
    exportPathMethod(TableData) {
      this.$success({
        title: '温馨提示！',
        content: '数据正在导出,请稍后查看下载目录！',
      });
      const tHeader = TableData.goods.tHeader;
      const filterVal = TableData.goods.filterVal;
      const list = TableData.goods.list;
      const data = this.formatJson(filterVal, list);
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '平台端对账单列表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        });
      });
    },
    tabClick(active) {
      this.exportForm.status = active;
      this.currentAct = active;
      this.currentParam = {};
      this.currentParam.status = active;
      this.isFillter = false;
      this.searchObj.value = '';
      this.fetchLists({
        page: 1,
        status: active >= 0 ? active : '',
      });
      this.currentPages = 1;
    },
    filterAlert() {
      this.exportModel = true;
      this.type = 'search';
      this.title = '对账订单列表筛选';
      this.timeVisible = false;
      this.exportForm = {};
      this.$nextTick(() => {
        this.timeVisible = true;
      });
    },
    filterOk() {
      this.isFillter = true;
      this.currentAct = this.exportForm.status;
      this.filterParams = Object.assign({}, this.exportForm);
      this.filterParams.status = this.filterParams.status >= 0 ? this.filterParams.status : '';
      this.exportModel = false;
      if (this.type == 'search') {
        this.fetchLists(this.filterParams);
      } else {
        this.dataHandleOk();
      }
      // 初始筛选条件
      this.searchObj.value = '';
      this.exportForm = {
        page: 1,
        status: this.currentAct,
        shop_id: '',
        gm_id: '',
      };
    },
    filterCancel() {
      this.exportForm.created_start = '';
      this.exportForm.created_end = '';
    },
    timeChange(value, dateString) {
      // console.log('Selected Time: ', value);
      // console.log('Formatted Selected Time: ', dateString);
      this.exportForm.trade_at_start = dateString[0];
      this.exportForm.trade_at_end = dateString[1];
    },
    timeChange3(value, dateString) {
      this.exportForm.refund_at_start = dateString[0];
      this.exportForm.refund_at_end = dateString[1];
    },
    timeOk(value) {
      // console.log('onOk: ', value);
    },
    timeChange2(value, dateString) {
      this.exportForm.updated_at_start = dateString[0];
      this.exportForm.updated_at_end = dateString[1];
    },
    timeOk2(value) {
      // console.log('onOk: ', value);
    },
    updateCancel() {
      this.submitParams = {};
      this.visable = false;
    },
    updateOk() {
      this.wechatCheckUpdate(this.submitParams);
    },
  },
  mounted() {
    this.getLists()
    this.gmfetchLists(this.shopParams);
    this.fetchShopLists(this.shopParams);
  },
  watch: {
    exportData() {
      this.orderCallback();
    },
  },
};
</script>

<style scoped lang="stylus">
  /*>>>.ant-tabs-nav .ant-tabs-tab*/
  /*  margin-right 10px*/
  /*  padding 12px 10px*/

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
  .search-box{
    background: #F2F2F2;
    padding: 15px 10px;
  }
.list-nav {
  display: flex;
  justify-content: space-between;
  margin-bottom: 0px;
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
