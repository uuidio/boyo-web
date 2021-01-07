<template>
  <div class="content">
    <div>
      <div class="list-nav">
        <div class="mb20">
          <search @search="getSearch" @export="exportTable"></search>
        </div>
        <div class="mb10">
          <Button class="mr10" type="success" icon="md-arrow-round-up" @click="handleGoodsState(1)">上架商品</Button>
          <Button class="mr10" type="warning" icon="md-arrow-round-down" @click="handleGoodsState(0)">下架商品</Button>
         <Button class="mr10" type="success" icon="md-arrow-round-up" @click="handleGoodsPrice(1)">批量显示市场价</Button>
          <Button class="mr10" type="warning" icon="md-arrow-round-down" @click="handleGoodsPrice(0)">批量隐藏市场价</Button>
        </div>
<!--        <div>-->
<!--          <a-input-search-->
<!--            style="width: 18rem;"-->
<!--            placeholder="输入商品关键字搜索"-->
<!--            @search="onSearch"-->
<!--            enterButton-->
<!--          />-->
<!--        </div>-->
      </div>
      <div v-if="listField&&listField.length>0">
        <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
          <a-tab-pane  v-for="(item) in tabLists" :tab="item.tab" :key="item.key">
            <a-table :scroll="{x:1500,y:700}"  rowKey="id" :rowSelection="{ selectedRowKeys: selectList, onChange: onChange }"   :columns="listField" :dataSource="listData"
                     :pagination="false"
            >
              <a slot="goods_image" target="_blank" :href="text" slot-scope="text">
                <img style="height:50px" :src="text" alt="">
              </a>
              <div slot="goods_state" slot-scope="text">
                <a-tag v-if="text==0" color="#f90">下架</a-tag>
                <a-tag v-else-if="text==1" color="#87d068">上架</a-tag>
                <a-tag v-else-if="text==10" color="#f50">禁售</a-tag>
              </div>
              <div slot="action" slot-scope="text,item">
                <a-button class="mr10" @click="edit(item)" size="small" type="primary">
                  编辑
                </a-button>
                <a-button size="small" @click="del(item)" type="danger">
                  删除
                </a-button>
                <a-button class="mr10" @click="quicklyEdit(item)" size="small" type="primary" style="margin-top:10px">
                  快捷编辑
                </a-button>
              </div>
            </a-table>
          </a-tab-pane>
        </a-tabs>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :pageSize="pages.per_page"
            :defaultCurrent="1"
            @change="pageChange"
          />
        </div>
        <a-modal  title="快捷编辑" v-model="editVisible" @ok="editHandleOk" width="80%">
          <sku  v-if="editVisible"></sku>
        </a-modal>
      </div>
    </div>
  </div>
</template>
<script>
import { Button } from 'iview';
import { mapState, mapActions } from 'vuex';
import helper from '@/utils/helper';
// import { getArrayFilterKey } from '@/utils/tools';
// import Server from '@/config/server';
// import fetch from '@/api/fetch';
// import http from '@/api/http';
import search from '../compontents/search';
import sku from '../compontents/skuitem';

const tabLists = [
  { tab: '全部', key: 0, goods_state: '' },
  { tab: '已上架', key: 1, goods_state: 1 },
  { tab: '已下架', key: 2, goods_state: 0 },
  { tab: '已禁售', key: 3, goods_state: 10 },
];

