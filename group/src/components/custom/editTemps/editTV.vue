<template>
  <div>
    <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc;padding-bottom:10px;">视频专区</div>
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
          <div>
            <div class="mb10">
              <div>视频标题：</div><a-input placeholder="输入视频标题" v-model="item.title"></a-input>
            </div>
            <div>
              <div>视频VID：</div><a-input placeholder="输入视频腾讯vid" v-model="item.vid"></a-input>
            </div>
          </div>
        </li>
      </draggable>
    </ul>
    <div class="image-add" @click="showImgModel(-1)">
      <p>+添加视频封面（可多选）</p>
    </div>
    <span class="mr10">展示格式:</span>
    <a-radio-group name="radioGroup" v-model="config.list_num">
      <a-radio :value="1">一大两小</a-radio>
      <a-radio :value="2">一行两个</a-radio>
    </a-radio-group>
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
      <p>
        <UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>
      </p>
    </a-modal>
  </div>
</template>

<script>
  const sortOptions = {
    animation: 500,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    draggable: '.swiperItem',
  };
  import { mapState, mapActions } from 'vuex';
  import UploadImage from '@C/upload/UploadImage';
  import urlSelect from '../urlSelect/urlSelect';
  import draggable from 'vuedraggable';
  export default {
    components:{
      draggable,
      urlSelect,
      UploadImage
    },
    props: {
      editIndex: Number,
    },
    data() {
      return {
        sortOptions,
        visible:false,
        imageLists:[],
        minmun:1000,
        changeIndex:0,
        imgIndex:-1,
      };
    },
    computed: {
      ...mapState({
        shop_list: state => state.custom.customItems,
      }),
      dataLists:{
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
    watch:{
    },
    methods: {
      backBackColor(){
        this.shop_list[this.editIndex].config.background='transparent';
      },
      showImgModel(i){
        this.imgIndex = i
        if(i!==-1){
           this.imageLists = [{
             status:'finished',
             url:this.dataLists[this.imgIndex].url
           }]
        }else{
          this.imageLists = []
        }
        this.visible = true;
      },
      imgItemDel(index) {
        this.dataLists.splice(index, 1);
      },
      getIndex(i){
        this.changeIndex = i
      },
      handleOk() {
        const imgs = this.$refs.uploadImageLists.uploadImageList;
        if (imgs.length === 0) {
          this.$message.error('请选择图片');
          return;
        }
        if(this.imgIndex===-1){
          for(let i = 0;i<imgs.length;i++){
            this.dataLists.push({
              url: imgs[i].url,
              title:'',
              vid:''
            });
          }
        }else{
          this.dataLists[this.imgIndex].url = imgs[0].url;
        }
        this.imgIndex = -1
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
    align-items center
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

    > span
      display inline-block
      width 60px
</style>
