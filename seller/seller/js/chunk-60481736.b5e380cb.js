(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-60481736"],{"0401":function(e,t,r){},"8c7c":function(e,t,r){"use strict";r.r(t);var a=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",{staticClass:"content"},[r("a-form",[r("a-form-item",{attrs:{label:"分类名称","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[r("a-input",{model:{value:e.formItem.cat_name,callback:function(t){e.$set(e.formItem,"cat_name",t)},expression:"formItem.cat_name"}})],1),r("a-form-item",{attrs:{label:"分类父ID","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[r("a-select",{attrs:{defaultValue:"0"},model:{value:e.formItem.parent_id,callback:function(t){e.$set(e.formItem,"parent_id",t)},expression:"formItem.parent_id"}},[r("a-select-option",{staticClass:"option-first",attrs:{value:0}},[e._v("顶级分类")]),e._l(e.shopClassTree,(function(t,a){return r("a-select-option",{key:a,attrs:{value:t.value}},[e._v(e._s(t.label))])}))],2)],1),r("a-form-item",{attrs:{label:"是否隐藏","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[r("a-radio-group",{attrs:{name:"radioGroup",defaultValue:0},model:{value:e.formItem.disabled,callback:function(t){e.$set(e.formItem,"disabled",t)},expression:"formItem.disabled"}},[r("a-radio",{attrs:{value:0}},[e._v("显示")]),r("a-radio",{attrs:{value:1}},[e._v("隐藏")])],1)],1),r("a-form-item",{attrs:{label:"分类排序","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[r("a-input",{attrs:{placeholder:"分类排序"},model:{value:e.formItem.order_sort,callback:function(t){e.$set(e.formItem,"order_sort",t)},expression:"formItem.order_sort"}})],1),r("a-form-item",{attrs:{"wrapper-col":{offset:4,md:12,xs:24}}},[r("a-button",{attrs:{type:"primary"},on:{click:e.submitClass}},[e._v("提交")]),r("a-button",{staticClass:"ml10",attrs:{type:"danger"},on:{click:function(t){return e.$router.back(-1)}}},[e._v("返回")])],1)],1)],1)},o=[],s=(r("5ab2"),r("6d57"),r("e10e"),r("ce3c")),n=r("9f3a");function l(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);t&&(a=a.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,a)}return r}function c(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?l(Object(r),!0).forEach((function(t){Object(s["a"])(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):l(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var i={name:"add",components:{},computed:c({},Object(n["c"])({shopClassTree:function(e){return e.goods.shopClassTree}})),data:function(){return{id:0,imageList:[],formItem:{cat_name:"",parent_id:0,order_sort:0,disabled:1}}},methods:c(c({},Object(n["b"])({getShopClassTree:"goods/getShopClassTree",addShopClass:"goods/addShopClass"})),{},{submitClass:function(){this.addShopClass({formItem:this.formItem})}}),mounted:function(){this.getShopClassTree()}},m=i,p=(r("b35e"),r("9ca4")),u=Object(p["a"])(m,a,o,!1,null,"1ceb7988",null);t["default"]=u.exports},b35e:function(e,t,r){"use strict";var a=r("0401"),o=r.n(a);o.a}}]);