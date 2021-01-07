import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
// initial state
const state = {
  lists: [],
  fields: [],
  pages: {},
  stockLogsLists: [],
  stockLogsFields: [],
  stockLogsPages: {},
  speclists: [],
  specfields: [],
  specpages: {},
  specdetail: {},
  goodsTypeLists: [],
  goodsTypeFields: [],
  goodsTypePages: {},
  allGoodsType: {},
  allBrand: [],
  allSpec: [],
  goodsTypeDet: {},
  goodsAttrDet: {},
};

const actions = {
  // 商品
  fetchLists({ commit },  page ) {
		// console.log(page);
    http
      .get(Server.action.goods_lists, page)
      .then((response) => {
				// console.log(response.result.lists);
        if (response.code === 0) {
          commit('setLists', response.result.lists.data);
          const fields = response.result.field;
          fields[0].width = 100;
          fields[1].width = 100;
          fields[2].scopedSlots = { customRender: 'goods_image' };
          fields[10].scopedSlots = { customRender: 'goods_state' };
          commit('setFields', fields);
          commit('setPages', response.result.lists);
					// console.log('ajax——————————');
					//  console.log(state.lists);
					//  console.log(state.fields);
					//  console.log(state.pages);
					// console.log('ajax——————————');
        } else {
          helper.showError(response.message);
        }
      });
  },
  updateGoodsState({ commit }, { params,collback }) {
    http.post(Server.action.goods_update_state, params)
      .then((response) => {
        if(response.code==0){
			  helper.showSuccess(response.message);
			  //helper.reload();
			  collback&&collback();
		  }else{
			  helper.showError(error);
		  }
      });
  },
  delGoods({ commit }, { id }) {
    http.post(Server.action.goods_delete, id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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


  specLists({ commit }, page) {
    http
      .get(Server.action.spec_list, { page })
      .then((response) => {
        if (response.code === 0) {
          const fields = response.result.field;
          fields.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: 150,
          });
          commit('setSpecLists', response.result.lists.data);
          commit('setSpecFields', fields);
          commit('setSpecPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  goodsStockLogs({ commit }, formItem) {
    http
      .get(Server.action.goodsStockLogs, formItem)
      .then((response) => {
        if (response.code === 0) {
          const fields = response.result.field;
          fields[2].width = 200
          commit('setStockLogsLists', response.result.lists.data);
          commit('setStockLogsFields', fields);
          commit('setStockLogsPages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  addSpec({ commit }, { formItem }) {
    http.post(Server.action.spec_add, formItem)
      .then((response) => {
        if (response.code === 0) {
          router.replace({
            path: '/goods/spec/lists',
          });
        } else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getSpecDetail({ commit }, { id }) {
    fetch
      .get(Server.action.spec_detail + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setSpecDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  editSpec({ commit }, { formItem }) {
    fetch
      .post(Server.action.spec_edit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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

  deleteSpec({ commit }, { param, listData }) {
    fetch
      .get(Server.action.spec_del + param.id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === param.id) {
              return listData.splice(i, 1);
            }
          }
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  goodsTypeLists({ commit }, page) {
    http
      .get(Server.action.goods_type_lists, { page })
      .then((response) => {
        if (response.code === 0) {
          const fields = response.result.field;
          fields.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
            width: 150,
          });
          commit('setGoodsTypeLists', response.result.lists.data);
          commit('setGoodsTypeFields', fields);
          commit('setGoodsTypePages', response.result.lists);
        } else {
          helper.showError(response.message);
        }
      });
  },
  addGoodsType({ commit }, { formItem }) {
    http.post(Server.action.goods_type_add, formItem)
      .then((response) => {
        if (response.code === 0) {
          router.replace({
            path: '/goods/GoodsType/lists',
          });
        } else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  editGoodsType({ commit }, { formItem }) {
    http.post(Server.action.goods_type_edit, formItem)
      .then((response) => {
        if (response.code === 0) {
          helper.reload();
        } else if (response.code === 414) {
          helper.showErrors(response.result.errors);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getAllGoodsTypeDetail({ commit }) {
    fetch
      .get(Server.action.goods_type_detail)
      .then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.result);
          commit('setAllBrand', response.data.result.all_brands);
          // commit('setAllSpec', response.data.result.spec_list);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getGoodsTypeDetail({ commit }, { id }) {
    fetch
      .get(`${Server.action.goods_type_detail}/${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          console.log(response.data.result);
          commit('setAllBrand', response.data.result.all_brands);
          // commit('setAllSpec', response.data.result.spec_list);
          commit('setGoodsTypeDet', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getGoodsAttrDetail({ commit }, { id }) {
    fetch
      .get(`${Server.action.goods_attr_det}/${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setGoodsAttrDet', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  deleteGoodsType({ commit }, { param, listData }) {
    fetch
      .get(Server.action.goods_type_delete + param.id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === param.id) {
              return listData.splice(i, 1);
            }
          }
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  editAttr({ commit }, { formItem }) {
    fetch
      .post(Server.action.goods_attr_edit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          helper.reload();
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
};

const mutations = {
  setSpecDetail(state, lists) {
    state.specdetail = lists;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  // set fields
  setFields(state, fields) {
    state.fields = fields;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setStockLogsLists(state, lists) {
    state.stockLogsLists = lists;
  },
  // set fields
  setStockLogsFields(state, fields) {
    state.stockLogsFields = fields;
  },
  setStockLogsPages(state, lists) {
    state.stockLogsPages = lists;
  },
  setSpecLists(state, lists) {
    state.speclists = lists;
  },
  // set fields
  setSpecFields(state, fields) {
    state.specfields = fields;
  },
  setSpecPages(state, lists) {
    state.specpages = lists;
  },


  setGoodsTypeLists(state, lists) {
    state.goodsTypeLists = lists;
  },
  // set fields
  setGoodsTypeFields(state, fields) {
    state.goodsTypeFields = fields;
  },
  setGoodsTypePages(state, lists) {
    state.goodsTypePages = lists;
  },

  setAllBrand(state, lists) {
    state.allBrand = lists;
  },
  // set fields
  setAllSpec(state, lists) {
    state.allSpec = lists;
  },
  setGoodsTypeDet(state, lists) {
    state.goodsTypeDet = lists;
  },
  setGoodsAttrDet(state, lists) {
    state.goodsAttrDet = lists;
  },
};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
