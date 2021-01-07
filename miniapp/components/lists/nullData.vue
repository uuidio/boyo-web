<template>
	<view class="">
		<view class="null-data" :style="{ backgroundColor: bgColor }">
			<view class="box">
				<text class="iconfont icon-emoji" style="font-size: 60px;"></text>
				<view class="">
					<text>{{ tip }}</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		tip: {
			type: String,
			default: '暂无数据～'
		},
		bgColor: {
			type: String,
			default: 'transparent'
		}
	},
	data() {
		return {};
	}
};
</script>

<style lang="stylus" scoped>
.null-data
  left 0
.null-data
	width 100%
	height 100%
	position fixed
	display flex
	align-items center
	justify-content center
	text-align center
	color #999
	.box
		margin-top -35%
</style>
