<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="规格名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.sp_name">

        </a-input>
      </a-form-item>
      <a-form-item
        label="规格排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.sp_sort" type="number" />
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitSpec" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      detail: state => state.goods.specdetail,
    }),
  },
  data() {
    return {
      id: 0,
      formItem: {
        sp_name: '',
        sp_sort: 0,
      },
    };
  },
  methods: {
    ...mapActions({
      addSpec: 'goods/addSpec',
      getSpecDetail: 'goods/getSpecDetail',
      editSpec: 'goods/editSpec',
    }),
    submitSpec() {
      if (this.id === 0) {
        this.addSpec({ formItem: this.formItem });
      } else {
        const postData = Object.assign(this.formItem, { id: this.id });
        this.editSpec({ formItem: postData });
      }
    },
    initDetail() {
      this.formItem.sp_name = this.detail.sp_name;
      this.formItem.sp_sort = this.detail.sp_sort;
    },
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getSpecDetail({ id: this.id });
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped>

</style>
