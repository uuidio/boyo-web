<template>
  <div class="content">
		<div class="list-nav">
		  <div class="mb10"></div>
		  <div>
				<a-input-search enterButton placeholder="请输入订单号搜素" style="width: 18rem;" @search="orderSearch"/>
		  </div>
		</div>
    <template v-if="listField&&listField.length>0">
      <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
        <a-tab-pane v-for="(item,index) in tabLists" :tab="item.tab" :key="item.key">
          <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" :pagination="false">
            <div slot="action" slot-scope="text, record">
              <a @click="seeRate(record)" class="mr10">查看</a>
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
        </a-tab-pane>
      </a-tabs>
    </template>
    <a-modal
			v-if="visible"
      title="查看评价详情"
      v-model="visible"
      @ok="handleOk"
      @cancel="cancel"
      class="rateModel"
    >
      <a-row>
        <a-col :xs="24" :md="4">
          商品评分:
        </a-col>
        <a-col :xs="24" :md="20">
          {{detail.result_text}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          评价内容:
        </a-col>
        <a-col :xs="24" :md="20">
          {{detail.content}}
        </a-col>
      </a-row>
      <a-row style="border-bottom:1px solid #e8e8e8;padding-bottom:10px">
        <a-col :xs="24" :md="4">
          评价时间:
        </a-col>
        <a-col :xs="24" :md="20">
          {{detail.created_at}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          卖家回复:
        </a-col>
        <a-col v-if="detail.reply_content" :xs="24" :md="20">
          {{detail.reply_content}}
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="4">
          回复时间:
        </a-col>
        <a-col :xs="24" :md="20">
          {{detail.updated_at}}
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const tabLists = [
  { tab: '全部', key: 0, result:''},
  { tab: '好评', key: 1, result:'good'},
  { tab: '中评', key: 2, result:'neutral'},
  { tab: '差评', key: 3, result:'bad'}];	

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.trade.ratelists,
      listField: state => state.trade.ratefields,
      pages: state => state.trade.ratePages,
      detail: state => state.trade.ratedetail,
    }),
  },
  data() {
    return {
			tabLists,
      visible: false,
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'trade/rateLists',
      getRateDetail: 'trade/getRateDetail',
    }),
		orderSearch(value) {
			this.fetchLists({
				tid: value,
				page: 1,
			});
		},
    handleOk() {
			this.visible = false
    },
    cancel() {
    },
    seeRate(item) {
			console.log(this.detail);
      this.getRateDetail({
        id: item.id,
      });
      this.visible = true;
    },
		onGetData(key) {
		  this.status = key;
		  const status = key;
		  if (key === 0) {
		    this.fetchLists({
		      items: { page: 1 },
		    });
		  } else {
		    this.fetchLists({
		      result: this.tabLists[key].result,
		      items: { page: 1 },
		    });
		  }
		},
    pageChange(page) {
      this.fetchLists({page: page});
    },
  },
  mounted() {
    this.fetchLists();
  },
};
</script>

<style scoped lang="stylus">
  .ant-row
    margin-bottom 10px
	.list-nav
	  display flex
	  justify-content space-between
	  flex-wrap wrap
</style>
