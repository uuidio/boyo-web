<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="分类名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.gc_name">

        </a-input>
      </a-form-item>
      <a-form-item
        label="分类父ID"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.parent_id" defaultValue="0">
          <a-select-option class="option-first" :value="0">顶级分类</a-select-option>
          <a-select-option v-for="item in goodsClass" v-if="item.level < 3" :value="item.id">{{item.gc_name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="分类图标"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <UploadImage :defaultImageList="imageList" :shopId="0" :maximum="1" ref="uploadImage"></UploadImage>
        <p>*请上传200*200的图片</p>
      </a-form-item>
<!--      <a-form-item-->
<!--        label="类型关联"-->
<!--        :label-col="{ md: 4,xs:24 }"-->
<!--        :wrapper-col="{ md: 16,xs:24}"-->
<!--      >-->
<!--        <a-radio-group class="myGroup mt10" v-model="formItem.type_id" name="radioGroup" :defaultValue="0"-->
<!--        >-->
<!--          <a-radio style="display:block" :value="0">不关联</a-radio>-->
<!--          <a-radio :key="index" v-for="(item,index) in goodsType" :value="item.id">{{item.type_name}}</a-radio>-->
<!--        </a-radio-group>-->
<!--        <div>-->
<!--          是否关联到子分类-->
<!--          <a-switch v-model="goodsTypeCheck"/>-->
<!--        </div>-->
<!--      </a-form-item>-->
      <a-form-item
        label="是否隐藏"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.is_show" name="radioGroup" :defaultValue="0">
          <a-radio :value="0">隐藏</a-radio>
          <a-radio :value="1">显示</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="分类排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.listorder" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitClass" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  name: 'add',
  computed: {
    ...mapState({
      goodsClass: state => state.classify.lists,
      detail: state => state.classify.detail,
      goodsType: state => state.classify.goodsType,
    }),
  },
  components: {
    UploadImage,
  },
  methods: {
    ...mapActions({
      fetchLists: 'classify/fetchLists',
      addGoodsClass: 'classify/addGoodsClass',
      getDetail: 'classify/getDetail',
      editClass: 'classify/editClass',
      getGoodsType: 'classify/getGoodsType',
    }),
    submitClass() {
      if (this.formItem.type_id === 0) {
        this.formItem.type_name = 0;
        this.formItem.associated = 0;
      } else {
        this.formItem.associated = Number(this.goodsTypeCheck);
        for (let i = 0; i < this.goodsType.length; i++) {
          if (this.goodsType[i].id === this.formItem.type_id) {
            this.formItem.type_name = this.goodsType[i].type_name;
          }
        }
      }
      console.log(this.formItem);
      //
      const uploadImageList = this.$refs.uploadImage.uploadImageList;
      if (uploadImageList.length === 1) {
        this.formItem.class_icon = uploadImageList[0].url;
      }
      if (this.id === 0) {
        this.addGoodsClass({
          formItem: this.formItem,
        });
      } else {
        const postData = Object.assign(this.formItem, { id: this.id });
        this.editClass({ postData });
      }
    },
    initDetail() {
      if (this.detail.class_icon !== null) {
        this.imageList = [{ url: this.detail.class_icon, status: 'finished' }];
      }
      this.formItem = {
        gc_name: this.detail.gc_name,
        parent_id: this.detail.parent_id,
        class_icon: this.detail.class_icon,
        listorder: this.detail.listorder,
        is_show: this.detail.is_show,
        associated: this.detail.associated,
        type_id: this.detail.type_id,
        type_name: this.detail.type_name,
      };
    },
  },
  data() {
    return {
      id: 0,
      goodsTypeCheck: false,
      imageList: [],
      formItem: {
        gc_name: '',
        parent_id: 0,
        class_icon: '',
        listorder: 0,
        is_show: 0,
        associated: 0,
        type_name: '',
        type_id: 0,
      },
    };
  },
  mounted() {
    this.fetchLists();
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getDetail({ id: this.id });
    } else {
      this.getGoodsType();
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-select-dropdown-menu-item-selected
    font-weight normal

  >>> .option-first
    color #2d8cf0
</style>
