import QS from 'qs';
import Server from '../config/server.js';

export default {
  baseURL: Server.baseURL,
  method: 'GET',
  headers: {
    Accept: 'application/json',
    'Content-Type':'application/json'
  },
  params: {},
  timeout: 600000,
  withCredentials: false,
  responseType: 'json',
  maxContentLength: 2000,
  validateStatus(status) {
    return status >= 200 && status < 500;
  },
  maxRedirects: 5,
  // transformRequest: [data => QS.stringify(data)],
  // paramsSerializer: params => QS.stringify(params),
  data: {},
};
