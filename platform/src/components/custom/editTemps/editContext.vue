<template>
    <div class="shop_list">
        <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">文本</div>
        <div class="add_shop">
            <div class="add_lable">文本:</div>
            <div class="add_context">
                <textarea placeholder="请输入要说明的文字，最多100字" v-model="context"></textarea>
            </div>
        </div> 
        <div class="list_item_style">
            <span>字体大小:</span>
            <a-radio-group name="radioGroup" :defaultValue="14" v-model="size">
            <a-radio :value="18" :style="style">大</a-radio>
            <a-radio :value="14" :style="style">中</a-radio>
            <a-radio :value="12" :style="style">小</a-radio>
            </a-radio-group>
        </div>    
           <div class="add_shop">
              <div class="add_lable">背景颜色:</div><input type="color" v-model="backColor">
              <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>
           </div>
           <div class="add_shop">
              <div class="add_lable">文字颜色:</div><input type="color" v-model="wordColor">
              <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backWordColor">重置</a>
           </div>
        <div class="list_item_style">
            <span>显示位置:</span>
            <a-radio-group name="radioGroup" defaultValue="left" v-model="direction">
            <a-radio value="left" :style="style">居左</a-radio>
            <a-radio value="center" :style="style">居中</a-radio>
            <a-radio value="right" :style="style">居右</a-radio>
            </a-radio-group>
        </div>     
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {

    computed: {
    ...mapState({
      shop_list: state => state.custom.customItems,
    }),
    showItem() {
      return this.shop_list[this.editIndex].options;
    },
  },
    props: {
    editIndex: Number,
  },
  data(){
      return{
        context:'',
        visible:false,
        direction:'left',
        backColor:'#ffffff',
        wordColor:'#000000',
        size:14,
        style:{
          'cursor':'pointer',
          'font-weight':'400',
          'line-height': '14px',
          'margin': 0,
          'padding': 0,
          'margin-right': '15px',
          'vertical-align': 'middle',
          'width': '85px',
          'display':'inline-block',
          'font-size': '12px'
        },
      }
  },
  methods:{
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
     initData() {
      this.dataLists = this.shop_list[this.editIndex].options;
    },
    backBackColor(){
       this.backColor='#ffffff';
    },
    backWordColor(){
        this.wordColor='#000000';
    },
  },
  mounted(){
     this.initData();
  },
  watch:{
      backColor(val){
        this.shop_list[this.editIndex].config={
            direction:this.direction,
            backColor:this.backColor,
            wordColor:this.wordColor,
            size:this.size
        };
      },
       wordColor(val){
         this.shop_list[this.editIndex].config={
            direction:this.direction,
            backColor:this.backColor,
            wordColor:this.wordColor,
            size:this.size
        };
       } ,
       context(val){
          this.shop_list[this.editIndex].options=[{'context':this.context}];
       },
       size(val){
         this.shop_list[this.editIndex].config={
            direction:this.direction,
            backColor:this.backColor,
            wordColor:this.wordColor,
            size:this.size
        };
       },
       direction(val){
         this.shop_list[this.editIndex].config={
            direction:this.direction,
            backColor:this.backColor,
            wordColor:this.wordColor,
            size:this.size
        };
       }
    
  }
}
</script>
<style lang="less" scoped>
.shop_list{
  
}
.add_shop{
    margin-bottom: 20px;
  .add_lable{
    margin-top: 0;
      font-size: 12px;
    width: 55px;
    -ms-flex-negative: 0;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    text-align: right;
    margin-right: 10px;
    float: left;
  }
  .add_context{
   
     textarea{
         width: 80%;
         height: 100px;
         line-height: 18px;
         padding: 5px 10px;
     } 
  }
}
.list_item_style{
  margin-bottom: 20px;
  display: flex;
  -webkit-box-align: center;
  align-items: center;
  
  div{
        -webkit-box-flex: 1;
    -ms-flex-positive: 1;
    -webkit-flex-grow: 1;
    -moz-box-flex: 1;
    flex-grow: 1;
  }
  span{
    margin-top: 0;
    align-self: flex-start;
    font-size: 12px;
    width: 60px;
    -ms-flex-negative: 0;
    -webkit-flex-shrink: 0;
    flex-shrink: 0;
    text-align: right;
    margin-right: 10px;
  }
}
</style>