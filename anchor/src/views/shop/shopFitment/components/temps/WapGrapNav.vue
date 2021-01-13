<template>
  <div>
    <div v-if="dataLists.length>0">
      <ul class="nav-ul" :style="{'borderRadius':config.r+'px',
      'padding':config.p1+'px'+' '+ config.p2+'px'
      ,'background':config.background,margin:`${config.mT}px ${config.mL}px`,}">
        <li :style="{width:100 / config.isNumber + '%'}" :key="index" v-for="(item,index) in dataLists" >
         <a>
           <div v-if="config.nav===0">
                <div class="img-box">
                 <img v-if="item.url" :src="item.url" alt="">
                 <img v-else src="@assets/img_0.png" alt="">
                </div>
           </div>
          <div class="img_title" :style="{'background-color':config.backColor,'color':config.wordColor}">{{item.title}}</div>
         </a>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {

    };
  },
  props: {
    dataLists: {
      type: Array,
      default: [],
    },
    config: Object,
  },
  methods: {},
  mounted() {
  },
  watch: {
    config(val) {
    },
    dataLists(val) {
    },
  },
};
</script>
<style lang="less" scoped>
  .nav-ul{
    overflow-x: hidden;
    display: flex;
    flex-wrap: wrap;
  }
  .nav-ul li{
    display: inline-block;
    vertical-align: middle;
    width:20%;
  }
 .nav-ul li a{
    display: block;
    width:100%;
    .img-box{
      width:100%;
      img{
          width: 60%;
          display: block;
          border-radius:50%;
          margin:0 auto;
      }
    }
    .img-box-back{
}

    .img_title{
      margin-top:5px;
      font-size: 12px;
      text-align: center;
      overflow: hidden;
    }
 }

</style>
