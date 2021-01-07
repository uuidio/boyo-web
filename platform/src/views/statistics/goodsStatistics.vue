<template>
  <div class="content">
    <a-tabs defaultActiveKey="week" @change="keyCallback">
      <a-tab-pane tab="最近七天" key="week"></a-tab-pane>
      <a-tab-pane tab="最近三十天" key="month"></a-tab-pane>
    </a-tabs>
    <a-table :scroll="{ x: 1100,y:700 }"  :columns="filds" :dataSource="lists"  :pagination="false">
      <a slot="pic_path" target="_blank" :href="text" slot-scope="text">
        <img style="height:50px" :src="text" alt="">
      </a>
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
        lists: state => state.statistics.goodsAnalysisLists,
        filds: state => state.statistics.goodsAnalysisField,
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
        goodsAnalysis: 'statistics/goodsAnalysis',
      }),
      keyCallback(key){
        this.formItem.timeType = key
        this.goodsAnalysis(this.formItem)
      }
    },
    watch:{

    },
    mounted() {
      this.goodsAnalysis(this.formItem)
    },
  };
</script>

<style scoped>

</style>
