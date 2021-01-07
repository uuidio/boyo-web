<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10">
        <router-link to="/project/paymentType/editPaymentType">
          <a-button class="mr10" type="primary" icon="plus">添加支付类型代码</a-button>
        </router-link>
      </div>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false" :rowKey="row=>row.id">
        <div slot="action" slot-scope="text, item">
          <a-button class="btn-info mr10" size="small" @click="edit(item)">编辑</a-button>
          <a-button class="btn-error" size="small" @click="remove(item)">删除</a-button>
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
      listData: state => state.project.paymentTypeList,
      listField: state => state.project.paymentTypeField,
      pages: state => state.project.paymentTypePage,
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
      getDateList: 'project/getPaymentTypeList',
      removeItem: 'project/deletePaymentType',
    }),
    remove(item) {
      this.removeItem(item.id);
    },
    pageChange(page) {
      this.formItem.page = page;
      this.getLists({ formItem: this.formItem });
    },
    // 编辑
    edit(item) {
      const goLink = `/project/paymentType/editPaymentType?itemId=${item.id}`;
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
