<template>
  <div>
    <a-form layout="inline">
	   <a-row style="margin-bottom:10px">
		<a-col :md="8" :xs="24">
          <a-form-item
            label="项目选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="gm_id" placeholder="请选择项目" allowClear>
              <a-select-option v-for="(item,index) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
		<a-col :md="8" :xs="24">
			<a-form-item
				label="店铺名称:"
				:label-col="formItemLayout.labelCol"
				:wrapper-col="formItemLayout.wrapperCol"
        >
				<a-select v-model="shop_id" placeholder="请选择店铺" allowClear>
					<a-select-option v-for="(item,index) in listData" :value="item.id" :key="index">{{item.shop_name}}</a-select-option>
				</a-select>
        	</a-form-item>
		</a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="商户订单号"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
           <a-input v-model="payment_id" allowClear></a-input>
          </a-form-item>
        </a-col>
		<a-col :md="8" :xs="24">
          <a-form-item
            label="订单号"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
           <a-input v-model="tid" allowClear></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="10" :xs="24">
          <a-form-item
            label="支付时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker
              v-model="payed_time"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '完成时间']"
              @change="timeChange"
              @ok="timeOk"
              style="width:100%"
              allowClear
				    />
          </a-form-item>
        </a-col>
        <a-col :md="6" :xs="24">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
            <a-button @click="resetSearch" class="ml10">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import {
    mapState,
    mapActions,
  } from 'vuex';
  const formItemLayout = {
    labelCol: {
      xs:{
        span: 24
      },
      md:{
        span:6
      }
    },
    wrapperCol: {
      xs:{
        span: 24
      },
      md:{
        span:16
      }
    },
  };
  export default {
    computed: {
      ...mapState({
		gmlistData: state => state.project.lists,
		listData: state => state.shop.lists,
	  }),
	},
    data() {
      return {
        formItemLayout,
        payed_time: '',
        payed_time_start:'',
		payed_time_end:'',
		tid:'',
		payment_id:'',
		gm_id:'',
		shop_id:'',
		shopParams: {
           per_page: 1000000,
           is_open: 1,
		},
      };
    },
    props: {
    },
    methods: {
		 ...mapActions({
        gmfetchLists: 'project/fetchLists',
        fetchLists: 'shop/fetchLists',
      }),
      resetSearch() {
        this.payed_time_start = '';
        this.payed_time_end = '';
        this.tid = '';
        this.payment_id = '';
        this.shop_id = '';
        this.payed_time = '';
      },
       timeChange(value, dateString) {
      console.log('Selected Time: ', value);
	  console.log('Formatted Selected Time: ', dateString);
	   this.payed_time_start = dateString[0];
      this.payed_time_end = dateString[1];
    },
    timeOk(value) {
      console.log('onOk: ', value);
    },
      subSearch() {
        const params = {};
        params.payed_time_start = this.payed_time_start;
		params.payed_time_end = this.payed_time_end;
		params.tid=this.tid
		params.payment_id=this.payment_id
		params.gm_id=this.gm_id
		params.shop_id=this.shop_id
        console.log(params)
        this.$emit('on-search', params)
      }
    },
    mounted() {
		 this.gmfetchLists(this.shopParams)
		 this.fetchLists(this.shopParams)
    },
  };
</script>

<style scoped lang="stylus">
>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
