<template>
	<view class="container" style="padding-bottom: 88rpx;">
		<view class="index-box">
			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight-38 + 'px', paddingTop: myTop + 'px'}">
				<view class="index-head" :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">
					<text class="my-text mt-md">分类</text>
				</view>
			</view>
			<view class="search_box" :style="{ paddingTop: myHeight + 'px' }">
				<view class="search_box_r">
					<text class="emfont icon-search mr-md"></text>
					<input class="ser-input" type="text" value="搜索" disabled @tap="search"/>
				</view>
			</view>
		</view>
		<view>
			<scroll-view scroll-y scroll-with-animation class="tab-view" :scroll-top="scrollTop" :style="{ height: height-myHeight+10 + 'px', top: myHeight+38 + 'px' }">
				<view
					v-for="(item, index) in categoryData"
					:key="index"
					class="tab-bar-item"
					:class="[currentTab == index ? 'active' : '']"
					:data-current="index"
					@tap.stop="swichNav"
				>
					<text class="text-ellipsis">{{ item.label }}</text>
				</view>
			</scroll-view>

			<block v-for="(item, index) in categoryData" :key="index">
				<scroll-view scroll-y class="right-box" :style="{ height: height-myHeight+10 + 'px', top: myHeight+38 + 'px' }" v-if="currentTab == index">
					<!--内容部分 start 自定义可删除-->
					<view class="page-view">
						<view class="class-box">
							<view class="class-item" v-for="lv2 in item.children" :key="lv2.value">
								<view class="notice-title">— {{ lv2.label }} —</view>
								<view class="g-container">
									<view class="g-box" v-for="lv3 in lv2.children" :key="lv3.value" @tap.stop="productList" :data-gcid="lv3.value">
										<view class="img-box"><image :src="lv3.class_icon" class="g-image" /></view>
										<view class="g-title text-ellipsis">{{ lv3.label }}</view>
									</view>
									<view v-if="!lv2.children"  class="notice-title">
										<text>持续上新中</text>
									</view>
								</view>
							</view>
						</view>
					</view>
					<!--内容部分 end 自定义可删除-->
				</scroll-view>
			</block>
		</view>
    <tab-bar class="tab-bar-fixs" :actives='tabActive'></tab-bar>
	</view>
</template>

<script>
import global from '../../mixins/global.js';
import cartNum from '../../mixins/cartNum';
import mta from '../../mixins/mta';
import tabBar from '../../components/tabbar/tabbar.vue';
export default {
	mixins: [global,cartNum,mta],
  components:{
    tabBar
  },
	data() {
		return {
      tabActive:1,
			currentGcId: '',
			categoryData: [],
			height: 0, //scroll-view高度
			currentTab: 0, //预设当前项的值
			scrollTop: 0 //tab标题的滚动条位置
		};
	},
  onShow(){
    const gmToken = uni.getStorageSync('gmToken');
		this.$http({
			aurl: 'getCategory',
      params:{
        gm_id:gmToken
      },
			success: res => {
				console.log(res);
				let dataArr = res.data.result;
				if (dataArr.length > 0) {
					this.categoryData = dataArr;
					if(this.firstClassID){
						for(let i = 0; i < dataArr.length; i++){
							if(dataArr[i].value == this.firstClassID){
								this.currentTab = i;
								this.checkCor();
							}
						}
						this.resetFirstClassID('');
					}
					console.log(this.categoryData);
				}else{
					this.categoryData = [];
				}
			},
			fail: err => {
				console.log(res);
				uni.showToast({
					title:'请求超时，请稍后再重试',
					icon:'none'
				})
			}
		});
    this.getCartNum()
  },
	onLoad(options) {
    uni.hideTabBar()
		if(options.gc_id){
			this.currentGcId = options.gc_id;
		} else {
			this.currentGcId = '';
		}
		uni.getSystemInfo({
			success: res => {
				console.log(res, 8989)
				let header = 92;
				// #ifdef H5
				header = 0;
				// #endif
				this.height = res.windowHeight - uni.upx2px(header);
			}
		});
	},
	mounted() {
	},
	methods: {
		// 点击标题切换当前页时改变样式
		swichNav(e) {
			let cur = e.currentTarget.dataset.current;
			if (this.currentTab == cur) {
				return false;
			} else {
				this.currentTab = cur;
				this.checkCor();
			}
		},
		//判断当前滚动超过一屏时，设置tab标题滚动条。
		checkCor() {
			let that = this;
			//这里计算按照实际情况进行修改，动态数据要进行动态分析
			//思路：窗体高度/单个分类高度 200rpx 转px计算 =>得到一屏幕所显示的个数，结合后台传回分类总数进行计算
			//数据很多可以多次if判断然后进行滚动距离计算即可
			if (that.currentTab > 7) {
				that.scrollTop = 500;
			} else {
				that.scrollTop = 0;
			}
		},
		productList(e) {
			let gc_id  = e.currentTarget.dataset.gcid
			uni.navigateTo({
				url: `/pagesA/goods/lists?gc_id=${gc_id}`
			});
		},
		search() {
			uni.navigateTo({
				url: '/pagesA/goods/search'
			});
		}
	}
};
</script>

