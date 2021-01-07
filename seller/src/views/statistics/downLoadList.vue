<template>
  <div class="content">
    <div>
      <p class="mb10">
        *数据较大时下载时间可能较长，可刷新页面更新下载状态
      </p>
     <div v-if="listField&&listField.length>0">
       <a-table
         :columns="listField"
         :dataSource="listData"
         :pagination="false"
       >
         <div slot="action" slot-scope="text, record">
           <a-button type="primary" v-if="record.status==1">
             <a :href="record.url">下载</a>
           </a-button>
         </div>
       </a-table>
       <div class="pageBox">
         <a-pagination
           :total="pages.total"
           :showTotal="total => `共 ${total} 条数据`"
           :pageSize="pages.per_page"
           :defaultCurrent="1"
           @change="pageChange" />
       </div>
     </div>
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    inject: ['reload'],
    components:{
    },
    name: 'lists',
    computed: {
      ...mapState({
        listData: state => state.statistics.DownLists,
        listField: state => state.statistics.DownField,
        pages: state => state.statistics.DownPages,
      }),
    },
    data() {
      return {
        listform: {
          page: 1,
        },
      };
    },
    methods: {
      ...mapActions({
        depLists: 'statistics/downLoadList',
      }),
      pageChange(page){
        this.listform.page = page;
        this.depLists(this.listform)
      },
    },
    mounted() {
      this.depLists(this.listform)
    },
  };
</script>

<style  scoped lang="stylus">
</style>
