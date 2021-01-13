import { PageView } from '@/components/layouts';

export default {
  path: '/statistics',
  redirect: '/statistics/tradeAnalysis',
  component: PageView,
  name: 'statistics',
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
      path: '/statistics/goodsAnalysis',
      name: 'goodsAnalysis',
      component: () => import('@/views/statistics/goodsStatistics'),
      meta: {
        auth: true,
        title: '商品数据统计',
      },
    },
  ],
};
