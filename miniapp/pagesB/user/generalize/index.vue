<template>
 <view v-if="show">
    <view v-if="type==1 || type==4">
      <goodsLists :status="type"></goodsLists>
    </view>
   <view v-else-if="type==0">
     <apply :partner_id="partner_id"></apply>
   </view>
   <view v-else-if="type==2">
     <audit></audit>
   </view>
   <view v-else-if="type==3">
     <applyFail :partner_id="partner_id" :reason="reason"></applyFail>
   </view>
   <!--<view v-else-if="type==4">-->
     <!--<freeze></freeze>-->
   <!--</view>-->
 </view>
</template>

<script>
  import goodsLists from './component/generalizeGoods'
  import apply from './component/apply'
  import audit from './component/audit'
  import applyFail from './component/applyFail'
  import freeze from './component/freeze'
  export default {
    components:{
      audit,
      apply,
      goodsLists,
      applyFail,
      freeze
    },
    data() {
      return {
        type: 0,
        show: false,
        reason:'',
        partner_id:''
      };
    },
    onLoad(options) {
      if (options.partner_id) {
        this.partner_id = options.partner_id
      }
      uni.hideShareMenu();
    },
    onShow(){
      const token = uni.getStorageSync('user_token');
      if(!token){
        this.toLink('/pagesB/user/bindUser?to=index');
        return
      }
      this.getType()
    },
    methods: {
      getType(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'applyCheck',
          success: res => {
            this.type = res.data.result.apply_status
            if(res.data.result.fail_reason){
              this.reason = res.data.result.fail_reason
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
      showInfo(){
        // uni.hideLoading()
        // this.show = true
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
</style>
