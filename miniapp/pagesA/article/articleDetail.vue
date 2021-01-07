<template>
	<view class="container">
<!--		<view class="index-box">-->
<!--			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px'}">-->
<!--				<view class="index-head" :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">-->
<!--					<text class="my-text mt-md">文章详情</text>-->
<!--				</view>-->
<!--			</view>-->
<!--		</view>-->
		<!--文章列表-->
		<view class="article-detail">
			<rich-text :nodes="articleDetail"></rich-text>
		</view>
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
			articleDetail: '',
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
		};
	},
	onLoad: function(options) {
		this.getArticleDetail(options.articleId);
	},
	mounted() {

	},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
	},
	methods: {
		getArticleDetail(id) {
			this.$http({
				aurl: 'articleDetail',
				aPath: [id],
				success: res => {
					if(res.data.code === 0){
						let content = res.data.result.content;
						let regex = new RegExp('<img', 'gi');
						content = content.replace(regex, `<img style="max-width: 100%; display:block"`);
						this.articleDetail = content;
						uni.setNavigationBarTitle({
							title: res.data.result.title
						});
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
.article-detail
	padding 30rpx
	overflow hidden
	word-break break-all
	image
		width 100%
		vertical-align top
</style>
