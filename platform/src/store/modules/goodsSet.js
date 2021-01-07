import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import router from '@/router';
import http from '@/api/http';
// initial state
const state = {
  lists: [],
  fields: [],
  pages: {},
  detail: {},
  accountfields: [],
  accountlists: [],
  allShopItems: [],
  goodsStatus: {},
};

const actions = {
  fetchLists({ commit }, page) {
    http.get(Server.action.synLists, { page }).then((resData) => {
      const fieldList = resData.result.field;
      fieldList.push({
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      });
      console.log(resData);
      commit('setLists', resData.result.lists.data);
      commit('setFields', fieldList);
      commit('setPages', resData.result.lists);
      commit('setStatus', resData.result);
    });
  },
  openSyn({ commit }) {
    http.get(Server.action.openSyn).then((resData) => {
      console.log(resData);
      helper.showSuccess(resData.message);
    });
  },
  stopSyn({ commit }) {
    http.get(Server.action.stopSyn).then((resData) => {
      helper.showSuccess(resData.message);
    });
  },
  allShop({ commit }) {
    http.get(Server.action.allShop).then((resData) => {
      commit('setAllshop', resData.result);
    });
  },
  synAdd({ commit }, { formItem }) {
    fetch
      .post(Server.action.synAdd, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/goods/goodsSet/lists',
          });
        } else if (response.data.code === 414) {
          helper.showErrors(response.data.result.errors);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getDetail({ commit }, { id }) {
    fetch
      .get(Server.action.synDet + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  delSyn({ commit }, { id, lists }) {
    fetch
      .get(Server.action.synDel + id)
      .then((response) => {
        if (response.data.code === 0) {
          for (let i = 0; i < lists.length; i++) {
            if (lists[i].id === id) {
              lists.splice(i, 1);
              return;
            }
          }
          helper.showSuccess(response.data.message);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

};

const mutations = {
  setDetail(state, detail) {
    state.detail = detail;
  },
  setAllshop(state, lists) {
    state.allShopItems = lists;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setStatus(state, lists) {
    state.goodsStatus = lists;
  },
  setFields(state, fields) {
    state.fields = fields;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
