(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0b1bc3"],{"20b1":function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",[a("div",{staticClass:"mb20 text-r"},[a("a-input-search",{staticStyle:{width:"250px"},attrs:{placeholder:"输入手机号",enterButton:""},on:{search:t.onSearch},model:{value:t.formItem.mobile,callback:function(e){t.$set(t.formItem,"mobile",e)},expression:"formItem.mobile"}})],1),a("a-tabs",{on:{change:t.listsChange},model:{value:t.formItem.apply_status,callback:function(e){t.$set(t.formItem,"apply_status",e)},expression:"formItem.apply_status"}},[a("a-tab-pane",{key:t.trimStr,attrs:{tab:"全部"}}),a("a-tab-pane",{key:"success",attrs:{tab:"已通过"}}),a("a-tab-pane",{key:"apply",attrs:{tab:"待审核"}}),a("a-tab-pane",{key:"fail",attrs:{tab:"已驳回"}})],1),t.fields&&t.fields.length>0?a("div",[a("a-table",{attrs:{columns:t.fields,dataSource:t.dataLists,pagination:!1},scopedSlots:t._u([{key:"action",fn:function(e,s){return a("div",{},["apply"==s.apply_status?a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.showDetail(s)}}},[t._v("审核")]):"apply"!==s.apply_status?a("a-button",{attrs:{type:"primary"},on:{click:function(e){return t.showDetail(s)}}},[t._v("查看详情")]):t._e()],1)}}],null,!1,1350915536)}),a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page},on:{change:t.pageChange},model:{value:t.formItem.page,callback:function(e){t.$set(t.formItem,"page",e)},expression:"formItem.page"}})],1)],1):t._e(),a("applyDetail",{attrs:{formParams:t.formParams,addVisible:t.addVisible,type:t.type},on:{"on-change":t.changeAdd,"on-getLists":t.getDataLists}})],1)])},r=[],i=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),n=a("9f3a"),o=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("a-modal",{staticStyle:{top:"20px"},attrs:{title:"推广员审核",width:800},on:{ok:t.handleOk,cancel:t.handleCancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("a-form",{attrs:{form:t.menuForm}},[a("a-form-item",{attrs:{label:"推广员手机号","label-col":t.labelCol,"wrapper-col":t.wrapperCol,required:!0}},[t._v("\n        "+t._s(t.formParams.mobile)+"\n      ")]),t.type?a("a-form-item",{attrs:{label:"审核操作","label-col":t.labelCol,"wrapper-col":t.wrapperCol,required:!0}},[a("a-radio-group",{attrs:{name:"radioGroup"},model:{value:t.saveData.apply_status,callback:function(e){t.$set(t.saveData,"apply_status",e)},expression:"saveData.apply_status"}},[a("a-radio",{attrs:{value:"success"}},[t._v("同意")]),a("a-radio",{attrs:{value:"fail"}},[t._v("拒绝")])],1),"fail"===t.saveData.apply_status?a("div",[a("a-textarea",{attrs:{placeholder:"请输入拒绝理由",rows:4},model:{value:t.saveData.fail_reason,callback:function(e){t.$set(t.saveData,"fail_reason",e)},expression:"saveData.fail_reason"}})],1):t._e()],1):t._e()],1)],1)},l=[];a("f548");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function p(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={computed:p({},Object(n["c"])({})),inject:["reload"],props:{addVisible:{type:Boolean,default:!1},formParams:{type:Object,default:{}},type:Boolean},watch:{addVisible:function(t){this.visible=t}},data:function(){return{menuForm:this.$form.createForm(this),saveData:{apply_status:"success",user_id:"",fail_reason:""},labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}},visible:!1}},filters:{identityEncryption:function(t){return t.replace(/^(.{6})(?:\d+)(.{4})$/,"$1****$2")}},methods:p(p({},Object(n["b"])({create:"generalize/create",setDepartment:"generalize/setDepartment"})),{},{handleOk:function(){this.saveData.user_id=this.formParams.user_id,this.type?this.create({formItem:this.saveData,callback:this.callback}):this.handleCancel()},callback:function(){this.$emit("on-getLists"),this.handleCancel()},handleCancel:function(){this.$emit("on-change",this.visible)}}),mounted:function(){}},f=u,m=a("9ca4"),b=Object(m["a"])(f,o,l,!1,null,"5f210ca7",null),d=b.exports;function h(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var s=Object.getOwnPropertySymbols(t);e&&(s=s.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,s)}return a}function g(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?h(Object(a),!0).forEach((function(e){Object(i["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):h(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var y={components:{applyDetail:d},inject:["reload"],data:function(){return{trimStr:"",formItem:{page:1,apply_status:"",mobile:""},type:!0,formParams:{verified_info:{card:""}},addVisible:!1}},computed:g({},Object(n["c"])({fields:function(t){return t.generalize.fields},dataLists:function(t){return t.generalize.lists},pages:function(t){return t.generalize.pages},detail:function(t){return t.generalize.detail}})),methods:g(g({},Object(n["b"])({fetchLists:"generalize/fetchLists",getDetail:"generalize/getDetail"})),{},{onSearch:function(){this.formItem.page=1,this.getLists()},listsChange:function(){this.formItem.page=1,this.getLists()},getDataLists:function(){this.getLists()},pageChange:function(t){this.formItem.page=t,this.getLists()},getLists:function(){var t=this.formItem;this.fetchLists(t)},showDetail:function(t){var e={id:t.id};"apply"===t.apply_status?this.type=!0:this.type=!1,console.log(t),this.getDetail(e)},changeAdd:function(t){this.addVisible=!t}}),mounted:function(){this.getLists()},watch:{detail:function(){this.formParams=this.detail,this.addVisible=!0}}},v=y,O=Object(m["a"])(v,s,r,!1,null,"4e3c897e",null);e["default"]=O.exports}}]);