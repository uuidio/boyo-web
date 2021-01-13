<template>
  <div class="mr24">
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
    <a-card :bordered="false" title="收货信息">
      <a-row>
        <a-col :md="12" :xs="24">
          <div class="userInfo">
            <a-row>
              <a-col :xs="12" :md="8">
                收货人:
              </a-col>
              <a-col :xs="12" :md="8">
                {{detail.receiver_name}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                收货人手机:
              </a-col>
              <a-col :xs="12" :md="8">
                {{detail.receiver_tel}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                所在地:
              </a-col>
              <a-col :xs="12" :md="8">
                {{detail.receiver_province}}
                {{detail.receiver_city}}
                {{detail.receiver_county}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                收货地址:
              </a-col>
              <a-col :xs="12" :md="8">
                {{detail.receiver_address}}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                邮编:
              </a-col>
              <a-col :xs="12" :md="8">
                {{detail.receiver_zip}}
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :md="12" :xs="24">
          <div class="det-remark">
            <!-- <div class="buyer">
              <div class="fs16">买家备注:</div>
              <div class="buyer-info">
                等下拍
              </div>
            </div> -->
            <div>
              <div class="fs16">门店备注:</div>
              <a-input style="width:300px" :rows="4" type="textarea"/>
              <div class="mt10">
                <a-button type="primary">保存</a-button>
              </div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
		<a-card :bordered="false" title="操作">
			<div class="btnBox">
				<a-button type="primary" @click="confirmBtn">确认提货</a-button>
			</div>
		</a-card>
		<a-modal title="提货确认" v-model="deliveVisible" @ok="deliveHandleOk">
			您确定要提货吗？
		</a-modal>
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
}, {
  title: '商品数量',
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
      detail: state => state.trade.detail,
    }),
  },
  data() {
    return {
			deliveVisible: false,
      stepCurrent: 0,
      data: [],
      columns,
      page: false,
    };
  },
  methods: {
    ...mapActions({
      getDetail: 'trade/getDetail',
			pickUpInfo: 'trade/pickUpInfo',
    }),
		confirmBtn(){
			this.deliveVisible = true
		},
		deliveHandleOk(){
			const itemId = this.detail.id
			const code = this.detail.pick_code
			this.pickUpInfo({
				id: itemId,
        code:code,
			})
			this.deliveVisible = false
		},
    initDet() {
      switch (this.detail.status_text) {
        case '待付款':
          this.stepCurrent = 0;
          break;
        case '待发货':
          this.stepCurrent = 1;
          break;
        case '待收货':
          this.stepCurrent = 2;
          break;
        case '已完成':
          this.stepCurrent = 3;
          break;
        default:
      }
      this.data = this.detail.trade_order;
      console.log(this.detail)
    },
    goDetail(kid) {
      const jumpUrl = `/trade/order/delivery/${kid}`;
      this.$router.push({ path: jumpUrl });
    },

  },
  mounted() {
    this.getDetail({ id: this.$route.params.id });
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
	.btnBox
		display: flex
		justify-content:center;
</style>
