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
            url: '/pagesA/user/bindUser',
        });
    }else{
        uni.navigateTo({
            url: link,
        });
    }
}
Vue.prototype.customTo = function(item, gm_id){
  switch (item.urlType){
    case 'goods':
      uni.navigateTo({
        url: '/pagesA/goods/detail?id='+item.value,
      });
      break;
    case 'shop':
      uni.navigateTo({
        url: '/pagesA/brand/lists?shopid='+item.value,
      });
      break;
    case 'class':
        if(item.level===2){
          if(item.value.length===2){
            uni.navigateTo({
              url: '/pagesA/goods/lists?shopclassid='+item.value[1],
            });
          }
        }else{
          if(item.value.length===3){
            uni.navigateTo({
              url: '/pagesA/goods/lists?gc_id='+item.value[2],
            });
          }else if(item.value.length=== 1 || item.value.length=== 2)
            Vue.prototype.firstClassID = item.value[0]
          uni.switchTab({
            url: '/pages/goods/class'
          });
        }
        break;
    case 'activity':
      uni.navigateTo({
        url: '/pagesB/activity/'+item.value + (gm_id ? '?gm_id=' + gm_id : ''),
      });
      break;
    case 'customActivity':
      uni.navigateTo({
        url: '/pagesB/activity/customActivity?ac_id='+item.value,
      });
      break;
    case 'integral':
      uni.navigateTo({
        url: '/pagesB/activity/integral',
      });
      break;
    case 'selfHelpScore':
      uni.navigateTo({
        url: '/pagesA/selfHelpScore/selfHelpScore' + (gm_id ? '?gm_id=' + gm_id : ''),
      });
      break;
    case 'cattleCoinStore':
      uni.navigateTo({
        url: '/pagesB/activity/cattleCoinStore',
      });
      break;
    case 'room':
      console.log(item.value);
      uni.navigateTo({
        url: 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+item.value,
      });
      break;
    case 'article':
      uni.navigateTo({
        url: '/pagesA/article/articleList' + (gm_id ? '?gm_id=' + gm_id : ''),
      });
      break;
    case 'customUrl':
      uni.navigateTo({
        url: '/'+item.value,
      });
      break;
    case 'xiaochengxu':
      uni.navigateToMiniProgram({
        // appId: 'wxe6fdabad206fe97b',
        appId: item.valueid,
        path: item.value,
        success: result => {
          console.log(result);
        },
        fail: err => {
          console.log(err);
        },
        complete: () => {}
      });
      break;
    case 'developed':
      uni.showModal({
        title: '温馨提示',
        content: '该功能升级中，敬请期待',
        showCancel: false,
        confirmColor: '#5C6F97',
        success (res) {
          if (res.confirm) {
            // console.log('用户点击确定')
          } else if (res.cancel) {
            // console.log('用户点击取消')
          }
        }
      })
      break;
    case 'brandList':
      uni.navigateTo({
        url: '/pagesA/brand/brand' + (gm_id ? '?gm_id=' + gm_id : ''),
      });
      break;

  }
},

Vue.prototype.DevelopmentTips = function(msg,url){
  uni.showModal({
    title: '温馨提示',
    content: '该功能升级中，敬请期待',
    showCancel: false,
    confirmColor: '#5C6F97',
    success (res) {
      if (res.confirm) {
        // console.log('用户点击确定')
      } else if (res.cancel) {
        // console.log('用户点击取消')
      }
    }
  })
  },
Vue.prototype.RefuseBrowse = function(msg,url){
  uni.showModal({
    title: '温馨提示',
    content: msg,
    showCancel: url ? true : false,
    confirmColor: '#5C6F97',
    success (res) {
      if (res.confirm) {
        if(url){
          uni.redirectTo({
            url: url,
          })
        } else {
          uni.navigateBack();
        }
      } else if (res.cancel) {
        // console.log('用户点击取消')
        uni.navigateBack();
      }
    }
  })
},
Vue.prototype.resetFirstClassID =  function(val){
  Vue.prototype.firstClassID = val
}
Vue.prototype.toLink =  function(link){
  uni.navigateTo({
    url: link,
  });
}
Vue.prototype.toGoodsDetail = function(id){
    uni.navigateTo({
        url: '/pagesA/goods/detail?id='+id,
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
        url: '/pagesA/user/bindUser',
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
      url:'/pages/index/indexCustomer',
    })
  }else{
    uni.navigateBack({
      delta:1
    });
  }
}
Vue.prototype.choiceBack = function(delta){
  uni.navigateBack({
    delta: delta || 1
  });
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
Vue.prototype.walletLocking = function(time,goBack){ // 钱包锁定
  uni.showModal({
    title: '钱包功能已被锁定',
    content: '凌晨'+ time +'自动解锁',
    showCancel: false,
    confirmText: '我知道了',
    confirmColor: '#5C6F97',
    success (res) {
      if (res.confirm) {
        if(goBack){
          uni.navigateBack({
            delta: 1
          });
        }
      }
    }
  })
}
