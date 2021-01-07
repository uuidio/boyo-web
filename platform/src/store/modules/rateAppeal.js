import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// initial state
const state = {
  lists: [],
  fields: [],
  pages:{}
};

const actions = {
  fetchLists({ commit }, page) {
    http
      .get(Server.action.rateAppealLists, {page})
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setLists', response.result.lists.data);
          commit('setFields', field);
          commit('setPages', response.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  rateAppealCheck({ commit },{ formItem,callback}) {
    fetch
      .post(Server.action.rateAppealCheck, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          callback && callback()
        } else if (response.data.code === 414) {
          helper.showErrors(response.result.errors);
        } else if (response.data.code === 600) {
          helper.showError(response.data.message);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
};

const mutations = {
  setLists(state, lists) {
    state.lists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setFields(state, fields) {
    state.fields = fields;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
