<template>
  <div class="content single-item">
    <a-modal :visible="visible" @ok="handleOk" @cancel="handCancel">
      <a-form-item label="图片">
        <UploadImage
          :defaultImageList="defaultImage"
          :maximum="max"
          ref="uploadImage"
        ></UploadImage>
      </a-form-item>

      <a-form-item label="数据类型">
        <a-select :value="show_type" style="width:190px" @change="changeSelect">
          <a-select-option
            v-for="(item, index) in selectList"
            :value="item.value"
            :key="index"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="跳转数据地址" v-if="show_type === 'goods' || show_type === 'customActivity' || show_type === 'customUrl' || show_type === 'shop' || show_type === 'class' || show_type === 'directSeeding' || show_type === 'activity' || show_type === 'xiaochengxu'">
        <div v-if="show_type === 'goods'">
          已选择商品ID：{{ selectResult.value }}
          <TableSelect
            selectionRef="radio"
            showType="goods"
            :selectionUrl="selectionGoodsUrl"
            @on-select-ok="selected"
          >
            选择商品
          </TableSelect>
        </div>
        <div v-if="show_type === 'customActivity'">
          <span v-if="selectResult.value">自定义活动：{{selectResult.value}}</span>
          <TableSelect :activeId="Number(selectResult.value)" selectionRef="radio" showType="customActivity" :selectionUrl="selectionCusTomUrl" @on-select-ok="selectedActivity"><a-button icon="search" size="small">
            选择自定义活动
          </a-button>
          </TableSelect>
        </div>
        <div v-if="show_type === 'customUrl' || show_type == 'xiaochengxu' ">
          <a-input style="width:200px" placeholder="请输入跳转路径" v-model="selectResult.value"/>
        </div>
        <div v-else-if="show_type === 'shop'">
          <span v-if="selectResult.value">店铺名称：{{selectResult.value}}</span>
          <TableSelect :shopId="Number(selectResult.value)" selectionRef="radio" showType="shop" :selectionUrl="selectionShopUrl" @on-select-ok="selected"><a-button icon="search" size="small">
            选择店铺
          </a-button>
          </TableSelect>
        </div>
        <div v-if="show_type==='class'">
          已选择分类ID：{{ selectResult.value }}
          <div>
            <a-cascader  :options="classTree" @change="classChange" placeholder="请选择分类" />
          </div>
        </div>
        <div v-else-if="show_type === 'activity'">
          <a-select style="width:200px" placeholder="请选择活动类型"  v-model="selectResult.value">
            <a-select-option value="seckill">商城秒杀</a-select-option>
            <a-select-option value="group">拼团购</a-select-option>
            <a-select-option value="couponList">领券中心</a-select-option>
            <a-select-option value="draw">抽奖转盘</a-select-option>
          </a-select>
        </div>
        <div v-else-if="show_type === 'directSeeding'">
          <a-input style="width:200px" placeholder="请输入房间号" v-model="selectResult.value"/>
        </div>
      </a-form-item>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
import TableSelect from '@C/lists/TableSelect';
// import { stringify } from 'querystring';
import Server from '@/config/server';

export default {
  props: {
    visible: {
      type: Boolean,
      default: false,
    },
    max: {
      type: Number,
      default: 1,
    },
    defaultImage: {
      type: Array,
    },
    selectObj: {
      type: Object,
    },
    show_type: {
      type: String,
    },
    selectList: {
      type: Array,
    },
    selectId: {
      type: [String, Number],
      default: '',
    },
  },
  computed: {
    ...mapState({
      classTree: state => state.config.classTree,
    }),
  },
  components: {
    UploadImage,
    TableSelect,
  },
  data() {
    return {
      selectionGoodsUrl: Server.action.goods_lists,
      selectionShopUrl: Server.action.shop_lists,
      selectionCusTomUrl: Server.action.customList,
      selectResult: {
        image_url: '',
        show_type: '',
        value: '',
        shop_type: '',
      },
      inId: '',
    };
  },
  mounted() {
    this.getClassTree();
  },

  methods: {
    ...mapActions({
      getClassTree: 'config/getClassTree',
    }),
    selectedActivity(item) {
      if (item.data.length > 0) {
        this.selectResult.value = item.data[0].id;
      }
    },
    classChange(item) {
      if (item.length === 3) {
        this.selectResult.value = item[2];
      }
    },
    handleOk() {
      this.selectResult.image_url = this.$refs.uploadImage.uploadImageList[0].url;
      this.selectResult.show_type = this.selectResult.show_type || this.show_type;
      if (this.selectResult.show_type === 'shop' || this.selectResult.show_type === 'goods' || this.selectResult.show_type === 'class' || this.selectResult.show_type === 'directSeeding' || this.selectResult.show_type === 'activity' || this.selectResult.show_type === 'customUrl' || this.selectResult.show_type === 'customActivity' || this.selectResult.show_type === 'xiaochengxu') {
        this.selectResult.value = this.selectResult.value || this.selectId;
      } else {
        this.selectResult.value = '';
      }
      if (this.selectResult.show_type !== 'shop') {
        this.selectResult.shop_type = '';
      }
      this.$emit('ok', this.selectResult);
    },
    handCancel() {
      this.$emit('cancel');
    },
    changeSelect(value) {
      this.selectResult.show_type = value;
      this.selectResult.value = ''
      this.$emit('cgSelect', value);
    },
    selected(selection) {
      if (this.selectResult.show_type === 'shop' || this.show_type === 'shop') {
        this.selectResult.value = selection.data[0].id;
        this.selectResult.shop_type = selection.shop_type;
      } else {
        this.selectResult.value = selection[0].id;
        this.selectResult.shop_type = '';
      }
    },
  },
};
</script>

<style scoped lang="stylus"></style>
