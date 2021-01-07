(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-237c0bec"],{"09b4":function(t,e,a){"use strict";var i=a("876b"),l=a.n(i);l.a},4428:function(t,e,a){"use strict";var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("div",{staticClass:"UploadBox"},[t._l(t.uploadImageList,(function(e,i){return a("div",{key:i,staticClass:"upload-image-list"},["finished"===e.status?[a("img",{attrs:{src:e.url}}),a("div",{staticClass:"upload-image-list-cover"},[a("a-icon",{attrs:{type:"eye"},nativeOn:{click:function(a){return t.handleView(e.url)}}}),a("a-icon",{attrs:{type:"delete"},nativeOn:{click:function(a){return t.handleRemove(e)}}})],1)]:[e.showProgress?a("a-progress",{attrs:{percent:e.percentage,"hide-info":""}}):t._e()]],2)})),a("Upload",{ref:"upload",staticStyle:{display:"inline-block",width:"60px"},attrs:{name:"image",headers:t.headers,"show-upload-list":!1,"default-file-list":t.defaultImageList,"on-success":t.handleSuccess,format:["jpg","jpeg","png"],"max-size":2048,"on-format-error":t.handleFormatError,"on-exceeded-size":t.handleMaxSize,"before-upload":t.handleBeforeUpload,multiple:t.isMultiple,type:"drag",action:t.uploadImageUrl}},[a("div",{staticStyle:{width:"58px",height:"58px","line-height":"58px"}},[a("a-icon",{attrs:{type:"upload",size:"20"}})],1)]),a("AlbumPics",{attrs:{isMultiple:!0,maximum:t.surplusNum},on:{selectOk:t.selectPics}},[a("div",{staticClass:"ant-upload ant-upload-drag"},[a("a-icon",{attrs:{type:"camera",size:"20"}})],1)])],2),a("a-modal",{attrs:{title:"查看图片"},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[t.visible?a("img",{staticStyle:{width:"100%"},attrs:{src:t.imageUrl}}):t._e(),a("div",{attrs:{slot:"footer"},slot:"footer"})])],1)},l=[],s=(a("6d57"),a("163d"),a("3830")),r=a("804d"),o=a("564b"),n=a("ca00"),d={name:"UploadImage",components:{AlbumPics:o["a"],Upload:s["a"]},props:{defaultImageList:Array,maximum:Number,shopId:Number},data:function(){return{headers:{Accept:"application/json",Authorization:"Bearer ".concat(Object(n["a"])())},uploadImageUrl:r["a"].baseURL+r["a"].action.upload_image,imageUrl:"",visible:!1,isMultiple:1!==this.maximum,uploadImageList:[],surplusNum:this.maximum-this.defaultImageList.length}},methods:{handleView:function(t){this.imageUrl=t,this.visible=!0},handleRemove:function(t){var e=this.$refs.upload.fileList;this.$refs.upload.fileList.splice(e.indexOf(t),1),this.uploadImageList=this.$refs.upload.fileList,this.surplusNum++},handleSuccess:function(t,e){console.log(JSON.stringify(t)),0===t.code?(e.url=t.result.pic_url,this.surplusNum--):this.$notification.warning({message:"Warning Notice",description:t.message})},handleFormatError:function(){this.$Notice.warning({message:"The file format is incorrect",description:"上传文件格式不正确"})},handleMaxSize:function(){this.$Notice.warning({message:"Exceeding file size limit",description:"上传文件过大."})},handleBeforeUpload:function(){var t=this.uploadImageList.length<this.maximum;return t||this.$notification.warning({message:"Notice",description:"最多只能上传".concat(this.maximum,"张图片, 请删除后再上传")}),t},selectPics:function(t){var e=this;t.forEach((function(t){var a={status:"finished",url:t.pic_url};e.uploadImageList.push(a),e.surplusNum--}))}},mounted:function(){this.uploadImageList=this.$refs.upload.fileList},watch:{defaultImageList:function(){this.uploadImageList=this.defaultImageList,this.surplusNum=this.surplusNum-this.uploadImageList.length}}},c=d,p=(a("4876"),a("9ca4")),u=Object(p["a"])(c,i,l,!1,null,"7fd14ca1",null);e["a"]=u.exports},4876:function(t,e,a){"use strict";var i=a("b907"),l=a.n(i);l.a},"876b":function(t,e,a){},acdd:function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("a-form-item",{attrs:{label:"平台项目名称","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入平台项目名称"},model:{value:t.detail.platform_name,callback:function(e){t.$set(t.detail,"platform_name",e)},expression:"detail.platform_name"}})],1),a("a-form-item",{attrs:{label:"平台账号","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-select",{staticStyle:{width:"200px"},attrs:{disabled:0!==t.id,placeholder:"请输入平台账号"},model:{value:t.detail.admin_id,callback:function(e){t.$set(t.detail,"admin_id",e)},expression:"detail.admin_id"}},t._l(t.accountList,(function(e,i){return a("a-select-option",{key:i,attrs:{value:e.id}},[t._v(t._s(e.username))])})),1),a("p",[a("span",{staticClass:"col-red"},[t._v("*")]),t._v("平台账号指商家自己注册或者平台添加的平台账号")])],1),a("a-form-item",{attrs:{label:"选择地址","label-col":{md:4,xs:24},"wrapper-col":{md:14,xs:24},required:!0}},[a("a-row",[a("a-col",{attrs:{md:12,xs:24}},[a("a-input",{attrs:{readOnly:"",placeholder:"请选择地址"},on:{click:t.showModal},model:{value:t.confirmSltAddr,callback:function(e){t.confirmSltAddr=e},expression:"confirmSltAddr"}})],1),a("a-col",{staticStyle:{"padding-left":"20px"},attrs:{md:12,xs:24}},[t.detail.longitude&&t.detail.latitude?a("div",[a("span",[t._v("经度："+t._s(t.detail.longitude))]),a("span",{staticClass:"ml10"},[t._v("纬度："+t._s(t.detail.latitude))])]):a("div",{staticStyle:{color:"red"}},[t._v("*暂无定位匹配，请重新输入")])])],1)],1),a("a-form-item",{attrs:{label:"项目地址","label-col":{md:4,xs:24},"wrapper-col":{md:14,xs:24},required:!0}},[a("a-row",[a("a-col",{attrs:{md:12,xs:24}},[a("a-input",{attrs:{placeholder:"请输入项目地址"},model:{value:t.detail.address,callback:function(e){t.$set(t.detail,"address",e)},expression:"detail.address"}})],1)],1)],1),a("a-form-item",{attrs:{label:"微信app_id","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入微信app_id"},model:{value:t.detail.app_id,callback:function(e){t.$set(t.detail,"app_id",e)},expression:"detail.app_id"}})],1),a("a-form-item",{attrs:{label:"微信secret","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入微信secret"},model:{value:t.detail.secret,callback:function(e){t.$set(t.detail,"secret",e)},expression:"detail.secret"}})],1),a("a-form-item",{attrs:{label:"项目接口url","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入项目接口url"},model:{value:t.detail.app_url,callback:function(e){t.$set(t.detail,"app_url",e)},expression:"detail.app_url"}})],1),a("a-form-item",{attrs:{label:"微信小程序appid","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入微信小程序appid"},model:{value:t.detail.mini_appid,callback:function(e){t.$set(t.detail,"mini_appid",e)},expression:"detail.mini_appid"}})],1),a("a-form-item",{attrs:{label:"微信小程序秘钥","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入微信小程序秘钥"},model:{value:t.detail.mini_secret,callback:function(e){t.$set(t.detail,"mini_secret",e)},expression:"detail.mini_secret"}})],1),a("a-form-item",{attrs:{label:"支付商户号","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入支付商户号"},model:{value:t.detail.mch_id,callback:function(e){t.$set(t.detail,"mch_id",e)},expression:"detail.mch_id"}})],1),a("a-form-item",{attrs:{label:"微信支付签名秘钥","label-col":{md:4,xs:24},"wrapper-col":{md:7,xs:24},required:!0}},[a("a-input",{attrs:{placeholder:"请输入微信支付签名秘钥"},model:{value:t.detail.pay_key,callback:function(e){t.$set(t.detail,"pay_key",e)},expression:"detail.pay_key"}})],1),a("a-form-item",{attrs:{"wrapper-col":{offset:4,md:12,xs:24}}},[a("a-button",{attrs:{type:"primary"},on:{click:t.HanderSubmit}},[t._v("提交")]),a("a-button",{staticClass:"ml10",attrs:{type:"danger"},on:{click:function(e){return t.$router.back(-1)}}},[t._v("返回")])],1),a("div",[a("a-modal",{attrs:{width:"85vw",title:"地址查询"},on:{ok:t.handleOk,cancel:t.cancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("div",{staticClass:"fxBox1 mb20"},[a("span",[t._v("关键词搜索：")]),a("a-input",{staticStyle:{width:"300px"},attrs:{type:"text",id:"keyword",placeholder:"请输入关键字：(选定后搜索)"}}),a("p",{staticClass:"ml10",staticStyle:{color:"red"}},[t._v("(请在搜索结果中选择地址，默认取第一个)")])],1),a("div",{staticClass:"map-container"},[a("div",{attrs:{id:"mapContainer"}}),a("div",{attrs:{id:"panel"}})])])],1)],1)},l=[],s=(a("5ab2"),a("6d57"),a("e10e"),a("cc57"),a("c0c3"),a("163d"),a("9a33"),a("ce3c")),r=a("e1d2"),o=a("804d"),n=a("4428"),d=a("c968"),c=a("9f3a"),p=a("024c"),u=a.n(p);function m(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function h(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?m(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):m(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var f={components:{UploadImage:n["a"]},computed:h({},Object(c["c"])({accountList:function(t){return t.project.accountlists},detail:function(t){return t.project.detail}})),data:function(){return{confirmSltAddr:"",formItem:{platform_name:"",admin_id:"",address:"",type:"normal",longitude:"",latitude:"",app_id:"",secret:"",app_url:"",mini_appid:"",mini_secret:"",mch_id:"",pay_key:""},id:0,items:{per_page:1e4,is_gm:0},cityLocation:"",lnglat:[116.397428,39.90923],zoom:19,selectAddress:"",selectLngLat:"",visible:!1,sltAddr:"",sltLng:"",sltLat:""}},methods:h(h({},Object(c["b"])({accountLists:"project/accountLists",getDetail:"project/getDetail",setDetail:"project/setDetail"})),{},{showModal:function(){this.visible=!0,this.searchAddressMethod()},handleOk:function(){this.confirmSltAddr=this.sltAddr,this.detail.longitude=this.sltLng,this.detail.latitude=this.sltLat,this.$forceUpdate(),this.visible=!1},cancel:function(){this.sltLng="",this.sltLat="",this.sltAddr=""},searchAddressMethod:function(){var t=this;u.a.plugin(["AMap.CitySearch","AMap.Autocomplete","AMap.PlaceSearch","AMap.Geocoder","AMap.ToolBar"],(function(){var e,a,i=new u.a.CitySearch;i.getLocalCity((function(a,i){if("complete"===a&&"OK"===i.info){var l=i.rectangle.split(";")[1].split(",");t.lnglat=l.map(Number),e=new u.a.Map("mapContainer",{resizeEnable:!0,zoom:t.zoom,keyboardEnable:!1}),e.addControl(new u.a.ToolBar)}}));var l={input:"keyword"};setTimeout((function(){var i=new u.a.Autocomplete(l);u.a.event.addListener(i,"select",(function(i){e.clearMap(),a=new u.a.PlaceSearch({map:e,pageSize:5,pageIndex:1,panel:"panel"}),a.search(i.poi.name,(function(e,i){if("complete"==e&&"OK"==i.info&&i.poiList.pois.length>0){var l=i.poiList.pois[0];t.sltLng=l.location.lng,t.sltLat=l.location.lat,t.sltAddr=l.name}u.a.event.addListener(a,"markerClick",(function(e){t.sltLng=e.data.location.lng,t.sltLat=e.data.location.lat,t.sltAddr=e.data.name})),u.a.event.addListener(a,"listElementClick",(function(e){t.sltLng=e.data.location.lng,t.sltLat=e.data.location.lat,t.sltAddr=e.data.name}))}))}))}),1e3)}))},HanderSubmit:function(){this.init(),this.id>0?r["a"].post(o["a"].action.platformUpdate,this.formItem).then((function(t){console.log(t),0===t.data.code?d["a"].showSuccess(t.data.message):d["a"].showError(t.data.message)})):r["a"].post(o["a"].action.platformAdd,this.formItem).then((function(t){console.log(t),0===t.data.code?d["a"].showSuccess(t.data.message):d["a"].showError(t.data.message)}))},getAccountList:function(){this.accountLists({obj:this.items})},init:function(){this.id=this.detail.gm_id,this.formItem={gm_id:this.detail.gm_id,platform_name:this.detail.platform_name,address:this.detail.address,admin_id:this.detail.admin_id,type:"normal",longitude:this.detail.longitude,latitude:this.detail.latitude,app_id:this.detail.app_id,secret:this.detail.secret,app_url:this.detail.app_url,mini_appid:this.detail.mini_appid,mini_secret:this.detail.mini_secret,mch_id:this.detail.mch_id,pay_key:this.detail.pay_key}}}),mounted:function(){this.getAccountList(),this.$route.params.id>0?(console.log(this.$route.params.id),this.id=this.$route.params.id,this.getDetail(this.$route.params.id)):this.setDetail()},watch:{detail:function(){this.confirmSltAddr=this.detail.address}}},g=f,b=(a("09b4"),a("9ca4")),v=Object(b["a"])(g,i,l,!1,null,"4dda2471",null);e["default"]=v.exports},b907:function(t,e,a){}}]);