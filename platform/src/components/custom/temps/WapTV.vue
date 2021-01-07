<template>
  <div>
    <div :style="{
      margin:config.mT+'px'+' '+ config.mL+'px',
      padding:config.p+'px',background:config.background,borderRadius:config.boxR+'px'}">
      <div class="imgIP fxBox2" v-if="dataLists.length>0">
        <span class="hotSpan">热门推荐</span>
        <span class="col-666 fs12">更多></span>
      </div>
      <div v-if="dataLists.length>0"  :class="{
          'levelone':config.list_num===1?true:false,
          'leveltwo':config.list_num===2?true:false,
        }">
        <div class="item" v-for="(item,index) in dataLists">
          <div class="imgBox">
            <img :style="{'borderRadius':config.r+'px'}" :src="item.url" alt="">
          </div>
          <div v-if="item.title" data-line="1" class="line2 fs12 fw700 title">
            {{item.title}}
          </div>
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑视频专区</p>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      dataLists:{
        type:Array,
        default:[]
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
  display flex
  flex-wrap wrap
  .item
    width 49%
    &:nth-child(2n)
      margin-right 2%
    &:first-child
      width 100%
      margin-top 0
    img
      width 100%
    .title
      padding-left 4px
      line-height 22px
.leveltwo
  display flex
  flex-wrap wrap
  .item
    width 49%
    &:nth-child(2n)
      margin-left 2%
    img
      width 100%
    .title
      padding-left 4px
      line-height 22px
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
</style>
