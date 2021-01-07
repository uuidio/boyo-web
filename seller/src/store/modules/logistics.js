import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  detail: {},
  logField: [],
  logLists: [],
  pages: {},
};
const actions = {
  logistics({ commit }, params) {
    http.get(Server.action.shipList, params).then((resData) => {
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' },
        });
        commit('setField', field);
        commit('setPage', resData.result.lists);
        commit('setLists', resData.result.lists.data);
      }
    });
  },
  logisticsDet({ commit }, params) {
    http.get(Server.action.shipDet , params).then((resData) => {
      if (resData.code === 0) {
        commit('setDetail', resData.result.data);
      }
    });
  },
  logisticsDel({ commit }, { params, lists }) {
    http.get(Server.action.shipDel ,params).then((resData) => {
      if (resData.code === 0) {
        for (let i = 0; i < lists.length; i++) {
          if (lists[i].id === params.id) {
            lists.splice(i, 1);
            return;
          }
        }
        helper.showSuccess(resData.message);
      }
    });
  },
  logisticsAdd2({ commit }, { formItem }) {
    fetch
      .post(Server.action.addTemplates, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/trade/logisticsconfig',
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
  logisticsEdit({ commit }, { formItem }) {
    fetch
      .post(Server.action.shipUpdate, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload()
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
    state.logField = lists;
  },
  setLists(state, lists) {
    state.logLists = lists;
  },
  setPage(state, lists) {
    state.pages = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
