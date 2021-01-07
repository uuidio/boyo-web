<template>
	<view class="set-psw">
		<view class="wrap">
			<view class="ipt-list" >
				<view class="item fxBox1">
					<view class="l">新密码</view>
					<view class="r fxBox1 fx1">
						<input class="fx1" placeholder="6位纯数字密码" @input="setPassword" type="password" maxlength="6" :value="password" placeholder-style='color:#999;font-size:26rpx;font-weight:normal;'/>
<!--						<text class="iconfont icon-roundclose" @click="resetVal('password')" v-if="password.length > 0"></text>-->
					</view>
				</view>
				<view class="item fxBox1 unBorder">
					<view class="l">确认密码</view>
					<view class="r fx1 fxBox1">
						<input class="fx1" type="password" maxlength="6" placeholder="请再次输入新密码" @input="setConfirmPwd" :value="confirmPassword" placeholder-style='color:#999;font-size:26rpx;font-weight:normal;'/>
<!--						<text class="iconfont icon-roundclose" @click="resetVal('confirmPassword') " v-if='confirmPassword.length > 0'></text>-->
					</view>
				</view>

			</view>
		</view>
		<view class="btn">
			<view class="submit-btn" @click="subForm">保存</view>
		</view>
	</view>
</template>

<script>
export default {
	data() {
		return {
			currentStatus: 'new',
			password: '',
			confirmPassword: '',
		};
	},

	onLoad: function(options) {
		if(options.status == 'reset'){
			this.currentStatus = 'reset'
			uni.setNavigationBarTitle({
				title: '设置新密码'
			})
		}
	},
	onShow() {

	},
	mounted() {},
	methods: {
		walletRegister(){
			this.$http({
				aurl: 'walletRegister',
				success: res => {
				},
				fail: error => {
					console.log(error);
				},
			});
		},
		resetVal(val){
			this._data[val] = ''
		},
		setPassword(e){
			let val = e.target.value;
			this.password = val.replace(/[^\d]/gi,'');
			return {
				value: this.password
			}
		},
		setConfirmPwd(e){
			let val = e.target.value;
			this.confirmPassword = val.replace(/[^\d]/gi,'');
			return {
				value: this.confirmPassword
			}
		},
		subForm(){
			const that = this
			if(!this.password || this.password.length !== 6){
				uni.showToast({
					title: '支付密码格式不正确,请输入六位纯数字密码！',
					icon: 'none'
				});
				return false;
			} else if (this.password !== this.confirmPassword) {
				uni.showToast({
					title: '两次密码输入不一致！',
					icon: 'none'
				});
				return false;
			}
			this.$http({
				aurl: 'setPayPassword',
				data: {
					password: that.password,
					password_confirmation: that.confirmPassword,
				},
				success: res => {
					if(res.data.code===0){
						const accountStatus = uni.getStorageSync('accountStatus');
						// 默认注册开户钱包功能
						if(accountStatus == 0 && that.currentStatus == 'new'){
							that.walletRegister();
						}
						that.redirectToLink('/pagesA/user/wallet/status', {type: that.currentStatus, status: 'success'})
					}else{
						uni.showToast({
							title: res.data.message,
							icon: 'none',
						})
					}
				},
				fail: error => {
					console.log(error);
				},
				complete:res=>{
				}
			});
		},
	},
	watch: {
	},
};
</script>

<style scoped lang="stylus">
@import '../../../variable.styl'
.wrap
	padding $margin-md 0
.ipt-list
	background #fff
	padding-left $page-row-spacing
	.item
		border-bottom 1px solid $border-color-dark
		padding $margin-xs $margin-md $margin-xs $margin-xs
		min-height 80rpx
		.l
			width 110rpx
			flex-shrink 0
		.r
			margin-left 40rpx
			.icon-roundclose
				font-size 40rpx
				margin-left 20rpx
	.unBorder
		border none
.btn
	width 100%
	padding 25rpx 70rpx
	box-sizing border-box
	.submit-btn
		height 88rpx
		line-height 88rpx
		text-align center
		color #ffffff
		font-size 32rpx
		border-radius 44rpx
		background #E74340
</style>
