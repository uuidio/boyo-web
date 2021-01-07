import { PageView } from '@/components/layouts';

export default {
  path: '/coupon',
  name: 'coupon',
  component: PageView,
  redirect:'/trade/coupon/writeoff',
  meta: {
    title: '优惠券核销',
    icon: 'icon-book',
  },
  children: [
    {
		path: '/trade/coupon/writeoff',
		name: 'coupon.writeoff',
		component: () => import('@/views/trade/coupon/writeoff'),
		meta: {
  		  auth: true,
  		  title: '优惠券核销',
  		},
	},
	{
		path: '/coupon/off/list',
		name: 'coupon.writeofflist',
		component: () => import('@/views/trade/coupon/writeofflist'),
		meta: {
			auth: true,
			title: '优惠券核销列表',
		},
	},
	{
		path: '/trade/coupon/detail',
		name: 'coupon.detail',
		component: () => import('@/views/trade/coupon/detail'),
		meta: {
		  auth: true,
		  title: '优惠券详情',
		  hideInMenu: true,
		},
	},  
  ],
};
