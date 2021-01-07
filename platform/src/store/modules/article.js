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
  dataManageField: [],
  dataManage: [],
  dataManagePages: {},
};
const actions = {
  getDataManage({ commit }, params) {
    http
      .get(Server.action.articleManageList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setDataManageField', field);
          commit('setDataManagePages', response.result.lists);
          commit('setDataManage', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  actManage({ commit }, { params }) {
    http
      .post(Server.action.articleManageAct, params)
      .then((response) => {
        console.log(response);
        if (response.code !== 0) {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  initDataItem({ commit }, formItem) {
    commit('initData');
  },
  editDataItem({ commit }, formItem) {
    http
      .post(Server.action.editArticleItem, formItem)
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
  deleteArticleItem({ commit }, params) {
    http
      .get(Server.action.deleteArticleItem + '/' + params)
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
  getActivityList({ commit, dispatch }, params) {
    http
      .get(Server.action.customList)
      .then((response) => {
        if (response.code === 0) {
          commit('setActivityList', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addDateItem({ commit }, formItem) {
    http
      .post(Server.action.addArticle, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message)
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
  deleteClassify({ commit }, params) {
    http
      .get(Server.action.deleteArticleClassify + '/' + params)
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
  editClassify({ commit }, formItem) {
    http
      .post(Server.action.editArticleClassify, formItem)
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
  getClassifyItem({ commit }, params) {
    http
      .get(Server.action.articleClassifyItem + '/' + params)
      .then((response) => {
        if (response.code === 0) {
          commit('setClassifyItem', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addClassify({ commit }, formItem) {
    http
      .post(Server.action.addArticleClassify, formItem)
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
  getClassifyList({ commit }, params) {
    http
      .get(Server.action.articleClassify, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            // fixed: 'right',
            // width: 150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setClassifyField', field);
          commit('setClassifyPages', response.result.lists);
          commit('setClassifyList', response.result.lists);
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
  setDataManageField(state, lists) {
    state.dataManageField = lists;
  },
  setDataManage(state, lists) {
    state.dataManage = lists;
  },
  setDataManagePages(state, lists) {
    state.dataManagePages = lists;
  },
  initData(state, lists) {
    console.log('jinlia')
    state.dataItem = {
      title: '',
      article_url: '',
      subtitle: '',
      listorder: '',
      content: '',
      is_show: '',
      title_is_show: '',
      type: '',
      activity_id: '',
    };
  },
  setActivityList(state, lists) {
    state.activityList = lists;
  },
  setClassifyField(state, lists) {
    state.classifyField = lists;
  },
  setClassifyList(state, lists) {
    state.classifyList = lists;
  },
  setClassifyPages(state, lists) {
    state.classifyPages = lists;
  },
  setClassifyItem(state, obj) {
    state.classifyItem = obj;
  },
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
