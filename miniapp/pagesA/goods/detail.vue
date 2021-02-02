<template>
  <view class="detail-box" v-if="JSON.stringify(detail) != '{}'">
    <!--header-->
    <view>
      <toHome :needPaddingTop="false"></toHome>
    </view>
    <!--header-->
    <!--banner-->
    <view class="banner-swiper">
      <swiper :autoplay="true" :interval="5000" :circular="true" :style="{ height: scrollH + 'px' }"
              @change="bannerChange">
        <block v-for="(item, index) in detail.image_list" :key="index">
          <swiper-item :data-index="index">
            <image :src="item.image_url" class="slide-image" :style="{ height: scrollH + 'px' }"></image>
          </swiper-item>
        </block>
      </swiper>
      <!--<text class="tips">{{bannerIndex+1}}/{{detail.image_list.length}}</text>-->
      <view class="seckill-box" v-if="isSeckill || isGroup">
        <view class="fxBox1">
          <view class="l fx1">
            <view class="l-box fxBox1">
              <view class="icon">
                <span v-if="isSeckill">
                    秒杀<br>活动
                </span>
                <span v-else>
                    拼团<br>活动
               </span>
              </view>
              <view class="p-box">
                ¥
                <text v-if="isSeckill">{{ detail.sec_kill_info[0].seckill_price }}</text>
                <text v-else>
                  {{ detail.is_group_info[0].group_price }}
                </text>
              </view>
            </view>
          </view>
          <view class="r">
            <text>距结束还剩:</text>
            <view class="t-box">
              <uni-countdown :second="downSecond" @timeup="timeUp"></uni-countdown>
            </view>
          </view>
        </view>
      </view>
    </view>
    <!--banner-->
    <!-- goods info -->
    <view class="goods-info">
      <view class="desc">
        <view class="text-dark p-md">
          <view class="fxBox">
            <view class="fx1">
              <view class="text-lg mb-sm">
                {{ detail.goods_name }}
              </view>
            </view>
            <view v-if="detail.is_rebate==1&&agent==1&&!isIntegral&&detail.shop.promo_person==1">
              <view class="fxBox1 mb-sm money-box col-fff pr-md">
                <view class="imgBox">
                  <image
                      src="https://egoss1.ytholidayplaza.com/images/default/202005/12/fnjQB2zELstf1SX1jK2oA52xDh4mIN3l0sqsGmUA.png"></image>
                </view>
                <view class="ml-md">
                  赚{{isGroup?detail.is_group_info[0].rewards:detail.rewards}}
                </view>
              </view>
              <view class="col-base" v-if="detail.is_rebate==1&&partner_role==2&&!isIntegral&&detail.profit_sharing">
                小店分佣：
                <text class="col-red">￥{{detail.profit_sharing}}</text>
              </view>
            </view>
          </view>
          <view class="text-sm text-light">{{ detail.goods_info }}</view>
          <view class="price-box pt-md">
            <view class="price fxBox" style="align-items:flex-end">
              <view>
                <text v-if="isSeckill" class="text-l">￥{{ detail.sec_kill_info[0].seckill_price }}</text>
                <view v-else class="text-l">
                  <text v-if="isGroup">￥{{ detail.is_group_info[0].group_price }}</text>
                  <text v-else>
                    <block v-if="isIntegral">
                      <text v-if="detail.goods_price == 0">{{ point }}{{detail.point_unit}}</text>
                      <text v-else>￥{{ detail.goods_price }}</text>
                    </block>
                    <block v-else-if="detail.sku.length > 0">
                      ￥{{skuMiniPrice}}
                    </block>
                    <block v-else>
                      ￥{{ detail.goods_price }}
                    </block>
                  </text>
                  <text class="point-txt" v-if="isIntegral && detail.goods_price>0">+{{ point }}{{detail.point_unit}}
                  </text>
                </view>
              </view>
              <view class="text-sm ml-md mb-xs" v-if="detail.show_promotion_price =='1' && !isIntegral">
                市场价
                <text v-if="isGroup">￥{{ detail.is_group_info[0].price }}</text>
                <text v-else>￥{{ detail.goods_marketprice }}</text>
              </view>
            </view>
          </view>
          <view class="fxBox2 text-sm mt-xs mb-xs col-999" v-if="isIntegral">
            <view class="ml-5">
              市场价：￥{{ detail.goods_marketprice }}
            </view>
            <view>
              <text>已兑换</text>
              <text class="ml-5">{{detail.point_goods_info.exchange}}</text>
            </view>
          </view>
          <view class="mt-xs col-666 text-sm" v-if="detail.pick_type">
            配送方式：{{pickType(detail.pick_type)}}
          </view>
        </view>
      </view>

      <view class="activity-date-box bc-fff mt-md" v-if="isIntegral">
        <text class="text-base text-bold">活动时间：</text>
        <text class="text-base col-999">{{detail.point_goods_info.active_start}} ~
          {{detail.point_goods_info.active_end}}
        </text>
      </view>

      <view class="p-md bc-fff mt-md" v-if="isGroup">
        <view class="group-count pb-md">已有{{ groupsNum }}人正在拼团，可直接参与</view>
        <scroll-view scroll-y="true" class="fxBox group-swiper w100" v-if="groups.length > 0">
          <view v-for="(item, index) in groups" :key="index" class="group-item">
            <view class="imgs">
              <view class="group-img" v-for="(user, imgIndex) in item.group_users" :key="imgIndex">
                <image :src="user.wechat_head_img"></image>
              </view>
              <view class="group-icon">
                <image src="../../static/images/adduser.png"></image>
              </view>
            </view>
            <view class="group-info fxBox1">
              <view>
                <view class="text-md">
                  {{ item.group_number }}人拼,还差
                  <text class="col-red">{{ item.group_number - item.group_count }}人</text>
                  成团
                </view>
                <view class="col-666 text-sm fxBox1">
                  剩余
                  <uni-countdown :second="getTime(item.end_time)"></uni-countdown>
                </view>
              </view>
              <view
                  class="group-btn"
                  @tap="
									toQueryLink('/pagesB/activity/groupDetail', {
										groups_bn: item.groups_bn
									})
								"
              >
                去参团
              </view>
            </view>
          </view>
        </scroll-view>
        <view v-else class="text-center col-666">暂时没有可参加团购</view>
      </view>
      <!-- goods discount info -->
      <view class="discount text-dark mt-md">
        <view class="em-list-cell promotion" v-if="detail.activity && detail.activity.length !== 0">
          <view class="em-cell-title text-base text-bold">促销</view>
          <view class="">
            <view v-for="(item, index) in detail.activity" :key="index" class="items">
              <text class="activityGoods text-md mr-xs mb-xs">{{ item.type === 1 ? '满减' : '满折' }}</text>
              <text>{{ item.name }}</text>
            </view>
          </view>
        </view>
      </view>
      <view class="discount coupon-wrap text-dark mt-md" v-if="!isIntegral">
        <view class="em-list-cell">
          <view class="em-cell-title text-base text-bold">领券</view>
          <view class="coupon-cell" style="flex:1;padding-right: 66rpx;
