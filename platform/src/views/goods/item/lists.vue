<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb20">
        <search @search="getSearch" @export="exportTable"></search>
      </div>
      <div class="mb10">
        <Button class="mr10" type="success" icon="md-arrow-round-up" @click="handleGoodsState(1)">上架商品</Button>
        <Button class="mr10" type="warning" icon="md-arrow-round-down" @click="handleGoodsState(0)">下架商品</Button>
        <Button class="mr10" type="error" icon="md-close" @click="handleGoodsState(10)">禁售商品</Button>
        <Button class="mr10" type="info" icon="md-checkmark" @click="handleGoodsState(0)">解除禁售</Button>
      </div>
    </div>
    <template v-if="listField&&listField.length>0">
      <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
        <a-tab-pane v-for="(item) in tabLists" :tab="item.tab" :key="item.key">
          <a-table :scroll="{ x: 1100,y:700 }" rowKey="id" :rowSelection="{ selectedRowKeys: selectList, onChange: onChange }" :columns="listField" :dataSource="listData" :pagination="false">
            <a slot="goods_image" target="_blank" :href="text" slot-scope="text">
              <img style="height:50px" :src="text" alt="">
            </a>
            <div slot="goods_state" slot-scope="text">
              <a-tag v-if="text==0" color="#f90">下架</a-tag>
              <a-tag v-else-if="text==1" color="#87d068">上架</a-tag>
              <a-tag v-else-if="text==10" color="#f50">禁售</a-tag>
              <a-tag v-else-if="text==20" color="#929292">删除</a-tag>
            </div>
          </a-table>
          <div class="pageBox">
            <a-pagination
              :total="pages.total"
              :showTotal="total => `共 ${total} 条数据`"
              :pageSize="formItem.per_page"
              :defaultCurrent="1"
              @change="pageChange"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </template>
  </div>
</template>
<script>
import { Button } from 'iview';
import { mapState, mapActions } from 'vuex';
import helper from '@/utils/helper';
// import { getArrayFilterKey } from '@/utils/tools';
import search from '../components/search';

const tabLists = [
  { tab: '全部', key: 0, goods_state: '' },
  { tab: '已上架', key: 1, goods_state: 1 },
  { tab: '已下架', key: 2, goods_state: 0 },
  { tab: '已禁售', key: 3, goods_state: 10 },
  { tab: '已删除', key: 4, goods_state: 20 },
  // { tab: '自营商品', key: 5, },
];

