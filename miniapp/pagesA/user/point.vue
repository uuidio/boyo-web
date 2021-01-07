<template>
  <view class="point-wrap">
<!--    <meHeader  box-background="#E64340" title="我的积分"></meHeader>-->
<!--    <view class="numBox">-->
<!--      <view class="pointNum">-->
<!--        {{point}}-->
<!--      </view>-->
<!--      <view class="banyuan">-->
<!--        <image src="../../static/images/banyuan.png" ></image>-->
<!--      </view>-->
<!--    </view>-->
    <view class="wrap-top">
      <view class="slt-label">选择项目</view>
      <view class="project-slt-box" @click="openPopup">
        <text class="project-name">{{currentGroup}}</text>
        <text class="iconfont icon-right text-30 col-666"></text>
      </view>
      <view class="point-total">
        {{myPoint}}
      </view>
    </view>
    <van-popup
      custom-class="group-popup"
      :show="showPopup"
      close-icon-position="top-left"
      position="bottom"
      custom-style="height: 65%;border-radius:24px 24px 0 0;padding-top: 98rpx"
      @close="onClose"
    >
      <view class="popup-head">
        <text class="iconfont icon-close text-l col-999" @click="onClose"></text>
        <text class="popup-tit">选择项目</text>
        <text></text>
      </view>
      <view class="popup-content">
        <view class="group-list">
          <view class="list-item" v-for="(item, index) in groupItems" :key="index" @click="onSelect(item)">
            <text class="item-name">{{item.platform_name}}</text>
            <text class="iconfont icon-check text-lg col-999" v-if="item.gm_id === gm_id"></text>
          </view>
        </view>
      </view>
    </van-popup>
    <view class="wrap-main">
      <view class="wrap-content">
        <view class="nav-tabs">
          <view class="nav-item" :class="{active: currentNav === 0}" @click="changeNav(0)">
            <text>积分明细</text>
          </view>
          <view class="nav-item" :class="{active: currentNav === 1}" @click="changeNav(1)">
            <text>积分说明</text>
          </view>
        </view>
        <!--积分明细-->
        <view class="detailed-list" v-if="currentNav === 0">
          <view class="detailed-item" v-for="(item, index) in detailedList" :key="index">
            <view class="item-l">
              <view class="item-name">{{item.behavior}}</view>
              <view class="item-date">{{item.created_at}}</view>
            </view>
            <view class="item-r">
              <view class="point-num">{{item.behavior_type == 'obtain' ? '+' : '-'}}{{item.point}}积分</view>
              <navigator :url="'/pagesA/user/pointDetail?itemId=' + item.id" hover-class="none" class="col-999 text-s mt-6">查看详情</navigator>
            </view>
          </view>
        </view>
        <!--积分规则-->
        <view class="rule-list" v-else>
          <view class="rule-item">
            <view class="item-t">{{ruleInfo.title}}</view>
            <view class="item-b">{{ruleInfo.content}}</view>
          </view>
        </view>
      </view>
      <uni-load-more v-if="currentNav === 0" :status="loadStatus" :contentText="loadText"></uni-load-more>
    </view>

