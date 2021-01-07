<template>
  <div class="mr24">
    <a-card :bordered="false" title="订单进度">
      <div class="steps">
        <a-steps :current="stepCurrent">
          <a-step>
            <template slot="title">
              提交申请
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              取消处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              退款处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              完成
            </template>
          </a-step>
        </a-steps>
      </div>
    </a-card>
    <a-card :bordered="false" title="订单信息">
      <span slot="extra">下单时间:{{detail.created_at}}</span>
      <div class="det-info">
        <a-row>
          <a-col :md="6">
            <p>订单号：{{detail.tid}} </p>
            <p>订单状态： {{detail.status_text}} </p>
          </a-col>
          <a-col :md="6">
            <p>商品总额：￥{{detail.total_fee}}</p>
            <p>运费金额：￥{{detail.post_fee}}</p>
            <p>应付金额：￥{{detail.amount}}</p>
          </a-col>
          <a-col :md="6">
            <p>联系方式：{{detail.receiver_tel}} </p>
            <p>收货人：{{detail.receiver_name}} </p>
            <p>收货地址：{{detail.receiver_address}} </p>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" title="商品信息">
      <div class="det-goods">
        <a-table :scroll="{x:1100,y:700}" :pagination="page" :columns="columns" :dataSource="data">
          <div slot="goods_image" slot-scope="text,items">
            <div>
              <img width="60px" :src="items.goods_image" alt="">
            </div>
          </div>
        </a-table>
        <div style="text-align: right;margin:20px 0">
          配送费用<span class="col-red">￥{{detail.post_fee}}</span>
          &nbsp;
          商品总额<span class="col-red">￥{{detail.total_fee}}</span>
        </div>
      </div>
    </a-card>
    <a-card :bordered="false" title="订单取消原因">
      <a-row>
        <a-col :xs="{ span:24}" :md="{ span: 6 }">{{this.cancelDetail.reason}}</a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="cancelDetail.process==0">
          <a-radio-group v-model="formItem.status" :defaultValue="1">
            <a-radio value="agree">同意退款</a-radio>
            <a-radio value="reject">不同意</a-radio>
          </a-radio-group>
          <a-textarea v-model="reason_text" v-if="formItem.status=='reject'" class="mt10 mb10" placeholder="请输入不同意退款的理由" :rows="4"/>
          <div class="mt10">
            <a-button @click="submit" type="primary">提交</a-button>
          </div>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="cancelDetail.process==3">
              <p>审核结果:</p>
              {{cancelDetail.shop_reject_reason}}
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const columns = [{
  dataIndex: 'goods_image',
  title: '商品图片',
  key: 'goods_image',
  scopedSlots: { customRender: 'goods_image' },
}, {
  title: '商品名称',
  dataIndex: 'goods_name',
  key: 'goods_name',
},{
  title: '购买数量',
  dataIndex: 'quantity',
  key: 'quantity',
}, {
  title: '商品价格',
  dataIndex: 'goods_price',
  key: 'goods_price',
}];
export default {
  name: 'detail',
  computed: {
    ...mapState({
      detail: state => state.trade.cancelDetail,
      cancelDetail: state => state.trade.getCancel,
    }),
  },
  data() {
    return {
      stepCurrent: 0,
      data: [],
      columns,
      reason_text: '',
      formItem: {
        cancel_id: '',
        tid: '',
        status: 'agree',
      },
      cancal_text: '1',
      page: false,
    };
  },
  methods: {
    ...mapActions({
      getCancelDetail: 'trade/getCancelDetail',
      cancelShopReply: 'trade/cancelShopReply',
    }),
    initDet() {
      this.stepCurrent = Number(this.cancelDetail.process);
      this.data = this.detail.trade_order;
      this.formItem.cancel_id = this.cancelDetail.cancel_id;
      this.formItem.tid = this.cancelDetail.tid;
    },
    submit() {
      if (this.formItem.status === 'reject') {
        this.formItem.reason = this.reason_text;
      }
      this.cancelShopReply({
        formItem: this.formItem,
      });
    },
  },
  mounted() {
    this.getCancelDetail({ id: this.$route.params.id });
  },
  watch: {
    detail() {
      this.initDet();
    },
  },
};
</script>

<style scoped lang="stylus">
  .fahuo
    text-align center
    margin-top 20px

  >>> .ant-card:not(:last-child)
    margin-bottom 20px

  >>> .det-info .ant-col-md-6
    margin-bottom 20px

  .det-title
    margin 20px 0
    padding-bottom 10px
    border-bottom 1px solid #e8e8e8

  >>> .userInfo .ant-row > div:first-child
    font-weight 700

  >>> .userInfo .ant-row:last-child > div
    border-bottom 0

  >>> .userInfo .ant-row > div
    padding 8px 0
    border-bottom 1px solid #e8e8e8

  .buyer
    margin-bottom 20px

  .det-remark .fs16
    margin-bottom 10px
    font-weight 700

  .buyer-info
    min-height 20px
    background-color #f5f5f5
    border 1px solid #e3e3e3
    padding 9px
    border-radius 3px

  .det-info p
    line-height 1.8

  @media (min-width: 765px)
    .det-time
      text-align right

    .buyer-info
      width 300px
</style>
