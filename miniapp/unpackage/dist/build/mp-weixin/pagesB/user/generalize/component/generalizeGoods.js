require('../../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/user/generalize/component/generalizeGoods"],{5764:function(e,t,n){"use strict";n.r(t);var o=n("b60b"),i=n.n(o);for(var a in o)"default"!==a&&function(e){n.d(t,e,(function(){return o[e]}))}(a);t["default"]=i.a},"8b50":function(e,t,n){"use strict";var o,i=function(){var e=this,t=e.$createElement;e._self._c},a=[];n.d(t,"b",(function(){return i})),n.d(t,"c",(function(){return a})),n.d(t,"a",(function(){return o}))},b60b:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var n=[{name:"今日",type:"now"},{name:"昨日",type:"yesterday"},{name:"近7日",type:"week"},{name:"近30日",type:"month"}],o={components:{},data:function(){return{tabs:n,active:0,showItem:!0,detail:{},wechet_open_id:0,user_info:JSON.parse(e.getStorageSync("user_info"))}},props:{status:Number},onLoad:function(){},methods:{activeChange:function(e){this.active!==e&&(this.active=e,this.getDetail())},getDepositType:function(){this.needTokenLink("/pagesB/user/generalize/deposit")},toMyCode:function(){var e=this;this.$http({aurl:"getWxMiniQr",success:function(t){t.data.result.wx_mini_person_qr&&e.needTokenLink("/pagesB/user/generalize/myCode"),console.log(t)},fail:function(e){console.log(e)},complete:function(e){}})},getDetail:function(){var e=this;this.$http({aurl:"getPersonDistribution",params:{type:n[this.active].type},success:function(t){e.detail=t.data.result,1==e.detail.wechet_open_id&&(e.wechet_open_id=e.detail.wechet_open_id),console.log(t),console.log(e.detail)},fail:function(e){console.log(e)},complete:function(t){e.showItem=!0}})}},mounted:function(){this.getDetail()}};t.default=o}).call(this,n("543d")["default"])},d00d:function(e,t,n){"use strict";n.r(t);var o=n("8b50"),i=n("5764");for(var a in i)"default"!==a&&function(e){n.d(t,e,(function(){return i[e]}))}(a);n("f8bd");var c,u=n("f0c5"),s=Object(u["a"])(i["default"],o["b"],o["c"],!1,null,"5e99e18c",null,!1,o["a"],c);t["default"]=s.exports},ef18:function(e,t,n){},f8bd:function(e,t,n){"use strict";var o=n("ef18"),i=n.n(o);i.a}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'pagesB/user/generalize/component/generalizeGoods-create-component',
    {
        'pagesB/user/generalize/component/generalizeGoods-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("d00d"))
        })
    },
    [['pagesB/user/generalize/component/generalizeGoods-create-component']]
]);
