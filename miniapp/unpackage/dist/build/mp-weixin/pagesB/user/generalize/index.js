require('../../common/vendor.js');(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pagesB/user/generalize/index"],{"05da":function(e,n,t){"use strict";(function(e){t("cf0c");o(t("66fd"));var n=o(t("77b5"));function o(e){return e&&e.__esModule?e:{default:e}}e(n.default)}).call(this,t("543d")["createPage"])},"207e":function(e,n,t){"use strict";var o,a=function(){var e=this,n=e.$createElement;e._self._c},r=[];t.d(n,"b",(function(){return a})),t.d(n,"c",(function(){return r})),t.d(n,"a",(function(){return o}))},5395:function(e,n,t){"use strict";t.r(n);var o=t("5835"),a=t.n(o);for(var r in o)"default"!==r&&function(e){t.d(n,e,(function(){return o[e]}))}(r);n["default"]=a.a},5835:function(e,n,t){"use strict";(function(e){Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var o=function(){t.e("pagesB/user/generalize/component/generalizeGoods").then(function(){return resolve(t("d00d"))}.bind(null,t)).catch(t.oe)},a=function(){t.e("pagesB/user/generalize/component/apply").then(function(){return resolve(t("7b36"))}.bind(null,t)).catch(t.oe)},r=function(){t.e("pagesB/user/generalize/component/audit").then(function(){return resolve(t("cbce"))}.bind(null,t)).catch(t.oe)},u=function(){t.e("pagesB/user/generalize/component/applyFail").then(function(){return resolve(t("bf2f"))}.bind(null,t)).catch(t.oe)},i=function(){t.e("pagesB/user/generalize/component/freeze").then(function(){return resolve(t("eaca"))}.bind(null,t)).catch(t.oe)},c={components:{audit:r,apply:a,goodsLists:o,applyFail:u,freeze:i},data:function(){return{type:0,show:!1,reason:"",partner_id:""}},onLoad:function(n){n.partner_id&&(this.partner_id=n.partner_id),e.hideShareMenu()},onShow:function(){var n=e.getStorageSync("user_token");n?this.getType():this.toLink("/pagesB/user/bindUser?to=index")},methods:{getType:function(){var n=this;e.showLoading({title:"加载中"}),this.$http({aurl:"applyCheck",success:function(e){n.type=e.data.result.apply_status,e.data.result.fail_reason&&(n.reason=e.data.result.fail_reason)},fail:function(e){console.log(e)},complete:function(t){e.hideLoading(),n.show=!0}})},showInfo:function(){}},mounted:function(){}};n.default=c}).call(this,t("543d")["default"])},"77b5":function(e,n,t){"use strict";t.r(n);var o=t("207e"),a=t("5395");for(var r in a)"default"!==r&&function(e){t.d(n,e,(function(){return a[e]}))}(r);var u,i=t("f0c5"),c=Object(i["a"])(a["default"],o["b"],o["c"],!1,null,"114281c6",null,!1,o["a"],u);n["default"]=c.exports}},[["05da","common/runtime","common/vendor"]]]);