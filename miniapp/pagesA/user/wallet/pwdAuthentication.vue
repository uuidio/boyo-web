<template>
  <view class="content">
    <view class="text-center tit">输入支付密码</view>
    <view class="mt-lg text-center label">请输入当前支付密码，以验证身份</view>
    <valid-code :maxlength="6" :isPwd="true" @finish="getPwd" ref="validCode"></valid-code>
    <view class="text-base col-999 mt-lg text-center" @click="forgetPwd">忘记密码</view>
  </view>
</template>

<script>
  import validCode from '../../components/validCode.vue'
  export default {
    data() {
      return {
        type: '',
        use_type: '',
      };
    },
    components:{
      validCode: validCode,
    },
    onLoad(options) {
      console.log(options)
      this.type = options.type
      this.use_type = options.use_type
    },
    onShow(){
      this.$refs.validCode.setFocus();
    },
    methods: {
      forgetPwd(){
        this.redirectToLink('/pagesA/user/wallet/authentication', {use_type: 'set', type: 'reset'})
      },
      getPwd(val){
        const that = this
        console.log(val);
        this.$http({
          aurl: 'checkPayPassword',
          needErrTips: false,
          data:{
            use_type: that.use_type,
            password: val
          },
          success: res => {
            if(res.data.code === 0){
              if(that.type == 'payCode'){
                that.redirectToLink('/pagesA/user/wallet/payment')
              } else if (that.type == 'resetPwd') {
                that.redirectToLink('/pagesA/user/wallet/setPassword',{status: 'reset'})
              }
            }
          },
          fail: res => {
            const num = res.result.num
            if(num > 0){
              uni.showModal({
                title: '支付密码不正确',
                content: '您还可以输入'+ num +'次',
                // showCancel: false,
                cancelText: '忘记密码',
                confirmText: '重新输入',
                confirmColor: '#5C6F97',
                success (res) {
                  if (res.confirm) {
                    // console.log('用户点击确定')
                    console.log(that.$refs.validCode)
                    that.$refs.validCode.clear()
                  } else if (res.cancel) {
                    // console.log('用户点击取消')
                    that.forgetPwd()
                  }
                }
              })
            }else{
              that.walletLocking(res.data.result.time, true)
            }
          }
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
  .content
    padding 130rpx 0
    .tit
      font-size 40rpx
    .label
      margin-bottom 150rpx
      font-size 35rpx
</style>