" v-if="coupon_list.length > 0" @tap="showCouponPopup = true">
            <view class="tag-coupon-box sm">
              <tag-coupon class="tag-coupon" :type="item.shop_id" v-for="(item, index) in coupon_list" :key="index"
                          v-if="index < 3" size="sm mr-lg">
                <text v-if="item.type === 1">满{{ Number(item.origin_condition) }}减{{ Number(item.denominations) }}
                </text>
                <text v-else-if="item.type === 2">满{{ Number(item.origin_condition) }}给予{{ item.discount }}折</text>
              </tag-coupon>
            </view>
            <text class="iconfont icon-more_light em-right text-xl text-dark pt-xs"></text>
          </view>
          <view v-else class="col-666">暂无可领取优惠券</view>
        </view>
      </view>
      <!-- goods base info -->
      <view class="basic-info mt-md text-dark bc-fff">
        <view class="em-list-cell" @tap="showPopup">
          <view class="em-cell-title text-base text-bold">选择规格</view>
          <text class="iconfont icon-more_light em-right text-xl text-dark pt-xs"></text>
        </view>
      </view>
      <!-- goods comment -->
      <view class="comment mt-md pb-sm text-dark" id="comments">
        <view class="em-list-cell em-between">
          <view class="em-cell-title text-bold">评价</view>
          <view
              v-if="rateLists.length !== 0"
              @tap="
								toQueryLink('/pagesA/goods/rate', {
									id: detail.id
								})
							"
              class="fxBox1"
          >
            <text class="text-primary">查看全部</text>
            <text class="iconfont icon-right text-primary"></text>
          </view>
        </view>
        <view class="comment-lists pl-lg pr-lg" v-if="rateLists.length !== 0">
          <view class="comment-user mb-sm">
            <image
                :src="rateLists[0].headimgurl ? rateLists[0].headimgurl : 'https://lanlnk-dev.oss-cn-shenzhen.aliyuncs.com/images/avatar.png'"
                class="comment-avatar"
            ></image>
            <view>{{ rateLists[0].user_name }}</view>
          </view>
          <view class="text-md mb-xs">{{ rateLists[0].content }}</view>
        </view>
        <view v-else class="p-md text-center col-666">该商品暂无评价</view>
        <view class="comment-all m-lg" v-if="rateLists.length !== 0">
          <em-tag
              v-if="rateLists.length !== 0"
              @tap="
								toQueryLink('/pagesA/goods/rate', {
									id: detail.id
								})
							"
              size="md"
              type="dark"
              :circle="true"
              :inverted="true"
              text="查看全部评价"
          ></em-tag>
        </view>
      </view>
      <!-- goods detail -->
      <view class="notice-title">———— 商品详情 ————</view>
      <view class="detail">
        <view class="content">
          <rich-text :nodes="detail.goods_body"></rich-text>
        </view>
      </view>
      <view class="notice-title">———— 已经到最底了 ————</view>
      <view class="tui-safearea-bottom"></view>
    </view>
    <!-- footer bar -->
    <view class="action-bar" style="justify-content: space-between">
      <view class="action-icon fx1" @tap="tapFavorite">
        <text class="iconfont icon-favor_light text-l mb-xs"
              :class="[detail.is_favorite ? 'icon-favor_fill_light' : 'icon-favor_light']"></text>
        <text class="text-sm">收藏</text>
      </view>
      <!--			<view class="action-icon" @tap="toShopDetail(detail.shop.id)">-->
      <!--				<text class="iconfont icon-shop text-l mb-xs"></text>-->
      <!--				<text class="text-sm">店铺</text>-->
      <!--			</view>-->
      <view class="fx1">
        <view class="action-icon" @tap="toCart('/pages/cart/cart')">
          <view class="cart-num" v-if="cartNum !== 0">{{ cartNum }}</view>
          <text class="iconfont icon-cart text-l mb-xs"></text>
          <text class="text-sm">购物车</text>
        </view>
      </view>
      <view v-if="isGroup" class="fxBox1">
        <button class="goods-btn" @click="showPopup(false)">
          ￥{{ detail.spec_list[skuIndex].goods_price }}
          <br/>
          单独购买
        </button>
        <button class="goods-btn rightBtn" @click="showPopup(true)">
          <view>￥{{ detail.group_spec_list[skuIndex].goods_price }}</view>
          <text>拼团购买</text>
        </button>
      </view>
      <view v-else class="fxBox1">
        <button :disabled="isSeckill || isGroup || isIntegral ? true : false" class="goods-btn" @click="showPopup"
                v-if="!isIntegral">加入购物车
        </button>
        <button v-if="!isIntegral && !isSeckill && !isGroup" class="goods-btn rightBtn" @click="showPopup(true)">
          <text>立即购买</text>
        </button>
        <button v-if="isIntegral" :disabled="detail.point_goods_info.active_status !== 1" class="goods-btn rightBtn"
                :class="{w400: isIntegral}" @click="showPopup(true)">
          <text v-if="detail.point_goods_info.active_status === 0">活动未开始</text>
          <text v-else-if="detail.point_goods_info.active_status === 2">活动已结束</text>
          <text v-else>立即兑换</text>
        </button>
      </view>
    </view>

    <!--底部选择层-->
    <tui-bottom-popup :show="popupShow" @close="hidePopup">
      <view class="tui-popup-box">
        <view class="tui-product-box tui-padding">
          <image :src="goodsSkuItem.goods_image" class="tui-popup-img"></image>
          <view class="tui-popup-price">
            <view class="tui-amount tui-bold">
              <block v-if="isIntegral">
                <text v-if="detail.goods_price == 0">{{ point }}{{detail.point_unit}}</text>
                <text v-else>￥{{ detail.goods_price }}+{{ point }}{{detail.point_unit}}</text>
              </block>
              <block v-else>
                ￥{{ goodsSkuItem.goods_price }}
                <text class="pin-logo" v-if="goodsSkuItem.group_activty_id">拼</text>
              </block>
            </view>
            <view class="tui-number col-666">库存:{{ goodsSkuItem.goods_stock }}</view>
          </view>
        </view>
        <scroll-view scroll-y class="tui-popup-scroll" v-if="sku.length !== 0">
          <view class="tui-scrollview-box" v-for="(item, index) in sku" :key="index">
            <view>
              <view class="tui-bold tui-attr-title">{{ item.title }}</view>
              <view class="tui-attr-box">
                <view
                    :key="sonIndex"
                    @click="skuActive(index, sonIndex, itemSon)"
                    :class="{ 'tui-attr-item': true, 'tui-attr-active': item.active === sonIndex ? true : false }"
                    v-for="(itemSon, sonIndex) in item.lists"
                >
                  {{ itemSon }}
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view v-if="showNumber" class="tui-number-box tui-bold tui-attr-title">
          <view class="tui-attr-title">数量</view>
          <tui-numberbox :min="1" :value="value" @change="change"></tui-numberbox>
        </view>

        <view v-if="isGroup">
          <view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
            <button class="leftBtn goods-det-btn" @click="payClick('fastbuy', true)">
              ￥{{ detail.spec_list[skuIndex].goods_price }}
              <br/>
              单独购买
            </button>
            <button class="rightBtn goods-det-btn" @click="payClick('fastbuy')" :disabled="!groupDisbale">
              <view>￥{{ detail.group_spec_list[skuIndex].goods_price }}</view>
              <view>拼团购买</view>
            </button>
          </view>
        </view>
        <view v-else>
          <view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
            <button v-if="!isGroup && !isIntegral" :disabled="isSeckill || isGroup || isIntegral ? true : false"
                    class="leftBtn goods-det-btn" @click="payClick('cart')">
              加入购物车
            </button>
            <button v-if="isGroup" class="leftBtn goods-det-btn" @click="payClick('fastbuy', true)">
              ￥{{ detail.spec_list[skuIndex].goods_price }}
              <br/>
              单独购买
            </button>
            <button class="rightBtn goods-det-btn" @click="payClick('fastbuy')">
              <view v-if="isGroup">￥{{ detail.group_spec_list[skuIndex].goods_price }}</view>
              <view v-if="isGroup">拼团购买</view>
              <text v-else>{{isIntegral ? '立即兑换' : '立即购买'}}</text>
            </button>
          </view>
        </view>

        <view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px"
              @tap="hidePopup"></view>
        <!-- <tui-icon name="close-fill" color="#999" class="tui-icon-close" size="20" @tap="hidePopup"></tui-icon> -->
      </view>
    </tui-bottom-popup>

    <!--优惠券-->
    <van-popup :show="showCouponPopup" position="bottom" class="couponBox">
      <view class="text-center fw700 text-lg title fxBox1">
        <view class="fx1 text-center">优惠券</view>
        <view class="emfont icon-close text-lg" @click="showCouponPopup = false"></view>
      </view>
      <view class="coupon-num">可领取优惠券</view>
      <view class="coupon-box">
        <view class="mb-md" v-for="(item, index) in coupon_list" :key="index"

        >
          <view class="bc-fff coupon-info fxBox">
            <view class="left fxBox">
              <view class="imgBox">
                <img src="../../static/images/coupon_orange.png" alt="" v-if="item.shop_id === 0"/>
                <img src="../../static/images/coupon.png" alt="" v-else/>
              </view>
              <view class="coupon-price col-fff">
                <view class="mb-xs">
                  <view v-if="item.type === 1">
                    <text class="text-md">￥</text>
                    <text class="price">{{ Number(item.denominations) }}</text>
                  </view>
                  <view v-else-if="item.type === 2">
                    <text class="price">{{ item.discount }}</text>
                    <text class="text-md">折</text>
                  </view>
                </view>
                <view class="text-xs">满{{ Number(item.origin_condition) }}元可用</view>
              </view>
            </view>
            <view class="right fx1 p-md">
              <view>
                <view class="fw700 text-sm line2-p mb-md" data-line="1">{{ item.name }}</view>
                <view class="text-sm col-666">{{ item.start_at }} ~ {{ item.end_at }}</view>
              </view>
              <view class="fxBox2" style="align-items: flex-end">
                <view class="fxBox1 col-666 text-sm" @click.stop="couponDetail(index)">
                  详细信息
                  <text
                      :class="{ emfont: true, 'icon-unfold': couponShowInfo[index] ? false : true, 'icon-fold': couponShowInfo[index] ? true : false }"></text>
                </view>
                <view v-if="!btnIfLists[index]" @tap="userGetCoupon(item, index)" class="btnRed">点击领取</view>
                <view v-else class="col-666">已领取</view>
              </view>
            </view>
          </view>
          <view class="coupon-text col-999 text-sm" v-show="couponShowInfo[index]">{{ item.desc }}</view>
        </view>
      </view>
    </van-popup>
    <!--商品推广按钮-->
    <button class="shareGoodsBtn" v-if="detail.is_rebate==1&&agent==1&&!isIntegral&&detail.shop.promo_person==1"
            @tap="getCodeDetail">分享立即可赚{{isGroup?detail.is_group_info[0].rewards:detail.rewards}}元
    </button>
  </view>
