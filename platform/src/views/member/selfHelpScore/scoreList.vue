<template>
  <div class="content">

	<a-form layout="inline">
	   <a-row style="margin-bottom:10px;display: flex;align-items: center">
        <a-col :md="8" :xs="24">
          <a-form-item
            label="手机号码"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
			style="width:100%"
          >
           <a-input v-model="formItem.mobile"></a-input>
          </a-form-item>
        </a-col>
		<a-col :md="4" :xs="24">
			 <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
		</a-col>
	   </a-row>
	</a-form>
    <template v-if="listField&&listField.length>0">
      <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
        <a-tab-pane v-for="(item, index) in tabLists" :tab="item.tab" :key="item.key">
          <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false" :rowKey="row=>row.id">
            <a slot="ticket_img" target="_blank" :href="text" slot-scope="text">
              <img style="height:50px" :src="text" alt="">
            </a>
            <div slot="action" slot-scope="text, item">
              <a-button class="mr10" type="primary" size="small" @click="edit(item)">
                {{item.status == '0' ? '积分补录': '查看'}}
              </a-button>
              <a-button type="danger" size="small" class='mt10' @click="showModal(item)" v-if="item.status == '0'">驳回</a-button>
            </div>
          </a-table>
        </a-tab-pane>
      </a-tabs>
    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        v-model="formItem.page"
        :pageSize="formItem.per_page"
        @change="pageChange"
      />
    </div>
    </template>
    <a-modal
      width="600px"
      title="驳回申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
      >
        <a-form-item
          label= "驳回原因"
          :label-col= "{ md: 4,xs:24 }"
          :wrapper-col= "{ md: 12,xs:24}"
        >
          <a-radio-group v-model="sltFill" name="radioType" :defaultValue="0" @change="changeSltFill">
            <a-radio :value="0">快捷选择</a-radio>
            <a-radio :value="1">自行输入</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label= "选填内容"
          :label-col= "{ md: 4,xs:24 }"
          :wrapper-col= "{ md: 18,xs:24}"
        >
          <a-select v-if="sltFill === 0" :value="reject_reason" @change="handleChange">
            <a-select-option v-if="item.reject_status === '显示'" :value="item.term" v-for="item in rejectReasonList" :key="item.term">{{item.term}}</a-select-option>
          </a-select>
          <a-textarea
            v-else
            style="width: 100%"
            placeholder= "输入驳回原因"
            :rows= "4"
            v-model= "reject_reason"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import searchItem from '../components/search';

const tabLists = [
  { tab: '全部', key: 0, status:''},
  { tab: '待处理', key: 1, status:0},
  { tab: '已通过', key: 2, status:1},
  { tab: '未通过', key: 3, status:2},
  ];
 const formItemLayout = {
    labelCol: {
      xs:{
        span: 24
      },
      md:{
        span:7
      }
    },
    wrapperCol: {
      xs:{
        span: 24
      },
      md:{
        span:16
      }
    },
  };
export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.member.dataList,
      listField: state => state.member.dataField,
      pages: state => state.member.dataPages,
      rejectReasonList: state => state.member.quickRejectList,
    }),
  },
  components: {
    searchItem,
  },
  data() {
    return {
	  formItemLayout,
      tabLists,
      sltFill: 0,
      currentItem: {
        id: '',
      },
      reject_reason: '',
      visible: false,
      searchOptions: {},
      formItem: {
        page: 1,
		per_page: 15,
		mobile:''
      },
    };
  },
  methods: {
    ...mapActions({
      getDateList: 'member/getDateList',
      rejectApply: 'member/rejectApply',
      getRejectReasonList: 'member/getQuickRejectList',
    }),
    getLists() {
      const obj1 = this.formItem;
      const obj2 = this.searchOptions;
      const obj = Object.assign(obj2, obj1);
      this.getDateList(obj);
    },
    getSearch(item) {
      this.searchOptions = item;
      this.formItem.page = 1;
      this.getLists();
    },
    changeSltFill(e) {
      this.reject_reason = '';
    },
    handleChange(value) {
      this.reject_reason = value;
    },
    showModal(item) {
      this.visible = true;
      this.currentItem.id = item.id;
    },
    handleOk() {
      this.handleRejectApply({
        id: this.currentItem.id,
        reject_reason: this.reject_reason,
      });
    },
    handleCancel() {
      this.currentItem.id = '';
      this.reject_reason = '';
      this.visible = false;
    },
    handleRejectApply(data) {
      this.rejectApply(data);
    },
    onGetData(key) {
      this.formItem.status = this.tabLists[key].status;
      this.formItem.page = 1
      this.getDateList(this.formItem)
    },
    pageChange(page) {
      this.formItem.page = page
      this.getDateList(this.formItem);
	},
	subSearch(){
		this.getDateList(this.formItem);
	},
    // 编辑
    edit(item) {
      const goLink = `/member/selfHelpScore/scoreDetail?itemId=${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
  },
  mounted() {
    this.getLists();
    this.getRejectReasonList();
  },
};
</script>

<style scoped lang="stylus">
  .list-nav
    display flex
    justify-content space-between
    flex-wrap wrap
</style>
