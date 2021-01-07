<template>
  <div class="content">
    <div class="goods-form">
      <div class="addGoodsTitle">商品基本信息</div>
      <a-form :form="form">
        <a-form-item
          :required="classIconBool"
          label="商品分类"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 7, xs: 24 }"
        >
          <a-cascader
            v-if="$route.params.id !== undefined"
            style="width:325px"
            v-model="selectClass"
            :allowClear="true"
            @change="classChange"
            :options="option"
            placeholder="编辑商品分类 (无需修改请留空)"
          />
          <div>
            <span v-if="$route.params.id !== undefined"
              ><a-icon
                style="color:red;margin-right: 4px;"
                type="exclamation-circle"
              />当前商品分类为:</span
            >
            <span v-if="cate_nav">
              {{ this.cate_nav }}
            </span>
            <div v-else>
              <span v-if="selectClass.length !== 0">
                {{ this.selectClass[0].label }}/{{
                  this.selectClass[1].label
                }}/{{ this.selectClass[2].label }}
              </span>
            </div>
          </div>
        </a-form-item>
        <a-form-item
          label="商品名称"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input placeholder="商品名称" v-model="formItem.goods_name" />
        </a-form-item>
        <a-form-item
          label="副标题"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-textarea
            placeholder="商品副标题"
            :rows="4"
            v-model="formItem.goods_info"
          />
        </a-form-item>
        <!--<a-form-item-->
        <!--label="第三方商品维护"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 10,xs:24 }"-->
        <!--v-if="formItem.third_attr_update"-->
        <!--&gt;-->
        <!--<a-checkbox-group v-model="third_lists">-->
        <!--<a-checkbox-->
        <!--v-for="(item, index) in formItem.third_attr_update"-->
        <!--:value="item.name"-->
        <!--:key="index"-->
        <!--&gt;-->
        <!--{{ item.text }}-->
        <!--</a-checkbox>-->
        <!--</a-checkbox-group>-->
        <!--</a-form-item>-->
        <a-form-item
          label="选择品牌"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <!-- {{goodsBrands}} -->
          <a-select
            showSearch
            v-model="formItem.brand_id"
            @focus="brandChange"
            placeholder="选择品牌"
            :allowClear="true"
            :filterOption="filterOption"
          >
            <a-select-option
              v-for="item in this.goodsBrands"
              :value="item.id"
              :key="item.id"
              >{{ item.brand_name }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item
          label="选择运费模板"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <!-- {{goodsBrands}} -->
          <a-select
            v-model="formItem.transport_id"
            placeholder="选择运费模板"
            :allowClear="true"
          >
            <a-select-option
              v-for="item in transportLists"
              :value="item.id"
              :key="item.id"
              >{{ item.name }}
            </a-select-option>
          </a-select>
        </a-form-item>
<!--        <a-form-item-->
<!--          label="选择商品属性"-->
<!--          :label-col="{ md: 3, xs: 24 }"-->
<!--          :wrapper-col="{ md: 21, xs: 24 }"-->
<!--        >-->
<!--          <a-cascader-->
<!--            :fieldNames="{-->
<!--              label: 'attr_value_name',-->
<!--              value: 'id',-->
<!--              children: 'attr_values'-->
<!--            }"-->
<!--            :options="attrData"-->
<!--            @change="onAttrChange"-->
<!--            placeholder="选择商品属性(可多选)"-->
<!--            style="width:240px"-->
<!--          />-->
<!--          <ul class="attrItemBox">-->
<!--            <li-->
<!--              v-if="item.attr_values && item.attr_values.length > 0"-->
<!--              v-for="(item, index) in formItem.goods_attr"-->
<!--            >-->
<!--              <div-->
<!--                class="attrItem"-->
<!--                v-for="(sonItem, sonIndex) in item.attr_values"-->
<!--              >-->
<!--                <span>{{ item.attr_name }}/{{ sonItem.attr_value_name }}</span-->
<!--                ><a-icon-->
<!--                  @click="delAttr(index, sonIndex)"-->
<!--                  class="attr-close"-->
<!--                  type="close"-->
<!--                />-->
<!--              </div>-->
<!--            </li>-->
<!--          </ul>-->
<!--        </a-form-item>-->
        <div v-if="promo_good">
          <a-form-item
            label="开启推广员推广"
            :label-col="{ md: 3,xs:24 }"
            :wrapper-col="{ md: 5,xs:24 }"
          >
            <a-radio-group v-model="formItem.is_rebate">
              <a-radio :value="1">是</a-radio>
              <a-radio :value="0">否</a-radio>
            </a-radio-group>
            <div>
              <a-button @click="showAct" size="small">查看推广规则</a-button>
            </div>
          </a-form-item>
          <div v-if="promo_good && formItem.is_rebate === 1">
            <a-form-item
              label="推广该商品佣金"
              :label-col="{ md: 3,xs:24 }"
              :wrapper-col="{ md: 5,xs:24 }"
            >
              <a-input placeholder="推广该商品佣金" v-model="formItem.rewards"/>
            </a-form-item>
            <a-form-item
              label="推广素材图片"
              :label-col="{ md: 3,xs:24 }"
              :wrapper-col="{ md: 21 ,xs:24}"
            >
              <UploadImage :defaultImageList="material" :shopId="1" :maximum="9" ref="materialImageLists"></UploadImage>
              <p>最多只能上传9张，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片</p>
            </a-form-item>
            <a-form-item
              label="推广素材文案"
              :label-col="{ md: 3,xs:24 }"
              :wrapper-col="{ md: 5,xs:24 }"
            >
              <a-textarea placeholder="推广素材文案" :rows="4" v-model="formItem.promo_article"/>
            </a-form-item>
