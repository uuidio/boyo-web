<template>
	<view class="coupon-item" :class="{ stale: info.status === 3 }" @tap="needTokenQueryLink('/pagesA/user/couponDetail', {	id:info.id })">
		<view class="coupon-box fxBox">
			<view class="condition" :class="{'bg-orange': info.shop_id === 0}">
				<view class="big">
					<text class="text-16">¥</text>
					<text class="m">{{ money(info.denominations) }}</text>
					<text class="decimals">{{decimals(info.denominations)}}</text>
					元
				</view>
				<text class="text-sm">满{{ info.origin_condition }}元可用</text>
			</view>
			<view class="info">
				<view class="text-ellipsis tt">{{ info.name }}</view>
				<view class="des">{{ info.start_at }} ~ {{ info.end_at }}</view>
				<view class="des1 text-ellipsis">仅支持 {{couponInfo.gm_name}} 项目可用</view>
				<view class="fxBox1 btn-box">
					<view class="fx1">
						<view class="f" @tap="show">
							详细信息
							<text class="iconfont" :class="[showDetail ? 'icon-fold' : 'icon-unfold']"></text>
						</view>
					</view>
					<button type="warn" plain @tap="get" v-if="showButton">点击领取</button>
				</view>
			</view>
		</view>
		<view class="detail-info" v-show="info.isShow">
			<text class="text-xs">{{ info.desc }}</text>
		</view>
	</view>
</template>

<script>
import redirect from '../../../mixins/redirect'
export default {
	mixins:[redirect],
	props: {
		info: {
			type: Object,
			default: {}
		},
		couponInfo:{
			type: Object,
			default: {}
		},
		showDetail: {
			type: Boolean,
			default: false
		},
		showButton: {
			type: Boolean,
			default: true
		}
	},
	data() {
		return {};
	},
	methods: {
		show() {
			this.$emit('showInfo');
		},
		get() {
			//领取优惠券
			this.$emit('get');
		},
		money(m) {
			// 去小数
			let end = m.indexOf('.');
			return m.substr(0, end);
		},
		decimals(n) {
			let end = n.indexOf('.');
			return n.substr(end, 3);
		}
	}
};
</script>

<style scoped lang="stylus">
@import '../../../variable.styl'

.coupon-wrap
	padding $margin-md
.coupon-item
	background-color #fff
	border-radius 10rpx
	margin-bottom $margin-md
.stale
	opacity 0.7
.coupon-box
	height 220rpx
	.condition
		flex-shrink 0
		width 290rpx
		height @height
		background url('../../../static/images/coupon.png') no-repeat left center
		background-size cover
		color #fff
		text-align center
		&.bg-orange
			background url('../../../static/images/coupon_orange.png') no-repeat left center
			background-size cover
		.big
			line-height 1
			margin-bottom $margin-md
			padding-top 12%
			.m
				font-size 70rpx
				margin 0 5rpx
			.decimals
				font-size $font-base
	.info
		padding $margin-md
		overflow hidden
		.tt
			margin-bottom $margin-xs
			font-size $font-base
		.des
			color $em-text-color-grey
			font-size $font-sm
			height 65rpx
		.des1
			color $em-text-color-grey
			font-size $font-sm
			height 40rpx
		.btn-box
			bottom 10%
			.f, .iconfont
				font-size $font-xs
				color $em-text-color-grey
			button
				padding 5rpx $margin-md
				font-size $font-xs + 2
.detail-info
	padding $margin-xs $margin-md
	text-align center
	border 1px solid $border-color-dark
	margin-top -1rpx
	text
		color $em-text-color-grey
</style>
