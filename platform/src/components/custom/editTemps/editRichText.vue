<template>
    <div class="shop_list">
        <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">富文本</div>
           <div class="add_shop">
              <div class="add_lable">背景颜色:</div><input type="color" v-model="backColor">
              <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>
           </div>
           <div class="add_shop">
              <div class="add_lable">是否全屏:</div>
              <a-checkbox @change="onChange">全屏显示</a-checkbox>
           </div>
           <Ueditor ref="editor" editor_id="editor1" v-model="context" @on-change="changeContext">
          </Ueditor>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import Ueditor from '@C/ueditor/ueditor';
export default {
    components:{
      Ueditor
    },
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
        backColor:'#ffffff',
        isFull:false
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
    onChange(e){
        this.isFull=e.target.checked;
    },
    changeContext(val){
       this.shop_list[this.editIndex].options=[{'context':val}];
    }
  },
  mounted(){
     this.initData();
  },
  watch:{
      backColor(val){
        this.shop_list[this.editIndex].config={
            backColor:this.backColor,
            isFull:this.isFull
        };
      },
       context(val){

       },
       isFull(val){
          this.shop_list[this.editIndex].config={
            backColor:this.backColor,
            isFull:this.isFull
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
