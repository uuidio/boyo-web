<template>
  <div class="mr24 coupon_show" v-if="detail.secKillApplie">
    <a-card title="秒杀活动信息">
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动名称：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.secKillApplie.activity_name}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动描述：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.secKillApplie.activity_desc}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动报名时间：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.secKillApplie.apply_begin_time}} ~ {{detail.secKillApplie.apply_end_time}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动生效时间：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.secKillApplie.start_time}} ~ {{detail.secKillApplie.end_time}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          秒杀活动状态：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.secKillApplie.validstatus}}</p>
        </a-col>
      </a-row>
      <div style="padding:5px 10px;background: #e8e8e8;margin-top:10px">
        *秒杀活动状态为已开始或者已结束的未审核店铺不能再进行审核操作
      </div>
    </a-card>
    <a-card title="门店报名信息">
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          报名店铺名称：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.register.shop_name}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          审核状态：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.register.verify_status_text}}</p>
        </a-col>
      </a-row>
      <div class="coupon_p">
        店铺报名商品
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1200,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="goods_image" slot-scope="text, record">
            <img :src="record.goods_image" style="width:100px;height:100px;" alt="">
          </div>
        </a-table>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :pageSize="pages.per_page"
            :defaultCurrent="1"
            @change="pageChange"
          />
        </div>
      </template>
    </a-card>
    <a-card title="审核操作">
      <div v-if="detail.register.apply_status.staus===1">
        <a-form >
          <a-form-item label="审核结果" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
            <a-radio-group v-model="formItem.status" name="radioGroup" >
              <a-radio  :value="2">通过</a-radio>
              <a-radio  :value="1">不通过</a-radio>
            </a-radio-group>
          </a-form-item>
          <a-form-item label="审核备注" :label-col="{ span: 2 }" :wrapper-col="{ span: 12 }">
            <a-textarea v-model="formItem.reason" style="width:200px" placeholder="选填（不通过审核必填）" :rows="4" />
          </a-form-item>
          <a-form-item  :label-col="{ span: 2 }" :wrapper-col="{ span: 12 ,offset:2}">
           <a-button @click="submit" type="primary">提交</a-button>
          </a-form-item>
        </a-form>
      </div>
      <div v-else>
        {{detail.register.verify_status_text}}
      </div>
    </a-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    name: 'shop_detail',
    computed: {
      ...mapState({
        detail: state => state.seckill.shopDetail,
        fields: state => state.seckill.goodsField,
        dataLists: state => state.seckill.goodsDataLists,
        pages: state => state.seckill.goodsPages,
      }),
    },
    data() {
      return {
         formItem:{
           status:2,
           registers_id:this.$route.params.id,
           shop_id:'',
           reason:''
         },
         params:{
           page:1,
           id:this.$route.params.id
         }
      };
    },
    watch:{
      detail(){
        this.formItem.shop_id = this.detail.register.shop_id
      }
    },
    methods: {
      ...mapActions({
        getDetail: 'seckill/getShopDetail',
        getShopGoods: 'seckill/getShopGoods',
        shopApprove: 'seckill/shopApprove',
      }),
      pageChange(page){
        this.params.page=page
        this.getShopGoods(this.params)
      },
      submit(){
        this.shopApprove({
          formItem:this.formItem
        })
      }
    },
    mounted() {
      this.id = this.$route.params.id
      if (this.$route.params.id !== undefined) {
        this.getDetail({ id: this.$route.params.id });
        this.getShopGoods(this.params)
      }
    },
  };
</script>

<style scoped lang="stylus">
  >>>.ant-form-item
    margin-bottom 10px
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
