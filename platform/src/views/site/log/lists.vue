<template>
  <div class="content">
    <div class="title_h4">
      操作日志
    </div>
	<template v-if="filds&&filds.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"  :columns="filds" :dataSource="lists"  :pagination="false">

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
        lists: state => state.config.logLists,
        filds: state => state.config.logHeader,
        pages: state => state.config.logPages,
      }),
    },
    data() {
      return {

      };
    },
    methods: {
      ...mapActions({
        getLogLists: 'config/getLogLists',
      }),
      pageChange(page){
        this.getLogLists(page)
      }
    },
    watch:{

    },
    mounted() {
      this.getLogLists(1)
    },
  };
</script>

<style scoped>

</style>
