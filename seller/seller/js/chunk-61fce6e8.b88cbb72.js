(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-61fce6e8"],{"36ed":function(t,e,i){},bf97:function(t,e,i){"use strict";var s=i("36ed"),a=i.n(s);a.a},ec98:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("div",{staticClass:"mr24"},[i("div",{staticClass:"det-goods"},[t._v("\n\t\t\t\t优惠券名称："),i("span",[t._v(t._s(t.couponDetail.name))])]),i("div",{staticClass:"det-goods"},[t._v("\n\t\t\t\t优惠券描述："),i("span",[t._v(t._s(t.couponDetail.desc))])]),i("div",{staticClass:"det-goods"},[t._v("\n\t\t\t\t优惠券信息：\n\t\t\t\t"),1==t.couponDetail.type?i("span",[t._v("满 "+t._s(t.couponDetail.origin_condition)+" 减 "+t._s(t.couponDetail.denominations))]):t._e()]),i("a-row",{staticStyle:{"line-height":"35px",flex:"1","font-size":"14px"}},[i("a-col",{attrs:{xs:24,md:8}},[i("span",[t._v("核销码：")]),i("div",{staticClass:"det_code"},[i("a-input",{staticClass:"input_style",attrs:{disabled:!0},model:{value:t.couponDetail.bn,callback:function(e){t.$set(t.couponDetail,"bn",e)},expression:"couponDetail.bn"}}),i("div",{staticClass:"code_tip"},[t._v("核销码有效")])],1),i("span",[t._v("客户手机号：")]),i("div",[i("a-input",{staticClass:"input_style",attrs:{disabled:!0},model:{value:t.couponDetail.user_mobile,callback:function(e){t.$set(t.couponDetail,"user_mobile",e)},expression:"couponDetail.user_mobile"}})],1),i("span",[t._v("小票号：")]),i("div",[i("a-input",{staticClass:"input_style",attrs:{placeholder:"请输入小票号"},model:{value:t.forItem.trade_no,callback:function(e){t.$set(t.forItem,"trade_no",e)},expression:"forItem.trade_no"}})],1),i("span",[t._v("备注：")]),i("div",[i("a-input",{staticClass:"input_style",attrs:{placeholder:"备注"},model:{value:t.forItem.remark,callback:function(e){t.$set(t.forItem,"remark",e)},expression:"forItem.remark"}})],1),i("span",[t._v("上传凭证：")]),i("div",[i("a-button",{staticClass:"btn_style ml10 mr10",attrs:{type:"primary"},on:{click:t.sweepCode}},[t._v("拍照上传")]),i("UploadImage",{ref:"uploadImageLists",attrs:{defaultImageList:t.imageLists,maximum:1}})],1),i("div",{staticClass:"btnBox"},[i("a-button",{staticClass:"ml10",staticStyle:{"margin-right":"20px"},attrs:{type:"danger"},on:{click:function(e){return t.$router.back(-1)}}},[t._v("返回")]),i("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.confirmBtn()}}},[t._v("核销")])],1)])],1),i("a-modal",{attrs:{title:"核销"},on:{ok:t.deliveHandleOk},model:{value:t.deliveVisible,callback:function(e){t.deliveVisible=e},expression:"deliveVisible"}},[i("div",{staticClass:"succ_tip"},[i("div",{staticClass:"tip-iconfont"},[i("a-icon",{staticClass:"iconfont",attrs:{type:"check"}})],1),i("div",{staticClass:"tip_desc"},[t._v("核销成功")])]),i("div",{staticClass:"tip-content"},[i("div",{staticClass:"tip_text"},[t._v("优惠券名称："+t._s(t.couponDetail.name))]),i("div",{staticClass:"tip_text"},[t._v("优惠券信息："+t._s(t.couponDetail.desc))]),i("div",{staticClass:"tip_text"},[t._v("核销码："+t._s(t.couponDetail.bn))]),i("div",{staticClass:"tip_text"},[t._v("小票号："+t._s(t.forItem.trade_no))]),i("div",{staticClass:"tip_text"},[t._v("备注："+t._s(t.forItem.remark))]),i("div",{staticClass:"tip_img"},[i("span",[t._v("上传凭证：")]),i("img",{attrs:{src:t.forItem.voucher}})])])])],1)])},a=[],o=(i("5ab2"),i("6d57"),i("e10e"),i("9a33"),i("ce3c")),n=i("9f3a"),r=i("4428");function c(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,s)}return i}function l(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?c(Object(i),!0).forEach((function(e){Object(o["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):c(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var u={name:"detail",computed:l({},Object(n["c"])({couponDetail:function(t){return t.trade.couponDetail},weixinUploadImage:function(t){return t.trade.weixinUploadImage}})),components:{UploadImage:r["a"]},data:function(){return{deliveVisible:!1,stepCurrent:0,data:[],page:!1,isWeixin:!1,imageLists:[],minmun:1,forItem:{trade_no:"",remark:"",bn:"",user_mobile:"",voucher:""}}},methods:l(l({},Object(n["b"])({wirtdOffCoupon:"trade/wirtdOffCoupon",weixinCode3:"trade/weixinCode3"})),{},{confirmBtn:function(){this.forItem.bn=this.couponDetail.bn,this.forItem.user_mobile=this.couponDetail.user_mobile,this.$refs.uploadImageLists.uploadImageList.length>0&&(this.$refs.uploadImageLists.uploadImageList[0].response?this.forItem.voucher=this.$refs.uploadImageLists.uploadImageList[0].response.result.pic_url:this.forItem.voucher=this.$refs.uploadImageLists.uploadImageList[0].url),this.wirtdOffCoupon({InfoObj:this.forItem,callBack:this.showModel})},showModel:function(){this.deliveVisible=!0},deliveHandleOk:function(){this.deliveVisible=!1;var t="/trade/coupon/writeoff";this.$router.push({path:t})},callbackImage:function(){console.log(this.weixinUploadImage),this.imageLists=[{url:this.weixinUploadImage.pic_url,status:"finished"}]},sweepCode:function(){var t=encodeURIComponent(location.href.split("#")[0]);this.weixinCode3({api:["chooseImage","uploadImage"],url:t,callback:this.callbackImage})}}),mounted:function(){var t=navigator.userAgent.toLowerCase();/micromessenger/.test(t)?(this.isWeixin=!0,console.log("我是微信")):console.log("我no是微信")},watch:{}},p=u,d=(i("bf97"),i("9ca4")),m=Object(d["a"])(p,s,a,!1,null,"2b9298b2",null);e["default"]=m.exports}}]);