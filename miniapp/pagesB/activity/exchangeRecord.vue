<template>
	<view>
		<view class="record">
			<view class="record_nav">
				<view class="nav_item nav_left" :class="[selectIndex==0?'nav_select':'']" @click="changeSelect(0)">
					积分
				</view>
				<view class="nav_item" :class="[selectIndex==1?'nav_select':'']" @click="changeSelect(1)">
					牛币
				</view>
			</view>
			<view class="record_list" v-if="selectIndex==0">
				<view class="list_li" @click="toOrderDetail(item)" v-for="(item, index) in pointExchangeList" :key="index">
					<view class="li_time">{{item.created_at}}</view>
					<view class="li_desc">
						<view class="li_title">{{item.behavior}}</view>
						<view class="li_count">{{item.behavior_type == 'obtain' ? '+' : '-'}}{{item.point}}积分</view>
					</view>
					<view class="li_good" v-if="item.tradeInfo.goods_name">
						<view class="good_img">
							<image :src="item.tradeInfo.goods_image"/>
						</view>
						<view class="good_info">
							<view class="info_title">{{item.tradeInfo.goods_name}}</view>
							<view class="info_desc">￥{{item.tradeInfo.amount}}+{{item.point}}积分</view>
						</view>
					</view>
				</view>
				<uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
			</view>
			<view class="record_list" v-else>
				<view class="list_li list_record_img" @click="toOrderDetail(item)" v-for="(item, index) in coinExchangeList" :key="index">
                    <view class="li_time">{{item.created_at}}</view>
					<view class="li_desc"><view class="li_title">{{item.behavior}}</view><view class="li_count">{{item.behavior_type == 'obtain' ? '+' : '-'}}{{item.point}}牛币</view></view>
					<view class="li_good" v-if="item.tradeInfo.goods_name">
					  <view class="good_img">
							<image :src="item.tradeInfo.goods_image"/>
						</view>
					  <view class="good_info">
						  <view class="info_title">{{item.tradeInfo.goods_name}}</view>
						  <view class="info_desc">￥{{item.tradeInfo.amount}}+{{item.point}}牛币</view>
					  </view>
					</view>
				</view>
				<uni-load-more :status="loadStatus1" :contentText="loadText"></uni-load-more>
			</view>
<!--			<view class="floor">-->
<!--				<div class="floor_line"></div>-->
<!--				暂无更多数据-->
<!--				<div class="floor_line"></div>-->
<!--			</view>-->
		</view>
	</view>
