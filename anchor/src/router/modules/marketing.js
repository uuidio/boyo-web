import { PageView } from '@/components/layouts';

export default {
  path: '/marketing',
  redirect: '/marketing/coupon',
  component: PageView,
  name: 'marketing',
  meta: {
    title: '营销',
    icon: 'icon-tags-o',
  },
  children: [
    {
      path: '/marketing/coupon',
      name: 'coupon',
      component: () => import('@/views/marketing/coupon'),
      meta: {
        auth: true,
        title: '优惠券管理',
      },
    },
    {
      path: '/marketing/coupon_add',
      name: 'coupon_add',
      component: () => import('@/views/marketing/add'),
      meta: {
        auth: true,
        title: '添加优惠券',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/coupon_show/:id',
      name: 'coupon_show',
      component: () => import('@/views/marketing/coupon_show'),
      meta: {
        auth: true,
        title: '查看优惠券',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/coupon_code/:id',
      name: 'coupon_code',
      component: () => import('@/views/marketing/coupon_code'),
      meta: {
        auth: true,
        title: '查看优惠券二维码',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/coupon_print/:id',
      name: 'coupon_print',
      component: () => import('@/views/marketing/printCode'),
      meta: {
        auth: true,
        title: '打印优惠券',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/activity_show/:id',
      name: 'reduction_show',
      component: () => import('@/views/marketing/activity_show'),
      meta: {
        auth: true,
        title: '查看满减促销',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/fullminus',
      name: 'fullminus',
      component: () => import('@/views/marketing/fullminus'),
      meta: {
        auth: true,
        title: '满减管理',
      },
    },
    {
      path: '/marketing/discount',
      name: 'discount',
      component: () => import('@/views/marketing/discount'),
      meta: {
        auth: true,
        title: '满折管理',
      },
    },
    {
      path: '/marketing/add_fullminus',
      name: 'add_fullminus',
      component: () => import('@/views/marketing/add_fullminus'),
      meta: {
        auth: true,
        title: '添加满减促销',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/add_discount',
      name: 'add_discount',
      component: () => import('@/views/marketing/add_fullminus'),
      meta: {
        auth: true,
        title: '添加满折促销',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/seckill/lists',
      name: 'seckill',
      component: () => import('@/views/marketing/seckill/lists'),
      meta: {
        auth: true,
        title: '秒杀活动列表',
      },
    },
    {
      path: '/marketing/seckill/seller_lists',
      name: 'seller_lists',
      component: () => import('@/views/marketing/seckill/seller_lists'),
      meta: {
        auth: true,
        title: '已报名秒杀活动列表',
      },
    },
    {
      path: '/marketing/seckill/detail/:id',
      name: 'seckill_detail',
      component: () => import('@/views/marketing/seckill/seckillDetail'),
      meta: {
        auth: true,
        title: '秒杀活动详情',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/seckill/seckill_apply/:id',
      name: 'seckill_apply',
      component: () => import('@/views/marketing/seckill/seckillApplyDetail'),
      meta: {
        auth: true,
        title: '秒杀活动报名申请',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/group/lists',
      name: 'group',
      component: () => import('@/views/marketing/group/lists'),
      meta: {
        auth: true,
        title: '拼团活动列表',
      },
    },
    {
      path: '/marketing/group/add',
      name: 'group_add',
      component: () => import('@/views/marketing/group/add'),
      meta: {
        auth: true,
        title: '拼团活动添加',
        hideInMenu: true,
      },
    },
    {
      path: '/marketing/group/detail/:id',
      name: 'group_detail',
      component: () => import('@/views/marketing/group/add'),
      meta: {
        auth: true,
        title: '拼团活动详情',
        hideInMenu: true,
      },
	},
	// {
	// 	path: '/trade/coupon/writeoff',
	// 	name: 'coupon.writeoff',
	// 	component: () => import('@/views/trade/coupon/writeoff'),
	// 	meta: {
 //  		  auth: true,
 //  		  title: '优惠券核销',
 //  		},
	// },
	// {
	// 	path: '/coupon/off/list',
	// 	name: 'coupon.writeofflist',
	// 	component: () => import('@/views/trade/coupon/writeofflist'),
	// 	meta: {
	// 		auth: true,
	// 		title: '优惠券核销列表',
	// 	},
	// },
	// {
	// 	path: '/trade/coupon/detail',
	// 	name: 'coupon.detail',
	// 	component: () => import('@/views/trade/coupon/detail'),
	// 	meta: {
	// 	  auth: true,
	// 	  title: '优惠券详情',
	// 	  hideInMenu: true,
	// 	},
	// },    
  ],
};
