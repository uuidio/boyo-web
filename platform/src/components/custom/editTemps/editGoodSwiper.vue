<template>
  <div class="shop_list">
    <div>
      <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">商品</div>
      <div class="add_shop">
        <div class="fxBox1 mb20">
          <div style="margin-left:5px">模块标题：</div>
          <a-input placeholder="请输入模块标题" style="width:200px" v-model="showConfig.title"></a-input>
        </div>
        <div class="showGoodsLists">
          <div class="add_lable">商品轮播:</div>
          <TableSelect :fit_up="showConfig.isFitUp" :goodId="dataLists" selectionRef="checkbox" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><div class="add_icon"><a-icon type="plus" /></div></TableSelect>
        </div>
        <draggable :options="sortOptions" v-model="dataLists" class="goodsBox" >
          <div v-for="(goodsItem,index) in dataLists" class="selectGoods">
            <img :src="goodsItem.goods_image">
          </div>
        </draggable>

      </div>
    </div>
    <div class="list_item_style">
      <span>是否默认展开:</span>
      <a-radio-group name="radioGroup" v-model="showConfig.is_open" >
        <a-radio :value="1">是</a-radio>
        <a-radio :value="0">否</a-radio>
      </a-radio-group>
    </div>
  </div>
</template>
<script>
  import { mapState, mapActions } from 'vuex';
  import TableSelect from '@C/lists/TableSelect2';
  import draggable from 'vuedraggable';
  import Server from '@/config/server';
  const sortOptions = {
    animation: 500,
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    draggable: '.selectGoods',
  };
  export default {
    components:{
      draggable,
      TableSelect,
    },
    computed: {
      shop_list(){
        return this.$store.state.custom.customItems
      },
      showConfig(){
        return this.shop_list[this.editIndex].config;
      },

      dataLists:{
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
      editType:{
        type:String,
        default:'index'
      }
    },
    data(){
      return{
        sortOptions,
        goodsFlag:false,
        selectionGoodsUrl: Server.action.goods_lists,
        goodsData:[],
        visible:false,
        titleList:[]
      }
    },
    methods:{
      getChangeItem(item){
        this.shop_list[this.editIndex].config.urlType = item.urlType
        this.shop_list[this.editIndex].config.value = item.value
        if(item.urlType==='shop'){
          this.shop_list[this.editIndex].config.shop_type = item.shop_type
        }
      },
      selectedGoods(item){
        this.shop_list[this.editIndex].options = item
      },

    },
    mounted(){
    },
    watch:{
      dataLists(){
        console.log(this.dataLists)
      }
    }
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
      margin-right:8px;
      margin-top:10px;
      cursor: pointer;
      img{
        width:100%;
        height:100%
      }
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
