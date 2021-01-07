<template>
	<view class="container" >
<!--		<view class="index-box">-->
<!--			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px'}">-->
<!--				<view class="index-head" :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">-->
<!--					<text class="my-text mt-md">文章列表</text>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
		<!--文章列表-->
		<view class="article-list">
			<view class="list-item" v-for="(item, index) in articleList" :key="index" @click="to(item)">
				<view class="main-img">
					<image  :src="item.article_url" mode="widthFix"></image>
				</view>
				<view class="tit-box" v-if="item.title_is_show !== 0">
					<view class="main-tit">{{item.title}}</view>
					<view class="sub-tit">{{item.subtitle}}</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
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
			gm_id: '',
			articleList: [],
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
		if(options.gm_id){
			this.gm_id = options.gm_id
		}
	},
	mounted() {
		this.getArticleList();
	},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
		if (this.loadMore.flat) return;
		this.loadStatus = 'loading';
		setTimeout(() => {
			if (this.recommendList.length !== 0) {
				this.loadMore.current++;
			}
			this.getArticleList()
		}, 500);
	},

	methods: {
		to(item){
			if (item.type_id === 1 && item.activity_id >0) {
				let ac_id = item.activity_id;
				uni.navigateTo({
			        url: '/pagesB/activity/customActivity?ac_id='+ac_id,
			    });
			}else{
				let id = item.id;
				uni.navigateTo({
					url: '/pagesA/article/articleDetail?articleId=' + id,
				});
			}
		},
		px(num) {
			return uni.upx2px(num) + 'px';
		},
		getArticleList() {
			this.$http({
				aurl: 'articleList',
				data: {
					gm_id: this.gm_id,
					page: this.loadMore.current
				},
				success: res => {
					if(res.data.code === 0){
						let arr = res.data.result.lists.data;
						if(arr.length > 0 ){
							this.loadMore.last = res.data.result.lists.last_page;
							for(let i = 0; i < arr.length; i++){
								this.articleList.push(arr[i]);
							}
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
	}
};
</script>

<style>
	page{
		background: #fff;
	}
</style>
<style lang="stylus" scoped>
@import '../../variable.styl'

/* 隐藏scroll-view滚动条 */
::-webkit-scrollbar
	width 0
	height 0
	color transparent
.article-list
	padding 24rpx 20rpx
	.list-item
		.tit-box
			margin-bottom 45rpx
			line-height 1
			.main-tit
				font-size 28rpx
				font-weight bold
				color #333
			.sub-tit
				line-height 34rpx
				font-size 24rpx
				font-weight 500
				color #999
				margin-top 12rpx
		.main-img
			margin-bottom 24rpx
			image
				width 100%
				height auto
				vertical-align top
</style>
