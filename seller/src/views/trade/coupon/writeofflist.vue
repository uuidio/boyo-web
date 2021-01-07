<template>
  <div class="mr24">
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{x:1100,y:700}" :pagination="false" :columns="fields" :dataSource="dataLists">
          <a slot="voucher" target="_blank" :href="text" slot-scope="text">
            <img style="height:50px" :src="text" alt="">
          </a>
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
  name: 'writeofflist',
  data() {
    return {
      params:{
        page:1
      }
    };
  },
  computed: {
    ...mapState({
      fields: state => state.marketing.couponField,
      dataLists: state => state.marketing.couponData,
      pages: state => state.marketing.pages,
    }),
  },
  methods: {
    ...mapActions({
      fetchLists: 'marketing/fetchOffLists',
    }),
    pageChange(page){
      this.params.page = page
      this.fetchLists(this.params);
    },
    seeList(item) {
      const routeUrl = this.$router.resolve({
        path: `/marketing/coupon_code/${item.id}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    goDetail(item) {
      const jumpUrl = `/marketing/coupon_show/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
  },
  mounted() {
    this.fetchLists(this.params);
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
