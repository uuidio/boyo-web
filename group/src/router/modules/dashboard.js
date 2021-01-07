import { RouteView } from '@/components/layouts';

export default {
  path: '/dashboard',
  name: 'dashboard',
  redirect: '/dashboard/main',
  component: () => import('@/views/dashboard/main'),
  meta: {
    title: '首页',
    icon: 'icon-home',
  },
  children: [
    {
      path: '/dashboard/main',
      name: 'Main',
      meta: {
        auth: true,
        title: '主页',
      },
    },
  ],
};
