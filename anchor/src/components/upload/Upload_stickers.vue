<template>
  <div>
    <div class="UploadBox">
      <Upload
        :data="upload_data"
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
        :action="uploadImageUrl"
        style="display: inline-block;">
        <slot name="button">
          <!--          <a-button class="mr10" icon="download" type="primary" @click="selectBtn">导出勾选的数据</a-button>-->
        </slot>
      </Upload>
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
  import {Upload} from 'iview';
  import {getAccessToken} from '@/utils/util';

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
      tag_id: [String, Number]
    },
    data() {
      return {
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${getAccessToken()}`,
        },
        // accept:'image/*',
        uploadImageUrl: Server.baseURL + 'v1/tag/image/add',
        imageUrl: '',
        visible: false,
        isMultiple: this.maximum !== 1,
        uploadImageList: [],
        upload_data: {},
      };
    },
    methods: {
      handleView(url) {
        this.imageUrl = url;
        this.visible = true;
      },
      handleRemove(file) {
        console.log(file)
        const fileList = this.$refs.upload.fileList;
        this.$refs.upload.fileList.splice(fileList.indexOf(file), 1);
        this.uploadImageList = this.$refs.upload.fileList;
        this.surplusNum++;
      },
      handleSuccess(res, file) {
        console.log(res)
        if (res.code === 0) {
          file.url = res.result.pic_url;
          this.uploadImageList = this.$refs.upload.fileList;
          this.surplusNum--;
          this.ok('上传成功')
          this.$emit('get_table_list');
        } else {
          this.$notification.warning({
            message: 'Warning Notice',
            description: res.message,
          });
        }
      },
      handleFormatError() {
        this.$notification.warning({
          message: 'The file format is incorrect',
          description: '上传文件格式不正确',
        });
      },
      handleMaxSize() {
        this.$notification.warning({
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
      // this.uploadImageList = this.$refs.upload.fileList;
      this.upload_data = { tag_id: this.tag_id }
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
