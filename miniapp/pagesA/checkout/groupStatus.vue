<template>
  <view class="m-md p-md bc-fff border-radius5px" v-if="show">
    <view class="mb-md group-item pb-md fxBox">
      <view class="group-img mr-md">
        <image :src="detail.Group.goods_image"></image>
      </view>
      <view class="fx1 group-text">
        <view>
          <view class="line2-p text-16" data-line="1">{{ detail.Group.goods_name }}</view>
          <view class="col-666 text-sm" v-if="detail.Group.spec_sign">规格：{{ detail.Group.spec_sign }}</view>
          <view class="count text-sm">
            <text class="emfont icon-hotfill mr-xs"></text>
            <text>{{ detail.Group.count_group }}已拼团</text>
          </view>
        </view>
        <view>
          <view>
            <text>拼团价：</text>
            <text class="col-red">
              ￥
              <text class="text-18">{{ detail.Group.group_price }}</text>
            </text>
          </view>
          <view class="col-666 text-sm">
            市场价：
            <text class="del-text">￥{{ detail.Group.price }}</text>
          </view>
        </view>
      </view>
    </view>
    <view class="group-time">
      <view v-if="detail.GroupOrder.status === 1">
        <view class="text-center mb-md">
          还剩：
          <uni-countdown :second="getTime(detail.GroupOrder.end_time)" @timeup="timeUp"></uni-countdown>
        </view>
        <view class="text-center mb-md">
          还差
          <text class="col-red">{{ detail.GroupOrder.group_number - detail.GroupOrder.group_count }}人</text>
          拼团成功
        </view>
      </view>
      <view class="text-center mb-md group-tip" v-else-if="detail.GroupOrder.status === 2">
        <icon type="success" size="42"/>
        <view class="col-666">恭喜！拼团成功</view>
      </view>
      <view class="text-center mb-md group-tip" v-else>
        <icon type="warn" size="42"/>
        <view class="col-666">拼团失败，该团已失效</view>
      </view>
      <view class="userImgBox">
        <view class="userImg" v-for="(imgItem, index) in detail.GroupOrder.group_users">
          <image :src="imgItem.wechat_head_img"></image>
        </view>
        <view class="group-icon" v-if="detail.GroupOrder.status === 1">
          <image src="../../static/images/adduser.png"></image>
        </view>
        <view class="group-icon"
              v-if="detail.GroupOrder.status === 1 && detail.GroupOrder.group_number - detail.GroupOrder.group_count > 1">
          <image src="../../static/images/adduser.png"></image>
        </view>
      </view>
      <view v-if="isHead">
        <button @tap="share" open-type="share" :disabled="!btnClick" class="submitBtn text-md">邀请好友参团</button>
        <button @tap="seeorder" class="submitBtn seeOrder text-md mt-md">查看订单</button>
      </view>
      <view v-else>
        <button @tap="seeorder" class="submitBtn text-md mt-md">查看订单</button>
        <button @tap="toNav('/pages/index/indexCustomer')" class="submitBtn seeOrder text-md mt-md">去逛逛</button>
      </view>
    </view>
  </view>
</template>

<script>
import tool from '../../static/base/toolFun.js';
import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';

export default {
  onShareAppMessage: function(res) {
    const _this = this;
    if (res.from === 'button') {
      console.log('来自页面内转发按钮');
      console.log(_this.groups_bn);
    } else {
      console.log('来自右上角转发菜单');
    }
    return {
      title: '邀你来拼团',
      path: '/pagesB/activity/groupDetail?groups_bn=' + _this.groups_bn,
      imageUrl: '',
      success: res => {
        console.log('转发成功', res);
      },
      fail: res => {
        console.log('转发失败', res);
      },
    };
  },
  components: {
    uniCountdown,
  },
  data() {
    return {
      downSecond: 0,
      btnClick: false,
      detail: {},
      show: false,
      payment_id: '',
      groups_bn: '',
      isHead: false,
    };
  },
  onLoad: function(options) {
    this.payment_id = options.payment_id;
    this.getGroupDetail(this.payment_id);
  },
  methods: {
    share() {
    },
    seeorder() {
      this.needTokenQueryLink('/pagesA/user/order/detail', {tid: this.detail.tid});
    },
    timeUp() {
      uni.showToast({
        title: '活动结束,拼团失败',
        icon: 'none',
      });
      this.btnClick = false;
    },
    getTime(time) {
      let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
      let end_time = tool.toTimeStamp(time) / 1000;
      return end_time - now_time;
    },
    getGroupDetail(id) {
      this.$http({
        aurl: 'goodsGroupOrderInfo',
        params: {
          payment_id: id,
        },
        success: res => {
          this.detail = res.data.result;
          this.groups_bn = this.detail.GroupOrder.groups_bn;
          this.isHead = this.detail.GroupOrder.group_users[this.detail.GroupOrder.group_users.length - 1].is_header ===
          1 ? true : false;
          this.btnClick = true;
          this.show = true;
        },
        fail: error => {
          console.log(error);
        },
      });
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
  .group-item
    border-bottom 1px solid #e7e7e7

    .group-img
      width 210rpx
      line-height 210rpx

      image
        width 100%
        height 100%
        border-radius 10rpx

    .group-text
      display flex
      flex-direction column
      justify-content space-between
      padding 10rpx 0

      .count
        background #fff0f0
        color #E64340
        border-radius 4rpx
        display inline-block
        margin-top 10rpx
        padding 0 10rpx

  .group-time
    padding 70rpx 90rpx 40rpx
    >>> .uni-countdown
      justify-content center
    >>> .uni-countdown__number
      background #e64340 !important
      color #fff !important
      border none !important

  .submitBtn
    width 100%
    height 80rpx
    line-height 80rpx
    background #e64340
    color #ffffff
    border-radius 10rpx

  .seeOrder
    background transparent
    border 1px solid #e64340
    box-sizing border-box
    color #e64340

  .userImgBox
    display flex
    justify-content center
    width 335rpx
    margin 70rpx auto
    flex-wrap wrap

    image
      margin-top 25rpx

    .userImg
      margin-right 20rpx

      image
        display block
        height 90rpx
        width 90rpx
        border-radius 50%
        border 2px solid #e64340
        box-sizing border-box

    .group-icon
      image
        height 90rpx
        width 90rpx
        border-radius 50%
        margin-right 20rpx

  .group-tip
    padding-right 25rpx

    .col-666
      margin-top 10rpx
      font-size 28rpx
</style>
