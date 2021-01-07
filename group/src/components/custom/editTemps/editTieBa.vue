<template>
  <div>
    <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc;padding-bottom:10px;">贴吧专区</div>
    <div class="tieBa">
        <div style="display: flex">
          <div class="label">添加贴吧</div>
          <div class="add_icon" @click="addTieBa"><a-icon type="plus" /></div>
        </div>
        <draggable :options="sortOptions" v-model="dataLists" class="tieBaBox">
          <div v-for="(item,index) in dataLists" class="selectTieBa">
             <img src="@assets/cjfx.png">
          </div>
        </draggable>
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
         <div class="mb10">背景颜色：</div>
         <div>
          颜色值：{{config.background}}
          <input type="color" v-model="config.background">
          <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>
        </div>
    </div>
  </div>
</template>

<script>
  const sortOptions = {
    animation: 500,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    draggable: '.selectTieBa',
  };
  import { mapState, mapActions } from 'vuex';
  import urlSelect from '../urlSelect/urlSelect';
  import draggable from 'vuedraggable';
  export default {
    components:{
      draggable,
      urlSelect,
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
      config() {
        return this.shop_list[this.editIndex].config;
      },
      dataLists:{
        get() {
          return this.shop_list[this.editIndex].options;
        },
        set(val) {
          this.shop_list[this.editIndex].options = val;
        },
      },
    },
    watch:{
    },
    methods: {
      backBackColor(){
        this.shop_list[this.editIndex].config.background='transparent';
      },
      addTieBa(){
        this.dataLists = [
          {
            url:'@assets/img_0.png',
            title:'喜羊羊吧',
            zt:25,
            tz:123
         },
          {
            url:'@assets/cjfx.png',
            title:'超级飞侠吧',
            zt:25,
            tz:123
          },
          {
            url:'@assets/mjxd.png',
            title:'萌鸡小队吧',
            zt:25,
            tz:123
          },
          {
            url:'@assets/bkx.png',
            title:'贝肯熊吧',
            zt:25,
            tz:123
          }
        ]
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .tieBaBox
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding:10px 20px 0 70px;
    .selectTieBa
      width:50px;
      height:50px;
      margin-right:8px;
      margin-top:10px;
      cursor: pointer;
      img
        width: 100%
        height:100%
  .tieBa
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    background: #fff;
    padding: 10px 0;
    .add_icon
      display: inline-block;
      width: 50px;
      height: 50px;
      text-align: center;
      border: 1px dashed #ccc;
      line-height: 50px;
      cursor: pointer;
      color: #38f;
      font-size: 16px
    .label
      width 60px
      text-align right
      display inline-block
      margin-right:10px
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
