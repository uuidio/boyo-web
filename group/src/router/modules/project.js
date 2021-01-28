import { PageView } from '@/components/layouts';

export default {
  path: '/project',
  component: PageView,
  name: 'shop',
  redirect: '/shop/merchant/lists',
  meta: {
    title: '项目',
    icon: 'icon-shop',
  },
  children: [
    {
      path: '/project/platform/lists',
      name: 'platform_lists',
      component: () => import('@/views/project/platform/lists'),
      meta: {
        auth: true,
        title: '品牌列表',
      },
    },
    {
      path: '/project/platform/add/:id',
      name: 'platform_add',
      component: () => import('@/views/project/platform/add'),
      meta: {
        auth: true,
        title: '品牌添加',
        hideInMenu: true,
      },
    },
    {
      path: '/project/platform/edit/:id',
      name: 'platform_edit',
      component: () => import('@/views/project/platform/add'),
      meta: {
        auth: true,
        title: '平台编辑',
        hideInMenu: true,
      },
    },
    {
      path: '/project/adminuser/lists',
      name: 'adminuser_lists',
      component: () => import('@/views/project/adminuser/lists'),
      meta: {
        auth: true,
        title: '品牌账号列表',
      },
    },
    {
      path: '/project/adminuser/add',
      name: 'adminuser_add',
      component: () => import('@/views/project/adminuser/add'),
      meta: {
        auth: true,
        title: '平台账号添加',
        hideInMenu: true,
      },
    },
    {
      path: '/project/anchor/list',
      name: 'anchor_list',
      component: () => import('@/views/project/anchor/list'),
      meta: {
        auth: true,
        title: '主播账号列表',
      },
    },
    // {
    //   path: '/project/paymentType/paymentTypeList',
    //   name: 'paymentTypeList',
    //   component: () => import('@/views/project/paymentType/paymentTypeList'),
    //   meta: {
    //     auth: true,
    //     title: '支付类型代码列表',
    //     hideInMenu: false,
    //   },
    // },
    // {
    //   path: '/project/paymentType/editPaymentType',
    //   name: 'editPaymentType',
    //   component: () => import('@/views/project/paymentType/editPaymentType'),
    //   meta: {
    //     auth: true,
    //     title: '添加类型代码列表',
    //     hideInMenu: true,
    //   },
    // },
  ],
};
