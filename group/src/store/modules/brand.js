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
  sltLists: [],
  sltFields: [],
  sltPages: {},
};

const actions = {
  sltBrandLists({ commit }, page) {
    http
      .get(Server.action.slt_brand_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setSltLists', response.result.lists);
          commit('setSltFields', field);
        } else {
          helper.showError(response.data.message);
        }
      });
  },

  fetchLists({ commit },params) {
    fetch
      .get(Server.action.brand_lists,{params})
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field[4].scopedSlots = { customRender: 'brand_logo' };
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: 100,
          });
          commit('setLists', response.data.result.lists.data);
          commit('setPages', response.data.result.lists);
          commit('setFields', field);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  addBrand({ commit }, { formItem }) {
    fetch
      .post(Server.action.brand_add, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/goods/brand/lists',
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
      .get(Server.action.brand_detail + id)
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

  delBrand({ commit }, { id }) {
    fetch
      .get(Server.action.brand_del + id)
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

  editBrand({ commit }, { postData }) {
    fetch
      .post(Server.action.brand_edit, postData)
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
  setSltLists(state, lists) {
    state.sltLists = lists;
  },
  setSltFields(state, fields) {
    state.sltFields = fields;
  },
  setDetail(state, detail) {
    state.detail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  // set fields
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
