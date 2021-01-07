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
            <a-select-option value="directSeeding">直播间</a-select-option>
            <a-select-option value="article">文章页</a-select-option>
            <a-select-option value="brandList">品牌列表</a-select-option>
            <a-select-option value="selfHelpScore">自助积分</a-select-option>
            <a-select-option value="integral">积分商城</a-select-option>
            <a-select-option value="cattleCoinStore">牛币商城</a-select-option>
            <a-select-option value="activity">活动页面</a-select-option>
            <a-select-option value="xiaochengxu">小程序跳转</a-select-option>
            <a-select-option value="customActivity">自定义活动</a-select-option>
            <a-select-option value="customUrl">自定义跳转</a-select-option>
            <a-select-option value="developed">功能开发中...</a-select-option>

            <!--<a-select-option value="generalize">推广页面</a-select-option>-->
          </a-select>
        </a-form-item>
        <a-form-item label="跳转数据地址" v-if="urlType === 'goods' || urlType === 'customActivity' || urlType === 'customUrl' || urlType === 'shop' || urlType === 'class' || urlType === 'directSeeding' || urlType === 'activity' || urlType === 'xiaochengxu'">
          <div v-if="urlType === 'goods'">
            <span v-if="value>0">商品id：{{value}}</span>
            <TableSelect :fit_up="fit_up" :goodId="Number(value)" selectionRef="radio" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><a-button icon="search" size="small">
              选择商品
            </a-button></TableSelect>
          </div>
          <div v-if="urlType === 'customActivity'">
            <span v-if="value">自定义活动：{{value}}</span>
            <TableSelect :activeId="Number(value)" selectionRef="radio" showType="customActivity" :selectionUrl="selectionCusTomUrl" @on-select-ok="selectedActivity"><a-button icon="search" size="small">
              选择自定义活动
            </a-button>
            </TableSelect>
          </div>
          <!-- 目前先写死一个 -->
          <!-- <div v-if="urlType === 'xiaochengxu'">
            <a-input style="width:200px" placeholder="请输入跳转小程序" v-model="valueid"/>
          </div> -->
          <div v-if="urlType === 'customUrl' || urlType === 'xiaochengxu'">
            <a-input style="width:200px" placeholder="请输入跳转路径" v-model="value"/>
          </div>
          <div v-else-if="urlType === 'shop'">
            <span v-if="value">店铺名称：{{value}}</span>
            <TableSelect :shopId="Number(value)" selectionRef="radio" showType="shop" :selectionUrl="selectionShopUrl" @on-select-ok="selectedShop"><a-button icon="search" size="small">
              选择店铺
            </a-button>
            </TableSelect>
          </div>
          <div v-else-if="urlType === 'class'">
            <a-cascader  style="width:200px" v-model="value" :options="classTree"  placeholder="请选择分类" changeOnSelect />
          </div>
          <div v-else-if="urlType === 'activity'">
            <a-select style="width:200px" placeholder="请选择活动类型"  v-model="value">
              <a-select-option value="seckill">商城秒杀</a-select-option>
              <a-select-option value="group">拼团购</a-select-option>
              <a-select-option value="couponList">领券中心</a-select-option>
              <a-select-option value="draw">抽奖转盘</a-select-option>
            </a-select>
          </div>
          <div v-else-if="urlType === 'directSeeding'">
            <a-input style="width:200px" placeholder="请输入房间号" v-model="value"/>
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
      classTree: state => state.config.classTree,
    }),
  },
  components: {
    TableSelect,
  },
  data() {
    return {
      urlType: 'goods',
      valueid:'',
      value: [],
      selectionGoodsUrl: Server.action.goods_lists,
      selectionShopUrl: Server.action.shop_lists,
      selectionCusTomUrl: Server.action.customList,
      isOpenModal: false,
      shop_type: '',
      showName: '',
      show: false,
    };
  },
  props: {
    fit_up: Number,
    fx: {
      type: Boolean,
      default: false,
    },
    url_type: String,
    init_value: [Number, Array, String],
  },
  created() {
    // console.log(this.init_value, this.url_type, 999);
  },
  watch: {
  },
  methods: {
    ...mapActions({
      getClassTree: 'config/getClassTree',
    }),
    selectedGoods(item) {
      console.log(item)
      if (item.length > 0) {
        this.value = item[0].id;
      }
    },
    selectedShop(item) {
      this.shop_type = item.shop_type
      if (item.data.length > 0) {
        this.value = item.data[0].id;
      }
    },
    selectedActivity(item) {
      // this.showName = item.activityTit
      if (item.data.length > 0) {
        this.value = item.data[0].id;
      }
    },
    showSelectItem(){
      switch (this.urlType) {
        case 'goods':
          console.log(this.value)
          this.showName = '商品id：'+ (this.value ? this.value : '无')
          break;
        case 'class':
          this.showName = (this.value.length === 1 ? '一级' : this.value.length === 2 ? '二级' : this.value.length === 3 ? '三级' : '') + '分类id：'+(this.value.length === 3 ? this.value[2] : this.value.length === 2 ? this.value[1] : this.value.length === 1 ? this.value[0] : '无' );
          break;
        case 'shop':
          this.showName = '店铺id：'+ (this.value?this.value:'无')
          break;
        case 'activity':
          switch (this.value) {
            case 'seckill':
              this.showName = '活动：商城秒杀';
              break;
            case 'group':
              this.showName = '活动：拼团购';
              break;
            case 'couponList':
              this.showName = '活动：领券中心';
              break;
            case 'draw':
              this.showName =  '活动：抽奖转盘';
              break;
            default:
              this.showName = '无';
          }
          break;
        case 'directSeeding':
          this.showName = '直播间：' + this.value + '号房间';
          break;
        case 'developed':
          this.showName = '功能开发中...';
          break;
        case 'integral':
          this.showName = '积分商城';
          break;
        case 'selfHelpScore':
          this.showName = '自助积分';
          break;
        case 'cattleCoinStore':
          this.showName = '牛币商城';
          break;
        case 'customActivity':
          this.showName = '自定义活动ID：' + this.value;
          break;
        case 'article':
          this.showName = '文章页';
          break;
        case 'customUrl':
          this.showName = '自定义：' + this.value;
          break;
        case 'xiaochengxu':
          this.showName = '小程序跳转：' + this.value;
          break;
        case 'brandList':
          this.showName = '品牌列表页';
          break;
        default:
          this.showName = '无';
      }
    },
    initId() {
      if(this.url_type) {
        this.urlType = this.url_type;
      }
      if (this.init_value) {
        this.value = this.init_value;
      }
      this.showSelectItem()
      this.show = true;
    },
    handleOk() {
      let params = {
        value: this.value,
        urlType: this.urlType,
        valueid: this.valueid,
      }
      if (this.urlType === 'shop') {
        params.shop_type = this.shop_type;
      }
      this.showSelectItem()
      this.show = true
      this.$emit('on-change', params)
      this.isOpenModal = false;
    },
    handleCancel() {
      this.isOpenModal = false;
    },
    typeChange() {
      switch (this.urlType) {
        case 'goods':
          this.value = [];
          this.valueid = '';
          break;
        case 'class':
          this.value = [];
          this.valueid = '';
          break;
        case 'developed':
          this.value = 1;
          this.valueid = '';
          break;
        case 'integral':
          this.value = 1;
          this.valueid = '';
          break;
        case 'selfHelpScore':
          this.value = 1;
          this.valueid = '';
          break;
        case 'cattleCoinStore':
          this.value = 1;
          this.valueid = '';
          break;
        case 'article':
          this.value = 1;
          this.valueid = '';
          break;
        case 'brandList':
          this.value = 1;
          this.valueid = '';
          break;
        case 'xiaochengxu':
          this.value = '';
          this.valueid = 'wxae84e7f8578d8883';
          break;
        default:
          this.value = '';
          this.valueid = '';
      }
    },
  },
  mounted() {
    this.show = false
    if (this.url_type) {
      this.initId();
    }
    this.getClassTree();
  },
};
</script>

<style scoped>

</style>
