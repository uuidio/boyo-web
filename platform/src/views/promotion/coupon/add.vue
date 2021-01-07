<template>
  <div class="mr24">
    <a-form>
      <a-form-item>
        <a-card title="设置优惠券名称" :bordered="false">
          <div class="coupon-name">
          <a-row type="flex" align="middle">
            <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
              优惠券名称：
            </a-col>
            <a-col :xs="{span:24}" :md="{span:6,offset:1}">
              <a-input v-model="formItem.name"/>
            </a-col>
          </a-row>
          <a-row type="flex" align="middle">
            <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
              优惠券描述：
            </a-col>
            <a-col :xs="{span:24}" :md="{span:6,offset:1}">
              <a-input v-model="formItem.desc" placeholder="例：仅兰蔻店使用"/>
            </a-col>
          </a-row>
        </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="选择适用店铺" :bordered="false">
          <selectShop @on-select="getShop" class="mb20">
            <a-button type="primary" size="large" style="width:100%">选择店铺</a-button>
          </selectShop>
          <div class="fxBox1">
            <div>已选择店铺</div>：<div v-if="formItem.limit_shop.length===0">暂未选择店铺</div>
            <div v-else>
              <a-tag class="mr10" v-for="(item,index) in formItem.limit_shop" :key="index">
                {{item.shop_name}}
              </a-tag>
            </div>
          </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="选择适用分类" :bordered="false">
          <selectShop selectType="class" @on-select="getClass" class="mb20">
            <a-button type="primary" size="large" style="width:100%">选择分类</a-button>
          </selectShop>
          <div class="fxBox1">
            <div>已选择分类</div>：<div v-if="formItem.limit_classes.length===0">暂未选择分类</div>
            <div v-else>
              <a-tag class="mr10" v-for="(item,index) in formItem.limit_classes" :key="index">
                {{item.gc_name}}
              </a-tag>
            </div>
          </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="设置规则" :bordered="false">
          <div class="items">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                优惠券场景：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.scenes" name="radioGroup" >
                  <a-radio v-if="formItem.type!==3" :value="1">线上</a-radio>
                  <a-radio v-if="formItem.type!==3" :value="2">线下</a-radio>
                  <a-radio v-if="formItem.type!==3" :value="3">全渠道</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                优惠券类型：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.type" name="radioGroup">
                  <a-radio :value="1">满减券</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                手动推送优惠券：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.is_hand_push" name="radioGroup">
                  <a-radio :value="0">否</a-radio>
                  <a-radio :value="1">是</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                优惠券金额：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:8,offset:1}">
                <div>
                  <div v-if="formItem.type!==3" class="reduction">
                    <span>满</span>
                    <a-input v-model="formItem.origin_condition" class="mj-input"/>
                  </div>
                  <div v-if="formItem.type===1" class="reduction">
                    <span>减</span>
                    <a-input v-model="formItem.denominations" class="mj-input"/>
                  </div>
                  <div v-else-if="formItem.type===2" class="reduction">
                    <span>折</span>
                    <a-input v-model="formItem.discount" class="mj-input"/>
                  </div>
                  <div v-else>
                    <span>减</span>
                    <a-input v-model="formItem.denominations" class="mj-input"/>
                    <span>元</span>
                  </div>
                </div>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                生成优惠券总数量：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                <a-input v-model="formItem.issue_num" type="number"/>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                用户可领取数量：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                <a-input type="number" v-model="formItem.user_num"/>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                优惠券可领取时间段：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                <a-range-picker
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  @change="timeChange"
                />
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                优惠券有效期：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                <a-range-picker
                  showTime
                  format="YYYY/MM/DD HH:mm:ss"
                  @change="timeChange2"
                />
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                满减活动是否可用：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.fullminus_act_enabled" name="radioGroup">
                  <a-radio :value="0">否</a-radio>
                  <a-radio :value="1">是</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">
                满折活动是否可用：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.discount_act_enabled" name="radioGroup">
                  <a-radio :value="0">否</a-radio>
                  <a-radio :value="1">是</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
