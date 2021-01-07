<template>
  <view class="card-wrap">
    <view class="img-box">
      <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
      <view class="card-no col-fff">8234234234234</view>
    </view>
    <view class="wrap-m">
      <view class="text-center text-base">中秋佳节电子礼品卡</view>
      <view class="text-lg mt-l text-center text-base">¥100.00</view>
      <view class="operate-btn" @click="transfer">转赠</view>
<!--      <view class="operate-btn" @click="cancelTransfer">取消转赠</view>-->
<!--      <view class="col-999 text-s text-center tips">赠送好友未领取前均可取消赠送</view>-->
<!--      <view class="operate-btn btn-confirm" @click="receive">领取</view>-->
<!--      <view class="operate-btn btn-disabled" @click="receive">已领取</view>-->

    </view>

    <view class="info-item fxBox2 border-b-d7">
      <text class="col-666 text-base">赠卡人</text>
      <view class="fxBox1">
        <image class="head-portrait fx0" src="../../static/images/new-logo.png"></image>
        <text class="text-base">实体卡</text>
      </view>
    </view>
    <view class="info-item fxBox2 border-b-d7">
      <text class="col-666 text-base">赠卡留言</text>
      <text class="text-base">中秋节快乐</text>
    </view>
    <view class="info-item fxBox2 border-b-d7">
      <text class="col-666 text-base">赠卡时间</text>
      <text class="text-base">2020.03.19  10:40:30</text>
    </view>
    <view class="info-item fxBox2 border-b-d7">
      <text class="col-666 text-base">领卡时间</text>
      <text class="text-base">2020.03.20 10:40:30</text>
    </view>
    <view class="info-item fxBox2 border-b-d7">
      <text class="col-666 text-base">卡类型</text>
      <text class="text-base">电子卡</text>
    </view>
    <view class="card-label col-999 text-s text-center">YT牛市礼品卡</view>
  </view>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {

      };
    },
    onLoad:function(options){
    },
    onShow:function() {
    },
    methods: {
      transfer(){
        this.toQueryLink('/pagesA/user/wallet/transfer')
      },
      cancelTransfer(){
        const that = this
        uni.showModal({
          title: '温馨提示',
          content: '确定取消转赠吗？',
          // showCancel: false,
          confirmColor: '#5C6F97',
          confirmText: '取消转赠',
          success (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              that.toBack()
              uni.showToast({
                title: '取消转赠成功',
                icon: 'none',
              })
            } else if (res.cancel) {
              // console.log('用户点击取消')
            }
          }
        })
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .card-wrap
    height 100vh
    background #fff
    padding 30rpx 20rpx
    box-sizing border-box
    .img-box
      position relative
      .card-img
        width 100%
        border-radius 16rpx
        vertical-align top
      .card-no
        position absolute
        left 0
        top 24rpx
        width 85%
        overflow hidden
        white-space nowrap
        text-overflow ellipsis
        padding-left 32rpx
        font-size 24rpx
    .info-item
      height 104rpx
      padding 0 32rpx
      .head-portrait
        width 47rpx
        height 47rpx
        vertical-align middle
        margin-right 24rpx
        border-radius 50%
    .operate-btn
      width 40%
      margin 40rpx auto 0
      hegiht 62rpx
      line-height 62rpx
      text-align center
      border-radius 38rpx
      border 1px solid #F03D34
      box-sizing border-box
      font-size 30rpx
      color #F03D34
      &.btn-confirm
        color #ffffff
        background #F03D34
      &.btn-disabled
        color #ffffff
        border-color #C3C3C3
        background #C3C3C3
  .wrap-m
    margin 36rpx 0 45rpx
    .tips
      margin-top 25rpx
  .card-label
    margin-top 37rpx
</style>
