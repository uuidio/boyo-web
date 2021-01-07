import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
// initial state
const state = {
  lists: [],
  fields: [],
  detail: {},
  pages: {},
};

const actions = {
  fetchLists({ commit }, params) {
    http
      .get(Server.action.floorLists, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[5].scopedSlots = { customRender: 'class_icon' };
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: 100,
          });
          commit('setLists', response.result.lists.data);
          commit('setFields', field);
          commit('setPages', response.result.lists);
          console.log(response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  add({ commit }, { formItem }) {
    fetch
      .post(Server.action.floorAdd, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/goods/floor/lists',
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
      .get(`${Server.action.floorDet}?id=${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result);
          console.log(response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  del({ commit }, { id }) {
    fetch
      .get(Server.action.floorDel + '?id=' + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  edit({ commit }, { postData }) {
    fetch
      .post(Server.action.floorEdit, postData)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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
  setDetail(state, detail) {
    state.detail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  // set fields
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
