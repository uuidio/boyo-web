import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  rateField: [],
  rateData: [],
  appealFlield: [],
  appealData: [],
  pages:{},
  appealPages:{}
};
const actions = {
  rateLists({ commit },page) {
    http.get(Server.action.rateList,{page}).then((resData) => {
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          fixed:'right',
          width:100,
          scopedSlots: { customRender: 'action' },
        });
        field[0].scopedSlots = { customRender: 'result_text' };
        field[1].scopedSlots = { customRender: 'content' };
        field[4].width = 150;
        field[1].width = 280;
        field[7].scopedSlots = { customRender: 'rate_pic' };
        field[7].width = 320;
        commit('setRateField', field);
        commit('setRateData', resData.result.lists.data);
        commit('setRatePages', resData.result.lists);
      }
    });
  },
  appealLists({ commit },page) {
    http.get(Server.action.appeal,{page}).then((resData) => {
      if (resData.code === 0) {
        commit('setAppealField', resData.result.field);
        commit('setAppealData', resData.result.lists.data);
        commit('setAppealPages', resData.result.lists);
      }
    });
  },
  submitReply({ commit }, { reply }) {
    fetch
      .post(Server.action.rateReply, reply)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess('回复成功');
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
  submitAppeal({ commit }, { appeal,callback }) {
    fetch
      .post(Server.action.appealAdd, appeal)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess('申诉成功');
          callback && callback()
        } else if (response.data.code === 414) {
          helper.showErrors(response.data.message);
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
  setRateField(state, lists) {
    state.rateField = lists;
  },
  setAppealPages(state, lists) {
    state.appealPages = lists;
  },
  setRateData(state, lists) {
    state.rateData = lists;
  },
  setAppealField(state, lists) {
    state.appealFlield = lists;
  },
  setAppealData(state, lists) {
    state.appealData = lists;
  },
  setRatePages(state, lists) {
    state.pages = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
