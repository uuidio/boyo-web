<template>
  <div class="content">
    <div class="mb20">
      <router-link to="/goods/class/add">
        <a-button type="primary" icon="plus">添加分类</a-button>
      </router-link>
    </div>
    <div>
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <a slot="class_icon" target="_blank" :href="text" slot-scope="text">
          <img style="height:50px" :src="text" alt="">
        </a>
        <div slot="action" slot-scope="text,item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a @click="del(item)" class="col-red">删除</a>
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
      listData: state => state.classify.lists,
      listField: state => state.classify.fields,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchLists: 'classify/fetchLists',
      delClass: 'classify/delClass',
    }),
    edit(item) {
      const goLink = `/goods/class/edit/${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
    del(item) {
      if (confirm('确认删除此数据？')) {
        this.delClass({
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
