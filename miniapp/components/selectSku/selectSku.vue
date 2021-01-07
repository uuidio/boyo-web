<template>
  <view>
    <tui-bottom-popup :show="showPopup" @close="hidePopup">
     <view class="tui-popup-box">
        <view class="tui-product-box tui-padding">
          <image :src="skuImgUrl ? skuImgUrl : goodsSkuItem.goods_image" class="tui-popup-img"></image>
          <view class="tui-popup-price">
            <view class="tui-amount tui-bold">
              <block v-if="isIntegral">
                <text v-if="detail.goods_price == 0">{{ point }}积分</text>
                <text v-else>￥{{ detail.goods_price }}+{{ point }}积分</text>
              </block>
              <block v-else>
                ￥{{ goodsSkuItem.goods_price }}
                <text class="pin-logo" v-if="goodsSkuItem.group_activty_id">拼</text>
              </block>
            </view>
            <view class="tui-number col-666">库存：{{ goodsSkuItem.goods_stock}}</view>
          </view>
        </view>
        <scroll-view scroll-y class="tui-popup-scroll" v-if="sku.length !== 0">
          <view class="tui-scrollview-box" v-for="(item, index) in sku" :key="index">
            <view>
              <view class="tui-bold tui-attr-title">{{ item.title }}</view>
              <view class="tui-attr-box">
                <view
                  :key="sonIndex"
                  @tap="skuActive(index, sonIndex, itemSon)"
                  :class="{ 'tui-attr-item': true, 'tui-attr-active': item.active === sonIndex ? true : false }"
                  v-for="(itemSon, sonIndex) in item.lists"
                >
                  {{ itemSon }}
                </view>
              </view>
            </view>
          </view>
        </scroll-view>
        <view class="tui-number-box tui-bold tui-attr-title">
          <view class="tui-attr-title">数量</view>
          <tui-numberbox :min="1" :value="numberValue" @change="change"></tui-numberbox>
        </view>
        <view class="tui-operation tui-operation-right tui-right-flex tui-popup-btn">
          <button class="selectGoodsOkBtn mb-md mt-md" :disabled="goodsStocks == 0 ? true : false" @click="payClick('cart')">{{goodsStocks == 0 ? '商品已售罄' : '选好了'  }}</button>
        </view>
        <view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
      </view>
    </tui-bottom-popup>
  </view>
</template>

