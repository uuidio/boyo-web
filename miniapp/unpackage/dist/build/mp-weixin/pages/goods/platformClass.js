(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goods/platformClass"],{"303a":function(t,o,i){"use strict";(function(t){Object.defineProperty(o,"__esModule",{value:!0}),o.default=void 0;var n=e(i("ed4a"));function e(t){return t&&t.__esModule?t:{default:t}}var a=function(){i.e("node-modules/_@dcloudio_uni-ui@1.2.5@@dcloudio/uni-ui/lib/uni-load-more/uni-load-more").then(function(){return resolve(i("fdd7"))}.bind(null,i)).catch(i.oe)},s=function(){i.e("components/selectSku/selectSku").then(function(){return resolve(i("6218f"))}.bind(null,i)).catch(i.oe)},r=function(){i.e("components/bottom-popup/bottom-popup").then(function(){return resolve(i("b022"))}.bind(null,i)).catch(i.oe)},u=function(){i.e("components/numberbox/numberbox").then(function(){return resolve(i("5a8b"))}.bind(null,i)).catch(i.oe)},c=function(){i.e("components/tabbar/tabbar").then(function(){return resolve(i("bc99"))}.bind(null,i)).catch(i.oe)},l={mixins:[n.default],components:{uniLoadMore:a,selectSku:s,tuiBottomPopup:r,tuiNumberbox:u,tabBar:c},computed:{pickType:function(){return function(t){for(var o=t.concat([]),i=0;i<o.length;i++)"0"===o[i]?o[i]="快递":"1"===o[i]?o[i]="自提":"2"===o[i]&&(o[i]="配送到家");return o.toString()}},toolHeight:function(){return t.upx2px(98)},cartGoodsNum:function(){return this.goods.length},totalPrice:function(){var t=this.goods.reduce((function(t,o){return t+100*o.goods_price*o.quantity}),0);return(t/100).toFixed(2)}},data:function(){return{categoryData:[],height:0,currentTab:0,scrollTop:0,isVx:!1,tel:"",currentItemTab:0,listParam:{},pullUpOn:!0,goodsLists:[],showArr:[],showImg:!0,popupShow:!1,itemDetail:{},isSubmit:!0,cartShow:!1,numberValue:1,lists:[],addFlag:!1,goods:[],loading:!0}},onHide:function(){this.popupShow=!1,this.cartShow=!1},onShow:function(){var o=t.getStorageSync("user_token");this.getCartNum(),o?this.getLists():t.redirectTo({url:"/pagesB/user/bindUser?to=class"})},onLoad:function(o){var i=this;t.hideShareMenu(),this.getShopTel(),this.isVx=!0,t.getSystemInfo({success:function(o){var n=92;i.height=o.windowHeight-t.upx2px(n)-i.toolHeight}})},mounted:function(){var o=this,i={gm_id:t.getStorageSync("gmToken")};this.$http({aurl:"getCategory",params:i,success:function(t){var i=t.data.result;if(i.length>0){var n={class_level:1,label:"全部",parent_id:0,type_id:0,type_name:"0",value:"all"};i.unshift(n),o.categoryData=i,o.getGoodsList(!0)}},fail:function(o){t.showToast({title:"请求超时，请稍后再重试",icon:"none"})}})},methods:{getCartNum:function(){this.$refs.tabbar&&this.$refs.tabbar.initCartNumber()},onDelete:function(o){var i=this;this.$http({aurl:"cartDelete",data:{cart_id:o},success:function(n){t.showToast({icon:"none",title:"删除成功"}),i.deleteWap(o[0]),i.getCartNum()},fail:function(t){console.log(t)}})},deleteWap:function(t){var o=this;this.goods.forEach((function(i,n){i.id===t&&o.goods.splice(n,1)}))},numChange:function(o){var i=this;console.log(o);var n={cart_id:o.currentTarget.dataset.id,quantity:o.detail};0!==o.detail?""!==o.detail&&(this.goods.forEach((function(t){t.id===n.cart_id&&(t.quantity=o.detail)})),this.$http({aurl:"cartNumUpdate",data:n,success:function(t){i.getCartNum()},fail:function(t){console.log(t)}})):t.showModal({title:"提示",content:"是否删除该购物车商品？",success:function(t){t.confirm&&(i.onDelete([n.cart_id]),i.getCartNum())}})},init:function(){this.goods=[],this.lists=[],this.loading=!0},getLists:function(){var o=this,i={gm_id:t.getStorageSync("gmToken")};this.$http({aurl:"cartLists",data:i,success:function(t){o.init();for(var i=0;i<t.data.result.lists.length;i++){for(var n=t.data.result.lists[i],e=n.goods_lists.length-1;e>=0;e--)(0===n.goods_lists[e].goods_info.goods_state||n.goods_lists[e].unusual)&&n.goods_lists.splice(e,1);n.goods_lists.length>0&&o.lists.push(n)}o.initData()},fail:function(t){console.log(t)}})},initData:function(){var t=this;this.goods=[],this.lists.forEach((function(o,i){o.goods_lists.forEach((function(o){1===o.is_checked&&t.goods.push(o)}))}))},cartHidePopup:function(){this.cartShow=!1},submit:function(){t.removeStorageSync("type"),this.needTokenLink("/pagesA/checkout/index")},addCart:function(o){var i=this,n=t.getStorageSync("user_token");if(!n)return t.navigateTo({url:"/pagesA/user/bindUser"}),!1;if(this.addFlag)return!1;this.addFlag=!0;var e={quantity:1,type:"cart",sku_id:o.sku.id,is_checked:1};this.$http({aurl:"addCart",data:e,success:function(o){t.showToast({title:"加入购物车成功"}),i.getCartNum(),i.getLists()},fail:function(o){t.showToast({title:o.message.msg,icon:"none"})},complete:function(t){i.addFlag=!1}})},loadImg:function(t,o){this.showImg=!1,t.goods_image&&this.$set(this.showArr,o,!0),this.showImg=!0},onMainBottom:function(){var t=this;this.pullUpOn&&(this.loadding=!0,this.loadStatus="loading",this.listParam.page===this.listParam.lastPage?(this.loadding=!1,this.pullUpOn=!1,this.loadStatus="noMore"):(this.listParam.page++,setTimeout((function(){t.getGoodsList(),t.loadding=!1,t.loadStatus="more"}),300)))},getGoodsList:function(o){var i=this;t.showLoading({title:"加载中"}),this.loadding=!0,o&&(this.listParam.page=1,this.goodsLists=[],this.pullUpOn=!0),this.listParam.gm_id=t.getStorageSync("gmToken"),this.$http({aurl:"getCateList",data:this.listParam,success:function(t){o&&(i.listParam.lastPage=t.data.result.last_page,1===i.listParam.lastPage&&(i.loadding=!1,i.pullUpOn=!1,i.loadStatus="noMore")),t.data.result.data.forEach((function(t){i.goodsLists.push(t)}))},fail:function(t){console.log(t)},complete:function(o){t.hideLoading(),i.loadding=!1}})},getShopTel:function(){var t=this;this.$http({aurl:"getShopTel",success:function(o){0===o.data.code&&o.data.result.mobile&&(t.tel=o.data.result.mobile)},fail:function(t){console.log(t)}})},callUp:function(){this.tel?t.makePhoneCall({phoneNumber:String(this.tel)}):this.showAlert("暂未设置客服电话")},swichNav:function(t,o){if(this.currentTab==o||1==this.loadding)return!1;this.currentTab=o,this.checkCor(),0==o?(this.listParam.gc_id="",this.getGoodsList(!0)):t.children&&t.children.length&&t.children[0].children&&t.children[0].children.length?this.itemTabClick(t.children[0].children[0].value,t.children[0].children[0].value,!1):this.goodsLists=[]},itemTabClick:function(t,o){var i=!(arguments.length>2&&void 0!==arguments[2])||arguments[2];if(this.currentItemTab==t&&i||1==this.loadding)return!1;this.currentItemTab=t,this.listParam.gc_id=o,this.getGoodsList(!0)},checkCor:function(){var t=this;t.currentTab>7?t.scrollTop=500:t.scrollTop=0},search:function(){t.navigateTo({url:"/pagesA/goods/search"})}}};o.default=l}).call(this,i("543d")["default"])},"7b34":function(t,o,i){"use strict";var n,e=function(){var t=this,o=t.$createElement,i=(t._self._c,t.__map(t.categoryData,(function(o,i){var n=t.__map(t.goodsLists,(function(o,i){var n=t.pickType(o.pick_type);return{$orig:t.__get_orig(o),m0:n}}));return{$orig:t.__get_orig(o),l0:n}})));t._isMounted||(t.e0=function(o){o.stopPropagation(),t.cartShow=!t.cartShow}),t.$mp.data=Object.assign({},{$root:{l1:i}})},a=[];i.d(o,"b",(function(){return e})),i.d(o,"c",(function(){return a})),i.d(o,"a",(function(){return n}))},"9aed":function(t,o,i){},c611:function(t,o,i){"use strict";var n=i("9aed"),e=i.n(n);e.a},c8de:function(t,o,i){"use strict";(function(t){i("cf0c");n(i("66fd"));var o=n(i("fcb8"));function n(t){return t&&t.__esModule?t:{default:t}}t(o.default)}).call(this,i("543d")["createPage"])},fa05:function(t,o,i){"use strict";i.r(o);var n=i("303a"),e=i.n(n);for(var a in n)"default"!==a&&function(t){i.d(o,t,(function(){return n[t]}))}(a);o["default"]=e.a},fcb8:function(t,o,i){"use strict";i.r(o);var n=i("7b34"),e=i("fa05");for(var a in e)"default"!==a&&function(t){i.d(o,t,(function(){return e[t]}))}(a);i("c611");var s,r=i("f0c5"),u=Object(r["a"])(e["default"],n["b"],n["c"],!1,null,"51a8e7c9",null,!1,n["a"],s);o["default"]=u.exports}},[["c8de","common/runtime","common/vendor"]]]);