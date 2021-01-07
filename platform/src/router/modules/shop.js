import { PageView } from '@/components/layouts';

export default {
  path: '/shop',
  component: PageView,
  name: 'shop',
  redirect: '/shop/merchant/lists',
  meta: {
    title: '门店',
    icon: 'icon-shop',
  },
  children: [
    {
      path: '/shop/merchant/lists',
      name: 'merchant_lists',
      component: () => import('@/views/shop/merchant/lists'),
      meta: {
        auth: true,
        title: '店铺列表',
      },
    },
    {
      path: '/shop/merchant/add',
      name: 'merchant_add',
      component: () => import('@/views/shop/merchant/add'),
      meta: {
        auth: true,
        title: '店铺添加',
        hideInMenu: true,
      },
    },
    {
      path: '/shop/merchant/edit/:id',
      name: 'merchant_edit',
      component: () => import('@/views/shop/merchant/add'),
      meta: {
        auth: true,
        title: '店铺编辑',
        hideInMenu: true,
      },
    },
    {
      path: '/shop/account/lists',
      name: 'account_lists',
      component: () => import('@/views/shop/account/lists'),
      meta: {
        auth: true,
        title: '店铺账号列表',
      },
    },
    {
      path: '/shop/account/add',
      name: 'account_add',
      component: () => import('@/views/shop/account/add'),
      meta: {
        auth: true,
        title: '店铺账号添加',
        hideInMenu: true,
      },
    },
  ],
};
