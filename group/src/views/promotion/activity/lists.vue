<template>
  <div class="mr24">
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1400,y:700 }"
          :columns="fields"
          :dataSource="dataLists"
          :pagination="false"
        >
          <div slot="action" slot-scope="text, record">
            <a @click="goDetail(record)">查看</a>
            <a @click="edit(record)" v-if="record.status"> 编辑</a>
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
    <!-- 修改名称 model -->
    <a-modal title="编辑活动标题" v-model="showEdit" @ok="editOk">
      <a-input placeholder="请输入活动标题" v-model="newName" />
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "activity",
  data() {
    return {
      formItem: {
        page: 1
      },
      showEdit: false,
      actEdit: {},
      newName: ""
    };
  },
  computed: {
    ...mapState({
      fields: state => state.activity.field,
      dataLists: state => state.activity.dataLists,
      pages: state => state.activity.pages
    })
  },
  methods: {
    ...mapActions({
      fetchLists: "activity/fetchLists",
      modName: "activity/activityModName",
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
      const routeUrl = this.$router.resolve({
        path: `/promotion/activity/detail/${item.id}`
      });
      window.open(routeUrl.href, "_blank");
    },
    edit(item) {
      this.actEdit = item;
      this.showEdit = true;
    },
    editOk() {
      if (!this.newName) {
        this.$message.info("请输入新活动名称");
      } else {
        let param = {
          id: this.actEdit.id,
          shop_id: this.actEdit.shop_id,
          name: this.newName
        };
        this.modName(param)
      }
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
