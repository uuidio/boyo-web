import helper from '@/utils/helper';
import Server from '@/config/server';
import http from '@/api/http';
import fetch from '@/api/fetch';
// import router from '@/router';

const state = {
  keyManageDetail: {},
  walletConfig: {},
  physicalImg: '',
};
const actions = {
  savePhysicalImg({ commit }, formItem) {
    http
      .post(Server.action.physical_img, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          setTimeout(() => {
            helper.reload();
          }, 1000);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getPhysicalImg({ commit }) {
    http
      .get(Server.action.physical_img)
      .then((response) => {
        if (response.code === 0) {
          commit('setPhysicalImg', response.result.physical_img);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  saveWalletConfig({ commit }, formItem) {
    http
      .post(Server.action.save_wallet_config, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          setTimeout(() => {
            helper.reload();
          }, 1000);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getWalletConfig({ commit }, formItem) {
    http
      .get(Server.action.wallet_config)
      .then((response) => {
        if (response.code === 0) {
          commit('setWalletConfig', response.result);
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  createSecretKey({ commit }, formItem) {
    fetch
      .post(Server.action.create_secret_key, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          setTimeout(() => {
            helper.reload();
          }, 1000);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error.data.message);
      });
  },
  unbindMobile({ commit, dispatch }, { formItem, callback }) { // 绑定手机号
    http
      .get(Server.action.unbind_mobile, formItem)
      .then((response) => {
        console.log(response, 8989);
        if (response.code === 0) {
          helper.showSuccess(response.message);
          dispatch('getKeyManageDetail');
          callback && callback();
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  bindMobile({ commit }, formItem) { // 绑定手机号
    http
      .get(Server.action.bind_mobile, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          setTimeout(() => {
            helper.reload();
          }, 1000);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  sendCode({ commit }, { formItem, callback }) {
    fetch
      .post(Server.action.send_code, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          callback && callback();
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error.data.message);
      });
  },

  getKeyManageDetail({ commit }, formItem) {
    http
      .get(Server.action.key_manage_detail)
      .then((response) => {
        if (response.code === 0) {
          commit('setKeyManageDetail', response.result);
          // helper.showError(response.message);
        } else {
          // helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
};
const mutations = {
  setPhysicalImg(state, obj) {
    state.physicalImg = obj;
  },
  setKeyManageDetail(state, obj) {
    state.keyManageDetail = obj;
  },
  setWalletConfig(state, obj) {
    state.walletConfig = obj;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
