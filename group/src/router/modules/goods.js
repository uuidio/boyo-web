import { PageView } from '@/components/layouts';

export default {
  path: '/goods',
  redirect: '/goods/item/lists',
  component: PageView,

  meta: {
    title: '商品',
    icon: 'icon-shangpin',
  },
  children: [
    {
      path: '/goods/item/lists',
      name: 'goods_lists',
      component: () => import('@/views/goods/item/lists'),
      meta: {
        auth: true,
        title: '商品列表',
      },
    },
    // {
    //   path: '/goods/class/lists',
    //   name: 'class_lists',
    //   component: () => import('@/views/goods/class/lists'),
    //   meta: {
    //     auth: true,
    //     title: '分类列表',
    //     // hideInMenu: true,
    //   },
    // },
    {
      path: '/goods/class/add',
      name: 'class_add',
      component: () => import('@/views/goods/class/add'),
      meta: {
        auth: true,
        title: '添加分类',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/class/edit/:id',
      name: 'class_edit',
      component: () => import('@/views/goods/class/add'),
      meta: {
        auth: true,
        title: '编辑分类',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/goods/brand/lists',
    //   name: 'brand_lists',
    //   component: () => import('@/views/goods/brand/lists'),
    //   meta: {
    //     auth: true,
    //     title: '品牌列表',
    //   },
    // },
    {
      path: '/goods/brand/add',
      name: 'brand_add',
      component: () => import('@/views/goods/brand/add'),
      meta: {
        auth: true,
        title: '品牌添加',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/brand/edit/:id',
      name: 'brand_edit',
      component: () => import('@/views/goods/brand/add'),
      meta: {
        auth: true,
        title: '品牌编辑',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/goods/spec/lists',
    //   name: 'spec_lists',
    //   component: () => import('@/views/goods/spec/lists'),
    //   meta: {
    //     auth: true,
    //     title: '规格列表',
    //   },
    // },
    {
      path: '/goods/spec/add',
      name: 'spec_add',
      component: () => import('@/views/goods/spec/add'),
      meta: {
        auth: true,
        title: '规格添加',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/spec/edit/:id',
      name: 'spec_edit',
      component: () => import('@/views/goods/spec/add'),
      meta: {
        auth: true,
        title: '规格编辑',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/goodsType/lists',
      name: 'goodsType_lists',
      component: () => import('@/views/goods/goodsType/lists'),
      meta: {
        auth: true,
        title: '商品类型列表',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/goodsType/add',
      name: 'goodsType_add',
      component: () => import('@/views/goods/goodsType/add'),
      meta: {
        auth: true,
        title: '商品类型添加',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/goodsType/edit/:id',
      name: 'goodsType_edit',
      component: () => import('@/views/goods/goodsType/add'),
      meta: {
        auth: true,
        title: '商品类型编辑',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/goods/goodsSet/lists',
    //   name: 'goodsSet_lists',
    //   component: () => import('@/views/goods/goodsSet/lists'),
    //   meta: {
    //     auth: true,
    //     title: '第三方商品同步设置列表',
    //   },
    // },
    // {
    //   path: '/goods/goodsSet/add',
    //   name: 'goodsSet_add',
    //   component: () => import('@/views/goods/goodsSet/add'),
    //   meta: {
    //     auth: true,
    //     title: '第三方商品同步设置添加',
    //     hideInMenu: true,
    //   },
    // },
    // {
    //   path: '/goods/goodsSet/edit/:id',
    //   name: 'goodsSet_edit',
    //   component: () => import('@/views/goods/goodsSet/add'),
    //   meta: {
    //     auth: true,
    //     title: '第三方商品同步设置编辑',
    //     hideInMenu: true,
    //   },
    // },
    // {
    //   path: '/goods/relevance/lists',
    //   name: 'relevance_lists',
    //   component: () => import('@/views/goods/relevance/lists'),
    //   meta: {
    //     auth: true,
    //     title: '分类关联',
    //   },
    // },
    {
      path: '/goods/floor/lists',
      name: 'floor_lists',
      component: () => import('@/views/goods/floor/lists'),
      meta: {
        auth: true,
        title: '楼层列表',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/floor/add',
      name: 'floor_add',
      component: () => import('@/views/goods/floor/add'),
      meta: {
        auth: true,
        title: '添加楼层',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/floor/edit/:id',
      name: 'floor_edit',
      component: () => import('@/views/goods/floor/add'),
      meta: {
        auth: true,
        title: '编辑楼层',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/marketClass/lists',
      name: 'marketClass_lists',
      component: () => import('@/views/goods/marketClass/lists'),
      meta: {
        auth: true,
        title: '商场分类列表',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/marketClass/add',
      name: 'marketClass_add',
      component: () => import('@/views/goods/marketClass/add'),
      meta: {
        auth: true,
        title: '添加商场分类',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/marketClass/edit/:id',
      name: 'marketClass_edit',
      component: () => import('@/views/goods/marketClass/add'),
      meta: {
        auth: true,
        title: '编辑商场分类',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/goodsStockLogs/lists',
      name: 'goodsStockLogs_lists',
      component: () => import('@/views/goods/goodsStockLogs/lists'),
      meta: {
        auth: true,
        title: '商品库存日志',
        hideInMenu: true,
      },
    },
  ],
};
