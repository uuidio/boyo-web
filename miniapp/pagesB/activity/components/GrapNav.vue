<template>
  <view>
    <view class="navs" :style="{
      'padding':px(config.p),
      'margin':px(config.mT)+' '+px(config.mL),
      'background':config.background,
      'borderRadius':px(config.m)
    }">
      <view class="nav-item" v-for="(item,index) in options">
        <view class="imgBox">
          <image :src="item.url"></image>
        </view>
        <view class="text-md mt-md">
          {{item.title}}
        </view>
      </view>
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
  .navs
    display flex
    flex-wrap wrap
    .nav-item
      width 25%
      text-align center
      .imgBox
        width 100rpx
        height 100rpx
        margin 0 auto
        image
          width 100%
          height 100%
          border-radius 50%
</style>
