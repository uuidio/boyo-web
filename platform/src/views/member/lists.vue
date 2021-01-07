<template>
  <div class="content">
		<div class="list-nav">
		  <div class="mb10">
				<a-button class="mr10" icon="download" type="primary" @click="selectBtn">导出勾选的数据</a-button>
				<!-- <a-button class="mr10" type="primary" @click="excelModelShow">高级导出</a-button> -->
				<a-button class="mr10" type="primary" @click="excelMember">高级导出</a-button>
		  </div>
		  <div class="mb10">
		  	<a-select v-model="selectVal" style="width: 150px">
		  	  <a-select-option value="account" key="account">会员账号搜索</a-select-option>
		  	  <a-select-option value="mobile" key="mobile">手机号搜索</a-select-option>
		  	</a-select>
		  	<a-input-search enterButton style="width: 16rem;" :placeholder="selectVal=='account'? '请输入会员账号搜素' : '请输入手机号搜素'" @search="onSearch" />
		  </div>
		</div>
   <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }"
				:rowKey="record => record.mobile"
				:columns="listField"
				:dataSource="listData"
				:rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}"
				:pagination="false">
      </a-table>
			<div class="pageBox">
				<a-pagination
					:total="pages.total"
					:showTotal="total => `共 ${total} 条数据`"
					:pageSize="pages.per_page"
					:defaultCurrent="1"
					@change="pageChange" />
			</div>
   </template>
		<a-modal title="请按需选择导出的内容" :confirmLoading="exportLoading" v-model="dataVisible" okText="导出" @ok="dataHandleOk" @cancel="dataCancel">
			<a-form layout="horizontal">
				<a-form-item label="注册日期:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }" v-if="timeVisible">
					<a-range-picker @change="dateChange" />
				</a-form-item>
<!--				<a-form-item label="只导出新会员:" :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }">-->
<!--					<a-switch :v-model="exportForm.status" @change="cgNew"/>-->
<!--				</a-form-item>			-->
			</a-form>
		</a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import helper from '@/utils/helper';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.member.lists,
      listField: state => state.member.fields,
      pages: state => state.member.pages,
      exportData: state => state.member.exportData,
    }),
  },
  data() {
    return {
			selectVal: 'account',		//筛选搜索
			selectedRowKeys: [],
			selectedRows:[],
			listform: {
				page: 1
			},
			//高级导出
			exportLoading: false,//按钮加载状态
			dataVisible: false,//窗口开关
			exportForm: {
				status: 0
			},
			timeVisible:true,
			type:'normal'
		};
  },
  methods: {
    ...mapActions({
      fetchLists: 'member/fetchLists',
      fetchSearch: 'member/fetchSearch',
	  exportFilter: 'member/exportFilter',
	  userAccountDown:'member/userAccountDown'
    }),
		// 搜索
		onSearch(value) {
			this.listform = {
				page: 1,
			}
			if(this.selectVal == 'account') {
				this.listform.account = value
				this.fetchSearch(this.listform);
			} else {
				this.listform.mobile = value
				this.fetchSearch(this.listform);
			}
		},
		//勾选
		onSelectChange (selectedRowKeys, selectedRows) {
      console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
      this.selectedRowKeys = selectedRowKeys
      this.selectedRows[this.listform.page - 1] = selectedRows;
    },
		// 勾选导出
		selectBtn() {
		  if (this.selectedRows.length == 0) {
		    this.$warning({
		      title: '温馨提示！',
		      content: '请勾选需要导出的数据',
		    });
		  } else {
		    const field = []; // 标题
		    const filter = []; // 内容过滤
		    this.listField.forEach((item, i) => {
		      field.push(item.title);
		      filter.push(item.dataIndex);
		    });
		    this.export2Excel(field, filter, this.OneDimensionalArray(this.selectedRows), '品牌会员列表');
				// helper.showSuccess('数据正在导出,请稍后查看下载目录！');
		  }
		},
		//导出日期选择
		dateChange(date, dateString) {
			this.exportForm.from = dateString[0]
			this.exportForm.to = dateString[1]
	},
		cgNew(v){
			this.exportForm.status = v ? "1" : "0";
		},
		//高级导出窗口确定
		dataHandleOk() {
			if (Object.keys(this.exportForm).length == 0){
				helper.showError('请选择日期');
				return
			}
			if(this.type=='normal'){
				this.exportLoading = true;
				this.exportFilter(this.exportForm);// 请求数据
			}else{
				this.userAccountDown({data:this.exportForm,collback:this.excelBack});
			}

		},
		excelBack(){
			const _this = this;
			setTimeout(() => {
				_this.exportLoading = false;
				_this.dataVisible = false;
				const jumpUrl = '/statistics/downLoadList';
				const routeData = _this.$router.resolve({ path: jumpUrl });
				window.open(routeData.href, '_blank');
			}, 1000);
			//this.$router.push({path:'/statistics/downLoadList'});
		},
		dataCancel() {
		  this.dataVisible = false;
		},
		//导出核心
		formatJson(filterVal, jsonData) {
		  return jsonData.map(v => filterVal.map(j => v[j]));
		},
		export2Excel(tHeaders, filterVals, lists, name) {
				const tHeader = tHeaders;
				const filterVal = filterVals;
				const list = lists;
				const data = this.formatJson(filterVal, list);
				import("@/vendor/Export2Excel").then(excel => {
					excel.export_json_to_excel({
					header: tHeaders, //表头 必填
					data, //具体数据 必填
					filename: "品牌会员列表", //非必填
					autoWidth: true, //非必填
					bookType: "xlsx" //非必填
					});
				});

		  this.dataVisible = false;
			helper.showSuccess('数据正在导出,请稍后查看下载目录！');
		},
		//分页
		pageChange(page){
			this.listform.page = page;
			this.fetchSearch(this.listform);
		},
		excelModelShow() {
			this.type='normal'
			this.dataVisible = true;
			this.exportForm={}
			 this.timeVisible=false
			this.$nextTick(()=>{
				this.timeVisible=true
			})
		},
		excelMember(){
			this.type='record'
			this.dataVisible = true;
			this.exportForm={}
			 this.timeVisible=false
			this.$nextTick(()=>{
				this.timeVisible=true
			})
		}
  },
  mounted() {
    this.fetchSearch(this.listform);
  },
  watch:{
	  exportData(){
		this.exportLoading = false;
		this.dataVisible = false;
		//处理数据
		let field = this.exportData.tHeader;
		let filter = this.exportData.filterVal;
		let data = this.exportData.list;
		this.export2Excel(field, filter, data, '品牌会员列表');
		//重置
		this.exportForm = {};
	  }
  }
};
</script>

<style  scoped lang="stylus">
	.list-nav
	  display flex
	  justify-content space-between
	  flex-wrap wrap

</style>
