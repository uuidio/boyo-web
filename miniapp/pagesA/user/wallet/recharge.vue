<template>
  <view class="page-wrap">
    <view class="plt-tit">
      选择卡面
    </view>
    <view class="card-list-box">
      <view class="card-list">
        <view class="card-item">
          <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
        </view>
        <view class="card-item">
          <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
        </view>
        <view class="card-item">
          <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
        </view>
        <view class="card-item">
          <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
        </view>
      </view>
    </view>
    <view class="plt-tit">
      选择面额
    </view>
    <view class="denomination-list">
      <view class="denomination-item">
        100元
      </view>
      <view class="denomination-item active">
        200元
        <view class="triangle">
        </view>
        <text class="iconfont icon-check"></text>
      </view>
      <view class="denomination-item disabled">
        500元
      </view>
      <view class="denomination-item">
        1000元
      </view>
      <view class="denomination-item">
        2000元
      </view>
      <view class="denomination-item">
        5000元
      </view>
    </view>

    <view class="explain">
      <image mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202007/31/oXligtH5gSLrRna3dKZBYtGUfk6keOdNMnfiJdIw.png"></image>
    </view>

    <view class="btn-box">
      <view class="submit-btn">充值/转赠</view>
      <view class="agreement-box">
        <text>充值即同意</text>
        <text class="agreement-link">《YT牛市电子钱包使用协议》</text>
      </view>
    </view>
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
    padding-top 47rpx
    padding-bottom 150rpx
    min-height 100vh
    background #ffffff
    .plt-tit
      padding-left 20rpx
      margin-bottom 30rpx
      font-size 26rpx
      color #333
    .card-list-box
      overflow hidden
      padding-left 20rpx
      margin-bottom 35rpx
      .card-list
        display flex
        flex-flow nowrap
        overflow-y auto
        padding-right 20rpx
        &:after
          content '占位'
          width 20rpx
          height 100%
          opacity 0
        .card-item
          width 60%
          flex-shrink 0
          border-radius 16rpx
          &+.card-item
            margin-left 15rpx
        .card-img
          width 100%
          vertical-align middle
          border-radius 16rpx
  .denomination-list
    display flex
    flex-flow wrap
    padding 0 20rpx
    .denomination-item
      width 30%
      height 95rpx
      display flex
      align-items center
      justify-content center
      border-radius 10rpx
      border 2px solid rgba(240,240,240,1);
      color #666
      font-size 28rpx
      box-sizing border-box
      margin-bottom 20rpx
      background rgba(240,240,240,1);
      position relative
      &:nth-of-type(3n)
        margin-left 5%
      &:nth-of-type(3n-1)
        margin-left 5%
      &.active
        border-color #FF173E
        color #FF173E
        background rgba(255,237,240,1)
      &.disabled
        border-color rgba(240,240,240,.5);
        color #D7D7D7
        background rgba(240,240,240,.5);
      .triangle
        border 26rpx solid transparent
        border-right-color #FF173E
        border-bottom-color #FF173E
        position absolute
        bottom 0
        right 0
        border-radius 10rpx
        height -1rpx
        width -1rpx
      .icon-check
        font-size 30rpx
        color #F0F0F0
        position absolute
        bottom -2rpx
        right -2rpx
  .explain
    margin-top 40rpx
    padding 0 20rpx
    image
      width 100%
      vertical-align top
  .btn-box
    position fixed
    bottom 0
    background #ffffff
    padding 25rpx 20rpx 25rpx
    height 170rpx
    box-sizing border-box
    width 100%
    .submit-btn
      height 76rpx
      line-height 76rpx
      text-align center
      color #ffffff
      background #FF173E
      border-radius 38rpx
      font-size 30rpx
    .agreement-box
      font-size 24rpx
      color #999999
      text-align center
      margin-top 20rpx
      .agreement-link
        color #00ADFF
</style>
