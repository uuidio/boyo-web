<template>
	<view>
		<!--付款详情-->
		<vant-popup :show="showDetail" position="bottom" :z-index="999999" class="detail-popup" @click-overlay="closeDetail('_arg_')" custom-style="height: 50%;">
			<view class="popup-tit border-b-e6">
				<text class="iconfont col-666 icon-close text-l" @click="closeDetail"></text>
				<view class="tit text-big col-000">付款详情</view>
			</view>
			<view class="pay-total">
				<text class="symbol-price">￥</text>
				<text class="col-000">{{actualPayment}}</text>
			</view>
			<view class="pay-way-slt fxBox2" @click="showPopup">
				<view class="fxBox1">
					<image class="icon-way" :src="currentPayWay.id == 1 ? iconUrls[0] : currentPayWay.id == 2 ? iconUrls[1] : iconUrls[2]"></image>
					<text class="way-name text-14">{{currentPayWay.name}}</text>
				</view>
				<text class="iconfont icon-right col-999 text-lg"></text>
			</view>
			<view class="pay-btn-box">
				<view class="pay-btn" @click="confirmSubmit">立即支付</view>
			</view>
		</vant-popup>
		<!--付款方式-->
		<vant-popup :show="showPayWay" custom-style="height: 50%;" :z-index="9999999" class="pay-way-popup" position="bottom" @click-overlay="closePopup('_arg_')">
<!--			<view class="tips-item pay-item">-->
<!--				<view class="fxBox1">-->
<!--					<image class="item-icon icon-pay-bag" src="https://egoss1.ytholidayplaza.com/images/default/202008/05/1PwBfvj9yghAdQvRbvbq7FmJCao9XrguLWxTmQGX.png"></image>-->
<!--					<text class="col-red text-12">余额不足，请选择其他付款方式</text>-->
<!--				</view>-->
<!--			</view>-->
			<view class="popup-tit-box">
				<text class="iconfont icon-back_light col-666 text-l" @click="closePopup"></text>
				<text class="text-big col-000">选择付款方式</text>
				<text></text>
			</view>
			<view class="pay-way-list">
				<view class="pay-item" :class="{disabled: (item.id == 2 && balance.WalletPhysical < actualPayment) || (item.id == 3 && balance.WalletVirtual < actualPayment)}" v-for="(item, index) in paymentList" :key="index" @click="choicePayWay(item)">
					<view class="fxBox1">
						<image class="item-icon icon-pay-bag" :src="item.id == 1 ? iconUrls[0] : item.id == 2 ? iconUrls[2] : iconUrls[1]"></image>
						<text class="text-30 col-000">{{item.name}}</text>
						<text v-if="item.id == 2">（ ¥{{balance.WalletPhysical}} ）</text>
						<text class="col-999 text-14" v-if="item.id == 2 && balance.WalletPhysical < actualPayment">余额不足</text>
						<text v-if="item.id == 3">（ ¥{{balance.WalletVirtual}} ）</text>
						<text class="col-999 text-14" v-if="item.id == 3 && balance.WalletVirtual < actualPayment">余额不足</text>
					</view>
					<text class="iconfont text-1 icon-check col-red" v-if="currentPayWay.id == item.id"></text>
				</view>
			</view>
		</vant-popup>
		<!--输入支付密码-->
		<vant-popup :show="showPayPwd" class="pay-pwd-popup" :z-index="999999" @click-overlay="closePayPwd('_arg_')" custom-style="height: 36%;top: 38%;width:80%;background: #fff;border-radius: 16rpx">
			<view class="popup-tit">
				<text class="iconfont col-666 icon-close text-l" @click="closePayPwd"></text>
				<view class="tit text-30 col-000">请输入支付密码</view>
			</view>
			<view class="pay-total">
				<text class="symbol-price">￥</text>
				<text class="col-000">{{actualPayment}}</text>
			</view>
			<view class="pay-way-slt fxBox2" @click="showPopup">
				<text class="col-999 text-12">支付方式</text>
				<view class="fxBox1">
					<image class="icon-way" :src="currentPayWay.id == 1 ? iconUrls[0] : currentPayWay.id == 2 ? iconUrls[1] : iconUrls[2]"></image>
					<text class="way-name text-14">{{currentPayWay.name}}</text>
					<text class="iconfont icon-right col-999 text-lg"></text>
				</view>
			</view>
			<view class="pwd-ipt-box">
				<valid-code @changeOnfocus="handleChangeOnfocus" :on-focus="isOnFocus" :hold-keyboard="isHoldKeyboard" :item-width="13.3333" :margin-right="4" :padding-left="20" :padding-right="20" :maxlength="6" :isPwd="true" @finish="getPwd" ref="validCode"></valid-code>
			</view>
		</vant-popup>
	</view>
