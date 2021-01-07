// import helper from '@/utils/helper';
import Server from '@/config/server';
// import fetch from '@/api/fetch';
import http from '@/api/http';
// import router from '@/router';

// initial state
const state = {
  indexDecorationItems: [{
    id: 'headerTitle',
    title: '',
  }],
};

const actions = {
  setIndexDecoration({ commit }, { params }) {
    http.post(Server.action.setIndexDecoration, params).then((resData) => {
      if (resData.code === 0) {
        // helper.reload()
      }
    });
  },
  getIndexDecoration({ commit }, page) {
    http.get(Server.action.getIndexDecoration, { page }).then((resData) => {
      if (resData.code === 0) {
        const data = resData.result;
        // 不存在标题就添加标题
        const ifHeaderTitle = [];
        data.forEach((item) => {
          ifHeaderTitle.push(item.id);
        });
        if (ifHeaderTitle.indexOf('headerTitle') === -1) {
          data.push({
            id: 'headerTitle',
            title: '',
          });
        }
        console.log(data);
        commit('setDecorationItems', data);
      }
    });
  },

};

const mutations = {
  setDecorationItems(state, items) {
    state.indexDecorationItems = items;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
