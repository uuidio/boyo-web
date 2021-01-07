<template>
  <view class="container" style="padding-bottom: 200rpx;" :style="{'padding-top': myHeight+'px'}">
    <view class="index-box">
      <view class="mp-search-box"
            :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px'}">
        <view class="index-head"
              :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">
          <text class="my-text mt-md">购物车</text>
        </view>
      </view>
    </view>
    <view class="cart-content">
      <!--<toHome @on-height="getHeight" :routerLink="toName"  box-background="#fff" title="购物车"></toHome>-->
      <view v-if="!loading">
        <!--<view class="cartHead" :style="{top:height+'px'}">-->
        <view class="cartHead" v-if="goods.length">
          <view class="cart-edit fxBox2" :style="{'top': myHeight+'px'}">
            <!--					<view class="addr-location">-->
            <!--						<image class="icon-location" src="/static/icon/icon-location.png"></image>-->
            <!--						<text class="addr">天河客运站元岗路燕玲路</text>-->
            <!--					</view>-->
            <text class="col-666">共{{ goods.length }}件商品</text>
            <view v-if="lists.length > 0">
              <text @click="editFlag = true" v-if="!editFlag">编辑</text>
              <text @click="editFlag = false" v-else>完成</text>
            </view>
          </view>
        </view>
        <view v-if="lists.length > 0" class="cart-box">
          <view class="cart-lists" v-for="(itm, idx) in lists" :key="idx">
            <view class="cart-shop group-box">
              <view @click="groupClick(itm.groupInfo.is_checked, idx)">
                <van-checkbox checked-color="#e64340" :value="itm.groupInfo.is_checked"
                              :disabled="itm.is_disabled"></van-checkbox>
              </view>
              <view class="fxBox2 fx1">
                <view class="fxBox1">
                  <text class="text-md">{{ itm.groupInfo.gm_name }}</text>
                </view>
              </view>
            </view>
            <view :key="index" v-for="(item, index) in itm.lists">
              <view class="cart-shop">
                <view class="inner-box">
                  <view class="box-t">
                    <view @click="boxClick(item.shopInfo.is_checked, index, idx)">
                      <van-checkbox checked-color="#e64340" :value="item.shopInfo.is_checked"></van-checkbox>
                    </view>
                    <view class="fxBox2 fx1" @click="jumpShop(item.shopInfo.id)">
                      <view class="fxBox1">
                        <image src="/static/icon/icon-shop.png"></image>
                        <text class="text-md">{{ item.shopInfo.shop_name }}</text>
                      </view>
                      <text class="iconfont icon-right"></text>
                    </view>
                  </view>
                  <view class="box-b" v-if="item.shopActivityList.length" @tap="onSelectAct(index,idx)">
                    <text class="full-reduction-label">满减</text>
                    <view>{{ item.shopActivityList[item.shopAct].name }}</view>
                  </view>

                </view>
              </view>
              <view v-for="(goods, goods_index) in item.goods_lists" :key="goods_index">
                <van-checkbox-group :value="shopSelect[idx][index]">
                  <view class="goods-item">
                    <view @click="changeSelect(goods.id, index, idx)">
                      <van-checkbox checked-color="#e64340" :name="goods.id"/>
                    </view>
                    <view class="goods-content">
                      <view class="goods-img" @tap="toGoodsDetail(goods.goods_id)">
                        <image mode="widthFix" :src="goods.goods_image"></image>
                      </view>
                      <view class="goods-text">
                        <view class="line2-p goods-name" @tap="toGoodsDetail(goods.goods_id)">{{ goods.goods_name }}
                        </view>
                        <view v-if="goods.sku_info" class="goods-sku-box">
                          <text class="goods-sku">{{ goods.sku_info }}</text>
                        </view>
                        <view class="step-box">
                          <view class="goods-price-box">
                            <text class="price-sign text-12 col-red">￥</text>
                            <text class="text-md col-red">{{ goods.goods_price }}</text>
                          </view>
                          <van-stepper :data-id="goods.id" @change="numChange" button-size="20px" integer
                                       :value="goods.quantity"/>
                        </view>
                      </view>
                    </view>
                  </view>
                </van-checkbox-group>
              </view>
            </view>

          </view>
          <van-submit-bar :price="totalPrice" :disabled="btnFlag" :button-text="submitBarText" @submit="onSubmit"
                          v-if="!editFlag">
            <!--					<view class="ml-md fx1" @click="allSelectClick(allSelect)"><van-checkbox checked-color="#e64340" :value="allSelect">全选</van-checkbox></view>-->
          </van-submit-bar>
          <view class="delectBox fxBox1" v-else>
            <!--					<view class="ml-md fx1" @click="allSelectClick(allSelect)"><van-checkbox class="text-md" checked-color="#e64340" :value="allSelect">全选</van-checkbox></view>-->
            <view>
              <!--<van-button size="small"  color="#f8952f" :disabled="btnFlag" class="mr-md">加入收藏</van-button>-->
              <van-button size="small" :disabled="btnFlag" @click="onDelete">删除</van-button>
            </view>
          </view>
        </view>

        <view v-else class="cart">
          <view class="cart-icon">
            <image src="/static/icon/empty-cart.png"></image>
            <text class="text-md text-light" style="display: block;">去添加点什么吧</text>
            <em-button @tap="toNav('/pages/index/indexCustomer')" class="cart-btn" size="mini" type="danger"
                       shape="circle" :plain="true">
              <text class="pl-lg pr-lg">逛一逛</text>
            </em-button>
          </view>
        </view>
        <view style="padding-bottom: 120rpx;margin-top: 50rpx;" v-if="classifyList.length > 0">
          <recommendGoods :listsData="recommendList" :classifyList="classifyList" title="为你推荐"
                          @changeClassify="handleChangeClassify"></recommendGoods>
          <uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
        </view>
      </view>
    </view>
    <tab-bar ref="tabbar" class="tab-bar-fixs" :actives='tabActive'></tab-bar>
  </view>
