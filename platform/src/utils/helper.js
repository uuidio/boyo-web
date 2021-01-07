// import notification from 'ant-design-vue/es/notification';
//
// const helper = {};
//
// helper.showError = (message) => {
//   if (typeof message === 'object') {
//     for (const key in message) {
//       notification.error({
//         message: 'Errors',
//         description: message[key],
//       });
//     }
//   } else {
//     notification.error({
//       message: 'Errors',
//       description: message,
//     });
//   }
// };
//
// export default helper;

import Vue from "vue";

let helper = {};

helper.printR = data => {
  console.log(JSON.stringify(data));
};

helper.showErrors = message => {
  for (let key in message) {
    Vue.prototype.$notification.error({
      message: message[key]
    });
  }
};

helper.showError = message => {
  Vue.prototype.$notification.error({
    message: message
  });
};

helper.showSuccess = message => {
  Vue.prototype.$notification.success({
    message: message
  });
};

helper.reload = () => {
  setTimeout(function() {
    location.reload();
  }, 1000);
};

export default helper;

