<template>
  <div class="content">
    <a-form :form="form" @submit="handleSubmit">
      <a-form-item label="会员手机号" :label-col="{ span: 3 }" :wrapper-col="{ span: 5 }">
        <a-input
          v-decorator="['mobile', { rules: [{ required: true, message: '请输入用户手机号' }] }]"
          placeholder="输入手机号"
        />
      </a-form-item>
      <a-form-item label="优惠券" :label-col="{ span: 3 }" :wrapper-col="{ span:5 }">
        <a-select
          v-decorator="[
          'coupon_id',
          { rules: [{ required: true, message: '请选择优惠券' }] },
        ]"
          placeholder="选择优惠券"
        >
          <a-select-option :key="index" v-for="(item,index) in dataLists" :value="item.id">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item :wrapper-col="{ span: 5, offset: 3 }">
        <a-button type="primary" html-type="submit">
          提交
        </a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    computed: {
      ...mapState({
        dataLists: state => state.coupon.couponData,
      }),
    },
    data() {
      return {
        form: this.$form.createForm(this),
      };
    },
    methods: {
      ...mapActions({
        fetchLists: 'coupon/fetchLists',
        couponPush: 'coupon/couponPush',
      }),
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            const formItem = {
              mobile:values.mobile,
              coupon_id:values.coupon_id
            }
            this.couponPush({formItem})
          }
        });
      },
    },
    mounted() {
      this.fetchLists({
        is_hand_push:1,
        per_page:1000000000
      });
    },
  };
</script>

<style scoped>

</style>