</template>

<script>
import emButton from '../../components/button/button.vue';
import redirect from '../../mixins/redirect.js';
import global from '../../mixins/global.js';
import toHome from '../../components/header/ToHome';
import cartNum from '../../mixins/cartNum';
import mta from '../../mixins/mta.js';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import recommendGoods from '../../components/lists/recommendGoods';
import tabBar from '../../components/tabbar/tabbar.vue';

export default {
  mixins: [redirect, global, cartNum, mta],
  name: 'cart',
  data() {
    return {
      tabActive: 3,
      currentClassify: '',
      classifyList: [],
      loadText: {contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中'},
      loadStatus: 'loading',
      recommendList: [],
      loadMore: {
        current: 1,
        last: 1,
        flat: false,
      },
      goods: [],
      toName: 'cart',
      allSelect: false,
      checkedGoods: [],
      shopSelect: [],
      btnFlag: true,
      selectShop: [],
      check: true,
      editFlag: false,
      lists: [],
      loading: true,
      height: 0,
      actLists: [],
      actNum: 0,
      selectAct: [],
      actShop: {
        group_id: null,
        group_index: null,
        shop_id: null,
        shop_index: null,
      },
    };
  },
  components: {
    emButton,
    toHome,
    uniLoadMore,
    recommendGoods,
    tabBar,
  },
  onLoad: function() {
    uni.hideTabBar();
    this.getRecommend(true);
  },
  onShow() {
    let tempToken = uni.getStorageSync('user_token');
    this.getCartNum();
    if (tempToken) {
      uni.removeStorageSync('shopActArr');
      this.getLists();
    } else {
      uni.redirectTo({
        url: '/pagesA/user/bindUser?to=cart',
      });
    }
    this.getClassify();
  },
  created() {
  },
  mounted() {
  },
  computed: {
    submitBarText() {
      const count = this.checkedGoods.length;
      return `结算${count ? `(${count})` : ''}`;
    },
    totalPrice() {
      let total = this.goods.reduce((total, item) => total +
          (this.checkedGoods.indexOf(item.id) !== -1 ? item.goods_price * 100 * item.quantity : 0), 0);
      return total;
    },
  },
  onReachBottom() {
    if (this.loadMore.flat) return;
    this.loadStatus = 'loading';
    setTimeout(() => {
      if (this.recommendList.length !== 0) {
        this.loadMore.current++;
      }
      this.getRecommend();
    }, 500);
  },
  methods: {
    getCartNum() {
      if(this.$refs.tabbar){
        this.$refs.tabbar.initCartNumber()
      }
    },
    getClassify() {
      let that = this;
      this.$http({
        aurl: 'getClassify',
        data: {
          pages: 'cart',
        },
        success: res => {
          that.classifyList = [];
          if (res.data.code == 0) {
            for (let i = 0; i < res.data.result.length; i++) {
              if (i === 0) {
                res.data.result[i].active = true;
                that.currentClassify = res.data.result[i].id;
              } else {
                res.data.result[i].active = false;
              }
              that.classifyList.push(res.data.result[i]);
            }
          }
        },
        error: err => {
          console.log(err);
        },
      });
    },
    handleChangeClassify(index) {
      for (let i = 0; i < this.classifyList.length; i++) {
        if (i === index) {
          if (this.classifyList[i].active) {
            return false;
          } else {
            this.classifyList[i].active = true;
            this.currentClassify = this.classifyList[i].id;
            // this.recommendList = []
            this.loadMore = {
              current: 1,
              last: 1,
              flat: false,
            };
            this.loadStatus = 'loading';
            this.getRecommend(true);
          }
        } else {
          this.classifyList[i].active = false;
        }
      }
    },
    getRecommend(bool) {
      var that = this;
      this.$http({
        aurl: 'getRecommend',
        data: {
          pages: 'cart',
          title_id: that.currentClassify,
          page: this.loadMore.current,
        },
        success: res => {
          // console.log(res)
          if (res.data.code === 0 && res.data.result.data) {
            let data = res.data.result;
            this.loadMore.last = data.last_page;
            if (bool) {
              this.recommendList = data.data;
            } else {
              data.data.map(item => {
                this.recommendList.push(item);
              });
            }
            if (this.loadMore.current === this.loadMore.last) {
              this.loadMore.flat = true;
              this.loadStatus = 'noMore';
            } else {
              this.loadStatus = 'more';
              this.loadMore.flat = false;
            }
          }
        },
        error: err => {
          console.log(err);
        },
      });
    },
    jumpShop(id) {
      uni.navigateTo({
        url: '/pagesA/brand/lists?shopid=' + id,
      });
    },
    hidePopup() {
      this.popupShow = false;
    },
    init() {
      this.goods = [];
      this.allSelect = false;
      this.checkedGoods = [];
      this.shopSelect = [];
      this.btnFlag = true;
      this.selectShop = [];
      this.check = true;
      this.editFlag = false;
      this.lists = [];
      this.loading = true;
    },
    numChange(item) {
      const data = {
        cart_id: item.currentTarget.dataset.id,
        quantity: item.detail,
      };
      if (item.detail === '') {
        return;
      }
      this.goods.forEach(goods_item => {
        if (goods_item.id === data.cart_id) {
          goods_item.quantity = item.detail;
        }
      });
      this.$http({
        aurl: 'cartNumUpdate',
        data: data,
        success: res => {
          this.getCartNum();
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    getLists() {
      // uni.showLoading({
      //   title: '加载中'
      // });
      const params = {
        gm_id:uni.getStorageSync('gmToken')
      };
      this.$http({
        aurl: 'cartLists',
        data:params,
        success: res => {
          this.init();
          for (let k = 0; k < res.data.result.groupLists.length; k++) {
            const groupItem = res.data.result.groupLists[k];
            for (let i = groupItem.lists.length - 1; i >= 0; i--) {
              const item = groupItem.lists[i];
              if (item.shopActivityList.length) {
                this.$set(item, 'shopAct', 0);
                // item.shopActivityList.shopAct = 0;
              }
              for (let j = item.goods_lists.length - 1; j >= 0; j--) {
                if (item.goods_lists[j].goods_info.goods_state === 0) {
                  item.goods_lists.splice(j, 1);
                }
              }
              if (item.goods_lists.length === 0) {
                groupItem.lists.splice(i, 1);
              }
            }
            if (groupItem.lists.length > 0) {
              this.lists.push(groupItem);
            }
          }
          this.initData();
          // uni.hideLoading()
          this.loading = false;
        },
        fail: error => {
          if (error.code === 401) {
            uni.navigateTo({
              url: '/pagesA/user/login/login',
            });
            return;
          }
        },
      });
    },
    getHeight(height) {
      this.height = height;
    },
    allSelectClick(check) {
      this.$set(this, 'allSelect', !check);
      this.selectAllFun(check); //全选方法
    },
    selectAllFun(check) {
      for (let i = 0; i < this.lists.length; i++) {
        this.shopSelectItem(check, i); // 商品全选
        this.boxClick(check, i); //店铺全选
      }
    },
    changeSelect(id, index, idx) {
      if (this.checkedGoods.length > 0) {
        if (this.actShop.group_id && this.actShop.group_id !== this.lists[idx].groupInfo.gm_id) {
          uni.showToast({
            title: '不支持多项目结算!',
            icon: 'none',
          });
          return false;
        }
      }

      if (this.shopSelect[idx][index].indexOf(id) === -1) {
        this.shopSelect[idx][index].push(id);
      } else {
        this.shopSelect[idx][index].splice(this.shopSelect[idx][index].indexOf(id), 1);
      }
      // 设置勾选的店铺id和index
      this.actShop.group_id = this.lists[idx].groupInfo.gm_id;
      this.actShop.group_index = idx;
      this.actShop.shop_id = this.lists[idx].lists[index].shopInfo.id;
      this.actShop.shop_index = index;
      this.ifShopIndex(index, idx); //判断店铺是否全选反选
    },
    ifShopIndex(index, idx) {
      if (this.shopSelect[idx][index].length === this.lists[idx].lists[index].goods_lists.length) {
        this.$set(this.lists[idx].lists[index].shopInfo, 'is_checked', true);
        this.selectShop[idx].push(this.lists[idx].lists[index].shopInfo.id);
      } else {
        this.$set(this.lists[idx].lists[index].shopInfo, 'is_checked', false);
        if (this.selectShop[idx].indexOf(this.lists[idx].lists[index].shopInfo.id) !== -1) {
          this.selectShop[idx].splice(this.selectShop[idx].indexOf(this.lists[idx].lists[index].shopInfo.id), 1);
        }
      }

      this.ifGroupChecked(index, idx);
    },
    ifGroupChecked(index, idx) {
      if (this.selectShop[idx].length === this.lists[idx].lists.length) {
        this.$set(this.lists[idx].groupInfo, 'is_checked', true);
      } else {
        this.$set(this.lists[idx].groupInfo, 'is_checked', false);
      }

    },
    shopSelectItem(check, index, idx) {
      var _this = this;
      _this.lists[idx].lists[index].goods_lists.forEach(item => {
        if (check) {
          if (_this.shopSelect[idx][index].indexOf(item.id) !== -1) {
            _this.shopSelect[idx][index].splice(_this.shopSelect[idx][index].indexOf(item.id), 1);
          }
        } else {
          if (_this.shopSelect[idx][index].indexOf(item.id) === -1) {
            _this.shopSelect[idx][index].push(item.id);
          }
        }
      });
      if (check) {
        if (_this.selectShop[idx].indexOf(_this.lists[idx].lists[index].shopInfo.id) !== -1) {
          _this.selectShop[idx].splice(_this.selectShop.indexOf(_this.lists[idx].lists[index].shopInfo.id), 1);
        }
      } else {
        if (_this.selectShop[idx].indexOf(_this.lists[idx].lists[index].shopInfo.id) === -1) {
          _this.selectShop[idx].push(_this.lists[idx].lists[index].shopInfo.id);
        }
      }
      this.ifGroupChecked(index, idx);
    },
    boxClick(check, index, idx) {
      if (this.checkedGoods.length > 0) {
        if (this.actShop.group_id && this.actShop.group_id !== this.lists[idx].groupInfo.gm_id) {
          uni.showToast({
            title: '不支持多项目结算!',
            icon: 'none',
          });
          return false;
        }
      }
      this.actShop.group_id = this.lists[idx].groupInfo.gm_id;
      this.actShop.group_index = idx;
      this.actShop.shop_id = this.lists[idx].lists[index].shopInfo.id;
      this.actShop.shop_index = index;
      this.$set(this.lists[idx].lists[index].shopInfo, 'is_checked', !check);
      if (check) {
        if (this.selectShop[idx].indexOf(this.lists[idx].lists[index].shopInfo.id) !== -1) {
          this.selectShop[idx].splice(this.selectShop.indexOf(this.lists[idx].lists[index].shopInfo.id), 1);
        }
      } else {
        if (this.selectShop[idx].indexOf(this.lists[idx].lists[index].shopInfo.id) === -1) {
          this.selectShop[idx].push(this.lists[idx].lists[index].shopInfo.id);
        }
      }

      this.shopSelectItem(check, index, idx, this);
    },
    groupClick(check, idx) { // 集团单选
      if (this.checkedGoods.length > 0) {
        if (this.actShop.group_id && this.actShop.group_id !== this.lists[idx].groupInfo.gm_id) {
          uni.showToast({
            title: '不支持多项目结算!',
            icon: 'none',
          });
          return false;
        }
      }
      this.actShop.group_id = this.lists[idx].groupInfo.gm_id;
      this.actShop.group_index = idx;
      this.$set(this.lists[idx].groupInfo, 'is_checked', !check);
      for (let i = 0; i < this.lists[idx].lists.length; i++) {
        this.shopSelectItem(check, i, idx); // 商品全选
        this.boxClick(check, i, idx); //店铺全选
      }
    },

    initShopSelect(index, idx) {
      if (this.shopSelect[idx][index].length === this.lists[idx].lists[index].goods_lists.length) {
        this.boxClick(false, index, idx);
      }
    },
    initCheckGoods() {
      this.checkedGoods = [];
      for (let k = 0; k < this.shopSelect.length; k++) {
        const groupItem = this.shopSelect[k];
        for (let i = 0; i < groupItem.length; i++) {
          const item = groupItem[i];
          for (let j = 0; j < item.length; j++) {
            this.checkedGoods.push(item[j]);
          }
        }
      }
      this.$set(this, 'btnFlag', !this.checkedGoods.length);
    },
    initData() {
      this.lists.forEach((itm, idx) => {
        this.shopSelect.push([]);
        this.selectShop.push([]);
        itm.groupInfo.is_checked = false;
        itm.groupInfo.is_disabled = false;
        itm.lists.forEach((item, index) => {
          const arr = [];
          item.shopInfo.is_checked = false;
          item.goods_lists.forEach(goods_item => {
            goods_item.id = String(goods_item.id);
            if (goods_item.is_checked === 1) {
              arr.push(goods_item.id);
              this.actShop.group_index = idx;
              this.actShop.group_id = itm.groupInfo.gm_id;
            }
            this.goods.push(goods_item);
          });
          this.shopSelect[idx].push(arr);
          this.initShopSelect(index, idx); //初始化店铺复选框选择
        });
      });
      if (this.actShop.group_id) {
        this.lists.forEach((item, index) => {
          if (item.groupInfo.gm_id !== this.actShop.group_id) {
            item.groupInfo.is_disabled = true;
          }
        });
      }
    },
    onSubmit() {
      uni.removeStorageSync('type');
      let shopActArr = [];
      this.lists.map(itm => {
        itm.lists.map(item => {
          if (item.shopActivityList.length) {
            shopActArr.push({shop_id: item.shopInfo.id, act_id: item.shopActivityList[item.shopAct].id});
          }
        });
      });
      uni.setStorageSync('shopActArr', shopActArr);
      this.needTokenLink('/pagesA/checkout/index');
    },
    onDelete() {
      this.$http({
        aurl: 'cartDelete',
        data: {
          cart_id: this.checkedGoods,
        },
        success: res => {
          uni.showToast({
            icon: 'none',
            title: '删除成功',
          });
          this.goods.length = this.goods.length - this.checkedGoods.length;
          this.deleteWap();
          this.getCartNum();
        },
        fail: error => {
          console.log(error);
        },
      });
    },
    deleteWap() {
      for (let k = this.lists.length - 1; k >= 0; k--) {
        const groupItem = this.lists[k].lists;// 项目店铺列表
        if (this.lists[k].groupInfo.gm_id === this.actShop.group_id) {
          for (let i = groupItem.length - 1; i >= 0; i--) {
            const item = groupItem[i].goods_lists; // 店铺商品列表
            for (let j = item.length - 1; j >= 0; j--) {
              const goodsItem = item[j]; // 商品
              for (let o = this.checkedGoods.length - 1; o >= 0; o--) {
                if (goodsItem.id === this.checkedGoods[o]) {
                  item.splice(j, 1);
                }
              }
            }

            if (item.length === 0) {
              groupItem.splice(i, 1);
              this.shopSelect[k].splice(i, 1);
            }
          }
          if (groupItem.length === 0) {
            this.lists.splice(k, 1);
            this.shopSelect.splice(k, 1);
          }
          this.selectShop[k] = [];// 清空当前选中店铺id
        }
      }
      this.actShop.group_id = null;
      this.actShop.group_index = null;
      this.actShop.shop_id = null;
      this.actShop.shop_index = null;
      this.checkedGoods = [];
      // this.selectShop = [];
      // for (let i = 0; i < this.shopSelect.length; i++) {
      // 	const arr = [];
      // 	this.$set(this.shopSelect, i, arr);
      // }
    },
    onSelectAct(index, idx) {
      let actNameArr = [];
      this.lists[idx].lists[index].shopActivityList.map(item => {
        actNameArr.push(item.name);
      });
      let _this = this;
      // uni.showActionSheet({
      // 	itemList: actNameArr,
      // 	success: function(res) {
      // 		_this.lists[index].shopAct = res.tapIndex;
      // 	},
      // 	fail: function(res) {
      // 		console.log(res.errMsg);
      // 	}
      // });
    },
    actUpDate(id, shopIndex, groupIndex) {
      var that = this;
      this.$http({
        aurl: 'cartShopAct',
        data: {
          shop_id: id,
        },
        success: res => {
          this.$set(that.lists[groupIndex].lists[shopIndex], 'shopActivityList', res.data.result);
        },
        fail: err => {
          console.log(err);
        },
      });
    },
  },
  watch: {
    // selectShop() {
    // 	if (this.selectShop.length === this.lists.length) {
    // 		this.$set(this, 'allSelect', true);
    // 	} else {
    // 		this.$set(this, 'allSelect', false);
    // 	}
    // },
    shopSelect() {
      this.initCheckGoods(); //init重置选中商品
      this.$http({
        aurl: 'cartUpdate',
        data: {
          cart_ids: this.checkedGoods,
        },
        success: res => {
          if (this.actShop.shop_id) {
            this.actUpDate(this.actShop.shop_id, this.actShop.shop_index, this.actShop.group_index);
          }
        },
      });
    },
  },
};
</script>

<style lang="stylus" scoped>
  @import '../../variable.styl'

  >>> .van-submit-bar
    bottom 88rpx
  >>> .van-submit-bar__bar
    border-top 1px solid #f2f2f2
    border-bottom 1px solid #f2f2f2
    padding 0 20rpx
    box-sizing border-box
  page
    background $page-color-base

  .container
    background $page-color-base
    height 100%
    /*padding-top 129rpx*/

    .cart
      top 0rpx
      left 0
      bottom 0
      z-index 0
      width 100%
      background-color #f4f4f4
      text-align center

      .cart-icon
        padding 15vh 0

        image
          width 200rpx
          height 200rpx

      .cart-btn
        display inline-block
        margin-top 30rpx !important

  .cart-box
    padding-bottom 16rpx

    .cart-lists
      margin-top 24rpx
      border-radius 10rpx
      background #fff

  .cart-shop
    padding-right 20rpx
    margin-left 20rpx
    background #fff

    &.group-box
      display flex
      align-items center
      height 86rpx
      border-bottom 1px solid #D7D7D7

    image
      width 34rpx
      height 30rpx
      /*border-radius 50%*/
      margin-right 20rpx

    .inner-box
      width 100%

      .box-t
        display flex
        align-items center
        justify-content space-between
        height 86rpx

        .icon-right
          font-size 30rpx
          color #333

      .box-b
        width 100%
        display flex
        align-items center
        color #333
        font-size 24rpx
        font-weight bold
        padding-left 60rpx

        .full-reduction-label
          flex-shrink 0
          color #fff
          font-size 20rpx
          border-radius 4rpx
          background linear-gradient(-90deg, #FFE81C, #FD8B05);
          padding 0 5rpx
          line-height 30rpx
          margin-right 10rpx

  >>> .van-checkbox
    margin-right 20rpx

  .goods-item
    padding 22rpx 20rpx 32rpx
    display flex
    align-items center

    .goods-content
      flex 1
      display flex

      .goods-img
        width 200rpx
        margin-right 16rpx

        image
          width 100%

      .goods-text
        flex 1
        display flex
        flex-direction column
        padding 10rpx 0
        justify-content space-between
        box-sizing border-box

        .goods-name
          font-size 24rpx
          color #333
          line-height 34rpx

        .goods-sku-box
          display flex

          align-items
          .goods-sku
            margin-right 10rpx
            height 36rpx
            line-height 36rpx
            background #F6F6F6
            border-radius 18rpx
            fonx-size 22rpx
            padding 0 17rpx

  uni-view.submit-bar
    bottom 50px

  .submit-bar
    position fixed
    bottom 0px
    left 0
    height 100rpx
    width 100%
    background #fff
    border-bottom 1px solid #f2f2f2
    box-sizing border-box

    .priceBox
      padding 0 20rpx

    .submit-btn
      width 200rpx
      background #ff4444
      color #fff
      height 100rpx
      line-height 100rpx
      text-align center

  .step-box
    display flex
    justify-content space-between
    align-items flex-end

  >>> .van-submit-bar__bar
    justify-content space-between
    padding 12rpx 20rpx

    .van-submit-bar__button
      width auto

    .van-button--square
      border-radius 16rpx

    .van-button--large
      width 100%
      height 76rpx
      line-height 76rpx
      padding 0 50rpx
      background #CF1D3B;

  .van-button--danger
    color #fff
    background-color #CF1D3B;
    border 1px solid #CF1D3B

  .van-button
    font-size 30rpx

  >>> .van-submit-bar__text
    flex none
    font-size 30rpx
    color #333

    .van-submit-bar__price
      font-size 30rpx
      color #333333

  .cartHead
    height 80rpx

  .cart-edit
    position fixed
    /*top 129rpx*/
    width 100%
    left 0
    z-index 99
    padding 0 20rpx
    height 80rpx
    background #fff
    border-bottom 1px solid #f8f8f8
    box-sizing border-box

    .addr-location
      .icon-location
        width 30rpx
        height 30rpx
        vertical-align middle
        margin-right 10rpx

      .addr
        font-size 26rpx
        color #333
        font-weight bold

  uni-view.cartHead
    top 44px

  .delectBox
    height 100rpx
    position fixed
    bottom 0
    left 0
    background #fff
    padding 0 20rpx
    box-sizing border-box
    width 100%
    border-top 1px solid #f2f2f2
    border-bottom 1px solid #f2f2f2
    z-index 9999
    justify-content flex-end

    >>> .van-button--small
      min-width 70px
      width auto
      height 76rpx
      padding 0 50rpx
      line-height 76rpx
      border 0
      color #fff
      font-size 30rpx
      background #CF1D3B
      border-radius 16rpx

  >>> .van-checkbox__label
    font-size 32rpx
</style>