export default {
  computed: {
    ...mapState({
      listData: state => state.goods.lists,
      listField: state => state.goods.fields,
      pages: state => state.goods.pages,
      exportData: state => state.trade.exportData,
    }),
  },
  components: {
    Button,
    search,
  },
  data() {
    return {
      shop_id: '',
      gc_id: '',
      gc_id_1: '',
      gc_id_2: '',
      store_id: '',
      good_id: '',
      tabLists,
      keyword: '', // 搜索内容
      goodsState: '', // 选项卡的商品状态
      formItem: {
        page: 1,
        per_page: 15,
      },
      state: 0,
      selectList: [],
      selectedRowKeys: [],
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'goods/fetchLists',
      updateGoodsState: 'goods/updateGoodsState',
      delGoods: 'goods/delGoods',
      exportFilter: 'trade/exportGood',
    }),
    getSearch(item) {
      this.shop_id = item.shop_id;
      this.keyword = item.keyword;
      this.gc_id_3 = item.gc_id_3;
      this.gc_id_1 = item.gc_id_1;
      this.formItem.page = 1;
      this.gc_id_2 = item.gc_id_2;
      this.good_id = item.good_id;
      this.store_id = item.store_id;
      this.current = 1;
      this.fetchLists({
        goods_state: this.goodsState,
        keyword: item.keyword,
        page: 1,
        per_page: this.formItem.per_page,
        shop_id: item.shop_id,
        gc_id_1: item.gc_id_1,
        gc_id_2: item.gc_id_2,
        gc_id_3: item.gc_id_3,
        good_id: item.good_id,
        store_id: item.store_id,
      });
    },
    exportTable(item) {
      this.shop_id = item.shop_id;
      this.keyword = item.keyword;
      this.gc_id_3 = item.gc_id_3;
      this.gc_id_1 = item.gc_id_1;
      this.gc_id_2 = item.gc_id_2;
      this.good_id = item.good_id;
      this.store_id = item.store_id;
      this.current = 1;
      const exportForm = {
        goods_state: this.goodsState,
        keyword: item.keyword,
        shop_id: item.shop_id,
        gc_id_1: item.gc_id_1,
        gc_id_2: item.gc_id_2,
        gc_id_3: item.gc_id_3,
        good_id: item.good_id,
        store_id: item.store_id,
      }
      this.exportFilter({ exportForm, callback: this.excelBack });
    },
    excelBack() {
      const that = this;
      setTimeout(() => {
        const jumpUrl = '/statistics/downLoadList';
        const routeData = that.$router.resolve({ path: jumpUrl });
        window.open(routeData.href, '_blank');
      }, 1000);
    },

    orderCallback() {
      this.exportPathMethodExcel(this.exportData);
    },
    exportPathMethodExcel(TableData) {
      this.$success({
        title: '温馨提示！',
        content: '数据正在导出,请稍后查看下载目录！',
      });
      console.log('11', TableData);
      const tHeader = TableData.goods.tHeader;
      const filterVal = TableData.goods.filterVal;
      const list = TableData.goods.list;
      const data = this.formatJson(filterVal, list);
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '品牌端商品列表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    handleGoodsState(state) {
      const that = this;
      if (this.selectList.length === 0) {
        helper.showError('请选择商品');
        return null;
      }
      this.$confirm({
        title: '提示',
        content: '您确定要这样做吗？',
        onOk() {
          that.updateGoodsState({
            params: { goods_ids: that.selectList, state }, collback: that.PageCollback,
          });
        },
        onCancel() {},
        class: 'test',
      });
    },
    PageCollback() {
      this.fetchLists({
        obj: {
          page: this.current,
        },
      });
    },
    del() {
      if (this.selectList.length === 0) {
        helper.showError('请选择商品');
        return null;
      }
      this.delGoods({
        id: this.selectList,
      });
    },
    onGetData(key) {
      this.goodsState = this.tabLists[key].goods_state;
      if (key < 5) {
        this.fetchLists({
          goods_state: this.goodsState,
          page: 1,
          per_page: this.formItem.per_page,
          shop_id: this.shop_id,
          gc_id_1: this.gc_id_1,
          gc_id_2: this.gc_id_2,
          gc_id_3: this.gc_id_3,
          good_id: this.good_id,
          store_id: this.store_id,
        });
      } else {
        helper.showError('自营商品该功能完善中，请勿使用！');
      }
    },
    pageChange(page) {
      this.formItem.page = page;
      if (!this.keyword == '') {
        this.fetchLists({
          goods_state: this.goodsState,
          page,
          per_page: this.formItem.per_page,
          keyword: this.keyword,
          shop_id: this.shop_id,
          gc_id_1: this.gc_id_1,
          gc_id_2: this.gc_id_2,
          gc_id_3: this.gc_id_3,
          good_id: this.good_id,
          store_id: this.store_id,
        });
      } else {
        this.fetchLists({
          goods_state: this.goodsState,
          page,
          per_page: this.formItem.per_page,
          shop_id: this.shop_id,
          gc_id_1: this.gc_id_1,
          gc_id_2: this.gc_id_2,
          gc_id_3: this.gc_id_3,
          good_id: this.good_id,
          store_id: this.store_id,
        });
      }
    },
    onChange(selectedRowKeys) {
    //   for (let i = 0; i < selectedRows.length; i++) {
    //     if (this.selectList.indexOf(selectedRows[i].id) === -1) {
    //       this.selectList.push(selectedRows[i].id);
    //     }
    //   }
      this.selectList = selectedRowKeys;
    },
    initSelect() {
      this.selectedRowKeys = [];
      const data = this.listData;
      const ids = this.selectList;
      for (let i = 0; i < data.length; i++) {
        if (ids.indexOf(data[i].id) !== -1) {
          this.selectedRowKeys.push(i);
        }
      }
    },
  },
  watch: {
    listData() {
      this.initSelect();
    },
    exportData() {
      this.orderCallback();
    },
  },
  mounted() {
    this.fetchLists(this.formItem);
  },
};
</script>
<style lang="stylus" scoped>
  .list-nav {
    /*display flex*/
    /*justify-content space-between*/
    /*flex-wrap wrap*/
  }
</style>
