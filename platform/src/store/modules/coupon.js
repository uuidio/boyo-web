import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  couponField: [],
  couponData: [],
  coupondet: {},
  pages: {},
  exchangeField: [],
  exchangeData: [],
  exchangePages: {},
  exportData: {},
  total_fee_data:[]
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
  // 导出为Excel
  exportFilter({ commit }, exportForm) { // callback
    fetch
      .post(Server.action.exportExchangeCoupon, exportForm)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          commit('setExportData', response.data.result);
          // callback && callback()
        } else {
          helper.showError(response.data.message);
        }
      }).catch((error) => {
        helper.showError(error);
    });
  },
  fetchExchangeLists({ commit }, params) {
    http
      .get(Server.action.exchangeCouponList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[field.length - 2].scopedSlots = { customRender: 'voucher' };
          commit('setExchangeField', field);
          commit('setExchangePages', response.result.lists);
		  commit('setExchangeData', response.result.lists.data);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
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
          commit('setPages', response.result.lists);
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
  batchCheckCoupon({ commit }, { formItem }) { // 批量审核
    fetch
      .post(Server.action.batchCheckCoupon, formItem)
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
  setExportData(state, lists) {
    state.exportData = lists;
  },
  setExchangeField(state, lists) {
    state.exchangeField = lists;
  },
  setExchangePages(state, lists) {
    state.exchangePages = lists;
  },
  setExchangeData(state, lists) {
    state.exchangeData = lists;
  },
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
