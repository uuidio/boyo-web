import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// import router from '@/router';

const state = {
  afterSales: [],
  fields: [],
  pages: {},
  allInfo: {},
  allAftersaleTrace: [],
};
const actions = {
  // 售后记录
  afterSaleGetAftersaleTrace({ commit }, oid) {
    fetch.get(Server.action.afterSaleGetAftersaleTrace, { params: { oid } }).then((resData) => {
      console.log(resData);
      if (resData.data.code === 0) {
        commit('setAftersaleTrace', resData.data.result);
      }
    });
  },
  againService({ commit }, { formData }) {
    fetch
      .post(Server.action.afterSales_again_examine, formData)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          // helper.reload()
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  fetchLists({ commit }, params) {
    http.get(Server.action.afterSalesLists, params).then((resData) => {
      console.log(resData);
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          fixed: 'right',
          width: 100,
          scopedSlots: { customRender: 'action' },
        });
        commit('setEead', field);
        commit('setPage', resData.result.lists);
        commit('setLists', resData.result.lists.data);
      }
    });
  },
  saleDetail({ commit }, params) {
    http.get(Server.action.afterSalesDetail, params).then((resData) => {
      if (resData.code === 0) {
        commit('setDetail', resData.result.info);
      }
    });
  },
  afterSalesVerification({ commit }, { formItem }) {
    fetch
      .post(Server.action.afterSalesVerification, formItem)
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
  sendConfirm({ commit }, { formItem }) {
    fetch
      .post(Server.action.sendConfirm, formItem)
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
};
const mutations = {
  setAftersaleTrace(state, lists) {
    state.allAftersaleTrace = lists;
  },
  setLists(state, lists) {
    state.afterSales = lists;
  },
  setEead(state, lists) {
    state.fields = lists;
  },
  setPage(state, lists) {
    state.pages = lists;
  },
  setDetail(state, lists) {
    state.allInfo = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
