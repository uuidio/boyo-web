(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-45e2952c"],{"0d08":function(t,e,a){"use strict";var r=a("d9a2"),s=a.n(r);s.a},ad15:function(t,e,a){"use strict";a.r(e);var r,s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"mb20"},[a("div",{staticClass:"list-nav"},[a("div",[a("a-button",{attrs:{type:"primary",icon:"download"},on:{click:t.exportTable}},[t._v("导出")]),a("a-button",{attrs:{type:"primary",icon:"filter"},on:{click:t.filterAlert}},[t._v("筛选")])],1)])]),t.listField&&t.listField.length>0?[a("a-tabs",{on:{tabClick:t.tabClick},model:{value:t.currentAct,callback:function(e){t.currentAct=e},expression:"currentAct"}},t._l(t.afterStatus,(function(e,r){return a("a-tab-pane",{key:e.key,attrs:{tab:e.title}},[a("a-table",{attrs:{scroll:{x:1600,y:700},columns:t.listField,dataSource:t.listsData,pagination:!1},scopedSlots:t._u([{key:"action",fn:function(e,r){return a("div",{},[a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.goDetails(r)}}},[t._v("查看")])])}}],null,!0)})],1)})),1),a("div",{directives:[{name:"show",rawName:"v-show",value:0!==t.listsData.length,expression:"listsData.length !== 0"}],staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page},on:{change:t.pageChange},model:{value:t.currentPages,callback:function(e){t.currentPages=e},expression:"currentPages"}})],1)]:t._e(),a("a-modal",{attrs:{title:t.title},on:{ok:t.filterOk,cancel:t.filterCancel},model:{value:t.exportModel,callback:function(e){t.exportModel=e},expression:"exportModel"}},[a("a-form-item",{attrs:{label:"项目名称:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择项目"},model:{value:t.exportForm.gm_id,callback:function(e){t.$set(t.exportForm,"gm_id",e)},expression:"exportForm.gm_id"}},t._l(t.gmlistData,(function(e,r){return a("a-select-option",{key:r,attrs:{value:e.gm_id}},[t._v(t._s(e.platform_name))])})),1)],1),a("a-form-item",{attrs:{label:"店铺名称:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择店铺"},model:{value:t.exportForm.shop_id,callback:function(e){t.$set(t.exportForm,"shop_id",e)},expression:"exportForm.shop_id"}},t._l(t.shoplist,(function(e,r){return a("a-select-option",{key:r,attrs:{value:e.id}},[t._v(t._s(e.shop_name))])})),1)],1),a("a-form-item",{attrs:{label:"退货状态:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{staticStyle:{width:"100%"},attrs:{placeholder:"请选择订单状态"},model:{value:t.exportForm.status,callback:function(e){t.$set(t.exportForm,"status",e)},expression:"exportForm.status"}},[a("a-select-option",{attrs:{value:"2"}},[t._v("已处理")]),a("a-select-option",{attrs:{value:"1"}},[t._v("处理中")]),a("a-select-option",{attrs:{value:"0"}},[t._v("待处理")]),a("a-select-option",{attrs:{value:"3"}},[t._v("已驳回")]),a("a-select-option",{attrs:{value:""}},[t._v("全部")])],1)],1),a("a-form-item",{attrs:{label:"生成时间:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[t.timeVisible?a("a-range-picker",{attrs:{"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm",placeholder:["开始时间","结束时间"]},on:{change:t.timeChange,ok:t.timeOk}}):t._e()],1)],1)],2)},i=[],o=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),n=a("9f3a");function l(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(t);e&&(r=r.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,r)}return a}function c(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?l(Object(a),!0).forEach((function(e){Object(o["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):l(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var u={computed:c({},Object(n["c"])({listsData:function(t){return t.trade.refundsGoodData},pages:function(t){return t.trade.refundsGoodPages},listField:function(t){return t.trade.refundsGoodFields},exportData:function(t){return t.trade.exportData},shoplist:function(t){return t.shop.lists},gmlistData:function(t){return t.project.lists}})),data:function(){return{getData:{page:1},searchObj:{select:"name",param:{},value:""},exportForm:{status:"",page:"1"},currentParam:{},filterParams:{},afterStatus:[{title:"全部",key:""},{title:"已处理",key:"2"},{title:"处理中",key:"1"},{title:"待处理",key:"0"},{title:"已驳回",key:"3"}],exportModel:!1,isFillter:!1,currentAct:"",currentPages:1,title:"售后列表筛选",timeVisible:!0,shopParams:{per_page:1e6,is_open:1}}},methods:c(c({},Object(n["b"])({fetchLists:"trade/refundsGoodLists",exportFilter:"trade/exportRefundsGood",fetchShopLists:"shop/fetchLists",gmfetchLists:"project/fetchLists"})),{},(r={pageChange:function(t){var e=this.isFillter?this.filterParams:this.currentParam;e.status=e.status>=0?e.status:"",e.page=t,this.fetchLists(e)},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))},goDetails:function(t){var e="/trade/afterSales/detail/".concat(t.aftersales_bn),a=this.$router.resolve({path:e});window.open(a.href,"_blank")},exportTable:function(){var t=this;this.exportModel=!0,this.type="export",this.title="退货列表导出",this.timeVisible=!1,this.$nextTick((function(){t.timeVisible=!0})),this.exportForm={}},dataHandleOk:function(){0==Object.keys(this.exportForm).length?this.$warning({title:"温馨提示！",content:"需选择导出条件才可导出数据"}):(this.exportLoading=!0,this.exportFilter({exportForm:this.exportForm}))},orderCallback:function(){this.exportLoading=!1,this.dataVisible=!1,this.exportPathMethod(this.exportData),this.exportForm={},this.timeItem={},this.timeHide=!1}},Object(o["a"])(r,"formatJson",(function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))})),Object(o["a"])(r,"exportPathMethod",(function(t){this.$success({title:"温馨提示！",content:"数据正在导出,请稍后查看下载目录！"});var e=t.order.tHeader,r=t.order.filterVal,s=t.order.list,i=this.formatJson(r,s);Promise.all([a.e("chunk-87d7ce5a"),a.e("chunk-d33b169a"),a.e("chunk-2d0c8d9c")]).then(a.bind(null,"4bf8")).then((function(t){t.export_json_to_excel({header:e,data:i,filename:"平台端退货列表",autoWidth:!0,bookType:"xlsx"})}))})),Object(o["a"])(r,"toSearch",(function(){this.searchObj.value?(this.currentParam={},this.currentParam.tid=this.searchObj.value,this.fetchLists({page:1,tid:this.searchObj.value})):this.$message.info("订单号不能为空")})),Object(o["a"])(r,"tabClick",(function(t){console.log(t),this.exportForm.status=t,this.currentAct=t,this.currentParam={},this.currentParam.status=t,this.isFillter=!1,this.searchObj.value="",this.fetchLists({page:1,status:t>=0?t:""}),this.currentPages=1})),Object(o["a"])(r,"filterAlert",(function(){var t=this;this.exportModel=!0,this.type="search",this.title="退货列表筛选",this.timeVisible=!1,this.$nextTick((function(){t.timeVisible=!0})),this.exportForm={}})),Object(o["a"])(r,"filterOk",(function(){this.isFillter=!0,this.currentAct=this.exportForm.status?this.exportForm.status:"",this.filterParams=Object.assign({},this.exportForm),this.filterParams.status=this.filterParams.status>=0?this.filterParams.status:"",this.exportModel=!1,"search"==this.type?this.fetchLists(this.filterParams):this.dataHandleOk(),this.searchObj.value="",this.exportForm={page:1,shop_id:"",gm_id:""},console.log(this.filterParams)})),Object(o["a"])(r,"filterCancel",(function(){this.exportForm.created_start="",this.exportForm.created_end=""})),Object(o["a"])(r,"timeChange",(function(t,e){console.log("Selected Time: ",t),console.log("Formatted Selected Time: ",e),this.exportForm.created_start=e[0],this.exportForm.created_end=e[1]})),Object(o["a"])(r,"timeOk",(function(t){console.log("onOk: ",t)})),r)),mounted:function(){this.fetchLists({page:1}),this.fetchShopLists(this.shopParams),this.gmfetchLists(this.shopParams)},watch:{exportData:function(){this.orderCallback()}}},h=u,p=(a("0d08"),a("9ca4")),m=Object(p["a"])(h,s,i,!1,null,"542afe3c",null);e["default"]=m.exports},d9a2:function(t,e,a){}}]);