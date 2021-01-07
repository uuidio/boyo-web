<template>
  <view>
    <view class="m-md p-md bc-fff border-radius5px form">
      <view class="fxBox1 form-item">
        <view class="label text-md">姓名：</view>
        <view class="fx1"><input v-model="formItem.real_name"  placeholder="请输入真实姓名" class="form-inp" type="text"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">店铺名称：</view>
        <view class="fx1"><input v-model="formItem.shop_name" placeholder="店铺名称" class="form-inp" type="text"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">店铺地址：</view>
        <view class="fx1"><input v-model="formItem.address" placeholder="店铺地址" class="form-inp" type="text"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">手机号：</view>
        <view class="fx1"><input v-model="formItem.mobile"  placeholder="请输入手机号" class="form-inp" type="number"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">分销商手机：</view>
        <view class="fx1">
          <view  class="form-inp">
            {{formItem.partner_mobile}}
          </view>
        </view>
      </view>
    </view>
    <button :disabled="flag?true:false" class="apply-btn text-18" @tap="submit">提交申请</button>
  </view>
</template>

<script>
  export default {
    components:{
    },
    data() {
      return {
        formItem:{
          real_name:'',
          mobile:'',
          shop_name:'',
          address:'',
          register_type:'dt',
          partner_mobile:'',
          partner_id:'',
        },
        lists:[],
        flag:false,
        apply:false,
        partner_detail:{},

      };
    },
    onLoad(options){
      const user_info =JSON.parse(uni.getStorageSync('user_info'))
      if(user_info.mobile){
        this.formItem.mobile = user_info.mobile
      }
      if(options.partner_id){
        this.partner_id = options.partner_id
        this.checkPartner()
      }
    },
    methods: {
      checkPartner(){
        this.$http({
          aurl: 'checkPartner',
          params:{
            partner_id:this.partner_id
          },
          success: res => {
            if(res.data.code===0){
              this.apply = res.data.result.apply
              this.formItem.partner_id = this.partner_id
              this.formItem.partner_mobile = res.data.result.partnerInfo.mobile
              console.log(res)
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      submit(){
        uni.showLoading({
          title: '提交中'
        });
        this.flag = true
        this.$http({
          aurl: 'applyAction',
          data:this.formItem,
          success: res => {
            if(res.data.code===0){
              this.showAlert('申请成功')
              this.toBack()
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            const _this = this
            setTimeout(function(){
              uni.hideLoading()
              _this.flag = false
            },1000)
          }
        });
        console.log(this.formItem)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .apply-btn
    position fixed
    width 80%
    left 10%
    bottom 40rpx
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff
    text-align center
    background #ff4a41
  .form-item
    height 80rpx
    margin-bottom 10rpx
    .label
      width 180rpx
      text-align right
    .form-inp
      height 80rpx
      border-bottom 1px solid #e7e7e7
      line-height 80rpx
      box-sizing border-box

</style>
