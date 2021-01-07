<template>
  <div class="mr24 coupon_show">
    <a-card title="活动信息">
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动名称：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.name}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动描述：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.desc}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动类型：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.type===1?'满减':'满折'}}</p>
        </a-col>
      </a-row>
      <a-row type="flex" >
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动折扣金额：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}" v-if="detail.type===1">
          <p class="coupon_p" v-for="(item,index) in detail.rule">
            满{{item.condition}}元减{{item.num}}元
          </p>
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}" v-if="detail.type===2">
          <p class="coupon_p" v-for="(item,index) in detail.rule">
            满{{item.condition}}元给予{{item.num}}%折扣
          </p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{span:24}" :md="{span:3}" class="add-label">
          活动生效时间：
        </a-col>
        <a-col :xs="{span:24}" :md="{span:6}">
          <p class="coupon_p">{{detail.star_time}}~{{detail.end_time}}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="已选择适用商品">
       <div v-if="detail.is_bind_goods!==0">
         <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="goods_list" :pagination="false">
           <div slot="goods_image" slot-scope="text">
             <img :src="text" height="60px" alt="">
           </div>
         </a-table>
       </div>
      <div v-if="detail.is_bind_goods==0">
        全商品适用
      </div>
      <div class="mt10" v-else-if="detail.is_bind_goods==1">
        <span class="col-red">*</span>以上商品参与本次活动促销
      </div>
      <div class="mt10" v-else-if="detail.is_bind_goods==2">
        <span class="col-red">*</span>以上商品不参与本次活动促销
      </div>
    </a-card>
    <a-card title="审核操作">
      <p class="coupon_p">
        审核状态：{{detail.status_text}}
      </p>
      <p class="coupon_p" v-if="detail.status===4">
        驳回理由：{{detail.reason}}
      </p>
      <div v-if="detail.status===0">
        <div>
          <span class="coupon_p">审核操作：</span>
          <a-radio-group name="radioGroup" v-model="formItem.status" class="mb10">
            <a-radio :value="1">同意</a-radio>
            <a-radio :value="4">驳回</a-radio>
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
  const fields = [
    {
    title: '商品名称',
    dataIndex: 'goods_name',
   },
    {
      title:'商品图片',
      dataIndex:'goods_image',
      scopedSlots: { customRender: 'goods_image' },
    },
    {
      title:'商品价格',
      dataIndex:'goods_price'
    },
  ]
  export default {
    name: 'activity_detail',
    computed: {
      ...mapState({
        detail: state => state.activity.detail,
      }),
    },
    data() {
      return {
        goods_list: [],
        fields,
        formItem:{
          status:1,
          id:'',
          reject_reason:''
        }
      };
    },
    methods: {
      ...mapActions({
        activityDetail: 'activity/activityDetail',
        activity_check: 'activity/activity_check',
      }),
      submit(){
        this.activity_check({formItem:this.formItem})
      },
      getDetail() {
        if (this.detail.limit_goods !== null) {
          this.goods_list = this.detail.limit_goods;
        }
        this.formItem.id = this.detail.id
      },
    },

    mounted() {
      if (this.$route.params.id !== undefined) {
        this.activityDetail(this.$route.params.id);
      }
    },
    watch: {
      detail() {
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
