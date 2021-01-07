import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
// initial state
const state = {
  customItems: [],
  activityItems: [],
  activityfields: [],
  activityList: [],
  activityPages: {},
  customItemsId:{},
};

const actions = {
  setCustomItems({ commit }, { params }) {
    http.post(Server.action.setCustomItems, params).then((resData) => {
      if (resData.code === 0) {
        helper.reload();
      }
    });
  },
  getCustomItems({ commit }, page) {
    http.get(Server.action.getCustomItems, { page }).then((resData) => {
      if (resData.code === 0) {
        commit('setSiteItems', resData.result);
      }
    });
  },
  removeActivityItem({ dispatch, commit }, obj) {
    http.get(Server.action.deleteCustom, { id: obj.listItem.id })
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          dispatch('activityList');
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  activityList({ commit }, formItem) {
    fetch
      .get(Server.action.customList, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setActivityList', response.data.result.lists.data);
          commit('setActivityPages', response.data.result.lists);
          commit('setActivityFields', field);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  cleanActivityItems({ commit }) {
    const data = [{
      id: 'headerTitle',
      title: '',
    }];
    commit('setActivityItems', data);
  },
  setActivityItems({ commit }, { params,callback }) {
    http.post(Server.action.setItems, params).then((resData) => {
      if (resData.code === 0) {
        commit('setSiteItemsIds', resData.result);
        callback && callback()
        // router.replace({
        //   path: '/config/activityEdit?custom_id='+resData.result.custom_id,
        // });
        // helper.reload();
      }
    });
  },
  getActivityItems({ commit }, obj) {
    http.get(Server.action.getItems, obj).then((resData) => {
      if (resData.code === 0) {
        const data = resData.result;
        // 不存在标题就添加标题
        const ifHeaderTitle = [];
        data.forEach((item) => {
          ifHeaderTitle.push(item.id);
        });
        if (ifHeaderTitle.indexOf('headerTitle') === -1) {
          data.push({
            id: 'headerTitle',
            title: '',
          });
        }
        commit('setActivityItems', data);
      }
    });
  },
};

const mutations = {
  setSiteItems(state, items) {
    state.customItems = items;
  },
  setSiteItemsIds(state, items) {
    state.customItemsId = items;
  },
  setActivityList(state, lists) {
    state.activityList = lists;
  },
  setActivityPages(state, lists) {
    state.activityPages = lists;
  },
  setActivityFields(state, fields) {
    state.activityfields = fields;
  },
  setActivityItems(state, items) {
    state.activityItems = items;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
