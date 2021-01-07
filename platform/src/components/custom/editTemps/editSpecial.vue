<template>
    <div class="shop_list">
        <div class="page_header">
          <div class="page_title">
             <span>专题模块</span>
          </div>
        </div>
		<div class="page_group">
            大图导航：
        </div>
		<div class="page_group page_back">
            <div class="add_cart_item" v-if="config.nav_img.image_url!=''">
               <div class="cart_tim">
                  <div class="cart_left">
                     <img :src="config.nav_img.image_url"/>
                     <span class="modify-image" @click="changeImg(config.nav_img.image_url)">更换图片</span>
                  </div>
                  <div class="cart_right">
                    <div class="cart_link">
                       链接<div class="cart_link-item">
						    <urlSelect :fit_up="config.isFitUp" :url_type="config.nav_img.link_type" :init_value="config.nav_img.link_value"  @on-change="getChangeItem" :fx="true">
								<a-button size="small" @click="getIndex(index)">选择跳转的链接</a-button>
							</urlSelect>
					   </div>
                    </div>
                  </div>
                  <!-- <div class="cart_del">
                     x
                  </div> -->
               </div>
            </div>
            <div class="add_shop" v-else>
                <div class="add_card_list" @click="addCardList">
                  <a-icon type="plus" />
                   添加图文导航
                </div>
            </div>
        </div>
		<div class="page_group">
            浮动商品导航：
        </div>
        <div class="page_group page_back">
			<draggable :options="sortOptions" v-model="options">
            <div class="add_cart_item" v-for="(item,index) in options" :key="index">
               <div class="cart_tim">
                  <div class="cart_left">
                     <img :src="item.goods_image"/>
                     <!-- <span class="modify-image" @click="changeImg(index)">更换商品</span> -->
                  </div>
                  <div class="cart_right">
                    <div class="cart_title">
                       商品名称<span class="cart_link-item">{{item.goods_name}}</span>
                    </div>
                    <div class="cart_link">
                       商品价格<span class="cart_link-item">￥{{item.goods_price}}</span>
                    </div>
                  </div>
                  <div class="cart_del" @click="delSubEntry(index)">
                     x
                  </div>
               </div>
            </div>
        	  </draggable>
            <div class="add_shop">
                <div class="add_card_list">
                  <!-- <a-icon type="plus" /> -->
				   <TableSelect :fit_up="config.isFitUp" :goodId="options" selectionRef="checkbox" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><div class="add_icon"><a-icon type="plus" /></div></TableSelect>
                   添加商品
                </div>
            </div>
        </div>
        <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">图片样式</div>
                   <div class="add_value">{{config.template==0?'一行两个':config.template==1?'一行三个':'横向滑动'}}</div>
                </div>
                <div class="add_action">
                  <span :class="[config.template=='0'?'action_border':'']" @click="changeStyle(0)"><a-icon type="align-left" /></span>
                  <span :class="[config.template=='1'?'action_border':'']" @click="changeStyle(1)"><a-icon type="align-center" /></span>
				  <span :class="[config.template=='2'?'action_border':'']" @click="changeStyle(2)"><a-icon type="align-center" /></span>
                </div>
             </div>
          </div>
		  <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">图片间距</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="0" :max="10" v-model="config.xd" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.xd"/>
                  </div>
                </div>
             </div>
          </div>
		  <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">图片圆角</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="0" :max="20" v-model="config.radius" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.radius"/>
                  </div>
                </div>
             </div>
          </div>
		   <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">导航内间距</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="0" :max="10" v-model="config.pd" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.pd"/>
                  </div>
                </div>
             </div>
          </div>
		  <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">导航上外间距</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="-40" :max="10" v-model="config.md" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.md"/>
                  </div>
                </div>
             </div>
          </div>
		  <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">导航下外间距</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="0" :max="10" v-model="config.mg" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.mg"/>
                  </div>
                </div>
             </div>
          </div>
		  <div class="page_group">
             <div class="add_contain">
                <div class="add_title">
                   <div class="add_lable">组件外间距</div>
                   <div class="add_value"></div>
                </div>
                <div class="add_action">
                  <div class="add_slide">
                     <a-row class="shop_margin_ant-row">
                      <a-col class="shop_margin_rang">
                        <a-slider :min="0" :max="10" v-model="config.vd" />
                      </a-col>
                     </a-row>
                     <input type="number" v-model="config.vd"/>
                  </div>
                </div>
             </div>
          </div>
        <a-modal
        title="添加导航图片"
        v-model="visible"
        @ok="handleOk"
      >
       <div>
          <UploadImage :defaultImageList="imageLists" :maximum="minmun" ref="uploadImageLists"></UploadImage>
       </div>
      </a-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
