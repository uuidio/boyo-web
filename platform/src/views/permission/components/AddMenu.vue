<template>
  <a-modal
    title="权限菜单"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="menuForm"
    >
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="上级菜单"
      >
        <a-tree-select
          :dropdownStyle="{ maxHeight: '400px', overflow: 'auto' }"
          :treeData="menuTree"
          placeholder="请选择上级菜单"
          v-model="formParams.parent_id"
        >
        </a-tree-select>
      </a-form-item>
      <a-form-item
        label="菜单名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="菜单名称" v-model="formParams.title"/>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="路由地址"
      >
        <a-select  @change="handleChange" placeholder="请选择路由地址" v-model="formParams.route_path">
          <a-select-option :value="item.route_path" v-for="item in platformRoutes">
            {{item.route_path}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="前端路由地址"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-select placeholder="前端路由地址" v-model="formParams.frontend_route_path">
          <a-select-option :value="item.path" v-for="item in webRouters">
            {{item.path}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否隐藏菜单"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-switch :defaultChecked="formParams.hide" v-model="formParams.hide" />
      </a-form-item>
      <a-form-item
        label="仅开发者模式显示"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-switch :defaultChecked="formParams.is_dev" v-model="formParams.is_dev" />
      </a-form-item>
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="排序" v-model="formParams.listorder"/>
      </a-form-item>
      <a-form-item
        label="备注"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="备注" v-model="formParams.remark"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
import { routers } from '@/router/routers';
import {
  mapState,
  mapActions,
} from 'vuex';
export default {
  computed: {
    ...mapState({
      platformRoutes: state => state.permission.routes,
    }),
  },
  inject: ['reload'],
  name: 'AddMenu',
  props: {
    menuTree: {
      type: Array,
      default: [],
    },
    addVisible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
      default: {
        title: '',
        parent_id: '0',
        // route_path: null,
        route_name: '',
        // frontend_route_path: null,
        frontend_route_name: '',
        hide: false,
        listorder: 0,
        is_dev: false,
        remark: '',
      },
    },
  },
  data() {
    return {
      menuForm: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 5 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
      visible: false,
      webRouters:[],
    };
  },
  mounted() {
    this.getRoutes();
    this.getWebRouter()
  },
  methods: {
    ...mapActions({
      getRoutes: 'permission/getRoutes',
      createMenu: 'permission/createMenu',
      updateMenu: 'permission/updateMenu',
    }),
    handleChange(value){
      // if(value.length===0){
      //   this.formParams.route_path = ''
      // }else{
      //   this.formParams.route_path = value[0]
      // }
    },
    getWebRouter(){
      if(routers){
        for(let i = 0;i < routers[0].children.length;i++){
          const item = routers[0].children[i]
          if(item.name!== "permission"){
          // if(item.name=="dashboard"){
            for(let j=0;j<item.children.length;j++){
              const  urlItem = item.children[j]
              this.webRouters.push({
                name:urlItem.name,
                path:urlItem.path
              })
            }
          }
        }
      }
    },
    handleOk() {
      if (this.formParams.id === undefined) {
        this.toCreateMenu();
      } else if (this.formParams.id > 0) {
        this.toUpdateMenu();
      }
    },
    handleCancel() {
      this.$emit('on-change', this.visible);
    },
    toCreateMenu() {
      this.createMenu({formItem:this.formParams,callback:this.reload})
    },
    toUpdateMenu() {
      this.updateMenu({formItem:this.formParams,callback:this.reload})
      // updateMenu(this.formParams).then((res) => {
      //   if (res.data.code === 0) {
      //     showSuccess(res.data.message);
      //     this.reload();
      //   } else if (res.data.code === 414) {
      //     showErrors(res.data.result.errors);
      //   } else {
      //     showError(res.data.message);
      //   }
      // });
    },
  },
  watch: {
    addVisible(v) {
      this.visible = v;
    },
  },
};
</script>
<style scoped>
</style>
