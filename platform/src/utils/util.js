import Cookies from 'js-cookie';
import config from '@/config/common';

export const ACCESS_TOKEN = 'ego_access_token';
export const USER_INFO = 'ego_user_info';

/**
 * 设置Cookie
 * @param token
 */
export const setAccessToken = (token) => {
  Cookies.set(ACCESS_TOKEN, token, { expires: config.cookieExpires || 100 });
};
export const setUserInfo = (info) => {
  Cookies.set(USER_INFO, info, { expires: config.cookieExpires || 100 });
};
/**
 * 获取Cookie
 * @returns {*}
 */
export const getAccessToken = () => {
  const token = Cookies.get(ACCESS_TOKEN);
  if (token) {
    return token;
  }
  return false;
};
export const getUserInfo = () => {
  const info = Cookies.get(USER_INFO);
  if (info) {
    return info;
  }
  return false;
};
export function timeFix() {
  const time = new Date();
  const hour = time.getHours();
  return hour < 9
    ? '早上好'
    : hour <= 11
      ? '上午好'
      : hour <= 13
        ? '中午好'
        : hour < 20
          ? '下午好'
          : '晚上好';
}

export function welcome() {
  const arr = [
    '休息一会儿吧',
    '准备吃什么呢?',
    '要不要打一把 DOTA',
    '我猜你可能累了',
  ];
  const index = Math.floor(Math.random() * arr.length);
  return arr[index];
}

/**
 * 触发 window.resize
 */
export function triggerWindowResizeEvent() {
  const event = document.createEvent('HTMLEvents');
  event.initEvent('resize', true, true);
  event.eventType = 'message';
  window.dispatchEvent(event);
}

/**
 * Remove loading animate
 * @param id parent element id or class
 * @param timeout
 */
export function removeLoadingAnimate(id = '', timeout = 1500) {
  if (id === '') {
    return;
  }
  setTimeout(() => {
    document.body.removeChild(document.getElementById(id));
  }, timeout);
}
