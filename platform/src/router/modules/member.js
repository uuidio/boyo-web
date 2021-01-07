import { PageView } from '@/components/layouts';

export default {
  path: '/member',
  component: PageView,
  name: 'member',
  redirect: '/member/lists',
  meta: {
    title: '会员',
    icon: 'icon-user',
  },
  children: [
    {
      path: '/member/lists',
      name: 'member_lists',
      component: () => import('@/views/member/lists'),
      meta: {
        auth: true,
        title: '会员列表',
      },
    },
    {
      path: '/member/card/lists',
      name: 'member_card_lists',
      component: () => import('@/views/member/card/lists'),
      meta: {
        auth: true,
        title: '会员卡列表',
      },
    },
    {
      path: '/member/card/add',
      name: 'member_card_add',
      component: () => import('@/views/member/card/save'),
      meta: {
        auth: true,
        title: '会员卡添加',
        hideInMenu: true,
      },
    },
    {
      path: '/member/card/edit/:id',
      name: 'member_card_edit',
      component: () => import('@/views/member/card/save'),
      meta: {
        auth: true,
        title: '会员卡编辑',
        hideInMenu: true,
      },
    },
    {
      path: '/member/selfHelpScore/scoreList',
      name: 'scoreList',
      component: () => import('@/views/member/selfHelpScore/scoreList'),
      meta: {
        auth: true,
        title: '自助积分',
        hideInMenu: false,
      },
    },
    {
      path: '/member/selfHelpScore/scoreDetail',
      name: 'scoreDetail',
      component: () => import('@/views/member/selfHelpScore/scoreDetail'),
      meta: {
        auth: true,
        title: '积分补录',
        hideInMenu: true,
      },
    },
    {
      path: '/trade/integral_order_list',
      name: 'integral_order_list',
      component: () => import('@/views/trade/order/integralOrderList'),
      meta: {
        auth: true,
        title: '积分订单列表',
      },
    },
    {
      path: '/trade/integral_order_list',
      name: 'coin_order_list',
      component: () => import('@/views/trade/order/integralOrderList'),
      meta: {
        auth: true,
        title: '牛币订单列表',
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
      path: '/trade/order/delivery/:id',
      name: 'orderdelivery',
      component: () => import('@/views/trade/order/delivery'),
      meta: {
        auth: true,
        title: '订单发货',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/member/activityList',
    //   name: 'memberActivityList',
    //   component: () => import('@/views/member/activity/activityList'),
    //   meta: {
    //     title: '活动列表',
    //     keepAlive: true,
    //   },
    // },
    // {
    //   path: '/member/addActivity',
    //   name: 'memberAddActivity',
    //   component: () => import('@/views/member/activity/editActivity'),
    //   meta: {
    //     title: '添加活动',
    //     keepAlive: false,
    //     hideInMenu: true,
    //   },
    // },
    // {
    //   path: '/member/editActivity',
    //   name: 'memberEditActivity',
    //   component: () => import('@/views/member/activity/editActivity'),
    //   meta: {
    //     title: '编辑活动',
    //     keepAlive: false,
    //     hideInMenu: true,
    //   },
    // },
    {
      path: '/member/bonusPoints',
      name: 'bonusPoints',
      component: () => import('@/views/member/welfare/bonusPoints'),
      meta: {
        auth: true,
        title: '新会员赠送积分',
        hideInMenu: false,
      },
    },
    {
      path: '/member/quickRejectList',
      name: 'quickRejectList',
      component: () => import('@/views/member/quickReject/quickRejectList'),
      meta: {
        auth: true,
        title: '快捷驳回消息列表',
        hideInMenu: false,
      },
    },
    {
      path: '/member/editQuickReject',
      name: 'editQuickReject',
      component: () => import('@/views/member/quickReject/editQuickReject'),
      meta: {
        auth: true,
        title: '编辑快捷驳回消息',
        hideInMenu: true,
      },
    },
    {
      path: '/member/addQuickReject',
      name: 'addQuickReject',
      component: () => import('@/views/member/quickReject/editQuickReject'),
      meta: {
        auth: true,
        title: '添加快捷驳回消息',
        hideInMenu: true,
      },
    },
  ],
};
