<template>
  <view>
    <view class="imgLists">
      <view class="imgBox" :key="index" v-for="(item,index) in imgLists">
        <view @tap="deleteImg(index)" class="emfont icon-close delImg text-lg"></view>
        <image :src="item"></image>
      </view>
    </view>
    <view>
      <progress v-if="percent!==0" :percent="percent" stroke-width="3"></progress>
      <view class="update-img" @tap="upload">
        <view class="emfont icon-camera mb-xs"></view>
        <view>(最多五张)</view>
      </view>
    </view>
  </view>
</template>

<script>
  import { config } from "../../static/base/server2";
  export default {
    data() {
      return {
        percent:0,
        step:0,
        imgLists:[],
      };
    },
    props:{
      index:{
        type:Number,
        default:-1
      }
    },
    watch:{
      step(){
        if(this.index!==-1){
          const item = {
            index:this.index,
            lists:this.imgLists
          }
          this.$emit('on-img',item)
        }else{
          this.$emit('on-img',this.imgLists)
        }

      }
    },
    methods: {
      deleteImg(index){
        this.imgLists.splice(index,1)
        this.step--
      },
      upload(){
        const _this = this
        if(this.step === 5){
          uni.showToast({
            title: '最多上传5张图片',
            icon: 'none',
          })
          return
        }
        const _url = config.api_base_url + config.apiLinks.uploadImg.url
        let tempToken = uni.getStorageSync('user_token');
        const headers = {
          Accept: 'application/json',
          Authorization: `Bearer ${tempToken}`,
        }
        uni.chooseImage({
          count: 1,
          sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album'],
          success: (chooseImageRes) => {
            const tempFilePaths = chooseImageRes.tempFilePaths;
            const uploadTask =  uni.uploadFile({
              url: _url, //仅为示例，非真实的接口地址
              filePath: tempFilePaths[0],
              header:headers,
              name: 'image',
              success: (uploadFileRes) => {
                const item = JSON.parse(uploadFileRes.data)
                _this.imgLists.push(item.result.pic_url)
                _this.percent = 0
                _this.step++
              }
            });
            uploadTask.onProgressUpdate(function (res) {
              _this.percent = res.progress
            });
          }
        });
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .update-img
    width 160rpx
    height 160rpx
    border 1px dashed #666
    color #666
    border-radius 6rpx
    display flex
    flex-direction column
    align-items center
    justify-content center
    box-sizing border-box
  progress
    width 160rpx
  .imgLists
    display flex
    flex-wrap wrap
    .imgBox
      width 195rpx
      height 195rpx
      margin-right 20rpx
      margin-bottom 20rpx
      position relative
      image
        width 100%
        height 100%
      .delImg
        position absolute
        right 10rpx
        top 8rpx
        font-size 44rpx
        color #666
</style>
