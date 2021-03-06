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
    Vue.prototype.warn = function (title, description) {
      this.$notification.warning({message: title, description,});
    };
    Vue.prototype.c_router = function (path, query) {
      this.$router.push({path, query});
    };
    Vue.prototype.open_delete = function (option) {
      const _this = this
      this.$confirm({
        title: '是否确定删除？',
        okText: '确定',
        cancelText: '取消',
        onCancel() {
        },
        onOk() {
          return new Promise((resolve, reject) => {
            _this.$fetch.post(option.url, option.data).then((resData) => {
              if (resData.data.code === 0) {
                if (_this.table_list.length == 1) {
                  _this.get_table_list(_this.table_param.page - 1)
                } else {
                  _this.get_table_list()
                }
                _this.ok('操作成功');
                resolve()
              } else {
                reject(resData)
              }
            })
          }).catch((resData) => {
            console.log(resData);
            _this.xx(resData.data.message);
          });
        },
      });
    };
    Vue.prototype.get_suffix = function (file_name,way) {
      const filename = file_name;
      let type = ''
      if(way=='last'){
        type = file_name.substring(filename.lastIndexOf("."), filename.length);
      }else{
        type = file_name.substring(0,filename.lastIndexOf("."));
      }

      return type;
    };
    Vue.prototype.each = function (obj, fn) {
      var key;
      if (obj instanceof Array) {
        obj.forEach((item, index) => {
          fn(item, index);
        })
      } else {
        for (key in obj) {
          fn(key, obj[key]);
        }
      }
    };
    Vue.prototype.cut_date = function (date,num) {
      return date.slice(0, num);
    };
    Vue.prototype.copy_obj = function (obj) {
      return JSON.parse(JSON.stringify(obj));
    };
  },
};
