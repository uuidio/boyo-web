<template>
  <view v-if="show">
     <view class="bc-fff m-md border-radius8 p-lg">
       <view class="fxBox1">
         <text>可提现余额</text>
         <view class="col-red ml-md">
           <text>￥{{detail.info?detail.info.income:0}}</text>
         </view>
       </view>
     </view>
    <view class="exchange ml-md mr-md mt-lg border-radius8">
      <view class="ex_use_integral ex_use_bot">
        <view class="ex_use_title">申请提现金额</view>
        <view class="ex_use_code">
          <input placeholder="请输入提现金额" type="number" @input="changExchange" :value="apply_amount" class="ipt" placeholder-style='color:#999;font-size:26rpx;font-weight:normal;'/>
        </view>
      </view>
      <view class="ex_use_integral">
        <view class="ex_use_title">实际到账金额（手续费{{detail.service_charge}}%）</view>
        <view class="ex_use_code  ml-xs text-ellipsis">￥{{actualAmount}}</view>
      </view>
      <view>
        <button class="saveBtn" :class="{disabled: btnFlag}"  @tap="submit">申请提现</button>
      </view>
    </view>
    <view class="exchange_desc">
      <view class="desc_title">提现说明</view>
      <view class="desc_content">1、余额必须大于{{detail.apply_amount}}元才能发起提现</view>
      <view class="desc_content">2、单笔提现不能大于{{detail.max_apply_amount}}元</view>
      <view class="desc_content">3、因提现涉及的手续费需要推广员自行承担</view>
      <view class="desc_content">4、目前的手续费为提现金额的{{detail.service_charge}}%</view>
      <view class="desc_content">5、发起提现申请后，工作人员将在72小时内完成审核</view>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        num:'',
        detail:{},
        show:false,
        apply_amount:'',
        btnFlag:false,
        out_type:'',
        service_charge: '',
        actualAmount: 0.00,
      };
    },
    methods: {
      changExchange(e){
        let that = this
        let val = e.target.value;
        val = val.replace(/[^\d.]/gi,'')
        that.actualAmount = (val-val*that.detail.service_charge*0.01).toFixed(2)
        that.apply_amount = val
        return {
          value: val
        }
      },
      getDetail(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'getUserDeposit',
          success: res => {
            this.detail = res.data.result
            if(this.detail.info){
              this.btnFlag = Number(this.detail.info.income)<=Number(this.detail.apply_amount)
            }else{
              this.btnFlag = true
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            uni.hideLoading()
            this.show = true
          }
        });
      },
      submit(){
        if(Number(this.apply_amount)<=Number(this.detail.apply_amount)){
          this.showAlert('可提现余额不足')
          return
        } else if(this.apply_amount===''){
          this.showAlert('请输入提现金额');
          return
        } else if(Number(this.apply_amount)>Number(this.detail.max_apply_amount)){
          this.showAlert('提现金额不能大于'+this.detail.max_apply_amount+'')
          return
        }
        let params = {
          apply_amount:this.apply_amount
        }
        let out_type = uni.getStorageSync('out_type');
        if(out_type){
          params.out_type = out_type
        }
        this.btnFlag = true
        uni.showLoading({
          title: '提交中...'
        });
        this.$http({
          aurl: 'applyCashOut',
          data:params,
          success: res => {
            if(res.data.code===0){
              uni.redirectTo({
                url:'/pagesB/user/generalize/depositSuccess'
              })
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            this.btnFlag = false
            uni.hideLoading();
          }
        });
      }
    },
    onLoad(options){
      this.getDetail()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .exchange{
    background-color: #fff;
    padding: 32rpx;
    margin-bottom: 32rpx;
    box-sizing: border-box;
    .ex_use_integral{
      padding: 24rpx 0;
      display: flex;
      align-items: center;
      justify-content: space-between;

      .ex_use_title{
        font-size: 26rpx;
        color: #666;
        flex-shrink: 0;
      }
      .ex_use_code{
        color: #333;
        font-size: 44rpx;
        font-weight: bold;
        input{
          border:0px;
          text-align: right;
          margin-left: 20rpx;
          box-sizing: border-box;
        }
      }
    }
    .ex_use_bot{
      border-bottom: 1px solid #d7d7d7;
    }
  }
  .exchange_desc{
    width: 96%;
    padding: 0 32rpx;
    .desc_title{
      margin-bottom: 24rpx;
      font-size: 28rpx;
      color: #333;
    }
    .desc_content{
      color: #999;
      font-size: 24rpx;
      line-height: 40rpx;

    }
  }
  .saveBtn
    width 100%
    height 76rpx
    line-height 76rpx
    border-radius 16rpx
    color #ffffff
    text-align center
    font-size 30rpx
    background rgba(255, 23, 62, 1)
    &.disabled
      background rgba(255, 23, 62, .5)
</style>
