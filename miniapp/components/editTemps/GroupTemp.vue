<template>
  <view>
    <view class="activity-list" v-if="options.length>0" :style="{padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px'}">
      <view class="activity-item" :key="index" v-for="(item,index) in options" :style="{background: config.background,borderRadius: (index === 0 ? config.r : 0)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? config.r : 0)+'px'}" @click="to(item)">
        <view class="main-tit-box">
          <p class="main-tit" :style="{color: item.mTitCol}">
            {{item.main_title}}
          </p>
          <view class="count-down-box" v-if="item.countDown">
            00:00:00
          </view>
        </view>
        <view class="tit-box" :style="{color: item.titCol}">
          {{item.title}}
        </view>
        <view class="goods-list">
          <view class="goods-item" :key="idx" v-for="(itm,idx) in item.goodsList" v-if="idx < 3" @click.stop="toGoodsDetail(itm.id)">
            <p class="img-box">
              <image  :src="itm.goods_image" ></image>
			  <!-- mode="widthFix" -->
            </p>
            <view class="goods-price-box">
              <span class="goods-name">
                {{itm.goods_name}}
              </span>
            </view>
          </view>
        </view>
		<view class="active-action" @click="to(item)">
               {{item.ant_title}}
        </view>
      </view>
    </view>
    <view v-else class="img_null">
      <p class="fs16">点击编辑活动分组</p>
    </view>
  </view>
</template>

<script>
export default {
  data() {
    return {
		showDay: true,
        downSecond: new Date(),
        isSeckill: false,
        isGroup: false,
        px(num){
          return uni.upx2px(num*2) + 'px'
        },
        showArr: [],
        showImg:true
    };
  },
  props: {
    gm_Id: [String, Number],
    options: {
      type: Array,
      default: () => [],
    },
    config: Object,
  },
  methods: {
	   timeUp(index) {
        uni.showToast({
          title: '活动结束,下次早点来~',
          icon: 'none'
        });
        this.isSeckill = false;
      },
      to(item){
        if(!item.value){
          return
        }
        this.customTo(item, this.gm_Id)
      },
      loadImg(item,index) {
        this.showImg = false
        if(item.goods_image){
          this.$set(this.showArr, index, true);
        }
        this.showImg = true
      }
  },
  mounted() {

  },
};
</script>

<style lang="less" scoped>
.activity-list{
  display: flex;
  & .activity-item:nth-child(1){
	  width: 60%;
		.main-tit-box{
			.main-tit{
				color: #5559BD;
			}
		}
		.goods-list{
			.goods-item{
				width: 32%;
			}
	  	}
  }
  & .activity-item:nth-child(2){
	  width: 30%;
	  .goods-list{
		  .goods-item{
			  width: 64%;
			  margin: 0 auto;
		  }
	  }
  }
  .activity-item{
    min-height: 150px;
    padding: 30rpx 16rpx 10rpx 16rpx;
    &+.activity-item{
      margin-left: 2%;
    }
    .main-tit-box{
      text-align: center;
      .main-tit{
        font-size: 14px;
		line-height: 1;
		font-weight: bold;
      }
      .count-down-box{
        text-align: center;
        width:64px;
        height:18px;
        line-height: 16px;
        border:1px solid #FF173E;
        border-radius:18px;
        font-size:12px;
        font-weight:bold;
        color:#FF173E;
        margin-left: 8px;
      }
    }
    .tit-box{
      font-size: 24rpx;
      margin-top: 6px;
	  line-height: 1;
	  text-align: center;
	  margin-bottom: 10px;
	}
	.active-action{
		width: 100%;
		text-align: center;
		border: 1px solid #128D80;
		font-size: 24rpx;
		border-radius: 10px;
		margin-top: 10px;
		color: #128D80;
	}
    .goods-list{
      display: flex;
	  margin-top: 6px;
	  min-height: 90px;
      .goods-item{
        &+.goods-item{
          margin-left: 2%;
        }
        .img-box{
        //   width: 100%;
        //   overflow: hidden;
		  //height: 65px;
		  	position: relative;
			width: 100%;
			height: 0px;
			padding-top: 100%;
          image{
            // width: 100%;
            // height: 100%;
			// vertical-align: top;
			position: absolute;
			top: 0;
			left: 0;
			width: 100%;
			height: 100%;
          }
        }
        .goods-price-box{
          text-align: center;
		  margin-top: 5px;
		  overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
          .goods-name{
			font-size: 24rpx;
          }
        }
      }
    }
  }
}
</style>
