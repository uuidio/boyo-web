<template>

  <div class="wrap_title" :style="{
    'background-color':config.backColor,
    'text-align':config.direction,
    'margin': config.mT+'px'+' '+config.mR+'px'+' '+config.mB+'px'+' '+config.mL+'px',
    'padding': config.pT+'px'+' '+config.pR+'px'+' '+config.pB+'px'+' '+config.pL+'px'
  }">
    <h2 class="main_title">{{dataLists[0].main_title?dataLists[0].main_title:'点击编辑【标题】'}}</h2>
    <p class="sub_title">
      <span class="vice_title" v-if="dataLists[0].vice_title">{{dataLists[0].vice_title}}</span>
    </p>
<!--    <p v-if="config.subTemp">-->
<!--        <span class="date" v-if="dataLists[0].date">{{dataLists[0].date}}</span>-->
<!--        <span class="author" v-if="dataLists[0].author">{{dataLists[0].author}}</span>-->
<!--        <a class="link_addr" v-if="dataLists[0].link_addr">{{dataLists[0].link_addr}}</a>-->
<!--    </p>-->
<!--    <p v-else>-->
<!--        <span class="vice_title" v-if="dataLists[0].vice_title">{{dataLists[0].vice_title}}</span>-->
<!--    </p>-->
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
         console.log(val);
    },
    dataLists(val){

    }

  }

};
</script>

<style lang="less" scoped>
.wrap_title{
   padding: 10px;
    .main_title{
      margin: 0;
      font-size: 16px;
      font-weight: bold;
      line-height: 16px;
  }
  p{
    line-height: 1.6;
    font-size: 12px;
    font-weight: 400;
    margin-top: 3px;
    span{
        margin-right: 10px;
    }
    a{
        text-decoration: none;
        color: #607fa6;
    }
  }
}
.sub_title{
  color: #999;
  font-size: 14px;
  margin-top: 8px;
}

</style>
