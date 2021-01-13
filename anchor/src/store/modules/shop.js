import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// import router from '@/router';

const state = {
  detail: {},
  addrsLists: [],
  addrsFields: [],
  addrsPages: {},
  customItems: [],
};
const actions = {
  setCustomItems({ commit }, { params }) {
    http.post(Server.action.tmplStore, params).then((resData) => {
      if (resData.code === 0) {
        helper.showSuccess(resData.message);
        helper.reload();
      }
    });
  },
  getCustomItems({ commit }, params) {
    http.get(Server.action.tmplStoreItems, params).then((resData) => {
      if (resData.code === 0) {
        console.log(resData);
        commit('setSiteItems', resData.result);
      }
    });
  },
  // 回寄地址列表
  getAddrsLists({ commit },{ obj, callback }) {
    console.log(obj);
    fetch
      .get(Server.action.shop_address_lists, { params: obj })
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field[3].scopedSlots = { customRender: 'tag' }
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          const data = response.data.result.lists.data;
          const pages = response.data.result.lists;
          commit('setAddrsLists', data);
          commit('setAddrsFields', field);
          commit('setAddrsPages', pages);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 添加回寄地址
  addAddrs({ commit },  obj ) {
    fetch
      .post(Server.action.shop_address_add, obj)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else if (response.data.code === 414) {
          helper.showError(response.data.message);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 删除回寄地址
  delAddrs({ commit }, delId) {
    fetch
      .get(Server.action.shop_address_del + '?id=' + delId )
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
  // 编辑回寄地址
  editAddrs({ commit }, editObj) {
    fetch
      .post(Server.action.shop_address_edit, editObj)
      .then((response) => {
        if (response.data.code === 0) {
          // helper.reload();
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
  editShopInfo({ commit }, { formItem }) {
    fetch
      .post(Server.action.shop_edit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          // helper.reload();
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
  getDetail({ commit }) {
    fetch
      .get(Server.action.shop_detail)
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
};
const mutations = {
  setSiteItems(state, items) {
    state.customItems = items;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setAddrsLists(state, lists) {
    state.addrsLists = lists;
  },
  setAddrsFields(state, lists) {
    state.addrsFields = lists;
  },
  setAddrsPages(state, lists) {
    state.addrsPages = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
