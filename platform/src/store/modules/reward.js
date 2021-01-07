import helper from '@/utils/helper';
import Server from '@/config/server';
import http from '@/api/http';
import router from '@/router';
import fetch from '@/api/fetch';

// initial state
const state = {
  lists: [],
  fields: [],
  pages: {},
  userLists: [],
  userFields: [],
  userPages: {},
  RelevanceLists: [],
  RelevanceFields: [],
  RelevancePages: {},
  RelevanceListsDown:{}
};

const actions = {
  pickUpInfo({ commit }, InfoObj) {
    fetch.post(Server.action.reward_pick_up, InfoObj).then((response) => {
      // console.log(response);
      if (response.data.code === 0) {
        helper.showSuccess('提货成功');
        helper.reload();
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  RelevanceListsExcel({ commit },params){
    return new Promise((resolve, reject) => {
      http.get(Server.action.activitiesRewardListExcel, params).then(response => {
        console.log('11',response)
        if (response.code === 0) {
          commit('setRelevanceListsDown', response.result.trade);
          resolve(response.result.trade)
        } else {
          helper.showError(response.message);
        }
      })
    })
  },
  fetchLists({ commit },params) {
    http
      .get(Server.action.activitiesRewardGoodsList,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[1].width = 200
          field[4].scopedSlots = { customRender: 'goods_image' }
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setFields', field);
          commit('setPage', response.result.lists);
          commit('setLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  activitiesRewardsSendLogs({ commit },{params,callback}) {
    http
      .get(Server.action.activitiesRewardsSendLogs,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[3].width = 200
          field[2].scopedSlots = { customRender: 'a' }
          field[4].scopedSlots = { customRender: 'b' }
          field[5].scopedSlots = { customRender: 'c' }
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setUserFields', field);
          commit('setUserPage', response.result.lists);
          commit('setUserLists', response.result.lists.data);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  activitiesRewardList({ commit },params) {
    http
      .get(Server.action.activitiesRewardList,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[3].width = 200
          field[5].scopedSlots = { customRender: 'goods_info.goods_image' }
          commit('setRelevanceFields', field);
          commit('setRelevancePage', response.result.lists);
          commit('setRelevanceLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  del({ commit }, { id,callback }) {
    http.get(Server.action.activitiesRewardGoodsDelete,{id})
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          callback && callback()
        } else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  create({ commit }, { formItem,callback }) {
    http.post(Server.action.activitiesGoodsCreate, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addLogistics({ commit }, { formItem }) {
    http.post(Server.action.deliveryTrade, formItem)
      .then((response) => {
        if (response.code === 0) {
          router.replace({
            path: '/promotion/conversion/user_lists',
          });
        }else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  update({ commit }, { formItem,callback }) {
    http.post(Server.action.activitiesGoodsUpdate, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }else if (response.code === 414) {
          helper.showErrors(response.result.errors);
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

  setLists(state, lists) {
    state.lists = lists;
  },
  setPage(state, page) {
	  state.pages = page;
	},
  setFields(state, fields) {
    state.fields = fields;
  },
  setUserLists(state, lists) {
    state.userLists = lists;
  },
  setUserPage(state, page) {
    state.userPages = page;
  },
  setUserFields(state, fields) {
    state.userFields = fields;
  },
  setRelevanceLists(state, lists) {
    state.RelevanceLists = lists;
  },
  setRelevancePage(state, page) {
    state.RelevancePages = page;
  },
  setRelevanceFields(state, fields) {
    state.RelevanceFields = fields;
  },
  RelevanceListsDown(state, lists) {
    state.RelevanceListsDown = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
