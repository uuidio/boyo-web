<template>
  <div>
    <a-form layout="inline">
      <a-row style="margin-bottom:10px">
        <a-col :md="8" :xs="24">
          <a-form-item
            label="项目名称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="gm_id" placeholder="请选择" @change="changeGm">
              <a-select-option v-for="(item, index) in gmlistData" :value="item.gm_id" :key="index">{{item.platform_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="店铺名称"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select :value="shop_id" placeholder="请选择" @change="changeShop">
              <a-select-option v-for="(item, index) in listData" :key="index" :value="item.id">{{item.shop_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="处理状态"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="deal_status" placeholder="请选择处理状态"  >
              <a-select-option  value="0" >待对账</a-select-option>
              <a-select-option  value="1" >待返款</a-select-option>
              <a-select-option  value="2" >可返款</a-select-option>
<!--              <a-select-option  value="3" >已处理</a-select-option>-->
              <a-select-option  value="4" >不可返款</a-select-option>
              <a-select-option  value="5" >已返款</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="微信交易时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker
              v-model="tradeTime"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
              @change="timeChange"
              />
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="微信退款时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker
              v-model=" refundTime"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
              @change="timeChange3"
            />
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="mt20">
        <a-col :md="12" :xs="24">
          <a-form-item
            label="处理时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker
              v-model="updatedTime"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '结束时间']"
              @change="timeChange2"
            />
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="异常原因"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="abnormal_reason_text" placeholder="请选择异常原因"  >
              <a-select-option  value="1" >重复</a-select-option>
              <a-select-option  value="2" >数据为空</a-select-option>
              <a-select-option  value="3" >数据不匹配</a-select-option>
              <a-select-option  value="4" >无交易订单</a-select-option>
              <a-select-option  value="5" >金额不匹配</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row class="mt20">
        <a-col :md="8" :xs="24" >
          <a-form-item
            label="交易类型"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-checkbox-group v-model="activity_sign_arr" :options="plainOptions" @change="onChange" />
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch"  type="primary" class="mr10">查询</a-button>
            <a-button @click="cancel"  class="mr10">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

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
      gmlistData: state => state.project.lists,
      classTree: state => state.goods.classTree,
    }),
  },
  data() {
    return {
      refundTime: [],
      tradeTime: [],
      updatedTime: [],
      abnormal_reason_text: '',
      trade_type: '',
      plainOptions: [
        { label: '交易', value: 'TRADE' },
        { label: '退款', value: 'REFUND' },
      ],
      formItemLayout,
      activity_sign_arr: [],
      selectKeys: {
        tid: 'tid',
        receiver_name: 'receiver_name',
        receiver_tel: 'receiver_tel',
        goods_name: 'goods_name',
      },
      refund_at_start: '',
      refund_at_end: '',
      trade_at_start: '',
      trade_at_end: '',
      updated_at_start: '',
      updated_at_end: '',
      gm_id: '',
      shop_id: '',
      deal_status: '',
      shopParams: {
        per_page: 1000000,
        is_open: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'shop/fetchLists',
      gmfetchLists: 'project/fetchLists',
      getClassTree: 'goods/getClassTree',
    }),
    changeGm(id) {
      this.shop_id = '';
      const obj1 = this.shopParams;
      const obj2 = { gm_id: id };
      const obj = Object.assign(obj1, obj2);
      this.fetchLists(obj);
    },
    changeShop(id) {
      this.shop_id = id;
      this.$forceUpdate(); // 强制刷新数据
    },
    cancel() {
      this.trade_at_start = '';
      this.trade_at_end = '';
      this.updated_at_start = '';
      this.updated_at_end = '';
      this.refund_at_start = '';
      this.refund_at_end = '';
      this.gm_id = '';
      this.shop_id = '';
      this.trade_type = '';
      this.deal_status = '';
      this.abnormal_reason_text = '';
      this.activity_sign_arr = [];
      this.tradeTime = [];
      this.refundTime = [];
      this.updatedTime = [];
    },
    onChange(checkedList) {
      if (checkedList.length > 0) {
        if (checkedList.length === this.plainOptions.length) {
          this.trade_type = '';
        } else {
          this.trade_type = checkedList[0]
        }
      } else {
        this.trade_type = '';
      }
    },
    timeChange(value, dateString) {
      this.trade_at_start = dateString[0];
      this.trade_at_end = dateString[1];
    },
    timeChange2(value, dateString) {
      this.updated_at_start = dateString[0];
      this.updated_at_end = dateString[1];
    },
    timeChange3(value, dateString) {
      this.refund_at_start = dateString[0];
      this.refund_at_end = dateString[1];
    },
    subSearch() {
      const params = {};
      params.trade_at_start = this.trade_at_start;
      params.trade_at_end = this.trade_at_end;
      params.updated_at_start = this.updated_at_start;
      params.updated_at_end = this.updated_at_end;
      params.refund_at_start = this.refund_at_start;
      params.refund_at_end = this.refund_at_end;
      params.gm_id = this.gm_id;
      params.shop_id = this.shop_id;
      params.trade_type = this.trade_type;
      params.deal_status = this.deal_status;
      params.abnormal_reason_text = this.abnormal_reason_text;
      console.log(params);
      this.$emit('on-search', params);
    },
  },
  mounted() {
    this.fetchLists(this.shopParams);
    this.gmfetchLists(this.shopParams);
  },
};
</script>

<style scoped lang="stylus">
>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
