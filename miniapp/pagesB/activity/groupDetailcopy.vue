<template>
	<view class="m-md p-md bc-fff border-radius5px" v-if="show">
		<view class="mb-md group-item pb-md fxBox" @tap="toGoodsDetail(detail.Group.goods_id)">
			<view class="group-img mr-md"><image :src="detail.Group.goods_image"></image></view>
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
						市场价：
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
				<button @tap="submitOrder" class="submitBtn text-md">我要参团</button>
			</view>
			<view class="btn-box">
				<button v-show="!btnClick" @tap="toGoodsDetail(detail.Group.goods_id)" class="submitBtn text-md">发起拼团</button>
				<button @tap="toNav('/pages/index/indexCustomer')" class="submitBtn text-md outlined">去逛逛</button>
			</view>
		</view>
	</view>
</template>

<script>
import tool from '../../static/base/toolFun.js';
import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';
import mta from '../../mixins/mta';
export default {
	mixins: [mta],
	components: {
		uniCountdown
	},
	data() {
		return {
			downSecond: 0,
			btnClick: false,
			detail: {},
			show: false,
			bn: 0
		};
	},
	onLoad: function(options) {
		this.bn = options.groups_bn;
		this.getGroupDetail(options.groups_bn);
	},
	methods: {
		submitOrder() {
			const _this = this;
			const data = {
				actSign: 'is_group',
				activity_id: this.detail.GroupOrder.groups_id,
				quantity: 1,
				type: 'fastbuy',
				groups_bn: this.bn,
				sku_id: this.detail.Group.sku_id
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
					if (this.detail.GroupOrder.status === 1) {
						this.btnClick = true;
					}
					this.show = true;
				},
				fail: error => {
					uni.showModal({
						title: '温馨提示',
						content: '该拼团活动已经失效，无法参与拼团，请联系客服',
						confirmText: '知道了',
						showCancel: false,
						success: res => {
							uni.switchTab({
								url: '/pages/index/indexCustomer'
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
.group-item
	border-bottom 1px solid #e7e7e7
	.group-img
		width 210rpx
		line-height 210rpx
		image
			width 100%
			height 100%
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
