<template>
  <div class="mb20">
    <a-form layout="inline">
      <a-row>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="项目选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="formItem.gm_id" placeholder="请选择项目"  allowClear>
              <a-select-option v-for="(item,index) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="店铺选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="formItem.shop_id" placeholder="请选择店铺"  allowClear>
              <a-select-option v-for="(item,index) in listData" :value="item.id">{{item.shop_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="分类选择"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-cascader v-model="gc_id" :options="classTree"  placeholder="请选择分类" @change="changeClass" changeOnSelect/>
          </a-form-item>
        </a-col>
<!--        <a-col :md="8" :xs="24">-->
<!--          <a-form-item-->
<!--            label="时间选择"-->
<!--            :label-col="formItemLayout.labelCol"-->
<!--            :wrapper-col="formItemLayout.wrapperCol"-->
<!--          >-->
<!--            <a-range-picker v-if="type==='day'" style="width:100%" @change="timeChange"  />-->
<!--            <a-range-picker v-else :mode="mode"-->
<!--                            format="YYYY-MM"-->
<!--                            style="width:100%"-->
<!--                            @panelChange="handlePanelChange2"-->
<!--                            :value="value"-->
<!--                            @change="handleChange"-->
<!--            />-->
<!--          </a-form-item>-->
<!--        </a-col>-->
        <a-col :md="8" :xs="24">
          <a-form-item
            label="关键词搜索"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="输入商品关键字" v-model="formItem.keyword" allowClear/>
          </a-form-item>
        </a-col>
		<a-col :md="8" :xs="24">
          <a-form-item
            label="商品ID"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="输入商品ID" v-model="formItem.good_id" allowClear/>
          </a-form-item>
        </a-col>
		<a-col :md="8" :xs="24">
          <a-form-item
            label="店铺ID"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-input placeholder="输入店铺ID" v-model="formItem.store_id" allowClear/>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button type="primary" @click="sutmit">搜索</a-button>
			      <a-button type="primary" @click="exportTable" style="margin-left:10px">导出</a-button>
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
        listData: state => state.shop.lists,
        gmlistData: state => state.project.lists,
        classTree: state => state.goods.classTree,
      }),
    },
    props:{
      type:{
        type: String,
        default: 'day',
      }
    },
    data() {
      return {
        formItemLayout,
         shopParams: {
           per_page: 1000000,
           is_open: 1,
         },
        value: [],
        mode: ['month', 'month'],
        formItem: {
          shop_id: undefined,
          gm_id: undefined,
          // settle_time_start: '',
          // settle_time_end: '',
          gc_id_1: '',
          gc_id_2: '',
          gc_id_3: '',
          keyword: '',
		      store_id:'',
		      good_id:''
        },
        gc_id: [],
      };
    },
    methods: {
      ...mapActions({
        fetchLists: 'shop/fetchLists',
        gmfetchLists: 'project/fetchLists',
        getClassTree: 'goods/getClassTree',
      }),
      resetSearch() {
        this.formItem.shop_id = '';
        this.formItem.gc_id_1 = '';
        this.formItem.gc_id_2 = '';
        this.formItem.gc_id_3 = '';
        this.formItem.keyword = '';
        this.formItem.store_id = '';
        this.formItem.good_id = '';
        this.formItem.gm_id = '';
        this.gc_id = [];
      },
      changeClass(val) {
        if (val.length > 0) {
          this.formItem.gc_id_1 = val[0];
          this.formItem.gc_id_2 = val[1] || '';
          this.formItem.gc_id_3 = val[2] || '';
        } else {
          this.formItem.gc_id = [];
          this.formItem.gc_id_1 = '';
          this.formItem.gc_id_2 = '';
          this.formItem.gc_id_3 = '';
        }

      },
      mGetDate(year, month){
        let d = new Date(year, month, 0);
        return d.getDate();
      },
      handleChange(value){
        this.value = value
        this.formItem.settle_time_start = '';
        this.formItem.settle_time_end = '';
      },
      handlePanelChange2(value, mode) {
        this.value = value;
        const starTime = this.value[0].format('YYYY-MM')
        const endTime = this.value[1].format('YYYY-MM')
        const timeArr = endTime.split('-')
        const timeNum = this.mGetDate(timeArr[0],timeArr[1])
        this.formItem.settle_time_start = starTime+'-01 00:00:00'
        this.formItem.settle_time_end = endTime+'-'+ timeNum + ' 23:59:59'
        this.mode = [
          mode[0] === 'date' ? 'month' : mode[0],
          mode[1] === 'date' ? 'month' : mode[1],
        ];
      },
      timeChange(a,b){
        if(b[0]!==''){
          this.formItem.settle_time_start = b[0]+' 00:00:00'
          this.formItem.settle_time_end = b[1]+' 23:59:59'
        }else{
          this.formItem.settle_time_start = ''
          this.formItem.settle_time_end = ''
        }
      },
      sutmit(){
        this.$emit('search', this.formItem)
	  },
	   exportTable(){
		  this.$emit('export', this.formItem)
	  }
    },
    mounted() {
      this.fetchLists(this.shopParams)
      this.gmfetchLists(this.shopParams)
      this.getClassTree();
    },
  };
</script>

<style scoped lang="stylus">
  >>>.ant-form-item
    width: 100%
    .ant-form-item-label
      text-align left
  .selectBox
    display flex
    align-items center
    height 39px
</style>
