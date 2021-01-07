import { PageView } from '@/components/layouts';

export default {
  path: '/promotion',
  redirect: '/promotion/activity/lists',
  component: PageView,
  name:'promotion',
  meta: {
    title: '营销',
    icon: 'icon-cuxiao',
  },
  children: [
    {
      path: '/promotion/activity/lists',
      name: 'activity_lists',
      component: () => import('@/views/promotion/activity/lists'),
      meta: {
        auth: true,
        title: '商家满减满折审核',
      },
    },
    {
      path: '/promotion/activity/detail/:id',
      name: 'activity_detail',
      component: () => import('@/views/promotion/activity/detail'),
      meta: {
        auth: true,
        title: '商家满减满折详情',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/seckill/lists',
      name: 'seckill_lists',
      component: () => import('@/views/promotion/seckill/lists'),
      meta: {
        auth: true,
        title: '秒杀活动列表',

      },
    },
    {
      path: '/promotion/seckill/registerLists',
      name: 'register_lists',
      component: () => import('@/views/promotion/seckill/registerLists'),
      meta: {
        auth: true,
        title: '秒杀活动店铺申请列表',
      },
    },
    {
      path: '/promotion/seckill/shopDetail/:id',
      name: 'shopDetail',
      component: () => import('@/views/promotion/seckill/shopDetail'),
      meta: {
        auth: true,
        title: '秒杀活动店铺申请详情',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/seckill/add',
      name: 'seckill_add',
      component: () => import('@/views/promotion/seckill/add'),
      meta: {
        auth: true,
        title: '添加秒杀活动',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/seckill/detail/:id',
      name: 'seckill_detail',
      component: () => import('@/views/promotion/seckill/detail'),
      meta: {
        auth: true,
        title: '秒杀活动详情',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/coupon/celler_lists',
      name: 'celler_coupon_lists',
      component: () => import('@/views/promotion/coupon/celler_lists'),
      meta: {
        auth: true,
        title: '商家优惠券列表',
      },
    },
    {
      path: '/promotion/coupon/platform_lists',
      name: 'platform_coupon_lists',
      component: () => import('@/views/promotion/coupon/platform_lists'),
      meta: {
        auth: true,
        title: '平台优惠券列表',
      },
    },
    {
      path: '/promotion/coupon/celler_detail/:id',
      name: 'coupon_detail',
      component: () => import('@/views/promotion/coupon/coupon_detail'),
      meta: {
        auth: true,
        title: '优惠券详情',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/coupon/add',
      name: 'coupon_add',
      component: () => import('@/views/promotion/coupon/add'),
      meta: {
        auth: true,
        title: '添加平台优惠券',
        hideInMenu: true,
      },
    },
    {
      path: '/promotion/coupon/coupon_push',
      name: 'coupon_push',
      component: () => import('@/views/promotion/coupon/couponPush'),
      meta: {
        auth: true,
        title: '手动推送优惠券',
      },
    },
    {
      path: '/promotion/point/lists',
      name: 'point_lists',
      component: () => import('@/views/promotion/point/lists'),
      meta: {
        auth: true,
        title: '积分商品列表',
      },
    },
  ],
};
