<template>
  <view class="card-wrap">
    <view class="nav-tabs">
      <view class="nav-item" :class="{active: currentNav === 0}" @click="changeNav(0)">
        <text>待消费</text>
      </view>
      <view class="nav-item" :class="{active: currentNav === 1}" @click="changeNav(1)">
        <text>待消费</text>
      </view>
      <view class="nav-item" :class="{active: currentNav === 2}" @click="changeNav(2)">
        <text>已失效</text>
      </view>
    </view>
    <view class="physical-card-list">
      <!--待消费、已失效-->
      <view class="card-item" v-if="currentNav == 0 || currentNav == 2" :class="{'card-invalid': currentNav == 2}" @click="toDetail">
        <view class="inner-box">
          <view class="img-box">
            <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>
            <view class="card-no col-fff">8234234234234</view>
          </view>
          <view class="card-info fxBox2">
            <view class="info-l">
              <view class="col-000 fxBox1">
                <text>5周年庆储值卡</text>
                <text class="btn-give" v-if="currentNav == 0">赠送</text>
              </view>
              <view class="text-12 col-999 mt-md">
                有效期：2022.11.11
              </view>
            </view>
            <view class="info-r">
              可用余额：¥10
            </view>
          </view>
        </view>
        <view class="invalid-label" v-if="currentNav == 2">已失效</view>
      </view>
      <!--待领取-->
      <view class="card-item card-receive" v-if="currentNav == 1">
        <view class="inner-box">
          <view class="box-t fxBox1">
            <image class="head-portrait fx0" src="../../static/images/new-logo.png"></image>
            <view class="col-000 fx1 text-ellipsis">大王来巡山 ： 祝福你寿比南山，福如东海，年年有大王来巡山 ： 祝福你寿比南山，福如东海，年年有</view>
          </view>
          <view class="box-b fxBox2">
            <view class="card-content fxBox1 fx1">
              <view class="fx0 photo-box">
                <image class="card-photo" mode="widthFix" src="../../static/images/card-demo.png"></image>
              </view>
              <view class="card-msg">
                <view class="text-ellipsis col-000 text-sm">中秋佳节电子礼品卡</view>
                <view class="col-000 text-base mt-lg">¥100</view>
              </view>
            </view>
            <view class="receive-btn">领取</view>
          </view>

        </view>
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
        currentNav: 0,
      };
    },
    onLoad:function(options){
    },
    onShow:function() {
    },
    methods: {
      changeNav(nav){
        this.currentNav = nav
      },
      toDetail(){
        this.toQueryLink(
          '/pagesA/user/wallet/giftCardDetail',{
            id: 123
          }
        )
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .card-wrap
    padding-top 72rpx
  .nav-tabs
    height 72rpx
    line-height 72rpx
    display flex
    /*border-bottom 1rpx solid #D7D7D7*/
    position fixed
    top 0rpx
    width 100%
    background #fff
    .nav-item
      text-align center
      flex 1
      color #A8A8A8
      font-size 30rpx
      &.active
        color #000
        /*font-weight bold*/
  .physical-card-list
    background #fff
    padding 20rpx
    .card-item
      border-radius 16rpx
      margin-bottom 30rpx
      background #fff
      box-shadow 0 0 20rpx 0 rgba(0,0,0,.2)
      &.card-invalid
        position relative
        .inner-box
          border-radius 16rpx
          opacity 0.6
        .invalid-label
          position absolute
          top 22%
          left 50%
          margin-left -71rpx
          width 142rpx
          height 142rpx
          border-radius 50%
          background rgba(0,0,0,0.7);
          text-align center
          line-height 142rpx
          color #fff
          font-size 30rpx
      &.card-receive
        padding 0 20rpx
        .inner-box
          .box-t
            padding-left 10rpx
            border-bottom 1px solid #E6E6E6
            height 70rpx
            .head-portrait
              width 43rpx
              height 43rpx
              margin-right 14rpx
              border-radius 50%
          .box-b
            padding 18rpx 12rpx
            .photo-box
              width 42%
              margin-right 20rpx
              .card-photo
                width 100%
                border-radius 16rpx
                vertical-align middle
            .card-msg
              overflow hidden
            .receive-btn
              height 44rpx
              line-height 44rpx
              padding 0 24rpx
              font-size 28rpx
              color #fff
              background #F03D34
              border-radius 22rpx
              margin-left 20rpx
      .img-box
        position relative
        border-radius 16rpx 16rpx 0 0
        .card-img
          width 100%
          border-radius 16rpx 16rpx 0 0
          vertical-align top
        .card-no
          position absolute
          left 0
          top 24rpx
          width 85%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          padding-left 34rpx
          font-size 26rpx
      .card-info
        padding 24rpx 34rpx
        .btn-give
          padding 5rpx 15rpx
          font-size 24rpx
          border-radius 17rpx
          color #fff
          background #F03D34
          margin-left 20rpx
</style>

