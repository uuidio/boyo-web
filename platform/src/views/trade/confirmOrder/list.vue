<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div>
          <a-button
            type="primary"
            @click="exportTable"
            icon="download"
            >导出</a-button
          >
          <a-button type="primary" @click="filterAlert" icon="filter"
            >筛选</a-button
          >
        </div>
      </div>
    </div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="listField&&listField.length>0">
        <a-table :scroll="{ x: 1600,y:700 }"
          :columns="listField"
          :dataSource="listsData"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, item">
            <a href="javascript:;" @click="goDetails(item)">查看</a>
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
	</template>
    <a-modal :title="title" v-model="exportModel" @ok="filterOk" @cancel="filterCancel">
      <!-- <a-form-item
        label="退货状态:"
        :label-col="{ md: 6, xs: 24 }"
        :wrapper-col="{ md: 18, xs: 24 }"
      >
        <a-select v-model="exportForm.status" placeholder="请选择订单状态" style="width:100%" >
          <a-select-option value="2">已处理</a-select-option>
          <a-select-option value="1">处理中</a-select-option>
          <a-select-option value="0">待处理</a-select-option>
          <a-select-option value="3">已驳回</a-select-option>
          <a-select-option value="-1">全部</a-select-option>
        </a-select>
      </a-form-item> -->
	   <a-form-item
          label="店铺名称:"
          :label-col="{ md: 6, xs: 24 }"
          :wrapper-col="{ md: 18, xs: 24 }"
        >
           <a-select v-model="exportForm.shop_id" placeholder="请选择店铺" style="width:100%" >
              <a-select-option v-for="(item,index) in shoplist" :value="item.id" :key="index">{{item.shop_name}}</a-select-option>
            </a-select>
        </a-form-item>
      <a-form-item
        label="确认收货时间:"
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
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  computed: {
    ...mapState({
      listsData: state => state.trade.confirmOrderData,
      pages: state => state.trade.confirmOrderPages,
	  listField: state => state.trade.confirmOrderFields,
	  exportData: state => state.trade.exportData,
	   shoplist: state => state.shop.lists,
	   total_data:state => state.trade.total_fee_data,
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
	  currentPages: 1,
	  title:'确认收货列表筛选',
	  timeVisible:true,
	   shopParams: {
           per_page: 1000000,
           is_open: 1,
         },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: "trade/confirmOrderList",
	  exportFilter: "trade/exportconfirmOrder",
	  fetchShopLists: 'shop/fetchLists',
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
		this.exportModel = true;
		this.type='export'
		this.title='确认收货列表导出'
		 this.timeVisible=false
	  this.$nextTick(()=>{
		  this.timeVisible=true
	  })
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
    //         filename: "门店端退货列表", //非必填
    //         autoWidth: true, //非必填
    //         bookType: "xlsx" //非必填
    //       });
    //     });
    //   });
	},
	dataHandleOk(){
			let that = this
			if(Object.keys(this.exportForm).length == 0 ){
				this.$warning({
				  title: '温馨提示！',
				  content: '需选择导出条件才可导出数据',
				});
			} else {
				this.exportLoading = true
        this.exportFilter({ exportForm: this.exportForm} ) // 请求数据
      }
		},
    orderCallback() {
      this.exportLoading = false
      this.dataVisible = false
      // this.orderStatusBool = false
      this.exportPathMethod(this.exportData)
      this.exportForm = {}
      this.timeItem = {}
      this.timeHide = false
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
	},
	exportPathMethod(TableData) {
		this.$success({
			title: '温馨提示！',
			content: '数据正在导出,请稍后查看下载目录！',
		});
		const tHeader = TableData.order.tHeader;
		const filterVal = TableData.order.filterVal;
		const list = TableData.order.list;
		const data = this.formatJson(filterVal, list);
		import("@/vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
			header: tHeader, //表头 必填
			data, //具体数据 必填
			filename: "品牌端确认收货列表", //非必填
			autoWidth: true, //非必填
			bookType: "xlsx" //非必填
			});
		});
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
	  this.type='search'
	  this.title='确认收货列表筛选'
	   this.timeVisible=false
	  this.$nextTick(()=>{
		  this.timeVisible=true
	  })
    },
    filterOk() {
      this.isFillter = true;
      this.currentAct = this.exportForm.status;
      this.filterParams = Object.assign({}, this.exportForm);
      this.filterParams.status =
        this.filterParams.status >= 0 ? this.filterParams.status : "";
      this.exportModel = false;
      if(this.type=='search'){
		  this.fetchLists(this.filterParams);
	  }else{
		  this.dataHandleOk();
	  }
      //初始筛选条件
      this.searchObj.value = "";
      this.exportForm = {
        page: 1,
		status: this.currentAct,
		shop_id:'',
      };
      console.log(this.filterParams);
    },
    // timeSelect(d, arr) {
    //   if (arr[0] === arr[1]) {
    //     arr[0] = arr[0] + " 00:00:00";
    //     arr[1] = arr[1] + " 23:59:59";
    //   }
    //   this.exportForm.created_start = arr[0];
    //   this.exportForm.created_end = arr[1];
	// },
	filterCancel(){
		this.exportForm.confirm_at_start=''
		this.exportForm.confirm_at_end=''
	},
	timeChange(value, dateString) {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
			this.exportForm.confirm_at_start = dateString[0];
			this.exportForm.confirm_at_end = dateString[1];
		},
		timeOk(value) {
		console.log('onOk: ', value);
		},
  },
  mounted() {
    this.fetchLists({
      page: 1
	});
	this.fetchShopLists(this.shopParams)
  },
  watch:{
    exportData(){
      this.orderCallback()
    }
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
