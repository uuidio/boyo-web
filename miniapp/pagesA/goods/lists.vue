<template>
	<view>
		<!--header-->
		<view class="em-header-box">
			<view class="em-header" :style="{ width: width + 'px', height: height + 'px' }">
				<view class="em-back" :style="{ marginTop: arrowTop + 'px' }" @tap="toBack"><text class="iconfont icon-back header-icon"></text></view>
				<view class="em-searchbox em-search-mr" :style="{ marginTop: inputTop + 'px' }">
					<!-- #ifdef APP-PLUS || MP -->
					<text class="iconfont icon-search"></text>
					<!-- #endif -->
					<input
						confirm-type="search"
						placeholder="请输入关键词"
						placeholder-class="em-input-plholder"
						class="em-input col-000 fx1"
						v-model.trim="listParam.keyword"
						@confirm="getShopGoods"
					/>
					<text class="iconfont icon-close text-sm" @tap="cleanKeyword" v-show="listParam.keyword"></text>
				</view>
			</view>
		</view>
		<!--header-->
		<!--screen-->
		<view class="em-header-screen" :style="{ top: height + 'px' }">
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
				<view class="em-top-item em-icon-ml" v-if="!goods_shop_c_lv2" @tap="screen" data-index="4"><text>分类</text></view>
				<view class="em-top-item em-icon-ml" @tap="screen" data-index="3"><text>筛选</text></view>

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
		</view>
		<!--screen-->
		<!--顶部下拉筛选弹层 属性 分类-->
		<top-dropdown bgcolor="#fff" :show="dropScreenShow" :paddingbtm="110" :translatey="dropScreenH" @close="btnCloseDrop">
			<scroll-view class="em-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="em-seizeaseat-30"></view>
				<view class="category-box p-c">
					<view
						class="em-drop-item em-icon-middle"
						v-for="(item, index) in siblingList"
						:key="index"
						:class="{ act: index === selectIndex }"
						@tap.stop="btnSelected"
						:data-index="index"
					>
						<view class="text-ellipsis">{{ item.gc_name }}</view>
					</view>
				</view>

				<view class="em-seizeaseat-30"></view>
			</scroll-view>
			<view class="em-drop-btnbox">
				<view class="em-drop-btn em-btn-white" hover-class="em-white-hover" :hover-stay-time="150" @tap="reset">重置</view>
				<view class="em-drop-btn em-btn-red" hover-class="em-red-hover" :hover-stay-time="150" @tap="btnSure">确定</view>
			</view>
		</top-dropdown>
		<!---顶部下拉筛选弹层 属性-->

		<!--左抽屉弹层 筛选 -->
		<side-drawer mode="right" :project-items="indexItems" :visible="openSideDrawer" :height="height" :sideDraweH="sideDraweH" @close="closeSideDrawer" @selectItem="selectItem" @sure="sure"></side-drawer>
		<!--左抽屉弹层 筛选-->
		<!--list-->
		<view v-show="isShowTip"><null-data></null-data></view>

		<!--list-->
		<goods-lists :distribution="is_rebate==1" :style="{ marginTop: px(dropScreenH + 44) }" :is-list="isList" :goods-lists="goodsLists" class="em-product-list"></goods-lists>
		<view v-show="!isShowTip"><uni-load-more :status="loadStatus" :contentText="loadText" ></uni-load-more></view>
	</view>
</template>

