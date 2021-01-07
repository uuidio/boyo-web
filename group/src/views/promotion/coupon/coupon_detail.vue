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
    <a-card v-if="coupondet.shop_id!==0" title="已选择适用商品">
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
    <a-card v-if="coupondet.shop_id===0" title="已选择适用店铺">
      <a-tag class="mr10" v-for="(item,index) in coupondet.limit_shop" :key="index">
        {{item.shop_name}}
      </a-tag>
      <div v-if="coupondet.is_bind_shop==0">
        全店铺商品适用
      </div>
    </a-card>
    <a-card v-if="coupondet.shop_id===0" title="已选择适用分类">
      <a-tag class="mr10" v-for="(item,index) in coupondet.limit_classes" :key="index">
        {{item.gc_name}}
      </a-tag>
      <div v-if="coupondet.is_bind_classes==0">
        全分类商品适用
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
      <p class="coupon_p" v-if="coupondet.shop_id===0">
        是否是手动推送券：{{coupondet.is_hand_push==1?'是':'否'}}
      </p>
      <div class="coupon_p">
        <p v-if="coupondet.type==1">
          优惠券金额：满{{coupondet.origin_condition}}减{{coupondet.denominations}}
        </p>
        <p v-else-if="coupondet.type==2">
          优惠券金额：满{{coupondet.origin_condition}}给予{{coupondet.discount}}%折扣
        </p>
      </div>
      <p class="coupon_p">
        优惠券总数量：{{coupondet.issue_num}}
      </p>
      <p class="coupon_p">
        领取时间段：{{coupondet.get_star}}~{{coupondet.get_end}}
      </p>
      <p class="coupon_p">
        有效期：{{coupondet.start_at}}~{{coupondet.end_at}}
      </p>
    </a-card>
    <a-card title="审核操作">
      <p class="coupon_p">
        审核状态：{{coupondet.status_text}}
      </p>
      <p class="coupon_p" v-if="coupondet.status==='FAILS'">
        驳回理由：{{coupondet.reason}}
      </p>
      <div v-if="coupondet.status==='WAIT'">
        <div>
          <span class="coupon_p">审核操作：</span>
          <a-radio-group name="radioGroup" v-model="formItem.result" class="mb10">
            <a-radio value="SUCCESS">同意</a-radio>
            <a-radio value="FAILS">驳回</a-radio>
          </a-radio-group>
        </div>
        <div>
          <a-textarea class="mb20" style="width:220px" v-model="formItem.reject_reason" placeholder="审核备注（驳回必填）" :rows="4" />
        </div>
        <div>
          <a-button @click="submit" type="primary">提交</a-button>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'coupon_show',
    computed: {
      ...mapState({
        coupondet: state => state.coupon.coupondet,
      }),
    },
    data() {
      return {
        goods_list: [],
        formItem:{
          result:'SUCCESS',
          coupon_id:'',
          reject_reason:''
        }
      };
    },
    methods: {
      ...mapActions({
        couponDetail: 'coupon/couponDetail',
        coupon_check: 'coupon/coupon_check',
      }),
      submit(){
        this.coupon_check({formItem:this.formItem})
      },
      getDetail() {
        if (this.coupondet.limit_goods !== null) {
          this.goods_list = this.coupondet.limit_goods;
        }
        this.formItem.coupon_id = this.coupondet.id
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
