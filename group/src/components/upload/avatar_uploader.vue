<template>
    <div>
        <Upload
                name="image"
                ref='img_upload'
                class="avatar-uploader"
                :action="uploadImageUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <img v-if="form_params.img" :src="form_params.img" class="avatar">
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </Upload>
    </div>
</template>
<script>
import Server from '@/config/server';
import { getAccessToken } from '@/utils/util';
import { Upload } from 'element-ui';

export default {
  name: 'UploadImage',
  components: {
    Upload,
  },
  props: {
    option: Object,
    form_params: Object,
  },
  data() {
    return {
      uploadImageUrl: Server.baseURL + Server.action.upload_image,
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      imgUrl: '',
      loading: false,
      fileList: [],
    };
  },
  methods: {
    // 上传图片代码----------------------------------------------------------------------------------
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code != 0) {
        this.xx(res.resultMsg);
      } else {
        this.ok('上传成功');
        console.log(res.result.pic_url);
        this.imgUrl = res.result.pic_url;
        this.$emit('handleAvatarSuccess', res.result.pic_url);
      }
    },
    // 上传之前判断
    beforeAvatarUpload(file) {
      console.log(file);
      const _this = this;
      const isJPG = (file.type === 'image/jpeg') || (file.type === 'image/jpg') || (file.type === 'image/png');
      const isLt1M = file.size / 1024 / 1024 < _this.option.size;
      // 图片
      if (!isJPG) {
        this.$message.error('上传图片只能是 JPG、JPEG、PNG格式图片!');
        return false;
      }
      if (!isLt1M) {
        this.$message.error(`上传图片大小不能超过${_this.option.size}MB!`);
        return false;
      }
      // 判断图片大小
      const isSize = new Promise(((resolve, reject) => {
        const _URL = window.URL || window.webkitURL;
        const img = new Image();
        img.onload = function () {
          const valid = img.width <= 600;
          valid ? resolve() : reject();
        };
        img.src = _URL.createObjectURL(file);
      })).then(() => file, () => {
        this.xx(_this.option.msg1);
        return Promise.reject();
      });
      return isJPG && isLt1M && isSize;
    },
    // 上传图片代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  },
  mounted() {

  },
  watch: {

  },
};
</script>
<style scoped>
  /*上传样式*/
  .avatar-uploader .el-upload {
    border: 1px dashed #d9d9d9;
    border-radius: 6px;
    cursor: pointer;
    position: relative;
    overflow: hidden;
  }
  .avatar-uploader .el-upload:hover {
    border-color: #409EFF;
  }
  .avatar-uploader-icon {
    font-size: 28px;
    color: #8c939d;
    width: 178px;
    height: 178px;
    line-height: 178px;
    text-align: center;
    border:
  }
  .avatar {
    width: 178px;
    height: 178px;
    display: block;
  }
  .avatar-uploader >>> .el-upload--text {
    border: 1px dashed #d9d9d9;
    border-radius: 8px;
  }
  .avatar-uploader >>> .el-upload--text:hover {
    border: 1px dashed #1890ff!important;
  }
</style>
