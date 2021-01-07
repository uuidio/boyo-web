<template>
  <view class="page-wrap">
    <view class="card-info fxBox1">
      <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
      <view class="info-r">
        <view class="col-000 text-14 text-ellipsis">中秋佳节电子礼品卡</view>
        <view class="col-000 mt-lg text-14">¥100</view>
      </view>
    </view>
    <textarea class="leaving-msg" placeholder="为赠送好友留下一句话" placeholder-style="color:#C3C3C3" name="" id=""></textarea>
    <view class="btn-transfer">选择赠送好友</view>
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
  .page-wrap
    padding 30rpx 55rpx 30rpx
    box-sizing border-box
    height 100vh
    .card-info
      .card-img
        width 39%
        vertical-align middle
        margin-right 20rpx
        border-radius 16rpx
      .info-r
        overflow hidden
    .leaving-msg
      border 1px solid #DDDDDD
      border-radius 16rpx
      padding 20rpx 30rpx
      height 232rpx
      margin-top 44rpx
      font-size 24rpx
      line-height 34rpx
      box-sizing border-box
    .btn-transfer
      font-size 30rpx
      text-align center
      height 75rpx
      line-height 75rpx
      color #ffffff
      margin-top 44rpx
      background #E74340
      border-radius 38rpx
</style>
