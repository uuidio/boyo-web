<template>
  <view>
    <view :style="{'margin':px(config.mT)+' '+px(config.mL),padding:px(config.p),background:config.background,borderRadius:px(config.boxR)}">
      <view>
        <view class="imgIP fxBox2  mb-md">
          <text class="text-16 fw700">热门推荐</text>
          <text class="col-666 text-sm" @tap="toLink('/pagesA/tvClass/index')">更多 <text class="emfont icon-right"></text></text>
        </view>
      </view>
      <view
          :class="{
          'levelone':config.list_num===1?true:false,
          'leveltwo':config.list_num===2?true:false,
          }">
        <view class="item" v-for="(item,index) in options" @tap="toLink('/pagesA/tvClass/detail')">
          <view class="imgBox">
            <image mode="widthFix" :style="{'borderRadius':px(config.r)}" :src="item.url" alt="" />
          </view>
          <view class="textBox">
            <view class="line2-p fw700" data-line="1" v-if="item.title">{{item.title}}</view>
          </view>
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
  .imgIP
    position relative
    margin-bottom 5px
    padding-left 10px
    &::after
      content ''
      height:14px
      width 4px
      background:rgba(255,74,65,1)
      border-radius:4px
      position absolute
      top 50%
      left 0
      transform translateY(-50%)
  .levelone
    display flex
    flex-wrap wrap
    .item
      width 49%
      &:nth-child(2n)
        margin-right 2%
      &:first-child
        width 100%
        margin-top 0
  .leveltwo
    display flex
    flex-wrap wrap
    .item
      width 49%
      &:nth-child(2n)
        margin-left 2%
  .item
     .imgBox
        width 100%
        image
          width 100%
     .textBox
        line-height 48rpx
</style>
