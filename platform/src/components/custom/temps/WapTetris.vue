<template>
  <div>
    <!-- <div :style="{
      mdding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px',background:config.background,borderRadius:config.boxR+'px'}">
    </div>  -->
	  <div v-if="dataLists.length>0" class="te_tris">
		  <div class="tr_contain" :style="{marginTop:config.mg+'px',marginBottom:config.mg+'px',paddingLeft:config.pd+'px',paddingRight:config.pd+'px'}">
			  <div class="tr_wrap_a tr_wrap" v-if="config.template=='0'">
				  <div class="tr_item_one tr_item"  :style="{borderRadius:config.radius+'px',marginRight:config.md+'px'}">
					  <img :src="dataLists[0].image_url" :style="{borderRadius:config.radius+'px'}"/>
				  </div>
				  <div class="tr_group" >
					<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius+'px',marginBottom:config.md+'px'}">
					  	<img :src="dataLists[1].image_url"  v-if="dataLists.length>1" :style="{borderRadius:config.radius+'px'}"/>
				  	</div>
					<div class="tr_group">
						<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius+'px',marginRight:config.md+'px'}" >
							<img :src="dataLists[2].image_url" v-if="dataLists.length>2" :style="{borderRadius:config.radius+'px'}"/>
						</div>
						<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius+'px'}" >
							<img :src="dataLists[3].image_url" v-if="dataLists.length>3" :style="{borderRadius:config.radius+'px'}"/>
						</div>
					</div>
				  </div>
			  </div>
			   <div class="tr_wrap_b tr_wrap" v-if="config.template=='1'">
					<div class="tr_group" >
						<div class="tr_item_one tr_item"  :style="{borderRadius:config.radius+'px',marginBottom:config.md+'px'}">
							<img :src="dataLists[0].image_url" :style="{borderRadius:config.radius+'px'}"/>
						</div>
						<div class="tr_group" >
							<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius+'px'}">
								<img :src="dataLists[1].image_url"  v-if="dataLists.length>1" :style="{borderRadius:config.radius+'px'}"/>
							</div>
							<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius+'px',marginLeft:config.md+'px'}" >
								<img :src="dataLists[2].image_url" v-if="dataLists.length>2" :style="{borderRadius:config.radius+'px'}"/>
							</div>
						</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius+'px',marginLeft:config.md+'px'}" >
						<img :src="dataLists[3].image_url" v-if="dataLists.length>3" :style="{borderRadius:config.radius+'px'}"/>
					</div>
			  </div>
			   <div class="tr_wrap_c tr_wrap" v-if="config.template=='2'">
				 <div class="tr_item_one tr_item"  :style="{borderRadius:config.radius+'px',marginRight:config.md+'px'}">
					  <img :src="dataLists[0].image_url" :style="{borderRadius:config.radius+'px'}"/>
				  </div>
				  <div class="tr_group" >
					<div class="tr_group">
					<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius+'px',marginRight:config.md+'px'}">
					  	<img :src="dataLists[1].image_url"  v-if="dataLists.length>1" :style="{borderRadius:config.radius+'px'}"/>
				  	</div>
					<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius+'px'}">
						<img :src="dataLists[2].image_url" v-if="dataLists.length>2" :style="{borderRadius:config.radius+'px'}"/>
					</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius+'px',marginTop:config.md+'px'}" >
						<img :src="dataLists[3].image_url" v-if="dataLists.length>3" :style="{borderRadius:config.radius+'px'}"/>
					</div>
				  </div>
			  </div>
			   <div class="tr_wrap_d tr_wrap" v-if="config.template=='3'">
				  <div class="tr_group" >
					  <div class="tr_group" >
						<div class="tr_item_one tr_item"  :style="{borderRadius:config.radius+'px'}">
							<img :src="dataLists[0].image_url" :style="{borderRadius:config.radius+'px'}"/>
						</div>
						<div class="tr_item_two tr_item"  :style="{borderRadius:config.radius+'px',marginLeft:config.md+'px'}">
							<img :src="dataLists[1].image_url"  v-if="dataLists.length>1" :style="{borderRadius:config.radius+'px'}"/>
						</div>
					  </div>
						<div class="tr_item_three tr_item"  :style="{borderRadius:config.radius+'px',marginTop:config.md+'px'}" >
							<img :src="dataLists[2].image_url" v-if="dataLists.length>2" :style="{borderRadius:config.radius+'px'}"/>
						</div>
					</div>
					<div class="tr_item_four tr_item"  :style="{borderRadius:config.radius+'px',marginLeft:config.md+'px'}" >
						<img :src="dataLists[3].image_url" v-if="dataLists.length>3" :style="{borderRadius:config.radius+'px'}"/>
					</div>
			  </div>
		  </div>
	  </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑图片专区</p>
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
		console.log('信息',this.config);
		console.log('信息2',this.dataLists);
    },
  };
</script>
<style lang="less" scoped>
.img_null{
	height: 100px;
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
				img{
					width: 100%;
					height: 100%;
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
				img{
					width: 100%;
					height: 100%;
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
				img{
					width: 100%;
					height: 100%;
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
				img{
					width: 100%;
					height: 100%;
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
