require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesA/user/order/lists"],{"25ac":function(t,n,e){"use strict";(function(t){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var a=o(e("b8df")),i=e("0b07");function o(t){return t&&t.__esModule?t:{default:t}}var s=function(){e.e("components/lists/nullData").then(function(){return resolve(e("0bb9"))}.bind(null,e)).catch(e.oe)},c=function(){e.e("node-modules/_@dcloudio_uni-ui@1.2.5@@dcloudio/uni-ui/lib/uni-load-more/uni-load-more").then(function(){return resolve(e("fdd7"))}.bind(null,e)).catch(e.oe)},u=[{title:"全部",status:""},{title:"待付款",status:"WAIT_BUYER_PAY"},{title:"待发货",status:"WAIT_SELLER_SEND_GOODS"},{title:"待收货",status:"WAIT_BUYER_CONFIRM_GOODS"},{title:"待评价",status:"TRADE_FINISHED"},{title:"已取消",status:"CANCEL"}],l=["不想买了","重复下单","订单有误","其它原因"],r={components:{uniLoadMore:c,noData:s},data:function(){return{cancelRadio:"",tradeStatus:u,columns:l,active:0,orderLists:a.default.orderLists,currentPage:1,lists:[],loadStatus:"more",pullUpOn:!0,loadding:!1,orderLoading:!0,cancel:{tid:"",cancel_reason:""},showPopup:!1,tabVisable:!0}},onLoad:function(t){var n=this;this.tabVisable=!1,t.active&&(this.active=Number(t.active),console.log("选中",t)),this.$nextTick((function(){n.tabVisable=!0}))},onShow:function(){this.getLists(!0)},methods:{toEvaluate:function(t){this.toQueryLink("/pagesA/user/order/evaluate",{tid:t})},receiptOrder:function(t){(0,i.confirmOrder)(t,this.callBack)},callBack:function(){this.getLists(!0)},paymentSubmit:function(t,n){(0,i.toPayment)(t,n)},submitCancel:function(){var t=this;""!==this.cancelRadio?this.$http({aurl:"cancelOrder",data:this.cancel,success:function(n){0===n.data.code&&(t.getLists(!0),t.showPopup=!1)},fail:function(t){console.log(t)}}):this.showAlert("请选择取消原因")},cancelTid:function(t){this.cancel.tid=t,this.showPopup=!0},closeModel:function(){this.cancelRadio="",this.showPopup=!1},cancelChange:function(t){this.cancelRadio=String(t.detail),this.cancel.cancel_reason=this.columns[t.detail]},cancelClick:function(t){console.log("第几",t),this.cancelRadio=t,this.cancel.cancel_reason=this.columns[t]},changeStatus:function(t){this.active=t.detail.index,this.getLists(!0)},init:function(){this.loadding=!1,this.orderLoading=!0,this.loadStatus="more",this.pullUpOn=!0,this.currentPage=1,this.lists=[]},getLists:function(n){if(n&&this.init(),this.pullUpOn){1===this.currentPage&&t.showLoading({title:"加载中"});var e=this,a=this.tradeStatus[this.active].status,i={page:this.currentPage,status:a},o=t.getStorageSync("gmToken");i.gm_id=o,this.$http({aurl:"orderLists",params:i,success:function(n){0===n.data.result.data.length?(e.loadding=!1,e.pullUpOn=!1,e.loadStatus="noMore"):(n.data.result.data.forEach((function(t){for(var n=0;n<t.trade_order.length;n++){var a=t.trade_order[n];if(a.after_sales_status&&(t.sale=!0,"SELLER_REFUSE_BUYER"===a.after_sales_status)){t.sale=!1;break}}e.lists.push(t)})),1===n.data.result.last_page?(e.loadding=!1,e.pullUpOn=!1,e.loadStatus="noMore"):(e.currentPage++,e.loadStatus="more",e.loadding=!1)),setTimeout((function(){e.orderLoading=!1,t.hideLoading()}),300)},fail:function(t){console.log(t)}})}}},onReachBottom:function(){this.getLists()},mounted:function(){}};n.default=r}).call(this,e("543d")["default"])},5391:function(t,n,e){"use strict";var a,i=function(){var t=this,n=t.$createElement;t._self._c},o=[];e.d(n,"b",(function(){return i})),e.d(n,"c",(function(){return o})),e.d(n,"a",(function(){return a}))},7006:function(t,n,e){"use strict";e.r(n);var a=e("25ac"),i=e.n(a);for(var o in a)"default"!==o&&function(t){e.d(n,t,(function(){return a[t]}))}(o);n["default"]=i.a},a507:function(t,n,e){},ac8e:function(t,n,e){"use strict";e.r(n);var a=e("5391"),i=e("7006");for(var o in i)"default"!==o&&function(t){e.d(n,t,(function(){return i[t]}))}(o);e("efb1");var s,c=e("f0c5"),u=Object(c["a"])(i["default"],a["b"],a["c"],!1,null,"1df0f35e",null,!1,a["a"],s);n["default"]=u.exports},c11a:function(t,n,e){"use strict";(function(t){e("cf0c");a(e("66fd"));var n=a(e("ac8e"));function a(t){return t&&t.__esModule?t:{default:t}}t(n.default)}).call(this,e("543d")["createPage"])},efb1:function(t,n,e){"use strict";var a=e("a507"),i=e.n(a);i.a}},[["c11a","common/runtime","common/vendor","pagesA/common/vendor"]]]);