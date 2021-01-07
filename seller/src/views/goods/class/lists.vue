<template>
  <div class="content">
    <router-link to="/goods/class/add">
      <a-button type="primary" class="mr10">+ 添加分类</a-button>
    </router-link>
    <a-button style="margin-bottom:20px">删除</a-button>
    <a-table :scroll="{x:1100,y:700}"
      :columns="listField" :dataSource="listData"
      :pagination="false"
    >
      <div slot="action" slot-scope="text, record">
        <a @click="edit(record)" v-if="!record.editable" class="mr10">编辑</a>
        <a @click="save(record)" v-else class="mr10">保存</a>
        <a @click="del(record)" class="col-red">删除</a>
      </div>
      <div slot="cat_name" slot-scope="text, record">
        <a-input
          v-if="record.editable"
          :value="text"
          @change="e => handleChange(e.target.value, record)"
        />
        <span v-else>{{text}}</span>
      </div>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  data() {
    return {
      formItem: {
        id: '',
        cat_name: '',
        parent_id: '',
      },
    };
  },
  mounted() {
    this.shopClssLists();
  },
  methods: {
    ...mapActions({
      shopClssLists: 'goods/shopClssLists',
      editShopClass: 'goods/editShopClass',
      delShopClass: 'goods/delShopClass',
    }),
    edit(item) {
      item.editable = true;
    },
    handleChange(value, item) {
      item.cat_name = value;
    },
    save(item) {
      this.formItem.cat_name = item.cat_name;
      this.formItem.id = item.id;
      this.formItem.parent_id = item.parent_id;
      item.editable = false;
      this.editShopClass({
        formItem: this.formItem,
      });
    },
    del(item) {
      if (confirm('确认删除该数据?')) {
        this.delShopClass({
          id: item.id,
          listData: this.listData,
        });
      }
    },
  },
  computed: {
    ...mapState({
      listData: state => state.goods.classlists,
      listField: state => state.goods.classfields,
    }),
  },
};
</script>

<style scoped>

</style>
