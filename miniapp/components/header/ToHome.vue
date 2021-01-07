<template>
   <view>
     <view class="head-box" :style="{height:height+'px',paddingRight:myRight+'px',width:width+'px',backgroundColor:boxBackground}">
       <view class="header-box" :style="{height:btnHeight+'px',paddingTop:top+'px'}">
         <view class="toHomeBox" :style="{
           width:btnWidth+'px',
           height:'100%',
           border:boxBackground==='#fff'?'1px solid #ededed':'none'
        }">
           <view class="goBack" @click="toBack(routerLink)">
             <text class="emfont icon-right text-l col-000 fw700"></text>
           </view>
           <view class="goHome" @click="toNav('/pages/index/indexCustomer')">
             <text class="emfont icon-home text-l col-000 fw700"></text>
           </view>
         </view>
         <view class="fx1 text-l col-333 text-center">{{title}}</view>
       </view>
     </view>
     <view v-if="needPaddingTop" :style="{paddingTop:height+'px'}"></view>
   </view>
</template>

<script>
    export default {
      props:{
          title:{
            type:String,
            default:''
          },
          boxBackground:{
            type:String,
            default:'transparent'
          },
          needPaddingTop:{
            type:Boolean,
            default:true
          },
          routerLink:{
            type:String,
            default:''
          }
        },
        data() {
            return {
              btnWidth:'',
              width:'',
              height:'',
              top:'',
              btnHeight:'',
              myRight:'',
            };
        },
        methods: {
            getInfo(){
                let menuButtonInfo = wx.getMenuButtonBoundingClientRect()
                uni.getSystemInfo({
                  success: (res) => {
                    this.btnWidth = menuButtonInfo.width
                    this.btnHeight = menuButtonInfo.height
                    this.width = menuButtonInfo.left || res.windowWidth;
                    this.myRight = menuButtonInfo.width+10 || 0
                    this.height = menuButtonInfo.top ? (menuButtonInfo.top + menuButtonInfo.height + 8) : (res.statusBarHeight + 44);
                    this.top = menuButtonInfo.top ? (menuButtonInfo.top + (menuButtonInfo.height - 32) / 2) : (res.statusBarHeight + 6);
                    this.$emit('on-height',this.height)
                  },
                });
            }
        },
        onReady() {
        },
        onLoad:function(options){

        },
        mounted() {
          this.getInfo()
        },
    };
</script>

<style scoped lang="stylus">
.head-box
  width: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 9998;
  .header-box
    display: flex;
    align-items center
.toHomeBox
  height 66rpx
  width 196rpx
  display flex
  align-items center
  background rgba(255,255,255,.45)
  border-radius 40rpx
  box-sizing border-box
  justify-content space-between
  margin-left 20rpx
  view
    flex 1
    text-align center
  .goBack
    transform rotate(180deg)
</style>
