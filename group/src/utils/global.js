export default {
  install(Vue) {
    Vue.prototype.showMessage = function (path, params) {
      this.$router.push({
        path,
        query: params,
      });
    };
  },
};