import draggable from 'vuedraggable';
import UploadImage from '@C/upload/UploadImage';
import urlSelect from '../urlSelect/urlSelect';
import TableSelect from '@C/lists/TableSelect2';
import Server from '@/config/server';
const sortOptions = {
  animation: 500,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  draggable: '.card_item',
};
export default {
    components:{
      draggable,
	  UploadImage,
	  urlSelect,
	  TableSelect
    },
    computed: {
    ...mapState({
      shop_list: state => state.custom.customItems,
	}),
	 config() {
        return this.shop_list[this.editIndex].config;
      },
      options:{
        get() {
          return this.shop_list[this.editIndex].options;
        },
        set(val) {
          this.shop_list[this.editIndex].options = val;
        },
      }
  },
    props: {
    editIndex: Number,
  },
  data(){
      return{
		sortOptions,
        imageLists:[],
        visible:false,
        is_change:false,
		selectIndex:0,
		minmun:1,
		selectionGoodsUrl: Server.action.goods_lists,
      }
  },
  methods:{
    ...mapActions({
      setCustomItems: 'custom/setCustomItems',
    }),
     initData() {

	},
	 getChangeItem(item){
		console.log('选中',item);
		this.config.nav_img.link_value=item.value;
		this.config.nav_img.link_type=item.urlType;
	  },
	selectedGoods(item){
        this.shop_list[this.editIndex].options = item
      },
	getIndex(index){
		this.selectIndex=index;
	},
    addCardList(){
      this.visible=true;
    },
    addtextList(){
       const imgs = {
                type: "image_ad_selection",
                title: "",
                image_id: "1227",
                image_url: "",
                image_thumb_url: "",
                image_width: 100,
                image_height: 100,
                link_type: "",
                hot_areas: [],
                link_id: "",
                link_title: "",
                link_url: "",
                alias: ""
            };
            this.config.sub_entry.push(imgs);
    },
    showModel(){
       this.visible=true;
    },
     handleOk() {
        const imgs = this.$refs.uploadImageLists.uploadImageList;
        if (imgs.length === 0) {
          this.$message.error('请选择图片');
          return;
		}
		this.config.nav_img.image_url=imgs[0].url
      	this.visible = false;
	},
	delSubEntry(index){
		this.options.splice(index,1);
	},
    changeImg(url){
      if(url!= ''){
          this.imageLists = [{
            status:'finished',
            url:url
          }]
        }else{
          this.imageLists = []
        }
		// this.is_change=true;
        // this.selectIndex=index;
        this.visible=true

    },
    changeStyle(val){
	  this.config.template=val;
    },
    onChange(e){
       this.config.show_method=e.target.value
    }
  },
  mounted(){

  },
  watch:{

  }
}
</script>
<style lang="less" scoped>
.shop_list{
  height: 100%;
}
.page_header{
    padding: 24px 16px;
    border-bottom: 1px solid #f2f4f6;
   .page_title{
      display: flex;
      align-items: center;
      span{
            margin-right: auto;
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            color: #323233;
            text-align: left;
      }
   }
 }
 .list_nav{
    padding: 0 16px;
    margin-bottom: -1px;
    height: 48px;
    margin-bottom: 14px;
    border-bottom: 1px solid #dcdee0;
   .nav_item{
     white-space: nowrap;
     overflow-x: auto;
     display: flex;
     height: 100%;
     .item_tab{
           padding: 0 16px;
           position: relative;
            cursor: pointer;
            box-sizing: border-box;
            text-align: center;
            flex: 1;
            height: 100%;
            line-height: 48px;
            font-size: 14px;
     }
     .item_line{
           border-bottom: 2px solid #155bd4;
           margin-bottom: -1px;
     }
   }
 }
 .page_group{
   padding: 12px 16px;
   .shop_card{
      background-color: #f7f8fa;
     .shop_list{
       display: flex;
       flex-direction: column;
       align-items: stretch;
       justify-content: flex-start;
       .shop_item{
        float: left;
        flex-direction: column;
        width: 50px;
        height: 50px;
        padding: 0;
        margin: 5px 10px 5px 0;
        border: none;
        box-shadow: 0 0 4px 0 rgba(10,42,97,.2);
        cursor: pointer;
       }
       .shop_img:hover{
          border: 1px solid #155bd4;
       }
       .shop_add{
         box-sizing: border-box;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          border-radius: 2px;
          background: #fff;
          color: #155bd4;
          font-size: 14px;
          line-height: 20px;
       }
     }
     .shop_tips{
       color: #d40000;
       margin-top: 10px;
       font-size: 12px;
       line-height: 18px;
     }
   }
 }
 .page_back{
   background-color: #f7f8fa;
 }
