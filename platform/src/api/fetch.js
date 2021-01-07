import axios from "axios";
import config from "./config";
import router from "@/router";
import Cookies from "js-cookie";

let fetch = axios.create(config);

// http request 拦截器
fetch.interceptors.request.use(
  config => {
    if (Cookies.get("ego_access_token")) {
      config.headers.Authorization = "Bearer " + Cookies.get("ego_access_token");
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
fetch.interceptors.response.use(
  response => {
    if (response.data.code === 401) {
      // token过期
      Cookies.remove("access_token");
      router.replace({
        path: "/passport/login",
        query: {
          redirect: router.currentRoute.fullPath
        }
      });
    }
    return response;
  },

  error => {
    return Promise.reject(error);
  }
);

export default fetch;
