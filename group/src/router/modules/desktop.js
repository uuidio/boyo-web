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
      path: '/version/list',
      name: 'version_list',
      component: () => import('@/views/desktopApp/version/list'),
      meta: {
        auth: true,
        title: '版本管理',
      },
    },
    // {
    //   path: '/version/list2',
    //   name: 'version_list',
    //   component: () => import('@/views/desktopApp/version/list2'),
    //   meta: {
    //     auth: true,
    //     title: '版本管理',
    //   },
    // },
  ],
};
