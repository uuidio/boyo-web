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
          </view>
          <view class="col-666 fxBox2 mt-xs text-sm">
            <view class="fx1">
              <view v-if="detail.sku_info">{{detail.sku_info}}</view>
            </view>
            <view class="text-md text-r col-666">
              x1
            </view>
          </view>
        </view>
      </view>
    </view>
    <view class="p-md border-radius5px bc-fff fxBox2" @tap="showPopup=true">
      <view  class="fxBox1">
        <view class="fw700 text-md mr-md">
          售后原因
        </view>
        <view class="text-sm">
          <text v-if="formItem.reason">{{formItem.reason}}</text>  <text class="col-666" v-else>请选择售后原因</text>
        </view>
      </view>
      <view class="emfont icon-right"></view>
    </view>
    <view class="border-radius5px mt-md bc-fff p-md">
       <view class="fxBox1 mb-md" v-if="formItem.aftersales_type!=='EXCHANGING_GOODS'">
         <text class="fw700 mr-md">退款金额：</text><text class="col-red">￥{{detail.total_fee}}</text>
       </view>
      <view class="fxBox1 mb-md" v-if="formItem.aftersales_type!=='EXCHANGING_GOODS'">
        <text class="fw700 mr-md">申请金额：</text>
        <view class="col-red fxBox1 fx1">
          ￥ <input class="fx1" style="border-bottom:1px solid #e7e7e7" placeholder="请输入退款金额" v-model="formItem.apply_refund_price" type="number" />
        </view>
      </view>
      <view class="fxBox1 mb-md" v-if="formItem.aftersales_type!=='EXCHANGING_GOODS'&&consume_point_fee>0">
        <text class="fw700 mr-md">应退积分：</text>
        <view class="col-red fxBox1">
          {{consume_point_fee}}
        </view>
      </view>
      <view class="fxBox1 mb-md">
        <text class="fw700 mr-md">售后描述：</text>
        <input type="text" placeholder="选填" v-model="formItem.description">
      </view>
      <view class="mb-md fw700">
        上传凭证:
      </view>
      <view>
        <uploadImg @on-img="getImgLists"></uploadImg>
      </view>
    </view>
    <view class="saleBtn" @tap="submitSale">
      <text v-if="formItem.aftersales_type==='ONLY_REFUND'">申请退款</text>
      <text v-else-if="formItem.aftersales_type==='REFUND_GOODS'">申请退货退款</text>
      <text v-else>申请换货</text>
    </view>
    <van-popup
        :show="showPopup"
        position="bottom"
    >
      <view class="text-center fw700 text-lg title mb-md fxBox1">
        <view class="fx1 text-center">售后原因</view>
        <view class="emfont icon-close text-lg" @click="closeModel"></view>
      </view>
      <view class="radioBox">
        <van-radio-group :value="cancelRadio" @change="cancelChange">
          <view v-for="(item,index) in columns" class="fxBox2 pt-sm pb-sm text-md" @tap="cancelClick(index)">
            <text class="fx1">
              {{item}}
            </text>
            <van-radio checked-color="#e64340" :name="index"></van-radio>
          </view>
        </van-radio-group>
      </view>
      <view class="cancel-button fxBox" @click="closeModel">
        <view class="fx1 btn1 btn">关闭</view>
      </view>
    </van-popup>
  </view>
</template>

<script>

  import uploadImg from "../../../components/uploadImg/uploadImg"
  export default {
    components:{
      uploadImg
    },
    data() {
      return {
        showPopup:false,
        oid:'',
        tid:'',
        detail:'',
        type:'',
        columns:[],
        cancelRadio:'',
        formItem:{
          aftersales_type:'',
          evidence_pic:[],
          description:'',
          reason:'',
          oid:'',
          tid:'',
          apply_refund_price: '',
        }
      };
    },
    onLoad:function(options){
      this.formItem.oid = options.oid
      this.formItem.tid = options.tid
      this.formItem.aftersales_type = options.type
      this.getSaleInfo()
    },
    methods: {
      submitSale(){
        if(this.formItem.reason===''){
          uni.showToast({
            title: '请选择售后原因',
            icon: 'none',
          })
          return
        }
        if(this.formItem.aftersales_type=='EXCHANGING_GOODS'){
          delete this.formItem.apply_refund_price
        }else{
          if(this.formItem.apply_refund_price==''){
            this.showAlert('请输入退款金额！')
            return
          }else if(Number(this.formItem.apply_refund_price)>Number(this.detail.amount)){
            this.showAlert('退款金额不能大于订单总额！')
            return
          }
        }
        this.$http({
          aurl:'aftersales',
          data:this.formItem,
          success:res => {
            if(res.data.code===0){
              uni.showToast({
                title: '申请成功',
                icon: 'none',
              })
              setTimeout(function(){
                uni.navigateBack({
                  delta:2
                });
              },500)
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      getImgLists(lists){
        this.formItem.evidence_pic = lists
      },
      getSaleInfo(){
        this.$http({
          aurl:'aftersalesApply',
          data:{
            oid:this.formItem.oid,
            tid:this.formItem.tid
          },
          success:res => {
            console.log(res)
            if(res.data.code===0){
              this.detail = res.data.result.orderInfo
              this.columns = res.data.result.reason
              this.formItem.apply_refund_price = this.detail.amount
              this.consume_point_fee = this.detail.consume_point_fee
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      cancelChange(index){
        this.cancelRadio = String(index.detail)
        this.formItem.reason = this.columns[index.detail]
        this.showPopup = false
      },
      cancelClick(index){
        this.cancelRadio = String(index)
        this.formItem.reason = this.columns[index]
        this.showPopup = false
      },
      closeModel(){
        this.showPopup = false
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
  >>>.van-popup
    padding 30rpx 30rpx 90rpx
    hegiht 800rpx
  .title
    height 60rpx
    line-height 60rpx
  .radioBox
    height calc(800rpx - 180rpx)
    overflow scroll
    padding-bottom 90rpx
  .radioBox::-webkit-scrollbar
    display none
  .cancel-button
    height 90rpx
    position absolute
    bottom 0
    left 0
    width 100%
    .btn
      height 90rpx
      line-height 90rpx
      text-align center
      color #ffffff
    .btn1
      background #e64340
  .saleBtn
    width 100%
    height 90rpx
    line-height 90rpx
    text-align center
    color #ffffff
    position fixed
    bottom 0
    left 0
    background #e64340
</style>
