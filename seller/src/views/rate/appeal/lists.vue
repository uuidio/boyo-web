<template>
    <div class="mr24">
      <a-card title="申诉列表">
         <template v-if="field&&field.length>0">
           <a-table :scroll="{x:1100,y:700}" :columns="field" :dataSource="dataLists" :pagination="false">
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
      </a-card>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      field: state => state.rate.appealFlield,
      dataLists: state => state.rate.appealData,
      pages: state => state.rate.appealPages,
    }),
  },
  data() {
    return {
      visible: false,
      page:1
    };
  },
  methods: {
    ...mapActions({
      appealLists: 'rate/appealLists',
    }),
    pageChange(page){
      this.page=page
      this.appealLists(this.page);
    },
  },
  mounted() {
    this.appealLists(this.page);
  },
};
</script>

<style scoped>

</style>
