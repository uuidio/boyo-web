<template>
	<view class="back-title" :style="{marginTop:config.top,height:config.height,lineHeight:config.height,width:config.left}">
		<view class="fxBox1">
			<text class="iconfont iconfont-back icon-back_light"></text>
			<view class="ell-box">
				<text>{{config.title}}</text> 
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		config: {
			type: Object,
			default: {}
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="stylus" scoped>
	.back-title
		text-align center
		box-sizing border-box
		padding-left 20rpx
		.icon-back_light
			font-size 40rpx
		.ell-box
			width 100%
			text-align center
			text
				padding-left 20%
</style>
