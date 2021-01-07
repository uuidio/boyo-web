<template>
  <view>
     <view @tap="showModel = true">
       <slot></slot>
     </view>
    <view class="ex-model">
      <tui-modal :show="showModel" :width="70"  :custom="true" @cancel="showModel=false">
        <view class="content-box">
          <rich-text :nodes="content"></rich-text>
        </view>
        <view class="ex-close">
          <text @tap="showModel=false" class="emfont icon-roundclose text-30 col-fff"></text>
        </view>
      </tui-modal>
    </view>
  </view>
</template>

<script>
  import tuiModal from '../modal/modal'

  export default {
    components:{
      tuiModal
    },
    props:{
      content:{
        type:String,
        default:''
      }
    },
    data() {
      return {
        showModel:false
      };
    },
    methods: {},
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .ex-model
    .content-box
      height 600rpx
      overflow-y scroll
    .ex-close
      position absolute
      bottom -80rpx
      left 50%
      transform translateX(-50%)
</style>
