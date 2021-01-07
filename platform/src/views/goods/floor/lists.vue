<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/goods/floor/add">
        <a-button type="primary" icon="plus">添加楼层</a-button>
      </router-link>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <a slot="class_icon" target="_blank" :href="text" slot-scope="text">
          <img style="height:50px" :src="text" alt="" />
        </a>
        <div slot="action" slot-scope="text, item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a @click="delItem(item)" class="col-red">删除</a>
        </div>
      </a-table>
    <div class="pageBox" v-if="pages.total">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :pageSize="pages.per_page"
        :defaultCurrent="1"
        @change="pageChange"
        v-model="currentPage"
      />
    </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "lists",
  computed: {
    ...mapState({
      listData: state => state.floor.lists,
      listField: state => state.floor.fields,
      pages: state => state.floor.pages,
    })
  },
  data() {
    return {
      currentPage: 1,
    };
  },
  methods: {
    ...mapActions({
      fetchLists: "floor/fetchLists",
      del: "floor/del"
    }),
    edit(item) {
      const goLink = `/goods/floor/edit/${item.id}`;
      this.$router.push({
        path: goLink
      });
    },
    delItem(item) {
      if (confirm("确认删除此数据？")) {
        this.del({
          id: item.id
        });
      }
    },
    pageChange(page) {
      this.currentPage = page;
      this.fetchLists({ page: page });
    },
  },
  mounted() {
    this.fetchLists({ page: 1 });
  },
};
</script>

<style scoped>
</style>
