import helper from '@/utils/helper';
import Server from '@/config/server';
import http from '@/api/http';
// import fetch from '@/api/fetch';
import router from '@/router';

const state = {
  activityList: [],
  classifyList: [],
  classifyField: [],
  classifyPages: {},
  classifyItem: {
    name: '',
    parent_id: 0,
    listorder: '',
  },
  dataField: [],
  dataList: [],
  dataPages: {},
  dataItem: {
    title: '', // 标题
    article_url: '', // 主图
    subtitle: '', // 副标题
    listorder: '', // 排序
    content: '', // 内容
    is_show: '', // 是否开启，1开启0关闭
    title_is_show: '', // 是否展示标题 0不展示 1展示
    type: '', // 文章类型 0文本 1活动
    activity_id: '', // 关联自定义活动的id（文章类型为活动的时候需要记录）
  },
};
const actions = {
  verifyArticleItem({ commit }, params) {
    http
      .get(Server.action.verifyArticle, params)
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
  getDataItem({ commit }, params) {
    http
      .get(Server.action.articleItem + '/' + params)
      .then((response) => {
        if (response.code === 0) {
          commit('setDataItem', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getDateList({ commit }, params) {
    http
      .get(Server.action.articleList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setDataField', field);
          commit('setDataPages', response.result.lists);
          commit('setDataList', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
};
const mutations = {
  setDataField(state, lists) {
    state.dataField = lists;
  },
  setDataList(state, lists) {
    state.dataList = lists;
  },
  setDataPages(state, lists) {
    state.dataPages = lists;
  },
  setDataItem(state, obj) {
    state.dataItem = obj;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
