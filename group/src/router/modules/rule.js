import { PageView } from '@/components/layouts';

export default {
  path: '/rule',
  redirect: '/rule/ruleList',
  component: PageView,
  name: 'rule',
  meta: { title: '规则', icon: 'icon-profile' },
  children: [
    {
      path: '/rule/ruleList',
      name: 'ruleList',
      component: () => import('@/views/rule/ruleList'),
      meta: {
        title: '规则列表',
        keepAlive: false,
      },
    },
    {
      path: '/rule/addRule',
      name: 'addRule',
      component: () => import('@/views/rule/editRule'),
      meta: {
        title: '添加规则',
        keepAlive: false,
        hideInMenu: true,
      },
    },
    {
      path: '/rule/editRule',
      name: 'editRule',
      component: () => import('@/views/rule/editRule'),
      meta: {
        title: '编辑规则',
        keepAlive: false,
        hideInMenu: true,
      },
    },
  ],
};
