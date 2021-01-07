
<template>
 <view class="refundDetail">
   <view class="detail-header">
     <view class="detail-status">
       <view class="text-18">{{detail.progress_text}}</view>
       <view class="closeTime" v-if="detail.send_timeout">
         剩
         <uni-countdown @timeup="getDetail" color="#fff" borderColor="transparent" backgroundColor="none" splitorColor="#FFFFFF" :second="getCode(detail.send_timeout)"></uni-countdown>
         自动取消售后
       </view>
       <view class="mt-md text-12" v-if="detail.progress_text === '商家已驳回'">驳回原因：{{detail.shop_explanation || '商家未填写驳回原因'}}</view>
     </view>
     <view class="mt-l">
       <text class="iconfont icon-pay detail-icon"></text>
     </view>
   </view>
   <view>
     <image class="detail-bg" src="../../../static/images/banyuan.png" ></image>
   </view>
   <view  class="detail-add mb-md" v-if="detail.progress =='0'">
     <view class="p-md bc-fff border-radius5px">
       <view class="mb-md">
         <view class="text-16 col-000 fw700">
           您已经成功发起售后申请，请耐心等待商家处理
         </view>
         <view class="col-666 text-sm mt-md">
           商家同意申请，请寄回商品并填写回寄信息 商家同意后，请按照给出的退货地址退货，并请记录退货的运单号
         </view>
       </view>
       <view class="fxBox2">
         <view class="text-sm col-red">商家同意后，可在此页面填写寄出快递信息</view>
         <!--<view class="btn-666">修改申请</view>-->
       </view>
     </view>
   </view>
   <view  class="detail-add mb-md" v-if="detail.progress =='1'">
     <view class="p-md bc-fff border-radius5px">
       <view class="mb-md">
         <view class="text-16 col-000 fw700">
           您已经成功发起售后申请，请耐心等待商家处理
         </view>
         <view class="col-666 text-sm  mt-md">
           如果商家拒绝，您可以修改申请后再次发起，商家会重新处理 商家同意后，请按照给出的退货地址退货，并请记录退货的运单号
         </view>
       </view>
       <view class="fxBox2">
         <view class="text-sm col-red">商家同意后，可在此页面填写寄出快递信息</view>
         <view @tap="toQueryLink('/pagesA/user/order/waybill',{
           id:detail.aftersales_bn,
           type:detail.aftersales_type
         })" class="btn-666" style="border-color:red;color:red">填写运单号</view>
       </view>
     </view>
   </view>
   <view class="p-md bc-fff border-radius5px m-md" v-if="detail.progress=='1'">
     <view v-if="addrsDetail.length">
       <view class="text-16 col-000 fw700 fxBox2">
         <text>退货地址信息</text>
         <view @tap="copeCode" class="btn-666 copyBtn text-md">复制信息</view>
       </view>
       <view class="mt-md">
         商家收货地址：{{addrsDetail[0].address || ''}}
       </view>
       <view class="mt-md">
         商家收货手机：{{addrsDetail[0].tel || ''}}
       </view>
       <view class="mt-md">
         商家收货人姓名：{{addrsDetail[0].name || ''}}
       </view>
     </view>
     <view v-else>商家未设置回寄地址，请联系商家索要回寄地址</view>
   </view>
   <view class="border-radius5px p-md bc-fff m-md">
     <view class="order-info">
       <view class="order-goods bc-fff">
         <view class="imgBox">
           <image mode="widthFix" :src="goods.goods_image"></image>
         </view>
         <view class="fx1 order-goods-text">
           <view class="order-goods-tit">
             <view data-line="1" class="line2-p text-md fw700" style="width:70%">
               {{goods.goods_name}}
             </view>
             <view>￥{{goods.amount}}</view>
           </view>
           <view class="col-666 fxBox2 mt-xs text-sm">
             <view class="fx1">
               <text v-if="item.sku_info">{{item.sku_info}}</text>
             </view>
             <view class="text-md text-r col-666">
              x{{goods.quantity}}
             </view>
           </view>

         </view>
       </view>
     </view>
     <view>
       <view class="mt-md">
         退款原因：{{detail.reason}}
       </view>
       <view class="mt-md">
         退款类型：{{detail.aftersales_type_text}}
       </view>
       <view class="mt-md">
         应退款金额：{{goods.amount}}
       </view>
       <view class="mt-md" v-if="detail.trade.after_sales_status === 'SUCCESS'">
         实退款金额：{{goods.refund_fee}}
       </view>
       <view class="mt-md" v-if="detail.consume_point_fee > 0">
         应退积分：{{ detail.consume_point_fee }}
       </view>
       <view class="mt-md" v-if="detail.trade.refund_info.refund_point != '--'">
         实退积分：{{ detail.trade.refund_info.refund_point }}
       </view>
       <view class="mt-md">
         申请时间：{{detail.created_at}}
       </view>
       <view class="mt-md">
         退款单号：{{detail.aftersales_bn}}
       </view>
       <view class="mt-md">
         订单号：{{detail.trade.tid}}
       </view>

     </view>
   </view>
   <view class="p-md bc-fff border-radius5px m-md" v-if="detail.progress==2 || (detail.aftersales_type == 'EXCHANGING_GOODS'&&detail.progress==4)">
     <view>
       <view class="text-16 col-000 fw700">
         客户回寄信息:
       </view>
       <view class="mt-md">
         快递公司：{{detail.sendback_data.logi_name}}
       </view>
       <view class="mt-md">
         快递单号：{{detail.sendback_data.logi_no}}
       </view>
     </view>
   </view>
   <view class="p-md bc-fff border-radius5px m-md" v-if="detail.aftersales_type == 'EXCHANGING_GOODS'&&detail.progress==4">
     <view>
       <view class="text-16 col-000 fw700">
         商家售后发货信息:
       </view>
       <view class="mt-md">
         快递公司：{{detail.sendconfirm_data.logi_name || ''}}
       </view>
       <view class="mt-md">
         快递单号：{{detail.sendconfirm_data.logi_no || ''}}
       </view>
     </view>
   </view>
   <view class="footer-btns fxBox2">
     <view class="btn-666"  @tap="callUp">联系客服</view>
     <view
       v-if="detail.after_state === 2 || detail.progress == 3"
       @tap="toQueryLink('/pagesA/user/order/saleType', { oid: detail.trade.oid, tid: detail.trade.tid, aftersales_type:detail.aftersales_type})"
       class="btn-666"
     >
       再次申请售后
     </view>
     <view class="btn-666" style="border-color:red;color:red" @tap="receiptOrder(detail.aftersales_bn)" v-if="detail.after_state === 1">确认收货</view>
     <!--<view class="fxBox">-->
       <!--<view class="btn-666">撤销申请</view>-->
     <!--</view>-->
   </view>
 </view>
