<template>
  <view class="payment-wrap">
    <view class="payment-code-box">
      <view class="box-t fxBox1">
        <image class="icon-bar-code" src="../../static/icon/icon-bar-code.png"></image>
        <text>出示付款码向商家付款</text>
      </view>
      <view class="box-m">
        <view class="img-box">
          <image mode="widthFix" :src="payCode"></image>
        </view>
        <view class="code-refresh" >
          <text>每1分钟自动更新</text>
          <image class="refresh-icon" src="../../static/icon/icon-refresh.png" @click="getPayCode"></image>
        </view>
      </view>
      <view class="box-b" @click="showPopup">
        <view class="fxBox1">
          <image class="icon-pay-bag mr-md" src="../../static/icon/icon-pay-bag.png"></image>
          <text>{{currentPayWay}}</text>
        </view>
<!--        <text class="iconfont icon-right"></text>-->
      </view>
    </view>
    <view class="link-list">
<!--      <view class="link-item">-->
<!--        <view class="fxBox1">-->
<!--          <image class="item-icon question-icon" src="../../static/icon/icon-question.png"></image>-->
<!--          <text class="text-30 col-fff">帮助中心</text>-->
<!--        </view>-->
<!--        <text class="iconfont icon-right text-30 col-fff"></text>-->
<!--      </view>-->
      <view class="link-item" @click="toSetPwd">
        <view class="fxBox1">
          <image class="item-icon icon-pwd" src="../../static/icon/icon-pwd.png"></image>
          <text class="text-30 col-fff">密码设置</text>
        </view>
        <text class="iconfont icon-right text-30 col-fff"></text>
      </view>
    </view>

    <!--付款方式-->
    <van-popup :show="showPayWay" :z-index="999999" class="Pay-way-popup" position="bottom" @click-overlay="() => (showPayWay = false)">
      <view class="tips-item pay-item">
        <view class="fxBox1">
          <image class="item-icon icon-pay-bag" src="../../static/icon/icon-balance-low.png"></image>
          <text class="col-red text-12">余额不足，请选择其他付款方式</text>
        </view>
      </view>
      <view class="popup-tit-box">
        <text class="iconfont icon-close col-333 text-l" @click="closePopup"></text>
        <text class="text-lg col-000">选择优先付款方式</text>
        <text></text>
      </view>
      <view class="pay-way-list">
        <view class="pay-item" @click="choicePayWay('电子钱包余额支付')">
          <view class="fxBox1">
            <image class="item-icon icon-pay-bag" src="../../static/icon/icon-pay-bag1.png"></image>
            <text class="text-30 col-000">电子钱包余额支付（¥3.00）</text>
          </view>
          <text class="iconfont text-1g icon-check col-red" v-if="currentPayWay == '电子钱包余额支付'"></text>
        </view>
        <view class="pay-item" @click="choicePayWay('实体卡')">
          <view class="fxBox1">
            <image class="item-icon icon-pay-bag" src="../../static/icon/icon-physical-card2.png"></image>
            <text class="text-30 col-000">实体卡（¥10.00）</text>
          </view>
          <text class="iconfont text-1g icon-check col-red" v-if="currentPayWay == '实体卡'"></text>
        </view>
      </view>
    </van-popup>
  </view>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        screenBrightness: 0.5, // 屏幕亮度
        showPayWay: false,
        payCode: '',
        timer: null,
        currentPayWay: '实体卡支付'
      };
    },
    onLoad:function(options){
      this.getPayCode()
    },
    onShow:function() {
      uni.getScreenBrightness({
        success: res => {
          this.screenBrightness = res.value;
        },
        complete: res => {
          uni.setScreenBrightness({value: 1});
        }
      })
    },
    methods: {
      toSetPwd(){
        this.toQueryLink('/pagesA/user/wallet/authentication', {use_type: 'set', type: 'reset'})
        // this.redirectToLink('/pagesA/user/wallet/pwdAuthentication', {type: 'resetPwd', use_type: 'set'})
      },
      choicePayWay(name){
        this.currentPayWay = name
        this.closePopup()
      },
      clearTimerAll(){
        clearTimeout(this.timer)
        clearInterval(this.timer1)
        this.timer = null
        this.timer1 = null
      },
      verifyPayment(){
        const that = this
        this.$http({
          aurl: 'isPayment',
          success: res => {
            if(res.data.code === 0){
              const result = res.data.result
              if(result.status == 1){ // 支付成功
                that.redirectToLink('/pagesA/user/wallet/status',{type: 'payment', status: 'success'})
              } else if (result.status == 2){ // 支付失败
                that.redirectToLink('/pagesA/user/wallet/status',{type: 'payment', status: 'error'})
              } else { // 支付中

              }
            }
          },
          fail: res => {
            if(res.code === 800){
              that.redirectToLink('/pagesA/user/wallet/pwdAuthentication')
            }
          }
        });
      },
      getPayCode(){
        const that = this
        if(that.timer){
          clearTimeout(that.timer)
          that.timer = null
          clearTimeout(that.timer1)
          that.timer1 = null
        }
        this.$http({
          aurl: 'payCode',
          success: res => {
            if(res.data.code === 0){
              // this.payCode = res.data.result.url
              that.payCode = res.data.result.base64.replace(/[\r\n]/g,"");
              that.timer = setTimeout(function(){
                that.getPayCode()
              },60000)
              // that.timer1 = setInterval(that.verifyPayment, 2000)
            }
          },
          fail: res => {
            if(res.code === 800){
              that.redirectToLink('/pagesA/user/wallet/pwdAuthentication')
            }
          }
        });
      },
      showPopup(){
        return; // 暂时屏蔽功能
        this.showPayWay = true
      },
      closePopup(){
        this.showPayWay = false
      },
    },
    mounted() {
    },
    onUnload(){
      this.clearTimerAll()
      uni.setScreenBrightness({value: this.screenBrightness});
    },
  };
