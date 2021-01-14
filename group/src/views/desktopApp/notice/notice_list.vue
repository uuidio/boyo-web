<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div>
          <a-button type="primary" @click="open_aModel('新增')"> + 添加公告</a-button>
        </div>
      </div>
    </div>
    <div>
      <a-table rowKey="created_at" :pagination="false" :columns="columns" :data-source="table_list">
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">编辑</a-button>
          <a-button type="danger" size="small" icon="delete" @click="open_delete({url:'v1/live/notice/delete',data:{id:record.id}})" style="margin-left:10px;">删除</a-button>
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
        <a-form-model-item label="分类名称:" :label-col="{ md: 3,xs:24 }" :wrapper-col="{ md: 6,xs:24}" prop="title">
          <a-input v-model="form_params.title" placeholder="请输入公告标题" size="large"></a-input>
        </a-form-model-item>
        <a-form-model-item label="文章内容:" :label-col="{ md: 3, xs: 24 }" :wrapper-col="{ md: 21, xs: 24 }">
          <Ueditor ref="editor" editor_id="editor1" v-model="form_params.notice"> </Ueditor>
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
  components: {
    UploadImage,
    Ueditor,
  },
  computed: {

  },
  data() {
    return {
      aModel_title: '',
      aModel: false, // 弹框
      // 列表相关的代码------------------------------------------------------------------------------
      columns: [
        {
          title: '文章名称',
          dataIndex: 'title',
          key: 'title',
        },
        {
          title: '创建日期',
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
        id: '',
        title: '', // 名称
        content: '' // 内容
      },
      rules: {
        title: [
          { required: true, message: '请输文章标题', trigger: 'blur' },
        ],
      },
      // 列表相关的代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
    };
  },
  methods: {
    // 打开弹框
    open_aModel(type, row) {
      const _this = this
      this.aModel = true
      if (type === '新增') {
        this.form_params.title = '';
        this.form_params.notice = '';
        this.aModel_title = '添加公告';
      }
      if (type === '编辑') {
        this.form_params.title = row.title;
        this.form_params.notice = row.notice;
        this.form_params.id = row.id;
        this.aModel_title = '编辑公告';
        console.log(this.aModel_title);
      }
    },
    // 获取表格列表
    get_table_list(page) {
      let _this = this;
      _this.spinning = true
      if(page){_this.table_param.page = page}
      _this.$http.get('v1/live/notice/list', _this.table_param).then((resData) => {
        _this.spinning = false
        if (resData.code === 0) {
          _this.table_list = resData.result.lists.data
          _this.total_count = resData.result.lists.total
        }
      });
    },
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          console.log(9999999999);
          if (_this.aModel_title == '添加公告') {
            _this.$http.post('v1/live/notice/add',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('添加成功')
                _this.get_table_list(1)
              }
            });
          }

          if (_this.aModel_title == '编辑公告') {

            _this.$http.post('v1/live/notice/save',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('添加成功')
                _this.get_table_list(1)
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
