<template>
    <div>
        <Upload
                :name="option.name"
                ref='img_upload'
                :action="uploadImageUrl"
                :headers="headers"
                :show-file-list="false"
                :on-success="handleAvatarSuccess"
                :before-upload="beforeAvatarUpload">
            <a-button :loading="b_loading" type="primary" v-if="!form_params.url">{{button_name}}</a-button>
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
      button_name: '上传apk文件',
      b_loading: false,
      uploadImageUrl: '',
      headers: {
        Accept: 'application/json',
        Authorization: `Bearer ${getAccessToken()}`,
      },
      loading: false,
      fileList: [],
    };
  },
  methods: {
    // 上传图片代码----------------------------------------------------------------------------------
    // 上传成功
    handleAvatarSuccess(res, file) {
      if (res.code !== 0) {
        this.xx(res.message);
      } else {
        this.ok('上传成功');
        console.log(res.result);
        this.$emit('handleAvatarSuccess', res.result, this.get_suffix(file.name,'pre'));
      }
      this.button_name = '上传apk文件'
      this.b_loading = false
    },
    // 上传之前判断
    beforeAvatarUpload(file) {
      this.button_name = '上传中'
      this.b_loading = true
      const _this = this;
      console.log(this.get_suffix(file.name, 'last'));
      const isJPG = (this.get_suffix(file.name,'last') === '.apk');
      if (!isJPG) {
        this.$message.error('上传图片只能是 apk文件!');
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
      return isJPG;
    },
    // 上传图片代码++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
  },
  mounted() {
    this.uploadImageUrl = Server.baseURL + this.option.url
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