</script>

<style scoped lang="stylus">
  .payment-wrap
    height 100vh
    background #D23737
    padding 10rpx 18rpx
    box-sizing border-box
    .payment-code-box
      background #fff
      border-radius 10rpx
      .box-t
        height 108rpx
        line-height 108rpx
        padding 0 42rpx
        background #F1EFF2
        color #000
        border-radius 10rpx 10rpx 0 0
        .icon-bar-code
          width 35rpx
          height 33rpx
          margin-right 20rpx
      .box-m
        padding 85rpx 0 64rpx
        .img-box
          width 60%
          margin 0 auto
          image
            width 100%
        .code-refresh
          display flex
          align-items center
          justify-content center
          color #8F8F8F
          font-size 26rpx
          margin-top 25rpx
          .refresh-icon
            width 26rpx
            height 26rpx
            margin-left 14rpx
      .box-b
        height 120rpx
        box-sizing border-box
        margin 0 35rpx
        padding-left 6rpx
        font-size 30rpx
        display flex
        justify-content space-between
        align-items center
        color #000
        border-top 1px solid #e6e6e6
        .icon-pay-bag
          width 36rpx
          height 35rpx
        .icon-right
          font-size 30rpx

    .link-list
      margin 22rpx 0
      border-radius 10rpx
      .link-item
        padding 0 35rpx
        height 120rpx
        display flex
        justify-content space-between
        align-items center
        background #F54946
        border-radius 10rpx
        /*&:first-of-type*/
        /*  border-radius 10rpx 10rpx 0 0*/
        /*&:last-of-type*/
        /*  border-radius 0 0 10rpx 10rpx*/
        &+.link-item
          border-top 1px solid #FFC1C1
        .item-icon
          margin-right 20rpx
          width 35rpx
          height 34rpx
          &.icon-pwd
            width 34rpx
            height 38rpx
  >>>.van-popup
    height 50%
    width 100%
    padding-bottom 60rpx
    .popup-tit-box
      height 108rpx
      display flex
      justify-content space-between
      align-items center
      padding-left 28rpx
    .pay-way-list
      margin-left 28rpx
    .pay-item
      height 106rpx
      display flex
      justify-content space-between
      align-items center
      border-bottom 1px solid #AFAFAF
      padding-right 28rpx
      &:first-of-type
        border-top 1px solid #AFAFAF
      .item-icon
        width 46rpx
        height 46rpx
        margin-right 15rpx
      &.tips-item
        height 86rox
        border 0
        background #FFDFDF
        padding-left 28rpx
</style>
