<template>
  <view>
    <view>
      <view class="navs" :style="{
      'padding':px(config.p1)+' '+px(config.p2),
      'margin':px(config.mT)+' '+px(config.mL),
      'background':config.background,
      'borderRadius':px(config.r)
    }">
        <view :style="{width:100 / config.isNumber + '%'}" class="nav-item" v-for="(item,index) in options" @tap="navClick(item)">
          <view class="imgBox" v-if="config.nav!==1">
            <image :src="item.url"></image>
          </view>
          <view v-if="item.title" class="text-md mt-md">
            {{item.title}}
          </view>
        </view>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      gm_Id: [String, Number],
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
      navClick(item,index){
        if(this.config.is_mini){

        }else{
          if(!item.value){
            return
          }
          this.customTo(item, this.gm_Id)
        }
      }
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
        width 120rpx
        height 120rpx
        margin 0 auto
        /*border-radius 50%*/
        image
          width 100%
          height 100%
          border-radius 50%
</style>
