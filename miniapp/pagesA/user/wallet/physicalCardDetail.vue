<template>
  <view class="card-wrap">
    <view class="img-box">
      <image class="card-img" mode="widthFix" v-if="cardDetail.physical_img" :src="cardDetail.physical_img"></image>
      <image v-else class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>

      <view class="card-no col-fff">{{cardDetail.card_id}}</view>
    </view>
    <view class="wrap-m">
<!--      <view class="text-center text-base">5周年庆储值卡</view>-->
      <view class="text-lg mt-l text-center text-base">{{cardDetail.valid_balance}}</view>
      <view class="operate-btn" @click="UnbundlingCard">解绑</view>
    </view>

    <view class="info-item fxBox2 border-b-e6">
      <text class="col-666 text-base">卡类型</text>
      <text class="text-base">实体卡</text>
    </view>
<!--    <view class="info-item fxBox2 border-b-e6">-->
<!--      <text class="col-666 text-base">卡状态</text>-->
<!--      <text class="text-base">正常</text>-->
<!--    </view>-->
    <view class="info-item fxBox2 border-b-e6">
      <text class="col-666 text-base">有效期</text>
      <text class="text-base">{{cardDetail.validity_date}}</text>
    </view>
    <view class="info-item fxBox2 border-b-e6">
      <text class="col-666 text-base">绑卡时间</text>
      <text class="text-base">{{cardDetail.bind_time}}</text>
    </view>
    <van-popup :show="showPopup" class="unbundling-card-popup" :z-index="999999" @click-overlay="() => showPopup = false" custom-style="height: 36%;top: 38%;width:80%;background: #fff;border-radius: 16rpx">
      <view class="popup-tit">
        <text class="iconfont col-666 icon-close text-l" @click="closePopup"></text>
        <view class="tit text-30 col-000">解绑实体卡</view>
      </view>
      <view class="card-id">
        <text class="text-30">卡号：{{cardDetail.card_id}}</text>
      </view>
      <view class="ipt-box">
        <input class="fx1 text-30" placeholder-style="color:#999"  placeholder="请输入实体卡覆膜密码" type="number" v-model="password">
      </view>
      <view class="submit-btn mt-lg" @click="confirmUnbundling">确定提交</view>
    </van-popup>
  </view>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        password: '',
        cardDetail: {},
        showPopup: false,
      };
    },
    onLoad:function(options){
      this.cardDetail = options
    },
    onShow:function() {
    },
    methods: {
      confirmUnbundling(){
        const that = this
        if(this.password == ''){
          this.showAlert('请输入卡密码！')
          return
        }
        this.$http({
          aurl: 'bindCard',
          data:{
            mode: 'unite',
            card: this.cardDetail.card_id,
            password: this.password,
          },
          success: res => {
            if(res.data.code === 0){
              this.closePopup()
              uni.showToast({
                title: '解绑成功',
                icon: 'none',
              })
              setTimeout(function(){
                that.choiceBack()
              },1000)

            }
          },
          fail: err => {
            this.showAlert(err.message)
          },
        });
      },
      handleShowPopup(){
        this.showPopup = true
      },
      closePopup(){
        this.showPopup = false
      },
      UnbundlingCard(){
        const that = this
        uni.showModal({
          title: '解绑实体卡',
          content: '将解绑ID为:'+that.cardDetail.card_id,
          // showCancel: false,
          confirmColor: '#5C6F97',
          confirmText: '确认解绑',
          success (res) {
            if (res.confirm) {
              // console.log('用户点击确定')
              that.handleShowPopup()
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
  .unbundling-card-popup
    .popup-tit
      height 90rpx
      display flex
      justify-content center
      align-items center
      position relative
      border-bottom 1px solid #AFAFAF
      .icon-close
          position absolute
          left 20rpx
          top 25rpx
    .card-id
      width 80%
      margin 32rpx auto
    .ipt-box
      width 80%
      margin 0 auto
      display flex
      border-bottom 1px solid #e7e7e7
      padding 0 10rpx
      height 80rpx
      input
        height 80rpx
        line-height 80rpx
    .submit-btn
      width 80%
      margin 40rpx auto 0
      background #E74340
      height 74rpx
      border-radius 44rpx
      color #fff
      font-size 30rpx
      text-align center
      line-height 74rpx
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
  .wrap-m
    margin 36rpx 0 45rpx
</style>