</template>

<script>
import tool from '../../static/base/toolFun.js';
import goodsMock from '../../mock/goods.js';
import EmTag from '../../components/tag/tag.vue';
import TagCoupon from '../../components/tag/coupon.vue';
import redirect from '../../mixins/redirect.js';
import global from '../../mixins/global.js';
import tuiBottomPopup from '../../components/bottom-popup/bottom-popup';
import tuiNumberbox from '../../components/numberbox/numberbox';
import toHome from '../../components/header/ToHome';
import uniCountdown from '@dcloudio/uni-ui/lib/uni-countdown/uni-countdown.vue';
import mta from '../../mixins/mta';
import {
  showTuisong,
  getSubscribe,
} from '../../static/base/util.js';

export default {
  name: 'detail',
  mixins: [redirect, global, mta],
  components: {
    EmTag,
    TagCoupon,
    tuiBottomPopup,
    tuiNumberbox,
    toHome,
    uniCountdown,
  },
  data() {
    return {
      goodsTid: {},
      couponTid: {},
      agent: -1,
      agent_id: '',
      skuMiniPrice: null,
      groups: [],
      showCouponPopup: false,
      height: 64, //header高度
      top: 0, //标题图标距离顶部距离
      scrollH: 0, //滚动总高度
      popupShow: false,
      detail: {},
      carouselList: goodsMock.goodsDetail.images,
      //轮播图下标
      bannerIndex: 0,
      goodsContent: goodsMock.goodsDetail.content,
      headTab: [], //
      selectedTab: 0,
      value: 1,
      rateLists: [],
      coupon_list: [],
      sku: [],
      skuLists: [],
      skuSelect: [],
      skuKey: '',
      goodsSkuItem: {},
      isSeckill: false,
      isGroup: false,
      isIntegral: false,
      point: 0,
      downSecond: 0,
      seckillInfo: [],
      couponShowInfo: [],
      btnIfLists: [],
      goods_id: 0,
      group_id: 0,
      groupsNum: 0,
      payTypeGroup: true,
      skuIndex: 0,
      cartNum: 0,
      groupDisbale: true,
      showNumber:true
    };
  },
  computed: {
    pickType(){
      return function(params){
        if(params){
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
      }
    },
  },
  onReady() {
  },
  onLoad: function(options) {
    // uni.showLoading({
    // 	title: '加载中...'
    // });
    // uni.hideShareMenu();
    if (options.scene) {
      const str = decodeURIComponent(options.scene);
      const strArr = str.split('&');
      if (strArr.length === 3) {
        let t = strArr[0].substring(2);
        const user_id = strArr[1].substring(3);
        const goods_id = strArr[2].substring(4);
        this.showMsg = t + '-' + user_id + '-' + goods_id;
        this.goods_id = goods_id;
        this.agent_id = user_id;
        this.getGoodsDetail([goods_id]);
        const token = uni.getStorageSync('user_token');
        if (token) {
          this.setGoodsRelated();
        }
        if (t === 'g') {
          t = 'goods';
        }
        uni.setStorage({
          key: 'source',
          data: t,
          success: function() {
          },
        });
        uni.setStorage({
          key: 'pid',
          data: user_id,
          success: function() {
          },
        });
        uni.setStorage({
          key: 'gid',
          data: goods_id,
          success: function() {
          },
        });
      }
    } else if (options.t) {
      uni.setStorage({
        key: 'source',
        data: options.t,
        success: function() {
        },
      });
      uni.setStorage({
        key: 'pid',
        data: options.p,
        success: function() {
        },
      });
      uni.setStorage({
        key: 'gid',
        data: options.g,
        success: function() {
        },
      });
      this.goods_id = options.g;
      this.agent_id = options.p;
      this.getGoodsDetail([options.g]);
      const token = uni.getStorageSync('user_token');
      if (token) {
        this.setGoodsRelated();
      }
    } else {
      this.goods_id = options.id;
      if (options.point_activity) {
        // 积分中心进来
        this.getGoodsDetail([options.id, 'point_activity']);
        this.isIntegral = true;
        this.point = options.point;
      } else {
        this.getGoodsDetail([options.id]);
      }
    }
    let obj = {};
    // #ifdef MP-WEIXIN
    obj = wx.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-BAIDU
    obj = swan.getMenuButtonBoundingClientRect();
    // #endif
    // #ifdef MP-ALIPAY
    my.hideAddToDesktopMenu();
    // #endif
    // console.log(obj);
    uni.getSystemInfo({
      success: res => {
        this.width = obj.left || res.windowWidth;
        this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
        this.top = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
        this.scrollH = res.windowWidth;
      },
    });
  },
  onShow() {
    const token = uni.getStorageSync('user_token');
    if (token) {
      this.getCartNum();
      this.getAgentType();
      // getSubscribe(1,this.getGoodsTemId)
      // getSubscribe(3,this.getCouponTemId)
      if (this.agent_id) {
        this.setGoodsRelated();
      }
    } else {
      this.cartNum = 0;
      console.log('agent_id' + this.agent_id);
      if (this.agent_id) {
        this.toLink('/pagesB/user/bindUser');
        return;
      }
    }
  },
  methods: {
    goodsShare(id) {
      this.$http({
        aurl: 'userShare',
        data: {
          share_type: 'goods',
          fid: id,
        },
        success: res => {
          console.log(res);
        },
        fail: error => {
          console.log(error);
        },
        complete: res => {
        },
      });
    },

    getCodeDetail() {
      this.$http({
        aurl: 'createWxMiniQr',
        params: {
          id: this.detail.id,
        },
        success: res => {
          if (res.data.code === 0) {
            this.needTokenQueryLink('/pagesB/goods/goodsCode', {id: this.detail.id});
          }
        },
        fail: error => {
          console.log(error);
        },
        complete: res => {
        },
      });
    },

    setTemplate() {
      if (this.agent == 1) {
        if (this.goodsTid.temids.length > 0) {
          showTuisong(this.goodsTid.temids, this.goodsTid.setids, '您尚未开启推广订单订阅消息推送权限，请打开勾选订阅消息权限');
        }
      }

    },
    setGoodsRelated() {
      console.log('pid' + this.agent_id);
      this.$http({
        aurl: 'setRelated',
        params: {
          pid: this.agent_id,
        },
        success: res => {
          console.log(res);
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    getGoodsTemId(params) {
      this.goodsTid = params;
    },
    getCouponTemId(params) {
      this.couponTid = params;
    },
    onShareAppMessage(res) {
      let path = '';
      if (this.agent == 1) {
        const user_info = uni.getStorageSync('user_info');
        const user_id = JSON.parse(user_info).user_id;
        path = '/pagesA/goods/detail?g=' + this.detail.id + '&t=goods&p=' + user_id + '';
        this.goodsShare(user_id);

      } else {
        const user_info = uni.getStorageSync('user_info');
        if (user_info) {
          const user_id = JSON.parse(user_info).user_id;
          this.goodsShare(user_id);
        }
        path = '/pagesA/goods/detail?id=' + this.detail.id + '';
      }
      console.log(path);
      return {
        path: path,
      };
    },
    getAgentType() {
      this.$http({
        aurl: 'applyCheck',
        success: res => {
          this.agent = res.data.result.apply_status;
          this.partner_role = res.data.result.partner_role;
        },
        fail: error => {
          console.log(error);
        },
        complete: res => {
        },
      });
    },

    toCart(link) {
      uni.reLaunch({
        url: link,
      });
    },
    getCartNum() {
      this.$http({
        aurl: 'getCarNum',
        success: res => {
          let num = 0;
          if (res.data.result.num <= 99) {
            num = res.data.result.num;
          } else {
            num = '99+';
          }
          this.cartNum = num;
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    getTime(time) {
      let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
      let end_time = tool.toTimeStamp(time) / 1000;
      return end_time - now_time;
    },
    getGroupOrder() {
      this.$http({
        aurl: 'groupGoodsOrder',
        params: {
          id: this.goods_id,
        },
        success: res => {
          this.groups = res.data.result.list;
          this.groupsNum = res.data.result.now_join_group;
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    userGetCoupon(item, index) {
      const data = {
        coupon_id: item.id,
      };
      this.$http({
        aurl: 'receive',
        data: data,
        success: res => {
          this.showAlert('领取成功');
          this.$set(this.btnIfLists, index, !this.btnIfLists[index]);
          showTuisong(this.couponTid.temids, this.couponTid.setids, '您尚未开启优惠券过期订阅消息推送权限，请打开勾选订阅消息权限');
        },
        fail: error => {
        },
      });
    },
    couponDetail(index) {
      this.$set(this.couponShowInfo, index, !this.couponShowInfo[index]);
    },
    timeUp() {
      uni.showToast({
        title: '活动结束,下次早点来~',
        icon: 'none',
      });
      this.isSeckill = false;
    },
    payClick(type, groupType) {
      let token = uni.getStorageSync('user_token');
      if (!token) {
        this.toLink('/pagesA/user/bindUser');
        return;
      }
      if (this.skuSelect.indexOf('占位') !== -1) {
        uni.showToast({
          title: '请选择完商品规格',
          icon: 'none',
        });
        return;
      }
      if (groupType) {
        this.group_id = 0;
      } else {
        if (this.isGroup) {
          this.goodsSkuItem = this.detail.group_spec_list[this.skuIndex];
          if (this.goodsSkuItem.group_activty_id) {
            this.group_id = this.goodsSkuItem.group_activty_id;
          }
        }
      }
      let data = {
        quantity: this.value,
        type: type,
        sku_id: '',
      };

      if (this.isSeckill) {
        let seckId = this.detail.sec_kill_info[0].seckill_ap_id;
        data.actSign = 'seckill';
        data.activity_id = seckId;
      }
      if (this.isGroup && this.group_id !== 0) {
        data.actSign = 'is_group';
        data.activity_id = this.group_id;
      }
      if (this.isIntegral) {
        data.actSign = 'point_goods';
      }
      if (this.detail.goods_spec === null) {
        data.sku_id = this.detail.spec_list[0].id;
      } else {
        data.sku_id = this.goodsSkuItem.id;
      }
      this.addCart(type, data);
      this.popupShow = false;
      this.initSku();
    },
    addCart(type, data) {
      this.$http({
        aurl: 'addCart',
        data: data,
        success: res => {
          if (type === 'cart') {
            uni.showToast({
              title: '加入购物车成功',
            });
            this.getCartNum();
          } else {
            const _this = this;
            uni.setStorage({
              key: 'type',
              data: 'fastbuy',
              success: function() {
                _this.needTokenLink('/pagesA/checkout/index');
              },
            });
          }
        },
        fail: error => {
          uni.showToast({
            title: error.message.msg,
            icon: 'none',
          });
        },
      });
    },
    skuActive(index, sonIndex, item) {
      this.sku[index].active = sonIndex;
      this.skuSelect[index] = item;
      this.skuActiveChange();
    },
    skuActiveChange() {
      if (this.skuSelect.indexOf('占位') === -1) {
        this.skuKey = '';
        const _this = this;
        this.skuSelect.forEach(item => {
          _this.skuKey += item + '_';
        });
        _this.skuKey = _this.skuKey.slice(0, _this.skuKey.length - 1);
        this.skuIndex = this.skuLists.indexOf(_this.skuKey);
        if (this.isGroup && this.payTypeGroup) {
          this.goodsSkuItem = this.detail.group_spec_list[this.skuIndex];
        } else {
          this.goodsSkuItem = this.detail.spec_list[this.skuIndex];
        }
        if (this.goodsSkuItem.group_activty_id) {
          this.group_id = this.goodsSkuItem.group_activty_id;
          this.groupDisbale = true;
        } else {
          this.groupDisbale = false;
          this.group_id = 0;
        }
        this.value = 1;
      }
    },
    initSku() {
      this.sku = [];
      this.skuKey = '';
      this.skuSelect = [];
      if (this.isGroup) {
        this.goodsSkuItem = this.detail.group_spec_list[0];
        this.group_id = this.goodsSkuItem.group_activty_id;
      } else {
        this.goodsSkuItem = this.detail.spec_list[0];
      }
      this.value = 1;
      if (this.detail.goods_spec === null) {
        return;
      }
      for (let i = 0; i < this.detail.spec_name.length; i++) {
        let obj = {
          title: '',
          lists: [],
          active: -1,
        };
        obj.title = this.detail.spec_name[i];
        for (let j = 0; j < this.detail.goods_spec[i].length; j++) {
          obj.lists.push(this.detail.goods_spec[i][j]);
        }
        this.sku.push(obj);
        this.skuSelect.push('占位');
      }
      for (let i = 0; i < this.detail.spec_list.length; i++) {
        this.skuLists.push(this.detail.spec_list[i].spec_sign);
      }
    },
    getGoodsDetail(idArr) {
      this.$http({
        aurl: 'getGoodsDetail',
        aPath: idArr,
        needErrTips: false,
        success: res => {
          console.log('log', res);
          this.detail = res.data.result;
          if (res.data.result.is_group == 1) {
            this.getGroupOrder();
          }
          // if(!res.data.result.spec_name){
          //   this.detail = res.data.result.spec_list[0]
          // }
          this.isSeckill = res.data.result.is_sec_kill == 1 ? true : false;
          this.isGroup = res.data.result.is_group == 1 ? true : false;
          let result = this.detail.goods_body;
          const regex = new RegExp('<img', 'gi');
          result = result.replace(regex, `<img style="max-width: 100%; display:block"`);
          this.detail.goods_body = result;

          //拼团
          if (this.isGroup) {
            if (this.detail.goods_spec === null) {
              this.group_id = this.detail.spec_list[0].group_activty_id;
            }
          }
          //  团购商品
          if (this.isSeckill || this.isGroup) {
            if (this.isSeckill) {
              this.seckillInfo = this.detail.sec_kill_info[0];
            } else {
              this.seckillInfo = this.detail.is_group_info[0];
            }

            let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
            let end_time = tool.toTimeStamp(this.seckillInfo.end_time) / 1000;
            this.downSecond = end_time - now_time;
          } else { // sku最小商品价格
            if (this.detail.sku.length > 0) {
              var min = this.detail.sku[0].price;
              for (let k = 0; k < this.detail.sku.length; k++) {
                if (min > this.detail.sku[k].price) {
                  min = this.detail.sku[k].price;
                }
              }
              this.skuMiniPrice = min;
            }
          }
          const seckill_goods = this.detail.seckill_goods;
          if (seckill_goods.status) {
            uni.showModal({
              title: '',
              content: seckill_goods.msg,
              showCancel: true,
              confirmColor: '#5C6F97',
              success(res) {
                if (res.confirm) {
                  uni.navigateTo({
                    url: `/pagesB/activity/seckillDetail?activity_id=${seckill_goods.activity_id}&sku_id=${seckill_goods.sku_id}&goods_id=${seckill_goods.goods_id}&gm_id=${seckill_goods.gm_id}`,
                  });
                } else if (res.cancel) {
                  // console.log('用户点击取消')
                }
              },
            });

          }
          // toTimeStamp
        },
        fail: error => {
          if (error.code === 700) {
            this.RefuseBrowse(error.message);
          } else if (error.code === 101) {
            console.log('log101', error);
            let result = error.result;
            this.isIntegral = true;
            this.point = result.point;
            this.getGoodsDetail([result.goods_id, 'point_activity']);
          } else {
            uni.showToast({
              title: error.message,
              icon: 'none',
            });
          }
        },
        complete() {
          uni.hideLoading();
        },
      });
      this.$http({
        aurl: 'getGoodsRate',
        aPath: [this.goods_id],
        success: res => {
          this.rateLists = res.data.result.data;
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    bannerChange(e) {
      this.bannerIndex = e.detail.current;
    },
    change: function(e) {
      this.value = e.value;
    },
    hidePopup() {
      this.popupShow = false;
    },
    showPopup(type) {
      if (this.isGroup) {
        if (type) {
          this.goodsSkuItem = this.detail.group_spec_list[this.skuIndex];
        } else {
          this.goodsSkuItem = this.detail.spec_list[this.skuIndex];
        }
        this.payTypeGroup = type;
        this.popupShow = true;
      } else {
        this.popupShow = true;
      }
    },
    favoriteToggle(url, tip) {
      this.$http({
        aurl: url,
        data: {
          goods_id: this.detail.id,
        },
        success: res => {
          this.detail.is_favorite = !this.detail.is_favorite;
          uni.showToast({
            title: tip,
          });
        },
        fail: err => {
        },
      });
    },
    tapFavorite() {
      let isFavoite = this.detail.is_favorite;
      if (!isFavoite) {
        this.favoriteToggle('goodsFavorite', '收藏成功');
      } else {
        this.favoriteToggle('goodFavoriteCancel', '取消收藏成功');
      }
    },
  },
  watch: {
    popupShow(v){
      this.showNumber = v;
    },
    detail() {
      this.initSku();
      const token = uni.getStorageSync('user_token');
      let couponType = '';
      if (token) {
        couponType = 'getCouPon';
      } else {
        couponType = 'getCouPonNoLogin';
      }
      this.$http({
        aurl: couponType,
        params: {
          goods_id: this.detail.id,
          page_size: 100000,
        },
        success: res => {
          this.coupon_list = res.data.result.data;
          for (let i = 0; i < this.coupon_list.length; i++) {
            this.couponShowInfo.push(false);
            this.btnIfLists.push(false);
          }
        },
        fail: error => {
          console.log(error);
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../variable.styl'
  >>>.uni-countdown
    align-items center!important
  .activity-date-box
    padding 36rpx 30rpx

  .shareGoodsBtn
    position fixed
    height 65rpx
    line-height 65rpx
    width 90%
    left 5%
    text-align center
    border-radius 32rpx
    background #DC372F
    color #fff
    bottom 120rpx
    z-index 2

  .money-box
    border-radius 20rpx
    height 40rpx
    line-height 40rpx
    background #f04f45

    .imgBox
      width 40rpx
      height 40rpx

      image
        width 100%
        height 100%
        border-radius 50%

  .action-icon
    position relative

    .cart-num
      position absolute
      height 40rpx
      width 40rpx
      line-height 40rpx
      text-align center
      color #fff
      background #ff7370
      border 1px solid #ffffff
      border-radius 50%
      top 0rpx
      right 35rpx

  .activity-text
    display flex
    flex-wrap wrap
    line-height 30rpx
  .activityGoods
    padding 0 10rpx
    border-radius 10rpx
    background #e94242
    color #fff

  .goods-det-btn, .goods-btn
    display flex
    flex-direction column
    justify-content center
    align-items center

  .group-swiper
    max-height 240rpx

    .group-btn
      height 60rpx
      line-height 60rpx
      padding 0 20rpx
      border-radius 30rpx
      background linear-gradient(to right, #ff7358, #ea3c3c)
      color #fff
      margin-left 20rpx

    .group-item
      height 120rpx
      padding 0 10rpx
      box-sizing border-box
      width 100%
      display flex
      justify-content space-between
      align-items center

      .imgs
        display flex

        .group-img
          height 80rpx
          width 80rpx
          overflow hidden
          padding 5rpx
          box-sizing border-box
          border-radius 50%
          background #fff
          overflow hidden

          image
            height 100%
            width 100%
            border-radius 50%

        .group-img:not(:first-child)
          margin-left -30rpx

        .group-icon
          height 80rpx
          width 80rpx
          margin-left -30rpx

          image
            width 100%
            height 100%
            border-radius 50%

  .goods-btn
    width 200rpx
    border none
    height 100rpx
    margin 0 !important
    background #F8952F !important
    color #fff
    border-radius 0
    border 0

    &::after
      display none

  button[disabled]
    opacity 0.5
    color #fff

  .couponBox
    >>> .van-popup
      height 945rpx
      width 100%
      padding 0 20rpx
      box-sizing border-box
      background #f8f8f8
      display flex
      flex-direction column

      .title
        height 100rpx
        line-height 100rpx
        flex-shrink 0

      .coupon-num
        height 60rpx
        line-height 60rpx
        flex-shrink 0

      .coupon-box
        flex 1
        height calc(100% - 160rpx)
        overflow-y scroll
        padding-bottom: 100rpx;

        .coupon-text
          border 1px solid #D7D7D7
          margin 0 10rpx
          padding 10rpx 40rpx
          background #fff

        .coupon-info
          height 206rpx
          width 100%

          .left
            width 240rpx
            height 100%
            position relative

            .imgBox
              width 100%
              height 100%
              position absolute
              top 0
              left 0rpx

              image
                width 100%
                height 100%

            .coupon-price
              display flex
              flex-direction column
              align-items center
              justify-content center
              width 100%
              position relative
              z-index 2

              .price
                font-size 80rpx

          .right
            box-sizing border-box
            display flex
            flex-direction column
            justify-content space-between

  page
    background $page-color-base

  >>> .uni-countdown
    .uni-countdown__splitor
      color #fff !important

    .uni-countdown__number
      background transparent !important
      border none !important
      padding 0 !important
      margin 0 !important
      color #fff !important

  .group-info
    >>> .uni-countdown__number, >>> .uni-countdown__splitor
      color #333 !important

  /* banner */
  .banner-swiper
    position relative

    .seckill-box
      width 100%
      position absolute
      bottom 0
      left 0
      padding $margin-xs $margin-md
      background url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAu4AAAD3CAYAAABCW9GwAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTM4IDc5LjE1OTgyNCwgMjAxNi8wOS8xNC0wMTowOTowMSAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvIiB4bWxuczp4bXBNTT0iaHR0cDovL25zLmFkb2JlLmNvbS94YXAvMS4wL21tLyIgeG1sbnM6c3RSZWY9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9zVHlwZS9SZXNvdXJjZVJlZiMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIiB4bXBNTTpJbnN0YW5jZUlEPSJ4bXAuaWlkOjA3MjdFMkUxRTlBNTExRTk5MkZFQjQ4MDUxQTc2NjE2IiB4bXBNTTpEb2N1bWVudElEPSJ4bXAuZGlkOjA3MjdFMkUyRTlBNTExRTk5MkZFQjQ4MDUxQTc2NjE2Ij4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6MDcyN0UyREZFOUE1MTFFOTkyRkVCNDgwNTFBNzY2MTYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6MDcyN0UyRTBFOUE1MTFFOTkyRkVCNDgwNTFBNzY2MTYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz66x5xyAACAOklEQVR42uy9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') no-repeat bottom
      background-size cover
      color #fff
      box-sizing border-box

      .icon
        width 75rpx
        height @width
        line-height 1.2
        border-radius 10rpx
        background rgba(0, 0, 0, 0.3)
        font-size $font-sm + 2
        text-align center
        padding $margin-xs 0
        box-sizing border-box
        margin-right $margin-md

      .p-box
        font-size $font-base

        text
          font-size $font-base + 18
          padding-left $margin-xs

      .r
        text-align right

    .tips
      background rgba(0, 0, 0, 0.5)
      font-size 28rpx
      position absolute
      color #fff
      bottom 30rpx
      right 0
      padding 8rpx 20rpx
      border-radius 30rpx 0 0 30rpx

    .slide-image
      width 100%
      display block

  /* title */
  .em-list-cell
    position relative
    display flex
    align-items center
    font-size 26rpx
    line-height 26rpx
    padding 36rpx 30rpx
    box-sizing border-box

    &:after
      content ''
      position absolute
      border-bottom 1rpx solid #eaeef1
      -webkit-transform scaleY(0.5)
      transform scaleY(0.5)
      bottom 0
      right 0
      left 126rpx

    .em-right
      position absolute
      right 30rpx
      top 30rpx

    .em-cell-title
      padding-right 30rpx
      flex-shrink 0

  .em-between
    justify-content space-between

  .goods-info
    margin-bottom 100rpx

    .desc
      background #ffffff

      .price-box
        display flex
        align-items center
        justify-content space-between

        .price
          font-size 32rpx
          color $font-color-primary

        .follow
          display flex
          align-items center
          flex-direction column
          justify-content center

        .point-txt
          font-size $font-base
          color #333
          margin-left 5rpx

      .remark
        display flex
        align-items center
        justify-content space-between

    .discount
      background #ffffff

      &.coupon-wrap
        .coupon-cell
          .tag-coupon-box
            width 100%
            display flex
            overflow hidden
            display flex
            flex-wrap wrap

            &.sm
              height $font-sm+ 19

            &.lg
              height $font-l+ 51

            .tag-coupon
              flex-shrink 0

      .em-promotion-box
        white-space nowrap
        overflow hidden
        text-overflow ellipsis
        padding 10rpx 0
        width 74%

    .basic-info
      background #ffffff

      .guarantee
        display flex
        flex-wrap wrap

        .guarantee-item
          font-size $font-xs
          margin-right 10rpx
          margin-bottom 10rpx

    .comment
      background #ffffff

      .comment-lists
        font-size 26rpx
        color $font-color-dark

      .comment-user
        display flex
        align-items center

      .comment-avatar
        width 60rpx
        height 60rpx
        border-radius 30rpx
        display block
        margin-right 16rpx

      .comment-all
        box-sizing border-box
        display flex
        align-items center
        justify-content center

    .detail
      background #ffffff

  .notice-title
    width 100%
    height 80rpx
    display flex
    justify-content center
    align-items center
    font-size $font-sm
    color $font-color-light

  .action-bar
    position fixed
    right 0
    bottom 0
    left 0
    display flex
    align-items center
    background-color #fff
    z-index 99999

  .action-icon
    display flex
    flex-direction column
    justify-content center
    min-width 100rpx
    height 100rpx
    color $font-color-dark
    font-size 10px
    line-height 1
    text-align center
    background-color #fff

    &:active
      background-color #f2f3f5

  >>> uni-button:after
    border none

  .action-button
    position relative
    display inline-block
    box-sizing border-box
    margin 0
    padding 0
    text-align center
    border-radius 4rpx
    flex 1
    height 72rpx
    font-weight 500
    font-size $font-base
    line-height 68rpx
    border none
    color #ffffff

  .action-button--warning
    background linear-gradient(to right, #ffd01e, #ff8917)

  .action-button--danger
    background linear-gradient(to right, #ff6034, #ee0a24)

  .action-button::before
    position absolute
    top 50%
    left 50%
    width 100%
    height 100%
    background-color #000
    border inherit
    border-radius inherit
    transform translate(-50%, -50%)
    opacity 0
    content ' '

  .action-button:active::before
    opacity 0.1

  .action-button--first
    margin-left 10rpx
    border-top-left-radius 36rpx
    border-bottom-left-radius 36rpx

  .action-button--last
    margin-right 10rpx
    border-top-right-radius 36rpx
    border-bottom-right-radius 36rpx

  /* 底部选择弹层 */
  .tui-popup-class
    border-top-left-radius 24rpx
    border-top-right-radius 24rpx
    padding-bottom env(safe-area-inset-bottom)

  .tui-popup-box
    position relative
    padding 30rpx 0 100rpx 0

  .tui-popup-btn
    width 100%
    position absolute
    left 0
    bottom 0

  .tui-popup-btn .tui-btn-class
    width 90% !important
    display block !important
    font-size 28rpx !important

  .tui-icon-close
    position absolute
    top 30rpx
    right 30rpx

  .tui-product-box
    display flex
    align-items flex-end
    font-size 24rpx
    padding-bottom 30rpx

  .tui-popup-img
    height 200rpx
    width 200rpx
    border-radius 24rpx
    display block

  .tui-popup-price
    padding-left 20rpx
    padding-bottom 8rpx

  .tui-amount
    color #ff201f
    font-size 36rpx

  .tui-number
    font-size 24rpx
    line-height 24rpx
    padding-top 12rpx
    color #999

  .tui-popup-scroll
    height 500rpx
    font-size 26rpx

  .tui-scrollview-box
    padding 0 20rpx 40rpx 20rpx
    box-sizing border-box

  .tui-attr-title
    padding 10rpx 0
    color #333

  .tui-attr-box
    font-size 0
    padding 20rpx 0

  .tui-attr-item
    max-width 100%
    min-width 200rpx
    height 64rpx
    display -webkit-inline-flex
    display inline-flex
    align-items center
    justify-content center
    background #f3f5f7
    padding 0 26rpx
    box-sizing border-box
    border-radius 10rpx
    margin-right 20rpx
    margin-bottom 20rpx
    font-size 26rpx
    color #666
    box-sizing border-box
    border 1px solid #f3f5f7

  .tui-attr-active
    color red
    border-color red
    position relative

  .tui-number-box
    display flex
    align-items center
    justify-content space-between
    padding 20rpx
    padding-bottom constant(safe-area-inset-bottom)
    padding-bottom env(safe-area-inset-bottom)
    box-sizing border-box

  /* 底部选择弹层 */
  /* 底部操作栏 */
  .tui-col-7
    width 58.33333333%

  .tui-col-5
    width 41.66666667%

  .tui-operation
    width 100%
    height 100rpx
    /* box-sizing: border-box; */
    background rgba(255, 255, 255, 0.98)
    position fixed
    display flex
    align-items center
    justify-content space-between
    z-index 10
    bottom 0
    left 0
    padding-bottom env(safe-area-inset-bottom)

  .tui-safearea-bottom
    height constant(safe-area-inset-bottom)
    height env(safe-area-inset-bottom)
    width 100%

  .tui-operation::before
    content ''
    position absolute
    top 0
    right 0
    left 0
    -webkit-transform scaleY(0.5)
    transform scaleY(0.5)

  .tui-operation-left
    display flex
    align-items center

  .tui-operation-item
    flex 1
    display flex
    align-items center
    justify-content center
    flex-direction column
    position relative

  .tui-operation-text
    font-size 22rpx
    color #333

  .tui-opacity
    opacity 0.5

  .tui-scale-small
    transform scale(0.9)
    transform-origin center center

  .tui-operation-right
    height 90rpx
    /* box-sizing: border-box; */
    padding-top 0

  .tui-right-flex
    display flex
    align-items center
    justify-content center

  .tui-btnbox-4 .tui-btn-class
    width 90% !important
    display block !important
    font-size 28rpx !important

  .tui-operation .tui-badge-class
    position absolute
    top -6rpx
    /* #ifdef H5 */
    transform translateX(50%)

  /* #endif */
  .tui-flex-1
    flex 1

  .tui-padding
    padding 0 30rpx
    box-sizing border-box

  /* 底部操作栏 */
  .goods-det-btn
    width 100%
    border none
    background #ffffff
    color #fff
    height 90rpx
    border-radius 0

    &.leftBtn
      background #F8952F !important

    &::after
      display none

  .icon-favor_fill_light
    color $theme-red

  .rightBtn
    background #E64340 !important

  .pin-logo
    padding 0rpx 6rpx
    background #ffb369
    color #ffffff
    margin-left 10rpx
    font-size 24rpx

  .group-count
    position relative
    padding-left 20rpx

    &::before
      position absolute
      height 30rpx
      width 10rpx
      background #f65b4b
      left 0
      top 0
      content ''

  .promotion
    align-items flex-start

    .activityGoods
      font-size 24rpx

    .items
      margin-bottom 20rpx

      &:last-child
        margin-bottom 0

  .w400
    width 400rpx
</style>
