<template>
  <div>
    <div class="UploadBox">
      <div class="upload-image-list" v-for="(item, index) in uploadImageList" :key="index">
        <template v-if="item.status === 'finished'">
          <img :src="item.url">
          <div class="upload-image-list-cover">
            <a-icon type="eye" @click.native="handleView(item.url)"/>
            <a-icon type="delete" @click.native="handleRemove(item)"/>
          </div>
        </template>
        <template v-else>
          <a-progress v-if="item.showProgress" :percent="item.percentage" hide-info/>
        </template>
      </div>
      <Upload
        ref="upload"
        name="image"
        :headers="headers"
        :show-upload-list="false"
        :default-file-list="defaultImageList"
        :on-success="handleSuccess"
        :format="['jpg','jpeg','png']"
        :max-size="2048"
        :on-format-error="handleFormatError"
        :on-exceeded-size="handleMaxSize"
        :before-upload="handleBeforeUpload"
        :multiple=isMultiple
        type="drag"
        :action="uploadImageUrl"
        style="display: inline-block;width:60px">
        <div style="width: 58px;height: 58px;line-height: 58px;">
          <a-icon type="upload" size="20"/>
        </div>
      </Upload>
      <AlbumPics :isMultiple="true" :maximum="surplusNum" @selectOk="selectPics">
        <div class="ant-upload ant-upload-drag">
          <a-icon type="camera" size="20"/>
        </div>
      </AlbumPics>
    </div>
    <a-modal title="查看图片" v-model="visible">
      <img :src="imageUrl" v-if="visible" style="width: 100%">
      <div slot="footer"></div>
    </a-modal>
  </div>
</template>
<script>
import Server from '@/config/server';
import AlbumPics from '@C/album/pics';
import { Upload } from 'iview';
import { getAccessToken } from '@/utils/util';

export default {
  name: 'UploadImage',
  components: {
    AlbumPics,
    Upload,
  },
  props: {
    defaultImageList: Array,
    maximum: Number,
    shopId: Number,
  },
  data() {
    return {
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      uploadImageUrl: Server.baseURL + Server.action.upload_image,
      imageUrl: '',
      visible: false,
      isMultiple: this.maximum !== 1,
      uploadImageList: [],
      surplusNum: this.maximum - this.defaultImageList.length,
    };
  },
  methods: {
    handleView(url) {
      this.imageUrl = url;
      this.visible = true;
    },
    handleRemove(file) {
      const fileList = this.$refs.upload.fileList;
      this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
      this.uploadImageList = this.$refs.upload.fileList;
      this.surplusNum++;
    },
    handleSuccess(res, file) {
      console.log(JSON.stringify(res));
      if (res.code === 0) {
        file.url = res.result.pic_url;
        this.surplusNum--;
      } else {
        this.$notification.warning({
          message: 'Warning Notice',
          description: res.message,
        });
      }
    },
    handleFormatError() {
      this.$Notice.warning({
        message: 'The file format is incorrect',
        description: '上传文件格式不正确',
      });
    },
    handleMaxSize() {
      this.$Notice.warning({
        message: 'Exceeding file size limit',
        description: '上传文件过大.',
      });
    },
    handleBeforeUpload() {
      const check = this.uploadImageList.length < this.maximum;
      if (!check) {
        this.$notification.warning({
          message: 'Notice',
          description: `最多只能上传${this.maximum}张图片, 请删除后再上传`,
        });
      }
      return check;
    },
    selectPics(pics) {
      const _this = this;
      pics.forEach((pic) => {
        const imageItem = {
          status: 'finished',
          url: pic.pic_url,
        };
        _this.uploadImageList.push(imageItem);
        _this.surplusNum--;
      });
    },
  },
  mounted() {
    this.uploadImageList = this.$refs.upload.fileList;
  },
  watch: {
    defaultImageList() {
      this.uploadImageList = this.defaultImageList;
      this.surplusNum = this.surplusNum - this.uploadImageList.length;
    },
  },
};
</script>
<style lang="stylus" scoped>
  >>> .ant-upload.ant-upload-drag
    background #Fff

  >>> .ant-upload.ant-upload-drag .ant-upload
    padding 0

  .UploadBox
    display flex

  >>> .ivu-upload div
    height 60px
    line-height 60px

  .upload-image-list
    display: inline-block
    width: 60px
    height: 60px
    text-align: center
    line-height: 60px
    border: 1px solid transparent
    border-radius: 4px
    overflow: hidden
    background: #fff
    position: relative
    box-shadow: 0 1px 1px rgba(0, 0, 0, .2)
    margin-right: 4px

  .ivu-upload
    display: inline-block
    width: 60px
    height: 60px
    text-align: center
    line-height: 60px

  .upload-image-list img
    width: 100%
    height: 100%

  .upload-image-list-cover
    display: none
    position: absolute
    top: 0
    bottom: 0
    left: 0
    right: 0
    background: rgba(0, 0, 0, .6)

  .upload-image-list:hover .upload-image-list-cover
    display: block

  .upload-image-list-cover i
    color: #fff
    font-size: 20px
    cursor: pointer
    margin: 0 2px
</style>
