<template>
  <div class="content">
    <div class="mb20">
      <a-form>
        <a-row>
          <a-col :md="12" :xs="24">
            <a-form-item label="商品名称" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-input placeholder="请输入商品名称" v-model="formItem.goods_name" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :xs="24">
            <a-form-item label="商品子订单" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
               <a-input placeholder="请输入子订单号" v-model="formItem.oid" allowClear/>
            </a-form-item>
          </a-col>
          <a-col :md="12" :xs="24">
            <a-form-item label="操作类型" :label-col="formItemLayout.labelCol" :wrapper-col="formItemLayout.wrapperCol">
              <a-radio-group  v-model="formItem.type">
                <a-radio :value="strTrim">无</a-radio>
                <a-radio value="inc">增加</a-radio>
                <a-radio value="dec">扣减</a-radio>
                <a-radio value="add">添加商品</a-radio>
                <a-radio value="edit">编辑商品</a-radio>
              </a-radio-group>
            </a-form-item>
          </a-col>
          <a-col :md="12" :xs="24">
            <a-form-item   :wrapper-col="formItemLayout.submitCol">
              <a-button @click="subSearch"  type="primary" class="mr10">查询</a-button>
              <a-button @click="reset">重置</a-button>
            </a-form-item>
          </a-col>
        </a-row>
      </a-form>
    </div>
	<template v-if="filds&&filds.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"  :columns="filds" :dataSource="lists"  :pagination="false">
    </a-table>
    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        v-model="formItem.page"
        :pageSize="formItem.per_page"
        :defaultCurrent="1"
        @change="pageChange"
      />
    </div>
	</template>
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
        span:5
      }
    },
    submitCol:{
      xs:{
        span: 24
      },
      md:{
        span:16,
        offset:5
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
        lists: state => state.goods.stockLogsLists,
        pages: state => state.goods.stockLogsPages,
        filds: state => state.goods.stockLogsFields,
      }),
    },
    data() {
      return {
        strTrim:'',
        formItem:{
          page:1,
          type:'',
          oid:'',
          goods_name:'',
          per_page: 15,
        },
        formItemLayout
      };
    },
    methods: {
      ...mapActions({
        goodsStockLogs: 'goods/goodsStockLogs',
      }),
      reset(){
        this.formItem ={
            page:1,
            type:'',
            oid:'',
            goods_name:''
        }
      },
      subSearch(){
        this.page = 1
        this.goodsStockLogs(this.formItem)
      },
      pageChange(page){
        this.formItem.page = page
        this.goodsStockLogs(this.formItem)
      }
    },
    watch:{

    },
    mounted() {
      this.goodsStockLogs(this.formItem)
    },
  };
</script>

<style scoped>

</style>
