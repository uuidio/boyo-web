<template>
  <div class="content">
		<div class="list-nav">
		  <div class="mb10"></div>
		  <div>
		    <a-input-search enterButton placeholder="请输入订单号搜索" style="width: 22rem;" @search="orderSearch"/>
		  </div>
		</div>
	<div class="total"><span v-for="(item,index) in total_data" :key="index" class="span">{{item.title+': '}}<span class="text">{{item.value}}</span></span></div>
	<template v-if="listField&&listField.length>0">
    <a-tabs @tabClick="onGetData" :defaultActiveKey="0">
      <a-tab-pane v-for="(item,index) in tabLists" :tab="item.tab" :key="item.key">
        <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :pagination="false">
          <div slot="refunds_status_text" slot-scope="text,item">
            <span :class="item.refunds_status==='SUCCESS'?'green'
            :item.refunds_status==='WAIT_CHECK'?'yellow'
            :item.refunds_status==='WAIT_REFUND'?'blue'
            :'red'">
              {{text}}
            </span>
          </div>
          <div slot="action" slot-scope="text,item">
            <a href="javascript:;" @click="goDetails(item)">查看</a>
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

const tabLists = [
  { tab: '全部', key: 0, status:''},
  { tab: '等待审核', key: 1, status:'WAIT_CHECK'},
  { tab: '等待退款', key: 2, status:'WAIT_REFUND'},
  { tab: '门店审核不通过', key: 3, status:'SHOP_CHECK_FAILS'},
  { tab: '退款失败', key: 4, status:'FAILS'},
	{ tab: '退款成功', key: 5, status:'SUCCESS'}];

import { mapState, mapActions } from 'vuex';

export default {
  name: 'cancelorder',
  computed: {
    ...mapState({
      listData: state => state.trade.cancelLists,
      listField: state => state.trade.cancelHead,
	  pages: state => state.trade.cancelPage,
	  total_data:state => state.trade.total_fee_data,
    }),
  },
  data() {
    return {
			tabLists,
			status: 0,
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
    goDetails(item) {
      const jumpUrl = `/trade/order/canceldetail/${item.tid}`;
			let routeData = this.$router.resolve({ path: jumpUrl });
			window.open(routeData.href, '_blank');
      // this.$router.push({ path: jumpUrl });
    },
    pageChange(page) {

	//   this.cancelLists( {refunds_status: this.tabLists[this.status].status,
	// 	      items: { page: page },})
	 this.cancelLists( {refunds_status: this.tabLists[this.status].status,
		      page: page })

    },
  },
  mounted() {
    this.cancelLists();
  },
};
</script>

<style scoped lang="stylus">
  .green
    color #52c41a

  .blue
    color #46a6ff

  .red
    color red

  .yellow
    color rgb(255, 199, 0)
	.list-nav
		display flex
		justify-content space-between
		flex-wrap wrap
  .order-item
    display flex

    div
      img
        height 60px

      .item_num
        display inline-block
        padding 1px 4px
        background #52c41a
        border-radius 10px
        color #fff
	.total
		text-align right
		.span
			margin-right 20px
			font-size 14px
			.text
				font-weight 600
				color #4c4949
</style>
