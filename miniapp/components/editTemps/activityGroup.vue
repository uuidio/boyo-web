<template>
  <view>
    <view class="activity-list"  :style="{padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px'}">
      <view class="activity-item" :key="index" v-for="(item,index) in options" :style="{background: config.background,borderRadius: (index === 0 ? config.r : 0)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? 0 : config.r)+'px'+ ' '+(index === 0 ? config.r : 0)+'px'}" @click="to(item)">
        <view class="main-tit-box">
          <view class="main-tit" :style="{color: item.mTitCol}">
            {{item.main_title}}
          </view>
          <view class="count-down-box" v-if="item.showTime">
            <uni-countdown :second="item.seckill_remain_time"  @timeup="timeUp(index)" color="#FF173E" splitor-color="#FF173E"></uni-countdown>
          </view>
        </view>
        <view class="tit-box" :style="{color: item.titCol}">
          {{item.title}}
        </view>
        <view class="goods-list">
          <view class="goods-item" :key="idx" v-for="(itm,idx) in item.goodsList" v-if="idx < 2" @click.stop="toGoodsDetail(itm.id)">
            <view class="img-box">
              <image :src="itm.goods_image" mode="widthFix"></image>
            </view>
            <view class="goods-price-box">
              <text class="price-sign">￥</text>
              <text class="goods-price">
                {{itm.goods_price}}
              </text>
            </view>
          </view>
        </view>
      </view>
    </view>

  </view>
</template>

<script>
  import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';
  import tool from '../../static/base/toolFun.js';
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
      return {
        test: 'test',
        showDay: true,
        downSecond: new Date(),
        isSeckill: false,
        isGroup: false,
        px(num){
          return uni.upx2px(num*2) + 'px'
        },
      };
    },
    components: {
      uniCountdown
    },
    onLoad (options) {
      // let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
      // let end_time = tool.toTimeStamp(tool.toFullTime())+3600*3*1000 / 1000;
      // this.downSecond = end_time - now_time;
    },
    onShow () {
    },
    computed: {
      nowDate () {
        return 3600*2;
      }
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
    },
    mounted() {
    },
  };
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'


.activity-list
  display flex
  .activity-item
    width 49%
    padding 24rpx 16rpx
    box-sizing: border-box;
    &+.activity-item
      margin-left 2%
    .main-tit-box
      display flex
      align-items center
      .main-tit
        flex-shrink 0
        font-size 32rpx
        font-weight bold
        line-height 1
      .count-down-box
        text-align center
        /*width 128rpx*/
        height 36rpx
        line-height 36rpx
        padding 0 15rpx
        border 1rpx solid #FF173E
        border-radius 36rpx
        font-size 24rpx
        font-weight bold
        color #FF173E;
        margin-left 16rpx
    .tit-box
      font-size 24rpx
      margin-top 12rpx
      line-height 1
    .goods-list
      display flex
      margin-top 12rpx
      .goods-item
        width 49%
        &+.goods-item
          margin-left 2%
        .img-box
          width: 100%;
          height: 0;
          position: relative;
          padding-top: 100%;
          overflow hidden
          image
            width: 100%;
            position: absolute;
            left: 0;
            top: 0;
        .goods-price-box
          text-align center
          font-weight bold
          display flex
          color #FF173E
          justify-content center
          align-items flex-end
          line-height 1
          margin-top 10rpx
          .price-sign
            font-size 18rpx
          .goods-price
            font-size 26rpx

</style>
