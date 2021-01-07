<template>
    <div class="content">
      <a-form
        :model="formItem"
      >
        <a-form-item
          label="店铺账号"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.username"/>
        </a-form-item>
        <a-form-item
          label="密码"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.password"/>
        </a-form-item>
        <a-form-item
          label="确认密码"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.password_confirmation"/>
        </a-form-item>
        <a-form-item
          :wrapper-col="{offset:4,md: 12 ,xs:24}"
        >
          <a-button @click="btnSubmit" type="primary">提交</a-button>
          <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  components: {
    UploadImage,
  },
  data() {
    return {
      formItem: {
        username: '',
        password: '',
        password_confirmation: '',
      },
    };
  },
  methods: {
    ...mapActions({
      addAccount: 'shop/addAccount',
    }),
    btnSubmit() {
      this.addAccount({
        formItem: this.formItem,
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
