(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-46600d95"],{a0a9:function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"modal"},[a("a-modal",{attrs:{title:"回寄地址",width:"46rem",visible:t.addVisible,confirmLoading:t.confirmLoading},on:{ok:t.handleOk,cancel:t.handleCancel}},[a("a-form-item",{attrs:{label:"商品回寄地址",required:!0,"label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-textarea",{attrs:{placeholder:"请输入回寄地址"},model:{value:t.formItem.address,callback:function(e){t.$set(t.formItem,"address",e)},expression:"formItem.address"}})],1),a("a-form-item",{attrs:{label:"收件人姓名",required:!0,"label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-input",{attrs:{placeholder:"请输入收件人姓名"},model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}})],1),a("a-form-item",{attrs:{label:"收件人电话",required:!0,"label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-input",{attrs:{placeholder:"请输入收件人电话"},model:{value:t.formItem.tel,callback:function(e){t.$set(t.formItem,"tel",e)},expression:"formItem.tel"}})],1),a("a-form-item",{attrs:{label:"是否默认地址",required:!0,"label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-radio-group",{model:{value:t.formItem.is_default,callback:function(e){t.$set(t.formItem,"is_default",e)},expression:"formItem.is_default"}},[a("a-radio",{attrs:{value:0}},[t._v("否")]),a("a-radio",{attrs:{value:1}},[t._v("是")])],1)],1)],1)],1),a("div",{staticClass:"mr10 mb20"},[a("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:t.addBtn}},[a("a-icon",{attrs:{type:"plus"}}),t._v("添加回寄地址\n      ")],1)],1),t.FieldsData&&t.FieldsData.length>0?a("div",[a("a-table",{staticClass:"mr10",attrs:{columns:t.FieldsData,dataSource:t.listsData,rowKey:function(t){return t.id},pagination:!1},scopedSlots:t._u([{key:"action",fn:function(e,r){return a("div",{},[a("a-button",{key:r.id,staticClass:"mr10",attrs:{size:"small",type:"primary"},on:{click:function(e){return t.editBtn(r)}}},[t._v("编辑")]),a("a-button",{staticClass:"mr10 mt10",attrs:{type:"danger",size:"small"},on:{click:function(e){return t.delBtn(r)}}},[t._v(" 删除")])],1)}},{key:"tag",fn:function(t,e){return a("tagBoole",{attrs:{tagValue:t}})}}],null,!1,3766010676)}),a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page,defaultCurrent:1},on:{change:t.pageChange}})],1)],1):t._e()])},s=[],n=(a("5ab2"),a("e10e"),a("cc57"),a("ce3c")),i=(a("6d57"),a("9f3a")),o=a("baea");function d(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?d(Object(a),!0).forEach((function(e){Object(n["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):d(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var c=[],u={onChange:function(t,e){console.log(e),0==!e.length?(c=[],e.forEach((function(t,e){c.push(t.id)}))):c=[]}},m={name:"receive",components:{tagBoole:o["a"]},data:function(){return{rowSelection:u,confirmLoading:!1,addVisible:!1,delVisible:!1,formItem:{address:"",name:"",tel:"",is_default:0},itemaddress:"",tipslText:"",tableItem:{},current:1}},methods:l(l({},Object(i["b"])({getAddrsLists:"shop/getAddrsLists",addAddrs:"shop/addAddrs",delAddrs:"shop/delAddrs",editAddrs:"shop/editAddrs"})),{},{handleCancel:function(t){this.addVisible=!1},addBtn:function(){this.formItem={address:"",name:"",tel:"",is_default:0},this.addVisible=!0},handleOk:function(){this.formItem.id?this.editHandleOk():this.addHandleOk()},addHandleOk:function(t){var e=this;this.confirmLoading=!0,this.addAddrs(this.formItem),setTimeout((function(){e.getAddrsLists({obj:{page:e.current}}),e.addVisible=!1,e.confirmLoading=!1}),1e3)},editHandleOk:function(t){var e=this;this.confirmLoading=!0,this.editAddrs(this.formItem),setTimeout((function(){e.getAddrsLists({obj:{page:e.current}}),e.addVisible=!1,e.confirmLoading=!1}),1e3)},delBtn:function(t){var e=this;this.$confirm({title:"确定删除该数据?",content:"",okType:"danger",onOk:function(){e.delAddrs(t.id)}})},editBtn:function(t){console.log(t),this.formItem={id:t.id,address:t.address,name:t.name,tel:t.tel,is_default:t.is_default},this.addVisible=!0},onChange:function(t){this.tableItem.statue=t?1:0},pageChange:function(t){this.current=t,this.fetchLists({obj:{page:this.current}})}}),computed:l({},Object(i["c"])({listsData:function(t){return t.shop.addrsLists},FieldsData:function(t){return t.shop.addrsFields},pages:function(t){return t.shop.addrsPages}})),mounted:function(){console.log("wc111"),this.getAddrsLists({obj:{page:this.current}})}},f=m,p=a("9ca4"),h=Object(p["a"])(f,r,s,!1,null,"5590cf46",null);e["default"]=h.exports},baea:function(t,e,a){"use strict";var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[t.tagType?a("a-tag",{attrs:{color:"#87d068"}},[t._v("是")]):t._e(),t.tagType?t._e():a("a-tag",{attrs:{color:"#f50"}},[t._v("否")])],1)},s=[],n={name:"TagBoole",props:["tagValue"],computed:{tagType:function(){return Boolean(this.tagValue)}}},i=n,o=a("9ca4"),d=Object(o["a"])(i,r,s,!1,null,"659a06ea",null);e["a"]=d.exports}}]);