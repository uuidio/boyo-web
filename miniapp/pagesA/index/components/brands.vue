<template>
  <view>
    <view class="brands-box">
      <view class="home-title-box">
        <view class="home-title">
          品牌推荐
        </view>
      </view>
      <view class="brands-items1">
        <view class="imgBox" v-for="(item,index) in listsData" :key="index" @click="brandClick(item)">
          <image mode="widthFix" :src="item.image_url"></image>
        </view>
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
            return {

            };
        },
        methods: {
          brandClick(item){
            if(item.show_type==='shop'){
              if(item.value!==''){
                this.toQueryLink('/pagesA/brand/lists',{shopid:item.value})
              }
            }else{
             if(item.show_type){
               const _url = '/pagesB/activity/'+item.show_type
               this.toLink(_url)
             }
            }
          }
        },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
.brands-box
  padding 40rpx 20rpx
.brands-items1
  display flex
  margin-top 20rpx
  flex-wrap wrap
  justify-content space-between
  .imgBox
    width 24%
    margin-bottom 10rpx
    &:nth-child(1),&:nth-child(2)
      width 49%
    image
      width 100%
      border-radius 4px
</style>
