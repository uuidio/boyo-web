<template>
  <div class="content">
    <a-form>
      <a-form-item
        label="标题"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input readonly v-model="dataItem.title" placeholder="文章标题">
        </a-input>
      </a-form-item>
      <a-form-item
      label="副标题"
      :label-col="{ md: 3,xs:24 }"
      :wrapper-col="{ md: 6,xs:24}"
    >
      <a-textarea
        readonly
        placeholder="文章副标题"
        :rows="4"
        v-model="dataItem.subtitle"
      />
    </a-form-item>
      <a-form-item
        label="分类排序"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input readonly v-model="dataItem.listorder" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
      label="是否开启"
      :label-col="{ md: 3,xs:24 }"
      :wrapper-col="{ md: 6,xs:24}"
    >
      <a-radio-group v-model="dataItem.is_show" name="radioGroup" :defaultValue="0">
        <a-radio :value="0" :disabled="true">关闭</a-radio>
        <a-radio :value="1" :disabled="true">开启</a-radio>
      </a-radio-group>
    </a-form-item>
      <a-form-item
        label="是否展示标题"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="dataItem.title_is_show" name="radioGroup" :defaultValue="0">
          <a-radio :value="0" :disabled="true">不展示</a-radio>
          <a-radio :value="1" :disabled="true">展示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="文章类型"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="dataItem.type" name="radioGroup" :defaultValue="0">
          <a-radio :value="0" :disabled="true">文本</a-radio>
          <a-radio :value="1" :disabled="true">活动</a-radio>
        </a-radio-group>
      </a-form-item>

      <a-form-item
        label="关联自定义活动"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="dataItem.type === 1"
      >
        <a-input readonly v-model="dataItem.activity_name
" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        label="活动主图"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 12,xs:24}"
      >
        <div class="img-box" v-if="dataItem.article_url">
          <img :src="dataItem.article_url" alt="">
        </div>
        <div v-else class="img-box" >
          <img src="/src/assets/img_0.png" alt="">
        </div>
      </a-form-item>
      <a-form-item
        label="商品描述"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 21, xs: 24 }"
      >
        <div class="article-content" v-html="dataItem.content"></div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button v-if="dataItem.verify_status !== 1" class="mr10" @click="showModal" type="primary">去审核</a-button>
        <a-button  @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
    <a-modal
      title="文章审核"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
      >
        <a-form-item
          label="文章标题"
          :label-col="{ md:4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <p>{{dataItem.title}}</p>
        </a-form-item>
        <a-form-item
          label="审核状态"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-radio-group v-model="status" name="radioGroup">
            <a-radio :value="1">通过</a-radio>
            <a-radio :value="2">不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 12,xs:24}"
        >
          <a-textarea
            placeholder="审核备注"
            :rows="4"
            v-model="remark"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Ueditor from '@C/ueditor/ueditor';

export default {
  name: 'addArticle',
  components: {
    Ueditor,
  },
  data() {
    return {
      activityId: '',
      itemId: '',
      status: 1,
      remark: '',
      visible: false,
    }
  },
  computed: {
    ...mapState({
      dataItem: state => state.article.dataItem,
    }),
  },
  created() {
    if (this.$route.query.articleId) {
      this.articleId = this.$route.query.articleId;
      this.getArticleItem(this.articleId);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getArticleItem: 'article/getDataItem',
      verifyItem: 'article/verifyArticleItem',
    }),
    showModal(item) {
      this.visible = true;
    },
    handleOk() {
      this.verifyItem({
        id: this.dataItem.id,
        status: this.status,
        remark: this.remark,
      });
    },
    handleCancel() {
      this.visible = false;
    },
    verify(item) {
      this.verifyItem(this.dataItem.id);
    },
  },
  watch: {

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
.img-box
  width 150px
  img
    width 100%
.article-content
  1px solid #d9d9d9
  padding 10px
  border-radius 4px
</style>
