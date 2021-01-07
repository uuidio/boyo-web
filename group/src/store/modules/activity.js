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
};
const actions = {
  fetchLists({ commit }, params) {
    http
      .get(Server.action.activity, params)
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
  activityDetail({ commit }, id) {
    http
      .get(Server.action.activityDetail + id)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          commit('setDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  activity_check({ commit }, { formItem }) {
    fetch
      .post(Server.action.activityCheck, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message)
          helper.reload()
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
  activityModName({ commitk }, params) {
    console.log(params)
    http.post(Server.action.modActiveName, params).then(response => {
      if (response.code === 0) {
        helper.showSuccess(response.message)
        helper.reload()
      } else if (response.code === 414) {
        helper.showError(response.message);
      }
    })
  }

}
const mutations = {
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
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
