<template>
	<view :v-show="loading">
		<view>
			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px', paddingRight: myRight + 'px' }">
				<view class="index-header">
					<text class="my-text" @click="() => (indexItemShow = true)">{{sltIndexItem}}</text>
					<input class="ser-input" type="text" value="输入关键字搜索" disabled @tap="search" />
				</view>
			</view>
			<view class="carousel-section" :style="{ paddingTop: myHeight + 'px' }">
				<!-- 标题栏和状态栏占位符 -->
				<view class="titleNview-placing"></view>
				<!-- 背景色区域 -->
				<view class="titleNview-background"></view>
				<swiper class="carousel" circular @change="swiperChange" :autoplay="true" v-if="detail.carousel">
					<swiper-item v-for="(item, index) in detail.carousel" :key="index" class="carousel-item" @tap="swiperClick(item)"><image :src="item.image_url" /></swiper-item>
				</swiper>
				<!-- 自定义swiper指示器 -->
				<view class="swiper-dots">
					<text class="num">{{ swiperCurrent + 1 }}</text>
					<text class="sign">/</text>
					<text class="num">{{ detail.carousel.length }}</text>
				</view>
			</view>
			<view v-if="wetchatLive.room_status != 0">
			<navigator :url="wetchatLive.roomurl" style="margin-top:20rpx;">
				<view class="add-img">
       				<image :src="wetchatLive.pic_url" mode="widthFix" style="width:100%;"/>
			     </view>
			</navigator>
			</view>
			<view v-if="detail.brands_item.length"><brands :listsData="detail.brands_item"></brands></view>
			<view v-if="detail.hotClass.length"><hotClass :listsData="detail.hotClass"></hotClass></view>
			<view v-if="detail.goods_swiper.length"><goodsSwiper :listsData="detail.goods_swiper"></goodsSwiper></view>
			<view>
				<hotGoods :listsData="hotList" :banner="detail.hot_goods[0].image_url"></hotGoods>
				<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
			</view>
		</view>
		<view class="fixedImg" v-if="showA">
			<view class="imgBox" @tap="toAlertLink"><image :src="alertItem.pop_url.value.image_url" mode="widthFix"></image></view>
			<view class="closeItem fxBox1">
				<text class="mr-md text-md">{{ alertItem.pop_time.value }}s</text>
				<text @tap="closeAlert" class="emfont icon-round_close_light"></text>
			</view>
		</view>
		<!-- 集团项目选择 -->
		<van-action-sheet :z-index="999999" :show="indexItemShow" :actions="indexItems" cancel-text="取消" @select="onSelect" @click-overlay="cancelModel" @cancel="cancelModel" />
	</view>
</template>

