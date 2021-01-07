import { PageView } from '@/components/layouts';

export default {
  path: '/account',
  redirect: '/account/lists',
  component: PageView,
  name: 'account',
  meta: {
    title: '账号',
    icon: 'icon-user',
  },
  children: [
    {
      path: '/account/lists',
      name: 'account_lists',
      component: () => import('@/views/account/lists'),
      meta: {
        auth: true,
        title: '账号管理',
      }
    },
    {
      path: '/account/add',
      name: 'account_add',
      component: () => import('@/views/account/add'),
      meta: {
        auth: true,
        title: '账号添加',
        hideInMenu: true
      }
    },
    {
      path: '/account/roles',
      name: 'roles',
      component: () => import('@/views/account/roles'),
      meta: {
        auth: true,
        title: '角色管理'
      }
    },
    {
      path: '/account/rolesadd',
      name: 'rolesadd',
      component: () => import('@/views/account/rolesadd'),
      meta: {
        auth: true,
        title: '角色添加',
        hideInMenu: true
      }
    },
    {
      path: '/account/loglists',
      name: 'loglists',
      component: () => import('@/views/account/loglists'),
      meta: {
        auth: true,
        title: '操作日志'
      }
    }
  ],
};
