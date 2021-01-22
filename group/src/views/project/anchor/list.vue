<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div style="width: 100%">
          <a-form-model ref="ruleForm" :model="table_param">
            <a-row>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="品牌选择:" :label-col="{ md: 6,xs:8 }" :wrapper-col="{ md: 16,xs:14}">
                  <a-select v-model="form_params.p1" placeholder="请选择">
                    <a-select-option :value="0">顶部左侧</a-select-option>
                    <a-select-option :value="1">顶部居中</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="门店选择:" :label-col="{ md: 6,xs:8 }" :wrapper-col="{ md: 16,xs:14}">
                  <a-select v-model="table_param.p2" placeholder="请选择">
                    <a-select-option :value="0">顶部左侧</a-select-option>
                    <a-select-option :value="1">顶部居中</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="手机号码:" :label-col="{ md: 6,xs:6 }" :wrapper-col="{ md: 16,xs:16}">
                  <a-input v-model="table_param.p3" placeholder="请输入"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="主播名称:" :label-col="{ md: 6,xs:6 }" :wrapper-col="{ md: 16,xs:16}">
                  <a-input v-model="table_param.p4" placeholder="请输入"></a-input>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
                <a-form-model-item label="是否绑定门店:" :label-col="{ md: 6,xs:8 }" :wrapper-col="{ md: 16,xs:14}">
                  <a-select v-model="table_param.p5" placeholder="请选择">
                    <a-select-option :value="0">全部</a-select-option>
                    <a-select-option :value="1">是</a-select-option>
                    <a-select-option :value="2">否</a-select-option>
                  </a-select>
                </a-form-model-item>
              </a-col>
              <a-col :md="8" :xs="24">
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
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">设置品牌门店</a-button>
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
    <a-modal title="设定品牌门店" v-model="aModel" @ok="onSubmit()" width="560px">
      <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
        <a-form-model-item label="品牌选择:" :label-col="{ md: 5,xs:24 }" :wrapper-col="{ md: 19,xs:24}">
          <a-select v-model="form_params.p1" placeholder="请选择">
            <a-select-option :value="0">顶部左侧</a-select-option>
            <a-select-option :value="1">顶部居中</a-select-option>
          </a-select>
        </a-form-model-item>
        <a-form-model-item label="门店选择:" :label-col="{ md: 5,xs:24 }" :wrapper-col="{ md: 19,xs:24}">
          <a-select v-model="form_params.p1" placeholder="请选择">
            <a-select-option :value="0">顶部左侧</a-select-option>
            <a-select-option :value="1">顶部居中</a-select-option>
          </a-select>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
import Ueditor from '@C/ueditor/notice_ueditor';

export default {
  inject: ['reload'],
  components: {
    UploadImage,
    Ueditor,
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
          dataIndex: 'b1',
          key: 'b2',
        },
        {
          title: '手机号码',
          dataIndex: 'b2',
          key: 'b2',
        },
        {
          title: '品牌名称',
          dataIndex: 'b3',
          key: 'b3',
        },
        {
          title: '门店名称',
          dataIndex: 'b4',
          key: 'b4',
        },
        {
          title: '公司名称',
          dataIndex: 'b5',
          key: 'b5',
        },
        {
          title: '创建日期',
          dataIndex: 'b6',
          key: 'b6',
        },
        {
          title: '有效期',
          dataIndex: 'b7',
          key: 'b7',
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
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [
          {b1:'哈利路亚',b2:'13572365896',b3:'华韵',b4:'西安店',b5:'华韵有限公司',b6:'2020-10-21',b7:'2021-10-20'}
      ],
      spinning: false, // 加载
      tag_id: '',
      form_params: {
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
      },
      rules: {
        p3: [
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' },
        ],
      },
      // 列表相关的代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    };
  },
  methods: {
    // 打开弹框
    open_aModel(type, row) {
      const _this = this;
      this.aModel = true;
    },
    // 获取表格列表
    get_table_list(page) {
      const _this = this;
      _this.spinning = true;
      if (page) { _this.table_param.page = page; }
      _this.$http.get('v1/live/notice/list', _this.table_param).then((resData) => {
        _this.spinning = false;
        if (resData.code === 0) {
          // _this.table_list = resData.result.lists.data;
          // _this.total_count = resData.result.lists.total;
        }
      });
    },
    onSubmit() {
      const _this = this;
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (_this.aModel_title == '添加公告') {
            _this.$http.post('v1/live/notice/add', _this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false;
                _this.ok('添加成功');
                _this.get_table_list(1);
              }
            });
          }

          if (_this.aModel_title == '编辑公告') {
            _this.$http.post('v1/live/notice/save', _this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false;
                _this.ok('添加成功');
                _this.get_table_list(1);
              }
            });
          }
        }
      });
    },
  },
  mounted() {
  },
  created() {
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
