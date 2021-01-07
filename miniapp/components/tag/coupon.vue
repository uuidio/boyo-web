<template>
  <view class="coupon" :class="[{'bg-orange': type === 0},'coupon--' + size]">
    <i></i><slot></slot><i></i>
  </view>
</template>

<script>
export default {
  name: 'TagCoupon',
  props: {
    type: {
      type: Number,
    },
    size: {
      // 标签大小 lg, md, xs
      type: String,
      default: 'md',
    },
  },
  created(){
    console.log(this.type, 888)
  }
};
</script>

<style lang="stylus" scoped>
@import "../../variable.styl"

$tag-sm-pd = 8rpx 30rpx;
$tag-md-pd = 16rpx 40rpx;
$tag-lg-pd = 24rpx 60rpx;

$radius-sm = 10rpx
$radius-md = 16rpx
$radius-lg = 20rpx

.coupon
  background: -moz-linear-gradient(left, #FF5E5E 0, #FF927C 100%);
  background: -webkit-gradient(linear, left top, left right, color-stop(0, #FF5E5E), color-stop(100%, #FF927C));
  background: -webkit-linear-gradient(left, #FF5E5E 0, #FF927C 100%);
  background: -o-linear-gradient(left, #FF5E5E 0, #FF927C 100%);
  background: -ms-linear-gradient(left, #FF5E5E 0, #FF927C 100%);
  background: linear-gradient(to left, #FF5E5E 0, #FF927C 100%);
  position: relative;
  z-index: 1;
  zoom: 1;
  font-style: normal;
  border-radius: 3px;
  -moz-border-radius: 3px;
  -webkit-border-radius: 3px;
  -o-border-radius: 3px;
  -ms-border-radius: 3px;
  font-size: $font-base;
  padding: $tag-md-pd;
  text-align: center;
  color: #fff;
  display: inline-flex;

  &:before
    position: absolute;
    z-index: 1;
    zoom: 1;
    top: 50%;
    background: #fff;
    display: inline-flex;
    content: "";
    border: 1px solid #fff;
    left: auto;
    margin-top: -($radius-md / 2);
    width: $radius-md;
    height: $radius-md;
    border-radius: ($radius-md * 2);
    right: -($radius-md / 2 + 2);

  &:after
    position: absolute;
    z-index: 1;
    zoom: 1;
    top: 50%;
    background: #fff;
    display: inline-flex;
    content: "";
    border: 1px solid #fff;
    margin-top: -($radius-md / 2);
    width: $radius-md;
    height: $radius-md;
    border-radius: ($radius-md * 2);
    left: -($radius-md / 2 + 2);

  &--sm
    font-size: $font-sm;
    padding: $tag-sm-pd;
    &:before
      margin-top: -($radius-sm / 2 + 1);
      width: $radius-sm;
      height: $radius-sm;
      border-radius: ($radius-sm * 2);
      right: -($radius-sm / 2 + 3);
    &:after
      margin-top: -($radius-sm / 2 + 1);
      width: $radius-sm;
      height: $radius-sm;
      border-radius: ($radius-sm * 2);
      left: -($radius-sm / 2 + 3);

  &--lg
    font-size: $font-l;
    padding: $tag-lg-pd;
    &:before
      margin-top: -($radius-lg / 2 + 1);
      width: $radius-lg;
      height: $radius-lg;
      border-radius: ($radius-lg * 2);
      right: -($radius-lg / 2);
    &:after
      margin-top: -($radius-lg / 2 + 1);
      width: $radius-lg;
      height: $radius-lg;
      border-radius: ($radius-lg * 2);
      left: -($radius-lg / 2);
	  
.bg-orange
	background: -moz-linear-gradient(left, #fdc830 0, #ff7c3d 100%);
	background: -webkit-gradient(linear, left top, left right, color-stop(0, #fdc830), color-stop(100%, #ff7c3d));
	background: -webkit-linear-gradient(left, #fdc830 0, #ff7c3d 100%);
	background: -o-linear-gradient(left, #fdc830 0, #ff7c3d 100%);
	background: -ms-linear-gradient(left, #fdc830 0, #ff7c3d 100%);
	background: linear-gradient(to left, #fdc830 0, #ff7c3d 100%);
  
</style>
