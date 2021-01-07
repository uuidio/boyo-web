import { PageView } from '@/components/layouts';

export default {
  path: '/shop',
  redirect: '/shop/shop',
  component: PageView,
  name: 'shop',
  meta: {
    title: '门店',
    icon: 'icon-shop',
  },
  children: [
    {
      path: '/shop/setting/setting',
      name: 'setting',
      component: () => import('@/views/shop/setting/setting'),
      meta: {
        auth: true,
        title: '门店设置',
      },
    },
    {
      path: '/shop/setting/resetPass',
      name: 'resetPass',
      component: () => import('@/views/shop/setting/resetPass'),
      meta: {
        auth: true,
        title: '修改密码',
      },
    },
    {
      path: '/shop/shopFitment',
      name: 'shopFitment',
      component: () => import('@/views/shop/shopFitment/index'),
      meta: {
        auth: true,
        title: '门店装修',
      },
    },
    // {
    //   path: '/shop/shopEdit/shopEdit',
    //   name: 'shopEdit',
    //   component: () => import('@/views/shop/shopEdit/shopEdit'),
    //   meta: {
    //     auth: true,
    //     title: '门店装修',
    //   },
    // },
    {
		  path: '/shop/receive',
		  name: 'receive',
		  component: () => import('@/views/shop/receive/receive'),
		  meta: {
		    auth: true,
		    title: '自提地址',
		  },
    },
    {
      path: '/shop/shopAddress',
      name: 'shopAddress',
      component: () => import('@/views/shop/shopAddress/shopAddress'),
      meta: {
        auth: true,
        title: '回寄地址',
      },
    },
  ],
};
