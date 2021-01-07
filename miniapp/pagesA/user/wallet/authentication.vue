<template>
  <view class="page-warp">
   <view class="phone-login">
     <view class="icon-msg">
       <image mode="widthFix" src="../../static/icon/icon-msg.png"></image>
     </view>
     <view class="tips text-bs">
       <view class="">为了您的账户安全，需要验证您的手机</view>
       <view class="mt-14" >{{phoneEncryption(params.mobile)}}</view>
     </view>
     <view calss="formItem">
       <view class="item fxBox1">
<!--         <text class="emfont icon-safe icon col-666"></text>-->
         <input class="fx1 text-16" maxlength="6" placeholder="输入验证码" placeholder-style="color:#999;font-size:28rpx;" type="number" v-model="params.code">
         <view v-if="times.flag" class="btn-code text-14" @tap="getCode">{{btnText}}</view>
         <view v-else class="btn-code col-ccc text-14">{{times.time}}S</view>
       </view>
     </view>
     <view>
       <button :class="{'disabled': params.code.length == 0, 'loginBtn': true}" @tap="submitLogin">下一步</button>
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
        type: '',
        btnText: '获取验证码',
        height:0,
        params:{
          mobile:'',
          code:'',
          use_type: '',
        },
        code:'',
        times:{
          flag:true,
          time:60
        },
        openid:'',
        gmToken:0,
        flag:false
      };
    },
    onLoad:function(options){
      this.params.use_type = options.use_type
      this.type = options.type
    },
    onShow:function() {
      this.params.mobile = JSON.parse(uni.getStorageSync('user_info')).mobile
    },
    methods: {
      phoneEncryption(phone){
        return phone.replace(/(\d{3})\d{4}(\d{4})/,"$1****$2")
      },
      submitLogin(){
        if(this.params.mobile===''||this.params.mobile.length!==11){
          this.showAlert('请输入正确手机号')
          return
        }else if(this.params.code===''){
          this.showAlert('请输入短信验证码')
          return
        }
        const that = this
        this.$http({
          aurl: 'checkCode',
          data:this.params,
          success: res => {
            console.log(res)
            that.redirectToLink('/pagesA/user/wallet/setPassword', {status: that.type});
          },
          fail: err => {
            console.log(err);
          }
        });
      },
      getCode(){
        if(this.params.mobile===''||this.params.mobile.length!==11){
          this.showAlert('请输入正确手机号')
          return
        }
        this.$http({
          aurl: 'sendCode',
          data:{
            mobile:this.params.mobile
          },
          success: res => {
            this.timeOut()
          },
          fail: err => {
            console.log(err);
          }
        });
      },
      timeOut(){
        const _this = this
        _this.times.flag = false
        let codeTimeOut = setInterval(()=>{
          _this.times.time--
          if(_this.times.time===0){
            clearInterval(codeTimeOut)
            _this.times.flag = true
            _this.times.time = 60
            _this.btnText = '重新获取'
          }
        },1000)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .page-warp
    height 100vh
    background #ffffff
  .btn-code
    width 164rpx
    text-align center
    border 1px solid #858587
    border-radius 10rpx
    height 60rpx
    box-sizing border-box
    line-height 60rpx
    color #5D5D5D
    &.col-ccc
      color #ccc
  .tips
    text-align center
    color #5D5D5D
    margin-top 40rpx
    margin-bottom 80rpx
  body
    height 100%
    .phone-login
      height 100%
      padding 110rpx 135rpx 50rpx
      box-sizing border-box
      width 100%
      background #fff
      .icon-msg
        width 135rpx
        margin 0 auto
        image
          width 100%
      .item
        border-bottom 1px solid #CACACA
        padding 0 5rpx 10rpx
        .icon
          font-size 45rpx
          margin-right 20rpx
      .loginBtn
        background #e64340
        height 88rpx
        border-radius 44rpx
        color #fff
        font-size 30rpx
        text-align center
        line-height 88rpx
        margin-top 68rpx
        &.disabled
          background #ccc
</style>