<!--            <a-form-item-->
<!--              label="小店分成金额"-->
<!--              :label-col="{ md: 3,xs:24 }"-->
<!--              :wrapper-col="{ md: 5,xs:24 }"-->
<!--            >-->
<!--              <a-input placeholder="小店分成金额" v-model="formItem.profit_sharing"/>-->
<!--            </a-form-item>-->
          </div>

        </div>
        <a-form-item
          label="是否虚拟物品"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-radio-group v-model="formItem.is_virtual">
            <a-radio :value="0">是</a-radio>
            <a-radio :value="1">否</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="提货类型"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-checkbox-group v-model="formItem.pick_type">
            <a-checkbox value="0">快递</a-checkbox>
            <a-checkbox value="1">自提</a-checkbox>
            <a-checkbox value="2" :disabled="true">配送到家</a-checkbox>
          </a-checkbox-group>
        </a-form-item>
        <!--<a-form-item-->
        <!--label="交易类型"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 5,xs:24 }"-->
        <!--&gt;-->
        <!--<a-radio-group v-model="formItem.trade_type">-->
        <!--<a-radio :value="1">普通</a-radio>-->
        <!--<a-radio :value="2">充值</a-radio>-->
        <!--</a-radio-group>-->
        <!--</a-form-item>-->
        <!--<a-form-item-->
        <!--label="是否需要QQ"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 5,xs:24 }"-->
        <!--v-if="formItem.trade_type===2"-->
        <!--&gt;-->
        <!--<a-radio-group v-model="formItem.is_need_qq">-->
        <!--<a-radio :value="0">否</a-radio>-->
        <!--<a-radio :value="1">是</a-radio>-->
        <!--</a-radio-group>-->
        <!--</a-form-item>-->
        <a-form-item
          label="门店分类"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-cascader
            v-model="formItem.goods_shop_cid"
            :allowClear="true"
            :options="shopClassTree"
            @change="shopClassChange"
            placeholder="选择门店分类"
          />
        </a-form-item>
        <a-form-item
          label="商品货号"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input placeholder="商品货号" v-model="formItem.goods_serial" />
        </a-form-item>
        <a-form-item
          label="商品库存"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input
            type="number"
            placeholder="商品库存"
            v-model="formItem.goods_stock"
          />
        </a-form-item>
        <a-form-item
          label="商品价格"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input
            type="number"
            placeholder="商品价格"
            v-model="formItem.goods_price"
          />
        </a-form-item>
        <a-form-item
          label="市场价"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input
            type="number"
            placeholder="市场价"
            v-model="formItem.goods_marketprice"
          />
        </a-form-item>
        <a-form-item
          label="成本价"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input
            type="number"
            placeholder="成本价"
            v-model="formItem.goods_cost"
          />
        </a-form-item>
        <!--<a-form-item-->
        <!--label="商品来源"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 8,xs:24 }"-->
        <!--&gt;-->
        <!--<sourceSelect-->
        <!--:defaultData="sourceItem"-->
        <!--@on-submit="getSubmit"-->
        <!--&gt;</sourceSelect>-->
        <!--</a-form-item>-->
