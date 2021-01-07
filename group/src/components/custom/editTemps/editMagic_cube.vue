<template>
    <div class="shop_list">
        <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">魔方</div>
           <div class="shoose_temp">
              <div class="add_lable">选择模板:</div>
              <div class="temp_list">
                  <div class="temp_item" :style="selectIndex==2?'border-color:#38f;':''" @click="changeSelectIndex(2)"><div class="item_img"><img src="@/assets/magic_2.png"/></div><div class="item_title">一行2个</div></div>
                  <div class="temp_item" :style="selectIndex==3?'border-color:#38f;':''" @click="changeSelectIndex(3)"><div class="item_img"><img src="@/assets/magic_3.png"/></div><div class="item_title">一行3个</div></div>
                  <div class="temp_item" :style="selectIndex==4?'border-color:#38f;':''" @click="changeSelectIndex(4)"><div class="item_img"><img src="@/assets/magic_4.png"/></div><div class="item_title">一行4个</div></div>
                  <div class="temp_item" :style="selectIndex==5?'border-color:#38f;':''" @click="changeSelectIndex(5)"><div class="item_img"><img src="@/assets/magic_5.png"/></div><div class="item_title">2左2右</div></div>
                  <div class="temp_item" :style="selectIndex==6?'border-color:#38f;':''" @click="changeSelectIndex(6)"><div class="item_img"><img src="@/assets/magic_6.png"/></div><div class="item_title">1左2右</div></div>
                  <div class="temp_item" :style="selectIndex==7?'border-color:#38f;':''" @click="changeSelectIndex(7)"><div class="item_img"><img src="@/assets/magic_7.png"/></div><div class="item_title">1上2下</div></div>
              </div>
           </div> 
           <div class="shoose_temp">
              <div class="add_lable">布局:</div>
              <div class="temp_list">
                  <div v-if="selectIndex==2">
                      <div class="item_2">
                          <ul >
                              <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/2+'px','height':330/2+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/selectIndex)}}像素</div></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==3">
                      <div class="item_3">
                          <ul>
                              <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/3+'px','height':330/3+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/selectIndex)}}像素</div></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==4">
                       <div class="item_4">
                          <ul>
                              <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/4+'px','height':330/4+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/selectIndex)}}像素</div></li>
                          </ul>
                      </div> 
                  </div>
                  <div v-if="selectIndex==5">
                        <div class="item_5">
                          <ul>
                              <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/2+'px','height':330/2+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/2)}}像素</div></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==6">
                        <div class="item_6">
                          <ul>
                               <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/2+'px','height':330/(index==0?1:2)+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/2)}}像素</div></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==7">
                        <div class="item_7">
                          <ul>
                              <li :class="index==minIndex?'active_li':''" @click="changeMinIndex(index)" v-for="(item,index) in showItem" :key="index" :style="{'width':330/(index==0?1:2)+'px','height':330/2+'px'}"><img v-if="item.url" :src="item.url"/><div v-else class="li_text">宽度{{Math.floor(750/(index==0?1:2))}}像素</div></li>
                          </ul>
                      </div>
                  </div>
              </div>
           </div> 
           <div class="shop_margin">
          <div>图片间隙:</div>
           <a-row class="shop_margin_ant-row">
              <a-col class="shop_margin_rang">
                <a-slider :min="0" :max="30" v-model="mag" />
              </a-col>     
                
           </a-row>
           {{mag}}像素
        </div>
        <div class="shop_margin">
           <div>页面间距:</div>
           <a-row class="shop_margin_ant-row">
              <a-col class="shop_margin_rang">
                <a-slider :min="0" :max="30" v-model="pad" />
              </a-col>     
                
           </a-row>
           {{pad}}像素
        </div>
         <div class="card_item item">
                  <div class="card_choose_img" v-if="showItem[minIndex].url" >
                      <img :src="showItem[minIndex].url"/>
                  </div>
                  <div  class="card_choose_img" v-else  @click="addpicImage">
                      <a-icon type="plus" />
                      <div>添加图片</div>
                  </div>
                  
                  <div class="card_context">
                       <div class="card_href">
                           <span>链接：</span>
                        </div>
                  </div>
                  <!-- <div class="item_del" @click="itemDel(index)">
                  <em-icon type="icon-close-circle"></em-icon>
                </div> -->
         </div>
        <a-modal
        title="添加导航图片"
        v-model="visible"
        @ok="handleOk"
      >
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
          visible:false,
          selectIndex:0,
          mag:0,
          pad:0,
          minIndex:0//默认第一个
      }
  },
  methods:{
    ...mapActions({
      setCustomItems: 'custom/setCustomItems', 
    }),
    initData() {
      this.dataLists = this.shop_list[this.editIndex].options;
      this.selectIndex=this.shop_list[this.editIndex].config.selectIndex;
      this.$nextTick(()=>{
          this.shop_list[this.editIndex].options=[];
           let ListNum=this.selectIndex==2?2:this.selectIndex==3?3:this.selectIndex==4?4:this.selectIndex==5?4:this.selectIndex==6?3:3;
           while(ListNum>0){
               this.shop_list[this.editIndex].options.push({url:''});
               ListNum--;
           }
      });
    },
    changeSelectIndex(index){
      this.shop_list[this.editIndex].config={ 
          selectIndex:index,
          mag:this.mag,
          pad:this.pad
      }
      this.selectIndex=index;
      this.minIndex=0;
      this.$nextTick(()=>{
          let nowNum= this.shop_list[this.editIndex].options.length;
           let ListNum=this.selectIndex==2?2:this.selectIndex==3?3:this.selectIndex==4?4:this.selectIndex==5?4:this.selectIndex==6?3:3;
           if(nowNum<ListNum){
               console.log('增加');
              while(nowNum<ListNum){
               this.shop_list[this.editIndex].options.push({url:''});
               nowNum++;
           }
        }else if(nowNum==ListNum){
            console.log('相等');
        }else{
             console.log('删除');
            while(nowNum>ListNum){
               this.shop_list[this.editIndex].options.splice(nowNum-1,1);
               nowNum--;
           }
        }
      });
    },
    changeMinIndex(index){
       this.minIndex=index;
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
      urlList[this.minIndex].url=imgs[0].url;
       this.shop_list[this.editIndex].options=[...urlList];
      this.visible = false;
    },
    addpicImage(){
        this.visible=true;
    }
  },
  mounted(){
     this.initData();
  },
  watch:{
      mag(val){
        this.shop_list[this.editIndex].config={ 
          selectIndex:this.selectIndex,
          mag:val,
          pad:this.pad
      }
      },
      pad(val){
         this.shop_list[this.editIndex].config={ 
          selectIndex:this.selectIndex,
          mag:this.mag,
          pad:val
      }
      }
  }
}
</script>
<style lang="less" scoped>
.shop_list{
  
}
.shoose_temp{
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
  .temp_list{
        display: inline-block;
        max-width: 83%;
     .temp_item{
             width: 100px;
            height: 100px;
            display: inline-block;
            border: 1px solid #e5e5e5;
            margin: 0 10px 15px 0;
            padding-top: 5px;
            background-color: #fff;
            text-align: center;
            cursor: pointer;
            .item_img{
                width: 100px;
                height: 64px;
                padding: 0 5px;
                img{
                   height: auto;
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                    -ms-interpolation-mode: bicubic;
                    position: relative;
                }
            }
            .item_title{
               margin-top: 5px;
               height: 20px;
               line-height: 20px;
            }
     }
     ul{
          list-style: none;
         li{
             float: left;
             position: relative;
                  background-color: #e8f7fd;
                    border: 1px solid #bdf;
                    text-align: center;
                    color: #88c4dc;
                    cursor: pointer;
             .li_text{
                    width: 100%;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    -webkit-transform: translateX(-50%) translateY(-50%);
                    -moz-transform: translateX(-50%) translateY(-50%);
                    -ms-transform: translateX(-50%) translateY(-50%);
                    transform: translateX(-50%) translateY(-50%);
             }
             img{
                 width: 100%;
                 height: 100%;
             }
         }
         .active_li{
             border-color: #38f;
         }
     }
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
.card_item{
        position: relative;
        background-color: #fff;
        margin: 15px 0;
        padding: 15px;
        border: 1px dashed #e5e5e5;
        overflow: auto;
        .card_choose_img{
          float: left;
          display: inline-block;
          position: relative;
            width: 80px;
            height: 80px;
            -webkit-box-sizing: border-box;
            -moz-box-sizing: border-box;
            box-sizing: border-box;
            text-align: center;
            border: 1px dashed #ddd;
            color: #38f;
            cursor: pointer;
            overflow: hidden;
            i{
               font-size: 30px;
               line-height: 48px;
            }
            img{
                width: 100%;
                height: 100%;
            }
        }
        .card_context{
                float: left;
                width: 260px;
                margin-left: 10px;
            .card_title{
                margin-bottom: 15px;
                span{
                  display: inline-block;
                  width: 50px;
                  font-size: 12px;
                text-align: right;
                margin-right: 10px;
                }
                .card_input{
                  height: 30px;
                    max-height: 36px;
                    display: inline-block;
                    input{
                        display: inline-block;
                        min-width: 190px;
                        height: 100%;
                        -webkit-box-sizing: border-box;
                        -moz-box-sizing: border-box;
                        box-sizing: border-box;
                        padding: 0 10px;
                        margin: 0;
                        border: 1px solid #bbb;
                        color: #333;
                        font-size: 12px;
                        border-radius: 2px;
                    }
                }
            }
            .card_href{
                 span{
                    display: inline-block;
                    width: 50px;
                    font-size: 12px;
                    text-align: right;
                    margin-right: 10px;  
                 }
            }
        }
        .item_del{
            position :absolute;
            right :-10px;
            top :-18px;
            color: #666;
            z-index :4;
            font-size :20px;
            display :none;

        }
    }
</style>