<template>
  <div class="mr24">
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{x:1400,y:700}"
          :columns="fields"
          :dataSource="dataLists"
          :pagination="false"
        >
          <!-- <div slot="valid_status_text" slot-scope="text, record">
            {{ record.apply_status.text }}
          </div> -->
          <div slot="action" slot-scope="text, record">
            <a @click="goDetail(record)">查看</a>

            <!-- <a
              v-if="record.verify_status_text === '审核被拒绝' && record.is_apply ==='1'"
              class="ml10"
              @click="goApply(record)"
              >重新报名</a
            > -->
            <a
              v-if="record.apply_status.staus === 1"
              class="ml10"
              @click="goApply(record)"
              >重新报名</a
            >
          </div>
        </a-table>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :pageSize="Number(pages.per_page)"
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
      fields: state => state.seckill.sellerField,
      dataLists: state => state.seckill.sellerDataLists,
      pages: state => state.seckill.sellerPages
    })
  },
  methods: {
    ...mapActions({
      fetchLists: "seckill/sellerLists"
    }),
    pageChange(page) {
      this.formItem.page = page;
      this.getLists();
    },
    getLists() {
      const params = this.formItem;
      this.fetchLists(params);
      console.log(this.dataLists);
    },
    goDetail(item) {
      const jumpUrl = `/marketing/seckill/detail/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
    goApply(item) {
      const jumpUrl = `/marketing/seckill/seckill_apply/${item.seckill_ap_id}?actid=${item.id}`;
      this.$router.push({
        path: jumpUrl
      });
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
