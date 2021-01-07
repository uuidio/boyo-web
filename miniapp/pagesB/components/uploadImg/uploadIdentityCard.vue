<template>
  <view>
    <view class="upload-img-box" @tap="upload">
      <progress v-if="percent!==0" :percent="percent" stroke-width="3"></progress>
      <image  v-if="type === 'front'" :class="{'hide-img': uploadImg}" class="box-bg front " mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202005/15/GlCcxjdbaOHQ02L8LUxdgFa2DjYVrmIXVjzKWq6p.png"></image>
      <image :class="{'hide-img': uploadImg}" v-if="type === 'back'" class="box-bg back" mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202005/15/nDsoFTNmBI5d3PzU7Vr2TpiUzkn6lzlPwlGG6m5u.png"></image>
      <image v-if="uploadImg" class="upload-img" :src="uploadImg"></image>
    </view>
    <view class="upload-label text-12 text-center">
      {{type === 'front' ? '点击上传带头像一面' : '点击上传带国徽一面'}}
    </view>
  </view>
</template>

<script>
  import { config } from "../../../static/base/server2";
  export default {
    data() {
      return {
        uploadImg: '',
        percent:0,
      };
    },
    props:{
      type: {
        type:String,
        default: 'front'
      },
    },
    watch:{
    },
    methods: {
      upload(){
        const _this = this
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
                _this.uploadImg = item.result.pic_url
                _this.$emit('on-img',_this.uploadImg)
                _this.percent = 0
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
  .upload-img-box
    border 1px dashed #666
    box-sizing border-box
    position  relative
    .box-bg
      width 100%
      vertical-align top
      &.hide-img
        opacity 0
    .upload-img
      width 100%
      height 100%
      position absolute
      left 0
      top 0
  .upload-label
    margin 24rpx 0 12rpx
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
    /*width 160rpx*/
    position absolute
    top 0
    left 0
    width 100%
    z-index 1
</style>
