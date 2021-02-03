<template>
  <view class="page-wrap">
    <view class="tips-box fxBox1">
      <image src="https://egoss1.ytholidayplaza.com/images/default/202008/14/QGgNrMUghyCDypxxG1AvMMYuvPyZ5sHhuHXgNX2F.png"></image>
      <text>实体卡绑定最多不超过10张</text>
    </view>
    <view class="phone-login">
      <view class="item fxBox1">
        <image class="item-icon" src="https://egoss1.ytholidayplaza.com/images/default/202007/31/gCX4TagOTpxAVYINdrczi9nKUzLIhPjOFYE8t6pc.png"></image>
        <input class="fx1 text-30" placeholder="请输入实体卡卡号" type="number" v-model="params.card" placeholder-style="color:#999" />
        <image class="item-icon scan-icon" src="https://egoss1.ytholidayplaza.com/images/default/202008/13/pW43NcmcKMzQSUD5M7CzZN3hMzGqK8O9tltRRtzK.png" @click="scanCode"></image>
      </view>
      <view class="item fxBox1">
        <image class="item-icon" src="https://egoss1.ytholidayplaza.com/images/default/202007/31/MuNsU6PJGHV5qN9sTHwXrTxm5jwgLoXELjohpTpN.png"></image>
        <input class="fx1 text-30" placeholder-style="color:#999"  placeholder="请输入实体卡覆膜密码" type="number" v-model="params.password">
      </view>
    </view>
    <view class="btn-box">
      <button class="loginBtn" @tap="submitLogin">绑定</button>
    </view>
    <view class="text-center text-sm col-ccc mt-l" @tap="toLink('/pagesA/user/wallet/cardAgreement')">
      绑定即已阅读并同意 <text class="agreement">《播丫Go实体卡使用协议》</text>
    </view>
  </view>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        params:{
          card:'',
          password:'',
          mode: 'bind'
        },
      };
    },
    onLoad:function(options){
    },
    onShow:function() {
    },
    methods: {
      scanCode(){
        const that = this
        uni.scanCode({
          success:function(res){
            that.params.card = res.result
          },
          fail: function(){
            that.showAlert('扫码失败，请重新扫描或自行输入！')
          },
        });
      },


      submitLogin(){
        if(this.params.card===''){
          this.showAlert('卡号不正确，请重新输入')
          return
        }else if(this.params.password===''){
          this.showAlert('密码不正确,请重新输入')
          return
        }
        const _this = this
        uni.showLoading({
          title: '绑定中...',
        })
        this.$http({
          aurl: 'bindCard',
          data:this.params,
          success: res => {
            uni.hideLoading()
            if(res.data.code === 0){
              this.redirectToLink('/pagesA/user/wallet/status', {type: 'bindCard', status: 'success'})
            }
          },
          fail: err => {
            uni.hideLoading({
              complete: res => {
                _this.showAlert(err.message)
              }
            })


          },
          complete: res =>{
          }
        });
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  /*.page-wrap*/
  /*  padding-top 10rpx*/
  .phone-login
    padding-left 20rpx
    box-sizing border-box
    width 100%
    background #fff
  .item
    border-bottom 1px solid #E6E6E6
    padding 0 10rpx
    height 104rpx
    &:last-of-type
      border 0
    .item-icon
      width 41rpx
      height 41rpx
      margin-right 25rpx
      .icon-scan
       margin-left 25rpx
       width 50rpx
       height 50rpx
  .btn-box
    margin-top 70rpx
    padding 0 24rpx
  .loginBtn
    background #E74340
    height 88rpx
    border-radius 44rpx
    color #fff
    font-size 30rpx
    text-align center
    line-height 88rpx
  .agreement
    margin-left 8rpx
    color #E74340
  .tips-box
    height 82rpx
    padding 0 33rpx
    color #a2a2a2
    font-size 28rpx
    image
      width 36rpx
      height 36rpx
      margin-right 31rpx

</style>
