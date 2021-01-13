import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
// initial state
const state = {
  promo_good: false,
  goodsClassTree: [],
  imgsPage: {},
  goodsBrands: [],
  attrList: [],
  imgs: [],
  imgsPages: [],
  detail: {},
  lists: [],
  fields: [],
  pages: {},
  shopClass: [],
  shopFields: [],
  shopClassTree: [],
  classfields: [],
  classlists: [],
  zitiLists: [],
  zitiFields: [],
  RecycleFields: [],
  RecycleLists: [],
  RecyclePages: {},
  skuItem: {},
  sourceLists: [],
  sourecGoodsLists: [],
  sourecGoodsFields: [],
  sourecGoodsPages: {},
  goodItemSku: {},
  promotionRules: '',
};

const actions = {
  getShopClassTreeTwo({ commit }) {
    return new Promise((resolve, reject) => {
      fetch
        .get(Server.action.shopClassTree)
        .then((response) => {
          if (response.data.code === 0) {
            resolve(response.data.result);
          } else {
            helper.showError(response.data.message);
          }
        })
        .catch((error) => {
          helper.showError(error);
        });
    });
  },
  getPromoRule({ commit }, params) { // 推广规则
    http.get(Server.action.promotionRules, params).then((resData) => {
      console.log(resData, 888);
      if (resData.code === 0) {
        commit('setPromotionRules', resData.result.content);
      }
    });
  }, // 查看推广权限
  promoGoodCheck({ commit }) {
    http.get(Server.action.promoGoodCheck).then((resData) => {
      console.log(resData);
      if (resData.code === 0) {
        commit('setPromo_good', resData.result.promo_good);
      }
    });
  }, // 查看推广权限
  // 第三方来源列表
  sourceLists({ commit }) {
    http.get(Server.action.sourceLists).then((resData) => {
      console.log(resData);
      commit('setSourceLists', resData.result);
      // commit('setClassFields', field);
    });
  },
  sourecGoodsLists({ commit }, params) {
    http.get(Server.action.sourec_goods_lists, params).then((resData) => {
      commit('setSourecGoodsLists', resData.result.lists.data);
      const f = resData.result.field;
      f[2].scopedSlots = { customRender: 'goods_image' };
      f[10].scopedSlots = { customRender: 'goods_state' };
      commit('setSourecGoodsFields', resData.result.field);
      commit('setSourecGoodsPages', resData.result.lists);
    });
  },
  // 商品
  fetchLists({ commit }, { obj, callback }) {
    fetch
      .get(Server.action.goods_lists, { params: obj })
      .then((response) => {
        if (response.data.code === 0) {
          commit('setLists', response.data.result.lists.data);
          const fields = response.data.result.field;
          fields[0].width = 100;
          fields[0].fixed = 'left';
          fields[1].width = 100;
          fields[1].fixed = 'left';
          fields[2].scopedSlots = { customRender: 'goods_image', width: 500 };
          fields[10].scopedSlots = { customRender: 'goods_state' };
          fields.push({
            title: '操作',
            dataIndex: 'action',
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
            width: 150,
          });
          commit('setFields', fields);
          commit('setPages', response.data.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  getGoodsClassTree({ commit }, callback) {
    fetch
      .get(Server.action.goods_class_tree)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          commit('setGoodsClassTree', response.data.result);
          if (callback) {
            callback(response.data.result);
          }
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addGoods({ commit }, { formItem }) {
    fetch
      .post(Server.action.goods_add, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.replace({
            path: '/goods/lists',
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
  updateGoodsState({ commit }, { params, collback }) {
    http.post(Server.action.goods_update_state, params)
      .then((response) => {
        if (response.code == 0) {
			  helper.showSuccess(response.message);
			  // helper.reload();
			  collback && collback();
		  } else {
			  helper.showError(error);
		  }
      });
  },
  updateGoodsPrice({ commit }, { params, collback }) {
    http.post(Server.action.goods_update_price, params)
      .then((response) => {
		  console.log(response);
		  if (response.code == 0) {
			  helper.showSuccess(response.message);
			   // helper.reload();
			   collback && collback();
		  } else {
			  helper.showError(error);
		  }
      });
  },
  getGoodSku({ commit }, { id }) {
    http
      .get(Server.action.getGoodSku + id)
      .then((response) => {
        console.log('获取规格', response);
        if (response.code === 0) {
          const detail = response.result;
          const initData = {
            spec_name: detail.spec_name,
            spec_value: detail.goods_spec,
            sku: detail.sku,
          };
          commit('setGoodItemSku', initData);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  updateGoodItemSku({ commit }, params) {
    http.post(Server.action.updateGoodSku, params)
      .then((response) => {
		  console.log(response);
		  if (response.code == 0) {
			  helper.showSuccess(response.message);
			  helper.reload();
		  } else {
			  helper.showError(error);
		  }
      });
  },
  // 商品详情
  getDetail({ commit }, { id }) {
    fetch
      .get(Server.action.goods_detail + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },

  // 修改商品
  editGoods({ commit }, { formItem }) {
    fetch
      .post(Server.action.goods_edit, formItem)
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

  deleteRow({ commit }, { param, listData }) {
    fetch
      .get(Server.action.goods_delete + param.id)
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
  //  图片管理
  getImgs({ commit }, page) {
    http.get(Server.action.album_pics, { page }).then((resData) => {
      commit('setimgs', resData.result.data);
      commit('setImgsPage', resData.result);
    });
  },
  // 图片删除
  delImg({ commit }, { imgId }) {
    fetch
      .post(Server.action.goods_del_id, imgId)
      .then((response) => {
        if (response.data.code === 0) {
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
  //  库存报警

  //  门店分类
  shopClssLists({ commit }) {
    http.get(Server.action.shop_class_list).then((resData) => {
      const field = resData.result.field;
      field[3].scopedSlots = { customRender: 'cat_name' };
      field.push({
        title: '操作',
        dataIndex: 'action',
        scopedSlots: { customRender: 'action' },
      });
      const data = resData.result.lists;
      for (let i = 0; i < data.length; i++) {
        data[i].editable = false;
      }
      // callback(resData);
      commit('setClassLists', data);
      commit('setClassFields', field);
    });
  },
  getShopClassTree({ commit }) {
    fetch
      .get(Server.action.shopClassTree)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setShopClassTree', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  addShopClass({ commit }, { formItem }) {
    fetch
      .post(Server.action.shop_class_add, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          router.push({
            path: '/goods/class/lists',
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
  editShopClass({ commit }, { formItem }) {
    fetch
      .post(Server.action.shop_class_edit, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
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
  delShopClass({ commit }, { id, listData }) {
    fetch
      .get(Server.action.shop_class_del + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          for (let i = 0; i < listData.length; i++) {
            if (listData[i].id === id) {
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
  // 自提地址
  getZitiLists({ commit }) {
    fetch
      .get(Server.action.ziti_lists)
      .then((response) => {
        if (response.data.code === 0) {
          const field = response.data.result.field;
          field.push({
            title: '操作',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          const data = response.data.result.lists;
          commit('setZitiLists', data);
          commit('setZitiFields', field);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 添加自提地址
  addZiti({ commit }, { obj }) {
    fetch
      .post(Server.action.ziti_add, obj)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else if (response.data.code === 414) {
          helper.showError(response.data.message);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 删除自提地址
  delZiti({ commit }, { delId }) {
    fetch
      .post(Server.action.ziti_del, delId)
      .then((response) => {
        if (response.data.code === 0) {
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
  editZiti({ commit }, { editObj }) {
    fetch
      .post(Server.action.ziti_edit, editObj)
      .then((response) => {
        if (response.data.code === 0) {
          // helper.reload();
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

  // 商品回收站
  getRecycleLists({ commit }) {
    fetch
      .get(Server.action.goods_recycle_lists)
      .then((response) => {
        // console.log(response);
        if (response.data.code === 0) {
          const field = response.data.result.field;
          const data = response.data.result.lists.data;
          const pages = response.data.result.lists;
          // field.push({
          //   title: '操作',
          //   dataIndex: 'action',
          //   width: 200,
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setRecycleLists', data);
          commit('setRecycleFields', field);
          commit('setRecyclePages', pages);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 回收站恢复商品
  restoreGoods({ commit }, ids) {
    fetch
      .post(Server.action.goods_recycle_restore, ids)
      .then((response) => {
        if (response.data.code === 0) {
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
  // 回收站删除商品
  deleteGoods({ commit }, ids) {
    fetch
      .post(Server.action.goods_recycle_delete, ids)
      .then((response) => {
        if (response.data.code === 0) {
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

  getAttr({ commit }, { id }) {
    fetch
      .get(Server.action.getAttr + id)
      .then((response) => {
        commit('setBrands', response.data.type_brands);
        commit('setAttr', response.data.attribute);
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getAllBrand({ commit }) {
    fetch
      .get(Server.action.goods_brands)
      .then((response) => {
        commit('setBrands', response.data.result);
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  getAllSpec({ commit }) {
    fetch
      .get(Server.action.getAllSpec)
      .then((response) => {
        commit('setSkuItem', response.data.result.goods_spec);
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
};

const mutations = {
  setPromotionRules(state, detail) {
    state.promotionRules = detail;
  },
  setPromo_good(state, flag) {
    state.promo_good = flag;
  },
  setSourecGoodsLists(state, lists) {
    state.sourecGoodsLists = lists;
  },
  setSourecGoodsPages(state, lists) {
    state.sourecGoodsPages = lists;
  },
  // set fields
  setSourecGoodsFields(state, fields) {
    state.sourecGoodsFields = fields;
  },
  setSourceLists(state, data) {
    state.sourceLists = data;
  },
  setSkuItem(state, detail) {
    state.skuItem = detail;
  },
  // set detail
  setDetail(state, detail) {
    state.detail = detail;
  },
  setGoodsClassTree(state, data) {
    state.goodsClassTree = data;
  },
  setShopClassTree(state, data) {
    state.shopClassTree = data;
  },
  setBrands(state, data) {
    state.goodsBrands = data;
  },
  setAttr(state, data) {
    state.attrList = data;
  },
  setimgs(state, data) {
    state.imgs = data;
  },
  setImgsPage(state, data) {
    state.imgsPage = data;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  // set fields
  setFields(state, fields) {
    state.fields = fields;
  },
  setClassLists(state, lists) {
    state.classlists = lists;
  },
  // set fields
  setClassFields(state, fields) {
    state.classfields = fields;
  },
  setZitiLists(state, lists) {
    state.zitiLists = lists;
  },
  setZitiFields(state, lists) {
    state.zitiFields = lists;
  },
  setRecycleLists(state, lists) {
    state.RecycleLists = lists;
  },
  setRecycleFields(state, lists) {
    state.RecycleFields = lists;
  },
  setRecyclePages(state, lists) {
    state.RecyclePages = lists;
  },
  setGoodItemSku(state, lists) {
    state.goodItemSku = lists;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
