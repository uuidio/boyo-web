<template>
    <div class="mr24">
      <a-card :title="detail.shop_name" :bordered="false">
        <a-row>
          <a-col class="setting_img" :md="8" :xs="24">
            <UploadImage :defaultImageList="imageLists"  :maximum="1" ref="uploadThumbImage"></UploadImage>
            <p class="setting_p">门店logo尺寸标准：300*300 px</p>
          </a-col>
          <a-col :md="16" :xs="24">
            <div class="mb20">
              <h4 class="mb10">门店名称：</h4>
              <a-input style="width:300px" placeholder="请输入门店名称" v-model="formItem.shop_name"/>
            </div>
            <div class="mb20">
              <h4 class="mb10">门店号码：</h4>
              <a-input style="width:300px" type="number" placeholder="请输入门店号码"  v-model="formItem.shop_phone"/>
            </div>
            <div class="mb20">
              <h4 class="mb10">门店banner图：</h4>
              <UploadImage :defaultImageList="imgs" :maximum="5"  ref="uploadBannerImage"></UploadImage>
            </div>
             <h4 class="mb10">门店描述：</h4>
             <a-textarea v-model="formItem.company_name" :rows="4" />
          </a-col>
        </a-row>
        <template class="ant-card-actions" slot="actions">
          <a-button @click="subSetting" type="primary">保存</a-button>
        </template>
      </a-card>
    </div>
</template>

<script>
import UploadImage from '@C/upload/UploadImage';
import { mapState, mapActions } from 'vuex';

export default {
  name: 'setting',
  components: {
    UploadImage,
  },
  computed: {
    ...mapState({
      detail: state => state.shop.detail,
    }),
  },
  data() {
    return {
      title: '小幸运',
      imageLists: [],
      brandImgs:[],
      formItem: {
        shop_name: '',
        shop_logo: '',
        company_name: '',
        shop_banner:[],
        shop_phone:'',
      },
      imgs:[]
    };
  },
  methods: {
    ...mapActions({
      editShopInfo: 'shop/editShopInfo',
      getDetail: 'shop/getDetail',
    }),
    subSetting() {
      const uploadThumbImage = this.$refs.uploadThumbImage.uploadImageList;
      const bannerImgs = this.$refs.uploadBannerImage.uploadImageList;
      this.formItem.shop_banner = bannerImgs
      if (uploadThumbImage.length === 1) {
        this.formItem.shop_logo = uploadThumbImage[0].url;
      }
      if(this.formItem.shop_banner.length===0){
        this.formItem.shop_banner = ''
      }
      this.editShopInfo({
        formItem: this.formItem,
      });
    },
    initDetail() {
      this.imageLists = [{ url: this.detail.shop_logo, status: 'finished' }];
      if(this.detail.shop_banner){
        this.imgs = this.detail.shop_banner
      }
      this.formItem.company_name = this.detail.company_name;
      this.formItem.shop_phone = this.detail.shop_phone
      this.formItem.shop_name = this.detail.shop_name;
    },
  },
  mounted() {
    this.getDetail();
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped lang="stylus">
.setting_p
  padding-top 10px
  font-size 14px
  color #666
.setting_img
  text-align center
  min-height 130px
  display flex
  flex-direction column
  justify-content center
  >>>.UploadBox
    justify-content center
>>>.ant-card-actions
  background #fff
  >li
   padding-left 20px
   text-align left
</style>
