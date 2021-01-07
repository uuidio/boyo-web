<template>
  <div>
    <div :style="{
      padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px',background:config.background,borderRadius:config.boxR+'px'}">
      <div v-if="config.imgType === 'IP'" class="imgIP fxBox2">
         <span class="hotSpan">IP故事</span>
        <span class="col-666 fs12">更多></span>
      </div>
      <div v-if="dataLists.length>0"
           :class="{
    'levelone':config.list_num===1?true:false,
    'leveltwo':config.list_num===2?true:false,
    'levelthree':config.list_num===3?true:false
    }">
        <div class="imgBox" v-for="(item, index) in dataLists" :key="index" :style="{
        'margin-top': config.list_num == 1 ? (index >= 1 ? config.p+'px' : 0) : config.list_num == 2 ? (index >= 2 ? config.p+'px' : 0) : config.list_num == 3 ? (index >= 3 ? config.p+'px' : 0) : 0, 'width': config.list_num == 1 ? '100%' : config.list_num == 2 ? (100-config.m)/2 + '%' : (100-config.m*2)/3 + '%', 'margin-left': config.list_num == 2 ? ((index+1) % 2 == 0  ? config.m+'%' : 0) : 0, 'margin-right': config.list_num == 3 ? ((index+1) % 3 != 0  ? config.m+'%' : 0) : 0}">
          <img :style="{'borderRadius':config.r+'px'}" :src="item.url" alt="">
        </div>
      </div>
      <div v-else class="img_null">
        <p class="fs16">点击编辑图片专区</p>
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
  .imgBox
    width 100%
    img
      width 100%
.leveltwo
  display flex
  flex-wrap wrap
  .imgBox
    /*width 49%
    &:nth-child(2n)
      margin-left 2%
    &:nth-child(n+3)
      margin-top 10px*/
    img
      width 100%
.levelthree
  display flex
  flex-wrap wrap
  .imgBox
    /*width 32%
    &:not(:nth-child(3n))
      margin-right 2%
    &:nth-child(n+4)
      margin-top 10px*/
    img
      width 100%
</style>
