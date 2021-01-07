<template>
  <view class="dep-success">
    <view class="succ-mb">
      <view class="success-icon text-center">
        <text class="emfont icon-round_close_fill_light"></text>
      </view>
      <view class="fw700 text-16 mb-lg text-center">
        提现失败，请联系平台管理员咨询原因或者重新发起提现
      </view>
      <button class="saveBtn" @tap="toDep">重新发起</button>
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        out_type:'',
        wechet_open_id:0,
        user_info:JSON.parse(uni.getStorageSync('user_info')),
      };
    },
    onLoad(options){
        if(options.wechet_open_id==1){
          this.wechet_open_id = options.wechet_open_id
        }
    },
    methods: {
      toDep(){
        if(this.wechet_open_id==1){
          uni.redirectTo({
            url:'/pagesB/user/generalize/deposit'
          })
        }else{
          uni.redirectTo({
            url:'/pagesB/user/generalize/depositView?u='+this.user_info.user_id+''
          })
        }

      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .saveBtn
    width 80%
    position fixed
    left 10%
    bottom 40rpx
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff!important
    text-align center
    background #ff4a41!important
  .dep-success
    position fixed
    height 100%
    width 100%
    display flex
    flex-direction column
    align-items center
    justify-content center
    padding 0 50rpx
    box-sizing border-box
    .success-icon
      font-size 200rpx
      margin-bottom 40rpx
      color #ff4a41
    .succ-mb
      margin-bottom 200rpx
</style>
