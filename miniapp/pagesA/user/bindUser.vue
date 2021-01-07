<template>
  <div>
    <view class="loginBox">
      <view class="logoImg">
       <image mode="widthFix" src="../static/images/logo.png"></image>
      </view>
      <view class="btnBox">
        <!--<button class="getInfoBtn text-md" type="primary" lang="zh_CN" open-type="getPhoneNumber" @getphonenumber="getPhoneNumber">手机号一键登录</button>-->
        <button  class="getInfoBtn text-md" type="primary"  open-type="getUserInfo" lang="zh_CN" @getuserinfo="bindGetUserInfo">微信一键登录</button>
        <!--<button class="getInfoBtn phoneBtn  text-md"  open-type="getUserInfo" lang="zh_CN" @getuserinfo="toLogin">已有账号，手机号登录</button>-->
<!--        <button class="getInfoBtn phoneBtn  text-md"  @tap="toLoginLink">已有账号，手机号登录</button>-->
        <view @tap="toHome" class="text-r mt-md col-666 text-16 pr-md">先逛逛</view>
      </view>
      <bindModel @getShow="initShow" :showModel="showTel"></bindModel>
    </view>
  </div>
</template>

<script>
  import global from '../../mixins/global.js'
  import redirect from '../../mixins/redirect.js'
  import bindModel from '../../components/bindModel/bindModel'
  import emButton from '../../components/button/button'
  export default {
    mixins: [global,redirect],
    components:{
      bindModel,
      emButton
    },
    data() {
      return {
        flag:false,
			  gmToken:0,
      };
    },
    onLoad:function(options){
      if(options.gmToken){
        this.gmToken = options.gmToken;
      }
      if(options.to){
        if (options.to == 'index' || options.to == 'user') {
          this.flag = options.to;
        }else{
          this.flag = true;
        }
      }
    },
    methods: {
      initShow(b){
        this.showTel = b
        this.toBack()
      },
      toLoginLink(){
        if(this.flag){
          if (this.flag === 'index') {
            this.toLink('/pagesA/user/login/login?flag=index&gmToken='+this.gmToken);
            return;
          }
          if (this.flag === 'user') {
            this.toLink('/pagesA/user/login/login?flag=user');
            return;
          }
          this.toLink('/pagesA/user/login/login?flag=true')
        }else{
          this.toLink('/pagesA/user/login/login')
        }
      },
      bindGetUserInfo(e) {
        const _this = this
        if(e.detail.userInfo){
          uni.login({
            provider: 'weixin',
            success: function (loginRes) {
              uni.getUserInfo({
                provider: 'weixin',
                lang:"zh_CN",
                success: function (infoRes) {
                  uni.showLoading({
                    title: '授权中...',
                  });
                  let gmToken = uni.getStorageSync('gmToken');
                  _this.$http({
                    aurl: 'getOpenid',
                    data: {
                      code:loginRes.code,
                      iv:encodeURIComponent(infoRes.iv),
                      encryptedData:encodeURIComponent(infoRes.encryptedData),
                      gm_id:gmToken
                    },
                    success: res => {
                      uni.hideLoading();
						          uni.removeStorageSync('user_token_jump');
                      if(res.data.result.token==''){
                        _this.toQueryLink('/pagesA/user/login/login',{
                          open_id:res.data.result.openid,
                          flag:_this.flag
                        })
                      }else{
                        uni.showLoading({
                          title: '登录中...',
                        })
                        uni.setStorage({
                          key: 'user_token',
                          data:res.data.result.token.access_token,
                          success: function () {
                            // 记录token过期时间（提前半天）
                            let user_token_invalid = res.data.result.token.expires_in*1000+new Date().getTime()-3600*12*1000;
                            uni.setStorageSync('user_token_invalid',user_token_invalid);
                            uni.setStorage({
                              key: 'user_info',
                              data:JSON.stringify(res.data.result.user_info),
                              success: function () {
                                uni.hideLoading();
                                if(_this.gmToken){
                                  uni.setStorageSync('gmToken', _this.gmToken);
                                }
                                if(_this.flag){
                                  if (_this.flag == 'index') {
                                    uni.switchTab({
                                      url: '/pages/index/indexCustomer?gmToken'+_this.gmToken,
                                    });
                                  }
                                  if (_this.flag == 'user') {
                                    uni.switchTab({
                                      url: '/pages/user/index',
                                    });
                                  }else{
                                    uni.switchTab({
                                      url:'/pages/cart/cart',
                                    })
                                  }
                                }else{
                                  _this.back()
                                }
                              }
                            });
                          }
                        });
                      }
                    },
                    fail: err => {
                      console.log(err);
                    }
                  });
                }
              });
            }
          });
        }else{

        }
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
>>>body
  background #fff
.loginBox
  text-align center
  background #ffffff
  color #666
  padding-top 150rpx
  position fixed
  top 0
  left 0
  width 100%
  height 100%
  .loginButton button
    width 250rpx
    line-height 80rpx
    margin-top 40rpx
.logoImg
  width 160rpx
  margin 0 auto 140rpx
  image
    width 100%
    border-radius 50%
.btnBox
  margin 0 80rpx
.getInfoBtn
  height 75rpx
  line-height 75rpx
  border-radius 10rpx
  background #E64340
  margin-top 40rpx
.phoneBtn
  background #f5f5f5
  border 1px solid #dedede
  box-sizing border-box
.getPhoneBtn
  background none
  margin-top 40rpx
  &::after
    display none
</style>
