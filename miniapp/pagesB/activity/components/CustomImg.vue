<template>
  <view>
    <view :style="{'margin':px(config.mT)+' '+px(config.mR)+' '+px(config.mB)+' '+px(config.mL),padding:px(config.pT)+' '+px(config.pR)+' '+px(config.pB)+' '+px(config.pL),background:config.background,borderRadius:px(config.boxR)}">
      <view>
        <view class="imgIP fxBox2  mb-md" v-if="config.imgType==='IP'">
          <text class="text-16 fw700">IP故事</text>
          <text class="col-666 text-sm" @tap="toLink('/pagesA/IPtale/index')">更多 <text class="emfont icon-right"></text></text>
        </view>
      </view>
      <view
          :class="{
    'levelone':config.list_num===1?true:false,
    'leveltwo':config.list_num===2?true:false,
    'levelthree':config.list_num===3?true:false
    }">
        <view @tap="to(item)" class="imgBox" :style="{
        'margin-top': config.list_num == 1 ? (index >= 1 ? config.p+'px' : 0) : config.list_num == 2 ? (index >= 2 ? config.p+'px' : 0) : config.list_num == 3 ? (index >= 3 ? config.p+'px' : 0) : 0, 'width': config.list_num == 1 ? '100%' : config.list_num == 2 ? (100-config.m)/2 + '%' : (100-config.m*2)/3 + '%', 'margin-left': config.list_num == 2 ? ((index+1) % 2 == 0  ? config.m+'%' : 0) : 0, 'margin-right': config.list_num == 3 ? ((index+1) % 3 != 0  ? config.m+'%' : 0) : 0}" v-for="(item,index) in options" :key="index">
          <image mode="widthFix" :style="{'borderRadius':px(config.r)}" :src="item.url" alt="" />
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
      to(item){

        console.log(item)
        if(this.config.imgType==='IP'){
          this.toLink('/pagesA/IPtale/detail')
        }else{
          if(!item.value){
            return
          }
          this.customTo(item)
        }
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
      /*width 49%*/
      /*&:nth-child(2n)*/
      /*  margin-left 2%*/
      /*&:nth-child(n+3)
        margin-top 15rpx*/
      image
        width 100%
  .levelthree
    display flex
    flex-wrap wrap
    .imgBox
      /*width 32%
      &:not(:nth-child(3n))
        margin-right 2%
      &:nth-child(n+4)
        margin-top 15rpx*/
      image
        width 100%
</style>
