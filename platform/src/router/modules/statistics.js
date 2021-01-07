import { PageView } from '@/components/layouts';

export default {
  path: '/statistics',
  redirect: '/statistics/tradeAnalysis',
  name:'statistics',
  component: PageView,
  meta: {
    title: '统计',
    icon: 'icon-statistics',
  },
  children: [
	{
		path: '/statistics/downLoadList',
		name: 'downLoadList',
		component: () => import('@/views/statistics/downLoadList'),
		meta: {
		  auth: true,
		  title: '导出记录列表',
		},
	  },   
    {
      path: '/statistics/tradeAnalysis',
      name: 'analysis',
      component: () => import('@/views/statistics/tradeAnalysis'),
      meta: {
        auth: true,
        title: '交易数据统计',
      },
    },
    {
      path: '/statistics/shopAnalysis',
      name: 'shopAnalysis',
      component: () => import('@/views/statistics/statistics'),
      meta: {
        auth: true,
        title: '店铺数据统计',
      },
    },
    {
      path: '/statistics/goodsAnalysis',
      name: 'goodsAnalysis',
      component: () => import('@/views/statistics/goodsStatistics'),
      meta: {
        auth: true,
        title: '商品数据统计',
      },
    },
    {
      path: '/statistics/userAnalysis',
      name: 'userAnalysis',
      component: () => import('@/views/statistics/userStatistics'),
      meta: {
        auth: true,
        title: '会员排行',
      },
    },
    // {
    //   path: '/currency',
    //   name: 'currency',
    //   component: () => import('@/views/statistics/currency'),
    //   meta: {
    //     auth: true,
    //     title: '线上售币统计',
    //   },
    // },
  ],
};
