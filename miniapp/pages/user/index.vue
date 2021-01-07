<template>
	<view style="padding-bottom: 88rpx;">
		<view class="container" v-if="showUser">
			<view class="user-section">
			<view class="user_center">
				<view class="user-header" @click="isLogin">
							<image class="portrait" :src="userInfo.avatarUrl || 'https://lanlnk-dev.oss-cn-shenzhen.aliyuncs.com/images/user/avatar.png'"></image>
							<view v-if="userInfo.nickname || userInfo.nickName || userInfo.mobile" class="info-box">
								<view class="username">{{ userInfo.nickname || userInfo.nickName || userInfo.mobile || '游客' }}</view>
								<view class="col-ccc text-sm ml-md mt-sm" v-if="userInfo.user_id">查看并修改资料<text class="iconfont icon-right text-xs"></text></view>
							</view>
				      <view v-else class="no-login text-l">登录</view>
			    </view>
                <view class="user_code">
				  <view class="user_good" @tap="gotoMyCoupon">
					  <view class="user_count">{{userInfo.coupon ? userInfo.coupon : 0}}</view>
					  <view class="user_recode">优惠券</view>
				  </view>
				  <view class="user_shop" @tap="toFavorite(0)">
					  <view class="user_count">{{userInfo.favorite||0}}</view>
					  <view class="user_recode">收藏</view>
				  </view>
				</view>
			</view>
				<view class="vip-card-box" @click="gotoCards">
					<image class="card-bg" :src="userInfo.card_img === '' ? imgArrs[0] : userInfo.card_img"></image>
					<view class="user-card-info text-md">
						<view class="user-card-box">
							<view class="col-fff text-sm ml-md mt-sm">{{ userInfo.card_name }}</view>
							<view class="col-fff text-sm ml-md mt-sm">{{ userInfo.gm_name }}</view>
						</view>
					</view>
				</view>
			</view>
			<view
				class="cover-container"
				:style="[
					{
						transform: coverTransform,
						transition: coverTransition
					}
				]"
				@touchstart="coverTouchstart"
				@touchmove="coverTouchmove"
				@touchend="coverTouchend"
			>
				<image class="arc" src="https://lanlnk-dev.oss-cn-shenzhen.aliyuncs.com/images/user/arc.png"></image>
				<!-- <view class="tj-sction">
					<view
						class="tj-item"
						@tap="
							needTokenQueryLink('/pagesA/user/point', {
								point: userInfo.point
							})
						"
					>
						<text class="num">{{ userInfo.point || 0 }}</text>
						<text>积分</text>
					</view>
					<view @tap="needTokenLink('coupon')" class="tj-item">
						<text class="num">{{ userInfo.coupon || 0 }}</text>
						<text>优惠券</text>
					</view>
					<view class="tj-item" @tap="toFavorite">
						<text class="num">{{ userInfo.favorite || 0 }}</text>
						<text>关注</text>
					</view>
				</view> -->
				<!-- 订单 -->
				<view class="bc-fff mt-lg border-radius5px">
					<view class="slice-t-one p-md">
						<text class="t-left text-lg text-bold">我的订单</text>
						<text class="t-right text-sm text-light" @click="toOrder">
							查看全部订单
							<text class="iconfont icon-right text-xs"></text>
						</text>
					</view>
					<view class="order-section">
						<view
							class="order-item"
							@tap="
								needTokenQueryLink('/pagesA/user/order/lists', {
									active: 1
								})
							"
						>
							<view class="order-num" v-if="trade_num.by_unpay && trade_num.by_unpay > 0">{{ trade_num.by_unpay }}</view>
							<text class="iconfont icon-pay text-xl text-primary mb-xs"></text>
							<text>待付款</text>
						</view>
						<view
							class="order-item"
							@tap="
								needTokenQueryLink('/pagesA/user/order/lists', {
									active: 2
								})
							"
						>
							<view class="order-num" v-if="trade_num.by_send && trade_num.by_send > 0">{{ trade_num.by_send }}</view>
							<text class="iconfont icon-send text-xl text-primary mb-xs"></text>
							<text>待发货</text>
						</view>
						<view
							class="order-item"
							@tap="
								needTokenQueryLink('/pagesA/user/order/lists', {
									active: 3
								})
							"
						>
							<view class="order-num" v-if="trade_num.by_confirm && trade_num.by_confirm > 0">{{ trade_num.by_confirm }}</view>
							<text class="iconfont icon-deliver text-xl text-primary mb-xs"></text>
							<text>待收货</text>
						</view>
						<view
							class="order-item"
							@click="
								needTokenQueryLink('/pagesA/user/order/lists', {
									active: 4
								})
							"
						>
							<view class="order-num" v-if="trade_num.by_evaluate">{{ trade_num.by_evaluate }}</view>
							<text class="iconfont icon-comment text-xl text-primary mb-xs"></text>
							<text>待评价</text>
						</view>
						<view @tap="needTokenQueryLink('/pagesA/user/order/aftersalesLists')" class="order-item">
							<text class="iconfont icon-refund text-xl text-primary mb-xs"></text>
							<text>退款/售后</text>
						</view>
					</view>
				</view>
				<view class="my_assets">
          <view class="ac_title">我的服务</view>
					<view class="ac_list">
						<view class="ac_item" @tap="toGeneralize">
							<view class="item_count"><view class="item_img"><image src="https://egoss1.ytholidayplaza.com/images/default/202005/13/BVAeIl8WGTLQMUPRPYh1BE99h74gSrObARnuZAwK.png"/></view></view>
							<view class="item_name">我来推广</view>
						</view>
            <view class="ac_item" @tap="toSetting">
              <view class="item_count"><view class="item_img"><image src="https://egoss1.ytholidayplaza.com/images/default/202008/03/fhdjeTWPXtuHTmnm9T6i61J003cblLwYCVlC1wDV.png"/></view></view>
              <view class="item_name">设置</view>
            </view>
					</view>
					<view class="ac_list">
					</view>
				</view>
				<view class="mt-lg" v-if="bannerUrl"><image :src="bannerUrl" mode="widthFix" style="width:100%"></image></view>
			</view>
		</view>

		<!-- 完善会员信息相关 -->
		<van-dialog use-slot asyncClose :show="perfectInfoShow" customStyle="border-radius: 14rpx" :showConfirmButton="false" :show-cancel-button="false">
			<view class="perfectInfo">
				<view class="title">
					<view class="title_h2">完善会员信息</view>
					<view class="title_p">尊敬的会员，为了提供更好的服务，最新促销等福利，请您完善您的会员信息，以便我们联系到您！</view>
				</view>
				<view class="main">
					<view class="cell-group">
						<van-field
							:value="perfectInfo.real_name"
							@blur="nameValue"
							placeholder="请填写您的真实姓名"
							placeholder-style="text-align: right;"
							input-align="right"
							required
							label="姓名"
							border
						/>
						<van-cell
							title="性别"
							required
							@click="() => (sexShow = true)"
							:value="perfectInfo.sex == 0 ? '保密' : perfectInfo.sex == 1 ? '男' : perfectInfo.sex == 2 ? '女' : '请选择'"
							is-link
						/>
						<van-cell title="出生日期" @click="() => (timeShow = true)" required :value="perfectInfo.birthday" is-link />
						<van-field
							:value="perfectInfo.email"
							@blur="emailValue"
							placeholder="请输入"
							placeholder-style="text-align: right;"
							input-align="right"
							label="电子邮箱"
							border
						/>
					</view>
					<van-button custom-style="margin:0 auto;width:550rpx;height:78rpx;background:#FF4A41;" round block type="danger" @click="setPerfectInfo">确定并继续</van-button>
				</view>
			</view>
		</van-dialog>
		<!-- 性别选择 -->
		<van-action-sheet :z-index="999999" :show="sexShow" :actions="actions" cancel-text="取消" @select="onSelect" @click-overlay="cancelModel" @cancel="cancelModel" />
		<!-- 日期选择 -->
		<van-popup :show="timeShow" :z-index="999999" position="bottom">
			<!-- :formatter="formatter" -->
			<van-datetime-picker type="date" :value="currentDate" @confirm="onPerfectInfoTime" @cancel="() => (timeShow = false)" :min-date="minDate" />
		</van-popup>

		<!--客服二维码-->
		<van-popup :show="showCode" :z-index="999999" class="code-popup" @click-overlay="() => (showCode = false)">
			<view class="icon-close-box">
				<text class="iconfont icon-close" @click="closeCodePopup"></text>
			</view>
			<view class="popup-tit">{{qrCode ? '添加客服为微信好友' : '联系客服'}}</view>
			<view class="qr-code-box" v-if="qrCode">
				<image :src="qrCode" class="qr-code-img" mode="widthFix" @tap="ViewImage"></image>
			</view>
			<view class="popup-label" v-if="qrCode">扫一扫添加在线客服</view>
			<view class="cs-mobile" @click="callCs" v-if="tel">客服电话：{{tel}}</view>
		</van-popup>

		<view v-if="classifyList.length > 0">
			<recommendGoods :listsData="recommendList" :classifyList="classifyList" title="为你推荐" @changeClassify="handleChangeClassify"></recommendGoods>
			<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
		</view>
		<tui-modal :fxTop="35" :show="commissionShow" initBackgroung="#000" :custom="true" @cancel="commissionShow=false">
			<view class="text-center col-fff mb-md text-16">佣金提醒</view>
			<view class="pl-lg pr-lg">
				<view class="mb-md">
					<view class="col-fff fxBox1">
						<text class="commissionStep">1</text>勾选最底部的
					</view>
					<view class="mt-sm step-check fxBox1">
						<text style="color:#2b9939" class="emfont text-18 icon-roundcheckfill mr-sm"></text><text>总是保持以上选择，不再询问</text>
					</view>
				</view>
				<view class="mb-md">
					<view class="col-fff fxBox1">
						<text class="commissionStep">2</text>点击“允许”按钮
					</view>
					<view class="mt-sm step-btn text-sm">
						允许
					</view>
				</view>
				<view class="col-fff text-sm text-center">设置成功后每次进入推广中心会记录佣金到账提醒次数</view>
			</view>
		</tui-modal>
    <tab-bar class="tab-bar-fixs" ref="tabbar" v-if="tabShow" :actives='tabActive'></tab-bar>
	</view>
