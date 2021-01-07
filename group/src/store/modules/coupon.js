import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  couponField: [],
  couponData: [],
  coupondet: {},
  pages: {}
};
const actions = {
  couponPush({ commit }, { formItem }) {
    fetch
      .post(Server.action.coupon_push, formItem)
      .then((response) => {
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
  fetchLists({ commit }, params) {
    http
      .get(Server.action.coupon_list, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;

          field[5].scopedSlots = { customRender: 'get_time' };
          field[6].scopedSlots = { customRender: 'use_time' };
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setCouponField', field);
          commit('setPages', response.result.lists);
          commit('setCouponData', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delCoupon({ commit }, { id, dataList }) {
    fetch
      .get(Server.action.coupon_del + id)
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
  addCoupon({ commit }, { formItem }) {
    fetch
      .post(Server.action.submit_coupon, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/promotion/coupon/platform_lists',
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
  coupon_check({ commit }, { formItem }) {
    fetch
      .post(Server.action.coupon_check, formItem)
      .then((response) => {
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
  couponDetail({ commit }, { id }) {
    fetch
      .get(Server.action.coupon_detail + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  modCouponName({ commit }, params) {
    http.post(Server.action.modCouponName, params).then(response => {
      if (response.code === 0) {
        helper.showSuccess(response.message)
        helper.reload()
      } else if (response.code === 414) {
        helper.showError(response.message);
      }
    })
  }

};
const mutations = {
  setCouponField(state, lists) {
    state.couponField = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setCouponData(state, lists) {
    state.couponData = lists;
  },
  setDetail(state, detail) {
    state.coupondet = detail;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
