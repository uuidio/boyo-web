(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-bad63336"],{4780:function(t,e,a){"use strict";var i=a("7c7e"),r=a.n(i);r.a},"7c7e":function(t,e,a){},"7ef5":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"content"},[a("div",{staticClass:"list-nav"},[a("div",{staticClass:"mb10"},[a("a-button",{staticClass:"mr10",attrs:{icon:"download",type:"primary"},on:{click:t.selectBtn}},[t._v("导出勾选的数据")]),a("a-button",{staticClass:"mr10",attrs:{type:"primary"},on:{click:t.excelModelShow}},[t._v("高级导出")])],1)]),a("searchItem",{staticClass:"mb20",on:{"on-search":t.getSearch}}),a("div",{staticClass:"total"},t._l(t.total_data,(function(e,i){return a("span",{key:i,staticClass:"span"},[t._v(t._s(e.title+": ")),a("span",{staticClass:"text"},[t._v(t._s(e.value))])])})),0),t.listField&&t.listField.length>0?[a("a-tabs",{attrs:{defaultActiveKey:t.trim},on:{tabClick:t.onGetData}},t._l(t.tabLists,(function(e,i){return a("a-tab-pane",{key:e.key,attrs:{tab:e.tab}},[a("a-table",{attrs:{scroll:{x:1900,y:700},rowKey:function(t){return t.id},rowSelection:{onChange:t.onChange},columns:t.listField,dataSource:t.listData,pagination:!1},scopedSlots:t._u([{key:"expandedRowRender",fn:function(e,i,r){return a("a-table",{attrs:{columns:e.trade_order.field,dataSource:e.trade_order.data,pagination:!1},scopedSlots:t._u([{key:"goods_image",fn:function(t){return a("a",{attrs:{target:"_blank",href:t}},[a("img",{attrs:{height:"50px",src:t,alt:""}})])}}],null,!0)})}},{key:"name",fn:function(e,i){return a("div",{},t._l(i.name,(function(e,i){return a("div",{key:i,staticClass:"order-item"},[a("div",[a("img",{attrs:{src:e.img,alt:""}})]),a("div",[a("a",{attrs:{href:"#"}},[t._v("\n                    "+t._s(e.title)+"\n                  ")]),a("p",[t._v("\n                    "+t._s(e.sku)+"\n                  ")])])])})),0)}},{key:"action",fn:function(e,i){return a("div",{},[a("a-button",{staticClass:"mr10",attrs:{size:"small",type:"primary"},on:{click:function(e){return t.goDetails(i)}}},[t._v("\n                订单详情\n              ")]),"待发货"!=i.status_text||i.trade_cancel&&"FAILS"!==i.cancel_status||1===i.pick_type?t._e():a("a-button",{staticClass:"mt10 mr10",attrs:{size:"small"},on:{click:function(e){return t.delivery(i)}}},[t._v("\n                发货\n              ")]),"待发货"!=i.status_text||i.trade_cancel&&"FAILS"!==i.cancel_status?t._e():a("a-button",{staticClass:"mt10 mr10",attrs:{type:"danger",size:"small"},on:{click:function(e){return t.modelShow(i)}}},[t._v("\n                取消订单\n              ")]),i.trade_cancel&&"0"===i.trade_cancel.process?a("router-link",{attrs:{to:"/trade/order/cancelorder"}},[a("a-button",{staticClass:"mt10 mr10",attrs:{type:"danger",size:"small"}},[t._v("\n                  审核\n                ")])],1):t._e(),"待发货"!=i.status_text&&"待收货"!=i.status_text||1!=i.pick_type||i.trade_cancel?t._e():a("a-button",{staticClass:"mt10 mr10",attrs:{size:"small"},on:{click:function(e){return t.pickUp(i)}}},[t._v("\n                提货\n              ")]),a("a-button",{attrs:{type:"primary",size:"small"},on:{click:function(e){return t.addRemark(i)}}},[t._v("追加备注")])],1)}}],null,!0)})],1)})),1),t.listData.length>0?a("div",{staticClass:"pageBox"},[a("a-pagination",{attrs:{total:t.pages.total,showTotal:function(t){return"共 "+t+" 条数据"},pageSize:t.pages.per_page,defaultCurrent:1},on:{change:t.pageChange}})],1):t._e()]:t._e(),a("a-modal",{attrs:{title:"请按需选择导出的内容",confirmLoading:t.exportLoading,okText:"导出"},on:{ok:t.dataHandleOk,cancel:t.dataCancel},model:{value:t.dataVisible,callback:function(e){t.dataVisible=e},expression:"dataVisible"}},[a("a-form",{attrs:{layout:"horizontal"}},[a("a-form-item",{attrs:{label:"订单状态:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择订单状态",allowClear:""},model:{value:t.exportForm.status,callback:function(e){t.$set(t.exportForm,"status",e)},expression:"exportForm.status"}},[a("a-select-option",{attrs:{value:"WAIT_BUYER_PAY"}},[t._v("待付款")]),a("a-select-option",{attrs:{value:"WAIT_SELLER_SEND_GOODS"}},[t._v("待发货")]),a("a-select-option",{attrs:{value:"WAIT_BUYER_CONFIRM_GOODS"}},[t._v("待收货")]),a("a-select-option",{attrs:{value:"TRADE_FINISHED"}},[t._v("已完成")]),a("a-select-option",{attrs:{value:"TRADE_CLOSED"}},[t._v("已关闭")]),a("a-select-option",{attrs:{value:"TRADE_CLOSED_BY_SYSTEM"}},[t._v("系统关闭")])],1)],1),a("a-form-item",{attrs:{label:"手机号:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-input",{attrs:{placeholder:"请输入手机号"},model:{value:t.exportForm.mobile,callback:function(e){t.$set(t.exportForm,"mobile",e)},expression:"exportForm.mobile"}})],1),a("a-form-item",{attrs:{label:"提货方式:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择提货方式",allowClear:""},model:{value:t.exportForm.pick_type,callback:function(e){t.$set(t.exportForm,"pick_type",e)},expression:"exportForm.pick_type"}},[a("a-select-option",{attrs:{value:"0"}},[t._v("快递")]),a("a-select-option",{attrs:{value:"1"}},[t._v("自提")])],1)],1),a("a-form-item",{attrs:{label:"筛选时间:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-select",{attrs:{placeholder:"请选择时间类型",allowClear:""},on:{change:t.timeType},model:{value:t.timeItem.type,callback:function(e){t.$set(t.timeItem,"type",e)},expression:"timeItem.type"}},[a("a-select-option",{attrs:{value:"pay_time"}},[t._v("支付时间")]),a("a-select-option",{attrs:{value:"end_time"}},[t._v("完成时间")]),a("a-select-option",{attrs:{value:"created_at"}},[t._v("生成时间")])],1),t.timeHide?a("div",{staticClass:"timeHide"},[a("a-range-picker",{attrs:{"show-time":{format:"HH:mm"},format:"YYYY-MM-DD HH:mm"},on:{change:t.timeChange,ok:t.timeOk}}),a("h4",{staticStyle:{"line-height":"1.2em"}},[a("a-icon",{staticStyle:{color:"red","margin-right":"5px"},attrs:{type:"exclamation-circle"}}),t._v("\n                开始时间和结束时间必填,否则导出数据为空\n              ")],1)],1):t._e()],1)],1)],1),a("a-modal",{attrs:{title:"取消订单"},on:{ok:t.handleOk,cancel:t.cancel},model:{value:t.visible,callback:function(e){t.visible=e},expression:"visible"}},[a("div",{staticClass:"mb10"},[t._v("订单号："+t._s(t.formItem.tid))]),a("div",[t._v("\n          订单取消原因：\n          "),a("a-textarea",{staticClass:"mt10",attrs:{placeholder:"请输入订单取消原因",rows:4},model:{value:t.formItem.cancel_reason,callback:function(e){t.$set(t.formItem,"cancel_reason",e)},expression:"formItem.cancel_reason"}})],1)]),a("a-modal",{attrs:{title:"提货"},on:{ok:t.pickUphandleOk},model:{value:t.pickUpVisible,callback:function(e){t.pickUpVisible=e},expression:"pickUpVisible"}},[t._v("\n        提货码：\n        "),a("a-input",{staticStyle:{width:"24rem"},attrs:{placeholder:"请输入取货码"},model:{value:t.pickUpObj.code,callback:function(e){t.$set(t.pickUpObj,"code",e)},expression:"pickUpObj.code"}})],1),a("a-modal",{attrs:{title:"备注"},on:{ok:t.remorkOk},model:{value:t.remarkVisible,callback:function(e){t.remarkVisible=e},expression:"remarkVisible"}},[a("a-form-item",{staticStyle:{display:"flex"},attrs:{label:"追加备注:","label-col":{md:6,xs:24},"wrapper-col":{md:18,xs:24}}},[a("a-textarea",{staticStyle:{width:"24rem","padding-top":"7px"},attrs:{placeholder:"请输入备注"},model:{value:t.remark_content,callback:function(e){t.remark_content=e},expression:"remark_content"}})],1)],1)],2)},r=[],s=(a("5ab2"),a("6d57"),a("e10e"),a("ce3c")),o=a("9f3a"),n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",[a("a-form",{attrs:{layout:"inline"}},[a("a-row",[a("a-col",{attrs:{md:12,xs:24}},[a("a-form-item",{attrs:{label:"关键字搜索","label-col":t.formItemLayout.labelCol,"wrapper-col":t.formItemLayout.wrapperCol}},[a("a-select",{staticStyle:{width:"120px"},attrs:{allowClear:""},model:{value:t.searchVal,callback:function(e){t.searchVal=e},expression:"searchVal"}},[a("a-select-option",{attrs:{value:"tid"}},[t._v("订单号")]),a("a-select-option",{attrs:{value:"payment_id"}},[t._v("商户订单号")]),a("a-select-option",{attrs:{value:"receiver_name"}},[t._v("收货人姓名")]),a("a-select-option",{attrs:{value:"receiver_tel"}},[t._v("收货人手机号")]),a("a-select-option",{attrs:{value:"goods_name"}},[t._v("商品名称")])],1),a("a-input",{staticStyle:{width:"200px"},attrs:{placeholder:"请输入关键字",allowClear:""},model:{value:t.keyword,callback:function(e){t.keyword=e},expression:"keyword"}})],1)],1),a("a-col",{attrs:{md:12,xs:24}},[a("a-form-item",{attrs:{label:"订单创建时间","label-col":t.formItemLayout.labelCol,"wrapper-col":t.formItemLayout.wrapperCol}},[a("a-range-picker",{on:{change:t.timeChange},model:{value:t.createdTime,callback:function(e){t.createdTime=e},expression:"createdTime"}})],1)],1),a("a-col",{staticClass:"mt20",attrs:{md:24,xs:24}},[a("a-form-item",{attrs:{label:"活动订单选择","label-col":{xs:{span:24},md:{span:3}},"wrapper-col":t.formItemLayout.wrapperCol}},[a("a-checkbox",{attrs:{indeterminate:t.indeterminate,checked:t.checkAll},on:{change:t.onCheckAllChange}},[t._v("\n            全选\n          ")]),a("a-checkbox-group",{attrs:{options:t.plainOptions},on:{change:t.onChange},model:{value:t.activity_sign_arr,callback:function(e){t.activity_sign_arr=e},expression:"activity_sign_arr"}})],1)],1),a("a-col",{staticClass:"mt20",attrs:{md:24,xs:24}},[a("a-form-item",{attrs:{label:"配送方式选择","label-col":{xs:{span:24},md:{span:3}},"wrapper-col":t.formItemLayout.wrapperCol}},[a("a-radio-group",{model:{value:t.pick_type,callback:function(e){t.pick_type=e},expression:"pick_type"}},[a("a-radio",{attrs:{value:t.trimStr}},[t._v("\n              全部\n            ")]),a("a-radio",{attrs:{value:"0"}},[t._v("\n              快递\n            ")]),a("a-radio",{attrs:{value:"1"}},[t._v("\n              自提\n            ")]),a("a-radio",{attrs:{value:"2"}},[t._v("\n              配送到家\n            ")])],1)],1)],1),a("a-col",{staticClass:"mt20",attrs:{md:12,xs:24}},[a("a-form-item",{attrs:{"label-col":t.formItemLayout.labelCol,"wrapper-col":t.formItemLayout.wrapperCol}},[a("a-button",{staticClass:"mr15",attrs:{type:"primary"},on:{click:t.subSearch}},[t._v("查询")]),a("a-button",{staticClass:"ml10",on:{click:t.resetSearch}},[t._v("重置")])],1)],1)],1)],1)],1)},l=[],c={labelCol:{xs:{span:24},md:{span:6}},wrapperCol:{xs:{span:24},md:{span:16}}},m={data:function(){return{indeterminate:!1,checkAll:!1,plainOptions:[{label:"秒杀活动订单",value:"seckill"},{label:"拼团活动订单",value:"is_group"},{label:"normal"===this.UserType?"积分兑换订单":"牛币兑换订单",value:"point_goods"},{label:"抽奖订单",value:"choujiang"}],formItemLayout:c,trim:"",searchVal:"tid",activity_sign_arr:[],keyword:"",selectKeys:{tid:"tid",receiver_name:"receiver_name",receiver_tel:"receiver_tel",goods_name:"goods_name"},createdTime:"",created_start:"",created_end:"",pick_type:"",trimStr:""}},methods:{resetSearch:function(){this.searchVal="tid",this.keyword="",this.created_start="",this.created_end="",this.activity_sign_arr="",this.createdTime="",this.indeterminate=!1,this.checkAll=!1,this.pick_type=""},filterValue:function(t){for(var e=[],a=0;a<t.length;a++)e.push(t[a].value);return e},onChange:function(t){this.indeterminate=!!t.length&&t.length<this.plainOptions.length,this.checkAll=t.length===this.plainOptions.length},onCheckAllChange:function(t){Object.assign(this,{activity_sign_arr:t.target.checked?this.filterValue(this.plainOptions):[],indeterminate:!1,checkAll:t.target.checked})},timeChange:function(t,e){""===e[0]?(this.created_start="",this.created_end=""):(this.created_start="".concat(e[0]," 00:00:00"),this.created_end="".concat(e[1]," 23:59:59"))},subSearch:function(){var t={};t[this.searchVal]=this.keyword,t.created_start=this.created_start,t.created_end=this.created_end,t.activity_sign_arr=this.activity_sign_arr,t.pick_type=this.pick_type,console.log(t),this.$emit("on-search",t)}},mounted:function(){}},d=m,p=(a("a66c"),a("9ca4")),u=Object(p["a"])(d,n,l,!1,null,"1cb489e9",null),h=u.exports;function f(t,e){var a=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),a.push.apply(a,i)}return a}function _(t){for(var e=1;e<arguments.length;e++){var a=null!=arguments[e]?arguments[e]:{};e%2?f(Object(a),!0).forEach((function(e){Object(s["a"])(t,e,a[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(a)):f(Object(a)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(a,e))}))}return t}var b=[{tab:"全部",key:""},{tab:"待付款",key:1},{tab:"待发货",key:2},{tab:"待收货",key:3},{tab:"已完成",key:4},{tab:"已关闭",key:5}],k={name:"orderlists",components:{searchItem:h},data:function(){return{tabLists:b,trim:"",selectLists:[],exportLoading:!1,dataVisible:!1,timeHide:!1,orderStatusBool:"",visible:!1,pickUpVisible:!1,status:0,formItem:{tid:"",cancel_reason:""},pickUpObj:{id:"",code:""},remarkObj:{id:""},remark_content:"",remarkVisible:!1,getListsItem:{status:"",page:1},current:1,pagination:{},timeItem:{},exportForm:{},searchOptions:{}}},methods:_(_({},Object(o["b"])({fetchLists:"trade/fetchLists",cancelOrder:"trade/cancelOrder",pickUpInfo:"trade/pickUpInfo",exportFilter:"trade/exportFilter",addOrderRemark:"trade/addOrderRemark",orderAccountDown:"trade/orderAccountDown"})),{},{getSearch:function(t){this.searchOptions=t,this.getListsItem.page=1,this.getLists()},timeType:function(t){void 0==t?(this.timeHide=!1,this.timeItem={},delete this.exportForm.time):(this.timeHide=!0,this.timeItem.type=t,this.timeItem.from="",this.timeItem.to="",this.exportForm.time=this.timeItem)},timeSelect:function(t,e){console.log(t,e,9898),this.timeItem.from=e[0],this.timeItem.to=e[1],this.exportForm.time=this.timeItem,this.exportForm.timeout=3e4},timeChange:function(t,e){this.timeItem.from=e[0],this.timeItem.to=e[1],this.exportForm.time=this.timeItem,this.exportForm.timeout=3e4},timeOk:function(){},dataHandleOk:function(){var t=this;""==this.exportForm.mobile&&delete this.exportForm.mobile,0==Object.keys(this.exportForm).length?this.$warning({title:"温馨提示！",content:"需选择导出条件才可导出数据"}):(this.exportLoading=!0,this.orderAccountDown({exportForm:this.exportForm,callback:this.excelBack}),setTimeout((function(){t.exportLoading=!1}),3e3))},excelBack:function(){var t=this;setTimeout((function(){t.exportLoading=!1,t.dataVisible=!1;var e="/statistics/downLoadList",a=t.$router.resolve({path:e});window.open(a.href,"_blank")}),1e3)},callback:function(){this.exportLoading=!1,this.dataVisible=!1,this.exportPathMethod(this.exportData),this.exportForm={},this.timeItem={},this.timeHide=!1},dataCancel:function(){this.dataVisible=!1},allCurrent:function(){this.export2Excel(this.listData)},selectBtn:function(){if(0==this.selectLists.length)this.$warning({title:"温馨提示！",content:"请勾选需要导出的数据"});else{var t=[],e=[];this.listField.forEach((function(a,i){t.push(a.title),e.push(a.dataIndex)})),t.splice(t.length-1,1),e.splice(e.length-1,1),console.log(t),console.log(e),this.export2Excel(t,e,this.OneDimensionalArray(this.selectLists,!0)),this.$success({title:"温馨提示！",content:"数据正在导出,请稍后查看下载目录！"})}this.dataVisible=!1},formatJson:function(t,e){return e.map((function(e){return t.map((function(t){return e[t]}))}))},getLists:function(){var t=this.getListsItem,e=this.searchOptions,a=Object.assign(e,t);this.fetchLists(a)},excelModelShow:function(){this.dataVisible=!0},exportPathMethod:function(t){this.$success({title:"温馨提示！",content:"数据正在导出,请稍后查看下载目录！"});var e=t.order.tHeader,i=t.order.filterVal,r=t.order.list,s=this.formatJson(i,r);Promise.all([a.e("chunk-87d7ce5a"),a.e("chunk-c52ffaa2"),a.e("chunk-23853d05")]).then(a.bind(null,"4bf8")).then((function(t){t.export_json_to_excel({header:e,data:s,filename:"门店订单管理",autoWidth:!0,bookType:"xlsx"})}))},export2Excel:function(t,e,i){var r=e,s=i,o=this.formatJson(r,s);Promise.all([a.e("chunk-87d7ce5a"),a.e("chunk-c52ffaa2"),a.e("chunk-23853d05")]).then(a.bind(null,"4bf8")).then((function(e){e.export_json_to_excel({header:t,data:o,filename:"门店订单管理",autoWidth:!0,bookType:"xlsx"})})),this.dataVisible=!1},onChange:function(t,e){var a=this.getListsItem.status;this.selectLists[a||0]||(this.selectLists[a||0]=[]),this.selectLists[a||0][this.getListsItem.page-1]=e},pageChange:function(t){this.getListsItem.page=t,this.getLists()},onGetData:function(t){this.getListsItem.status=t,this.getListsItem.page=1,this.getLists()},goDetails:function(t){var e="/trade/order/detail/".concat(t.tid),a=this.$router.resolve({path:e});window.open(a.href,"_blank")},delivery:function(t){var e="/trade/order/delivery/".concat(t.tid),a=this.$router.resolve({path:e});window.open(a.href,"_blank")},handleOk:function(){this.cancelOrder({formItem:this.formItem})},modelShow:function(t){this.formItem.tid=t.tid,this.visible=!0},cancel:function(){this.formItem.cancel_reason=""},pickUp:function(t){this.pickUpVisible=!0,this.pickUpObj.id=t.id},pickUphandleOk:function(){""==!this.pickUpObj.code&&(this.pickUpInfo({InfoObj:this.pickUpObj}),this.pickUpVisible=!1)},remorkOk:function(){if(""==!this.remark_content){var t={tid:this.remarkObj.id,remarks:this.remark_content};console.log("订单号",t),this.addOrderRemark(t),this.remarkVisible=!1}},addRemark:function(t){this.remarkObj.id=t.id,this.remarkVisible=!0,this.remark_content=t.add_remarks}}),mounted:function(){this.getLists()},watch:{},computed:_({},Object(o["c"])({listData:function(t){return t.trade.orderLists},pages:function(t){return t.trade.pages},listField:function(t){return t.trade.orderHead},exportData:function(t){return t.trade.exportData},total_data:function(t){return t.trade.total_fee_data}}))},v=k,g=(a("4780"),Object(p["a"])(v,i,r,!1,null,"d05e0354",null));e["default"]=g.exports},a66c:function(t,e,a){"use strict";var i=a("dbcf"),r=a.n(i);r.a},dbcf:function(t,e,a){}}]);