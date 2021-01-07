import { PageView } from '@/components/layouts';

export default {
  path: '/article',
  name: 'article',
  component: PageView,
  redirect:'/article/list',
  meta: {
    title: '文章',
    icon: 'icon-book',
  },
  children: [
    {
      path: '/article/lists',
      name: 'article_lists',
      component: () => import('@/views/article/item/lists'),
      meta: {
        auth: true,
        title: '文章列表',
      },
    },
		// {article
		//   path: '/article/lists',
		//   name: 'article_lists',
		//   component: () => import('@/views/article/class'),
		//   meta: {
		//     auth: true,
		//     title: '分类列表',
		//   },
		// },
  ],
};
