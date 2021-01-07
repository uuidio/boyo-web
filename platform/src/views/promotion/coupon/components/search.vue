<template>
  <div>
    <a-form layout="inline">
      <a-row v-if="searchType === 2">
        <a-col :md="8" :xs="24" >
          <a-form-item
            label="发行渠道"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="channel" placeholder="请选择使用类型" allowClear>
              <a-select-option  :value="1">品牌</a-select-option>
              <a-select-option  :value="2">店铺</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24" v-if="channel === 2">
          <a-form-item
            label="店铺选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="shop_id" placeholder="请选择店铺" showSearch :filterOption="filterOption" allowClear>
              <a-select-option v-for="(item,index) in listData" :value="item.id">{{item.shop_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

        <a-col :md="8" :xs="24">
          <a-form-item
            label="优惠券名称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入关键字" v-model="coupon_name" allowClear></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24" :class="{'mt10': channel === 2}">
          <a-form-item
            label="使用状态"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="status" placeholder="请选择使用状态" allowClear>
              <a-select-option :value="1">未使用</a-select-option>
              <a-select-option :value="2">已使用</a-select-option>
              <a-select-option :value="3">已过期</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>

      </a-row>

      <a-row class="mt10" v-if="searchType === 1">
        <a-col :md="12" :xs="24">
          <a-form-item
            label="优惠券名称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="请输入关键字" v-model="name" allowClear></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24" >
          <a-form-item
            label="使用类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="type" placeholder="请选择使用类型" allowClear>
              <a-select-option  :value="1">满减券</a-select-option>
              <!-- <a-select-option  :value="2">折扣券</a-select-option> -->
              <!-- <a-select-option  :value="3">代金券</a-select-option> -->
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="mt10" v-if="searchType === 1">
        <a-col :md="12" :xs="24">
          <a-form-item
            label="使用场景"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="scenes" placeholder="请选择使用场景" allowClear>
              <a-select-option  :value="1">线上</a-select-option>
              <a-select-option  :value="2">线下</a-select-option>
              <a-select-option  :value="3">全渠道</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="创建时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker v-model="created_time" @change="timeChange" allowClear/>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="mt10">
        <a-col :md="12" :xs="24">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
            <a-button @click="resetSearch" class="ml10">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>

    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    md: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    md: {
      span: 16,
    },
  },
};
export default {
  computed: {
    ...mapState({
      listData: state => state.shop.lists,

    }),
  },
  data() {
    return {
      status: '',
      channel: '',
      formItemLayout,
      coupon_name: '',
      shop_id: '',
      name: '',
      created_start: '',
      created_end: '',
      type: '',
      scenes: '',
      created_time: '',
      shopParams: {
        per_page: 1000000,
        is_open: 1,
      },
    };
  },
  props: {
    searchType: {
      type: Number,
      default: 1,
    },
  },
  methods: {
    ...mapActions({
      fetchLists: 'shop/fetchLists',
      getClassTree: 'goods/getClassTree',
    }),
    resetSearch() {
      this.name = '';
      this.created_start = '';
      this.created_end = '';
      this.type = '';
      this.scenes = '';
      this.shop_id = '';
      this.coupon_name = '';
      this.status = '';
      this.channel = '';
      this.created_time = '';
    },

    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    timeChange(a, b) {
      if (b[0] === '') {
        this.created_start = '';
        this.created_end = '';
      } else {
        this.created_start = b[0] + ' 00:00:00';
        this.created_end = b[1] + ' 23:59:59';
      }
    },
    subSearch() {
      const params = {};
      if (this.searchType === 1) {
        params.name = this.name;
        params.created_start = this.created_start;
        params.created_end = this.created_end;
        params.type = this.type;
        params.scenes = this.scenes;
      } else if (this.searchType === 2) {
        if (this.channel === 2) {
          params.shop_id = this.shop_id;
        } else if (this.channel === 1) {
          params.shop_id = 0;
        }
        params.coupon_name = this.coupon_name;
        params.status = this.status;
      }
      this.$emit('on-search', params);
    },
  },
  mounted() {
    this.fetchLists(this.shopParams);
  },
};
</script>

<style scoped lang="stylus">
>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
