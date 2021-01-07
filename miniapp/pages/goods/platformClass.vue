<template>
  <view class="container">
    <!--<view class="em-searchbox">-->
    <!--<view class="em-search-input" @tap="search">-->
    <!--&lt;!&ndash; #ifdef APP-PLUS || MP &ndash;&gt;-->
    <!--<icon type="search" size="13" color="#999"></icon>-->
    <!--&lt;!&ndash; #endif &ndash;&gt;-->
    <!--<text class="em-search-text">输入关键词搜索</text>-->
    <!--</view>-->
    <!--</view>-->
    <view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px', paddingRight: myRight + 'px' }">
      <view class="index-header">
        <text class="my-text">分类</text>
        <input class="ser-input" type="text" value="输入关键字搜索" disabled @tap="search" />
      </view>
    </view>
    <view class="content-box" :style="{paddingBottom:toolHeight + 'px'}">
      <scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{height: height + 'px', top: myHeight + 'px' }">
        <view
            v-for="(item, index) in categoryData"
            :key="index"
            class="tab-bar-item"
            :class="[currentTab == index ? 'active' : '']"
            @tap.stop="swichNav(item,index)"
        >
          <text class="text-ellipsis">{{ item.label }}</text>
        </view>
      </scroll-view>
      <view class="bc-fff right-box" :style="{ height: height + 'px', top: myHeight + 'px' }">
        <block v-for="(item, index) in categoryData" :key="index">
          <scroll-view scroll-x scroll-with-animation v-if="item.children && item.children.length && currentTab == index" class="item-tab-view" :style="{ top: myHeight + 'px' }">
            <block v-for="(twoItem, twoIndex) in item.children" :key="twoIndex">
              <view
                class="class-item-tab"
                :class="[currentItemTab == lv2.value ? 'item-tab-active' : '']"
                v-for="(lv2,lv2Index) in twoItem.children"
                :key="lv2.value"
                @tap.stop="itemTabClick(lv2.value,lv2.value)"
              >
                {{ lv2.label }}
              </view>
            </block>
          </scroll-view>
          <scroll-view v-if="currentTab == index" scroll-y @scrolltolower="onMainBottom" class="right-box" :style="{ height: height + 'px', top: myHeight + 'px' }">
            <!--内容部分 start 自定义可删除-->
            <view class="page-view" :style="{paddingTop: currentTab == 0 ? '0' : '80rpx'}">
              <view class="class-box">
                <view class="goods-box" v-if="goodsLists.length">
                  <view class="ticket-item" v-for="(goods_item,goods_index) in goodsLists" :key="goods_index" @tap.stop="toGoodsDetail(goods_item.id)">
                    <view class="goods-item fxBox1 pt-md pb-md">
                      <view class="goods-image mr-md">
                        <image src="/static/images/500x500.jpg" mode="widthFix" v-if="!showArr[goods_index] && showImg"></image>
                        <image lazy-load v-show="showArr[goods_index]" @load="loadImg(goods_item,goods_index)" :src="goods_item.goods_image" mode="widthFix"></image>
                      </view>
                      <view class="goods-info fx1 pt-xs pb-xs">
                        <view>
                          <view class="line2-p text-13 fw700">{{goods_item.goods_name}}</view>
                          <view class="mt-xs col-666 text-sm">
                            配送方式：{{pickType(goods_item.pick_type)}}
                          </view>
                        </view>
                        <view class="fxBox2 pr-md">
                          <text class="price-box text-13 col-red">￥{{goods_item.goods_price}}</text>
                          <text @tap.stop="addCart(goods_item)" class="iconfont icon-add1 text-l text-white"></text>
                        </view>
                      </view>
                    </view>
                  </view>
                  <uni-load-more :status="loadStatus"></uni-load-more>
                </view>
                <view v-if="!item.children && !item.children.length && currentTab!=0 || !goodsLists.length" class="text-center col-666" style="padding-top:100px">
                 <view>
                   <text class="iconfont icon-emoji" style="font-size: 60px;"></text>
                 </view>
                  <view>
                    持续上新中~
                  </view>
                </view>
              </view>
            </view>
            <!--内容部分 end 自定义可删除-->
          </scroll-view>
        </block>
      </view>
    </view>
    <view class="tool-box fxBox2 pl-md">
      <view class="fxBox1" @click.stop="cartShow = !cartShow">
        <text class="iconfont icon-cartfill text-xl"></text>
        <view class="text-md ml-sm">合计：<text class="col-red text-bold text-l">￥{{totalPrice}}</text></view>
      </view>
      <button :disabled="!cartGoodsNum" class="submit-btn" :style="{height: toolHeight + 'px',lineHeight: toolHeight + 'px'}" @click="submit">
        <text>结算({{cartGoodsNum}})</text>
      </button>
    </view>
    <tui-bottom-popup class="cart-box" :show="cartShow" :zIndex="1100" :bottom="98" @close="cartHidePopup">
      <view class="cart-box-title pl-md text-sm">已选商品（{{goods.length}}）</view>
      <scroll-view scroll-y class="cart-box-scroll" v-if="goods.length">
        <!-- <block v-for="(item,index) in lists" :key="index"> -->
          <view class="cart-goods-item fxBox2 m-md p-md" v-for="(cartGoods_item,cartGoods_index) in goods" :key="cartGoods_item.id">
            <view class="cart-goods-image mr-md">
              <image lazy-load :src="cartGoods_item.goods_image" mode="widthFix"></image>
            </view>
            <view class="fx1 cart-goods-info">
              <view class="goods-title text-13 fw700">{{cartGoods_item.goods_name}}</view>
              <view v-if="cartGoods_item.sku_info" class="col-666 mt-md text-sm">{{cartGoods_item.sku_info.sku_info}}</view>
              <view class="text-13 col-red mt-md">￥{{cartGoods_item.goods_price}}</view>
            </view>
            <van-stepper :min="0" :data-id="cartGoods_item.id" @change="numChange" input-class="col000" button-size="20px" integer async-change disable-input :value="cartGoods_item.quantity"/>
          </view>
        <!-- </block> -->
      </scroll-view>
      <view v-else class="cart">
        <view class="cart-icon">
          <image src="/static/icon/empty-cart.png"></image>
          <text class="text-md text-light" style="display: block;">去添加点什么吧</text>
        </view>
      </view>
    </tui-bottom-popup>
    <tab-bar ref="tabbar" class="tab-bar-fixs" :actives='1'></tab-bar>
  </view>
