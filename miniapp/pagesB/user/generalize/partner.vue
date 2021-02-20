<template>
  <view class="generalize pos-re" v-if="showItem">
    <image mode="widthFix" class="indexBg" src="https://egoss1.ytholidayplaza.com/images/default/202005/12/F98k5YeYGuEaS3PmF1YpOMWMXM1zYLA5Uh13Z9OO.png"></image>
    <view class="content-box">
      <view class="fxBox2">
        <view class="p-lg user-info fxBox1">
          <view class="imgBox mr-sm">
            <image :src="user_info.avatarUrl ||'https://bbc-test.gdalpha.com/images/bkxLOGO.jpg'"></image>
          </view>
          <view class="col-fff">
            <view class="text-md mb-xs">{{ user_info.nickname || user_info.nickName || user_info.mobile || '小飞侠' }}</view>
            <view class="text-sm">
               小店
              <text v-if="detail.user_info.partner_status!==0">（已冻结）</text>
            </view>
          </view>
        </view>
        <view class="ml-lg mr-lg col-fff text-r">
          <text class="mr-lg" @tap="needTokenQueryLink('/pagesB/user/generalize/desc',{
          id:'28'
          })">规则说明</text>
        </view>
      </view>
      <view class="p-md bc-fff border-radius5px ml-lg mr-lg mt-md mb-md">
        <view class="earnings">
          <view class="top pb-md">
            <view class="col-999 text-sm fxBox1">
              累计可提现收入（元）
            </view>
            <view class="fxBox2">
              <view class="fw700 text-30 mt-xs">
                {{detail.history_amount}}
              </view>
              <view class="fxBox1">
                <view @tap="needTokenLink('/pagesB/user/generalize/depositLists')">提现记录</view>
                <view class="deposit ml-sm" @tap="getDepositType">申请提现</view>
              </view>
            </view>
          </view>
          <view class="bottom fxBox1 pt-md">
            <view class="fx1" @tap="needTokenLink('/pagesB/user/generalize/privy')">
              <view class="col-999 text-sm">
                我的推广员（人）
              </view>
              <view class="fw700 text-18 mt-xs">
                {{detail.partner_members}}
              </view>
            </view>
            <view class="fx1" @tap="needTokenQueryLink('/pagesB/user/generalize/order',{money:detail.history_amount,type:3})">
              <view class="col-999 text-sm">
                推广订单（笔）
              </view>
              <view class="fw700 text-18 mt-xs" >
                {{detail.spread_orders}}
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="m-lg border-radius5px bc-fff">
        <view class="p-md fxBox2" @tap="needTokenQueryLink('/pagesB/user/generalize/order',{money:detail.history_amount,type:3})">
          <view>全部订单明细</view>
          <text class="emfont icon-right"></text>
        </view>
        <view class="p-md tabs">
          <view class="gen-info">
            <view class="tab-item fxBox1">
              <view class="fx1" @tap="activeChange(index)" :class="{active:active===index?true:false}" v-for="(item,index) in tabs">{{item.name}}</view>
            </view>
          </view>
          <view class="mt-lg">
            <view class="fxBox1">
              <view class="fx1">
                <view class="col-999 text-sm">邀请好友数1（人）</view>
                <view class="fw700 text-18  mt-xs">{{detail.partner_bytime}}</view>
              </view>
              <view class="fx1">
                <view class="col-999 text-sm">订单数</view>
                <view class="fw700 text-18  mt-xs">{{detail.sold_orders_bytime}}</view>
              </view>
              <view class="fx1">
                <view class="col-999 text-sm">预估收益(元)</view>
                <view class="fw700 text-18  mt-xs">{{detail.sold_amounts_bytime}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view class="bc-fff m-lg p-md border-radius5px fxBox1 col-base text-center">
        <view  class="partner-item" @tap="needTokenLink('/pagesB/user/generalize/privy')">
          <view class="mb-xs">
            <image src="https://egoss1.ytholidayplaza.com/images/default/202005/12/PGFqVY4X7GF37qdix7dFQz6rzLcR00fKYllynbAe.png"></image>
          </view>
          <view>
            <text class="text-sm">我的下级</text>
          </view>
        </view>
        <view class="partner-item" @tap="toCode">
          <view class="text-icon">
            <text class="emfont icon-friend_add_light text-18"></text>
          </view>
          <view>
            <text class="text-sm">邀请推广员</text>
          </view>
        </view>
        <view class="partner-item" @tap="needTokenLink('/pagesB/user/generalize/extensionAudit')">
          <view class="text-icon">
            <text class="emfont icon-searchlist text-18"></text>
          </view>
          <view>
            <text class="text-sm">推广员审核</text>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  const tabs = [
    {
      name:'今日',
      type:'now'
    },
    {
      name:'昨日',
      type:'yesterday'
    },
    {
      name:'近7日',
      type:'week'
    },
    {
      name:'近30日',
      type:'month'
    },
  ]
  export default {
    components:{
    },
    data() {
      return {
        tabs,
        active:0,
        showItem:false,
        detail:{},
        user_info:JSON.parse(uni.getStorageSync('user_info')),
        flag:false,
      };
    },
    props:{

    },
    onLoad(){

    },
    methods: {
      toCode(){
        if(this.flag){
          return
        }
        this.flag = true
        this.$http({
          aurl: 'creatPartnerWxMiniQr',
          params:{
            type:2
          },
          success: res => {
            if(res.data.code==0){
              if(res.data.result.pt_wx_mini_qr){
                this.needTokenLink('/pagesB/user/generalize/partnerCode')
              }else{
                this.showAlert('生成二维码失败！')
              }
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            this.flag = false
          }
        });

      },
      activeChange(i){
        if(this.active!==i){
          this.active=i
          this.getDetail()
        }
      },
      getDepositType(){
        this.$http({
          aurl: 'applyCashOutCheck',
          success: res => {
            if(res.data.result.status){
              uni.setStorage({
                key: 'out_type',
                data: 2,
                success: function () {
                }
              });
              if(res.data.result.status==1){
                this.needTokenQueryLink('/pagesB/user/generalize/depositSuccess')
              }else if(res.data.result.status==3){
                this.needTokenQueryLink('/pagesB/user/generalize/depositView',{u:this.user_info.user_id})
                // this.needTokenQueryLink('/pagesB/user/generalize/deposit',{out_type:2})
              }else if(res.data.result.status==2){
                this.needTokenQueryLink('/pagesB/user/generalize/depositFail')
              }else if(res.data.result.status==0){
                this.needTokenQueryLink('/pagesB/user/generalize/depositView',{u:this.user_info.user_id})
                // this.needTokenQueryLink('/pagesB/user/generalize/deposit',{out_type:2})
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
      getDetail(){
        this.$http({
          aurl: 'getPartnerDistribution',
          params:{
            type:tabs[this.active].type
          },
          success: res => {
            this.detail = res.data.result
            console.log(res)
            console.log( this.detail )
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            this.showItem = true
          }
        });
      }
    },
    mounted() {
      this.getDetail()
      {{this.user_info}}
    },
  };
</script>

<style scoped lang="stylus">
  .partner-item
    width 20%
    image
      height 84rpx
      width 84rpx
      margin 0 auto
      border-radius 50%
    .text-icon
      width 80rpx
      height 80rpx
      margin 0 auto 20rpx
      line-height 80rpx
      text-align center
      border 1px dashed #999999
      border-radius 50%
  .deposit
    height 50rpx
    padding 0 15rpx
    border-radius 40rpx
    line-height 50rpx
    background #f5222d
    color #ffffff
    text-align center
  .tabs
    border-top 1px solid #e7e7e7
    .gen-info
      margin 0 30rpx
    .tab-item
      >view
        height 60rpx
        line-height 60rpx
        text-align center
        border 1px solid #e7e7e7
        border-right 0
        &:last-child
          border-radius 0 40rpx 40rpx 0
          border-right 1px solid #e7e7e7
        &:first-child
          border-radius 40rpx 0 0 40rpx
      .active
        background #f5222d
        color #ffffff
        border-color #f5222d
  .content-box
    position relative
    z-index 3
  .indexBg
    position absolute
    top 0
    left 0
    width 100%
  .user-info
    padding-top 50rpx
    .imgBox
      width 84rpx
      height 84rpx
      image
        width 100%
        height 100%
        border-radius 50%
  .earnings
    .top
      border-bottom 1px solid #e7e7e7
</style>
