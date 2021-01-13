<template>
    <div class="mr24">
		<a-card>
			<div class="mb10">
				<a-row type="flex" justify="space-around">
					<a-col :label-col="{ md: 6,xs:24 }" :wrapper-col="{ md: 18,xs:24 }" v-for="item in tagLists" :key="item.key">
						<a-card class="cards" :bordered="false" :style="'background:' + item.bg_color">
							<h2 class="cards_title">{{item.cards_title}}</h2>
							<template v-if="item.is_type === 0">
								<h2 class="cards_number">￥0.00</h2>
								<h2 class="cards_text">上周同期￥0.00</h2>
							</template>
							<template v-else>
								<h2 class="cards_number">0</h2>
								<h2 class="cards_text">上周同期0</h2>
							</template>
						</a-card>
					</a-col>
				</a-row>
			</div>
			<a-tabs :defaultActiveKey="0"><!-- @tabClick="onGetData" -->
				<a-tab-pane v-for="item in tabLists" :tab="item.tab" :key="item.key">
						<!-- <a-button icon="download" type="primary" slot="title">导出</a-button> -->
						<a-table :scroll="{x:1100,y:700}" :pagination="false" :columns="columns" :dataSource="data">
							<div slot="zdsj" slot-scope="text,item">
								 <p>{{item.zdsj.ks}}~{{item.zdsj.js}}</p>
							</div>
							<div slot="action" slot-scope="text,item">
								<div><a href="javacript:;">操作1</a></div>
							</div>
						</a-table>
				</a-tab-pane>
			</a-tabs>
		</a-card>
    </div>
</template>

<script>
	const tabLists = [
		{ tab: '新添订单金额', key: 0, },
		{ tab: '新添订单数', key: 1, },
		{ tab: '平均单价', key: 2, },
		{ tab: '已付款订单金额', key: 3, },
		{ tab: '已完成订单数', key: 4, },
		{ tab: '待发货订单数', key: 5, },
		{ tab: '已发货订单数', key: 6, },
		{ tab: '已取消订单数', key: 7, },
	];
	const tagLists = [
		{ cards_title: '新添订单金额（￥）',is_type: 0, key: 0, bg_color:'#20abd6' },
		{ cards_title: '新添订单数（笔）',is_type: 1, key: 1, bg_color:'#189458' },
		{ cards_title: '平均单价（￥）',is_type: 0, key: 2, bg_color:'#df8d1d' },
		{ cards_title: '已付款订单数（笔）',is_type: 1, key: 3, bg_color:'#e06754' },
		{ cards_title: '已发货订单数（笔）',is_type: 1, key: 4, bg_color:'#c95361' },
	];
  const columns=[
    {
      title:'账单时间',
      dataIndex:'zdsj',
      scopedSlots: { customRender: 'zdsj' },
    },
    {
      title:'账单编号',
      dataIndex:'bh'
    },
    {
      title:'订单数量',
      dataIndex:'sl'
    },{
      title:'商品款',
      dataIndex:'qian'
    },
    {
      title:'操作',
      dataIndex:'action',
      scopedSlots: { customRender: 'action' }
    }
  ];
  const data = [
    {
      zdsj:{
        ks:'2010-01-01',
        js:'2011-03-01'
      },
      bh:'123456',
      sl:'12342',
      qian:'2334.212'
    }
  ];
    export default {
        name: "statement",
        data(){
          return{
						tabLists,
						tagLists,
            columns,
            data,
            visible:false
          }
        },
				filters: {
					money(value) {
						if (!value) return ''
						value = value.toString()
						return value.charAt(0).toUpperCase() + value.slice(1)
					}
				},
        methods:{
          onClose(){
            this.visible = false
          },
        }
    }
</script>

<style scoped lang="stylus">
.drawerBox
  margin-bottom 20px
.cards
	width 250px
	color #fff
	h2
		font-size 1em
		color #fff
	.cards_title
		color #f9f4f0
	.cards_number
		font-weight bold
		font-size 2rem
	.cards_text
		color rgba(255,255,255,.7)
</style>
