<template>
	<view style="width:100%;overflow: hidden;">
		<view class="me_center">
           <view class="me_info">
			   <view class="me_img">
					 <open-data type="userAvatarUrl"></open-data>
<!--				   <img src="../../static/images/logo.png"/>-->
			   </view>
			   <view class="integral_info">
				   <view class="me_integral">我的积分：<span class="span">{{myPoint}}</span></view>
				   <view class="me_action">
					   <view class="act_atn" @click="gotoRecord">兑换记录</view>
				   </view>
			   </view>
		   </view>
		   <view class="me_project">
			   <view class="project_nav">选择项目</view>
			   <view class="project_name" @click="selectProject">
				   {{currentGroup}}
				   	<view class="project_tip"><text class="iconfont icon-right text-xs"></text></view>
			   </view>
			   <view class="project_line"></view>
		   </view>
		</view>
		<view class="exchange">
			<view class="ex_title">
				<view class="ex_ac" @click="toRefresh">刷新<text class="iconfont icon-refresh"></text></view>
				<view class="ex_count">当前积分：{{myPoint}}</view>
			</view>
			<view class="ex_use_integral ex_use_bot">
				<view class="ex_use_title">使用积分</view>
				<view class="ex_use_code">
					<input placeholder="请输入兑换积分值" :value="num" class="ipt" @input="changExchangePoint" @blur="iptBlur" placeholder-style='color:#999;font-size:26rpx;font-weight:normal;'/>
				</view>
			</view>
			<view class="ex_use_integral">
				<view class="ex_use_title">兑成牛币</view>
				<view class="ex_use_code">{{oxCoin}}</view>
			</view>
			<view class="ex_action" @click="exchangeCoin" :class="[oxCoin>0&&myPoint>=num?'':'ex_opactioy']">{{act_title}}</view>
		</view>
		<view class="exchange_desc">
			<view class="desc_title">牛币说明</view>
			<view class="desc_content">1、通过益田益购小程序-牛币兑换功能使用积分兑换</view>
			<view class="desc_content">2、{{pointProportion}}积分等于{{oxCoinProportion}}牛币</view>
			<view class="desc_content">3、若输入积分值不规范，系统将自动匹配规范值</view>
		</view>
		<loading :hidden="visable" style="font-size:24rpx">
		    刷新中...
	   </loading>
	   <view class="group-project-wrap " :class="[is_choose?'group-project-show':'group-project-none']" >
			<view class="wrap-top">
				<view class="item_close" @click="closeProjrct"><text class="iconfont icon-close"></text></view>
				<veiw class="item-label">选择项目</veiw>
			</view>
			<view class="group-project-list">
				<view class="list-item" v-for="(item, index) in groupItems" :key="index" @click="onSelect(item)">
					<view class="item_info">
						<view class="item-t">
							<text class="item-name">{{item.platform_name}}</text>
						</view>
						<view class="list_coin">
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="list_line"></view>
				</view>
			</view>
		</view>
		<view class="group_model" v-if="is_choose"></view>
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
	onShow() {

	},
	mounted() {
		this.getGroupItem();
		let _this=this
		setTimeout(()=>{
			_this.visable=true
		},2000)
	},
	onReachBottom() {
		if (this.listParam.page === this.listParam.last) {
			this.loadStatus = 'noMore';
		} else {
			this.listParam.page++;
			setTimeout(() => {
				this.loadStatus = 'loading';
				this.getIntegral();
			}, 600);
		}
	},
	data() {
		return {
			alreadyBlur: false,
			myCoin: 0,
			timer: null,
			oxCoin: 0,
			pointProportion: 0,
			oxCoinProportion:0,
			visable:false,
			num:'',
			myPoint: 0,
			act_title:'兑成牛币',
			gm_id: '',
			groupItems:[],
			currentGroup:'',
			is_choose:false,
			submit:false,
		};
	},
	methods: {
  	iptBlur(e){
			let val = e.target.value;
			if(val%this.pointProportion !== 0){
				val = val - val%this.pointProportion;
				this.num = val;
				// wx.showToast({
				// 	title: '输入值不规范,已自动匹配!',
				// 	icon: 'none',
				// 	duration: 1500,
				// })
			}
		},
  	// 积分输入
		changExchangePoint(e){
			let that = this
			let val = e.target.value;
			if(val.length==1) {
				val=val.replace(/[^1-9]/g,'');
			} else {
				val=val.replace(/[^\d]/g,'');
			}
			that.oxCoin = parseInt(val/that.pointProportion)*that.oxCoinProportion;
			that.num = val
			return {
				value: val
			}
		},
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

		gotoRecord(){
			uni.navigateTo({
				url: '/pagesB/activity/exchangeRecord'
			});
		},
		onSelect(item) {
			this.currentGroup = item.platform_name;
			this.gm_id = item.gm_id;
			this.pointProportion = item.use_obtain_point.use_point
			this.oxCoinProportion = item.use_obtain_point.obtain_point
			this.getRefreshPoint()
			this.is_choose = false
		},
		selectProject(){
			this.is_choose=true;
		},
		closeProjrct(){
			this.is_choose=false;
		},
		getRefreshPoint(){
			this.$http({
				aurl: 'refreshPoint',
				data: {
					gm_id: this.gm_id,
				},
				success: res => {
					if (res.data.code === 0) {
						this.myPoint = res.data.result.point
						this.visable=true
					}
				},
				fail: error => {
					console.log(error);
					setTimeout(()=>{
						this.visable=true
					},2000)
				},
				complete: () => {

				}
			});
		},
		getGroupItem() {
			this.$http({
				aurl: 'platformPointList',
				success: res => {
					if (res.data.code === 0) {
						this.groupItems = res.data.result;
						if(this.groupItems.length>0){
							if (!this.currentGroup) {
                let gmToken = uni.getStorageSync('gmToken');
                let bool = false
                if(gmToken){
                  for(let i = 0; i < this.groupItems.length; i++){
                    if(gmToken == this.groupItems[i].gm_id){
                      this.currentGroup = this.groupItems[i].platform_name;
                      this.gm_id = this.groupItems[i].gm_id;
                      this.pointProportion = this.groupItems[i].use_obtain_point.use_point
                      this.oxCoinProportion = this.groupItems[i].use_obtain_point.obtain_point
                      bool = true
                    }
                  }
                }
                if(!gmToken || !bool){
                  this.currentGroup = this.groupItems[0].platform_name;
                  this.gm_id = this.groupItems[0].gm_id;
                  this.pointProportion = this.groupItems[0].use_obtain_point.use_point
                  this.oxCoinProportion = this.groupItems[0].use_obtain_point.obtain_point
                }
								this.getRefreshPoint()
								this.getRefreshCoin()
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
		toRefresh(){
			this.visable=false
			let _this=this
			this.getRefreshPoint()
		},
		exchangeCoin(){
			if(this.submit){
				return;
			}
			if(this.num == 0){
				wx.showToast({
					title: '请输入有效积分!', // 标题
					icon: 'none',  // 图标类型，默认success
				})
				return false;
			}  else if (this.myPoint < this.num) {
				wx.showToast({
					title: '输入积分大于已有积分!', // 标题
					icon: 'none',  // 图标类型，默认success
				})
				return false;
			} else if (this.oxCoin <= 0) {
				wx.showToast({
					title: '兑换牛币必须大于1!', // 标题
					icon: 'none',  // 图标类型，默认success
				})
				return false;
			}
			this.act_title='兑换中';
			this.submit = true;
			var _that = this; 
			this.$http({
				aurl: 'exchangeSelfPoint',
				data: {
					source_point: this.num, // 积分值
          add_point: this.oxCoin, // 牛币值
					current_gm_id: this.gm_id, // 当前项目id（积分）
				},
				success: res => {
					if (res.data.code === 0) {
						this.act_title='兑成牛币'
						this.getRefreshPoint()
						this.oxCoin=0
						this.num = ''
						wx.showToast({
							title: '兑换成功!', // 标题
							icon: 'success',  // 图标类型，默认success
							duration: 1500,  // 提示窗停留时间，默认1500ms
						})
					}
				},
				fail: error => {
					console.log(error);
					wx.showToast({
						title: '兑换失败!',
						icon: 'none',
						duration: 1500,
					})
				},
				complete: () => {
					_that.submit = false;
				}
			});
		}
	}
};
//@import '../../variable.styl'
</script>
<style>

</style>
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
	.me_project{
		margin-top: 28rpx;
		color: #fff;
		margin-bottom: 8rpx;
		.project_nav{
			font-size: 28rpx;
		}
		.project_name{
			font-size: 32rpx;
			position: relative;
			//border-bottom:1px solid #fff;
			padding: 20rpx 40rpx 20rpx 0;
			position: relative;
			.project_tip{
				width: 40rpx;
				height: 100%;
				position: absolute;
				top: 0;
				right: 0;
				display: flex;
				justify-content: center;
				align-items: center;
				.iconfont{
					font-size: 30rpx;
				}
			}
		}
		.project_line{
			height: 1px;
			background-color: #fff;
			transform: scaleY(0.5);
		}
	}
}
.exchange{
	width: 96%;
	margin: 0 auto;
	margin-top: -20rpx;
	border-radius: 16rpx;
	background-color: #fff;
	padding: 32rpx;
	margin-bottom: 32rpx;
	box-sizing: border-box;
	.ex_title{
		font-size: 24rpx;
		margin-bottom: 20rpx;
		display: flex;
		justify-content: space-between;
		align-items: center;
		.ex_ac{
			color: #666;
			.iconfont{
				font-size: 30rpx;
				vertical-align: middle;
				margin-left: 6rpx;
			}
		}
		.ex_count{
			color: #999;

		}
	}
	.ex_use_integral{
		padding: 24rpx 0;
		display: flex;
		align-items: center;
		justify-content: space-between;

		.ex_use_title{
			font-size: 26rpx;
			color: #666;
			flex-shrink: 0;
		}
		.ex_use_code{
			color: #333;
			font-size: 44rpx;
			font-weight: bold;
			input{
				border:0px;
				text-align: right;
				margin-left: 20rpx;
				box-sizing: border-box;
			}
		}
	}
	.ex_use_bot{
		border-bottom: 1px solid #d7d7d7;
	}
	.ex_action{
		padding: 24rpx 0;
		width: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		background-color: #FF173E;
		border-radius:16rpx ;
		color: #fff;
		font-size: 30rpx;
	}
	.ex_opactioy{
		opacity: 0.6;
	}
}
.exchange_desc{
	width: 96%;
	padding: 0 32rpx;
	.desc_title{
		margin-bottom: 24rpx;
		font-size: 28rpx;
		color: #333;
	}
	.desc_content{
		color: #999;
		font-size: 24rpx;
		line-height: 40rpx;

	}
}
.group-project-wrap{
	position: fixed;
	// bottom: 0;
	// left: 0;
	width: 100%;
	background-color: #fff;
	border-radius: 24rpx 24rpx 0 0;
	z-index: 99;
	transition: all 1.5s;
	.wrap-top{
		padding: 24rpx;
		display: flex;
		align-items: center;
		border-bottom: 1px solid #d7d7d7;
		.item_close{
			width: 60rpx;
			display: flex;
			align-items: center;
			justify-content: center;
			.iconfont{
				font-size: 52rpx;
			}
		}
		.item-label{
			flex: 1;
			display: flex;
			justify-content: center;
			align-items: center;
			font-size: 36rpx;
			color: #333;
		}
	}
	.group-project-list{
		border-bottom: 1px solid #d7d7d7;
		overflow-y: scroll;
		height: 740rpx;
		padding-left: 24rpx;
		.list-item{
			font-size: 28rpx;
			.item_info{
				padding: 30rpx;
				display: flex;
				justify-content: space-between;
				align-items: center;
			}
			.list_line{
				height: 1px;
				background-color: #d7d7d7;
				transform: scaleY(0.5);
			}
		}
	}
}
.group-project-show{
  	animation:mymovein 0.5s forwards;
}
@keyframes mymovein
{
	from {bottom:-740px}
	to {bottom:0px}
}
@keyframes mymoveout
{
	from {bottom:0px}
	to {bottom:-740px}
}
.group-project-none{
	animation:mymoveout 1.5s forwards;
}
.group_model{
	position: absolute;
	width: 100%;
	height: 100%;
	left: 0;
	bottom: 0;
	background-color: black;
	opacity: 0.5;
	z-index: 2;
}
</style>
