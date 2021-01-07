(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-b0c74944"],{4428:function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",[a("div",{staticClass:"UploadBox"},[e._l(e.uploadImageList,(function(t,i){return a("div",{key:i,staticClass:"upload-image-list"},["finished"===t.status?[a("img",{attrs:{src:t.url}}),a("div",{staticClass:"upload-image-list-cover"},[a("a-icon",{attrs:{type:"eye"},nativeOn:{click:function(a){return e.handleView(t.url)}}}),a("a-icon",{attrs:{type:"delete"},nativeOn:{click:function(a){return e.handleRemove(t)}}})],1)]:[t.showProgress?a("a-progress",{attrs:{percent:t.percentage,"hide-info":""}}):e._e()]],2)})),a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"60px"},attrs:{name:"image",headers:e.headers,"show-upload-list":!1,"default-file-list":e.defaultImageList,"on-success":e.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":e.handleFormatError,"on-exceeded-size":e.handleMaxSize,"before-upload":e.handleBeforeUpload,multiple:e.isMultiple,type:"drag",action:e.uploadImageUrl}},[a("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[a("a-icon",{attrs:{type:"upload",size:"20"}})],1)]),a("AlbumPics",{attrs:{isMultiple:!0,maximum:e.surplusNum},on:{selectOk:e.selectPics}},[a("div",{staticClass:"ant-upload ant-upload-drag"},[a("a-icon",{attrs:{type:"camera",size:"20"}})],1)])],2),a("a-modal",{attrs:{title:"查看图片"},model:{value:e.visible,callback:function(t){e.visible=t},expression:"visible"}},[e.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:e.imageUrl}}):e._e(),a("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},s=[],r=(a("6d57"),a("163d"),a("3830")),o=a("804d"),n=a("564b"),l=a("ca00"),c={name:"UploadImage",components:{AlbumPics:n["a"],Upload:r["a"]},props:{defaultImageList:Array,maximum:Number,shopId:Number},data:function(){return{headers:{Accept:"application/json",Authorization:"Bearer ".concat(Object(l["a"])())},uploadImageUrl:o["a"].baseURL+o["a"].action.upload_image,imageUrl:"",visible:!1,isMultiple:1!==this.maximum,uploadImageList:[],surplusNum:this.maximum-this.defaultImageList.length}},methods:{handleView:function(e){this.imageUrl=e,this.visible=!0},handleRemove:function(e){var t=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(t.indexOf(e),1),this.uploadImageList=this.$refs.upload.fileList,this.surplusNum++},handleSuccess:function(e,t){console.log(JSON.stringify(e)),0===e.code?(t.url=e.result.pic_url,this.surplusNum--):this.$notification.warning({message:"Warning Notice",description:e.message})},handleFormatError:function(){this.$Notice.warning({message:"The file format is incorrect",description:"上传文件格式不正确"})},handleMaxSize:function(){this.$Notice.warning({message:"Exceeding file size limit",description:"上传文件过大."})},handleBeforeUpload:function(){var e=this.uploadImageList.length<this.maximum;return e||this.$notification.warning({message:"Notice",description:"最多只能上传".concat(this.maximum,"张图片, 请删除后再上传")}),e},selectPics:function(e){var t=this;e.forEach((function(e){var a={status:"finished",url:e.pic_url};t.uploadImageList.push(a),t.surplusNum--}))}},mounted:function(){this.uploadImageList=this.$refs.upload.fileList},watch:{defaultImageList:function(){this.uploadImageList=this.defaultImageList,this.surplusNum=this.surplusNum-this.uploadImageList.length}}},u=c,m=(a("4876"),a("9ca4")),d=Object(m["a"])(u,i,s,!1,null,"7fd14ca1",null);t["a"]=d.exports},4876:function(e,t,a){"use strict";var i=a("b907"),s=a.n(i);s.a},a417:function(e,t,a){"use strict";a.r(t);var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"content"},[a("a-form",{attrs:{model:e.formItem}},[a("a-form-item",{attrs:{label:"店铺账号","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[a("a-input",{model:{value:e.formItem.username,callback:function(t){e.$set(e.formItem,"username",t)},expression:"formItem.username"}})],1),a("a-form-item",{attrs:{label:"密码","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[a("a-input",{model:{value:e.formItem.password,callback:function(t){e.$set(e.formItem,"password",t)},expression:"formItem.password"}})],1),a("a-form-item",{attrs:{label:"确认密码","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[a("a-input",{model:{value:e.formItem.password_confirmation,callback:function(t){e.$set(e.formItem,"password_confirmation",t)},expression:"formItem.password_confirmation"}})],1),a("a-form-item",{attrs:{"wrapper-col":{offset:4,md:12,xs:24}}},[a("a-button",{attrs:{type:"primary"},on:{click:e.btnSubmit}},[e._v("提交")]),a("a-button",{staticClass:"ml10",attrs:{type:"danger"},on:{click:function(t){return e.$router.back(-1)}}},[e._v("返回")])],1)],1)],1)},s=[],r=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),o=a("9f3a"),n=a("4428");function l(e,t){var a=Object.keys(e);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);t&&(i=i.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),a.push.apply(a,i)}return a}function c(e){for(var t=1;t<arguments.length;t++){var a=null!=arguments[t]?arguments[t]:{};t%2?l(Object(a),!0).forEach((function(t){Object(r["a"])(e,t,a[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(a,t))}))}return e}var u={components:{UploadImage:n["a"]},data:function(){return{formItem:{username:"",password:"",password_confirmation:""}}},methods:c(c({},Object(o["b"])({addAccount:"shop/addAccount"})),{},{btnSubmit:function(){this.addAccount({formItem:this.formItem})}}),mounted:function(){}},m=u,d=a("9ca4"),p=Object(d["a"])(m,i,s,!1,null,"3f8e4eee",null);t["default"]=p.exports},b907:function(e,t,a){}}]);