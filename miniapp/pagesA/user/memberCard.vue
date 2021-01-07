<template>
	<view class="container">
		<view class="default-desc">
			当前默认
		</view>
		<!--会员卡列表-->
		<view class="card-list">
			<view class="list-item" v-for="(item, index) in cardList" :key="index">
				<view class="tit-box">
					<view class="main-tit">
						<text class="gm-name">
							{{item.gm_name}}
						</text>
						<text v-if="item.user_default !== item.gm_id" class="default-label" @click.stop="handleSetPaltform(item.gm_id)">设为默认</text>
						<text v-else class="default-label active">当前默认</text>
					</view>
<!--					<view class="sub-tit">深圳市南山区深南大道 9028 号益田假日广场</view>-->
				</view>
				<view class="img-list">
					<view class="img-item" v-for="(itm, idx) in item.card_list" :key="idx">
						<image  :src="itm.card_img" mode="widthFix"></image>
						<view class="card-info">
							<text class="card-name">{{itm.card_name}}</text>
							<text class="card-no">NO.{{itm.card_code}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
<!--		<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>-->
	</view>
</template>

<script>
import global from '../../mixins/global.js';
import redirect from '../../mixins/redirect.js';
import mta from '../../mixins/mta.js';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';

export default {
	mixins: [redirect, global, mta],
	name: 'lists',
	components: {
		uniLoadMore,
	},
	data() {
		return {
			cardList: [],
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
			loadStatus: 'loading',
			loadMore: {
				current: 1,
				last: 1,
				flat: false
			},
		};
	},
	onLoad: function(options) {

	},
	mounted() {
		this.getCardList();
	},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
		// if (this.loadMore.flat) return;
		// this.loadStatus = 'loading';
		// setTimeout(() => {
		// 	if (this.recommendList.length !== 0) {
		// 		this.loadMore.current++;
		// 	}
		// 	this.getCardList()
		// }, 500);
	},

	methods: {
		handleSetPaltform(id) {
			this.$http({
				aurl: 'setPaltform',
				data:{
					gm_id: id
				},
				success: res => {
					if (res.data.code === 0) {
						this.getCardList();
						uni.showToast({
							title: '设置成功!', // 标题
							icon: 'success',  // 图标类型，默认success
						})
					}
				},
				fail: error => {
					console.log(error);
				},
				complete: () => {

				}
			});
		},
		getCardList() {
			this.$http({
				aurl: 'userCardList',
				data: {
					page: this.loadMore.current
				},
				success: res => {
					if(res.data.code === 0){
						this.cardList = res.data.result.data;
						// if(arr.length > 0 ){
						// 	// this.loadMore.last = res.data.result.last_page;
						// 	for(let i = 0; i < arr.length; i++){
						// 		arr[i].isDefault = false;
						// 		this.cardList.push(arr[i]);
						// 	}
						// }
						let item = [];
						for(let j = this.cardList.length-1; j >= 0; j--){
							if(this.cardList[j].user_default === this.cardList[j].gm_id){
								item = this.cardList.splice(j, 1);
							}
						}
						if(item.length > 0){
							this.cardList.unshift(item[0]);
						}
						// if (this.loadMore.current === this.loadMore.last) {
						// 	this.loadMore.flat = true;
						// 	this.loadStatus = 'noMore';
						// } else {
						// 	this.loadStatus = 'more';
						// 	this.loadMore.flat = false;
						// }
					}
				},
				error: err => {
					console.log(err);
				}
			});
		},
	}
};
</script>


<style lang="stylus" scoped>
@import '../../variable.styl'

/* 隐藏scroll-view滚动条 */
::-webkit-scrollbar
	width 0
	height 0
	color transparent
.card-list
	.list-item
		margin-bottom 16rpx
		background #fff
		.tit-box
			padding 20rpx 20rpx 24rpx
			line-height 1
			.main-tit
				display flex
				justify-content space-between
				align-items center
				.gm-name
					font-size 28rpx
					font-weight bold
					color #333
				.default-label
					height 45rpx
					border-radius 23rpx
					background #F2F3F4
					font-size 22rpx
					padding 0 18rpx
					line-height 45rpx
					color #666666
					&.active
						color #fff
						background #FF5A76
			.sub-tit
				line-height 34rpx
				font-size 24rpx
				font-weight 500
				color #999
				margin-top 12rpx
		.img-list
			display flex
			padding-left 20rpx
			overflow-x auto
			overflow-y hidden
			padding-bottom 16rpx
			&:after
				content '1'
				width 20rpx
				height 100%
				background fff
				color #fff
			.img-item
				width 86%
				flex-shrink 0
				position relative
				&+.img-item
					margin-left 24rpx
				image
					width 100%
					height auto
					vertical-align top
					border-radius 16rpx
				.card-info
					position absolute
					top 0
					width 100%
					padding 30rpx 16rpx
					display flex
					justify-content space-between
					align-items center
					box-sizing border-box
					.card-name
						color #fff
						font-size 22rpx
					.cart-no
						color #fff
						font-size 22rpx
.default-desc
	font-size 24rpx
	color #999
	height 70rpx
	line-height 70rpx
	padding 0 20rpx
</style>
