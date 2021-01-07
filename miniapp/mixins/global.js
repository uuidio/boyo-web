
import {
  config
} from '../static/base/server2.js'
export default {
  data(){
    return{
      isLogin:false,
      isLoadding:false,
      showTel:false,
      myWidth:'',
      myHeight:'',
      myTop:'',
      myRight:'',
      guidePopupTop: '',
      guidePopupRight:'',
      guideTriangleRight: '',
      headerStyle:{}
    }
  },
  methods: {
    getUserSetting(link){
      const _this = this
      const token = uni.getStorageSync('user_token')
      uni.getSetting({
        success: (response) => {
          console.log(response)
          if (!token) {
            if(link==='cart'){
              uni.navigateTo({
                url: '/pagesA/user/bindUser',
              });
            }
          }else{
            _this.isLoadding = true
          }
        }
      })
    },
    // bindGetUserInfo(e) {
    //   const _this = this
    //   if(e.detail.userInfo){
    //     // uni.setStorage({
    //     //   key: 'user_info',
    //     //   data:JSON.stringify(e.detail.userInfo),
    //     //   success: function () {
    //     //   }
    //     // });
    //     let code = ''
    //     uni.login({
    //       provider: 'weixin',
    //       success: function (loginRes) {
    //         code = loginRes.code
    //         uni.request({
    //           url: config.api_base_url+config.apiLinks.getOpenid.url,
    //           data: {
    //             code:loginRes.code,
    //             iv:encodeURIComponent(e.detail.iv),
    //             encryptedData:encodeURIComponent(e.detail.encryptedData)
    //           },
    //           method:'POST',
    //           success: (res) => {
    //             console.log(res)
    //             uni.navigateBack()
    //           },
    //           fail:(e) => {
    //             console.log(e)
    //           }
    //         });
    //       }
    //     });
    //     // this.showTel = true
    //   }else{
    //   }
    // },
    getPhoneNumber(e){
      const _this  = this
      if(e.detail.errMsg==='getPhoneNumber:ok'){
        console.log('授权手机成功')
        // this.showAlert('授权手机成功')
        uni.login({
          provider: 'weixin',
          success: function (loginRes) {
            // _this.showAlert(JSON.stringify(loginRes))
            uni.request({
              url: config.api_base_url+config.apiLinks.bindUser.url, //仅为示例，并非真实接口地址。
              data: {
                code:loginRes.code,
                iv:encodeURIComponent(e.detail.iv),
                encryptedData:encodeURIComponent(e.detail.encryptedData)
              },
              method:'POST',
              success: (res) => {
                // _this.showAlert(JSON.stringify(res))
                uni.setStorage({
                 key: 'user_token',
                 data:res.data.result.token.access_token,
                success: function () {
                  uni.getSetting({
                    success(res) {
                      console.log(res)
                      console.log('是否授权微信信息：'+!res.authSetting['scope.userInfo'])
                      // _this.showAlert(JSON.stringify(res))
                      if(!res.authSetting['scope.userInfo']){
                         _this.showTel = true
                      }else{
                        uni.navigateBack()
                      }
                    }
                  })
                }});
                // if(res.data.result.user_info){
                //   res.data.result.user_info.avatarUrl = res.data.result.user_info.headimgurl
                //   res.data.result.user_info.nickName = res.data.result.user_info.nickname
                //   uni.setStorage({
                //     key: 'user_info',
                //     data:JSON.stringify(res.data.result.user_info),
                //     success: function () {
                //     }
                //   })
                // }
              },
              fail:(e) => {
                this.showAlert(JSON.stringify(e))
                console.log(e)
              }
            });
          }
        });
      }else{
        console.log('授权失败')
      }
    },
    userLogin(){
      uni.login({
        provider: 'weixin',
        success: function (loginRes) {
          uni.request({
            url:config.api_base_url+config.apiLinks.userLogin.url + loginRes.code, //仅为示例，并非真实接口地址。
            method:'get',
            success: (res) => {
              if(res.data.result.user_info){
                res.data.result.user_info.avatarUrl = res.data.result.user_info.headimgurl
                res.data.result.user_info.nickName = res.data.result.user_info.nickname
                uni.setStorage({
                  key: 'user_info',
                  data:JSON.stringify(res.data.result.user_info),
                  success: function () {
                  }
                })
              }
              if(res.data.result.token){
                uni.setStorage({
                    key: 'user_token',
                    data:res.data.result.token.access_token,
                    success: function () {
                    }
                  }
                );
              }
            },
            fail:(e) => {
              console.log(e)
            }
          })
        }
      });
    },
  },
  onLoad: function (options) {
    let obj = {};
    // #ifdef MP-WEIXIN
    obj = wx.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-BAIDU
    obj = swan.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-ALIPAY
    my.hideAddToDesktopMenu();
    // #endif
    uni.getSystemInfo({
      success: (res) => {
        this.myWidth = obj.left || res.windowWidth;
        this.myRight = obj.width+10 || 0
        this.myHeight = obj.top ? (obj.top + obj.height + 6) : (res.statusBarHeight + 44);
        this.myTop = obj.top ? (obj.top + (obj.height - 32) / 2) : (res.statusBarHeight + 6);
        this.guidePopupTop = parseFloat(this.myHeight)+parseFloat(this.myTop)+3
        const menuButtonInfo = uni.getMenuButtonBoundingClientRect()
        this.guidePopupRight = res.windowWidth - menuButtonInfo.right - 15
        this.guideTriangleRight = this.guidePopupRight + menuButtonInfo.width/2 + menuButtonInfo.width/4 - 4
      },
    });
  },
  mounted() {
  }
};
