<template>
  <view class="dep-success">
    <view class="succ-mb">
      <view class="success-icon text-center">
        <text class="emfont icon-round_close_fill_light"></text>
      </view>
      <view class="fw700 text-16 mb-lg text-center">
        您的提现申请被驳回，请联系平台管理员核查原因，或重新提出申请
      </view>
      <button class="saveBtn" @tap="needTokenLink('/pagesB/user/generalize/deposit')">申请提现</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {};
    },
    methods: {},
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .saveBtn
    width 80%
    position fixed
    left 10%
    bottom 40rpx
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff!important
    text-align center
    background #ff4a41!important
  .dep-success
    position fixed
    height 100%
    width 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    padding 0 50rpx
    box-sizing border-box
    .success-icon
      font-size 200rpx
      margin-bottom 40rpx
      color #1ca035
    .succ-mb
      margin-bottom 200rpx
</style>
