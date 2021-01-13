<template>
  <div class="mr24">
    <a-card :bordered="false">
      <div slot="title">
        <router-link to="/marketing/group/add">
          <a-button type="primary" icon="plus">添加拼团活动</a-button>
        </router-link>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table 
          :scroll="{ x: 1800 ,y:700}"
          :columns="fields"
          :dataSource="dataLists"
          :pagination="false"
        >
          <div slot="goods_image" slot-scope="text, record">
            <img
              :src="record.goods_image"
              alt=""
              style="width:80px;height:80px;"
            />
          </div>
          <div slot="action" slot-scope="text, record">
            <a @click="goDetail(record)">查看</a>
            <a class="col-red ml10" @click="del(record)">删除</a>
            <a class="col-red ml10" @click="del(record, true)">强制删除</a>
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
      fields: state => state.group.field,
      dataLists: state => state.group.dataLists,
      pages: state => state.group.pages
    })
  },
  methods: {
    ...mapActions({
      fetchLists: "group/fetchLists",
      deleteRow: "group/deleteRow"
    }),
    del(param, isForce) {
      if (confirm("确定要删除该数据？")) {
        if (isForce) {
          param.isForce = true;
        }
        console.log(param.isForce);
        this.deleteRow({ param, listData: this.dataLists });
      }
    },
    forcerDel(param) {
      console.log(param);
    },
    pageChange(page) {
      this.formItem.page = page;
      this.getLists();
    },
    getLists() {
      const params = this.formItem;
      this.fetchLists(params);
    },
    goDetail(item) {
      const routeUrl = this.$router.resolve({
        path: `/marketing/group/detail/${item.id}`
      });
      window.open(routeUrl.href, "_blank");
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
