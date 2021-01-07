<template>
  <a-modal
    title="后台角色"
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
        label="用户名"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="用户名" v-model="formParams.username"/>
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input type="password" placeholder="密码" v-model="formParams.password"/>
      </a-form-item>
      <a-form-item
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        label="用户角色"
      >
        <a-select placeholder="请选择用户角色" v-model="formParams.role_id">
          <a-select-option :value="item.id" v-for="item in lists">
            {{item.name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="邮箱"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="邮箱" v-model="formParams.email"/>
      </a-form-item>
      <a-form-item
        label="是否启用"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-switch :defaultChecked="formParams.status" v-model="formParams.status"/>
      </a-form-item>
      <!--<a-form-item-->
        <!--label="是否是超级管理员"-->
        <!--:label-col="labelCol"-->
        <!--:wrapper-col="wrapperCol"-->
      <!--&gt;-->
        <!--<a-switch :defaultChecked="formParams.is_root" v-model="formParams.is_root"/>-->
      <!--</a-form-item>-->
      <a-form-item
        label="排序"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-input placeholder="排序" v-model="formParams.listorder"/>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
export default {
  computed: {
    ...mapState({
      lists: state => state.permission.rolesLists,
    }),
  },
  name: 'AddAdmin',
  inject: ['reload'],
  props: {
    addVisible: {
      type: Boolean,
      default: false,
    },
    formParams: {
      type: Object,
      default: {},
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
    };
  },
  mounted() {
      this.getRoles();
  },
  methods: {
    ...mapActions({
      getRolesLists: 'permission/getRolesLists',
      createAdmin: 'permission/createAdmin',
      updateAdmin: 'permission/updateAdmin',
    }),
    handleOk() {
      if (this.formParams.id === undefined) {
        this.toCreate();
      }
      if (this.formParams.id > 0) {
        this.toUpdate();
      }
    },
    handleCancel() {
      this.$emit('on-change', this.visible);
    },
    toCreate() {
      this.createAdmin({formItem:this.formParams,callback:this.reload})
    },
    toUpdate() {
      this.updateAdmin({formItem:this.formParams,callback:this.reload})
    },
    getRoles() {
      this.getRolesLists({ page_size: 1000 })
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
