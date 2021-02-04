<template>
  <a-spin :spinning="spinning">
    <div class="content spin-content">
      <div class="mb20">
        <div class="list-nav">
          <div>
            <a-button type="primary" @click="open_aModel('新增')"> + 新建笔记本</a-button>
          </div>
        </div>
      </div>
      <div>
        <a-table :pagination="false" rowKey="created_at" :columns="columns" :data-source="table_list">
          <span slot="action" slot-scope="text,record">
            <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">编辑</a-button>
            <a-button type="danger" size="small" icon="search"  style="margin-left: 10px;" @click="c_router('/show_text/list-in',{cid: record.id,name: record.classify_name})">查看笔记</a-button>
            <a-button type="primary" size="small" icon="delete" @click="open_delete(record)" style="margin-left:10px;">删除</a-button>
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
      <a-modal title="新建笔记本" v-model="aModel" @ok="onSubmit()">
        <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
          <a-form-model-item label="笔记本名称:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }" prop="classify_name">
            <a-input v-model="form_params.classify_name" placeholder="请输入笔记本名称" size="large"></a-input>
          </a-form-model-item>
        </a-form-model>
      </a-modal>
    </div>
  </a-spin>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import http from '@/api/http';
export default {
  computed: {

  },
  data() {
    return {
      rules: {
        classify_name: [
          { required: true, message: '请输入笔记本名称', trigger: 'blur' },
          { max: 15, message: '最大长度为15', trigger: 'blur' },
        ],
      },
      columns: [
        {title: '题词本名称', dataIndex: 'classify_name', key: 'classify_name',},
        {title: '笔记数量', dataIndex: 'count', key: 'count',},
        {title: '创建时间', dataIndex: 'created_at', key: 'created_at',},
        {title: '操作', key: 'action', dataIndex: 'action', scopedSlots: { customRender: 'action' },fixed: 'right',}
      ],
      aModel_title: '',
      uploadImageList: [], // 选中的图片
      form_params: {
        classify_name: '', // 名称
        id: '', // 编辑用的
      },
      aModel: false, // 弹框
      imageLists: [], // 上传
      // 列表相关的代码------------------------------------------------------------------------------
      table_param: {
        page: 1, //当前页面
        per_page: 10,
      },
      total: 0, // 总条数
      page_count: 0, // 总页数F
      table_list: [], // 表格数据
      spinning: false // 加载
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'trade/selfExtractList',
    }),
    // 删除
    open_delete (row) {
      const _this = this
      this.$confirm({
        title: '是否确定删除？',
        okText: '确定',
        cancelText: '取消',
        onCancel() {},
        onOk() {
          return new Promise((resolve, reject) => {
            _this.$fetch.post('v1/autocue/classify/delete', { id: row.id }).then((resData) => {
              if (resData.data.code === 0) {
                if(_this.table_list.length==1){
                  _this.get_table_list(_this.table_param.page-1)
                } else {
                  _this.get_table_list()
                }
                _this.ok('操作成功');
                resolve()
              } else {
                reject(resData)
              }
            })
          }).catch(() => {
            _this.xx('异常，请联系管理员');
          });
        },
      });
    },
    // 打开弹框
    open_aModel(type, row) {
      const _this = this
      this.aModel = true
      if (type === '新增') {
        this.form_params.classify_name = '';
        this.aModel_title = '新建题词本';
      }
      if (type === '编辑') {
        this.form_params.classify_name = row.classify_name;
        this.form_params.id = row.id;
        this.aModel_title = '编辑题词本';
      }
    },
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if (_this.aModel_title == '新建题词本') {
            _this.$http.post('v1/autocue/classify/add',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('添加成功')
                _this.get_table_list(1)
              }
            });
          }
          if (_this.aModel_title == '编辑题词本') {
            _this.$http.post('v1/autocue/classify/save',_this.form_params).then((resData) => {
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
    // 获取表格列表
    get_table_list(page) {
      let _this = this;
      this.spinning = true
      if(page){_this.table_param.page = page}
      this.$http.get('v1/autocue/classify/list', _this.table_param).then((resData) => {
        if (resData.code === 0) {
          this.spinning = false
          _this.table_list = resData.result.lists.data
          _this.total_count = resData.result.lists.total
          _this.page_count = resData.result.lists.last_page
        }
      });
    },
  },
  created() {
    this.get_table_list(1);
  },
  mounted() {

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
