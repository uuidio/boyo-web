<template>
  <div class="mr24">
    <a-card :bordered="false" title="订单进度">
      <div class="steps">
        <a-steps :current="stepCurrent" :status="detail.status_text=='已关闭'?'error':''">
          <a-step>
            <template slot="title" v-if="detail.status_text ==='已关闭'">
              已关闭
            </template>
            <template slot="title" v-else>
              待付款
            </template>
          </a-step>
          <a-step>
            <template slot="title" v-if="detail.pick_type_name ==='自提'">
              待提货
            </template>
            <template slot="title" v-else>
              待发货
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              待发货
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              待收货
            </template>
          </a-step>
          <a-step>
            <template slot="title" v-if="detail.status_text ==='已关闭'">
              已关闭
            </template>
            <template slot="title" v-else>
              已完成
            </template>
          </a-step>
        </a-steps>
      </div>
    </a-card>
    <a-card :bordered="false" title="订单信息">
      <span slot="extra">下单时间:{{ detail.created_at }}</span>
      <div class="det-info">
        <a-row>
          <a-col :md="6">
            <p>订单店铺： {{ detail.shop_info.shop_name }}</p>
            <p>订单号：{{ detail.tid }}</p>
            <p>订单状态： {{ detail.status_text }}</p>
            <p v-if="detail.logi_name">订单物流公司： {{ detail.logi_name }}</p>
            <p v-if="detail.invoice_no">
              订单物流单号： {{ detail.invoice_no }}
            </p>
            <p v-if="detail.consign_time">
              发货时间： {{ detail.consign_time }}
            </p>
            <div v-if="detail.activity_sign === 'is_group'">
              <p>
                拼团人数：{{ detail.group_info.group_count }}
                <a
                  @click="visible = true"
                  href="javascript:;"
                  v-if="detail.group_info.group_count > 0"
                  >查看</a
                >
              </p>
              <p>拼团状态：{{ detail.group_status_text }}</p>
              <!-- <p v-if="detail.group_info.group_count > 0">团员：<span v-for="(item) in detail.group_info.group_users">{{item}}</span></p> -->
            </div>
          </a-col>
          <a-col :md="6">
            <p>商品总额：￥{{ detail.total_fee }}</p>
            <p>运费金额：￥{{ detail.post_fee }}</p>
            <p>优惠金额：￥{{ detail.discount_fee }}</p>
            <p>实付金额：￥{{ detail.amount }}</p>
          </a-col>
          <a-col :md="6">
            <p>配送方式：{{ detail.pick_type_name }}</p>
            <p v-if="detail.pick_type && detail.status_text !== '已关闭'">
              核销时间：{{  detail.end_time || "未核销" }}
            </p>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" title="商品信息">
      <div class="det-goods">
        <a-table :scroll="{ x: 1100,y:700 }" :pagination="page" :columns="columns" :dataSource="data">
          <div slot="goods_image" slot-scope="text, items">
            <div>
              <img width="60px" :src="items.goods_image" alt="" />
            </div>
          </div>
        </a-table>
        <div style="text-align: right;margin:20px 0">
          配送费用<span class="col-red">￥{{ detail.post_fee }}</span> &nbsp;
          商品总额<span class="col-red">￥{{ detail.total_fee }}</span>
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
            <a-row v-if="detail.pick_type === 0">
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
                {{detail.pick_type === 0 ? '收货地址:' : '提货地址:'}}
              </a-col>
              <a-col :xs="12" :md="8">
                {{ detail.receiver_address }}
              </a-col>
            </a-row>
            <a-row v-if="detail.pick_type === 0">
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
              <div class="fs16">买家备注:</div>
              <div class="buyer-info">
                {{ detail.buyer_message }}
                <!--等下拍-->
              </div>
            </div>
            <!--<div>-->
            <!--<div class="fs16">商家备注:</div>-->
            <!--<a-input style="width:300px" :rows="4" type="textarea"/>-->
            <!--</div>-->
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-modal title="团购成员" v-model="visible" @ok="visible = false">
      <div v-if="detail.group_info" class="group-member">
        <a-row
          type="flex"
          align="middle"
          v-for="(item, index) in detail.group_info.group_users"
          :key="index"
        >
          <a-col span="3"
            ><a-avatar :src="item.wechat_head_img" :size="40"
          /></a-col>
          <a-col span="5"
            ><p>{{ item.trade.receiver_name }}</p></a-col
          >
          <a-col span="10"
            ><p>{{ item.trade.user_mobile }}</p></a-col
          >
        </a-row>
      </div>
    </a-modal>
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
    key: "goods_name",
    width: 300
  },
  {
    title: "商品规格",
    dataIndex: "sku_info",
    key: "sku_info"
  },
  {
    title: "购买数量",
    dataIndex: "quantity",
    key: "quantity"
  },
  {
    title: "商品价格",
    dataIndex: "goods_price",
    key: "goods_price"
  }
];
export default {
  name: "detail",
  computed: {
    ...mapState({
      detail: state => state.trade.detail
    })
  },
  data() {
    return {
      visible: false,
      stepCurrent: 0,
      data: [],
      columns,
      page: false
    };
  },
  methods: {
    ...mapActions({
      getDetail: "trade/getDetail"
    }),
    initDet() {
      console.log(this.detail);
      switch (this.detail.status_text) {
        case "待付款":
          this.stepCurrent = 0;
          break;
        case "待发货":
          this.stepCurrent = 1;
          break;
        case "待收货":
          this.stepCurrent = 2;
          break;
        case "已完成":
          this.stepCurrent = 3;
          break;
        case "已关闭":
          this.stepCurrent = 0;
          break;
        default:
      }
      this.data = this.detail.trade_order;
    }
  },
  mounted() {
    this.getDetail({ id: this.$route.params.id });
  },
  watch: {
    detail() {
      this.initDet();
    }
  }
};
</script>

<style scoped lang="stylus">
.group-member >>> .ant-row-flex {
  margin-bottom 15px
  p {
    padding 0 5px
  }
}
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
@media (min-width: 765px) {
  .det-time {
    text-align right
  }
  .buyer-info {
    width 300px
  }
}
</style>
