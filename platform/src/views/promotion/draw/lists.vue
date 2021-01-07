<template>
  <div class="mr24">
    <a-card :bordered="false">
      <div>
        <div class="mb-md">
          <a-form>
            <a-row>
              <a-col :md="12" :xs="24">
                <a-form-item label="手机号搜索" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                  <a-input v-model="formItem.mobile" placeholder="请输入手机号" allowClear></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xs="24">
                <a-form-item label="奖项关键字" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                  <a-input v-model="formItem.lottery_name" placeholder="请输入奖项关键字" allowClear></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xs="24">
                <a-form-item label="活动名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                  <a-input v-model="formItem.activities_name" placeholder="请输入奖项关键字" allowClear></a-input>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xs="24">
                <a-form-item label="转盘类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
                  <a-radio-group v-model="formItem.activities_type" name="radioGroup" >
                    <a-radio :value="trimStr">全部</a-radio>
                    <a-radio :value="0">线上转盘</a-radio>
                    <a-radio :value="1">线下转盘</a-radio>
                  </a-radio-group>
                </a-form-item>
              </a-col>
              <a-col :md="12" :xs="24">
                <a-form-item :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.btnCol">
                  <a-button @click="subSearch"  type="primary" class="mr10">查询</a-button>
                  <a-button @click="reset" class="mr10">重置</a-button>
                  <a-button
                    type="primary"
                    @click="exportTable"
                    icon="download"
                    >导出</a-button>

                </a-form-item>
              </a-col>
            </a-row>

          </a-form>
        </div>
        <a-tabs v-model="formItem.grant_status" @change="subSearch">
          <a-tab-pane tab="全部" :key="trimStr"></a-tab-pane>
          <a-tab-pane tab="未发放" :key="0" forceRender></a-tab-pane>
          <a-tab-pane tab="已发放" :key="1"></a-tab-pane>
        </a-tabs>
        <div v-if="fields&&fields.length>0">
          <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
            <div slot="action" slot-scope="text, record">
              <a-popconfirm
                :title="'确认补发'+record.user_account_name+'的奖品？'"
                @confirm="confirm(record)"
                okText="确定"
                cancelText="取消"
              >
                <a-button type="primary" v-if="record.grant_status==0">未发放奖品补发</a-button>
              </a-popconfirm>
            </div>
          </a-table>
          <div class="pageBox">
            <a-pagination
              :total="pages.total"
              :showTotal="total => `共 ${total} 条数据`"
              :pageSize="pages.per_page"
              v-model="formItem.page"
              @change="pageChange"
            />
          </div>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  const formItemLayout = {
    labelCol: {
      xs:{
        span: 24
      },
      md:{
        span:5
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
    btnCol: {
      xs:{
        span: 24
      },
      md:{
        span:16,
        offset:2
      }
    },
  };
  export default {
    data() {
      return {
        trimStr:'',
        formItem:{
          page:1,
          lottery_name:'',
          mobile:'',
          grant_status:'',
          activities_type:'',
          activities_name:''
        },
        show:false,
        formItemLayout
      };
    },
    computed: {
      ...mapState({
        fields: state => state.draw.fields,
        dataLists: state => state.draw.lists,
        pages: state => state.draw.pages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'draw/fetchLists',
        createReissued: 'draw/createReissued',
        lotteryListsExcel:'draw/lotteryListsExcel'
      }),
      exportTable() {
      let params ={}
      this.lotteryListsExcel(params).then(res => {
        const tHeader = res.tHeader;
        const filterVal = res.filterVal;
        const list = res.list;
        const data = this.formatJson(filterVal, list);
        import("@/vendor/Export2Excel").then(excel => {
          excel.export_json_to_excel({
            header: tHeader, //表头 必填
            data, //具体数据 必填
            filename: "抽奖记录列表", //非必填
            autoWidth: true, //非必填
            bookType: "xlsx" //非必填
          });
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
      confirm(item){
        const params = {
          id:item.id
        }
        this.createReissued({formItem:params,callback:this.getLists})
      },
      subSearch(){
        this.formItem.page = 1
        this.getLists()
      },
      reset(){
        this.formItem.lottery_name = '';
        this.formItem.mobile = '';
        this.formItem.activities_name = '';
        this.formItem.activities_type= '';
      },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },
    },
    mounted() {
      this.getLists()
    },
  };
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
