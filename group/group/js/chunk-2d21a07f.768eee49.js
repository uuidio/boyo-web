(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d21a07f"],{ba7a:function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[e.fieldsData&&e.fieldsData.length>0?[a("a-table",{staticClass:"mr10",attrs:{scroll:{x:1100,y:700},columns:e.fieldsData,dataSource:e.listsData,pagination:!1},scopedSlots:e._u([{key:"action",fn:function(t,r){return"WAIT"===r.status?a("div",{},[a("a",{attrs:{href:"javascript:;"},on:{click:function(t){return e.details(r)}}},[e._v("审批")])]):e._e()}}],null,!0)}),a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:e.pages.total,showTotal:function(e){return"共 "+e+" 条数据"},pageSize:e.pages.per_page,defaultCurrent:1},on:{change:e.pageChange}})],1)]:e._e(),a("a-modal",{attrs:{title:"评论申诉审批"},on:{ok:e.handleOk},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-row",{staticStyle:{"padding-bottom":"20px"}},[a("a-col",{attrs:{xs:24,md:5}},[e._v("\n          是否同意申诉:\n        ")]),a("a-col",{attrs:{xs:24,md:19}},[a("a-radio-group",{model:{value:e.formItem.result,callback:function(t){e.$set(e.formItem,"result",t)},expression:"formItem.result"}},[a("a-radio",{attrs:{value:!0}},[e._v("同意")]),a("a-radio",{attrs:{value:!1}},[e._v("不同意")])],1)],1)],1),a("a-row",[a("a-col",{attrs:{xs:24,md:5}},[e._v("\n          审批备注:\n        ")]),a("a-col",{attrs:{xs:24,md:19}},[a("a-textarea",{attrs:{placeholder:"选填",rows:4},model:{value:e.formItem.reject_reason,callback:function(t){e.$set(e.formItem,"reject_reason",t)},expression:"formItem.reject_reason"}})],1)],1)],1)],2)},s=[],n=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),o=a("9f3a");function i(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?i(Object(a),!0).forEach((function(t){Object(n["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):i(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var l={name:"rateAppeal",data:function(){return{visible:!1,formItem:{appeal_id:"",result:!0,reject_reason:""},page:1}},methods:c(c({},Object(o["b"])({fetchLists:"rateAppeal/fetchLists",rateAppealCheck:"rateAppeal/rateAppealCheck"})),{},{pageChange:function(e){this.page=e,this.fetchLists(this.page)},details:function(e){console.log(e),this.formItem={appeal_id:e.id,result:!0,reject_reason:""},this.visible=!0},handleOk:function(){var e=this;this.rateAppealCheck({formItem:this.formItem,callback:function(){e.visible=!1,e.fetchLists(e.page)}})}}),computed:c({},Object(o["c"])({listsData:function(e){return e.rateAppeal.lists},fieldsData:function(e){return e.rateAppeal.fields},pages:function(e){return e.rateAppeal.pages}})),mounted:function(){this.fetchLists(this.page)}},p=l,u=a("9ca4"),f=Object(u["a"])(p,r,s,!1,null,"2f685d19",null);t["default"]=f.exports}}]);