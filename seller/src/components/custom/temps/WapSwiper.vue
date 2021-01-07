<template>
  <div class="swiperBox pos-re">
    <div class="dragItem">
      <div v-if="dataLists.length>0">
        <div>
          <swipe :autoplay="3000" indicator-color="white">
            <swipeItem :key="index" v-for="(item,index) in dataLists"><img style="width:100%" :src="item.url" alt="">
            </swipeItem>
          </swipe>
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑图片广告</p>
        <p class="fs12">建议宽度750像素</p>
      </div>
    </div>
  </div>
</template>

<script>
import vants from '../mixins';

export default {
  mixins: [vants],
  data() {
    return {};
  },
  computed: {},
  props: {
    dataLists: Array || [],
  },
  methods: {},
  mounted() {
  },
  watch: {},
};
</script>

<style scoped lang="stylus">
  .img_null
    height: 136px
    background-color: #ebf8fd;
    color #88c4dc
    display flex
    justify-content center
    align-items center
    flex-direction column
</style>
