import axios from 'axios';
import Cookies from 'js-cookie';
import config from './axios_config';
import router from '@/router';

const request = axios.create(config);

// http request 拦截器
request.interceptors.request.use(
  (config) => {
    if (Cookies.get('ego_access_token')) {
      config.headers.Authorization = `Bearer ${Cookies.get('ego_access_token')}`;
    }
    return config;
  },
  error => Promise.reject(error),
);

// http response 拦截器
request.interceptors.response.use(
  (response) => {
    if (response.data.code === 401) {
      // token过期
      Cookies.remove('ego_access_token');
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

export default request;
