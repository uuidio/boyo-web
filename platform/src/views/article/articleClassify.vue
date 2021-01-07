<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10">
        <router-link to="/article/addClassify">
          <a-button class="mr10" type="primary" icon="plus">添加文章分类</a-button>
        </router-link>
      </div>
    </div>
    <div>
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false" :rowKey="row=>row.id">
        <div slot="action" slot-scope="text, item">
          <a-button class="btn-info mr10" size="small" @click="edit(item)">编辑</a-button>
          <a-button class="btn-error" size="small" @click="remove(item)">删除</a-button>
        </div>
      </a-table>

    </div>
<!--    <div class="pageBox">-->
<!--      <a-pagination-->
<!--        :total="pages.total"-->
<!--        :showTotal="total => `共 ${total} 条数据`"-->
<!--        :pageSize="pages.per_page"-->
<!--        :defaultCurrent="1"-->
<!--        @change="pageChange"-->
<!--      />-->
<!--    </div>-->
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.article.classifyList,
      listField: state => state.article.classifyField,
      pages: state => state.article.classifyItem,
    }),
  },
  data() {
    return {
      formItem: {
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      getList: 'article/getClassifyList',
      removeItem: 'article/deleteClassify',
    }),
    remove(item) {
      this.removeItem(item.id);
    },
    pageChange(page) {
      // this.formItem.page = page;
      // this.getLists({ formItem: this.formItem });
    },
    // 编辑
    edit(item) {
      const goLink = `/article/editClassify?classifyId=${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
  },
  mounted() {
    this.getList();
  },
};
</script>

<style scoped lang="stylus">
  .list-nav
    display flex
    justify-content space-between
    flex-wrap wrap
</style>
