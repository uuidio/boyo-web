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
		  <a-button type="primary" :disabled="selectedRowKeys.length==0"  @click="getAllDelete">
			批量删除
		</a-button>
        </div>
      </div>
    </div>
   <template v-if="listField&&listField.length>0">
        <a-table :scroll="{ x: 1600,y:700 }"
          :columns="listField"
          :dataSource="listsData"
          :pagination="false"
		  :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
		  rowKey="id"
        >
          <div slot="action" slot-scope="text, item">
            <a href="javascript:;" @click="goDelete(item)">删除</a>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
export default {
  computed: {
    ...mapState({
      listsData: state => state.online.abnormalData,
      pages: state => state.online.abnormalPages,
	  listField: state => state.online.abnormalFields,
	  exportData: state => state.online.exportData,
	   shoplist: state => state.shop.lists,
	  gmlistData: state => state.project.lists,
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
      exportModel: false,
      isFillter: false,
      currentAct: "-1",
	  currentPages: 1,
	  title:'',
	  timeVisible:true,
	    shopParams: {
           per_page: 1000000,
           is_open: 1,
		 },
		selectedRowKeys: [],
    };
  },
  methods: {
    ...mapActions({
	  fetchLists: "online/abnormalLists",
	   abnormalDelete: "online/abnormalDelete",
	  exportFilter: "online/exportWechatAbnormal",
	   fetchShopLists: 'shop/fetchLists',
	   gmfetchLists: 'project/fetchLists',
	}),
	 handleChange(info) {
      if (info.file.status !== 'uploading') {
        console.log(info.file, info.fileList);
      }
      if (info.file.status === 'done') {
        this.$message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === 'error') {
        this.$message.error(`${info.file.name} file upload failed.`);
      }
    },
    pageChange(page) {
      let params = this.isFillter ? this.filterParams : this.currentParam;
      params.status = params.status >= 0 ? params.status : "";
      params.page = page;
      this.fetchLists(params);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
	},
	onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys);
      this.selectedRowKeys = selectedRowKeys;
    },
    goDelete(item) {
		let list=[]
		list.push(item.id)
		let params={
			id:list
		}
		if (confirm('确认删除此数据？')) {
			this.abnormalDelete(params);
		}
	},
	getAllDelete(){
		let params={
			id:this.selectedRowKeys
		}
		this.abnormalDelete(params);

	},
    exportTable() {
		this.exportModel = true;
		this.type='export'
		this.title='导入异常订单列表导出'
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
    //         filename: "商家端退货列表", //非必填
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
		const tHeader = TableData.goods.tHeader;
		const filterVal = TableData.goods.filterVal;
		const list = TableData.goods.list;
		const data = this.formatJson(filterVal, list);
		import("@/vendor/Export2Excel").then(excel => {
			excel.export_json_to_excel({
			header: tHeader, //表头 必填
			data, //具体数据 必填
			filename: "平台端导入异常订单列表", //非必填
			autoWidth: true, //非必填
			bookType: "xlsx" //非必填
			});
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
	  this.title='导入异常列表筛选'
	  this.exportForm={}
	   this.timeVisible=false
	  this.$nextTick(()=>{
		  this.timeVisible=true
	  })
    },
    filterOk() {
      this.isFillter = true;
     // this.currentAct = this.exportForm.status;
      this.filterParams = Object.assign({}, this.exportForm);
    //   this.filterParams.status =
    //     this.filterParams.status >= 0 ? this.filterParams.status : "";
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
		gm_id:''
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
		this.exportForm.created_start=''
		this.exportForm.created_end=''
	},
	timeChange(value, dateString) {
			console.log('Selected Time: ', value);
			console.log('Formatted Selected Time: ', dateString);
			this.exportForm.created_start = dateString[0];
			this.exportForm.created_end = dateString[1];
		},
		timeOk(value) {
		console.log('onOk: ', value);
		},
  },
  mounted() {
    this.fetchLists({
      page: 1
	});
	//this.fetchShopLists(this.shopParams)
	//this.gmfetchLists(this.shopParams)
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
