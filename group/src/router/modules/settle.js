import { PageView } from '@/components/layouts';

export default {
  path: '/settle',
  component: PageView,
  name:'settle',
  redirect: '/settle/tradeDay',
  meta: {
    title: '结算',
    icon: 'icon-yunying',
  },
  children: [
    {
      path: '/settle/tradeDay',
      name: 'trade_day',
      component: () => import('@/views/settle/tradeDay'),
      meta: {
        auth: true,
        title: '日结列表',
      },
    },
    {
      path: '/settle/tradeDayDetail',
      name: 'tradeDayDetail',
      component: () => import('@/views/settle/tradeDayDet'),
      meta: {
        auth: true,
        title: '日结列表详情',
        hideInMenu: true,
      },
    },
    {
      path: '/settle/tradeMonth',
      name: 'trade_month',
      component: () => import('@/views/settle/tradeMonth'),
      meta: {
        auth: true,
        title: '月结列表',
      },
    },
    {
      path: '/settle/tradeUv',
      name: 'tradeUv',
      component: () => import('@/views/settle/tradeUv'),
      meta: {
        auth: true,
        title: 'UV列表',
      },
	},
	{
		path: '/goodCost/lists',
		name: 'goodCost_lists',
		component: () => import('@/views/trade/goodCost/list'),
		meta: {
		  auth: true,
		  title: '成本结算列表',
		},
	  }, 
  ],
};
