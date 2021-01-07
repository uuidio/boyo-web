<template>
  <div class="content">
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false" :rowKey="row=>row.id">
        <div slot="action" slot-scope="text, item">
          显示状态
          <a-switch class="mr10" checkedChildren="显示" unCheckedChildren="隐藏" :checked="item.self_show ? true : false"
                    :key="item.id" @change="act(item)" />
        </div>
      </a-table>

    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :defaultPageSize="pages.per_page"
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
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.article.dataManage,
      listField: state => state.article.dataManageField,
      pages: state => state.article.dataManagePages,
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
      getDateList: 'article/getDataManage',
      actManage:'article/actManage'
    }),
    act(item) {
      console.log(item, 111);
      let statusBool = 0;
      if (item.self_show) {
        statusBool = 0;
        item.self_show = false
      } else if (!item.status) {
        statusBool = 1;
        item.self_show = true
      }
      const params = {
        id: item.id,
        self_show: statusBool,
      };
      this.actManage({params});
    },

    pageChange(page) {
      this.formItem.page = page;
      this.getDateList({ formItem: this.formItem });
    },
    // 编辑
    edit(item) {
      const goLink = `/article/addArticle?articleId=${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
  },
  mounted() {
    this.getDateList();
  },
};
</script>

<style scoped lang="stylus">
  .list-nav
    display flex
    justify-content space-between
    flex-wrap wrap
</style>
