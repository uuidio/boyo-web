import http from '../api/http.js'
export default {
  install(Vue) {
    Vue.prototype.showMessage = function (path, params) {
      this.$router.push({
        path,
        query: params,
      });
    };
    Vue.prototype.ok = function (title, description) {
      this.$notification.success({message: title, description,});
    };
    Vue.prototype.xx = function (title, description) {
      this.$notification.error({message: title, description,});
    };
    Vue.prototype.c_router = function (path, query) {
      this.$router.push({ path, query });
    };
    Vue.prototype.cut_date = function (date) {
      return date.slice(0, 6);
    };
  },
};
