<template>
	<view>
		<view class="search-box">
			<text class="iconfont icon-search_light"></text>
			<input confirm-type="search" placeholder="搜索" @confirm="searchKw" />
		</view>
		<view class="tab-wrap">
			<view class="tab-nav" :class="{ active: index == tabData.index }" @tap="onChangeIndex" v-for="(item, index) in tabData.list" :data-index="index" :key="index">
				<text class="text-md">{{ item }}</text>
				<text class="iconfont icon-unfold text-sm"></text>
			</view>
		</view>
		<view class="tab-box">
			<!-- 楼层 -->
			<view class="tab-item" v-show="tabData.index === 0">
				<view class="floor">
					<brand-info :info="floorList" @tapItem="tapItem" @tapLike="like"></brand-info>
					<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
				</view>
			</view>
			<!-- 分类 -->
			<view class="tab-item" v-show="tabData.index === 1">
				<view class="category fxBox" :style="{ height: cateHeight + 'px' }">
					<scroll-view scroll-y>
						<view class="left-box">
							<view class="cate-lv1" :class="{ active: index === cateIndex }" @tap="changeCate" :data-index="index" v-for="(lv1, index) in category" :key="index">
								<view class="text-ellipsis">
									<text>{{ lv1.label }}</text>
								</view>
							</view>
						</view>
					</scroll-view>

					<view class="right-box">
						<view class="tab" v-for="(item, index) in category" :key="index" v-show="cateIndex === index">
							<view class="fxBox tit" v-for="(lv2, index) in item.children" :key="index" @tap="floorCat" :data-cat_id="lv2.value">
								<text class="fx1">{{ lv2.label }}</text>
								<text>{{ lv2.count_shop }}</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 品牌下拉筛选 -->
		<top-dropdown bgcolor="#fff" :show="dropScreenShow" :paddingbtm="110" @close="btnCloseDrop">
			<scroll-view class="em-scroll-box" scroll-y :scroll-top="scrollTop">
				<view class="tips"><text>楼层选择（可多选）</text></view>
				<view class="category-box">
					<view
						class="em-drop-item em-icon-middle"
						v-for="(item, index) in floorFliter"
						:key="item.value"
						:class="{ act: item.selected }"
						@tap.stop="btnSelected"
						:data-index="index"
					>
						<view class="text-ellipsis">{{ item.name }}</view>
					</view>
				</view>

				<view class="em-seizeaseat-30"></view>
			</scroll-view>
			<view class="em-drop-btnbox">
				<view class="em-drop-btn em-btn-white" hover-class="em-white-hover" :hover-stay-time="150" @tap="btnReset">重置</view>
				<view class="em-drop-btn em-btn-red" hover-class="em-red-hover" :hover-stay-time="150" @tap="btnSure">确定</view>
			</view>
		</top-dropdown>
	</view>
