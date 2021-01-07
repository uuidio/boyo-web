<template>
	<view class="setting-page">
		<van-nav-bar title="会员资料">
			<view @tap="onClickLeft" class="goBack" slot="left">
				<text class="emfont icon-right text-l fw700 col-000" style="disp"></text>
			</view>
		</van-nav-bar>
		<view class="wrap">
			<view class="setting-list mb-md">
				<view class="item fxBox1" @tap="setHeadImg">
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
				<view class="item fxBox1 unBorder">
					<view class="fx1 l">手机号码</view>
					<view class="r">
						<text class="des">{{ userInfo.mobile }}</text>
					</view>
				</view>
			</view>

			<view class="setting-list setting-list-two" >
				<view class="item fxBox1">
					<view class="fx1 l">姓名</view>
					<view class="r">
						<input class="des inputSty" :value="userInfo.real_name" @input="setRealName" placeholder="请填写真实姓名" />
					</view>
				</view>
				<view class="item fxBox1" @tap="selectSex">
					<view class="fx1 l">性别</view>
					<view class="r">
						<text class="des" v-if="tempInfo.sex == null">请选择</text>
						<text class="des" v-else>{{ tempInfo.sex }}</text>
						<text class="iconfont icon-right"></text>
					</view>
				</view>
				<picker v-if="userInfo.birthday == null" mode="date" @change="selectBrithDay">
					<view class="item fxBox1">
						<view class="fx1 l">出生日期<text class="col-red">*</text></view>
						<view class="r">
							<text class="des" v-if="tempInfo.brithDay == null">请选择</text>
							<text class="des" v-else>{{ tempInfo.brithDay || '请选择' }}</text>
							<text class="iconfont icon-right"></text>
						</view>
					</view>
					<view class="text-xs tip">出生日期保存后不可修改</view>
				</picker>
				<view v-else class="item fxBox1">
					<view class="fx1 l">出生日期</view>
					<view class="r">
						<text class="des">{{ userInfo.birthday }}</text>
					</view>
				</view>
				<view class="item fxBox1 unBorder">
					<view class="fx1 l">邮箱</view>
					<view class="r">
						<input class="des inputSty" placeholder="请填写邮箱" @input="setEmail" :value="userInfo.email" />
					</view>
				</view>
			</view>
		</view>
		<view class="btn">
			<van-button custom-style="background:#FF4A41;" round block type="danger" @click="subForm">保存</van-button>
		</view>
	</view>
</template>

<script>
import { config } from '../../../static/base/server2.js';
export default {
	components: {},

	onLoad: function(options) {
		this.userInfo = JSON.parse(decodeURIComponent(options.info));
		this.tempInfo.sex = this.userInfo.sex == null ? null : this.userInfo.sex_text
		this.tempInfo.brithDay = this.userInfo.birthday
		this.tempInfo.real_name = this.userInfo.real_name
		this.tempInfo.email = this.userInfo.email
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
	},
	mounted() {},
	data() {
		return {
			showMask: true,
			userInfo: {},
			tempInfo: {
				headimgurl: '',
				name: '',
				real_name: '',
				sex: '',
				brithDay: '',
				email: ''
			},
			sexArr: [ '男', '女'],
			menuInfo: {}
		};
	},
	methods: {
		onClickLeft() {
			console.log(this.userInfo);
			if(this.userInfo.real_name == '' || this.userInfo.real_name == null) {
				uni.showToast({ title: '姓名不能为空', icon: 'none' });
				return false
			}
			if( this.userInfo.sex == null) {
				uni.showToast({ title: '请选择性别', icon: 'none' });
				return false
			}
			if(this.userInfo.birthday == null) {
				uni.showToast({ title: '请选择出生日期', icon: 'none' });
				return false
			}
			this.toBack()
		},
		subForm(){
			if(this.tempInfo.real_name == '' || this.tempInfo.real_name == null) {
				uni.showToast({ title: '姓名不能为空', icon: 'none' });
				return false
			}
			if(this.tempInfo.sex == null || this.tempInfo.sex == '') {
				uni.showToast({ title: '请选择性别', icon: 'none' });
				return false
			}
			if(this.tempInfo.brithDay == null || this.tempInfo.brithDay == '') {
				uni.showToast({ title: '请选择出生日期', icon: 'none' });
				return false
			}
			if(this.tempInfo.email != '' && this.tempInfo.email != null) {
				const re = /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/
				if (!re.test(this.tempInfo.email)) {
					uni.showToast({ title: '邮箱格式错误', icon: 'none' });
					return false
				}
			}
			let sexIndex = this.sexArr.indexOf(this.tempInfo.sex)
			let param = {
				real_name:this.tempInfo.real_name,
				sex:sexIndex + 1,
				email: this.tempInfo.email,
				birthday:this.tempInfo.brithDay,
			};
			if(this.userInfo.birthday != null) {
				delete param.birthday
			}
			// console.log(param);
			this.setInfo(param, 5);
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
		setRealName(val) {
			let deta = val.detail.value;
			this.tempInfo.real_name = deta;
		},
		setEmail(val) {
			let deta = val.detail.value;
			this.tempInfo.email = deta;
		},
		selectSex() {
			uni.showActionSheet({
				itemList: this.sexArr,
				success: res => {
					console.log(res);
					let sex = res.tapIndex;
					this.tempInfo.sex = this.sexArr[sex];
					// let param = { sex: sex + 1 };
					// this.setInfo(param, 3);
				},
				fail: err => {
					console.log(err);
				}
			});
		},
		selectBrithDay(val) {
			let deta = val.detail.value;
			console.log(deta);
			// let param = { birthday: deta };
			this.tempInfo.brithDay = deta;
			// this.userInfo.birthday = this.tempInfo.brithDay;
			// this.setInfo(param, 4);
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
			console.log(params);
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
						case 5:
							this.userInfo.real_name = this.tempInfo.real_name;
							this.userInfo.email = this.tempInfo.email;
							this.userInfo.birthday = this.tempInfo.brithDay;
							this.userInfo.sex = params.sex
							this.userInfo.sex_text = this.tempInfo.sex;
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
.goBack
	transform rotate(180deg)
.wrap
	padding $margin-md
.setting-list
	background #fff
	padding $margin-md
	padding-bottom 0
	border-radius 10rpx
	.item
		border-bottom 1px solid $border-color-dark
		padding $margin-xs
		min-height 80rpx
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
		.inputSty
			text-align right
		.icon-right
			font-size $font-base
	.unBorder
		border none
	.tip
		margin 0 $margin-md
		color #999
.setting-list-two
	padding 0 $margin-md
.btn
	width 100%
	padding 20rpx 10%
	box-sizing border-box
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
