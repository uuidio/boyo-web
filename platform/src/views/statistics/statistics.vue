<template>
  <div class="content">
    <a-tabs defaultActiveKey="week" @change="keyCallback">
      <a-tab-pane tab="最近七天" key="week"></a-tab-pane>
      <a-tab-pane tab="最近三十天" key="month"></a-tab-pane>
    </a-tabs>
    <ve-line :data="chartData" :settings="chartSettings"></ve-line>
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
        shopData: state => state.statistics.shopData,
      }),
    },
    data() {
      this.chartSettings = {
        labelMap: {
          shopname: '店铺名称',
          shopaccountfee: '销售额',
          shopaccountnum: '销售数量',
        }
      }
      return {
        formItem:{
          timeType:'week'
        },
        chartData: {
          columns: ['shopname', 'shopaccountfee', 'shopaccountnum'],
          rows: [
          ]
        }
      };
    },
    methods: {
      ...mapActions({
        storeAnalysis: 'statistics/storeAnalysis',
      }),
      keyCallback(key){
        this.formItem.timeType = key
        this.storeAnalysis(this.formItem)
      }
    },
    watch:{
      shopData(){
        this.chartData.rows = this.shopData
      }
    },
    mounted() {
      this.storeAnalysis(this.formItem)
    },
  };
</script>

<style scoped>

</style>
