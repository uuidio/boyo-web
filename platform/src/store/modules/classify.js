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
  goodsType: [],
};

const actions = {
  fetchLists({ commit }) {
    http
      .get(Server.action.class_lists)
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
          commit('setLists', response.result.lists);
          commit('setFields', field);
        } else {
          helper.showError(response.message);
        }
      });
  },
  addGoodsClass({ commit }, { formItem }) {
    fetch
      .post(Server.action.class_add, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/goods/class/lists',
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
      .get(`${Server.action.class_detail}/${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result.GoodsClass);
          commit('setGoodsType', response.data.result.GoodsType);
          console.log(response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getGoodsType({ commit }) {
    fetch
      .get(Server.action.class_detail)
      .then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.result);
          commit('setGoodsType', response.data.result.GoodsType);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delClass({ commit }, { id }) {
    fetch
      .get(Server.action.class_del + id)
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

  editClass({ commit }, { postData }) {
    fetch
      .post(Server.action.class_edit, postData)
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
  setGoodsType(state, detail) {
    state.goodsType = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
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
