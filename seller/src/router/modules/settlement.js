import { PageView } from '@/components/layouts';

export default {
  path: '/settlement',
  redirect: '/settlement/settlement',
  component: PageView,
  name: 'settlement',
  meta: {
    title: '结算',
    icon: 'icon-jiesuan',
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
    	path: '/goodCost/lists',
    	name: 'goodCost_lists',
    	component: () => import('@/views/trade/goodCost/list'),
    	meta: {
    	  auth: true,
    	  title: '成本结算列表',
  	  },
    },
    // {
    //   path: '/settlement/settlement',
    //   name: 'settlement',
    //   component: () => import('@/views/settlement/settlement'),
    //   meta: {
    //     auth: true,
    //     title: '门店结算汇总',
    //   },
    // },
    // {
    //   path: '/settlement/settlement_detail',
    //   name: 'settlement_detail',
    //   component: () => import('@/views/settlement/settlement_detail'),
    //   meta: {
    //     auth: true,
    //     title: '门店结算明细',
    //   },
    // },
    // {
    //   path: '/settlement/subsidy',
    //   name: 'subsidy',
    //   component: () => import('@/views/settlement/subsidy'),
    //   meta: {
    //     auth: true,
    //     title: '购物券补贴明细',
    //   },
    // },
    // {
    //   path: '/settlement/guaranteeMoney',
    //   name: 'guaranteeMoney',
    //   component: () => import('@/views/settlement/guaranteeMoney'),
    //   meta: {
    //     auth: true,
    //     title: '门店保证金详情',
    //   },
    // }
  ],
};
