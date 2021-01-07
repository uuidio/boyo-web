<template>
  <div class="content">
    <a-form
      :model="classifyItem" method="post"
    >
      <a-form-item
        label="分类名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="classifyItem.name" placeholder="分类名称">
        </a-input>
      </a-form-item>
      <a-form-item
        label="分类父级"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select defaultValue="顶级分类" @change="handleChange">
          <a-select-option value="0">顶级分类</a-select-option>
          <a-select-option value="1">分类1</a-select-option>
          <a-select-option value="2" disabled>分类2</a-select-option>
        </a-select>
      </a-form-item>
<!--      <a-form-item-->
<!--        label="是否隐藏"-->
<!--        :label-col="{ md: 4,xs:24 }"-->
<!--        :wrapper-col="{ md: 6,xs:24}"-->
<!--      >-->
<!--        <a-radio-group v-model="integralClassDetail.is_show" name="radioGroup" :defaultValue="0">-->
<!--          <a-radio :value="0">显示</a-radio>-->
<!--          <a-radio :value="1">隐藏</a-radio>-->
<!--        </a-radio-group>-->
<!--      </a-form-item>-->
      <a-form-item
        label="分类排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="classifyItem.listorder" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitClassify" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  name: 'add',
  components: {
    UploadImage,
  },
  data() {
    return {
      classifyId: '',
      formItem: {
        cat_name: '',
        parent_id: 0,
        order: 0,
        is_show: 0,
      },
    };
  },
  computed: {
    ...mapState({
      classifyItem: state => state.article.classifyItem,
    }),
  },
  created() {
    if (this.$route.query.classifyId) {
      this.classifyId = this.$route.query.classifyId;
      this.getClassifyItem(this.classifyId);
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      addClassify: 'article/addClassify',
      getClassifyItem: 'article/getClassifyItem',
      editClassify: 'article/editClassify',
    }),
    handleChange(value, option) {
      console.log(`selected ${value}`);
      console.log(this.classifyItem, option);
    },
    submitClassify() {
      let obj = {
        name: this.classifyItem.name,
        listorder: this.classifyItem.listorder,
        parent_id: this.classifyItem.parent_id,
      };
      if (this.classifyId) {
        obj.id = this.classifyItem.id;
        this.editClassify(obj);
      } else {
        this.addClassify(obj);
      }
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
</style>
