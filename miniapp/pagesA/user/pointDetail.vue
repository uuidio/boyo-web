<template>
	<view class="point-wrap">
    <view class="wrap-main">
      <view class="wrap-content">
        <view class="detail-item fxBox2 border-b-d7">
           <text class="text-13">
             积分类别：
           </text>
           <text class="text-13 ml-sm">
             {{detail.behavior}}
           </text>
         </view>
        <view class="detail-item border-b-d7 fxBox2">
          <text class="text-13">
            积分数量：
          </text>
          <text class="text-13 ml-sm">
            {{detail.behavior_type == 'obtain' ? '+' : '-'}}{{detail.point}}积分
          </text>
        </view>
        <view class="detail-item border-b-d7 fxBox2" v-if="detail.shop_name">
          <text class="text-13">
            消费店铺：
          </text>
          <text class="text-13 ml-sm">
            {{detail.shop_name}}
          </text>
        </view>
        <view class="detail-item border-b-d7 fxBox2" v-if="detail.amount">
            <text class="text-13">
              消费金额：
            </text>
            <text class="text-13 ml-sm">
              {{detail.amount}}
            </text>
          </view>
        <view class="detail-item  fxBox2">
          <text class="text-13">
            积分时间：
          </text>
          <text class="text-13 ml-sm">
            {{detail.created_at}}
          </text>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import meHeader from '../../components/header/header'
import mta from '../../mixins/mta';
export default {
  mixins: [mta],
	components: {
    meHeader,
    uniLoadMore
  },
  data() {
    return {
      itemId: '',
      detail: {},
    };
  },

  onLoad: function(o) {
    this.itemId = o.itemId
    this.getPointDetail();
  },
	onShow() {},
	mounted() {},
	methods: {

    getPointDetail(){
      this.$http({
        aurl: 'getPointDetail',
        data: {
          id: this.itemId
        },
        success: res => {
          if (res.data.code === 0) {
            this.detail = res.data.result
          }
        },
        fail: error => {
        },
        complete: () => {

        }
      });

    },
  }
};
</script>

<style scoped lang="stylus">
  .point-wrap
    &:before
      content ''
      width 100%
      height 1rpx
      background #D7D7D7
      position fixed
      top 0
      left 0

    .wrap-main
      padding 24rpx 20rpx 0
      .wrap-content
        background #fff
        border-radius 16rpx
        padding 0 0 0 24rpx
        .detail-item
          height 90rpx
          padding-right 24rpx
</style>
