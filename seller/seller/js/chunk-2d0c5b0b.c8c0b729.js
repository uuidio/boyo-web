(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0c5b0b"],{"3fbd":function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("div",{staticClass:"mb20"},[i("a-button",{staticClass:"mr10",attrs:{type:"primary",icon:"plus"},on:{click:t.addarticleBtn}},[t._v("\n\t\t\t\t添加文章\n\t\t\t")]),i("a-button",{staticClass:"mr10 ",attrs:{type:"danger",icon:"close"},on:{click:t.delrticleBtn}},[t._v("\n\t\t\t\t删除文章\n\t\t\t")])],1),t.listField&&t.listField.length>0?[i("a-table",{attrs:{scroll:{x:1100,y:700},columns:t.listField,dataSource:t.listData,rowSelection:t.rowSelection,pagination:!1},scopedSlots:t._u([{key:"action",fn:function(e,a){return i("div",{},[i("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.edit(a)}}},[t._v("操作")])])}}],null,!1,287371041)}),i("div",{staticClass:"pageBox"},[i("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page,defaultCurrent:1},on:{change:t.pageChange}})],1)]:t._e(),i("a-modal",{attrs:{title:"添加文章",visible:t.addVisible},on:{ok:t.addOk,cancel:t.addCancel}},[i("a-form",{attrs:{layout:"vertical"}},[i("a-form-item",{attrs:{label:"标题:",required:""}},[i("a-input",{attrs:{placeholder:"请输入文章标题"},model:{value:t.formItem.title,callback:function(e){t.$set(t.formItem,"title",e)},expression:"formItem.title"}})],1),i("a-form-item",{attrs:{label:"主图:",required:""}},[i("UploadImage",{ref:"uploadThumbImage",attrs:{defaultImageList:t.imageLists,maximum:1}}),i("p",{staticClass:"setting_p"},[t._v("尺寸标准：290*84或者290*290 px")])],1),i("a-form-item",{attrs:{label:"分类id:"}},[i("a-input",{attrs:{placeholder:"请输入分类id"},model:{value:t.formItem.cat_id,callback:function(e){t.$set(t.formItem,"cat_id",e)},expression:"formItem.cat_id"}})],1),i("a-form-item",{attrs:{label:"排序:"}},[i("a-input",{attrs:{placeholder:"请输入排序"},model:{value:t.formItem.listorder,callback:function(e){t.$set(t.formItem,"listorder",e)},expression:"formItem.listorder"}})],1),i("a-form-item",{attrs:{label:"内容:"}},[i("a-textarea",{attrs:{placeholder:"请输入内容",rows:4},model:{value:t.formItem.content,callback:function(e){t.$set(t.formItem,"content",e)},expression:"formItem.content"}})],1),i("a-form-item",{attrs:{"label-col":{md:4,xs:24},"wrapper-col":{md:4,xs:24},label:"是否隐藏:"}},[i("a-switch",{attrs:{checkedChildren:"显示",unCheckedChildren:"隐藏",defaultChecked:""},on:{change:t.switchBtn}})],1)],1)],1)],2)},r=[],l=(i("5ab2"),i("6d57"),i("e10e"),i("ce3c")),n=i("9f3a"),s=i("4428");function o(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?o(Object(i),!0).forEach((function(e){Object(l["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):o(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var d={onChange:function(t,e){console.log("selectedRowKeys: ".concat(t),"selectedRows: ",e)},onSelect:function(t,e,i){console.log(t,e,i)},onSelectAll:function(t,e,i){console.log(t,e,i)}},u={name:"articleLists",components:{UploadImage:s["a"]},data:function(){return{UploadImage:s["a"],rowSelection:d,status:0,current:1,addVisible:!1,imageLists:[],formItem:{title:"",article_url:"",cat_id:"",listorder:0,content:"",is_show:1}}},methods:c(c({},Object(n["b"])({articleLists:"article/articleLists",addArticle:"article/addArticle"})),{},{edit:function(t){console.log(t)},pageChange:function(t){this.current=t;var e=this.status;0===this.status?this.articleLists({page:this.current}):this.articleLists({status:e,page:this.current})},orderSearch:function(t){},addOk:function(){var t=this.$refs.uploadThumbImage.uploadImageList;1===t.length&&(this.formItem.article_url=t[0].url),this.addVisible=!1,console.log(this.formItem)},addCancel:function(){this.addVisible=!1},addarticleBtn:function(){this.addVisible=!0},initDetail:function(){null!==this.detail.article_url&&(this.imageList=[{url:this.detail.article_url,status:"finished"}]),this.formItem={title:this.detail.title,article_url:this.detail.article_url,cat_id:this.detail.cat_id,listorder:this.detail.listorder,content:this.detail.content,is_show:this.detail.is_show}},switchBtn:function(t){var e=null;e=t?1:0,this.formItem.is_show=e},delrticleBtn:function(){}}),mounted:function(){this.articleLists({page:1})},computed:c({},Object(n["c"])({listData:function(t){return t.article.articleLists},pages:function(t){return t.article.pages},listField:function(t){return t.article.articleField}})),watch:{detail:function(){this.initDetail()}}},m=u,f=i("9ca4"),p=Object(f["a"])(m,a,r,!1,null,"18211d0e",null);e["default"]=p.exports}}]);