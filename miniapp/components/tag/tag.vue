<template>
  <view
      v-if="text"
      :class="[
      disabled === true || disabled === 'true' ? 'em-tag--disabled' : '',
      inverted === true || inverted === 'true' ? 'em-tag--inverted' : '',
      circle === true || circle === 'true' ? 'em-tag--circle' : '',
      'em-tag--' + size,
      'em-tag--' + type,
      'em-tag--mark-' + mark,
    ]"
      class="em-tag"
      @click="onClick()"
  >
    {{ text }}
  </view>
</template>

<script>
export default {
  name: 'EmTag',
  props: {
    type: {
      // 标签类型 default、primary、success、warning、danger、royal, dark
      type: String,
      default: 'default',
    },
    size: {
      // 标签大小 lg, md, xs
      type: String,
      default: 'md',
    },
    // 标签内容
    text: {
      type: String,
      default: '',
    },
    disabled: {
      // 是否为禁用状态
      type: [String, Boolean],
      default: false,
    },
    inverted: {
      // 是否为空心
      type: [String, Boolean],
      default: false,
    },
    circle: {
      // 是否为圆角样式
      type: [String, Boolean],
      default: false,
    },
    mark: {
      // 是否为标记样式 left, right
      type: String,
      default: '',
    },
  },
  methods: {
    onClick() {
      if (this.disabled === true || this.disabled === 'true') {
        return;
      }
      this.$emit('click');
    },
  },
};
</script>

<style lang="stylus" scoped>
@import "../../variable.styl"

$tag-sm-pd = 0rpx 10rpx;
$tag-md-pd = 8rpx 24rpx;
$tag-lg-pd = 12rpx 32rpx;
tag-disabled()
  opacity: 0.5;

.em-tag
  box-sizing: border-box;
  padding: $tag-md-pd;
  font-size: $font-sm;
  display: inline-flex;
  align-items: center;
  color: $em-text-color;
  border-radius: $em-border-radius-base;
  background-color: $em-bg-color-grey;
  border: 1px solid $em-bg-color-grey;

  &--circle
    border-radius: 30rpx;

  &--mark-left
    border-radius: 0 30rpx 30rpx 0;

  &--mark-right
    border-radius: 30rpx 0 0 30rpx;

  &--disabled
    tag-disabled();

  &--sm
    padding: $tag-sm-pd;
    font-size: $font-xs;
    border-radius: 6rpx;

    &.em-tag--circle
      border-radius: 20rpx;

    &.em-tag--mark-left
      border-radius: 0 20rpx 20rpx 0;

    &.em-tag--mark-right
      border-radius: 20rpx 0 0 20rpx;

  &--lg
    height: 60rpx;
    padding: $tag-lg-pd;
    line-height: 60rpx;
    font-size: $font-lg;

  &--primary
    color: $em-text-color-inverse;
    background-color: $em-color-primary;
    border: 1px solid $em-color-primary;

    &.em-tag--inverted
      color: $em-color-primary;
      background-color: $em-bg-color;
      border: 1px solid $em-color-primary;

  &--success
    color: $em-text-color-inverse;
    background-color: $em-color-success;
    border: 1px solid $em-color-success;

    &.em-tag--inverted
      color: $em-color-success;
      background-color: $em-bg-color;
      border: 1px solid $em-color-success;

  &--warning
    color: $em-text-color-inverse;
    background-color: $em-color-warning;
    border: 1px solid $em-color-warning;

    &.em-tag--inverted
      color: $em-color-warning;
      background-color: $em-bg-color;
      border: 1px solid $em-color-warning;

  &--dark
    color: $em-text-color-inverse;
    background-color: $em-color-dark;
    border: 1px solid $em-color-dark;

    &.em-tag--inverted
      color: $em-color-dark;
      background-color: $em-bg-color;
      border: 1px solid $em-color-dark;

  &--error
    color: $em-text-color-inverse;
    background-color: $em-color-error;
    border: 1px solid $em-color-error;

    &.em-tag--inverted
      color: $em-color-error;
      background-color: $em-bg-color;
      border: 1px solid $em-color-error;

  &--inverted
    color: $em-text-color;
    background-color: $em-bg-color;
    border: 1px solid $em-bg-color-grey;

</style>
