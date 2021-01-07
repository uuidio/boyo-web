<template>
  <div>
    <a-button type="primary" size="small" @click="handleEdit" class="mb5 mr5" v-if="hasAction('edit')"><em-icon type="icon-edit"></em-icon>编辑</a-button>
    <a-button class="em-btn-error" size="small" @click="handleDelete" v-if="hasAction('delete')"><em-icon type="icon-delete"></em-icon>删除</a-button>
  </div>
</template>
<script>
export default {
  name: 'ActionColumn',
  props: ['record', 'actions'],
  methods: {
    handleEdit() {
      this.$emit('on-edit', this.record);
    },
    handleDelete() {
      const that = this;
      this.$confirm({
        title: '提示',
        content: '确认要删除吗？',
        okText: '确认',
        okType: 'danger',
        cancelText: '取消',
        onOk() {
          that.$emit('on-delete', that.record);
        },
      });
    },
    hasAction(action) {
      if (this.actions === undefined) {
        return false;
      }
      if (this.actions.indexOf(action) >= 0) {
        return true;
      }
      return false;
    },
  },
};
</script>
<style lang="stylus" scoped>
  .em-btn-error
    color: #fff;
    background-color: #e22018;
    border-color: #e22018;
    &:hover, &:focus
      color: #e22018;
      background-color: #fff;
      border-color: #e22018;
</style>