<style lang="stylus">
@import '../../variable.styl'
page
	background #fcfcfc
/* 左侧导航布局 start */
/* 隐藏scroll-view滚动条 */
::-webkit-scrollbar
	width 0
	height 0
	color transparent
.em-searchbox
	width 100%
	height 92rpx
	padding 0 30rpx
	box-sizing border-box
	background #fff
	display flex
	align-items center
	justify-content center
	position fixed
	left 0
	top 0
	z-index 100
.em-searchbox::after
	content ''
	position absolute
	border-bottom 1rpx solid #d2d2d2
	-webkit-transform scaleY(0.5)
	transform scaleY(0.5)
	bottom 0
	right 0
	left 0
.em-search-input
	width 100%
	height 60rpx
	background #f1f1f1
	border-radius 30rpx
	font-size 26rpx
	color #999
	display flex
	align-items center
	justify-content center
.em-search-text
	padding-left 16rpx
.tab-view
	/* height: 100%; */
	width 180rpx
	position fixed
	left 0
	top 125rpx
	z-index 10
	background $page-color-base
	padding-bottom 1rpx
	box-sizing border-box
	.tab-bar-item
		width 100%
		height 80rpx
		background #f6f6f6
		box-sizing border-box
		display flex
		align-items center
		justify-content center
		font-size 26rpx
		color #444
		font-weight 400
		/*&:last-child*/
		/*	margin-bottom 80rpx*/
		.text-ellipsis
			padding 0 10rpx
			font-size $font-base
	.active
		position relative
		color $theme-red
		font-weight 600
		background #fff
	.active::before
		content ''
		position absolute
		border-left 8rpx solid $theme-red
		height 70%
		left 0
/* 左侧导航布局 end */
.right-box
	width 100%
	position fixed
	padding-left 180rpx
	box-sizing border-box
	left 0
	top 125rpx
.page-view
	width 100%
	/*overflow hidden*/
	padding-top 20rpx
	box-sizing border-box
	height 100%
	padding-bottom env(safe-area-inset-bottom)
	background #fff
.swiper
	width 100%
	height 220rpx
	border-radius 12rpx
	overflow hidden
	transform translateZ(0)
.swiper .wx-swiper-dot
	width 8rpx
	height 8rpx
	display inline-flex
	background none
	justify-content space-between
.swiper .wx-swiper-dot::before
	content ''
	flex-grow 1
	background rgba(255, 255, 255, 0.8)
	border-radius 16rpx
	overflow hidden
.swiper .wx-swiper-dot-active::before
	background #fff
.swiper .wx-swiper-dot.wx-swiper-dot-active
	width 16rpx
.slide-image
	width 100%
	height 220rpx
.class-box
	/*padding-top 30rpx*/
.class-item
	background #fff
	width 100%
	box-sizing border-box
	padding 20rpx
	/*margin-bottom 20rpx*/
	border-radius 12rpx
.class-name
	font-size 22rpx
.g-container
	/* padding-top: 20rpx; */
	display flex
	display -webkit-flex
	justify-content flex-start
	flex-direction row
	flex-wrap wrap
	.notice-title
		font-size 22rpx
		margin-top 20rpx
		text-align center
.g-box
	width 31%
	text-align center
	margin-top 20rpx
	margin-right 3.5%
	&:nth-child(3n){
		margin-right 0
	}
	.img-box
		border-radius 12rpx
		margin-bottom 10rpx
.g-image
	display block
	width 100%
	height 171rpx
.g-title
	font-size 24rpx
	color #333

.notice-title
	width 100%
	height 35rpx
	display flex
	justify-content center
	align-items center
	font-size 28rpx
	color #999

.search_box
	.search_box_r
		.icon-search
			left 50%
			margin-left -60rpx
		.ser-input
			text-align center
			padding-left 0
.mp-search-box
	background #fff
	color $em-text-color

.index-box
	position relative
/*background #fff*/
.index-head
	text-align center
	/*padding-right 90rpx*/
	box-sizing border-box
	width 100%
	font-size 37rpx
</style>
