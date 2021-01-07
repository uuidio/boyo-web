<template>
	<view>
		<view class="me_center">
			<view class="me_info">
			   <view class="me_img">
					 <open-data type="userAvatarUrl"></open-data>
<!--				   <img src="../../static/images/logo.png"/>-->
			   </view>
			   <view class="integral_info">
				   <view class="me_integral">我的牛币：<span class="span">{{myCoin}}</span></view>
				   <view class="me_action">
					   <view class="act_atn" @click="gotoCoinExchange" style="margin-right:20rpx">牛币兑换</view>
					   <view class="act_atn" @click="gotoRecord">兑换记录</view>
				   </view>
			   </view>
			</view>
		</view>
		<view class="choose_nav">
			<view class="integral_nav">
				  <scroll-view class="scroll-view_H" scroll-x @scroll="scroll" :scroll-left="scro_width">
                        <view id="demo1" @click="chooseScroll(item,index)" :class="[index==scrollIndex ?'uni-bg-red':'']"  class="scroll-view-item_H" v-for="(item,index) in tabList" :key="index">{{item.cat_name}}</view>
                    </scroll-view>
			</view>
			<view class="nav_tip" @click="integralSort">
				<view class="code_tip">牛币值</view>
				<view class="nav_sort" :class="{up_active: direction === 'asc',down_active: direction === 'desc'}">
					<view class="sort_up"></view>
					<view class="sort_down"></view>
				</view>
			</view>
		</view>

		<view class="goods-list fxBox2">
			<view class="goods-item" v-for="item in list" :key="item.id" @tap="toQueryLink('/pagesA/goods/detail', { id: item.goods_id, point_activity: true, point: item.point_fee })">
				<view class="img-box">
					<image :src="item.goods_image" mode="widthFix"></image>
				</view>
				<view class="goods-des-box">
					<view class="pad">
						<view class="line2-p">{{ item.goods_name }}</view>
						<view class="p-box">
							<block v-if="item.point_price > 0">
								<view class="fxBox2 overflow-hidden">
									<view class="col-red text-ellipsis fx1">
										<text class="text-sm">¥</text>
										<text class="text-16">{{ item.point_price }}</text>
										<text class="col-666 text-sm">+{{ item.point_fee }}{{item.point_unit}}</text>
									</view>
									<view class="text-sm col-999 fx0 ml-xs">
										<text>已兑换</text>
										<text class="ml-5">{{item.exchange}}</text>
									</view>
								</view>
							</block>
							<block v-else>
								<view class="fxBox2 overflow-hidden">
									<view class="fx1 text-ellipsis col-red">
										<text class="text-16">{{ item.point_fee }}</text>
										<text class="text-sm">{{item.point_unit}}</text>
									</view>
									<view class="text-sm col-999 fx0 ml-xs">
										<text>已兑换</text>
										<text class="ml-5">{{item.exchange}}</text>
									</view>
								</view>
							</block>
						</view>
					</view>
					<button type="warn" class="btn">立即兑换</button>
				</view>
				<!--已兑完覆盖层-->
				<view class="tips-cover" v-if="item.good_stock == 0">
					<view class="tips-box">
						<text class="tips-txt">已兑完</text>
					</view>
				</view>
			</view>
		</view>
		<uni-load-more :status="loadStatus"></uni-load-more>
	</view>
</template>

