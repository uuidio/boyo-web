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
            <a-select-option value="class">分类</a-select-option>
            <a-select-option  value="activity">活动页面</a-select-option>
            <a-select-option  value="room">直播</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="跳转数据地址">
          <div v-if="urlType === 'goods'">
            <span v-if="value>0">商品id：{{value}}</span>
            <TableSelect :goodId="Number(value)" selectionRef="radio" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods"><a-button icon="search" size="small">
              选择商品
            </a-button>
            </TableSelect>
          </div>
          <div v-else-if="urlType === 'class'">
            <div class="fxBox1">
<!--              <a-select style="width:80px" @change="levelChange" v-model="level" placeholder="分类级别">-->
<!--                <a-select-option :value="1">-->
<!--                  一级-->
<!--                </a-select-option>-->
<!--                <a-select-option :value="2">-->
<!--                  二级-->
<!--                </a-select-option>-->
<!--              </a-select>-->
              <a-cascader style="width:200px" v-model="value" :options="shopClassTree"  placeholder="请选择分类" />
            </div>
          </div>
          <div v-else-if="urlType === 'activity'">
            <a-select style="width:200px" placeholder="请选择活动类型"  v-model="value">
              <a-select-option value="group">拼团购</a-select-option>
              <a-select-option value="seckill">秒杀</a-select-option>
              <a-select-option value="couponList">领券中心</a-select-option>
            </a-select>
          </div>
          <div v-else-if="urlType==='room'">
            <a-input v-model="value" placeholder="请输入直播间号(由品牌端创建直播后分配)" />
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import TableSelect from '@C/goodsList/TableSelect';
import Server from '@/config/server';
import { mapActions } from 'vuex';

export default {
  components: {
    TableSelect,
  },
  data() {
    return {
      selectionGoodsUrl: Server.action.goods_lists,
      isOpenModal: false,
      urlType: 'goods',
      value: [],
      shop_type: '',
      showName: '',
      show: false,
      allShopClassTree: [
      ],
      shopClassTree: [],
      level: 2,
    };
  },
  props: {
    fx: {
      type: Boolean,
      default: false,
    },
    modelType: {
      type: String,
      default: '',
    },
    init_level: {
      type: Number,
      default: 2,
    },
    url_type: String,
    init_value: [Number, Array, String],
  },
  watch: {
  },
  methods: {
    ...mapActions({
      getShopClassTree: 'goods/getShopClassTreeTwo',
    }),
    levelChange() {
      this.value = [];
      this.initClass();
    },
    filterData(res) {
      const arr = [];
      res.forEach((item) => {
        const obj = {
          value: item.value,
          label: item.label,
        };
        if (item.children && item.class_level < this.level) {
          obj.children = this.filterData(item.children);
        }
        arr.push(obj);
      });
      return arr;
    },
    initClass() {
      this.shopClassTree = this.filterData(this.allShopClassTree);
    },
    selectedGoods(item) {
      if (item.length > 0) {
        this.value = item[0].id;
      }
    },
    showSelectItem() {
      switch (this.urlType) {
        case 'goods':
          this.showName = `商品id：${this.value ? this.value : '无'}`;
          break;
        case 'room':
          this.showName = `直播房间号：${this.value ? this.value : '无'}`;
          break;
        case 'class':
          this.showName = `分类id：${this.value || '无'}`;
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
              this.showName = '活动：抽奖';
              break;
            case 'integral':
              this.showName = '活动：积分商城';
              break;
            case 'bargain':
              this.showName = '活动：砍价活动';
              break;
            default:
              this.showName = '无';
          }
          break;
      }
    },
    initId() {
      this.show = false;
      if (this.url_type) {
        this.urlType = this.url_type;
      }
      if (this.init_level) {
        this.level = this.init_level;
      }
      if (this.init_value) {
        this.value = this.init_value;
      }
      this.showSelectItem();
      this.show = true;
    },
    handleOk() {
      const params = {
        value: this.value,
        urlType: this.urlType,
        level: this.level,
      };
      this.showSelectItem();
      this.show = true;
      this.$emit('on-change', params);
      this.isOpenModal = false;
    },
    handleCancel() {
      this.isOpenModal = false;
    },
    typeChange() {
      switch (this.urlType) {
        case 'goods':
          this.value = [];
          break;
        case 'class':
          this.value = [];
          break;
        default:
          this.value = '';
      }
    },
  },
  mounted() {
    this.show = false;
    if (this.url_type) {
      this.initId();
    }
    this.getShopClassTree().then((res) => {
      this.allShopClassTree = res;
      this.initClass();
    });
  },
};
</script>

<style scoped>

</style>
