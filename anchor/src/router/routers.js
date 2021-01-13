import { BasicLayout, UserLayout } from '@/components/layouts';
import dashboard from './modules/dashboard';
import goods from './modules/goods';
import shop from './modules/shop';
import trade from './modules/trade';
import settlement from './modules/settlement';
import marketing from './modules/marketing';
import statement from './modules/statement';
import statistics from './modules/statistics';
import permission from './modules/permission';
import coupon from './modules/coupon';
import delivecode from './modules/delivecode';
// import account from './modules/account';
import rate from './modules/rate';
import article from './modules/article';
import desktop from './modules/desktop.js';

export const routers = [
  {
    path: '/',
    name: 'index',
    component: BasicLayout,
    meta: { title: '首页' },
    redirect: '/dashboard/main',
    children: [
      dashboard, // 首页
      // goods,
      // shop,
      // trade,
      // delivecode,
      // settlement,
      // marketing,
      // coupon,
      // // statement,
      // statistics,
      // // article,//文章
      // rate,
      desktop,
      // permission,
    ],
  },
  { // 登录页
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
      {
        path: 'register',
        name: 'register',
        component: () => import('@/views/passport/register'),
      },
      {
        path: 'reset_password',
        name: 'reset_password',
        component: () => import('@/views/passport/reset_password'),
      },
    ],
  },
];
