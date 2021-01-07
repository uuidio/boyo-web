<template>
  <div class="mr24 coupon_show">
    <a-card title="优惠券名称">
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          优惠券名称：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{coupondet.name}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          优惠券描述：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{coupondet.desc}}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="已选择适用商品">
      <ul class="item-lists">
        <li v-for="(item,index) in goods_list">
          <a-row type="flex" align="middle">
            <a-col :xs="24" :sm="18">
              <div class="goods-item">
                <div class="imgBox">
                  <img :src="item.goods_image" alt="">
                </div>
                <div>
                  <p>{{item.goods_name}}</p>
                  <p class="col-red">￥{{item.goods_price}}</p>
                </div>
              </div>
            </a-col>
          </a-row>
        </li>
      </ul>
      <div v-if="coupondet.is_bind_goods==0">
        全商品适用
      </div>
      <div class="mt10" v-else-if="coupondet.is_bind_goods==1">
        <span class="col-red">*</span>以上商品参与本次活动促销
      </div>
      <div class="mt10" v-else-if="coupondet.is_bind_goods==2">
        <span class="col-red">*</span>以上商品不参与本次活动促销
      </div>
    </a-card>
    <a-card title="设置规则">
      <p class="coupon_p">
        使用平台：{{ coupondet.channel}}
      </p>
      <!--<p class="coupon_p">-->
        <!--适用会员：-->
      <!--</p>-->
      <p class="coupon_p">
        使用场景：{{coupondet.scenes==1?'线上':'线下'}}
      </p>
      <div class="coupon_p">
        <p v-if="coupondet.type==1">
          优惠券金额：满{{coupondet.origin_condition}}减{{coupondet.denominations}}
        </p>
        <p v-else-if="coupondet.type==2">
          优惠券金额：满{{coupondet.origin_condition}}支付原价的{{coupondet.discount}}%价格购买
        </p>
      </div>
      <p class="coupon_p">
        优惠券总数量：{{coupondet.issue_num}}
      </p>
      <p class="coupon_p">
        用户可领取数量：{{coupondet.user_num}}
      </p>
      <p class="coupon_p">
        审核状态：{{coupondet.status_text}}
      </p>
      <p class="coupon_p">
        领取时间段：{{coupondet.get_star}}~{{coupondet.get_end}}
      </p>
      <p class="coupon_p">
        有效期：{{coupondet.start_at}}~{{coupondet.end_at}}
      </p>
      <p class="coupon_p">
        满减活动是否可用：{{coupondet.fullminus_act_enabled ? '是' : '否'}}
      </p>
      <p class="coupon_p">
        满折活动是否可用：{{coupondet.discount_act_enabled ? '是' : '否'}}
      </p>
<!--      <p class="coupon_p">-->
<!--        拼团活动是否可用：{{coupondet.group_act_enabled ? '是' : '否'}}-->
<!--      </p>-->
<!--      <p class="coupon_p">-->
<!--        秒杀活动是否可用：{{coupondet.seckill_act_enabled ? '是' : '否'}}-->
<!--      </p>-->
<!--      <p class="coupon_p">-->
<!--        分销商品是否可用：{{coupondet.spread_goods_enabled ? '是' : '否'}}-->
<!--      </p>-->
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'coupon_show',
  computed: {
    ...mapState({
      coupondet: state => state.marketing.coupondet,
    }),
  },
  data() {
    return {
      goods_list: [],
    };
  },
  methods: {
    ...mapActions({
      couponDetail: 'marketing/couponDetail',
    }),
    getDetail() {
      if (this.coupondet.limit_goods !== null) {
        this.goods_list = this.coupondet.limit_goods;
      }
    },
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.couponDetail({ id: this.$route.params.id });
    }
  },
  watch: {
    coupondet() {
      this.getDetail();
    },
  },
};
</script>

<style scoped lang="stylus">
  .coupon_show >>> .ant-card:not(:last-child)
    margin-bottom 24px

  .coupon_p
    line-height 32px

  .item-lists li
    border 1px solid #efefef

    >>> .ant-row-flex > div
      padding 8px
      vertical-align middle

      .goods-item
        display flex

      .imgBox
        width 60px
        margin-right 15px

        img
          width 60px
</style>
