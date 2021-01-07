<template>
  <view>
    <view class="em-top-dropdown em-dropdown-box" :class="[show?'em-dropdown-show':'']"
          :style="{height:height?px(height):'auto', background: bgcolor,paddingBottom: px(paddingbtm),transform: 'translateZ(0) translateY('+(show?px(translatey):'-100%')+')'}">
      <slot></slot>
    </view>
    <view class="em-dropdown-mask" :class="[mask && show ?'em-mask-show':'']" @tap="handleClose"></view>
  </view>
</template>

<script>
export default {
  name: "TopDropdown",
  props: {
    //是否需要mask
    mask: {
      type: Boolean,
      default: true
    },
    //控制显示
    show: {
      type: Boolean,
      default: false
    },
    //背景颜色
    bgcolor: {
      type: String,
      default: "#f2f2f2"
    },
    //padding-bottom rpx
    paddingbtm: {
      type: Number,
      default: 0
    },
    //高度rpx
    height: {
      type: Number,
      default: 580
    },
    //移动距离 需要计算
    translatey: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleClose() {
      if (!this.show) {
        return;
      }
      this.$emit('close', {});
    },
    px(num) {
      return uni.upx2px(num) + "px"
    }
  }
}
</script>

<style lang="stylus" scoped>
.em-dropdown-box
  width: 100%;
  position: fixed;
  box-sizing: border-box;
  border-bottom-right-radius: 14rpx;
  border-bottom-left-radius: 14rpx;
  transform: translateZ(0);
  overflow: hidden;
  visibility: hidden;
  transition: all 0.3s ease-in-out;
  z-index: 989;
  top: 0;


.em-dropdown-show
  visibility: visible;


.em-dropdown-mask
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 986;
  transition: all 0.3s ease-in-out;
  opacity: 0;
  visibility: hidden;


.em-mask-show
  opacity: 1;
  visibility: visible;

</style>
