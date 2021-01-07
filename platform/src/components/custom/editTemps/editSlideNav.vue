<template>
    <div class="shop_list">
        <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc;padding-bottom:10px;">图文导航</div>
        <div class="add_shop">
          <div class="add_lable">选择模板:</div>
          <div class="add_pic_nav" @click="changeNav(0)" :style="navCode==0?'border-color: #38f;':''">
              <div class="pic_nav">
                  <img src="@assets/img_1.png" width="90px" height="60px"/>
              </div>
              <div class="pic_title">图片导航</div>
          </div>
          <div class="add_pic_nav" @click="changeNav(1)" :style="navCode==1?'border-color: #38f;':''">
              <div class="pic_nav">
                  <img src="@assets/img_2.png" width="90px" height="60px"/>
              </div>
              <div class="pic_title">文字导航</div>
          </div>
          </div>
           <!--<div class="add_shop">-->
              <!--<div class="add_lable">背景颜色:</div><input type="color" v-model="backColor">-->
              <!--<a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>-->
           <!--</div>-->
           <!--<div class="add_shop">-->
              <!--<div class="add_lable">文字颜色:</div><input type="color" v-model="wordColor">-->
              <!--<a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backWordColor">重置</a>-->
           <!--</div>-->
          <div class="card_list">
            <draggable :options="sortOptions"   v-model="dataLists" style="position: relative">
              <div class="card_item item" v-for="(item,index) in dataLists" :key="index">
                  <div class="card_choose_img" v-if="navCode==0" @click="addpicImage(index)">
                      <div v-if="item.url===''">
                        <a-icon type="plus" />
                        <div>添加图片</div>
                      </div>
                    <div v-else class="imgBox">
                      <img :src="item.url" alt="">
                    </div>
                  </div>
                  <div class="card_context">
                       <div class="card_title" v-if="navCode!==0">
                           <span>标题：</span>
                           <div class="card_input"><input type="text" v-model="item.title"></div>
                       </div>
                       <div class="card_href">
                           <span>链接：</span>
                           <urlSelect :fit_up="config.isFitUp" @on-change="getChangeItem" :init_value="item.value" :url_type="item.urlType">
                             <a-button size="small" @click="getIndex(index)">跳转设置</a-button>
                           </urlSelect>
                        </div>
                  </div>
                  <div class="item_del" @click="itemDel(index)">
                  <em-icon type="icon-close-circle"></em-icon>
                </div>
             </div>
            </draggable>
          </div>
          <div class="add_card_list" @click="addCardList">
              <a-icon type="plus" />
              添加一个导航
          </div>
      <div class="mt20">
        <div class="mb10">页面上外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mT" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面下外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mB" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面左外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mL" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面右外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mR" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面上内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pT" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面下内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pB" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面左内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pL" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面右内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pR" />
        </div>
      </div>
      <div class="mt20" v-if="navCode==0">
        <div class="mb10">图片圆角：</div>
        <div>
          <a-slider :min="0"  v-model="config.r" />
        </div>
      </div>
      <div class="mt20" >
        <div class="mb10">背景颜色：</div>
        <div>
          颜色值：{{config.background}}
          <input type="color" v-model="config.background">
<!--          <a href="#" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>-->
        </div>
      </div>
      <div class="mt20" v-if="navCode==1">
        <div class="mb10">标题字体颜色：</div>
        <div>
          颜色值：{{config.wordColor}}
          <input type="color" v-model="config.wordColor">
<!--          <a href="javascript:void(0);" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backWordColor">重置</a>-->
        </div>
      </div>
      <div class="mt20" v-if="navCode==1">
        <div class="mb10">标题选中字体颜色：</div>
        <div>
          颜色值：{{config.wordActiveColor}}
          <input type="color" v-model="config.wordActiveColor" >
<!--          <a href="javascript:void(0);" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backWordColor">重置</a>-->
        </div>
      </div>
      <a-modal
        title="添加导航图片"
        v-model="visible"
        @ok="handleOk"
      >
          <UploadImage :defaultImageList="imageLists" :maximum="1" ref="uploadImageLists"></UploadImage>
      </a-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import draggable from 'vuedraggable';
