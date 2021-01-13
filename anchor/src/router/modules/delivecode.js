import { PageView } from '@/components/layouts';

export default {
  path: '/delivecode',
  name: 'delivecode',
  component: PageView,
  redirect:'/coupon/off/list',
  meta: {
    title: '商品提货',
    icon: 'icon-book',
  },
  children: [
    {
      path: '/trade/deliveCode',
      name: 'deliveCode_list',
      component: () => import('@/views/trade/deliveCode/lists'),
      meta: {
        auth: true,
        title: '提货码提货',
      },
    },
    {
      path: '/trade/confirmDelivery/:id',
      name: 'confirmDelivery',
      component: () => import('@/views/trade/deliveCode/confirmDelivery'),
      meta: {
        auth: true,
        title: '提货码提货确认',
        hideInMenu: true
      },
    },
    // {
    //   path: '/trade/deliveryResult',
    //   name: 'deliveryResult',
    //   component: () => import('@/views/trade/deliveCode/deliveryResult'),
    //   meta: {
    //     auth: true,
    //     title: '提货结果',
    //   },
    // },
    {
    	path: '/selfExtract/lists',
    	name: 'selfExtract_lists',
    	component: () => import('@/views/trade/selfExtract/list'),
    	meta: {
    	  auth: true,
    	  title: '自提商品核销列表',
    	},
    },
  ],
};
