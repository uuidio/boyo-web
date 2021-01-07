<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10">
        <a-button class="mr10" icon="download" type="primary" @click="selectBtn"
          >导出勾选的数据</a-button
        >
        <a-button class="mr10" type="primary" @click="excelModelShow"
          >高级导出</a-button
        >
      </div>
      <div>
        <a-input-search
          enterButton
          placeholder="请输入订单号搜素"
          style="width: 18rem;"
          @search="orderSearch"
        />
      </div>
    </div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="fieldsData&&fieldsData.length>0">
    <a-tabs defaultActiveKey="待退款" @change="changeTab">
      <a-tab-pane :key="item" :tab="item" v-for="(item, index) in tabsArr">
        <a-table :scroll="{ x: 2800,y:700 }"
          :rowSelection="{ onChange: onChange }"
          class="mr10"
          :rowKey="record => record.id"
          :columns="fieldsData"
          :dataSource="listsData"
          :pagination="false"
        >
          <a-table
            :columns="item.trade_order.field"
            :dataSource="item.trade_order.data"
            slot="expandedRowRender"
            slot-scope="item, index, text"
            :pagination="false"
          >
            <a
              slot="goods_image"
              target="_blank"
              slot-scope="text"
              :href="text"
            >
              <img height="50px" :src="text" alt="" />
            </a>
          </a-table>
          <div
            v-if="
              item.status == '3' || item.status == '5' || item.status == '6'
            "
            slot="action"
            slot-scope="text, item"
          >
            <!-- <a href="javascript:;" @click="edit(item)">退款</a><br />
            <a
              href="javascript:;"
              v-if="item.status == '3'"
              @click="rejectRefund(item)"
              >驳回退款</a
            > -->
            待退款
          </div>
          <div v-else-if="item.status == '1'">
            已退款 <br />
            <a
              href="javascript:;"
              @click="checkInfo(item)"
              v-if="item.trade_type === 'offline'"
              >退款信息</a
            >
          </div>
          <div v-else-if="item.status == '2'">已驳回</div>
        </a-table>
      </a-tab-pane>
    </a-tabs>

    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :pageSize="pages.per_page"
        v-model="currentPage"
        @change="pageChange"
      />
    </div>
	</template>
    <a-modal
      title="请按需选择导出的内容"
      :confirmLoading="exportLoading"
      v-model="dataVisible"
      okText="导出"
      @ok="dataHandleOk"
      @cancel="dataCancel"
    >
      <a-form layout="horizontal">
        <!-- <a-form-item label="订单状态:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">
                    <a-select v-model="exportForm.status" placeholder="请选择订单状态" allowClear>
                        <a-select-option value="WAIT_BUYER_PAY">待付款</a-select-option>
                        <a-select-option value="WAIT_SELLER_SEND_GOODS">待发货</a-select-option>
                        <a-select-option value="WAIT_BUYER_CONFIRM_GOODS">待收货</a-select-option>
                        <a-select-option value="TRADE_FINISHED">已完成</a-select-option>
                        <a-select-option value="TRADE_CLOSED">已关闭</a-select-option>
                        <a-select-option value="TRADE_CLOSED_BY_SYSTEM">系统关闭</a-select-option>
                    </a-select>
                </a-form-item> -->
		<a-form-item
          label="项目名称:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
            <a-select v-model="exportForm.gm_id" placeholder="请选择项目"  >
              <a-select-option v-for="(item,index) in gmlistData" :value="item.gm_id" :key="index">{{item.platform_name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item
          label="店铺名称:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
           <a-select v-model="exportForm.shop_id" placeholder="请选择店铺"  >
              <a-select-option v-for="(item,index) in shoplist" :value="item.id" :key="index">{{item.shop_name}}</a-select-option>
            </a-select>
        </a-form-item>
        <a-form-item
          label="手机号:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-input v-model="exportForm.mobile" placeholder="请输入手机号" />
        </a-form-item>
        <a-form-item
          label="退款状态:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-select
            v-model="exportForm.status"
            placeholder="请选择退款状态"
            allowClear
          >
            <!-- <a-select-option value="NO_APPLY_CANCEL">无取消</a-select-option>
            <a-select-option value="WAIT_PROCESS">等待审核</a-select-option>
            <a-select-option value="REFUND_PROCESS">正在退款</a-select-option>
            <a-select-option value="SUCCESS">成功</a-select-option>
            <a-select-option value="FAILS">失败</a-select-option> -->
			<a-select-option :value="1">待退款</a-select-option>
			<a-select-option :value="2">已退款</a-select-option>
          </a-select>
        </a-form-item>
		<a-form-item
          label="退款时间:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
			 <a-range-picker
				:show-time="{ format: 'HH:mm' }"
				format="YYYY-MM-DD HH:mm"
				@change="timeChange"
				@ok="timeOk"
				v-if="timeVisible"
				/>
		</a-form-item>
        <!-- <a-form-item
          label="提货方式:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-select
            v-model="exportForm.pick_type"
            placeholder="请选择提货方式"
            allowClear
          >
            <a-select-option value="0">快递</a-select-option>
            <a-select-option value="1">自提</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="筛选时间:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
          <a-select
            @change="timeType"
            v-model="timeItem.type"
            placeholder="请选择时间类型"
            allowClear
          >
            <a-select-option value="pay_time">支付时间</a-select-option>
            <a-select-option value="end_time">完成时间</a-select-option>
            <a-select-option value="created_at">生成时间</a-select-option>
          </a-select>
          <div class="timeHide" v-if="timeHide">
            <a-range-picker @change="timeSelect" />
            <h4 style="line-height: 1.2em;">
              <a-icon
                style="color: red;margin-right: 5px;"
                type="exclamation-circle"
              />
              开始时间和结束时间必填,否则导出数据为空
            </h4>
          </div>
        </a-form-item> -->
      </a-form>
    </a-modal>

  </div>
</template>

<script>
 import {
    mapState,
    mapActions,
  } from 'vuex';
import http from "@/api/http";
import Server from "@/config/server";

export default {
  name: "aftersales",
  data() {
    return {
      tabsArr: ["待退款", "已退款"],
      listStatus: 1,
      currentPage: 1,
      editVisible: false,
      selectLists: [],
      dataVisible: false, // 导出弹窗
      exportLoading: false, // 导出加载状态
      timeHide: false, // 导出时间hide
      fromitem: {
        refunds_id: "",
        tid: "",
        shop_id: "",
        user_id: "",
        money: "",
        total_price: "",
        refund_type: "offline",
        refund_bank: "",
        receive_bank: "",
        refund_account: "",
        receive_account: "",
        refund_people: "",
        beneficiary: "",
        payment_id: ""
      },
      timeItem: {},
      exportForm: {},
	  showInfo: false,
	  shopParams: {
           per_page: 1000000,
           is_open: 1,
		 },
		 timeVisible:true,
    };
  },

  methods: {
    ...mapActions({
      refundsLists: "trade/refundsLists",
      editDorefund: "trade/editDorefund",
      exportFilter: "trade/exportRefunds",
      refundsPay: "trade/refundsPay",
      resetSellerRefund: "trade/resetSellerRefund",
	  getOffLineInfo: "trade/getOffLineInfo",
	   gmfetchLists: 'project/fetchLists',
	   fetchLists: 'shop/fetchLists',
	}),
	timeChange(value, dateString) {
      console.log('Selected Time: ', value);
	  console.log('Formatted Selected Time: ', dateString);
	  this.exportForm.refund_at_start = dateString[0];
		this.exportForm.refund_at_end = dateString[1];
    },
    timeOk(value) {
      console.log('onOk: ', value);
    },
    // 日期类型
    timeType(value) {
      if (value == undefined) {
        this.timeHide = false;
        this.timeItem = {};
        delete this.exportForm.time;
      } else {
        this.timeHide = true;
        this.timeItem.type = value;
        this.timeItem.from = "";
        this.timeItem.to = "";
        this.exportForm.time = this.timeItem;
      }
    },
    // 日期选择
    timeSelect(date, dateString) {
      this.timeItem.from = dateString[0];
      this.timeItem.to = dateString[1];
      this.exportForm.time = this.timeItem;
    },
    allCurrent() {
      this.export2Excel(this.listsData);
    },
    selectBtn() {
      if (this.selectLists.length == 0) {
        this.$warning({
          title: "温馨提示！",
          content: "请勾选需要导出的数据"
        });
      } else {
        this.export2Excel(this.OneDimensionalArray(this.selectLists, true));
        this.$success({
          title: "温馨提示！",
          content: "数据正在导出,请稍后查看下载目录！"
        });
      }
      this.dataVisible = false;
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    export2Excel(lists) {
      const field = []; // 标题
      const filter = []; // 内容过滤
      const list = lists;
      this.fieldsData.forEach((item, i) => {
        field.push(item.title);
        filter.push(item.dataIndex);
      });
      field.splice(field.length - 1, 1);
      filter.splice(filter.length - 1, 1);
      const data = this.formatJson(filter, list);
      import("@/vendor/Export2Excel").then(excel => {

        excel.export_json_to_excel({
          header: field, //表头 必填
          data, //具体数据 必填
          filename: "平台退款订单列表", //非必填
          autoWidth: true, //非必填
          bookType: "xlsx" //非必填
        });
      });
      this.dataVisible = false;
    },
    excelModelShow() {
	  this.dataVisible = true;
	   this.timeVisible=false
	  this.$nextTick(()=>{
		  this.timeVisible=true
	  })
    },
    onChange(selectedRowKeys, selectedRows) {
      let status = this.listStatus
      if (!this.selectLists[status-1]) {
        this.selectLists[status-1] = [];
      }
      this.selectLists[status-1][this.currentPage - 1] = selectedRows;
    },
    dataHandleOk() {
      const that = this;
      if (this.exportForm.mobile == "") delete this.exportForm.mobile;
      if (Object.keys(this.exportForm).length == 0) {
        this.$warning({
          title: "温馨提示！",
          content: "需选择导出条件才可导出数据"
        });
      } else {
        this.exportLoading = true;
        let obj = {
          exportForm:this.exportForm
        };
        this.exportFilter(obj); // 请求数据
        // console.log(this.exportForm);
        // setTimeout(() => {
        //   this.exportLoading = false;
        //  this.dataVisible = false;

		//   this.exportPathMethod(this.exportData);
		//   console.log('导出开始',this.exportData);
        //   this.exportForm = {};
        //   this.timeItem = {};
        //   this.timeHide = false;
        // }, 1000);
      }
	},
	orderCallback() {
      this.exportLoading = false
      this.dataVisible = false
      // this.orderStatusBool = false
      this.exportPathMethodExcel(this.exportData)
      this.exportForm = {}
      this.timeItem = {}
      this.timeHide = false
    },
    exportPathMethod(data) {

       const mainLists = data.order; // 主表


      // 一级表
      const mainTitle = mainLists.tHeader; // 一级标题
      const mainTitleForKey = mainLists.filterVal; // 一级过滤
      const mainList = mainLists.list; // 一级数据

      const mainStr = [];
      mainStr.push(`${mainTitle.join("\t,")}\n`); // 标题添加上换列转成字符串并存进数组
      for (var i = 0; i < mainList.length; i++) {
        const temp = [];
        for (var j = 0; j < mainTitleForKey.length; j++) {
          temp.push(mainList[i][mainTitleForKey[j]]); // 根据过滤器拿出对应的值
        }
        mainStr.push(`${temp.join("\t,")}\n`); // 取出来的值加上逗号换列转字符串存数组
      }
      // ["标题","内容"]
      // console.log(JSON.stringify(mainStr.join("")));//打印文本

      // 二级表
      let merged=''
      if(data.trade){
        const subLists = data.trade; // 副表
        const subTitle = subLists.tHeader; // 二级标题
        const subTitleForKey = subLists.filterVal; // 二级过滤
        const subData = subLists.list; // 二级数据
        const subStr = [];
        subStr.push(`${subTitle.join("\t,")}\t\n`);
        for (var i = 0; i < subData.length; i++) {
          const temp = [];
          for (var j = 0; j < subTitleForKey.length; j++) {
            temp.push(subData[i][subTitleForKey[j]]);
          }
          subStr.push(`${temp.join("\t,")}\t\n`);
        }
          // 两个表数组转成字符串合并
          merged  = `${mainStr.join("")}\n\n${subStr.join("")}`;
          console.log(JSON.stringify(merged));
      }else{
             merged = `${mainStr.join("")}`;
      }
      // encodeURIComponent解决中文乱码
      const uri = `data:text/csv;charset=utf-8,\ufeff${encodeURIComponent(
        merged
      )}`;
      // 通过创建a标签实现
      const link = document.createElement("a");
      link.href = uri;
      // 对下载的文件命名
      link.download = "平台退款列表.csv";
      document.body.appendChild(link);
      link.click();
	},
	exportPathMethodExcel(TableData) {
		this.$success({
			title: '温馨提示！',
			content: '数据正在导出,请稍后查看下载目录！',
		});
		console.log('11',TableData);
		const tHeader = TableData.order.tHeader;
		const filterVal = TableData.order.filterVal;
		const list = TableData.order.list;
		const data = this.formatJson(filterVal, list);
		import("@/vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
			header: tHeader, //表头 必填
			data, //具体数据 必填
			filename: "平台退款列表", //非必填
			autoWidth: true, //非必填
			bookType: "xlsx" //非必填
			});
		});
	},
	formatJson(filterVal, jsonData) {
			return jsonData.map(v => filterVal.map(j => v[j]));
		},
    dataCancel() {
	  this.dataVisible = false;
	  this.exportForm.refund_at_start=''
		this.exportForm.refund_at_end=''
    },
    orderSearch(value) {
      this.refundsLists({
        tid: value,
        page: 1
      });
    },
    pageChange(page) {
      this.refundsLists({ page: page, status: this.listStatus });
    },
    edit(item) {
      this.editVisible = true;
      this.fromitem.refunds_id = item.id;
      this.fromitem.tid = item.tid;
      this.fromitem.shop_id = item.shop_id;
      this.fromitem.user_id = item.user_id;
      this.fromitem.money = item.refund_fee;
      this.fromitem.total_price = item.total_price;
      // this.fromitem.refund_type = item.refunds_type;
      this.fromitem.payment_id = item.payment_id;
    },
    checkInfo(item) {
      this.showInfo = true;
      this.getOffLineInfo({ tid: item.tid });
    },
    editHandleOk() {
      this.editDorefund(this.fromitem);
      this.editVisible = false;
      this.refundsLists({ page: 1, status: this.listStatus });
      this.currentPage = 1;
      this.fromitem = {
        refunds_id: "",
        tid: "",
        shop_id: "",
        user_id: "",
        money: "",
        total_price: "",
        refund_type: "offline",
        refund_bank: "",
        receive_bank: "",
        refund_account: "",
        receive_account: "",
        refund_people: "",
        beneficiary: "",
        payment_id: ""
      };
    },
    rejectRefund(item) {
      console.log(item);
      const that = this;
      this.$confirm({
        title: "提示",
        content: "确认要驳回退款吗？",
        okText: "确认",
        okType: "danger",
        cancelText: "取消",
        onOk() {
          that.resetSellerRefund({ id: item.id });
        }
      });
    },
    changeTab(k) {
      this.listStatus = k === "待退款" ? 1 : 2;
      this.refundsLists({ page: 1, status: this.listStatus });
      this.currentPage = 1; //切换 默认为第一页
    }
  },
  computed: {
    ...mapState({
      listsData: state => state.trade.refundsData,
      fieldsData: state => state.trade.refundsFields,
      pages: state => state.trade.refundsPages,
      exportData: state => state.trade.exportData,
	  offLineInfo: state => state.trade.offLineInfo,
	  gmlistData: state => state.project.lists,
	  shoplist: state => state.shop.lists,
	  total_data:state => state.trade.total_fee_data,
    })
  },
  mounted() {
	this.refundsLists({ page: 1, status: 1 });
	this.gmfetchLists(this.shopParams)
	this.fetchLists(this.shopParams)
  },
    watch:{
    exportData(){
      this.orderCallback()
    }
  }
};
</script>

<style scoped lang="stylus">
>>> .ant-modal {
  width 60% !inherit
}
.inputSize {
  width 24rem
}
.list-nav {
  display flex
  justify-content space-between
  flex-wrap wrap
}
.mb5{
  margin-bottom: 8px;
}
	.total{
		text-align:right;
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
