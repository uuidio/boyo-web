(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3d95a778"],{"0c07":function(t,a,e){},ed05:function(t,a,e){"use strict";var r=e("0c07"),l=e.n(r);l.a},fcf0:function(t,a,e){"use strict";e.r(a);var r=function(){var t=this,a=t.$createElement,e=t._self._c||a;return e("div",{staticClass:"content"},[e("a-form",[e("a-form-item",{attrs:{label:"标题","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-input",{attrs:{readonly:"",placeholder:"文章标题"},model:{value:t.dataItem.title,callback:function(a){t.$set(t.dataItem,"title",a)},expression:"dataItem.title"}})],1),e("a-form-item",{attrs:{label:"副标题","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-textarea",{attrs:{readonly:"",placeholder:"文章副标题",rows:4},model:{value:t.dataItem.subtitle,callback:function(a){t.$set(t.dataItem,"subtitle",a)},expression:"dataItem.subtitle"}})],1),e("a-form-item",{attrs:{label:"分类排序","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-input",{attrs:{readonly:"",placeholder:"分类排序"},model:{value:t.dataItem.listorder,callback:function(a){t.$set(t.dataItem,"listorder",a)},expression:"dataItem.listorder"}})],1),e("a-form-item",{attrs:{label:"是否开启","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-radio-group",{attrs:{name:"radioGroup",defaultValue:0},model:{value:t.dataItem.is_show,callback:function(a){t.$set(t.dataItem,"is_show",a)},expression:"dataItem.is_show"}},[e("a-radio",{attrs:{value:0,disabled:!0}},[t._v("关闭")]),e("a-radio",{attrs:{value:1,disabled:!0}},[t._v("开启")])],1)],1),e("a-form-item",{attrs:{label:"是否展示标题","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-radio-group",{attrs:{name:"radioGroup",defaultValue:0},model:{value:t.dataItem.title_is_show,callback:function(a){t.$set(t.dataItem,"title_is_show",a)},expression:"dataItem.title_is_show"}},[e("a-radio",{attrs:{value:0,disabled:!0}},[t._v("不展示")]),e("a-radio",{attrs:{value:1,disabled:!0}},[t._v("展示")])],1)],1),e("a-form-item",{attrs:{label:"文章类型","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-radio-group",{attrs:{name:"radioGroup",defaultValue:0},model:{value:t.dataItem.type,callback:function(a){t.$set(t.dataItem,"type",a)},expression:"dataItem.type"}},[e("a-radio",{attrs:{value:0,disabled:!0}},[t._v("文本")]),e("a-radio",{attrs:{value:1,disabled:!0}},[t._v("活动")])],1)],1),1===t.dataItem.type?e("a-form-item",{attrs:{label:"关联自定义活动","label-col":{md:3,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-input",{attrs:{readonly:"",placeholder:"分类排序"},model:{value:t.dataItem.activity_name,callback:function(a){t.$set(t.dataItem,"activity_name",a)},expression:"dataItem.activity_name\n"}})],1):t._e(),e("a-form-item",{attrs:{label:"活动主图","label-col":{md:3,xs:24},"wrapper-col":{md:12,xs:24}}},[t.dataItem.article_url?e("div",{staticClass:"img-box"},[e("img",{attrs:{src:t.dataItem.article_url,alt:""}})]):e("div",{staticClass:"img-box"},[e("img",{attrs:{src:"/src/assets/img_0.png",alt:""}})])]),e("a-form-item",{attrs:{label:"商品描述","label-col":{md:3,xs:24},"wrapper-col":{md:21,xs:24}}},[e("div",{staticClass:"article-content",domProps:{innerHTML:t._s(t.dataItem.content)}})]),e("a-form-item",{attrs:{"wrapper-col":{offset:4,md:12,xs:24}}},[1!==t.dataItem.verify_status?e("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:t.showModal}},[t._v("去审核")]):t._e(),e("a-button",{attrs:{type:"danger"},on:{click:function(a){return t.$router.back(-1)}}},[t._v("返回")])],1)],1),e("a-modal",{attrs:{title:"文章审核",visible:t.visible},on:{ok:t.handleOk,cancel:t.handleCancel}},[e("a-form",[e("a-form-item",{attrs:{label:"文章标题","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[e("p",[t._v(t._s(t.dataItem.title))])]),e("a-form-item",{attrs:{label:"审核状态","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[e("a-radio-group",{attrs:{name:"radioGroup"},model:{value:t.status,callback:function(a){t.status=a},expression:"status"}},[e("a-radio",{attrs:{value:1}},[t._v("通过")]),e("a-radio",{attrs:{value:2}},[t._v("不通过")])],1)],1),e("a-form-item",{attrs:{label:"备注","label-col":{md:4,xs:24},"wrapper-col":{md:12,xs:24}}},[e("a-textarea",{attrs:{placeholder:"审核备注",rows:4},model:{value:t.remark,callback:function(a){t.remark=a},expression:"remark"}})],1)],1)],1)],1)},l=[],s=(e("5ab2"),e("6d57"),e("e10e"),e("ce3c")),i=e("9f3a"),o=e("44de");function c(t,a){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);a&&(r=r.filter((function(a){return Object.getOwnPropertyDescriptor(t,a).enumerable}))),e.push.apply(e,r)}return e}function d(t){for(var a=1;a<arguments.length;a++){var e=null!=arguments[a]?arguments[a]:{};a%2?c(Object(e),!0).forEach((function(a){Object(s["a"])(t,a,e[a])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(e)):c(Object(e)).forEach((function(a){Object.defineProperty(t,a,Object.getOwnPropertyDescriptor(e,a))}))}return t}var m={name:"addArticle",components:{Ueditor:o["a"]},data:function(){return{activityId:"",itemId:"",status:1,remark:"",visible:!1}},computed:d({},Object(i["c"])({dataItem:function(t){return t.article.dataItem}})),created:function(){this.$route.query.articleId&&(this.articleId=this.$route.query.articleId,this.getArticleItem(this.articleId))},mounted:function(){},methods:d(d({},Object(i["b"])({getArticleItem:"article/getDataItem",verifyItem:"article/verifyArticleItem"})),{},{showModal:function(t){this.visible=!0},handleOk:function(){this.verifyItem({id:this.dataItem.id,status:this.status,remark:this.remark})},handleCancel:function(){this.visible=!1},verify:function(t){this.verifyItem(this.dataItem.id)}}),watch:{}},n=m,u=(e("ed05"),e("9ca4")),p=Object(u["a"])(n,r,l,!1,null,"6edf03e5",null);a["default"]=p.exports}}]);