import { PageView } from '@/components/layouts';

export default {
  path: '/groupsite',
  component: PageView,
  name: 'groupsite',
  redirect: '/site/config/index',
  meta: {
    title: '自营设置',
    icon: 'icon-setting',
  },
  children: [
    {
      path: '/site/integral_group/setting',
      name: 'site_group_integral_index',
      component: () => import('@/views/site/integral/setting'),
      meta: {
        auth: true,
        title: '基础设置',
      },
    },
    {
      path: '/site/config/self/shopEdit',
      name: 'selfshopEdit',
      component: () => import('@/views/site/shopEdit/selfEdit'),
      meta: {
        auth: true,
        title: '甄选装修',
      },
    },
	{
		path: '/config/self/recommend',
		name: 'selfrecommend',
		component: () => import('@/views/site/shopEdit/selfRecommend'),
		meta: {
		  auth: true,
		  title: '为你推荐',
		},
	},
    {
      path: '/config/self/activityList',
      name: 'self_activityList',
      component: () => import('@/views/site/shopEdit/activityList'),
      meta: {
        auth: true,
        title: '自定义活动列表',
      },
    },
  {
      path: '/site/log/self/lisgs',
      name: 'self_log_lists',
      component: () => import('@/views/site/log/lists'),
      meta: {
        auth: true,
        title: '操作日志',
      },
    },
  ],
};
