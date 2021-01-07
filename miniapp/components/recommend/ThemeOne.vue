<template>
  <view class="theme-one-box p-md pt-0">
    <view class="theme-one-item" v-for="(item,index) in recommend" :key="index">
      <view class="theme-title-box">
        <view class="theme-one-title">{{item.name}}</view>
        <view class="theme-one-price">
          <text class="theme-one-present">￥{{item.present}}</text>
          <text class="theme-one-original">￥{{item.original}}</text>
        </view>
      </view>
      <image :src="item.pic" class="theme-one-img"></image>
    </view>
  </view>
</template>

<script>
export default {
  name: "ThemeOne",
  props: {
    recommend: Array,
  },
  data() {
    return {
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../variable.styl';

.theme-one-box
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

.theme-one-item
  width: 49%;
  height: 200upx;
  padding: 0 20upx;
  box-sizing: border-box;
  display: flex;
  align-items: center;
  background: #f5f2f9;
  position: relative;
  margin-top: 2%;

.theme-title-box
  font-size: 24upx;

.theme-one-title
  line-height: 32upx;
  word-break: break-all;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;

.theme-one-price
  padding-top: 18upx;

.theme-one-present
  color: $font-color-primary;
  font-weight: bold;

.theme-one-original
  display: inline-block;
  color: $font-color-base;
  text-decoration: line-through;
  padding-left: 12upx;
  transform: scale(0.8);
  transform-origin: center center;

.theme-one-img
  width: 160upx;
  height: 160upx;
  display: block;
  flex-shrink: 0;

</style>
