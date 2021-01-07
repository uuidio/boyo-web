<template>
  <div class="content">
    <a-form
      :model="integralClassDetail" method="post"
    >
      <a-form-item
        :label="UserType === 'normal' ? '积分分类名称' : '牛币分类名称'"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="integralClassDetail.cat_name">
        </a-input>
      </a-form-item>
      <a-form-item
        label="是否隐藏"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="integralClassDetail.is_show" name="radioGroup" :defaultValue="0">
          <a-radio :value="0">显示</a-radio>
          <a-radio :value="1">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        :label="UserType === 'normal' ? '积分分类排序' : '牛币分类排序'"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="integralClassDetail.order" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitClass" type="primary">提交</a-button>
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
      id: 0,
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
      integralClassDetail: state => state.integral.integralClassDetail,
    }),
  },
  created() {
    if (this.$route.query.classId) {
      console.log(this.$route.query,111)
      this.classId = this.$route.query.classId;
      this.handleGetDetail();
    }
  },
  mounted() {

  },
  methods: {
    ...mapActions({
      addIntegralClass: 'integral/addIntegralClass',
      getIntegralClassDetail: 'integral/getIntegralClassDetail',
      editIntegralClass: 'integral/editIntegralClass',
    }),
    handleGetDetail() {
      this.getIntegralClassDetail(this.classId);
    },
    submitClass() {
      let obj = {
        cat_name: this.integralClassDetail.cat_name,
        order: this.integralClassDetail.order,
        is_show: this.integralClassDetail.is_show,
      };
      if (this.classId) {
        obj.id = this.integralClassDetail.id;
        this.editIntegralClass({ formItem: obj });
      } else {
        this.addIntegralClass({ formItem: obj });
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
