<template>
  <div class="mr24">
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table 
          :scroll="{ x: 1400 ,y:700}"
          :columns="fields"
          :dataSource="dataLists"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a
              v-if="
                record.is_shop_apply === '1' && record.validstatus === '报名中'"
              @click="goapply(record)"
            >报名</a>
            <span v-else> 报名已结束</span>
            
            <a @click="goDetail(record)" v-if="record.register_id"> 查看</a>
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
      </template>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "coupon",
  data() {
    return {
      formItem: {
        page: 1
      }
    };
  },
  computed: {
    ...mapState({
      fields: state => state.seckill.field,
      dataLists: state => state.seckill.dataLists,
      pages: state => state.seckill.pages
    })
  },
  methods: {
    ...mapActions({
      fetchLists: "seckill/fetchLists"
    }),
    pageChange(page) {
      this.formItem.page = page;
      this.getLists();
    },
    getLists() {
      const params = this.formItem;
      this.fetchLists(params);
    },
    goDetail(item) {
        const jumpUrl = `/marketing/seckill/detail/${item.register_id}`;
        this.$router.push({ path: jumpUrl });
    },
    goapply(item) {
      const jumpUrl = `/marketing/seckill/seckill_apply/${item.id}`;
      this.$router.push({ path: jumpUrl });
    }
  },
  mounted() {
    this.getLists();
  }
};
</script>

<style scoped lang="stylus">
>>> .ant-card:not(:last-child) {
  margin-bottom 24px
}
</style>
