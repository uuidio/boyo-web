<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/goods/spec/add">
        <a-button type="primary" icon="plus">添加规格</a-button>
      </router-link>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <div slot="action" slot-scope="text,item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a-popconfirm title="确认删除该数据?" @confirm="del(item)" okText="确认" cancelText="取消">
            <a class="col-red">删除</a>
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
  computed: {
    ...mapState({
      listData: state => state.goods.speclists,
      listField: state => state.goods.specfields,
      pages: state => state.goods.specpages,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      specLists: 'goods/specLists',
      deleteSpec: 'goods/deleteSpec',
    }),
    pageChange(page) {
      this.specLists(page);
    },
    edit(item) {
      const goLink = `/goods/spec/edit/${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
    del(item) {
      this.deleteSpec({
        param: item,
        listData: this.listData,
      });
    },
  },
  mounted() {
    this.specLists(1);
  },
};
</script>

<style scoped>

</style>
