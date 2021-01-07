import helper from '@/utils/helper';
import Server from '@/config/server';
import http from '@/api/http';
import fetch from '@/api/fetch';
// import router from '@/router';
const state = {
  field: [],
  dataLists: [],
  pages: {},
  detail: {},
  exportData: {},
  options: [],
  integralClassDetail: {},
};
const actions = {
  editIntegralClass({ commit }, { formItem }) {
    fetch.post(Server.action.integralClassEdit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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

  getIntegralClassDetail({ commit }, id) {
    fetch.get(Server.action.integralClassDetail + '?id=' + id)
      .then((response) => {
        if (response.data.code === 0) {
          // helper.showSuccess(response.data.message);
          commit('setIntegralClassDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  fetchLists({ commit }, params) {
    http
      .get(Server.action.integralClassList, params)
      .then((response) => {
        if (response.code === 0) {
		      console.log('分类列表', response);
          const field = response.result.field;
          field[0].width = 200;
          field.push({
            title: '操作',
            dataIndex: 'action',
            // fixed:'right',
            // width:150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setField', field);
          commit('setPages', response.result.lists);
		      commit('setData', response.result.lists);
		      let list = [];
		      response.result.lists.data.forEach((item) => {
			      list.push({ label: item.cat_name, value: item.id });
		      })
		      commit('setOptions', list);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addIntegralClass({ commit }, { formItem }) {
    fetch
      .post(Server.action.integralCreate, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          // helper.reload();
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
  delIntegralClass({ commit }, { id, dataList }) {
    fetch
      .get(Server.action.integralDelete + '?id=' + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].id == id) {
              return dataList.splice(i, 1);
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
  exportPoint({ commit }, params) {
    return new Promise((resolve, reject) => {
      http.get(Server.action.point_export, params).then(response => {
        if (response.code === 0) {
          commit('setExportData', response.result);
          resolve();
        } else {
          helper.showError(response.message);
        }
      }).catch( err => {
        reject();
      })
    })
  },
};
const mutations = {
  setIntegralClassDetail(state, data) {
    state.integralClassDetail = data;
  },
  setField(state, lists) {
    state.field = lists;
  },
  setData(state, lists) {
    state.dataLists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setExportData(state, data) {
    state.exportData = data;
  },
  setOptions(state, data) {
    state.options = data;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
