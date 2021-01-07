<template>
  <view>
    <view :style="{'margin':px(config.mT)+' '+px(config.mR)+' '+px(config.mB)+' '+px(config.mL),padding:px(config.pT)+' '+px(config.pR)+' '+px(config.pB)+' '+px(config.pL),background:config.background,borderRadius:px(config.boxR)}">
      <view>
      </view>
      <view
          :class="{
    'levelone':config.list_num===1?true:false,
    'leveltwo':config.list_num===2?true:false,
    'levelthree':config.list_num===3?true:false
    }">
        <view @tap="to(item,index)" class="imgBox" v-for="(item,index) in options" :key="index">
          <image mode="widthFix" :style="{'borderRadius':px(config.r)}" :src="item.url" alt="" />
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
      to(item,index){
        if(!item.value){
          return
        }
        this.customTo(item, this.gm_Id)
      },
    },
    mounted() {
		console.log('aaa',this.options);
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
    width 100%
    .imgBox
      width 100%
      image
        width 100%
        vertical-align top
  .leveltwo
    display flex
    flex-wrap wrap
    .imgBox
      width 49%
      &:nth-child(2n)
        margin-left 2%
      &:nth-child(n+3)
        margin-top 15rpx
      image
        width 100%
  .levelthree
    display flex
    flex-wrap wrap
    .imgBox
      width 32%
      &:not(:nth-child(3n))
        margin-right 2%
      &:nth-child(n+4)
        margin-top 15rpx
      image
        width 100%
</style>
