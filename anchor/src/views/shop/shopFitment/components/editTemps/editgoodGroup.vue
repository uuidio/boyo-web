<template>
  <div class="shop_list">
    <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">商品</div>
    <div class="add_shop">
      <div class="showGoodsLists">
        <div class="add_lable">商品:</div>
        <TableSelect :goodId="dataLists" selectionRef="checkbox" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><div class="add_icon"><a-icon type="plus" /></div></TableSelect>
      </div>
      <draggable :options="sortOptions" v-model="dataLists" class="goodsBox">
        <div v-for="(goodsItem,index) in dataLists" class="selectGoods">
          <a-popconfirm title="确认删除该数据?" @confirm="goodsItemDel(index)" okText="确认" cancelText="取消">
            <div class="item_del">
              <em-icon type="icon-close-circle"></em-icon>
            </div>
          </a-popconfirm>
          <img :src="goodsItem.goods_image">
        </div>
      </draggable>
    </div>
    <div class="list_item_style">
      <span>列表样式:</span>
      <a-radio-group name="radioGroup" v-model="showConfig.list_num"  @change="changeCheck">
        <a-radio :value="1" :style="style">大图模式</a-radio>
        <a-radio :value="2" :style="style">一行两个</a-radio>
        <a-radio :value="3" :style="style">一行三个</a-radio>
        <a-radio :value="6" :style="style2">横向滑动</a-radio>
      </a-radio-group>
    </div>
    <div class="list_item_style" v-if="showConfig.list_num==6">
      <span>查看更多跳转地址:</span>
      <urlSelect @on-change="getChangeItem" :init_level="showConfig.init_level" :url_type="showConfig.urlType" :init_value="showConfig.value" >
        <a-button size="small">跳转设置</a-button>
      </urlSelect>
    </div>
    <div class="mt20">
      <div class="mb10">页面外边距：</div>
      <div>
        <a-slider :min="0"  v-model="showConfig.m" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">圆角：</div>
      <div>
        <a-slider :min="0"  v-model="showConfig.r" />
      </div>
    </div>
  </div>
</template>
<script>
import TableSelect from '@C/goodsList/TableSelect';
import draggable from 'vuedraggable';
import Server from '@/config/server';
import urlSelect from '../urlSelect/urlSelect';

const sortOptions = {
  animation: 500,
  ghostClass: 'sortable-ghost',
  chosenClass: 'sortable-chosen',
  dragClass: 'sortable-drag',
  draggable: '.selectGoods',
};
export default {
  components: {
    draggable,
    TableSelect,
    urlSelect,
  },
  computed: {
    shop_list() {
      return this.$store.state.shop.customItems;
    },
    showConfig() {
      return this.shop_list[this.editIndex].config;
    },

    dataLists: {
      get() {
        return this.shop_list[this.editIndex].options;
      },
      set(val) {
        this.shop_list[this.editIndex].options = val;
      },
    },
  },
  props: {
    editIndex: Number,
    editType: {
      type: String,
      default: 'index',
    },
  },
  data() {
    return {
      sortOptions,
      goodsFlag: false,
      selectionGoodsUrl: Server.action.goods_lists,
      goodsData: [],
      style: {
        cursor: 'pointer',
        'font-weight': '400',
        'line-height': '14px',
        margin: 0,
        padding: 0,
        'margin-right': '15px',
        'vertical-align': 'middle',
        width: '85px',
        display: 'inline-block',
        'font-size': '12px',
      },
      style2: {
        cursor: 'pointer',
        'font-weight': '400',
        'line-height': '14px',
        margin: 0,
        padding: 0,
        'margin-right': '15px',
        'vertical-align': 'middle',
        width: '85px',
        display: 'inline-block',
        'font-size': '12px',
        'margin-top': '10px',
      },
      visible: false,
      titleList: [],
    };
  },
  methods: {
    getChangeItem(item) {
      this.shop_list[this.editIndex].config.urlType = item.urlType;
      this.shop_list[this.editIndex].config.value = item.value;
    },
    goodsItemDel(index) {
      this.dataLists.splice(index, 1);
    },
    selectedGoods(item) {
      this.shop_list[this.editIndex].options = item;
    },
    changeCheck(e) {
      console.log('商品排列一行个数', e.target.value);
      const val = e.target.value;
      this.shop_list[this.editIndex].config.list_num = e.target.value;
    },
  },
  mounted() {
  },
  watch: {
    dataLists() {
      console.log(this.dataLists);
    },
  },
};
</script>
<style lang="less" scoped>
  .showGoodsLists{
    display: flex;
    flex-wrap: wrap;
  }
  .selectGoods:hover .item_del {
    display: block;
  }
  .goodsBox{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding:0px 20px 0 65px;
    .selectGoods{
      position: relative;
      width:50px;
      height:50px;
      margin-right:8px;
      margin-top:10px;
      cursor:pointer;
      &:hover .item_del {
        display: block;
      }
      .item_del {
        position: absolute;
        right: -8px;
        top: -12px;
        color: #666;
        z-index: 4;
        font-size: 16px;
        display: none;
        cursor: pointer;
      }
      img{
        width:100%;
        height:100%
      }
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
