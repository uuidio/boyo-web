<template>
  <div class="content">
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	 <template v-if="fields&&fields.length>0"> 
    <a-table :scroll="{ x: 1400,y:700 }" class="mr10"   :columns="fields" :dataSource="lists" :pagination="false" @expand="showGoods">
      <div slot="expandedRowRender" slot-scope="record">
          <a-table   v-if="record.flag" class="mr10" :columns="record.field" :dataSource="record.goodsTable" :pagination="false">
          </a-table>
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
  </div>
</template>

<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
  export default {
    computed: {
      ...mapState({
        lists: state => state.settle.dayDetLists,
        pages: state => state.settle.dayDetPages,
		fields: state => state.settle.dayDetFields,
		total_data:state => state.settle.total_fee_data,
      }),
    },
    data() {
      return {
        myflag:false,
        params:{
           shop_id:this.$route.query.id,
           page:1,
           settle_time_start:'',
           settle_time_end:'',
         }
      };
    },
    methods: {
      ...mapActions({
        getTradeDayDet: 'settle/getTradeDayDet',
        getTradeGoods: 'settle/getTradeGoods'
      }),
      showGoods(flag,item){
        if(flag){
          if(!item.flag){
            this.getTradeGoods({params:{tid:item.tid},item:item})
          }
        }
      },
      pageChange(page){
        this.params.page=page
        this.getTradeDayDet(this.params)
      }
    },
    mounted() {
      if(this.$route.query.settle_time){
        const time = this.$route.query.settle_time.substring(0,10)
        this.params.settle_time_start = time+' 00:00:00'
        this.params.settle_time_end = time+' 23:59:59'
      }
      this.getTradeDayDet(this.params)
    },
  };
</script>

<style scoped>
.total{
		text-align: right;
		margin-bottom: 10px;
	}
	.span{
			margin-right:20px;
			font-size:14px;
		}
	.text{
		font-weight: 600;
    color: #4c4949;
	}
</style>
