import env from './env';

export default {
  baseURL: env.baseURL,
  pagesize: 20, // 分页组件每页显示数量
  action: {
    /**
     * public、passport、index
     */
    deleteTag:'v1/tag/delete',
    login: 'v1/passport/login', // 登录
    logout: 'v1/anchor/logout', // 退出
    resetPass: 'v1/passport/resetPwd', // 修改密码
    main: 'v1/main', // 退出
    upload_image: 'v1/upload/image', // 上传图片
    wechat_image: 'v1/upload/wechatImage', // 上传图片
    /**
     * 文章管理
     */
    article_lists: 'v1/article/lists', // 文章列表
    article_add: 'v1/article/add', // 添加文章
    /**
     * album
     */
    album_pics: 'v1/album/pics', // 图片列表
    /**
     * goods
     */
    goods_lists: 'v1/goods/lists',
    goods_add: 'v1/goods/add',
    goods_edit: 'v1/goods/edit',
    goods_detail: 'v1/goods/detail/',
    goods_delete: 'v1/goods/delete/',
    goods_update_state: 'v1/goods/updateState',
    goods_update_price: 'v1/goods/showPrice',

    //  查看门店推广权限
    promoGoodCheck: 'v1/shopAttr/promoGoodCheck',
    promotionRules: 'v1/user/getRule', // 推广规则

    goods_class_tree: 'v1/goods/allClassTree',
    goods_brands: 'v1/goods/allBrands',
    goods_del_id: 'v1/album/del-id',

    shop_class_list: 'v1/shopCats/lists',
    shop_class_edit: 'v1/shopCats/updateCat',
    shop_class_add: 'v1/shopCats/storeCat',
    shop_class_del: 'v1/shopCats/removeCat/',
    shopClassTree: 'v1/shopCats/allClassTree',

    // 商品回收站
    goods_recycle_lists: 'v1/goods/recycle/lists', // 列表
    goods_recycle_restore: 'v1/goods/recycle/restore', // 恢复
    goods_recycle_delete: 'v1/goods/recycle/delete', // 永久删除

    // 自提
    ziti_lists: 'v1/ziti/lists',
    ziti_add: 'v1/ziti/store',
    ziti_del: 'v1/ziti/del',
    ziti_edit: 'v1/ziti/edit',
    /**
     * shop
     */
    shop_detail: 'v1/shop/detail',
    shop_edit: 'v1/shop/edit',


    /**
     * trade
     */
    trade_lists: 'v1/trade/lists',
    trade_detail: 'v1/trade/detail?tid=',
    trade_delivery: 'v1/trade/deliveryTrade',
    logistics_lists: 'v1/shop/logisticsLists',
    cancel_order: 'v1/trade/tradeCancelCreate',
    trade_cancel_list: 'v1/trade/cancelLists',
    trade_cancel_detail: 'v1/trade/tradeCanceldetail?tid=',
    cancelShopReply: 'v1/trade/cancelShopReply',
    trade_pick_up: 'v1/trade/pick-up',
    trade_pick_up_list: 'v1/trade/pick-up-list', // 提货码列表查找
    trade_export_filter: 'v1/trade/export/filter', // 筛选导出订单
    trade_shopRemarks: 'v1/trade/shopRemarks', // 详情订单门店备注保存
    trade_log: 'v1/trade/getLogisticsInfo',
    refunds_lists: 'v1/trade/refundsLists', // 退款列表
    exportRefunds: 'v1/trade/refunds/down', // 导出退款
    add_order_remark: 'v1/trade/addRemark', // 追加备注

    refunds_good_lists: '/v1/trade/refund-goods-lists', // 退货列表
    refunds_good_excel: '/v1/trade/refund-goods-down', // 退货列表导出

    confirm_order_lists: 'v1/trade/confirm-order-lists', // 确认收货列表
    confirm_order_down: 'v1/trade/confirm-order-down', // 确认收货列表导出

    //  结算
    tradeDay: 'v1/tradeSettlement/tradeDayLists',
    tradeDayDetail: 'v1/tradeSettlement/tradeDayDetailLists',
    tradeMonth: 'v1/tradeSettlement/tradeMonthLists',
    submitTrade: 'v1/tradeSettlement/settleMentReview',
    userTradeGoods: 'v1/tradeSettlement/tradeDayDetailGoodsLists',
    tradeDayDetailListsDown: 'v1/tradeSettlement/tradeDayListsDown',
    tradeMonthListsDown: 'v1/tradeSettlement/tradeMonthListsDown',
    good_cost_lists: 'v1/trade/goods-cost-lists', // 成本结算列表
    good_cost_down: 'v1/trade/goods-cost-down', // 成本结算列表导出
    new_good_cost_down: 'v1/trade/new-goods-cost-down', // 成本结算列表队列导出

    self_extract_lists: 'v1/trade/self-extracting-lists', // 自提商品核销列表
    self_extract_down: 'v1/trade/self-extracting-down', // 自提商品核销列表导出

    good_sale_lists: 'v1/trade/good-sale-list', // 商品销售量列表
    good_sale_down: 'v1/trade/good-sale-down', // 商品销售量列表导出

    goods_down: 'v1/goods/down', // 商品列表导出

    downLoadList: 'v1/downloadService/downLoadList', // 导出记录列表
    orderAccountDown: 'v1/trade/new-export-filter', // 订单列表通过导出记录导出
    /**
     * 微信扫码取货
     * */
    weixinCade: 'v1/wechat/jsapiconfig',
    weixinQrcode: 'v1/trade/pick-up-qrcode',
    weixinQrcode1: 'v1/trade/pick-info-qrcode',


    // 物流公司列表
    logisticsLists: 'v1/shop/logisticsLists',
    //  优惠券和活动
    submit_coupon: 'v1/coupon/save',
    coupon_list: 'v1/coupon/lists',
    coupon_send: 'v1/coupon/send',
    coupon_detail: 'v1/coupon/detail/',
    coupon_del: 'v1/coupon/delete/',
    activity_list: 'v1/activity/lists',
    activity_save: 'v1/activity/save',
    activity_detail: 'v1/activity/detail/',
    activity_del: 'v1/activity/delete/',
    coupon_code_list: 'v1/coupon/off-line/list',
    coupon_offlist: 'v1/coupon/offlist',
    coupon_distribute: 'v1/coupon/distribute',
    stopActivity: 'v1/activity/stop/', // 终止活动
    updateIssuesNum: 'v1/coupon/updateStorage', // 修改优惠券库存

    //  评价
    rateList: 'v1/rate/lists',
    rateDetail: 'v1/rate/detail/',
    rateReply: 'v1/rate/reply',
    appeal: 'v1/rate/appeal/lists',
    appealAdd: 'v1/rate/appeal/add',
    appealDetail: 'v1/rate/appeal/detail',

    //  多规格
    getAttr: 'v1/goods/getAttr/',
    getAllSpec: 'v1/goods/getGoodsSpec',

    getGoodSku: 'v1/goods/getGoodSku/', // 商品列表获取商品规格
    updateGoodSku: 'v1/goods/quickUpdate', // 快捷保存商品规格
    //  物流模板
    addTemplates: 'v1/logistics/addTemplates',
    shipList: 'v1/logistics/templatesLists',
    shipDet: 'v1/logistics/templatesDetailView',
    shipDel: 'v1/logistics/removeTemplates',
    shipUpdate: 'v1/logistics/updateTemplates',
    //  第三方来源选择
    sourceLists: 'v1/goods/source/lists',
    sourec_goods_lists: 'v1/goods/lists',

    /*
    *售后
    */
    afterSalesLists: 'v1/trade/afterSales/list',
    afterSalesDetail: 'v1/trade/afterSales/detail',
    afterSalesVerification: 'v1/trade/afterSalesVerification',
    sendConfirm: 'v1/trade/afterSales/sendConfirm',
    after_export: 'v1/trade/afterSales/down', // 导出售后订单
    //  评价
    afterSales_again_examine: 'v1/trade/afterSales/again-examine', // 门店审核订单是否允许再次换货
    afterSaleGetAftersaleTrace: 'v1/trade/afterSales/get-aftersale-trace', // 售后操作记录

    // 回寄地址
    shop_address_lists: 'v1/shop-address/list',
    shop_address_add: 'v1/shop-address/store',
    shop_address_del: 'v1/shop-address/delete',
    shop_address_edit: 'v1/shop-address/update',
    shop_address_set: 'v1/shop-address/set', // 设置默认地址
    //  秒杀
    seckillLists: 'v1/secKill/secKillAppliesLists',
    seckillDet: 'v1/secKill/registeredDetail',
    seckillApply: 'v1/secKill/RegisteredApply',
    seckillApplySave: 'v1/secKill/registeredApplySave',
    sellerSeckillLists: 'v1/secKill/secKillRegisterList',
    sellerApplyDetail: 'v1/secKill/registeredApply',
    secKillGoodList: 'v1/secKill/goodList',

    // groupGoodList: 'v1/group/groupGoodList',
    groupGoodList: 'v1/group/groupList',
    registeredDetail: 'v1/group/registeredDetail',
    groupForceDel: 'v1/group/groupApplyDeleteForce',
    registeredApplySave: 'v1/group/registeredApplySave',
    groupApplyDelete: 'v1/group/groupApplyDelete',
    resApplyEdit: '/v1/secKill/registeredApplyEdit',
    //  报表
    indexDetail: 'v1/index/detail',
    tradeAnalysis: 'v1/stats/tradeAnalysis',
    goodsAnalysis: 'v1/stats/goodsAnalysis',
    currentTime: 'v1/index/currentTime',
    //  角色
    roleLists: 'v1/role/lists',
    createRole: 'v1/role/create',
    updateRole: 'v1/role/update',
    deleteRole: 'v1/role/delete',
    roleDetail: 'v1/role/detail',

    //  门店账号
    adminLists: 'v1/admin/lists',
    createAdmin: 'v1/admin/create',
    updateAdmin: 'v1/admin/update',
    deleteAdmin: 'v1/admin/delete',
    adminDetail: 'v1/admin/detail',
    // 优惠券核销
    findOffCoupon: 'v1/coupon/off-take/find', // 券码查询
    qrcodeOffCoupon: 'v1/coupon/off-qrcode/find', // 二维码查询
    writeOffCoupon: 'v1/coupon/writeOff', // 核销优惠券

    tmplStore: 'v1/siteConfig/tmplStore', // 首页挂件装修
    tmplStoreItems: 'v1/siteConfig/items', // 获取首页挂件
  },
};
