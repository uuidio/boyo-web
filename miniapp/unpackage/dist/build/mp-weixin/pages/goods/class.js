(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/class"],{"067d":function(t,e,n){"use strict";n.r(e);var a=n("b9e6"),r=n.n(a);for(var c in a)"default"!==c&&function(t){n.d(e,t,(function(){return a[t]}))}(c);e["default"]=r.a},"3b04":function(t,e,n){"use strict";var a=n("6574"),r=n.n(a);r.a},6574:function(t,e,n){},9986:function(t,e,n){"use strict";n.r(e);var a=n("a3a59"),r=n("067d");for(var c in r)"default"!==c&&function(t){n.d(e,t,(function(){return r[t]}))}(c);n("3b04");var o,u=n("f0c5"),i=Object(u["a"])(r["default"],a["b"],a["c"],!1,null,null,null,!1,a["a"],o);e["default"]=i.exports},a3a59:function(t,e,n){"use strict";var a,r=function(){var t=this,e=t.$createElement;t._self._c},c=[];n.d(e,"b",(function(){return r})),n.d(e,"c",(function(){return c})),n.d(e,"a",(function(){return a}))},b9e6:function(t,e,n){"use strict";(function(t){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a=o(n("ed4a")),r=o(n("835d")),c=o(n("669a"));function o(t){return t&&t.__esModule?t:{default:t}}var u=function(){n.e("components/tabbar/tabbar").then(function(){return resolve(n("bc99"))}.bind(null,n)).catch(n.oe)},i={mixins:[a.default,r.default,c.default],components:{tabBar:u},data:function(){return{tabActive:1,currentGcId:"",categoryData:[],height:0,currentTab:0,scrollTop:0}},onShow:function(){var e=this,n=t.getStorageSync("gmToken");this.$http({aurl:"getCategory",params:{gm_id:n},success:function(t){console.log(t);var n=t.data.result;if(n.length>0){if(e.categoryData=n,e.firstClassID){for(var a=0;a<n.length;a++)n[a].value==e.firstClassID&&(e.currentTab=a,e.checkCor());e.resetFirstClassID("")}console.log(e.categoryData)}else e.categoryData=[]},fail:function(e){console.log(res),t.showToast({title:"请求超时，请稍后再重试",icon:"none"})}}),this.getCartNum()},onLoad:function(e){var n=this;t.hideTabBar(),e.gc_id?this.currentGcId=e.gc_id:this.currentGcId="",t.getSystemInfo({success:function(e){console.log(e,8989);var a=92;n.height=e.windowHeight-t.upx2px(a)}})},mounted:function(){},methods:{swichNav:function(t){var e=t.currentTarget.dataset.current;if(this.currentTab==e)return!1;this.currentTab=e,this.checkCor()},checkCor:function(){var t=this;t.currentTab>7?t.scrollTop=500:t.scrollTop=0},productList:function(e){var n=e.currentTarget.dataset.gcid;t.navigateTo({url:"/pagesA/goods/lists?gc_id=".concat(n)})},search:function(){t.navigateTo({url:"/pagesA/goods/search"})}}};e.default=i}).call(this,n("543d")["default"])},edd1:function(t,e,n){"use strict";(function(t){n("cf0c");a(n("66fd"));var e=a(n("9986"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["edd1","common/runtime","common/vendor"]]]);