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
  detail: {},
  status:0,
  lotteryFields:[],
  lotteryLists: [],
  lotteryPages: {},
  lotteryPrizeFields:[],
  lotteryPrizeLists: [],
  lotteryPrizePages: {},
  lotteryListsDown:{}
};

const actions = {
  lotteryListsExcel({ commit },params){
    return new Promise((resolve, reject) => {
      http.get(Server.action.lotteryRecordListDown, params).then(response => {
        console.log('11',response)
        if (response.code === 0) {
          commit('setLotteryListsDown', response.result.trade);
          resolve(response.result.trade)
        } else {
          helper.showError(response.message);
        }
      })
    })
  },
  fetchLists({ commit },params) {
    http
      .get(Server.action.lotteryRecord,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:150,
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
  lotteryLists({ commit },params) {
    http
      .get(Server.action.lotteryLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[2].width = 150
          field[2].scopedSlots = { customRender: 'desc' }
          field[7].scopedSlots = { customRender: 'wx_mini_qr' }
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setLotteryFields', field);
          commit('setLotteryPage', response.result.lists);
          commit('setLotteryLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  createLottery({ commit }, { formItem,callback }) {
    http.post(Server.action.lotteryCreate, formItem)
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
  createReissued({ commit }, { formItem,callback }) {
    http.get(Server.action.reissued, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
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
  createCode({ commit }, { formItem ,callback}) {
    http.post(Server.action.createWxMiniQr, formItem)
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
  updateLottery({ commit }, { formItem,callback }) {
    http.post(Server.action.lotteryUpdate, formItem)
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
  createPrize({ commit }, { formItem,callback }) {
    http.post(Server.action.lotteryPrizeAdd, formItem)
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
  updatePrize({ commit }, { formItem,callback }) {
    http.post(Server.action.lotteryPrizeUpdate, formItem)
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
  delLottery({ commit }, { id,callback }) {
    http.get(Server.action.lotteryDelete+'/'+id)
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
  lotteryPrize({ commit },params) {
    http
      .get(Server.action.lotteryPrize,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[2].scopedSlots = { customRender: 'image' }
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setLotteryPrizeFields', field);
          commit('setLotteryPrizePage', response.result.lists);
          commit('setLotteryPrizeLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delPrize({ commit }, { id,callback }) {
    http.get(Server.action.lotteryPrizeDelete+'/'+id)
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
};

const mutations = {
  setStatus(state, lists) {
    state.status = lists;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setPage(state, page) {
	  state.pages = page;
	},
  setFields(state, fields) {
    state.fields = fields;
  },
  setLotteryLists(state, lists) {
    state.lotteryLists = lists;
  },
  setLotteryPage(state, page) {
    state.lotteryPages = page;
  },
  setLotteryFields(state, fields) {
    state.lotteryFields = fields;
  },
  setLotteryPrizeLists(state, lists) {
    state.lotteryPrizeLists = lists;
  },
  setLotteryPrizePage(state, page) {
    state.lotteryPrizePages = page;
  },
  setLotteryPrizeFields(state, fields) {
    state.lotteryPrizeFields = fields;
  },
  setLotteryListsDown(state, lists){
    state.lotteryListsDown=lists
  },
  setDetail(state, fields) {
    state.detail = fields;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
