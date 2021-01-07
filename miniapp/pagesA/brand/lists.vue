<template>
	<view>
		<diy-title :config="titleConfig">
			<template v-slot:leftNav>
				<view class="diy-nav">
					<text class="iconfont icon-back" @tap="toBack"></text>
					<text class="iconfont icon-home_fill_light" @tap="toIndex"></text>
				</view>
			</template>
		</diy-title>
		<view class="brand-head" :style="{ paddingTop: height + 15 + 'px' }">
			<!-- 品牌信息 -->
			<brand-info :info="brandInfo" :showlike="true" @tapLike="like"></brand-info>
			<!-- 品牌图片预览 -->
			<scroll-view class="imgView" scroll-x="true" v-if="imgList.length">
				<image :src="item" v-for="(item, index) in imgList" @tap="imgView" :key="index" :data-index="index"></image>
			</scroll-view>
		</view>
		<!-- 筛选栏 -->
		<view class="em-header-screen" :style="{ position: isFixed ? 'fixed' : 'static', top: isFixed ? height + 'px' : '0px' }">
			<view class="em-screen-top">
				<view class="em-top-item em-icon-ml" :class="[tabIndex == 0 ? 'em-active em-bold' : '']" data-index="0" @tap="screen">
					<view>{{ selectedName }}</view>
					<text v-if="selectH > 0" class="iconfont icon-fold text-sm"></text>
					<text v-else class="iconfont icon-unfold text-sm"></text>
				</view>
				<view class="em-top-item em-icon-ml" :class="[tabIndex == 1 ? 'em-active em-bold' : '']" @tap="screen" data-index="1">
					<view>销量</view>
					<text v-if="listParam.direction == 'desc'" class="iconfont icon-fold text-sm"></text>
					<text v-else class="iconfont icon-unfold text-sm"></text>
				</view>
				<!-- <view class="em-top-item em-icon-ml" @tap="screen" data-index="4"><text>分类</text></view> -->
				<view class="em-top-item em-icon-ml" @tap="screen" data-index="3"><text>筛选</text></view>
				<view class="em-top-item em-icon-ml" @tap="screen" data-index="5"><text class="iconfont icon-search"></text></view>
				<!--下拉选择列表--综合-->
				<view class="em-dropdownlist" :class="[selectH > 0 ? 'em-dropdownlist-show' : '']" :style="{ height: px(selectH) }">
					<view
						class="em-dropdownlist-item em-icon-middle"
						:class="[item.selected ? 'em-bold' : '']"
						v-for="(item, index) in orderLists"
						:key="index"
						@tap.stop="selectOrderItem"
						:data-index="index"
					>
						<text class="em-ml em-middle">{{ item.name }}</text>
						<text class="iconfont icon-check text-sm text-primary" v-if="item.selected"></text>
					</view>
				</view>
				<view class="em-dropdownlist-mask" :class="[selectH > 0 ? 'em-mask-show' : '']" @tap.stop="hideDropdownList"></view>
				<!--下拉选择列表--综合-->
			</view>
			<view class="brands-search" v-show="searchShow">
				<view class="fxBox1">
					<text class="iconfont icon-search"></text>
					<input type="text" value="" confirm-type="search" placeholder="搜索" @confirm="toSearch" />
				</view>
			</view>
		</view>
		<!--screen-->
		<!--左抽屉弹层 筛选 -->
		<side-drawer mode="right" :visible="openSideDrawer" :height="height" :sideDraweH="sideDraweH" @close="closeSideDrawer" @selectItem="selectItem" @sure="sure"></side-drawer>
		<!--左抽屉弹层 筛选-->
		<!--list-->
		<view class="list-wrap" :class="{ zindex: selectH !== 0 }">
			<goods-lists :style="{ marginTop: isFixed ? px(120) : px(20) }" :is-list="isList" :goods-lists="goodsLists" class="em-product-list"></goods-lists>
			<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
		</view>
	</view>
</template>

