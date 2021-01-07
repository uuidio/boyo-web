<template>
  <view class="hotClassify">
    <view class="home-title-box">
      <view class="home-title">
        热门分类
      </view>
    </view>
    <view class="classify">
      <view class="imgBox" v-for="(item,index) in listsData" :key="index" @tap="hotClick(item)">
        <image mode="widthFix" :src="item.image_url"></image>
      </view>
    </view>
  </view>
</template>

<script>
    export default {
        props:{
            listsData:{
                type: Array,
                default:[],
            },
        },
        data() {
            return {};
        },
        methods: {
          hotClick(item){
            if(item.show_type==='class'){
              if(item.value!==''){
                this.toQueryLink('/pagesA/goods/lists',{gc_id:item.value})
              }
            }else{
              if(item.show_type){
                const _url = '/pagesB/activity/'+item.show_type
                this.toLink(_url)
              }
            }
            console.log(item)
          }
        },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
.hotClassify
  .classify
    padding  20rpx 20rpx 15rpx
    border-radius #fff
    display flex
    flex-wrap wrap
    justify-content space-between
    margin 20rpx 0rpx 0
    background #fff
    box-sizing border-box
    width 100%
    .imgBox
      width 32%
      padding-bottom 8rpx
      box-sizing border-box
      image
        width 100%
    .imgBox:not(:nth-child(3n))
      margin-right 2%
</style>
