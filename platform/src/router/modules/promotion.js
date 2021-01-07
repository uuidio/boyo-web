import { PageView,BlankLayout } from '@/components/layouts';

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
      name: 'p-Activity',
      component: BlankLayout,
      meta: {
        title: '门店满减满折',
      },
      children:[
        {
          path: '/promotion/activity/lists',
          name: 'activity_lists',
          component: () => import('@/views/promotion/activity/lists'),
          meta: {
            auth: true,
            title: '门店满减满折审核',
          },
        },
        {
          path: '/promotion/activity/detail/:id',
          name: 'activity_detail',
          component: () => import('@/views/promotion/activity/detail'),
          meta: {
            auth: true,
            title: '门店满减满折详情',
            hideInMenu: true,
          },
        },
      ]
    },
    {
      path: '/promotion/seckill/lists',
      name: 'p-Seckill',
      component: BlankLayout,
      meta: {
        title: '秒杀活动',
      },
      children:[
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
      ]
    },
    {
      path: '/promotion/coupon/platform_lists',
      name: 'p-Coupon',
      component: BlankLayout,
      meta: {
        title: '优惠券',
      },
      children:[
        {
          path: '/promotion/coupon/celler_lists',
          name: 'celler_coupon_lists',
          component: () => import('@/views/promotion/coupon/celler_lists'),
          meta: {
            auth: true,
            title: '门店优惠券列表',
          },
        },
        {
          path: '/promotion/coupon/platform_lists',
          name: 'platform_coupon_lists',
          component: () => import('@/views/promotion/coupon/platform_lists'),
          meta: {
            auth: true,
            title: '品牌优惠券列表',
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
            title: '添加品牌优惠券',
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
		// {
		// 	path: '/coupon/off/list',
		// 	name: 'coupon.writeofflist',
		// 	component: () => import('@/views/trade/coupon/writeofflist'),
		// 	meta: {
		// 	  auth: true,
		// 	  title: '优惠券核销列表',
		// 	},
		//   },
		  {
			path: '/coupon/exchangeList',
			name: 'exchangeList',
			component: () => import('@/views/trade/coupon/exchangeList'),
			meta: {
			  auth: true,
			  title: '优惠券领取记录',
			},
			},
      ]
    },
    {
      path: '/promotion/point/lists',
      name: 'p-Point',
      component: BlankLayout,
      meta: {
        title: '积分活动',
      },
      children:[
         {
          path: '/promotion/point/lists',
          name: 'point_lists',
          component: () => import('@/views/promotion/point/lists'),
          meta: {
            auth: true,
            title: '积分商品列表',
          },
        },
        {
          path: '/promotion/integral/classlists',
          name: 'integral.classlists',
          component: () => import('@/views/promotion/integral/classlists'),
          meta: {
            auth: true,
            title: '积分分类列表',
          },
        },
        {
          path: '/promotion/integral/addclass',
          name: 'integral.addclass',
          component: () => import('@/views/promotion/integral/addclass'),
          meta: {
            auth: true,
            title: '添加积分分类',
            hideInMenu: true,
          },
        },
      ]
    },
    {
      path: '/promotion/point/lists',
      name: 'p-SPoint',
      component: BlankLayout,
      meta: {
        title: '牛币活动',
      },
      children:[
         {
          path: '/promotion/point/lists',
          name: 'coin_lists',
          component: () => import('@/views/promotion/point/lists'),
          meta: {
            auth: true,
            title: '牛币商品列表',
          },
        },
        {
          path: '/promotion/integral/classlists',
          name: 'coin_class',
          component: () => import('@/views/promotion/integral/classlists'),
          meta: {
            auth: true,
            title: '牛币分类列表',
          },
        },
        {
          path: '/promotion/integral/addclass',
          name: 'integral.addclass',
          component: () => import('@/views/promotion/integral/addclass'),
          meta: {
            auth: true,
            title: '添加牛币分类',
            hideInMenu: true,
          },
        },
      ]
    },
    {
      path: '/promotion/exchangeCoinRecords',
      name: 'exchangeCoinRecords',
      component: () => import('@/views/promotion/exchangeRecords/exchangeCoinRecords'),
      meta: {
        auth: true,
        title: '牛币兑换记录',
        hideInMenu: false,
      },
    },
    {
      path: '/promotion/draw/lotteryLists',
      name: 'p-draw',
      component: BlankLayout,
      meta: {
        title: '抽奖',
      },
      children:[
         {
          path: '/promotion/draw/lotteryLists',
          name: 'lottery_lists',
          component: () => import('@/views/promotion/draw/lotteryLists'),
          meta: {
            auth: true,
            title: '抽奖活动',
          },
        },
        {
          path: '/promotion/draw/prizeLists/:id',
          name: 'prize_lists',
          component: () => import('@/views/promotion/draw/prizeLists'),
          meta: {
            auth: true,
            title: '抽奖活动奖品列表',
            hideInMenu: true,
          },
        },
        {
          path: '/promotion/draw/lists',
          name: 'draw_lists',
          component: () => import('@/views/promotion/draw/lists'),
          meta: {
            auth: true,
            title: '抽奖记录',
          },
        },
        {
          path: '/promotion/conversion/lists',
          name: 'conversion_lists',
          component: () => import('@/views/promotion/conversion/lists'),
          meta: {
            auth: true,
            title: '实物奖品',
          },
        },
        {
          path: '/promotion/conversion/relevance',
          name: 'relevance_lists',
          component: () => import('@/views/promotion/conversion/relevance'),
          meta: {
            auth: true,
            title: '奖品关联活动',
          },
        },
        {
          path: '/promotion/conversion/user_lists',
          name: 'conversion_user_lists',
          component: () => import('@/views/promotion/conversion/userLists'),
          meta: {
            auth: true,
            title: '实物中奖列表',
          },
        },
      ]
    },
  ],
};

