<template>
  <view class="fail-box m-md p-md bc-fff border-radius5px">
    <view class="fail-icon">
      <view class="text-center">
        <text class="emfont icon-roundclosefill"></text>
      </view>
      <view class="mt-lg text-center col-666 text-18">
        审核失败!请重新提交资料审核
      </view>
      <view class="mt-md col-666 text-16" v-if="reason">
        失败原因：{{reason}}
      </view>
    </view>
    <view class="apply-btn text-18" @tap="toApply">重新申请</view>
  </view>
</template>

<script>
  export default {
    props:{
      reason:String,
      partner_id:[String,Number]
    },
    data() {
      return {};
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
  .fail-icon
    margin 200rpx 0
    font-size 150rpx
    color #f5222d
  .apply-btn
    width 80%
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff
    text-align center
    background #ff4a41
    position fixed
    bottom 40rpx
    left 10%
</style>