export default {
  computed: {
    ...mapState({
      listData: state => state.goods.lists,
      listField: state => state.goods.fields,
      pages: state => state.goods.pages,
      goodItemSku: state => state.goods.goodItemSku,
      exportData: state => state.trade.exportData,
    }),
  },
  components: {
    Button,
    search,
    sku,
  },
  data() {
    return {
      gc_id: '',
      gc_id_1: '',
      gc_id_2: '',
      good_id: '',
      store_id: '',
      tabLists,
      selectList: [],
      keyword: false,
      current: 1,
      state: '',
      pagination: {},
      initData: {},
      editVisible: false,
      skuObj: {},
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'goods/fetchLists',
      updateGoodsState: 'goods/updateGoodsState',
      deleteRow: 'goods/deleteRow',
      updateGoodsPrice: 'goods/updateGoodsPrice',
      getGoodSku: 'goods/getGoodSku',
      updateGoodItemSku: 'goods/updateGoodItemSku',
      exportFilter: 'trade/exportGood',
    }),
    getSearch(item) {
      this.keyword = item.keyword;
      this.gc_id_3 = item.gc_id_3;
      this.gc_id_1 = item.gc_id_1;
      this.gc_id_2 = item.gc_id_2;
      this.good_id = item.good_id;
      this.store_id = item.store_id;
      this.current = 1;
      this.fetchLists({
        obj: {
          goods_state: this.goodsState,
          keyword: item.keyword,
          page: 1,
          gc_id_1: item.gc_id_1,
          gc_id_2: item.gc_id_2,
          gc_id_3: item.gc_id_3,
          good_id: item.good_id,
          store_id: item.store_id,
        },
      });
    },
    exportTable(item) {
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
        // page: 1,
        gc_id_1: item.gc_id_1,
        gc_id_2: item.gc_id_2,
        gc_id_3: item.gc_id_3,
        good_id: item.good_id,
        store_id: item.store_id,
      };
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
      const tHeader = TableData.goods.tHeader;
      const filterVal = TableData.goods.filterVal;
      const list = TableData.goods.list;
      const data = this.formatJson(filterVal, list);
      import('@/vendor/Export2Excel').then((excel) => {
        excel.export_json_to_excel({
          header: tHeader, // 表头 必填
          data, // 具体数据 必填
          filename: '门店端商品列表', // 非必填
          autoWidth: true, // 非必填
          bookType: 'xlsx', // 非必填
        });
      });
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    // onSearch(val) {
    //   this.keyword = val;
    //   this.current = 1;
    //   this.fetchLists({
    //     obj: {
    //       page: this.current,
    //       keyword: this.keyword,
    //     },
    //   });
    // },
    onGetData(key) {
      this.state = this.tabLists[key].goods_state;
      this.fetchLists({
        obj: {
          goods_state: this.state,
          page: 1,
          gc_id_1: this.gc_id_1,
          gc_id_2: this.gc_id_2,
          gc_id_3: this.gc_id_3,
          good_id: this.good_id,
          store_id: this.store_id,
        },
      });
    },
    pageChange(page) {
      this.current = page;
      if (this.keyword) {
        this.fetchLists({
          obj: {
            goods_state: this.state,
            page: this.current,
            keyword: this.keyword,
            gc_id_1: this.gc_id_1,
            gc_id_2: this.gc_id_2,
            gc_id_3: this.gc_id_3,
            store_id: this.store_id,
          },
        });
      } else {
        this.fetchLists({
          obj: {
            goods_state: this.state,
            page: this.current,
            gc_id_1: this.gc_id_1,
            gc_id_2: this.gc_id_2,
            gc_id_3: this.gc_id_3,
            good_id: this.good_id,
            store_id: this.store_id,
          },
        });
      }
    },
    handleGoodsState(state) {
      if (this.selectList.length === 0) {
        helper.showError('请选择商品');
        return null;
      }
      this.updateGoodsState({
        params: { goods_ids: this.selectList, state },
        collback: this.PageCollback,
      });
    },
    handleGoodsPrice(status) {
      if (this.selectList.length === 0) {
        helper.showError('请选择商品');
        return null;
      }
      this.updateGoodsPrice({
        params: { goods_ids: this.selectList, status }, collback: this.PageCollback,
      });
    },
    PageCollback() {
      this.fetchLists({
        obj: {
          page: this.current,
        },
      });
    },
    edit(item) {
      const jumpUrl = `/goods/edit/${item.id}`;
      // const jumpUrl = `/goods/addSelectClass/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
    del(param) {
      if (confirm('确定要删除该数据？')) {
        this.deleteRow({ param, listData: this.listData });
      }
    },
    onChange(selectedRowKeys) {
      // this.selectList = getArrayFilterKey(selectedRows, 'id');
      this.selectList = selectedRowKeys;
    },
    quicklyEdit(item) {
      this.skuObj.id = item.id;
      this.skuObj.shop_id = item.shop_id;
      if (!item.spec_name) {
        this.skuObj.type = 1;
      }
      this.getGoodSku({ id: item.id });
      this.editVisible = true;
    },
    editHandleOk() {
      this.editVisible = false;
      const param = this.goodItemSku;
      param.good_id = this.good_sku_id;
      // console.log('更新sku', param);
      this.skuObj.spec = param.sku;
      // console.log('更新sku2', this.skuObj);
      this.updateGoodItemSku(this.skuObj);
    },
    getSkuItem(item) {
      // console.log('更新sku', item);
      this.skuObj = item;
    },
  },
  mounted() {
    this.fetchLists({
      obj: {
        page: this.current,
      },
    });
  },
  watch: {
    exportData() {
      this.orderCallback();
    },
  },
};
</script>
<style scoped lang="stylus">
  >>> .ant-table
    font-size 12px

  >>> .ant-table-thead > tr > th, >>> .ant-table-tbody > tr > td
    padding 12px

  .list-nav
    /*display flex*/
    /*justify-content space-between*/
    /*flex-wrap wrap*/
</style>
