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
          <div class="goods-item" :key="idx" v-for="(itm,idx) in item.goodsList" v-if="idx < 2">
            <p class="img-box">
              <img :src="itm.goods_image" alt="">
            </p>
            <div class="goods-price-box">
              <span class="price-sign">￥</span>
              <span class="goods-price">
                {{itm.goods_price}}
              </span>
            </div>
          </div>
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
  .activity-item{
    width: 49%;
    min-height: 150px;
    padding: 12px 8px;
    &+.activity-item{
      margin-left: 2%;
    }
    .main-tit-box{
      display: flex;
      align-items: center;
      .main-tit{
        font-size: 16px;
        font-weight: bold;
        line-height: 1;
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
    }
    .goods-list{
      display: flex;
      margin-top: 6px;
      .goods-item{
        width: 48%;
        &+.goods-item{
          margin-left: 4%;
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
          font-weight: bold;
          display: flex;
          color: #FF173E;
          justify-content: center;
          align-items: flex-end;
          line-height: 1;
          margin-top: 5px;
          .price-sign{
            font-size: 12px;
            margin-bottom: 1px;
          }
          .goods-price{
            font-size: 18px;
          }
        }
      }
    }
  }
}
</style>
