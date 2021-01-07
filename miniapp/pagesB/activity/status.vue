<template>
 <view>
   <view class="status-type1" v-if="type===1">
     <view class="status-icon">
       <text class="emfont icon-roundcheckfill status-succ" v-if="status==='succ'"></text>
       <text class="emfont icon-round_close_fill_light status-fail" v-else></text>
     </view>
     <view class="text-center">
       <view class="text-18 col-000 mb-md mt-md">报名<text v-if="status==='succ'">成功</text><text v-else>失败</text></view>
       <!--<view class="text-18 col-666 mb-sm"><text class="text-xs">￥</text>1150.00</view>-->
       <view>
         <!--<view class="text-md col-666">本次订单获得 <text class="col-red">305</text> 积分</view>-->
         <view class="btnLists">
           <view @tap="toHome">
             返回首页
           </view>
           <view  class="see-order"  @click="redirectToLink('/pagesA/user/order/lists')">
             查看详情
           </view>
         </view>
       </view>
     </view>
   </view>
   <view class="status-type2" v-if="type===2">
     <view class="status-icon">
       <text class="emfont icon-roundcheckfill status-succ" v-if="status==='succ'"></text>
       <text class="emfont icon-roundcheckfill status-fail" v-else></text>
     </view>
     <view class="text-center mb-md">
       <view class="text-18 col-000 mb-md mt-md">支付成功</view>
       <view class="text-18 col-666 mb-sm"><text class="text-xs">￥</text>1150.00</view>
       <view class="text-md col-666">本次订单获得 <text class="col-red">305</text> 积分</view>
     </view>
     <view class="code-box">
       <view class="code-head fxBox2 pb-md">
         <view>
           <text class="emfont icon-qrcode text-md mr-xs"></text>
           <text class="text-md">自提订单提货码凭证</text>
         </view>
         <view class="col-red text-md">保存到相册</view>
       </view>
       <view class="code-content">
         <view class="text-center mb-xs mt-xs text-md">提货码：15214214141</view>
         <view class="code-img">
           <image mode="widthFix" src="http://img.hyplmm.com/images/default/201909/04/JQPg1WlDfDZzZNsLwVUk1eH808Hh4KoUpo5c1XY1.jpeg"></image>
         </view>
         <view class="pb-sm text-md">
           提货人：唐先生
         </view>
         <view class="pb-sm text-md">
           提货方式：15999999999
         </view>
         <view class="pb-md text-md">
           提货地址：2F 中区优衣库自提
         </view>
       </view>
       <view class="code-goods">
         <view class="text-md mt-sm">
           商品名称：女装 宽腿廓形牛仔裤（水洗餐品）
         </view>
         <view class="text-md mt-sm">
           实付金额：￥305.00
         </view>
       </view>
     </view>
   </view>
 </view>
</template>

<script>
  import redirect from '../../mixins/redirect.js';
    export default {
      mixins: [redirect],
        data() {
            return {
                 type:1,
                 status:'succ',
                 payment_id:'',
            };
        },
        onLoad:function(option){
          this.payment_id = option.payment_id
          this.status = option.status
        },
        methods: {},
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
.status-icon
  text-align center
  .status-succ
    font-size 150rpx
    color #52c41a
  .status-fail
    font-size 150rpx
    color #fc4d52
.status-type1
  padding-top 180rpx
  .btnLists
    display flex
    margin 60rpx 30rpx 0
    >view
      flex 1
      height 88rpx
      line-height 88rpx
      background #ffffff
      border 1px solid #e7e7e7
      font-size 28rpx
      text-align center
      border-radius 4px
    .see-order
      margin-left 20rpx
.status-type2
  margin-top 40rpx
  .code-box
    margin 0 24rpx 24rpx
    padding 20rpx
    background #ffffff
    border-radius 4px
    .code-head
      border-bottom 1px solid #D7D7D7
    .code-content
      border-bottom 1px solid #D7D7D7
      .code-img
        width 320rpx
        margin 0 auto 36rpx
        image
          width 100%
</style>
