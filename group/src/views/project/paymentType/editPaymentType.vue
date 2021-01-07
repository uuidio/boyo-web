<template>
  <div class="content">
    <a-form
      :form="form"
    >
      <a-form-item
        label="支付类型"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.pay_type" style="width: 250px">
          <a-select-option v-for="(value, key, index) in paymentType" :value="key">{{value}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="项目选择"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.pay_gm_id" style="width: 250px" allowClear>
          <a-select-option v-for="(item) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
        </a-select>
      </a-form-item>

      <a-form-item
        label="支付类型代码"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.pay_type_code" placeholder="支付类型代码">
        </a-input>
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
        pay_type: '',
        pay_gm_id: '',
        pay_type_code: '',
      },
      itemId: '',
      form: this.$form.createForm(this),
    };
  },
  computed: {
    ...mapState({
      dataItem: state => state.project.paymentTypeDetail,
      paymentType: state => state.project.paymentType,
      gmlistData: state => state.project.lists,
    }),
  },
  created() {
    if (this.$route.query.itemId) {
      this.itemId = this.$route.query.itemId;
      this.getDateItem(this.itemId);
    }
    this.getPaymentType();
    this.gmfetchLists({
      per_page: 1000000,
      is_open: 1,
    });
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      addDateItem: 'project/addPaymentType',
      getDateItem: 'project/getPaymentTypeDetail',
      editDataItem: 'project/editPaymentType',
      gmfetchLists: 'project/fetchLists',
      getPaymentType: 'project/getPaymentType',
    }),
    initData() {
      this.formItem.pay_type = this.dataItem.pay_type;
      this.formItem.pay_gm_id = this.dataItem.pay_gm_id;
      this.formItem.pay_type_code = this.dataItem.pay_type_code;
    },
    submitData() {
      const obj = {
        pay_type: this.formItem.pay_type,
        pay_gm_id: this.formItem.pay_gm_id,
        pay_type_code: this.formItem.pay_type_code,
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
