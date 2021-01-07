<template>
  <div>
    <div>
      <span class="mr10" v-if="submitItem.length!==0">已选择商品：{{submitItem[0].goods_name}}</span>
    </div>
    <div>
      <span class="mr10" v-if="submitPackage!==''">已选择商品：{{submitPackage}}</span>
    </div>
    <a-button @click="openSource">选择来源</a-button>
    <a-modal
      title="商品来源选择"
      :width="1000"
      v-model="visible"
      @ok="handleOk"
    >
      <div>
        <a-form
        >
          <a-form-item
            :required="true"
            label="来源选择"
            :label-col="{ md:8,xs:24 }"
            :wrapper-col="{ md: 15,xs:24 }"
          >
            <a-select v-model="source" allowClear @change="selectChange" style="width:100%" placeholder="请选择">
              <a-select-option :key="index" v-for="(item,index) in sourceData" :value="item.source">{{item.name}}</a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item
            :required="true"
            label="商品关键字"
            :label-col="{ md: 8,xs:24 }"
            :wrapper-col="{ md: 15,xs:24 }"
            v-if="selectType===1"
          >
            <a-input  v-model="formItem.keyword" placeholder="请输入商品关键字" />
            <a-button class="ml10" type="primary" @click="searchGoods">搜索</a-button>
          </a-form-item>
          <a-form-item
            :required="true"
            label="商品名称"
            :label-col="{ md: 8,xs:24 }"
            :wrapper-col="{ md: 15,xs:24 }"
            v-else
          >
            <a-input v-model="mypackage" placeholder="请输入商品名称" />
          </a-form-item>
        </a-form>
        <div  v-if="ifsearch">
          <div v-if="selectItem.length!==0" class="mb20">
            <div>
              <span>已选择商品：</span>
              <span>
             {{selectItem[0].goods_name}}
            </span>
            </div>
            <div>
              来源：{{selectItem[0].shop_name}}
            </div>
          </div>
		  <template v-if="listField&&listField.length>0">
          <a-table 
            :scroll="{x:800,y:300}" :columns="listField" :dataSource="listData"
            :pagination="false"
            :rowSelection="{onChange:onChange,type:'radio',selectedRowKeys:selected}"
          >
            <a slot="goods_image" target="_blank" :href="text" slot-scope="text">
              <img style="height:50px" :src="text" alt="">
            </a>
            <div slot="goods_state" slot-scope="text">
              <a-tag v-if="text==0" color="#f90">下架</a-tag>
              <a-tag v-else-if="text==1" color="#87d068">上架</a-tag>
              <a-tag v-else-if="text==10" color="#f50">禁售</a-tag>
            </div>
          </a-table>
          <div class="pageBox">
            <a-pagination
              :total="pages.total"
              :showTotal="total => `共 ${total} 条数据`"
              :pageSize="pages.per_page"
              :defaultCurrent="1"
              @change="pageChange"
            />
          </div>
		  </template>
        </div>
      </div>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      sourceData: state => state.goods.sourceLists,
      listField: state => state.goods.sourecGoodsFields,
      listData: state => state.goods.sourecGoodsLists,
      pages: state => state.goods.sourecGoodsPages,
    }),
  },
  props: {
    defaultData: Object,
  },
  watch: {
    listData() {
      this.initSelect();
    },
    defaultData() {
      console.log(this.defaultData);
      console.log(this.submitItem)
      if (this.defaultData.source_info.length > 0) {
        this.source = this.defaultData.source_info.source_info.source;
      }
      if (this.defaultData.lhy_id !== null && this.defaultData.lhy_id !== '0') {
        this.initShopid(this.source);
        this.searchGoods();
        this.submitItem = [this.defaultData.source_info.lhy_goods];
        this.selectItem = [this.defaultData.source_info.lhy_goods];
      } else if (this.defaultData.package !== null) {
        this.mypackage = this.defaultData.package;
        this.selectType = 2;
        console.log(this.mypackage);
        this.submitPackage = this.defaultData.package;
      }
    },
  },
  data() {
    return {
      ifsearch: false,
      visible: false,
      mypackage: '',
      submitPackage: '',
      selected: [],
      submitItem: [],
      selectItem: [],
      selectType: 1,
      source: '',
      formItem: {
        shop_id: '',
        keyword: '',
        goods_state: 1,
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      sourceLists: 'goods/sourceLists',
      sourecGoodsLists: 'goods/sourecGoodsLists',
    }),
    openSource() {
      this.visible = true;
    },
    initSelect() {
      this.selected = [];
      if (this.selectItem.length !== 0) {
        for (let i = 0; i < this.listData.length; i++) {
          if (this.listData[i].id === this.selectItem[0].id) {
            this.selected = [i];
            return;
          }
        }
      }
    },
    onChange(keys, item) {
      this.selected = keys;
      this.selectItem = item;
    },
    searchGoods() {
      if (this.formItem.shop_id === '') {
        this.$message.warning('请选择商品来源');
        return;
      }
      const params = this.formItem;
      this.sourecGoodsLists(params);
      const _this = this;
      setTimeout(() => {
        _this.ifsearch = true;
      }, 300);
    },
    pageChange(page) {
      this.formItem.page = page;
      const params = this.formItem;
      this.sourecGoodsLists(params);
    },
    initShopid(name) {
      if (name === undefined) {
        this.formItem.shop_id = '';
      } else {
        for (let i = 0; i < this.sourceData.length; i++) {
          if (this.sourceData[i].source === name) {
            this.formItem.shop_id = this.sourceData[i].shop_id;
          }
        }
      }
    },
    selectChange(a, b) {
      if (a === 'game_currency') {
        this.selectType = 2;
        this.ifsearch = false;
      } else {
        this.selectType = 1;
        console.log(this.listData);
        if (this.selectItem.length !== 0 && this.listData) {
          this.ifsearch = true;
        }
        this.initShopid(a);
      }
    },
    handleOk() {
      if (this.selectType === 1) {
        if (this.selectItem.length === 0) {
          this.$message.warning('请选择商品');
          return;
        }
        this.submitPackage = '';
        this.mypackage = '';
        this.submitItem = this.selectItem;
        const obj = {
          submitItem: this.submitItem,
          source: this.source,
        };
        this.$emit('on-submit', obj);
        this.visible = false;
      } else if (this.selectType === 2) {
        if (this.mypackage.trim() === '') {
          this.$message.warning('请输入商品名称');
          return;
        }
        this.submitPackage = this.mypackage;
        this.submitItem = [];
        this.selectItem = [];
        const obj = {
          mypackage: this.mypackage,
          source: this.source,
        };
        this.$emit('on-submit', obj);
        this.visible = false;
      }
    },
  },
  mounted() {
    this.sourceLists();
  },
};
</script>

<style scoped lang="stylus">
.ant-form
   display flex
  .ant-form-item
     width 40%
     display flex
     align-items center
     >>>.ant-form-item-children
       display flex
@media screen and (max-width: 768px)
  .ant-form
      display block
     .ant-form-item
       width 100%
       display block
</style>
