<template>
	<view>
		<view class="go-back-box fxBox1" :style="{ paddingTop: menuButtonInfo.top + 'px', lineHeight: menuButtonInfo.height + 'px' }">
			<view class="diy-nav fxBox1">
				<text class="iconfont icon-back_light" @tap="toBack"></text>
			</view>
		</view>
		<view class="container" v-if="showUser">
			<view class="user-section">
				<image mode="widthFix" class="top-bg" src="../../static/images/red-bg.png"></image>
				<view class="user_center">
					<view class="user-header fxBox2">
						<view class="fxBox1">
							<image class="portrait" :src="userInfo.avatarUrl || 'https://lanlnk-dev.oss-cn-shenzhen.aliyuncs.com/images/user/avatar.png'"></image>
							<view class="info-box">
								<view class="username">{{ userInfo.nickname || userInfo.nickName || userInfo.mobile || '游客' }}</view>
							</view>
						</view>
						<image @click="toSetting" class="icon-setting" src="../../static/icon/icon-setting-white.png"></image>
						</view>
				</view>
				<view class="wallet-info">
					<view class="fxBox2">
						<view>
							<view class="fxBox1">
								<text class="info-label">
									总资产
								</text>
								<image @click="handleShowInfo" class="icon-eyes" src="../../static/icon/icon-eyes.png" v-if="showInfo"></image>
								<image @click="handleShowInfo" v-else class="icon-eyes" src="https://egoss1.ytholidayplaza.com/images/default/202008/19/UbQqd01yg7ZwP2sttwfKj1tIqLT5RH1yNK4z208G.png"></image>

							</view>

							<view class="mt-md total-assets">
								<block v-if="showInfo">
									<text class="symbol">￥</text>
									<text>
										{{walletDetail.total ? walletDetail.total : 0}}
									</text>
								</block>
								<text v-else>****</text>
							</view>
						</view>
						<image @click="toIptPwd" class="payment-code-entry" src="../../static/icon/payment-code-entry.png"></image>
					</view>
					<view class="fxBox2 info-b">
						<view class="fxBox1">
							<text class="info-label fx0">
								钱包余额
							</text>
							<text class="ml-lg mb-5 text-ellipsis" v-if="showInfo">￥{{walletDetail.virtual_card ? walletDetail.virtual_card : 0}}</text>
							<text class="ml-lg mt-md" v-else>****</text>
						</view>
						<view class="fxBox1 ml-sm">
							<text class="info-label fx0">
								实体卡
							</text>
							<text class="ml-lg mb-5 text-ellipsis" v-if="showInfo">￥{{walletDetail.physical_card ? walletDetail.physical_card : 0}}</text>
							<text class="ml-lg mt-md" v-else>****</text>
						</view>
					</view>
				</view>
			</view>
			<view class="my_assets">
<!--				<view class="ac_title">我的服务</view>-->
				<view class="ac_list">
					<view class="ac_item" @tap="toTransactionList">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-transaction-details.png"/></view></view>
						<view class="item_name">交易明细</view>
					</view>
					<view class="ac_item" @tap="showTips">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-wallet-recharge.png"/></view></view>
						<view class="item_name">钱包充值</view>
					</view>
					<view class="ac_item" @tap="toBindingCard">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-physical-card.png"/></view></view>
						<view class="item_name">绑定实体卡</view>
					</view>
				</view>
				<view class="ac_list">
					<view class="ac_item" @tap="showTips">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-electronic-card.png"/></view></view>
						<view class="item_name">电子卡</view>
					</view>
					<view class="ac_item" @tap="jumpPage('/pagesA/user/wallet/physicalCard')">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-physical-card1.png"/></view></view>
						<view class="item_name">实体卡</view>
					</view>
					<view class="ac_item" @tap="showTips">
						<view class="item_count"><view class="item_img"><image src="../../static/icon/icon-help-center.png"/></view></view>
						<view class="item_name">帮助中心</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
