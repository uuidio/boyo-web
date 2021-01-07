<template>
  <div>
    <div v-if="dataLists.length>0" :class="config.list_num==5?'over_flow':''">
      <ul class="nav-ul" :style="{padding:config.pT+'px'+' '+ config.pL+'px','background':config.background}">
        <li  :key="index" v-for="(item,index) in dataLists" >
         <a>
           <div v-if="config.nav==0">
                <div class="img-box">
                 <img v-if="item.url" :src="item.url" alt="" :style="{'borderRadius':config.r+'px'}"/>
                 <img v-else src="@assets/img_0.png" alt="" :style="{'borderRadius':config.r+'px'}"/>
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
    dataLists:{
      type:Array,
      default:[]
    },
    config: Object,
  },
  methods: {},
  mounted() {
  },
  watch:{
    config(val){
    },
    dataLists(val){
    }
  }
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
    width:25%;
  }
 .nav-ul li a{
    display: block;
    width:100%;
    .img-box{
      width:100%;
      img{
          width: 80%;
          display: block;
          margin:10% auto 0
      }
    }
    .img-box-back{
}

    .img_title{
      padding-bottom: 9px;
      height: 33px;
      line-height: 24px;
      font-size: 12px;
      text-align: center;
      overflow: hidden;
      color: #333;
    }
 }

</style>
