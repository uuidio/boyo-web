import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// initial state
const state = {
  dayPages:{},
  dayLists:[],
  dayFields:[],
  monthPages:{},
  monthLists:[],
  monthFields:[],
  dayDetPages:{},
  dayDetLists:[],
  dayDetFields:[],
  dayDownload:{},
  monthDownload:{},
  total_fee_data:[]
};

const actions = {
  getTradeGoods({ commit },{params,item}) {
    http
      .get(Server.action.userTradeGoods,params)
      .then((response) => {
        if (response.code === 0) {
          item.field = response.result.field
          item.goodsTable = response.result.lists.data
          item.flag = true
        } else {
          helper.showError(response.message);
        }
      });
  },
  getTradeDay({ commit },params) {
    http
      .get(Server.action.tradeDay,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          let fieldList = response.result.field
          // fieldList.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setDayPages',response.result.lists);
          commit('setDayFields',fieldList);
          commit('setDayLists',response.result.lists.data);
          commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getTradeDayDet({ commit },params) {
    http
      .get(Server.action.tradeDayDetail,params)
      .then((response) => {
        if (response.code === 0) {
          let data = response.result.lists.data
          for(let i=0;i<data.length;i++){
            data[i].flag=false
          }
          commit('setDetPages',response.result.lists);
          commit('setDetFields',response.result.field);
          commit('setDetLists',data);
          commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getTradeMonth({ commit },params) {
    http
      .get(Server.action.tradeMonth,params)
      .then((response) => {
        if (response.code === 0) {
          let fieldList = response.result.field
          // fieldList.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setMonthPages',response.result.lists);
          commit('setMonthFields',fieldList);
          commit('setMonthLists',response.result.lists.data);
          commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.message);
        }
      });
  },
  submitOrderSettle({ commit },{params,callback}) {
    http
      .post(Server.action.submitTrade,params)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      });
  },
  getDownloadDay({ commit },params) {
    http
      .get(Server.action.tradeDayDetailListsDown,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          commit('setDayDownload',response.result.trade);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getDownloadMonth({ commit },params) {
    http
      .get(Server.action.tradeMonthListsDown,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          commit('setMonthDownload',response.result.trade);
        } else {
          helper.showError(response.message);
        }
      });
  },
};

const mutations = {
  setDayFields(state, lists) {
    state.dayFields = lists;
  },
  setDayLists(state, lists) {
    state.dayLists = lists;
  },
  setDayPages(state, lists) {
    state.dayPages = lists;
  },
  setMonthFields(state, lists) {
    state.monthFields = lists;
  },
  setMonthLists(state, lists) {
    state.monthLists = lists;
  },
  setMonthPages(state, lists) {
    state.monthPages = lists;
  },
  setDetFields(state, lists) {
    state.dayDetFields = lists;
  },
  setDetLists(state, lists) {
    state.dayDetLists = lists;
  },
  setDetPages(state, lists) {
    state.dayDetPages = lists;
  },
  setDayDownload(state, lists) {
    state.dayDownload = lists;
  },
  setMonthDownload(state, lists) {
    state.monthDownload = lists;
  },
  totalData(state,data){
    state.total_fee_data=data
  }
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
