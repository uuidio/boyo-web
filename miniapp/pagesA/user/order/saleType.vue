<template>
  <view class="m-md">
    <view class="order-info">
      <view class="order-goods bc-fff">
        <view class="imgBox">
          <image mode="widthFix" :src="detail.goods_image"></image>
        </view>
        <view class="fx1 order-goods-text">
          <view class="order-goods-tit">
            <view data-line="1" class="line2-p text-md" style="width:70%">
              {{detail.goods_name}}
            </view>
            <view>￥{{detail.amount}}</view>
          </view>
          <view class="col-666 fxBox2 mt-xs text-sm">
            <view class="fx1">
              <view v-if="detail.sku_info">{{detail.sku_info}}</view>
            </view>
            <view class="text-md text-r col-666">
              x{{detail.quantity}}
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="fxBox2 p-md mt-md bc-fff border-radius5px" @tap="toQueryLink('/pagesA/user/order/saleDetail',{
      oid:detail.oid,
      tid:detail.tid,
      type:'ONLY_REFUND'
    })">
      <view>
        <view class="mb-sm text-md fw700">我要退款 （无需退货）</view>
        <view class="col-666 text-sm">没收到货，或与商家协商后只退款不退货</view>
      </view>
      <view class="emfont icon-right"></view>
    </view>
    <view class="fxBox2 p-md mt-md bc-fff border-radius5px"@tap="toQueryLink('/pagesA/user/order/saleDetail',{
      oid:detail.oid,
      tid:detail.tid,
      type:'REFUND_GOODS'
    })">
      <view>
        <view class="mb-sm text-md fw700">我要退货退款</view>
        <view class="col-666 text-sm">已收到货，需要退还收到的货物</view>
      </view>
      <view class="emfont icon-right"></view>
    </view>
    <view class="fxBox2 p-md mt-md bc-fff border-radius5px"@tap="toExchanging">
      <view>
        <view class="mb-sm text-md fw700">我要换货</view>
        <view class="col-666 text-sm">已收到货，需要退还收到的货物</view>
      </view>
      <view class="emfont icon-right"></view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        oid:'',
        detail:'',
        tid:'',
        aftersales_type: '',
      };
    },
    onLoad:function(options){
      console.log(options,8989)
      if(options.oid){
        this.oid = options.oid
      }
      if(options.tid){
        this.tid = options.tid
      }
      if(options.aftersales_type) {
        this.aftersales_type = options.aftersales_type
      }
      this.getDetail()
    },
    computed:{
      // 已换货商品不能在换货
      isExchangingGoods() {
        //已完成的订单且换货，且不能是商家驳回状态
        return this.detail.status === "TRADE_FINISHED" && this.aftersales_type === "EXCHANGING_GOODS" && this.detail.aftersales_progress_text !== '商家已驳回' && this.detail.apply_again_status != 1
      }
    },
    methods: {
      toExchanging() {
        if(this.isExchangingGoods) {
          this.showAlert('已换货商品不支持在次申请换货');
          return ;
        }
        this.toQueryLink('/pagesA/user/order/saleDetail',{
          oid:this.detail.oid,
          tid:this.detail.tid,
          type:'EXCHANGING_GOODS'
        })
      },
      getDetail(){
          this.$http({
            aurl:'orderSonDetail',
            params:{
              oid:this.oid
            },
            success:res => {
              console.log(res)
              if(res.data.code===0){
                this.detail = res.data.result
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
  .order-info
    background #fff
    border-radius 10rpx
    overflow hidden
    .order-goods
      padding 20rpx
      display flex
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
</style>