</template>

<script>
	import vantPopup from '@/wxcomponents/vant/popup'
	import validCode from '../validCode/validCode.vue'
	export default {
		name:"paymentPopup",
		components: {
			vantPopup,
			validCode: validCode,
		},
		props: {
			type: {
				type: String,
				default: ''
			},
			currentPayWay: {
				type: Object,
				default: {}
			},
			actualPayment: {
				type: Number,
				default: 0
			},
			showDetail: {
				type: Boolean,
				default: false
			},
			showPayPwd:{
				type: Boolean,
				default: false
			},
		},
		data () {
			return {
				isOnFocus: false,
				isHoldKeyboard: false,
				iconUrls: [
					'https://egoss1.ytholidayplaza.com/images/default/202008/05/9JkCFfDduByY6PAPJ84S5UkvtO5DSVfJj1sU2eJ0.png',
					'https://egoss1.ytholidayplaza.com/images/default/202008/05/vUTihC9uqUIcuE17qRp6yLjLkRpdfUFA63BM5CUV.png',
					'https://egoss1.ytholidayplaza.com/images/default/202008/05/mZjmzxNyUPtbEQ8YqjzPtszCMhD905eeGCHlne3Y.png'
				],
				showPayWay: false,
				paymentList: [],
				balance: {
					WalletPhysical: '', // 实体卡余额
					WalletVirtual: '', // 电子卡余额
				},
			}
		},
		mounted(){
			this.getPaymentList();
		},
		methods: {
      forgetPwd(){
        this.redirectToLink('/pagesA/user/wallet/authentication', {use_type: 'set', type: 'reset'})
      },
			confirmSubmit(){
				this.$emit('confirmPay')
			},
			handleChangeOnfocus(bool){
				this.isOnFocus = bool
			},
			getPwd(val){
				const that = this
				console.log(val);
				this.$http({
					aurl: 'checkPayPassword',
					needErrTips: false,
					data:{
						use_type: 'open',
						password: val
					},
					success: res => {
						if(res.data.code === 0){
							that.confirmSubmit()
						}
					},
					fail: res => {
						const num = res.result.num
						if(num > 0){
							uni.showModal({
								title: '支付密码不正确',
								content: '您还可以输入'+ num +'次',
								// showCancel: false,
								cancelText: '忘记密码',
								confirmText: '重新输入',
								confirmColor: '#5C6F97',
								success (res) {
									if (res.confirm) {
										// console.log('用户点击确定')
										console.log(that.$refs.validCode)
										that.isOnFocus = true
										that.$refs.validCode.clear()
									} else if (res.cancel) {
										// console.log('用户点击取消')
										that.forgetPwd()
									}
								}
							})
						}else{
							this.closePayPwd()
							that.walletLocking(res.data.result.time, true)
						}
					}
				});
			},
			closePayPwd(){
				// this.showPayPwd = false
				this.$emit('changeShowPayPwd', false)
			},
			getPaymentList(){
				const that = this
				this.$http({
					aurl: 'paymentList',
					data: {
						type: this.type,
					},
					success: res => {
						if(res.data.code === 0){
							const result = res.data.result
							that.paymentList = result.list
							this.$emit('changeCurrentPay', result.list.Wxpaymini)
							that.balance = result.balance
						}
					},
					fail: error => {
					}
				});
			},
			choicePayWay(item){
				const that = this
				if(item.id == 2 || item.id == 3){
					if(item.id == 3 && this.balance.WalletVirtual < this.actualPayment){
						return
					} else if (item.id == 2 && this.balance.WalletPhysical < this.actualPayment) {
						return
					}
					this.$emit('closePayDetail')
					setTimeout(function(){
						that.closePopup()
						setTimeout (function(){
							// that.showPayPwd = true
							that.$emit('changeShowPayPwd', true)
							setTimeout(function(){
								that.isOnFocus = true
							},400)
						},300)
					}, 300)
				} else if (item.id == 1) {
					that.closePopup()
					setTimeout (function(){
						that.$emit('openPayDetail')
					},300)
				}
				this.$emit('changeCurrentPay', item)
			},
			showPopup(){
				if(this.showPayPwd){
					this.$emit('changeShowPayPwd', false)
					// this.showPayPwd = false
				}
				this.showPayWay = true
			},
			closePopup(){
				this.showPayWay = false
			},
			closeDetail(){
				this.$emit('closePayDetail')
			},
		}
	}
