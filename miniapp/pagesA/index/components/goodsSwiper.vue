<template>
 <view>
   <view v-for="(item,index) in listsData" :key="index">
     <view class="add-img" @tap="seeMore(item)">
       <image :src="item.image_url" mode="widthFix"/>
     </view>
     <view>
       <swiper
           :display-multiple-items="3.2"
           class="goods-swiper-box"
       >
         <swiper-item
             v-for="(goods_item, index2) in item.value"
             :key="index2"
             class="swiperItem"
         >
           <view class="goods-swiper" @click="toGoodsDetail(goods_item.id)">
             <view class="imgBox">
               <image :src="goods_item.goods_image" mode="widthFix"></image>
             </view>
             <view class="textBox">
               <view class="goods-title line2-p text-13" data-line="1">
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
         </swiper-item>
         <swiper-item class="goods-more" @click="seeMore(item)">
           <view class="more-icon">
             <text class="iconfont icon-round_down_light"></text>
           </view>
           <view>
             查看更多
           </view>
         </swiper-item>
       </swiper>
     </view>
   </view>
 </view>
</template>

<script>
    export default {
        props:{
            listsData:{
                type: Array,
                default:[],
            },
        },
      watch:{
        listsData(){
          console.log(this.listsData)
        }
      },
        data() {
            return {};
        },
        methods: {
          seeMore(item){
            console.log(item)
            switch (item.toType) {
              case 'shop' :
                if(item.selectShopType==='brand'){
                  this.toQueryLink('/pagesA/brand/lists',{
                    shopid:item.toId
                  })
                }else{
                  this.toQueryLink('/pagesB/shop/index',{
                    shopid:item.toId
                  })
                }
                break;
              case 'activity':
                const _url ='/pagesB/activity/'+item.toId
                this.toLink(_url)
                break;
              case 'class':
                this.toQueryLink('/pagesA/goods/lists',{
                  gc_id:item.toId
                })
                break;
            }
          }
        },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
  .add-img
    display block
    width 100%
    image
      width 100%
      display block


  /*商品轮播*/
  .goods-swiper-box
    background #ffffff
    padding 20rpx
    height: 380rpx
    .goods-more
      width 100%
      height 206rpx!important
      margin-top 20rpx
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
    padding  20rpx 10rpx
    box-sizing border-box
    .imgBox
      width 100%
      image
        display block
        width 100%
    .textBox
      padding-top 20rpx
      .goods-price
        padding-top 20rpx
</style>
