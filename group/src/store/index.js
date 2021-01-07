import Vue from 'vue';
import Vuex from 'vuex';

import app from './modules/app';
import user from './modules/user';
import goods from './modules/goods';
import brand from './modules/brand';
import member from './modules/member';
import shop from './modules/shop';
import classify from './modules/classify';
import trade from './modules/trade';
import goodsSet from './modules/goodsSet';
import getters from './getters';
import config from './modules/config';
import relevance from './modules/relevance';
import statistics from './modules/statistics';
import custom from './modules/custom';
import floor from './modules/floor';
import marketClass from './modules/marketClass';
import rateAppeal from './modules/rateAppeal';
import seckill from './modules/seckill';
import coupon from './modules/coupon';
import point from './modules/point';
import settle from './modules/settle';
import activity from './modules/activity';
import permission from './modules/permission';
import project from './modules/project';
import loginPermission from './modules/loginPermission';
import article from './modules/article';
import generalize from './modules/generalize';
import rule from './modules/rule';
import online from './modules/online';
import wallet from './modules/wallet';

Vue.use(Vuex);
export default new Vuex.Store({
  modules: {
    app,
    user,
    goods,
    classify,
    brand,
    shop,
    config,
    member,
    trade,
    goodsSet,
    relevance,
    statistics,
    custom,
    floor,
    marketClass,
    rateAppeal,
    seckill,
    coupon,
    point,
    settle,
    activity,
    permission,
    project,
    loginPermission,
    rule,
    article,
    generalize,
    online,
    wallet,
  },
  state: {},
  mutations: {},
  actions: {
  },
  getters,

});
