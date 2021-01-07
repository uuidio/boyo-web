<template>
	<view>
		<view class="brand-info fxBox" v-for="(item, index) in info" :key="index" @tap.stop="handleTap" :data-index="index">
			<view class="img-box"><image :src="item.shop_logo"></image></view>
			<view class="text-box">
				<view class="t fxBox">
					<view class="fx1">
						<view class="fxBox">
							<view class="text-30 text-bold text-ellipsis fx1">{{ item.shop_name }}</view>
							<view class="icon-box">
								<view class="icon like" v-if="showlike" :class="{ active: item.is_favorite }" @tap.stop="like" :data-index="index"><text class="iconfont icon-likefill"></text></view>
								<view class="icon" @tap.stop="phone" :data-index="index"><text class="iconfont icon-phone_light"></text></view>
							</view>
						</view>
						<view class="text-sm mt-xs">
							<text>{{item.gm_name }}</text>
						</view>
					</view>
				</view>
				<view class="b fxBox mt-5">
					<view class="fx1">
						<view class="text-sm">
							<text class="iconfont icon-locationfill"></text>
							<text>{{item.internal===1?'内场':'外场'}} {{ item.floors_name }}</text>
						</view>
						<text class="text-sm mt-5">{{ item.rel_cat_name }}</text>
					</view>
					<view class="">
						<text class="text-sm">{{ item.count_for_sale_goods }}件 在售</text>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		info: {
			type: Array
		},
		showlike: {
			type: Boolean,
			default: false
		}
	},
	data() {
		return {};
	},
	methods: {
		phone(e) {
			let index = e.currentTarget.dataset.index;
			let tel = this.info[index].shop_phone;
			if (!tel) {
				uni.showToast({
					title: '该商家尚未留下联系方式',
					icon: 'none',
					position: 'bottom'
				});
				return;
			}
			uni.makePhoneCall({
				phoneNumber: tel
			});
		},
		like(e) {
			let index = e.currentTarget.dataset.index;
			this.$emit('tapLike', index);
		},
		handleTap(e) {
			let index = e.currentTarget.dataset.index;
			console.log('点击item');
			this.$emit('tapItem', index);
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../../variable.styl'

.brand-info
	margin-bottom $margin-md
	background #FFF
	padding $margin-md
	.text-box
		color $em-text-color-grey
		width calc(100% - 132rpx)
		.text-ellipsis
			color $em-text-color
		.icon-locationfill
			font-size $font-xs
		.icon-box
			width 30%
			margin-left 5%
			text-align right
			.icon
				display inline-block
				vertical-align middle
			.like
				border-right 1px solid $border-color-dark
				margin-right $margin-md
				padding-right $margin-md
				&.active
					color $theme-red
			.iconfont
				font-size $font-base + 12
		.b
			align-items center
			text
				margin-right $margin-xs
	.img-box
		width 160rpx
		height 160rpx
		margin-right $margin-lg
		image
			border-radius $em-border-radius-lg
			border 1px solid $border-color-dark
			width 100%
			height 100%
</style>
