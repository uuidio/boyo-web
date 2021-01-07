import Vue from 'vue';
import Storage from 'vue-ls';
import App from './App.vue';
import router from './router';
import store from './store';
import 'iview/dist/styles/iview.css';
import Antd from 'ant-design-vue';
import './permission';
import 'ant-design-vue/dist/antd.less'; // or 'ant-design-vue/dist/antd.less'
import '_styles/common.css';
import {
  DEFAULT_COLOR,
  DEFAULT_THEME,
  DEFAULT_LAYOUT_MODE,
  DEFAULT_COLOR_WEAK,
  SIDEBAR_TYPE,
  DEFAULT_FIXED_HEADER,
  DEFAULT_FIXED_HEADER_HIDDEN,
  DEFAULT_FIXED_SIDEMENU,
  DEFAULT_CONTENT_WIDTH_TYPE,
} from '@/store/mutation-types';
import config from '@/defaultSettings';
import Icon from 'ant-design-vue/es/icon';
import VCharts from 'v-charts'
Vue.config.productionTip = false;

Vue.use(Storage, config.storageOptions);
Vue.use(VCharts)
Vue.use(Antd);
Vue.use(router);
const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_909562_6fo7mvdi8tw.js',
});
Vue.component('em-icon', IconFont);

// 模糊查询select组件
Vue.prototype.SltFilterOption = function (input, option) {
  return (
    option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
  );
}
// 二/三维数组转一维
Vue.prototype.OneDimensionalArray = function (dimensionalArray, isThree) {
  const arr = []
  if (isThree) {
    for (let i = 0; i < dimensionalArray.length; i++) {
      for (let j = 0; j < dimensionalArray[i].length; j++) {
        for (let k = 0; k < dimensionalArray[i][j].length; k++) {
          arr.push(dimensionalArray[i][j][k]);
        }
      }
    }
  } else {
    for (let i = 0; i < dimensionalArray.length; i++) {
      for (let j = 0; j < dimensionalArray[i].length; j++) {
        arr.push(dimensionalArray[i][j]);
      }
    }
  }
  return arr;
}

new Vue({
  router,
  store,
  created() {
    store.commit('SET_SIDEBAR_TYPE', Vue.ls.get(SIDEBAR_TYPE, true));
    store.commit('TOGGLE_THEME', Vue.ls.get(DEFAULT_THEME, config.navTheme));
    store.commit(
      'TOGGLE_LAYOUT_MODE',
      Vue.ls.get(DEFAULT_LAYOUT_MODE, config.layout),
    );
    store.commit(
      'TOGGLE_FIXED_HEADER',
      Vue.ls.get(DEFAULT_FIXED_HEADER, config.fixedHeader),
    );
    store.commit(
      'TOGGLE_FIXED_SIDERBAR',
      Vue.ls.get(DEFAULT_FIXED_SIDEMENU, config.fixSiderbar),
    );
    store.commit(
      'TOGGLE_CONTENT_WIDTH',
      Vue.ls.get(DEFAULT_CONTENT_WIDTH_TYPE, config.contentWidth),
    );
    store.commit(
      'TOGGLE_FIXED_HEADER_HIDDEN',
      Vue.ls.get(DEFAULT_FIXED_HEADER_HIDDEN, config.autoHideHeader),
    );
    store.commit(
      'TOGGLE_WEAK',
      Vue.ls.get(DEFAULT_COLOR_WEAK, config.colorWeak),
    );
    store.commit(
      'TOGGLE_COLOR',
      Vue.ls.get(DEFAULT_COLOR, config.primaryColor),
    );
    // store.commit("SET_TOKEN", Vue.ls.get(ACCESS_TOKEN));

    console.log('.... created ()');
  },
  render: h => h(App),
}).$mount('#app');
