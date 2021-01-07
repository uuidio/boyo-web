<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="选择店铺"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.shop_id">
          <a-select-option :key="index" v-for="(item,index) in allShopItems" :value="item.id">{{item.shop_name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="规则"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 10,xs:24}"
      >
        <div class="mb15">
          <a-button @click="itemAdd" icon="plus" type="primary">添加规则</a-button>
        </div>
        <ul>
          <li class="mt10" v-for="(item,index) in formItem.rules" :key="index">
            <div>
              <label>渠道价满：</label>
              <a-input class="num_input" type="number" v-model="item.limit"/>
              元,
              <label>销售价倍率：</label>
              <a-input class="num_input" type="number" v-model="item.rate"/>
              %
              <a-button class="ml10" @click="itemdel(index)" icon="close" type="danger" size="small">删除</a-button>
            </div>
          </li>
        </ul>
      </a-form-item>
      <a-form-item
        label="第三方商品来源"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.source" placeholder="请输入商品来源"/>
      </a-form-item>
      <a-form-item
        label="是否启用"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.status" name="radioGroup" :defaultValue="1">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="0">禁用</a-radio>
        </a-radio-group>
        <div class="mt15">
          <a-button @click="submit" type="primary">提交</a-button>
          <a-button class="ml10" type="danger" @click="$router.back(-1)">返回</a-button>
        </div>
      </a-form-item>

    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'add',
  computed: {
    ...mapState({
      allShopItems: state => state.goodsSet.allShopItems,
      detail: state => state.goodsSet.detail,
    }),
  },
  components: {},
  data() {
    return {
      formItem: {
        shop_id: '',
        rules: [],
        status: 1,
        source: '',
      },
    };
  },
  methods: {
    ...mapActions({
      synAdd: 'goodsSet/synAdd',
      allShop: 'goodsSet/allShop',
      getDetail: 'goodsSet/getDetail',
    }),
    submit() {
      this.synAdd({ formItem: this.formItem });
    },
    itemAdd() {
      this.formItem.rules.push({ limit: '', rate: '' });
    },
    itemdel(index) {
      this.formItem.rules.splice(index, 1);
    },
    initDetail() {
      console.log(this.detail);
      this.formItem = {
        id: this.detail.id,
        shop_id: this.detail.shop_id,
        rules: this.detail.rules,
        status: this.detail.status,
      };
    },
  },
  mounted() {
    this.allShop();
    if (this.$route.params.id !== undefined) {
      this.getDetail({ id: this.$route.params.id });
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-select-dropdown-menu-item-selected
    font-weight normal

  >>> .option-first
    color #2d8cf0

  >>> .num_input
    width 80px
    margin 0 5px
</style>
