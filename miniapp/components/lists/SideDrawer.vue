<template>
	<view class="em-drawer-class em-drawer" :class="[visible ? 'em-drawer-show' : '', 'em-drawer-' + mode]">
		<view v-if="mask" class="em-drawer-mask" @tap="handleMaskClick"></view>
		<view class="em-drawer-container">
			<view class="em-drawer-box" :style="{ paddingTop: height + 'px' }">
				<scroll-view class="em-drawer-scroll" scroll-y :style="{ height: sideDraweH + 'px',background: '#fff', borderTopLeftRadius: '24rpx',paddingTop: '20rpx',boxSizing: 'border-box'}">
					<view class="em-drawer-title"><text class="em-title-bold">价格区间</text></view>
					<view class="em-drawer-content">
						<input placeholder-class="em-phcolor" class="em-input" placeholder="最低价" maxlength="11" type="number" v-model="ps" />
						<text class="text-l col-999">-</text>
						<input placeholder-class="em-phcolor" class="em-input" placeholder="最高价" maxlength="11" type="number" v-model="pe" />
					</view>
					<view class="drawer-item">
						<view class="em-drawer-title"><text class="em-title-bold">项目筛选</text></view>
						<view class="em-drawer-content em-flex-attr">
							<view class="em-attr-item item-project" :class="{'em-btmItem-active': item.active}" @tap="tapItem(item,index)" v-for="(item,index) in projectItems" :key="index">
								<view class="em-attr-ellipsis">{{item.platform_name}}</view>
							</view>
						</view>
					</view>
