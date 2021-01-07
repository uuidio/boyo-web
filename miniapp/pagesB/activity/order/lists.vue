<template>
  <view>
    <van-tabs class="order-tab" :active="active" @change="changeStatus">
      <van-tab
          v-for="(item, index) in tradeStatus"
          :title="item.title"
          :key="index"
      ></van-tab>
    </van-tabs>
    <view v-if="!orderLoading">
      <view v-if="lists.length>0">
        <view class="order-lists ml-md mr-md">
          <view class="order-item mt-md" v-for="(item,index) in lists" :key="index">
            <view class="order-info" @click="needTokenQueryLink('/pagesA/user/order/detail',{tid:item.tid})">
              <view class="order-shop fxBox2">
                <view class="fxBox1">
                  <text>{{item.group_name}}</text>
                </view>
                <view>
                  <text class="col-666">{{item.status_text}}</text>
                </view>
              </view>
              <view class="order-goods bc-fff" :key="goods_index" v-for="(goods_item,goods_index) in item.trade_order">
                <view class="imgBox">
                  <image mode="widthFix" :src="goods_item.activity_url"></image>
                </view>
                <view class="fx1 order-goods-text">
                  <view>
                    <view class="order-goods-tit">
                      <view data-line="1" class="text-md text-ellipsis text-r">
                        {{goods_item.activity_name}}
                      </view>
                    </view>
<!--                    <view class="col-666 fxBox2 mt-xs text-sm">-->
<!--                      <view class="fx1"><text v-if="goods_item.sku_info">{{goods_item.sku_info}}</text></view>-->
<!--                      <view class="text-md text-r col-666">-->
<!--                        x{{goods_item.quantity}}-->
<!--                      </view>-->
<!--                    </view>-->
                  </view>
<!--                  <view style="color:#F8952F" v-if="goods_item.aftersales_progress_text" class="text-r">{{goods_item.aftersales_progress_text}}</view>-->
                  <view class="text-md text-r col-666 mt-lg">{{goods_item.created_start}}</view>
                  <view class="text-md text-r col-666 mt-sm">{{goods_item.activity_addr}}</view>
                </view>
              </view>
            </view>
<!--            <view class="order-footer">-->
<!--              共{{item.trade_order.length}}件商品，合计：￥{{item.amount}}元-->
<!--            </view>-->
<!--            <view class="order-footer order-btns" v-if="!item.sale">-->
<!--              <view v-if="(item.status==='WAIT_BUYER_PAY' || item.status==='WAIT_SELLER_SEND_GOODS' )&& item.cancel_text==='无取消'&& item.is_allow_cancel !== false" class="order-btn border-666 col-666" @tap="cancelTid(item.tid)">-->
<!--                取消订单-->
<!--              </view>-->
<!--              <view v-if="item.cancel_text!=='无取消'" class="mt-md text-md">-->
<!--                {{item.cancel_text}}-->
<!--              </view>-->
<!--              <view @tap="paymentSubmit(item.payment_id,item.group_sign)" class="order-btn border-red col-red" v-if="item.status==='WAIT_BUYER_PAY'">-->
<!--                去付款-->
<!--              </view>-->
<!--              <view @tap="receiptOrder(item.tid)" class="order-btn border-red col-red" v-if="item.status==='WAIT_BUYER_CONFIRM_GOODS'">确认收货</view>-->
<!--&lt;!&ndash;              <view @tap="toEvaluate(item.tid)" class="order-btn border-red col-red" v-if="item.status==='TRADE_FINISHED'&&item.buyer_rate!==1">-->
<!--                去评价-->
<!--              </view> &ndash;&gt;-->
<!--            </view>-->
          </view>
        </view>
        <uni-load-more :status="loadStatus"></uni-load-more>
      </view>
      <view v-else>
        <noData></noData>
      </view>
    </view>

    <van-popup
        :show="showPopup"
        position="bottom"
    >
      <view class="text-center fw700 text-lg title mb-md fxBox1">
        <view class="fx1 text-center">取消原因</view>
        <view class="emfont icon-close text-lg" @click="closeModel"></view>
      </view>
      <view class="mb-md text-md col-666">请选择退款原因</view>
      <van-radio-group :value="cancelRadio" @change="cancelChange">
        <view v-for="(item,index) in columns" :key="index" class="fxBox2 pt-sm pb-sm text-md" @tap="cancelClick(index)">
          <text class="fx1">
            {{item}}
          </text>
          <van-radio :name="index"></van-radio>
        </view>
      </van-radio-group>
      <view class="cancel-button fxBox" @click="submitCancel">
        <view class="fx1 btn1 btn">确认取消</view>
      </view>
    </van-popup>
  </view>
