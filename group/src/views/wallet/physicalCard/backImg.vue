<template>
  <div class="content">
    <div class="list">
      <a-row type="flex" align="middle" class="mb20">
        <a-col :span="3">实体卡背景图</a-col>
        <a-col :span="5">
          <UploadImage :defaultImageList="wxImg" :maximum="1" ref="uploadImage"></UploadImage>
        </a-col>
        <a-col :span="6">
          <p style="color:#999">（建议尺寸：1010*638）</p>
        </a-col>
      </a-row>
    </div>
    <a-button type="primary" size="large" @click="save">确定</a-button>
  </div>
</template>

<script>
  import { mapActions, mapState } from 'vuex';
  import UploadImage from '@C/upload/UploadImage';

  export default {
    components: {
      UploadImage,
    },
    data() {
      return {
        wxImg: [],
      };
    },
    computed: {
      ...mapState({
        physicalImg: state => state.wallet.physicalImg,
      }),
    },
    mounted() {
      this.getPhysicalImg();
    },
    methods: {
      ...mapActions({
        getPhysicalImg: 'wallet/getPhysicalImg',
        savePhysicalImg: 'wallet/savePhysicalImg',
      }),
      save() {
        if (this.$refs.uploadImage.uploadImageList.length > 0) {
          this.savePhysicalImg({ physical_img: this.$refs.uploadImage.uploadImageList[0].url });
        } else {
          this.$message.error('请先选择或上传图片');
        }
      },
    },
    watch: {
      physicalImg() {
        this.wxImg = [{
          status: 'finished',
          url: this.physicalImg,
        }];
      },
    },
  };
</script>

<style scoped lang="stylus">
  .list {
    padding-bottom 20px
    .ant-row {
      margin-bottom 10px
    }
  }
</style>
