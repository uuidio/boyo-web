import { BasicLayout, UserLayout } from '@/components/layouts';
import dashboard from './modules/dashboard';
import permission from './modules/permission';
import goods from './modules/goods';
import shop from './modules/shop';
import member from './modules/member';
import settle from './modules/settle';
import trade from './modules/trade';
import desktop from './modules/desktop.js';
// import promotion from './modules/promotion';
import statistics from './modules/statistics';
import site from './modules/site';
import project from './modules/project';
import article from './modules/article';
import generalize from './modules/generalize';
import online from './modules/online';
import rule from './modules/rule';
// import wallet from './modules/wallet';

export const routers = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/main',
    children: [
      dashboard,
      project,
      goods,
      shop,
      trade,
      rule,
      online,
      member,
      article,
      settle,
      // promotion,
      statistics,
      generalize,
      site,
      // wallet,//钱包管理
      desktop,
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
