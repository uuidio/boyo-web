(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0e51ff"],{"92c3":function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"content"},[n("div",{staticClass:"mb20"},[n("router-link",{attrs:{to:"/goods/floor/add"}},[n("a-button",{attrs:{type:"primary",icon:"plus"}},[t._v("添加楼层")])],1)],1),t.listField&&t.listField.length>0?[n("a-table",{attrs:{scroll:{x:1100,y:700},columns:t.listField,dataSource:t.listData,pagination:!1},scopedSlots:t._u([{key:"class_icon",fn:function(t){return n("a",{attrs:{target:"_blank",href:t}},[n("img",{staticStyle:{height:"50px"},attrs:{src:t,alt:""}})])}},{key:"action",fn:function(e,r){return n("div",{},[n("a",{staticClass:"mr10",on:{click:function(e){return t.edit(r)}}},[t._v("编辑")]),n("a",{staticClass:"col-red",on:{click:function(e){return t.delItem(r)}}},[t._v("删除")])])}}],null,!1,3742462272)}),t.pages.total?n("div",{staticClass:"pageBox"},[n("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page,defaultCurrent:1},on:{change:t.pageChange},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1):t._e()]:t._e()],2)},a=[],o=(n("5ab2"),n("6d57"),n("e10e"),n("ce3c")),c=n("9f3a");function i(t,e){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),n.push.apply(n,r)}return n}function s(t){for(var e=1;e<arguments.length;e++){var n=null!=arguments[e]?arguments[e]:{};e%2?i(Object(n),!0).forEach((function(e){Object(o["a"])(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):i(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}var l={name:"lists",computed:s({},Object(c["c"])({listData:function(t){return t.floor.lists},listField:function(t){return t.floor.fields},pages:function(t){return t.floor.pages}})),data:function(){return{currentPage:1}},methods:s(s({},Object(c["b"])({fetchLists:"floor/fetchLists",del:"floor/del"})),{},{edit:function(t){var e="/goods/floor/edit/".concat(t.id);this.$router.push({path:e})},delItem:function(t){confirm("确认删除此数据？")&&this.del({id:t.id})},pageChange:function(t){this.currentPage=t,this.fetchLists({page:t})}}),mounted:function(){this.fetchLists({page:1})}},u=l,f=n("9ca4"),p=Object(f["a"])(u,r,a,!1,null,"c707eb76",null);e["default"]=p.exports}}]);