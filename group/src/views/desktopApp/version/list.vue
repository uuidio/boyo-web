<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div>
          <a-button type="primary" @click="open_aModel('新增')"> + 发布版本</a-button>
        </div>
      </div>
    </div>
    <div>
      <a-table rowKey="created_at" :pagination="false" :columns="columns" :data-source="table_list">
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">查看</a-button>
          <a-button type="danger" size="small" icon="download" @click="download(record)" style="margin-left:10px;">下载apk</a-button>
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
    <a-modal :title="aModel_title" v-model="aModel" @ok="onSubmit()" width="1300px">
      <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
        <a-form-model-item label="版本号:" :label-col="{ md: 3,xs:24 }" :wrapper-col="{ md: 6,xs:24}" prop="versions">
          <a-input v-model="form_params.versions" placeholder="请输入版本号"></a-input>
          <span style="position: absolute;right: -502px;top:-10px;"><a-icon type="info-circle" /> <span> 命名规则建议为V + 版本号_ + D + 日期_（如：V1.01.03D2021.01.14）</span></span>
        </a-form-model-item>
        <a-form-model-item label="版本更新说明:" :label-col="{ md: 3,xs:24 }" :wrapper-col="{ md: 6,xs:24}" prop="content">
          <a-textarea v-model="form_params.content" placeholder="请输入文章内容" :rows="4" />
        </a-form-model-item>
        <a-form-model-item label="apk文件:" :label-col="{ md: 3,xs:24 }" :wrapper-col="{ md: 6,xs:24}" prop="url">
          <el-upload v-if="!form_params.url" @clear_file="clear_file" @handleAvatarSuccess="handleAvatarSuccess" :option="option" :form_params="form_params"></el-upload>
          <div v-if="form_params.url"><span >{{file_name}}</span> <a-button style="margin-left:10px" size="small" @click="clear_file" shape="circle" theme="twoTone" icon="delete" /></div>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Server from '@/config/server';
import { getAccessToken } from '@/utils/util';
import elUpload from '@/components/upload/file_uploader.vue';


export default {
  components: {
    elUpload,
  },
  computed: {

  },
  data() {
    return {
      file_name: '11.apk',
      option: {
        url: 'v1/upload/apk',
        name: 'apk',
      },
      aModel_title: '',
      aModel: false, // 弹框
      // 列表相关的代码------------------------------------------------------------------------------
      columns: [
        {
          title: '版本号',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '发布日期',
          dataIndex: 'updated_at',
          key: 'updated_at',
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
        id: '', // 编辑用的
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [],
      spinning: false, // 加载
      tag_id: '',
      form_params: {
        id: '', // 编辑用的
        versions: '', // 名称
        content: '', // 内容
        url: '',
      },
      rules: {
        versions: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        content: [
          { required: true, message: '必填', trigger: 'blur' },
        ],
        url: [
          { required: true, message: '必上传', trigger: 'change' },
        ],
      },
      // 列表相关的代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
      // 上传图片-----------
      uploadImageUrl: Server.baseURL + Server.action.upload_image,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      imageUrl: '',
      loading: false,
      fileList: [],

    };
  },
  methods: {
    clear_file() {
      this.form_params.url = ''
    },
    download(record) {
      window.location.href = record.url;
    },
    // 上传成功
    handleAvatarSuccess(url,name) {
      this.form_params.url = url;
      this.file_name = name
    },
    // 打开弹框
    open_aModel(type, row) {
      const _this = this;
      this.aModel = true;
      if (type === '新增') {
        this.form_params.versions = '';
        this.form_params.content = '';
        this.aModel_title = '发布版本';
      }
      if (type === '编辑') {
        this.form_params.versions = row.versions;
        this.form_params.content = row.content;
        this.form_params.id = row.id;
        this.aModel_title = '查看版本';
      }
    },
    // 获取表格列表
    get_table_list(page) {
      const _this = this;
      _this.spinning = true;
      if (page) { _this.table_param.page = page; }
      _this.$http.get('v1/versions/list', _this.table_param).then((resData) => {
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
          if (_this.aModel_title === '发布版本') {
            _this.$http.post('v1/versions/add', _this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false;
                _this.ok('添加成功');
                _this.get_table_list(1);
              }
            });
          }
          if (_this.aModel_title === '查看版本') {
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
