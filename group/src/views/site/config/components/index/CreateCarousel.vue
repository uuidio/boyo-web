<template>
  <div>
    <a-modal width="80%" :visible="isOpenModal" :closable="false" :maskClosable="false" @ok="handleOk" @cancel="handleCancel" :title="'添加' + modelName">
      <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="listField" :dataSource="listData" :pagination="false">
       <div slot="image_url" slot-scope="image_url,item">
         <img  :src="image_url" alt="" height="50" />
       </div>
        <div v-if="modelName === '商品轮播'" slot="value" slot-scope="text, item">
          {{ item.value.length }}
        </div>
        <div v-else-if="modelName === '热卖单品'" slot="value" slot-scope="text, item">{{ item.value.length }}个商品</div>
        <span slot="action" slot-scope="text, record, index">
          <a-button class="btn-success mr10" size="small" @click="upRow(index)">上移</a-button>
          <a-button class="btn-info mr10" size="small" @click="editRow(index, record)">编辑</a-button>
          <a-button class="btn-error" size="small" @click="remove(index)">删除</a-button>
        </span>
      </a-table>
      <a-button @click="addItem" size="large" type="dashed" style="width:100%;margin-top:10px;">添加</a-button>
    </a-modal>
    <a-modal :title="'添加' + modelName" :visible="addModal" :maskClosable="false" @ok="addCarousel" @cancel="handleCancelAdd">
      <a-form :label-width="80">
        <a-form-item label="图片" v-if="addModal"><UploadImage :defaultImageList="defaultImage" :maximum="1" ref="uploadImage"></UploadImage></a-form-item>
        <a-form-item label="图片跳转地址" v-if="hotGoods">
          <a-select placeholder="请选择图片跳转地址" v-model="hotGoodsUrl">
            <a-select-option value="seckill">商城秒杀</a-select-option>
            <a-select-option value="group">拼团购</a-select-option>
            <a-select-option value="integral">积分商城</a-select-option>
            <a-select-option value="couponList">领券中心</a-select-option>
            <a-select-option value="customActivity">自定义活动</a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item v-if="!hotGoods" label="标题"><a-input v-model="title" placeholder="输入标题" /></a-form-item>
        <div v-if="type === 'show_image'">
          <a-form-item label="数据类型">
            <a-select v-model="show_type" style="width:200px" @change="showTypeChange">
              <a-select-option v-if="modelName !== '品牌推荐' && modelName !== '热门分类'" value="goods">商品</a-select-option>
              <a-select-option v-if="modelName !== '品牌推荐'" value="class">分类</a-select-option>
              <a-select-option  value="integral">积分商城</a-select-option>
              <a-select-option  value="group">拼团购</a-select-option>
              <a-select-option  value="seckill">商城秒杀</a-select-option>
              <a-select-option v-if="modelName !== '品牌推荐'" value="couponList">领券中心</a-select-option>
              <a-select-option value="shop" v-if="modelName !== '热门分类'">店铺</a-select-option>
              <a-select-option value="customActivity">自定义活动</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="展示数据" v-if="show_type !== 'coupon' && show_type !=='integral' && show_type !== 'group'">
            <div v-if="show_type === 'class'"><a-cascader v-model="selectClass" :options="classTree" @change="selectClassChange" placeholder="请选择分类" /></div>
            <div v-if="show_type === 'goods'">
              已选择商品ID：{{ value }}
              <TableSelect selectionRef="radio" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoods">选择商品</TableSelect>
            </div>
            <div v-if="show_type === 'shop'">
              已选择店铺ID：{{ value }}
              <!-- 已选择店铺名称：{{shopName}} -->
              <TableSelect :shopId="Number(value)" selectionRef="radio" showType="shop" :selectionUrl="selectionShopUrl" @on-select-ok="selectedShop">选择店铺</TableSelect>
            </div>
            <div v-if="show_type === 'url'"><a-input v-model="value" placeholder="输入链接地址" /></div>
          </a-form-item>
        </div>
        <div v-if="type === 'show_list'">
          <a-form-item label="展示数据">
            已选择商品：
            <a-row :gutter="16" type="flex">
              <a-col class="selectGoodsItem" v-for="item in value" :key="item.id" span="8">
                <img :src="item.goods_image" width="100%" />
                <p class="goods-name">{{ item.goods_name }}</p>
                <p class="col-red">{{ item.goods_price }}</p>
              </a-col>
            </a-row>
            <TableSelect :goodId="value" selectionRef="checkbox" showType="goods" :selectionUrl="selectionGoodsUrl" @on-select-ok="selectedGoodsList" 
            :shopList="shopLists">选择商品</TableSelect>
          </a-form-item>
        </div>
        <div v-if="isGoodsSwiper && !hotGoods">
          <a-form-item label="查看更多按钮跳转">
            <a-radio-group name="radioGroup" v-model="toType">
              <a-radio value="class">分类</a-radio>
              <a-radio value="shop">店铺</a-radio>
              <a-radio value="activity">营销活动</a-radio>
            </a-radio-group>
          </a-form-item>
          <div>
            <a-cascader v-if="toType === 'class'" v-model="allClass" :options="classTree" @change="classChange" placeholder="请选择分类" />
            <a-select v-else-if="toType === 'activity'" placeholder="请选择活动" @change="shopChange" v-model="activityId">
              <a-select-option value="seckill">商城秒杀</a-select-option>
              <a-select-option value="group">拼团购</a-select-option>
              <a-select-option value="integral">积分商城</a-select-option>
              <a-select-option value="couponList">领券中心</a-select-option>
              <a-select-option value="customActivity">自定义活动</a-select-option>
            </a-select>
            <a-select v-else placeholder="请选择店铺" @change="shopChange" v-model="shopId">
              <a-select-option v-for="(item, index) in shopLists" :key="index" :value="item.id">{{ item.shop_name }}</a-select-option>
            </a-select>
          </div>
        </div>
      </a-form>
    </a-modal>
  </div>
