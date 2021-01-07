<template>
  <div>
	<div v-if="config.nav_img.image_url!=''" :style="{marginTop:config.vd+'px',marginBottom:config.vd+'px'}">
		<div class="spe_contain">
			<img :src="config.nav_img.image_url"/>
		</div>
		<div v-if="dataLists.length>0" class="spe_wrap" >
			<div class="spe_worm spe_context" v-if="config.template=='0'" :style="{paddingLeft:3+'%',paddingRight:3+'%',marginTop:config.md+'px',marginBottom:config.mg+'px'}">

					<div class="spe_item"  v-for="(item,index) in dataLists" :key="index" :style="{width:49+'%',marginRight:index%2==0?2+'%':0+'px',borderRadius:config.radius+'px'}">
						<div class="item_img">
							<img :src="item.goods_image"/>
						</div>
						<div class="item_title">{{item.goods_name}}</div>
						<div class="item_price">{{item.goods_price}}</div>
					</div>

			</div>
			<div class="spe_worm spe_context" v-if="config.template=='1'" :style="{paddingLeft:3+'%',paddingRight:3+'%',marginTop:config.md+'px',marginBottom:config.mg+'px'}">

					<div class="spe_item" v-for="(item,index) in dataLists" :key="index" :style="{width:32+'%',marginRight:(index+1)%3==0&&index>0?0+'px':2+'%',borderRadius:config.radius+'px'}">
						<div class="item_img">
							<img :src="item.goods_image"/>
						</div>
						<div class="item_title">{{item.goods_name}}</div>
						<div class="item_price">{{item.goods_price}}</div>
					</div>

			</div>
			<div class="spe_worm spe_scroll"  v-if="config.template=='2'" :style="{paddingLeft:config.pd+'px',paddingRight:config.pd+'px',marginTop:config.md+'px',marginBottom:config.mg+'px'}">
				<div class="spe_item" v-for="(item,index) in dataLists" :key="index" :style="{marginRight:config.xd+'px',borderRadius:config.radius+'px'}">
					<div class="item_img">
						<img :src="item.goods_image"/>
					</div>
					<div class="item_title">{{item.goods_name}}</div>
					<div class="item_price">￥{{item.goods_price}}</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="img_null" :style="{marginTop:config.vd+'px',marginBottom:config.vd+'px'}">
        <p class="fs16">点击编辑专题模块</p>
    </div>
    </div>
</template>

<script>
  export default {
    props: {
      dataLists:{
        type:Array,
        default:[]
      },
      config: Object,
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {
		console.log('商品',this.dataLists);
    },
  };
</script>
<style lang="less" scoped>
.img_null{
	height: 80px;
	display: flex;
	align-content: center;
	justify-content: center;
}
.spe_contain{
	img{
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
			padding: 10px;
			background-color: #ffffff;
			margin-bottom: 5px;
			.item_img{
				margin: 0 auto;
				/*height: 80px;*/
				img{
					width: 100%;
					height: auto;
				}
			}
			.item_title{
				line-height: 25px;
				margin-bottom: 5px;
				font-size: 14px;
				overflow: hidden;
				white-space: nowrap;
				text-overflow: ellipsis;
			}
			.item_price{
				line-height: 25px;
				font-size: 13px;
				font-weight: bold;
        color: #128D80;
			}
		}
	}
	.spe_context{

	}
	.spe_scroll{
		flex-wrap: nowrap;
		overflow-y: scroll;
		.spe_item{
			width: 100px;
			flex-shrink: 0;
		}

	}
}
</style>
