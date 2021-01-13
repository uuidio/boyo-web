<template>
    <div class="mr24 coupon_show">
      <a-card title="优惠券名称">
        <a-row type="flex" align="middle">
          <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
            活动名称：
          </a-col>
          <a-col :xs="{span:24}" :md="{span:6}">
            <p class="coupon_p">{{activitydet.name}}</p>
          </a-col>
        </a-row>
      </a-card>
      <a-card title="已选择商品">
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
        <div v-if="activitydet.is_bind_goods==0">
          全商品适用
        </div>
        <div class="mt10" v-else-if="activitydet.is_bind_goods==1">
          <span class="col-red">*</span>以上商品参与本次活动促销
        </div>
        <div class="mt10" v-else-if="activitydet.is_bind_goods==2">
          <span class="col-red">*</span>以上商品不参与本次活动促销
        </div>

      </a-card>
      <a-card title="设置规则">
        <div class="coupon_p ruleBox">
          促销规则：
          <div v-if="activitydet.type==1">
            <span v-for="item in activitydet.rule">
              消费满{{item.condition}}减{{item.num}}&nbsp;
            </span>
          </div>
          <div v-else-if="activitydet.type==2">
            <span v-for="item in activitydet.rule">
              消费满{{item.condition}}给予{{item.num}}%折扣&nbsp;
            </span>
          </div>
        </div>
        <p class="coupon_p">
          规则描述：{{activitydet.desc}}
        </p>
        <p class="coupon_p">
          适用会员：{{activitydet.user_type}}
        </p>
        <p class="coupon_p">
          使用平台：{{activitydet.channel}}
        </p>
        <p class="coupon_p">
          起止时间：{{activitydet.star_time}} ~ {{activitydet.end_time}}
        </p>
        <p class="coupon_p">
          与积分抵扣同享：{{activitydet.is_use_point === 1 ? '是' : '否'}}
        </p>
      </a-card>
    </div>
</template>

<script>
  import { mapState, mapActions } from "vuex";
    export default {
      name: "coupon_show",
      computed: {
        ...mapState({
          activitydet:state => state.marketing.activitydet
        })
      },
      data(){
        return{
          goods_list:[],
        }
      },
      methods:{
        ...mapActions({
          activityDetail: "marketing/activityDetail",
        }),
        getDetail(){
          if(this.activitydet.limit_goods!==null ){
            this.goods_list = this.activitydet.limit_goods
          }
        }
      },
      mounted() {
        if (this.$route.params.id !== undefined) {
          this.activityDetail({ id: this.$route.params.id });
        }
      },
      watch: {
        activitydet() {
          this.getDetail();
        }
      }
    }
</script>

<style scoped lang="stylus">
.ruleBox
  display flex
  flex-wrap wrap
  align-items center
.coupon_show  >>>.ant-card:not(:last-child)
  margin-bottom 24px
.coupon_p
  line-height 32px
.item-lists li
  border 1px solid #efefef
  >>>.ant-row-flex>div
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
