<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/goods/brand/add">
        <a-button type="primary" icon="plus">添加品牌</a-button>
      </router-link>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <a slot="brand_logo" target="_blank" :href="text" slot-scope="text">
          <img style="height:50px" :src="text" alt="">
        </a>
        <div slot="action" slot-scope="text,item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a @click="del(item)" class="col-red">删除</a>
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
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.brand.lists,
      listField: state => state.brand.fields,
      pages: state => state.brand.pages,
    }),
  },
  data() {
    return {
      getItem:{
        page:1
      }
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'brand/fetchLists',
      delBrand: 'brand/delBrand',
    }),
    pageChange(page) {
      this.getItem.page = page
      this.getLists()
    },
    edit(item) {
      const goLink = `/goods/brand/edit/${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
    del(item) {
      if (confirm('确认删除此数据？')) {
        this.delBrand({
          id: item.id,
        });
      }
    },
    getLists(){
      const params = this.getItem
      this.fetchLists(params);
    }
  },
  mounted() {
    this.getLists()
  },
};
</script>

<style scoped>

</style>
