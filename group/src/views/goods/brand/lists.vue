<template>
  <div class="content">
    <div class="mb20 operation-box" >
      <a-form layout="inline" style="flex: 1;">
        <a-row>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="品牌选择"
            :label-col="{xs:{span: 24},md:{span:6}}"
            :wrapper-col="{xs:{span: 24},md:{span:16}}"
          >
            <a-select showSearch :filterOption="filterOption" v-model="getItem.brand_name" @change="test" placeholder="请选择店铺"  allowClear>
              <a-select-option v-for="(item) in brandListData" :value="item.brand_name">{{item.brand_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            :label-col="{xs:{span: 24},md:{span:5}}"
            :wrapper-col="{xs:{span: 24},md:{span:16}}"
          >
            <a-button type="primary" @click="sltBrand">搜索</a-button>
          </a-form-item>
        </a-col>
      </a-row>
      </a-form>
      <router-link to="/goods/brand/add">
        <a-button type="primary" icon="plus">添加品牌</a-button>
      </router-link>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
        <a slot="brand_logo" target="_blank" :href="text" slot-scope="text">
          <img style="height:50px" :src="text" alt="">
        </a>
        <div slot="action" slot-scope="text,item">
          <a @click="edit(item)" class="mr10">编辑</a>
          <a @click="del(item)" class="col-red">删除</a>
        </div>
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
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.brand.lists,
      listField: state => state.brand.fields,
      pages: state => state.brand.pages,
      brandListData: state => state.brand.sltLists,
    }),
  },
  data() {
    return {
      getItem: {
        page: 1,
        brand_name: '',
      },
    };
  },
  methods: {
    ...mapActions({
      fetchBrandLists: 'brand/sltBrandLists',
      fetchLists: 'brand/fetchLists',
      delBrand: 'brand/delBrand',
    }),
    sltBrand() {
      this.getLists();
    },
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    pageChange(page) {
      this.getItem.page = page
      this.getLists();
    },
    edit(item) {
      const goLink = `/goods/brand/edit/${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
    del(item) {
      if (confirm('确认删除此数据？')) {
        this.delBrand({
          id: item.id,
        });
      }
    },
    getLists(){
      const params = this.getItem
      this.fetchLists(params);
    }
  },
  mounted() {
    this.getLists()
    this.fetchBrandLists({
      per_page: 1000000,
      is_open: 1,
    });
  },
};
</script>

<style lang="stylus" scoped>
  .operation-box
    display flex
    align-items center
    justify-content space-between
  >>>.ant-form-item
    width: 100%
    .ant-form-item-label
      text-align left
</style>
