<template>
  <a-card :bordered="false" style="margin:24px">
    <div class="table-operator mb20">
      <a-button type="primary" icon="plus" @click="handleAdd">新建</a-button>
    </div>
    <a-table :scroll="{ x: 1100,y:700 }"
      :columns="fields"
      :dataSource="lists"
      :pagination="false"
    >
      <tag-boole slot="hide" slot-scope="text, record" :tagValue="!record.hide"></tag-boole>
      <action-column slot="action" slot-scope="text, record" :record="record" :actions="['edit', 'delete']" @on-edit="handleEdit" @on-delete="handleDelete"></action-column>
    </a-table>
    <add-menu :formParams="formParams" :menuTree="menuTree" :addVisible="addVisible" @on-change="changeAddMenu"></add-menu>
  </a-card>
</template>
<script>
import AddMenu from './components/AddMenu';
import ActionColumn from '@/components/Table/ActionColumn';
import TagBoole from '@/components/Table/TagBoole';
import {
  mapState,
  mapActions,
} from 'vuex';
export default {
  inject: ['reload'],
  computed: {
    ...mapState({
      fields: state => state.permission.menuFields,
      lists: state => state.permission.menuLists,
    }),
  },
  name: 'Menu',
  components: {
    AddMenu,
    ActionColumn,
    TagBoole,
  },
  data() {
    return {
      // 高级搜索 展开/关闭
      advanced: false,
      // 查询参数
      queryParam: {},
      isExpandedAll: false,
      expandedKeys: [],
      addVisible: false,
      menuTree: [{
        title: '顶级菜单',
        value: '0',
        key: '0',
        children: [],
      }],
      formParams: {},
      defaultFormParams: {
        title: '',
        parent_id: '0',
        // route_path: null,
        route_name: '',
        // frontend_route_path: '',
        frontend_route_name: '',
        hide: false,
        listorder: 0,
        is_dev: false,
        remark: '',
      },
    };
  },
  mounted() {
    this.getMenuLists();
  },
  watch:{
    lists(){
      this.getMenuTreeNode(this.lists);
      this.menuTree[0].children = this.lists;
    }
  },
  methods: {
    ...mapActions({
      menuLists: 'permission/getMenuLists',
      delMenu: 'permission/delMenu',
    }),
     getMenuLists() {
      this.menuLists()
      // const res = await permissionMenuLists();
      // this.data = res.data.result.lists;
      // this.columns = res.data.result.field;
      // this.columns[4].scopedSlots = { customRender: 'hide' };
      // this.columns.push({
      //   title: '操作', dataIndex: '', key: 'action', scopedSlots: { customRender: 'action' },
      // });
      // this.getMenuTreeNode(this.data);
      // this.menuTree[0].children = this.data;
    },
    handleAdd() {
      this.formParams = this.defaultFormParams;
      this.addVisible = true;
    },
    getMenuTreeNode(menu) {
      menu.forEach((value) => {
        value.key = value.id;
        value.value = value.id.toString();
        if (typeof value.children !== 'undefined') {
          this.getMenuTreeNode(value.children);
        }
      });
    },
    changeAddMenu(visible) {
      this.addVisible = !visible;
    },
    handleEdit(record) {
      console.log(record)

      record.parent_id = record.parent_id.toString();
      record.hide = Boolean(record.hide);
      record.is_dev = Boolean(record.is_dev);
      this.formParams = record;
      this.addVisible = true;
    },
    handleDelete(record) {
      const params = { id: record.id };
      this.delMenu({formItem:params,callback:this.reload})
    },
  },
};
</script>
<style scoped>
</style>
