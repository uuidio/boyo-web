<template>
	<view class="em-header-box">
		<view class="em-header" :style="{ width: config.width + 'px', height: config.height + 'px', paddingTop: config.pdt + 'px' }">
			<slot name="leftNav"></slot>
			<text class="title text-ellipsis" :style="{ lineHeight: config.height - config.pdt + 'px' }">{{ config.title }}</text>
			<!-- <view class="em-back" :style="{ marginTop: arrowTop + 'px' }"><text class="iconfont icon-back header-icon"></text></view> -->
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
@import '../../variable.styl'

.em-header-box
	width 100%
	background #fff
	position fixed
	z-index 99998
	left 0
	top 0
	overflow hidden
.em-header
	padding-left 25rpx
	box-sizing border-box
	text-align right
	display flex
	align-items center
.title
	font-size $font-lg
	margin 0 auto
.em-back
	margin-left 8rpx
	height 32px !important
	width 32px !important
.header-icon
	font-size 44rpx
	margin-left 10rpx
	line-height 64rpx
	font-weight 400
.em-searchbox
	width 100%
	height 30px
	margin-right 30rpx
	border-radius 15px
	font-size 12px
	padding 3px 10px
	box-sizing border-box
	color #999
	display flex
	align-items center
	overflow hidden
/* #ifdef MP-WEIXIN */
.em-search-mr
	margin-right 20rpx !important
/* #endif */
/* #ifdef MP-BAIDU */
.em-search-mr
	margin-right 20rpx !important
/* #endif */
.em-search-text
	padding-left 16rpx
.em-search-key
	max-width 80%
	height 100%
	padding 0 16rpx
	margin-left 12rpx
	display flex
	align-items center
	border-radius 15px
	background rgba(0, 0, 0, 0.5)
	color #fff
.em-key-text
	box-sizing border-box
	padding-right 12rpx
	font-size 12px
	line-height 12px
	white-space nowrap
	overflow hidden
	text-overflow ellipsis
.diy-nav
	border 1px solid $border-color-base
	padding $margin-xs $margin-lg
	border-radius 30rpx
	line-height 1
	.iconfont
		font-size $font-base + 16
	& .iconfont:nth-child(2)
		margin-left $margin-md * 2
</style>
