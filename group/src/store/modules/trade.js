import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import { rejects } from 'assert';
// initial state
const state = {
  lists: [],
  fields: [],
  ratelists: [],
  ratefields: [],
  detail: {},
  ratedetail: {},
  pages: {},
  ratePages: {},
  afterSalesLists: [],
  afterSalesFields: [],
  afterSalesDetail: {},
  cencelData: [],
  cancelFields: [],
  cancelPages: {},
  refundsData: [],
  refundsFields: [],
  refundsPages: {},
  logisticsData: [],
  logisticsFields: [],
  logisticsPages: {},
  exportData: {},
  afterSalesPages: {},
  pointLists: [],
  pointFields: [],
  pointPages: {},
  afterExportData: {},
  payorderData:[],
  payorderFields:[],
  payorderPages:{},
  refundsGoodData: [],
  refundsGoodFields: [],
  refundsGoodPages: {},
  confirmOrderData: [],
  confirmOrderFields: [],
  confirmOrderPages: {},
  goodCostData: [],
  goodCostFields: [],
  goodCostPages: {},
  dailysaleData: [],
  dailysaleFields: [],
  dailysalePages: {},
  goodsaleData: [],
  goodsaleFields: [],
  goodsalePages: {},
  total_fee_data:[]
};

const actions = {
	paymentAccountDown({ commit }, {exportForm,callback}) {
		http
		  .post(Server.action.paymentAccountDown, exportForm)
		  .then((response) => {
			console.log(response);
			if (response.code === 0) {
			  //commit('setExportData', response.result);
			  callback && callback();
			} else {
			  helper.showError(response.data.message);
			}
		  });
		// .catch((error) => {
		//   helper.showError(error);
		// });
	  },
	orderAccountDown({ commit },{exportForm,callback}) {//callback

		fetch
		  .post(Server.action.orderAccountDown, exportForm)
		  .then((response) => {
			console.log(response);
			if (response.data.code === 0) {
			  //commit('setExportData', response.data.result);
			  callback && callback()
			} else {
			  helper.showError(response.data.message);
			}
		  });
		// .catch((error) => {
		//   helper.showError(error);
		// });
	  },
  // 导出为Excel
  exportFilter({ commit }, { exportForm, callback }) {
    fetch
      .post(Server.action.trade_export_filter, exportForm)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          commit('setExportData', response.data.result);
          callback && callback()
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  exportRefunds({ commit }, {exportForm}) {
    http
      .get(Server.action.exportRefunds, exportForm)
      .then((response) => {
        console.log(response);
        if (response.code === 0) {
          commit('setExportData', response.result);
          //callback && callback()
        } else {
          helper.showError(response.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  payorderLists({ commit }, page) {
    http
      .get(Server.action.payorderList, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
        //   field.push({
        //     title: '操作',
        //     key: 'action',
        //     dataIndex: 'action',
        //     width: 150,
        //     scopedSlots: { customRender: 'action' },
        //   });
          commit('setPayOrderLists', response.result.lists.data);
          commit('setPayOrderFields', field);
		  commit('setPayOrderPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  payorderExcel({ commit }, {exportForm}) {
    http
      .post(Server.action.payorderExcel, exportForm)
      .then((response) => {
        console.log(response);
        if (response.code === 0) {
          commit('setExportData', response.result);
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  refundsGoodLists({ commit }, page) {//退货列表
	http
	  .get(Server.action.refunds_good_lists, page)
	  .then((response) => {
		if (response.code === 0) {
		  const field = response.result.field;
		//   field.push({
		// 	title: '操作',
		// 	key: 'action',
		// 	dataIndex: 'action',
		// 	width: 80,
		// 	// fixed: 'right',
		// 	scopedSlots: { customRender: 'action' },
		//   });
		  commit('setRefundsGoodLists', response.result.lists.data);
		  commit('setRefundsGoodFields', field);
		  commit('setRefundsGoodPages', response.result.lists);
		} else {
		  helper.showError(response.data.message);
		}
	  });
  },
  exportRefundsGood({ commit }, {exportForm}) {
	http
	  .post(Server.action.refunds_good_excel, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  commit('setExportData', response.result);
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  confirmOrderList({ commit }, page) {//确认收货列表
	http
	  .get(Server.action.confirm_order_lists, page)
	  .then((response) => {
		if (response.code === 0) {
		  const field = response.result.field;
		//   field.push({
		// 	title: '操作',
		// 	key: 'action',
		// 	dataIndex: 'action',
		// 	width: 80,
		// 	// fixed: 'right',
		// 	scopedSlots: { customRender: 'action' },
		//   });
		  commit('setConfirmOrderLists', response.result.lists.data);
		  commit('setConfirmOrderFields', field);
		  commit('setConfirmOrderPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
		} else {
		  helper.showError(response.data.message);
		}
	  });
  },
  exportconfirmOrder({ commit }, {exportForm}) {//确认收货列表导出
	http
	  .post(Server.action.confirm_order_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  commit('setExportData', response.result);
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  goodCostList({ commit }, page) {//成本结算列表
	http
	  .get(Server.action.good_cost_lists, page)
	  .then((response) => {
		if (response.code === 0) {
		  const field = response.result.field;
		//   field.push({
		// 	title: '操作',
		// 	key: 'action',
		// 	dataIndex: 'action',
		// 	width: 80,
		// 	// fixed: 'right',
		// 	scopedSlots: { customRender: 'action' },
		//   });
		  commit('setGoodCostLists', response.result.lists.data);
		  commit('setGoodCostFields', field);
		  commit('setGoodCostPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
		} else {
		  helper.showError(response.data.message);
		}
	  });
  },
  exportgoodCost({ commit }, {exportForm}) {//成本结算导出
	http
	  .post(Server.action.good_cost_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  commit('setExportData', response.result);
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  goodCostDown({ commit }, {exportForm,callback}) {//成本结算队列导出
	http
	  .post(Server.action.new_good_cost_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  //commit('setExportData', response.result);
		  callback && callback();
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  dailysaleList({ commit }, page) {//销售日报列表
	http
	  .get(Server.action.daily_sale_lists, page)
	  .then((response) => {
		if (response.code === 0) {
		  const field = response.result.field;
		//   field.push({
		// 	title: '操作',
		// 	key: 'action',
		// 	dataIndex: 'action',
		// 	width: 80,
		// 	// fixed: 'right',
		// 	scopedSlots: { customRender: 'action' },
		//   });
		  commit('setDailySaleLists', response.result.lists.data);
		  commit('setDailySaleFields', field);
		  commit('setDailySalePages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
		} else {
		  helper.showError(response.data.message);
		}
	  });
  },
  exportDailysale({ commit }, {exportForm}) {//销售日报导出
	http
	  .post(Server.action.daily_sale_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  commit('setExportData', response.result);
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  exportGood({ commit }, { exportForm, callback }) {//商品列表导出
	http
	  .post(Server.action.goods_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
      // commit('setExportData', response.result);
      callback && callback();
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  fetchLists({ commit }, page) {
    http
      .get(Server.action.trade_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field[9].width = 200;
          field[17].width = 200;
          field[field.length - 1].width = 200;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            // fixed:'right',
            width: 150,
            scopedSlots: { customRender: 'action' },
          });
          commit('setLists', response.result.lists.data);
          commit('setFields', field);
		  commit('setPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  pointLists({ commit }, page) {
    http
      .get(Server.action.point_lists, { page })
      .then((response) => {
        if (response.code === 0) {
          commit('setPointLists', response.result.lists.data);
          commit('setPointFields', response.result.field);
		  commit('setPointPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  cancelOrder({ commit }, { formItem }) {
    fetch
      .post(Server.action.cancel_order, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          setTimeout(() => {
            helper.reload();
          }, 200);
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
      .get(Server.action.trade_detail + id)
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
  rateLists({ commit }, page) {
    http
      .get(Server.action.rate_list, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          field[3].width = 120;
          commit('setRateLists', response.result.lists.data);
          commit('setRatePages', response.result.lists);
          commit('setRateFields', field);
        } else {
          helper.showError(response.message);
        }
      });
  },
  getRateDetail({ commit }, { id }) {
    fetch
      .get(Server.action.rate_detail + id)
      .then((response) => {
        if (response.data.code === 0) {
          commit('setRateDetail', response.data.result);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 售后列表
  getAfterSalesLists({ commit }, params) {
    http
      .get(Server.action.after_sales_lists, params)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 100,
            fixed: 'right',
            scopedSlots: { customRender: 'action' },
          });
          commit('setAfterSalesLists', response.result.lists.data);
          commit('setAfterSalesPages', response.result.lists);
          commit('setAfterSalesFields', field);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 售后列表明细
  AfterSaleseDetails({ commit }, { id }) {
    fetch
      .get(Server.action.after_sales_details + id)
      .then((response) => {
        if (response.status === 200) {
          commit('setAfterSaleseDetail', response.data);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  afterExport({ commit }, params) {
    return new Promise((resolve, reject) => {
      http.get(Server.action.after_export, params).then(response => {
        console.log(response)
        if (response.code === 0) {
          commit('setAfterExport', response.result.trade);
          resolve(response.result.trade)
        } else {
          helper.showError(response.message);
        }
      })
    })
  },
  cancelLists({ commit }, page) {
    http
      .get(Server.action.cancel_order_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          // field.push({
          //   title: '操作',
          //   key: 'action',
          //   dataIndex: 'action',
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setCancelLists', response.result.lists.data);
          commit('setCancelFields', field);
		  commit('setCancelPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  refundsLists({ commit }, page) {
    http
      .get(Server.action.refunds_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            width: 80,
            // fixed: 'right',
            scopedSlots: { customRender: 'action' },
          });
          commit('setRefundsLists', response.result.lists.data);
          commit('setRefundsFields', field);
		  commit('setRefundsPages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  goodsaleList({ commit }, page) {//商品销售量列表
	http
	  .get(Server.action.good_sale_lists, page)
	  .then((response) => {
		if (response.code === 0) {
		  const field = response.result.field;
		//   field.push({
		// 	title: '操作',
		// 	key: 'action',
		// 	dataIndex: 'action',
		// 	width: 80,
		// 	// fixed: 'right',
		// 	scopedSlots: { customRender: 'action' },
		//   });
		  commit('setGoodsaleLists', response.result.lists.data);
		  commit('setGoodsaleFields', field);
		  commit('setGoodsalePages', response.result.lists);
		  commit('totalData',response.result.total_fee_data?response.result.total_fee_data:[]);
		} else {
		  helper.showError(response.data.message);
		}
	  });
  },
  exportgoodsale({ commit }, {exportForm}) {//商品销售量列表导出
	http
	  .post(Server.action.good_sale_down, exportForm)
	  .then((response) => {
		console.log(response);
		if (response.code === 0) {
		  commit('setExportData', response.result);
		} else {
		  helper.showError(response.message);
		}
	  });
	// .catch((error) => {
	//   helper.showError(error);
	// });
  },
  // 退款驳回
  resetSellerRefund({ commit }, { id }) {
    fetch
      .get(Server.action.resetSellerRefund + `?id=${id}`)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
          setTimeout(() => {
            helper.reload();
          }, 200);
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  editDorefund({ commit }, formItem) {
    fetch
      .post(Server.action.trade_dorefund, formItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else if (response.data.code === 414) {
          const dataObj = response.data.result.errors;
          for (const i in dataObj) {
            helper.showError(dataObj[i]);
          }
          // helper.showErrors(response.result.errors);
        } else if (response.data.code === 600) {
          helper.showError(response.data.message);
        } else {
          helper.showError(response.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 物流列表
  logisticsLists({ commit }, param) {
    http
      .get(Server.action.logistics_lists, param)
      .then((resData) => {
        if (resData.code === 0) {
          const field = resData.result.field;
          field.push({
            title: '操作',
            key: 'action',
            dataIndex: 'action',
            scopedSlots: { customRender: 'action' },
          });
          commit('setLogisticsLists', resData.result.lists.data);
          commit('setLogisticsFields', field);
          commit('setLogisticsPages', resData.result.lists);
        } else {
          helper.showError(resData.message);
        }
      });
  },
  // 删除物流
  logisticsDel({ commit }, { id }) {
    fetch
      .get(Server.action.logistics_del + id)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showError('删除成功');
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 添加物流
  logisticsAdd({ commit }, fromItem) {
    fetch
      .post(Server.action.logistics_add, fromItem)
      .then((response) => {
        console.log(fromItem);
        console.log(response);
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else if (response.data.code === 414) {
          const obj = response.data.result.errors;
          for (const i in obj) {
            helper.showError(obj[i]);
          }
        } else {
          helper.showError(response.data.message);
        }
      })
      .catch((error) => {
        helper.showError(error);
      });
  },
  // 编辑物流
  logisticsEdit({ commit }, fromItem) {
    fetch
      .post(Server.action.logistics_edit, fromItem)
      .then((response) => {
        if (response.data.code === 0) {
          helper.showSuccess(response.data.message);
        } else if (response.data.code === 414) {
          const obj = response.data.result.errors;
          for (const i in obj) {
            helper.showError(obj[i]);
          }
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
  setExportData(state, lists) {
    state.exportData = lists;
  },
  setAfterSalesLists(state, detail) {
    state.afterSalesLists = detail;
  },
  setAfterSalesFields(state, detail) {
    state.afterSalesFields = detail;
  },
  setAfterSaleseDetail(state, detail) {
    state.afterSalesDetail = detail;
  },
  setAfterSalesPages(state, detail) {
    state.afterSalesPages = detail;
  },
  setDetail(state, detail) {
    state.detail = detail;
  },
  setRateDetail(state, detail) {
    state.ratedetail = detail;
  },
  setLists(state, lists) {
    state.lists = lists;
  },
  setPages(state, lists) {
    state.pages = lists;
  },
  setFields(state, fields) {
    state.fields = fields;
  },
  setPointLists(state, lists) {
    state.pointLists = lists;
  },
  setPointPages(state, lists) {
    state.pointPages = lists;
  },
  setPointFields(state, fields) {
    state.pointFields = fields;
  },
  setRatePages(state, lists) {
    state.ratePages = lists;
  },
  // set fields
  setRateLists(state, lists) {
    state.ratelists = lists;
  },
  // set fields
  setRateFields(state, fields) {
    state.ratefields = fields;
  },
  setCancelLists(state, lists) {
    state.cencelData = lists;
  },
  setCancelPages(state, lists) {
    state.cancelPages = lists;
  },
  setCancelFields(state, fields) {
    state.cancelFields = fields;
  },
  setRefundsLists(state, lists) {
    state.refundsData = lists;
  },
  setRefundsPages(state, lists) {
    state.refundsPages = lists;
  },
  setRefundsFields(state, fields) {
    state.refundsFields = fields;
  },
  // 物流列表
  setLogisticsLists(state, fields) {
    state.logisticsData = fields;
  },
  setLogisticsFields(state, fields) {
    state.logisticsFields = fields;
  },
  setLogisticsPages(state, fields) {
    state.logisticsPages = fields;
  },
  setAfterExport(state, data) {
    state.afterExportData = data;
  },
  setPayOrderLists(state, fields) {
    state.payorderData = fields;
  },
  setPayOrderFields(state, fields) {
    state.payorderFields = fields;
  },
  setPayOrderPages(state, fields) {
    state.payorderPages = fields;
  },
  setRefundsGoodLists(state, lists) {
	state.refundsGoodData = lists;
  },
  setRefundsGoodPages(state, lists) {
	state.refundsGoodPages = lists;
  },
  setRefundsGoodFields(state, fields) {
	state.refundsGoodFields = fields;
  },
  setConfirmOrderLists(state, lists) {
	state.confirmOrderData = lists;
  },
  setConfirmOrderPages(state, lists) {
	state.confirmOrderPages = lists;
  },
  setConfirmOrderFields(state, fields) {
	state.confirmOrderFields = fields;
  },
  setGoodCostLists(state, lists) {
	state.goodCostData = lists;
  },
  setGoodCostPages(state, lists) {
	state.goodCostPages = lists;
  },
  setGoodCostFields(state, fields) {
	state.goodCostFields = fields;
  },
  setDailySaleLists(state, lists) {
	state.dailysaleData = lists;
  },
  setDailySalePages(state, lists) {
	state.dailysalePages = lists;
  },
  setDailySaleFields(state, fields) {
	state.dailysaleFields = fields;
  },
  setGoodsaleLists(state, lists) {
	state.goodsaleData = lists;
  },
  setGoodsalePages(state, lists) {
	state.goodsalePages = lists;
  },
  setGoodsaleFields(state, fields) {
	state.goodsaleFields = fields;
  },
  totalData(state,data){
	state.total_fee_data=data
  }

};

export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
