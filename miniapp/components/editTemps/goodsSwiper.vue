<template>
  <view v-if="dataLists.length>0" class="mt-md">
    <view class="p-md fxBox2 bc-fff ml-md mr-md border-radius5px">
      <text>{{config.title}}</text>
      <text @tap="toggleShow" class="emfont icon-dowm text-18 col-666"  :class="{
      'icon-fold':showBox?true:false,
      'icon-unfold':showBox?false:true,
      }">
      </text>
    </view>
    <swiper class="goods-swiper" :indicator-dots="true" :display-multiple-items="1"  v-show="showBox">
      <swiper-item v-for="(item,index) in dataLists">
        <view class="goods-box">
          <view class="goods-item border-radius5px" v-for="(goods_item,goods_index) in item" @tap="toGoodsDetail(goods_item.id)">
            <view class="w100">
              <image class="w100 imgaa" mode="widthFix" :src="goods_item.goods_image"></image>
            </view>
            <view class="text-box p-md">
              <view class="title">
                {{goods_item.goods_name}}
              </view>
              <view>
                <view class="price-box">
                  <view class="money">
                    <text class="price col-red">¥{{ goods_item.goods_price }}</text>
                    <text class="market-price">¥{{ goods_item.goods_marketprice }}</text>
                  </view>
                </view>
              </view>
            </view>
          </view>
        </view>
      </swiper-item>
    </swiper>

  </view>
</template>

<script>
  export default {
    props: {
      options:{
        type:Array,
        default:[]
      },
      config: Object,
    },
    computed:{
      dataLists(){
        const arrs = []
        let arr = []
        for(let i = 0;i<this.options.length;i++){
          arr.push(this.options[i])
          if(i%4===3){
            arrs.push(arr)
            arr = []
          }
          if(i==this.options.length-1&&arr.length>0){
            arrs.push(arr)
            arr = []
          }
        }
        return arrs
      }
    },
    data() {
      return {
        showBox : this.config.is_open
      };
    },
    methods: {
      toggleShow(){
        this.showBox == 0 ?  this.showBox = 1 : this.showBox = 0
      }
    },
    mounted() {

    },
  };
</script>

<style scoped lang="stylus">
  .goods-swiper
    height 1100rpx
    .title
      color #333
      font-weight 400
      font-size $font-base
      text-overflow ellipsis
      display -webkit-box
      -webkit-line-clamp 2
      -webkit-box-orient vertical
      margin-bottom 15rpx
      overflow hidden
      height 75rpx
  .money
    font-size $font-md
    line-height 40rpx
    .price
      color $font-color-primary
      font-size $font-lg
      font-weight bold
    .market-price
      font-size 24rpx
      color #a0a0a0
      text-decoration line-through
      padding-left 12rpx
  .goods-box
    padding 20rpx 20rpx 0
    display flex
    flex-wrap wrap
    .goods-item
      width 49%
      margin-bottom 20rpx
      background #ffffff
      &:nth-child(2n)
        margin-left 2%
</style>