import urlSelect from '../urlSelect/urlSelect';
import UploadImage from '@C/upload/UploadImage';

const sortOptions = {
  animation: 500,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  draggable: '.card_item',
};
export default {
  components: {
    draggable,
    urlSelect,
    UploadImage,
  },
  computed: {
    ...mapState({
      shop_list: state => state.custom.customItems,
    }),
    dataLists: {
      get() {
        return this.shop_list[this.editIndex].options;
      },
      set(val) {
        this.shop_list[this.editIndex].options = val;
      },
    },
    config() {
      return this.shop_list[this.editIndex].config;
    },
  },
  props: {
    editIndex: Number,
  },
  data() {
    return {
      sortOptions,
      visible: false,
      navCode: 0,
      backColor: '#ffffff',
      wordColor: '#333333',
      selectIndex: 0,
      changeIndex: 0,
      imageLists: [],
    }
  },
  methods: {
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
    getIndex(i) {
      this.changeIndex = i;
    },
    getChangeItem(item) {
      const title = this.shop_list[this.editIndex].options[this.changeIndex].title;
      const url = this.shop_list[this.editIndex].options[this.changeIndex].url;
      this.shop_list[this.editIndex].options[this.changeIndex] = item;
      this.shop_list[this.editIndex].options[this.changeIndex].title = title;
      this.shop_list[this.editIndex].options[this.changeIndex].url = url;
    },
    changeNav(i) {
      this.shop_list[this.editIndex].config.nav = i;
      this.navCode = i;
    },
    addCardList() {
      this.shop_list[this.editIndex].options.push({
        url: '',
        title: '',
        active: false
      });
    },
    itemDel(index) {
      let urlList = this.shop_list[this.editIndex].options;
      urlList.splice(index, 1);
      this.shop_list[this.editIndex].options = [...urlList];
      this.dataLists = urlList;
    },
    backBackColor() {
      this.backColor = '#ffffff';
    },
    backWordColor() {
      this.wordColor = '#000000';
    },
    handleOk() {
      const imgs = this.$refs.uploadImageLists.uploadImageList;
      if (imgs.length === 0) {
        this.$message.error('请选择图片');
        return;
      }
      let urlList = this.shop_list[this.editIndex].options;
      urlList[this.selectIndex].url = imgs[0].url;
      this.shop_list[this.editIndex].options = [...urlList];
      console.log(this.shop_list[this.editIndex].options)
      this.imageLists = [];
      this.minmun = 1;
      this.$refs.uploadImageLists.surplusNum = 1;
      this.visible = false;
    },
    addpicImage(index) {
      this.selectIndex = index;
      this.visible = true;
    }
  },
  mounted() {
  },
  watch: {
    backColor(val) {
      this.shop_list[this.editIndex].config = {
        nav: this.navCode,
        backColor: this.backColor,
        wordColor: this.wordColor,
      };
    },
    wordColor(val) {
      this.shop_list[this.editIndex].config = {
        nav: this.navCode,
        backColor: this.backColor,
        wordColor: this.wordColor,
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
  .add_pic_nav{
    width: 100px;
    height: 100px;
    display: inline-block;
    border: 1px solid #e5e5e5;
    margin: 0 10px 15px 0;
    padding-top: 5px;
    background-color: #fff;
    text-align: center;
    cursor: pointer;
    font-size: 12px;
    .pic_nav{
        width: 100px;
        height: 64px;
    }
    .pic_title{
       overflow: hidden;
    }
  }
}
.card_list{
    .card_item{
        position: relative;
        background-color: #fff;
        margin: 15px 0;
        padding: 15px;
        border: 1px dashed #e5e5e5;
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
            .imgBox{
              width:100%;
              height:100%;
              img{
                height:80%;
                width:80%;
                margin:10% auto 0;
              }
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
                 display: flex;
                 align-items: center;
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
    .card_item:hover .item_del{
        display: block;
    }
    .card_item::after{
        content: "";
        display: block;
        height: 0;
        clear:both;
        visibility: hidden;
    }
}
.add_card_list{
        margin: 15px 0;
        padding: 15px;
        border: 1px dashed #e5e5e5;
        color: #38f;
         cursor: pointer;
         background-color: #fff;
}
</style>
