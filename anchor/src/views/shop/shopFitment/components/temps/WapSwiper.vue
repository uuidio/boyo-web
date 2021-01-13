<template>
  <div class="swiperBox pos-re">
    <div class="dragItem">
      <div v-if="dataLists.length>0">
        <div :style="{margin:config.mT+'px'+' '+ config.mL+'px'}">
          <a-carousel autoplay>
            <div class="swiperItem" :key="index" v-for="(item,index) in dataLists">
              <img :style="{'borderRadius':config.r+'px'}" :src="item.url" alt="">
            </div>
          </a-carousel>
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑图片广告</p>
        <p class="fs12">建议710*310像素</p>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  data() {
    return {};
  },
  computed: {},
  props: {
    dataLists:{
      type:Array,
      default:[]
    },
    config:{
      type:Object,
      default:{}
    }
  },
  methods: {},
  mounted() {
  },
  watch: {},
};
</script>

<style scoped lang="stylus">
  .swiperItem
    width 100%
    img
      width 100%
</style>
