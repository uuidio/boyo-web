import Vue from "./static/base/vueUtil";
import App from "./App";
import baseConfig from './static/base/config'
import mta from './static/mta_analysis.js'
Vue.config.productionTip = false;
Vue.use(baseConfig);
// // 判断市场常见的几种刘海屏机型
// uni.getSystemInfo({
// 	success: function (res) {
// 		let modelmes = res.model;
// 		console.log("手机型号-------",res.model);
// 		if(modelmes.indexOf('iPhone X')>=0||modelmes.indexOf('iPhone XR')>=0||modelmes.indexOf('iPhone XS')>=0||modelmes.indexOf('iPhone 12')>=0||modelmes.indexOf('iPhone 11')>=0||modelmes.indexOf('iPhone11')>=0||modelmes.indexOf('iPhone12')>=0||modelmes.indexOf('iPhoneXR')>=0||modelmes.indexOf('iPhoneX')>=0){
// 			Vue.prototype.$is_bang = true
// 		}else{
// 			Vue.prototype.$is_bang = false
// 		}
// 	}
// });
App.mpType = "app";


// #ifdef MP
Vue.mixin({
  onLoad: function () {
    uni.showShareMenu();
    mta.App.init({
      "appID":"500703982",
      "autoReport": true,
      "statParam": true,
      "ignoreParams": [],
    });
    // console.log(mta)
  }
})
// #endif
const app = new Vue({
  ...App
});
app.$mount();
