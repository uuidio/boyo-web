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
  selectOpt: [],
  classItemTree: [],
};

const actions = {
  fetchLists({ commit }, item) {
    http.get(Server.action.classThird, item).then((resData) => {
      console.log(resData);
      const fieldList = resData.result.field;
      fieldList.push({
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      });
      commit('setLists', resData.result.lists.data);
      commit('setFields', fieldList);
      commit('setPages', resData.result.lists);
      commit('setSelect', resData.result.third);
    });
  },
  getClassTree({ commit }) {
    http.get(Server.action.classTree).then((resData) => {
      commit('setClassTree', resData.result);
    });
  },
  classThirdSubmit({ commit }, { formItem }) {
    fetch
      .post(Server.action.classThirdSubmit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
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
};

const mutations = {
  setClassTree(state, lists) {
    state.classItemTree = lists;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setSelect(state, lists) {
    state.selectOpt = lists;
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
