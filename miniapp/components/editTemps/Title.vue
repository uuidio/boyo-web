<template>
  <view>
    <view  :style="{
      'padding':px(config.pT)+' '+px(config.pR)+' '+px(config.pB)+' '+px(config.pL),
      'margin':px(config.mT)+' '+px(config.mR)+' '+px(config.mB)+' '+px(config.mL),
      'background':config.background,
      'borderRadius':px(config.boxR),
      'text-align':config.direction,
    }">
        <p class="main-tit">{{options[0].main_title}}</p>
        <p class="sub-tit" v-if="options[0].vice_title">{{options[0].vice_title}}</p>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      options:{
        type:Array,
        default:[]
      },
      config: Object,
    },
    data() {
      return {};
    },
    methods: {
      px(num){
        return uni.upx2px(num*2) + 'px'
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .main-tit
    font-size 32rpx
    color #333
    font-weight bold
  .sub-tit
    font-size 28rpx
    color #999
    margin-top 16rpx
</style>
