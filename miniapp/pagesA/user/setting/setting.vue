<template>
	<view class="setting-page">
		<view class="wrap">
			<view class="setting-list">
				<!-- <view class="item fxBox1" @tap="setHeadImg">
					<view class="fx1 l">头像</view>
					<view class="r"><image :src="userInfo.headimgurl"></image></view>
				</view>
				<view class="item fxBox1" @tap="toSetValue">
					<view class="fx1 l">昵称</view>
					<view class="r">
						<text class="des">{{ userInfo.nickName }}</text>
						<text class="iconfont icon-right"></text>
					</view>
				</view>
				<view class="item fxBox1" @tap="selectSex">
					<view class="fx1 l">性别</view>
					<view class="r">
						<text class="des">{{ userInfo.sex_text }}</text>
						<text class="iconfont icon-right"></text>
					</view>
				</view>
				<picker mode="date" @change="selectBrithDay">
					<view class="item fxBox1">
						<view class="fx1 l">出生日期</view>
						<view class="r">
							<text class="des">{{ userInfo.birthday || '请选择' }}</text>
							<text class="iconfont icon-right"></text>
						</view>
					</view>
				</picker> -->
				<view class="item fxBox1" @tap="needTokenQueryLink('/pagesA/user/address')">
					<view class="fx1 l">收货地址</view>
					<view class="r"><text class="iconfont icon-right"></text></view>
				</view>
				<view class="item fxBox1 phone" @tap="toResetPwd" v-if="accountStatus == 1 || accountStatus == 2">
					<view class="fx1 l">重置支付密码</view>
					<view class="r"><text class="iconfont icon-right"></text></view>
				</view>
				<!-- <view class="item fxBox1 phone">
					<view class="fx1 l">手机号码</view>
					<view class="r">
						<text class="des">{{ userInfo.mobile }}</text>
					</view>
				</view> -->
			</view>
		</view>
		<view class="btn-box" @tap="logout"><button type="primary">退出登录</button></view>
	</view>
</template>

<script>
import { config } from '../../../static/base/server2.js';
export default {
	components: {},
	onLoad: function(options) {
		this.userInfo = JSON.parse(decodeURIComponent(options.info));
	},
	onShow() {
		let newName = uni.getStorageSync('newName');
		if (newName) {
			if (newName !== this.userInfo.nickName) {
				let param = {
					name: newName
				};
				this.tempInfo.name = newName;
				this.setInfo(param, 2);
				uni.removeStorageSync('newName');
				console.log(uni.getStorageSync('newName'))
			}
		}
		this.hasPayPassword()
	},
	mounted() {},
	data() {
		return {
			accountStatus: 0, // 0:未设置，1:已设置，2：冻结
			userInfo: {},
			tempInfo: {
				headimgurl: '',
				name: '',
				sex: '',
				brithDay: ''
			},
			sexArr: ['保密', '男', '女'],
			menuInfo: {}
		};
	},
	methods: {
		hasPayPassword() {
			const that = this
			this.$http({
				aurl: 'hasPayPassword',
				success: res => {
					if(res.data.code === 0){
						that.accountStatus = res.data.result.status
						that.time = res.data.result.status
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		toResetPwd(){
			if(this.accountStatus == 2){
				this.walletLocking(this.time)
			}else{
				this.toQueryLink('/pagesA/user/wallet/authentication', {use_type: 'set', type: 'reset'})
				// this.toQueryLink('/pagesA/user/wallet/pwdAuthentication', {type: 'resetPwd', use_type: 'set'})
			}
		},
	  logout(){
      uni.showModal({
        content: '确认退出登录吗？',
        success: function (res) {
          if (res.confirm) {
            uni.removeStorage({
              key: 'user_token',
              success: function (res) {
                uni.removeStorageSync('user_info');
                uni.navigateBack()
              }
            });;
          } else if (res.cancel) {
          }
        }
      });

    },
		setHeadImg() {
			const _url = config.api_base_url + config.apiLinks.uploadImg.url;
			let tempToken = uni.getStorageSync('user_token');
			const headers = {
				Accept: 'application/json',
				Authorization: `Bearer ${tempToken}`
			};
			uni.chooseImage({
				count: 1,
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				sourceType: ['album'],
				success: chooseImageRes => {
					uni.showLoading({
						title: '图片上传中...',
						icon: 'none'
					});
					const tempFilePaths = chooseImageRes.tempFilePaths;
					const uploadTask = uni.uploadFile({
						url: _url, //仅为示例，非真实的接口地址
						filePath: tempFilePaths[0],
						header: headers,
						name: 'image',
						success: uploadFileRes => {
							let res = JSON.parse(uploadFileRes.data);
							let url = res.result.pic_url;
							this.tempInfo.headimgurl = url;
							let param = {
								head_pic: url
							};
							this.setInfo(param, 1);
							uni.hideLoading();
						}
					});
				}
			});
		},
		selectSex() {
			uni.showActionSheet({
				itemList: this.sexArr,
				success: res => {
					let sex = res.tapIndex;
					let param = { sex: sex };
					this.setInfo(param, 3);
					this.tempInfo.sex = this.sexArr[sex];
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		selectBrithDay(val) {
			let deta = val.detail.value;
			let param = { birthday: deta };
			this.tempInfo.brithDay = deta;
			this.setInfo(param, 4);
		},
		toSetValue() {
			uni.navigateTo({
				url: '/pagesA/user/setting/setValue?name='+this.userInfo.nickName
			});
		},
		setInfo(params, type) {
			uni.showLoading({
				title: '请稍后...'
			});
			this.$http({
				aurl: 'setUserInfo',
				data: params,
				success: res => {
					uni.hideLoading();
					uni.showToast({
						title: '设置成功'
					});
					switch (type) {
						case 1:
							this.userInfo.headimgurl = this.tempInfo.headimgurl;
							break;
						case 2:
							this.userInfo.nickName = this.tempInfo.name;
							break;
						case 3:
							this.userInfo.sex_text = this.tempInfo.sex;
							break;
						case 4:
							this.userInfo.birthday = this.tempInfo.brithDay;
							break;
						default:
							break;
					}
				},
				fail: err => {
					console.log(err);
				}
			});
		}
	},
	watch: {
		userInfo: function() {}
	},
	onUnload() {}
};
</script>

<style scoped lang="stylus">
@import '../../../variable.styl'

.wrap
	padding $page-row-spacing 0
.setting-list
	background #fff
	 padding-left $page-row-spacing
	// padding-bottom 0
	border-radius 10rpx
	.item
		border-bottom 1px solid $border-color-dark
		padding 10rpx $margin-md 10rpx 0
		min-height 90rpx
		.r
			text
				display inline-block
				vertical-align middle
		image
			width 120rpx
			height @width
			border-radius 50%
		.des
			color $em-text-color-grey
			margin-right $margin-xs
		.icon-right
			font-size $font-base
	.phone
		border none
.btn-box
	position fixed
	bottom 0
	width 100%
	button
		color $theme-red
		border-radius 0
		padding $margin-md + 5
		background #fff
		border 0
		font-size 30rpx
.title-view
	overflow hidden
	background-color #fff
</style>
