<template>
  <view class="page-wrap">
    <view class="wrap-main">
      <view class="wrap-content">
        <view class="ticket-record-list" v-if="list.length > 0">
          <view class="record-item" v-for="(item, index) in list" :key="index">
            <view class="record-date">{{item.created_at}}</view>
            <view class="fail-reasons" v-if="item.status == 2">积分失败原因：{{item.reject_reason}}</view>
            <view class="audit-info">
              <view class="audit-item">
                <view class="audit-status">等待审核</view>
                <view class="audit-date">{{item.created_at}}</view>
              </view>
              <view class="audit-item" :class="{'status-wait': item.status == 0,'status-fail': item.status === 2}">
                <view class="audit-status">{{item.status == 0 ? '积分成功' : item.status == 1 ? '积分成功' : '积分失败'}}</view>
                <view class="audit-date" v-if="item.status == 0">预计提交后72小时内</view>
                <view class="audit-date" v-else>{{item.updated_at}}</view>
              </view>
            </view>
            <view class="view-pic" @click="applyIntegralDetail(item.id)">
              <text class="view-label">查看小票照片</text>
              <text class="iconfont icon-right"></text>
            </view>
          </view>
<!--          <view class="record-item">-->
<!--            <view class="record-date">2020.03.14</view>-->
<!--            <view class="fail-reasons">积分失败原因：非本商场小票，无法补录积分，很抱歉，小票自消费日期起7天有效，</view>-->
<!--            <view class="audit-info">-->
<!--              <view class="audit-item">-->
<!--                <view class="audit-status">等待审核</view>-->
<!--                <view class="audit-date">2020.03.14 13:50</view>-->
<!--              </view>-->
<!--              <view class="audit-item">-->
<!--                <view class="audit-status">积分成功</view>-->
<!--                <view class="audit-date">2020.03.14 13:50</view>-->
<!--              </view>-->
<!--            </view>-->
<!--            <view class="view-pic">-->
<!--              <text class="view-label">查看小票照片</text>-->
<!--              <text class="iconfont icon-right"></text>-->
<!--            </view>-->
<!--          </view>-->
<!--          <view class="record-item">-->
<!--            <view class="record-date">2020.03.14</view>-->
<!--            <view class="fail-reasons">积分失败原因：非本商场小票，无法补录积分，很抱歉，小票自消费日期起7天有效，</view>-->
<!--            <view class="audit-info">-->
<!--              <view class="audit-item">-->
<!--                <view class="audit-status">等待审核</view>-->
<!--                <view class="audit-date">2020.03.14 13:50</view>-->
<!--              </view>-->
<!--              <view class="audit-item status-fail">-->
<!--                <view class="audit-status">积分成功</view>-->
<!--                <view class="audit-date">2020.03.14 13:50</view>-->
<!--              </view>-->
<!--            </view>-->
<!--            <view class="view-pic">-->
<!--              <text class="view-label">查看小票照片</text>-->
<!--              <text class="iconfont icon-right"></text>-->
<!--            </view>-->
<!--          </view>-->

        </view>
        <view v-else>
          <noData></noData>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
import meHeader from '../../components/header/header'
import mta from '../../mixins/mta';
import noData from '../../components/lists/nullData'

export default {
  mixins: [mta],
  components: {
    meHeader,
    uniLoadMore,
    noData
  },
  data() {
    return {
      gm_id: '',
      list: [],
      loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
      loadStatus: 'loading',
      loadMore: {
        current: 1,
        last: 1,
        flat: false
      },
    };
  },

  onLoad: function(options) {
    if(options.gm_id){
      this.gm_id = options.gm_id
    }
    this.applyIntegralList();
  },
  onShow() {},
  mounted() {},
  onReachBottom() {
    if (this.loadMore.flat) return;
    this.loadStatus = 'loading';
    setTimeout(() => {
      if (this.list.length !== 0) {
        this.loadMore.current++;
      }
      this.applyIntegralList()
    }, 500);
  },
  methods: {
    applyIntegralDetail(id){
      uni.showLoading({
        title: '图片加载中...',
      })
      this.$http({
        aurl: 'applyIntegralDetail',
        aPath: [id],
        success: res => {
          if (res.data.code === 0) {
            console.log(res);
            uni.previewImage({
              urls: [res.data.result.uploaded_data],
              current: res.data.result.uploaded_data
            });
          }
        },
        fail: error => {
          console.log(error);
        },
        complete: () => {
          uni.hideLoading()
        }
      });
    },
    applyIntegralList(){
      this.$http({
        aurl: 'applyIntegralList',
        data: {
          gm_id: this.gm_id
        },
        success: res => {
          if (res.data.code === 0) {
            let data = res.data.result.lists;
            if (data.data && data.data.length > 0) {
              this.loadMore.last = data.last_page;
              data.data.map(item => {
                this.list.push(item);
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
    }
  }
};
</script>

<style scoped lang="stylus">
  .page-wrap
    /*&:before*/
    /*  content ''*/
    /*  width 100%*/
    /*  height 1rpx*/
    /*  background #D7D7D7*/
    /*  position fixed*/
    /*  top 0*/
    /*  left 0*/
    .wrap-main
      .wrap-content
        .ticket-record-list
          padding 30rpx 20rpx
          .record-item
            background #fff
            border-radius 16rpx
            margin-bottom 30rpx
            .record-date
              font-size 24rpx
              color #999
              padding 20rpx 30rpx 0
            .fail-reasons
              font-size 26rpx
              color #333
              line-height 36rpx
              margin-top 30rpx
              padding 0 30rpx
            .audit-info
              display flex
              align-items center
              justify-content space-between
              padding 0 30rpx
              margin-top 30rpx
              .audit-item
                padding-left 20rpx
                position relative
                &:first-of-type
                  &:after
                    content ''
                    position absolute
                    top 19rpx
                    left 65%
                    width 80%
                    height 1rpx
                    background #000
                &:last-of-type
                  width 37%
                &.status-wait
                  .audit-status
                    color #999
                    font-weight bold
                  .audit-date
                    font-weight bold
                  &:before
                    color #999
                &.status-fail
                  &:before
                    color #999
                &:before
                  content ''
                  position absolute
                  top 15rpx
                  left 0
                  width 10rpx
                  height 10rpx
                  border-radius 50%
                  background #000
                .audit-status
                  font-size 26rpx
                  color #333
                .audit-date
                  font-size 24rpx
                  color #999
                  margin-top 10rpx
            .view-pic
              margin-top 30rpx
              height 80rpx
              border-top 1rpx solid #d7d7d7
              box-sizing border-box
              padding 0 30rpx
              display flex
              align-items center
              justify-content space-between
              .view-label
                font-size 26rpx
                color #999
              .icon-right
                font-size 30rpx
                color #333
</style>