.add_card_list{
        padding: 15px;
        border: 1px dashed #e5e5e5;
        color: #38f;
        cursor: pointer;
        background-color: #fff;
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
.add_cart_item{
   position: relative;
    box-sizing: border-box;
    position: relative;
    border-radius: 2px;
    background-color: #fff;
    box-shadow: 0 0 4px 0 rgba(10,42,97,.2);
  .cart_tim{
      padding: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 12px;
      .cart_left{
            position: relative;
            width: 60px;
            height: 60px;
            border: 1px solid #e5e5e5;
            text-align: center;
            background: #f2f4f6;
            img{
              width: 100%;
              height: 100%;
            }
            .modify-image{
              position: absolute;
              bottom: 0;
              left: 0;
              width: 100%;
              height: 20px;
              line-height: 20px;
              font-size: 12px;
              color: #fff;
              background: rgba(0,0,0,.5);
              cursor: pointer;
            }
      }
      .cart_right{
        flex: 1;
        .cart_title{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding: 5px 10px;
          input{
                font-size: 14px;
                color: #969799;
                line-height: 18px;
                white-space: nowrap;
                margin-left: 10px;
                flex: 1;
                border: 1px solid #999;
                padding: 3px 2px;
          }
        }
        .cart_link{
          display: flex;
          justify-content: flex-start;
          align-items: center;
          padding:5px 10px;
          .cart_link-item{
            margin-left: 10px;
            flex: 1;
          }
        }
      }
      .cart_del{
        display: none;
        position: absolute;
        right: -10px;
        top: -10px;
        z-index: 99;
        width: 20px;
        height: 20px;
        border-radius: 10px;
        line-height: 16px;
        text-align: center;
        font-size: 16px;
        color: #fff;
        background-color: #ccc;
        box-sizing: border-box;
        cursor: pointer;
      }

  }

}
.add_cart_item:hover .cart_del{
  display: block;
}
.add_shop{
   display: flex;
   justify-content: flex-start;
   flex-direction: column;
   align-items: stretch;
   font-size: 14px;
  .add_lable{
    display: flex;
    align-items: center;
  }
  .add_context{
       display: flex;
    align-items: center;
    margin-top: 10px;
    height: 32px;
     input{
           flex: 1;
            min-width: 80px;
            height: 100%;
            box-sizing: border-box;
            padding: 0 10px;
            margin: 0;
            font-size: 14px;
            box-shadow: none;
            border: 1px solid #dcdee0;
     }
     }
    .add_text{
      height: auto;
    }
    .add_action{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
    margin-top: 10px;
     span{
       z-index: 3;
       position: relative;
       display: inline-block;
       line-height: 20px;
       width: 100%;
       padding: 0 14px;
       border-radius: 0;
       font-size: 16px;
       font-weight: 500;
       height: 32px;
       line-height: 30px;
       text-align: center;
       border: 1px solid #ebedf0;
       cursor: pointer;
     }
     .action_border{
       border-color: #155bd4;
       background-color: #e0edff;
       color: #155bd4;
     }
  }
  .add_style{
    span{
      font-size: 12px;
      padding: 0px;
    }
  }
  }
.add_contain{
    display: flex;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;
  .add_title{
    display: flex;
    align-items: center;
     .add_lable{
            margin-right: 16px;
            font-size: 14px;
            color: #969799;
            line-height: 18px;
            white-space: nowrap;
     }
     .add_value{
            font-size: 14px;
            font-weight: 500;
            color: #323233;
            line-height: 18px;
            margin-right: 16px;
     }
  }
  .add_action{
    flex: 1;
    display: flex;
    justify-content: flex-end;
    align-items: center;
     span{
       z-index: 3;
       position: relative;
       display: inline-block;
       line-height: 20px;
       width: 100%;
       padding: 0 14px;
       border-radius: 0;
       font-size: 16px;
       font-weight: 500;
       height: 32px;
       line-height: 30px;
       text-align: center;
       border: 1px solid #ebedf0;
       width: 50px;
       cursor: pointer;
     }
     .action_border{
       border-color: #155bd4;
       background-color: #e0edff;
       color: #155bd4;
     }
     .add_slide{
           display: flex;
          align-items: center;
          min-height: 30px;
          padding: 8px 7px;
          flex: 1;
          .shop_margin_ant-row{
               flex: 1;
          }
          input{
              display: flex;
              margin-left: 24px;
              line-height: 30px;
              height: 30px;
              box-sizing: border-box;
              border: 1px solid #dcdee0;
              border-radius: 2px;
              box-sizing: border-box;
              padding: 0 10px;
              margin: 0;
              font-size: 14px;
              width: 60px;
          }
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
