<template>
 <div>
   <div style="font-size:20px">
     <a-row class="one_row" :gutter="[16,16]">
       <a-col :md="5" :xs="24">
          <div style="background-color: #6cbaf8;background: linear-gradient(145deg,#7ee1f9,#6cbaf8)">
            <img src="~@/assets/images/hot.png" alt="" style="">
            <span style="position: absolute;right: 0px;top: 7px;transform:rotate(45deg);font-size: 17px;">素材</span>
            <p style="font-size: 30px;line-height: 150px;text-align: center;">{{total_count2}} <span style="font-size: 20px;display: inline-block;margin-left: 10px">类</span></p>
          </div>
       </a-col>
       <a-col :md="5" :xs="24">
         <div style="background-color: #b376ff;background: linear-gradient(145deg,#44aaf8,#b376ff);">
           <img src="~@/assets/images/hot.png" alt="" style="">
           <span style="position: absolute;right: 7px;top: 5px;transform:rotate(45deg);;color:#fff;font-size: 17px;">词</span>
           <p style="font-size: 30px;line-height: 150px;text-align: center;">{{total_count1}} <span style="font-size: 20px;display: inline-block;margin-left: 10px">本</span></p>
         </div>
       </a-col>
       <a-col :md="5" :xs="24">

       </a-col>
     </a-row>
   </div>
   <div>

   </div>
   <div v-show="false" class="content" v-if="show">
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
        show:false,
        // 列表相关的代码------------------------------------------------------------------------------
        table_param: {
          page: 1, //当前页面
          per_page: 10,
        },
        total_count1: 0, // 总条数
        total_count2: 0, // 总条数
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
          console.log(info,'哈哈');
          if(info.role_id===0||info.frontend_permission.indexOf('dashboard')!==-1){
          this.indexDetail(this.formItem)
          this.currentTime()
          this.show=true
        }
      },
      // 获取表格列表
      get_table_list(page) {
        let _this = this;
        this.spinning = true
        if(page){_this.table_param.page = page}
        this.$http.get('v1/autocue/classify/list', _this.table_param).then((resData) => {
          if (resData.code === 0) {
            _this.total_count1 = resData.result.lists.total
          }
        });
        _this.$http.get('v1/tag/list', _this.table_param).then((resData) => {
          _this.spinning = false
          if (resData.code === 0) {
            _this.total_count2 = resData.result.lists.total
          }
        });
      },
    },
    mounted() {
      // this.getUser()
      this.get_table_list()
    },
  };
</script>
<style scoped lang="stylus">
>>>.ant-row>div
    margin-bottom 20px
.one_row>div>div
 height: 150px;border-radius:10px;position: relative;color: #fff
.one_row>div>div>img
 position: absolute;right: 0;top: 0;

</style>
