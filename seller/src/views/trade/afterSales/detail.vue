<template>
  <div class="mr24" v-if="loading">
    <a-card :bordered="false" title="订单进度">
      <div v-if="detail.aftersales_type==='EXCHANGING_GOODS'" class="steps">
        <a-steps :current="stepCurrent">
          <a-step>
            <template slot="title">
              等待处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              门店处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              完成
            </template>
          </a-step>
        </a-steps>
      </div>
      <div  v-else class="steps">
        <a-steps :current="stepCurrent">
          <a-step>
            <template slot="title">
              等待处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              门店处理
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              平台审核
            </template>
          </a-step>
          <a-step>
            <template slot="title">
              完成
            </template>
          </a-step>
        </a-steps>
      </div>
    </a-card>
    <a-card :bordered="false" title="订单信息">
      <span slot="extra">售后创建时间:{{detail.created_at}}</span>
      <div class="det-info">
        <a-row>
          <a-col :md="6">
            <p>订单号：{{detail.tid}} </p>
            <p>订单状态： {{detail.progress_text}} </p>
          </a-col>
          <a-col :md="6">
            <p>退款金额：<span class="col-red">
              ￥{{detail.trade.amount}}
            </span></p>
          </a-col>
          <a-col :md="6">
            <p>联系方式：{{allInfo.receiver_tel}} </p>
            <p>收货人：{{allInfo.receiver_name}} </p>
            <p>收货地址：{{allInfo.receiver_address}} </p>
          </a-col>
        </a-row>
      </div>
    </a-card>
    <a-card :bordered="false" title="商品信息">
      <div class="det-goods">
        <a-table :scroll="{x:1100,y:700}" :pagination="page" :columns="columns" :dataSource="data">
          <div slot="goods_image" slot-scope="text,items">
            <div>
              <img width="60px" :src="items.goods_image" alt="">
            </div>
          </div>
        </a-table>
        <div style="text-align: right;margin:20px 0">
          商品总额<span class="col-red">￥{{detail.trade.amount}}</span>
        </div>
      </div>
    </a-card>
    <a-card :bordered="false" title="订单售后原因">
      <span slot="extra">
        <Time-lines :oid="detail.oid">
          <a-button type="primary">售后记录</a-button>
        </Time-lines>
      </span>
      <a-row>
        <a-col :xs="{ span:24}" :md="{ span: 6 }">
          {{detail.reason}}
          <div>
            <ul class="fxBox1 saleImgBox">
              <li v-for="(imgItem,index) in detail.evidence_pic">
                <a :href="imgItem" target="_blank"><img :src="imgItem" alt=""></a>
              </li>
            </ul>
          </div>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="detail.progress==0">
          <a-radio-group v-model="formItem.check_result" :defaultValue="1">
            <a-radio :value="true">同意</a-radio>
            <a-radio :value="false">不同意</a-radio>
          </a-radio-group>
          <a-textarea v-model="formItem.shop_explanation"  class="mt10 mb10" placeholder="请输入门店审核处理说明" :rows="4"/>
          <div class="fxBox" v-if="formItem.aftersales_type!=='EXCHANGING_GOODS'&&formItem.check_result!==false&& formItem.aftersales_type!=='REFUND_GOODS'">
            <span class="mr10">退款金额:</span> <a-input v-model="formItem.total_price" type="number" style="width:200px"  placeholder="请输入退款金额"/>
          </div>
          <div class="mt10">
            <a-button @click="submit" type="primary">提交</a-button>
          </div>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="detail.progress==2&&formItem.aftersales_type!=='EXCHANGING_GOODS'">
          <a-textarea v-model="formItem.shop_explanation"  class="mt10 mb10" placeholder="请输入售后操作说明" :rows="4"/>
          <div class="fxBox" v-if="formItem.check_result!==false">
            <span class="mr10">退款金额:</span> <a-input v-model="formItem.total_price" type="number" style="width:200px"  placeholder="请输入退款金额"/>
          </div>
          <div class="mt10">
            <a-button @click="submit" type="primary">提交</a-button>
          </div>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="detail.progress==2&&formItem.aftersales_type==='EXCHANGING_GOODS'">
          <div class="mb20">
             <div class="mb10">选择物流公司：</div>
            <a-select v-model="exchangeItem.corp_code"  style="width:200px">
              <a-select-option  v-for="(item,index) in logistics" :key="index" :value="item.corp_code">{{item.corp_name}}</a-select-option>
            </a-select>
           </div>
          <div class="fxBox1">
            <div class="mb10">填写物流单号：</div>
            <a-input style="width:200px" placeholder="输入物流单号" v-model="exchangeItem.logi_no" />
          </div>
          <div class="mt10">
            <a-button @click="exchangingSubmit" type="primary">提交</a-button>
          </div>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}" v-if="(detail.progress==4 || detail.progress==3) && formItem.aftersales_type==='EXCHANGING_GOODS'">
          <a-form layout="inline">
            <a-form-item label="是否允许再次换货：">
              <a-radio-group v-model="againServiceForm.apply_again_status">
                <a-radio :value="1">允许</a-radio>
                <a-radio :value="0">不允许</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item label="">
              <a-button @click="againServiceSubmit" type="primary">保存</a-button>
            </a-form-item>
          </a-form>
        </a-col>
        <a-col :xs="{ span:24}" :md="{ span: 6 ,offset:1}">
          订单状态：{{detail.progress_text}}
        </a-col>
      </a-row>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TimeLines from "@C/TimeLine/TimeLine";