<script>
import redirect from '../../mixins/redirect.js';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import TopDropdown from '../../components/lists/TopDropdown.vue';
import SideDrawer from '../../components/lists/SideDrawer.vue';
import GoodsLists from '../../components/lists/GoodsLists.vue';
import nullData from '../../components/lists/nullData.vue';
import mta from '../../mixins/mta';
export default {
	name: 'lists',
	mixins: [redirect,mta],
	components: {
		GoodsLists,
		TopDropdown,
		SideDrawer,
		uniLoadMore,
		nullData
	},
	data() {
		return {
			indexItems: [],
			sltIndexItem: '',
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
			selectIndex: 0, //选择分类
			pageIndex: 1,
			loadding: false,
			pullUpOn: true,
			loadStatus: 'loading',
			siblingList: [],
			gcId: null,
			keyword: null,
			listParam: {
				page: 1, //
				lastPage: 1, //最后一页
				keyword: ''
			},
      goods_shop_c_lv2:'',
			isShowTip: false, //数据空
			tempSide: {},
			is_rebate:'',
			shop_not_in:'',
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
		};
	},
	onLoad: function(options) {
		if (options.keyword) {
			this.listParam.keyword = decodeURIComponent(options.keyword);
			this.keyword = decodeURIComponent(options.keyword);
			// 搜索关键字进来，分类筛选没有默认
			this.selectIndex = -1;
		}
		if(options.is_rebate){
			this.is_rebate = Number(options.is_rebate)
			this.listParam.is_rebate = Number(options.is_rebate)
			uni.hideShareMenu();
		}
		if(options.shop_not_in){
			this.shop_not_in = Number(options.shop_not_in)
			this.listParam.shop_not_in = Number(options.shop_not_in)
		}
    if(options.shopclassid){
      this.listParam.goods_shop_c_lv2 = options.shopclassid;
      this.goods_shop_c_lv2 = options.shopclassid;
    }
		if (options.gc_id) {
			this.listParam.gc_id = options.gc_id;
			this.gcId = options.gc_id;
		}
		this.getList(true);
		this.getSiblingsList();
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
				this.width = obj.left || res.windowWidth;
				this.height = obj.top ? obj.top + obj.height + 8 : res.statusBarHeight + 44;
				this.inputTop = obj.top ? obj.top + (obj.height - 30) / 2 : res.statusBarHeight + 7;
				this.arrowTop = obj.top ? obj.top + (obj.height - 32) / 2 : res.statusBarHeight + 6;
				this.searchKey = options.searchKey || '';
				//略小，避免误差带来的影响
				this.dropScreenH = (this.height * 750) / res.windowWidth + this.height;
				this.sideDraweH = res.windowHeight - uni.upx2px(124) - this.height;
			}
		});
		this.getIndexItem();
	},
	mounted() {},
	// 监听用户下拉动作，一般用于下拉刷新
	onPullDownRefresh() {
		uni.pageScrollTo({
			scrollTop: 0
		});
	},
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
				this.getList();
				this.loadding = false;
				this.loadStatus = 'more';
			}, 500);
		}
	},
	methods: {
		getIndexItem() {
			this.$http({
				aurl: 'getIndexItem',
				data: { use_self: 1},
				success: res => {
					if (res.data.code === 0) {
						if(res.data.result.length > 0){
							this.indexItems = res.data.result;
							for(let i = 0; i < this.indexItems.length; i++){
								this.indexItems[i].active = false
							}
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
		getShopGoods(e) {
			this.keyword = e.detail.value;
			this.getList(true);
		},
		cleanKeyword() {
			this.$set(this.listParam, 'keyword', '');
		},
		getList(init) {
			if (init) {
				uni.pageScrollTo({
					scrollTop: 0
				});
				this.listParam.page = 1;
				this.goodsLists = [];
				this.pullUpOn = true;
			}
			if(this.goods_shop_c_lv2){
        this.listParam.goods_shop_c_lv2 = this.goods_shop_c_lv2;
      }
      const shop_id = uni.getStorageSync('shop_id');
			if(shop_id){
        this.listParam.shop_id = shop_id;
      }
			this.$http({
				aurl: 'getCateList',
				data: this.listParam,
				success: res => {
					if (init) {
						this.listParam.lastPage = res.data.result.last_page;
					}
					res.data.result.data.forEach(item => {
						this.goodsLists.push(item);
					});

					if (this.goodsLists.length > 0) {
						this.isShowTip = false;
					} else {
						this.isShowTip = true;
					}

					if (res.data.result.last_page === 1) {
						this.loadding = false;
						this.pullUpOn = false;
						this.loadStatus = 'noMore';
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		px(num) {
			return uni.upx2px(num) + 'px';
		},
		btnDropChange(e) {
			let index = e.currentTarget.dataset.index;
		},
		btnSelected(e) {
			let index = e.currentTarget.dataset.index;
			this.selectIndex = index;
		},
		reset() {
			if (this.gcId !== null) {
				this.selectIndex = 0;
			}
		},
		btnCloseDrop() {
			this.scrollTop = 1;
			this.$nextTick(() => {
				this.scrollTop = 0;
			});
			this.dropScreenShow = false;
			this.attrIndex = -1;
		},
		btnSure() {
			if (this.selectIndex === -1) {
				uni.showToast({
					title: '请选择分类',
					icon: 'none'
				});
				return;
			} else {
				this.listParam = {};
				this.listParam.gc_id = this.siblingList[this.selectIndex].id;
				if(this.shop_not_in){
					this.listParam.shop_not_in = this.shop_not_in
				}
				if(this.is_rebate){
					this.listParam.is_rebate = this.is_rebate
				}
				this.gcId = this.listParam.gc_id;
				this.keyword = '';
			}
			this.getList(true);
			this.btnCloseDrop();
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
			if (this.keyword) {
				this.listParam.keyword = this.keyword;
			} else {
				this.listParam.gc_id = this.gcId;
			}
			if(this.shop_not_in){
				this.listParam.shop_not_in = this.shop_not_in
			}
			// if(this.thematic){
			// 	this.listParam.thematic = this.thematic
			// }
			if(this.is_rebate){
				this.listParam.is_rebate = this.is_rebate
			}
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
			this.getList(true);
		},
		screen(e) {
			//筛选栏
			this.btnCloseDrop(); // 隐藏分类
			let index = Number(e.currentTarget.dataset.index);
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
				this.tabIndex = 1;
				if (!this.listParam.orderby) {
					this.listParam = {};
					if (this.keyword) {
						this.listParam.keyword = this.keyword;
					} else {
						this.listParam.gc_id = this.gcId;
					}
				}
				if(this.shop_not_in){
					this.listParam.shop_not_in = this.shop_not_in
				}
				// if(this.thematic){
				// 	this.listParam.thematic = this.thematic
				// }
				if(this.is_rebate){
					this.listParam.is_rebate = this.is_rebate
				}
				this.listParam.orderby = 'sold_quantity';
				this.listParam.direction = this.listParam.direction === 'desc' ? 'asc' : 'desc';
				this.getList(true);
			} else if (index === 2) {
				this.isList = !this.isList;
			} else if (index === 3) {
				this.openSideDrawer = true;
			} else if (index === 4) {
				this.dropScreenShow = true;
				this.$nextTick(() => {
					this.scrollTop = 0;
				});
			}
		},
		closeSideDrawer() {
			this.openSideDrawer = false;
		},
		sure(param) {
			this.openSideDrawer = false;
			if (JSON.stringify(this.tempSide) !== JSON.stringify(param)) {
				if (JSON.stringify(this.tempSide) == '{}') {
					this.tempSide = param;
				}else{
					this.listParam.start_price = param.ps;
					this.listParam.stop_price = param.pe;
					this.tempSide = param;
				}
			}
			this.listParam.gm_id = this.sltIndexItem
			this.getList(true);
		},
		toBack() {
			if (this.openSideDrawer) {
				this.closeSideDrawer();
			} else {
				uni.navigateBack();
			}
		},
		selectItem(item) {
			if(!item){
				this.sltIndexItem = '';
			}
			for(let i = 0; i < this.indexItems.length; i++){
				this.indexItems[i].active = false
				if(item){
					if(this.indexItems[i].gm_id == item.gm_id){
						this.indexItems[i].active = true
						this.sltIndexItem = item.gm_id
					}
				}
			}
		},
		getSiblingsList() {
			this.$http({
				aurl: 'getSiblingsList',
				data: {
					gc_id: this.gcId
				},
				success: res => {
					let list = res.data.result;
					if (list.length !== 0) {
						this.siblingList = list;
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
.em-header-box
	width 100%
	background #fff
	position fixed
	z-index 99998
	left 0
	top 0
.em-header
	display flex
	align-items flex-start
.em-back
	margin-left 8rpx
	height 32px !important
	width 32px !important
.header-icon
	font-size 44rpx
	margin-left 10rpx
	line-height 64rpx
	font-weight 400
.em-searchbox
	width 100%
	height 30px
	margin-right 30rpx
	border-radius 15px
	font-size 12px
	background $page-color-base
	padding 3px 10px
	box-sizing border-box
	color #999
	display flex
	align-items center
	overflow hidden
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
	width 100%
	box-sizing border-box
	background #fff
	position fixed
	z-index 1000
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
.em-input
	padding-left $margin-xs
</style>
