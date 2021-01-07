<template>
  <view>
    <view class="head-box" :style="{height:height+'px',paddingRight:myRight+'px',width:width+'px',backgroundColor:boxBackground}">
      <view class="header-box" :style="{height:btnHeight+'px',paddingTop:top+'px'}">
        <view class="toHomeBox">
          <view class="goBack" @click="toBack(routerLink)" v-if="showGoBack">
            <text class="emfont icon-right text-l" :style="{color: boxBackground==='#fff' ? '#333333' : ''
        }"></text>
          </view>
        </view>
        <view class="fx1 text-37 text-r padding-r" :style="{color: boxBackground==='#fff' ? '#333333' : ''
        }">{{title}}</view>
      </view>
    </view>
    <view v-if="needPaddingTop" :style="{paddingTop:height+'px'}"></view>
  </view>
</template>

<script>
  export default {
    props:{
      showGoBack:{
        type:Boolean,
        default:true
      },
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
  .padding-r
    padding-right 120rpx
  .head-box
    width: 100%;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 9998;
    .header-box
      display: flex;
      align-items center
      color #fff
  .toHomeBox
    margin-left 20rpx
    color #fff
    view
      flex 1
      text-align center
    .goBack
      transform rotate(180deg)
</style>
