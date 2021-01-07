<template>
  <view v-if="!orderLoading">
    <view class="order-lists ml-md mr-md" v-if="lists.length>0">
      <view class="order-item mt-md bc-fff border-radius5px" v-for="(item,index) in lists" :key="index">
        <view class="order-info">
          <view class="order-shop fxBox2">
            <view class="fxBox1">
              <text class="iconfont icon-shopfill text-l mr-xs col-red"></text>
              <text>{{item.shop_info.shop_name}}</text>
            </view>
          </view>
          <view class="order-goods bc-fff">
            <view class="imgBox">
              <image mode="widthFix" :src="item.goods_image"></image>
            </view>
            <view class="fx1 order-goods-text">
              <view class="order-goods-tit">
                <view data-line="1" class="line2-p text-md" style="width:70%">
                  {{item.title}}
                </view>
                <view>￥{{item.total_fee}}</view>
              </view>
              <view class="col-666 fxBox2 mt-xs text-sm">
                <view class="fx1"><text v-if="item.sku_info">{{item.sku_info}}</text></view>
                <view class="text-md text-r col-666">
                  x{{item.quantity}}
                </view>
              </view>
            </view>
          </view>
          <view class="text-r bc-fff pl-md pr-md detail-item">
            <view class="col-666">
              {{item.progress_text}}
            </view>
            <view @tap="toQueryLink('/pagesA/user/order/refundDetail',{
              aftersales_bn:item.aftersales_bn
            })"  class="detail-btn border-radius5px border-red col-red">查看详情</view>
          </view>
        </view>
      </view>
      <uni-load-more :status="loadStatus"></uni-load-more>
    </view>
    <view v-else>
      <noData></noData>
    </view>
  </view>
</template>

<script>
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import noData from '../../../components/lists/nullData'
  export default {
    components:{
      uniLoadMore,
      noData
    },
    data() {
      return {
        loadStatus: 'more',
        pullUpOn : true,
        loadding:false,
        orderLoading:true,
        currentPage:1,
        lists:[],
        lastPage:0,
      };
    },
    onLoad:function(){
      this.getSalesLists(true)
    },
    onReachBottom() {
      if (!this.pullUpOn) return;
      this.loadding = true;
      this.loadStatus = 'loading';
      if (this.lastPage === this.currentPage) {
        this.loadding = false;
        this.pullUpOn = false;
        this.loadStatus = 'noMore';
      } else {
        this.currentPage++;
        setTimeout(() => {
          this.getSalesLists();
          this.loadding = false;
          this.loadStatus = 'more';
        }, 500);
      }
    },
    methods: {
      getSalesLists(init){
        if(init){
          this.currentPage = 1
        }
        this.$http({
          aurl:'aftersalesLists',
          params:{
            page:this.currentPage
          },
          success:res => {
            if(init){
             this.lastPage = res.data.result.last_page
            }
            res.data.result.data.forEach((item) => {
              this.lists.push(item)
            })
            this.orderLoading = false
            if(res.data.result.last_page===1){
              this.loadding = false;
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
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
  .detail-item
    display flex
    justify-content space-between
    .detail-btn
      padding 0 20rpx
      height 60rpx
      line-height 60rpx
      margin-top -30rpx
  .order-item
    background #fff
    margin-bottom 20rpx
    padding-bottom 20rpx

    .order-footer
      background #ffffff
      text-align right
      padding 0 40rpx

    .order-tid
      height 80rpx
      padding 0 40rpx
      border-bottom 1px solid #f8f8f8
      box-sizing border-box

    .order-info
      .order-shop
        padding 0 20rpx
        height 60rpx

        image
          width 50rpx
          margin-right 20rpx
          border-radius 50%

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
