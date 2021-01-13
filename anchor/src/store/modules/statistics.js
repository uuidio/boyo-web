import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// initial state
const state = {
  analysis: {},
  indexItems: {},
  trades: [],
  shopData: [],
  goodsAnalysisLists: [],
  goodsAnalysisField: [],
  CurrentTimeData: {},
  DownLists: [],
  DownField: [],
  DownPages: [],
};

const actions = {
  downLoadList({ commit }, params) {
    http
		  .get(Server.action.downLoadList, params)
		  .then((response) => {
        if (response.code === 0) {
			  const field = response.result.field;
			  field.push({
            title: '操作',
            dataIndex: 'action',
            width: 150,
            scopedSlots: { customRender: 'action' },
			  });
			  commit('setDownFields', field);
			  commit('setDownPage', response.result.lists);
			  commit('setDownLists', response.result.lists.data);
        } else {
			  helper.showError(response.message);
        }
		  })
		  .catch((error) => {
        helper.showError(error);
		  });
	  },
  currentTime({ commit }) {
    http
      .get(Server.action.currentTime)
      .then((response) => {
        if (response.code === 0) {
          console.log(response);
          commit('setCurrentTimeData', response.result);
        }
      });
  },
  goodsAnalysis({ commit }, params) {
    fetch
      .post(Server.action.goodsAnalysis, params)
      .then((response) => {
        if (response.data.code === 0) {
          console.log(response);
          const filed = response.data.result.field;
          filed[1].width = 400;
          filed[2].scopedSlots = { customRender: 'pic_path' };
          commit('setGoodsAnalysisLists', response.data.result.goodsListData);
          commit('setGoodsAnalysisField', filed);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  tradeAnalysis({ commit }, params) {
    fetch
      .post(Server.action.tradeAnalysis, params)
      .then((response) => {
        if (response.data.code === 0) {
          const trade = response.data.result.tradeData.tradeInfo;
          commit('setLists', trade);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  indexDetail({ commit }, params) {
    http
      .get(Server.action.indexDetail, params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response);
          commit('setIndex', response.result);
        } else {
          helper.showError(response.message);
        }
      });
  },
};

const mutations = {
  setLists(state, lists) {
    state.trades = lists;
  },
  setShopLists(state, lists) {
    state.shopData = lists;
  },
  setGoodsAnalysisLists(state, lists) {
    state.goodsAnalysisLists = lists;
  },
  setGoodsAnalysisField(state, lists) {
    state.goodsAnalysisField = lists;
  },
  setIndex(state, lists) {
    state.indexItems = lists;
  },
  setCurrentTimeData(state, lists) {
    state.CurrentTimeData = lists;
  },
  setDownLists(state, lists) {
    state.DownLists = lists;
  },
  setDownPage(state, lists) {
    state.DownPages = lists;
  },
  setDownFields(state, lists) {
    state.DownField = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
