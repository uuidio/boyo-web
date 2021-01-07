<template>
  <view class="generalize pos-re" v-if="showItem">
    <image mode="widthFix" class="indexBg" src="../../../static/images/indexBg.png"></image>
    <view class="content-box">
      <view class="fxBox2">
        <view class="p-lg user-info fxBox1">
          <view class="imgBox mr-sm">
             <image :src="user_info.avatarUrl ||'https://bbc-test.gdalpha.com/images/bkxLOGO.jpg'"></image>
          </view>
          <view class="col-fff">
            <view class="text-md mb-xs">{{ user_info.nickname || user_info.nickName || user_info.mobile }}</view>
            <view class="text-sm">
              <view v-if="detail.partner_role&&detail.partner_role==2">小店</view>
              <view v-else> 推广员<text v-if="status==4">（已冻结）</text></view>
            </view>
          </view>
        </view>
        <view class="ml-lg mr-lg col-fff text-r">
          <text class="mr-lg" @tap="needTokenQueryLink('/pagesB/user/generalize/desc',{
           id:'17'
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
            <view class="fx1" @tap="needTokenLink('/pagesB/user/generalize/client')">
              <view class="col-999 text-sm">
                累计客户（人）
              </view>
              <view class="fw700 text-18 mt-xs">
                {{detail.spread_peoples}}
              </view>
            </view>
            <view class="fx1" @tap="needTokenLink('/pagesB/user/teammate/index')">
              <view class="col-999 text-sm">
                邀请新用户
              </view>
              <view class="fw700 text-18 mt-xs">
                {{detail.son_members}}
              </view>
            </view>
            <view class="fx1" @tap="needTokenQueryLink('/pagesB/user/generalize/order',{money:detail.history_amount})">
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
        <view class="p-md fxBox2" @tap="needTokenQueryLink('/pagesB/user/generalize/order',{money:detail.history_amount})">
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
                <view class="col-999 text-sm">邀请好友数（人）</view>
                <view class="fw700 text-18  mt-xs">{{detail.spread_peoples_bytime}}</view>
              </view>
              <view class="fx1">
                <view class="col-999 text-sm">订单数</view>
                <view class="fw700 text-18  mt-xs">{{detail.spread_orders_bytime}}</view>
              </view>
              <view class="fx1">
                <view class="col-999 text-sm">预估收益(元)</view>
                <view class="fw700 text-18  mt-xs">{{detail.spread_amounts_bytime}}</view>
              </view>
            </view>
          </view>
        </view>
      </view>
      <view  class="bc-fff m-lg p-md border-radius5px fxBox1 col-base text-center">


        <view class="partner-item"  @tap="toMyCode">
          <view class="mb-xs">
            <image src="https://egoss1.ytholidayplaza.com/images/default/202005/12/nuUpm3slWT1TqLUB6JVSiQZcdjE5PVsvnzyBwmsW.png"></image>
          </view>
          <view>
            <text class="text-sm">我的二维码</text>
          </view>
        </view>
        <view v-if="detail.partner_role&&detail.partner_role==2" class="partner-item" @tap="needTokenLink('/pagesB/user/generalize/partner')">
          <view class="mb-xs">
            <image  src="https://egoss1.ytholidayplaza.com/images/default/202005/12/GqTZ96QH0h5vMSxuvGLUJO5M0PsNViLx8kaAIqwX.png"></image>
          </view>
          <view>
            <text class="text-sm">店铺中心</text>
          </view>
        </view>
<!--        <view class="partner-item"  @tap="needTokenLink('/pagesB/user/generalize/partnerRelated')">-->
<!--          <view class="mb-xs">-->
<!--            <image src="https://egoss1.ytholidayplaza.com/images/default/202005/12/PGFqVY4X7GF37qdix7dFQz6rzLcR00fKYllynbAe.png"></image>-->
<!--          </view>-->
<!--          <view>-->
<!--            <text class="text-sm">我的上级</text>-->
<!--          </view>-->
<!--        </view>-->
      </view>
      <view class="ml-lg mr-lg" v-if="status!==4">
        <button class="ml-md toGoodsBtn" @tap="toQueryLink('/pagesA/goods/lists',{is_rebate:1,shop_not_in:1})">去推广</button>
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
        showItem:true, // false,
        detail:{},
        wechet_open_id:0,
        user_info:JSON.parse(uni.getStorageSync('user_info')),
      };
    },
    props:{
      status:Number
    },
    onLoad(){

    },
    methods: {
      activeChange(i){
        if(this.active!==i){
          this.active=i
          this.getDetail()
        }
      },
      getDepositType(){
        this.needTokenLink('/pagesB/user/generalize/deposit')
        // this.DevelopmentTips(); // 功能开发中。。
        // this.$http({
        //   aurl: 'applyCashOutCheck',
        //   success: res => {
        //     console.log(this.user_info.user_id)
        //     if(res.data.result.status){
        //       uni.removeStorageSync('out_type');
        //       if(res.data.result.status==1){
        //         this.needTokenLink('/pagesB/user/generalize/depositSuccess')
        //       }else if(res.data.result.status==3){
        //         // this.needTokenLink('/pagesB/user/generalize/deposit')
        //         if(this.wechet_open_id==1){
        //           this.needTokenLink('/pagesB/user/generalize/deposit')
        //         }else{
        //           this.needTokenQueryLink('/pagesB/user/generalize/depositView',{u:this.user_info.user_id})
        //         }
        //       }else if(res.data.result.status==2){
        //         this.needTokenQueryLink('/pagesB/user/generalize/depositFail',{
        //           wechet_open_id:this.wechet_open_id
        //         })
        //       }else if(res.data.result.status==0){
        //         if(this.wechet_open_id==1){
        //           this.needTokenLink('/pagesB/user/generalize/deposit')
        //         }else{
        //           this.needTokenQueryLink('/pagesB/user/generalize/depositView',{u:this.user_info.user_id})
        //         }
        //       }
        //     }
        //   },
        //   fail: error => {
        //     console.log(error);
        //   },
        //   complete:res=>{
        //
        //   }
        // });
      },
      toMyCode(){
        this.$http({
          aurl: 'getWxMiniQr',
          success: res => {
            if(res.data.result.wx_mini_person_qr){
              this.needTokenLink('/pagesB/user/generalize/myCode')
            }
            console.log(res)
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
          aurl: 'getPersonDistribution',
          params:{
            type:tabs[this.active].type
          },
          success: res => {
            this.detail = res.data.result
            if(this.detail.wechet_open_id == 1){
             this.wechet_open_id = this.detail.wechet_open_id
            }
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
    },
  };
</script>

<style scoped lang="stylus">
  .partner-item
    width 20%
    image
      height 70rpx
      width 70rpx
      margin 0 auto
      border-radius 50%
  .toGoodsBtn
    width 100%
    display block
    margin 40rpx 0
    height 80rpx
    line-height 80rpx
    text-align center
    background #f5222d
    border-radius 20rpx
    color #fff
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
