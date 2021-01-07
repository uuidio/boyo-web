<template>
	<view>
		<view class="add-img" @tap="hotGoodsTo"><image :src="banner" mode="widthFix" /></view>
		<view class="home-title-box mt-md"><view class="home-title">热卖单品</view></view>
		<view class="goods-box"><goods-lists :is-list="isList" :goods-lists="listsData" class="em-product-list"></goods-lists></view>
	</view>
</template>

<script>
import goodsLists from '../../../components/lists/GoodsLists';
export default {
	components: {
		goodsLists
	},
	props: {
		listsData: {
			type: Array,
			default: () => []
		},
		banner: {
			type: String,
		}
	},
	watch: {
		// listsData(){
		//     this.goodsItem = this.listsData[0]
		// }
	},
	data() {
		return {
			isList: false,
			goodsItem: {}
		};
	},
	methods: {
		hotGoodsTo() {
			if (this.listsData[0].hotGoodsUrl !== '') {
				const _url = '/pagesB/activity/' + this.listsData[0].hotGoodsUrl;
				// console.log(_url);
				this.toLink(_url);
			}
		}
	},
	mounted() {}
};
</script>

<style scoped lang="stylus">
.add-img
	display block
	width 100%
	image
		width 100%
		display block
.goods-box
	margin 40rpx 0
</style>
