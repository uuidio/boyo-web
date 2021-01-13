<template>
  <div>
    <div :style="{
      margin:config.mT+'px'+' '+ config.mL+'px',
      padding:config.p+'px',background:config.background,borderRadius:config.boxR+'px'}">
      <div v-if="dataLists.length>0"
           :class="{
    'levelone':config.list_num===1?true:false,
    'leveltwo':config.list_num===2?true:false,
    'levelthree':config.list_num===3?true:false,
    'is_space':config.is_space===0?true:false,
    }">
        <div class="imgBox" v-for="(item,index) in dataLists" :key="index" >
          <img :style="{'borderRadius':config.r+'px'}" :src="item.url" alt="">
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑图片专区（推荐大小：750*230）</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    dataLists: {
      type: Array,
      default: [],
    },
    config: Object,
  },
  data() {
    return {};
  },
  methods: {},
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
.imgIP
  position relative
  margin-bottom 5px
  padding-left 10px
  &::after
    content ''
    height:14px
    width 4px
    background:rgba(255,74,65,1)
    border-radius:4px
    position absolute
    left 0
    top 50%
    transform translateY(-50%)
.levelone
  width 100%
  .imgBox
    width 100%
    img
      width 100%
.leveltwo
  display flex
  flex-wrap wrap
  .imgBox
    width 49%
    &:nth-child(2n)
      margin-left 2%
    &:nth-child(n+3)
      margin-top 10px
    img
      width 100%
  &.is_space
      margin-left 0
      .imgBox
        width 50%
        &:nth-child(2n)
          margin-left 0
        &:nth-child(n+3)
          margin-top 0
.levelthree
  display flex
  flex-wrap wrap
  .imgBox
    width 32%
    &:not(:nth-child(3n))
      margin-right 2%
    &:nth-child(n+4)
      margin-top 10px
    img
      width 100%
  &.is_space
      margin-left 0
      .imgBox
        width 33.333333%
        &:not(:nth-child(3n))
          margin-right 0
        &:nth-child(n+4)
          margin-top 0
</style>
