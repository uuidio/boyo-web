import { PageView } from '@/components/layouts';

export default {
  path: '/trade',
  redirect: '/trade/order/lists',
  component: PageView,
  name: 'trade',
  meta: {
    title: '交易',
    icon: 'icon-trade',
    keepAlive: true, // 需要被缓存
  },
  children: [
    {
      path: '/trade/order/lists',
      name: 'orderlists',
      component: () => import('@/views/trade/order/lists'),
      meta: {
        // keepAlive: true, // 需要被缓存
        auth: true,
        title: '订单管理',
      },
    },
    {
      path: '/trade/order/cancelorder',
      name: 'cancelorder',
      component: () => import('@/views/trade/order/cancelorder'),
      meta: {
        // keepAlive: true, // 需要被缓存
        auth: true,
        title: '异常订单管理',
      },
    },
    {
      path: '/trade/order/canceldetail/:id',
      name: 'canceldetail',
      component: () => import('@/views/trade/order/canceldetail'),
      meta: {
        auth: true,
        title: '异常订单详情',
        hideInMenu: true,
      },
    },
    {
      path: '/trade/order/detail/:id',
      name: 'orderdetail',
      component: () => import('@/views/trade/order/detail'),
      meta: {
        auth: true,
        keepAlive: false,
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
	{
		path: '/trade/afterSales',
		name: 'afterSales_list',
		component: () => import('@/views/trade/afterSales/lists'),
		meta: {
		  auth: true,
		  title: '售后列表',
		},
	  },
	  {
		path: '/refundsGood/lists',
		name: 'refundsGood_lists',
		component: () => import('@/views/trade/refundGood/list'),
		meta: {
		  auth: true,
		  title: '退货列表',
		},
	  },
	  {
		path: '/refunds/lists',
		name: 'refunds_lists',
		component: () => import('@/views/trade/refunds/lists'),
		meta: {
		  auth: true,
		  title: '退款列表',
		},
	  },
	  {
		path: '/confirmOrder/lists',
		name: 'confirmOrder_lists',
		component: () => import('@/views/trade/confirmOrder/list'),
		meta: {
		  auth: true,
		  title: '确认收货列表',
		},
	  },
    {
      path: '/trade/logisticsconfig',
      name: 'logistics_config',
      component: () => import('@/views/trade/logistics/logistics'),
      meta: {
        auth: true,
        title: '物流模板配置',
      },
    },
    {
      path: '/trade/logistics',
      name: 'logistics_list',
      component: () => import('@/views/trade/logistics/lists'),
      meta: {
        auth: true,
        title: '物流公司列表',
      },
    },
    {
      path: '/trade/logistics_add',
      name: 'logistics_add',
      component: () => import('@/views/trade/logistics/add'),
      meta: {
        auth: true,
        title: '添加物流模板',
        hideInMenu: true,
      },
    },
    {
      path: '/trade/logistics_edit/:id',
      name: 'logistics_edit',
      component: () => import('@/views/trade/logistics/add'),
      meta: {
        auth: true,
        title: '编辑物流模板',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/trade/deliveCode',
    //   name: 'deliveCode_list',
    //   component: () => import('@/views/trade/deliveCode/lists'),
    //   meta: {
    //     auth: true,
    //     title: '提货码提货',
    //   },
    // },
    {
      path: '/trade/deliveCode/detail/:id',
      name: 'deliveCodedetail',
      component: () => import('@/views/trade/deliveCode/detail'),
      meta: {
        auth: true,
        title: '提货订单详情',
        hideInMenu: true,
      },
    },
    {
      path: '/trade/afterSales/detail/:id',
      name: 'afterSales_detail',
      component: () => import('@/views/trade/afterSales/detail'),
      meta: {
        auth: true,
        title: '售后订单详情',
        hideInMenu: true,
      },
	  },
	  {
		path: '/goods/sale/lists',
		name: 'goods_sale_lists',
		component: () => import('@/views/trade/goodsale/lists'),
		meta: {
		  auth: true,
		  title: '商品销售量列表',
		},
	  },
    // {
    // 	path: '/selfExtract/lists',
    // 	name: 'selfExtract_lists',
    // 	component: () => import('@/views/trade/selfExtract/list'),
    // 	meta: {
    // 	  auth: true,
    // 	  title: '自提商品核销列表',
    // 	},
    // },
  ],
};
