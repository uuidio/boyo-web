<template>
    <div>
       <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">导航组件</div>
      <div class="navRadio">
        <a-radio-group name="radioGroup" v-model="config.navRadio">
          <a-radio :value="0">图片加文字导航</a-radio>
          <a-radio :value="1">图片导航</a-radio>
        </a-radio-group>
      </div>
      <ul class="swiper_images">
        <li :key="index" v-for="(item,index) in showItem">
          <a-popconfirm title="确认删除该数据?" @confirm="imgItemDel(index)" okText="确认" cancelText="取消">
            <div class="item_del">
              <em-icon type="icon-close-circle"></em-icon>
            </div>
          </a-popconfirm>
          <div class="swiper_img">
            <img :src="item.url" alt="">
          </div>
          <div class="swiper_txt">
            <div v-if="config.navRadio===0">
              <span>导航标题</span>
              <a-input v-model="item.title" placeholder="建议十个字以内,可不填" class="swiper_inp"/>
            </div>
            <div>
              <span>跳转路径</span>
              <urlSelect :link-index="index" :link-item="item.link"></urlSelect>
            </div>
          </div>
        </li>
      </ul>
        <div class="image-add"  @click="showImgModel">
          <p>+添加一个导航图片</p>
          <p>建议尺寸80*80像素</p>
        </div>
      <a-modal
        title="添加导航图片"
        v-model="visible"
        @ok="handleOk"
      >
        <p>
          <!--<UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>-->
        </p>
      </a-modal>
    </div>
</template>

<script>
// import UploadImage from '@C/upload/UploadImage';
import { mapState, mapActions } from 'vuex';
import urlSelect from '../urlSelect/urlSelect';

export default {
  data() {
    return {
      visible: false,
      imageLists: [],
      minmun: 1,
    };
  },
  computed: {
    ...mapState({
      shop_list: state => state.custom.customItems,
    }),
    config() {
      return this.shop_list[this.editIndex].config;
    },
    showItem() {
      return this.shop_list[this.editIndex].options;
    },
  },
  props: {
    editIndex: Number,
  },
  components: {
    // UploadImage,
    urlSelect,
  },
  created() {
    this.$set(this.config, 'navRadio', 0);
  },
  methods: {
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
    imgItemDel(index) {
      this.showItem.splice(index, 1);
    },
    showImgModel() {
      this.visible = true;
    },
    handleOk() {
      // const imgs = this.$refs.uploadImageLists.uploadImageList;
      const imgs = [{
        url:'http://img.hyplmm.com/images/default/201907/31/MsfFwdryyoNvnh8Q5Mmd5bVbXNzk8JxiyMttLtdS.jpeg'
      }];
      if (imgs.length === 0) {
        this.$message.error('请选择图片');
        return;
      }
      this.showItem.push({
        url: imgs[0].url,
        title: '',
        link: '',
      });
      this.visible = false;
      this.imageLists = [];
      this.minmun = 1;
      // this.$refs.uploadImageLists.surplusNum = 1;
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
 @import "../style/styles.styl"
 .navRadio
   margin 10px 0;
</style>
