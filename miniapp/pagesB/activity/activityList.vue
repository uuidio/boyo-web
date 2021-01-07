<template>
	<view class="container" >
		<van-transition custom-class="block" :show="showSubNav">
			<view class="page-mask" v-if="showSubNav" @click="closeSubNav"></view>
		</van-transition>
		<view class="activity-nav">
			<view class="nav-item" :class="{avtive: item.value === nav1}" v-for="(item,index) in navList" :key="index" @click="changeNav(item,index)">
				{{item.key}}
				<van-transition :show="showSubNav" custom-class="block" name="fade-up" :duration="{ enter: 300, leave: 1000 }">
					<view class="sub-list" v-if="showSubNav && nav1 === item.value">
						<view class="sub-item" v-for="(itm,idx) in item.subList" :key="idx" @click.stop="changeSubNav(itm,idx,index)">
							<text class="col-666 text-12">{{itm.key}}</text>
							<text class="iconfont icon-check text-lg col-666 text-lg" v-if="itm.active"></text>
						</view>
					</view>
				</van-transition>
			</view>

		</view>
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
			subNavs: [],
			nav1: 0,
			nav2: 0,
			nav3: 0,
			showSubNav: false,
			navList: [
				{
					key: '全部',
					value: 0,
					subList: [
					],
				},
				{
					key: '活动类型',
					value: 1,
					subList: [
						{
							key: '全部类型',
							value: 0,
							active: true,
						},
						{
							key: '主题活动',
							value: 1,
							active: false,
						},
						{
							key: '促销活动',
							value: 2,
							active: false,
						},
						{
							key: '会员活动',
							value: 3,
							active: false,
						},
					],
				},
				{
					key: '活动状态',
					value: '2',
					subList: [
						{
							key: '全部状态',
							value: 0,
							active: true,
						},
						{
							key: '进行中',
							value: 1,
							active: false,
						},
						{
							key: '即将开始',
							value: 2,
							active: false,
						},
					],
				},

			],
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
		changeSubNav(itm,idx,index){
			const subNavs = this.navList[index].subList
			for(let i = 0; i < subNavs.length; i++){
				if(idx === i){
					subNavs[i].active = true
				}else{
					subNavs[i].active = false
				}
			}
			this.closeSubNav();
		},
		changeNav(item,index){
			if(item.value === 0){
				this.showSubNav = false
				for(let i = 1; i < this.navList.length; i++){
					for(let j = 0; j < this.navList[i].subList.length;j++){
						if(j === 0){
							this.navList[i].subList[j].active = true
							if(i===1){
								this.nav2 = this.navList[i].subList[j].value
							}else if (i===2){
								this.nav3 = this.navList[i].subList[j].value
							}
						}else{
							this.navList[i].subList[j].active = false
						}
					}
				}
				return
			} else if(this.nav1 === item.value){
				this.showSubNav = !this.showSubNav
				return
			}
			this.nav1 = item.value
			this.showSubNav = true
		},
		closeSubNav(){
			this.showSubNav = false
		},
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
.container
	padding-top 80rpx
	.page-mask
		position fixed
		top 0
		left 0
		right 0
		bottom 0
		background rgba(000,000,000,.5)
		z-index 1
.activity-nav
	z-index 2
	height 80rpx
	position fixed
	top 0
	width 100%
	left 0
	display flex
	align-items center
	justify-content center
	background #fff
	.nav-item
		font-size 26rpx
		color #666
		height 80rpx
		line-height 80rpx
		padding 0 60rpx
		&.active
			font-size 28rpx
			color #333
	.sub-list
		position absolute
		width 100%
		left 0
		top 80rpx
		background #ffffff
		padding-bottom 18rpx
		.sub-item
			display flex
			justify-content space-between
			align-items center
			height 60rpx
			padding 0 20rpx


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
