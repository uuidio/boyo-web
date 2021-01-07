<template>
    <div class="content">
       <div class="mb20">
         <a-row>
           <a-col :md="22" :xs="24">
             <div class="searchBox">
               <span>核销时间：</span>
               <a-date-picker
                 format="YYYY-MM-DD HH:mm:ss"
                 showTime
                 class="mr10"
               />
               <a-input-search
                 placeholder="核销手机号"
                 style="width: 200px"
                 @search="onSearch"
                 v-model="formItem.tel"
               />
               <div class="exchange_num">
                 <span class="s1">总核销币数 &nbsp;&nbsp;&nbsp<span class="col-666">61枚</span></span>
                 <span>总币值 &nbsp;&nbsp;&nbsp;<span class="col-666">61枚</span></span>
               </div>
             </div>
           </a-col>
           <a-col :md="2" :xs="24">
             <a-button type="primary">导出表格</a-button>
           </a-col>
         </a-row>
       </div>
	   <template v-if="columns&&columns.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="columns" :dataSource="data" :pagination="false"></a-table>
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
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      columns: [],
      data: [],
      pages: {},
      formItem: {
        tel: '',
        start_time: '',
        end_time: '',
        page: 1,
      },
    };
  },
  computed: {
    ...mapState({
    }),
  },
  methods: {
    ...mapActions({
    }),
    pageChange(page) {
      this.formItem.page = page;
    },
    onSearch() {},
  },
  mounted() {

  },
};
</script>

<style scoped lang="stylus">
.searchBox
  display flex
  flex-wrap wrap
  align-items center
  .exchange_num
    margin-left 20px
    .s1
      margin-right 20px
</style>
