<template>
	<view class="container">
		<view class="em-searchbox">
			<view class="em-search-input">
				<text class="iconfont icon-search"></text>
				<input
					confirm-type="search"
					placeholder="请输入关键词"
					:focus="true"
					auto-focus
					placeholder-class="em-input-plholder"
					class="em-input"
					v-model.trim="keyword"
					@confirm="getShopGoods"
				/>
				<text class="iconfont icon-close" @tap="cleanKeyword" v-show="keyword"></text>
			</view>
			<view class="em-cancle" @tap="back">取消</view>
		</view>

		<view class="em-search-history" v-if="history.length > 0">
			<view class="em-history-header"><view class="em-search-title">搜索历史</view></view>
			<view class="em-history-content">
				<block v-for="(item, index) in history" :key="index">
					<uni-tag @tap="toGoodsLists(item)" circle :text="item" class="mr-sm mb-md" style="display: inline-block"></uni-tag>
				</block>
			</view>
      <view class="mt-md text-r col-666" @click="clearHistory">
        清除搜索历史
      </view>
		</view>

		<view class="em-search-hot" v-if="hot.length">
			<view class="em-hot-header"><view class="em-search-title">热门搜索</view></view>
			<view class="em-hot-content">
				<block v-for="(item, index) in hot" :key="index"><uni-tag circle :text="item.keyword" class="mr-sm mb-md" style="display: inline-block"@tap="toGoodsLists(item.keyword)"></uni-tag></block>
			</view>
		</view>
	</view>
</template>

<script>
import uniTag from '@dcloudio/uni-ui/lib/uni-tag/uni-tag.vue';
import redirect from '../../mixins/redirect.js';

export default {
	components: {
		uniTag
	},
	mixins: [redirect],
	data() {
		return {
			history: uni.getStorageSync('history') ? JSON.parse(uni.getStorageSync('history')) : [],
			hot: [],
			keyword: '',
			showActionSheet: false,
			tips: '确认清空搜索历史吗？'
		};
	},
	mounted() {
		this.getHos();
	},
	methods: {
		cleanKeyword() {
			this.keyword = '';
		},
    clearHistory(){
		  this.history = []
      uni.removeStorageSync('history');
    },
		getShopGoods() {
			const arr = uni.getStorageSync('history');
			const history = arr ? JSON.parse(arr) : [];
			if (history.indexOf(this.keyword) === -1) {
				history.unshift(this.keyword);
				if (history.length >= 10) {
					history.splice(history.length - 1, 1);
				}
				uni.setStorageSync('history', JSON.stringify(history));
			}
      this.toQueryLink('/pagesA/goods/lists', { keyword: this.keyword });
		},
		toGoodsLists(item) {
			console.log(item);
			this.keyword = item;
			this.toQueryLink('/pagesA/goods/lists', { keyword: this.keyword });
		},
		getHos() {
			this.$http({
				aurl: 'hotKeyWord',
				success: res => {
					let hotArr = res.data.result.data
					if (hotArr.length > 0) {
						this.hot = hotArr;
						console.log(hotArr)
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
page
	color #333
	background #fff
.container
	padding 0 30rpx 30rpx 30rpx
	box-sizing border-box
	background #fff
.em-searchbox
	padding 30rpx 0
	box-sizing border-box
	display flex
	align-items center
.em-search-input
	width 100%
	height 66rpx
	border-radius 35rpx
	padding 0 30rpx
	box-sizing border-box
	background #f8f8f8
	display flex
	align-items center
	flex-wrap nowrap
.em-input
	flex 1
	color #333
	padding 0 16rpx
	font-size 28rpx
.em-input-plholder
	font-size 28rpx
	color #b2b2b2
.em-cancle
	color #888
	font-size 28rpx
	padding-left 30rpx
	flex-shrink 0
.em-history-header
	display flex
	align-items center
	justify-content space-between
	padding 30rpx 0
.em-icon-delete
	padding 10rpx
.em-search-title
	font-size 28rpx
	font-weight bold
.em-hot-header
	padding 30rpx 0
.em-tag-class
	display inline-block
	margin-bottom 20rpx
	margin-right 20rpx
	font-size 26rpx !important
</style>
