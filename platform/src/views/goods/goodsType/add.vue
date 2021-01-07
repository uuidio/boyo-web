<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="商品类型名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.type_name">

        </a-input>
      </a-form-item>
      <!--<a-form-item-->
        <!--label="商品规格"-->
        <!--:label-col="{ md: 4,xs:24 }"-->
        <!--:wrapper-col="{ md: 10,xs:24}"-->
      <!--&gt;-->
        <!--<a-checkbox-group :options="specOptions" v-model="formItem.spec_id"/>-->
      <!--</a-form-item>-->
      <a-form-item
        label="商品品牌"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 10,xs:24}"
      >
        <a-checkbox-group :options="brandOptions" v-model="formItem.brand_id"/>
      </a-form-item>
      <a-form-item
        label="商品属性"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 18,xs:24}"
      >
        <ul>
          <li class="mb10" :key="index" v-for="(item,index) in formItem.attribute_value">
            <a-row>
              <a-col :xs="24" :md="2" class="goodsType-col">
                <a-input disabled v-if="item.id" min="0" v-model="item.attr_sort" style="width:60px;flex:none;"
                         type="number"/>
                <a-input v-else min="0" v-model="item.attr_sort" style="width:60px;flex:none;" type="number"/>
              </a-col>
              <a-col :xs="24" :md="6" class="goodsType-col">
                <a-input disabled v-if="item.id" v-model="item.attr_name" placeholder="输入属性名称"/>
                <a-input v-else v-model="item.attr_name" placeholder="输入属性名称"/>
              </a-col>
              <a-col :xs="24" :md="6" class="goodsType-col">
                <a-input disabled v-if="item.id" v-model="item.attr_value" placeholder="输入属性值"/>
                <a-input v-else v-model="item.attr_value" placeholder="输入属性值"/>
              </a-col>
              <a-col :xs="24" :md="2" class="goodsType-col">
                <a-checkbox v-model="item.attr_show">显示</a-checkbox>
              </a-col>
              <a-col :xs="24" :md="2" class="goodsType-col" v-if="index!==0&&!item.id">
                <a-button @click="del(index)" type="danger" size="small">移除</a-button>
              </a-col>
              <a-col :xs="24" :md="2" class="goodsType-col" v-if="item.id">
                <a-button @click="editAttr(index,item)" type="primary" size="small">编辑</a-button>
              </a-col>
            </a-row>
          </li>
        </ul>
        <a-button @click="addGoodsAttr" icon="plus" type="dashed">新增属性</a-button>
      </a-form-item>
      <a-form-item
        label="商品类型排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.type_sort" style="width:100px" type="number"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitGoodsType" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
    <a-modal
      title="属性编辑"
      v-model="attrShow"
      @ok="addrEditOk"
      width="700px"
    >
      <a-form
        :model="attrItem"
        class="modelForm"
      >
        <a-form-item
          label="属性名称"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-input style="width:50%" v-model="attrItem.attr_name">

          </a-input>
          <p class="col-666 fs12">
            请填写常用的商品属性的名称；例如：材质；价格区间等
          </p>
        </a-form-item>
        <a-form-item
          label="属性排序"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-input type="number" style="width:50%" v-model="attrItem.attr_sort">

          </a-input>
        </a-form-item>
        <a-form-item
          label="是否显示"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-switch @change="switchChange" v-model="attr_is_show"/>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ md: 24,xs:24}"
          class="item-boder"
        >
          <p>编辑属性可选值</p>
          <div>
            <a-row :key="index" v-for="(item,index) in attrItem.attr_value" class="mb10">
              <a-col :md="3" :xs="12" v-if="item.id">
                <a-checkbox v-model="item.checked" @change="CheckChange">删除</a-checkbox>
              </a-col>
              <a-col :md="3" :xs="6" v-else>
                <a-button @click="delAttrVal(index)" type="danger" size="small">移除</a-button>
              </a-col>
              <a-col class="model-item" :md="5" :xs="12">
                <label>排序：</label>
                <a-input min="0" type="number" v-model="item.attr_value_sort"/>
              </a-col>
              <a-col class="model-item" :md="8" :xs="12">
                <label>可选值：</label>
                <a-input v-model="item.attr_value_name"/>
              </a-col>
              <a-col class="model-item" :md="6" :xs="12">
                <label>是否加入搜索：</label>
                <a-switch v-model="item.set_search"/>
              </a-col>
            </a-row>
          </div>
          <div>
            <a-button @click="addAttrVal" class="mt10" icon="plus">添加一个属性值</a-button>
          </div>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      detail: state => state.goods.goodsTypeDet,
      goodsAttrDet: state => state.goods.goodsAttrDet,
      allBrand: state => state.goods.allBrand,
      // specList: state => state.goods.allSpec,
    }),
  },
  data() {
    return {
      id: 0,
      brandOptions: [],
      specOptions: [],
      check: true,
      attrIndex: 0,
      attrShow: false,
      formItem: {
        type_name: '',
        type_sort:0,
        spec_id: [],
        brand_id: [],
        attribute_value: [{
          attr_sort: 0,
          attr_name: '',
          attr_value: '',
          attr_show: true,
        }],
      },
      attr_is_show: true,
      attrItem: {
        attr_id: '',
        type_id: '',
        attr_name: '',
        attr_sort: '',
        attr_value: [],
        attr_show: 0,
        attr_value_del: [],
      },
    };
  },
  methods: {
    ...mapActions({
      addGoodsType: 'goods/addGoodsType',
      editGoodsType: 'goods/editGoodsType',
      getAllGoodsTypeDetail: 'goods/getAllGoodsTypeDetail',
      getGoodsTypeDetail: 'goods/getGoodsTypeDetail',
      getGoodsAttrDetail: 'goods/getGoodsAttrDetail',
      editGoodsAttr: 'goods/editAttr',
    }),
    editAttr(index, item) {
      this.attrShow = true;
      this.attrIndex = index;
      this.getGoodsAttrDetail({ id: item.id });
    },
    addrEditOk() {
      for (let i = 0; i < this.attrItem.attr_value.length; i++) {
        delete this.attrItem.attr_value[i].checked;
      }
      this.editGoodsAttr({
        formItem: this.attrItem,
      });
    },
    addGoodsAttr() {
      this.formItem.attribute_value.push({
        attr_sort: 0,
        attr_name: '',
        attr_value: '',
        attr_show: true,
      });
    },
    initOptions() {
      const that = this;
      this.allBrand.forEach((value) => {
        that.brandOptions.push({
          label: value.brand_name,
          value: value.id,
        });
      });
    },

    submitGoodsType() {
      console.log(JSON.stringify(this.formItem));
      for (let i = 0; i < this.formItem.attribute_value.length; i++) {
        this.formItem.attribute_value[i].attr_show = Number(this.formItem.attribute_value[i].attr_show);
      }
      if (this.id === 0) {
        this.addGoodsType({ formItem: this.formItem });
      } else {
        const postData = Object.assign(this.formItem, { id: Number(this.id)});
        console.log(postData)
        this.editGoodsType({ formItem: postData });
      }
    },
    del(index) {
      this.formItem.attribute_value.splice(index, 1);
    },
    initDetail() {
      this.formItem.type_name = this.detail.GoodsType.type_name;
      this.formItem.type_sort = this.detail.GoodsType.type_sort;
      const attrList = this.detail.attr_list;
      const brandList = this.detail.brand_related;
      // const specList = this.detail.spec_related;
      for (let i = 0; i < attrList.length; i++) {
        attrList[i].attr_show = attrList[i].attr_is_show;
      }
      for (let i = 0; i < brandList.length; i++) {
        this.formItem.brand_id.push(brandList[i].brand_id);
      }
      // for (let i = 0; i < specList.length; i++) {
      //   this.formItem.spec_id.push(specList[i].sp_id);
      // }
      this.formItem.attribute_value = this.detail.attr_list;
    },
    initAttr() {
      this.attrItem.attr_name = this.goodsAttrDet.attr_info.attr_name;
      this.attrItem.attr_sort = this.goodsAttrDet.attr_info.attr_sort;
      this.attrItem.attr_id = this.goodsAttrDet.attr_info.id;
      this.attrItem.type_id = this.goodsAttrDet.attr_info.type_id;
      this.attr_is_show = this.goodsAttrDet.attr_info.attr_is_show;
      for (let i = 0; i < this.goodsAttrDet.attr_list.length; i++) {
        this.$set(this.goodsAttrDet.attr_list[i], 'checked', false);
        if (this.goodsAttrDet.attr_list[i].set_search === 1) {
          this.goodsAttrDet.attr_list[i].set_search = true;
        } else {
          this.goodsAttrDet.attr_list[i].set_search = false;
        }
      }
      this.attrItem.attr_value = this.goodsAttrDet.attr_list;
    },
    CheckChange(e) {
      this.attrItem.attr_value_del = [];
      for (let i = 0; i < this.attrItem.attr_value.length; i++) {
        if (this.attrItem.attr_value[i].checked) {
          this.attrItem.attr_value_del.push(this.attrItem.attr_value[i].id);
        }
      }
    },
    switchChange(e) {
      if (e) {
        this.attrItem.attr_show = 1;
      } else {
        this.attrItem.attr_show = 0;
      }
    },
    addAttrVal() {
      this.attrItem.attr_value.push({
        attr_value_name: '',
        attr_value_sort: 0,
        set_search: true,
      });
    },
    delAttrVal(index) {
      this.attrItem.attr_value.splice(index, 1);
    },
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getGoodsTypeDetail({ id: this.id });
    } else {
      this.getAllGoodsTypeDetail();
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
    allBrand() {
      this.initOptions();
    },
    goodsAttrDet() {
      this.initAttr();
    },
  },
};
</script>

<style scoped lang="stylus">
  >>> .goodsType-col
    padding-right 10px

    .ant-input
      height 100%

  .modelForm
    position relative

    >>> .ant-form-item
      margin-bottom 0

    >>> .item-boder
      border-top 1px solid #efefef

    >>> .model-item
      display flex
      padding 0 10px
      box-sizing border-box
      align-items center

      .ant-input
        flex 1
</style>
