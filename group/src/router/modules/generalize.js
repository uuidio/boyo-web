import { PageView } from '@/components/layouts';

export default {
  path: '/generalize',
  component: PageView,
  name: 'generalize',
  redirect:'/generalize/lists',
  meta: {
    title: '推广',
    icon: 'icon-trade',
  },
  children: [
    {
      path: '/generalize/lists',
      name: 'generalize_lists',
      component: () => import('@/views/generalize/lists'),
      meta: {
        auth: true,
        title: '申请审核',
      },
    },
    {
      path: '/generalize/depositslists',
      name: 'deposits_lists',
      component: () => import('@/views/generalize/depositsLists'),
      meta: {
        auth: true,
        title: '提现审核',
      },
    },
    {
      path: '/generalize/PromoterLists',
      name: 'PromoterLists',
      component: () => import('@/views/generalize/PromoterLists'),
      meta: {
        auth: true,
        title: '佣金管理',
      },
    },
    {
      path: '/generalize/PromoterShopLists',
      name: 'PromoterShopLists',
      component: () => import('@/views/generalize/PromoterShopLists'),
      meta: {
        auth: true,
        title: '小店佣金管理',
        hideInMenu:true
      },
    },
    {
      path: '/generalize/trade/:id',
      name: 'tradeLists',
      component: () => import('@/views/generalize/tradeEstimatesLists'),
      meta: {
        auth: true,
        title: '会员分销收入',
        hideInMenu:true
      },
    },
    {
      path: '/generalize/promoterShop/:id',
      name: 'promoterShop',
      component: () => import('@/views/generalize/promoterShop'),
      meta: {
        auth: true,
        title: '我的推广员',
        hideInMenu:true
      },
    },
    {
      path: '/generalize/savePartner/:id',
      name: 'savePartner',
      component: () => import('@/views/generalize/savePartner'),
      meta: {
        auth: true,
        title: '我的上级',
        hideInMenu:true
      },
    },
    {
      path: '/generalize/userDepositLogsLists/:id',
      name: 'userDepositLogsLists',
      component: () => import('@/views/generalize/userDepositLogsLists'),
      meta: {
        auth: true,
        title: '会员预估佣金',
        hideInMenu:true
      },
    },
    {
      path: '/generalize/ranking',
      name: 'ranking_lists',
      component: () => import('@/views/generalize/ranking'),
      meta: {
        auth: true,
        title: '个人排行',
      },
    },
    {
      path: '/generalize/promoterList',
      name: 'promoterList',
      component: () => import('@/views/generalize/promoterList'),
      meta: {
        auth: true,
        title: '推广员列表',
      },
    },
    {
      path: '/generalize/setting',
      name: 'site_integral_index',
      component: () => import('@/views/site/integral/setting'),
      meta: {
        auth: true,
        title: '推广设置',
        hideInMenu: false,
      },
    },
    // {
    //   path: '/generalize/groupCollectLists',
    //   name: 'groupCollectLists',
    //   component: () => import('@/views/generalize/groupCollectLists'),
    //   meta: {
    //     auth: true,
    //     title: '部门排行',
    //   },
    // },
    // {
    //   path: '/member/department/lists',
    //   name: 'dep_lists',
    //   component: () => import('@/views/member/department/lists'),
    //   meta: {
    //     auth: true,
    //     title: '部门设置',
    //   },
    // },
    // {
    //   path: '/generalize/userDepositLogsLists',
    //   name: 'userDepositLogsLists_lists',
    //   component: () => import('@/views/generalize/userDepositLogsLists'),
    //   meta: {
    //     auth: true,
    //     title: '会员账户列表',
    //   },
    // },
  ],
};
