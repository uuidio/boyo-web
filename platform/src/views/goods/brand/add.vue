<template>
  <div class="content">
    <div class="components-wrap">
      <a-form :model="formItem" :label-width="80">
        <a-form-item
          label="品牌名称"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.brand_name" placeholder="品牌名称"/>
        </a-form-item>
        <a-form-item
          label="选择分类"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-select v-model="formItem.class_id" style="width:200px">
            <a-select-option :value="0">无分类</a-select-option>
            <a-select-option v-for="item in goodsClass" :value="item.id" :key="item.id" v-if="item.level < 2">
              {{ item.gc_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="品牌LOGO"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <UploadImage :defaultImageList="imageList" :shopId="0" :maximum="1" ref="uploadImage"></UploadImage>
          <p>请上传100px*50px的图片</p>
        </a-form-item>
        <a-form-item
          label="是否推荐"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-radio-group v-model="formItem.is_recommend">
            <a-radio :value="1">是</a-radio>
            <a-radio :value="0">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="品牌描述"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.description" type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                 placeholder="品牌描述..."/>
        </a-form-item>
        <a-form-item
          label="排序"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-input v-model="formItem.listorder" placeholder="排序"/>
        </a-form-item>
        <a-form-item  :wrapper-col="{offset:4}">
          <a-button type="primary" @click="handleSubmit">提交</a-button>
          <a-button class="ml10" @click="$router.back(-1)">返回</a-button>
        </a-form-item>
      </a-form>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from "vuex";
  import UploadImage from "@C/upload/UploadImage";

  export default {
    name: "add",
    components: {
      UploadImage
    },
    data() {
      return {
        id: 0,
        imageList: [],
        formItem: {
          brand_name: "",
          class_id: 0,
          brand_logo: "",
          description: "",
          is_recommend: 0,
          listorder: 0
        }
      };
    },
    computed: {
      ...mapState({
        detail: state => state.brand.detail,
        goodsClass: state => state.classify.lists
      })
    },
    methods: {
      ...mapActions({
        getGoodsClass: "classify/fetchLists",
        getDetail: "brand/getDetail",
        addBrand: "brand/addBrand",
        editBrand: "brand/editBrand"
      }),
      handleSubmit() {
        let uploadImageList = this.$refs.uploadImage.uploadImageList;
        if (uploadImageList.length === 1) {
          this.formItem.brand_logo = uploadImageList[0].url;
        }
        if (this.id === 0) {
          this.addBrand({ formItem: this.formItem });
        } else {
          let postData = Object.assign(this.formItem, { id: this.id });
          this.editBrand({ postData });
        }
      },
      initDetail() {
        this.imageList = [{ url: this.detail.brand_logo, status: "finished" }];
        this.formItem = {
          brand_name: this.detail.brand_name,
          class_id: this.detail.class_id,
          brand_logo: this.detail.gc_name,
          description: this.detail.description,
          is_recommend: this.detail.is_recommend,
          listorder: this.detail.listorder
        };
      }
    },
    mounted() {
      let actionCol = 0;
      this.getGoodsClass({ actionCol });
      if (this.$route.params.id !== undefined) {
        this.id = this.$route.params.id;
        this.getDetail({ id: this.id });
      }
    },
    watch: {
      detail() {
        this.initDetail();
      }
    }
  };
</script>
<style lang="stylus" scoped>
</style>
