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
  sellerField: [],
  sellerDataLists: [],
  sellerPages: {},
  applyDetail: {},
  resApplyList: []
};
const actions = {
  fetchLists({ commit }, params) {
    http
      .get(Server.action.seckillLists, params)
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
  sellerLists({ commit }, params) {
    http
      .get(Server.action.sellerSeckillLists, params)
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
          // field[4].scopedSlots = {customRender:'valid_status_text'}
          commit('setSellerField', field);
          commit('setSellerPages', response.result.lists);
          commit('setSellerData', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDetail({ commit }, params) {
    http
      .get(Server.action.seckillDet, params)
      .then((response) => {
        if (response.code === 0) {
          if (params.isRes) {
            commit('setResetApply', response.result.seckillgood);
          }
          else {
            commit('setDetail', response.result);

          }
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getApplyDetail({ commit }, params) {
    http
      .get(Server.action.sellerApplyDetail, params)
      .then((response) => {
        if (response.code === 0) {
          commit('setApplyDetail', response.result.activity);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  resApplyEdit({ commit }, params) {
    return new Promise((resolve, reject) => {
      http
        .post(Server.action.resApplyEdit, params)
        .then((response) => {
          if (response.code === 0) {
            resolve(response.result)
          } else {
            helper.showError(response.message);
          }
        })
        .catch((error) => {
          helper.showError(error);
        });
    })
  },
  seckillApplySave({ commit }, { formItem }) {
    fetch
      .post(Server.action.seckillApplySave, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/marketing/seckill/lists',
          });
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
  setField(state, lists) {
    state.field = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setData(state, lists) {
    state.dataLists = lists;
  },
  setSellerPages(state, lists) {
    state.sellerPages = lists;
  },
  setSellerField(state, lists) {
    state.sellerField = lists;
  },
  setSellerData(state, lists) {
    state.sellerDataLists = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setApplyDetail(state, lists) {
    state.applyDetail = lists;
  },
  setResetApply(state, lists) {
    state.resApplyList = lists;
  }
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
