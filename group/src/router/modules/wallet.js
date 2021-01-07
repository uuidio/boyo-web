import { PageView, BlankLayout } from '@/components/layouts';

export default {
  path: '/wallet',
  redirect: '/wallet/paymentSettings',
  component: PageView,
  name: 'wallet',
  meta: { title: '钱包管理', icon: 'icon-wallet' },
  children: [
    // {
    //   path: '/wallet/electronicCard',
    //   name: 'electronicCard',
    //   component: BlankLayout,
    //   meta: {
    //     auth: true,
    //     title: '电子卡',
    //   },
    //   children: [
    //     {
    //       path: '/wallet/electronicCard/cardManage',
    //       name: 'cardManage',
    //       component: () => import('@/views/wallet/electronicCard/cardManage'),
    //       meta: {
    //         auth: true,
    //         title: '电子卡面管理',
    //       },
    //     },
    //     {
    //       path: '/wallet/electronicCard/rechargeRecord',
    //       name: 'rechargeRecord',
    //       component: () => import('@/views/wallet/electronicCard/rechargeRecord'),
    //       meta: {
    //         auth: true,
    //         title: '充值记录',
    //       },
    //     },
    //     {
    //       path: '/wallet/electronicCard/rechargeDenomination',
    //       name: 'rechargeDenomination',
    //       component: () => import('@/views/wallet/electronicCard/rechargeDenomination'),
    //       meta: {
    //         auth: true,
    //         title: '充值面额',
    //       },
    //     },
    //   ],
    // },
    {
      path: '/wallet/physicalCard',
      name: 'physicalCard',
      component: BlankLayout,
      meta: {
        auth: true,
        title: '实体卡',
      },
      children: [
        {
          path: '/wallet/physicalCard/cardList',
          name: 'cardList',
          component: () => import('@/views/wallet/physicalCard/cardList'),
          meta: {
            auth: true,
            title: '实体卡列表',
            hideInMenu: true,
          },
        },
        {
          path: '/wallet/physicalCard/backIMG',
          name: 'backIMG',
          component: () => import('@/views/wallet/physicalCard/backImg'),
          meta: {
            auth: true,
            title: '实体卡背景图设置',
            hideInMenu: false,
          },
        },
      ],
    },

    {
      path: '/wallet/paymentSettings',
      name: 'paymentSettings',
      component: BlankLayout,
      meta: {
        auth: true,
        title: '支付设置',
      },
      children: [
        {
          path: '/wallet/paymentSettings/walletConfig',
          name: 'walletConfig',
          component: () => import('@/views/wallet/paymentSettings/walletConfig'),
          meta: {
            auth: true,
            title: '线上支付设置',
          },
        },
        {
          path: '/wallet/paymentSettings/keyManagement',
          name: 'keyManagement',
          component: () => import('@/views/wallet/paymentSettings/keyManagement'),
          meta: {
            auth: true,
            title: '秘钥管理',
          },
        },
      ],
    },
  ],
};
