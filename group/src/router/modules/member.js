import { PageView } from '@/components/layouts';

export default {
  path: '/member',
  component: PageView,
  name:'member',
  redirect: '/member/lists',
  meta: {
    title: '会员',
    icon: 'icon-user',
  },
  children: [
    {
      path: '/member/lists',
      name: 'member_lists',
      component: () => import('@/views/member/lists'),
      meta: {
        auth: true,
        title: '会员列表',
      },
    },
  ],
};
