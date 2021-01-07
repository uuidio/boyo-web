import { BasicLayout, UserLayout } from '@/components/layouts';
import dashboard from './modules/dashboard';
import permission from './modules/permission';
import goods from './modules/goods';
import shop from './modules/shop';
import member from './modules/member';
import settle from './modules/settle';
import trade from './modules/trade';
import promotion from './modules/promotion';
import statistics from './modules/statistics';
import site from './modules/site';
import groupsite from './modules/groupsite';
import article from './modules/article';
import rule from './modules/rule';

export const routers = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/main',
    children: [
      dashboard,
      goods,
      shop,
      trade,
      rule,
      article,
      member,
      settle,
      promotion,
      statistics,
      site,
      groupsite,
      permission,
    ],
  },
  {
    path: '/passport',
    name: 'passport',
    component: UserLayout,
    redirect: '/passport/login',
    children: [
      {
        path: 'login',
        name: 'login',
        component: () => import('@/views/passport/Login'),
      },
    ],
  },
];
