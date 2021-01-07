import { PageView } from '@/components/layouts';

export default {
  path: '/article',
  redirect: '/article/articleList',
  component: PageView,
  name: 'article',
  meta: { title: '文章', icon: 'icon-profile' },
  children: [
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
      path: '/article/editArticle',
      name: 'editArticle',
      component: () => import('@/views/article/editArticle'),
      meta: {
        title: '文章详情',
        keepAlive: false,
        hideInMenu: true,
      },
    },
  ],
};
