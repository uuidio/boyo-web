<template>
	<view class="m-md p-md bc-fff border-radius5px" v-if="show">
		<view class="mb-md group-item pb-md fxBox" @tap="toGoodsDetail(detail.Group.goods_id)">
			<view class="group-img mr-md"><image mode="widthFix" :src="detail.Group.goods_image"></image></view>
			<view class="fx1 group-text">
				<view>
					<view class="line2-p text-16" data-line="1">{{ detail.Group.goods_name }}</view>
					<view class="col-666 text-sm" v-if="detail.Group.spec_sign">规格：{{ detail.Group.spec_sign }}</view>
					<view class="count text-sm">
						<text class="emfont icon-hotfill mr-xs"></text>
						<text>{{ detail.Group.count_group }}已拼团</text>
					</view>
				</view>
				<view>
					<view>
						<text>拼团价：</text>
						<text class="col-red">
							￥
							<text class="text-18">{{ detail.Group.group_price }}</text>
						</text>
					</view>
					<view class="col-666 text-sm">
						原价：
						<text class="del-text">￥{{ detail.Group.price }}</text>
					</view>
				</view>
			</view>
		</view>
		<view class="group-time">
			<view v-if="detail.GroupOrder.status === 1">
				<view class="text-center mb-md">
					还剩：
					<uni-countdown :second="getTime(detail.GroupOrder.end_time)" @timeup="timeUp"></uni-countdown>
				</view>
				<view class="text-center mb-md">
					还差
					<text class="col-red">{{ detail.GroupOrder.group_number - detail.GroupOrder.group_count }}人</text>
					拼团成功
				</view>
			</view>
			<view v-else-if="detail.GroupOrder.status === 2" class="text-center mb-md col-666 group-tip">
				<icon type="success" size="42"/>
				<view class="col-666">拼团成功!</view>
			</view>
			<view v-else class="group-tip text-center">
				<icon type="warn" size="42"/>
				<view class="col-666">拼团失败，该团已失效!</view>
			</view>
			<view class="userImgBox">
				<view class="userImg" v-for="(imgItem, index) in detail.GroupOrder.group_users">
					<image :src="imgItem.wechat_head_img"></image>
				</view>
				<view class="group-icon" v-if="detail.GroupOrder.status === 1">
					<image src="../../static/images/adduser.png"></image>
				</view>
				<view class="group-icon" v-if="detail.GroupOrder.status === 1 && detail.GroupOrder.group_number - detail.GroupOrder.group_count > 1">
					<image src="../../static/images/adduser.png"></image>
				</view>
			</view>
			<view v-if="btnClick">
				<button @tap="showSkuMedal" class="submitBtn text-md">我要参团</button>
			</view>
			<view class="btn-box">
				<button v-show="!btnClick" @tap="toGoodsDetail(detail.Group.goods_id)" class="submitBtn text-md">发起拼团</button>
				<button @tap="toNav('/pages/index/index')" class="submitBtn text-md outlined">去逛逛</button>
			</view>
		</view>
    <tui-bottom-popup :show="popupShow" @close="hidePopup">
      <view class="tui-popup-box">
        <view class="tui-product-box tui-padding">
          <image :src="skuImgUrl?skuImgUrl:goodsSkuItem.goods_image" class="tui-popup-img"></image>
          <view class="tui-popup-price">
            <view class="tui-amount tui-bold">
              {{`￥${goodsSkuItem.goods_price}`}}
              <text class="pin-logo" v-if="goodsSkuItem.group_activty_id&&!disableBtn">拼</text>
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
          <tui-numberbox :min="1" :value="value" @change="change" ></tui-numberbox>
        </view>
        <view>
          <button :disabled="disableBtn" class="goods-det-btn" @tap="submitOrder">
            <view>
              立即购买
            </view>
          </button>
        </view>
        <view class="tui-icon tui-icon-close-fill tui-icon-close" style="color: #999;font-size:20px" @tap="hidePopup"></view>
      </view>
    </tui-bottom-popup>
	</view>
</template>