</template>

<script>
import uniGrid from '@dcloudio/uni-ui/lib/uni-grid/uni-grid.vue';
import uniGridItem from '@dcloudio/uni-ui/lib/uni-grid-item/uni-grid-item.vue';
import redirect from '../../mixins/redirect.js';
import cartNum from '../../mixins/cartNum';
import wallet from "../../mixins/wallet";
import mta from '../../mixins/mta';
import { config } from '../../static/base/server2.js';
import toolFun from '../../static/base/toolFun';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import recommendGoods from '../../components/lists/recommendGoods';
import tuiModal from '../../components/modal/modal1';
import tabBar from '../../components/tabbar/tabbar.vue';
import {
	showTuisong,
	getSubscribe
} from '../../static/base/util.js'

let startY = 0,
	moveY = 0,
	pageAtTop = true;
const imgArrs = [config.img_base_url + 'card1.png', config.img_base_url + 'card2.png', config.img_base_url + 'card3.png', config.img_base_url + 'card4.png'];
export default {
	name: 'UserIndex',
	mixins: [redirect, cartNum, mta, wallet],
	components: {
		uniGrid,
		uniGridItem,
		uniLoadMore,
		recommendGoods,
		tuiModal,
    tabBar
	},
	data() {
		return {
      tabActive:4,
      tabShow:true,//tabBar显示隐藏
			firstUse: true,
			modelFlag:false,
			orderTemid:{
			},
			is_partner_role:0,
			apply_status: '',
			commissionShow:false,
			currentClassify: '',
			classifyList:[],
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
			loadStatus: 'loading',
			recommendList: [],
			loadMore: {
				current: 1,
				last: 1,
				flat: false
			},
			qrCode: '',
			showCode: false,
			imgArrs,
			imgSrc: '',
			coverTransform: 'translateY(0px)',
			coverTransition: '0s',
			moving: false,
			userInfo: {},
			showUser: false,
			trade_num: {},
			bannerUrl: '',
			tel: '',
			perfectInfoShow: false,
			perfectInfo: {
				real_name: '',
				sex: '请选择',
				birthday: '请选择',
				email: ''
			},
			sexShow: false,
			timeShow: false,
			currentDate: new Date().getTime(),
			minDate: toolFun.toTimeStamp('1900-01-01'),
			actions: [
				// {
				// 	name: '保密',
				// 	value: 0
				// },
				{
					name: '男',
					value: 1
				},
				{
					name: '女',
					value: 2
				}
			]
		};
	},
	mounted() {},
	created() {
		// this.getUserSetting()
	},
	onLoad() {
    uni.hideTabBar()
  },
	onShow() {
		const token = uni.getStorageSync('user_token');
    this.getCartNum();
    if (token) {
			this.getUserInfo();
			// this.getType();
		} else {
			this.userInfo = {};
			this.trade_num = {};
			this.showUser = true;
		}
		this.getUserBanner();
		this.getShopTel();
		this.getServiceQr();
		this.getClassify()
	},
	onReachBottom() {
		if (this.loadMore.flat) return;
		this.loadStatus = 'loading';
		setTimeout(() => {
			if (this.recommendList.length !== 0) {
				this.loadMore.current++;
			}
			this.getRecommend()
		}, 500);
	},
	methods: {
    getCartNum() {
      if(this.$refs.tabbar){
        this.$refs.tabbar.initCartNumber()
      }
    },
		toWallet(){ // 跳转钱包
			if (JSON.stringify(this.userInfo) === '{}') {
				uni.navigateTo({
					url: '/pagesA/user/bindUser'
				});
			} else { // 判断是否第一次使用钱包
				this.hasPayPassword();

			}
		},

		toApplets(){ // 跳转小程序
			this.customTo(
				{
					urlType: 'xiaochengxu',
					valueid: 'wx5a7bd5068d2ab421',
					value: 'pagesA/user/order/lists'
				}
			)
		},
		getMySetting(tem){
			console.log(tem)
			const _this = this
			uni.getSetting({
				withSubscriptions:true,
				success(res) {
					if(res.subscriptionsSetting&&res.subscriptionsSetting.itemSettings){
						const setItems = res.subscriptionsSetting.itemSettings
						console.log(setItems)
						if(setItems[tem]){
							_this.modelFlag = false
						}else{
							_this.modelFlag = true
						}
					}else{
						_this.modelFlag = true
					}
					console.log( _this.modelFlag)
				}
			})
		},
		getGoodsTemId(params){
			this.orderTemid =  params
			if(this.orderTemid.temids.length>0){
				this.getMySetting(this.orderTemid.temids[0])
			}
		},
		getType(){
			this.$http({
				aurl: 'applyCheck',
				success: res => {
					this.apply_status = res.data.result.apply_status
					if(res.data.result.partner_info){
						this.is_partner_role = res.data.result.partner_info.partner_role
					}
					if(this.apply_status==1){
							getSubscribe(1,this.getGoodsTemId)
					}
				},
				fail: error => {
					console.log(error);
				},
				complete:res=>{
				}
			});
		},
		toGeneralize(){
			if(this.apply_status==1){
				showTuisong(this.orderTemid.temids,this.orderTemid.setids,'您尚未开启推广订单订阅消息推送权限，请打开勾选订阅消息权限',this.commissionCallback)

				setTimeout(()=>{
					this.commissionShow = this.modelFlag
				},800)
			}else{
				this.needTokenLink('/pagesB/user/generalize/index')
			}
		},
		commissionCallback(){
			this.commissionShow = false
			this.needTokenLink('/pagesB/user/generalize/index')
		},
		callCs() { // 打电话给客户
				wx.makePhoneCall({
				phoneNumber: ''+this.tel,
				success:function(){
					console.log('拨打成功')
				},
				fail:function(){
					console.log('拨打失败')
				}
			})
		},
		getClassify() {
			let that = this
			this.$http({
				aurl: 'getClassify',
				data: {
					pages:'member'
				},
				success: res => {
					that.classifyList = []
					if(res.data.code == 0){
						for(let i = 0; i < res.data.result.length; i++){
							if(i === 0){
								res.data.result[i].active = true
								that.currentClassify = res.data.result[i].id
							} else {
								res.data.result[i].active = false
							}
							that.classifyList.push(res.data.result[i])
						}
					}
				},
				error: err => {
					console.log(err);
				}
			});
		},
		handleChangeClassify(index){
			for(let i = 0; i < this.classifyList.length; i++){
				if(i === index){
					if(this.classifyList[i].active){
						return false;
					} else {
						this.classifyList[i].active = true;
						this.currentClassify = this.classifyList[i].id
						// this.recommendList = []
						this.loadMore = {
							current: 1,
							last: 1,
							flat: false
						},
							this.loadStatus = 'loading';
						this.getRecommend(true)
					}
				}else{
					this.classifyList[i].active = false;
				}
			}
		},
		getRecommend(bool) {
			var that = this
			this.$http({
				aurl: 'getRecommend',
				data: {
					pages: 'member',
					title_id: that.currentClassify,
					page: this.loadMore.current
				},
				success: res => {
          if(res.data.code === 0 && res.data.result.data){
            let data = res.data.result;
            this.loadMore.last = data.last_page;
            if(bool){
              this.recommendList = data.data
            }else{
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
				}
			});
		},
		gotoMyCoupon(){
			uni.navigateTo({
					url: '/pagesA/user/coupon'
				});
		},
		gotoMyPoint(){
			this.getSubscribe();
			uni.navigateTo({
					url: '/pagesA/user/point'
				});
		},
		gotoIntegral(){
           uni.navigateTo({
					url: '/pagesB/activity/integral'
				});
	    },
		gotoCoinStore(){
			this.getSubscribe();
			uni.navigateTo({
				url: '/pagesB/activity/cattleCoinStore'
			});
		},
		gotoCards(){
			uni.navigateTo({
				url: '/pagesA/user/memberCard'
			});
		},
		//预览图片
		ViewImage(e) {
			uni.previewImage({
				urls: [this.qrCode],
				current: this.qrCode
			});
		},

		closeCodePopup () {
			this.showCode = false
		},
		getServiceQr() {
			this.$http({
				aurl: 'getServiceQr',
				success: res => {
					if (res.data.code === 0) {
						if (res.data.result.weixin[0] && res.data.result.weixin[0].url) {
							this.qrCode = res.data.result.weixin[0].url;
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		handleShowCode () {
			this.showCode = true
		},
		isLogin() {
			if (JSON.stringify(this.userInfo) === '{}') {
				uni.navigateTo({
					url: '/pagesA/user/bindUser'
				});
			} else {
				this.toUserinfoSetting();
			}
		},
		toOrder() {
			this.getSubscribe();
			this.needTokenQueryLink('/pagesA/user/order/lists');
		},
		toFavorite(type) {
			this.needTokenQueryLink('/pagesA/user/favorite?type='+type);
		},
		toVip() {
			uni.navigateToMiniProgram({
				// appId: 'wxe6fdabad206fe97b',
				appId: 'wxae84e7f8578d8883',
				path: 'pages/electronicwindow/electronicwindow?id=70&electchannelid=1',
				success: result => {
					console.log(result);
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		},
		toSetting() {
			this.needTokenQueryLink('/pagesA/user/setting/setting', { info: encodeURIComponent(JSON.stringify(this.userInfo)) });
		},

		toCouponCenter() {
			console.log('11')
			this.needTokenQueryLink('/pagesB/activity/couponList', { info: encodeURIComponent(JSON.stringify(this.userInfo)) });
		},
		toUserinfoSetting() {
			this.needTokenQueryLink('/pagesA/user/setting/userinfoSetting', { info: encodeURIComponent(JSON.stringify(this.userInfo)) });
		},
		getUserBanner() {
			this.$http({
				aurl: 'configItems',
				success: res => {
					if (res.data.code === 0) {
						if (res.data.result.user_center_bottom_image.length > 0) {
							this.bannerUrl = res.data.result.user_center_bottom_image[0].url;
						}
					}
				},
				fail: err => {
					this.showUser = true;
					console.log(err);
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
		getUserInfo() {
			this.$http({
				aurl: 'userInfo',
				success: res => {
					this.userInfo = res.data.result;
					if (this.userInfo.is_update_info === 0) {
						// uni.hideTabBar();
            // this.tabShow = false;
						// this.perfectInfoShow = true;
						uni.setStorageSync('isPerfect', true);
					} else {
						// uni.showTabBar();
            this.tabShow = true
					}
					if (this.userInfo.tradeinfo) {
						this.trade_num = this.userInfo.tradeinfo;
					}
					if (this.userInfo.card_type_code) {
						switch (this.userInfo.card_type_code) {
							case '8001':
								this.imgSrc = this.imgArrs[0];
								break;
							case '1001':
								this.imgSrc = this.imgArrs[1];
								break;
							case '1002':
								this.imgSrc = this.imgArrs[2];
								break;
							case '1003':
								this.imgSrc = this.imgArrs[3];
								break;
						}
					}
					this.showUser = true;
				},
				fail: err => {
					this.showUser = true;
					console.log(err);
				}
			});
		},
		/**
		 *  会员卡下拉和回弹
		 *  1.关闭bounce避免ios端下拉冲突
		 *  2.由于touchmove事件的缺陷（以前做小程序就遇到，比如20跳到40，h5反而好很多），下拉的时候会有掉帧的感觉
		 *    transition设置0.1秒延迟，让css来过渡这段空窗期
		 *  3.回弹效果可修改曲线值来调整效果，推荐一个好用的bezier生成工具 http://cubic-bezier.com/
		 */
		coverTouchstart(e) {
			if (pageAtTop === false) {
				return;
			}
			this.coverTransition = 'transform .1s linear';
			startY = e.touches[0].clientY;
		},
		coverTouchmove(e) {
			moveY = e.touches[0].clientY;
			let moveDistance = moveY - startY;
			if (moveDistance < 0) {
				this.moving = false;
				return;
			}
			this.moving = true;
			if (moveDistance >= 80 && moveDistance < 100) {
				moveDistance = 80;
			}

			if (moveDistance > 0 && moveDistance <= 80) {
				this.coverTransform = `translateY(${moveDistance + 60}px)`;
			}
		},
		coverTouchend() {
			// if (this.moving === false) {
			// 	return;
			// }
			this.moving = false;
			this.coverTransition = 'transform 0.3s cubic-bezier(.21,1.93,.53,.64)';
			this.coverTransform = 'translateY(0px)';
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
		emailValue(e) {
			this.perfectInfo.email = e.detail.value;
		},
		nameValue(e) {
			this.perfectInfo.real_name = e.detail.value;
		},
		onSelect(e) {
			this.perfectInfo.sex = e.detail.value;
			this.sexShow = false;
		},
		cancelModel() {
			this.sexShow = false;
		},
		onPerfectInfoTime(value) {
			let date = toolFun.getLocalTime(value.detail);
			// console.log(date);
			this.perfectInfo.birthday = date;
			this.timeShow = false;
		},
		//完善资料提交
		setPerfectInfo() {
			let { perfectInfo } = this;
			if (perfectInfo.real_name == '') {
				this.showAlert('请填写真实姓名');
				return false;
			}
			if (perfectInfo.sex == '请选择') {
				this.showAlert('请选择性别');
				return false;
			}
			if (perfectInfo.birthday == '请选择') {
				this.showAlert('请选择生日');
				return false;
			}
			if (perfectInfo.email != '') {
				const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/;
				if (!re.test(perfectInfo.email)) {
					this.showAlert('邮箱格式错误');
					return false;
				}
			}

			this.$http({
				aurl: 'setPerfectInfo',
				data: this.perfectInfo,
				success: res => {
					if (res.data.code === 0) {
						this.showAlert(res.data.message);
						// let userInfo = JSON.parse(uni.getStorageSync('user_info'));
						// userInfo.birthday = res.data.birthday;
						// userInfo.is_update_info = res.data.is_update_info;
						// userInfo.email = res.data.email;
						// userInfo.real_name = res.data.real_name;
						// uni.setStorageSync('user_info', JSON.stringify(userInfo));
						this.perfectInfoShow = false;
						uni.removeStorageSync('isPerfect');
						// uni.showTabBar();
            this.tabShow = true
					} else {
						this.showAlert(res.data.result);
					}
				},
				fial: err => {
					console.log(err);
				}
			});
		},
		closeAlert() {
			this.perfectInfoShow = false;
		},
		getSubscribe(){
			this.$http({
				aurl: 'getSubscribe',
				data: {
				  template: 'v1'
				},
				success: res => {
					if (res.data.code === 0) {
						const template_ids = [];
						const template_data = res.data.result.template_data;
						for(let i = 0;i<template_data.length;i++){
						  const template_id = template_data[i].template_id;
						  template_ids.push(template_id);
						}
						console.log(template_ids)
						if(template_ids.length>0){
						  uni.requestSubscribeMessage({
						    tmplIds:template_ids,
						    success (res) {
						      console.log('同意')
						    },
						    fail(error){
						      console.log(error)
						    }
						  })
						}
					}
				},
			})
		},
	},
	onUnload() {
		this.perfectInfoShow = true;
		// uni.removeStorageSync('type');
		// console.log('销毁');
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'
.cs-mobile
	font-size 28rpx
	text-align center
	margin-top 15rpx
	color #5C6F97
.icon-online-service
	width 60rpx
	height 46rpx
	margin-bottom 10rpx
.code-popup
	>>>.van-popup
		height auto
		width 80%
		padding-bottom 60rpx
		.popup-label
			font-size 28rpx
			text-align center
			margin-top 40rpx
		.icon-close-box
			display flex
			justify-content flex-end
			padding 10rpx 20rpx
			.icon-close
				font-size 50rpx
				color #777
		.popup-tit
			text-align center
			font-size 28rpx
			font-weight bold
			margin-bottom 40rpx
		.qr-code-box
			display flex
			justify-content center
			.qr-code-img
				width 65%
.order-item
	position relative
	.order-num
		position absolute
		height 40rpx
		width 40rpx
		line-height 40rpx
		text-align center
		color #fff
		background #ff7370
		border 1px solid #ffffff
		border-radius 50%
		top -15rpx
		right 15rpx
page
	background #F8F8F8
.flex-center
	display flex
	flex-direction column
	justify-content center
	align-items center
.section
	display flex
	justify-content space-around
	align-content center
	background #fff
	border-radius 10rpx
.user-section
	height 640rpx
	padding 130rpx 30rpx 0
	position relative
	border-radius 6px 6px 300px 300px / 6px 6px 20px 20px
	background:linear-gradient(to right bottom,#FF4643,#CF2926);
	.head-setting
		position absolute
		right 30rpx
		top 30rpx
	.bg
		position absolute
		left 0
		top 0
		width 100%
		height 100%
		filter blur(1px)
		opacity 0.7
.user-info
	position relative
	z-index 2
.user-card-info
	position relative
	z-index 2
	.user-card-box
		display flex
		align-items center
		justify-content space-between
		position relative
.user-class
	color #743900
.user-header
	display flex
	align-items center
	position relative
	z-index 1
	margin-bottom 10rpx
	padding-top 20rpx
	.portrait
		width 80rpx
		height 80rpx
		border 5rpx solid #fff
		border-radius 50%
	.username
		font-size $font-md
		color #fff
		margin-left 20rpx
.vip-card-box
	display flex
	flex-direction column
	color #f7d680
	height 400rpx
	background-size 100% 100%
	border-radius 16rpx
	overflow hidden
	position relative
	padding 20rpx $font-sm
	/* z-index 2 */
	.card-bg
		position absolute
		top 20rpx
		right 0
		width 100%
		height 420rpx
	.b-btn
		position absolute
		right 20rpx
		top 16rpx
		width 132rpx
		height 40rpx
		text-align center
		line-height 40rpx
		font-size 22rpx
		color #36343c
		border-radius 20px
		background linear-gradient(left, #f9e6af, #ffd465)
		z-index 1
	.tit
		font-size 28rpx + 2rpx
		color #f7d680
		margin-bottom 28rpx
	.e-b
		font-size $font-sm
		color #d8cba9
		margin-top 10rpx
.cover-container
	background #F8F8F8
	margin-top -280rpx
	padding 20rpx 30rpx 0
	position relative
	padding-bottom 20rpx
	z-index 1
	.arc
		position absolute
		left 0
		top -32rpx
		width 100%
		height 36rpx
.tj-sction
	@extend .section
	.tj-item
		@extend .flex-center
		flex-direction column
		height 140rpx
		font-size $font-sm
		color #75787d
	.num
		font-size $font-lg
		color $font-color-base
		margin-bottom 8rpx
.order-section
	@extend .section
	padding 28rpx 0
	.order-item
		@extend .flex-center
		width 20%
		border-radius 10rpx
		font-size $font-sm
		color $font-color-base
.tools
	background-color #ffffff
	.mb-xs
		font-size 46rpx
.no-login
	color #ffffff
	margin-left 30rpx
.perfectInfo
	position relative
	.emfont
		position absolute
		top 10rpx
		right 20rpx
		font-size 55rpx
		color #fff
	.title
		width 100%
		background url('../../static/images/checkout_perfectInfoBg.png')
		background-size 100% 100%
		color #fff
		padding 25rpx
		box-sizing border-box
		.title_h2
			font-size 36rpx
			padding 26rpx 0
			font-weight bold
			text-align center
		.title_p
			width 526rpx
			margin 0 auto
			font-size 24rpx
			font-weight 500
	.main
		padding 20rpx
		.cell-group
			margin 10rpx 0 32rpx
.user_center
	padding 0rpx 20rpx 20rpx 20rpx
	.user-header
		display flex
		align-items center
		.portrait
			width 128rpx
			height 128rpx
			border-radius 50%
		.info-box
			color #fff
			.username
				font-size 32rpx
			.col-ccc
				font-size 24rpx
			.no-login
				font-size 32rpx
	.user_code
		display flex
		justify-content space-around
		align-items center
		color #fff
		.user_good
			line-height: 40rpx;
			text-align: center;
			.user_count
				font-size 34rpx
				font-weight bold
			.user_recode
				font-size 24rpx
		.user_shop
			line-height: 40rpx;
			text-align: center;
			.user_count
				font-size: 34rpx;
				font-weight: bold;
			.user_recode
				font-size 24rpx
.my_assets
	padding 20rpx 18rpx
	color #666
	background #fff
	border-radius 10rpx
	margin-top: 32rpx;
	.ac_title
		font-size 34rpx
		line-height 40rpx
		font-weight bold
		color: #333;
		padding 10rpx 0
	.ac_list
		display flex
		justify-content space-around
		align-items center
		.ac_item
			flex: 1;
			line-height 60rpx
			text-align center
			position relative
			&.border-item
				&:after
					content ''
					height 80%
					width 1px
					position absolute
					left 0
					top 10%
					background #E6E6E6
			.item_count
				font-size 32rpx
				color #333
				.item_img
					width 72rpx
					height 72rpx
					margin 0 auto
					margin-top: 20rpx;
					image
						width 100%
						height 100%
			.item_name
				font-size 24rpx
			.item_icon
				width 60rpx
				height 60rpx
				margin 0 auto
				image
					width 100%
					height 100%
</style>
