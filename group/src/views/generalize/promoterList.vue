<template>
  <div class="content">
    <a-form layout="inline" class="mb10 mt10">
      <a-row>
<!--        <a-col :md="12" :xs="24">-->
<!--          <a-form-item-->
<!--            label="注册时间"-->
<!--            :label-col="formItemLayout.labelCol"-->
<!--            :wrapper-col="formItemLayout.wrapperCol"-->
<!--          >-->
<!--            <a-range-picker @change="dateChange" />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :md="12" :xs="24">-->
<!--            <a-button type="primary" @click="dataHandleOk">导出</a-button>-->
<!--        </a-col>-->
        <a-col :md="24" :xs="24" style="display: flex; justify-content: flex-end;">
          <a-input-search style="width:250px" v-model="inputVal" placeholder="请输入手机号搜素" @search="submitSearch" enterButton />
        </a-col>
<!--        <a-col :md="12" :xs="24">-->
<!--          <a-form-item-->
<!--            label="账号搜索"-->
<!--            :label-col="formItemLayout.labelCol"-->
<!--            :wrapper-col="formItemLayout.wrapperCol"-->
<!--          >-->
<!--            <a-select v-model="selectVal" style="width: 150px">-->
<!--              &lt;!&ndash;<a-select-option value="account">会员账号搜索</a-select-option>&ndash;&gt;-->
<!--              <a-select-option value="mobile" >手机号搜索</a-select-option>-->
<!--              <a-select-option value="partner_mobile" >上级手机号搜索</a-select-option>-->
<!--            </a-select>-->
<!--            <a-input v-model="inputVal" style="width: 200px;" placeholder="请输入手机号搜素"  />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :md="12" :xs="24">-->
<!--          <a-form-item-->
<!--            label="角色筛选"-->
<!--            :label-col="formItemLayout.labelCol"-->
<!--            :wrapper-col="formItemLayout.wrapperCol"-->
<!--          >-->
<!--            <a-radio-group v-model="listform.partner_role" >-->
<!--              <a-radio :value="trimStr">全部</a-radio>-->
<!--              <a-radio :value="0">普通会员</a-radio>-->
<!--              <a-radio :value="1">推广员</a-radio>-->
<!--              <a-radio :value="2">小店</a-radio>-->
<!--              <a-radio :value="3">分销商</a-radio>-->
<!--            </a-radio-group>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
<!--        <a-col :md="12" :xs="24">-->
<!--          <a-form-item-->
<!--            :label-col="formItemLayout.labelCol"-->
<!--            :wrapper-col="formItemLayout.buttonCol"-->
<!--          >-->
<!--            <a-button type="primary" @click="submitSearch">搜索</a-button>-->
<!--          </a-form-item>-->
<!--        </a-col>-->
      </a-row>
    </a-form>
    <div v-if="listField&&listField.length>0">
      <a-table
        :rowKey="record => record.id"
        :columns="listField"
        :dataSource="listData"
        :pagination="false"
      >
        <div slot="child_num" slot-scope="text,item">
          <a-button @click="showTable(item)">
            {{item.child_num}}
          </a-button>
        </div>
        <div slot="num2" slot-scope="text,item">
          <a-button @click="showNum2Table(item)">
            {{item.goods_spread}}
          </a-button>
        </div>
        <div slot="action" slot-scope="text,item">
          <div><a-button @click="showMemberDetail(item)">查看收益明细</a-button></div>
          <div  class="mt10" v-if="item.partner_role!==3">
