<template>
  <view>
    <toHome @on-height="getHeight" box-background="#fff" title="登录"></toHome>
   <view class="phone-login">
     <view class="logoImg">
       <image mode="widthFix" src="../../static/images/logo.png"></image>
     </view>
     <view>
       <button class="getInfoBtn phoneBtn  text-md" type="primary" lang="zh_CN" open-type="getPhoneNumber" @getphonenumber="bindPhoneNumber">手机号一键登录</button>
     </view>
     <view class="text-center col-666 mt-lg" @tap="toLink('/pagesA/user/login/agreement')">
       已阅读并同意 <text class="agreement">《播丫Go用户注册协议》</text>
     </view>
   </view>
  </view>
</template>

<script>
  import toHome from '../../../components/header/ToHome'
  export default {
    components:{
      toHome
    },
    data() {
      return {
        height:0,
        params:{
          mobile:'',
          code:''
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
      if(options.open_id){
        this.openid = options.open_id
      }
	  if(options.gmToken){
	  	this.gmToken = options.gmToken;
	  }
      this.flag = options.flag;
      console.log(this.openid)
    },
    onShow:function() {
      const _this = this
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          _this.code = loginRes.code;
          console.log(loginRes)
        }
      })
    },
    methods: {
      getHeight(height){
        this.height = height
      },
      submitLogin(){
        if(this.params.mobile===''||this.params.mobile.length!==11){
          this.showAlert('请输入正确手机号')
          return
        }else if(this.params.code===''){
          this.showAlert('请输入短信验证码')
          return
        }
        if(this.openid){
          this.params.openid=this.openid
        }
        const source = uni.getStorageSync('source');
        const pid = uni.getStorageSync('pid');
        const aid = uni.getStorageSync('aid');
        const gid = uni.getStorageSync('gid');
        if(source){
          this.params.source = source
        }
        if(pid){
          this.params.pid = pid
        }
        if(aid){
          this.params.aid = aid
        }
        if(gid){
          this.params.gid = gid
        }
        const _this = this;
        uni.showLoading({
          title: '登录中...',
        });
        let gmToken = uni.getStorageSync('gmToken');
        if(gmToken){
          this.params.gm_id = gmToken;
        }
        this.$http({
          aurl: 'userRegister',
          data:this.params,
          success: res => {
            uni.setStorage({
              key: 'user_token',
              data:res.data.result.token.access_token,
              success: function () {
                uni.setStorage({
                  key: 'user_info',
                  data:JSON.stringify(res.data.result.user_info),
                  success: function () {
                    uni.hideLoading()
					if(_this.gmToken){
						uni.setStorageSync('gmToken', _this.gmToken);
					}
                    if(_this.flag){
                      if (_this.flag == 'index') {
                        uni.switchTab({
                          url: '/pages/index/indexCustomer?gmToken='+_this.gmToken,
                        });
                      }
                      if (_this.flag == 'user') {
                        uni.switchTab({
                          url: '/pages/user/index'
                        });
                      }else{
                        uni.switchTab({
                          url:'/pages/cart/cart',
                        })
                      }
                    }else{
                      uni.navigateBack({
                        delta:2
                      })
                    }
                  }
                });
              }
            });
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
          aurl: 'getTelCode',
          params:{
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
          }
        },1000)
      },
      bindPhoneNumber(e){
        const _this = this
        if (e.detail.errMsg === 'getPhoneNumber:ok') {
          let params = {
            openid: this.openid,
            code:_this.code,
            iv:encodeURIComponent(e.detail.iv),
            encryptedData:encodeURIComponent(e.detail.encryptedData)
          }
          const source = uni.getStorageSync('source');
          const pid = uni.getStorageSync('pid');
          const aid = uni.getStorageSync('aid');
          const gid = uni.getStorageSync('gid');
          if(source){
            params.source = source
          }
          if(pid){
            params.pid = pid
          }
          if(aid){
            params.aid = aid
          }
          if(gid){
            params.gid = gid
          }
          let gmToken = uni.getStorageSync('gmToken');
          if(gmToken){
            params.gm_id = gmToken;
          }
          _this.$http({
            aurl: 'bindUser',
            data: params,
            success: res => {
              uni.setStorage({
                key: 'user_token',
                data:res.data.result.token.access_token,
                success: function () {
                  uni.setStorage({
                    key: 'user_info',
                    data:JSON.stringify(res.data.result.user_info),
                    success: function () {
                      uni.hideLoading()
                      if(_this.flag=='cart'){
                        uni.switchTab({
                          url:'/pages/cart/cart',
                        })
                      }else if(_this.flag=='index'){
                        uni.switchTab({
                          url:'/pages/index/indexCustomer',
                        })
                      }else{
                        uni.navigateBack({
                          delta:2
                        })
                      }
                    }
                  });
                }
              });
            },
            fail: err => {
              console.log(err);
            }
          });
        }
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  body
    height 100%
    .phone-login
      height 100%
      padding 50rpx 85rpx 50rpx
      box-sizing border-box
      width 100%
      background #fff
      .logoImg
        width 160rpx
        margin 0 auto 140rpx
        image
          width 100%
          border-radius 50%
      .item
        border-bottom 1px solid #e7e7e7
        padding 0 5rpx 10rpx
        .icon
          font-size 45rpx
          margin-right 20rpx
      .loginBtn
          background #e64340
          height 80rpx
          border-radius 10rpx
          color #fff
          font-size 34rpx
          text-align center
          line-height 80rpx
          margin-top 90rpx
      .getInfoBtn
        height 75rpx
        line-height 75rpx
        border-radius 10rpx
        background #E64340
        /*margin-top 40rpx*/
      .phoneBtn
          /*color:#000*/
          /*background #f5f5f5*/
          border 1px solid #dedede
          box-sizing border-box
      .agreement
         text-decoration: underline;
         padding 0 8rpx
         margin-left 8rpx
</style>
