<template>
  <div class="content">
    <a-form
      :form="form"
    >
      <a-form-item
        label="规则标题"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.title" placeholder="规则标题">
        </a-input>
      </a-form-item>
      <a-form-item
        label="内容"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 10,xs:24}"
      >
        <a-textarea
          placeholder="内容"
          :rows="4"
          v-model="formItem.content"
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
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.is_show" name="isShow">
          <a-radio :value="0">关闭</a-radio>
          <a-radio :value="1">开启</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="规则类型"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.type" style="width: 250px">
          <a-select-option v-for="(item) in ruleTypeList" :value="item.id">{{item.rule}}</a-select-option>
        </a-select>
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
        title: '', // 规则标题
        content: '', // 内容
        is_show: 1, // 是否开启，1开启0关闭
        type: '',
        listorder: '', // 排序
      },
      itemId: '',
      form: this.$form.createForm(this),
    }
  },
  computed: {
    ...mapState({
      dataItem: state => state.rule.dataItem,
      ruleTypeList: state => state.rule.ruleTypeList,
    }),
  },
  created() {
    if (this.$route.query.itemId) {
      this.itemId = this.$route.query.itemId;
      this.getDateItem(this.itemId);
    }
    this.getRuleType();
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      addDateItem: 'rule/addDateItem',
      getDateItem: 'rule/getDataItem',
      editDataItem: 'rule/editDataItem',
      getRuleType: 'rule/getRuleType',
    }),
    initData() {
      this.formItem.title = this.dataItem.title;
      this.formItem.listorder = this.dataItem.listorder;
      this.formItem.content = this.dataItem.content;
      this.formItem.is_show = this.dataItem.is_show;
      this.formItem.type = this.dataItem.type;
    },
    submitData() {
      let obj = {
        title: this.formItem.title,
        listorder: this.formItem.listorder,
        content: this.formItem.content,
        is_show: this.formItem.is_show,
        type: this.formItem.type,
      };
      if (this.itemId) {
        obj.id = this.itemId;
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
