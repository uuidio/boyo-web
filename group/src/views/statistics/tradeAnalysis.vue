<template>
  <div class="content">
    <a-tabs defaultActiveKey="week" @change="keyCallback">
      <a-tab-pane tab="最近七天" key="week"></a-tab-pane>
      <a-tab-pane tab="最近三十天" key="month"></a-tab-pane>
    </a-tabs>
    <ve-line :data="chartData"></ve-line>
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
        trades: state => state.statistics.trades,
      }),
    },
    data() {
      return {
        formItem:{
          timeType:'week'
        },
        chartData: {
          columns: ['日期', '完成订单', '新建订单', '退款订单'],
          rows: [
          ]
        }
      };
    },
    methods: {
      ...mapActions({
        tradeAnalysis: 'statistics/tradeAnalysis',
      }),
      keyCallback(key){
        this.formItem.timeType = key
        this.tradeAnalysis(this.formItem)
      }
    },
    watch:{
      trades(){
        this.chartData.rows = []
        for(let key in this.trades){
          this.chartData.rows.push({
            '日期':key,
            '完成订单':this.trades[key].complete_trade,
            '新建订单':this.trades[key].new_trade,
            '退款订单':this.trades[key].refunds_num
          })
        }

        console.log(this.chartData.rows)
      }
    },
    mounted() {
      this.tradeAnalysis(this.formItem)
    },
  };
</script>

<style scoped>

</style>
