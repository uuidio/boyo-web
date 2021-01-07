<template>
  <view>
    <view class="navs-list"  :style="{
      padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px',
      'background':config.background
    }">
      <view class="nav-item item-img" v-if="config.nav == 0" v-for="(item,index) in options" @tap="navClick(item,index)" :key="index">
        <view class="imgBox">
          <image :src="item.url" :style="{'borderRadius':px(config.r)}"></image>
        </view>
      </view>
      <view class="nav-item item-txt" v-if="config.nav == 1" v-for="(item,index) in options" @tap="navClick(item,index)" :key="index">
        <view class="nav-tit" :style="{'background':config.background,'color': item.active ? config.wordActiveColor : config.wordColor,'fontSize': item.active ? '30rpx' : '28rpx'}">
          {{item.title}}
        </view>
      </view>
      <view class="nav-item" :style="{width:config.mL + config.pL+'px',marginLeft: 0,opacity: 0}">
        1
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
        if(this.config.nav === 0){

        }else if (this.config.nav === 1){
          console.log(this.options, 99)
          console.log(item, index, 99)
          for(let i = 0; i < this.options.length; i++){
            this.options[i].active = false
            if(index === i){
              if(this.options[i].active){
                return false;
              }else{
                this.options[i].active = true
                // this.$forceUpdate()
              }
            }
          }
        }
        if(!item.value){
          return
        }
        this.customTo(item, this.gm_Id)
      }
    },
    mounted() {
    },
    watch:{
      options(val){
        cosnole.log(val, 888)
        this.options = val
      },
    }
  };
</script>

<style scoped lang="stylus">
  .navs-list
    display flex
    flex-wrap nowrap
    overflow-x auto
    overflow-y: hidden;
    .nav-item
      flex-shrink 0
      &.item-img
        width 260rpx
        text-align center
        &+.nav-item
          margin-left 8rpx
        .imgBox
          width 260rpx
          height 120rpx
          image
            width 100%
            height 100%
            vertical-align top
      &.item-txt
        &+.nav-item
          margin-left 40rpx
        .nav-tit
          font-size 28rpx
          color #333
</style>
