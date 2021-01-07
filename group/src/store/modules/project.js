import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import router from '@/router';
import http from '@/api/http';
// initial state
const state = {
  lists: [],
  fields: [],
  pages: {},
  detail: {
    platform_name: '',
    admin_id: '',
    base_uri: '',
    app_id: '',
    secret: '',
    app_code: '',
    corp_code: '',
    org_code: '',
    type: 'normal',
  },
  accountfields: [],
  accountlists: [],
  accountPages: {},
  paymentTypeList: [],
  paymentTypeField: [],
  paymentTypePage: [],
  paymentType: [],
  paymentTypeDetail: {},
};

const actions = {
  deletePaymentType({ commit }, params) {
    http
      .get(Server.action.delete_payment_type + '/' + params)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          helper.reload();
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getPaymentTypeDetail({ commit }, params) {
    http
      .get(Server.action.payment_type_detail + '/' + params)
      .then((response) => {
        if (response.code === 0) {
          commit('setPaymentTypeDetail', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  editPaymentType({ commit }, formItem) {
    http
      .post(Server.action.edit_payment_type, formItem)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message)
          // helper.reload();
          setTimeout(() => {
            router.back();
          }, 1000);
        } else if (response.code === 414) {
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addPaymentType({ commit }, formItem) {
    http
      .post(Server.action.add_payment_type, formItem)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message)
          helper.reload();
          setTimeout(() => {
            router.back();
          }, 1000);
        } else if (response.code === 414) {
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getPaymentType({ commit }, params) {
    http
      .get(Server.action.payment_type, params)
      .then((response) => {
        if (response.code === 0) {
          commit('setPaymentType', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getPaymentTypeList({ commit }, params) {
    http
      .get(Server.action.payment_type_list, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setPaymentTypeField', field);
          commit('setPaymentTypePage', response.result.lists);
          commit('setPaymentTypeList', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  settingAllowLogin({ commit }, formItem) {
    fetch
      .post(Server.action.platformAllowLogin, formItem)
      .then((response) => {
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
  fetchLists({ commit }, formItem) {
    http
      .get(Server.action.platformLists, formItem)
      .then((response) => {
        if (response.code === 0) {
		  const fieldList = response.result.field;
          fieldList.push({
            title: '操作',
            dataIndex: 'action',
            width:200,
            scopedSlots: { customRender: 'action' },
          });
          commit('setLists', response.result.lists.data);
          commit('setFields', fieldList);
          commit('setPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addShop({ commit }, { formItem }) {
    fetch
      .post(Server.action.shop_add, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/shop/merchant/lists',
          });
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

  getDetail({ commit }, id) {
    fetch
      .get(Server.action.platformDetail + id)
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
  setDetail({ commit }) {
    let obj = {
		  platform_name:'',
      platform_no:'',
      platform_id:'',
      address:'',
      admin_id:'',
      base_uri:'',
      app_id:'',
      secret:'',
      app_code:'',
      corp_code:'',
      org_code:'',
      type:'normal',
      longitude: '', // 经度
      latitude: '', // 纬度
	}
	commit('setDetail',obj );
  },
  delShop({ commit }, { id }) {
    fetch
      .get(Server.action.shop_del + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          // helper.reload();
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  actShop({ commit }, { params }) {
    fetch
      .post(Server.action.platformAct, params)
      .then((response) => {
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
  editShop({ commit }, { formItem,callback }) {
    fetch
      .post(Server.action.platformEdit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          if(callback){
            callback()
          }else{
            helper.reload();
          }
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
  updateOrder({ commit }, { formItem,callback }) {
    fetch
      .post(Server.action.platformListorder, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          if(callback){
            callback()
          }else{
            helper.reload();
          }
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

  addAccount({ commit }, { formItem }) {
    fetch
      .post(Server.action.createAccount, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/shop/account/lists',
          });
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
  editAccount({ commit }, { formItem }) {
    fetch
      .post(Server.action.account_edit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess('修改密码成功');
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
  accountLists({ commit }, { obj }) {
    fetch
      .get(Server.action.adminuserLists, { params: obj })
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          const dataList = response.data.result.lists.data;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setAccountLists', response.data.result.lists.data);
          commit('setAccountPages', response.data.result.lists);
          commit('setAccountFields', field);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  accountSwitch({ commit }, obj) {
    fetch
      .post(Server.action.adminuserSwitch, obj)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess('更改账号状态成功');
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
};

const mutations = {
  setPaymentTypeDetail(state, obj) {
    state.paymentTypeDetail = obj;
  },
  setPaymentType(state, lists) {
    state.paymentType = lists;
  },
  setPaymentTypeField(state, lists) {
    state.paymentTypeField = lists;
  },
  setPaymentTypeList(state, lists) {
    state.paymentTypeList = lists;
  },
  setPaymentTypePage(state, lists) {
    state.paymentTypePage = lists;
  },
  setDetail(state, detail) {
    state.detail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setFields(state, fields) {
    state.fields = fields;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setAccountLists(state, lists) {
    state.accountlists = lists;
  },
  setAccountPages(state, lists) {
    state.accountPages = lists;
  },
  setAccountFields(state, fields) {
    state.accountfields = fields;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
