require('../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/activity/integral"],{"508f":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=i(e("669a"));function i(t){return t&&t.__esModule?t:{default:t}}var a=function(){e.e("node-modules/_@dcloudio_uni-ui@1.2.5@@dcloudio/uni-ui/lib/uni-load-more/uni-load-more").then(function(){return resolve(e("fdd7"))}.bind(null,e)).catch(e.oe)},r={mixins:[o.default],components:{uniLoadMore:a},onLoad:function(){this.getUserBanner()},onShow:function(){this.gm_id=t.getStorageSync("gmToken"),this.getIntegral(!0),this.getRefreshPoint(),this.getpointClass()},mounted:function(){},onReachBottom:function(){var t=this;this.loadMore.flat||(this.loadStatus="loading",setTimeout((function(){0!==t.list.length&&t.loadMore.current++,t.getIntegral()}),500))},data:function(){return{currentClassId:"",gm_id:"",myPoint:0,orderby:"",direction:"",bannerUrl:"",loadStatus:"loading",list:[],loadMore:{current:1,last:1,flat:!1},scrollIndex:0,tabList:[]}},methods:{getRefreshPoint:function(){var t=this;this.$http({aurl:"refreshPoint",data:{gm_id:this.gm_id||1},success:function(n){0===n.data.code&&(t.myPoint=n.data.result.point)},fail:function(t){console.log(t)},complete:function(){}})},integralSort:function(){this.loadMore.current=1,this.list=[],this.orderby="point_fee",""===this.direction?this.direction="asc":"asc"===this.direction?this.direction="desc":"desc"===this.direction&&(this.direction=""),this.getIntegral()},gotoRecord:function(){t.navigateTo({url:"/pagesB/activity/exchangeRecord?selectIndex=0"})},gotoCoinExchange:function(){t.navigateTo({url:"/pagesB/activity/coinExchange"})},scroll:function(){},getUserBanner:function(){var t=this;this.$http({aurl:"configItems",success:function(n){0===n.data.code&&n.data.result.point_banner.length>0&&(t.bannerUrl=n.data.result.point_banner[0].url)},fail:function(n){t.showUser=!0,console.log(n)}})},getpointClass:function(){var t=this;this.$http({aurl:"pointGoodsClass",data:{page:1,per_page:20},success:function(n){n.data.result.lists;t.tabList=n.data.result.lists,t.tabList.unshift({id:"",cat_name:"全部"})},fail:function(t){console.log(t)}})},chooseScroll:function(t,n){this.currentClassId=t.id,this.scrollIndex=n,this.loadStatus="loading",this.list=[],this.loadMore={current:1,last:1,flat:!1},this.getIntegral()},getIntegral:function(t){var n=this;t&&(this.list=[],this.loadMore.current=1),this.$http({aurl:"integralCentre",data:{page:this.loadMore.current,per_page:10,orderby:this.orderby,direction:this.direction,class_id:this.currentClassId},success:function(t){var e=t.data.result.lists;console.log(e),e.data&&e.data.length>0&&(n.loadMore.last=e.last_page,e.data.forEach((function(t){n.list.push(t)}))),n.loadMore.current===n.loadMore.last?(n.loadMore.flat=!0,n.loadStatus="noMore"):(n.loadStatus="more",n.loadMore.flat=!1)},fail:function(t){console.log(t)}})}}};n.default=r}).call(this,e("543d")["default"])},5215:function(t,n,e){"use strict";e.r(n);var o=e("ab00"),i=e("f124");for(var a in i)"default"!==a&&function(t){e.d(n,t,(function(){return i[t]}))}(a);e("ff15");var r,s=e("f0c5"),l=Object(s["a"])(i["default"],o["b"],o["c"],!1,null,"6648c921",null,!1,o["a"],r);n["default"]=l.exports},"8f7d":function(t,n,e){"use strict";(function(t){e("cf0c");o(e("66fd"));var n=o(e("5215"));function o(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},ab00:function(t,n,e){"use strict";var o,i=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return a})),e.d(n,"a",(function(){return o}))},dd9a:function(t,n,e){},f124:function(t,n,e){"use strict";e.r(n);var o=e("508f"),i=e.n(o);for(var a in o)"default"!==a&&function(t){e.d(n,t,(function(){return o[t]}))}(a);n["default"]=i.a},ff15:function(t,n,e){"use strict";var o=e("dd9a"),i=e.n(o);i.a}},[["8f7d","common/runtime","common/vendor"]]]);