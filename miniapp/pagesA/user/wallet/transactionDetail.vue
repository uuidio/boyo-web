<template>
  <view class="point-wrap">
    <view class="wrap-main">
      <view class="wrap-content">
        <block v-if="nav == 0">
          <view class="detail-item fxBox2 border-b-d7">
            <text class="text-13">
              消费渠道
            </text>
            <text class="text-13 ml-sm">
              {{detail.trade_type_text}}
            </text>
          </view>
          <view class="detail-item border-b-d7 fxBox2">
            <text class="text-13">
              支付单号
            </text>
            <text class="text-13 ml-sm">
              {{detail.payment_id}}
            </text>
          </view>
          <view class="detail-item border-b-d7 fxBox2" v-if="detail.trade_ids.length > 0" v-for="(item, index) in detail.trade_ids" :key="index">
            <text class="text-13">
              {{index == 0 ? '订单号' : ''}}
            </text>
            <text class="text-13 ml-sm">
              {{detail.trade_ids[index]}}
            </text>
          </view>
          <view class="detail-item border-b-d7 fxBox2">
            <text class="text-13">
              消费金额
            </text>
            <text class="text-13 ml-sm">
              -{{detail.amount}}
            </text>
          </view>
          <view class="detail-item  fxBox2">
            <text class="text-13">
              消费时间
            </text>
            <text class="text-13 ml-sm">
              {{detail.trade_time}}
            </text>
          </view>
        </block>
        <block v-else>
          <view class="img-box">
            <image class="card-img" mode="widthFix" src="../../../static/images/checkout_perfectInfoBg.png"></image>
          </view>
          <view class="detail-item fxBox2 border-b-d7">
            <text class="text-13">
              卡名称
            </text>
            <text class="text-13 ml-sm">
              中秋佳节电子礼品卡
            </text>
          </view>
          <view class="detail-item border-b-d7 fxBox2">
            <text class="text-13">
              交易单号
            </text>
            <text class="text-13 ml-sm">
              342352555345
            </text>
          </view>
          <view class="detail-item border-b-d7 fxBox2">
            <text class="text-13">
              充值金额
            </text>
            <text class="text-13 ml-sm">
              -62.00
            </text>
          </view>
          <view class="detail-item fxBox2">
            <text class="text-13">
              充值时间
            </text>
            <text class="text-13 ml-sm">
              2020-03-20  14:30:22
            </text>
          </view>
        </block>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    components: {
    },
    data() {
      return {
        nav: '0',
        itemId: '',
        detail: {},
      };
    },

    onLoad: function(o) {
      this.detail = JSON.parse(o.options)
      this.nav = this.detail.nav
      if(this.nav == 1){
        uni.setNavigationBarTitle({
          title: '充值明细'
        })
      }
    },
    onShow() {},
    mounted() {},
    methods: {
    }
  };
</script>

<style scoped lang="stylus">
  .point-wrap
    &:before
      content ''
      width 100%
      height 1rpx
      background #D7D7D7
      position fixed
      top 0
      left 0

    .wrap-main
      padding 24rpx 20rpx 0
      .wrap-content
        background #fff
        border-radius 16rpx
        padding 0 0 0 24rpx
        .detail-item
          height 90rpx
          padding-right 24rpx
  .img-box
    padding-top 24rpx
    margin-right 24rpx
    .card-img
      width 100%
      border-radius 16rpx
      margin-bottom 10rpx
</style>
