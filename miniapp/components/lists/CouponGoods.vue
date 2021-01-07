<template>
  <view class="goods-list" v-if="goodsLists.length > 0">
    <view class="coupon-page s-row" v-for="(item,index) in goodsLists" :key="index" @tap="toGoods(index+1)">
      <view class="image">
        <image :src="item.cover"></image>
      </view>
      <view class="content">
        <view class="title">{{item.title}}</view>
        <view class="num s-row">
          <text class="price"> 原价 ¥{{item.price}}</text>
          <text class="sold">已售{{item.sold}}件</text>
        </view>
        <view class="money s-row">
          <text class="coupon-price">券后价
            <text>¥{{item.discount_price}}</text>
          </text>
          <tag-coupon size="sm">{{item.coupon}}元券</tag-coupon>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import indexMock from '../../mock/index.js';
import redirect from '../../mixins/redirect.js'
import TagCoupon from '../../components/tag/coupon.vue';

export default {
  name: "CouponGoods",
  mixins: [redirect],
  components: {
    TagCoupon,
  },
  data() {
    return {
      goodsLists: indexMock.goodsLists
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../variable.styl';

.goods-list
  background: #ffffff;

  .coupon-page
    background: #ffffff;
    padding: 20upx;
    margin: 0 20upx;
    display: flex;

    &:not(:last-child)
      border-bottom: 1px solid #F8F8F8

    .image
      width: 40%;

      image
        width: 240upx;
        height: 240upx;
        border-radius: 3px;

    .content
      width: 60%;

      .title
        color: #333;
        font-weight: 400;
        font-size: $font-base;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        height: 84upx;
        margin-bottom: 20upx;
        overflow: hidden;

      .num
        color: #aaa;
        line-height: 20px;
        font-size: 13px;
        padding-top: 13px;

        .price
          font-size: $font-sm;
          padding-right: $margin-sm;
          margin-right: $margin-sm;
          position: relative;
          z-index: 1;
          zoom: 1;
          display: inline-block;

        .sold
          font-size: $font-sm;
          float: right;

      .money
        height: 24px;
        font-size: 18px;
        margin-top: 5px;
        display flex
        justify-content space-between
        align-items center

        .coupon
          position: relative;
          z-index: 1;
          zoom: 1;
          top: 0;
          overflow: hidden;
          float: right;

        .coupon-price
          color: $font-color-primary;
          font-size: $font-sm;

          text
            font-size: $font-lg;
            padding-left: $margin-sm;

</style>
