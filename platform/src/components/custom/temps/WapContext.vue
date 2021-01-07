<template>
  <div class="wrap_context">
    <div class="app_context" :style="{'background-color':config.backColor,'color':config.wordColor,'font-size':config.size+'px','text-align':config.direction}">
       <div v-if="dataLists[0]">
            {{dataLists[0].context}}
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
         
    },
    dataLists(val){
       
    }
    
  }

};
</script>
 
<style lang="less" scoped>
.wrap_context{
    min-height: 10px;
    .app_context{ 
      line-height: 20px;
      width: 100%;
      padding: 10px 0;
      
  }
}
  
    
</style>
