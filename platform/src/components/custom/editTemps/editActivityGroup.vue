<template>
  <div class="shop_list">
    <div class="card_list">
      <div class="card_item item" v-for="(item,index) in dataLists" :key="index">
        <div class="card_context">
          <div class="card_title">
            <span>主标题：</span>
            <div class="card_input">
              <input type="text" class="ipt-txt" v-model="item.main_title"></div>
          </div>
          <div class="card_title">
            <span>副标题：</span>
            <div class="card_input">
              <input type="text" v-model="item.title" class="ipt-txt"></div>
          </div>
          <div class="card_title">
            <span>开启倒计时：</span>
            <div class="card_input">
              <a-switch :defaultChecked="item.countDown" @change="changeSwitch($event, index)"/>
            </div>
          </div>
          <div class="card_href">
            <span>链接：</span>
            <urlSelect :fit_up="showConfig.isFitUp" @on-change="getChangeItem" :init_value="item.value" :url_type="item.urlType">
              <a-button size="small" @click="getIndex(index)">跳转设置</a-button>
            </urlSelect>
          </div>

          <div class="card_title">
            <span>主标题色：</span>
            <div class="card_input">
              颜色值：{{item.mTitCol}}
              <input type="color" class="ipt-color" v-model="item.mTitCol">
            </div>
          </div>
          <div class="card_title">
            <span>副标题色：</span>
            <div class="card_input">
              颜色值：{{item.titCol}}
              <input type="color" class="ipt-color" v-model="item.titCol">
            </div>
          </div>
        </div>
        <div class="add_shop">
          <div class=" showGoodsLists">
            <div class="add_lable">商品:</div>
            <TableSelect :goodId="item.goodsList" :numLimit="2" selectionRef="checkbox" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><div class="add_icon" @click="getIndex(index)"><a-icon type="plus" /></div></TableSelect>
          </div>
          <draggable :options="sortOptions" v-model="item.goodsList" class="goodsBox" >
            <div v-for="(goodsItem,i) in item.goodsList" :key="i" class="selectGoods">
              <img :src="goodsItem.goods_image">
              <a-popconfirm title="确认删除该数据?" @confirm="itemDel(index, i)" okText="确认" cancelText="取消">
                <div class="item_del">
                  <em-icon type="icon-close-circle"></em-icon>
                </div>
              </a-popconfirm>
            </div>
          </draggable>
        </div>
      </div>
    </div>

    <div class="mt20">
      <div class="mb10">页面上外边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.mT" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面下外边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.mB" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面左外边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.mL" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面右外边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.mR" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面上内边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.pT" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面下内边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.pB" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面左内边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.pL" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">页面右内边距：</div>
      <div>
        <a-slider :min="0" v-model="showConfig.pR" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">圆角：</div>
      <div>
        <a-slider :min="0"  v-model="showConfig.r" />
      </div>
    </div>
    <div class="mt20">
      <div class="mb10">背景色：</div>
      <div>
        颜色值：{{showConfig.background}}
        <input type="color" v-model="showConfig.background" >
      </div>
    </div>
  </div>
</template>
<script>// import { mapState, mapActions } from 'vuex';
import TableSelect from '@C/lists/TableSelect2';
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
      if (this.editType === 'index') {
        return this.$store.state.custom.customItems;
      } else if (this.editType === 'activity') {
        return this.$store.state.custom.activityItems;
      }
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
      changeIndex: 0,
      sortOptions,
      selectionGoodsUrl: Server.action.goods_lists,
    }
  },
  methods: {
    itemDel(index, i) {
      console.log(index, 567);
      this.shop_list[this.editIndex].options[index].goodsList.splice(i, 1);
    },
    getIndex(i) {
      this.changeIndex = i;
    },
    changeSwitch(checked, index) {
      this.shop_list[this.editIndex].options[index].countDown = checked;
    },

    getChangeItem(item) {
      this.shop_list[this.editIndex].options[this.changeIndex].urlType = item.urlType;
      this.shop_list[this.editIndex].options[this.changeIndex].value = item.value;
      if (item.urlType === 'shop') {
        this.shop_list[this.editIndex].options[this.changeIndex].shop_type = item.shop_type;
      }
    },
    selectedGoods(item) {
      // if(item.length > 2){
      //   this.$notification['warning']({
      //     message: '请重新选择！',
      //     description:
      //       '最多选择两个商品',
      //   });
      //   return false;
      // }
      this.shop_list[this.editIndex].options[this.changeIndex].goodsList = item;
    },
  },
  mounted() {
  },
  watch: {
  },
}
</script>
<style lang="less" scoped>
  .showGoodsLists{
    display: flex;
    flex-wrap: wrap;
  }
  .goodsBox{
    position: relative;
    display: flex;
    flex-wrap: wrap;
    padding:0px 20px 0 65px;
    .selectGoods{
      width:50px;
      height:50px;
      margin-right:15px;
      margin-top:15px;
      cursor: pointer;
      position: relative;
      &:hover .item_del{
        display: block;
      }
      img{
        width:100%;
        height:100%
      }
      .item_del{
        position: absolute;
        right: -8px;
        top: -14px;
        color: #666;
        z-index: 4;
        font-size: 16px;
        display: none;
        cursor: pointer;
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
      }
      .card_context{
        width: 100%;
        margin-left: 10px;
        .card_title{
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          span{
            flex:none;
            width: 75px;
            font-size: 12px;
            text-align: right;
            margin-right: 10px;
          }
          .card_input{
            .ipt-txt{
              display: inline-block;
              height: 30px;
              min-width: 150px;
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
            .ipt-color{
              height: 20px;
            }
          }
        }
        .card_href{
          display: flex;
          align-items: center;
          margin-bottom: 15px;
          span{
            width: 75px;
            font-size: 12px;
            text-align: right;
            margin-right: 10px;
          }
        }
      }
      /*.item_del{*/
      /*  position :absolute;*/
      /*  right :-10px;*/
      /*  top :-18px;*/
      /*  color: #666;*/
      /*  z-index :4;*/
      /*  font-size :20px;*/
      /*  display :none;*/

      /*}*/
    }
    /*.card_item:hover .item_del{*/
    /*  display: block;*/
    /*}*/
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
</style>
