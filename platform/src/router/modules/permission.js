import { PageView } from '@/components/layouts';

export default {
  path: '/permission',
  redirect: '/permission/menu',
  component: PageView,
  name:'permission',
  meta: { title: '权限管理', icon: 'icon-statistics' },
  children: [
    {
      path: '/permission/menu',
      name: 'permission.menu',
      component: () => import('@/views/permission/Menu'),
      meta: { title: '权限菜单', keepAlive: true, hideInMenu: true, },
    },
    {
      path: '/role/manage',
      name: 'role.manage',
      component: () => import('@/views/permission/Roles'),
      meta: { title: '角色管理', keepAlive: true },
    },
    {
      path: '/admin/manage',
      name: 'admin.manage',
      component: () => import('@/views/permission/Admin'),
      meta: { title: '管理员管理', keepAlive: true },
    },
  ],
};