<!--            <a-row type="flex" align="middle">-->
<!--              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">-->
<!--                拼团活动是否可用：-->
<!--              </a-col>-->
<!--              <a-col :xs="{span:24}" :md="{span:6,offset:1}">-->
<!--                <a-radio-group v-model="formItem.group_act_enabled" name="radioGroup">-->
<!--                  <a-radio :value="0">否</a-radio>-->
<!--                  <a-radio :value="1">是</a-radio>-->
<!--                </a-radio-group>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--            <a-row type="flex" align="middle">-->
<!--              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">-->
<!--                秒杀活动是否可用：-->
<!--              </a-col>-->
<!--              <a-col :xs="{span:24}" :md="{span:6,offset:1}">-->
<!--                <a-radio-group v-model="formItem.seckill_act_enabled" name="radioGroup">-->
<!--                  <a-radio :value="0">否</a-radio>-->
<!--                  <a-radio :value="1">是</a-radio>-->
<!--                </a-radio-group>-->
<!--              </a-col>-->
<!--            </a-row>-->
<!--            <a-row type="flex" align="middle">-->
<!--              <a-col :xs="{span:24}" :md="{span:4}" class="add-label">-->
<!--                分销商品是否可用：-->
<!--              </a-col>-->
<!--              <a-col :xs="{span:24}" :md="{span:6,offset:1}">-->
<!--                <a-radio-group v-model="formItem.spread_goods_enabled" name="radioGroup">-->
<!--                  <a-radio :value="0">否</a-radio>-->
<!--                  <a-radio :value="1">是</a-radio>-->
<!--                </a-radio-group>-->
<!--              </a-col>-->
<!--            </a-row>-->
          </div>
        </a-card>
      </a-form-item>
      <a-form-item class="btn-item">
        <a-button @click="submit" type="primary" size="large">保存</a-button>
        <a-button size="large">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
 import selectShop from '@C/coupon/selectShop'
  export default {
    name: 'add',
    components: {
      selectShop
    },
    data() {
      return {
        formItem: {
          name: '',
          is_bind_classes:1,
          is_bind_shop:1,
          is_hand_push:0,
          issue_num: '',
          user_num:1,
          scenes: 1,
          desc: '',
          type: 1,
          get_star: '',
          get_end: '',
          start_at: '',
          end_at: '',
          discount: '',
          denominations: '',
          origin_condition: '',
          limit_shop:[],
          limit_classes:[],
          fullminus_act_enabled: 0,
          discount_act_enabled: 0,
          group_act_enabled: 0,
          seckill_act_enabled: 0,
          spread_goods_enabled: 0,
        },
      };
    },
    methods: {
      ...mapActions({
        addCoupon: 'coupon/addCoupon',
      }),
      getShop(item){
       this.formItem.limit_shop = item
        console.log(item)
      },
      getClass(item){
        this.formItem.limit_classes = item
      },
      timeChange(dates, dateStrings) {
        this.formItem.get_star = dateStrings[0];
        this.formItem.get_end = dateStrings[1];
      },
      timeChange2(dates, dateStrings) {
        this.formItem.start_at = dateStrings[0];
        this.formItem.end_at = dateStrings[1];
      },
      delGoods(index) {
        this.formItem.limit_goods.splice(index, 1);
      },
      submit() {
        if (this.formItem.type === 3) {
          this.formItem.scenes = 2;
        }
        if(this.formItem.limit_classes.length===0){
          this.formItem.is_bind_classes = 0
        }
        if(this.formItem.limit_shop.length===0){
          this.formItem.is_bind_shop = 0
        }
        this.addCoupon({ formItem: this.formItem });
        console.log(this.formItem)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  >>> .coupon-name .ant-row-flex:not(:last-child), .items .ant-row-flex:not(:last-child)
    margin-bottom 15px

  >>> .mj-input
    width 140px
    margin 0 10px

  >>> .ant-calendar-picker
    width 100% !important

  >>> .btn-item
    text-align center

    .ant-form-item-children button:last-child
      margin-left 20px

  .item-lists
    margin-top 10px

  li
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

  @media screen and (min-width: 768px)
    >>> .ant-col-md-3
      text-align right

    .reduction
      display inline-block
</style>