</template>
<script>
import diyTitle from '../../components/diyTitle/diyTitle.vue';
import brandInfo from './components/brandInfo.vue';
import TopDropdown from '../../components/lists/TopDropdown.vue';
import goods from '../../mock/goods.js';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import cartNum from '../../mixins/cartNum';
import mta from '../../mixins/mta';
export default {
	onLoad(options) {
		if(options.gm_id){
			this.gm_id= options.gm_id
			this.listParam.gm_id = options.gm_id
		}
		uni.getSystemInfo({
			success: res => {
				this.cateHeight = res.windowHeight;
			}
		});
	},
  mixins: [cartNum,mta],
	data() {
		return {
			gm_id: '',
			orderLists: goods.orderLists,
			dropScreenShow: false,
			selectIndex: -1, //选择分类
			floorFliter: [], //楼层筛选
			cateHeight: 0,
			cateIndex: 0,
			tabData: {
				list: ['楼层', '分类'],
				index: 0
			},
			floorList: [], //楼层列表
			category: [], //分类树
			listParam: {
				gm_id: '',
			},
			loadStatus: 'loading',
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
		};
	},
	mounted() {
		// this.getFloor(true);
		// this.getTree();
		// this.getFloorId();
	},
	onReachBottom() {
		if (this.listParam.page == this.listParam.lastPage) {
			this.loadStatus = 'noMore';
		} else {
			this.listParam.page++;
			setTimeout(() => {
				this.getFloor();
			}, 300);
		}
	},
	methods: {
		getFloor(init) {
			if (init) {
				this.floorList = [];
				this.listParam.page = 1;
				this.listParam.lastPage = 1;
				this.loadStatus = 'loading';
			}
			this.$http({
				aurl: 'brandList',
				data: this.listParam,
				success: res => {
					console.log(res)
					let list = res.data.result.lists.data;
					let lastPage = res.data.result.lists.last_page;
					if (init) {
						if (lastPage === 1) {
							this.loadStatus = 'noMore';
						} else {
							this.listParam.lastPage = lastPage;
						}
					}
					if (list.length !== 0) {
						list.forEach(item => {
							this.floorList.push(item);
						});
					}
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		},
		getTree() {
			this.$http({
				aurl: `brandCategory`,
				data: {
					gm_id: this.gm_id,
				},
				success: res => {
					let tree = res.data.result;
					if (tree.length !== 0) {
						this.category = tree;
					}else{
						this.category = []
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getFloorId() {
			this.$http({
				aurl: 'floorId',
				data: {
					gm_id: this.gm_id,
				},
				success: res => {
					console.log(res.data);
					let idlist = res.data.result;
					if (idlist.length !== 0) {
						idlist.forEach(item => {
							item.selected = false;
							this.floorFliter.push(item);
						});
					}else{
						this.floorFliter = []
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		searchKw(e) {
			//搜索
			this.listParam = {};
			this.listParam.keyword = e.detail.value;
			this.getFloor(true);
		},
		onChangeIndex(e) {
			let index = e.currentTarget.dataset.index;
			this.tabData.index = index;
			if (index === 0) {
				this.dropScreenShow = !this.dropScreenShow;
			}
		},
		onClickItem(index) {},
		phone(e) {
			console.log('打电话。。');
		},
		like(index) {
			this.floorList[index].like = !this.floorList[index].like;

			console.log('linke。。' + index);
		},
		changeCate(e) {
			let index = e.currentTarget.dataset.index;
			this.cateIndex = index;
		},
		btnCloseDrop() {
			//关闭蒙版
			this.scrollTop = 1;
			this.$nextTick(() => {
				this.scrollTop = 0;
			});
			this.dropScreenShow = false;
			this.attrIndex = -1;
		},
		btnSelected(e) {
			//选择楼层
			let index = e.currentTarget.dataset.index;
			let item = this.floorFliter[index];
			item.selected = !item.selected;
			this.$set(this.floorFliter, index, item);
		},
		btnReset() {
			//筛选重置
			this.floorFliter.map((item, index) => {
				this.$set(this.floorFliter[index], 'selected', false);
			});
		},
		btnSure() {
			//筛选楼层
			let selectArr = [];
			this.listParam = {
				gm_id: this.gm_id
			};
			this.listParam.floors_id_arr = [];
			this.floorFliter.map((item, index) => {
				if (item.selected) {
					this.listParam.floors_id_arr.push(item.id);
				}
			});
			this.getFloor(true);
			this.btnCloseDrop();
		},
		floorCat(e) {
			//分类楼层
			this.listParam = {
				gm_id: this.gm_id
			};
			let cat_id = e.currentTarget.dataset.cat_id;
			this.listParam.rel_cat_id = cat_id;

			console.log(this.listParam);
			this.getFloor(true);
			this.tabData.index = 0;
		},
		toList() {
			uni.navigateTo({
				url: './lists'
			});
		},
		tapItem(index) {
			let shopid = this.floorList[index].id;
			uni.navigateTo({
				url: `/pagesA/brand/lists?shopid=${shopid}`
			});
		}
	},
  onShow(){
		this.getFloor(true);
		this.getTree();
		this.getFloorId();
		this.getCartNum()
  },
	components: {
		brandInfo,
		TopDropdown,
		uniLoadMore
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'

.tab-wrap
	display flex
	background #fff
	padding $margin-lg 0
	.tab-nav
		flex 1
		text-align center
		height 40rpx
		line-height 40rpx
		overflow hidden
		text
			display inline-block
			vertical-align middle
		.iconfont
			margin-left $margin-xs
			transition all 0.6 ease-out
	& .tab-nav:nth-child(2)
		border-left 1px solid $border-color-dark
	& .tab-nav.active
		color $theme-red
.floor // 楼层
	padding $margin-xs $page-row-spacing
	>>> .brand-info
		border-radius $em-border-radius-lg
.category // 分类
	position relative
	.left-box
		width 160rpx
		.text-ellipsis
			padding 0 $margin-xs
		.cate-lv1
			height 80rpx
			line-height @height
			text-align center
			position relative
		& ::before
			content ''
			display none
			position absolute
			left 0
			width 8rpx
			height 70%
			top 15%
			background-color $theme-red
		& .active::before
			display block
		& .active
			background #fff
			text
				font-weight bold
	.right-box
		position absolute
		left 160rpx
		height 100%
		width calc(100% - 160rpx)
		background #fff
		.tab
			background none
			margin-left $margin-md
			.tit
				height 80rpx
				line-height @height
				border-bottom 1px solid $border-color-dark
				padding-right $margin-md
.search-box
	background #fff
	padding-left $page-row-spacing
	padding-right $page-row-spacing
	position relative
	.icon-search_light
		position absolute
		left 40rpx
		top 15rpx
	input
		height 60rpx
		line-height @height
		background-color $bgc-grey-20
		border-radius $em-border-radius-lg
		padding-left 50rpx
// 楼层筛选
.em-scroll-box
	width 100%
	height 480rpx
	box-sizing border-box
	position relative
	z-index 99
	color #fff
	word-break break-all
	.tips
		padding $margin-md
		padding-left $page-row-spacing
		text
			font-size $font-base
			color $em-text-color
.category-box
	padding-left $page-row-spacing
	padding-right $page-row-spacing
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
</style>
