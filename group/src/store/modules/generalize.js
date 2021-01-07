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
  DepLists: [],
  DepFields: [],
  DepPages: {},
  DepDetail: {},
  Loglists: [],
  Logfields: [],
  Logpages: {},
  RankingLists: [],
  RankingFields: [],
  RankingPages: {},
  PromoterLists: [],
  PromoterFields: [],
  PromoterPages: {},
  PromoterShopLists: [],
  PromoterShopFields: [],
  PromoterShopPages: {},
  TradeLists: [],
  TradeFields: [],
  TradePages: {},
  DepositLists: [],
  DepositFields: [],
  DepositPages: {},
  CollectLists: [],
  CollectFields: [],
  CollectPages: {},
  promoterListsShop: [],
  promoterFieldsShop: [],
  PartnerDetail: {},
  promoterList: [],
  promoterListPages: {},
  promoterListFields: [],
  userData: {},
  Loglists1: [],
  Logfields1: [],
  Logpages1: {},
  DetailFields:[],
  DetailLists: [],
  DetailPages: {},
  Num2lists: [],
  Num2fields: [],
  Num2pages: {},
  withdrawalRecord:{},
};

const actions = {
  userDepositDown({ commit }, params) {
    http
      .get(Server.action.userDepositCashesListDown, params)
      .then((response) => {
        if (response.code === 0) {
          commit('setWithdrawalRecord', response.result.trade);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  updatePartnerType({ commit }, {formItem,callback}) {
    http.post(Server.action.unfreezePartners, formItem)
      .then((response) => {
        if (response.code === 0) {
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

  goodsSpreadLists({ commit },{params,callback}) {
    http
      .get(Server.action.goodsSpreadLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[4].scopedSlots = {customRender:'headimgurl'}
          commit('setNum2Lists', response.result.lists.data);
          commit('setNum2Fields', field);
          commit('setNum2Page', response.result.lists);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  detailLists({ commit },{params,callback}) {
    http
      .get(Server.action.userRecommendDetai,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setDetailFields', field);
          commit('setDetailPage', response.result.lists);
          commit('setDetailLists', response.result.lists.data);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  memberDetail({ commit },{url,params,callback,key}) {
    http
      .get(url,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          if (key == 1) {
            // field[2].width = 300
          } else if (key == 2) {
            field[4].scopedSlots = { customRender: 'user_img' };
          }
          // field[4].scopedSlots = {customRender:'user_img'}
          commit('setLogFields1', field);
          commit('setLogPage1', response.result.lists);
          commit('setLogLists1', response.result.lists.data);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  memberPriceDetail({ commit },params) {
    http
      .get(Server.action.userDepositDetail,params)
      .then((response) => {
        if (response.code === 0) {
          commit('setUserData', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  fetchSearch({ commit }, listItem) {
    fetch
      .get(Server.action.promoterList, { params: listItem } )
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            width: 200,
            scopedSlots: { customRender: 'action' },
          });
          field[3].scopedSlots = { customRender: 'child_num' }
          field[4].scopedSlots = { customRender: 'num2' }
          commit('setPromoterListFields', field);
          commit('setPromoterListPages', response.data.result.lists);
          commit('setPromoterList', response.data.result.lists.data);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  // promoterList({ commit },params) {
  //   http
  //     .get(Server.action.promoterList,params)
  //     .then((response) => {
  //       if (response.code === 0) {
  //         const field = response.result.field;
  //         // field.unshift({
  //         //   title: '序号',
  //         //   dataIndex: 'no',
  //         //   width: 50,
  //         //   scopedSlots: { customRender: 'action' },
  //         // });
  //         commit('setPromoterListFields', field);
  //         commit('setPromoterListPages', response.result.lists);
  //         commit('setPromoterList', response.result.lists.data);
  //       } else {
  //         helper.showError(response.message);
  //       }
  //     })
  //     .catch((error) => {
  //       helper.showError(error);
  //     });
  // },

  rankingLists({ commit },params) {
    http
      .get(Server.action.userRewardRankingList,params)
      .then((response) => {
        if (response.code === 0) {
          let field = response.result.field;
          let lists = response.result.lists;
          field.forEach(item=>{
            item.width = 150
          })
          field.unshift({
            title: '排行',
            dataIndex: 'ranking',
            key: "ranking",
            width:100,
          })
          if (lists&&lists.length) {
            lists.forEach((item,i)=>{
              item.ranking = i+1
            })
          }
          commit('setRankingFields', field);
          // commit('setRankingPage', response.result.lists);
          commit('setRankingLists', lists);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  promoterLists({ commit },params) {
    http
      .get(Server.action.PromoterLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            width:150,
            scopedSlots: { customRender: 'action' },
          });
          field.forEach((item)=>{
            if(item.set_key){
              delete item.set_key
            }
            if(item.value){
              delete item.value
            }
            if(item.key){
              delete item.key
            }
          })
          commit('setPromoterFields', field);
          commit('setPromoterPage', response.result.lists);
          commit('setPromoterLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  promoterShopLists({ commit },params) {
    http
      .get(Server.action.promoterShopLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          // field.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   width:150,
          //   scopedSlots: { customRender: 'action' },
          // });
          field.forEach((item)=>{
            if(item.set_key){
              delete item.set_key
            }
            if(item.value){
              delete item.value
            }
            if(item.key){
              delete item.key
            }
          })
          commit('setPromoterShopFields', field);
          commit('setPromoterShopPage', response.result.lists);
          commit('setPromoterShopLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  tradeEstimatesLists({ commit },params) {
    http
      .get(Server.action.tradeEstimatesLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[4].scopedSlots = {customRender:'user_img'}
          commit('setTradeFields', field);
          commit('setTradePage', response.result.lists);
          commit('setTradeLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  userDepositLogsLists({ commit },params) {
    http
      .get(Server.action.userDepositLogsLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setDepositFields', field);
          commit('setDepositPage', response.result.lists);
          commit('setDepositLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  groupCollectLists({ commit },params) {
    http
      .get(Server.action.groupCollectLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setCollectFields', field);
          commit('setCollectPage', response.result.lists);
          commit('setCollectLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  rankingDown({ commit },{params,callback}) {
    http
      .get(Server.action.userRewardRankingListDown,params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          window.location.href = response.result.url
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  promoterDown({ commit },{params,callback}) {
    http
      .get(Server.action.promoterListsDown,params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess('导出成功，即将跳转到导出列表');
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  promoterShopDown({ commit },{params,callback}) {
    http
      .get(Server.action.promoterShopListsDown,params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess('导出成功，即将跳转到导出列表');
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  fetchLists({ commit },params) {
    http
      .get(Server.action.applyPromoter,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
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
  logLists({ commit },params) {
    http
      .get(Server.action.userDepositLists,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[3].width = 300
          commit('setLogFields', field);
          commit('setLogPage', response.result.lists);
          commit('setLogLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  depLists({ commit },params) {
    http
      .get(Server.action.userDepositCashesList,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            // fixed:'right',
            // width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setDepFields', field);
          commit('setDepPage', response.result.lists);
          commit('setDepLists', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDetail({ commit },params) {
    http
      .get(Server.action.applyPromoterDetail,params)
      .then((response) => {
        if (response.code === 0) {
          commit('setDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDepDetail({ commit },params) {
    http
      .get(Server.action.getUserApplyDetail,params)
      .then((response) => {
        if (response.code === 0) {
          commit('setDepDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  changePartnerStatus({ commit },{params,callback}) {
    http
      .get(Server.action.unbindRelated,params)
      .then((response) => {
        if (response.code === 0) {
          callback&&callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  changePartnersRelated({ commit }, { formItem,callback }) {
    http.post(Server.action.changePartnersRelated, formItem)
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
  getPartner({ commit },params) {
    http
      .get(Server.action.getUserInfo,params)
      .then((response) => {
        if (response.code === 0) {
          commit('setPartnerDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  create({ commit }, { formItem,callback }) {
    http.post(Server.action.promoterExamine, formItem)
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
  setPartnersRelated({ commit }, { formItem,callback }) {
    http.post(Server.action.setPartnersRelated, formItem)
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
  createDep({ commit }, { formItem,callback }) {
    http.post(Server.action.getUserExamine, formItem)
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
  setDepartment({ commit }, { formItem,callback }) {
    http.post(Server.action.setDepartment, formItem)
      .then((response) => {
        if (response.code === 0) {
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
  setWithdrawalRecord(state, lists) {
    state.withdrawalRecord = lists;
  },
  setNum2Page(state, page) {
    state.Num2pages = page;
  },
  setNum2Fields(state, fields) {
    state.Num2fields = fields;
  },
  setNum2Lists(state, lists) {
    state.Num2lists = lists;
  },
  setDetailLists(state, lists) {
    state.DetailLists = lists;
  },
  setDetailPage(state, page) {
    state.DetailPages = page;
  },
  setDetailFields(state, fields) {
    state.DetailFields = fields;
  },
  setLogPage1(state, page) {
    state.Logpages1 = page;
  },
  setLogFields1(state, fields) {
    state.Logfields1 = fields;
  },
  setLogLists1(state, lists) {
    state.Loglists1 = lists;
  },
  setUserData(state, page) {
    state.userData = page;
  },
  setPromoterListPages(state, page) {
    state.promoterListPages = page;
  },
  setPromoterListFields(state, fields) {
    state.promoterListFields = fields;
  },
  setPromoterList(state, lists) {
    state.promoterList = lists;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setPage(state, page) {
    state.pages = page;
  },
  setFields(state, fields) {
    state.fields = fields;
  },
  setDepLists(state, lists) {
    state.DepLists = lists;
  },
  setDepDetail(state, lists) {
    state.DepDetail = lists;
  },
  setDepPage(state, page) {
    state.DepPages = page;
  },
  setDepFields(state, fields) {
    state.DepFields = fields;
  },
  setLogPage(state, page) {
    state.Logpages = page;
  },
  setLogFields(state, fields) {
    state.Logfields = fields;
  },
  setLogLists(state, lists) {
    state.Loglists = lists;
  },
  setRankingPage(state, page) {
    state.RankingPages = page;
  },
  setRankingFields(state, fields) {
    state.RankingFields = fields;
  },
  setRankingLists(state, lists) {
    state.RankingLists = lists;
  },
  setPromoterPage(state, page) {
    state.PromoterPages = page;
  },
  setPromoterFields(state, fields) {
    state.PromoterFields = fields;
  },
  setPromoterLists(state, lists) {
    state.PromoterLists = lists;
  },
  setPromoterShopPage(state, page) {
    state.PromoterShopPages = page;
  },
  setPromoterShopFields(state, fields) {
    state.PromoterShopFields = fields;
  },
  setPromoterShopLists(state, lists) {
    state.PromoterShopLists = lists;
  },
  setTradePage(state, page) {
    state.TradePages = page;
  },
  setTradeFields(state, fields) {
    state.TradeFields = fields;
  },
  setTradeLists(state, lists) {
    state.TradeLists = lists;
  },
  setDepositPage(state, page) {
    state.DepositPages = page;
  },
  setDepositFields(state, fields) {
    state.DepositFields = fields;
  },
  setDepositLists(state, lists) {
    state.DepositLists = lists;
  },
  setCollectPage(state, page) {
    state.CollectPages = page;
  },
  setCollectFields(state, fields) {
    state.CollectFields = fields;
  },
  setCollectLists(state, lists) {
    state.CollectLists = lists;
  },setPartnerDetail(state, lists) {
    state.PartnerDetail = lists;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
