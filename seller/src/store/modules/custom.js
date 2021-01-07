import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import router from '@/router';


// initial state
const state = {
  customItems: JSON.parse(localStorage.getItem('items')) || [],
};

const actions = {
  setCustomItems({ commit }, items) {
    commit('setItems', items);
  },
};

const mutations = {
  setItems(state, items) {
    state.customItems = items;
    localStorage.setItem('items', JSON.stringify(items));
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
