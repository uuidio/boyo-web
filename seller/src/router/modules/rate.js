import { PageView } from '@/components/layouts';

export default {
  path: '/rate',
  redirect: '/rate/rate',
  component: PageView,
  name: 'rate',
  meta: {
    title: '客服',
    icon: 'icon-customerservice',
  },
  children: [
    {
      path: '/rate/rate',
      name: 'rate_list',
      component: () => import('@/views/rate/rate/lists'),
      meta: {
        auth: true,
        title: '评价列表',
      },
    },
    {
      path: '/rate/appeal',
      name: 'appeal_list',
      component: () => import('@/views/rate/appeal/lists'),
      meta: {
        auth: true,
        title: '申诉列表',
      },
    },
  ],
};
