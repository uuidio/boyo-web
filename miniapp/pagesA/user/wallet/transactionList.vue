<template>
  <view class="detail-wrap">
    <view class="nav-tabs">
      <view class="nav-item" :class="{active: currentNav === 0}" @click="changeNav(0)">
        <text>消费明细</text>
      </view>
      <view class="nav-item" :class="{active: currentNav === 1}" @click="showTips">
        <text>充值明细</text>
      </view>
    </view>

    <view class="wrap-main">
      <view class="wrap-content" v-if="detailedList.length > 0">
        <!--消费明细-->
        <view class="detailed-list" v-if="currentNav === 0">
          <view class="detailed-item" v-for="(item, index) in detailedList" :key="index" @click="toDetail(item)">
            <view class="item-l">
              <view class="item-name">{{item.trade_type_text}}</view>
<!--              <view class="item-date">线上商城消费</view>-->
              <view class="item-date">{{item.trade_time}}</view>
            </view>
            <view class="item-r">
              <view class="point-num">
<!--                {{item.behavior_type == 'obtain' ? '+' : '-'}}{{item.point}}积分-->
                {{item.amount}}
              </view>
<!--              <navigator :url="'/pagesA/user/pointDetail?itemId=' + item.id" hover-class="none" class="col-999 text-s mt-6">查看详情</navigator>-->
            </view>
          </view>
        </view>
        <!--充值明细-->
        <view class="detailed-list" v-else>
          <view class="detailed-item" v-for="(item, index) in detailedList" :key="index" @click="toDetail">
            <view class="item-l">
              <view class="item-name">
                中秋佳节电子礼品卡</view>
              <view class="item-date">2020-7-22</view>
            </view>
            <view class="item-r">
              <view class="point-num">
                <!--                {{item.behavior_type == 'obtain' ? '+' : '-'}}{{item.point}}积分-->
                +100.00
              </view>
              <!--              <navigator :url="'/pagesA/user/pointDetail?itemId=' + item.id" hover-class="none" class="col-999 text-s mt-6">查看详情</navigator>-->
            </view>
          </view>
        </view>
      </view>
      <uni-load-more v-if="currentNav === 0" :status="loadStatus" :contentText="loadText"></uni-load-more>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components: {
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
        currentNav: 0,
        detailedList: [],
      };
    },

    onLoad: function(o) {
      if(o.nav == 1){
        this.currentNav = 1
      }
      this.getWalletHistory()
    },
    onShow() {},
    onReachBottom() {
      if (this.loadMore.flat) return;
      this.loadStatus = 'loading';
      setTimeout(() => {
        if (this.detailedList.length !== 0) {
          this.loadMore.current++;
        }
        this.getWalletHistory()
      }, 500);
    },
    methods: {
      showTips(){
        this.showAlert('即将上线，敬请期待')
      },
      toDetail(item){
        item.nav = this.currentNav
        this.toQueryLink('/pagesA/user/wallet/transactionDetail',{options: JSON.stringify(item)})
      },
      changeNav(val){
        this.currentNav = val
      },
      getWalletHistory(){ // 交易记录
        this.$http({
          aurl: 'walletHistory',
          data: {
            page: this.loadMore.current
          },
          success: res => {
            if (res.data.code === 0) {
              let data = res.data.result;
              console.log(data.data, 333)
              if (data.data && data.data.length > 0) {
                this.loadMore.last = data.last_page;
                data.data.map(item => {
                  this.detailedList.push(item);
                });
              }
              if (this.loadMore.current === this.loadMore.last) {
                this.loadMore.flat = true;
                this.loadStatus = 'noMore';
              } else {
                this.loadStatus = 'more';
                this.loadMore.flat = false;
              }
            }
          },
          fail: error => {
            console.log(error);
          },
          complete: () => {

          }
        });

      },
    }
  };
</script>

<style scoped lang="stylus">
  .detail-wrap
    padding-top 89rpx
    /*&:before*/
    /*  content ''*/
    /*  width 100%*/
    /*  height 1rpx*/
    /*  background #D7D7D7*/
    /*  position fixed*/
    /*  top 0*/
    /*  left 0*/
    .nav-tabs
      height 89rpx
      line-height 88rpx
      display flex
      /*border-bottom 1rpx solid #D7D7D7*/
      position fixed
      top 0rpx
      width 100%
      background #fff
      .nav-item
        text-align center
        width 50%
        color #999
        font-size 26rpx
        &.active
          color #FF173E
          font-weight bold
    .wrap-main
      padding 24rpx 20rpx 0
      .wrap-content
        background #fff
        border-radius 16rpx
        padding 0 24rpx
        .detailed-list
          padding 12rpx 0
          .detailed-item
            display flex
            align-items center
            justify-content space-between
            padding 30rpx 0
            &+.detailed-item
              border-top 1px solid #ddd
            .item-l
              .item-name
                font-size 26rpx
                color #333
                font-weight 500
                line-height 36rpx
                word-break break-all
              .item-date
                font-size 22rpx
                color #999
                margin-top 12rpx
            .item-r
              margin-left 20rpx
              flex-shrink 0
              font-size 26rpx
              color #333
              align-self flex-start
</style>
