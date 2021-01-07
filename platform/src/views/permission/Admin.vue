<template>
  <a-card :bordered="false" style="margin:24px">
    <div class="table-operator mb20">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>
	<div v-if="fields&&fields.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      :columns="fields"
      :dataSource="lists"
      rowKey="id"
      :pagination="false"
    >
      <tag-boole slot="status" slot-scope="text, record" :tagValue="record.status"></tag-boole>
      <tag-boole slot="is_root" slot-scope="text, record" :tagValue="record.is_root"></tag-boole>
      <action-column
        slot="action"
        slot-scope="text, record"
        :record="record"
        :actions="['edit', 'delete']"
        @on-edit="handleEdit"
        @on-delete="handleDelete">
      </action-column>
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
	</div>
    <add-admin
      :formParams="formParams"
      :addVisible="addVisible"
      @on-change="changeAdd">
    </add-admin>
  </a-card>
</template>
<script>
import ActionColumn from '@/components/Table/ActionColumn';
import TagBoole from '@/components/Table/TagBoole';
import {
  mapState,
  mapActions,
} from 'vuex';
import AddAdmin from './components/AddAdmin';

export default {
  computed: {
    ...mapState({
      fields: state => state.permission.adminFields,
      lists: state => state.permission.adminLists,
      pages: state => state.permission.adminPages,
    }),
  },
  name: 'Admin',
  inject: ['reload'],
  components: {
    AddAdmin,
    ActionColumn,
    TagBoole,
  },
  data() {
    return {
      addVisible: false,
      formParams: {},
    };
  },
  mounted() {
    this.getLists(1);
  },
  methods: {
    ...mapActions({
      getAdminLists: 'permission/getAdminLists',
      delAdmin: 'permission/delAdmin',
    }),
    handleAdd() {
      this.formParams = {
        name: '',
        status: true,
        listorder: 0,
        remark: '',
        is_root: true,
      };
      this.addVisible = true;
    },
    pageChange(page) {
      this.$nextTick(function () {
        this.getLists(page);
      });
    },
    getLists(page) {
      const params = {
        page,
      };
      this.getAdminLists(params);
    },
    changeAdd(visible) {
      this.addVisible = !visible;
    },
    handleEdit(record) {
      record.status = Boolean(record.status);
      record.is_root = Boolean(record.is_root);
      record.password = '';
      this.formParams = record;
      this.addVisible = true;
    },
    handleDelete(record) {
      this.delAdmin({ formItem: { id: record.id }, callback: this.reload });
    },
  },
};
</script>
<style scoped>
</style>
