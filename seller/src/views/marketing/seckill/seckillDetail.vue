<template>
  <div class="mr24 coupon_show"  v-if="show">
    <a-card title="秒杀活动信息">
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动名称：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.activity_name}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动描述：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.activity_desc}}</p>
        </a-col>
      </a-row>
      <!--<a-row type="flex" align="middle">-->
        <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
          <!--秒杀报名商品限制数量：-->
        <!--</a-col>-->
        <!--<a-col :xs="{span:24}" :md="{span:6}">-->
          <!--<p class="coupon_p">{{detail.enroll_limit}}个</p>-->
        <!--</a-col>-->
      <!--</a-row>-->
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动报名时间：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.apply_begin_time}} ~ {{detail.apply_end_time}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动生效时间：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.start_time}} ~ {{detail.end_time}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动状态：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.validstatus}}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="已选择商品">
      <ul class="item-lists">
        <li>
          <a-row type="flex" align="middle">
            <a-col class="col-item"  v-for="(item,index) in goods_lists" :key="index" :xs="24" :sm="4">
              <div class="goods-item">
                <div class="imgBox">
                  <img :src="item.goods_image" alt="">
                </div>
                <div class="goods-info">
                  <p class="line-one-p">商品名称：{{item.goods_name}}</p>
                  <p>商品原价格：￥{{item.goods_price}}</p>
                  <p>商品原库存：{{item.goods_stock}}</p>
                  <p>商品SKU信息：{{item.spec_sign}}</p>
                  <p>秒杀商品标题：<span v-if="item.title===''" class="col-red">未填写</span><span v-else>{{item.title}}</span></p>
                  <p>秒杀商品价格：<span v-if="item.seckill_price===''" class="col-red">未填写</span><span v-else>{{item.seckill_price}}</span></p>
                  <p>秒杀商品库存：<span v-if="item.seckills_stock===''" class="col-red">未填写</span><span v-else>{{item.seckills_stock}}</span></p>
                  <!-- <p>秒杀商品限购：<span v-if="item.stock_limit===''" class="col-red">未填写</span><span v-else>{{item.stock_limit}}</span></p> -->
                  <!-- <p>秒杀商品状态：<span>{{item.verify_status_text}}</span></p> -->
				  <p>秒杀商品状态：<span>{{item.activity_status}}</span></p>
                </div>
              </div>
            </a-col>
          </a-row>
        </li>
      </ul>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'coupon_show',
  computed: {
    ...mapState({
      allDetail: state => state.seckill.detail,
    }),
  },
  data() {
    return {
      goods_lists:[],
      detail:{},
      show:false
    };
  },
  watch:{
    allDetail(){
      this.goods_lists = this.allDetail.seckillgood
      this.detail = this.allDetail.secKillApplie[0]
      console.log(this.detail)
      this.show = true
    }
  },
  methods: {
    ...mapActions({
      getDetail: 'seckill/getDetail',
    }),
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.getDetail({ id: this.$route.params.id });
    }
  },
};
</script>

<style scoped lang="stylus">
  .coupon_show >>> .ant-card:not(:last-child)
    margin-bottom 24px

  .coupon_p
    line-height 32px

  >>>.col-item
    padding-right 10px;
    box-sizing border-box
  .goods-item
    width 100%
    border 1px solid #e7e7e7
    margin-top 10px
    margin-right 10px
    img
      display block
      width 150px
      height 150px
      margin 0 auto
    .goods-info
      padding 4px
      p
        padding-bottom 4px
</style>
