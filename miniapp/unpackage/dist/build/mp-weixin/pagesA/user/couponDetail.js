require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/user/couponDetail"],{"229a":function(t,n,o){},"279b":function(t,n,o){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e=u(o("9d94"));function u(t){return t&&t.__esModule?t:{default:t}}var c={data:function(){return{coupon_info:{},qrcode_w:t.upx2px(280)}},onLoad:function(t){console.log(t),t.id&&this.getDetail(t.id)},methods:{zitiCode:function(t){new e.default("qrcode",{text:t,width:this.qrcode_w,height:this.qrcode_w,colorDark:"#333333",colorLight:"#FFFFFF"})},getDetail:function(t){var n=this;this.$http({aurl:"getUserCouponDetail",aPath:[t],success:function(t){console.log("详情",t),n.coupon_info=t.data.result,n.zitiCode(n.coupon_info.bn_info.bn)},fail:function(t){console.log(t)},complete:function(){}})}}};n.default=c}).call(this,o("543d")["default"])},"3d63":function(t,n,o){"use strict";o.r(n);var e=o("9c40"),u=o("4f49");for(var c in u)"default"!==c&&function(t){o.d(n,t,(function(){return u[t]}))}(c);o("5bf8");var i,a=o("f0c5"),f=Object(a["a"])(u["default"],e["b"],e["c"],!1,null,"290adb3f",null,!1,e["a"],i);n["default"]=f.exports},"4f49":function(t,n,o){"use strict";o.r(n);var e=o("279b"),u=o.n(e);for(var c in e)"default"!==c&&function(t){o.d(n,t,(function(){return e[t]}))}(c);n["default"]=u.a},"5bf8":function(t,n,o){"use strict";var e=o("229a"),u=o.n(e);u.a},"9c40":function(t,n,o){"use strict";var e,u=function(){var t=this,n=t.$createElement;t._self._c},c=[];o.d(n,"b",(function(){return u})),o.d(n,"c",(function(){return c})),o.d(n,"a",(function(){return e}))},cf9e:function(t,n,o){"use strict";(function(t){o("cf0c");e(o("66fd"));var n=e(o("3d63"));function e(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,o("543d")["createPage"])}},[["cf9e","common/runtime","common/vendor","pagesA/common/vendor"]]]);