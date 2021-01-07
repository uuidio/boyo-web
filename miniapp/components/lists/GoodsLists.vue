<template>
	<scroll-view :scroll-y="true">
		<view :class="{ cols_one: isList ? 'cols_one' : '', cols_two: !isList ? 'cols_two' : '' }">
			<view class="goods-item" v-for="(item, index) in goodsLists" :key="index" @tap="toGoodsDetail(item.id)">
				<view class="image">
					<image src="../../static/images/500x500.jpg" mode="widthFix" v-if="!showArr[index]"></image>
					<image :lazy-load="true" :src="item.goods_image" @load="loadImg(index)" mode="widthFix"></image>
				</view>
				<view class="content">
					<view class="title text-13" ><text class="goods-tag" :class="[ha.indexOf('秒杀')!=-1?'goods-red':'']" v-for="(ha,j) in (item.good_sign&&item.good_sign.activity?item.good_sign.activity:[])" :key="j">{{ha}}</text>{{ item.goods_name }}</view>
          <view class="mt-xs col-666 text-sm">
            配送方式：{{pickType(item.pick_type)}}
          </view>
					<view class="goods-tags">
						<view class="goods-tag" v-for="(val,i) in item.good_sign.promotion" :key="i">
							{{val}}
						</view>
					</view>
					<view class="price-box">
						<view class="money text-ellipsis">
							<text class="price-sign">¥</text>
							<text class="price">{{ item.goods_price }}</text>
							 <text class="market-price" v-if="item.show_promotion_price=='1'">¥{{ item.goods_marketprice }}</text>
						</view>
<!--						<view class="goods-tags">-->
<!--							<text class="goods-tag">满减</text>-->
<!--							<text class="goods-tag">满折</text>-->
<!--						</view>-->
						<!--<view class="num">-->
						<!--<text class="sold">{{ item.goods_salenum }}销量</text>-->
						<!--</view>-->
					</view>
					<view class="col-666" v-if="distribution&&item.rewards">
						推广佣金:￥{{item.rewards}}
					</view>
					<view class="add_cart" @click.stop="toGoodsDetail(item.id)">
						<image src="../../static/images/good_cart.png"/>
					</view>
				</view>
			</view>
			</view>
	</scroll-view>
</template>

<script>
export default {
	name: 'GoodsLists',
	props: {
		distribution: {
			type: Boolean,
			default: function(){
				return false
			}
		},
		goodsLists: Array,
		isList: {
			type: Boolean,
			default: false
		}
	},
  computed:{
    pickType(){
      return function(params){
        const arr = params.concat([]);
        for(let i=0;i<arr.length;i++){
          if(arr[i]==='0'){
            arr[i] = '快递'
          }else if(arr[i]==='1'){
            arr[i] = '自提'
          }else if(arr[i]==='2'){
            arr[i] = '配送到家'
          }
        }
        return arr.toString()
      }
    },
  },
	data() {
		return {
			showArr: []
		};
	},
	mounted() {},
	methods: {
		loadImg(index) {
			this.$set(this.showArr, index, true);
		}
	}
};
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'

.cols_one
	position relative
	.goods-item
		background #ffffff
		padding 20rpx
		margin 0 20rpx
		display flex
		width 100%
		box-sizing border-box
		&:not(:last-child)
			border-bottom 1px solid #F8F8F8
		.image
			width 38%
			margin-right 2%
			image
				width 100%
				border-radius 3px
				will-change transform
		.content
			width 60%
			display flex
			flex-direction column
			justify-content center
			position relative
			.title
				color #333
				font-weight 400
				font-size $font-base
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 2
				-webkit-box-orient vertical
				margin-bottom 20rpx
				overflow hidden
				height 75rpx
				.goods-tag
					padding: 0 10rpx;
					border-radius: 10rpx;
					background linear-gradient(right,#FFB300,#E65100)
					color: #fff;
					margin-right 10rpx
					font-size: 24rpx;
				.goods-red
					background linear-gradient(right,#F06292,#D50000)	
			.num
				color #aaa
				line-height 40rpx
				font-size $font-sm
				.sold
					font-size $font-sm
			.money
				height 48rpx
				font-size $font-md
				margin-top 40rpx

				.price
					color #128D80
					font-size 30rpx
					font-weight bold
				.market-price
					font-size 24rpx
					color #a0a0a0
					text-decoration line-through
					padding-left 12rpx
			.add_cart
				position absolute
				width 50rpx
				height 50rpx
				bottom 0px
				right 0
				image
					width 100%
					height 100%
.cols_two
	position relative
	display flex
	flex-wrap wrap
	/*-moz-column-count: 2;
	-webkit-column-count: 2;
	column-count: 2;
	column-gap: 2%;
	-moz-column-fill:auto;
	-webkit-column-fill:auto;
	column-fill:auto;*/
	padding 0 2.2vw
	width 100%
	box-sizing border-box
	border-radius 16rpx
	.goods-item
		/*-moz-page-break-inside: avoid;
    -webkit-column-break-inside: avoid;
    break-inside: avoid;*/
		background #ffffff
		padding 2.2vw 0
		margin 0
		display block
		width 47vw
		box-sizing border-box
		border-bottom none
		margin-bottom 1.6vw
		border-radius 16rpx
		&:nth-child(2n)
			margin-left 1.6vw
		.image
			width 47vw
			margin-right 0%
			height 42.6vw
			overflow hidden
			padding 0 2.2vw
			box-sizing border-box
			image
				width 100%
				border-radius 0
				vertical-align top
		.content
			padding 0 2.2vw
			box-sizing border-box
			width 100%
			display flex
			flex-direction column
			justify-content center
			margin-top 15rpx
			position relative
			.title
				color #333
				font-weight 500
				line-height 36rpx
				/*font-size $font-base */
				text-overflow ellipsis
				display -webkit-box
				-webkit-line-clamp 2
				-webkit-box-orient vertical
				margin-bottom 0
				overflow hidden
				height 72rpx
				.goods-tag
					padding: 0 10rpx;
					border-radius: 6rpx;
					background linear-gradient(to right,#FFB300,#E65100)
					color: #fff;
					margin-right 10rpx
					font-size: 24rpx;
				.goods-red
					background linear-gradient(to right,#F06292,#D50000)
			.num
				color #aaa
				line-height 40rpx
				font-size $font-sm
				.sold
					font-size $font-sm
			.price-box
				margin-top 15rpx
			.money
				/*height 48rpx*/
				padding-right 65rpx
				font-size $font-big
				.price-sign
					font-size 24rpx
					color #128D80
				.price
					color #128D80
					font-size 30rpx
					font-weight bold
				.market-price
					font-size 24rpx
					color #a0a0a0
					text-decoration line-through
					padding-left 12rpx
			.goods-tags
				margin-top 15rpx
				display flex
				align-items center
				.goods-tag
					padding: 0 4rpx;
					border-radius: 6rpx;
					border 1px solid #FF173E
					color: #FF173E;
					margin-right 10rpx
					font-size: 24rpx;
			.add_cart
				position absolute
				width 50rpx
				height 50rpx
				bottom 0px
				right 20rpx
				image
					width 100%
					height 100%
</style>
