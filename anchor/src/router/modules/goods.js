import { PageView } from '@/components/layouts';

export default {
  path: '/goods',
  redirect: '/goods/lists',
  component: PageView,
  name: 'goods',
  meta: {
    title: '商品',
    icon: 'icon-shangpin',
  },
  children: [
    {
      path: '/goods/lists',
      name: 'goodslists',
      component: () => import('@/views/goods/item/lists'),
      meta: {
        auth: true,
        title: '商品列表',
      },
    },
    {
      path: '/goods/addSelectClass',
      name: 'goodsSelectClass',
      component: () => import('@/views/goods/item/addSelectClass'),
      meta: {
        auth: true,
        title: '商品发布',
      },
    },
    {
      path: '/goods/add',
      name: 'goods_add',
      component: () => import('@/views/goods/item/add'),
      meta: {
        auth: true,
        title: '商品发布',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/recycle/lists',
      name: 'recyclelists',
      component: () => import('@/views/goods/recycle/lists'),
      meta: {
        auth: true,
        title: '商品回收站',
      },
    },
		{
		  path: '/goods/addSelectClass/:id',
		  name: 'goodsSelectClass_edit',
		  component: () => import('@/views/goods/item/addSelectClass'),
		  meta: {
		    auth: true,
		    title: '商品编辑',
				hideInMenu: true,
		  },
		},
    {
      path: '/goods/edit/:id',
      name: 'goods_edit',
      component: () => import('@/views/goods/item/add'),
      meta: {
        auth: true,
        title: '商品编辑',
        hideInMenu: true,
      },
    },
    {
      path: '/goods/class/lists',
      name: 'class_list',
      component: () => import('@/views/goods/class/lists'),
      meta: {
        auth: true,
        title: '门店分类',
      },
    },
    {
      path: '/goods/class/add',
      name: 'add',
      component: () => import('@/views/goods/class/add'),
      meta: {
        auth: true,
        title: '添加门店分类',
        hideInMenu: true,
      },
    },
    // {
    //   path: '/goods/police',
    //   name: 'police',
    //   component: () => import('@/views/goods/police/police'),
    //   meta: {
    //     auth: true,
    //     title: '库存报警',
    //   },
    // },
    {
      path: '/goods/images',
      name: 'images',
      component: () => import('@/views/goods/images/images'),
      meta: {
        auth: true,
        title: '图片管理',
      },
    },
  ],
};