</template>
<script>
import helper from '@/utils/helper';
import { getUnion } from '@/utils/tools';
import Server from '@/config/server';
import UploadImage from '@C/upload/UploadImage';
import TableSelect from '@C/lists/TableSelect';
import { mapState, mapActions } from 'vuex';
import { shopType, imageSiteConfigField, listsSiteConfigField, goodsSwiperHead } from '@/config/site';

export default {
  name: 'CreateCarousel',
  components: {
    UploadImage,
    TableSelect
  },
  computed: {
    ...mapState({
      classTree: state => state.config.classTree,
      shopLists: state => state.config.shopLists
    })
  },
  props: {
    isOpen: Boolean,
    defaultData: Array,
    page: String,
    group: String,
    maxNum: Number,
    type: {
      type: String,
      default: 'show_image'
    },
    hotGoods: Boolean,
    modelName: String,
    isGoodsSwiper: Boolean
  },
  data() {
    return {
      isOpenModal: false,
      addModal: false,
      toType: 'class',
      shopType,
      selectClass: [],
      defaultImage: [],
      listField: [],
      listData: [],
      image_url: '',
      title: '',
      show_type: '',
      class_id: '',
      value: [],
      shopName: '',
      allClass: [],
      selectionGoodsUrl: Server.action.goods_lists,
      selectionShopUrl: Server.action.shop_lists,
      editRowIndex: -1,
      shopId: '',
      activityId:'',
      selectShopType: '',
      hotGoodsUrl: ''
    };
  },
  methods: {
    ...mapActions({
      getClassTree: 'config/getClassTree',
      getShopLists: 'config/getShopLists'
    }),
    shopChange(e) {
      for (let i = 0; i < this.shopLists.length; i++) {
        if (this.shopLists[i].id === e) {
          this.selectShopType = this.shopLists[i].shop_type;
        }
      }
    },
    classChange(item) {
      if (item.length === 3) {
        this.allClass = item;
        this.class_id = item[2];
      }
    },
    selectClassChange(item) {
      if (item.length === 3) {
        this.selectClass = item;
        this.value = item[2];
      }
    },
    addItem() {
      this.defaultImage = [];
      this.editRowIndex = -1;
      this.addModal = true;
      this.title = '';
      this.value = [];
      this.selectClass = [];
      this.toType = '';
      this.shopId = '';
      this.activityId='';
      this.allClass = [];
    },
    handleOk() {
      const params = {
        page: this.page,
        group: this.group,
        value: this.listData
      };

      this.$emit('on-change', !this.isOpen, params);
    },
    showTypeChange(){
      if(this.editRowIndex>-1){
        this.listData[this.editRowIndex].value = ''
        this.value = ''
      }

    },
    handleCancel() {
      this.$emit('on-change', !this.isOpen);
    },
    handleCancelAdd() {
      this.addModal = false;
    },
    addCarousel() {
      let carousel = {};
      if (this.hotGoods) {
        if (this.editRowIndex > -1) {
          const uploadImage = this.$refs.uploadImage.uploadImageList;
          if (uploadImage.length === 1) {
            this.image_url = uploadImage[0].url;
          }
          carousel = {
            value: this.value,
            image_url: this.image_url,
            hotGoodsUrl: this.hotGoodsUrl
          };
          this.listData.splice(this.editRowIndex, 1, carousel);
          this.editRowIndex = -1;
          this.value = [];
          this.hotGoodsUrl = '';
          this.addModal = false;
          return;
        }
        if (this.listData.length < this.maxNum) {
          const uploadImage = this.$refs.uploadImage.uploadImageList;
          if (uploadImage.length === 1) {
            this.image_url = uploadImage[0].url;
          }
          carousel = {
            value: this.value,
            image_url: this.image_url,
            hotGoodsUrl: this.hotGoodsUrl
          };
          this.listData.push(carousel);
          this.hotGoodsUrl = '';
          this.value = [];
        }
      } else {
        if (this.editRowIndex > -1) {
          // image
          const uploadImage = this.$refs.uploadImage.uploadImageList;
          if (uploadImage.length === 1) {
            this.image_url = uploadImage[0].url;
          }
          carousel = {
            image_url: this.image_url,
            title: this.title,
            show_type: this.show_type,
            value: this.value
          };
          console.log(this.value)
          if (carousel.show_type === 'shop') {
            this.shopChange(carousel.value);
            carousel.selectShopType = this.selectShopType;
          }
          if (this.isGoodsSwiper) {
            carousel.toType = this.toType;
            if (this.toType === 'class') {
              carousel.toId = this.class_id;
              carousel.allClass = this.allClass;
            }else if(this.toType === 'activity'){
              carousel.toId = this.activityId
            } else {
              carousel.toId = this.shopId;
            }
          }
          this.listData.splice(this.editRowIndex, 1, carousel);
          this.editRowIndex = -1;
          this.image_url = '';
          this.title = '';
          this.show_type = '';
          this.value = [];
          this.addModal = false;
          return;
        }
        if (this.listData.length < this.maxNum) {
          // image
          const uploadImage = this.$refs.uploadImage.uploadImageList;
          if (uploadImage.length === 1) {
            this.image_url = uploadImage[0].url;
          }
          // if (this.image_url.length <= 0) {
          //   helper.showError('图片不能为空');
          //   return;
          // }
          carousel = {
            image_url: this.image_url,
            title: this.title,
            show_type: this.show_type,
            value: this.value
          };
          if (carousel.show_type === 'shop') {
            this.shopChange(carousel.value);
            carousel.selectShopType = this.selectShopType;
          }
          if (this.isGoodsSwiper) {
            carousel.toType = this.toType;
            if (this.toType === 'class') {
              carousel.toId = this.class_id;
              carousel.allClass = this.allClass;
            } else if(this.toType === 'activity'){
              carousel.toId = this.activityId
            }
            else {
              carousel.toId = this.shopId;
            }
          }
          console.log(carousel);
          this.listData.push(carousel);
          this.$refs.uploadImage.handleRemove(this.$refs.uploadImage.uploadImageList[0]);
          this.image_url = '';
          this.title = '';
          this.show_type = '';
          this.editRowIndex = -1;
          this.value = [];
        } else {
          helper.showError(`最多只能添加${this.maxNum}条数据`);
        }
      }
      this.addModal = false;
    },
    selectedGoods(selection) {
      this.value = selection[0].id;
    },
    selectedShop(selection) {
      console.log(selection);
      this.value = selection.data[0].id;
      this.shopName = selection.data[0].shop_name;
    },
    selectedGoodsList(selection) {
      this.value = selection
    },
    remove(index) {
      this.listData.splice(index, 1);
    },
    upRow(index1) {
      if (index1 !== 0) {
        const index2 = index1 - 1;
        this.listData[index1] = this.listData.splice(index2, 1, this.listData[index1])[0];
      } else {
        helper.showError('无法再上移了，已经是第一个了');
      }
    },
    editRow(index, params) {
      console.log(params);
      // helper.printR(params);
      this.defaultImage = [
        {
          status: 'finished',
          url: params.image_url
        }
      ];
      this.image_url = params.image_url;
      this.title = params.title;
      this.show_type = params.show_type;
      if(params.value){
        this.value = params.value;
      }else{
        this.value = []
      }
      if (params.selectShopType) {
        this.selectShopType = params.selectShopType;
      }
      this.editRowIndex = index;
      this.addModal = true;
      if (params.selectClass) {
        this.selectClass = params.selectClass;
      }
      if (this.isGoodsSwiper) {
        this.toType = params.toType;
        if (this.toType === 'class') {
          this.allClass = params.allClass;
          this.class_id = params.toId;
        }else if(this.toType === 'activity'){
           this.activityId = params.toId
        } else {
          this.shopId = Number(params.toId);
        }
      }
      if (this.hotGoods) {
        this.hotGoodsUrl = params.hotGoodsUrl;
      }
    },
    mergeField() {
      const actionCol = [
        {
          title: '操作',
          dataIndex: 'action',
          key: 'action',
          scopedSlots: { customRender: 'action' }
        }
      ];
      if (this.type === 'show_list') {
        this.listField = getUnion(listsSiteConfigField, actionCol);
        if(this.modelName === '热卖单品'){
          this.listField[3].title='热卖商品已选数量'
          this.listField[3].scopedSlots= { customRender: 'value' }
        }
      } else {
        this.listField = getUnion(imageSiteConfigField, actionCol);
      }
      if (this.modelName === '商品轮播') {
        this.listField = getUnion(goodsSwiperHead, actionCol);
      }
    }
  },
  mounted() {
    this.mergeField();
    if (this.isGoodsSwiper) {
      this.getClassTree();
      const params = {
        per_page: 100000000,
        shop_state: 1
      };
      this.getShopLists(params);
    }
  },
  watch: {
    isOpen() {
      this.isOpenModal = this.isOpen;
      this.mergeField();
    },
    defaultData(newVal) {
      this.listData = newVal;
    }
  }
};
</script>
<style lang="stylus" scoped>
.selectGoodsItem
  line-height 24px
  margin-bottom 10px
  .goods-name
    width 100%
    overflow hidden
    white-space nowrap
    text-overflow ellipsis
</style>