<script>
import CouponGoods from '../../components/lists/CouponGoods.vue';
import ThemeOne from '../../components/recommend/ThemeOne';
import indexMock from '../../mock';
import redirect from '../../mixins/redirect.js';
import global from '../../mixins/global.js';
import brands from './components/brands';
import hotClass from './components/hotClass';
import hotGoods from './components/hotGoods';
import goodsSwiper from './components/goodsSwiper';
import goods from '../../mock/goods';
import cartNum from '../../mixins/cartNum';
import mta from '../../mixins/mta';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
export default {
	mixins: [redirect, global, cartNum, mta],
	components: {
		CouponGoods,
		ThemeOne,
		brands,
		hotClass,
		hotGoods,
		goodsSwiper,
		uniLoadMore
	},
	data() {
		return {
			sltIndexItem:'',
			indexItemShow: false,
			indexItems: [],
			titleNViewBackground: '',
			swiperCurrent: 0,
			swiperLength: 0,
			carouselList: [],
			goodsList: goods.goodsLists,
			category: indexMock.category,
			recommend: indexMock.recommend,
			detail: {
				carousel: [],
				brands_item: [],
				hot_goods: [],
				hotClass: [],
				goods_swiper: []
			},
			wetchatLive:{
				room_status:0,
				roomurl:0,
				pic_url:''
			},
			loading: false,
			alertItem: {},
			showA: false,
			timeOut: '',
			hotList: [],
			loadMore: {
				current: 1,
				last: 1,
				flat: false
			},
			room_id:5,
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
			loadStatus: 'loading'
		};
	},
	mounted() {},
	onLoad() {
		if (uni.getStorageSync('isPerfect')) {
			uni.switchTab({
				url: '/pages/user/index'
			});
		}
		uni.showLoading({
			title: '加载中...'
		});
		this.getDetail();
		this.getIndexItem();
	},
	onShow() {
		this.getCartNum();
	},
	onReachBottom() {
		if (this.loadMore.flat) return;
		this.loadStatus = 'loading';
		setTimeout(() => {
			if (this.hotList.length !== 0) {
				this.loadMore.current++;
			}
			this.getMoreHot();
		}, 500);
	},
	methods: {
		onSelect(e) {
			this.sltIndexItem = e.detail.name;
			uni.setStorageSync('gmToken', e.detail.gm_id)
			this.indexItemShow = false;
			this.detail = {};
			this.hotList = [];
			this.loadMore = {
				current: 1,
					last: 1,
					flat: false
			},
			this.getDetail();
			this.getCartNum();
		},
		cancelModel() {
			this.indexItemShow = false;
		},
		getIndexItem() {
			this.$http({
				aurl: 'getIndexItem',
				success: res => {
					if (res.data.code === 0) {
						this.indexItems = res.data.result;
						let gmToken = uni.getStorageSync('gmToken')
						if(this.indexItems.length > 0){
							if(!gmToken){
								uni.setStorageSync('gmToken', this.indexItems[0].gm_id)
								this.sltIndexItem = this.indexItems[0].platform_name
							}
							let bool = false
							for(var i = 0; i < this.indexItems.length; i++){
								this.indexItems[i].name = this.indexItems[i].platform_name
								if (gmToken === this.indexItems[i].gm_id) {
									this.sltIndexItem = this.indexItems[i].name
									bool = true
								}
							}
							if (!bool) {
								this.sltIndexItem = this.indexItems[0].platform_name
							}
						} else {
							this.sltIndexItem = '益购EGO'
						}
					}
				},
				fail: error => {
					console.log(error);
				},
				complete: () => {

				}
			});
		},
		//轮播图切换修改背景色
		swiperChange(e) {
			const index = e.detail.current;
			this.swiperCurrent = index;
			// this.titleNViewBackground = this.carouselList[index].background;
		},
		toAlertLink() {
			const item = this.alertItem.pop_url.value;
			this.swiperClick(item);
		},
		swiperClick(item) {
			if (item.id) {
				item.value = item.id;
			}
			if (item.shop_type) {
				item.selectShopType = item.shop_type;
			}
			if (item.value) {
				if (item.show_type === 'goods') {
					this.toGoods(item.value);
				} else if (item.show_type === 'class') {
					let obj = {
						urlType: item.show_type,
						value: item.value
					};
					this.customTo(obj);
					// this.toQueryLink('/pagesA/goods/lists', {
					// 	gc_id: item.value
					// });
				} else if (item.show_type === 'shop') {
					if (item.selectShopType === 'brand') {
						this.toQueryLink('/pagesA/brand/lists', {
							shopid: item.value
						});
					} else {
						this.toQueryLink('/pagesB/shop/index', {
							shopid: item.value
						});
					}
				} else if (item.show_type === 'customActivity') {
					item.urlType = item.show_type
					this.customTo(item)
				} else {
					item.value = '';
				}
			}

			if (item.show_type && !item.value) {
				const _url = '/pagesB/activity/' + item.show_type;
				this.toLink(_url);
			}
		},
		search() {
			uni.navigateTo({
				url: '/pagesA/goods/search'
			});
		},
		toGoodsLists() {
			uni.navigateTo({
				url: '/pagesA/goods/lists'
			});
		},
		closeAlert() {
			clearInterval(this.timeOut);
			this.showA = false;
		},
		showModel() {
			if (this.alertItem.pop_switch.value === 1) {
				let _this = this;
				this.timeOut = setInterval(function() {
					_this.alertItem.pop_time.value--;
					if (_this.alertItem.pop_time.value === 0) {
						clearInterval(_this.timeOut);
						_this.showA = false;
					}
				}, 1000);
				this.showA = true;
			}
		},
		getAlert() {
			this.$http({
				aurl: 'imagePop',
				success: res => {
					if (res.data.code === 0) {
						this.alertItem = res.data.result;
						this.showModel();
					}
				},
				fail: error => {
					console.log(error);
					uni.hideLoading();
					this.loading = true;
				}
			});
		},
		getLive() {
			this.$http({
				aurl: 'showLive',
				success: res => {
					if (res.data.code === 0) {
						let result = res.data.result;
						let roomid = result.roomid.value;
						// console.log(res.data.result)
						this.wetchatLive.room_status = result.room_status.value;
						this.wetchatLive.pic_url = result.pic_url.value[0].url;
						this.wetchatLive.roomurl = 'plugin-private://wx2b03c6e691cd7370/pages/live-player-plugin?room_id='+roomid;
					}
				},
				fail: error => {
					console.log(error);
					uni.hideLoading();
					this.loading = true;
				}
			});
		},
		getDetail() {
			this.$http({
				aurl: 'getIndex',
				success: res => {
					const detailItem = res.data.result;
					if(detailItem.length === 0){
						this.detail = {}
					} else {
						let keyArr = Object.keys(detailItem);
						keyArr.forEach(item => {
							this.detail[item] = detailItem[item];
						});
					}
				},
				fail: error => {
					console.log(error);
				},
				complete: () => {
					uni.hideLoading();
					this.loading = false;
					this.getLive();
					this.getAlert();
				}
			});
		},
		getMoreHot(isFirst) {
			this.$http({
				aurl: 'getMoreHot',
				data: {
					page: this.loadMore.current
				},
				success: res => {
					let data = res.data.result;
					this.loadMore.last = data.last_page;
					if (data.data.length) {
						data.data.map(item => {
							this.hotList.push(item);
						});
					}
					if (this.loadMore.current === this.loadMore.last) {
						this.loadMore.flat = true;
						this.loadStatus = 'noMore';
					} else {
						this.loadStatus = 'more';
						this.loadMore.flat = false;
					}
				},
				error: err => {
					console.log(err);
				}
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'

.fixedImg
	position fixed
	height 100%
	width 100%
	top 0
	left 0
	background rgba(0, 0, 0, 0.3)
	z-index 9999
	.closeItem
		position absolute
		right 14%
		top 200rpx
		font-size 60rpx
		color #fff
	.imgBox
		width 80%
		margin 200rpx auto 0
		image
			width 100%
/* #ifdef MP */
page
	.cate-section
		position relative
		z-index 5
		border-radius 16rpx 16rpx 0 0
		margin-top -20rpx
	.carousel-section
		padding 0
		.titleNview-placing
			padding-top 0
			height 0
		.carousel
			.carousel-item
				padding 0
		.swiper-dots
			left 45rpx
			bottom 40rpx
/* #endif */
page
	background #F8F8F8
.m-t
	margin-top 16rpx
/* 头部 轮播图 */
.carousel-section
	position relative
	padding-top 10px
	.titleNview-placing
		height var(--status-bar-height)
		padding-top 44px
		box-sizing content-box
	.titleNview-background
		position absolute
		top 0
		left 0
		width 100%
		height 90%
		transition 0.4s
.carousel
	width 100%
	height 420rpx
	.carousel-item
		width 100%
		height 100%
		padding 0 28rpx
		overflow hidden
		box-sizing border-box
	image
		width 100%
		height 100%
		border-radius 10rpx
.swiper-dots
	display flex
	position absolute
	left 60rpx
	bottom 15rpx
	width 72rpx
	height 36rpx
	background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==')
	background-size 100% 100%
	.num
		width 36rpx
		height 36rpx
		border-radius 50px
		font-size 24rpx
		color #fff
		text-align center
		line-height 36rpx
	.sign
		position absolute
		top 0
		left 50%
		line-height 36rpx
		font-size 12rpx
		color #fff
		transform translateX(-50%)
/* 分类 */
.cate-section
	display flex
	justify-content space-around
	align-items center
	flex-wrap wrap
	padding 30rpx 22rpx
	background #fff
	.cate-item
		display flex
		flex-direction column
		align-items center
		font-size $font-sm + 1.2rpx
		color $font-color-dark
	/* 原图标颜色太深,不想改图了,所以加了透明度 */
	image
		width 82rpx
		height 82rpx
		margin-bottom 14rpx
		border-radius 50%
</style>
