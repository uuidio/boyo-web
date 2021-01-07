import env from './env';

export default {
  baseURL: env.baseURL,
  pagesize: 20, // 分页组件每页显示数量
  action: {
    /**
     * public、passport、index
     */
    login: 'v1/passport/login', // 登录
    logout: 'v1/passport/logout', // 退出
    main: 'v1/main', // 退出
    upload_image: 'v1/upload/image', // 上传图片
    /**
     * 文章管理
     */
    article_lists: 'v1/article/lists', // 文章列表
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
    goods_class_tree: 'v1/goods/allClassTree',
    goods_brands: 'v1/goods/allBrands',
    /**
     * shop
     */
    shop_detail: 'v1/shop/detail',
    shop_edit: 'v1/shop/edit',

    exportShopList: 'v1/shop/export-list', // 店铺列表导出

    /**
     * trade
     */
    trade_lists: 'v1/trade/lists',
    point_lists: 'v1/trade/point/lists',
    trade_detail: 'v1/trade/detail?tid=',
    cancel_order: 'v1/trade/tradeCancelCreate',
    rate_list: 'v1/rate/lists',
    rate_detail: 'v1/rate/detail?id=',
    after_sales_lists: 'v1/trade/afterSalesLists', // 售后列表
    after_sales_details: 'v1/trade/afterSalesDetail/', // 售后列表明细
    after_export: 'v1/trade/afterSales/down', // 导出售后订单
    cancel_order_lists: 'v1/trade/cancelLists',
    refunds_lists: 'v1/trade/refundsLists',
    trade_dorefund: 'v1/trade/dorefund',
    logistics_lists: 'v1/logistics/logisticsLists', // 物流公司列表
    logistics_add: 'v1/logistics/LogisticsAdd', // 添加物流
    logistics_del: 'v1/logistics/LogisticsDel/', // 删除物流
    logistics_edit: 'v1/logistics/LogisticsEdit', // 编辑物流
    trade_export_filter: 'v1/trade/export/filter', // 筛选导出订单
    point_export: 'v1/trade/point/down', // 导出订单明细

    payorderList: 'v1/trade/payment/lists', // 支付订单列表
    payorderExcel: 'v1/trade/payment/down', // 支付订单列表导出

    confirm_order_lists: 'v1/trade/confirm-order-lists', // 确认收货列表
    confirm_order_down: 'v1/trade/confirm-order-down', // 确认收货列表导出

    daily_sale_lists: '/v1/trade/daily-sales-list', // 销售日报列表
    daily_sale_down: 'v1/trade/daily-sales-down', // 销售日报列表导出
    //  分类
    class_lists: 'v1/goodsClass/lists',
    class_edit: 'v1/goodsClass/edit',
    class_detail: 'v1/goodsClass/detail',
    class_add: 'v1/goodsClass/add',
    class_del: 'v1/goodsClass/delete/',
    allClassTree: 'v1/goods/allClassTree', // 商品分类数


    //  品牌
    brand_lists: 'v1/brand/lists',
    brand_add: 'v1/brand/add',
    brand_detail: 'v1/brand/detail/',
    brand_del: 'v1/brand/delete/',
    brand_edit: 'v1/brand/edit',
    slt_brand_lists: 'v1/brand/get-brand-lists',

    // 店铺
    shop_lists: 'v1/shop/lists',
    shop_add: 'v1/shop/add',
    shop_det: 'v1/shop/detail/',
    shop_del: 'v1/shop/delete/',
    shop_actShop: 'v1/shop/actShop', // 关闭或者开启店铺
    createAccount: 'v1/shop/createAccount',
    account_list: 'v1/shop/sellerList',
    account_edit: 'v1/shop/sellerUpdate',
    account_switch: 'v1/shop/switch',

    //  会员
    member_list: 'v1/member/lists', // 列表
    member_search: 'v1/member/search', // 筛选会员列表
    member_export: 'v1/member/export',
    member_frozen: 'v1/member/becomePromoter', // 冻结推广员

    /*
     * config
     */
    config_site_items: 'v1/siteConfig/items',
    config_site_add: 'v1/siteConfig/add', // 添加配置
    config_get: 'v1/config/items', // 获取配置
    config_set: 'v1/config/add', // 修改配置

    //  商品规格
    spec_add: 'v1/goodsSpec/add',
    spec_list: 'v1/goodsSpec/lists',
    spec_del: 'v1/goodsSpec/delete/',
    spec_edit: 'v1/goodsSpec/edit',
    spec_detail: 'v1/goodsSpec/detail/',

    //  商品类型
    goods_type_add: 'v1/goodsType/add',
    goods_type_edit: 'v1/goodsType/edit',
    goods_type_delete: 'v1/goodsType/delete/',
    goods_type_lists: 'v1/goodsType/lists',
    goods_type_detail: 'v1/goodsType/detail',
    goods_attr_det: 'v1/goodsType/attrShow',
    goods_attr_edit: 'v1/goodsType/attrEdit',

    //  第三方同步设置
    synLists: 'v1/syn-3rd-goods/lists',
    synAdd: 'v1/syn-3rd-goods/save',
    synDet: 'v1/syn-3rd-goods/detail/',
    synDel: 'v1/syn-3rd-goods/delete/',
    allShop: 'v1/shop/list-nopage',

    openSyn: 'v1/syn-3rd-goods/start-syn',
    stopSyn: 'v1/syn-3rd-goods/stop-syn',

    //  退款
    refundsPay: 'v1/trade/refundsPay',
    dorefund: 'v1/trade/dorefund',
    resetSellerRefund: 'v1/trade/resetSellerRefund',
    exportRefunds: 'v1/trade/refunds/down', // 导出退款

    refunds_good_lists: '/v1/trade/refund-goods-lists', // 退货列表
    refunds_good_excel: '/v1/trade/refund-goods-down', // 退货列表导出

    good_cost_lists: 'v1/trade/goods-cost-lists', // 成本结算列表
    good_cost_down: 'v1/trade/goods-cost-down', // 成本结算列表导出
    new_good_cost_down: 'v1/trade/new-goods-cost-down', // 成本结算列表队列导出

    good_sale_lists: 'v1/trade/good-sale-list', // 商品销售量列表
    good_sale_down: 'v1/trade/good-sale-down', // 商品销售量列表导出

    goods_down: 'v1/goods/down', // 商品列表导出

    downLoadList: 'v1/downloadService/downLoadList', // 导出记录列表
    orderAccountDown: 'v1/trade/new-export-filter', // 订单列表通过导出记录导出
    userAccountDown: 'v1/member/userAccountDown', // 会员信息导出
    paymentAccountDown: 'v1/trade/new-payment-down', // 支付订单列表通过导出记录导出

    //  第三方分类关联
    classThird: 'v1/third-api-goods/lists',
    classTree: 'v1/goods/allClassTree',
    classThirdSubmit: 'v1/third-api-goods/relevance',

    //  楼层
    floorLists: 'v1/shopFloors/lists',
    floorAdd: 'v1/shopFloors/add',
    floorDel: 'v1/shopFloors/delete',
    floorDet: 'v1/shopFloors/detail',
    floorEdit: 'v1/shopFloors/edit',

    //  商场分类
    marketClassLists: 'v1/shopRelCats/lists',
    marketClassAdd: 'v1/shopRelCats/storeCat',
    marketClassDel: 'v1/shopRelCats/removeCat',
    marketClassDet: 'v1/shopRelCats/detail',
    marketClassEdit: 'v1/shopRelCats/updateCat',
    marketClassTree: 'v1/shopRelCats/allShopRelCatsTree',

    //  评论申诉
    rateAppealLists: 'v1/rate/appeal/lists',
    rateAppealCheck: 'v1/rate/appeal/check',

    //  秒杀
    seckillLists: 'v1/seckill/secKillAppliesLists',
    seckillAdd: 'v1/seckill/createSeckillApplies',
    seckillDet: 'v1/seckill/detailSeckillApplies',
    seckillRegisterList: 'v1/seckill/secKillRegisterList',
    seckillDel: 'v1/seckill/deleteSeckillApplies',
    detailSeckillApplies: 'v1/seckill/detailSeckillApplies',
    secKillGoodList: 'v1/seckill/secKillGoodList',
    registerApprove: 'v1/seckill/registerApprove',
    listDetailSeckillApplies: 'v1/seckill/listDetailSeckillApplies',
    shelvesGood: 'v1/seckill/shelvesGood',
    secKillAppliesGoodList: 'v1/seckill/secKillAppliesGoodList',
    seckillDelItem: 'v1/seckill/deleteForceSeckillApplies',

    //  优惠券和活动
    submit_coupon: 'v1/coupon/save',
    coupon_list: 'v1/coupon/lists',
    coupon_send: 'v1/coupon/send',
    coupon_detail: 'v1/coupon/detail/',
    coupon_del: 'v1/coupon/delete/',
    coupon_check: 'v1/coupon/check',
    coupon_push: 'v1/coupon/push',
    activity: 'v1/activity/lists',
    activityCheck: 'v1/activity/check',
    activityDetail: 'v1/activity/detail/',
    modActiveName: 'v1/activity/editName',
    modCouponName: 'v1/coupon/editName',
    //  积分商品
    pointGoodsLists: 'v1/pointGoods/lists',
    pointGoodsAdd: 'v1/pointGoods/create',
    pointGoodsDel: 'v1/pointGoods/delete',

    //  报表
    analysis: 'v1/stats/analysis',
    storeAnalysis: 'v1/stats/storeAnalysis',
    indexDetail: 'v1/index/detail',
    tradeAnalysis: 'v1/stats/tradeAnalysis',
    goodsAnalysis: 'v1/stats/goodsAnalysis',
    userAnalysis: 'v1/stats/userAnalysis',
    currentTime: 'v1/index/currentTime',

    //  结算
    tradeDay: 'v1/tradeSettlement/tradeDayLists',
    tradeDayDetail: 'v1/tradeSettlement/tradeDayDetailLists',
    tradeMonth: 'v1/tradeSettlement/tradeMonthLists',
    submitTrade: 'v1/tradeSettlement/settleMentReview',
    userTradeGoods: 'v1/tradeSettlement/tradeDayDetailGoodsLists',
    tradeDayDetailListsDown: 'v1/tradeSettlement/tradeDayListsDown',
    tradeMonthListsDown: 'v1/tradeSettlement/tradeMonthListsDown',
    tradeUv: 'v1/uv-trade/lists',
    tradeUvListsDown: 'v1/uv-trade/export',

    //  权限管理
    menuLists: 'v1/permission/menuLists',
    getRoutes: 'v1/permission/platformRoutes',
    createMenu: 'v1/permission/createMenu',
    updateMenu: 'v1/permission/updateMenu',
    deleteMenu: 'v1/permission/deleteMenu',

    //  角色
    roleLists: 'v1/role/lists',
    createRole: 'v1/role/create',
    updateRole: 'v1/role/update',
    deleteRole: 'v1/role/delete',
    roleDetail: 'v1/role/detail',

    //  平台账号
    adminLists: 'v1/admin/lists',
    createAdmin: 'v1/admin/create',
    updateAdmin: 'v1/admin/update',
    deleteAdmin: 'v1/admin/delete',
    adminDetail: 'v1/admin/detail',

    //  操作日志
    logLists: 'v1/adminLogs/lists',
    goodsStockLogs: 'v1/goods/goodsStockLogsList',

    //  新挂件
    getshow_v1: 'v1/siteConfig/show_v1',
    getItems: 'v1/siteConfig/items_v1',
    setItems: 'v1/siteConfig/add_v1',
    // 平台
    platformUpdate: 'v1/platform/update', // 平台编辑
    platformAdd: 'v1/platform/add', // 平台添加
    platformLists: 'v1/platform/lists', // 平台列表
    platformAct: 'v1/platform/act', // 平台列表
    platformDetail: 'v1/platform/detail/', //
    platformEdit: 'v1/platform/update-point', // 更新积分设置
    platformListorder: 'v1/platform/listorder', // 更新权重
    platformAllowLogin: 'v1/platform/updateInfo', // 更新平台信息v2

    // 平台账号
    adminuserEdit: 'v1/adminuser/resetPwd', // 平台账号密码编辑
    adminuserAdd: 'v1/adminuser/add', // 平台账号添加
    adminuserLists: 'v1/adminuser/lists', // 平台账号列表
    adminuserSwitch: 'v1/adminuser/switch', // 平台账户开关

    /**
     * 文章管理
     */
    articleList: 'v1/article/lists', // 文章列表
    articleItem: 'v1/article/detail', // 文章详情

    verifyArticle: 'v1/article/verify', // 审核文章

    /**
     * 规则管理
     */
    ruleList: 'v1/rule/lists', // 规则列表
    addRule: 'v1/rule/save', // 添加规则
    ruleItem: 'v1/rule/detail', // 规则详情
    deleteRuleItem: 'v1/rule/delete', // 删除规则
    editRuleItem: 'v1/rule/update', // 更新规则
    ruleTypeList: 'v1/rule/ruleType', // 规则类型列表

    /**
     * 推广中心
     */
    applyPromoter: 'v1/applyPromoter/lists',
    applyPromoterDetail: 'v1/applyPromoter/detail',
    promoterExamine: 'v1/applyPromoter/examine',
    deploy: 'v1/shopAttr/deploy',
    userRewardRankingList: 'v1/ranking/userRewardRankingList',
    userRewardRankingListDown: 'v1/ranking/userRewardRankingListDown',
    PromoterLists: 'v1/ranking/promoterLists', // 佣金管理列表
    promoterList: 'v1/user/promoter/lists', // 推广员列表
    groupCollectLists: 'v1/ranking/groupCollectLists',
    promoterListsDown: 'v1/ranking/promoterListsDown',
    setDepartment: 'v1/applyPromoter/setDepartment', // 设置部门
    setPartners: 'v1/partners/setPartners', // 设置推广中心权限
    setPartnersLog: 'v1/partners/setPartnersLog', // 设置推广中心权限日志
    setPartnersRelated: 'v1/partners/setPartnersRelated', // 小店授权推广员
    getUserInfo: 'v1/partners/getUserInfo', // 获取推广员上级信息
    changePartnersRelated: 'v1/partners/changePartnersRelated', // 换绑推广员关系
    unbindRelated: 'v1/partners/unbindRelated', // 解绑推广员关系
    promoterShopLists: 'v1/ranking/promoterShopLists', // 小店汇总佣金表
    promoterShopListsDown: 'v1/ranking/promoterShopListsDown', // 小店汇总佣金表下载

    //  提现
    userDepositCashesList: 'v1/userDeposits/userDepositCashesList',
    getUserApplyDetail: 'v1/userDeposits/getUserApplyDetail',
    getUserExamine: 'v1/userDeposits/examine',
    userDepositLogsLists: 'v1/userDeposits/userDepositLogsLists',
    tradeRewardsLists: 'v1/userDeposits/tradeRewardsLists',
    tradeEstimatesLists: 'v1/userDeposits/tradeEstimatesLists',
    userDepositDetail: 'v1/userDeposits/userDepositDetail',
    // goodsSpreadLists:'v1/applyPromoter/goodsSpreadLists',
    goodsSpreadLists: 'v1/applyPromoter/relatedLogsList',
    userDepositCashesListDown: 'v1/applyPromoter/export/lists', // 导出提现记录

    userRecommendDetai: 'v1/transmit/userRecommendDetai',

    // 冻结分销商
    unfreezePartners: 'v1/partners/unfreezePartners',

    // 线上对账
    wechat_trade_import: 'v1/wechat/trade-import', // 微信交易订单导入
    wechat_refund_import: 'v1/wechat/refund-import', // 微信退款订单导入
    wechat_project_import: 'v1/wechat/project-import', // 项目交易返款订单导入
    wechat_check_list: 'v1/wechat/check-list', // 对账单列表
    wechat_check_detail: 'v1/wechat/check-detail', // 订单详情
    wechat_check_update: 'v1/wechat/check-update-processing', // 处理状态修改
    wechat_check_delete: 'v1/wechat/check-delete', // 删除
    wechat_check_abnormal_list: 'v1/wechat/check-abnormal-list', // 导入异常列表
    wechat_check_export: 'v1/wechat/check-export', // 对账列表导出
    wechat_check_abnormal_export: 'v1/wechat/check-abnormal-export', // 导入异常导出
    wechat_import_list: 'v1/wechat/trade-import-list', // 获取导入的微信交易数据（含下载）
    project_import_list: 'v1/wechat/project-import-list', // 获取导入的项目返款数据（含下载）
    check_update_processing: 'v1/wechat/check-update-processing', // 确认返款

    // 支付类型代码
    payment_type_list: 'v1/paymentType/lists', // 支付类型代码列表
    add_payment_type: 'v1/paymentType/add', // 添加支付类型代码
    payment_type: 'v1/paymentType/type', // 支付类型
    payment_type_detail: 'v1/paymentType/detail', // 支付类型代码详情
    edit_payment_type: 'v1/paymentType/edit', // 编辑支付类型代码
    delete_payment_type: 'v1/paymentType/delete', // 删除支付类型代码

    /** 储值卡业务 * */
    key_manage_detail: 'v1/key-manage/detail', // 秘钥管理详情
    send_code: 'v1/key-manage/sendCode', // 发送短信
    bind_mobile: 'v1/key-manage/bind', // 绑定手机号
    unbind_mobile: 'v1/key-manage/unbind', // 绑定手机号
    create_secret_key: 'v1/key-manage/save', // 生成秘钥
    wallet_config: 'v1/wallet-config/info', // 钱包支付配置信息
    save_wallet_config: 'v1/wallet-config/save', // 钱包支付配置保存
    physical_img: 'v1/wallet-config/physicalImg', // 实体卡背景图信息/保存
  },
};
