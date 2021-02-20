import axios from 'axios';
import Cookies from 'js-cookie';
import config from './config';
import router from '@/router';

const fetch = axios.create(config);

// http request 拦截器
fetch.interceptors.request.use(
  (config) => {
    if (Cookies.get('live_access_token')) {
      config.headers.Authorization = `Bearer ${Cookies.get('live_access_token')}`;
    }
    if (config.data) {
      if (config.data.timeout) {
        config.timeout = config.data.timeout;
        delete config.data.timeout;
      }
    }
    return config;
  },
  error => Promise.reject(error),
);

// http response 拦截器
fetch.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      // token过期
      Cookies.remove('live_access_token');
      router.replace({
        path: '/passport/login',
        query: {
          redirect: router.currentRoute.fullPath,
        },
      });
    }
    return response;
  },

  error => Promise.reject(error),
);

export default fetch;