const columns = [{
  dataIndex: 'goods_image',
  title: '商品图片',
  key: 'goods_image',
  scopedSlots: { customRender: 'goods_image' },
}, {
  title: '商品名称',
  dataIndex: 'goods_name',
  key: 'goods_name',
},{
  title: '购买数量',
  dataIndex: 'quantity',
  key: 'quantity',
}, {
  title: '商品价格',
  dataIndex: 'goods_price',
  key: 'goods_price',
}];
export default {
  name: 'detail',
  computed: {
    ...mapState({
      allInfo: state => state.afterSales.allInfo,
      logistics: state => state.trade.logistics,
    }),
  },
  components: {
    TimeLines,
  },
  data() {
    return {
      // 多次售后
      againServiceForm: {
        tid: '',
        apply_again_status: 0
      },
      loading:false,
      stepCurrent: 0,
      data: [],
      columns,
      type:'',
      detail:{},
      reason_text: '',
      formItem: {
        aftersales_bn:'',
        check_result:true,
        aftersales_type:'',
        shop_explanation:'',
        total_price:'',
        refunds_reason:'',
      },
      exchangeItem:{
        aftersales_bn:'',
        corp_code:'',
        logi_no:'',
        logi_name:''
      },
      info:{},
      cancal_text: '1',
      page: false,
    };
  },
  methods: {
    ...mapActions({
      saleDetail: 'afterSales/saleDetail',
      afterSalesVerification: 'afterSales/afterSalesVerification',
      sendConfirm: 'afterSales/sendConfirm',
      logisticsLists: 'trade/logisticsLists',
      againService: 'afterSales/againService',
    }),
    againServiceSubmit() {
      this.againServiceForm.tid = this.detail.tid;
      this.againService({ formData: this.againServiceForm });
    },
    initDet() {
      this.detail = this.allInfo.info
      this.againServiceForm.apply_again_status = this.detail.trade.apply_again_status
      this.formItem.aftersales_bn = this.detail.aftersales_bn
      this.formItem.aftersales_type = this.detail.aftersales_type
      this.formItem.refunds_reason = this.detail.reason
      this.exchangeItem.aftersales_bn = this.detail.aftersales_bn
      this.data.push(this.detail.trade)
      if(this.detail.aftersales_type === 'REFUND_GOODS'){
        this.formItem.total_price = this.detail.trade.amount;
      }
      if(this.detail.aftersales_type==='EXCHANGING_GOODS'){
        const status = Number(this.detail.progress)
        if(status===0){
          this.stepCurrent = 0
        }else if(status===3||status===4){
          this.stepCurrent = 2
        }else if(status===1 ||status===2||status===5){
          this.stepCurrent = 1
        }
      }else{
        const status = Number(this.detail.progress)
        if( status===0){
          this.stepCurrent = 0
        }else if(status===3){
          this.stepCurrent = 3
        }else if(status===2||status===5||status===4||status===1 ){
          this.stepCurrent = 1
        }else if(status===8){
          this.stepCurrent = 2
        }else if(status===6 || status===7){
          this.stepCurrent = 3
        }
      }
      this.loading=true
    },
    submit() {
      this.afterSalesVerification({formItem:this.formItem})
    },
    exchangingSubmit(){
      this.logistics.forEach((item)=>{
        if(item.corp_code===this.exchangeItem.corp_code){
          this.exchangeItem.corp_name = item.corp_name
        }
      })
      this.sendConfirm({formItem:this.exchangeItem})
    }
  },
  mounted() {
    const params = {
      aftersales_bn:this.$route.params.id
    }
    this.logisticsLists();
    this.saleDetail(params);
  },
  watch: {
    allInfo() {
      this.initDet();
      console.log(this.allInfo)
    },
  },
};
</script>

<style scoped lang="stylus">
  .saleImgBox
    flex-wrap wrap
    display flex
    margin-top 20px
    li
      width 90px
      height 90px
      margin-right 10px
      img
        width 100%
        height 100%
  .fahuo
    text-align center
    margin-top 20px

  >>> .ant-card:not(:last-child)
    margin-bottom 20px

  >>> .det-info .ant-col-md-6
    margin-bottom 20px

  .det-title
    margin 20px 0
    padding-bottom 10px
    border-bottom 1px solid #e8e8e8

  >>> .userInfo .ant-row > div:first-child
    font-weight 700

  >>> .userInfo .ant-row:last-child > div
    border-bottom 0

  >>> .userInfo .ant-row > div
    padding 8px 0
    border-bottom 1px solid #e8e8e8

  .buyer
    margin-bottom 20px

  .det-remark .fs16
    margin-bottom 10px
    font-weight 700

  .buyer-info
    min-height 20px
    background-color #f5f5f5
    border 1px solid #e3e3e3
    padding 9px
    border-radius 3px

  .det-info p
    line-height 1.8

  @media (min-width: 765px)
    .det-time
      text-align right

    .buyer-info
      width 300px
</style>
