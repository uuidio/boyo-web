import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
// import { rejects } from 'assert';
// initial state
const state = {
  chatCheckData: [],
  chatCheckFields: [],
  chatCheckPages: {},
  abnormalData: [],
  abnormalFields: [],
  abnormalPages: {},
  exportData: {},
  dataCount: {},
  importLists: [],
  importListPages: [],
  importListFields: [],
};

const actions = {
  getImportList({ commit }, param) { // 导入结果列表
    const url = param.uploadType == 1 ? Server.action.wechat_import_list : Server.action.project_import_list;
    const obj = {
      type: param.type,
      download: param.download,
    };
    if (param.download === 0) {
      obj.page = param.page;
    }
    http
      .get(url, obj)
      .then((response) => {
        if (response.code === 0) {
          if (param.download === 0) {
            const field = response.result.field;
            field.push({
              title: '操作',
              key: 'action',
              dataIndex: 'action',
              width: 150,
              scopedSlots: { customRender: 'action' },
            });
            commit('setImportLists', response.result.lists);
            commit('setImportListFields', field);
          } else {
            commit('setExportData1', response.result);
            param.callback && param.callback();
          }
        } else {
          helper.showError(response.data.message);
        }
      });
  },

  exportWechatCheck({ commit }, { exportForm, callback }) { // 对账列表导出
    fetch
      .post(Server.action.wechat_check_export, exportForm)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setExportData', response.data.result);
          callback && callback();
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  exportWechatAbnormal({ commit }, { exportForm, callback }) { // 异常列表导出
    fetch
      .post(Server.action.wechat_check_abnormal_export, exportForm)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setExportData', response.data.result);
          callback && callback();
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  wechatCheckLists({ commit }, page) { // 对账单列表
    http
      .get(Server.action.wechat_check_list, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setwechatCheckLists', response.result.lists.data);
          commit('setwechatCheckFields', field);
          commit('setDataCount', response.result.count);

		  commit('setwechatCheckPages', response.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  abnormalLists({ commit }, page) { // 导入异常列表
    http
      .get(Server.action.wechat_check_abnormal_list, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setabnormalLists', response.result.lists.data);
          commit('setabnormalFields', field);
		  commit('setabnormalPages', response.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  wechatCheckUpdate({ commit }, page) { // 对账列表状态修改
    http
      .post(Server.action.wechat_check_update, page)
      .then((response) => {
        if (response.code === 0) {
          helper.reload();
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  confirmRefund({ commit }, param) { // 对账列表状态修改
    http
      .post(Server.action.check_update_processing, param)
      .then((response) => {
        if (response.code === 0) {
          setTimeout(() => {
            helper.reload();
          }, 1000);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  abnormalDelete({ commit }, page) { // 导入异常列表删除
    http
      .post(Server.action.wechat_check_delete, page)
      .then((response) => {
        if (response.code === 0) {
          helper.reload();
        } else {
          helper.showError(response.data.message);
        }
      });
  },
};

const mutations = {
  setExportData1(state, lists) {
    state.exportData1 = lists;
  },
  setImportLists(state, lists) {
    state.importLists = lists;
  },
  setImportListFields(state, lists) {
    state.importListFields = lists;
  },
  setImportListPages(state, lists) {
    state.importListPages = lists;
  },
  setDataCount(state, obj) {
    state.dataCount = obj;
  },
  setExportData(state, lists) {
    state.exportData = lists;
  },
  setwechatCheckLists(state, lists) {
    state.chatCheckData = lists;
  },
  setwechatCheckFields(state, lists) {
    state.chatCheckFields = lists;
  },
  setwechatCheckPages(state, lists) {
    state.chatCheckPages = lists;
  },
  setabnormalLists(state, lists) {
    state.abnormalData = lists;
  },
  setabnormalFields(state, lists) {
    state.abnormalFields = lists;
  },
  setabnormalPages(state, lists) {
    state.abnormalPages = lists;
  },

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
