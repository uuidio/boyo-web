require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/brand/components/brandInfo"],{"176b":function(t,n,e){"use strict";var a=e("f244"),o=e.n(a);o.a},"20dd":function(t,n,e){"use strict";e.r(n);var a=e("eb27"),o=e("72e3");for(var r in o)"default"!==r&&function(t){e.d(n,t,(function(){return o[t]}))}(r);e("176b");var i,u=e("f0c5"),c=Object(u["a"])(o["default"],a["b"],a["c"],!1,null,"72f7870c",null,!1,a["a"],i);n["default"]=c.exports},"72e3":function(t,n,e){"use strict";e.r(n);var a=e("750d"),o=e.n(a);for(var r in a)"default"!==r&&function(t){e.d(n,t,(function(){return a[t]}))}(r);n["default"]=o.a},"750d":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var e={props:{info:{type:Array},showlike:{type:Boolean,default:!1}},data:function(){return{}},methods:{phone:function(n){var e=n.currentTarget.dataset.index,a=this.info[e].shop_phone;a?t.makePhoneCall({phoneNumber:a}):t.showToast({title:"该商家尚未留下联系方式",icon:"none",position:"bottom"})},like:function(t){var n=t.currentTarget.dataset.index;this.$emit("tapLike",n)},handleTap:function(t){var n=t.currentTarget.dataset.index;console.log("点击item"),this.$emit("tapItem",n)}}};n.default=e}).call(this,e("543d")["default"])},eb27:function(t,n,e){"use strict";var a,o=function(){var t=this,n=t.$createElement;t._self._c},r=[];e.d(n,"b",(function(){return o})),e.d(n,"c",(function(){return r})),e.d(n,"a",(function(){return a}))},f244:function(t,n,e){}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesA/brand/components/brandInfo-create-component',
    {
        'pagesA/brand/components/brandInfo-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("20dd"))
        })
    },
    [['pagesA/brand/components/brandInfo-create-component']]
]);
