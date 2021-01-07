import { PageView } from '@/components/layouts';

export default {
  path: '/site',
  component: PageView,
  name: 'site',
  redirect: '/site/config/index',
  meta: {
    title: '设置',
    icon: 'icon-setting',
  },
  children: [
    // {
    //   path: '/site/config/index',
    //   name: 'site_config_index',
    //   component: () => import('@/views/site/config/index'),
    //   meta: {
    //     auth: true,
    //     title: '首页设置',
    //   },
    // },
    {
      path: '/site/config/shopEdit',
      name: 'shopEdit',
      component: () => import('@/views/site/shopEdit/shopEdit'),
      meta: {
        auth: true,
        title: '首页装修',
      },
    },
    {
      path: '/site/integral/setting',
      name: 'site_integral_index',
      component: () => import('@/views/site/integral/setting'),
      meta: {
        auth: true,
        title: '基础设置',
      },
    },
    {
      path: '/site/log/lisgs',
      name: 'log_lists',
      component: () => import('@/views/site/log/lists'),
      meta: {
        auth: true,
        title: '操作日志',
      },
    },
    {
      path: '/site/alert',
      name: 'site_alert_index',
      component: () => import('@/views/site/alert/alert'),
      meta: {
        auth: true,
        title: '弹窗设置',
      },
    },
    // {
    //   path: '/site/live',
    //   name: 'site_live',
    //   component: () => import('@/views/site/live/live'),
    //   meta: {
    //     auth: true,
    //     title: '直播配置',
    //   },
    // },
    // {
    //   path: '/site/manage',
    //   name: 'manage',
    //   component: () => import('@/views/site/manage/manage'),
    //   meta: {
    //     auth: true,
    //     title: '基本设置',
    //   },
    // },
    {
      path: '/config/activityEdit',
      name: 'activityEdit',
      component: () => import('@/views/site/shopEdit/activityEdit'),
      meta: {
        auth: true,
        title: '自定义活动设置',
        hideInMenu: true,
      },

    },
    {
      path: '/config/activityList',
      name: 'activityList',
      component: () => import('@/views/site/shopEdit/activityList'),
      meta: {
        auth: true,
        title: '自定义活动列表',
      },
	},
	{
		path: '/config/recommend',
		name: 'recommend',
		component: () => import('@/views/site/shopEdit/recommend'),
		meta: {
		  auth: true,
		  title: '为你推荐',
		},
    
	  },
  ],
};
