import Server from '@/config/server';
import http from '@/api/http';

// initial state
const state = {
  configItems: {},
  classTree: [],
  shopLists: [],
  integarlConfig: [],
  alertConfig: [],
  logPages:{},
  logLists:[],
  logHeader:[],
  free_order_amount:{},
  banners:[],
  tradeConfig:[],
  shopTel:'',
  homeRecommendGoodList:[],
  personRecommendGoodList:[],
  cartRecommendGoodList:[],
 //recommendGoodList:[]
  genLists:{},
};

const actions = {
  // 添加站点配置
  addSiteConfig({ commit }, { params }) {
    http.post(Server.action.config_site_add, params);
  },
  getSiteConfig({ commit }, page) {
    http.get(Server.action.config_site_items,  page ).then((resData) => {
      commit('setSiteConfig', resData.result);
    });
  },
  getLogLists({ commit }, page) {
    http.get(Server.action.logLists, { page }).then((resData) => {
      if(resData.code===0){
        commit('setLogLists', resData.result.lists.data);
        commit('setLogPages', resData.result.lists);
        commit('setLogHeader', resData.result.field);
      }
    });
  },
  getClassTree({ commit }) {
    http.get(Server.action.goods_class_tree).then((resData) => {
      commit('setConfigClass', resData.result);
    });
  },
  getShopLists({ commit }, params) {
    http.get(Server.action.shop_lists, params).then((resData) => {
      commit('setShopLists', resData.result.lists.data);
    });
  },
  getConfig({ commit }, {params,callBack}) {
    http.get(Server.action.config_get, params).then((resData) => {
      if(params.group==='free_order_amount'){
        commit('setFree_order_amount', resData.result);
      }else if(params.group==='banner'){
        commit('setBannerImg', resData.result);
      }else if(params.group==='base'){
        commit('setShopTel', resData.result);
      }else if(params.group==='trade'){
        commit('setTradeConfig', resData.result);
      }else if(params.group==='platform_attrs'){
        commit('setGenConfig', resData.result);
      }else{
        if (params.page === 'shop') {
          commit('setIntegral', resData.result);
        } else {
          commit('setAlert', resData.result);
        }
      }
      callBack && callBack()
    });
  },
  getRecommendList({ commit }, {params,callBack}) {
    http.get(Server.action.recommendItems, params).then((resData) => {
       if(params.page==='index'){
         commit('set_Home_recommend', resData.result);
	   }else if(params.page==='cart'){
        commit('set_cart_recommend', resData.result);
     }else{
         commit('set_person_recommend', resData.result);
	   }
	// console.log(params.group+'推荐列表',resData);
      callBack && callBack()
    });
  },
  addRecommendList({ commit }, { params }) {
    http.post(Server.action.recommendAdd, params);
  },
  setConfig({ commit }, params) {
    http.post(Server.action.config_set, params).then((resData) => {
      if (resData.code === 0) {
        // console.log(resData)
        // commit('setIntegral', params.value);
      }
    });
  },
};

const mutations = {
  setGenConfig(state, data) {
    state.genLists = data;
  },
  setLogLists(state, data) {
    state.logLists = data;
  },
  setShopTel(state, data) {
    state.shopTel = data;
  },
  setLogHeader(state, data) {
    state.logHeader = data;
  },
  setLogPages(state, data) {
    state.logPages = data;
  },
  setSiteConfig(state, data) {
    state.configItems = data;
  },
  setTradeConfig(state, data) {
    state.tradeConfig = data;
  },
  setConfigClass(state, data) {
    state.classTree = data;
  },
  setShopLists(state, data) {
    state.shopLists = data;
  },
  setIntegral(state, data) {
    state.integarlConfig = data;
  },
  setAlert(state, data) {
    state.alertConfig = data;
  },
  setFree_order_amount(state, data) {
    state.free_order_amount = data;
  },
  setBannerImg(state, data) {
    state.banners = data;
  },
  set_Home_recommend(state, data) {
    state.homeRecommendGoodList = data;
  },
  set_person_recommend(state, data) {
    state.personRecommendGoodList = data;
  },
  set_cart_recommend(state, data) {
    state.cartRecommendGoodList = data;
  },
// serRecommendGoodList(state, data) {
//     state.recommendGoodList = data;
//   },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
