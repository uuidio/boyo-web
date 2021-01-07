import {
  config
} from './server2.js'
import {creatPathStr,getParams} from './util.js'
var regex = /^http*/;

class HTTP {
  request({
    url,
    aurl,
    aPath,
    params,
    success,
    fail,
    complete,
    data = {},
    header = {},
    needToken = false
  }) {
    if (aurl != undefined) {
      needToken =  config.apiLinks[aurl].needToken
    }
    if (needToken) {
      try {
        /*配置请求token*/
        let tempToken = uni.getStorageSync('user_token');
        // config.header.token = tempToken || undefined;
        config.header.Authorization = 'Bearer ' + tempToken || undefined;
        if (!tempToken) {
          uni.navigateTo({
            url: '/pages/user/bindUser',
          });
          throw "token无效";
        }
      } catch (e) {
        throw "读取本地token失败";
      }
    }
    let tempUrl = url;
    let tempType = null;
    if (aurl != undefined) {
      if (config.apiLinks[aurl]) {
        tempUrl = aPath ? config.apiLinks[aurl].url +"/"+ creatPathStr(aPath) : config.apiLinks[aurl].url;
        if(params){
          tempUrl = tempUrl +"?"+ getParams(params)
        }
        tempType = config.apiLinks[aurl].type
      }
    }
    if (!tempUrl) {
      uni.showToast({
        icon: 'none',
        title: "请求参数错误,请检查配置!"
      })
      return false;
    }
    uni.request({
      // url: config.api_base_url + url,
      url: regex.test(tempUrl) ? tempUrl : (config.api_base_url + tempUrl),
      method:tempType || 'GET',
      data: data,
      header: Object.assign(header, config.header),
      success: (res) => {
        let code = res.statusCode.toString();
        if (code.startsWith('2') || code === '304') {
          if(res.data===''){
            this._show_error('接口请求失败');
            return
          }
          let msgCode = res.data.code.toString();
          if (msgCode.startsWith('5')) {
            fail && fail(res.data);
            this._show_error(res.data.message);
          } else if (msgCode.startsWith('4')) {
            if (msgCode === "401") {
              fail && fail(res.data);
              this._show_error(res.data.message);
            } else if(msgCode === "414"){
              if(res.data.result.errors){
                fail && fail(res.data);
                for(let index in res.data.result.errors){
                  this._show_error(res.data.result.errors[index])
                  return
                }
              }
            }else {
              fail && fail(res.data);
              this._show_error(res.data.message);
            }
          } else if (msgCode.startsWith('7')){
            fail && fail(res.data);
            this._show_error(res.data.message);
          }
          else {
            success && success(res);
          }
        } else {
          fail && fail(res)
          console.log("****error****");
          console.log(res);
        }
      },
      fail: (err) => {
        fail && fail(err);
        this._show_error(1);
      },
      complete: (res) => {
        complete && complete(res);
      }
    })
  } // 私有方法
  _show_error(msg) {
    uni.showToast({
      title: msg,
      icon: 'none',
    })
  }
}

export {
  HTTP
}
