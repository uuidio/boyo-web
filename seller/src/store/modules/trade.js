import helper from '@/utils/helper';
import Server from '@/config/server';
import fetch from '@/api/fetch';
import http from '@/api/http';
import router from '@/router';
import wx from 'jweixin-module';
// import axios from 'axios';
// import { getAccessToken } from '@/utils/util';

const flag1 = 1;
const state = {
  orderHead: [],
  orderLists: [],
  cancelLists: [],
  cancelHead: [],
  detail: {},
  pages: {},
  logistics: [],
  logisticsHead: [],
  cancelDetail: {},
  getCancel: {},
  cancelPage: {},
  PickUpListField: [],
  PickUpListData: [],
  exportData: {},
  logLists: [],
  weixinUploadImage: {},
  afterExportData: {},
  isIosReset: false,
  offLineInfo: {},
  couponDetail: {},
  refundsData: [],
  refundsFields: [],
  refundsPages: {},
  refundsGoodData: [],
  refundsGoodFields: [],
  refundsGoodPages: {},
  confirmOrderData: [],
  confirmOrderFields: [],
  confirmOrderPages: {},
  goodCostData: [],
  goodCostFields: [],
  goodCostPages: {},
  selfExtractData: [],
  selfExtractFields: [],
  selfExtractPages: {},
  goodsaleData: [],
  goodsaleFields: [],
  goodsalePages: {},
  total_fee_data: {},
};
const actions = {
  orderAccountDown({ commit }, { exportForm, callback }) { // callback
    fetch
      .post(Server.action.orderAccountDown, exportForm)
      .then((response) => {
        console.log(response);
        if (response.data.code === 0) {
          // commit('setExportData', response.data.result);
          callback && callback();
        } else {
          helper.showError(response.data.message);
        }
      });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  refundsLists({ commit }, page) { // 退款列表
    http
      .get(Server.action.refunds_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          // field.push({
          //   title: '操作',
          //   key: 'action',
          //   dataIndex: 'action',
          //   width: 80,
          //   // fixed: 'right',
          //   scopedSlots: { customRender: 'action' },
          // });
          commit('setRefundsLists', response.result.lists.data);
          commit('setRefundsFields', field);
          commit('setRefundsPages', response.result.lists);
          commit('totalData', response.result.total_fee_data ? response.result.total_fee_data : []);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  refundsGoodLists({ commit }, page) { // 退货列表
    http
      .get(Server.action.refunds_good_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setRefundsGoodLists', response.result.lists.data);
          commit('setRefundsGoodFields', field);
          commit('setRefundsGoodPages', response.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  exportRefundsGood({ commit }, { exportForm }) {
    http
      .post(Server.action.refunds_good_excel, exportForm)
      .then((response) => {
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
  exportRefunds({ commit }, exportForm) {
    http
      .get(Server.action.exportRefunds, exportForm)
      .then((response) => {
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
  confirmOrderList({ commit }, page) { // 确认收货列表
    http
      .get(Server.action.confirm_order_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setConfirmOrderLists', response.result.lists.data);
          commit('setConfirmOrderFields', field);
          commit('setConfirmOrderPages', response.result.lists);
          commit('totalData', response.result.total_fee_data ? response.result.total_fee_data : []);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  exportconfirmOrder({ commit }, { exportForm }) { // 确认收货列表导出
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
  goodsaleList({ commit }, page) { // 商品销售量列表
    http
      .get(Server.action.good_sale_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setGoodsaleLists', response.result.lists.data);
          commit('setGoodsaleFields', field);
          commit('setGoodsalePages', response.result.lists);
          commit('totalData', response.result.total_fee_data ? response.result.total_fee_data : []);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  exportgoodsale({ commit }, { exportForm }) { // 商品销售量列表导出
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
  exportGood({ commit }, { exportForm, callback }) { // 商品列表导出
    http
      .post(Server.action.goods_down, exportForm)
      .then((response) => {
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
  selfExtractList({ commit }, page) { // 自提商品核销列表
    http
      .get(Server.action.self_extract_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setSelfExtractLists', response.result.lists.data);
          commit('setSelfExtractFields', field);
          commit('setSelfExtractPages', response.result.lists);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  exportselfExtract({ commit }, { exportForm }) { // 自提商品核销列表导出
    http
      .post(Server.action.self_extract_down, exportForm)
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
  goodCostList({ commit }, page) { // 成本结算列表
    http
      .get(Server.action.good_cost_lists, page)
      .then((response) => {
        if (response.code === 0) {
          const field = response.result.field;
          commit('setGoodCostLists', response.result.lists.data);
          commit('setGoodCostFields', field);
          commit('setGoodCostPages', response.result.lists);
          commit('totalData', response.result.total_fee_data ? response.result.total_fee_data : []);
        } else {
          helper.showError(response.data.message);
        }
      });
  },
  exportgoodCost({ commit }, { exportForm }) { // 成本结算导出
    http
      .post(Server.action.good_cost_down, exportForm)
      .then((response) => {
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
  goodCostDown({ commit }, { exportForm, callback }) { // 成本结算队列导出
    http
      .post(Server.action.new_good_cost_down, exportForm)
      .then((response) => {
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
  fetchLists({
    commit,
  }, page) {
    http.get(Server.action.trade_lists, page).then((resData) => {
      // console.log(resData);
      if (resData.code === 0) {
        // const field = [{'dataIndex':'shop_info.new_goods[1].goods_name','title':'id'}];
        const field = resData.result.field;
        field[0].width = 200;
        // field[0].fixed = 'left';
        field[1].width = 200;
        // field[1].fixed = 'left';
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 200,
          // fixed:'right',
          scopedSlots: {
            customRender: 'action',
          },
        });
        field[9].width = 200;
        console.log(resData.result.lists);
        commit('setEead', field);
        commit('setPage', resData.result.lists);
        commit('setLists', resData.result.lists.data);
        commit('totalData', resData.result.total_fee_data ? resData.result.total_fee_data : []);
      }
    });
  },
  trade_log({
    commit,
  }, tid) {
    // console.log(page);
    http.get(`${Server.action.trade_log}?tid=${tid}`).then((resData) => {
      if (resData.code === 0) {
        if (resData.result.logisticsInfo.traces) {
          const steps = [];
          for (let i = 0; i < resData.result.logisticsInfo.traces.length; i++) {
            const obj = {
              text: resData.result.logisticsInfo.traces[i].remark,
              desc: resData.result.logisticsInfo.traces[i].operatingTime,
            };
            steps.unshift(obj);
          }
          commit('setSteps', steps);
        }
        console.log(resData);
      }
    });
  },
  cancelLists({
    commit,
  }, page) {
    // console.log(page);
    http.get(Server.action.trade_cancel_list, page).then((resData) => {
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 50,
          fixed: 'right',
          scopedSlots: {
            customRender: 'action',
          },
        });
        // console.log(resData.result.lists.data);
        field[10].scopedSlots = {
          customRender: 'refunds_status_text',
        };
        commit('setCancelEead', field);
        commit('setCancelLists', resData.result.lists.data);
        commit('setCancelPage', resData.result.lists);
        commit('totalData', resData.result.total_fee_data ? resData.result.total_fee_data : []);
      }
    });
  },
  getDetail({
    commit,
  }, {
    id,
  }) {
    fetch.get(Server.action.trade_detail + id).then((response) => {
      if (response.data.code === 0) {
        commit('setDetail', response.data.result);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  getCancelDetail({
    commit,
  }, {
    id,
  }) {
    fetch.post(Server.action.trade_cancel_detail + id).then((response) => {
      if (response.data.code === 0) {
        commit('setCancelDetail', response.data.result.info.trade_info);
        commit('setCancel', response.data.result.info.cancel_info);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  logisticsLists({
    commit,
  }, param) {
    fetch;
    http.get(Server.action.logistics_lists, param).then((resData) => {
      if (resData.code === 0) {
        commit('setLogistics', resData.result.lists.data);
        commit('setLogisticsHead', resData.result.field);
      }
    });
  },
  cancelOrder({
    commit,
  }, {
    formItem,
  }) {
    fetch.post(Server.action.cancel_order, formItem).then((response) => {
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
    }).catch((error) => {
      helper.showError(error);
    });
  },
  cancelShopReply({
    commit,
  }, {
    formItem,
  }) {
    fetch.post(Server.action.cancelShopReply, formItem).then((response) => {
      if (response.data.code === 0) {
        helper.showSuccess(response.data.message);
        router.replace({
          path: '/trade/order/cancelorder',
        });
      } else if (response.data.code === 414) {
        helper.showErrors(response.data.result.errors);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  addLogistics({
    commit,
  }, {
    formItem,
  }) {
    fetch.post(Server.action.trade_delivery, formItem).then((response) => {
      if (response.data.code === 0) {
        helper.showSuccess(response.data.message);
        router.replace({
          path: '/trade/order/lists',
        });
      } else if (response.data.code === 414) {
        helper.showErrors(response.data.result.errors);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  addOrderRemark({ commit }, InfoObj) {
    fetch.post(Server.action.add_order_remark, InfoObj).then((response) => {
      // console.log(response);
      if (response.data.code === 0) {
        helper.showSuccess('追加备注成功');
        setTimeout(() => {
          helper.reload();
        }, 200);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  pickUpInfo({
    commit,
  }, { InfoObj, callback }) {
    fetch.post(Server.action.trade_pick_up, InfoObj).then((response) => {
      // console.log(response);
      if (response.data.code === 0) {
        helper.showSuccess('提货成功');
        callback && callback(1);
      } else {
        helper.showError(response.data.message);
        callback && callback(2);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  pickUpList({
    commit,
  }, fromObj) {
    http.get(Server.action.trade_pick_up_list, fromObj).then((resData) => {
      // console.log(resData);
      if (resData.code === 0) {
        const field = resData.result.field;
        field.push({
          title: '操作',
          dataIndex: 'action',
          width: 200,
          scopedSlots: {
            customRender: 'action',
          },
        });
        commit('setPickUpListField', field);
        commit('setPickUpListData', resData.result.lists);
      } else {
        helper.showError(resData.message);
      }
      if (resData.result.lists.length == 0) {
        helper.showError('查找不到该数据，请确认手机号及提货码是否正确');
      }
    });
  },
  wirtdOffCoupon({
    commit,
  }, {
    InfoObj,
    callBack,
  }) { // 核销优惠券
    http.post(Server.action.writeOffCoupon, InfoObj).then((response) => {
      console.log(response);
      if (response.code === 0) {
        callBack && callBack();
      } else {
        helper.showError(response.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  couponDetail({
    commit,
  }, {
    fromObj,
    callBack,
  }) {
    http.post(Server.action.findOffCoupon, fromObj).then((resData) => {
      console.log('详情', resData);
      if (resData.code === 0) {
        commit('setcouponDetail', resData.result);
        callBack && callBack();
      } else {
        // helper.showError(resData.message);
      }
      if (resData.result.lists.length == 0) {
        helper.showError('查找不到该数据，请确认手机号及核销码是否正确');
      }
    });
  },
  // 导出为Excel
  exportFilter({ commit }, { exportForm, callBack }) {
    fetch.post(Server.action.trade_export_filter, exportForm).then((response) => {
      if (response.data.code === 0) {
        commit('setExportData', response.data.result);
        callBack && callBack();
      } else {
        helper.showError(response.data.message);
      }
    });
    // .catch((error) => {
    //   helper.showError(error);
    // });
  },
  // 订单详情保存门店留言
  detailRemarks({
    commit,
  }, formItem) {
    // console.log(formItem);
    fetch.post(Server.action.trade_shopRemarks, formItem).then((response) => {
      // console.log(response);
      if (response.data.code === 0) {
        helper.showSuccess(response.data.message);
      } else if (response.data.code === 414) {
        helper.showError('备注内容为空，无法保存！');
        // helper.showErrors(response.data.result.errors);
      } else {
        helper.showError(response.data.message);
      }
    }).catch((error) => {
      helper.showError(error);
    });
  },
  // 微信扫一扫
  weixinCode({
    commit,
  }, obj) {
    const url = obj.url;
    const api = obj.api;
    const test = '';
    let flag1 = 1;
    if (flag1 === 1) {
      flag1 = 2;
      http.post(Server.action.weixinCade, {
        api,
        url,
      }).then((resData) => {
        if (resData !== undefined) {
          const res = resData.result;
          res.signature = res.signature.toUpperCase(); // 转大写
          wx.config({
            debug: false,
            appId: res.appId, // 必填,公众号的唯一标识
            timestamp: res.timestamp, // 必填,生成签名的时间戳
            nonceStr: res.nonceStr, // 必填,生成签名的随机串
            signature: res.signature, // 必填,签名
            jsApiList: res.jsApiList, // 必填,需要使用的JS接口列表
          });
          wx.error((res) => {
            flag1 = 1;
            obj.callback && obj.callback();
            alert(`出错了：${res.errMsg}`); // 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success(res) {
              flag1 = 1;
              // obj.callback && obj.callback(resData);
              const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              const resObj = {
                data: result,
              };
              http.post(Server.action.weixinQrcode1, resObj).then((resData) => {
                if (resData.code === 0) {
                  obj.callback && obj.callback(resData.result);
                } else {
                  helper.showError(resData.message);
                }
              });
              // helper.confirm({
              //     title: '提示',
              //     content: '你确认要提货吗？',
              //     onOk() {
              //         http.post(Server.action.weixinQrcode, resObj).then((resData) => {
              //             if (resData.code === 0) {
              //                 helper.showSuccess('扫描提货成功！');
              //             } else {
              //                 helper.showError(resData.message);
              //             }
              //         });
              //     },
              //     onCancel() {},
              // });
            },
          });
        }
      }).catch((error) => {
        flag1 = 1;
        obj.callback();
      });
    }
    obj.callback();
  },
  weixinCode2({
    commit,
  }, obj) {
    const url = obj.url;
    const api = obj.api;
    let flag1 = 1;
    if (flag1 === 1) {
      flag1 = 2;
      http.post(Server.action.weixinCade, {
        api,
        url,
      }).then((resData) => {
        if (resData !== undefined) {
          const res = resData.result;
          res.signature = res.signature.toUpperCase(); // 转大写
          wx.config({
            debug: false,
            appId: res.appId, // 必填,公众号的唯一标识
            timestamp: res.timestamp, // 必填,生成签名的时间戳
            nonceStr: res.nonceStr, // 必填,生成签名的随机串
            signature: res.signature, // 必填,签名
            jsApiList: res.jsApiList, // 必填,需要使用的JS接口列表
          });
          // wx.error((res) => {
          //     flag1 = 1;
          //     obj.callback && obj.callback();
          //     // alert(`出错了：${res.errMsg}`); // 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          // });
          wx.scanQRCode({
            needResult: 1, // 默认为0，扫描结果由微信处理，1则直接返回扫描结果，
            scanType: ['qrCode'], // 可以指定扫二维码还是一维码，默认二者都有
            success(res) {
              flag1 = 1;
              obj.callback && obj.callback();
              const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              const resObj = {
                bn: result,
              };
              http.post(Server.action.qrcodeOffCoupon, resObj).then((resData) => {
                if (resData.code === 0) {
                  commit('setcouponDetail', resData.result);
                  obj.reback && obj.reback();
                } else {
                  helper.showError(resData.message);
                }
              });
            },
          });
        }
      });
    }
  },
  weixinCode3({
    commit,
  }, obj) {
    const url = obj.url;
    const api = obj.api;
    let flag1 = 1;
    if (flag1 === 1) {
      flag1 = 2;
      http.post(Server.action.weixinCade, {
        api,
        url,
      }).then((resData) => {
        if (resData !== undefined) {
          const res = resData.result;
          res.signature = res.signature.toUpperCase(); // 转大写
          wx.config({
            debug: false,
            appId: res.appId, // 必填,公众号的唯一标识
            timestamp: res.timestamp, // 必填,生成签名的时间戳
            nonceStr: res.nonceStr, // 必填,生成签名的随机串
            signature: res.signature, // 必填,签名
            jsApiList: res.jsApiList, // 必填,需要使用的JS接口列表
          });
          wx.error((res) => {
            flag1 = 1;
            // obj.callback && obj.callback();
            alert(`出错了：${res.errMsg}`); // 这个地方的好处就是wx.config配置错误，会弹出窗口哪里错误，然后根据微信文档查询即可。
          });
          wx.chooseImage({
            count: 1, // 默认9
            sizeType: ['compressed'], // 可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
            success(res) {
              flag1 = 1;
              console.log(res);
              const localIds = res.localIds;
              const localId = localIds[0];
              console.log('localIds', res.localIds);
              // obj.callback && obj.callback();
              // const result = res.resultStr; // 当needResult 为 1 时，扫码返回的结果
              wx.uploadImage({
                localId,
                isShowProgressTips: 1,
                success(res) {
                  const media_id = res.serverId; // 返回图片的服务器端ID
                  const resObj = {
                    media_id,
                  };
                  http.post(Server.action.wechat_image, resObj).then((resData) => {
                    console.log('resData', resData);
                    if (resData.code === 0) {
                      commit('setWeixinUploadImage', resData.result);
                      obj.callback && obj.callback();
                    } else {
                      helper.showError(resData.message);
                    }
                  });
                },
                fail(fail) {
                  console.log('fail', fail);
                  // 上传图片到微信服务器失败
                  return false;
                },
              });
            },
          });
        }
      });
    }
  },
  // 售后数据导出
  afterExport({
    commit,
  }, params) {
    return new Promise((resolve, reject) => {
      http.get(Server.action.after_export, params).then((response) => {
        console.log(response);
        if (response.code === 0) {
          commit('setAfterExport', response.result.trade);
          resolve(response.result.trade);
        } else {
          helper.showError(response.message);
        }
      });
    });
  },
};
const mutations = {
  setLists(state, lists) {
    state.orderLists = lists;
  },
  setSteps(state, lists) {
    state.logLists = lists;
  },
  setPage(state, lists) {
    state.pages = lists;
  },
  setEead(state, lists) {
    state.orderHead = lists;
  },
  setCancelLists(state, lists) {
    state.cancelLists = lists;
  },
  setCancelEead(state, lists) {
    state.cancelHead = lists;
  },
  setCancelPage(state, lists) {
    state.cancelPage = lists;
  },
  setCancelDetail(state, lists) {
    state.cancelDetail = lists;
  },
  setCancel(state, lists) {
    state.getCancel = lists;
  },
  setDetail(state, lists) {
    state.detail = lists;
  },
  setLogistics(state, lists) {
    state.logistics = lists;
  },
  setLogisticsHead(state, lists) {
    state.logisticsHead = lists;
  },
  setPickUpListField(state, lists) {
    state.PickUpListField = lists;
  },
  setPickUpListData(state, lists) {
    state.PickUpListData = lists;
  },
  setExportData(state, lists) {
    state.exportData = lists;
  },
  setAfterExport(state, data) {
    state.afterExportData = data;
  },
  setisReset(state, bool) {
    state.isIosReset = bool;
  },
  setcouponDetail(state, lists) {
    state.couponDetail = lists;
  },
  setWeixinUploadImage(state, lists) {
    state.weixinUploadImage = lists;
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
  setSelfExtractLists(state, lists) {
    state.selfExtractData = lists;
  },
  setSelfExtractPages(state, lists) {
    state.selfExtractPages = lists;
  },
  setSelfExtractFields(state, fields) {
    state.selfExtractFields = fields;
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
  totalData(state, data) {
    state.total_fee_data = data;
  },
};
export default {
  namespaced: true,
  state,
  actions,
  mutations,
};
