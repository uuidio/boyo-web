import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  couponField: [],
  couponData: [],
  coupondet: {},
  activityField: [],
  activityData: [],
  activitydet: {},
  pages:{},
};
const actions = {
  updateIssuesNum({ commit }, data) { // 修改发行数量
    fetch
      .post(Server.action.updateIssuesNum, data)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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
  fetchLists({ commit },params) {
    http
      .get(Server.action.coupon_list,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[6].scopedSlots = { customRender: 'get_time' };
          field[7].scopedSlots = { customRender: 'use_time' };
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setCouponField', field);
          commit('setCouponData', response.result.lists.data);
          commit('setCouponPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
    fetchOffLists({ commit },params) {
    http
      .get(Server.action.coupon_offlist,params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          console.log(field);
          field[7].scopedSlots = { customRender: 'voucher' };
          commit('setCouponField', field);
          commit('setCouponData', response.result.lists.data);
          commit('setCouponPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  activityLists({ commit }, {  type }) {
    fetch
      .get(
        `${Server.action.activity_list}?type=${type}`,
      )
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setActivityField', response.data.result.field);
          commit('setActivityData', response.data.result.lists.data);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addActivity({ commit }, { formItem }) {
    fetch
      .post(Server.action.activity_save, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          if (formItem.type == 1) {
            router.replace({
              path: '/marketing/fullminus',
            });
          } else if (formItem.type == 2) {
            router.replace({
              path: '/marketing/discount',
            });
          }
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
  actCoupon({ commit }, { params }) {
    fetch
      .post(Server.action.coupon_distribute, params)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
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
  delActivity({ commit }, { id, dataList }) {
    fetch
      .get(Server.action.activity_del + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < dataList.length; i++) {
            if (dataList[i].id == id) {
               dataList.splice(i, 1);
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
  stopActivity({ commit },params) {
    fetch
      .get(Server.action.stopActivity+params.id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
		  helper.reload();
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
            path: '/marketing/coupon',
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
  activityDetail({ commit }, { id }) {
    fetch
      .get(Server.action.activity_detail + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setActivityDetail', response.data.result);
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
  setCouponField(state, lists) {
    state.couponField = lists;
  },
  setCouponData(state, lists) {
    state.couponData = lists;
  },
  setCouponPages(state, lists) {
    state.pages = lists;
  },
  setActivityField(state, lists) {
    state.activityField = lists;
  },
  setActivityData(state, lists) {
    state.activityData = lists;
  },
  setDetail(state, detail) {
    state.coupondet = detail;
  },
  setActivityDetail(state, detail) {
    state.activitydet = detail;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