<script>
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import mta from '../../mixins/mta';
export default {
  mixins: [mta],
	components: {
		uniLoadMore
	},
	onLoad: function() {
    this.getUserBanner()
  },
	onShow() {
		this.gm_id = uni.getStorageSync('gmToken')
		this.getRefreshCoin();
		this.getCattleCoinClass();
		this.getCattleCoinGoods(true);
	},
	mounted() {

	},
	onReachBottom() {
		if (this.loadMore.flat) return;
		this.loadStatus = 'loading';
		setTimeout(() => {
			if (this.list.length !== 0) {
				this.loadMore.current++;
			}
			this.getCattleCoinGoods();
		}, 500);
	},
	data() {
		return {
			gm_id: '',
			myCoin: 0,
			currentClassify: '',
			orderby: '',
			direction: '',
			bannerUrl: '',
			loadStatus: 'loading',
			list: [],
			loadMore: {
				current: 1,
				last: 1,
				flat: false
			},
			scrollIndex:0,
			tabList:[

			]
		};
	},
	methods: {
		getRefreshCoin () {
			this.$http({
				aurl: 'refreshSelfPoint',
				data: {
					gm_id: this.gm_id || 1,
				},
				success: res => {
					if (res.data.code === 0) {
						this.myCoin = res.data.result.point
					}
				},
				fail: error => {
					console.log(error);
				},
				complete: () => {
				}
			});
		},

		integralSort () {// 积分排序
			this.loadMore.current = 1
			this.list = []
			this.orderby = 'point_fee'
			if(this.direction === ''){
				this.direction = 'asc'
			} else if (this.direction === 'asc') {
				this.direction = 'desc'
			} else if (this.direction === 'desc') {
				this.direction = ''
			}
			this.getCattleCoinGoods()
		},
		gotoRecord(){
			uni.navigateTo({
				url: '/pagesB/activity/exchangeRecord?selectIndex=1'
			});
		},
		gotoCoinExchange(){
			uni.navigateTo({
				url: '/pagesB/activity/coinExchange'
			});
		},
		scroll(){

		},
		chooseScroll(item,index){
			this.scrollIndex=index;
			this.currentClassify = item.id
			this.list=[]
			this.loadMore = {
				current: 1,
				last: 1,
				flat: false
			};
			this.getCattleCoinGoods(true)
		},
    getUserBanner(){
      this.$http({
        aurl: 'configItems',
        success: res => {
          if(res.data.code===0){
            if(res.data.result.point_banner.length>0){
              this.bannerUrl = res.data.result.point_banner[0].url
            }
          }
        },
        fail: err => {
          this.showUser = true
          console.log(err);
        }
      });
		},
		getCattleCoinClass(){
			let that=this
			this.$http({
				aurl: 'cattleCoinClass',
				data: {
					page: 1,
					per_page: 20
				},
				success: res => {
					let result = res.data.result.lists;
					that.tabList=res.data.result.lists;
					that.tabList.unshift({id:'',cat_name:'全部'});
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		getCattleCoinGoods(init) {
			if(init){
				this.list = [];
				this.loadMore.current = 1;
			}
			this.$http({
				aurl: 'cattleCoinGoods',
				data: {
					page: this.loadMore.current,
					per_page: 10,
					orderby: this.orderby,
					direction: this.direction,
					class_id: this.currentClassify
				},
				success: res => {
					let result = res.data.result.lists;
					// console.log(result);
					if (result.data && result.data.length > 0) {
						this.loadMore.last = result.last_page;
						result.data.forEach(item => {
							this.list.push(item);
						});
					}
					if (this.loadMore.current === this.loadMore.last) {
						this.loadMore.flat = true;
						this.loadStatus = 'noMore';
					}else{
						this.loadStatus = 'more';
						this.loadMore.flat = false;
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		}
	}
};
//@import '../../variable.styl'
</script>

<style scoped lang="less">
.me_center{
    padding:40rpx 20rpx;
	width:100%;
	background:linear-gradient(to right,#FF4643,#CF2926);
	box-sizing: border-box;
	.me_info{
	  display:flex;
	  align-items:center;

	  .me_img{
	    width:128rpx;
			height:128rpx;
			border-radius: 50%;
			overflow: hidden;
		img{
		  width:100%;
		  height:100%;
		}
	  }
	  .integral_info{
		   padding:0rpx 10rpx 0rpx 20rpx;
		   color:#ffffff;
		   flex: 1;
		   display: flex;
		   align-items: center;
		   justify-content: space-between;
		   .me_integral{
			   	display: flex;
				align-items: center;

		       font-size:28rpx;
		       .span{
				font-size:32rpx;
				font-weight: 500;
			   }
		   }
	        .me_action{
		      display:flex;
		      justify-content:flex-end;
		      .act_atn{
		        font-size: 24rpx;
				padding: 8rpx 18rpx;
				border-radius: 25rpx;
				position: relative;

			  }
			  .act_atn::after{
				 content: '';
				position: absolute;
				width: 200%;
				height: 200%;
				left: -50%;
				top: -50%;
				border: 1px solid #ffffff;
				transform: scale(0.5);
				border-radius: 50rpx;
				box-sizing: border-box;
			  }
			}

	  }

	}
}
.choose_nav{
	position: relative;
	padding-right: 190rpx;
	background: #fff;
	.integral_nav{
	   height: 88rpx;
	   line-height: 88rpx;
	   background-color: #fff;
	   position: relative;
	   .scroll-view_H{
        height: 88rpx;
        line-height: 88rpx;
        width: 100%;
       white-space: nowrap;
        .scroll-view-item_H{
            height: 88rpx;
            line-height: 88rpx;
            text-align: center;
            padding: 0 24rpx;
           font-size: 30rpx;
           display: inline-block;
           color: #333333;
		}
		.uni-bg-red{
			font-weight: bold;
			color: #FF173E;
		}
	}
	::after{
		 content: '';
		 height: 200%;
		 width: 200%;
		 top: -50%;
		 height: -50%;
		 border-bottom: 1px solid #ccc;
		 transform: scale(0.5);
	}
	}
	.integral_nav::after{
		 content: '';
		 height: 200%;
		 width: 200%;
		 top: -50%;
		 height: -50%;
		 border-bottom: 1px solid #ccc;
		 transform: scale(0.5);
	}
	.nav_tip{
		position: absolute;
		right: 0;
		top: 0;
		height: 88rpx;
		line-height: 88rpx;
		padding: 0 20rpx;
		background-color: #fff;
		z-index: 99;
		font-size: 30rpx;
		display: flex;
		align-items: center;
		.code_tip{
           padding: 0 20rpx;
		}
		.nav_sort{
			padding: 4rpx 0;
			&.up_active{
				.sort_up{
					border-bottom-color:#FF173E;
				}
			}
			&.down_active{
				.sort_down {
					border-top-color: #FF173E;
				}
			}
			.sort_up{
				border-top: 10rpx transparent dashed;
				border-left: 10rpx transparent dashed;
				border-bottom: 10rpx #cccccc dashed;
				border-right: 10rpx transparent solid;
			}
			.sort_down{
				border-top: 10rpx #cccccc dashed;
				border-left: 10rpx transparent dashed;
				border-bottom: 10rpx transparent dashed;
				border-right: 10rpx transparent solid;
				margin-top: 6rpx;

			}
		}
	}
}
.goods-list{
	padding:2.3vw 2.2vw;
	background:#f8f8f8;
	overflow:hidden;
	flex-wrap:wrap;
.goods-item{
	width: 47vw;
	margin-bottom:1.6vw;
	box-sizing: border-box;
	background-color:#fff;
	padding: 2.2vw 0;
	position: relative;
	border-radius: 16rpx;
	.tips-cover{
		position: absolute;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		.tips-box{
			width: 150rpx;
			height: 150rpx;
			border-radius: 50%;
			background: rgba(0, 0, 0, 0.4);
			line-height: 150rpx;
			margin: 100rpx auto;
			color: #fff;
			text-align: center;
			font-size: 30rpx;
		}
	}
	.img-box{
		width: 47vw;
		margin-right: 0%;
		height: 42.6vw;
		overflow: hidden;
		padding: 0 2.2vw;
		box-sizing: border-box;
		image{
			width:100%;
		}
	}
	.goods-des-box{
		padding: 0 2.2vw;
		box-sizing: border-box;
		margin-top: 15rpx;
	}
	.line2-p{
		height:62rpx;
		margin-bottom: 30rpx;
		font-size:24rpx;
	}
	.p-box{
		margin-bottom:20rpx;
	}
	.btn{
		padding:16rpx;
		}
.banner-box{
	image{
		display:block;
		width:100%;
	}
}
	}
}
</style>
