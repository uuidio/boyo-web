import helper from '@/utils/helper';
import Server from '@/config/server';
import http from '@/api/http';
// import fetch from '@/api/fetch';
import router from '@/router';

const state = {
  activityList: [],
  classifyList: [],
  classifyField: [],
  classifyPages: {},
  classifyItem: {
    name: '',
    parent_id: 0,
    listorder: '',
  },
  dataField: [],
  dataList: [],
  dataPages: {},
  dataItem: {},
  ruleTypeList: [],
};
const actions = {
  getRuleType({ commit }, params) {
    http
      .get(Server.action.ruleTypeList, params)
      .then((response) => {
        if (response.code === 0) {
          commit('setRuleType', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  editDataItem({ commit }, formItem) {
    http
      .post(Server.action.editRuleItem, formItem)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message)
          // helper.reload();
          setTimeout(() => {
            router.back();
          }, 1000);
        } else if (response.code === 414) {
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  deleteDateItem({ commit }, params) {
    http
      .get(Server.action.deleteRuleItem, params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          helper.reload();
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDataItem({ commit }, params) {
    http
      .get(Server.action.ruleItem + '/' + params)
      .then((response) => {
        if (response.code === 0) {
          commit('setDataItem', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addDateItem({ commit }, formItem) {
    http
      .post(Server.action.addRule, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message)
          helper.reload();
          setTimeout(() => {
            router.back();
          }, 1000);
        } else if (response.code === 414) {
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDateList({ commit }, params) {
    http
      .get(Server.action.ruleList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setDataField', field);
          commit('setDataPages', response.result.lists);
          commit('setDataList', response.result.lists.data);
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
  setRuleType(state, obj) {
    state.ruleTypeList = obj;
  },
  setDataField(state, lists) {
    state.dataField = lists;
  },
  setDataList(state, lists) {
    state.dataList = lists;
  },
  setDataPages(state, lists) {
    state.dataPages = lists;
  },
  setDataItem(state, obj) {
    state.dataItem = obj;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
