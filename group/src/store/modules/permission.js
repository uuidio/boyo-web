import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
// initial state
const state = {
  menuLists: [],
  menuFields: [],
  routes:[],
  rolesFields:[],
  rolesLists:[],
  rolesPages:{},
  permissionMenus:[],
  adminFields:[],
  adminLists:[],
  adminPages:{},
};

const actions = {
  getMenuLists({ commit },callback) {
    http
      .get(Server.action.menuLists)
      .then((response) => {
        if (response.code === 0) {
          const fields =  response.result.field
          fields.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setMenuLists', response.result.lists);
          commit('setMenuFields', fields);
          callback && callback()
        } else {
          helper.showError(response.message);
        }
      });
  },
  getAdminLists({ commit },params) {
    http
      .get(Server.action.adminLists,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          const fields =  response.result.field
          fields.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setAdminLists', response.result.lists.data);
          commit('setAdminFields', fields);
          commit('setAdminPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getRolesLists({ commit },params) {
    http
      .get(Server.action.roleLists,params)
      .then((response) => {
        if (response.code === 0) {
          console.log(response)
          const fields =  response.result.field
          fields.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setRolesLists', response.result.lists.data);
          commit('setRolesFields', fields);
          commit('setRolesPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getRoutes({ commit } ) {
    http
      .get(Server.action.getRoutes)
      .then((response) => {
        if (response.code === 0) {
          commit('setRoutes', response.result);
        } else {
          helper.showError(response.message);
        }
      });
  },
  createRole({ commit }, { formItem,callback }) {
    http.post(Server.action.createRole, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  updateRole({ commit }, { formItem,callback }) {
    http.post(Server.action.updateRole, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  createMenu({ commit }, { formItem,callback }) {
    http.post(Server.action.createMenu, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  updateMenu({ commit }, { formItem,callback }) {
    http.post(Server.action.updateMenu, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  createAdmin({ commit }, { formItem,callback }) {
    http.post(Server.action.createAdmin, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  updateAdmin({ commit }, { formItem,callback }) {
    http.post(Server.action.updateAdmin, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delRole({ commit }, { formItem,callback }) {
    http.get(Server.action.deleteRole, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delMenu({ commit }, { formItem,callback }) {
    http.get(Server.action.deleteMenu, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  delAdmin({ commit }, { formItem,callback }) {
    http.get(Server.action.deleteAdmin, formItem)
      .then((response) => {
        if (response.code === 0) {
          callback && callback()
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
};


const mutations = {
  setMenuLists(state, lists) {
    state.menuLists = lists;
  },
  setRoutes(state, lists) {
    state.routes = lists;
  },
  setMenuFields(state, lists) {
    state.menuFields = lists;
  },
  setRolesLists(state, lists) {
    state.rolesLists = lists;
  },
  setRolesFields(state, lists) {
    state.rolesFields = lists;
  },
  setRolesPages(state, lists) {
    state.rolesPages = lists;
  },
  setAdminLists(state, lists) {
    state.adminLists = lists;
  },
  setAdminFields(state, lists) {
    state.adminFields = lists;
  },
  setAdminPages(state, lists) {
    state.adminPages = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
