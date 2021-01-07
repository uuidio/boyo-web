<template>
  <div class="content">
    <a-form
      :form="form"
    >
      <a-form-item
        label="消息内容"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 10,xs:24}"
      >
        <a-textarea
          placeholder="消息内容"
          :rows="4"
          v-model="formItem.term"
        />
      </a-form-item>
      <a-form-item
        label="排序"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.reject_sort" placeholder="排序"/>
      </a-form-item>
      <a-form-item
        label="是否开启"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.reject_status" name="isShow">
          <a-radio :value="0">关闭</a-radio>
          <a-radio :value="1">开启</a-radio>
        </a-radio-group>
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

export default {
  name: 'editQuickReject',
  data() {
    return {
      formItem: {
        term: '', // 驳回消息具体内容
        reject_status: 1, // 是否开启，1开启0关闭
        reject_sort: '', // 排序
      },
      itemId: '',
      form: this.$form.createForm(this),
    };
  },
  computed: {
    ...mapState({
      dataItem: state => state.member.quickRejectItem,
    }),
  },
  created() {
    if (this.$route.query.itemId) {
      console.log(this.$route.query, 77)
      this.itemId = this.$route.query.itemId;
      this.getDateItem(this.itemId);
    }
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      addDateItem: 'member/addQuickReject',
      getDateItem: 'member/getQuickRejectDetail',
      editDataItem: 'member/editQuickReject',
    }),
    initData() {
      this.formItem.term = this.dataItem.term;
      this.formItem.reject_status = this.dataItem.reject_status;
      this.formItem.reject_sort = this.dataItem.reject_sort;
    },
    submitData() {
      const obj = {
        term: this.formItem.term,
        reject_status: this.formItem.reject_status,
        reject_sort: this.formItem.reject_sort,
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