<script>
import tuiBottomPopup from '../bottom-popup/bottom-popup';
import tuiNumberbox from '../numberbox/numberbox';
export default {
  name: 'selectGoods',
  components: {
    tuiBottomPopup,
    tuiNumberbox
  },
  props: {
    // detail: Object,
    goodsId: [Number,String],
    value: Boolean
  },
  watch:{
    value(bool) {
      this.showPopup = bool
    },
    showPopup(bool) {
      this.$emit('input',this.showPopup)
    },
    goodsId(gods_id) {
      this.getGoodsDetail([gods_id])
    },
    detail(v) {
      console.log(v);
    	this.initSku();
    }
  },
  data() {
    return {
      detail:{},
      showPopup: false,
      goodsSkuItem: {},
      sku: [],
      skuKey: '',
      skuSelect: [],
      skuImgUrl:'',
      numberValue: 1,
      skuImgs:[],
      
      goodsLoading:false,
      groups: [],
      skuLists: [],
      isSeckill: false,
      isGroup: false,
      isIntegral: false,
      isVirtual: false,
      point: 0,
      group_id: 0,
      groupsNum: 0,
      payTypeGroup:true,
      skuIndex:0,
      goodsStocks: 0
    };
  },
  methods:{
    payClick(type,groupType) {
    	let token = uni.getStorageSync('user_token');
    	if (!token) {
    		this.toLink('/pagesA/user/bindUser');
    		return;
    	}
    	if (this.skuSelect.indexOf('占位') !== -1) {
    		uni.showToast({
    			title: '请选择完商品规格',
    			icon: 'none'
    		});
    		return;
    	}
      if(groupType){
        this.group_id = 0
      }else{
        if(this.isGroup){
          console.log(this.goodsSkuItem);
          this.goodsSkuItem = this.detail.group_spec_list[this.skuIndex]
          if(this.goodsSkuItem.group_activty_id){
            this.group_id = this.goodsSkuItem.group_activty_id
          }
        }
      }
    	let data = {
    		quantity: this.numberValue,
    		type: type,
    		sku_id: '',
        is_checked: 1
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
      console.log(type, data);
    	this.addCart(type, data);
    	this.showPopup = false;
    	this.initSku();
    },
    addCart(type, data) {
    	this.$http({
    		aurl: 'addCart',
    		data: data,
    		success: res => {
    			if (type === 'cart') {
    				uni.showToast({
    					title: '加入购物车成功'
    				});
            this.$emit('addCartOK')
    				// this.getCartNum()
    			} else {
    				const _this = this;
    				uni.setStorage({
    					key: 'type',
    					data: 'fastbuy',
    					success: function() {
    						_this.needTokenLink('/pagesA/checkout/index');
    					}
    				});
    			}
    		},
    		fail: error => {
    			uni.showToast({
    				title: error.message.msg,
    				icon: 'none'
    			});
    			console.log(error);
    		}
    	});
    },
    hidePopup() {
    	this.showPopup = false;
    },
    change(e) {
    	this.numberValue = e.value;
    },
    getGoodsDetail(idArr) {
      uni.showLoading({
        title: '加载中'
      });
    	this.$http({
    		aurl: 'getGoodsDetail',
    		aPath: idArr,
    		success: res => {
    			this.detail = res.data.result;
          /* 商品库存总数 */
          this.goodsStocks = 0
          this.detail.spec_list.forEach(item=>{
            this.goodsStocks += Number(item.goods_stock)
          })
          /* 商品库存总数end */
    			this.isSeckill = res.data.result.is_sec_kill == 1 ? true : false;
    			this.isGroup = res.data.result.is_group == 1 ? true : false;
          this.isVirtual = res.data.result.is_virtual == 1 ? true : false;
          uni.hideLoading()
          this.goodsLoading = true
          this.showPopup = true;
    		},
    		fail: error => {
    			console.log(error);
    		}
    	});
    },
    getGroupOrder() {
    	this.$http({
    		aurl: 'groupGoodsOrder',
    		params: {
    			id: this.goodId
    		},
    		success: res => {
    			this.groups = res.data.result.list;
    			this.groupsNum = res.data.result.now_join_group;
    		},
    		fail: error => {
    			console.log(error);
    		}
    	});
    },
    skuActive(index, sonIndex, item) {
      const colorIndex = this.detail.spec_name.indexOf('颜色')
      if(colorIndex===index){
        if(this.skuImgs[sonIndex]&&this.skuImgs[sonIndex].length>0){
          this.skuImgUrl =this.skuImgs[sonIndex][0].url
        }
        console.log(this.skuImgUrl)
      }
    	this.sku[index].active = sonIndex;
    	this.skuSelect[index] = item;
      console.log(this.sku,this.skuSelect);
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
    		// if(this.isGroup && this.payTypeGroup){
    		if(this.isGroup ){
          this.goodsSkuItem = this.detail.group_spec_list[this.skuIndex];
        }else{
          this.goodsSkuItem = this.detail.spec_list[this.skuIndex];
        }
    		if (this.goodsSkuItem.group_activty_id) {
    			this.group_id = this.goodsSkuItem.group_activty_id;
    		} else {
    			this.group_id = 0;
    		}
    		this.numberValue = 1;
    	}
    },
    initSku() {
    	this.sku = [];
    	this.skuKey = '';
    	this.skuSelect = [];
    	if(this.isGroup){
        const GroupArr = this.detail.group_spec_list.filter((item)=>item.group_activty_id);
        this.goodsSkuItem = GroupArr[0]
        console.log(this.goodsSkuItem)
        this.group_id = this.goodsSkuItem.group_activty_id;
      }else{
        this.goodsSkuItem = this.detail.spec_list[0];
      }
    	this.numberValue = 1;
    	if (this.detail.goods_spec === null) {
    		return;
    	}
    	for (let i = 0; i < this.detail.spec_name.length; i++) {
    		let obj = {
    			title: '',
    			lists: [],
    			active: -1
    		};
    		obj.title = this.detail.spec_name[i];
    
    		//判断是改版前SKU还是改版后SKU
    		if(this.detail.goods_spec[i].value){
          for (let j = 0; j < this.detail.goods_spec[i].value.length; j++) {
            obj.lists.push(this.detail.goods_spec[i].value[j]);
          }
        }else{
          for (let j = 0; j < this.detail.goods_spec[i].length; j++) {
            obj.lists.push(this.detail.goods_spec[i][j]);
          }
        }
    
        if(this.detail.spec_name[i]==='颜色'){
          if(this.detail.goods_spec[i].imgs){
            this.skuImgs = this.detail.goods_spec[i].imgs
          }
        }
    		this.sku.push(obj);
    		this.skuSelect.push('占位');
    	}
      for (let i = 0; i < this.detail.spec_list.length; i++) {
    		this.skuLists.push(this.detail.spec_list[i].spec_sign);
    	}
      console.log(this.goodsSkuItem);
    },
  }
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'
.selectGoodsOkBtn[disabled]
  background #DC372F
  opacity 0.5
  color #fff
.selectGoodsOkBtn
  width 702rpx
  height 98rpx
  line-height 98rpx
  text-align center
  border-radius 10rpx
  background #DC372F
  color #fff

/* 底部选择弹层 */
.tui-popup-class
  border-top-left-radius 24rpx
  border-top-right-radius 24rpx
  padding-bottom env(safe-area-inset-bottom)
.tui-popup-box
  position relative
  z-index 100001
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
</style>