</template>

<script>
  import order from '../../../mock/order.js';
  import noData from '../../../components/lists/nullData'
  import { toPayment , confirmOrder} from "./orderFun";
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  const TRADESTATUS = [
    {title: '全部', status: ''},
    {title: '待参与', status: 'WAIT_BUYER_PAY'},
    {title: '已参与', status: 'WAIT_SELLER_SEND_GOODS'},
    {title: '已结束', status: 'WAIT_BUYER_CONFIRM_GOODS'},
    {title: '已取消', status: 'CANCEL'},
  ];
  const columns = [
    '不想买了', '重复下单', '订单有误', '其它原因',
  ];
  export default {
    components:{
      uniLoadMore,
      noData
    },
    data() {
      return {
        cancelRadio:'',
        tradeStatus: TRADESTATUS,
        columns,
        active:0,
        orderLists: order.orderLists,
        currentPage:1,
        lists:[
          {
            group_name: '深圳益田假日广场',
            status_text: '待参与',
            trade_order: [
              {
                activity_name: '活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.',
                activity_url: 'https://egoss1.ytholidayplaza.com/images/default/202004/23/image_b11f2872a701f13e2513ba13c78010b9.jpeg',
                created_start: '2020-03-30 10:00',
                activity_addr: '西塔三层'
              }
            ]
          },
          {
            group_name: '深圳益田假日广场',
            status_text: '已参与',
            trade_order: [
              {
                activity_name: '活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.',
                activity_url: 'https://egoss1.ytholidayplaza.com/images/default/202004/23/image_b11f2872a701f13e2513ba13c78010b9.jpeg',
                created_start: '2020-03-30 10:00',
                activity_addr: '西塔三层'
              }
            ]
          },
          {
            group_name: '深圳益田假日广场',
            status_text: '已结束',
            trade_order: [
              {
                activity_name: '活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.',
                activity_url: 'https://egoss1.ytholidayplaza.com/images/default/202004/23/image_b11f2872a701f13e2513ba13c78010b9.jpeg',
                created_start: '2020-03-30 10:00',
                activity_addr: '西塔三层'
              }
            ]
          },
          {
            group_name: '深圳益田假日广场',
            status_text: '已取消',
            trade_order: [
              {
                activity_name: '活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.活动标题活动标题活动标题活动标标.',
                activity_url: 'https://egoss1.ytholidayplaza.com/images/default/202004/23/image_b11f2872a701f13e2513ba13c78010b9.jpeg',
                created_start: '2020-03-30 10:00',
                activity_addr: '西塔三层'
              }
            ]
          },
        ],
        loadStatus: 'more',
        pullUpOn : true,
        loadding:false,
        orderLoading:false,
        cancel:{
          tid: '',
          cancel_reason: '',
        },
        showPopup:false
      };
    },
    onLoad:function(option){
      if(option.active){
        this.active = option.active
      }
    },
    onShow(){
      // this.getLists(true)
    },
    methods: {
      toEvaluate(tid){
        this.toQueryLink('/pagesA/user/order/evaluate',{
          tid:tid
        })
      },
      receiptOrder(id){
        confirmOrder(id,this.callBack)
      },
      callBack(){
        // this.getLists(true)
      },
      paymentSubmit(id,group_sign){
       toPayment(id,group_sign)
      },
      submitCancel(){
        if(this.cancelRadio === ''){
          this.showAlert('请选择取消原因')
          return
        }
        this.$http({
          aurl:'cancelOrder',
          data:this.cancel,
          success:res => {
            if(res.data.code===0){
              // this.getLists(true)
              this.showPopup = false
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      cancelTid(tid){
        this.cancel.tid = tid
        this.showPopup = true
      },
      closeModel(){
        this.cancelRadio = ''
        this.showPopup = false
      },
      cancelChange(index){
        this.cancelRadio = String(index.detail)
        this.cancel.cancel_reason = this.columns[index.detail]
      },
      cancelClick(index){
        this.cancelRadio = String(index)
        this.cancel.cancel_reason = this.columns[index]
      },
      changeStatus(e) {
        this.active = e.detail.index
        // this.getLists(true)
      },
      init(){
        this.loadding = false;
        this.orderLoading = true
        this.loadStatus = 'more';
        this.pullUpOn = true;
        this.currentPage = 1;
        this.lists = []
      },
      getLists(init){
        if(init){
          this.init()
        }
        if (!this.pullUpOn) return;
        if(this.currentPage===1){
          uni.showLoading({
            title: '加载中'
          });
        }
        const _this = this
        const status = this.tradeStatus[this.active].status;
        const params = {
          page:this.currentPage,
          status:status
        }
        this.$http({
          aurl:'orderLists',
          params:params,
          success:res => {
            if(res.data.result.data.length===0){
              _this.loadding = false;
              _this.pullUpOn = false;
              _this.loadStatus = 'noMore'
            }else{
              res.data.result.data.forEach((item) => {
                for(let i = 0 ;i<item.trade_order.length;i++){
                    const v = item.trade_order[i]
                    if(v.after_sales_status){
                      item.sale = true;
                      if(v.after_sales_status==='SELLER_REFUSE_BUYER'){
                        item.sale = false;
                        break;
                      }
                    }
                }
                _this.lists.push(item)
              })
              if(res.data.result.last_page===1){
                _this.loadding = false;
                _this.pullUpOn = false;
                _this.loadStatus = 'noMore'
              }else{
                _this.currentPage++;
                _this.loadStatus = 'more';
                _this.loadding = false;
              }
            }
            setTimeout(function(){
              _this.orderLoading = false
              uni.hideLoading()
            },300)
          },
          fail:error => {
            console.log(error)
          }
        })
      }
    },
    onReachBottom(){
     // this.getLists()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .order-tab
    position fixed
    width 100%
    top 0
    left 0
    background #fff
    z-index 99
    >>>.van-tab
      flex 1

  .order-lists
    padding-top 44px
  .no-lists
    padding-top 44px
  .order-item
    background #fff
    margin-bottom 20rpx
    padding-bottom 20rpx
    border-radius 20rpx

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
        padding 0 40rpx
        height 80rpx

        image
          width 50rpx
          margin-right 20rpx
          border-radius 50%

      .order-goods
        padding 20rpx 40rpx
        display flex

        .imgBox
          width 160rpx
          margin-right 20rpx
          flex-shrink 0
          image
            border-radius 10rpx
            width 100%

        .order-goods-text
          overflow hidden
          padding 10rpx 0
          box-sizing border-box
          .order-goods-tit
            display flex
            justify-content space-between

  .order-btns
    position relative

    .order-btn
      display inline-block
      padding 0 20rpx
      height 60rpx
      line-height 60rpx
      border-radius 3px
      margin-left 20rpx
      margin-top 20rpx
  >>>.van-popup
    padding 30rpx 30rpx 350rpx
  .cancel-button
    height 90rpx
    position absolute
    bottom 0
    left 0
    width 100%
    z-index 99
    .btn
      height 90rpx
      line-height 90rpx
      text-align center
      color #ffffff
    .btn1
      background #e64340
  .update-img
    width 160rpx
    height 160rpx
    border 1px dashed #999999
    color #99999
    display flex
    flex-direction column
    align-items center
    justify-content center
</style>