<!--    <view class="m-md border-radius5px p-md bc-fff">-->
<!--       <view class="text-center text-16 mb-lg">-->
<!--         积分说明-->
<!--       </view>-->
<!--      <view class="text-center mb-lg">-->
<!--        <view class="point-line text-md mb-md">-->
<!--          线上消费赠送积分-->
<!--        </view>-->
<!--        <view class="text-md col-666">-->
<!--          会员凡是在益田假日广场小程序商城消费，即赠送相应积分-->
<!--        </view>-->
<!--      </view>-->
<!--      <view class="text-center">-->
<!--        <view class="point-line text-md mb-md">-->
<!--          线下消费赠送积分-->
<!--        </view>-->
<!--        <view class="text-md col-666">-->
<!--          会员凡是在益田假日广场门店消费，即赠送相应积分-->
<!--          地址：深圳市南山区深南大道9028号深圳益田假日广场-->
<!--        </view>-->
<!--      </view>-->
<!--    </view>-->
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
      loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
      loadStatus: 'loading',
      loadMore: {
        current: 1,
        last: 1,
        flat: false
      },
      currentNav: 0,
      showPopup: false,
      point: 0,
      myPoint: 0,
      pointProportion: 0,
      gm_id: '',
      currentGroup:'',
      groupItems:[],
      detailedList: [],
      ruleInfo: {},
    };
  },

  onLoad: function(o) {
    if(o.nav == 1){
      this.currentNav = 1
    }
    if(o.gm_id){
      this.gm_id = o.gm_id
    }
    this.getGroupItem();
  },
  onShow() {},
  mounted() {},
  onReachBottom() {
    if (this.loadMore.flat) return;
    this.loadStatus = 'loading';
    setTimeout(() => {
      if (this.detailedList.length !== 0) {
        this.loadMore.current++;
      }
      this.handleGetPointLog()
    }, 500);
  },
  methods: {
    changeNav(val){
      this.currentNav = val
    },
    getPointRule(){
      this.$http({
        aurl: 'getRule',
        data: {
          gm_id: this.gm_id,
          type: 0,
        },
        success: res => {
          if (res.data.code === 0) {
            this.ruleInfo = res.data.result
          }
        },
        fail: error => {
          console.log(error);
        },
        complete: () => {

        }
      });

    },
    handleGetPointLog(){ // 获取积分明细
      this.$http({
        aurl: 'getPointLog',
        data: {
          gm_id: this.gm_id
        },
        success: res => {
          if (res.data.code === 0) {
            let data = res.data.result;
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
    onSelect(item) { // 选择项目
      if(item.id === this.gm_id){
        return false;
      }
      this.currentGroup = item.platform_name;
      this.gm_id = item.gm_id;
      this.loadStatus = 'loading';
      this.loadMore = {
        current: 1,
          last: 1,
          flat: false
      };
      this.detailedList = [];
      this.getRefreshPoint();
      this.getPointRule()
      this.handleGetPointLog();
      this.showPopup = false
    },
    openPopup(){
      this.showPopup = true
    },
    onClose(){
      this.showPopup = false
    },
    getGroupItem() { // 获取项目列表
      this.$http({
        aurl: 'getIndexItem1',
        success: res => {
          if (res.data.code === 0) {
            this.groupItems = res.data.result;
            if(this.groupItems.length>0){
              if (!this.currentGroup) {
                let gmToken = this.gm_id || uni.getStorageSync('gmToken');
                let bool = false
                if(gmToken){
                  for(let i = 0; i < this.groupItems.length; i++){
                    if(gmToken == this.groupItems[i].gm_id){
                      this.currentGroup = this.groupItems[i].platform_name;
                      this.gm_id = this.groupItems[i].gm_id;
                      bool = true
                    }
                  }
                }
                if(!gmToken || !bool){
                  this.currentGroup = this.groupItems[0].platform_name;
                  this.gm_id = this.groupItems[0].gm_id;
                }
                this.getRefreshPoint();
                this.handleGetPointLog();
                this.getPointRule();
              }
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
    getRefreshPoint(){ // 刷新积分
      this.$http({
        aurl: 'refreshPoint',
        data: {
          gm_id: this.gm_id,
        },
        success: res => {
          if (res.data.code === 0) {
            this.myPoint = res.data.result.point;
            // this.visable=true
          } else {
            this.myPoint = 0;
          }
        },
        fail: error => {
          console.log(error);
          // setTimeout(()=>{
          //   this.visable=true
          // },2000)
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
    .wrap-top
      margin 24rpx 20rpx 0
      background #fff
      border-radius 16rpx
      padding 20rpx 24rpx 0
      .slt-label
        font-size  26rpx
        color #999
      .project-slt-box
        display flex
        justify-content space-between
        align-items center
        padding 24rpx 0 16rpx
        border-bottom 1rpx solid #D7D7D7
        .project-name
          font-size 36rpx
          color #333
          font-weight bold
      .point-total
        font-size 64rpx
        font-weight bold
        color #333
        text-align center
        padding 56rpx 24rpx
    .group-popup
      .popup-head
        position absolute
        top 0
        let 0
        width 100%
        display flex
        align-items center
        justify-content space-between
        padding 0 20rpx
        height 98rpx
        border-bottom 1rpx solid #D7D7D7
        box-sizing border-box
        .popup-tit
          font-size 36rpx
          font-weight 500
          color #333
      .popup-content
        .group-list
          .list-item
            display flex
            align-items center
            justify-content space-between
            height 88rpx
            box-sizing border-box
            margin-left 20rpx
            padding-right 20rpx
            border-bottom 1rpx solid #D7D7D7
            .item-name
              font-size 26rpx
              color #333
            .icon-check
              color #FF173E
              font-weight bold

    .wrap-main
      padding 16rpx 20rpx 0
      .wrap-content
        background #fff
        border-radius 16rpx
        padding 0 24rpx 32rpx
        .nav-tabs
          height 89rpx
          line-height 88rpx
          display flex
          border-bottom 1rpx solid #D7D7D7
          border
          .nav-item
            text-align center
            width 50%
            color #999
            font-size 26rpx
            &.active
              color #FF173E
              font-weight bold
        .detailed-list
          .detailed-item
            display flex
            align-items center
            justify-content space-between
            margin-top 32rpx
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
        .rule-list
          .rule-item
            margin-top 32rpx
            .item-t
              color #333
              font-size 26rpx
              font-weight 500
            .item-b
              color #999
              font-size 22rpx
              font-weight 500
              margin-top 12rpx
  .pointNum
    height 150rpx
    line-height 150rpx
    text-align center
    color #ffffff
    font-size 80rpx
    background #E64340
  .point-line
    position: relative;
    display inline-block
    color #E64340
    padding 0 60rpx
    &::before,&::after
      content:''
      position absolute
      height 1rpx
      width 40rpx
      background #E64340
      top 50%
      transform translateY(-50%)
    &::before
      left 0
    &::after
      right 0
  .banyuan
    width 100%
    image
      width 100%
      height 32rpx
</style>