</template>

<script>
  import global from '../../mixins/global.js';
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import selectSku from '../../components/selectSku/selectSku.vue';
  import tuiBottomPopup from '../../components/bottom-popup/bottom-popup';
  import tuiNumberbox from '../../components/numberbox/numberbox';
  import tabBar from '../../components/tabbar/tabbar.vue';
  export default {
    mixins: [global],
    components: {
    	uniLoadMore,
      selectSku,
      tuiBottomPopup,
      tuiNumberbox,
      tabBar
    },
    computed: {
        pickType(){
          return function(params){
            const arr = params.concat([]);
            for(let i=0;i<arr.length;i++){
              if(arr[i]==='0'){
                arr[i] = '快递'
              }else if(arr[i]==='1'){
                arr[i] = '自提'
              }else if(arr[i]==='2'){
                arr[i] = '配送到家'
              }
            }
            return arr.toString()
          }
        },
        toolHeight() {
          return uni.upx2px(98);
        },
        cartGoodsNum() {
          return this.goods.length
        },
        totalPrice() {
          let total = this.goods.reduce(
            (total, item) => {
              return total + (item.goods_price * 100 * item.quantity)
            }, 0);
          return (total / 100).toFixed(2)
        },
    },
    data() {
      return {
        categoryData: [],
        height: 0, //scroll-view高度
        currentTab: 0, //预设当前项的值
        scrollTop: 0 ,//tab标题的滚动条位置
        isVx:false,
        tel:'',
        currentItemTab: 0,
        listParam: {},
        pullUpOn: true,
        goodsLists:[],
        showArr: [],
        showImg:true,
        // sku组件相关
        popupShow: false,
        itemDetail: {},
        isSubmit: true,
        cartShow: false,
        numberValue: 1,
        lists: [],
        addFlag:false,
        goods: [],
        loading:true,
      };
    },
    onHide() {
      this.popupShow = false;
      this.cartShow = false
    },
    onShow(){
      let tempToken = uni.getStorageSync('user_token');
      this.getCartNum();
      if(tempToken){
        this.getLists();
      }else{
        uni.redirectTo({
          url: '/pagesB/user/bindUser?to=class',
        });
      }
    },
    onLoad(options) {
      uni.hideShareMenu();
      this.getShopTel();
      // #ifdef MP-WEIXIN
      this.isVx = true
      // #endif
      uni.getSystemInfo({
        success: res => {
          let header = 92;
          // #ifdef H5
          header = 0;
          // #endif
          this.height = res.windowHeight - uni.upx2px(header) - this.toolHeight;
        }
      });
    },
    mounted() {
      const params = {
        gm_id:uni.getStorageSync('gmToken')
      };
      this.$http({
        aurl: 'getCategory',
        params,
        success: res => {
          // console.log(res);
          let dataArr = res.data.result;
          if (dataArr.length > 0) {
            const obj = {
              class_level: 1,
              label: "全部",
              parent_id: 0,
              type_id: 0,
              type_name: "0",
              value: "all",
            };
            dataArr.unshift(obj);
            this.categoryData = dataArr;
            this.getGoodsList(true)
            // console.log(this.categoryData);
          }
        },
        fail: err => {
          uni.showToast({
            title:'请求超时，请稍后再重试',
            icon:'none'
          })
        }
      });
    },
    methods: {
      getCartNum() {
        if(this.$refs.tabbar){
          this.$refs.tabbar.initCartNumber()
        }
      },
      onDelete(delData) {
        this.$http({
          aurl:'cartDelete',
          data:{
            cart_id: delData
          },
          success:res => {
            uni.showToast({
              icon: 'none',
              title: "删除成功"
            });
            this.deleteWap(delData[0]);
            this.getCartNum()
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      deleteWap(delID) {
        // 删除购物车对应数据
        this.goods.forEach((goods_item,i)=>{
          if(goods_item.id === delID){
            this.goods.splice(i, 1)
          }
        })
      },
      numChange(item){
        console.log(item);
        const data = {
          cart_id:item.currentTarget.dataset.id,
          quantity:item.detail
        };
        if(item.detail === 0) {
          // 等于0询问是否删除该商品
          uni.showModal({
            title: '提示',
            content: '是否删除该购物车商品？',
            success: (res)=> {
              if (res.confirm) {
                this.onDelete([data.cart_id]);
                this.getCartNum();
              }
            }
          });
          return
        }
        if(item.detail===''){
          return
        }
        this.goods.forEach((goods_item)=>{
          if(goods_item.id === data.cart_id){
            goods_item.quantity = item.detail
          }
        })
        
        // console.log(this.goods);
        this.$http({
          aurl:'cartNumUpdate',
          data:data,
          success:res => {
            this.getCartNum()
            // this.getActList()
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      init(){
        this.goods = []
        this.lists = []
        this.loading = true
      },
      getLists(){
        // uni.showLoading({
        //   title: '加载中'
        // });
        const params = {
          gm_id:uni.getStorageSync('gmToken')
        };
        this.$http({
          aurl:'cartLists',
          data:params,
          success:res => {
            this.init();
            for(let i = 0;i<res.data.result.lists.length;i++){
               const item = res.data.result.lists[i]
              for(let j = item.goods_lists.length-1;j>=0;j--){
                 if(item.goods_lists[j].goods_info.goods_state===0||item.goods_lists[j].unusual){
                   item.goods_lists.splice(j,1)
                 }
              }
              if(item.goods_lists.length>0){
                this.lists.push(item)
              }
            }
            this.initData()
            // uni.hideLoading()
            // this.loading=false
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      initData() {
        this.goods = [];
        this.lists.forEach((item, index) => {
          item.goods_lists.forEach((goods_item) => {
            if (goods_item.is_checked === 1) {
              this.goods.push(goods_item)
            }
          })
        });
      },
      cartHidePopup() {
        this.cartShow = false
      },
      submit() {
        uni.removeStorageSync('type');
        this.needTokenLink('/pagesA/checkout/index')
      },
      addCart(itemDetail) {
        let tempToken = uni.getStorageSync('user_token');
        if (!tempToken) {
          uni.navigateTo({
            url: '/pagesA/user/bindUser',
          });
          return false
        }
        if(this.addFlag){
          return false
        }
        this.addFlag = true;
        let data = {
          quantity: 1,
          type: 'cart',
          sku_id: itemDetail.sku.id,
          is_checked: 1
        };
        this.$http({
          aurl: 'addCart',
          data: data,
          success: res => {
            uni.showToast({
              title: '加入购物车成功'
            });
            this.getCartNum();
            this.getLists()
          },
          fail: error => {
            uni.showToast({
              title: error.message.msg,
              icon: 'none'
            });
          },
          complete:res=>{
            this.addFlag = false
          }
        });
      },
      loadImg(item,index) {
        this.showImg = false;
        if(item.goods_image){
          this.$set(this.showArr, index, true);
        }
        this.showImg = true
      },
      onMainBottom() {
        if (!this.pullUpOn) return;
        this.loadding = true;
        this.loadStatus = 'loading';
        if (this.listParam.page === this.listParam.lastPage) {
        	this.loadding = false;
        	this.pullUpOn = false;
        	this.loadStatus = 'noMore';
        } else {
        	this.listParam.page++;
        	setTimeout(() => {
        		this.getGoodsList();
        		this.loadding = false;
        		this.loadStatus = 'more';
        	}, 300);
        }
      },
      getGoodsList(init) {
        uni.showLoading({
          title: '加载中'
        });
        this.loadding = true;
      	if (init) {
      		this.listParam.page = 1;
      		this.goodsLists = [];
      		this.pullUpOn = true;
      	}
      	this.listParam.gm_id = uni.getStorageSync('gmToken');
      	this.$http({
      		aurl: 'getCateList',
      		data: this.listParam,
      		success: res => {
      			if (init) {
      				this.listParam.lastPage = res.data.result.last_page;
      				if (this.listParam.lastPage === 1) {
      					this.loadding = false;
      					this.pullUpOn = false;
      					this.loadStatus = 'noMore';
      				}
      			}
      			res.data.result.data.forEach(item => {
      				this.goodsLists.push(item);
      			});
      		},
      		fail: err => {
      			console.log(err);
      		},
          complete:res=>{
            uni.hideLoading()
            this.loadding = false;
          }
      	});
      },
      getShopTel() {
        this.$http({
          aurl: 'getShopTel',
          success: res => {
            if (res.data.code === 0) {
              if (res.data.result.mobile) {
                this.tel = res.data.result.mobile;
              }
            }
          },
          fail: err => {
            console.log(err);
          }
        });
      },
      callUp() {
        if (!this.tel) {
          this.showAlert('暂未设置客服电话');
          return;
        }
        uni.makePhoneCall({
          phoneNumber: String(this.tel)
        });
      },
      // 点击标题切换当前页时改变样式
      swichNav(barItem,cur) {
        if (this.currentTab == cur || this.loadding == true) {
          return false;
        } else {
          this.currentTab = cur;
          this.checkCor();
          if(cur == 0) {
            this.listParam.gc_id = ''
            this.getGoodsList(true)
          } else if (barItem.children && barItem.children.length) {
            //有二级分类时重置二级分类下标为0并获取商品
            if(barItem.children[0].children && barItem.children[0].children.length) {
              this.itemTabClick(barItem.children[0].children[0].value,barItem.children[0].children[0].value,false)
            } else {
              this.goodsLists = [];
            }
          } else {
            this.goodsLists = [];
          }
        }
      },
      itemTabClick(tabVal,pcId,init=true) {
        if (this.currentItemTab == tabVal && init || this.loadding == true) {
          return false;
        } else {
          this.currentItemTab = tabVal;
          this.listParam.gc_id = pcId
          this.getGoodsList(true)
          // this.checkCor();
        }
      },
      //判断当前滚动超过一屏时，设置tab标题滚动条。
      checkCor() {
        let that = this;
        //这里计算按照实际情况进行修改，动态数据要进行动态分析
        //思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
        //数据很多可以多次if判断然后进行滚动距离计算即可
        if (that.currentTab > 7) {
          that.scrollTop = 500;
        } else {
          that.scrollTop = 0;
        }
      },
      search() {
        uni.navigateTo({
          url: '/pagesA/goods/search'
        });
      }
    }
  };
</script>

<style scoped lang="stylus">
  @import '../../variable.styl'
  .col000
    color #000 !important
  .kefuBtn
    image
      z-index 99!important
      bottom 100rpx!important
  .cart
    top: 0rpx;
    left: 0;
    bottom: 0;
    z-index: 0;
    width: 100%;
    height 600rpx
    background-color: #f9f9f9;
    text-align: center;
  
    .cart-icon
      position: absolute;
      top: -100rpx;
      right: 0;
      bottom: 0;
      left: 0;
      height: 260rpx;
      margin: auto;
      image
        width: 200rpx;
        height: 200rpx;
  .cart-box
    .cart-box-title
      width 100%
      height 64rpx
      line-height 64rpx
      background #F2F3F4
      color #999999
      box-sizing border-box
    .cart-box-scroll
      height 600rpx
      font-size 26rpx
      background #f9f9f9
      box-sizing border-box
      .cart-goods-item
        height 118rpx
        background #fff
        // border-top 1rpx solid #f2f2f2
        .cart-goods-image
          width 118rpx
          height 118rpx
          overflow hidden
          image
            width 100%
            height 100%
        .cart-goods-info
          display flex
          flex-direction column
          justify-content space-between
          box-sizing border-box
          .goods-title
            width 330rpx
            overflow hidden
            text-overflow ellipsis
            white-space nowrap
        >>> .van-stepper__input--disabled
          color #000 !important
  .tool-box
    position fixed
    bottom 88rpx
    width 100%
    z-index: 100;
    background #fff
    border-top 1rpx solid #f2f2f2
    box-sizing border-box
    .submit-btn
        width 180rpx
        margin 0
        background #e64340
        color #fff
        text-align center
        border-radius 0
    .iconfont
      color #FF4A41
  .image-b
    vertical-align: bottom
  page
    background #fcfcfc
  /* 左侧导航布局 start */
  /* 隐藏scroll-view滚动条 */
  ::-webkit-scrollbar
    width 0
    height 0
    color transparent
  .em-searchbox
    width 100%
    height 92rpx
    padding 0 30rpx
    box-sizing border-box
    background #fff
    display flex
    align-items center
    justify-content center
    position fixed
    left 0
    top 0
    z-index 100
  .em-searchbox::after
    content ''
    position absolute
    border-bottom 1rpx solid #d2d2d2
    -webkit-transform scaleY(0.5)
    transform scaleY(0.5)
    bottom 0
    right 0
    left 0
  .em-search-input
    width 100%
    height 60rpx
    background #f1f1f1
    border-radius 30rpx
    font-size 26rpx
    color #999
    display flex
    align-items center
    justify-content center
  .em-search-text
    padding-left 16rpx
  .tab-view
    /* height: 100%; */
    width 180rpx
    position fixed
    left 0
    top 125rpx
    z-index 10
    background $page-color-base
    .tab-bar-item
      width 100%
      height 80rpx
      background #f6f6f6
      box-sizing border-box
      display flex
      align-items center
      justify-content center
      font-size 26rpx
      color #444
      font-weight 400
      &:last-child
        margin-bottom 80rpx
      .text-ellipsis
        padding 0 10rpx
        font-size $font-base
    .active
      position relative
      color $theme-red
      font-weight 600
      background #fff
    .active::before
      content ''
      position absolute
      border-left 8rpx solid $theme-red
      height 70%
      left 0
      
  /* 左侧导航布局 end */
  .right-box
    width 100%
    position fixed
    padding-left 180rpx
    box-sizing border-box
    left 0
    top 125rpx
  .page-view
    width 100%
    overflow hidden
    box-sizing border-box
    padding-bottom env(safe-area-inset-bottom)
  .swiper
    width 100%
    height 220rpx
    border-radius 12rpx
    overflow hidden
    transform translateZ(0)
  .swiper .wx-swiper-dot
    width 8rpx
    height 8rpx
    display inline-flex
    background none
    justify-content space-between
  .swiper .wx-swiper-dot::before
    content ''
    flex-grow 1
    background rgba(255, 255, 255, 0.8)
    border-radius 16rpx
    overflow hidden
  .swiper .wx-swiper-dot-active::before
    background #fff
  .swiper .wx-swiper-dot.wx-swiper-dot-active
    width 16rpx
  .slide-image
    width 100%
    height 220rpx
  .class-box
    background #fff
    width 100%
    box-sizing border-box
    padding 0 10rpx
    margin-bottom 20rpx
    border-radius 12rpx
  .class-name
    font-size 22rpx
  .g-container
    /* padding-top: 20rpx; */
    display flex
    display -webkit-flex
    justify-content flex-start
    flex-direction row
    flex-wrap wrap
    .notice-title
      font-size 22rpx
      margin-top 20rpx
      text-align center
  .g-box
    width 31%
    text-align center
    margin-top 20rpx
    margin-right 3.5%
    &:nth-child(3n){
      margin-right 0
    }
    .img-box
      border-radius 12rpx
      margin-bottom 10rpx
  .g-image
    display block
    width 100%
    height 171rpx
  .g-title
    font-size 24rpx
    color #333

  .notice-title
    width 100%
    height 35rpx
    display flex
    justify-content center
    align-items center
    font-size 28rpx
    color #999
  .item-tab-view
    width 570rpx !important
    position fixed
    height 80rpx
    line-height 80rpx
    border-bottom 1rpx solid #e7e7e7
    z-index 2
    background #fff
    white-space nowrap
    overflow hidden
    .class-item-tab
      color #999
      display inline-block
      padding 0 20rpx
      font-weight 600
      box-sizing border-box
    .item-tab-active
      color $theme-red
      font-weight 600
  .goods-box
    // padding-top 80rpx
    .ticket-item
      position relative
      background #fff
      .goods-item
        height 186rpx
        .goods-image
          width 186rpx
          height 186rpx
          image
            width 100%
            height 100%
        .goods-info
          height 186rpx
          display flex
          flex-direction column
          justify-content space-between
          box-sizing border-box
          .price-box
            display flex
            justify-content space-between
            align-items flex-end
          .iconfont
            width 44rpx
            height 44rpx
            background #FF4A41
            border-radius 50%
            line-height 44rpx
            text-align center
</style>
