<template>
  <a-modal
    title="添加抽奖奖项"
    style="top: 20px;"
    width="70%"
    v-model="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="menuForm"
    >
      <a-form-item
        label="抽奖奖项名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input style="width:250px" placeholder="抽奖奖项名称" v-model="formParams.name"/>
      </a-form-item>
      <a-form-item
        label="奖品类型"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group  v-model="formParams.type" @change="typeChange">
          <a-radio :value="0">谢谢惠顾</a-radio>
          <a-radio :value="1">积分</a-radio>
          <a-radio :value="3">实物奖品</a-radio>
          <!-- <a-radio :value="2">票劵</a-radio> -->
          <a-radio :value="4">优惠券</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="奖品配送方式"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.type === 3"
      >
        <a-checkbox-group v-model="formParams.delivery_type" :options="plainOptions" @change="onChange" />
      </a-form-item>

      <!-- <a-form-item
        label="票券类型"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.type===2"
      >
        <a-radio-group  v-model="formParams.ticket_type">
          <a-radio :value="0">电影票</a-radio>
          <a-radio :value="1">有妖气体验卡</a-radio>
          <a-radio :value="2">学英语年卡</a-radio>
        </a-radio-group>
      </a-form-item> -->
      <a-form-item
        label="奖品积分数"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.type===1"
      >
        <a-input  style="width:250px" placeholder="奖品积分数" v-model="formParams.prize" type="number"></a-input>
      </a-form-item>
      <a-form-item
        label="选择实物奖品"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.type===3"
      >
        <div v-if="formParams.activities_reward_goods_id">已选择奖品ID：{{formParams.activities_reward_goods_id}}</div>
        <selectPrize @on-select-ok="getId" :selectId="formParams.activities_reward_goods_id" :selectionUrl="goodsUrl">
          <a-button>选择实物奖品</a-button>
        </selectPrize>
      </a-form-item>
      <a-form-item
        label="选择优惠券"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.type===4"
      >
        <div v-if="formParams.prize">已选择优惠券ID：{{formParams.prize}}</div>
        <selectPrize @on-select-ok="getCouponId" showType="coupon" :selectId="formParams.prize" :selectionUrl="couponUrl" >
          <a-button>选择优惠券</a-button>
        </selectPrize>
      </a-form-item>
      <a-form-item
        label="奖品数量"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input  style="width:250px" placeholder="奖品数量"  v-model="formParams.number" type="number" :disabled="formParams.id ? true : false"></a-input>
      </a-form-item>
      <a-form-item
        label="奖品剩余库存"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="formParams.id"
      >
        <a-input  style="width:250px" placeholder="奖品积分数" v-model="formParams.remnant_num" type="number"></a-input>
      </a-form-item>
      <a-form-item
        label="奖品中奖概率"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input  style="width:250px"  placeholder="奖品中奖概率" v-model="formParams.probability" type="number"></a-input>%
      </a-form-item>
      <a-form-item
        label="奖品图片"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <UploadImage  v-if="visible" :defaultImageList="imageLists"  :maximum="1" ref="uploadImageLists"></UploadImage>
      </a-form-item>
      <a-form-item
        label="奖品启用状态"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group  v-model="formParams.status">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="0">不启用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="获奖名单展示状态"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group v-model="formParams.is_show">
          <a-radio :value="1">显示</a-radio>
          <a-radio :value="0">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
<!--      <a-form-item-->
<!--        label="抽奖奖品说明"-->
<!--        :label-col="labelCol"-->
<!--        :wrapper-col="wrapperCol"-->
<!--      >-->
<!--        <Ueditor  v-if="visible"  ref="editor" editor_id="editor" v-model="formParams.desc">-->
<!--        </Ueditor>-->
<!--      </a-form-item>-->
    </a-form>
  </a-modal>
</template>
<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
  import Ueditor from '@C/ueditor/ueditor';
  import UploadImage from '@C/upload/UploadImage';
  import selectPrize from '@C/lists/prizeTable';
  import Server from '@/config/server';
  export default {
    components:{
      Ueditor,
      UploadImage,
      selectPrize
    },
    computed: {
      ...mapState({

      }),
    },
    inject: ['reload'],
    props: {
      addVisible: {
        type: Boolean,
        default: false,
      },
      formParams: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        plainOptions: [
          { label: '快递', value: 1 },
          { label: '自提', value: 2 },
        ],
        imageLists:[],
        menuForm: this.$form.createForm(this),
        goodsUrl:Server.action.activitiesRewardGoodsList,
        couponUrl:Server.action.coupon_draw_list,
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        visible: false,
      };
    },
    mounted() {
    },
    methods: {
      ...mapActions({
        createPrize: 'draw/createPrize',
        updatePrize: 'draw/updatePrize',
      }),
      onChange(checkedList) {
        this.formParams.delivery_type = checkedList
      },
      getId(arr){
        if(arr.length>0){
          this.formParams.activities_reward_goods_id = arr[0]
          this.formParams.prize = arr[0]
        }
      },
      typeChange(){
        this.formParams.prize = ''
      },
      getCouponId(arr){
        if(arr.length>0){
          this.formParams.prize = arr[0]
        }
      },
      handleOk() {
        if(this.formParams.type === 3 && this.formParams.delivery_type.length === 0) {
          this.$notification.error(
            {
              message: '配送方式最少选择一种!',
              description: '',
            });
            return;
          }
        // if(this.$refs.editor.tmpContent){
        //   this.formParams.desc =this.$refs.editor.tmpContent
        // }
        const imgs = this.$refs.uploadImageLists.uploadImageList;
        if(imgs.length>0){
          this.formParams.image = imgs[0].url
        }
        if (this.formParams.id === undefined) {
          this.toCreate();
        }
        if (this.formParams.id > 0) {
          this.toUpdate();
        }
      },
      handleCancel() {
        this.$emit('on-change', this.visible);
      },
      toCreate() {
        this.createPrize({formItem:this.formParams,callback:this.reload})
      },
      toUpdate() {
        this.updatePrize({formItem:this.formParams,callback:this.reload})
      },
    },
    watch: {
      addVisible(v) {
        this.visible = v;
      },
      formParams(val){
        if(this.formParams.image){
          this.imageLists = [{
            url:this.formParams.image,
            status: 'finished'
          }]
        }else{
          this.imageLists = [ ]
        }
      }
    },
  };
</script>
<style scoped>
</style>
