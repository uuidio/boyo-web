<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/trade/logistics_add">
        <a-button icon="plus" type="primary">新增物流模板</a-button>
      </router-link>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :pagination="false">
        <div slot="action" slot-scope="text,record">
          <a-button class="mr10"  type="primary" @click="edit(record)">编辑</a-button>
          <a-popconfirm title="确定删除该数据？" @confirm="del(record)" okText="确定" cancelText="取消">
            <a-button  type="danger">删除</a-button>
          </a-popconfirm>
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
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'logistics',
  data() {
    return {
      columns: [{}],
      data: [{}],
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'logistics/logistics',
      logisticsDel: 'logistics/logisticsDel',
    }),
    edit(item) {
      const jumpUrl = `/trade/logistics_edit/${item.id}`;
      this.$router.push(jumpUrl);
    },
    del(item) {
      const params = {
        id:item.id
      }
      this.logisticsDel({params:params,lists: this.listData,});
    },
    pageChange(page) {
      this.getList(page);
    },
    getList(page){
      const params = {
        page:page
      }
      this.fetchLists(params);
    }
  },
  computed: {
    ...mapState({
      listData: state => state.logistics.logLists,
      pages: state => state.logistics.pages,
      listField: state => state.logistics.logField,
    }),
  },
  mounted() {
    this.getList(1)
  },
};
</script>

<style scoped>

</style>
