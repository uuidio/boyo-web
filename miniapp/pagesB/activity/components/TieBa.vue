<template>
  <view>
    <view :style="{'margin':px(config.mT)+' '+px(config.mL),padding:px(config.p),background:config.background}">
      <view>
        <view class="imgIP fxBox2  mb-md">
          <text class="text-16 fw700">话题社</text>
          <text  class="col-666 text-sm" @tap="toLink('/pagesA/postBar/lists')">更多 <text class="emfont icon-right"></text></text>
        </view>
      </view>
      <view class="tieBaBox">
        <view @tap="toLink('/pagesA/postBar/index')" v-for="(item,index) in options" class="item" :style="{borderRadius:px(config.boxR)}">
          <view class="imgBox">
            <image :style="{borderRadius:
            px(config.boxR)+' '+
            0+' '+0+' '+px(config.boxR)
            }" :src="urls[index]"></image>
          </view>
          <view class="textBox">
            <view class="mb-sm text-md">
              {{item.title}}
            </view>
            <view class="p2 col-666">
              主题：{{item.zt}}
            </view>
            <view class="p2 col-666">
              帖子：{{item.tz}}
            </view>
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  const urls = ['https://bbc-test.gdalpha.com/images/mjxd.png','https://bbc-test.gdalpha.com/images/xyy.png','https://bbc-test.gdalpha.com/images/bkx.png','https://bbc-test.gdalpha.com/images/cjfx.png']
  export default {
    props: {
      options:{
        type:Array,
        default:[]
      },
      config: Object,
    },
    data() {
      return {
        urls
      };
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
  .tieBaBox
    display flex
    flex-wrap wrap
    .item
      width 49%
      border 1px solid #e8e8e8
      border-left 0
      display flex
      box-sizing border-box
      overflow hidden
      .textBox
        padding 10rpx
        padding-left 20rpx
        flex 1
        .p2
          font-size 22rpx
      &:nth-child(2n)
        margin-left 2%
      &:nth-child(n+3)
        margin-top 20rpx
      .imgBox
        width 140rpx
        height 140rpx
        image
          width 100%
          height 100%
</style>