<!--            <div v-if="item.is_promoter==0" >-->
<!--              <a-button type="primary" @click="setPromoter(item)">设置为推广员</a-button>-->
<!--            </div>-->
            <div v-if="item.is_promoter==1">
              <a-popconfirm
                :title="'确定冻结'+item.mobile+'的推广员？'"
                @confirm="setStatusType(item,1,1)"
                okText="确认"
                cancelText="取消"
              >
                <a-button type="danger">冻结推广员</a-button>
              </a-popconfirm>
            </div>
            <div v-else-if="item.is_promoter==4">
              <a-popconfirm
                :title="'确定解除对'+item.mobile+'的推广员冻结？'"
                @confirm="setStatusType(item,1,2)"
                okText="确认"
                cancelText="取消"
              >
                <a-button type="dashed">解冻推广员</a-button>
              </a-popconfirm>
            </div>
          </div>
<!--          <div v-if="item.partner_role!==3" class="mt10">-->
<!--            <a-popconfirm-->
<!--              :title="'确定设置'+item.mobile+'为店主？'"-->
<!--              @confirm="setStatus(item,1,2)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--              v-if="item.partner_role!==2"-->
<!--            >-->
<!--              <a-button type="dashed">设为店主</a-button>-->
<!--            </a-popconfirm>-->
<!--            <a-popconfirm-->
<!--              :title="'确定冻结'+item.mobile+'的店主权限？'"-->
<!--              @confirm="setStatusType(item,2,1)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--              v-if="item.partner_role==2&&item.partner_status==0"-->
<!--            >-->
<!--              <a-button type="danger">冻结店主</a-button>-->
<!--            </a-popconfirm>-->
<!--            <a-popconfirm-->
<!--              :title="'确定解冻'+item.mobile+'的店主权限？'"-->
<!--              @confirm="setStatusType(item,2,2)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--              v-if="item.partner_role==2&&item.partner_status==1"-->
<!--            >-->
<!--              <a-button type="dashed">解冻店主</a-button>-->
<!--            </a-popconfirm>-->
<!--          </div>-->
<!--          <div v-if="item.partner_role==2||item.partner_role==3" class="mt10">-->
<!--            <a-button  @click="seePromoter(item)">查看下级</a-button>-->
<!--          </div>-->
<!--          <div class="mt10" v-if="item.role_type=='普通会员'">-->
<!--            <a-popconfirm-->
<!--              :title="'确定设置'+item.mobile+'为分销商？'"-->
<!--              @confirm="setStatus(item,1,3)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--            >-->
<!--              <a-button type="dashed">设为分销商</a-button>-->
<!--            </a-popconfirm>-->
<!--          </div>-->
<!--          <div class="mt10" v-if="item.partner_role===3">-->
<!--            <a-popconfirm-->
<!--              :title="'确定冻结'+item.mobile+'的分销商权限？'"-->
<!--              @confirm="setStatusType(item,2,1)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--              v-if="item.partner_role==3&&item.partner_status==0"-->
<!--            >-->
<!--              <a-button type="danger">冻结分销商</a-button>-->
<!--            </a-popconfirm>-->
<!--            <a-popconfirm-->
<!--              :title="'确定解冻'+item.mobile+'的分销商权限？'"-->
<!--              @confirm="setStatusType(item,2,2)"-->
<!--              okText="确认"-->
<!--              cancelText="取消"-->
<!--              v-if="item.partner_role==3&&item.partner_status==1"-->
<!--            >-->
<!--              <a-button type="dashed">解冻分销商</a-button>-->
<!--            </a-popconfirm>-->
<!--          </div>-->
<!--          <div v-if="item.partner_role!==3&&item.role_type!=='普通会员'" class="mt10">-->
<!--            <a-button type="primary" @click="savePartner(item)">查看上级</a-button>-->
<!--          </div>-->
        </div>
      </a-table>
      <div class="pageBox" v-if="pages&&pages.current_page">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="1"
          @change="pageChange" />
      </div>
    </div>
    <a-modal
      :title="+showMember+'会员收益明细'"
      :visible="memberVisible"
      :footer="null"
      width="80%"
      @cancel="cancel"
    >
      <div class="mb10">
        <span class="mr10">实际收益：￥{{userData.income}}</span>
        <span>预估收益：￥{{userData.estimated_count}}</span>
      </div>
      <a-tabs @change="memberDetailChange" v-model="tabKey">
        <a-tab-pane tab="会员收入" :key="1"></a-tab-pane>
        <a-tab-pane tab="会员预估收益" :key="2"></a-tab-pane>
      </a-tabs>
      <a-table :columns="Logfields" :dataSource="Loglists" :pagination="false">
        <div v-if="tabKey === 2" slot="user_img" slot-scope="text,item">
          <img width="70px" :src="item.wx_info.headimgurl" alt="">
        </div>
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="Logpages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="Logpages.per_page"
          v-model="showDetail.page"
          @change="LogpagesChange" />
      </div>
    </a-modal>
    <a-modal
      :title="tabTitle"
      width="70%"
      v-model="tabVisible"
      :footer="null"
    >
      <a-table :columns="DetailFields" :dataSource="DetailDataLists" :pagination="false">
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="DetailPages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="DetailPages.per_page"
          :defaultCurrent="1"
          @change="detailPageChange"
        />
      </div>
    </a-modal>
    <a-modal
      :title="tabTitle"
      width="70%"
      v-model="num2"
      :footer="null"
    >
      <a-table :columns="Num2fields" :dataSource="Num2lists" :pagination="false">
        <div  slot="headimgurl" slot-scope="text,item">
          <img width="70px" :src="item.wx_info.headimgurl" alt="">
        </div>
        <div slot="goods_infos" slot-scope="text,item">
          {{item.goods_infos}}
        </div>
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="Num2pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="Num2pages.per_page"
          v-model="num2Item.page"
          @change="Num2PageChange"
        />
      </div>
    </a-modal>
    <a-modal
      :title="'设置'+setItem.mobile+'为推广员'"
      v-model="setPro"
      @cancel="cancelSetPro"
      @ok="SetProOk"
    >
      确认设置该会员为推广员
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import helper from '@/utils/helper';
  import Server from '@/config/server';

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      md: {
        span: 5,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      md: {
        span: 19,
      },
    },
    buttonCol: {
      xs: {
        span: 24,
      },
      md: {
        offset: 5,
        span: 19,
      },
    },
  };
  export default {
    inject: ['reload'],
    name: 'lists',
    computed: {
      ...mapState({
        // DepLists: state => state.member.DepLists,
        listData: state => state.generalize.promoterList,
        listField: state => state.generalize.promoterListFields,
        pages: state => state.generalize.promoterListPages,
        Loglists: state => state.generalize.Loglists1,
        Logfields: state => state.generalize.Logfields1,
        Logpages: state => state.generalize.Logpages1,
        Num2lists: state => state.generalize.Num2lists,
        Num2fields: state => state.generalize.Num2fields,
        Num2pages: state => state.generalize.Num2pages,
        exportData: state => state.member.exportData,
        userData: state => state.generalize.userData,
        DetailFields: state => state.generalize.DetailFields,
        DetailDataLists: state => state.generalize.DetailLists,
        DetailPages: state => state.generalize.DetailPages,
      }),
    },
    data() {
      return {
        formItemLayout,
        setPro: false,
        selectVal: 'mobile',		// 筛选搜索
        selectedRowKeys: [],
        selectedRows: [],
        listform: {
          page: 1,
          created_start: '',
          created_end: '',
          partner_role: '',
        },
        tabVisible: false,
        showDetail: {
          page: 1,
        },
        memberVisible: false,
        showMember: '',
        trimStr: '',
        is_promoter: '',
        // 高级导出
        exportLoading: false, // 按钮加载状态
        dataVisible: false, // 窗口开关
        exportForm: {},
        tabKey: 1,
        member_id: '',
        detailShow: {
          page: 1,
          id: '',
        },
        inputVal: '',
        num2: false,
        tabTitle: '',
        num2Item: {
          page: 1,
          pid: '',
        },
        setItem: {},
      };
    },
    methods: {
      ...mapActions({
        fetchSearch: 'generalize/fetchSearch',
        exportFilter: 'member/exportFilter',
        becomePromoter: 'member/becomePromoter',
        memberDetail: 'generalize/memberDetail',
        memberPriceDetail: 'generalize/memberPriceDetail',
        detailLists: 'generalize/detailLists',
        goodsSpreadLists: 'generalize/goodsSpreadLists',
        depLists: 'member/depLists',
        updatePartner: 'member/updatePartner',
        updatePartnerType: 'generalize/updatePartnerType',
      }),
      submitSearch() {
        this.listform.page = 1;
        if (this.selectVal == 'mobile') {
          this.listform.mobile = this.inputVal;
          delete this.listform.partner_mobile;
        } else {
          this.listform.partner_mobile = this.inputVal;
          delete this.listform.mobile;
        }

        this.fetchSearch(this.listform);
      },
      savePartner(item) {
        const jumpUrl = `/generalize/savePartner/${item.id}`;
        const routeData = this.$router.resolve({ path: jumpUrl, query: { tel: item.mobile, partner_role: item.partner_role } });
        window.open(routeData.href, '_blank');
      },
      seePromoter(item) {
        const jumpUrl = `/generalize/promoterShop/${item.id}`;
        const routeData = this.$router.resolve({ path: jumpUrl, query: { tel: item.mobile, partner_role: item.partner_role } });
        window.open(routeData.href, '_blank');
      },
      setStatus(item, num, role) {
        const params = {
          id: item.id,
          partner_status: '',
          partner_role: role,
          type: 1,
        };
        if (num == 1) {
          params.partner_status = 0;
          params.type = 1;
        } else if (num == 4) {
          params.partner_status = 0;
          params.type = 2;
        } else if (num == 0) {
          params.partner_status = 1;
          params.type = 2;
        }
        this.updatePartner({ formItem: params, callback: this.getLists });
      },
      setStatusType(item, num, type) {
        const params = {
          id: item.id,
          partner_type: num,
          type:type
        };
        this.updatePartnerType({ formItem: params, callback: this.getLists });
      },
      cancelSetPro() {
        this.setPro = false;
      },
      setPromoter(item) {
        this.setItem = item;
        this.setPro = true;
      },
      Num2PageChange(page) {
        this.num2Item.page = page;
        this.goodsSpreadLists({ params: this.num2Item, callback: this.showNum2 });
      },
      showNum2Table(item) {
        this.tabTitle = `会员：${item.mobile}客户数列表`;
        this.num2Item.pid = item.id;
        this.goodsSpreadLists({ params: this.num2Item, callback: this.showNum2 });
      },
      showNum2() {
        this.num2 = true;
      },
      SetProOk() {
        this.confirm(this.setItem, 1);
        this.setPro = false
      },
      showTable(item) {
        this.tabTitle = `会员：${item.mobile}邀请好友列表`;
        this.detailShow.page = 1;
        this.detailShow.id = item.id;
        this.getDetail();
      },
      getDetail() {
        const params = this.detailShow;
        this.detailLists({ params, callback: this.showModel });
      },
      detailPageChange(page) {
        this.detailShow.page = page;
        this.getDetail();
      },
      showModel() {
        this.tabVisible = true;
      },
      LogpagesChange(page) {
        this.showDetail.page = page;
        this.memberDetailChange(this.tabKey);
      },
      cancel() {
        this.memberVisible = false;
        this.tabKey = 1;
      },
      memberDetailChange(key) {
        if (key == 1) {
          this.showDetail.page = 1;
          this.showDetail.user_id = this.member_id;
          delete this.showDetail.pid;
          const url = Server.action.tradeRewardsLists;
          this.memberDetail({
            url, params: this.showDetail, callback: this.memberCallback, key: this.tabKey,
          });
        } else if (key == 2) {
          this.showDetail.page = 1;
          this.showDetail.pid = this.member_id;
          delete this.showDetail.user_id;
          const url = Server.action.tradeEstimatesLists;
          this.memberDetail({
            url, params: this.showDetail, callback: this.memberCallback, key: this.tabKey,
          });
        }
      },
      showMemberDetail(item) {
        this.showMember = item.mobile;
        this.showDetail.user_id = item.id;
        this.member_id = item.id;
        this.showDetail.page = 1;
        const url = Server.action.tradeRewardsLists;
        this.memberDetail({
          url, params: this.showDetail, callback: this.memberCallback, key: this.tabKey,
        });
        const params = {
          user_id: item.id,
        };
        this.memberPriceDetail(params);
      },
      memberCallback() {
        this.memberVisible = true;
      },

      confirm(item, status) {
        const prasms = {
          id: item.id,
          status,
          department_id: item.department_id,
        };
        this.becomePromoter({ formItem: prasms, callback: this.getLists });
      },
      // 勾选
      onSelectChange(selectedRowKeys, selectedRows) {
        // console.log('selectedRowKeys changed: ', selectedRowKeys, selectedRows);
        this.selectedRowKeys = selectedRowKeys;
        this.selectedRows = selectedRows;
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
          this.export2Excel(field, filter, this.selectedRows, '平台会员列表');
          // helper.showSuccess('数据正在导出,请稍后查看下载目录！');
        }
      },
      // 导出日期选择
      dateChange(date, dateString) {
        this.listform.created_start = dateString[0];
        this.listform.created_end = dateString[1];
      },
      // 高级导出窗口确定
      dataHandleOk() {
        if (this.selectVal == 'mobile') {
          this.listform.mobile = this.inputVal;
          delete this.listform.partner_mobile;
        } else {
          this.listform.partner_mobile = this.inputVal;
          delete this.listform.mobile;
        }
        const params = this.listform;
        delete params.page;
        this.exportFilter({ formItem: params, callback: this.dowBack });// 请求数据
      },
      dowBack() {
        const _this = this;
        setTimeout(() => {
          _this.exportLoading = false;
          _this.dataVisible = false;
          const jumpUrl = '/statistics/downLoadList';
          const routeData = _this.$router.resolve({ path: jumpUrl });
          window.open(routeData.href, '_blank');
        }, 1000);
        // 处理数据
        // let field = this.exportData.trade.tHeader
        // let filter = this.exportData.trade.filterVal
        // let data = this.exportData.list
        // this.export2Excel(field, filter, data, '平台会员列表');
        // 重置
        // this.exportForm = {}
      },
      dataCancel() {
        this.dataVisible = false;
      },
      // 导出核心
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => v[j]));
      },
      export2Excel(tHeaders, filterVals, lists, name) {
        const tHeader = tHeaders;
        const filterVal = filterVals;
        const list = lists;
        const data = this.formatJson(filterVal, list);
        import('@/vendor/Export2Excel').then((excel) => {
          excel.export_json_to_excel({
            header: tHeaders, // 表头 必填
            data, // 具体数据 必填
            filename: '平台会员列表', // 非必填
            autoWidth: true, // 非必填
            bookType: 'xlsx', // 非必填
          });
        });

        this.dataVisible = false;
        helper.showSuccess('数据正在导出,请稍后查看下载目录！');
      },
      // 分页
      getLists() {
        this.fetchSearch(this.listform);
      },
      pageChange(page) {
        this.listform.page = page;
        this.fetchSearch(this.listform);
      },
    },
    mounted() {
      this.fetchSearch(this.listform);
      // this.depLists({ per_page: 100000 });
    },
  };
</script>

<style  scoped lang="stylus">
  >>>.ant-row .ant-form-item
    width:100%
  .list-nav1
    display flex
    justify-content space-between
    flex-wrap wrap

</style>
