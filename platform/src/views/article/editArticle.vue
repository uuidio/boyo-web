<template>
  <div class="content">
    <a-form
      :form="form"
    >
      <a-form-item
        label="标题"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.title" placeholder="主标题">
        </a-input>
      </a-form-item>
      <a-form-item
        label="副标题"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-textarea
          placeholder="商品副标题"
          :rows="4"
          v-model="formItem.subtitle"
        />
      </a-form-item>
      <a-form-item
        label="分类排序"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.listorder" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        label="是否开启"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.is_show" name="isShow" :defaultValue="0">
          <a-radio :value="0">关闭</a-radio>
          <a-radio :value="1">开启</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="是否展示标题"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.title_is_show" name="showTit" :defaultValue="0">
          <a-radio :value="0">不展示</a-radio>
          <a-radio :value="1">展示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="文章类型"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.type" name="radioType" :defaultValue="0">
          <a-radio :value="0">文本</a-radio>
          <a-radio :value="1">活动</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="关联自定义活动"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="formItem.type === 1"
      >
        <a-select :value="formItem.activity_id" @change="handleChange">
          <a-select-option :value="item.id" v-for="(item,index) in activityList" :key="index">{{item.title}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="文章主图"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 12,xs:24}"
      >
        <UploadImage
          :defaultImageList="imageLists"
          :shopId="1"
          :maximum="1"
          :isSingle="true"
          ref="uploadImageLists"
        ></UploadImage>
        <p>
          最多只能上传1张，建议使用尺寸710x280像素、大小不超过1M的长方形图片
        </p>
      </a-form-item>
      <a-form-item
        label="文章内容"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 21, xs: 24 }"
        v-if="formItem.type == 0"
      >
        <Ueditor
          ref="editor"
          editor_id="editor1"
          v-model="formItem.content"
        >
        </Ueditor>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitData" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
import Ueditor from '@C/ueditor/ueditor';

export default {
  name: 'addArticle',
  components: {
    UploadImage,
    Ueditor,
  },
  data() {
    return {
      imageLists: [],
      formItem: {
        title: '', // 标题
        article_url: '', // 主图
        subtitle: '', // 副标题
        listorder: '', // 排序
        content: '', // 内容
        is_show: 0, // 是否开启，1开启0关闭
        title_is_show: 1, // 是否展示标题 0不展示 1展示
        type: 0, // 文章类型 0文本 1活动
        activity_id: '', // 关联自定义活动的id（文章类型为活动的时候需要记录）
      },
      activityId: '',
      content: '',
      form: this.$form.createForm(this),
      itemId: '',
    }
  },
  computed: {
    ...mapState({
      activityList: state => state.article.activityList,
      dataItem: state => state.article.dataItem,
    }),
    // currentActivity () {
    //   if (this.activityList.length > 0) {
    //     if (this.dataItem.activity_id) {
    //       for (let i = 0; i < this.activityList.length; i++) {
    //         if (this.activityList[i].id === this.dataItem.activity_id) {
    //           console.log(this.dataItem.activity_id, 333)
    //           return this.activityList[i].title;
    //         }
    //       }
    //     } else {
    //       console.log(this.dataItem.activity_id, 333)
    //       return this.activityList[0].title;
    //     }
    //   } else {
    //     return '';
    //   }
    // },
    // imageLists() {
    //   if (this.dataItem.article_url) {
    //     return [{ url: this.dataItem.article_url, status: 'finished' }];
    //   } else {
    //     return [];
    //   }
    // },
  },
  created() {
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.getArticleItem(this.articleId);
    } else {
      // this.initDataItem();
    }
    this.getActivityList();
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      addDateItem: 'article/addDateItem',
      getArticleItem: 'article/getDataItem',
      editDataItem: 'article/editDataItem',
      getActivityList: 'article/getActivityList',
      initDataItem: 'article/initDataItem',
    }),
    initData() {
      if (this.dataItem.article_url) {
        this.imageLists = [{ url: this.dataItem.article_url, status: 'finished' }];
      }
      this.formItem.title = this.dataItem.title;
      this.formItem.subtitle = this.dataItem.subtitle;
      this.formItem.listorder = this.dataItem.listorder;
      this.formItem.content = this.dataItem.content;
      this.formItem.is_show = this.dataItem.is_show;
      this.formItem.title_is_show = this.dataItem.title_is_show;
      this.formItem.type = this.dataItem.type;
      this.formItem.activity_id = this.dataItem.activity_id;
    },
    handleChange(value, option) {
      console.log(value, 999)
      this.formItem.activity_id = value;
    },
    submitData() {
      let obj = {
        title: this.formItem.title,
        article_url: this.formItem.article_url,
        subtitle: this.formItem.subtitle,
        listorder: this.formItem.listorder,
        is_show: this.formItem.is_show,
        title_is_show: this.formItem.title_is_show,
        type: this.formItem.type,
      };
      if (this.formItem.type === 0) {
        obj.content = this.$refs.editor.tmpContent;
      }
      if (this.$refs.uploadImageLists.uploadImageList.length > 0) {
        obj.article_url = this.$refs.uploadImageLists.uploadImageList[0].url;
      }
      if (this.formItem.type === 1) {
        obj.activity_id = this.formItem.activity_id;
        if (!obj.activity_id || obj.activity_id <= 0) {
          this.$notification.error({
            message: '请选择关联活动',
            description: '',
          });
          return false;
        }
      }
      if (this.articleId) {
        obj.id = this.articleId;
        this.editDataItem(obj);
      } else {
        this.addDateItem(obj);
      }
    },
  },
  watch: {
    dataItem() {
      this.initData();
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
