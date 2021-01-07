<template>
    <div class="shop_list">
      <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">商品</div>
        <div class="add_shop">
          <div class="add_lable">商品:</div>
          <div class="add_icon" @click="showModel"><a-icon type="plus" /></div>
          </div> 
        <div class="list_item_style">
          <span>列表样式:</span>
        <a-radio-group name="radioGroup" :defaultValue="1" @change="changeCheck">
        <a-radio :value="1" :style="style">大图模式</a-radio>
        <a-radio :value="2" :style="style">一行两个</a-radio>
        <a-radio :value="3" :style="style">一行三个</a-radio>
        <a-radio :value="6" :style="style2">横向滑动</a-radio>
        </a-radio-group>
        </div>
        <div class="add_shop">
        <div class="shop_margin">
          <div>页面间距:</div>
           <a-row class="shop_margin_ant-row">
              <a-col class="shop_margin_rang">
                <a-slider :min="0" :max="30" v-model="inputValue1" />
              </a-col>     
                
           </a-row>
           {{inputValue1}}像素
        </div>
        <div class="shop_margin">
           <div>商品间距:</div>
           <a-row class="shop_margin_ant-row">
              <a-col class="shop_margin_rang">
                <a-slider :min="0" :max="30" v-model="inputValue2" />
              </a-col>     
                
           </a-row>
           {{inputValue2}}像素
        </div>
        <div class="list_item_style">
           <span>商品样式:</span>
        <a-radio-group name="radioGroup" :defaultValue="1" @change="changeBottom">
        <a-radio :value="1" :style="style">无边白底</a-radio>
        <a-radio :value="2" :style="style">卡片投影</a-radio>
        <a-radio :value="3" :style="style">描边白底</a-radio>
        <a-radio :value="4" :style="style2">无底透明底</a-radio>
        </a-radio-group>
        </div>
         <div class="list_item_style">
           <span>商品倒角:</span>
        <a-radio-group name="radioGroup" :defaultValue="0" @change="changeRedius">
        <a-radio :value="0" :style="style">直角</a-radio>
        <a-radio :value="1" :style="style">圆角</a-radio>
        </a-radio-group>
        </div>
        </div>  
        <a-modal
        title="添加导航图片"
        v-model="visible"
        @ok="handleOk"
      >
        <p>
          <!--<UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>-->
        </p>
      </a-modal>
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
        dataLists:[],
        inputValue1:0,
        inputValue2:0,
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
        style2:{
          'cursor':'pointer',
          'font-weight':'400',
          'line-height': '14px',
          'margin': 0,
          'padding': 0,
          'margin-right': '15px',
          'vertical-align': 'middle',
          'width': '85px',
          'display':'inline-block',
          'font-size': '12px',
          'margin-top':'10px'
        },
        visible:false
      }
  },
  methods:{
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
     initData() {
      this.dataLists = this.shop_list[this.editIndex].options;
    },
    changeCheck(e){
        console.log('商品排列一行个数',e.target.value);
        let val=e.target.value;
        this.shop_list[this.editIndex].config.list_num=e.target.value;
        let k=val==1?3:val==2?4:val==3?6:6;
        this.shop_list[this.editIndex].options=[];
        while(k>0){
          this.shop_list[this.editIndex].options.push({url:''});
          k--;
        }
    },
    changeBottom(e){
       this.shop_list[this.editIndex].config={
         list_num:this.shop_list[this.editIndex].config.list_num,
         pad:this.inputValue1,
         mag:this.inputValue2,
         btom: e.target.value,
         redius:this.shop_list[this.editIndex].config.redius
       };
    },
    changeRedius(e){//redius
          this.shop_list[this.editIndex].config={
         list_num:this.shop_list[this.editIndex].config.list_num,
         pad:this.inputValue1,
         mag:this.inputValue2,
         btom:this.shop_list[this.editIndex].config.btom,
         redius:e.target.value
       };
    },
    showModel(){
       this.visible=true;
    },
    handleOk() {
      // const imgs = this.$refs.uploadImageLists.uploadImageList;
      const imgs = [{
        url:'http://img.hyplmm.com/images/default/201907/31/MsfFwdryyoNvnh8Q5Mmd5bVbXNzk8JxiyMttLtdS.jpeg'
      }];
      if (imgs.length === 0) {
        this.$message.error('请选择图片');
        return;
      }
      let urlList=this.shop_list[this.editIndex].options;
      for(let i=0;i<urlList.length;i++){
          if(urlList[i].url==''){
             urlList[i].url=imgs[0].url;
             break;
          }
      }
      console.log(urlList);
      this.shop_list[this.editIndex].options=[...urlList];
      this.visible = false;
      
      
    },
  },
  mounted(){
     this.initData();
  },
  watch:{
    inputValue1(val){
       //console.log(val);
       this.shop_list[this.editIndex].config={
         list_num:this.shop_list[this.editIndex].config.list_num,
         pad:val,
         mag:this.inputValue2,
         btom:this.shop_list[this.editIndex].config.btom,
         redius:this.shop_list[this.editIndex].config.redius
       };
    },
    inputValue2(val){
         this.shop_list[this.editIndex].config={
         list_num:this.shop_list[this.editIndex].config.list_num,
         pad:this.inputValue1,
         mag:val,
         btom:this.shop_list[this.editIndex].config.btom,
         redius:this.shop_list[this.editIndex].config.redius
       };
    },
  }
}
</script>
<style lang="less" scoped>
.shop_list{
  
}
.add_shop{
    margin-bottom: 20px;
    border: 1px solid #e5e5e5;
    background: #fff;
    padding: 10px 0;
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
  .add_icon{     
    -ms-flex-positive: 1;
    display: inline-block;
    width: 50px;
    height: 50px;
    text-align: center;
    border: 1px dashed #ccc;
    line-height: 50px;
    cursor: pointer;
    color: #38f;
    font-size: 16px;
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
.shop_margin{
  width: 100%;
  .shop_margin_ant-row{
   display: inline-block;
    width: 65%;
    line-height: 20px;
    vertical-align: middle;
    .shop_margin_rang{
      display: inline-block;
     width: 100%
  }
  }
  >div {
    display: inline-block;
    width: 60px;
    text-align: right;
    margin-right: 5px;
  }
  
}
</style>