import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import router from '@/router';
import http from '@/api/http';

// initial state
const state = {
  activityField: [],
  activityList: [],
  activityPages: {},
  lists: [],
  fields: [],
  detail: {},
  pages: {},
  exportData: {},
  dataField: [],
  dataList: [],
  dataPages: {},
  dataItem: {
  },
  shopLists: [],
  benefitsDetail: {},
  quickRejectList: [],
  quickRejectPages: {},
  quickRejectField: [],
  quickRejectItem: {},
};

const actions = {
  deleteQuickReject({ commit }, params) {
    http
      .get(`${Server.action.deleteQuickReject}/${params}`)
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
  editQuickReject({ commit }, formItem) {
    http
      .post(Server.action.editQuickReject, formItem)
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
  getQuickRejectDetail({ commit }, params) {
    http
      .get(`${Server.action.quickRejectDetail}/${params}`)
      .then((response) => {
        if (response.code === 0) {
          commit('setQuickReject', response.result);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getQuickRejectList({ commit }, params) {
    http
      .get(Server.action.quickRejectList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setQuickRejectField', field);
          commit('setQuickRejectPages', response.result.lists);
          commit('setQuickRejectList', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addQuickReject({ commit }, formItem) {
    http
      .post(Server.action.addQuickReject, formItem)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message)
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


  getBenefitsDetail({ commit }, params) {
    http.get(Server.action.benefits_detail, params).then((resData) => {
      commit('setBenefitsDetail', resData.result);
    });
  },
  userAccountDown({ commit }, { data, collback }) {
    http
      .post(Server.action.userAccountDown, data)
      .then((response) => {
        if (response.code === 0) {
          collback && collback();
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  setBenefits({ commit }, params) {
    http
      .post(Server.action.set_benefits, params)
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
  addActivity({ commit }, formItem) {
    http
      .post(Server.action.addActivity, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.showSuccess(response.message);
          // helper.reload();
          // setTimeout(() => {
          //   router.back();
          // }, 1000);
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

  getActivityList({ commit }, params) {
    http
      .get(Server.action.activityList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          // field.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setActivityField', field);
          commit('setActivityPages', response.result.lists);
          commit('setActivityList', response.result.lists.data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getShopLists({ commit }, params) {
    http.get(Server.action.crmStoreLists, params).then((resData) => {
      commit('setShopLists', resData.result.lists.data);
    });
  },
  verifyDateItem({ commit }, { params }) {
    http
      .post(Server.action.verifyIntegralApply, params.data)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message);
        //   setTimeout(() => {
        //     router.back();
          //   }, 500);
          console.log('结果', response);
          params.collback && params.collback(response.result.next_id);
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
      .get(`${Server.action.applyIntegralDetail}/${params}`)
      .then((response) => {
        if (response.code === 0) {
          const data = response.result;
          data.imgs = [
            {
              url: data.uploaded_data,
              title: '自助积分',
            },
          ];
          commit('setDataItem', data);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  rejectApply({ commit }, data) {
    http
      .post(Server.action.rejectIntegralApply, data)
      .then((response) => {
        if (response.code === 0) {
          // helper.showSuccess(response.message);
          helper.reload();
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
      .get(Server.action.applyIntegralList, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[1].scopedSlots = { customRender: 'ticket_img' };
          // field[6].filters = [
          //   { text: '待处理', value: '0' },
          //   { text: '已通过', value: '1' },
          //   { text: '未通过', value: '2' },
          // ];
          // field[6].onFilter = (value, record) => record.status.indexOf(value) === 0;
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
  fetchLists({ commit }, listItem) {
    fetch
      .get(Server.action.member_list, { params: listItem })
      .then((response) => {
        if (response.data.code === 0) {
          // console.log(response);
          commit('setLists', response.data.result.lists.data);
          commit('setFields', response.data.result.field);
          commit('setpage', response.data.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  fetchCardLists({ commit }, listItem) {
    fetch
      .get(Server.action.member_card_list, { params: listItem })
      .then((response) => {
        if (response.data.code === 0) {
          const fieldList = response.data.result.field;
          fieldList[3].scopedSlots = { customRender: 'card_img' };
          fieldList.push({
            title: '操作',
            dataIndex: 'action',
            width: 200,
            scopedSlots: { customRender: 'action' },
          });
          // console.log(response);
          commit('setLists', response.data.result.lists.data);
          commit('setFields', response.data.result.field);
          commit('setpage', response.data.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addCard({ commit }, { formItem }) {
    fetch
      .post(Server.action.member_card_save, formItem)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/member/card/lists',
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
      .get(`${Server.action.member_card_detail}/${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result);
          console.log(response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 筛选
  fetchSearch({ commit }, listItem) {
    fetch
      .get(Server.action.member_search, { params: listItem })
      .then((response) => {
        if (response.data.code === 0) {
          // console.log(response);
          commit('setLists', response.data.result.lists.data);
          commit('setFields', response.data.result.field);
          commit('setpage', response.data.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 导出为Excel
  exportFilter({ commit }, exportForm) {
    fetch
      .post(Server.action.member_export, exportForm)
      .then((response) => {
        // console.log(response);
        if (response.data.code === 0) {
          commit('setExportData', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
};

const mutations = {
  setQuickReject(state, obj) {
    state.quickRejectItem = obj;
  },
  setQuickRejectField(state, lists) {
    state.quickRejectField = lists;
  },
  setQuickRejectList(state, lists) {
    state.quickRejectList = lists;
  },
  setQuickRejectPages(state, lists) {
    state.quickRejectPages = lists;
  },
  setBenefitsDetail(state, data) {
    state.benefitsDetail = data;
  },
  setActivityField(state, lists) {
    state.activityField = lists;
  },
  setActivityList(state, lists) {
    state.activityList = lists;
  },
  setActivityPages(state, lists) {
    state.activityPages = lists;
  },
  setShopLists(state, data) {
    state.shopLists = data;
  },
  setDataItem(state, obj) {
    state.dataItem = obj;
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
  setDetail(state, detail) {
    state.detail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setpage(state, page) {
	  state.pages = page;
  },
  setExportData(state, lists) {
	  state.exportData = lists;
  },
  // set fields
  setFields(state, fields) {
    state.fields = fields;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
