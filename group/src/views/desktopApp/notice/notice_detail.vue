<template>
  <div class="content">
    <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
      <a-form-model-item label="分类名称:" :label-col="{ md: 3,xs:24 }" :wrapper-col="{ md: 6,xs:24}" prop="title">
        <a-input v-model="form_params.title" placeholder="请输入公告标题" size="large"></a-input>
      </a-form-model-item>
      <a-form-model-item label="文章内容:" :label-col="{ md: 3, xs: 24 }" :wrapper-col="{ md: 21, xs: 24 }">
        <Ueditor ref="editor" editor_id="editor1" v-model="form_params.notice"> </Ueditor>
      </a-form-model-item>
      <div style="margin-left:137px">
        <a-button @click="onSubmit()" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </div>
    </a-form-model>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
import Ueditor from '@C/ueditor/notice_ueditor';

export default {
  name: 'addArticle',
  components: {
    UploadImage,
    Ueditor,
  },
  data() {
    return {
      // 新的代码----------------------------------------------------------------------------------
      form_params: {
        title: '', // 名称
      },
      rules: {
        title: [
          { required: true, message: '请输文章标题', trigger: 'blur' },
        ],
      },
      imageLists: [],
      formItem: {
        title: '', // 标题
        content: '', // 内容
      },
      activityId: '',
      content: '',
      itemId: '',
    };
  },
  computed: {
    ...mapState({
      activityList: state => state.article.activityList,
      dataItem: state => state.article.dataItem,
    }),
  },
  created() {
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.getArticleItem(this.articleId);
    } else {
      // this.initDataItem();
    }
    // this.get_detail();
  },
  mounted() {
  },
  methods: {
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.$http.post('v1/live/notice/add',_this.form_params).then((resData) => {
            if (resData.code === 0) {
              _this.aModel = false
              _this.ok('添加成功')
            }
          });
        }
      });
    },
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-select-dropdown-menu-item-selected
    font-weight normal
  >>> .option-first
    color #2d8cf0
  .articleContentTit
    padding 8px 10px
    margin-bottom 20px
    background #efefef font-weight 700
</style>
