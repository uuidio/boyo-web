<template>
  <div class="content">
    <div class="list-nav">
      <div class="mb10"></div>
      <div>
        <a-input-search enterButton placeholder="请输入订单号搜素" style="width: 18rem;" @search="orderSearch"/>
      </div>
    </div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="fieldsData&&fieldsData.length>0">
    <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
      <a-tab-pane v-for="(item,index) in tabLists" :tab="item.tab" :key="item.key">
        <a-table :scroll="{ x: 1100,y:700 }" class="mr10" :columns="fieldsData" :dataSource="listsData" :pagination="false">
          <!-- 					<div slot="action">
                              <a href="###">操作</a>
                              </div> -->
          <div slot="refunds_status_text" slot-scope="text,item">
						<span :class="item.refunds_status==='SUCCESS'?'green'
						:item.refunds_status==='WAIT_CHECK'?'yellow'
						:item.refunds_status==='WAIT_REFUND'?'blue'
						:'red'">
							{{text}}
						</span>
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
  </div>
</template>

<script>

import { mapState, mapActions } from 'vuex';

const tabLists = [
  { tab: '全部', key: 0, status: '' },
  { tab: '等待审核', key: 1, status: 'WAIT_CHECK' },
  { tab: '等待退款', key: 2, status: 'WAIT_REFUND' },
  { tab: '商家审核不通过', key: 3, status: 'SHOP_CHECK_FAILS' },
  { tab: '退款失败', key: 4, status: 'FAILS' },
  { tab: '退款成功', key: 5, status: 'SUCCESS' }];


export default {
  name: 'aftersales',
  data() {
    return {
      tabLists,
    };
  },

  methods: {
    ...mapActions({
      cancelLists: 'trade/cancelLists',
    }),
    orderSearch(value) {
      this.cancelLists({
        tid: value,
        page: 1,
      });
    },
    onGetData(key) {
      this.status = key;
      const status = key;
      if (key === 0) {
        this.cancelLists({
          items: { page: 1 },
        });
      } else {
        this.cancelLists({
          refunds_status: this.tabLists[key].status,
          items: { page: 1 },
        });
      }
    },
    pageChange(page) {
      this.cancelLists({ page });
    },
  },
  computed: {
    ...mapState({
      listsData: state => state.trade.cencelData,
      fieldsData: state => state.trade.cancelFields,
	  pages: state => state.trade.cancelPages,
	  total_data:state => state.trade.total_fee_data,
    }),
  },
  mounted() {
    this.cancelLists(1);
  },
};
</script>

<style scoped lang="stylus">
	.list-nav
		display flex
		justify-content space-between
		flex-wrap wrap
  	.total
		text-align right
		.span
			margin-right 20px
			font-size 14px
			.text
				font-weight 600
				color #4c4949
</style>