</template>
<script>
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
export default {
  data(){
	  return{
			loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
			loadStatus: 'loading',
			loadMore: {
				current: 1,
				last: 1,
				flat: false
			},
			loadStatus1: 'loading',
			loadMore1: {
				current: 1,
				last: 1,
				flat: false
			},
		  selectIndex:0,
			pointExchangeList: [],
			coinExchangeList: [],
	  }
  },
	components:{
		uniLoadMore,
	},
	onLoad (option) {
  	if(option.selectIndex){
			this.selectIndex = option.selectIndex
		}
		this.getPointExchangeList()
		this.getCointExchangeList()
	},
	onshow () {

	},
	onReachBottom() {
  	if (this.selectIndex === 0){
			if (this.loadMore.flat) return;
			this.loadStatus = 'loading';
			setTimeout(() => {
				if (this.pointExchangeList.length !== 0) {
					this.loadMore.current++;
				}
				this.getPointExchangeList()
			}, 500);
		} else {
			if (this.loadMore1.flat) return;
			this.loadStatus1 = 'loading';
			setTimeout(() => {
				if (this.coinExchangeList.length !== 0) {
					this.loadMore1.current++;
				}
				this.getCointExchangeList()
			}, 500);
		}
	},
  methods:{
  	toOrderDetail(item){
  		if(item.log_type === 'exchange'){
				this.needTokenQueryLink('/pagesA/user/order/detail',{tid:item.log_obj})
			}
		},
	  changeSelect(val){
		  this.selectIndex=val;
	  },
	  getPointExchangeList () {
			this.$http({
				aurl: 'pointExchangeList',
				data: {
					is_self: 0,
					page: this.loadMore.current,
				},
				success: res => {
					if(res.data.code===0){
						// console.log(res,999)
						// this.pointExchangeList = res.data.result.data
						let data = res.data.result;
						this.loadMore.last = data.last_page;
						if (data.data.length) {
							data.data.map(item => {
								this.pointExchangeList.push(item);
							});
						}
						if (this.loadMore.current === this.loadMore.last) {
							this.loadMore.flat = true;
							this.loadStatus = 'noMore';
						} else {
							this.loadStatus = 'more';
							this.loadMore.flat = false;
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getCointExchangeList () {
			this.$http({
				aurl: 'pointExchangeList',
				data: {
					is_self: 1,
					page: this.loadMore1.current,
				},
				success: res => {
					if(res.data.code===0){
						let data = res.data.result;
						this.loadMore1.last = data.last_page;
						if (data.data.length) {
							data.data.map(item => {
								this.coinExchangeList.push(item);
							});
						}
						if (this.loadMore1.current === this.loadMore1.last) {
							this.loadMore1.flat = true;
							this.loadStatus1 = 'noMore';
						} else {
							this.loadStatus1 = 'more';
							this.loadMore1.flat = false;
						}
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		}

	}
}
</script>
<style lang="less" scoped>
.record{
	position: relative;
	.record_nav{
		position: relative;
		width: 100%;
		display: flex;
		align-items: center;
		justify-content: space-around;
		padding: 20rpx 0;
		box-sizing: border-box;
		background-color: #fff;
		border-bottom: 1px solid #d7d7d7;
		.nav_item{
			font-size: 32rpx;
			color: #666;
			display: flex;
			justify-content: center;
			align-items: center;
			position: relative;
			flex: 1;
		}
		.nav_select{
			color: #FF173E;
		}
		.nav_left::after{
            position: absolute;
			width: 200%;
			height: 200%;
			left: -50%;
			top: -50%;
			border-right: 1px solid #ccc;
			transform: scale(0.5);
		}
		.nav_left{
			border-right: 1px solid #d7d7d7;
		}

	}
	.record_nav::after{
			position: absolute;
			width: 200%;
			height: 200%;
			left: -50%;
			top: -50%;
			border-bottom: 1px solid #ccc;
			transform: scale(0.5);
	}
	.record_list{
		padding: 24rpx 20rpx 0 20rpx;
		position: relative;
		.list_li{
			background-color: #fff;
			border-radius: 16rpx;
			padding: 20rpx;
			margin-bottom: 16rpx;
			.li_time{
				font-size: 24rpx;
				color: #999;
				margin-bottom: 24rpx;
			}
			.li_desc{
				font-size: 32rpx;
				color: #333333;
				display: flex;
				/*align-items: center;*/
				justify-content: space-between;
				margin-bottom: 24rpx;
				line-height: 42rpx;
				.li_title{
					word-break: break-all;
				}
				.li_count{
					flex-shrink: 0;
					margin-left: 20rpx;
				}
			}
			.li_good{
				display: flex;
				align-items: center;
				.good_img{
					width: 100rpx;
					height: 100rpx;
					flex-shrink: 0;
					image{
						width: 100%;
						height: 100%;
					}
				}
				.good_info{
					padding: 18rpx 0 18rpx 16rpx;
					box-sizing: border-box;
					color: #666;
					font-size: 24rpx;
					overflow: hidden;
					.info_title{
						overflow: hidden;
						text-overflow:ellipsis;
						white-space: nowrap;
						margin-bottom: 16rpx;
					}
					.info_desc{
						margin-bottom: 16rpx;
					}
				}
			}
		}
	}
	.floor{
		padding: 32rpx 0;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999;
		font-size: 24rpx;
		.floor_line{
			height: 0px;
			width: 40rpx;
			border-top: 1px solid #ccc;
			padding: 0 20rpx;
			margin: 0 20rpx;

		}
	}
}
</style>
