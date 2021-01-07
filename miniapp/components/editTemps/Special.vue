<template>
  <view>
	<view v-if="config.nav_img.image_url!=''" :style="{marginTop:config.vd+'px',marginBottom:config.vd+'px'}">
		<view class="spe_contain" @tap="to(config.nav_img)">
			<image :src="config.nav_img.image_url" mode="widthFix"/>
		</view>
		<view v-if="options.length>0" class="spe_wrap" >
			<view class="spe_worm spe_context" v-if="config.template=='0'" :style="{paddingLeft:3+'%',paddingRight:3+'%',marginTop:config.md+'px',marginBottom:config.mg+'px'}">

					<view class="spe_item" @tap="toGoodsDetail(item.id)" v-for="(item,index) in options" :key="index" :style="{width:49+'%',marginRight:index%2==0?2+'%':0+'px',borderRadius:config.radius+'px',padding: '20rpx',}">
						<view class="item_img"   tyle="height: auto;">
							<img :src="item.goods_image" mode="widthFix" style="vertical-align: top;"/>
						</view>
						<view class="item_title">{{item.goods_name}}</view>
						<view class="item_price">
							<text>
								￥{{item.goods_price}}
							</text>
							<text class="market-price">
								￥{{item.goods_marketprice}}
							</text>
						</view>
					</view>

			</view>
			<view class="spe_worm spe_context" v-if="config.template=='1'" :style="{paddingLeft:3+'%',paddingRight:3+'%',marginTop:config.md+'px',marginBottom:config.mg+'px'}">

					<view class="spe_item" @tap="toGoodsDetail(item.id)" v-for="(item,index) in options" :key="index" :style="{width:32+'%',marginRight:(index+1)%3==0&&index>0?0+'px':2+'%',borderRadius:config.radius+'px'}">
						<view class="item_img" >
							<img :src="item.goods_image" mode="widthFix"/>
						</view>
						<view class="item_title">{{item.goods_name}}</view>
						<view class="item_price">￥{{item.goods_price}}</view>
					</view>

			</view>
			<view class="spe_worm spe_scroll"  v-if="config.template=='2'" :style="{paddingLeft:px(config.pd),paddingRight:px(config.pd),marginTop:config.md+'px',marginBottom:config.mg+'px'}">
				<view class="spe_item" @tap="toGoodsDetail(item.id)" v-for="(item,index) in options" :key="index" :style="{marginRight:config.xd+'px',borderRadius:config.radius+'px'}">
					<view class="item_img">
						<img :src="item.goods_image" mode="widthFix"/>
					</view>
					<view class="item_title">{{item.goods_name}}</view>
					<view class="item_price">￥{{item.goods_price}}</view>
				</view>
			</view>
		</view>
	</view>
	<view v-else class="img_null" :style="{marginTop:config.vd+'px',marginBottom:config.vd+'px'}">
        <p class="fs16">点击编辑图片专区</p>
    </view>
    </view>
</template>

<script>
  export default {
    props: {
			gm_Id: [String, Number],
			options:{
				type:Array,
        default:[]
      },
      config: Object,
    },
    data() {
      return {};
    },
    methods: {
		 px(num){
        return uni.upx2px(num*2) + 'px'
	  },
	  to(item){
        if(!item.link_value){
          return
		}
		let obj={
			url:item.image_url,
			urlType:item.link_type,
			value:item.link_value
		}
        this.customTo(obj, this.gm_Id)
      },
	},
    mounted() {
		console.log('商品',this.options);
		console.log('bbb',this.config)
    },
  };
</script>
<style lang="less" scoped>
.img_null{
	height: 160rpx;
	display: flex;
	align-content: center;
	justify-content: center;
}
.spe_contain{
	//height: 250rpx;
	width: 100%;
	image{
		width: 100%;
		height: 100%;
	}
}
.spe_wrap{
	.spe_worm{
		display: flex;
		align-items: center;
		flex-wrap: wrap;
		.spe_item{
			padding: 16rpx;
			background-color: #ffffff;
			box-sizing: border-box;
			margin-bottom: 20rpx;
			.item_img{
				margin: 0 auto;
				//height: 160rpx;
				height: 0;
				padding-top: 100%;
				position: relative;
				overflow: hidden;
				img{
					// width: 100%;
					// height: 100%;
					position: absolute;
					left: 0;
					top: 0;
					width: 100%;
				}
			}
			.item_title{
				line-height: 40rpx;
				margin-top: 10rpx;
				font-size: 26rpx;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.item_price{
				line-height: 40rpx;
				font-size: 26rpx;
				font-weight: bold;
				color: #128D80;
				.market-price{
					font-size: 24rpx;
					color: #a0a0a0;
					text-decoration: line-through;
					padding-left: 12rpx;
					font-weight: 400;
				}
			}
		}
	}
	.spe_context{

	}
	.spe_scroll{
		flex-wrap: nowrap;
		overflow-y: scroll;
		.spe_item{
			width: 200rpx;
			flex-shrink: 0;
		}

	}
}
</style>
