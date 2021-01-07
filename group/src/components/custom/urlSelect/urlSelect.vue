<template>
  <div>
    <div :class="{'fxBox1':fx?true:false}">
      <div v-if="show" class="mr10">
        {{showName}}
      </div>
      <div @click="isOpenModal = true">
        <slot></slot>
      </div>
    </div>
    <a-modal :visible="isOpenModal" :closable="false" :maskClosable="false" @ok="handleOk" @cancel="handleCancel" title="跳转地址选择">
      <a-form :label-width="80">
        <a-form-item label="数据类型">
          <a-select style="width:200px" placeholder="请选择图片跳转地址" @change="typeChange" v-model="urlType">
            <a-select-option value="goods">商品</a-select-option>
            <a-select-option value="shop">店铺</a-select-option>
            <a-select-option value="class">分类</a-select-option>
            <a-select-option value="activity">活动页面</a-select-option>
            <!--<a-select-option value="generalize">推广页面</a-select-option>-->
          </a-select>
        </a-form-item>
        <a-form-item label="跳转数据地址">
          <div v-if="urlType === 'goods'">
            <span v-if="value>0">商品id：{{value}}</span>
            <TableSelect :goodId="Number(value)" selectionRef="radio" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><a-button icon="search" size="small">
              选择商品
            </a-button></TableSelect>
          </div>
          <div v-else-if="urlType === 'shop'">
            <span v-if="value">店铺名称：{{value}}</span>
            <TableSelect :shopId="Number(value)" selectionRef="radio" showType="shop" :selectionUrl="selectionShopUrl" @on-select-ok="selectedShop"><a-button icon="search" size="small">
              选择店铺
            </a-button>
            </TableSelect>
          </div>
          <div v-else-if="urlType === 'class'">
            <a-cascader  style="width:200px" v-model="value" :options="classTree"  placeholder="请选择分类" />
          </div>
          <div v-else-if="urlType === 'activity'">
            <a-select style="width:200px" placeholder="请选择活动类型"  v-model="value">
              <a-select-option value="seckill">商城秒杀</a-select-option>
              <a-select-option value="group">拼团购</a-select-option>
              <a-select-option value="couponList">领券中心</a-select-option>
            </a-select>
          </div>
          <div v-else-if="urlType === 'generalize'">
            <a-select style="width:200px" placeholder="请选择推广类型"  v-model="value">
              <a-select-option value="afsj">奥飞视界</a-select-option>
            </a-select>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import TableSelect from '@C/lists/TableSelect2';
import Server from '@/config/server';
import { mapState, mapActions } from 'vuex';
export default {
  computed: {
    ...mapState({
      classTree: state => state.config.classTree
    })
  },
  components: {
    TableSelect,
  },
  data() {
    return {
      selectionGoodsUrl: Server.action.goods_lists,
      selectionShopUrl: Server.action.shop_lists,
      isOpenModal:false,
      urlType:'goods',
      value:[],
      shop_type:'',
      showName:'22',
      show:false,
    };
  },
  props: {
    fx:{
      type:Boolean,
      default:false
    },
    url_type:String,
    init_value: [Number,Array,String],
  },
  watch: {
  },
  methods: {
    ...mapActions({
      getClassTree: 'config/getClassTree',
    }),
    selectedGoods(item){
      console.log(item)
      if(item.length>0){
        this.value = item[0].id
      }
    },
    selectedShop(item){
      this.shop_type = item.shop_type
      if(item.data.length>0){
        this.value = item.data[0].id
      }

    },
    showSelectItem(){
      switch (this.urlType) {
        case 'goods':
          console.log(this.value)
          this.showName = '商品id：'+ (this.value?this.value:'无')
          break;
        case 'class':
          this.showName = '分类id：'+(this.value.length===3?this.value[2]:'无')
          break;
        case 'shop':
          this.showName = '店铺id：'+ (this.value?this.value:'无')
          break;
        case 'activity':
          switch (this.value) {
            case 'seckill':
              this.showName = '活动：商城秒杀'
              break;
            case 'group':
              this.showName =  '活动：拼团购'
              break;
            case 'couponList':
              this.showName =  '活动：领券中心'
              break;
            default:
              this.showName = '无'
          }
          break;
        case 'generalize':
          switch (this.value) {
            case 'afsj':
              this.showName = '推广：奥飞视界'
              break;
            default:
              this.showName = '无'
          }
          break;
      }
    },
    initId(){
      if(this.url_type){
        this.urlType=this.url_type
      }
      if(this.init_value){
        this.value = this.init_value
      }
      this.showSelectItem()
      this.show = true
    },
    handleOk(){
      let params = {
        value:this.value,
        urlType:this.urlType,
      }
      if(this.urlType === 'shop'){
        params.shop_type = this.shop_type
      }
      this.showSelectItem()
      this.show = true
      this.$emit('on-change',params)
      this.isOpenModal  = false
    },
    handleCancel(){
      this.isOpenModal = false
    },
    typeChange(){
      switch (this.urlType) {
        case 'goods':
          this.value = []
          break;
        case 'class':
          this.value = []
          break;
        default:
          this.value = ''
      }
    }
  },
  mounted() {
    this.show = false
    if(this.url_type){
      this.initId()
    }
    this.getClassTree()
  },
};
</script>

<style scoped>

</style>
