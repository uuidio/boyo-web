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
                <a-input v-model="formItem.desc"/>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="选择适用商品" :bordered="false">
          <getGoods @selectOk="getGoodsList">
            <a-button type="primary" size="large" style="width:100%">选择商品</a-button>
          </getGoods>
          <ul class="item-lists">
            <li>
              <a-row type="flex" align="middle">
                <a-col  v-for="(item,index) in formItem.limit_goods" :xs="24" :sm="5">
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
                <!--<a-col :xs="4" :sm="3">-->
                  <!--<a>编辑sku</a>-->
                <!--</a-col>-->
                <!--<a-col :xs="4" :sm="3">-->
                  <!--<a @click="delGoods(index)">删除</a>-->
                <!--</a-col>-->
              </a-row>
            </li>
          </ul>
          <!--<div class="mt10">-->
            <!--<a-radio-group name="radioGroup" v-model="formItem.is_bind_goods">-->
              <!--&lt;!&ndash;<a-radio value="1">以上选择商品参与优惠券活动</a-radio>&ndash;&gt;-->
              <!--&lt;!&ndash;<a-radio value="2">以上选择商品不参与优惠券活动</a-radio>&ndash;&gt;-->
            <!--&lt;!&ndash;</a-radio-group>&ndash;&gt;-->
            <!--&lt;!&ndash;<p class="col-666 mt10">&ndash;&gt;-->
              <!--&lt;!&ndash;（该选项在选择商品后选用，不选择商品默认全商品适用优惠券）&ndash;&gt;-->
            <!--&lt;!&ndash;</p>&ndash;&gt;-->
          <!--</div>-->
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="设置规则" :bordered="false">
          <div class="items">
            <!--<a-row type="flex" align="middle">-->
              <!--<a-col :xs="{span:24}" :md="{span:4}" class="add-label">-->
                <!--适用平台：-->
              <!--</a-col>-->
              <!--<a-col :xs="{span:24}" :md="{span:8,offset:1}">-->
                <!--<a-checkbox-->
                  <!--@change="onCheckAllChange2"-->
                  <!--:checked="checkAll2"-->
                <!--&gt;-->
                  <!--全选-->
                <!--</a-checkbox>-->
                <!--<a-checkbox-group :options="channelOptions" v-model="checkedChannel" @change="onChange2"/>-->
              <!--</a-col>-->
            <!--</a-row>-->
            <!--<a-row type="flex" align="middle">-->
              <!--<a-col :xs="{span:24}" :md="{span:4}" class="add-label">-->
                <!--适用会员：-->
              <!--</a-col>-->
              <!--<a-col :xs="{span:24}" :md="{span:8,offset:1}">-->
                <!--<a-checkbox-->
                  <!--@change="onCheckAllChange"-->
                  <!--:checked="checkAll"-->
                <!--&gt;-->
                  <!--全选-->
                <!--</a-checkbox>-->
                <!--<a-checkbox-group :options="plainOptions" v-model="checkedList" @change="onChange"/>-->
              <!--</a-col>-->
            <!--</a-row>-->
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
                <a-radio-group v-model="formItem.type" name="radioGroup" :defaultValue="1">
                  <a-radio :value="1">满减券</a-radio>
                  <!--<a-radio :value="2">满折券</a-radio>-->
                  <!--<a-radio :value="3">代金券</a-radio>-->
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
        <a-button @click="submit" type="primary" size="large" :disabled="is_submit">保存</a-button>
        <a-button size="large" @click="goback">取消</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import getGoods from '@C/goodsList/goodsList';
import { mapState, mapActions } from 'vuex';

const plainOptions = ['普通会员', 'SVIP会员', 'VIP会员'];
const channelOptions = ['app端', 'wap端', 'pc端'];
export default {
  name: 'add',
  components: {
    getGoods,
  },
  data() {
    return {
      is_submit:false,
      checkAll: false,
      checkAll2: false,
      plainOptions,
      channelOptions,
      checkedChannel: [],
      checkedList: [],
      formItem: {
        name: '',
        is_bind_goods:'1',
        limit_goods: [],
        issue_num: '',
        user_num: 1,
        scenes: 1,
        desc: '',
        type: 1,
        get_star: '',
        get_end: '',
        start_at: '',
        end_at: '',
        discount: '',
        denominations: '',
        channel: [],
        origin_condition: '',
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
      addCoupon: 'marketing/addCoupon',
    }),
    timeChange(dates, dateStrings) {
      this.formItem.get_star = dateStrings[0];
      this.formItem.get_end = dateStrings[1];
    },
    timeChange2(dates, dateStrings) {
      this.formItem.start_at = dateStrings[0];
      this.formItem.end_at = dateStrings[1];
    },
    onChange2(checkedChannel) {
      this.checkAll2 = checkedChannel.length === channelOptions.length;
    },
    onCheckAllChange2(e) {
      Object.assign(this, {
        checkedChannel: e.target.checked ? channelOptions : [],
        checkAll2: e.target.checked,
      });
    },
    onChange(checkedList) {
      this.checkAll = checkedList.length === plainOptions.length;
    },
    onCheckAllChange(e) {
      Object.assign(this, {
        checkedList: e.target.checked ? plainOptions : [],
        checkAll: e.target.checked,
      });
    },
    getGoodsList(item) {
      console.log(item)
      this.formItem.limit_goods = item;
    },
    delGoods(index) {
      this.formItem.limit_goods.splice(index, 1);
    },
    submit() {
      this.is_submit=true
      this.formItem.channel = this.checkedChannel;
      if (this.formItem.type === 3) {
        this.formItem.scenes = 2;
      }
      if(this.formItem.limit_goods.length===0){
        this.formItem.is_bind_goods = 0
      }
      this.addCoupon({ formItem: this.formItem });
      console.log(this.formItem)
      setTimeout(()=>{
        this.$nextTick(()=>{
          this.is_submit=false
        })
      },2000)
    },
    goback(){
      this.$router.push({path:'/marketing/coupon'});
    }
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
