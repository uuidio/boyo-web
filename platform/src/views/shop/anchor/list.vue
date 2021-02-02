<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div style="width: 100%">
          <a-form-model ref="ruleForm" :model="table_param">
            <a-row>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="门店选择:" :label-col="{ md: 6,xs:8 }" :wrapper-col="{ md: 16,xs:14}">
                  <a-select v-model="table_param.shop_id" placeholder="请选择">
                    <a-select-option value="">全部</a-select-option>
                    <a-select-option v-for="item in all_shops" :value="item.id">{{item.shop_name}}</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="手机号码:" :label-col="{ md: 6,xs:6 }" :wrapper-col="{ md: 16,xs:16}">
                  <a-input v-model="table_param.mobile" placeholder="请输入"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="主播名称:" :label-col="{ md: 6,xs:6 }" :wrapper-col="{ md: 16,xs:16}">
                  <a-input v-model="table_param.username" placeholder="请输入"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="已绑定门店:" :label-col="{ md: 6,xs:8 }" :wrapper-col="{ md: 16,xs:14}">
                  <a-select v-model="table_param.bind_platform" placeholder="请选择">
                    <a-select-option :value="0">全部</a-select-option>
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="-1">否</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="16" :xs="24">
                <div style="float:right;margin-top: 4px;">
                  <a-button type="primary" @click="get_table_list(1)"><a-icon type="search" />搜索</a-button>
                  <a-button @click="reload()"><a-icon type="undo" />重置</a-button>
                </div>
              </a-col>
            </a-row>
          </a-form-model>
        </div>
      </div>
    </div>
    <div>
      <a-table rowKey="created_at" :pagination="false" :columns="columns" :data-source="table_list">
        <span slot="created_at" slot-scope="text,record">
          {{cut_date(record.created_at,10)}}
        </span>
        <span slot="account_end_time" slot-scope="text,record">
          {{cut_date(record.account_end_time,10)}}
        </span>
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">设置门店</a-button>
        </span>
      </a-table>
      <div class="pageBox" v-if="table_list.length !== 0">
        <a-pagination
          :total="total_count"
          :showTotal="total_count => `共 ${total_count} 条数据`"
          :pageSize="10"
          v-model="table_param.page"
          @change="get_table_list"
        />
      </div>
    </div>
    <a-modal title="设定门店" v-model="aModel" @ok="onSubmit()" width="560px">
      <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
        <a-form-model-item label="门店选择:" :label-col="{ md: 5,xs:24 }" :wrapper-col="{ md: 19,xs:24}" prop="shop_id">
          <a-select v-model="form_params.shop_id" placeholder="请选择">
            <a-select-option v-for="item in all_shops" :value="item.id">{{item.shop_name}}</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  inject: ['reload'],
  components: {
  },
  computed: {

  },
  data() {
    return {
      aModel: false, // 弹框
      // 列表相关的代码------------------------------------------------------------------------------
      columns: [
        {
          title: '主播名称',
          dataIndex: 'username',
          key: 'username',
        },
        {
          title: '手机号码',
          dataIndex: 'mobile',
          key: 'mobile',
        },
        {
          title: '品牌名称',
          dataIndex: 'platform_name',
          key: 'platform_name',
        },
        {
          title: '门店名称',
          dataIndex: 'shop_name',
          key: 'shop_name',
        },
        {
          title: '公司名称',
          dataIndex: 'company',
          key: 'company',
        },
        {
          title: '创建日期',
          scopedSlots: { customRender: 'created_at' },
        },
        {
          title: '有效期',
          scopedSlots: { customRender: 'account_end_time' },
        },
        {
          title: '操作',
          key: 'action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right',
        }],
      table_param: {
        page: 1,
        per_page: 10,
        shop_id: '',
        mobile: '',
        username: '',
        bind_platform: 0,
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [],
      spinning: false, // 加载
      tag_id: '',
      form_params: {
        id: '',
        shop_id: undefined,
      },
      rules: {
        shop_id: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
      },
      // 列表相关的代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      all_platform: [],
      all_shops: [],
    };
  },
  methods: {
    // 打开弹框
    open_aModel(type, row) {
      const _this = this;
      this.aModel = true;
      this.form_params.id = row.id
    },
    get_all_shop() {
      const _this = this;
      _this.$http.get('v1/live/platforms/shops', {}).then((resData) => {
        _this.spinning = false;
        if (resData.code === 0) {
          _this.all_shops = this.copy_obj(resData.result.lists)
        }
      });
    },
    // 获取表格列表
    get_table_list(page) {
      const _this = this;
      _this.spinning = true;
      if (page) { _this.table_param.page = page; }
      _this.$http.get('v1/live/user/list', _this.table_param).then((resData) => {
        _this.spinning = false;
        if (resData.code === 0) {
          _this.table_list = resData.result.lists.data;
          _this.total_count = resData.result.lists.total;
        }
      });
    },
    onSubmit() {
      const _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.$http.post('v1/live/shop/binding', _this.form_params).then((resData) => {
            if (resData.code === 0) {
              _this.aModel = false;
              _this.ok('操作成功');
              _this.get_table_list(1);
            }
          });
        }
      });
    },
  },
  mounted() {
  },
  created() {
    this.get_all_shop();
    this.get_table_list(1);
  },
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
</style>
