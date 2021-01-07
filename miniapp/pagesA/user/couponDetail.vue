<template>
	<view class="contain">
		<view class="coupon_top">
			<view class="coupon_info">
				<view class="info_title">{{coupon_info.coupon_info.name}}</view>
				<view class="info_code" v-if="coupon_info.bn_info.bn">券码：{{coupon_info.bn_info.bn}}</view>
				<view class="info_option" v-if="coupon_info.scenes!='1'">
					<canvas  :style="{ width: qrcode_w + 'px', height: qrcode_w + 'px' }" canvas-id="qrcode"></canvas>
				</view>
				<view class="info_desc" v-if="coupon_info.scenes!='1'">请将此页面出示给店员</view>
				<view class="info_line"></view>

				<view class="info_action info_use" v-if="coupon_info.status=='1'">
					未使用
				</view>
				<view class="info_action" v-else>
					{{coupon_info.status=='2'?'已使用':'已过期'}}
				</view>
			</view>
		</view>
		<view class="coupon_down">
			<view class="coupon_text">
				<view class="text_lable">优惠券信息：</view>
				<view class="text_desc">满 {{ coupon_info.coupon_info.origin_condition }} 元可减 {{coupon_info.coupon_info.denominations}}</view>
			</view>
			<view class="coupon_text">
				<view class="text_lable">有效期：</view>
				<view class="text_desc">{{ coupon_info.coupon_info.start_at }} ~ {{ coupon_info.coupon_info.end_at }}</view>
			</view>
			<view class="coupon_text">
				<view class="text_lable">优惠券描述：</view>
				<view class="text_desc">{{coupon_info.coupon_info.desc}} <br/></view>
			</view>
			<view class="coupon_text">
				<view class="text_lable">使用项目：</view>
				<view class="text_desc">仅支持 {{coupon_info.coupon_info.gm_name}} 项目可用</view>
			</view>
			<view class="coupon_text">
				<view class="text_lable">使用场景：</view>
				<view class="text_desc">{{coupon_info.coupon_info.scenes_text}}</view>
			</view>
		</view>
	</view>
</template>
<script>
// getUserCouponDetail
import qrCode from '../static/qrcode/weapp-qrcode';
export default {
	data(){
		return{
			coupon_info:{

			},
			qrcode_w: uni.upx2px(280),
			//qrcode_w:'100%'
		}
	},
	onLoad(option){
		console.log(option);
		if(option.id){
			this.getDetail(option.id);
		}
	},
	methods:{
		 zitiCode(code) {
        new qrCode('qrcode', {
          text: code,
          width: this.qrcode_w,
          height: this.qrcode_w,
          colorDark: '#333333',
          colorLight: '#FFFFFF'
        });
        // setTimeout(()=>{
        //     console.log('222')
        //     let that=this
        //    uni.canvasToTempFilePath({
        //         x: 0,
        //         y: 0,
        //         width: 260,
        //         height: 180,
        //         canvasId: 'qrcode',
        //         success: function(res) {
        //         that.radarImg=res.tempFilePath;
        //         console.log(res)
        //         }
        //     });
        // },1000)
      },
		getDetail(id){
			this.$http({
				aurl:'getUserCouponDetail',
                aPath:[id],
				success: res => {
					console.log('详情',res);
					this.coupon_info=res.data.result
					this.zitiCode(this.coupon_info.bn_info.bn);
				},
				fail: err => {
					console.log(err);
				},
				complete: () => {}
			});
		}
	}
}
</script>
<style lang="stylus" scoped>
.contain
	padding: 40rpx 30rpx;
	height: 100%;
	background-color: #f8f8f8;
	.coupon_top
		margin-bottom 30rpx
		background-color #fff
		border-radius 8rpx
		height auto
		.coupon_info
			padding 40rpx 0 30rpx 0
			.info_title
				text-align center
				padding 20rpx
				font-size 36rpx
				font-weight bold
				color #333
			.info_code
				text-align center
				padding 16rpx
				font-size 24rpx
				color #999
			.info_option
				width: 275rpx;
				height: 280rpx;
				margin 0 auto
			.info_desc
				text-align center
				padding 30rpx 0
				font-size 24rpx
			.info_line
				height 0
				border-bottom 1px dashed #999
			.info_action
				margin: 0 auto;
				margin-top: 30rpx;
				color: #fff;
				font-size: 28rpx;
				background-color: #333;
				padding: 24rpx 0rpx;
				border-radius: 40rpx;
				display: felx;
				-webkit-box-pack: center;
				-webkit-justify-content: center;
				-ms-flex-pack: center;
				justify-content: center;
				-webkit-box-align: center;
				-webkit-align-items: center;
				-ms-flex-align: center;
				align-items: center;
				width: 50%;
				text-align: center;
			.info_use
				background-color #e64340;

	.coupon_down
		padding 0 20rpx
		.coupon_text
			margin-bottom 15rpx
			.text_lable
				font-weight bold
				font-size 28rpx
				color #333
				line-height 50rpx
			.text_desc
				font-size 24rpx
				color #999
				line-height 40rpx

</style>
