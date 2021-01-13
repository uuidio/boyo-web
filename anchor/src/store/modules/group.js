import helper from '@/utils/helper';
import Server from '@/config/server'
import http from '@/api/http';
import fetch from '@/api/fetch';
import router from '@/router';

const state = {
  field: [],
  dataLists: [],
  pages: {},
  detail: {},
  sellerField: [],
  sellerDataLists: [],
  sellerPages: {},
  applyDetail: {},
};
const actions = {
  fetchLists({ commit }, params) {
    http
      .get(Server.action.groupGoodList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 150,
            scopedSlots: { customRender: 'action' },
          });
          field[6].scopedSlots = { customRender: 'goods_image' };
          commit('setField', field);
          commit('setPages', response.result.lists);
          commit('setData', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  deleteRow({ commit }, { param, listData }) {
    let url = param.isForce ? Server.action.groupForceDel : Server.action.registeredDetail;
    fetch
      .get(url + '?id=' + param.id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === param.id) {
              return listData.splice(i, 1);
            }
          }
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDetail({ commit }, params) {
    http
      .get(Server.action.registeredDetail, params)
      .then((response) => {
        if (response.code === 0) {
          commit('setDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  groupApplySave({ commit }, { formItem }) {
    fetch
      .post(Server.action.registeredApplySave, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/marketing/group/lists',
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
};
const mutations = {
  setField(state, lists) {
    state.field = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setData(state, lists) {
    state.dataLists = lists;
  },
  setSellerPages(state, lists) {
    state.sellerPages = lists;
  },
  setSellerField(state, lists) {
    state.sellerField = lists;
  },
  setSellerData(state, lists) {
    state.sellerDataLists = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setApplyDetail(state, lists) {
    state.applyDetail = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
