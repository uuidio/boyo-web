<template>
  <div>
    <a-form layout="inline">
	   <a-row style="margin-bottom:10px">
        <a-col :md="12" :xs="24">
          <a-form-item
            label="店铺选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="shop_id" placeholder="请选择店铺" allowClear>
              <a-select-option v-for="(item,index) in listData" :value="item.id">{{item.shop_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="提货方式"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="pick_type" placeholder="请选择提货方式" allowClear>
              <a-select-option  :value="0">快递</a-select-option>
              <a-select-option  :value="1">自提</a-select-option>
              <a-select-option  :value="2">配送到家</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="关键字搜索"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select  style="width: 140px" v-model="searchVal" allowClear>
              <a-select-option value="tid">订单号</a-select-option>
              <a-select-option value="payment_id">商户订单号</a-select-option>
              <a-select-option value="receiver_name">收货人姓名</a-select-option>
              <a-select-option value="receiver_tel">收货人手机号</a-select-option>
              <a-select-option value="goods_name">商品名称</a-select-option>
            </a-select>
            <a-input style="width:170px" placeholder="请输入关键字" v-model="keyword" allowClear></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="订单创建时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker @change="timeChange" allowClear v-model="createdTime"/>
          </a-form-item>
        </a-col>
        <a-col :md="24" :xs="24" class="mt20" v-if="showSltActivity">
          <a-form-item
            label="活动类型"
            :label-col="{xs: {span: 24},md: {span: 3,}}"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-checkbox :indeterminate="indeterminate" :checked="checkAll" @change="onCheckAllChange">
              全选
            </a-checkbox>
            <a-checkbox-group v-model="activity_sign_arr" :options="plainOptions" @change="onChange" />

<!--            <a-radio-group name="radioGroup" v-model="activity_sign_arr">-->
<!--              <a-radio :value="trim">无</a-radio>-->
<!--              <a-radio value="seckill">秒杀活动订单</a-radio>-->
<!--              <a-radio value="is_group">拼团活动订单</a-radio>-->
<!--              <a-radio value="point_goods">{{UserType === 'normal' ? '积分' : '牛币'}}兑换订单</a-radio>-->
<!--              <a-radio value="choujiang">抽奖订单</a-radio>-->
<!--            </a-radio-group>-->
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24" class="mt20">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch" type="primary" >查询</a-button>
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
      span: 5,
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
      indeterminate: false,
      checkAll: false,
      plainOptions: [
        { label: '秒杀活动订单', value: 'seckill' },
        { label: '拼团活动订单', value: 'is_group' },
        { label: this.UserType === 'normal' ? '积分兑换订单' : '牛币兑换订单', value: 'point_goods' },
        { label: '抽奖订单', value: 'choujiang' },
        { label: '线上交易', value: 'online' },
      ],
      formItemLayout,
      trim: '',
      searchVal: 'tid',
      activity_sign: [],
      activity_sign_arr: [],
      keyword: '',
      selectKeys: {
        tid: 'tid',
        receiver_name: 'receiver_name',
        receiver_tel: 'receiver_tel',
        goods_name: 'goods_name',
      },
      createdTime: '',
      created_start: '',
      created_end: '',
      shop_id: '',
      pick_type: '',
      shopParams: {
        per_page: 1000000,
        is_open: 1,
      },

    };
  },
  props: {
    showSltActivity: {
      type: Boolean,
      default: true,
    },
  },
  methods: {
    ...mapActions({
      fetchLists: 'shop/fetchLists',
      getClassTree: 'goods/getClassTree',
    }),
    resetSearch() {
      this.searchVal = 'tid';
      this.keyword = '';
      this.created_start = '';
      this.created_end = '';
      this.shop_id = '';
      this.pick_type = '';
      this.activity_sign_arr = '';
      this.createdTime = '';
      this.indeterminate = false;
      this.checkAll = false;
    },
    filterValue(arr) {
      const arr1 = [];
      for (let i = 0; i < arr.length; i++) {
        arr1.push(arr[i].value);
      }
      return arr1;
    },
    onChange(checkedList) {
      this.indeterminate = !!checkedList.length && checkedList.length < this.plainOptions.length;
      this.checkAll = checkedList.length === this.plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        activity_sign_arr: e.target.checked ? this.filterValue(this.plainOptions) : [],
        indeterminate: false,
        checkAll: e.target.checked,
      });
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
      params[this.searchVal] = this.keyword;
      params.created_start = this.created_start;
      params.created_end = this.created_end;
      params.shop_id = this.shop_id;
      params.pick_type = this.pick_type;
      if (this.showSltActivity) {
        params.activity_sign_arr = this.activity_sign_arr;
      }
      console.log(params);
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
