import { PageView } from '@/components/layouts';

export default {
  path: '/article',
  redirect: '/article/articleList',
  component: PageView,
  name: 'article',
  meta: { title: '文章', icon: 'icon-profile' },
  children: [
    {
      path: '/article/articleClassify',
      name: 'articleClassify',
      component: () => import('@/views/article/articleClassify'),
      meta: {
        title: '文章分类列表',
        keepAlive: true,
        hideInMenu: true,
      },
    },
    {
      path: '/article/addClassify',
      name: 'addClassify',
      component: () => import('@/views/article/editClassify'),
      meta: {
        title: '添加文章分类',
        keepAlive: true,
        hideInMenu: true,
      },
    },
    {
      path: '/article/editClassify',
      name: 'editClassify',
      component: () => import('@/views/article/editClassify'),
      meta: {
        title: '编辑文章分类',
        keepAlive: true,
        hideInMenu: true,
      },
    },
    {
      path: '/article/articleList',
      name: 'articleList',
      component: () => import('@/views/article/articleList'),
      meta: {
        title: '文章列表',
        keepAlive: true,
      },
    },
    {
      path: '/article/addArticle',
      name: 'addArticle',
      component: () => import('@/views/article/editArticle'),
      meta: {
        title: '添加文章',
        keepAlive: false,
        hideInMenu: true,
      },
    },
    {
      path: '/article/editArticle',
      name: 'editArticle',
      component: () => import('@/views/article/editArticle'),
      meta: {
        title: '编辑文章',
        keepAlive: false,
        hideInMenu: true,
      },
    },
    {
      path: '/article/articleManage',
      name: 'articleManage',
      component: () => import('@/views/article/articleManage'),
      meta: {
        title: '文章管理',
        keepAlive: true,
      },
    },
  ],
};
