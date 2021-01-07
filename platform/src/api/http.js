import notification from 'ant-design-vue/es/notification';
import request from './request';
import helper from '@/utils/helper';

const http = {};

/**
 * http get

 * @param url
 * @param params
 * @returns {Promise<T | never>}
 */
http.get = (url, params) => request
  .get(url, { params })
  .then((response) => {
    if (response.data.code !== 0) {
      notification.error({
        message: 'Notice',
        description: response.data.message,
      });
    }
    return response.data;
  });

/**
 * http post
 *
 * @param url
 * @param params
 * @returns {Promise<T | never>}
 */
http.post = (url, params) => request
  .post(url, params)
  .then((response) => {
    if (response.data.code === 0) {
      notification.success({
        message: 'Notice',
        description: response.data.message,
      });
    } else if (response.data.code === 414) {
      helper.showErrors(response.data.result.errors);
    } else {
      helper.showError(response.data.message);
    }
    return response.data;
  });

export default http;
