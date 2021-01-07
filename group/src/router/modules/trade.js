import { PageView } from '@/components/layouts';

export default {
  path: '/trade',
  component: PageView,
  name: 'trade',
  redirect:'/trade/lists',
  meta: {
    title: '交易',
    icon: 'icon-trade',
  },
  children: [
    {
      path: '/trade/lists',
      name: 'trade_lists',
      component: () => import('@/views/trade/order/lists'),
      meta: {
        auth: true,
        title: '订单列表',
      },
	},
	{
		path: '/payorder/list',
		name: 'payorder.list',
		component: () => import('@/views/trade/payorder/lists'),
		meta: {
			auth: true,
			title: '支付订单列表',
		},
	  },
	  {
		path: '/dailysale/list',
		name: 'dailysale.list',
		component: () => import('@/views/trade/dailysale/list'),
		meta: {
			auth: true,
			title: '销售日报列表',
		},
	  },
	  {
		path: '/cancelorder/lists',
		name: 'cancelorder',
		component: () => import('@/views/trade/cancelOrder/lists'),
		meta: {
		  auth: true,
		  title: '取消订单列表',
		},
	  },
	  {
		path: '/aftersales/lists',
		name: 'aftersales',
		component: () => import('@/views/trade/aftersales/lists'),
		meta: {
		  auth: true,
		  title: '售后列表',
		},
	  },
	  {
		path: '/refundsGood/lists',
		name: 'refundsGood_lists',
		component: () => import('@/views/trade/refundGood/list'),
		meta: {
		  auth: true,
		  title: '退货列表',
		},
	  },
	  {
		path: '/refunds/lists',
		name: 'refunds_lists',
		component: () => import('@/views/trade/refunds/lists'),
		meta: {
		  auth: true,
		  title: '退款列表',
		},
	  },
	  {
		path: '/confirmOrder/lists',
		name: 'confirmOrder_lists',
		component: () => import('@/views/trade/confirmOrder/list'),
		meta: {
		  auth: true,
		  title: '确认收货列表',
		},
	  },
	  {
		path: '/rate/lists',
		name: 'rate_lists',
		component: () => import('@/views/trade/rate/lists'),
		meta: {
		  auth: true,
		  title: '评价列表',
		},
	  },
	  {
		path: '/rate/rateAppeal',
		name: 'rate_appeal',
		component: () => import('@/views/trade/rate/rateAppeal'),
		meta: {
		  auth: true,
		  title: '评论申诉列表',
		  hideInMenu: true,
		},
	  },    
    {
      path: '/trade/point_lists',
      name: 'point_lists_details',
      component: () => import('@/views/trade/order/pointLists'),
      meta: {
        auth: true,
        title: '订单积分明细',
        hideInMenu: true,
      },
    },
    {
      path: '/trade/detail/:id',
      name: 'trade_detail',
      component: () => import('@/views/trade/order/detail'),
      meta: {
        auth: true,
        title: '订单详情',
        hideInMenu: true,
      },
    },
    {
      path: '/logistics/lists',
      name: '/logistics_lists',
      component: () => import('@/views/trade/logistics/lists'),
      meta: {
        auth: true,
        title: '物流列表',
      },
	},
	{
		path: '/goods/sale/lists',
		name: 'goods_sale_lists',
		component: () => import('@/views/trade/goodsale/lists'),
		meta: {
		  auth: true,
		  title: '商品销售量列表',
		},
	  },
    // {
    //   path: '/exchange/lists',
    //   name: 'exchange_lists',
    //   component: () => import('@/views/trade/exchange/lists'),
    //   meta: {
    //     auth: true,
    //     title: '已兑换列表',
    //   },
    // },
  ],
};
