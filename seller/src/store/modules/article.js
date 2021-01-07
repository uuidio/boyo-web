import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';

const state = {
  articleField: [],
  articleLists: [],
  pages: [],
};
const actions = {
  // 文章列表
  articleLists({ commit }, page) {
    http.get(Server.action.article_lists, page).then((resData) => {
      console.log(resData);
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' },
        });
        commit('setField', field);
        commit('setPage', resData.result.lists);
        commit('setLists', resData.result.lists.data);
      }
    });
  },
  // 添加文章
  addArticle({ commit }, page) {
    http.post(Server.action.article_add, page).then((resData) => {
      console.log(resData);
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 200,
          scopedSlots: { customRender: 'action' },
        });
        commit('setField', field);
        commit('setPage', resData.result.lists);
        commit('setLists', resData.result.lists.data);
      } else if (resData.code === 414) {
        helper.showError(resData.result.errors.article_url);
        helper.showError(resData.result.errors.title);
      }
    });
  },
};
const mutations = {
  setField(state, lists) {
    state.articleField = lists;
  },
  setLists(state, lists) {
    state.articleLists = lists;
  },
  setPage(state, lists) {
    state.pages = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
