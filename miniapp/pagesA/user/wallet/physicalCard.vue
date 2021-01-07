<template>
  <view class="card-wrap">
    <view class="physical-card-list">
      <view class="card-item" @click="toDetail(item)" v-for="(item ,index) in cardList" :key="index">
        <view class="img-box">
          <image class="card-img" mode="widthFix" v-if="item.physical_img" :src="item.physical_img"></image>
          <image v-else class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>

          <view class="card-no col-fff">{{item.card_id}}</view>
<!--          <text class="card-status">正常</text>-->
        </view>
        <view class="card-info fxBox2">
          <view class="info-l">
<!--            <view>-->
<!--              5周年庆储值卡-->
<!--            </view>-->
<!--            <view class="text-sm col-999 mt-md">-->
<!--              有效期：{{item.validity_date}}-->
<!--            </view>-->
            <view class="text-12 col-999">
              有效期：{{item.validity_date}}
            </view>
          </view>
          <view class="info-r col-000 text-30">
            可用余额：{{item.valid_balance}}
          </view>
        </view>
      </view>
<!--      <view class="card-item">-->
<!--        <view class="img-box">-->
<!--          <image class="card-img" mode="widthFix" src="../../static/images/card-demo.png"></image>-->
<!--          <view class="card-no col-fff">8234234234234</view>-->
<!--          <text class="card-status abnormal">冻结</text>-->
<!--        </view>-->
<!--        <view class="card-info fxBox2">-->
<!--          <view class="info-l">-->
<!--            <view class="col-000">-->
<!--              5周年庆储值卡-->
<!--            </view>-->
<!--            <view class="text-12 col-999 mt-md">-->
<!--              有效期：2022.11.11-->
<!--            </view>-->
<!--          </view>-->
<!--          <view class="info-r">-->
<!--            可用余额：¥10-->
<!--          </view>-->
<!--        </view>-->
<!--      </view>-->
      <uni-load-more status="noMore" :contentText="loadText"></uni-load-more>
    </view>

  </view>
</template>

<script>
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      uniLoadMore
    },
    data() {
      return {
        loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
        loadStatus: 'loading',
        loadMore: {
          current: 1,
          last: 1,
          flat: false
        },
        cardList: []
      };
    },
    onLoad:function(options){
    },
    onShow:function() {
      this.getList()
    },
    methods: {
      getList(){
        this.$http({
          aurl: 'physicalCardList',
          success: res => {
            if(res.data.code === 0){
              this.cardList = res.data.result
              wx.setNavigationBarTitle({
                title: '我的实体卡 ' + this.cardList.length +'/10'
              })
            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },
      toDetail(item){
        this.toQueryLink(
          '/pagesA/user/wallet/physicalCardDetail', item
        )
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .physical-card-list
    padding 30rpx 20rpx
    .card-item
      border-radius 16rpx
      margin-bottom 30rpx
      background #fff
      box-shadow 0 0 20rpx 0 rgba(0,0,0,.2)
      .img-box
        position relative
        border-radius 16rpx 16rpx 0 0
        .card-img
          width 100%
          border-radius 16rpx 16rpx 0 0
          vertical-align top
        .card-no
          position absolute
          left 0
          top 24rpx
          width 85%
          overflow hidden
          white-space nowrap
          text-overflow ellipsis
          padding-left 34rpx
          font-size 26rpx
        .card-status
          position absolute
          right 0
          top 34rpx
          height 35rpx
          padding 5rpx 22rpx
          border-radius 18rpx 0 0 18rpx
          background #09BB07
          color #ffffff
          font-size 24rpx
          &.abnormal
            background #F03D34
      .card-info
        padding 24rpx 34rpx

</style>

