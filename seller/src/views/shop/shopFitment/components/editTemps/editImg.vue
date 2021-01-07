<template>
  <div>
    <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc;padding-bottom:10px;">图片专区（推荐大小：750*230）</div>
    <ul class="swiper_images">
      <draggable :options="sortOptions" v-model="dataLists">
        <li :key="index" v-for="(item,index) in dataLists" class="swiperItem">
          <a-popconfirm title="确认删除该数据?" @confirm="imgItemDel(index)" okText="确认" cancelText="取消">
            <div class="item_del">
              <em-icon type="icon-close-circle"></em-icon>
            </div>
          </a-popconfirm>
          <div class="swiper_img" @click="showImgModel(index)">
            <img :src="item.url" alt="">
          </div>
          <div class="swiper_txt">
            <div>
              <span>跳转路径</span>
              <div>
                <urlSelect modelType="img" :init_level="item.level" :url_type="item.urlType" :init_value="item.value"  @on-change="getChangeItem" :fx="true">
                  <a-button size="small" @click="getIndex(index)">跳转设置</a-button>
                </urlSelect>
              </div>
            </div>
          </div>
        </li>
      </draggable>
    </ul>
    <div class="image-add" @click="showImgModel(-1)">
      <p>+添加图片（可多选）</p>
    </div>
    <span class="mr10">展示格式:</span>
    <a-radio-group name="radioGroup" v-model="config.list_num">
      <a-radio :value="1">大图模式</a-radio>
      <a-radio :value="2">一行两个</a-radio>
      <a-radio :value="3">一行三个</a-radio>
    </a-radio-group>
    <div class="mt20">
      <span class="mr10">图片内是否需要间距:</span>
      <a-radio-group name="radioGroup" v-model="config.is_space">
        <a-radio :value="1">是</a-radio>
        <a-radio :value="0">否</a-radio>
      </a-radio-group>
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
      <div class="mb10">页面内边距：</div>
      <div>
        <a-slider :min="0"  v-model="config.p" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">圆角：</div>
      <div>
        <a-slider :min="0"  v-model="config.boxR" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">图片圆角：</div>
      <div>
        <a-slider :min="0"  v-model="config.r" />
      </div>
    </div>
    <div class="mt20">
         <div class="mb10">背景颜色：</div>
         <div>
          颜色值：{{config.background}}
          <input type="color" v-model="config.background">
          <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>
        </div>
    </div>
    <a-modal
      title="添加图片"
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
  components: {
    draggable,
    UploadImage,
    urlSelect,
  },
  props: {
    editIndex: {
      type: Number,
      default: 0,
    },
    editType: {
      type: String,
      default: 'index',
    },
  },
  watch: {
  },
  data() {
    return {
      sortOptions,
      visible: false,
      imageLists: [],
      ipStoriesLists: [],
      minmun: 1000,
      changeIndex: 0,
      imgIndex: -1,
    };
  },
  computed: {
    shop_list() {
      return this.$store.state.shop.customItems;
    },
    config() {
      return this.shop_list[this.editIndex].config;
    },
    dataLists: {
      get() {
        return this.shop_list[this.editIndex].options;
      },
      set(val) {
        this.shop_list[this.editIndex].options = val;
      },
    },
  },
  methods: {
    getIndex(i) {
      this.changeIndex = i;
    },
    getChangeItem(item) {
      const url = this.shop_list[this.editIndex].options[this.changeIndex].url;
      this.shop_list[this.editIndex].options[this.changeIndex] = item;
      this.shop_list[this.editIndex].options[this.changeIndex].url = url;
    },
    getIpStories(item) {
      this.shop_list[this.editIndex].options[this.changeIndex].id = [item[0].id];
    },
    backBackColor() {
      this.shop_list[this.editIndex].config.background = 'transparent';
    },
    showImgModel(i) {
      this.imgIndex = i;
      if (i !== -1) {
        this.imageLists = [{
          status: 'finished',
          url: this.dataLists[this.imgIndex].url,
        }];
      } else {
        this.imageLists = [];
      }
      this.visible = true;
    },
    imgItemDel(index) {
      this.dataLists.splice(index, 1);
    },
    handleOk() {
      const imgs = this.$refs.uploadImageLists.uploadImageList;
      if (imgs.length === 0) {
        this.$message.error('请选择图片');
        return;
      }
      if (this.imgIndex === -1) {
        for (let i = 0; i < imgs.length; i++) {
          this.dataLists.push({
            url: imgs[i].url,
          });
        }
      } else {
        this.dataLists[this.imgIndex].url = imgs[0].url;
      }
      this.imgIndex = -1;
      this.imageLists = [];
      this.visible = false;
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
  >>>.ant-radio-wrapper
    font-size:12px
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
      font-size 12px

  .swiper_txt > div

    > span
      display inline-block
      width 60px
</style>
