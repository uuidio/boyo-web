<template>
  <view>
    <view v-if="config.list_num===6" :style="{
      padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+ ' '+config.mL+'px',borderRadius: config.tR + 'px'+' '+config.tR + 'px'+' '+config.bR + 'px'+' '+config.bR + 'px'}">
      <scroll-view
          scroll-x="true"
          class="goods-swiper-box"
          :style="{borderRadius: config.tR + 'px'+' '+config.tR + 'px'+' '+config.bR + 'px'+' '+config.bR + 'px'}"
      >
        <view
            v-for="(goods_item, index2) in options"
            :key="index2"
            class="swiperItem"
        >
          <view class="goods-swiper" @click="toGoodsDetail(goods_item.id)">
            <view class="imgBox">
				   	<image src="/static/images/500x500.jpg" mode="widthFix" v-if="!showArr[index2] && showImg"></image>
              		<image @load="loadImg(goods_item,index2)" :src="goods_item.goods_image" mode="widthFix"></image>
            </view>
            <view class="textBox">
              <view class="goods-title text-12 w100" >
                {{goods_item.goods_name}}
              </view>
              <view class="goods-price">
                <text class="text-12 col-green">
                  ￥{{goods_item.goods_price}}
                </text>
              </view>
              <view class="original-price">
                <text class="text-s col-c7 del-text">
                ￥{{goods_item.goods_marketprice}}
              </text></view>
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
             margin:px(config.mT)+' '+px(config.mL)+' '+px(config.mT)+' '+px(config.mL),padding:px(config.pT)+' '+px(config.pR)+' '+px(config.pB)+' '+px(config.pL)
          }"
    >
      <view
          :class="{
            'show_one':config.list_num===1?true:false,
            'show_two':config.list_num===2?true:false,
            'show_three':config.list_num===3?true:false,
          }"
      >
         <view  :style="{
             borderRadius:px(config.itemR)
          }" class="goods-box" v-for="(item,index) in options" :key="index" @click="toGoodsDetail(item.id)">
           <view class="imgBox">
			   <view class="imgBox_img">
					<image src="/static/images/500x500.jpg" mode="widthFix" v-if="!showArr[index] && showImg"></image>
					<image @load="loadImg(item,index)" :src="item.goods_image" mode="widthFix"></image>
			   </view>
           </view>
           <view class="text-box">
             <view class="goods-title line2-p">
               {{item.goods_name}}
             </view>
             <view class="money">
               <text class="price-sign">¥</text><text class="price">{{ item.goods_price }}</text>
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
      gm_Id: [String, Number],
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
        showArr: [],
        showImg:true
      };
    },
    methods: {
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

<style scoped lang="stylus">
  @import '../../variable.styl'
  .money
    font-size $font-md
  .price-sign
    color #FF173E
    font-size $font-sm
    font-weight bold
  .price
    color #FF173E
    font-size 32rpx
    font-weight bold
  .market-price
    font-size 22rpx
    color #999
    text-decoration line-through
    padding-left 10rpx
  /*商品轮播*/
  .goods-swiper-box
    background #ffffff
    padding 16rpx 0 0 16rpx
    height: 350rpx
    display flex
    white-space: nowrap;
    width 100%
    box-sizing border-box
    .swiperItem
      width 200rpx
      margin-right 16rpx
      display inline-block
      vertical-align:top
    .goods-moreBox
      display inline-block
      width 200rpx
      vertical-align:top
      margin-right 16rpx
    .goods-more
      width 100%
      height 200rpx!important
      box-sizing border-box
      background #f3f5f7
      display flex
      align-items center
      justify-content center
      flex-direction column
      .more-icon
        transform rotate(-90deg)
        margin-bottom 10rpx
        .iconfont
          font-size 20px
  .goods-swiper
    width 100%
    /*padding  20rpx 10rpx*/
    box-sizing border-box
    .goods-title
        white-space:nowrap;/*规定段落中的文本不进行换行*/
        overflow:hidden;/*内容会被修剪，并且其余内容是不可见的。*/
        text-overflow:ellipsis;
    .imgBox
      width 100%
      padding-top 100%
      position relative
      overflow hidden
      image
        display block
        width 100%
        position absolute
        left 0
        top 0
    .textBox
      padding-top 16rpx
      line-height 1
      width 100%
      .goods-price
        padding-top 12rpx
        line-height 1
      .original-price
        padding-top 12rpx
        line-height 1
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
      background #fff
      box-sizing border-box
      &:nth-child(n+3)
        margin-top 14rpx
      &:nth-child(2n)
        margin-left 2%
      .imgBox
        width 100%
        padding 20rpx
        box-sizing border-box
        .imgBox_img
          width 100%
          position relative
          padding-top 100%
          overflow: hidden;
          image
            position absolute
            left 0
            top 0px
            width 100%
            vertical-align top
      .text-box
        padding 0 18rpx 20rpx 18rpx
        .goods-title
          height 75rpx
          font-size 26rpx
          color #333333
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
