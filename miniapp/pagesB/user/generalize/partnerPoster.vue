<template>
    <view>
      <view v-if="show" class="posterBox">
        <view class="m-md p-md bc-fff border-radius5px">
          <view class="fxBox1 user-head">
            <view class="imgBox mr-md"><image :src="detail.partner.headimgurl"></image></view>
            <view><text>{{detail.partner.nickname}} 邀请您成为推广员</text></view>
          </view>
          <view class="w100 mt-md">
            <image mode="widthFix" class="w100" :src="detail.partner_piture.article_url"></image>
          </view>
          <view class="sub-btn">
            <view v-if="partner_role==3">
              <button  @tap="needTokenLink('/pagesB/user/generalize/distributor')">您已经是分销商，进入分销商中心</button>
            </view>
            <view v-else>
              <view class="text-center col-666 mb-md" v-if="type!==0&&partner_shop.nickname">
                您已被{{partner_shop.nickname}}邀请申请推广员
              </view>
              <view>
                <view v-if="partner_status=='apply'">
                  <button  :disabled="true">您已提交了小店申请，请等待审核</button>
                </view>
                <view v-else>
                  <button v-if="type==0" @tap="needTokenQueryLink('/pagesB/user/generalize/applyForm',{partner_id:partner_id})">立即申请</button>
                  <button v-else-if="type==1" @tap="needTokenLink('/pagesB/user/generalize/index')">您已是推广员，点击进入推广中心</button>
                  <button v-else-if="type==2" :disabled="true">您已提交申请，请等待审核</button>
                  <button v-else-if="type==3" @tap="needTokenQueryLink('/pagesB/user/generalize/index',{partner_id:partner_id})">
                    申请失败，查看原因</button>
                </view>
              </view>
            </view>
          </view>
        </view>
      </view>
    </view>
</template>

<script>
  export default {
    data() {
      return {
        partner_id:'38',
        show:false,
        detail:{},
        type:0,
        partner_shop:{},
        partner_status:'',
        partner_role:''
      };
    },
    onLoad(options){
      uni.hideShareMenu();
      if (options.scene) {
        const str = decodeURIComponent(options.scene)
        const strArr = str.split('&')
        console.log(strArr)
        if (strArr.length === 2) {
          let t = strArr[0].substring(2)
          const user_id = strArr[1].substring(3)
          this.partner_id = user_id
          console.log(this.partner_id)
          this.getPoster()
        }
      }
    },
    onShow(){
      const token = uni.getStorageSync('user_token');
      if(token){
        this.getType()
      }
    },
    methods: {
      getPoster(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'getPartnerShop',
          params:{
            partner_id:this.partner_id,
            type:2
          },
          success: res => {
            if(res.data.code == 0){
              this.detail = res.data.result
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
      getType(){
        this.$http({
          aurl: 'applyCheck',
          success: res => {
            console.log(res)
           if(res.data.code==0){
             if(res.data.result.partner_status){
               this.partner_status = res.data.result.partner_status
             }
             if(res.data.result.partner_role){
               this.partner_role = res.data.result.partner_role
             }
               this.type = res.data.result.apply_status
               if(res.data.result.partner_shop){
                 this.partner_shop = res.data.result.partner_shop
               }
             }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .posterBox
    padding-bottom 140rpx
  .user-head
    .imgBox
      width 70rpx
      height 70rpx
      image
        width 100%
        height 100%
        border-radius 50%
  .sub-btn
    position fixed
    width 100%
    padding 20rpx
    box-sizing border-box
    left 0
    bottom 0
    background #fff
    border-top 1px solid #f2f2f2
    button
      height 80rpx
      width 100%
      line-height 80rpx
      background #f5222d
      color #ffffff
      text-align center
      border-radius 10rpx
</style>
