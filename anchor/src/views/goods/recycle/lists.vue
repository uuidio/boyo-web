<template>
  <div class="content">
    <div>
      <div class="list-nav">
        <div>
          <Button class="mr10" type="success" icon="md-arrow-round-up" @click="restore">恢复商品</Button>
          <Button class="mr10" type="error" icon="ios-trash-outline" @click="del">永久删除商品</Button>
        </div>
        <!-- 				<div>
                            <a-input-search
                            style="width:300px"
                            placeholder="输入商品关键字搜索"
                            @search="onSearch"
                            enterButton
                            />
                        </div> -->
      </div>
      <template v-if="listField&&listField.length>0">
        <a-table :scroll="{x:1100,y:700}" :rowSelection="{onChange:onChange}" :columns="listField" :dataSource="listData" :pagination="false">
          <a slot="goods_image" target="_blank" :href="text" slot-scope="text">
            <img style="height:50px" :src="text" alt="">
          </a>
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
  </div>
</template>
<script>
import { Button } from 'iview';
import { mapState, mapActions } from 'vuex';
import helper from '@/utils/helper';
import { getArrayFilterKey } from '@/utils/tools';

export default {
  components: {
    Button,
  },
  data() {
    return {
      selectList: [],
      keyword: false,
      current: 1,
      pagination: {},
    };
  },
  computed: {
    ...mapState({
      listField: state => state.goods.RecycleFields,
      listData: state => state.goods.RecycleLists,
      pages: state => state.goods.RecyclePages,
    }),
  },
  methods: {
    ...mapActions({
      fetchLists: 'goods/getRecycleLists',
      restoreGoods: 'goods/restoreGoods',
      deleteGoods: 'goods/deleteGoods',
    }),
    onSearch(val) {
      this.keyword = val;
      this.current = 1;
      this.fetchLists({
        obj: {
          page: this.current,
          keyword: this.keyword,
        },
      });
    },
    pageChange(page) {
      this.current = page;
      if (this.keyword) {
        this.fetchLists({
          obj: {
            page: this.current,
            keyword: this.keyword,
          },
        });
      } else {
        this.fetchLists(page);
      }
    },
    // 恢复商品
    restore() {
      if (this.selectList.length === 0) {
        alert('请先勾选商品！');
      } else if (confirm('确定要恢复选中的商品吗？')) {
        this.restoreGoods({
          ids: this.selectList,
        });
      }
    },
    del(param) {
      if (this.selectList.length === 0) {
        alert('请先勾选商品！');
      } else if (confirm('确定要永久删除选中的商品吗？该操作不可恢复')) {
        this.deleteGoods({
          ids: this.selectList,
        });
      }
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectList = getArrayFilterKey(selectedRows, 'id');
      console.log(this.selectList);
    },
  },
  mounted() {
    this.fetchLists({
      obj: {
        page: this.current,
      },
    });
  },
};
</script>
<style scoped lang="stylus">
  // >>> .ant-table
  //   font-size 12px
  //
  // >>> .ant-table-thead > tr > th, >>> .ant-table-tbody > tr > td
  //   padding 12px
  //
  // .list-nav
  //   display flex
  //   justify-content space-between
</style>
