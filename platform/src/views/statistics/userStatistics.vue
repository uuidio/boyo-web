<template>
  <div class="content">
    <a-tabs defaultActiveKey="week" @change="keyCallback">
      <a-tab-pane tab="最近七天" key="week"></a-tab-pane>
      <a-tab-pane tab="最近三十天" key="month"></a-tab-pane>
    </a-tabs>
    <a-table :scroll="{ x: 1100,y:700 }"  :columns="filds" :dataSource="lists"  :pagination="false">

    </a-table>
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
        lists: state => state.statistics.userAnalysisLists,
        filds: state => state.statistics.userAnalysisField,
      }),
    },
    data() {
      return {
        formItem:{
          timeType:'week',
          storeLimit:10
        },
      };
    },
    methods: {
      ...mapActions({
        userAnalysis: 'statistics/userAnalysis',
      }),
      keyCallback(key){
        this.formItem.timeType = key
        this.userAnalysis(this.formItem)
      }
    },
    watch:{

    },
    mounted() {
      this.userAnalysis(this.formItem)
    },
  };
</script>

<style scoped>

</style>
