<template>
  <view class="fail-box m-md p-md bc-fff border-radius5px">
    <view class="fail-icon">
      <view class="text-center">
        <text class="emfont icon-warn"></text>
      </view>
      <view class="mt-lg text-center col-666 text-18">
        您的推广员账号已被冻结，请联系平台管理员咨询
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props:{
      reason:String
    },
    data() {
      return {};
    },
    methods: {
      toApply(){
        this.needTokenLink('/pagesB/user/generalize/applyForm')
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .fail-icon
    margin 200rpx 0
    font-size 150rpx
    color #f5222d
</style>
