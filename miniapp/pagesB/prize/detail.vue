<template>
   <view v-if="show" style="padding-bottom: 160rpx">
     <view class="wrap-top p-md m-md bc-fff border-radius5px">
       <view class="express-type">
         <view v-if="btnStauts === 3 || btnStauts === 1" @click="typeClick(0)" :class="{ btn1: true, btn: true, active: pick_type === 0 ? 'active' : '', disabledBtn: DisabledBtnOne ? true : false }">快递配送</view>
         <view v-if="btnStauts === 3 || btnStauts === 2" @click="typeClick(1)" :class="{ btn2: true, btn: true, active: pick_type === 1 ? 'active' : '', disabledBtn: DisabledBtnTwo ? true : false }">门店自提</view>
       </view>
       <view  v-show="pick_type === 0" class="mt-lg">
         <selectAddress @on-addr="getAddr" :addr-id="addr_id"></selectAddress>
       </view>
     </view>


     <view class="ml-md mr-md bc-fff">
       <view class="pl-md pt-md pr-md fw700">奖品信息</view>
       <view class="prize-item fxBox p-md">
         <view class="imgBox mr-md">
           <image :src="detail.activities_reward_info.goods_info.goods_image"></image>
         </view>
         <view class="text-box pt-xs pb-xs fx1">
           <view class="line2-p">
             {{detail.activities_reward_info.goods_info.goods_name}}
           </view>
         </view>
       </view>
       <view class="notice-title">———— 奖品详情 ————</view>
       <view class="goods-detail p-md">
         <rich-text :nodes="goodsDetail"></rich-text>
       </view>
     </view>
     <view class="btn-box" >
       <button @tap="getPrize" :disabled="get?true:false" class="getBtn">{{get?'已领取':'领取奖品'}}</button>
     </view>
   </view>
</template>

<script>
  import selectAddress from '../../components/checkOut/selectAddress';
  export default {
    components:{
      selectAddress
    },
    data() {
      return {
        btnStauts: '',
        DisabledBtnOne: false,
        DisabledBtnTwo: false,
        pick_type: 0,
        active: 0,
        goodsDetail: '',
        addr_id:'',
        id:'',
        show:false,
        detail:{},
        get:false
      };
    },
    onLoad(options){
      if(options.id){
        this.getDetail(options.id)
        this.id = options.id
      }
    },
    methods: {
      typeClick(num) {
        this.pick_type = num;
      },

      getAddr(id){
        this.addr_id = id
      },
      getPrize(){
        let params = {
          pick_type: this.pick_type,
          rewards_send_id: this.id
        }
        if(this.pick_type === 0){
          if(!this.addr_id){
            this.showAlert('请填写收货地址')
            return
          }
          params.addr_id = this.addr_id;
        }
        this.$http({
          aurl: 'rewardCreateTrade',
          params:params,
          success: res => {
            if (res.data.code === 0) {
              this.showAlert('领取成功')
              this.get = true
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
      getDetail(id){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'rewardUserDetail',
          params:{
           id:id
          },
          success: res => {
            if (res.data.code === 0) {
              this.detail = res.data.result
              this.goodsDetail = this.detail.activities_reward_info.goods_info.goods_info
              const delivery_type = this.detail.activities_text.delivery_type
              if(delivery_type.length === 2){
                this.btnStauts = 3
                this.pick_type = 0
              }else{
                if(delivery_type.indexOf(1) !== -1){
                  this.btnStauts = 1
                  this.pick_type = 0
                }else{
                  this.btnStauts = 2
                  this.pick_type = 1
                }
              }
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
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  @import '../../variable.styl'
  .notice-title
    width 100%
    height 80rpx
    display flex
    justify-content center
    align-items center
    font-size $font-sm
    color $font-color-light
    background #f8f8f8
  .express-type
    display flex
    width 100%
    .btn
      flex 1
      height 60rpx
      line-height 60rpx
      text-align center
      border 1px solid #cccccc
      color #666
      font-size 28rpx
    .btn1
      border-radius 4px 0 0 4px
    .btn2
      border-radius 0 4px 4px 0
    .active
      border-color #e64340
      color #ffffff
      background #e64340
    .disabledBtn
      background #ccc
      color #666
      opacity 0.6
  .btn-box
    width 100%
    position fixed
    padding 40rpx 0
    background #fff
    bottom 0
  .getBtn
    width 80%
    margin-left 10%
    height 80rpx
    border-radius 20rpx
    background #e64340!important
    color #ffffff!important
    line-height 80rpx
    text-align center
  .prize-item
    .imgBox
      width 170rpx
      height 170rpx
      image
        width 100%
        height 100%
    .text-box
      display flex
      flex-direction column
      justify-content space-between
</style>
