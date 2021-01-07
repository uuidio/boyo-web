<template>
 <view>
   <view class="status-type1">
     <view class="status-icon">
       <text class="emfont icon-roundcheckfill status-success" v-if="status==='success'"></text>
       <text class="emfont icon-round_close_fill_light status-fail" v-else></text>
     </view>
     <!--设置/重置密码-->
     <view class="text-center" v-if="type == 'new' || type == 'reset'">
       <view class="text-18 mt-l text-bold">
         {{ type == 'new' ? '密码设置' : '密码重置'}}
         <text v-if="status==='success'">成功</text>
         <text v-else>失败</text></view>
       <view>
         <view class="btnLists">
           <view @tap="choiceBack(2)" v-if="type == 'new'">
             返回
           </view>
           <view @tap="toHome" v-else>
             返回首页
           </view>
         </view>
       </view>
     </view>
     <!--支付状态-->
     <view class="text-center" v-if="type == 'payment'">
       <view class="text-18 mt-l text-bold">
         支付
         <text v-if="status==='success'">成功</text>
         <text v-else>失败</text></view>
       <view>
         <view class="btnLists">
             <view @tap="choiceBack" v-if="type == 'new'">
               返回
             </view>
         </view>
       </view>
     </view>
     <!--绑卡-->
     <view class="text-center" v-if="type == 'bindCard'">
       <view class="text-18 mt-l text-bold">
         绑定
         <text v-if="status==='success'">成功</text>
         <text v-else>失败</text></view>
       <view>
         <view class="btnLists">
           <view @tap="choiceBack">
             返回
           </view>
           <view class="ml-md" @tap="redirectToLink('/pagesA/user/wallet/physicalCard')">
             查看实体卡
           </view>
         </view>
       </view>
     </view>
   </view>
 </view>
</template>

<script>
  import redirect from '../../../mixins/redirect.js';
    export default {
      mixins: [redirect],
        data() {
          return {
            type:'',
            status:'success',
          };
        },
        onLoad:function(option){
          this.status = option.status;
          this.type = option.type
        },
        methods: {
        },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
  .status-desc
    margin-bottom 65rpx
  .status-icon
    text-align center
    .status-success
      font-size 150rpx
      color #52c41a
    .status-fail
      font-size 150rpx
      color #fc4d52
  .status-type1
    padding-top 165rpx
    .btnLists
      display flex
      margin-top 65rpx
      justify-content center
      >view
        width 32%
        height 88rpx
        line-height 88rpx
        background #ffffff
        border 1px solid #D7D7D7
        font-size 30rpx
        text-align center
        border-radius 10px
        box-sizing border-box
      .see-order
        margin-left 20rpx
</style>
