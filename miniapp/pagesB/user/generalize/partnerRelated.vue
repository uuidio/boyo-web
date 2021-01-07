<template>
  <view v-if="showItem">
    <view class="m-md p-md border-radius5px bc-fff" v-if="detail.nickname">
         <view >
           <view class="mb-md">推广邀请人</view>
           <view class="fxBox1 partner" >
             <view class="imgBox mr-md">
               <image :src="detail.headimgurl"></image>
             </view>
             <view>
               {{detail.nickname}}
             </view>
           </view>
         </view>
    </view>
    <view v-else>
      <noData></noData>
    </view>
  </view>
</template>

<script>
  import noData from '../../../components/lists/nullData'
  export default {
    components:{
      noData
    },
    data() {
      return {
        showItem:false,
        detail:{}
      };
    },
    methods: {
      getDetail(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'partnerRelated',
          success: res => {
            if(res.data.code==0){
              this.detail = res.data.result.partner
            }
            console.log(res)
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            uni.hideLoading()
            this.showItem = true
          }
        });
      }
    },
    onLoad(){
      uni.hideShareMenu();
      this.getDetail()
    },
    mounted() {

    },
  };
</script>

<style scoped lang="stylus">
  .partner
    .imgBox
      width 70rpx
      height 70rpx
      image
        width 100%
        height 100%
        border-radius 50%
</style>
