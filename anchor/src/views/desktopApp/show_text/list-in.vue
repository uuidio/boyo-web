<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav">
        <div style="width:100%">
          <h4 style="display:inline-block;font-size:20px;color:#1890ff;margin-right:20px;float:left"><a-icon type="book" /> {{$route.query.name}}</h4>
          <div style="float:right">
          <a-button type="primary" @click="open_aModel('新增')"> + 新建笔记</a-button>
          <a-button type="danger" @click="$router.push('/show_text/list')" icon="rollback"> 返回</a-button>
          </div>
        </div>
      </div>
    </div>
    <div>
      <a-table :pagination="false" rowKey="created_at" :columns="columns" :data-source="table_list">
        <span slot="tags" slot-scope="text,record">
          <a-tag :color="'geekblue'">{{ record.antistop_one }}</a-tag>
          <a-tag :color="'geekblue'">{{ record.antistop_two }}</a-tag>
          <a-tag :color="'geekblue'">{{ record.antistop_three }}</a-tag>
        </span>
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">编辑</a-button>
          <a-button type="danger" size="small" icon="delete" @click="open_delete(record)" style="margin-left:10px;">删除</a-button>
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
    <a-modal title="新建笔记" v-model="aModel" @ok="onSubmit()">
      <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
        <a-form-model-item label="笔记标题:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }" prop="title">
          <a-input style="width: 100%" v-model="form_params.title" placeholder="请输入笔记标题"/>
        </a-form-model-item>
        <a-form-model-item label="笔记关键词1:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }" >
          <a-input style="width: 100%" v-model="form_params.antistop_one" placeholder="笔记关键词1"/>
        </a-form-model-item>
        <a-form-model-item label="笔记关键词2:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }">
          <a-input style="width: 100%" v-model="form_params.antistop_two" placeholder="笔记关键词2"/>
        </a-form-model-item>
        <a-form-model-item label="笔记关键词3:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }">
          <a-input style="width: 100%" v-model="form_params.antistop_three" placeholder="笔记关键词3"/>
        </a-form-model-item>
        <a-form-model-item label="内容:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }">
          <a-input type="textarea" style="width: 100%" v-model="form_params.content" placeholder="请输入文案内容"/>
        </a-form-model-item>
        <a-form-model-item label="排序:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }" prop="sort">
          <a-input style="width: 100%" v-model="form_params.sort" placeholder="请输入已存在序号，并调换"/>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      listsData: state => state.trade.selfExtractData,
      pages: state => state.trade.selfExtractPages,
      listField: state => state.trade.selfExtractFields,
      exportData: state => state.trade.exportData,
    }),
  },
  data() {
    return {
      aModel_title: '',
      columns: [
        {
          title: '笔记标题',
          dataIndex: 'title',
          key: 'title',

        },
        {
          title: '关键字',
          scopedSlots: { customRender: 'tags' },
        },
        {
          title: '序号',
          dataIndex: 'sort',
          key: 'sort',
        },
        {
          title: '操作',
          key: 'action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          width: '200px'
        }],
      getData: {
        page: 1,
      },
      exportForm: {
        page: 1,
      },
      currentParam: {},
      filterParams: {},
      exportModel: false,
      isFillter: false,
      currentAct: '-1',
      currentPages: 1,
      title: '售后列表筛选',
      timeVisible: true,
      // 新的代码----------------------------------------------------------------------------------
      form_params: {
        cid: '',
        id: '',
        title: '', // 名称
        antistop_one: '', // 1
        antistop_two: '', // 2
        antistop_three: '', // 3
        content: '', // 内容
        sort: '', // 排序
      },
      rules: {
        title: [
          { required: true, message: '请输入笔记标题', trigger: 'blur' },
        ],
        sort: [
          { required: true, message: '请输入排序', trigger: 'blur' },
          { pattern: /^[1-9]\d*$/, message: '请输入大于0正整数' },
        ],
      },
      aModel: false, // 弹框
      // 新的代码----------------------------------------------------------------------------------
      table_param: {
        page: 1,
        per_page: 10,
        cid: '',
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [],
      spinning: false,
    };
  },
  methods: {
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
            _this.$fetch.post('v1/autocue/delete', { id: row.id }).then((resData) => {
              if (resData.data.code === 0) {
                if(_this.table_list.length == 1){
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
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(_this.aModel_title == '新建笔记'){
            _this.$http.post('v1/autocue/add',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('添加成功')
                _this.get_table_list(1)
              }
            });
          }
          if(_this.aModel_title == '编辑笔记'){
            _this.$http.post('v1/autocue/save',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('操作成功')
                _this.get_table_list()
              }
            });
          }
        }
      });
    },
    // 打开弹框
    open_aModel(type, row) {
      const _this = this;
      this.aModel = true;
      if (type === '新增') {
        this.aModel_title = '新建笔记';
        _this.form_params = {
          cid: _this.form_params.cid,
          title: '', // 名称
          antistop_one: '', // 1
          antistop_two: '', // 2
          antistop_three: '', // 3
          content: '', // 内容
          sort: '', // 排序
        };
      }
      if (type === '编辑') {
        this.aModel_title = '编辑笔记';
        _this.form_params = {
          cid: _this.form_params.cid,
          id: row.id,
          title: row.title, // 名称
          antistop_one: row.antistop_one, // 1
          antistop_two: row.antistop_two, // 2
          antistop_three: row.antistop_three, // 3
          content: row.content, // 内容
          sort: row.sort, // 排序
        };
        this.aModel_title = '编辑笔记';
      }
    },
    // 获取表格列表
    get_table_list(page) {
      let _this = this;
      _this.table_param.page = page
      _this.$http.get('v1/autocue/list', _this.table_param).then((resData) => {
        if (resData.code === 0) {
          _this.table_list = resData.result.lists.data
          _this.total_count = resData.result.lists.total
          _this.page_count = resData.result.lists.last_page
        }
      });
    },
  },
  created() {
    this.form_params.cid = this.$route.query.cid // 获取id
    this.table_param.cid = this.$route.query.cid // 获取id
    this.get_table_list(1);
  },
  mounted() {
  },
  watch: {
    exportData() {
      this.orderCallback();
    },
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
