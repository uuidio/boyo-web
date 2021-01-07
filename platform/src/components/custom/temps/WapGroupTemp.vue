<template>
  <div>
    <div class="activity-list" v-if="dataLists.length>0" :style="{padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px'}">
      <div class="activity-item" :key="index" v-for="(item,index) in dataLists" :style="{background: config.background,borderRadius: (index === 0 ? config.r : 0)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? config.r : 0)+'px'}">
        <div class="main-tit-box">
          <p class="main-tit" :style="{color: item.mTitCol}">
            {{item.main_title}}
          </p>
          <div class="count-down-box" v-if="item.countDown">
            00:00:00
          </div>
        </div>
        <div class="tit-box" :style="{color: item.titCol}">
          {{item.title}}
        </div>
        <div class="goods-list">
          <div class="goods-item" :key="idx" v-for="(itm,idx) in item.goodsList" v-if="idx < 3">
            <p class="img-box">
              <img :src="itm.goods_image" alt="">
            </p>
            <div class="goods-price-box">
              <span class="goods-name">
                {{itm.goods_name}}
              </span>
            </div>
          </div>
        </div>
		<div class="active-action">
               {{item.ant_title}}
        </div>
      </div>
    </div>
    <div v-else class="img_null">
      <p class="fs16">点击编辑活动分组</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    dataLists: {
      type: Array,
      default: () => [],
    },
    config: Object,
  },
  methods: {},
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
	  width: 40%;
	  .goods-list{
		  .goods-item{
			  width: 100%;
		  }
	  }
  }
  .activity-item{
    min-height: 150px;
    padding: 15px 8px;
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
      font-size: 12px;
      margin-top: 6px;
	  line-height: 1;
	  text-align: center;
	  margin-bottom: 10px;
	}
	.active-action{
		width: 100%;
		text-align: center;
		border: 1px solid #128D80;
		font-size: 12px;
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
          width: 100%;
          overflow: hidden;
          height: 65px;
          img{
            width: 100%;
            height: 100%;
            vertical-align: top;
          }
        }
        .goods-price-box{
          text-align: center;
		  margin-top: 5px;
		  overflow: hidden;
			white-space: nowrap;
			text-overflow: ellipsis;
          .goods-name{
			font-size: 12px;
          }
        }
      }
    }
  }
}
</style>
