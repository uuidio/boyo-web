import { PageView } from '@/components/layouts';

export default {
  path: '/online',
  component: PageView,
  name: 'online',
  redirect: '/online/refundOrder',
  meta: {
    title: '线上对账',
    icon: 'icon-trade',
  },
  children: [
    {
      path: '/online/refundOrder',
      name: 'online.refundOrder',
      component: () => import('@/views/online/refundOrder'),
      meta: {
        auth: true,
        title: '对账单列表',
      },
    },
    {
      path: '/online/uploadResult',
      name: 'uploadResult',
      component: () => import('@/views/online/uploadResult'),
      meta: {
        auth: true,
        title: '导入结果',
        hideInMenu: true,
      },
    },
    {
      path: '/online/abnormal',
      name: 'online.abnormal',
      component: () => import('@/views/online/abnormal'),
      meta: {
        auth: true,
        title: '导入异常列表',
        hideInMenu: true,
      },
    },
  ],
};