</script>

<style scoped lang="stylus">
.pay-pwd-popup
	.popup-tit
		height 90rpx
		display flex
		justify-content center
		align-items center
		position relative
		.icon-close
			position absolute
			left 20rpx
			top 25rpx
	.pay-total
		display flex
		justify-content center
		align-items flex-end
		color #000
		font-size 45rpx
		line-height 1
		margin 30rpx 20rpx 0
		border-bottom 1px solid #D7D7D7
		padding-bottom 20rpx
	.pay-way-slt
		padding 0 20rpx
		margin-top 22rpx
		.icon-way
			width 32rpx
			height 32rpx
			margin-right 10rpx
		.icon-right
			margin 4rpx -10rpx 0 5rpx

.detail-popup
	.popup-tit
		height 118rpx
		display flex
		justify-content center
		align-items center
		position relative
		.icon-close
			position absolute
			left 38rpx
			top 39rpx
	.pay-total
		display flex
		justify-content center
		align-items flex-end
		color #000
		margin-top 40rpx
		font-size 48rpx
		line-height 1
		.symbol-price
			font-size 26rpx
			margin-right 5rpx
			margin-bottom 2rpx
	.pay-way-slt
		padding 0 30rpx
		margin-top 80rpx
		.icon-way
			width 48rpx
			height 48rpx
			margin-right 10rpx
		.icon-right
			margin-right -10rpx
	.pay-btn-box
		position absolute
		bottom 80rpx
		padding 0 64rpx
		width 100%
		box-sizing border-box
		.pay-btn
			height 75rpx
			line-height 75rpx
			text-align center
			color #fff
			font-size 30rpx
			border-radius 38rpx
			background #E74340

.pay-way-popup
	.popup-tit-box
		height 118rpx
		display flex
		justify-content space-between
		align-items center
		padding-left 30rpx
		border-bottom 1px solid #e6e6e6
	.pay-item
		padding-left 28rpx
		height 106rpx
		display flex
		justify-content space-between
		align-items center
		padding-right 28rpx
		position relative
		&:after
			content ''
			height 1px
			position absolute
			bottom 0
			left 28rpx
			right 0
			background #e6e6e6
		&.disabled
			background rgba(240,240,240,1)
		.item-icon
			width 47rpx
			height 47rpx
			margin-right 15rpx
		&.tips-item
			height 86rpx
			border 0
			background #FFDFDF
			padding-left 28rpx

</style>
