(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a666d0c8"],{"0db8":function(t,e,a){},"4a8c":function(t,e,a){"use strict";a.r(e);var i,n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"list-nav"},[a("div",{staticClass:"mb10"},[a("a-button",{staticClass:"mr10",attrs:{icon:"download",type:"primary"},on:{click:t.selectBtn}},[t._v("导出勾选的数据")]),a("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:t.excelModelShow}},[t._v("高级导出")])],1),a("div",[a("a-input-search",{staticStyle:{width:"18rem"},attrs:{enterButton:"",placeholder:"请输入订单号搜素"},on:{search:t.orderSearch}})],1)]),a("div",{staticClass:"total"},t._l(t.total_data,(function(e,i){return a("span",{key:i,staticClass:"span"},[t._v(t._s(e.title+": ")),a("span",{staticClass:"text"},[t._v(t._s(e.value))])])})),0),t.fieldsData&&t.fieldsData.length>0?[a("a-tabs",{attrs:{defaultActiveKey:"待退款"},on:{change:t.changeTab}},t._l(t.tabsArr,(function(e,i){return a("a-tab-pane",{key:e,attrs:{tab:e}},[a("a-table",{staticClass:"mr10",attrs:{scroll:{x:2800,y:700},rowSelection:{onChange:t.onChange},rowKey:function(t){return t.id},columns:t.fieldsData,dataSource:t.listsData,pagination:!1},scopedSlots:t._u([{key:"expandedRowRender",fn:function(e,i,n){return a("a-table",{attrs:{columns:e.trade_order.field,dataSource:e.trade_order.data,pagination:!1},scopedSlots:t._u([{key:"goods_image",fn:function(t){return a("a",{attrs:{target:"_blank",href:t}},[a("img",{attrs:{height:"50px",src:t,alt:""}})])}}],null,!0)})}},{key:"action",fn:function(e,i){return"3"==i.status||"5"==i.status||"6"==i.status?a("div",{},[t._v("\n            待退款\n          ")]):"1"==i.status?a("div",[t._v("\n            已退款 "),a("br"),"offline"===i.trade_type?a("a",{attrs:{href:"javascript:;"},on:{click:function(e){return t.checkInfo(i)}}},[t._v("退款信息")]):t._e()]):"2"==i.status?a("div",[t._v("已驳回")]):t._e()}}],null,!0)})],1)})),1),a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page},on:{change:t.pageChange},model:{value:t.currentPage,callback:function(e){t.currentPage=e},expression:"currentPage"}})],1)]:t._e(),a("a-modal",{attrs:{title:"请按需选择导出的内容",confirmLoading:t.exportLoading,okText:"导出"},on:{ok:t.dataHandleOk,cancel:t.dataCancel},model:{value:t.dataVisible,callback:function(e){t.dataVisible=e},expression:"dataVisible"}},[a("a-form",{attrs:{layout:"horizontal"}},[a("a-form-item",{attrs:{label:"项目名称:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择项目"},model:{value:t.exportForm.gm_id,callback:function(e){t.$set(t.exportForm,"gm_id",e)},expression:"exportForm.gm_id"}},t._l(t.gmlistData,(function(e,i){return a("a-select-option",{key:i,attrs:{value:e.gm_id}},[t._v(t._s(e.platform_name))])})),1)],1),a("a-form-item",{attrs:{label:"店铺名称:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择店铺"},model:{value:t.exportForm.shop_id,callback:function(e){t.$set(t.exportForm,"shop_id",e)},expression:"exportForm.shop_id"}},t._l(t.shoplist,(function(e,i){return a("a-select-option",{key:i,attrs:{value:e.id}},[t._v(t._s(e.shop_name))])})),1)],1),a("a-form-item",{attrs:{label:"手机号:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.exportForm.mobile,callback:function(e){t.$set(t.exportForm,"mobile",e)},expression:"exportForm.mobile"}})],1),a("a-form-item",{attrs:{label:"退款状态:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择退款状态",allowClear:""},model:{value:t.exportForm.status,callback:function(e){t.$set(t.exportForm,"status",e)},expression:"exportForm.status"}},[a("a-select-option",{attrs:{value:1}},[t._v("待退款")]),a("a-select-option",{attrs:{value:2}},[t._v("已退款")])],1)],1),a("a-form-item",{attrs:{label:"退款时间:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[t.timeVisible?a("a-range-picker",{attrs:{"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm"},on:{change:t.timeChange,ok:t.timeOk}}):t._e()],1)],1)],1)],2)},s=[],r=(a("5ab2"),a("e10e"),a("6d57"),a("ce3c")),o=a("9f3a");a("c1fb"),a("804d");function c(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function l(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?c(Object(a),!0).forEach((function(e){Object(r["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):c(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var d={name:"aftersales",data:function(){return{tabsArr:["待退款","已退款"],listStatus:1,currentPage:1,editVisible:!1,selectLists:[],dataVisible:!1,exportLoading:!1,timeHide:!1,fromitem:{refunds_id:"",tid:"",shop_id:"",user_id:"",money:"",total_price:"",refund_type:"offline",refund_bank:"",receive_bank:"",refund_account:"",receive_account:"",refund_people:"",beneficiary:"",payment_id:""},timeItem:{},exportForm:{},showInfo:!1,shopParams:{per_page:1e6,is_open:1},timeVisible:!0}},methods:l(l({},Object(o["b"])({refundsLists:"trade/refundsLists",editDorefund:"trade/editDorefund",exportFilter:"trade/exportRefunds",refundsPay:"trade/refundsPay",resetSellerRefund:"trade/resetSellerRefund",getOffLineInfo:"trade/getOffLineInfo",gmfetchLists:"project/fetchLists",fetchLists:"shop/fetchLists"})),{},(i={timeChange:function(t,e){console.log("Selected Time: ",t),console.log("Formatted Selected Time: ",e),this.exportForm.refund_at_start=e[0],this.exportForm.refund_at_end=e[1]},timeOk:function(t){console.log("onOk: ",t)},timeType:function(t){void 0==t?(this.timeHide=!1,this.timeItem={},delete this.exportForm.time):(this.timeHide=!0,this.timeItem.type=t,this.timeItem.from="",this.timeItem.to="",this.exportForm.time=this.timeItem)},timeSelect:function(t,e){this.timeItem.from=e[0],this.timeItem.to=e[1],this.exportForm.time=this.timeItem},allCurrent:function(){this.export2Excel(this.listsData)},selectBtn:function(){0==this.selectLists.length?this.$warning({title:"温馨提示！",content:"请勾选需要导出的数据"}):(this.export2Excel(this.OneDimensionalArray(this.selectLists,!0)),this.$success({title:"温馨提示！",content:"数据正在导出,请稍后查看下载目录！"})),this.dataVisible=!1},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))},export2Excel:function(t){var e=[],i=[],n=t;this.fieldsData.forEach((function(t,a){e.push(t.title),i.push(t.dataIndex)})),e.splice(e.length-1,1),i.splice(i.length-1,1);var s=this.formatJson(i,n);Promise.all([a.e("chunk-87d7ce5a"),a.e("chunk-d33b169a"),a.e("chunk-2d0c8d9c")]).then(a.bind(null,"4bf8")).then((function(t){t.export_json_to_excel({header:e,data:s,filename:"平台退款订单列表",autoWidth:!0,bookType:"xlsx"})})),this.dataVisible=!1},excelModelShow:function(){var t=this;this.dataVisible=!0,this.timeVisible=!1,this.$nextTick((function(){t.timeVisible=!0}))},onChange:function(t,e){var a=this.listStatus;this.selectLists[a-1]||(this.selectLists[a-1]=[]),this.selectLists[a-1][this.currentPage-1]=e},dataHandleOk:function(){if(""==this.exportForm.mobile&&delete this.exportForm.mobile,0==Object.keys(this.exportForm).length)this.$warning({title:"温馨提示！",content:"需选择导出条件才可导出数据"});else{this.exportLoading=!0;var t={exportForm:this.exportForm};this.exportFilter(t)}},orderCallback:function(){this.exportLoading=!1,this.dataVisible=!1,this.exportPathMethodExcel(this.exportData),this.exportForm={},this.timeItem={},this.timeHide=!1},exportPathMethod:function(t){var e=t.order,a=e.tHeader,i=e.filterVal,n=e.list,s=[];s.push("".concat(a.join("\t,"),"\n"));for(var r=0;r<n.length;r++){for(var o=[],c=0;c<i.length;c++)o.push(n[r][i[c]]);s.push("".concat(o.join("\t,"),"\n"))}var l="";if(t.trade){var d=t.trade,u=d.tHeader,f=d.filterVal,h=d.list,m=[];m.push("".concat(u.join("\t,"),"\t\n"));for(r=0;r<h.length;r++){var p=[];for(c=0;c<f.length;c++)p.push(h[r][f[c]]);m.push("".concat(p.join("\t,"),"\t\n"))}l="".concat(s.join(""),"\n\n").concat(m.join("")),console.log(JSON.stringify(l))}else l="".concat(s.join(""));var b="data:text/csv;charset=utf-8,\ufeff".concat(encodeURIComponent(l)),_=document.createElement("a");_.href=b,_.download="平台退款列表.csv",document.body.appendChild(_),_.click()},exportPathMethodExcel:function(t){this.$success({title:"温馨提示！",content:"数据正在导出,请稍后查看下载目录！"}),console.log("11",t);var e=t.order.tHeader,i=t.order.filterVal,n=t.order.list,s=this.formatJson(i,n);Promise.all([a.e("chunk-87d7ce5a"),a.e("chunk-d33b169a"),a.e("chunk-2d0c8d9c")]).then(a.bind(null,"4bf8")).then((function(t){t.export_json_to_excel({header:e,data:s,filename:"平台退款列表",autoWidth:!0,bookType:"xlsx"})}))}},Object(r["a"])(i,"formatJson",(function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))})),Object(r["a"])(i,"dataCancel",(function(){this.dataVisible=!1,this.exportForm.refund_at_start="",this.exportForm.refund_at_end=""})),Object(r["a"])(i,"orderSearch",(function(t){this.refundsLists({tid:t,page:1})})),Object(r["a"])(i,"pageChange",(function(t){this.refundsLists({page:t,status:this.listStatus})})),Object(r["a"])(i,"edit",(function(t){this.editVisible=!0,this.fromitem.refunds_id=t.id,this.fromitem.tid=t.tid,this.fromitem.shop_id=t.shop_id,this.fromitem.user_id=t.user_id,this.fromitem.money=t.refund_fee,this.fromitem.total_price=t.total_price,this.fromitem.payment_id=t.payment_id})),Object(r["a"])(i,"checkInfo",(function(t){this.showInfo=!0,this.getOffLineInfo({tid:t.tid})})),Object(r["a"])(i,"editHandleOk",(function(){this.editDorefund(this.fromitem),this.editVisible=!1,this.refundsLists({page:1,status:this.listStatus}),this.currentPage=1,this.fromitem={refunds_id:"",tid:"",shop_id:"",user_id:"",money:"",total_price:"",refund_type:"offline",refund_bank:"",receive_bank:"",refund_account:"",receive_account:"",refund_people:"",beneficiary:"",payment_id:""}})),Object(r["a"])(i,"rejectRefund",(function(t){console.log(t);var e=this;this.$confirm({title:"提示",content:"确认要驳回退款吗？",okText:"确认",okType:"danger",cancelText:"取消",onOk:function(){e.resetSellerRefund({id:t.id})}})})),Object(r["a"])(i,"changeTab",(function(t){this.listStatus="待退款"===t?1:2,this.refundsLists({page:1,status:this.listStatus}),this.currentPage=1})),i)),computed:l({},Object(o["c"])({listsData:function(t){return t.trade.refundsData},fieldsData:function(t){return t.trade.refundsFields},pages:function(t){return t.trade.refundsPages},exportData:function(t){return t.trade.exportData},offLineInfo:function(t){return t.trade.offLineInfo},gmlistData:function(t){return t.project.lists},shoplist:function(t){return t.shop.lists},total_data:function(t){return t.trade.total_fee_data}})),mounted:function(){this.refundsLists({page:1,status:1}),this.gmfetchLists(this.shopParams),this.fetchLists(this.shopParams)},watch:{exportData:function(){this.orderCallback()}}},u=d,f=(a("c69e"),a("9ca4")),h=Object(f["a"])(u,n,s,!1,null,"3509bba8",null);e["default"]=h.exports},c69e:function(t,e,a){"use strict";var i=a("0db8"),n=a.n(i);n.a}}]);