(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6bbf01bb"],{"190b":function(e,t,a){a("149f")&&"g"!=/./g.flags&&a("064e").f(RegExp.prototype,"flags",{configurable:!0,get:a("f1fe")})},"2b45":function(e,t,a){"use strict";a("190b");var r=a("69b3"),n=a("f1fe"),o=a("149f"),i="toString",l=/./[i],s=function(e){a("bf16")(RegExp.prototype,i,e,!0)};a("238a")((function(){return"/a/b"!=l.call({source:"a",flags:"b"})}))?s((function(){var e=r(this);return"/".concat(e.source,"/","flags"in e?e.flags:!o&&e instanceof RegExp?n.call(e):void 0)})):l.name!=i&&s((function(){return l.call(this)}))},"2b51":function(e,t,a){},"3cf7":function(e,t,a){"use strict";a.r(t);var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-card",{staticStyle:{margin:"24px"},attrs:{bordered:!1}},[a("div",{staticClass:"table-operator mb20"},[a("a-button",{attrs:{type:"primary",icon:"plus"},on:{click:e.handleAdd}},[e._v("新建")])],1),a("a-table",{attrs:{scroll:{x:1100,y:700},columns:e.fields,dataSource:e.lists,pagination:!1},scopedSlots:e._u([{key:"hide",fn:function(e,t){return a("tag-boole",{attrs:{tagValue:!t.hide}})}},{key:"action",fn:function(t,r){return a("action-column",{attrs:{record:r,actions:["edit","delete"]},on:{"on-edit":e.handleEdit,"on-delete":e.handleDelete}})}}])}),a("add-menu",{attrs:{formParams:e.formParams,menuTree:e.menuTree,addVisible:e.addVisible},on:{"on-change":e.changeAddMenu}})],1)},n=[],o=(a("5ab2"),a("e10e"),a("2b45"),a("6d57"),a("ce3c")),i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("a-modal",{staticStyle:{top:"20px"},attrs:{title:"权限菜单",width:800},on:{ok:e.handleOk,cancel:e.handleCancel},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[a("a-form",{attrs:{form:e.menuForm}},[a("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,label:"上级菜单"}},[a("a-tree-select",{attrs:{dropdownStyle:{maxHeight:"400px",overflow:"auto"},treeData:e.menuTree,placeholder:"请选择上级菜单"},model:{value:e.formParams.parent_id,callback:function(t){e.$set(e.formParams,"parent_id",t)},expression:"formParams.parent_id"}})],1),a("a-form-item",{attrs:{label:"菜单名称","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-input",{attrs:{placeholder:"菜单名称"},model:{value:e.formParams.title,callback:function(t){e.$set(e.formParams,"title",t)},expression:"formParams.title"}})],1),a("a-form-item",{attrs:{"label-col":e.labelCol,"wrapper-col":e.wrapperCol,label:"路由地址"}},[a("a-select",{attrs:{placeholder:"请选择路由地址"},on:{change:e.handleChange},model:{value:e.formParams.route_path,callback:function(t){e.$set(e.formParams,"route_path",t)},expression:"formParams.route_path"}},e._l(e.platformRoutes,(function(t){return a("a-select-option",{attrs:{value:t.route_path}},[e._v("\n          "+e._s(t.route_path)+"\n        ")])})),1)],1),a("a-form-item",{attrs:{label:"前端路由地址","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-select",{attrs:{placeholder:"前端路由地址"},model:{value:e.formParams.frontend_route_path,callback:function(t){e.$set(e.formParams,"frontend_route_path",t)},expression:"formParams.frontend_route_path"}},e._l(e.webRouters,(function(t){return a("a-select-option",{attrs:{value:t.path}},[e._v("\n          "+e._s(t.path)+"\n        ")])})),1)],1),a("a-form-item",{attrs:{label:"是否隐藏菜单","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-switch",{attrs:{defaultChecked:e.formParams.hide},model:{value:e.formParams.hide,callback:function(t){e.$set(e.formParams,"hide",t)},expression:"formParams.hide"}})],1),a("a-form-item",{attrs:{label:"仅开发者模式显示","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-switch",{attrs:{defaultChecked:e.formParams.is_dev},model:{value:e.formParams.is_dev,callback:function(t){e.$set(e.formParams,"is_dev",t)},expression:"formParams.is_dev"}})],1),a("a-form-item",{attrs:{label:"排序","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-input",{attrs:{placeholder:"排序"},model:{value:e.formParams.listorder,callback:function(t){e.$set(e.formParams,"listorder",t)},expression:"formParams.listorder"}})],1),a("a-form-item",{attrs:{label:"备注","label-col":e.labelCol,"wrapper-col":e.wrapperCol}},[a("a-input",{attrs:{placeholder:"备注"},model:{value:e.formParams.remark,callback:function(t){e.$set(e.formParams,"remark",t)},expression:"formParams.remark"}})],1)],1)],1)},l=[],s=(a("cc57"),a("ddb9")),c=a("9f3a");function u(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function d(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?u(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):u(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var m={computed:d({},Object(c["c"])({platformRoutes:function(e){return e.permission.routes}})),inject:["reload"],name:"AddMenu",props:{menuTree:{type:Array,default:[]},addVisible:{type:Boolean,default:!1},formParams:{type:Object,default:{title:"",parent_id:"0",route_name:"",frontend_route_name:"",hide:!1,listorder:0,is_dev:!1,remark:""}}},data:function(){return{menuForm:this.$form.createForm(this),labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}},visible:!1,webRouters:[]}},mounted:function(){this.getRoutes(),this.getWebRouter()},methods:d(d({},Object(c["b"])({getRoutes:"permission/getRoutes",createMenu:"permission/createMenu",updateMenu:"permission/updateMenu"})),{},{handleChange:function(e){},getWebRouter:function(){if(s["a"])for(var e=0;e<s["a"][0].children.length;e++){var t=s["a"][0].children[e];if("permission"!==t.name)for(var a=0;a<t.children.length;a++){var r=t.children[a];this.webRouters.push({name:r.name,path:r.path})}}},handleOk:function(){void 0===this.formParams.id?this.toCreateMenu():this.formParams.id>0&&this.toUpdateMenu()},handleCancel:function(){this.$emit("on-change",this.visible)},toCreateMenu:function(){this.createMenu({formItem:this.formParams,callback:this.reload})},toUpdateMenu:function(){this.updateMenu({formItem:this.formParams,callback:this.reload})}}),watch:{addVisible:function(e){this.visible=e}}},f=m,p=a("9ca4"),h=Object(p["a"])(f,i,l,!1,null,"bf1ef9b2",null),b=h.exports,v=a("8e22"),g=a("baea");function _(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,r)}return a}function P(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?_(Object(a),!0).forEach((function(t){Object(o["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):_(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var y={inject:["reload"],computed:P({},Object(c["c"])({fields:function(e){return e.permission.menuFields},lists:function(e){return e.permission.menuLists}})),name:"Menu",components:{AddMenu:b,ActionColumn:v["a"],TagBoole:g["a"]},data:function(){return{advanced:!1,queryParam:{},isExpandedAll:!1,expandedKeys:[],addVisible:!1,menuTree:[{title:"顶级菜单",value:"0",key:"0",children:[]}],formParams:{},defaultFormParams:{title:"",parent_id:"0",route_name:"",frontend_route_name:"",hide:!1,listorder:0,is_dev:!1,remark:""}}},mounted:function(){this.getMenuLists()},watch:{lists:function(){this.getMenuTreeNode(this.lists),this.menuTree[0].children=this.lists}},methods:P(P({},Object(c["b"])({menuLists:"permission/getMenuLists",delMenu:"permission/delMenu"})),{},{getMenuLists:function(){this.menuLists()},handleAdd:function(){this.formParams=this.defaultFormParams,this.addVisible=!0},getMenuTreeNode:function(e){var t=this;e.forEach((function(e){e.key=e.id,e.value=e.id.toString(),"undefined"!==typeof e.children&&t.getMenuTreeNode(e.children)}))},changeAddMenu:function(e){this.addVisible=!e},handleEdit:function(e){console.log(e),e.parent_id=e.parent_id.toString(),e.hide=Boolean(e.hide),e.is_dev=Boolean(e.is_dev),this.formParams=e,this.addVisible=!0},handleDelete:function(e){var t={id:e.id};this.delMenu({formItem:t,callback:this.reload})}})},O=y,w=Object(p["a"])(O,r,n,!1,null,"27456b8c",null);t["default"]=w.exports},"8e22":function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.hasAction("edit")?a("a-button",{staticClass:"mb5 mr5",attrs:{type:"primary",size:"small"},on:{click:e.handleEdit}},[a("em-icon",{attrs:{type:"icon-edit"}}),e._v("编辑")],1):e._e(),e.hasAction("delete")?a("a-button",{staticClass:"em-btn-error",attrs:{size:"small"},on:{click:e.handleDelete}},[a("em-icon",{attrs:{type:"icon-delete"}}),e._v("删除")],1):e._e()],1)},n=[],o={name:"ActionColumn",props:["record","actions"],methods:{handleEdit:function(){this.$emit("on-edit",this.record)},handleDelete:function(){var e=this;this.$confirm({title:"提示",content:"确认要删除吗？",okText:"确认",okType:"danger",cancelText:"取消",onOk:function(){e.$emit("on-delete",e.record)}})},hasAction:function(e){return void 0!==this.actions&&this.actions.indexOf(e)>=0}}},i=o,l=(a("a0de"),a("9ca4")),s=Object(l["a"])(i,r,n,!1,null,"66cb5a6e",null);t["a"]=s.exports},a0de:function(e,t,a){"use strict";var r=a("2b51"),n=a.n(r);n.a},baea:function(e,t,a){"use strict";var r=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[e.tagType?a("a-tag",{attrs:{color:"#87d068"}},[e._v("是")]):e._e(),e.tagType?e._e():a("a-tag",{attrs:{color:"#f50"}},[e._v("否")])],1)},n=[],o={name:"TagBoole",props:["tagValue"],computed:{tagType:function(){return Boolean(this.tagValue)}}},i=o,l=a("9ca4"),s=Object(l["a"])(i,r,n,!1,null,"659a06ea",null);t["a"]=s.exports}}]);