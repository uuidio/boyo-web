<template>
  <div class="content">
    <div v-if="fields&&fields.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
        <div v-if="record.goods_info&&record.goods_info.goods_image"  slot="goods_info.goods_image" slot-scope="text,record">
          <img :src="record.goods_info.goods_image" height="80px" alt="">
        </div>
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
    </div>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    components:{
    },
    data() {
      return {
        formItem:{
          page:1,
        },
      };
    },
    computed: {
      ...mapState({
        fields: state => state.reward.RelevanceFields,
        dataLists: state => state.reward.RelevanceLists,
        pages: state => state.reward.RelevancePages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'reward/activitiesRewardList',
      }),
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },

    },
    mounted() {
      this.getLists()
    },
  };
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
