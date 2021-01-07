import helper from '@/utils/helper';
import Server from '@/config/server'
import http from '@/api/http';
import fetch from '@/api/fetch';
import router from '@/router';
const state = {
  field: [],
  dataLists: [],
  pages:{},
  detail:{},
  registerField:[],
  registerDataLists:[],
  registerPages:{},
  shopDetail:{},
  shopGoodsLists:[],
  goodsField: [],
  goodsDataLists: [],
  goodsPages:{},
  seckillDetail:{},
  seckillGoodsField:[],
  seckillGoodsDataLists:[],
  seckillGoodsPages:{},
};
const actions = {
  fetchLists({ commit },params) {
    http
      .get(Server.action.seckillLists,params)
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
  getSeckillGoods({ commit },params) {
    http
      .get(Server.action.secKillAppliesGoodList,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          const field = response.result.field;
          field[2].width = 200;
          field[6].scopedSlots = { customRender: 'goods_image' };
          field.push({
            title: '操作',
            dataIndex: 'action',
            fixed:'right',
            width:150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setSeckillGoodsField', field);
          commit('setSeckillGoodsPages', response.result.lists);
          commit('setSeckillGoodsData', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getShopGoods({ commit },params) {
    http
      .get(Server.action.secKillGoodList,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[2].width = 200;
          field[6].scopedSlots = { customRender: 'goods_image' };
          commit('setGoodsField', field);
          commit('setGoodsPages', response.result.lists);
          commit('setGoodsData', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  shelvesGood({ commit },{params,callback}) {
    http
      .get(Server.action.shelvesGood,params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
 shopApprove({ commit }, { formItem }) {
    fetch
      .post(Server.action.registerApprove, formItem)
      .then((response) => {
        console.log(response)
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
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
  addSeckill({ commit }, { formItem }) {
    fetch
      .post(Server.action.seckillAdd, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/promotion/seckill/lists',
          });
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
  getDetail({ commit },params) {
    http
      .get(Server.action.seckillDet,params)
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
  getSeckillDetail({ commit },params) {
    http
      .get(Server.action.listDetailSeckillApplies,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          commit('setSeckillDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getShopDetail({ commit },params) {
    http
      .get(Server.action.detailSeckillApplies,params)
      .then((response) => {
        if (response.code === 0) {
          commit('setShopDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delSeckill({ commit }, { id, dataList }) {
    fetch
      .get(Server.action.seckillDel +'?id='+ id)
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
  delSeckillItem({ commit }, { id, dataList }) {
    fetch
      .get(Server.action.seckillDelItem +'?id='+ id)
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
  registerLists({ commit },params) {
    http
      .get(Server.action.seckillRegisterList,params)
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
          field[3].scopedSlots = { customRender: 'verify_status_text' }
          commit('setRegisterField', field);
          commit('setRegisterPages', response.result.lists);
          commit('setRegisterData', response.result.lists.data);
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
  setField(state, lists) {
    state.field = lists;
  },
  setData(state, lists) {
    state.dataLists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setGoodsField(state, lists) {
    state.goodsField = lists;
  },
  setGoodsData(state, lists) {
    state.goodsDataLists = lists;
  },
  setGoodsPages(state, lists) {
    state.goodsPages = lists;
  },
  setRegisterField(state, lists) {
    state.registerField = lists;
  },
  setRegisterData(state, lists) {
    state.registerDataLists = lists;
  },
  setRegisterPages(state, lists) {
    state.registerPages = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setSeckillDetail(state, lists) {
    state.seckillDetail = lists;
  },
  setShopDetail(state, lists) {
    state.shopDetail = lists;
  },
  setSeckillGoodsField(state, lists) {
    state.seckillGoodsField = lists;
  },
  setSeckillGoodsData(state, lists) {
    state.seckillGoodsDataLists = lists;
  },
  setSeckillGoodsPages(state, lists) {
    state.seckillGoodsPages = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
