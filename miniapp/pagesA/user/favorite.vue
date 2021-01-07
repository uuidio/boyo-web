<template>
	<view class="favorite-page">
<!--		<uni-segmented-control :current="current" :values="items" @clickItem="onClickItem" style-type="button" active-color="#E64340"></uni-segmented-control>-->
		<view class="tab-box">
			<view v-show="current === 0" key="goods">
				<view class="swiper-item bc-fff" v-for="(item, index) in currentArr[current].list">
					<uni-swipe-action :options="item.options" @click="tapSwipe" :key="item.id" :data-index="index">
						<view class="fxBox1 img-txt-icon" @tap="toUrl" :data-index="index">
							<view class="img-box"><image :src="item.goods_image"></image></view>
							<view class="txt-box">
								<view class="text-ellipsis">{{ item.goods_name }}</view>
								<view class="price">
									<text class="p">¥{{ item.goods_price }}</text>
								</view>
							</view>
						</view>
					</uni-swipe-action>
					<!-- <view class="icon-box" @tap="showBtn" :data-index="index"><text class="iconfont icon-more"></text></view> -->
				</view>
				<uni-load-more :status="currentArr[current].loadStatus"></uni-load-more>
			</view>
			<view v-show="current === 1" key="shop">
				<view class="swiper-item" v-for="(item, index) in currentArr[current].list" :key="item.id">
					<uni-swipe-action :options="item.options" @click="tapSwipe" :data-index="index">
						<view class="fxBox1 img-txt-icon" @tap="toUrl" :data-index="index">
							<view class="img-box"><image :src="item.shop_logo"></image></view>
							<view class="txt-box fx1">
								<text class="text-ellipsis">{{ item.shop_name }}</text>
							</view>
						</view>
					</uni-swipe-action>
					<!-- <view class="icon-box" @tap="showBtn" :data-index="index"><text class="iconfont icon-more"></text></view> -->
				</view>
				<uni-load-more :status="currentArr[current].loadStatus"></uni-load-more>
			</view>
		</view>
	</view>
</template>

<script>
import uniSegmentedControl from '@dcloudio/uni-ui/lib/uni-segmented-control/uni-segmented-control';
import uniSwipeAction from '@dcloudio/uni-ui/lib/uni-swipe-action/uni-swipe-action';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import mta from '../../mixins/mta';
export default {
  mixins: [mta],
	onLoad(option) {
		if(option.type && option.type>0){
			this.current = 1;
		}
	},
	onShow() {},
	onReachBottom() {
		let actArr = this.currentArr[this.current];
		if (actArr.param.page === actArr.lastPage) {
			actArr.loadStatus = 'noMore';
		} else {
			actArr.param.page++;
			actArr.loadStatus = 'loading';
			setTimeout(() => {
				this.getShop();
			}, 300);
		}
	},
	mounted() {
		this.getShop(true);
	},
	data() {
		return {
			isOpened: false,
			current: 0,
			currentArr: [
				{ param: {}, list: [], loadStatus: 'loading', url: 'goodsFavoriteList', ccUrl: 'goodFavoriteCancel' },
				{ param: {}, list: [], loadStatus: 'loading', url: 'shopFavoriteList', ccUrl: 'cancelShopFavorite' }
			],
			items: ['商品', '店铺'],
			shop: {
				loadStatus: 'loading',
				param: {}
			},
			pullUpOn: true,
			shopList: [],
			options: [
				{
					text: '取消收藏',
					style: {
						backgroundColor: '#007aff',
						fontSize: '14px'
					}
				},
				{
					text: '确认',
					style: {
						backgroundColor: '#dd524d',
						fontSize: '14px'
					}
				}
			]
		};
	},
	methods: {
		onClickItem(index) {
			this.current = index.currentIndex;
			if (this.currentArr[this.current].list.length === 0) {
				this.getShop(true);
			}
		},
		getShop(init) {
			if (init) {
				this.currentArr[this.current].param.page = 1;
			}
			this.$http({
				aurl: this.currentArr[this.current].url,
				data: this.currentArr[this.current].param,
				success: res => {
					let result = res.data.result;
					let list = result.data;
					this.currentArr[this.current].lastPage = result.last_page;
					if (list) {
						list.forEach((item, index) => {
							item.isOpened = false;
							item.options = [
								{
									text: '取消收藏',
									style: {
										backgroundColor: '#007aff',
										fontSize: '14px',
										goodsId: item.goods_id,
										shopId: item.shop_id,
										index: index
									}
								},
								{
									text: '确认',
									style: {
										backgroundColor: '#dd524d',
										fontSize: '14px'
									}
								}
							];
							this.currentArr[this.current].list.push(item);
						});
					}

					if (result.last_page === 1) {
						this.currentArr[this.current].loadStatus = 'noMore';
					} else {
						this.currentArr[this.current].loadStatus = 'more';
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		cancelFavoite(url, param, index) {
			this.$http({
				aurl: url,
				data: param,
				success: res => {
					uni.showToast({
						title: '取消收藏成功'
					});
					this.currentArr[this.current].list.splice(index, 1);
				},
				fail: err => {}
			});
		},
		showBtn(e) {
			let index = e.currentTarget.dataset.index;
			this.currentArr[this.current].list[index].isOpened = true;
		},
		changeSwipe(i, e) {
			let index = i.dataset.index;
		},
		tapSwipe(e, i) {
			if (e.index === 0) {
				let current = this.current;
				let index = e.style.index;
				let param = {};
				if (current === 0) {
					param.goods_id = this.currentArr[current].list[index].goods_id;
				} else {
					param.shop_id = this.currentArr[current].list[index].shop_id;
				}
				this.cancelFavoite(this.currentArr[current].ccUrl, param, index);
			}
		},
		toUrl(e) {
			let index = e.currentTarget.dataset.index;
			if (this.current === 0) {
				let id = this.currentArr[0].list[index].goods_id;
				uni.navigateTo({
					url: `../goods/detail?id=${id}`
				});
			} else {
				let id = this.currentArr[1].list[index].shop_id;
				console.log(this.currentArr[1].list[index])
        if(this.currentArr[1].list[index].shop_type==='brand'){
          uni.navigateTo({
            url: `/pagesA/brand/lists?shopid=${id}`
          });
        }else{
          uni.navigateTo({
            url: `/pagesB/shop/index?shopid=${id}`
          });
        }
			}
		}
	},
	components: {
		uniSegmentedControl,
		uniSwipeAction,
		uniLoadMore
	}
};
</script>

<style scoped lang="stylus">
@import '../../variable.styl'

.favorite-page
	>>>
		.segmented-control-item
			font-size $font-sm
	>>>
		.uni-swipe-action
			border-radius $em-border-radius-lg
	.tab-box
		padding $page-row-spacing
	.swiper-item
		position relative
		margin-bottom $margin-md
		.icon-box
			position absolute
			right 0
			top 0
			height 100%
			line-height 160rpx
			width 50rpx
			text-align center
	.img-txt-icon
		padding $margin-sm
		image
			width 130rpx
			height 130rpx
			display block
		.txt-box
			padding 0 $margin-md
			width 75%
		.icon-box
			padding 0 $margin-md
		.price
			margin-top $margin-lg
			color $theme-red
</style>
