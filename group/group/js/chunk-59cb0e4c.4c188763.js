(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-59cb0e4c"],{4428:function(t,e,i){"use strict";var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticClass:"UploadBox"},[t._l(t.uploadImageList,(function(e,a){return i("div",{key:a,staticClass:"upload-image-list"},["finished"===e.status?[i("img",{attrs:{src:e.url}}),i("div",{staticClass:"upload-image-list-cover"},[i("a-icon",{attrs:{type:"eye"},nativeOn:{click:function(i){return t.handleView(e.url)}}}),i("a-icon",{attrs:{type:"delete"},nativeOn:{click:function(i){return t.handleRemove(e)}}})],1)]:[e.showProgress?i("a-progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()]],2)})),i("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"60px"},attrs:{name:"image",headers:t.headers,"show-upload-list":!1,"default-file-list":t.defaultImageList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:t.isMultiple,type:"drag",action:t.uploadImageUrl}},[i("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[i("a-icon",{attrs:{type:"upload",size:"20"}})],1)]),i("AlbumPics",{attrs:{isMultiple:!0,maximum:t.surplusNum},on:{selectOk:t.selectPics}},[i("div",{staticClass:"ant-upload ant-upload-drag"},[i("a-icon",{attrs:{type:"camera",size:"20"}})],1)])],2),i("a-modal",{attrs:{title:"查看图片"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?i("img",{staticStyle:{width:"100%"},attrs:{src:t.imageUrl}}):t._e(),i("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},s=[],r=(i("6d57"),i("163d"),i("3830")),o=i("804d"),n=i("564b"),l=i("ca00"),c={name:"UploadImage",components:{AlbumPics:n["a"],Upload:r["a"]},props:{defaultImageList:Array,maximum:Number,shopId:Number},data:function(){return{headers:{Accept:"application/json",Authorization:"Bearer ".concat(Object(l["a"])())},uploadImageUrl:o["a"].baseURL+o["a"].action.upload_image,imageUrl:"",visible:!1,isMultiple:1!==this.maximum,uploadImageList:[],surplusNum:this.maximum-this.defaultImageList.length}},methods:{handleView:function(t){this.imageUrl=t,this.visible=!0},handleRemove:function(t){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1),this.uploadImageList=this.$refs.upload.fileList,this.surplusNum++},handleSuccess:function(t,e){console.log(JSON.stringify(t)),0===t.code?(e.url=t.result.pic_url,this.surplusNum--):this.$notification.warning({message:"Warning Notice",description:t.message})},handleFormatError:function(){this.$Notice.warning({message:"The file format is incorrect",description:"上传文件格式不正确"})},handleMaxSize:function(){this.$Notice.warning({message:"Exceeding file size limit",description:"上传文件过大."})},handleBeforeUpload:function(){var t=this.uploadImageList.length<this.maximum;return t||this.$notification.warning({message:"Notice",description:"最多只能上传".concat(this.maximum,"张图片, 请删除后再上传")}),t},selectPics:function(t){var e=this;t.forEach((function(t){var i={status:"finished",url:t.pic_url};e.uploadImageList.push(i),e.surplusNum--}))}},mounted:function(){this.uploadImageList=this.$refs.upload.fileList},watch:{defaultImageList:function(){this.uploadImageList=this.defaultImageList,this.surplusNum=this.surplusNum-this.uploadImageList.length}}},u=c,m=(i("4876"),i("9ca4")),d=Object(m["a"])(u,a,s,!1,null,"7fd14ca1",null);e["a"]=d.exports},4876:function(t,e,i){"use strict";var a=i("b907"),s=i.n(a);s.a},"928e":function(t,e,i){},a09c:function(t,e,i){"use strict";var a=i("928e"),s=i.n(a);s.a},b907:function(t,e,i){},e8a9:function(t,e,i){"use strict";i.r(e);var a=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"content"},[i("a-form",{attrs:{model:t.formItem}},[i("a-form-item",{attrs:{label:"楼层名称","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[i("a-input",{model:{value:t.formItem.name,callback:function(e){t.$set(t.formItem,"name",e)},expression:"formItem.name"}})],1),i("a-form-item",{attrs:{label:"是否隐藏","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[i("a-radio-group",{attrs:{name:"radioGroup",defaultValue:0},model:{value:t.formItem.is_show,callback:function(e){t.$set(t.formItem,"is_show",e)},expression:"formItem.is_show"}},[i("a-radio",{attrs:{value:1}},[t._v("显示")]),i("a-radio",{attrs:{value:0}},[t._v("隐藏")])],1)],1),i("a-form-item",{attrs:{label:"楼层排序","label-col":{md:4,xs:24},"wrapper-col":{md:6,xs:24}}},[i("a-input",{attrs:{placeholder:"分类排序"},model:{value:t.formItem.order,callback:function(e){t.$set(t.formItem,"order",e)},expression:"formItem.order"}})],1),i("a-form-item",{attrs:{"wrapper-col":{offset:4,md:12,xs:24}}},[i("a-button",{attrs:{type:"primary"},on:{click:t.submitClass}},[t._v("提交")]),i("a-button",{staticClass:"ml10",attrs:{type:"danger"},on:{click:function(e){return t.$router.back(-1)}}},[t._v("返回")])],1)],1)],1)},s=[],r=(i("5ab2"),i("6d57"),i("e10e"),i("cc57"),i("ce3c")),o=i("9f3a"),n=i("4428");function l(t,e){var i=Object.keys(t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(t);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),i.push.apply(i,a)}return i}function c(t){for(var e=1;e<arguments.length;e++){var i=null!=arguments[e]?arguments[e]:{};e%2?l(Object(i),!0).forEach((function(e){Object(r["a"])(t,e,i[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(i)):l(Object(i)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(i,e))}))}return t}var u={name:"add",computed:c({},Object(o["c"])({floorLists:function(t){return t.floor.lists},detail:function(t){return t.floor.detail}})),components:{UploadImage:n["a"]},methods:c(c({},Object(o["b"])({fetchLists:"floor/fetchLists",add:"floor/add",getDetail:"floor/getDetail",edit:"floor/edit"})),{},{submitClass:function(){if(0===this.id)this.add({formItem:this.formItem});else{var t=Object.assign(this.formItem,{id:this.id});this.edit({postData:t})}},initDetail:function(){this.formItem={name:this.detail.name,order:this.detail.order,is_show:this.detail.is_show}}}),data:function(){return{id:0,formItem:{name:"",order:0,is_show:1}}},mounted:function(){this.fetchLists(),void 0!==this.$route.params.id&&(this.id=this.$route.params.id,this.getDetail({id:this.id}))},watch:{detail:function(){this.initDetail()}}},m=u,d=(i("a09c"),i("9ca4")),f=Object(d["a"])(m,a,s,!1,null,"33bd30b3",null);e["default"]=f.exports}}]);