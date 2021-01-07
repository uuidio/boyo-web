<template>
  <div>
    <div>
      <div class="title">图片广告</div>
      <div>
        <p>添加图片：</p>
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
              <div>
                <span>图片标题</span>
                <a-input v-model="item.title" placeholder="建议十个字以内,可不填" class="swiper_inp"/>
              </div>
              <div>
                <span>跳转路径</span>
                <urlSelect :link-index="index" :link-item="item.link" @getLink="getLinkItem"></urlSelect>
              </div>
            </div>
          </li>
        </ul>
        <div class="image-add" @click="showImgModel">
          <p>+添加一个背景图</p>
          <p>建议尺寸750X350像素</p>
        </div>
      </div>
    </div>
    <a-modal
      title="添加轮播图"
      v-model="visible"
      @ok="handleOk"
    >
      <p>
        <UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>
      </p>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
import urlSelect from '../urlSelect/urlSelect';

export default {
  computed: {
    ...mapState({
      shop_list: state => state.custom.customItems,
    }),
    showItem() {
      return this.shop_list[this.editIndex].options;
    },
  },
  components: {
    UploadImage,
    urlSelect,
  },
  data() {
    return {
      visible: false,
      imageLists: [],
      minmun: 1,
      dataLists: [],
    };
  },
  props: {
    editIndex: Number,
  },
  methods: {
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
    initData() {
      this.dataLists = this.shop_list[this.editIndex].options;
    },
    showImgModel() {
      this.visible = true;
    },
    imgItemDel(index) {
      this.showItem.splice(index, 1);
    },
    getLinkItem(item) {
      this.showItem[item.index].link = item.link;
      console.log(item);
    },
    handleOk() {
      const imgs = this.$refs.uploadImageLists.uploadImageList;
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
      this.$refs.uploadImageLists.surplusNum = 1;
    },
  },
  mounted() {
  },
  watch: {
    showItem() {
      this.shop_list[this.editIndex].options = this.showItem;
      this.setCustomItems(this.shop_list);
    },
  },
};
</script>

<style scoped lang="stylus">
  .image-add
    display: flex;
    align-items: center;
    background: #fff;
    margin: 10px 0;
    padding: 10px;
    rder: 1px dashed #e5e5e5;
    cursor: pointer;
    color: #38f;
    flex-direction column
    height 80px
    justify-content center

  .swiper_images li:hover .item_del
    display block

  .swiper_images li
    padding 10px
    margin 10px 0
    display flex
    background #ffffff
    border 1px dashed #e5e5e5
    position relative

    .item_del
      position absolute
      right -10px
      top -18px
      color #666
      z-index 4
      font-size 20px
      display none
      cursor pointer

    .swiper_img
      width 80px
      margin-right 10px

      img
        width 100%

    .swiper_txt >>> .swiper_inp
      width 200px
      font-size 12 pxbo

  .swiper_txt > div
    display flex
    align-items center
    margin-bottom 15px

    > span
      display inline-block
      width 60px
</style>
