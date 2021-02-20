import { PageView } from '@/components/layouts';

export default {
  path: '/desktop',
  name: 'desktop',
  component: PageView,
  redirect: '/show_text/list',
  meta: {
    title: '设备端功能',
    icon: 'icon-hdd',
  },
  children: [
    {
      path: '/show_text/list',
      name: 'show_text_list',
      component: () => import('@/views/desktopApp/show_text/list'),
      meta: {
        auth: true,
        title: '提词本',
      },
    },
    {
      path: '/show_text/list-in',
      name: 'show_text_list',
      component: () => import('@/views/desktopApp/show_text/list-in'),
      meta: {
        auth: true,
        title: '笔记',
        hideInMenu: true,
      },
    },
    {
      path: '/stickers/list',
      name: 'stickers',
      component: () => import('@/views/desktopApp/stickers/list'),
      meta: {
        auth: true,
        title: '素材管理',
      },
    },
  ],
};
