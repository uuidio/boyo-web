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
import loginPermission from './modules/loginPermission';
import indexDecoration from './modules/indexDecoration';
import integral from './modules/integral';
import article from './modules/article';
import rule from './modules/rule';
import draw from './modules/draw';
import reward from './modules/reward';

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
    loginPermission,
    indexDecoration,
    integral,
    article,
    rule,
    draw,
    reward,
  },
  state: {},
  mutations: {},
  actions: {
  },
  getters,

});
