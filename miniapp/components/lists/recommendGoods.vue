<template>
	<view>
		<!--标题-->
		<view class="home-title-box"><view class="home-title">{{title}}</view></view>
		<!--分类导航列表-->
		<view class="classify-nav-list" v-if="count > 0 || listsData.length > 0"  :class="[is_top?'nav-top':'']" :style="{Top:is_top?topHeight+'px'+';margin-top:0px':''}">
			<view class="nav-item-box">
				<view class="nav-item" :class="{active: item.active}"  v-for="(item,index) in classifyList" @tap="navClick(index)" :key="index">
					<view class="nav-tit">
						{{item.title}}
					</view>
				</view>
			</view>
		</view>
		<view v-if="is_top" class="classify-nav-top"></view>
		<view class="goods-box"><goods-lists :is-list="isList" :goods-lists="listsData" class="em-product-list"></goods-lists></view>
	</view>
</template>

<script>
import goodsLists from './GoodsLists';
export default {
	components: {
		goodsLists
	},
	props: {
		classifyList: {
			type: Array,
			default: () => []
		},
		listsData: {
			type: Array,
			default: () => []
		},
		title: {
			type: String,
		},
		is_top:{
			type:Boolean
		},
		topHeight:{
			type:Number
		}
	},
	watch: {
		// listsData(){
		//     this.goodsItem = this.listsData[0]
		// }
	},
	data() {
		return {
			isList: false,
			goodsItem: {},
			count: 0,
		};
	},
	methods: {
		navClick(index){
			this.count = this.count + 1;
			this.$emit('changeClassify', index)
		},
	},
	mounted() {
	}
};
</script>

<style scoped lang="stylus">
.home-title-box
	margin-top 30rpx
.classify-nav-list
	margin-left 10px
	margin-top 6rpx
	margin-bottom 35rpx
	width 100%
	.nav-item-box
		display flex
		flex-flow nowrap
		overflow-x auto
		.nav-item
			flex-shrink 0
			font-size 28rpx
			font-weight 500
			color #333333
			.nav-tit
				position relative
				line-height  66rpx
				&:after
					content ''
					width 100%
					height 4rpx
					background transparent
					border-radius 4rpx
					position absolute
					bottom 0
					left 0
			&:last-child
				padding-right 10px
			&+.nav-item
				margin-left 40rpx
			&.active
				.nav-tit
					font-size 30rpx
					font-weight bold
					color #128D80
					&:after
						background #128D80
.goods-box
	margin 35rpx 0
.nav-top
	top: 120rpx;
	left: 0px;
	z-index: 99;
	background-color: #fff;
	position: fixed;
	margin-left: 0px;
	padding-left: 10px;


.classify-nav-top
	margin-left: 10px;
	margin-top: 6rpx;
	margin-bottom: 35rpx;
	height 66rpx

</style>
