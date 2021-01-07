import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import Cookies from 'js-cookie';
import router from '@/router';
import { USER_INFO,ACCESS_TOKEN } from '@/store/mutation-types';
import { setAccessToken, getAccessToken } from '@/utils/util';

// initial state
const state = {
  accessToken: getAccessToken(),
};

const actions = {
  setAccessToken({ commit }, token) {
    commit('setAccessToken', token);
  },
  memberlogout() {
    fetch
      .get(Server.action.logout)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          Cookies.remove(ACCESS_TOKEN);
          Cookies.remove(USER_INFO);
          helper.reload()
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
  setAccessToken(state, token) {
    state.accessToken = token;
    setAccessToken(token);
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
