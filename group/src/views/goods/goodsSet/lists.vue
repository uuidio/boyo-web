<template>
  <div class="content">
    <div class="mb20 fxBox2">
      <router-link to="/goods/goodsSet/add">
        <a-button icon="plus" type="primary">新增第三方商品同步设置</a-button>
      </router-link>
      <div class="fxbox">
        <span>第三方商品自动维护状态:&nbsp;&nbsp;</span>
        <a-switch v-model="goodsStatus.status" checkedChildren="开" unCheckedChildren="关" @change='onChange'/>
      </div>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <div slot="action" slot-scope="text,record">
          <a-button class="mr10" type="primary" @click="edit(record)">编辑</a-button>
          <a-popconfirm title="确定删除该数据？" @confirm="del(record)" okText="确定" cancelText="取消">
            <a-button type="danger">删除</a-button>
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
      fetchLists: 'goodsSet/fetchLists',
      delSyn: 'goodsSet/delSyn',
      openSyn: 'goodsSet/openSyn',
      stopSyn: 'goodsSet/stopSyn',
    }),
    onChange(e) {
      if (this.goodsStatus.status) {
        this.openSyn();
      } else {
        this.stopSyn();
      }
    },
    edit(item) {
      const jumpUrl = `/goods/goodsSet/edit/${item.id}`;
      this.$router.push(jumpUrl);
    },
    del(item) {
      this.delSyn({
        id: item.id,
        lists: this.listData,
      });
    },
    pageChange(page) {
      this.fetchLists(page);
    },
  },
  computed: {
    ...mapState({
      listData: state => state.goodsSet.lists,
      pages: state => state.goodsSet.pages,
      listField: state => state.goodsSet.fields,
      goodsStatus: state => state.goodsSet.goodsStatus,
    }),
  },
  mounted() {
    this.fetchLists(1);
  },
};
</script>

<style scoped>

</style>
