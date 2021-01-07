<template>
  <view>
    <view v-if="config.list_num===6" :style="{
		     margin:px(config.m)
		  }">
      <scroll-view
          scroll-x="true"
          class="goods-swiper-box"
      >
        <view
            v-for="(goods_item, index2) in options"
            :key="index2"
			:style="{
				borderRadius:px(config.r)
			 }"
            class="swiperItem"
        >
          <view class="goods-swiper"  @click="toGoodsDetail(goods_item.id)">
            <view class="imgBox">
              <image :src="goods_item.goods_image" mode="widthFix"></image>
            </view>
            <view class="textBox">
              <view class="goods-title text-13 w100" >
                {{goods_item.goods_name}}
              </view>
              <view class="goods-price">
                <text class="text-13 col-red">
                  ￥{{goods_item.goods_price}}
                </text>
                <text class="text-xs col-666 del-text">
                  ￥{{goods_item.goods_marketprice}}
                </text>
              </view>
            </view>
          </view>
        </view>
        <view class="goods-moreBox">
          <view class="goods-more" @tap="to(config)">
            <view class="more-icon">
              <text class="iconfont icon-round_down_light"></text>
            </view>
            <view>
              查看更多
            </view>
          </view>
        </view>
      </scroll-view>
    </view>
    <view v-else class="text-md"
          :style="{
             margin:px(config.m)
          }"
    >
<!-- 	:style="{
	   margin:px(config.mT)+' '+px(config.mL)
	}" -->
      <view
          :class="{
            'show_one':config.list_num===1?true:false,
            'show_two':config.list_num===2?true:false,
            'show_three':config.list_num===3?true:false,
          }"
      >
         <view  :style="{
             borderRadius:px(config.r)
          }" class="goods-box" v-for="(item,index) in options" @click="toGoodsDetail(item.id)">
           <view class="imgBox">
             <image mode="widthFix" :src="item.goods_image"></image>
           </view>
           <view class="text-box">
             <view class="goods-title line2-p">
               {{item.goods_name}}
             </view>
             <view class="money">
               <text class="price">¥{{ item.goods_price }}</text>
               <text class="market-price">¥{{ item.goods_marketprice }}</text>
             </view>
           </view>
         </view>
      </view>
    </view>
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
    data() {
      return {
        px(num){
          return uni.upx2px(num*2) + 'px'
        },
      };
    },
    methods: {
      to(item){
		  console.log(item);
        if(!item.value){
          return
        }
        this.customTo(item)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  @import '../../../variable.styl'
  .money
    font-size $font-md
  .price
    color $font-color-primary
    font-size $font-lg
    font-weight bold
  .market-price
    font-size 24rpx
    color #a0a0a0
    text-decoration line-through
    padding-left 12rpx
  /*商品轮播*/
  .goods-swiper-box
    padding 20rpx
    height: 380rpx
    display flex
    white-space: nowrap;
    width 100%
    box-sizing border-box
    .swiperItem
      overflow:hidden
      background #fff
      width 30%
      margin-right 20rpx
      display inline-block
      vertical-align top
    .goods-moreBox
      display inline-block
      width 30%
      vertical-align:top
    .goods-more
      width 100%
      height 190rpx!important
      box-sizing border-box
      background #f3f5f7
      display flex
      align-items center
      justify-content center
      flex-direction column
      margin-top 10rpx
      .more-icon
        transform rotate(-90deg)
        margin-bottom 10rpx
        .iconfont
          font-size 20px
  .goods-swiper
    width 100%
    padding  20rpx 10rpx
    box-sizing border-box
    .goods-title
        white-space:nowrap;/*规定段落中的文本不进行换行*/
        overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
        text-overflow:ellipsis;
    .imgBox
      width 100%
      image
        display block
        width 100%
    .textBox
      padding-top 20rpx
      width 100%
      .goods-price
        padding-top 20rpx
  .show_one
    width 100%
    background #fff
    .imgBox
      width 100%
      image
        width 100%
     .text-box
      padding 20rpx
      .goods-title
        height 75rpx
  .show_two
    width 100%
    display flex
    flex-wrap wrap
    .goods-box
      width 49%
      padding 20rpx
      background #fff
      box-sizing border-box
      &:nth-child(n+3)
        margin-top 20rpx
      &:nth-child(2n)
        margin-left 2%
      .imgBox
        width 100%
        image
          width 100%
      .goods-title
        height 75rpx
  .show_three
    display flex
    flex-wrap wrap
    .goods-box
      width 32%
      padding 15rpx
      background #ffffff
      box-sizing border-box
      &:nth-child(n+4)
        margin-top 20rpx
      &:not(:nth-child(3n))
        margin-right 2%
      .imgBox
        width 100%
        image
          width 100%
        .goods-title
          height 75rpx
</style>
