<template>
  <view class="dep-success">
     <view class="succ-mb">
       <view class="success-icon text-center">
         <text class="emfont icon-roundcheckfill"></text>
       </view>
       <view class="fw700 text-16 mb-lg text-center">
         申请成功，待管理员审核，请耐心等待
       </view>
       <view class="text-md col-666">
         提交申请后，管理员将于3个工作日内进行审核，请耐心等待
       </view>
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