<!--        <sku @skuVal="getSkuItem" :dataList="initData"></sku>-->
        <!--<a-form-item-->
        <!--label="商品供应链接"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 5,xs:24 }"-->
        <!--&gt;-->
        <!--<a-input placeholder="商品供应链接" v-model="formItem.supply_link"/>-->
        <!--</a-form-item>-->
        <a-form-item
          label="商品条形码"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 5, xs: 24 }"
        >
          <a-input placeholder="商品条形码" v-model="formItem.goods_barcode" />
        </a-form-item>
        <!--<a-form-item-->
        <!--label="商品主图"-->
        <!--:required="true"-->
        <!--:label-col="{ md: 3,xs:24 }"-->
        <!--:wrapper-col="{ md: 12,xs:24 }"-->
        <!--&gt;-->
        <!--<UploadImage :defaultImageList="thumbImage" :shopId="1" :maximum="1" ref="uploadThumbImage"></UploadImage>-->
        <!--<p>用于商品列表显示，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片</p>-->
        <!--</a-form-item>-->
        <a-form-item
          label="商品图片"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 12, xs: 24 }"
        >
          <UploadImage
            :defaultImageList="imageLists"
            :shopId="1"
            :maximum="5"
            ref="uploadImageLists"
          ></UploadImage>
          <p>
            最多只能上传5张，建议使用尺寸800x800像素以上、大小不超过1M的正方形图片
          </p>
        </a-form-item>
        <div class="addGoodsTitle">商品详情描述</div>
        <a-form-item
          label="商品描述"
          :required="true"
          :label-col="{ md: 3, xs: 24 }"
          :wrapper-col="{ md: 21, xs: 24 }"
        >
          <Ueditor
            ref="editor"
            editor_id="editor1"
            v-model="formItem.goods_body"
          >
          </Ueditor>
        </a-form-item>
        <a-form-item :wrapper-col="{ offset: 3, md: 12, xs: 24 }">
          <a-button @click="handleSubmit" type="primary">提交</a-button>
          <a-button class="ml10" type="danger" @click="$router.back(-1)"
            >返回</a-button
          >
        </a-form-item>
      </a-form>
    </div>
    <a-modal title="推广规则" v-model="actModel" :footer="null" @cancel="actModel=true">
      <div class="actBox">
        <div v-html="promotionRules"></div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import Ueditor from '@C/ueditor/ueditor';
import UploadImage from '@C/upload/UploadImage';
import { mapState, mapActions } from 'vuex';
import sku from '../compontents/sku';
// import sourceSelect from '../compontents/source';

