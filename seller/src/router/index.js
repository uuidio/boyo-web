import Vue from 'vue';
import Router from 'vue-router';
import nprogress from 'nprogress';
import 'nprogress/nprogress.css'; // progress bar style
import { routers } from './routers';
import { getAccessToken } from '@/utils/util';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  scrollBehavior: () => ({ y: 0 }),
  routes: routers,
});

router.beforeEach((to, from, next) => {
  nprogress.start();
  // next();
  const accessToken = getAccessToken();
  if (!accessToken && to.meta.auth) {
    next({
      path: '/passport/login',
    });
  } else {
    next();
  }
});

router.afterEach(() => {
  nprogress.done(); // finish progress bar
});

export default router;
