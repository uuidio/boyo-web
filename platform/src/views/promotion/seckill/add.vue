<template>
  <div class="mr24">
    <a-form>
      <a-form-item>
        <a-card title="设置秒杀活动信息" :bordered="false">
          <div class="coupon-name">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                秒杀活动名称：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-input v-model="formItem.activity_name"/>
              </a-col>
            </a-row>
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                秒杀活动描述：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-input v-model="formItem.activity_desc"/>
              </a-col>
            </a-row>
          </div>
        </a-card>
      </a-form-item>
      <a-form-item>
        <a-card title="设置规则" :bordered="false">
          <div class="items">
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                活动报名日期：
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
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                活动生效日期：
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
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
               秒杀活动标签：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:7,offset:1}">
                <a-input v-model="formItem.activity_tag"/>
              </a-col>
            </a-row>
            <!--<a-row type="flex" align="middle">-->
              <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
                <!--店铺报名商品限制数量：-->
              <!--</a-col>-->
              <!--<a-col :xs="{span:24}" :md="{span:7,offset:1}">-->
                <!--<a-input v-model="formItem.enroll_limit" type="number"/>-->
              <!--</a-col>-->
            <!--</a-row>-->
            <a-row type="flex" align="middle">
              <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
                是否启用活动：
              </a-col>
              <a-col :xs="{span:24}" :md="{span:6,offset:1}">
                <a-radio-group v-model="formItem.enabled" name="radioGroup" >
                  <a-radio  :value="1">启用</a-radio>
                  <a-radio  :value="0">不启用</a-radio>
                </a-radio-group>
              </a-col>
            </a-row>
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
export default {
  name: 'add',
  components: {
  },
  data() {
    return {
      formItem: {
        activity_name: '',
        activity_desc: '',
        apply_begin_time: '',
        apply_end_time: '',
        start_time: '',
        end_time: '',
        enabled: 1,
        activity_tag:''
      },
    };
  },
  methods: {
    ...mapActions({
      addSeckill: 'seckill/addSeckill',
    }),
    timeChange(dates, dateStrings) {
      this.formItem.apply_begin_time = dateStrings[0];
      this.formItem.apply_end_time = dateStrings[1];
    },
    timeChange2(dates, dateStrings) {
      this.formItem.start_time = dateStrings[0];
      this.formItem.end_time = dateStrings[1];
    },
    delGoods(index) {
      this.formItem.limit_goods.splice(index, 1);
    },
    submit() {
      this.addSeckill({ formItem: this.formItem });
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
