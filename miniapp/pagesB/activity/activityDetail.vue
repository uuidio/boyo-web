<template>
	<view class="container">
		<view class="img-box">
			<image width="100%" mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202004/11/1s0MYdTYeMqncjU90MMGN5zZ0snvo6vN7ECzlg8Z.png"></image>
		</view>
		<view class="activity-content mt-lg">
			<view class="text-big">大白兔60周年巡展</view>
			<view class="text-md sub-tit mt-lg">大白兔60周年巡展。现场共营造了八大场景：奶糖海洋地、糖果丢丢乐、磁力拔萝卜、糖果套圈圈、糖纸翻翻乐、复古打卡照、大白兔娃娃机、弹弹球。同时，大白兔还跨界周边，出大白兔帆布袋、大白兔香水、润唇膏、身体乳、抱枕等。</view>
			<view class="fxBox2 mt-md">
				<view class="fxBox1">
					<text class="col-999 text-sm">活动时间：</text>
					<text class="text-sm">3月30 10:00~4月30日 10:00</text>
				</view>
				<text class="iconfont icon-right text-md col-666"></text>
			</view>
			<view class="fxBox2 mt-md">
				<view class="fxBox1">
					<text class="col-999 text-sm">活动地点：</text>
					<view class="fxBox1"><text class="text-sm">西塔三层</text><text class="text-sm">东塔三层，</text><text class="text-sm">南塔四层</text></view>
				</view>
				<text class="iconfont icon-right text-md col-666"></text>
			</view>
			<view class="fxBox2 mt-md">
				<view class="fxBox1">
					<text class="col-999 text-sm">报名类型：</text>
					<text class="text-sm">支付1~100积分</text>
				</view>
				<text class="iconfont icon-right text-md col-666"></text>
			</view>
			<view class="text-base mt-lg mb-md">活动内容</view>
			<view class="article-detail">
				<rich-text :nodes="articleDetail"></rich-text>
			</view>
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
.img-box
	image
		width 100%
.activity-content
	padding 0 20rpx
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
