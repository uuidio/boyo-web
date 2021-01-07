<template>
  <div class="content">
    <div class="mb20">
      <div class="list-nav fxBox2">
        <div>
          <a-button
            type="primary"
            @click="download"
            icon="download"
          >导出</a-button>
        </div>
        <div>
          <a-input-search enterButton v-model="formItem.mobile" placeholder="请输入手机号搜素" style="width: 18rem;" @search="toSearch"/>
        </div>
      </div>
    </div>
    <template v-if="listsData&&listsData.length>0">
      <a-table :scroll="{ x: 1600,y:700 }"
               :columns="listField"
               :dataSource="listsData"
               :pagination="false"
      >
        <div slot="action" slot-scope="text, item">
          <a href="javascript:;" @click="goDetails(item)">查看</a>
        </div>
      </a-table>

      <div class="pageBox" v-if="listsData.length !== 0">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          v-model="formItem.page"
          @change="pageChange"
        />
      </div>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  computed: {
    ...mapState({
      listsData: state => state.point.exchangeCoinList,
      pages: state => state.point.exchangeCoinPages,
      listField: state => state.point.exchangeCoinField,
      exportData: state => state.point.exportData,
    }),
  },
  data() {
    return {
      formItem: {
        page: 1,
        mobile: '',
      },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'point/getExchangeCoinList',
      exportFilter: 'point/exportRefundsGood',
      getDownload: 'point/getDownload',
    }),
    pageChange(page) {
      this.formItem.page = page;
      this.fetchLists(this.formItem);
    },
    formatJson(filterVal, jsonData) {
      return jsonData.map(v => filterVal.map(j => v[j]));
    },
    goDetails(item) {
      const jumpUrl = `/trade/afterSales/detail/${item.aftersales_bn}`;
      const routeData = this.$router.resolve({ path: jumpUrl });
      window.open(routeData.href, '_blank');
      // this.$router.push({ path: jumpUrl });
    },
    download() {
      this.getDownload(this.excelBack);
    },
    excelBack() {
      const that = this;
      setTimeout(() => {
        const jumpUrl = '/statistics/downLoadList';
        const routeData = that.$router.resolve({ path: jumpUrl });
        window.open(routeData.href, '_blank');
      }, 1000);
      // this.$router.push({path:'/statistics/downLoadList'});
    },
    toSearch() {
      this.fetchLists(this.formItem);
    },
  },
  mounted() {
    this.fetchLists(this.formItem);
  },
  watch: {
  },
};
</script>

<style scoped>
  .list-nav {
    display: flex;
    justify-content: space-between;
  }
  .list-nav button {
    margin-right: 20px;
  }
</style>
