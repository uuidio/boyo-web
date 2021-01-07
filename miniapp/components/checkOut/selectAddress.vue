<template>
	<view>
		<view
			class="add-box"
			@click="
				toQueryLink('/pagesA/checkout/checkoutAdd', {
					addr_id: select_addr_id
				})
			"
		>
			<view class="add-null fxBox2" v-if="select_addr_id === ''">
				<text class="text-lg fw700">选择收货地址</text>
				<text class="iconfont icon-right"></text>
			</view>
			<view class="add-info fxBox" v-else>
				<view class="pr-xs fx1">
					<view class="text-lg line2-p fw700 mb-xs" data-line="1">{{ `${addrItem.province}${addrItem.city}${addrItem.county} ${addrItem.address}` }}</view>
					<view>{{ addrItem.name }} {{ addrItem.tel }}</view>
				</view>
				<text class="emfont icon-right text-md mt-xs"></text>
			</view>
		</view>
	</view>
</template>

<script>
export default {
	props: {
		addrId: String
	},
	data() {
		return {
			lists: [],
			addrItem: {},
			select_addr_id: '',
			flag: true
		};
	},
	watch: {
		addrId() {
			if (this.select_addr_id !== this.addrId) {
				this.select_addr_id = this.addrId;
				this.getAdd();
			}
		}
	},
	methods: {
		getAdd() {
			this.$http({
				aurl: 'userAddress',
				success: res => {
					if (this.addrId === '') {
						this.select_addr_id = res.data.result.default_id;
					}
					this.lists = res.data.result.lists;
					if (this.select_addr_id !== '') {
						this.lists.forEach(item => {
							if (item.id === this.select_addr_id) {
								this.addrItem = item;
								if (res.data.result.default_id !== '') {
									uni.setStorageSync('defAdd', item);
								}
							}
						});
					}
					this.$emit('on-addr', this.select_addr_id);
				},
				fail: error => {
					console.log(error);
				}
			});
		}
	},
	mounted() {
		this.getAdd();
	}
};
</script>

<style scoped lang="stylus">

</style>
