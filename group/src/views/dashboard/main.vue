<template>
  <div >
    <div v-if="show" class="content">
      <div class="mb20">
        <div class="fxBox mb20">
          <div style="font-size: 18px;">项目选择：</div>
          <a-select v-model="formItem.gm_id" placeholder="请选择项目" style="width: 200px;" allowClear @change="changeGm">
            <a-select-option v-for="(item) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
          </a-select>
        </div>
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
            <a-col :md="8" :xs="24">
              <a-card title="首页访问次数" :bordered="false">
                <p>￥{{CurrentTimeData.countPangeView}}</p>
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
      <div style="background-color: #f2f2f2; padding: 20px;">
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
            <a-card title="订单平均金额" :bordered="false">
              <p>￥{{indexItems.avgPrice}}</p>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="mt20">
          <a-col :md="8" :xs="24">
            <a-card title="待处理退款订单" :bordered="false">
              <p class="col-red">{{indexItems.countChanging}}</p>
            </a-card>
          </a-col>
          <a-col :md="8" :xs="24">
            <a-card title="申请退款数量" :bordered="false">
              <p class="col-red">{{indexItems.refundNum}}</p>
            </a-card>
          </a-col>
          <a-col :md="8" :xs="24">
            <a-card title="实退金额" :bordered="false">
              <p class="col-red">{{indexItems.refundMoney}}</p>
            </a-card>
          </a-col>
        </a-row>
        <a-row :gutter="24" class="mt20">
          <a-col :md="8" :xs="24">
            <a-card title="首页访问次数" :bordered="false">
              <p class="col-red">{{indexItems.countPangeView}}</p>
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

  import { USER_INFO } from '@/store/mutation-types';
  import Cookies from "js-cookie";
  export default {
    computed: {
      ...mapState({
        indexItems: state => state.statistics.indexItems,
        CurrentTimeData: state => state.statistics.CurrentTimeData,
        gmlistData: state => state.project.lists,
      }),
    },
    data() {
      return {
        formItem:{
          timeType: 'yesterday',
          gm_id: '',
        },
        show: false,
      }
    },
    methods: {
      ...mapActions({
        indexDetail: 'statistics/indexDetail',
        currentTime: 'statistics/currentTime',
        gmfetchLists: 'project/fetchLists',
      }),
      changeGm(value) {
        if (!value) {
          this.formItem.gm_id = ''
        }
        this.indexDetail(this.formItem)
        this.currentTime({gm_id: this.formItem.gm_id})
      },
      tapCallback(key) {
        this.formItem.timeType = key
        this.indexDetail(this.formItem)
      },
      ifShowDetail(){
        const info = JSON.parse(Cookies.get(USER_INFO))
        if(info.is_root===1||info.frontend_permission.indexOf('/dashboard/main')!==-1){
          this.indexDetail(this.formItem)
          this.currentTime({gm_id: this.formItem.gm_id})
          this.show = true
        }
      }
    },
    mounted() {
      this.ifShowDetail();
      this.gmfetchLists({
        per_page: 1000000,
        is_open: 1,
      },);
    },
  };
</script>
<style scoped>
</style>
