<template>
  <div>
    <div v-if="dataLists.length>0" :class="config.list_num==5?'over_flow':''">
      <ul class="nav-list" :style="{padding:config.pT+'px'+' '+ config.pR+'px'+' '+config.pB+'px'+' '+ config.pL+'px',margin:config.mT+'px'+' '+ config.mR+'px'+' '+config.mB+'px'+' '+ config.mL+'px','background':config.background}">
        <li class="item-img" v-if="config.nav==0" :key="index" v-for="(item,index) in dataLists" >
         <a>
           <div class="img-box">
             <img v-if="item.url" :src="item.url" alt="" :style="{'borderRadius':config.r+'px'}"/>
             <img v-else src="@assets/img_0.png" alt="" :style="{'borderRadius':config.r+'px'}"/>
           </div>
         </a>
        </li>
        <li v-if="config.nav==1" class="item-txt" :key="index" v-for="(item,index) in dataLists"   :style="{'background-color':config.backColor}">
          <a class="nav_title" :style="{'color': index==0 ? config.wordActiveColor : config.wordColor}">
            {{item.title}}
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
  .nav-list{
    overflow-x: auto;
    overflow-y: hidden;
    display: flex;
    flex-wrap: nowrap;
    .item-img{
      vertical-align: middle;
      width: 130px;
      height: 60px;
      flex-shrink: 0;
      overflow: hidden;
      &+li{
        margin-left: 8px;
      }
      a {
        display: block;
        width: 100%;
        height: 100%;
        .img-box {
          width: 100%;
          height: 100%;
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
    .item-txt{
      flex-shrink: 0;
      &:first-of-type{
        font-size: 15px;
      }
      &+.item-txt{
        margin-left: 20px;
      }
      .nav_title {
        line-height: 15px;
        font-size: 14px;
        text-align: center;
        overflow: hidden;
        color: #333;
      }
    }
  }
</style>
