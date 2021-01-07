<template>
 <div>
   <div class="content" v-if="show">
     <div class="mb20">
       <div class="title_h4">
         今日实时数据
       </div>
       <div style="background-color: #f2f2f2; padding: 20px;">
         <a-row :gutter="24">
           <a-col :md="8" :xs="24">
             <a-card title="订单数量" :bordered="false">
               <p>{{CurrentTimeData.countNewTrade}}</p>
             </a-card>
           </a-col>
           <a-col :md="8" :xs="24">
             <a-card title="订单总额" :bordered="false">
               <p>￥{{CurrentTimeData.countNewTradeFee}}</p>
             </a-card>
           </a-col>
         </a-row>
       </div>
     </div>
     <div class="title_h4">
       近期运营数据
     </div>
     <a-tabs defaultActiveKey="yesterday" @change="tapCallback">
       <a-tab-pane tab="昨日" key="yesterday"></a-tab-pane>
       <a-tab-pane tab="最近七天" key="week"></a-tab-pane>
       <a-tab-pane tab="最近三十天" key="month"></a-tab-pane>
     </a-tabs>
     <div style="background-color: #f2f2f2; padding: 20px;padding-bottom:0">
       <a-row :gutter="24">
         <a-col :md="8" :xs="24">
           <a-card title="订单数量" :bordered="false">
             <p>{{indexItems.countNewTrade}}</p>
           </a-card>
         </a-col>
         <a-col :md="8" :xs="24">
           <a-card title="订单总额" :bordered="false">
             <p>￥{{indexItems.countNewTradeFee}}</p>
           </a-card>
         </a-col>
         <a-col :md="8" :xs="24">
           <a-card title="待处理发货订单" :bordered="false">
             <p class="col-red">{{indexItems.countReadysSend}}</p>
           </a-card>
         </a-col>
         <a-col :md="8" :xs="24">
           <a-card title="待处理退货订单" :bordered="false">
             <p class="col-red">{{indexItems.countRefund}}</p>
           </a-card>
         </a-col>
         <a-col :md="8" :xs="24">
           <a-card title="待处理换货订单" :bordered="false">
             <p class="col-red">{{indexItems.countChanging}}</p>
           </a-card>
         </a-col>
         <a-col :md="8" :xs="24">
           <a-card title="待回复评价订单" :bordered="false">
             <p class="col-red">{{indexItems.countRateUnreply}}</p>
           </a-card>
         </a-col>
       </a-row>
     </div>
   </div>
 </div>
</template>
<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
  import { getUserInfo } from '@/utils/util';
  export default {
    computed: {
      ...mapState({
        indexItems: state => state.statistics.indexItems,
        CurrentTimeData: state => state.statistics.CurrentTimeData,
      }),
    },
    data() {
      return {
        formItem:{
          timeType:'yesterday'
        },
        show:false
      };
    },
    methods: {
      ...mapActions({
        indexDetail: 'statistics/indexDetail',
        currentTime: 'statistics/currentTime'
      }),
      tapCallback(key) {
        this.formItem.timeType = key
        this.indexDetail(this.formItem)
      },
      getUser(){
        let info = getUserInfo()
        info = JSON.parse(info)
        if(info.role_id===0||info.frontend_permission.indexOf('dashboard')!==-1){
          this.indexDetail(this.formItem)
          this.currentTime()
          this.show=true
        }
      }
    },
    mounted() {
      this.getUser()

    },
  };
</script>
<style scoped lang="stylus">
>>>.ant-row>div
    margin-bottom 20px
</style>
