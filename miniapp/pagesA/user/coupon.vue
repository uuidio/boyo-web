<template>
	<view class="coupon-page">
		<view class="tab-box fxBox1">
			<view class="fx1" :class="{ active: currentIndex === index }" v-for="(item, index) in tabNav" :key="index" @tap="changeTab(index)">{{ item }}</view>
		</view>

		<view class="coupon-wrap" v-for="(tab, tabIndex) in listArr" v-show="currentIndex === tabIndex" :key="tabIndex">
			<coupon-item
				v-for="(item, index) in listArr[currentIndex].list"
				:info="item"
				:couponInfo="item.coupon_info"
				@showInfo="showInfo(index)"
				:showDetail="item.isShow"
				:showButton="false"
				:key="item.coupon_code"
			></coupon-item>
			<view v-if="listArr[currentIndex].isNull"><null-data tip="暂无相关优惠券～" :key="tabIndex"></null-data></view>
			<view v-else><uni-load-more :status="listArr[currentIndex].loadStatus"></uni-load-more></view>
		</view>
		<view class="btn-box">
			<navigator url="/pagesB/activity/couponList"><button type="warn">领更多好券</button></navigator>
		</view>
	</view>
</template>

<script>
import couponItem from './component/coupon.vue';
import nullData from '../../components/lists/nullData.vue';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import mta from '../../mixins/mta';
export default {
  mixins: [mta],
	onLoad: function() {
		for (let item in this.tabNav) {
			this.listArr.push({ list: [], isNull: false, init: false, currentPage: 1, lastPage: 1, loadStatus: 'loading', onPull: true });
		}
	},
	onShow() {
		let status = this.currentIndex+1;
		this.getList(true, status);
	},
	onReachBottom() {},
	mounted() {},
	data() {
		return {
			tabNav: ['未使用', '已使用', '已过期'],
			currentIndex: 0,
			isNull: false,
			list: [],
			listArr: []
		};
	},
	onReachBottom() {
		let thisItem = this.listArr[this.currentIndex];
		if (!thisItem.onPull) return;
		thisItem.loadStatus = 'loading';
		if (thisItem.currentPage === thisItem.lastPage) {
			thisItem.loadStatus = 'noMore';
			thisItem.onPull = false;
		} else {
			thisItem.currentPage++;
			setTimeout(() => {
				this.getList(false, this.currentIndex + 1);
				this.listArr[this.currentIndex].loadStatus = 'more';
			}, 3000);
		}
	},
	methods: {
		getList(init = false, status) {
			this.$http({
				aurl: 'getUserCoupon',
				data: {
					status,
					size: '10',
					page: init ? 1 : this.listArr[this.currentIndex].currentPage
				},
				success: res => {
					let list = res.data.result.data;
					console.log('优惠券列表',list);
					if (init) {
						this.listArr[this.currentIndex].list = [];
						this.listArr[this.currentIndex].init = true;
						this.listArr[this.currentIndex].lastPage = res.data.result.last_page;
						this.listArr[this.currentIndex].currentPage = 1;
						if (this.listArr[this.currentIndex].currentPage === res.data.result.last_page) {
							this.listArr[this.currentIndex].loadStatus = 'noMore';
							this.listArr[this.currentIndex].onPull = false;
						}
					}
					if (list.length > 0) {
						list.forEach((item, index) => {
							item.isShow = false;
							this.listArr[this.currentIndex].list.push(item);
						});
						this.listArr[this.currentIndex].isNull = false;
					} else {
						this.listArr[this.currentIndex].isNull = true;
					}
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		},
		showInfo(index) {
			return true;
			let item = this.listArr[this.currentIndex].list[index];
			item.isShow = !item.isShow;
		},
		changeTab(index) {
			this.currentIndex = index;
			let isInit = this.listArr[this.currentIndex].init;
			// if (!isInit) {
				this.getList(true, this.currentIndex + 1);
			// }
		}
	},
	components: {
		couponItem,
		nullData,
		uniLoadMore
	}
};
</script>

<style scoped lang="stylus">
@import '../../variable.styl'

.coupon-wrap
	padding $margin-md
	padding-bottom $margin-md * 4
.tab-box
	background #fff
	.fx1
		text-align center
		height 70rpx
		line-height 70rpx
		&.active
			color $theme-red
.btn-box
	button
		border-radius 0
		padding $margin-md
		position fixed
		bottom 0
		width 100%
</style>
