<template>
  <div>
    <div>
      <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc;padding-bottom:10px;">图片轮播</div>
      <div>
        <p>添加图片：</p>
        <ul class="swiper_images">
          <draggable :options="sortOptions" v-model="showItem">
            <li :key="index" v-for="(item,index) in showItem" class="swiperItem">
              <a-popconfirm title="确认删除该数据?" @confirm="imgItemDel(index)" okText="确认" cancelText="取消">
                <div class="item_del">
                  <em-icon type="icon-close-circle"></em-icon>
                </div>
              </a-popconfirm>
              <div class="swiper_img" @click="changeImg(index,item.url)">
                <img :src="item.url" alt="">
              </div>
              <div class="swiper_txt">
                <div>
                  <span>跳转路径</span>
                  <urlSelect modelType="swiper" :init_level="item.level" :url_type="item.urlType" :init_value="item.value" @on-change="getChangeItem">
                    <a-button size="small" @click="getIndex(index)">跳转设置</a-button>
                  </urlSelect>
                </div>
              </div>
            </li>
          </draggable>
        </ul>
        <div class="image-add" @click="changeImg(-1)">
          <p>+添加一个背景图</p>
          <p>建议尺寸710X310像素</p>
        </div>
        <div class="mt20">
          <div class="mb10">左右外边距：</div>
          <div>
            <a-slider :min="0"  v-model="config.mL" />
          </div>
        </div>
        <div class="mt20">
          <div class="mb10">上下外边距：</div>
          <div>
            <a-slider :min="0"  v-model="config.mT" />
          </div>
        </div>
        <div class="mt20">
          <div class="mb10">图片圆角：</div>
          <div>
            <a-slider :min="0"  v-model="config.r" />
          </div>
        </div>
      </div>
    </div>
    <a-modal
      title="添加轮播图"
      v-model="visible"
      @ok="handleOk"
    >
      <p v-if="visible">
        <UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>
      </p>
    </a-modal>
  </div>
</template>

<script>
import UploadImage from '@C/upload/UploadImage';
import draggable from 'vuedraggable';
import urlSelect from '../urlSelect/urlSelect';

const sortOptions = {
  animation: 500,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  draggable: '.swiperItem',
};
export default {
  computed: {
    shop_list() {
      return this.$store.state.shop.customItems;
    },
    showItem: {
      get() {
        return this.shop_list[this.editIndex].options;
      },
      set(val) {
        this.shop_list[this.editIndex].options = val;
      },
    },
    config() {
      return this.shop_list[this.editIndex].config;
    },
  },
  components: {
    UploadImage,
    draggable,
    urlSelect,
  },
  data() {
    return {
      sortOptions,
      visible: false,
      imageLists: [],
      minmun: 1,
      dataLists: [],
      changeIndex: 0,
      imgIndex: -1,
    };
  },
  props: {
    editIndex: Number,
    editType: {
      type: String,
      default: 'index',
    },
  },
  methods: {
    initData() {
      this.dataLists = this.shop_list[this.editIndex].options;
    },
    changeImg(i, url) {
      this.imgIndex = i;
      if (i !== -1) {
        this.imageLists = [{
          status: 'finished',
          url,
        }];
      } else {
        this.imageLists = [];
      }
      this.visible = true;
    },
    getChangeItem(item) {
      const title = this.shop_list[this.editIndex].options[this.changeIndex].title;
      const url = this.shop_list[this.editIndex].options[this.changeIndex].url;
      this.shop_list[this.editIndex].options[this.changeIndex] = item;
      this.shop_list[this.editIndex].options[this.changeIndex].title = title;
      this.shop_list[this.editIndex].options[this.changeIndex].url = url;
      console.log(this.shop_list[this.editIndex].options[this.changeIndex]);
    },
    getIndex(i) {
      this.changeIndex = i;
    },
    imgItemDel(index) {
      this.showItem.splice(index, 1);
    },
    handleOk() {
      const imgs = this.$refs.uploadImageLists.uploadImageList;
      if (imgs.length === 0) {
        this.$message.error('请选择图片');
        return;
      }
      if (this.imgIndex === -1) {
        this.showItem.push({
          url: imgs[0].url,
          title: '',
        });
      } else {
        this.showItem[this.imgIndex].url = imgs[0].url;
      }
      this.visible = false;
      this.imageLists = [];
      this.minmun = 1;
      this.$refs.uploadImageLists.surplusNum = 1;
    },
  },
  mounted() {
  },
  watch: {
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
      cursor pointer
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