export default {
  name: 'add',
  components: {
    Ueditor,
    UploadImage,
    sku,
  },
  computed: {
    ...mapState({
      shopClassTree: state => state.goods.shopClassTree,
      goodsBrands: state => state.goods.goodsBrands,
      detail: state => state.goods.detail,
      attrList: state => state.goods.attrList,
      transportLists: state => state.logistics.logLists,
      promo_good: state => state.goods.promo_good,
      promotionRules: state => state.goods.promotionRules,
    }),
  },
  data() {
    return {
      actModel: false,
      id: 0,
      sourceItem: {
        lhy_id: '',
        package: '',
        source_info: [],
      },
      initData: {},
      selectClass: [],
      third_lists: [],
      option: [],
      skuObj: {},
      cate_nav: false,
      material: [],
      formItem: {
        profit_sharing: '',
        promo_article: '',
        is_rebate: 0,
        img_material: [],
        rewards: '',
        source: '',
        gc_id_1: '',
        gc_id_2: '',
        gc_id_3: '',
        goods_attr: [],
        pick_type: ['0', '1', '2'],
        trade_type: 1,
        is_need_qq: 0,
        goods_body: '',
        goods_name: '',
        goods_info: '',
        goods_serial: '',
        goods_price: '',
        goods_cost: '',
        goods_marketprice: '',
        goods_barcode: '',
        brand_id: undefined,
        is_virtual: 1,
        goods_image: '',
        image_list: [],
        spec_name: [],
        goods_spec: [],
        spec: [],
        lhy_id: '',
        package: '',
        goods_stock: '',
        supply_link: '',
        goods_shop_cid: [],
        transport_id: '',
        goods_shop_c_lv1: '',
        goods_shop_c_lv2: '',
      },
      imageLists: [],
      thumbImage: [],
      form: this.$form.createForm(this),
      classIconBool: true,
      editGoodsClass: {}, // 编辑的商品分类
      attrTree: [],
      attrData: [],
    };
  },
  methods: {
    shopClassChange(e, item) {
      if (e.length > 1) {
        this.formItem.goods_shop_c_lv1 = e[0];
        this.formItem.goods_shop_c_lv2 = e[1];
      } else {
        this.formItem.goods_shop_c_lv1 = '';
        this.formItem.goods_shop_c_lv2 = '';
      }
    },
    showAct() {
      this.actModel = true;
    },
    // 品牌搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    initAttrLists() {
      const arrs = [];
      console.log(this.attrList);
      for (let i = 0; i < this.attrList.length; i++) {
        if (this.attrList[i].attr_values.length > 0) {
          this.attrData.push({
            id: this.attrList[i].id,
            attr_value_name: this.attrList[i].attr_name,
            attr_values: this.attrList[i].attr_values,
          });
          arrs.push({
            id: this.attrList[i].id,
            attr_name: this.attrList[i].attr_name,
            attr_values: [],
          });
        }
      }
      if (
        this.formItem.goods_attr === null
        || this.formItem.goods_attr.length === 0
      ) {
        this.formItem.goods_attr = arrs;
      } else {
        for (let i = 0; i < this.formItem.goods_attr.length; i++) {
          for (let j = 0; j < arrs.length; j++) {
            if (this.formItem.goods_attr[i].id == arrs[j].id) {
              arrs[j].attr_values = this.formItem.goods_attr[i].attr_values;
            }
          }
        }
        this.formItem.goods_attr = arrs;
      }
    },
    getSubmit(item) {
      this.formItem.source = item.source;
      if (item.mypackage) {
        this.formItem.lhy_id = '';
        this.formItem.package = item.mypackage;
      } else {
        this.formItem.lhy_id = item.submitItem[0].lhy_id;
        this.formItem.package = '';
      }
    },
    // 编辑时
    callback(data) {
      this.option = data;
    },
    classChange(val, data) {
      // console.log(val);
      console.log(data);
      if (val.length !== 0) {
        this.editGoodsClass.gc_id_1 = val[0];
        this.editGoodsClass.gc_id_2 = val[1];
        this.editGoodsClass.gc_id_3 = val[2];
      } else {
        this.editGoodsClass = {};
      }
    },
    ...mapActions({
      addGoods: 'goods/addGoods',
      getDetail: 'goods/getDetail',
      editGoods: 'goods/editGoods',
      getShopClassTree: 'goods/getShopClassTree',
      getAttr: 'goods/getAttr',
      getAllBrand: 'goods/getAllBrand',
      getGoodsClassTree: 'goods/getGoodsClassTree',
      logLists: 'logistics/logistics',
      promoGoodCheck: 'goods/promoGoodCheck',
      getPromoRule: 'goods/getPromoRule',
    }),
    brandChange(val) {
      if (this.$route.params.id !== undefined) {
        this.getAllBrand();
      }
    },
    onAttrChange(e, item) {
      this.formItem.goods_attr.forEach((attrItem) => {
        if (attrItem.id == item[0].id) {
          if (
            JSON.stringify(attrItem.attr_values).indexOf(
              JSON.stringify(item[1]),
            ) === -1
          ) {
            attrItem.attr_values.push(item[1]);
          }
        }
      });
    },
    delAttr(index, sonindex) {
      this.formItem.goods_attr[index].attr_values.splice(sonindex, 1);
      console.log(`已选属性值${JSON.stringify(this.formItem.goods_attr)}`);
    },
    handleSubmit() {
      console.log('提交数据', this.formItem);
      if (this.formItem.goods_attr) {
        for (let i = 0; i < this.formItem.goods_attr.length; i++) {
          if (this.formItem.goods_attr[i].attr_values) {
            if (this.formItem.goods_attr[i].attr_values.length === 0) {
              this.formItem.goods_attr.splice(i, 1);
            }
          }
        }
      }
      this.formItem.goods_body = this.$refs.editor.tmpContent;
      if (this.selectClass.length !== 0) {
        this.formItem.gc_id_1 = this.selectClass[0].value;
        this.formItem.gc_id_2 = this.selectClass[1].value;
        this.formItem.gc_id_3 = this.selectClass[2].value;
      }
      if (this.third_lists.length !== 0) {
        for (let i = 0; i < this.formItem.third_attr_update.length; i++) {
          this.formItem.third_attr_update[i].update = 0;
        }
        for (let i = 0; i < this.third_lists.length; i++) {
          for (let j = 0; j < this.formItem.third_attr_update.length; j++) {
            if (
              this.third_lists[i] === this.formItem.third_attr_update[j].name
            ) {
              this.formItem.third_attr_update[j].update = 1;
            }
          }
        }
      }
      const names = [];
      const specs = [];
      if (this.skuObj.data !== undefined) {
        const item = this.skuObj.spList;
        console.log(item);
        this.formItem.spec = this.skuObj.data;
        for (let i = 0; i < item.length; i++) {
          // sku有值
          if (item[i].value.length) {
            names.push(item[i].name);
            specs.push(item[i].value);
          }
        }
      }
      this.formItem.spec_name = names;
      this.formItem.goods_spec = specs;
      // const uploadThumbImage = this.$refs.uploadThumbImage.uploadImageList;
      if (this.promo_good && this.formItem.is_rebate === 1) {
        this.formItem.img_material = this.$refs.materialImageLists.uploadImageList;
      }
      this.formItem.image_list = this.$refs.uploadImageLists.uploadImageList;
      if (this.formItem.image_list.length > 0) {
        this.formItem.goods_image = this.formItem.image_list[0].url;
      }

      if (this.id === 0) {
        this.addGoods({ formItem: this.formItem });
      } else {
        if (JSON.stringify(this.editGoodsClass) != '{}') {
          this.formItem.gc_id_1 = this.editGoodsClass.gc_id_1;
          this.formItem.gc_id_2 = this.editGoodsClass.gc_id_2;
          this.formItem.gc_id_3 = this.editGoodsClass.gc_id_3;
        }
        console.log(this.formItem.goods_spec);
        console.log(this.id);

        this.editGoods({ formItem: this.formItem });
      }
    },
    getSkuItem(item) {
      this.skuObj = item;
    },
    initDetail() {
      this.cate_nav = this.detail.cate_nav;
      if (this.detail.spec_name) {
        this.initData = {
          spec_name: this.detail.spec_name,
          spec_value: this.detail.goods_spec,
          sku: this.detail.sku,
        };
      }
      //
      this.formItem.img_material = this.detail.img_material;
      this.formItem.brand_id = this.detail.brand_id;
      this.formItem.gc_id_1 = this.detail.gc_id_1;
      this.formItem.gc_id_2 = this.detail.gc_id_2;
      this.formItem.gc_id_3 = this.detail.gc_id_3;
      this.formItem.goods_name = this.detail.goods_name;
      this.formItem.goods_info = this.detail.goods_info;
      this.formItem.is_rebate = this.detail.is_rebate;
      this.formItem.rewards = this.detail.rewards;
      this.formItem.profit_sharing = this.detail.profit_sharing;
      this.formItem.promo_article = this.detail.promo_article;
      if (this.detail.goods_shop_c_lv1) {
        this.formItem.goods_shop_c_lv1 = this.detail.goods_shop_c_lv1;
        this.formItem.goods_shop_c_lv2 = this.detail.goods_shop_c_lv2;
        this.goods_shop_cid = [this.detail.goods_shop_c_lv1.toString(), this.detail.goods_shop_c_lv2.toString()];
      }
      if (this.detail.goods_attr) {
        this.formItem.goods_attr = [];
        for (let i = 0; i < this.detail.goods_attr.length; i++) {
          if (this.detail.goods_attr[i].attr_values) {
            this.formItem.goods_attr.push(this.detail.goods_attr[i]);
          }
        }
      }
      this.formItem.goods_price = this.detail.goods_price;
      this.formItem.goods_marketprice = this.detail.goods_marketprice;
      this.formItem.goods_serial = this.detail.goods_serial;
      this.formItem.goods_stock = this.detail.goods_stock;
      this.formItem.goods_cost = this.detail.goods_cost;
      this.formItem.goods_body = this.detail.goods_body;
      this.formItem.supply_link = this.detail.supply_link;
      this.formItem.spec_name = this.detail.spec_name;
      this.formItem.goods_barcode = this.detail.goods_barcode;
      this.formItem.goods_shop_cid = this.detail.shop_cate;
      this.formItem.lhy_id = this.detail.lhy_id;
      this.formItem.package = this.detail.package;
      this.formItem.transport_id = this.detail.transport_id;
      if (this.detail.pick_type) {
        this.formItem.pick_type = this.detail.pick_type;
      }
      this.formItem.trade_type = this.detail.trade_type;
      this.formItem.is_need_qq = this.detail.is_need_qq;
      this.sourceItem = {
        lhy_id: this.detail.lhy_id,
        package: this.detail.package,
        source_info: this.detail.source_info,
      };
      if (this.detail.third_attr_update) {
        this.third_lists = [];
        this.formItem.third_attr_update = this.detail.third_attr_update;
        for (let i = 0; i < this.formItem.third_attr_update.length; i++) {
          if (this.formItem.third_attr_update[i].update == 1) {
            const name = this.formItem.third_attr_update[i].name;
            this.third_lists.push(name);
          }
        }
      }
      this.thumbImage = [{ url: this.detail.goods_image, status: 'finished' }];
      if (this.detail.image_list.length > 0) {
        const _this = this;
        this.detail.image_list.forEach((value) => {
          _this.imageLists.push({ url: value.image_url, status: 'finished' });
        });
      }
      if (this.promo_good && this.detail.img_material) {
        if (this.detail.img_material.length > 0) {
          this.material = this.detail.img_material;
        }
      }
    },
  },
  mounted() {
    this.promoGoodCheck();
    this.getPromoRule({ gm_id: 0, type: 1 });
    this.getShopClassTree();
    this.logLists({
      per_page: 1000,
    });
    if (this.$route.params.id !== undefined) {
      this.getGoodsClassTree(this.callback);
      this.id = this.$route.params.id;
      this.formItem.id = this.id;
      this.getDetail({ id: this.id });
    } else {
      this.selectClass = JSON.parse(localStorage.getItem('classItem'));
      if (
        this.selectClass[2].type_id !== 0
        && this.selectClass[2].type_id !== null
      ) {
        this.getAttr({
          id: this.selectClass[2].type_id,
        });
      } else {
        this.getAllBrand();
      }
    }
    if (this.$route.params.id !== undefined) {
      this.classIconBool = false;
    }
  },
  watch: {
    detail() {
      this.initDetail();
      if (
        this.detail.type_id
        && this.detail.type_id !== 0
        && this.detail.type_id !== null
      ) {
        this.getAttr({
          id: this.detail.type_id,
        });
      } else {
        this.getAllBrand();
      }
    },
    attrList() {
      this.initAttrLists();
    },
  },
};
</script>

<style scoped lang="stylus">
.goods-form {
  border 1px solid #efefef
}
>>> .ant-checkbox-wrapper {
  margin-left 0
}
>>> .goods-form .ant-form input[type='file'] {
  display none
}
.addGoodsTitle {
  padding 8px 10px
  margin-bottom 20px
  background #efefef
  font-weight 700
}
.attrItemBox {
  display flex
  flex-wrap wrap
  li {
    display flex
    flex-wrap wrap
  }
}
.attrItem {
  background #fafafa
  border 1px solid #d9d9d9
  border-radius 4px
  margin-right 8px
  padding 0 7px
  font-size 12px
  box-sizing border-box
  margin-top 10px
  height 25px
  line-height 25px
  display flex
  align-items center
  >>>.attr-close {
    font-size 14px
    cursor pointer
    margin-left 5px
  }
}
</style>
