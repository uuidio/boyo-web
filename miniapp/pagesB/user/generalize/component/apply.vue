<template>
  <view class="applyBox">
    <view class="w100 top-bg-box">
      <image mode="widthFix" class="w100" src="https://egoss1.ytholidayplaza.com/images/default/202006/05/LYMdX8EMhz52rtLzd4oN3ptb3WcQyvE47JJK94tj.png"></image>
      <view class="box-tit">申请成为推广员</view>
    </view>
    <view class="mt-lg p-md">
<!--      <view class="fw700 text-18 mb-lg  text-center">申请推广员</view>-->
      <view class="pl-md pr-md">
        <view>
          点击立即申请，请按申请流程操作，操作并提交申请后，平台将于7个工作日内进行资格审核，审核通过后您将获得推广员资格。
        </view>
        <view class="apply-btn text-18" @tap="toApply">立即申请</view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
      };
    },
    props:{
      partner_id:[Number,String]
    },
    methods: {
      toApply(){
        this.needTokenQueryLink('/pagesB/user/generalize/promoterApply',{partner_id:this.partner_id})
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .top-bg-box
    position relative
    .box-tit
      position absolute
      bottom 24%
      font-weight bold
      font-size 42rpx
      color #ffffff
      text-align center
      width 100%
  .apply-btn
    width 100%
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff
    text-align center
    background #ff4a41
    margin-top 180rpx
</style>