import redirect from '../../../mixins/redirect.js';
import mta from '../../../mixins/mta';
export default {
	name: 'UserIndex',
	mixins: [redirect, mta],
	components: {
	},
	data() {
		return {
			menuButtonInfo: 0,
			walletDetail: {},
			accountStatus: '',
			userInfo: {},
			showUser: false,
			trade_num: {},
			bannerUrl: '',
			showInfo: false
		};
	},
	mounted() {},
	created() {
	},
	onLoad(options) {
		this.accountStatus = options.accountStatus
		this.menuButtonInfo = wx.getMenuButtonBoundingClientRect();
	},
	onShow() {
		const token = uni.getStorageSync('user_token');
		if (token) {
			this.getUserInfo();
			// this.getType();
		} else {
			this.userInfo = {};
			this.trade_num = {};
			this.showUser = true;
		}
		this.getWalletDetail()
	},
	methods: {
		toBindingCard(){
			if(this.walletDetail.card_num >= 10){
				this.showAlert('绑卡数量不能大于10张，请解绑后再重新绑定！')
				return false
			}
			this.jumpPage('/pagesA/user/wallet/bindingCard')
		},
		showTips(){
			this.showAlert('即将上线，敬请期待')
		},
		getWalletDetail(){
			this.$http({
				aurl: 'walletDetail',
				success: res => {
					console.log(res,111)
					if(res.data.code === 0){
						this.walletDetail = res.data.result
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		handleShowInfo(){
			this.showInfo = !this.showInfo
		},
	  jumpPage(url,obj){
	    this.toQueryLink(url,obj)
    },
		toIptPwd(){
			this.$http({
				aurl: 'hasPayPassword',
				success: res => {
					if(res.data.code === 0){
						if(res.data.result.status == 2){
							this.walletLocking(res.data.result.time)
						}else{
							this.toQueryLink('/pagesA/user/wallet/pwdAuthentication',{type: 'payCode', use_type: 'open'})
						}
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		toSetting() {
			this.redirectToLink('/pagesA/user/setting/setting')
		},
		toTransactionList() {
			this.toLink('/pagesA/user/wallet/transactionList');
		},
		toUserinfoSetting() {
			this.needTokenQueryLink('/pagesA/user/setting/userinfoSetting', { info: encodeURIComponent(JSON.stringify(this.userInfo)) });
		},
		getUserInfo() {
			this.$http({
				aurl: 'userInfo',
				success: res => {
					this.userInfo = res.data.result;
					if (this.userInfo.is_update_info === 0) {
						uni.hideTabBar();
						uni.setStorageSync('isPerfect', true);
					} else {
						uni.showTabBar();
					}
					if (this.userInfo.tradeinfo) {
						this.trade_num = this.userInfo.tradeinfo;
					}
					this.showUser = true;
				},
				fail: err => {
					this.showUser = true;
					console.log(err);
				}
			});
		},
	},
	onUnload() {
	}
};
</script>

<style lang="stylus" scoped>
@import '../../../variable.styl'
page
	background #F8F8F8
.go-back-box
	width calc(100% - 50rpx)
	padding-left $margin-sm
	position fixed
	top 0
	left 0
	z-index 10
	.icon-back_light
		font-size $font-lg
		color #fff
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
	/*height 430rpx*/
	/*padding 130rpx 30rpx 0*/
	position relative
	/*border-radius 6px 6px 300px 300px / 6px 6px 20px 20px
	background:linear-gradient(to right bottom,#FF4643,#CF2926);*/
	.top-bg
		width 100%
		vertical-align top
	.user_center
		position absolute
		top 130rpx
		width 100%
		padding 0 25rpx
		box-sizing border-box
.user-header
	display flex
	align-items center
	position relative
	z-index 1
	margin-bottom 10rpx
	padding-top 44rpx
	.portrait
		width 84rpx
		height 84rpx
		border 5rpx solid #fff
		border-radius 50%
	.username
		font-size 28rpx
		color #fff
		margin-left 25rpx
		font-weight bold
	.icon-setting
		width 38rpx
		height 38rpx
.wallet-info
	padding 38rpx 0 38rpx 62rpx
	position absolute
	bottom 0
	left 25rpx
	right 25rpx
	height 250rpx
	margin-bottom -100rpx
	box-sizing border-box
	background #ffffff
	border-radius 10rpx
	.icon-eyes
		width 30rpx
		height 22rpx
		vertical-align middle
		margin-left 30rpx
	.info-label
		font-size 24rpx
		color #999
	.payment-code-entry
		width 163rpx
		height 51rpx
	.total-assets
		font-size 50rpx
		line-height 1
		.symbol
			font-size 34rpx
			margin-right 15rpx
	.info-b
		margin-top 50rpx
		padding-right 62rpx
		font-size 36rpx
		height 40rpx
.my_assets
	padding 36rpx 0 18rpx
	color #666
	background #fff
	border-radius 10rpx
	margin 120rpx 25rpx 0
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
		margin-bottom 42rpx
		.ac_item
			flex: 1;
			text-align center
			.item_count
				.item_img
					width 100rpx
					height 100rpx
					margin 0 auto
					margin-top: 20rpx;
					image
						width 100%
						height 100%
			.item_name
				font-size 26rpx
				line-height 66rpx
				color #626262
.mb-5
	margin-bottom 10rpx
</style>
