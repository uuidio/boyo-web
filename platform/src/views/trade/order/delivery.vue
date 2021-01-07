<template>
  <div class="mr24">
    <a-card :bordered="false" :title="'订单号:' + detail.tid">
      <div class="det-goods">
        <a-table :scroll="{ x: 1100,y:700 }" :pagination="page" :columns="columns" :dataSource="data">
          <div slot="goods_image" slot-scope="text, items">
            <div>
              <img width="60px" :src="items.goods_image" alt="" />
            </div>
          </div>
          <span slot="goods_price" slot-scope="text, items">
            ￥{{ text }}
          </span>
          <span slot="total_fee" slot-scope="text, items"> ￥{{ text }} </span>
        </a-table>
      </div>
    </a-card>
    <a-card :bordered="false" title="填写发货信息">
      <a-row>
        <a-col :md="12" :xs="24">
          <div class="userInfo">
            <a-row>
              <a-col :xs="12" :md="8">
                收货人:
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_name }}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                收货人手机:
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_tel }}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                所在地:
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_province }}
                {{ detail.receiver_city }}
                {{ detail.receiver_county }}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                收货地址:
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_address }}
              </a-col>
            </a-row>
            <a-row>
              <a-col :xs="12" :md="8">
                邮编:
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_zip }}
              </a-col>
            </a-row>
          </div>
        </a-col>
        <a-col :md="12" :xs="24">
          <div class="det-remark">
            <div class="buyer">
              <div class="fs16">配送方式：</div>
              <div class="buyer-info">
                快递
              </div>
            </div>
            <div class="mb20">
              <div class="fs16">物流公司：</div>
              <a-select v-model="formItem.corp_code" style="width:300px">
                <a-select-option
                  v-for="(item, index) in logistics"
                  :key="index"
                  :value="item.corp_code"
                  >{{ item.corp_name }}</a-select-option
                >
              </a-select>
            </div>
            <div>
              <div class="fs16">快递单号：</div>
              <a-input v-model="formItem.logi_no" style="width:300px" />
            </div>
          </div>
        </a-col>
      </a-row>
      <div class="delivery_btn">
        <a-button type="primary" @click="subDelivery">确认提交</a-button>
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

const columns = [
  {
    dataIndex: "goods_image",
    title: "商品图片",
    key: "goods_image",
    scopedSlots: { customRender: "goods_image" }
  },
  {
    title: "商品名称",
    dataIndex: "goods_name",
    key: "goods_name"
  },
  {
    title: "商品货号",
    dataIndex: "goods_serial",
    key: "goods_serial"
  },
  {
    title: "商品价格",
    dataIndex: "goods_price",
    key: "goods_price",
    scopedSlots: { customRender: "goods_price" }
  },
  {
    title: "商品数量",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "商品总价",
    dataIndex: "total_fee",
    key: "total_fee",
    scopedSlots: { customRender: "total_fee" }
  }
];
export default {
  name: "detail",
  computed: {
    ...mapState({
      detail: state => state.trade.detail,
      logistics: state => state.trade.logisticsData
    })
  },
  data() {
    return {
      stepCurrent: 0,
      data: [],
      columns,
      page: false,
      formItem: {
        corp_code: "",
        tid: "",
        logi_no: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getDetail: "trade/getDetail",
      logisticsLists: "trade/logisticsLists",
      addLogistics: "reward/addLogistics"
    }),
    initDet() {
      this.data = this.detail.trade_order;
      this.formItem.tid = this.detail.tid;
    },
    subDelivery() {
      this.addLogistics({ formItem: this.formItem });
    }
  },
  mounted() {
    this.getDetail({ id: this.$route.params.id });
    this.logisticsLists({ per_page: 99999 });
  },
  watch: {
    detail() {
      this.initDet();
    }
  }
};
</script>

<style scoped lang="stylus">
.fahuo {
  text-align center
  margin-top 20px
}
>>> .ant-card:not(:last-child) {
  margin-bottom 20px
}
>>> .det-info .ant-col-md-6 {
  margin-bottom 20px
}
.det-title {
  margin 20px 0
  padding-bottom 10px
  border-bottom 1px solid #e8e8e8
}
>>> .userInfo .ant-row > div:first-child {
  font-weight 700
}
>>> .userInfo .ant-row:last-child > div {
  border-bottom 0
}
>>> .userInfo .ant-row > div {
  padding 8px 0
  border-bottom 1px solid #e8e8e8
}
.buyer {
  margin-bottom 20px
}
.det-remark .fs16 {
  margin-bottom 10px
  font-weight 700
}
.buyer-info {
  min-height 20px
  background-color #f5f5f5
  border 1px solid #e3e3e3
  padding 9px
  border-radius 3px
}
.det-info p {
  line-height 1.8
}
.delivery_btn {
  margin 30px -32px 0
  text-align center
  padding-top 20px
  border-top 1px solid #e8e8e8
}
@media (min-width: 765px) {
  .det-time {
    text-align right
  }
  .buyer-info {
    width 300px
  }
}
</style>
