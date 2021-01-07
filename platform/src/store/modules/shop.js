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
  detail: {},
  accountfields: [],
  accountlists: [],
  accountPages:{},
  exportData:{}
};

const actions = {
	exportShopList({ commit }, exportForm) {
		http
		  .post(Server.action.exportShopList, exportForm)
		  .then((response) => {
			console.log(response);
			if (response.code === 0) {
			  commit('setExportData', response.result);
			} else {
			  helper.showError(response.data.message);
			}
		  });
		// .catch((error) => {
		//   helper.showError(error);
		// });
	  },
  fetchLists({ commit }, formItem) {
    http
      .get(Server.action.shop_lists, formItem)
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
        console.log(response);
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

  getDetail({ commit }, { id }) {
    fetch
      .get(Server.action.shop_det + id)
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
      .post(Server.action.shop_actShop, params)
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
  editShop({ commit }, { formItem,callback }) {
    fetch
      .post(Server.action.shop_edit, formItem)
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

  editPoint({ commit }, { formItem,callback }) {
    fetch
      .post(Server.action.shop_edit_point, formItem)
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
      .get(Server.action.account_list, { params: obj })
      .then((response) => {
        console.log();
        if (response.data.code === 0) {
          const field = response.data.result.field;
          const dataList = response.data.result.lists.data;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          field.splice(4, 1, {
            title: '是否启用',
            dataIndex: 'status',
            scopedSlots: { customRender: 'status' },
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
      .post(Server.action.account_switch, obj)
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
  setExportData(state, lists) {
    state.exportData = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
