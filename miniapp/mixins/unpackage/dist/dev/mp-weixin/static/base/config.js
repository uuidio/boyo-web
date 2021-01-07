import Vue from './vueUtil'
import { HTTP } from './http';
import {getParams} from './util.js'
const request = new HTTP();

Vue.prototype.$http = function(params) {
    return request.request(params);
}

Vue.prototype.needTokenLink =  function(link){
    const token = uni.getStorageSync('user_token')
    if(!token){
        uni.navigateTo({
            url: '/pages/user/bindUser',
        });
    }else{
        uni.navigateTo({
            url: link,
        });
    }
}
Vue.prototype.toLink =  function(link){
  uni.navigateTo({
    url: link,
  });
}
Vue.prototype.toGoodsDetail = function(id){
    uni.navigateTo({
        url: '/pages/goods/detail?id='+id,
    });
}
Vue.prototype.toQueryLink = function(link,obj){
  let query = getParams(obj)
  uni.navigateTo({
    url:link+'?'+query,
  });
},

Vue.prototype.needTokenQueryLink = function(link,obj){
   const token = uni.getStorageSync('user_token')
    if(!token){
      uni.navigateTo({
        url: '/pages/user/bindUser',
      });
    }else{
      if(obj){
        let query = getParams(obj)
        uni.navigateTo({
          url:link+'?'+query,
        });
      }else{
        uni.navigateTo({
          url:link
        });
      }
    }

  },
Vue.prototype.getPage = function(){
  let pages = getCurrentPages();
  let prePage = pages[pages.length - 2];
  return prePage.$vm
}
Vue.prototype.redirectToLink = function(link,obj){
   if(obj){
     let query = getParams(obj)
     uni.redirectTo({
       url:link+'?'+query,
     });
   }else{
     uni.redirectTo({
       url:link
     })
   }
},
Vue.prototype.toBack = function(router){
  if(router==='cart'){
    uni.switchTab({
      url:'/pages/index/index',
    })
  }else{
    uni.navigateBack({
      delta:1
    });
  }
}
Vue.prototype.toNav = function(link){
    uni.switchTab({
        url:link,
    });
}
Vue.prototype.showAlert = function(content){
  uni.showToast({
    title: content,
    icon: 'none',
  })
}
