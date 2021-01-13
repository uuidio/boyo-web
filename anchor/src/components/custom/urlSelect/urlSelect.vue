<template>
  <div>
    <span>{{selectName}}</span>
    <a-dropdown>
      <a class="ant-dropdown-link" href="#">
        选择跳转的页面
        <a-icon type="down"/>
      </a>
      <a-menu slot="overlay">
        <a-menu-item v-for="(item,index) in items" :key="index">
          <a  @click="getItem(item.title)" href="javascript:;">{{item.title}}</a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>

<script>
export default {
  data() {
    return {
      items: [{
        title: '分类',
      },
      {
        title: '商品',
      }],
      selectName: '',
    };
  },
  props: {
    linkItem: String,
    linkIndex: Number,
  },
  watch: {
    linkItem() {
      this.selectName = this.linkItem;
    },
  },
  methods: {
    getItem(item) {
      this.selectName = item;
      this.$emit('getLink', { link:item, index: this.linkIndex });
    },
  },
  mounted() {
  },
};
</script>

<style scoped>

</style>
