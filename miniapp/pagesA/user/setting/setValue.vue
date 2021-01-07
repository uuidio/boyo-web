<template>
	<view class="set-wrap">
		<view class="in-box"><input type="text" :value="newName" :placeholder="oldName" :focus="true" @confirm="changeName" /></view>
		<view class="tip"><text class="text-xs">昵称由4～30个字符，可由中英文、数字、"-"、"_" 组成</text></view>
	</view>
</template>

<script>
export default {
	components: {},
	onLoad: function(options) {
		this.oldName = options.name;
	},
	onShow() {},
	mounted() {},
	data() {
		return {
			oldName: '',
			newName: ''
		};
	},
	methods: {
		changeName(e) {
			let value = e.detail.value;
			let pattern = /[^\w\-\u4e00-\u9fa5]/g;
			if (value === this.oldName) {
				uni.showToast({
					title: `您现在的昵称已经是 ${this.oldName}`,
					icon: 'none'
				});
			} else {
				if (value.length > 30 || value.length < 4) {
					uni.showToast({
						title: '昵称字符长度不能 > 30 或 < 4',
						icon: 'none'
					});
				} else if (pattern.test(value)) {
					console.log(value)
					uni.showToast({
						title: '昵称包含非法字符',
						icon: 'none'
					});
				} else {
					uni.setStorageSync('newName', value);
					uni.navigateBack({
						delta: 1
					});
				}
			}
		}
	}
};
</script>

<style scoped lang="stylus">
@import '../../../variable.styl'

.set-wrap
	padding $margin-md
.in-box
	background #fff
	padding $margin-xs $margin-md
.tip
	margin $margin-md
	color #999
</style>