<!--					<view class="drawer-item">-->
<!--						<view class="em-drawer-title">-->
<!--							<text class="em-title-bold">全部分类</text>-->
<!--							<view class="em-all-box em-icon-ml">-->
<!--								<view class="em-attr-right">全部</view>-->
<!--								<text class="iconfont icon-right text-sm"></text>-->
<!--							</view>-->
<!--						</view>-->
<!--						<view class="em-drawer-content em-flex-attr">-->
<!--							<view class="em-attr-item" @tap="tapItem"><view class="em-attr-ellipsis">男装</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">女装</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">运动服饰</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">户外鞋服</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">文化</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">服饰配件</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">流行男鞋</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">艺术</view></view>-->
<!--						</view>-->
<!--					</view>-->
<!--					<view class="drawer-item">-->
<!--						<view class="em-drawer-title"><text class="em-title-bold">品牌</text></view>-->
<!--						<view class="em-drawer-content em-flex-attr">-->
<!--							<view class="em-attr-item em-btmItem-active"><view class="em-attr-ellipsis">花花公子</view></view>-->
<!--							<view class="em-attr-item em-btmItem-active"><view class="em-attr-ellipsis">七匹狼（SEPTWOLVES）</view></view>-->
<!--							<view class="em-attr-item"><view class="em-attr-ellipsis">吉普</view></view>-->
<!--						</view>-->
<!--					</view>-->
					<view class="em-safearea-bottom"></view>
				</scroll-view>
				<view class="em-attr-btnbox">
					<view class="em-attr-safearea">
						<view class="em-drawer-btn em-drawerbtn-black" hover-class="em-white-hover" :hover-stay-time="150" @tap="reset">重置</view>
						<view class="em-drawer-btn em-drawerbtn-primary" hover-class="em-red-hover" :hover-stay-time="150" @tap="sure">
							确定
							<!-- <text class="fs">(80万+件商品)</text> -->
						</view>
					</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	name: 'SideDrawer',
	props: {
		visible: {
			type: Boolean,
			default: false
		},
		projectItems: Array,
		mask: {
			type: Boolean,
			default: true
		},
		maskClosable: {
			type: Boolean,
			default: true
		},
		mode: {
			type: String,
			default: 'left' // left right
		},
		height: {
			type: Number,
			default: 64
		},
		sideDraweH: {
			type: Number,
			default: 0
		}
	},
	data() {
		return {
			ps: '',
			pe: '',
		};
	},

	methods: {
		handleMaskClick() {
			if (!this.maskClosable) {
				return;
			}
			this.$emit('close');
		},
		sure() {
			let param = {};
			param.ps = this.ps;
			param.pe = this.pe;
			this.$emit('sure', param);
		},
		tapItem(item) {
			this.$emit('selectItem', item);
		},
		reset() {
			this.ps = '';
			this.pe = '';
			this.tapItem('')
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'

.em-drawer
	visibility hidden
.em-drawer-show
	visibility visible
	.em-drawer-mask
		display block
		opacity 1
	.em-drawer-container
		opacity 1
.em-drawer-show.em-drawer-left .em-drawer-container, .em-drawer-show.em-drawer-right .em-drawer-container
	transform translate3d(0, -50%, 0)
.em-drawer-mask
	opacity 0
	position fixed
	top 0
	left 0
	right 0
	bottom 0
	z-index 8888
	background rgba(0, 0, 0, 0.6)
	transition all 0.3s ease-in-out
.em-drawer-container
	position fixed
	left 50%
	height 100%
	top 0
	transform translate3d(-50%, -50%, 0)
	transform-origin center
	transition all 0.3s ease-in-out
	z-index 99999
	opacity 0
	overflow-y scroll
	/*background #fff*/
	-webkit-overflow-scrolling touch
	-ms-touch-action pan-y cross-slide-y
	-ms-scroll-chaining none
	-ms-scroll-limit 0 50 0 50
.em-drawer-left .em-drawer-container
	left 0
	top 50%
	transform translate3d(-100%, -50%, 0)
.em-drawer-right .em-drawer-container
	right 0
	top 50%
	left auto
	transform translate3d(100%, -50%, 0)
.em-drawer-box
	width 89vw
	font-size 24rpx
	overflow hidden
	position relative
	padding-bottom 124rpx
.em-drawer-title
	display flex
	align-items center
	justify-content space-between
	padding 0 32rpx
	box-sizing border-box
	height 80rpx
.em-title-bold
	font-size 26rpx
	font-weight bold
	flex-shrink 0
.em-location
	margin-right 6rpx
.em-attr-right
	width 70%
	white-space nowrap
	overflow hidden
	text-overflow ellipsis
	text-align right
.em-all-box
	width 90%
	white-space nowrap
	display flex
	align-items center
	justify-content flex-end
.em-drawer-content
	padding 5rpx 32rpx 20rpx
	display flex
	align-items center
	justify-content space-between
	box-sizing border-box
.em-input
	border 0
	height 64rpx
	border-radius 32rpx
	width 47%
	background #F2F3F4
	text-align center
	font-size 24rpx
	color #333
.em-phcolor
	text-align center
	color #999
	font-size 24rpx
.em-flex-attr
	flex-wrap wrap
	justify-content flex-start
.em-attr-item
	width 30%
	height 64rpx
	background #F2F3F4
	display flex
	align-items center
	justify-content center
	padding 0 4rpx
	box-sizing border-box
	border-radius 32rpx
	margin-right 5%
	margin-bottom 5%
	color #999
	border 1rpx solid #F2F3F4
	&.item-project
		width 47%
		margin-right 6%
		&:nth-of-type(2n)
			margin-right 0
		&:nth-of-type(3n)
			margin-right 6%
	&.em-btmItem-active
		color #FF173E
		background #FFE5E9
		border-color #FF173E
.em-attr-ellipsis
	white-space nowrap
	text-overflow ellipsis
	overflow hidden
	width 96%
	text-align center
.em-attr-item:nth-of-type(3n)
	margin-right 0%
.em-attr-btnbox
	width 100%
	position absolute
	left 0
	bottom 0
	box-sizing border-box
	background #fff
.em-attr-safearea
	height 124rpx
	padding 0 32rpx
	display flex
	align-items center
	justify-content space-between
	/**padding-bottom env(safe-area-inset-bottom)**/
.em-safearea-bottom
	width 100%
	height env(safe-area-inset-bottom)
/**.em-attr-btnbox::before
	content ''
	position absolute
	top 0
	right 0
	left 0
	border-top 1rpx solid #eaeef1
	-webkit-transform scaleY(0.5)
	transform scaleY(0.5)**/
.em-drawer-btn
	width 47%
	text-align center
	height 76rpx
	flex-shrink 0
	display flex
	align-items center
	justify-content center
	box-sizing border-box
	font-size 30rpx
	border-radius 38rpx
.fs
	font-size $font-sm
.em-drawerbtn-black
	background none
	color #333
	border 1rpx solid #666666
.em-drawerbtn-primary
	background $font-color-primary
	color #fff
	border 1rpx solid $font-color-primary

.em-active
	color $font-color-primary
</style>
