<template>
  <div class="content">
    <a-form>
      <a-form-item
        label="分类名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.cat_name"/>
      </a-form-item>
      <a-form-item
        label="分类父ID"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select defaultValue="0" v-model="formItem.parent_id">
          <a-select-option class="option-first" :value="0">顶级分类</a-select-option>
          <!-- <a-select-option v-for="(item,index) in shopClassTree" :key="index" :value="item.class_level">{{item.label}}</a-select-option> -->
          <a-select-option v-for="(item,index) in shopClassTree" :key="index" :value="item.value">{{item.label}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否隐藏"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group name="radioGroup"  v-model="formItem.disabled" :defaultValue="0">
          <a-radio :value="0">显示</a-radio>
          <a-radio :value="1">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="分类排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.order_sort" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitClass" type="primary">提交</a-button>
        <a-button @click="$router.back(-1)" class="ml10" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'add',
  components: {
  },
  computed: {
    ...mapState({
      shopClassTree: state => state.goods.shopClassTree,
    }),
  },
  data() {
    return {
      id: 0,
      imageList: [],
      formItem: {
        cat_name: '',
        parent_id: 0,
        order_sort: 0,
        disabled: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      getShopClassTree: 'goods/getShopClassTree',
      addShopClass: 'goods/addShopClass',
    }),
    submitClass() {
      this.addShopClass({
        formItem: this.formItem,
      });
    },
  },
  mounted() {
    this.getShopClassTree();
  },
};
</script>

<style scoped lang="stylus">
  >>>.ant-select-dropdown-menu-item-selected
    font-weight normal
  >>>.option-first
    color #2d8cf0
</style>
