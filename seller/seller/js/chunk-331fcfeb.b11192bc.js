(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-331fcfeb"],{"19fc":function(t,e,a){"use strict";var s=a("84df"),r=a.n(s);r.a},"84df":function(t,e,a){},"8b7d":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"total"},t._l(t.total_data,(function(e,s){return a("span",{key:s,staticClass:"span"},[t._v(t._s(e.title+": ")),a("span",{staticClass:"text"},[t._v(t._s(e.value))])])})),0),t.fields&&t.fields.length>0?[a("a-table",{staticClass:"mr10",attrs:{scroll:{x:1400,y:700},columns:t.fields,dataSource:t.lists,pagination:!1},on:{expand:t.showGoods},scopedSlots:t._u([{key:"expandedRowRender",fn:function(e){return a("div",{},[e.flag?a("a-table",{staticClass:"mr10",attrs:{columns:e.field,dataSource:e.goodsTable,pagination:!1}}):t._e()],1)}}],null,!1,960277846)}),a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page,defaultCurrent:1},on:{change:t.pageChange}})],1)]:t._e()],2)},r=[],n=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),i=a("9f3a");function o(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?o(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):o(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var l={computed:c({},Object(i["c"])({lists:function(t){return t.settle.dayDetLists},pages:function(t){return t.settle.dayDetPages},fields:function(t){return t.settle.dayDetFields},total_data:function(t){return t.settle.total_fee_data}})),data:function(){return{myflag:!1,params:{shop_id:this.$route.query.id,page:1,settle_time_start:"",settle_time_end:""}}},methods:c(c({},Object(i["b"])({getTradeDayDet:"settle/getTradeDayDet",getTradeGoods:"settle/getTradeGoods"})),{},{showGoods:function(t,e){t&&(e.flag||this.getTradeGoods({params:{tid:e.tid},item:e}))},pageChange:function(t){this.params.page=t,this.getTradeDayDet(this.params)}}),mounted:function(){if(this.$route.query.settle_time){var t=this.$route.query.settle_time.substring(0,10);this.params.settle_time_start=t+" 00:00:00",this.params.settle_time_end=t+" 23:59:59"}this.getTradeDayDet(this.params)}},u=l,d=(a("19fc"),a("9ca4")),p=Object(d["a"])(u,s,r,!1,null,"096b696b",null);e["default"]=p.exports}}]);