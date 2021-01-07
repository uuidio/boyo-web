<template>
	<view class="coupon-page">
		<view class="tab">
			<scroll-view scroll-x="true" class="tab-box">
				<view class="item" :class="[currentIndex === index ? 'active' : '']" v-for="(item, index) in tab" :data-index="index" @tap="changeTab" :key="item.class_id">
					{{ item.name }}
				</view>
			</scroll-view>
		</view>
		<view class="coupon-wrap" v-for="(tab, tabIndex) in tab" :data-index="tabIndex" :key="tabIndex" v-show="currentIndex === tabIndex">
			<view>
				<coupon-item
					@showInfo="showInfo(cpIndex)"
					@get="getCP(item.id, cpIndex)"
					v-for="(item, cpIndex) in tabList[currentIndex].list"
					:showDetail="item.isShow"
					:key="item.id"
					:info="item"
					:couponInfo="item.coupon_info"
				></coupon-item>
			</view>
			<view v-if="tabList[currentIndex].isNull"><null-data tip="没有可以领取的优惠券了"></null-data></view>
			<view v-else><uni-load-more :status="tabList[currentIndex].loadStatus"></uni-load-more></view>
		</view>
	</view>
</template>

<script>
import couponItem from '../../components/user/coupon.vue';
import nullData from '../../components/lists/nullData.vue';
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import mta from '../../mixins/mta';
export default {
  mixins: [mta],
	onLoad: function(options) {
		if(options.gm_id){
			this.gm_id = options.gm_id
		}else{
			this.gm_id = uni.getStorageSync('gmToken')
		}
	},
	onShow() {
		let isLogin = uni.getStorageSync('user_token');
		this.apiUrl = isLogin ? 'couponCentreLogin' : 'couponCentre';
		this.getCouponTab(); //获取 tab 后获取列表
	},
	onShareAppMessage(){
		return {
			title: '快来领取优惠吧！',
			desc: '',
			path: '/pagesB/activity/couponList?gm_id='+this.gm_id,
		}
	},
	onReachBottom() {
		let tItem = this.tabList[this.currentIndex];
		if (!tItem.onPull) return;
		// console.log(tItem.currentPage, tItem.lastPage);
		if (tItem.currentPage === tItem.lastPage) {
			tItem.loadStatus = 'noMore';
			tItem.onPull = false;
		} else {
			// console.log(tItem.loadStatus);
			tItem.loadStatus = 'loading';
			tItem.currentPage++;
			setTimeout(() => {
				this.getList(this.tab[this.currentIndex].all_platform, this.tab[this.currentIndex].class_id);
				tItem.loadStatus = 'more';
			}, 1000);
		}
	},
	mounted() {
	},
	data() {
		return {
			gm_id: '',
			apiUrl: '',
			isShow: false,
			list: [],
			tab: [],
			currentIndex: 0,
			tabList: []
		};
	},
	methods: {
		showInfo(index) {
			this.tabList[this.currentIndex].list[index].isShow = !this.tabList[this.currentIndex].list[index].isShow;
		},
		getCP(id, index) {
			this.$http({
				aurl: 'getCoupon',
				data: {
					coupon_id: id,
					gm_id: this.gm_id,
				},
				success: res => {
					if (res.data.code === 0) {
						this.tabList[this.currentIndex].list.splice(index, 1);
						uni.showToast({
							title: '领取成功',
							icon: 'none'
						});
						if (this.tabList[this.currentIndex].list.length === 0) {
							this.tabList[this.currentIndex].isNull = true;
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getList(isAll, id, init) {
			let param = {
				size: 10,
				coupon_scenes : this.tab[this.currentIndex].coupon_scenes,
				page: this.tabList[this.currentIndex].currentPage,
				gm_id: this.gm_id,
			};

			if (isAll) {
				param.all_platform = true;
			} else {
				param.class_id = id || '';
			}
			this.$http({
				aurl: this.apiUrl,
				data: param,
				success: res => {
					let list = res.data.result.data;
					let tItem = this.tabList[this.currentIndex];
					if (init) {
						tItem.lastPage = res.data.result.last_page;
						tItem.init = true;
						if (tItem.currentPage === tItem.lastPage) {
							tItem.onPull = false;
							tItem.loadStatus = 'noMore';
						}
					}
					if (list.length > 0) {
						let arr = [];
						list.forEach((item, index) => {
							item.isShow = false;
							arr.push(item);
						});
						if(init){
							tItem.list = arr
						}else{
							tItem.list = tItem.list.concat(arr)
						}
					} else {
						tItem.isNull = true;
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getCouponTab() {
			this.$http({
				aurl: 'getCouponTab',
				data: {
					gm_id: this.gm_id,
				},
				success: res => {
					let result = res.data.result;
					this.tab = result;
					result.forEach(item => {
						this.tabList.push({
							list: [],
							currentPage: 1,
							lastPage: 1,
							onPull: true,
							isNull: false,
							init: false,
							loadStatus: 'loading',
							item: item
						});
					});
					this.getList(false, '',true); //获取列表
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		changeTab(e) {
			let index = e.currentTarget.dataset.index;
			let isAll = this.tab[index].all_platform;
			let classId = this.tab[index].class_id;
			this.currentIndex = index;
			if (!this.tabList[index].init) {
				this.getList(isAll, classId, true);
			}
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
.tab-box
	white-space nowrap
	height 76rpx
	line-height @height
	background #fff
	.item
		display inline-block
		min-width 150rpx
		margin-right $margin-sm
		text-align center
		font-size $font-base
		&.active
			color $theme-red
</style>