<script>
import tool from '../../static/base/toolFun.js';
import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';
import tuiBottomPopup from '../../components/bottom-popup/bottom-popup';
import tuiNumberbox from '../../components/numberbox/numberbox';
export default {
	mixins: [],
	components: {
		uniCountdown,
    tuiBottomPopup,
    tuiNumberbox
	},
	data() {
		return {
			downSecond: 0,
			btnClick: false,
			detail: {},
			show: false,
			bn: 0,
      goods_id:'',
      sku:[],
      skuKey:'',
      skuSelect:[],
      skuLists:[],
      goodsSkuItem:{},
      value:1,
      groupDetail:{},
      allGroupSkuName:[],
      popupShow:false,
      skuIndex:0,
      disableBtn:false,
      skuImgs:[],
      skuImgUrl:''
		};
	},
  onShow(){
	  if(this.bn){
      this.getGroupDetail(this.bn);
    }
  },
	onLoad: function(options) {
		this.bn = options.groups_bn;
	},
	methods: {
    hidePopup() {
      this.popupShow = false;
    },
    showSkuMedal(){
      this.popupShow = true
    },
    change: function(e) {
      this.value = e.value;
    },
    skuActive(index, sonIndex, item) {
      const colorIndex = this.groupDetail.spec_name.indexOf('颜色');
      if(colorIndex===index){
        if(this.skuImgs[sonIndex]&&this.skuImgs[sonIndex].length>0){
          this.skuImgUrl =this.skuImgs[sonIndex][0].url
        }
      }
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
        if(this.skuIndex ===-1){
          this.disableBtn = true;
          this.showAlert('该规格未参与拼团，请选择其他商品规格')
        }else{
          this.disableBtn = false
        }
        this.goodsSkuItem = this.groupDetail.group_spec_list[this.skuIndex];
        this.value = 1;
      }
    },
    initSku() {
      this.sku = [];
      this.skuKey = '';
      this.skuSelect = [];
      this.goodsSkuItem = this.groupDetail.group_spec_list[0];
      this.value = 1;
      if (this.groupDetail.goods_spec === null) {
        return;
      }
      for (let i = 0; i < this.groupDetail.spec_name.length; i++) {
        let obj = {
          title: '',
          lists: [],
          active: -1
        };
        obj.title = this.groupDetail.spec_name[i];
       if(this.groupDetail.goods_spec[i].value){
         for (let j = 0; j < this.groupDetail.goods_spec[i].value.length; j++) {
           obj.lists.push(this.groupDetail.goods_spec[i].value[j]);
         }
       }else{
         for (let j = 0; j < this.groupDetail.goods_spec[i].length; j++) {
           obj.lists.push(this.groupDetail.goods_spec[i][j]);
         }
       }

        if(this.groupDetail.spec_name[i]==='颜色'){
          if(this.groupDetail.goods_spec[i].imgs){
            this.skuImgs = this.groupDetail.goods_spec[i].imgs
          }
        }
        if(obj.lists.length>0){
          this.sku.push(obj);
        }
        this.skuSelect.push('占位');
      }
      this.skuLists = this.groupDetail.group_spec_list.map((item) =>{
        return item.spec_sign
      });
    },
    getAgentType(){
      this.$http({
        aurl: 'applyCheck',
        success: res => {
          if(res.data.result.partner_info.is_purchaser===1&&res.data.result.partner_info.purchaser_status===1){
            this.show = true;
          }else{
            this.showAlert('该商品需要采购员查看权限，2s后将为您跳转首页');
            setTimeout(()=>{
              this.toNav('/pages/index/index')
            },2000)
          }
        },
        fail: error => {
          console.log(error);
        },
        complete:res=>{
        }
      });
    },
    getSku(){
      this.$http({
        aurl: 'groupDetail',
        params: {
          id:this.goods_id,
        },
        success: res => {
          this.groupDetail = res.data.result;
          this.allGroupSkuName = [];
          this.groupDetail.group_spec_list.map(item=>{
            if(item.goods_spec){
              item.goods_spec.map(skuItem=>{
                this.allGroupSkuName.push(skuItem)
              })
            }
          });
          this.initSku();
          if(this.groupDetail.shop.id === 88888){
            const token = uni.getStorageSync('user_token');
            if(token){
              this.getAgentType();
            }else{
              this.toLink('/pagesB/user/bindUser');
              return false
            }
          }else{
            this.show = true;
          }
        },
        fail: error => {
        },
        complete:res=>{
        }
      });
    },
		submitOrder() {
      if (this.skuSelect.indexOf('占位') !== -1) {
        uni.showToast({
          title: '请选择完商品规格',
          icon: 'none'
        });
        return;
      }
			const _this = this;
			const data = {
				actSign: 'is_group',
				activity_id:this.goodsSkuItem.group_activty_id,
				quantity: this.value,
				type: 'fastbuy',
				groups_bn: this.bn,
				sku_id: this.goodsSkuItem.id
			};
			this.$http({
				aurl: 'addCart',
				data: data,
				success: res => {
					uni.setStorage({
						key: 'type',
						data: 'fastbuy',
						success: function() {
							_this.needTokenLink('/pagesA/checkout/index');
						}
					});
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
		timeUp() {
			uni.showToast({
				title: '活动结束,下次早点来',
				icon: 'none'
			});
			this.btnClick = false;
		},
		getTime(time) {
			let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
			let end_time = tool.toTimeStamp(time) / 1000;
			return end_time - now_time;
		},
		getGroupDetail(bn) {
			this.$http({
				aurl: 'groupGoodsGroup',
				params: {
					groups_bn: bn
				},
				success: res => {
					this.detail = res.data.result;
					this.goods_id = this.detail.Group.goods_id;
					if (this.detail.GroupOrder.status === 1) {
						this.btnClick = true;
					}
					this.getSku()
				},
				fail: error => {
					uni.showModal({
						title: '温馨提示',
						content: '该拼团活动已经失效，无法参与拼团，请联系客服',
						confirmText: '知道了',
						showCancel: false,
						success: res => {
							uni.switchTab({
								url: '/pages/index/index'
							});
						}
					});
				}
			});
		}
	},
	mounted() {}
};
</script>

<style scoped lang="stylus">
  >>>.uni-countdown
    justify-content center!important
  .goods-det-btn
    height 70rpx
    width 80%
    background #f5222d
    border-radius 20rpx
    color #fff
    position absolute
    bottom 15rpx
    left 10%
    line-height 70rpx
  .pin-logo
    padding 0rpx 6rpx
    background #ffb369
    color #ffffff
    margin-left 10rpx
    font-size 24rpx
  .tui-padding
    padding 0 30rpx
    box-sizing border-box
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
.group-item
	border-bottom 1px solid #e7e7e7
	.group-img
    display flex
    align-items center
    width 210rpx
		image
			width 100%
			border-radius 10rpx
	.group-text
		display flex
		flex-direction column
		justify-content space-between
		padding 10rpx 0
		.count
			background #fff0f0
			color #E64340
			border-radius 4rpx
			display inline-block
			margin-top 10rpx
			padding 0 10rpx
.group-time
	padding 70rpx 90rpx 40rpx
	>>>.uni-countdown__number
		background #e64340 !important
		color #fff !important
		border none !important
.submitBtn
	width 100%
	height 80rpx
	line-height 80rpx
	background #e64340
	color #ffffff
	border-radius 10rpx
	margin-bottom 30rpx
.userImgBox
	display flex
	justify-content center
	width 335rpx
	margin 70rpx auto
	flex-wrap wrap
	text-align center
	image
		margin-top 25rpx
	.userImg
		margin-right 20rpx
		image
			display block
			height 90rpx
			width 90rpx
			border-radius 50%
			border 2px solid #e64340
			box-sizing border-box
	.group-icon
		image
			height 90rpx
			width 90rpx
			border-radius 50%
			margin-right 20rpx

.btn-box
	button
		&:nth-child(2)
			background #fff
			color #e64340
			border 1px solid #e64340

.group-tip
	padding-right 25rpx
	.col-666
		margin-top 10rpx
		font-size 28rpx
</style>
