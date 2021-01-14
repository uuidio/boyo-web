<template>
  <a-spin :spinning="spinning">
    <div class="content spin-content">
    <div class="mb20">
      <div class="list-nav">
        <div>
          <a-button type="primary" @click="open_aModel('新增')"> + 新建分类</a-button>
        </div>
      </div>
    </div>
    <div>
      <a-table rowKey="created_at" :pagination="false" :columns="columns" :data-source="table_list">
        <span slot="action" slot-scope="text,record">
          <a-button type="primary" size="small" icon="edit" @click="open_aModel('编辑',record)">编辑</a-button>
          <AlbumPics :tag_id="tag_id" :isMultiple="true" :id="12" :maximum="1" style="display:inline-block">
            <a-button type="danger" size="small" icon="search"  style="margin-left: 10px;" @click="look_img(record)">查看相册</a-button>
          </AlbumPics>
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
    <a-modal :title="aModel_title" v-model="aModel" @ok="onSubmit()">
      <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
        <a-form-model-item label="分类名称:" :label-col="{ md: 6, xs: 24 }" :wrapper-col="{ md: 18, xs: 24 }" prop="name">
          <a-input v-model="form_params.name" placeholder="请输入分类名称" size="large"></a-input>
        </a-form-model-item>
      </a-form-model>
    </a-modal>
  </div>
  </a-spin>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import AlbumPics from '@C/album/pics_stickers';
// import http from '@/api/http';

export default {
  components: {
    AlbumPics,
  },
  computed: {

  },
  data() {
    return {
      aModel_title: '',
      uploadImageList: [], // 选中的图片
      rules: {
        name: [
          { required: true, message: '请输入分类名称', trigger: 'blur' },
        ],
      },
      columns: [
        {
          title: '分类名称',
          dataIndex: 'name',
          key: 'name',

        },
        {
          title: '图片数量',
          dataIndex: 'count',
          key: 'count',
        },
        {
          title: '创建时间',
          dataIndex: 'created_at',
          key: 'created_at',
        },
        {
          title: '操作',
          key: 'action',
          dataIndex: 'action',
          scopedSlots: { customRender: 'action' },
          fixed: 'right'
        }],
      // 新的代码----------------------------------------------------------------------------------
      form_params: {
        name: '', // 名称
      },
      aModel: false, // 弹框
      imageLists: [], // 上传
      // 列表相关的代码------------------------------------------------------------------------------
      table_param: {
        page: 1,
        per_page: 10,
        id: '', // 编辑用的
      },
      total: 0, // 总条数
      page_count: 0, // 总页数
      table_list: [],
      spinning: false, //加载
      tag_id: '',
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
            _this.$fetch.post('v1/tag/delete', { id: row.id }).then((resData) => {
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
          }).catch((resData) => {
            console.log(resData);
            _this.xx(resData.data.message);
          });
        },
      });
    },
    // 打开弹框
    open_aModel(type, row) {
      const _this = this
      this.aModel = true
      if (type === '新增') {
        this.form_params.name = '';
        this.form_params.name = '';
        this.aModel_title = '新建分类';
      }
      if (type === '编辑') {
        this.form_params.name = row.name;
        this.form_params.id = row.id;
        this.aModel_title = '编辑分类';
      }
    },
    // // 选择图片
    look_img(row) {
      console.log(row);
      this.tag_id = row.id
    },
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          if(_this.aModel_title == '新建分类'){
            _this.$http.post('v1/tag/add',_this.form_params).then((resData) => {
              if (resData.code === 0) {
                _this.aModel = false
                _this.ok('添加成功')
                _this.get_table_list(1)
              }
            });
          }
          if(_this.aModel_title == '编辑分类'){
            _this.$http.post('v1/tag/save',_this.form_params).then((resData) => {
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
    // 获取表格列表
    get_table_list(page) {
      let _this = this;
      _this.spinning = true
      if(page){_this.table_param.page = page}
      _this.$http.get('v1/tag/list', _this.table_param).then((resData) => {
        _this.spinning = false
        if (resData.code === 0) {
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
