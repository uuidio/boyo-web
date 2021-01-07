<template>
	<view class="p-md">
		<van-cell-group>
			<van-field
				:value="formItem.receiver_name"
				label="收货人"
				placeholder="请输入收货人"
				:error="isUserError"
				@blur="checkUserValue"
				:error-message="isUserError ? '请输入收货人' : ''"
			/>
			<van-field
				:value="formItem.receiver_tel"
				label="手机号"
				placeholder="请输入手机号"
				:error="isFormMobileError"
				@blur="checkFormMobileValue"
				:error-message="isFormMobileError ? '手机号格式错误' : ''"
			/>
			<van-field label="自提地点" type="textarea" placeholder="请选择自提地点" rows="1" autosize>
				<span :class="{ 'col-000': formItem.selectAddr !== '请选择自提地址' ? true : false }" @tap="showZiti" slot="button">{{ formItem.selectAddr }}</span>
			</van-field>
		</van-cell-group>
		<view class="mt-lg w100">
			<!-- <button type="danger" ">确认</button> -->
			<van-button class="w100" type="danger" size="small" @tap="submitZiti">确认</van-button>
		</view>
		<van-action-sheet :show="showModel" :actions="actions" cancel-text="取消" @select="onSelect" @click-overlay="cancelModel" @cancel="cancelModel" />
	</view>
</template>

<script>
const phoneRegExp = /^1(3|4|5|6|7|8|9)\d{9}$/;
export default {
	data() {
		return {
			showModel: false,
			isFormMobileError: false,
			isUserError: false,
			showLists: false,
			actions: [],
			formItem: {
				receiver_name: '',
				receiver_tel: '',
				ziti_addr: '',
				selectAddr: '请选择自提地址'
			},
			shop_id: '',
			zitiLists: []
		};
	},
	onLoad: function(options) {
		console.log(options);
		this.shop_id = options.shopId;
		this.formItem.receiver_tel = options.tel;
		console.log(this.formItem.receiver_name);
		if (options.ziti_addr) {
			this.formItem.ziti_addr = options.ziti_addr;
			this.formItem.receiver_name = options.receiver_name;
			this.formItem.selectAddr = options.selectAddr;
		}
		this.getZitiLists();
	},
	methods: {
		submitZiti() {
			setTimeout(() => {
				if (this.isUserError || this.formItem.receiver_name.trim().length == 0) {
					this.formItem.receiver_name = '';
					this.showAlert('请填写收货人姓名');
					return;
				}
				if (this.isFormMobileError) {
					this.showAlert('请填写正确的手机号');
					return;
				}
				if (this.formItem.selectAddr === '请选择自提地址') {
					this.showAlert('请选择自提地址');
					return;
				}
				for (let i = 0; i < this.zitiLists.length; i++) {
					if (this.zitiLists[i].address === this.formItem.selectAddr) {
						this.formItem.ziti_addr = this.zitiLists[i].id;
						break;
					}
				}
				this.getPage().ziti_addr = this.formItem.ziti_addr;
				this.getPage().zitiItem = this.formItem;
				setTimeout(() => {
					this.toBack();
				}, 100);
			}, 100);
		},
		onSelect(e) {
			this.formItem.selectAddr = e.detail.name;
			this.showModel = false;
		},
		cancelModel() {
			this.showModel = false;
		},
		showZiti() {
			if (this.actions.length === 0) {
				this.showAlert('该店铺暂无自提地址，请选择其他配送方式');
				return;
			}
			this.showModel = true;
		},
		getZitiLists() {
			this.$http({
				aurl: 'ztLists',
				aPath: [this.shop_id],
				success: res => {
					this.zitiLists = res.data.result;
					for (let i = 0; i < this.zitiLists.length; i++) {
						this.actions.push({
							name: this.zitiLists[i].address
						});
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		setFieldStatus(result, id) {
			if (!result) {
				this[`is${id}Error`] = true;
			} else {
				this[`is${id}Error`] = false;
			}
		},
		// validate
		checkFormMobileValue(v) {
			this.formItem.receiver_tel = v.detail.value;
			this.setFieldStatus(phoneRegExp.test(this.formItem.receiver_tel), 'FormMobile');
		},
		checkUserValue(v) {
			this.formItem.receiver_name = v.detail.value;
			this.setFieldStatus(this.formItem.receiver_name.trim() !== '', 'User');
		}
	},
	mounted() {}
};
</script>

<style scoped lang="stylus">
>>>.w100 .van-button--small
	width 100%
	font-size 32rpx
	height 70rpx
	line-height 70rpx
>>>.van-cell__title
	font-size 30rpx
>>>.van-cell__value
	font-size 32rpx
>>>textarea
	display none !important
>>>.van-field__button
	padding-left 0
	text-align left
	flex-shrink 1
	line-height 44rpx
>>>.van-action-sheet__item
	height auto
	line-height 44rpx
	padding-top 20rpx
	padding-bottom 20rpx
	font-size 32rpx
>>>.van-action-sheet__cancel
	font-size 32rpx
>>>.van-cell-group
	font-size 0
	font-size red
</style>
