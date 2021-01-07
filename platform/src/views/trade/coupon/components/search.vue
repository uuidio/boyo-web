<template>
  <div>
    <a-form layout="inline">
      <a-row>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="关键字搜索"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select  style="width: 140px" v-model="searchVal">
              <a-select-option value="tid">订单号</a-select-option>
              <a-select-option value="receiver_name">收货人姓名</a-select-option>
              <a-select-option value="receiver_tel">收货人手机号</a-select-option>
              <a-select-option value="goods_name">商品名称</a-select-option>
            </a-select>
            <a-input style="width:240px" placeholder="请输入关键字" v-model="keyword"></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="订单创建时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker @change="timeChange" />
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24" class="mt20" v-if="showSltActivity">
          <a-form-item
            label="活动订单选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-radio-group name="radioGroup" v-model="activity_sign">
              <a-radio :value="trim">无</a-radio>
              <a-radio value="seckill">秒杀活动订单</a-radio>
              <a-radio value="is_group">拼团活动订单</a-radio>
              <a-radio value="point_goods">{{UserType === 'normal' ? '积分' : '牛币'}}兑换订单</a-radio>
              <a-radio value="choujiang">抽奖订单</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24" class="mt20">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
  const formItemLayout = {
    labelCol: {
      xs:{
        span: 24
      },
      md:{
        span:5
      }
    },
    wrapperCol: {
      xs:{
        span: 24
      },
      md:{
        span:19
      }
    },
  };
  export default {
    data() {
      return {
        formItemLayout,
        trim:'',
        searchVal:'tid',
        activity_sign:'',
        keyword:'',
        selectKeys:{
          tid:'tid',
          receiver_name:'receiver_name',
          receiver_tel:'receiver_tel',
          goods_name:'goods_name'
        },
        created_start:'',
        created_end:'',
      };
    },
    props: {
      showSltActivity: {
        type: Boolean,
        default: true,
      }
    },
    methods: {
      timeChange(a,b){
        if(b[0]===''){
          this.created_start = ''
          this.created_end = ''
        }else{
          this.created_start = b[0]+ ' 00:00:00'
          this.created_end =b[1]+' 23:59:59'
        }

      },
      subSearch() {
        const params = {};
        params[this.searchVal] = this.keyword;
        params.created_start = this.created_start;
        params.created_end = this.created_end;
        if(this.showSltActivity) {
          params.activity_sign = this.activity_sign;
        }
        console.log(params)
        this.$emit('on-search', params)
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
