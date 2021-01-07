<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/goods/marketClass/add">
        <a-button type="primary" icon="plus">添加商场分类</a-button>
      </router-link>
    </div>
    <div>
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <a slot="class_icon" target="_blank" :href="text" slot-scope="text">
          <img style="height:50px" :src="text" alt="">
        </a>
        <div slot="action" slot-scope="text,item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a @click="delItem(item)" class="col-red">删除</a>
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.marketClass.lists,
      listField: state => state.marketClass.fields,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchLists: 'marketClass/fetchLists',
      del: 'marketClass/del',
    }),
    edit(item) {
      const goLink = `/goods/marketClass/edit/${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
    delItem(item) {
      if (confirm('确认删除此数据？')) {
        this.del({
          id: item.id,
        });
      }
    },
  },
  mounted() {
    this.fetchLists();
  },
};
</script>

<style scoped>

</style>
