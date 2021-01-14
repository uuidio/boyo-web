import { PageView } from '@/components/layouts';

export default {
  path: '/desktop',
  name: 'desktop',
  component: PageView,
  redirect: '/notice/list',
  meta: {
    title: '设备端功能',
    icon: 'icon-hdd',
  },
  children: [
    {
      path: '/notice/list',
      name: 'notice_list',
      component: () => import('@/views/desktopApp/notice/notice_list'),
      meta: {
        auth: true,
        title: '公告',
      },
    },
    {
      path: '/notice/detail',
      name: 'notice_detail',
      component: () => import('@/views/desktopApp/notice/notice_detail'),
      meta: {
        auth: true,
        title: '操作公告',
        hideInMenu: true,
      },
    },
    {
      path: '/version/list',
      name: 'version_list',
      component: () => import('@/views/desktopApp/version/list'),
      meta: {
        auth: true,
        title: '版本管理',
      },
    },
  ],
};