</template>

<script>
  import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';

  export default {
    components: {
      uniCountdown,
    },
    data() {
        return {
          aftersales_bn:'',
          detail:{},
          goods:{},
          addrsDetail: [],
          refunds:{},
        };
    },
    onLoad:function(options){
      this.aftersales_bn = options.aftersales_bn
    },
    onShow(){
      this.getDetail()
    },
    methods: {
      receiptOrder(id) { // 确认收货
        this.$http({
          aurl: 'confirmTradeAfterSales',
          data: {
            aftersales_bn: this.aftersales_bn
          },
          success: res => {
            if (res.data.code === 0) {
              this.showAlert(res.data.message);
              this.getDetail();
            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },

      getCode(time){
        if(!time){
          return 0
        }
        let timeCode =  this.toTimeStamp(time) - this.toTimeStamp(this.toFullTime())
        return this.toTime(timeCode)
      },
      toTime(ms) {
        let s = Math.floor(ms / 1000);
        return s;
      },
      toFullTime() {
        let [year, month, day, h, m, s, time] = [0, 0, 0, 0, 0];
        let data = new Date();
        year = data.getFullYear();
        month = data.getMonth() + 1;
        day = data
          .getDate()
          .toString()
          .padStart(2, '0');
        h = data
          .getHours()
          .toString()
          .padStart(2, '0');
        m = data
          .getMinutes()
          .toString()
          .padStart(2, '0');
        s = data
          .getSeconds()
          .toString()
          .padStart(2, '0');
        time = `${year}-${month}-${day} ${h}:${m}:${s}`;
        return time;
      },

      toTimeStamp(t) {
        t = t.replace(/-/g, '/');
        let date = new Date(t);
        return date.getTime();
      },
      getSendBackAddr(shopId) {
        this.$http({
          aurl:'sendBackAddr',
          aPath: [shopId],
          success:res => {
            console.log(res);
            if(res.data.code===0){
              this.addrsDetail = res.data.result
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      copeCode(){
        const addrInfo = `收货地址：${this.addrsDetail[0].address || ''} 收货手机：${this.addrsDetail[0].tel || ''} 收货人：${this.addrsDetail[0].name || ''}`
        uni.setClipboardData({
          data: String(addrInfo),
          success: function(res) {
            uni.getClipboardData({
              success: function(res) {
                uni.showToast({
                  title: '已复制到剪贴板'
                });
              }
            });
          }
        })
      },
      callUp() {
        if(!this.detail.shop_phone){
          this.showAlert('该店铺暂未设置客服电话，请到我的-联系客服')
          return
        }
        uni.makePhoneCall({
          phoneNumber:this.detail.shop_phone
        });
      },
      getDetail(){
        this.$http({
          aurl:'aftersalesDetail',
          params:{
            aftersales_bn:this.aftersales_bn
          },
          success:res => {
            if(res.data.code===0){
              console.log(res)
              this.detail = res.data.result.info.info
              this.goods = this.detail.trade
              if(res.data.result.info.refunds){
                this.refunds =res.data.result.info.refunds
              }
              if(this.detail.progress == '1') {
                this.getSendBackAddr(this.detail.shop_id)
              }
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .closeTime
    >>>.uni-countdown
      padding 0 !important
      // font-size 32rpx !important
      .uni-countdown__splitor
        padding 0 !important
        margin 0 !important
        // font-size 32rpx !important
      .uni-countdown__number
        border none !important
        padding 0 !important
        margin 0 !important
        // font-size 32rpx !important
  .detail-header
    height 300rpx
    background #eb3c3c
    padding 30rpx 135rpx 0 46rpx
    color #fff
    display flex
    justify-content space-between
    .detail-icon
      font-size 160rpx
    .detail-status
      margin-top 100rpx
      line-height 40rpx
  .detail-bg
    width:100%;
    height:36rpx;
    background block
    margin-top -1px
  .detail-add
    margin -100rpx 20rpx 0
    position relative
    z-index 1
  .order-info
    margin 0 25rpx
    background #fff
    border-radius 10rpx
    overflow hidden
    .order-goods
      padding 20rpx 0rpx
      display flex
      border-bottom 1px solid #e7e7e7
      .imgBox
        width 160rpx
        margin-right 20rpx
        image
          border-radius 10rpx
          width 100%
      .order-goods-text
        padding 10rpx 0
        box-sizing border-box
        .order-goods-tit
          display flex
          justify-content space-between
  .footer-btns
    position fixed
    height 100rpx
    width 100%
    background #ffffff
    bottom 0
    left 0
    box-sizing border-box
    padding 0 20rpx
  .refundDetail
    padding-bottom 120rpx
</style>
