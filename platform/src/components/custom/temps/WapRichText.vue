<template>
  <div class="wrap_Rich_text" :style="{'background-color':config.backColor}">
     <div class="rich_text" :style="{'padding':config.isFull?'':'10px'}">
        <div v-if="dataLists[0].context">
           <div v-html="dataLists[0].context"></div>
        </div>
        <div v-else>
           <p>点此编辑【富文本】内容  ————>  </p>
           <p>你可以对文字进行<strong>加粗</strong>、<em>斜体</em>、
           <span style="text-decoration: underline;">下划线</span>、
           <span style="text-decoration: line-through;">删除线</span>、
           文字<span style="color: rgb(0, 176, 240);">颜色</span>、
           <span style="background-color: rgb(255, 192, 0); color: rgb(255, 255, 255);">背景色</span>、
           以及字号<span style="font-size: 20px;">大</span><span style="font-size: 14px;">小</span>等简单排版操作。
           </p>
        </div>
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
    font-size: 18px;
    line-height: 22px;
      
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
  
    
</style>
