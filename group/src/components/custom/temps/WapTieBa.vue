<template>
  <div>
    <div :style="{
      margin:config.mT+'px'+' '+ config.mL+'px',
      padding:config.p+'px',background:config.background}">
      <div class="imgIP fxBox2" v-if="dataLists.length>0">
        <span class="hotSpan">话题社</span>
        <span class="col-666 fs12">更多></span>
      </div>
      <div v-if="dataLists.length>0" class="tieba_lists">
        <div class="item" v-for="(item,index) in dataLists" :style="{borderRadius:config.boxR+'px'}">
          <div class="imgBox">
            <img  src="@assets/cjfx.png" alt="">
          </div>
          <div class="textBox">
            <p style="margin:5px 0">{{item.title}}</p>
            <p class="col-666" style="font-size:10px">主题：{{item.zt}}</p>
            <p class="col-666" style="font-size:10px">帖子：{{item.tz}}</p>
          </div>
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑贴吧专区</p>
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
      top 50%
      left 0
      transform translateY(-50%)
  .tieba_lists
    position relative
    display flex
    flex-wrap wrap
    .item
      width 49%
      display flex
      overflow hidden
      border 1px solid #e7e7e7
      border-left none
      font-size 12px
      &:nth-child(2n)
        margin-left 2%
      &:nth-child(n+3)
        margin-top 10px
      .imgBox
        height 75px
        width 75px
        img
          width 100%
          height 100%
      .textBox
        padding 5px
        flex 1
</style>
