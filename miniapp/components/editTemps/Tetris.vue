<template>
  <view>
	  <view v-if="options.length>0" class="te_tris">
		  <view class="tr_contain" :style="{marginTop:config.mg+'px',marginBottom:config.mg+'px',paddingLeft:config.pd+'px',paddingRight:config.pd+'px'}">
				  <div class="tr_wrap_a tr_wrap" v-if="config.template=='0'">
				  <div class="tr_item_one tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginRight:config.md+'px'}">
					  <image :src="options[0].image_url" @tap="to(options[0])" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
				  </div>
				  <div class="tr_group" >
					<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginBottom:config.md+'px'}">
					  	<image :src="options[1].image_url" @tap="to(options[1])" v-if="options.length>1" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
				  	</div>
					<div class="tr_group">
						<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginRight:config.md+'px'}" >
							<image :src="options[2].image_url" @tap="to(options[2])" v-if="options.length>2" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
						<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius*2+'rpx'}" >
							<image :src="options[3].image_url" @tap="to(options[3])" v-if="options.length>3" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
					</div>
				  </div>
			  </div>
			   <div class="tr_wrap_b tr_wrap" v-if="config.template=='1'">
					<div class="tr_group" >
						<div class="tr_item_one tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginBottom:config.md+'px'}">
							<image :src="options[0].image_url" @tap="to(options[0])" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
						<div class="tr_group" >
							<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius*2+'rpx'}">
								<image :src="options[1].image_url" @tap="to(options[1])" v-if="options.length>1" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
							</div>
							<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginLeft:config.md+'px'}" >
								<image :src="options[2].image_url" v-if="options.length>2" @tap="to(options[2])" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
							</div>
						</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginLeft:config.md+'px'}" >
						<image :src="options[3].image_url" @tap="to(options[3])" v-if="options.length>3" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
					</div>
			  </div>
			   <div class="tr_wrap_c tr_wrap" v-if="config.template=='2'">
				 <div class="tr_item_one tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginRight:config.md+'px'}">
					  <image :src="options[0].image_url" @tap="to(options[0])" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
				  </div>
				  <div class="tr_group" >
					<div class="tr_group">
					<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginRight:config.md+'px'}">
					  	<image :src="options[1].image_url" @tap="to(options[1])"  v-if="options.length>1" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
				  	</div>
					<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius*2+'rpx'}">
						<image :src="options[2].image_url" @tap="to(options[2])" v-if="options.length>2" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
					</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginTop:config.md+'px'}" >
						<image :src="options[3].image_url" @tap="to(options[3])" v-if="options.length>3" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
					</div>
				  </div>
			  </div>
			   <div class="tr_wrap_d tr_wrap" v-if="config.template=='3'">
				  <div class="tr_group" >
					  <div class="tr_group" >
						<div class="tr_item_one tr_item"  :style="{borderRadius:config.radius*2+'rpx'}">
							<image :src="options[0].image_url" @tap="to(options[0])" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
						<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginLeft:config.md+'px'}">
							<image :src="options[1].image_url" @tap="to(options[1])" v-if="options.length>1" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
					  </div>
						<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginTop:config.md+'px'}" >
							<image :src="options[2].image_url" @tap="to(options[2])" v-if="options.length>2" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
						</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius*2+'rpx',marginLeft:config.md+'px'}" >
						<image :src="options[3].image_url" @tap="to(options[3])" v-if="options.length>3" :style="{borderRadius:config.radius*2+'rpx'}"  mode="widthFix"/>
					</div>
			  </div>
		  </view>
	  </view>
      <view v-else class="image_null">
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
		console.log('信息',this.config);
		console.log('信息2',this.options);
    },
  };
</script>
<style lang="less" scoped>
.image_null{
	height: 200rpx;
	display: flex;
	align-content: center;
	justify-content: center;
}
.tr_group{
	display: flex;
	//flex: 1;
	width: 50%;
}
.tr_wrap .tr_group{
	flex-direction: column;
	width: 50%;
}
.tr_wrap .tr_group .tr_group{
	flex-direction: row;
	align-items: flex-end;
	width: 100%;
}
.tr_wrap .tr_group .tr_group .tr_group{
	flex-direction: row;
}
.te_tris{
	position: relative;
	.tr_contain{
		position: relative;
		.tr_wrap_a{
			position: relative;
			display: flex;
			.tr_item{
				image{
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}
			}
			.tr_item_one{
				//flex: 1;
				width: 50%;
			}
			.tr_item_two{
				// flex: 1;
				// height: 200rpx;
				width: 100%;
			}
			.tr_item_three{
				// flex: 1;
				// height: 200rpx;
				width: 50%;
			}
			.tr_item_four{
				// flex: 1;
				// height: 200rpx;
				width: 50%;
			}
		}
		.tr_wrap_b{
			position: relative;
			display: flex;
			.tr_item{
				image{
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}
			}
			.tr_item_one{
				// flex: 1;
				// height: 200rpx;
				width: 100%;
			}
			.tr_item_two{
				// flex: 1;
				// height: 200rpx;
				width: 50%;
			}
			.tr_item_three{
				// flex: 1;
				// height: 200rpx;
				width: 50%;
			}
			.tr_item_four{
				// flex: 1;
				width: 50%;
			}
		}
		.tr_wrap_c{
			position: relative;
			display: flex;
			.tr_item{
				image{
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}
			}
			.tr_item_one{
				//flex: 1;
				width: 50%;
			}
			.tr_item_two{
				// flex: 1;
				// height: 200rpx;
				width: 50%;
			}
			.tr_item_three{
				//flex: 1;
				//height: 200rpx;
				width: 50%;
			}
			.tr_item_four{
				//flex: 1;
				//height: 200rpx;
				width: 100%;
			}
		}
		.tr_wrap_d{
			position: relative;
			display: flex;
			.tr_item{
				image{
					width: 100%;
					height: 100%;
					vertical-align: bottom;
				}
			}
			.tr_item_one{
				//flex: 1;
				//height: 200rpx;
				width: 50%;
			}
			.tr_item_two{
				//flex: 1;
				//: 200rpx;
				width: 50%;
			}
			.tr_item_three{
				//flex: 1;
				//height: 200rpx;
				width: 100%;
			}
			.tr_item_four{
				//flex: 1;
				width: 50%;
			}
		}
	}
}
</style>
