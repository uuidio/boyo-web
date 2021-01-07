<template>
  <div>
    <div v-if="dataLists.length>0">
      <ul class="nav-ul">
        <li :key="index" v-for="(item,index) in dataLists">
           <div class="img-box">
             <img :src="item.url" alt="">
           </div>
          <div class="txt-box" v-if="config.navRadio===0">
            {{item.title}}
          </div>
        </li>
      </ul>

    </div>
    <div v-else>
      <div class="clickNavs">
        <a-icon type="plus" />点击编辑导航组件
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  },
  props: {
    dataLists: Array || [],
    config: Object,
  },
  methods: {},
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
.clickNavs
  width:100%;
  height:50px;
  text-align center;
  line-height 50px;
  background-color: #ebf8fd;
  color: #88c4dc;
.nav-ul
  display flex
  flex-wrap wrap
  padding 10px 0
  li
   width 25%
   .img-box
     width 100%
     img
       display block
       width 60%
       margin 0 auto
       border-radius 50%;
   .txt-box
      font-size:12px
      color:#666
      margin-top:5px;
      text-align center
</style>