<script>
import redirect from '../../mixins/redirect.js';
import mta from '../../mixins/mta.js';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import TopDropdown from '../../components/lists/TopDropdown.vue';
import SideDrawer from '../../components/lists/SideDrawer.vue';
import GoodsLists from '../../components/lists/GoodsLists.vue';
import diyTitle from '../../components/diyTitle/diyTitle.vue';
import brandInfo from './components/brandInfo.vue';
export default {
	name: 'lists',
	mixins: [redirect, mta],
	components: {
		GoodsLists,
		TopDropdown,
		SideDrawer,
		uniLoadMore,
		diyTitle,
		brandInfo
	},
	data() {
		return {
			imgList: [],
			titleConfig: {
				width: 0,
				height: 0,
				title: '品牌详情',
				pdt: 0
			},
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
			searchKey: '搜索关键词', //搜索关键词
			width: 200, //header宽度
			height: 64, //header高度
			inputTop: 0, //搜索框距离顶部距离
			arrowTop: 0, //箭头距离顶部距离
			dropScreenH: 0, //下拉筛选框距顶部距离
			attrData: [],
			attrIndex: -1,
			dropScreenShow: false,
			scrollTop: 0,
			tabIndex: 0, //顶部筛选索引
			isList: false, //是否以列表展示  | 列表或大图
			openSideDrawer: false, // 是否是打开抽屉
			sideDraweH: 0, //抽屉内部scrollview高度
			selectedName: '综合',
			orderLists: [
				{
					name: '最新',
					selected: true
				},
				{
					name: '价格升序',
					selected: false
				},
				{
					name: '价格降序',
					selected: false
				}
			],
			selectH: 0,
			goodsLists: [],
			selectIndex: -1, //选择分类
			pageIndex: 1,
			loadding: false,
			pullUpOn: true,
			loadStatus: 'more',
			searchShow: false, //搜索框
			headShow: true, //是否显示头部
			temp: null,
			navScroll: 0,
			isFixed: false,
			brandInfo: [],
			shopId: null,
			listParam: {
				orderby: 'on_sale_time'
			},
			likeType: {}, //收藏/取消店铺参数
			tempSide: {},
			lock: true
		};
	},
	onLoad: function(options) {
		this.shopId = options.shopid;
		let token = uni.getStorageSync('user_token');
		this.token = token;
		let obj = {};
		// #ifdef MP-WEIXIN
		obj = wx.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-BAIDU
		obj = swan.getMenuButtonBoundingClientRect();
		// #endif
		// #ifdef MP-ALIPAY
		my.hideAddToDesktopMenu();
		// #endif
		uni.getSystemInfo({
			success: res => {
				this.titleConfig.width = obj.left || res.windowWidth;
				this.titleConfig.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
				this.inputTop = obj.top ? obj.top + (obj.height - 30) / 2 : res.statusBarHeight + 7;
				this.titleConfig.pdt = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;

				this.height = obj.top ? obj.top + obj.height : res.statusBarHeight + 44;
				this.searchKey = options.searchKey || '';
				//略小，避免误差带来的影响
				this.dropScreenH = (this.height * 750) / res.windowWidth + this.height;
				this.sideDraweH = res.windowHeight - uni.upx2px(100) - this.height;
			}
		});
	},
	onPageScroll(e) {
		if (!this.lock) {
			return;
		}
		this.lock = false;
		setTimeout(() => {
			this.lock = true;
			if (this.navScroll - (e.scrollTop + this.titleConfig.height) <= 10) {
				this.isFixed = true;
			} else {
				this.isFixed = false;
			}
		}, 100);
	},
	mounted() {
		this.getShopInof();
		this.getGoodsList(true);
	},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh() {},
	// 页面上拉触底事件的处理函数
	onReachBottom() {
		if (!this.pullUpOn) return;
		this.loadding = true;
		this.loadStatus = 'loading';
		if (this.listParam.page === this.listParam.lastPage) {
			this.loadding = false;
			this.pullUpOn = false;
			this.loadStatus = 'noMore';
		} else {
			this.listParam.page++;
			setTimeout(() => {
				this.getGoodsList();
				this.loadding = false;
				this.loadStatus = 'more';
			}, 300);
		}
	},
	methods: {
		getShopInof() {
			this.$http({
				aurl: 'brandDetail',
				aPath: [this.shopId],
				success: res => {
					let result = res.data.result;
					let banner = result.shop_banner;
					if (banner !== null && banner.length > 0) {
						console.log(banner);
						banner.forEach((item, index) => {
							this.imgList.push(item.url);
						});
					}
					console.log(result);
					this.brandInfo.push(result);
					setTimeout(() => {
						const query = uni.createSelectorQuery().in(this);
						query
							.select('.em-header-screen')
							.boundingClientRect(data => {
								this.navScroll = data.top;
							})
							.exec();
					}, 100);
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getGoodsList(init) {
			if (init) {
				this.listParam.page = 1;
				this.goodsLists = [];
				this.pullUpOn = true;
				this.listParam.shop_id = this.shopId;
			}
			this.$http({
				aurl: 'getCateList',
				data: this.listParam,
				success: res => {
					if (init) {
						this.listParam.lastPage = res.data.result.last_page;
						if (this.listParam.lastPage === 1) {
							this.loadding = false;
							this.pullUpOn = false;
							this.loadStatus = 'noMore';
						}
					}
					res.data.result.data.forEach(item => {
						this.goodsLists.push(item);
					});
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		px(num) {
			return uni.upx2px(num) + 'px';
		},
		btnSelected(e) {
			let index = e.currentTarget.dataset.index;
			this.selectIndex = index;
		},
		btnCloseDrop(ps) {
			this.scrollTop = 1;
			this.$nextTick(() => {
				this.scrollTop = 0;
			});
			this.dropScreenShow = false;
			this.attrIndex = -1;
		},
		btnSure() {
			let index = this.attrIndex;
			let arr = this.attrData;
			let active = false;
			let attrName = '';
			//这里只是为了展示选中效果,并非实际场景
			for (let item of arr) {
				if (item.selected) {
					active = true;
					attrName += attrName ? ';' + item.name : item.name;
				}
			}
			let obj = this.attrArr[index];
			this.btnCloseDrop();
			this.$set(obj, 'isActive', active);
			this.$set(obj, 'selectedName', attrName);
		},
		sure(param) {
			if (!param.ps) {
				uni.showToast({
					title: '请输入最低价',
					icon: 'none'
				});
				return;
			}
			this.openSideDrawer = false;
			this.tempSide = param;
			this.listParam.start_price = param.ps;
			this.listParam.stop_price = param.pe;
			this.getGoodsList(true);
		},
		showOrderLists() {
			this.selectH = 246;
			this.tabIndex = 0;
		},
		hideDropdownList() {
			this.selectH = 0;
		},
		selectOrderItem(e) {
			let index = Number(e.currentTarget.dataset.index);
			this.selectedName = index === 0 ? '最新' : '价格';
			this.orderLists.map((item, i) => {
				item.selected = false;
			});
			this.orderLists[index].selected = true;

			this.selectH = 0;
			this.listParam = {};
			switch (index) {
				case 0:
					//this.listParam.orderby = 'modified_time';
					break;
				case 1:
					this.listParam.orderby = 'price';
					this.listParam.direction = 'asc';
					break;
				case 2:
					this.listParam.orderby = 'price';
					this.listParam.direction = 'desc';
					break;
			}
			this.getGoodsList(true);
		},
		screen(e) {
			let index = Number(e.currentTarget.dataset.index);
			if (index < 5) {
				this.searchShow = false;
			}
			if (index !== 0) {
				this.selectH = 0; // 隐藏排序
			}

			if (index === 0) {
				if (this.selectH === 0) {
					this.showOrderLists();
				} else {
					this.hideDropdownList();
				}
			} else if (index === 1) {
				//销量
				this.tabIndex = 1;
				if (!this.listParam.orderby) {
					this.listParam = {};
				}
				this.listParam.orderby = 'sold_quantity';
				this.listParam.direction = this.listParam.direction === 'desc' ? 'asc' : 'desc';
				this.getGoodsList(true);
			} else if (index === 2) {
				this.isList = !this.isList;
			} else if (index === 3) {
				//筛选
				this.openSideDrawer = true;
			} else if (index === 4) {
				//分类
				let arr = JSON.parse(JSON.stringify(this.attrArr[1].list));
				this.attrData = arr;
				this.dropScreenShow = true;
				this.$set(this.attrArr[1], 'isActive', false);
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			} else if (index == 5) {
				//搜索
				this.searchShow = !this.searchShow;
			}
			if (this.dropScreenShow || index === 0) {
				uni.pageScrollTo({
					scrollTop: this.navScroll,
					duration: 0
				});
			}
		},
		toSearch(e) {
			this.listParam = {};
			this.listParam.keyword = e.target.value;
			this.getGoodsList(true);
		},
		closeSideDrawer(param) {
			this.openSideDrawer = false;
		},
		like(index) {
			if (!this.brandInfo[0].is_favorite) {
				this.likeType.tip = '收藏成功';
				this.likeType.url = 'ShopFavorite';
			} else {
				this.likeType.tip = '取消收藏成功';
				this.likeType.url = 'cancelShopFavorite';
			}
			this.$http({
				aurl: this.likeType.url,
				data: {
					shop_id: this.shopId
				},
				success: res => {
					this.$set(this.brandInfo[0], 'is_favorite', !this.brandInfo[0].is_favorite);
					uni.showToast({
						title: this.likeType.tip
					});
				},
				fail: err => {}
			});
		},
		toBack() {
			if (this.openSideDrawer) {
				this.closeSideDrawer();
			} else {
				uni.navigateBack();
			}
		},
		toIndex() {
			uni.switchTab({
				url: '/pages/index/indexCustomer'
			});
		},
		selectItem(param) {
			//console.log(111, param);
		},
		imgView(e) {
			let index = e.currentTarget.dataset.index;
			uni.previewImage({
				urls: this.imgList,
				indicator: 'number',
				current: index
			});
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'

page
	background $page-color-base
.container
	padding-bottom env(safe-area-inset-bottom)
/* 隐藏scroll-view滚动条 */
::-webkit-scrollbar
	width 0
	height 0
	color transparent
/* #ifdef MP-WEIXIN */
.em-search-mr
	margin-right 20rpx !important
/* #endif */
/* #ifdef MP-BAIDU */
.em-search-mr
	margin-right 20rpx !important
/* #endif */
.em-search-text
	padding-left 16rpx
.em-search-key
	max-width 80%
	height 100%
	padding 0 16rpx
	margin-left 12rpx
	display flex
	align-items center
	border-radius 15px
	background rgba(0, 0, 0, 0.5)
	color #fff
.em-key-text
	box-sizing border-box
	padding-right 12rpx
	font-size 12px
	line-height 12px
	white-space nowrap
	overflow hidden
	text-overflow ellipsis
/* screen */
.em-header-screen
	background #fff
	width 100%
	box-sizing border-box
	background #fff
	z-index 9
.em-screen-top, .em-screen-bottom
	display flex
	align-items center
	justify-content space-between
	font-size 28rpx
	color #333
.em-screen-top
	height 88rpx
	position relative
	background #fff
.em-top-item
	height 28rpx
	line-height 28rpx
	flex 1
	display flex
	align-items center
	justify-content center
.em-topitem-active
	color $font-color-primary
.em-screen-bottom
	height 100rpx
	padding 0 30rpx
	box-sizing border-box
	font-size 24rpx
	align-items center
	overflow hidden
.em-bottom-text
	line-height 24rpx
	max-width 82%
	white-space nowrap
	overflow hidden
	text-overflow ellipsis
.em-bottom-item
	flex 1
	width 0
	display flex
	align-items center
	justify-content center
	padding 0 12rpx
	box-sizing border-box
	background $page-color-base
	margin-right 20rpx
	white-space nowrap
	height 60rpx
	border-radius 40rpx
.em-bottom-item:last-child
	margin-right 0
.em-btmItem-active
	background #fcedea !important
	color $font-color-primary
	font-weight bold
	position relative
.em-btmItem-active::after
	content ''
	position absolute
	border 1rpx solid $font-color-primary
	width 100%
	height 100%
	border-radius 40rpx
	left 0
	top 0
.em-btmItem-tap
	position relative
	border-bottom-left-radius 0
	border-bottom-right-radius 0
.em-btmItem-tap::after
	content ''
	position absolute
	width 100%
	height 22rpx
	background $page-color-base
	left 0
	top 58rpx
.em-bold
	font-weight bold
.em-active
	color $font-color-primary
.em-icon-ml .em-icon-class
	margin-left 6rpx
.em-ml
	margin-left 6rpx
.em-seizeaseat-20
	height 20rpx
.em-seizeaseat-30
	height 30rpx
.em-icon-middle .em-icon-class
	vertical-align middle
.em-middle
	vertical-align middle
/* screen */
/* 顶部下拉选择 属性 */
.em-scroll-box
	width 100%
	height 480rpx
	box-sizing border-box
	position relative
	z-index 99
	color #fff
	word-break break-all
.em-drop-item
	color #333
	height 80rpx
	line-height 80rpx
	font-size 28rpx
	box-sizing border-box
	float left
	border-radius $em-border-radius-base
	width 31.333%
	background-color $bgc-grey-20
	margin-bottom $margin-md
	margin-right 3%
	padding 0 $margin-xs
	text-align center
	overflow hidden
	&:nth-child(3n)
		margin-right 0
	&.act
		color $theme-red
		border-color $theme-red
.em-drop-btnbox
	width 100%
	height 70rpx
	position absolute
	left 0
	bottom 0
	box-sizing border-box
	display flex
.em-drop-btn
	width 50%
	font-size 32rpx
	text-align center
	height 70rpx
	line-height 70rpx
	border 0
.em-btn-red
	background $font-color-primary
	color #fff
.em-red-hover
	background #c51a15 !important
	color #e5e5e5
.em-btn-white
	background #fff
	color #333
.em-white-hover
	background #e5e5e5
	color #2e2e2e
/* 顶部下拉选择 属性 */
/* 顶部下拉选择 综合 */
.em-dropdownlist
	width 100%
	position absolute
	background #fff
	border-bottom-left-radius 24rpx
	border-bottom-right-radius 24rpx
	overflow hidden
	box-sizing border-box
	padding-top 10rpx
	padding-bottom 26rpx
	left 0
	top 88rpx
	visibility hidden
	transition all 0.2s ease-in-out
	z-index 999
.em-dropdownlist-show
	visibility visible
.em-dropdownlist-mask
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	background rgba(0, 0, 0, 0.6)
	z-index -1
	transition all 0.2s ease-in-out
	opacity 0
	visibility hidden
.em-mask-show
	opacity 1
	visibility visible
.em-dropdownlist-item
	color #333
	height 70rpx
	font-size 28rpx
	padding 0 40rpx
	box-sizing border-box
	display flex
	align-items center
	justify-content space-between
/* 顶部下拉选择 综合 */
.em-product-list
	display flex
	justify-content space-between
	flex-direction row
	flex-wrap wrap
	box-sizing border-box
.list-wrap
	position relative
	&.zindex
		z-index -2
.brands-search
	padding-bottom $margin-md
	.fxBox1
		transition all 0.5s ease-out
		width 96%
		margin 0 auto
		background-color $bgc-grey-20
		border-radius 10rpx
		height 50rpx
		padding 5rpx 0
		.iconfont
			margin 0 $margin-md
		input
			width 90%
.brand-head
	background #fff
	>>> .brand-info
		margin-bottom 0
// 自定义头部导航
.diy-nav
	border 1px solid $border-color-base
	padding $margin-xs $margin-lg
	border-radius 30rpx
	line-height 1
	.iconfont
		font-size $font-base + 14
	& .iconfont:nth-child(2)
		margin-left $margin-md * 2
.imgView
	height 240rpx
	padding $margin-md
	white-space nowrap
	padding-right 0
	box-sizing border-box
	image
		margin-right $margin-sm
		width 240rpx
		height 180rpx
</style>
