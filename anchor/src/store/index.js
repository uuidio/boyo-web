import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import goods from './modules/goods';
import trade from './modules/trade';
import marketing from './modules/marketing';
import shop from './modules/shop';
import rate from './modules/rate';
import custom from './modules/custom';
import article from './modules/article';
import logistics from './modules/logistics';
import afterSales from './modules/afterSales';
import seckill from './modules/seckill';
import group from './modules/group';
import statistics from './modules/statistics';
import permission from './modules/permission';
import loginPermission from './modules/loginPermission';
import getters from './getters';
import settle from './modules/settle';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    app,
    user,
    goods,
    trade,
    marketing,
    rate,
    shop,
    custom,
		article,
    logistics,
    afterSales,
    seckill,
    group,
    statistics,
    permission,
    loginPermission,
    settle,
},
  state: {},
  mutations: {},
  actions: {},
  getters,

});
