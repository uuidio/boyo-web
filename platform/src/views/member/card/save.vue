<template>
    <div class="content">
      <a-form
        :model="formItem"
      >
        <a-form-item
          label="卡代码"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.card_code"/>
        </a-form-item>
        <a-form-item
          label="卡名称"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.card_name"/>
        </a-form-item>
        <a-form-item
        label="卡等级"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.level" placeholder="卡等级"/>
      </a-form-item>
        <a-form-item
          label="卡照片"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
           <UploadImage :defaultImageList="imageList" :shopId="0" :maximum="1" ref="uploadImage"></UploadImage>
        </a-form-item>
        <a-form-item
          :wrapper-col="{offset:4,md: 12 ,xs:24}"
        >
          <a-button @click="btnSubmit" type="primary">提交</a-button>
          <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script>
import { mapActions,mapState  } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  name: 'add',
  computed: {
    ...mapState({
      detail: state => state.member.detail,
    }),
  },
  components: {
    UploadImage,
  },
  data() {
    return {
      imageList: [],
      id:0,
      formItem: {
        card_code: '',
        card_name: '',
        card_img: '',
        level:1,
      },
    };
  },
  methods: {
    ...mapActions({
      addCard: 'member/addCard',
      getDetail: 'member/getDetail',
    }),
    btnSubmit() {
      const uploadImageList = this.$refs.uploadImage.uploadImageList;
      if (uploadImageList.length === 1) {
        this.formItem.card_img = uploadImageList[0].url;
      }
      if (this.id>0) {
        this.formItem.id = this.id;
      }
      this.addCard({
        formItem: this.formItem,
      });
    },
    initDetail() {
      if (this.detail.card_img !== null) {
        this.imageList = [{ url: this.detail.card_img, status: 'finished' }];
      }
      this.formItem = {
        card_code: this.detail.card_code,
        card_name: this.detail.card_name,
        card_img: this.detail.card_img,
        level: this.detail.level,
      };
      console.log(this.detail.card_code);
    },
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getDetail({ id: this.id });
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped>

</style>
