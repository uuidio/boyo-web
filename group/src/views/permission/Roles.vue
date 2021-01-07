<template>
  <a-card :bordered="false" style="margin:24px">
    <div class="table-operator mb20">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>
	<template v-if="fields&&fields.length>0">
    <a-table :scroll="{ x: 1100,y:700 }"
      :columns="fields"
      :dataSource="lists"
      rowKey="id"
      :pagination="false"
    >
      <tag-boole slot="status" slot-scope="text, record" :tagValue="record.status"></tag-boole>
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
        :pageSize="Number(pages.per_page)"
        :defaultCurrent="1"
        @change="pageChange"
      />
    </div>
	</template>
    <add-role
      :formParams="formParams"
      :addVisible="addVisible"
      :menus="checkedMenus"
      @on-change="changeAdd">
    </add-role>
  </a-card>
</template>
<script>
import AddRole from './components/AddRole';
import ActionColumn from '@/components/Table/ActionColumn';
import TagBoole from '@/components/Table/TagBoole';
import {
  mapState,
  mapActions,
} from 'vuex';
export default {
  computed: {
    ...mapState({
      fields: state => state.permission.rolesFields,
      lists: state => state.permission.rolesLists,
      pages:state => state.permission.rolesPages,
    }),
  },
  inject: ['reload'],
  name: 'Roles',
  components: {
    AddRole,
    ActionColumn,
    TagBoole,
  },
  data() {
    return {
      addVisible: false,
      formParams: {
        name: '',
        status: true,
        listorder: 0,
        remark: '',
        menus: [],
        frontend_extend: {
          checked: [],
          halfChecked: [],
        },
      },
      checkedMenus: [],
    };
  },
  mounted() {
    this.getLists(1);
  },
  methods: {
    ...mapActions({
      getRolesLists: 'permission/getRolesLists',
      delRole: 'permission/delRole',
    }),
    pageChange(page){
        this.getLists(page);
    },
    handleAdd() {
      this.formParams = {
        name: '',
        status: true,
        listorder: 0,
        remark: '',
        menus: [],
        frontend_extend: {
          checked: [],
          halfChecked: [],
        },
      };
      this.addVisible = true;
    },
     getLists(page) {
      const params = {
        page:page
      }
      this.getRolesLists(params)
    },
    changeAdd(visible) {
      this.addVisible = !visible;
    },
    handleEdit(record) {
      record.frontend_extend = record.frontend_extend ? record.frontend_extend : { checked: [], halfChecked: [] };
      record.status = Boolean(record.status);
      this.checkedMenus = record.frontend_extend.checked;
      this.formParams = record;
      this.addVisible = true;
    },
    handleDelete(record) {
      const params = {
        id:record.id
      }
      this.delRole({formItem:params,callback:this.reload})
    },
  },
};
</script>
<style scoped>
</style>
