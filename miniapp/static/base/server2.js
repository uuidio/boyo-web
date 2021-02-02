const config = {
	api_base_url: 'https://api-dev.boyo.tv/shop/', //极汇GO测试
	img_base_url: 'https://api-dev.boyo.tv/images/', //益购测试(图片地址)
	//##益田集团正式 切记要区分清楚，避免影响到原本EGO
	// api_base_url: 'https://ytxspt.ytholidayplaza.com/shop/',
	// img_base_url: 'https://ytxspt.ytholidayplaza.com/images/',

	// api_base_url: 'https://ego.ytholidayplaza.com/shop/',//益购正式
	// img_base_url: 'https://ego.ytholidayplaza.com/images/',//益购正式

	api_h5_url:'https://api-dev.boyo.tv/admin/platform/',//h5view测试

	apiLinks: {
		wechatminipay: {
			url: 'https://api-dev.boyo.tv/payment/wechatminipay', //益购测试
			// url: 'https://ego.ytholidayplaza.com/payment/wechatminipay',//益购正式
			//##益田集团正式 切记要区分清楚，避免影响到原本EGO
			// url: 'https://ytxspt.ytholidayplaza.com/payment/wechatminipay',

			name: '获取支付参数',
			type: 'GET',
			needToken: true
		},
		getOpenid: {
			name: '获取openid',
			url: 'v1/wechatmini/openid',
			type: 'POST',
			needToken: false
		},
		getCarNum: {
			name: '获取购物车数量',
			url: 'v1/cart/num',
			type: 'GET',
			needToken: true
		},
		indexWidgets: {
			name: '获取新挂件',
			url: 'v1/index/indexWidgets',
			type: 'GET',
			needToken: false
		},
		newWidgets: {
			name: '获取新挂件',
			url: 'v1/index/newWidgets',
			type: 'GET',
			needToken: false
		},
		getLogisticsInfo: {
			name: '获取物流轨迹',
			url: 'v1/user/trade/getLogisticsInfo',
			type: 'GET',
			needToken: true
		},
		bindUser: {
			name: '绑定用户',
			url: 'v1/wechatmini/creat-bind',
			type: 'POST',
			needToken: false
		},
		getTelCode: {
			name: '绑定用户',
			url: 'v1/wechatmini/get-code-login',
			type: 'GET',
			needToken: false
		},
		userRegister: {
			name: '用户注册登录',
			url: 'v1/wechatmini/code-login',
			type: 'POST',
			needToken: false
		},
		userLogin: {
			name: '自动登录',
			url: 'v1/wechatmini/auto-login/',
			type: 'POST',
			needToken: false
		},
		getIndex: {
			name: '获取首页挂件',
			type: 'GET',
			url: 'v1/index/detail',
			needToken: false
		},
		getIndexItem: {
			name: '获取集团项目列表(未登)',
			type: 'GET',
			url: 'v1/index-item/lists',
			needToken: false
		},
		getIndexItem1: {
			name: '获取集团项目列表(已登)',
			type: 'GET',
			url: 'v1/index-shop/shopList',
			needToken: false
		},
		getMoreHot: {
			name:'首页热门商品加载更多',
			type: 'GET',
			url: 'v1/index/getIndexHot'
		},
		getOrder: {
			name: '获取订单列表',
			type: 'GET',
			url: 'v1/user/trade/lists',
			needToken: true
		},
		aftersales: {
			url: 'v1/aftersales/commitAftersalesApply',
			name: '提交申请售后',
			type: 'POST',
			needToken: true
		},
		aftersalesLists: {
			url: 'v1/user/trade/afterSales/lists',
			name: '售后列表',
			type: 'GET',
			needToken: true
		},
		aftersalesApply: {
			url: 'v1/aftersales/aftersalesApply',
			name: '获取售后信息',
			type: 'POST',
			needToken: true
		},
		aftersalesDetail: {
			url: 'v1/aftersales/detail',
			name: '售后订单详情',
			type: 'GET',
			needToken: true
		},
		getExpress: {
			url: 'v1/trade/Chooeslogistics',
			name: '获取快递公司列表',
			type: 'GET',
			needToken: true
		},
		sendback: {
			url: 'v1/aftersales/sendback',
			name: '提交快递单号',
			type: 'POST',
			needToken: true
		},
		getCategory: {
			name: '获取商品分类列表',
			type: 'GET',
			url: 'v1/goodsClass/lists',
			needToken: false
		},
		getCateList: {
			name: '获取商品列表',
			type: 'GET',
			url: 'v1/goods/lists',
			needToken: false
		},
		getGoodsDetail: {
			name: '获取商品详情',
			type: 'GET',
			url: 'v1/goods/detail',
			needToken: false
		},
		getGoodsRate: {
			name: '获取商品评价',
			type: 'GET',
			url: 'v1/goods/rate',
			needToken: false
		},
		getCouPonNoLogin: {
			name: '获取优惠券列表(未登录)',
			type: 'GET',
			url: 'v1/coupon/lists',
			needToken: false
		},
		getCouPon: {
			name: '获取优惠券列表(已登录)',
			type: 'GET',
			url: 'v1/coupon/lists-login',
			needToken: true
		},
		receive: {
			name: '领取优惠券',
			type: 'POST',
			url: 'v1/coupon/receive',
			needToken: true
		},
		addCart: {
			name: '加入购物车',
			type: 'POST',
			needToken: true,
			url: 'v1/cart/add'
		},
		cartLists: {
			url: 'v1/cart/lists',
			name: '购物车列表',
			type: 'GET',
			needToken: true
		},
		cartUpdate: {
			url: 'v1/cart/updateSelected',
			name: '购物车更新',
			type: 'POST',
			needToken: true
		},
		cartNumUpdate: {
			url: 'v1/cart/changeNum',
			name: '购物车数量更新',
			type: 'POST',
			needToken: true
		},
		cartDelete: {
			url: 'v1/cart/delete',
			name: '购物车删除',
			type: 'POST',
			needToken: true
		},
		cartShopAct: {
			url: 'v1/cart/shopActList',
			name: '购物车店铺活动列表',
			type: 'POST',
			needToken: true
		},
		checkOrderLists: {
			url: 'v1/checkOrder/lists',
			name: '结算列表',
			type: 'GET',
			needToken: true
		},
		ztLists: {
			url: 'v1/checkOrder/ztLists',
			name: '自提地址列表',
			type: 'GET',
			needToken: true
		},
		userAddress: {
			url: 'v1/user/addressLists',
			name: '用户地址列表',
			type: 'GET',
			needToken: true
		},
		saveAddress: {
			url: 'v1/user/storeAddress',
			name: '添加收货地址',
			type: 'POST',
			needToken: true
		},
		deleteAddress: {
			url: 'v1/user/deleteAddress',
			name: '删除收货地址',
			type: 'GET',
			needToken: true
		},
		addressDetail: {
			url: 'v1/user/detailAddress',
			name: '收货地址详情',
			type: 'GET',
			needToken: true
		},
		addressEdit: {
			url: 'v1/user/updateAddress',
			name: '编辑收货地址',
			type: 'POST',
			needToken: true
		},
		createOrder: {
			url: 'v1/trade/create',
			name: '创建订单',
			type: 'POST',
			needToken: true
		},
		orderLists: {
			url: 'v1/user/trade/lists',
			name: '获取订单列表',
			type: 'GET',
			needToken: true
		},
		orderDetail: {
			url: 'v1/user/trade/detail',
			name: '订单详情',
			type: 'GET',
			needToken: true
		},
		orderSonDetail: {
			url: 'v1/user/trade/order/detail',
			name: '订单子详情',
			type: 'GET',
			needToken: true
		},
		brandList: {
			url: 'v1/allBrandShops/list',
			name: '获取品牌楼层列表',
			type: 'POST',
			needToken: false
		},
		brandCategory: {
			url: 'v1/allBrandShops/allShopRelCatsTree',
			name: '获取品牌楼层分类树',
			type: 'GET',
			needToken: false
		},

		floorId: {
			url: 'v1/allBrandShops/getShopFloors',
			name: '获取品牌楼层',
			type: 'GET',
			needToken: false
		},
		brandDetail: {
			url: 'v1/shop/detail',
			name: '获取品牌详情',
			type: 'GET',
			needToken: false
		},
		cancelOrder: {
			url: 'v1/trade/cancel',
			name: '取消订单',
			type: 'POST',
			needToken: true
		},
		receiptOrder: {
			url: 'v1/trade/receipt',
			name: '确认收货',
			type: 'POST',
			needToken: true
		},
		shopDetail: {
			url: 'v1/shop/detail',
			name: '店铺详情',
			type: 'GET',
			needToken: false
		},
		ShopFavorite: {
			url: 'v1/user/storeShopFavorite',
			name: '关注店铺',
			type: 'GET',
			needToken: true
		},
		cancelShopFavorite: {
			url: 'v1/user/deleteShopFavorite',
			name: '取消关注店铺',
			type: 'GET',
			needToken: true
		},
		shopFavoriteList: {
			url: 'v1/user/shopFavoriteLists',
			name: '关注店铺列表',
			type: 'GET',
			needToken: true
		},
		goodsFavoriteList: {
			url: 'v1/user/goodsFavoriteLists',
			name: '关注商品列表',
			type: 'GET',
			needToken: true
		},
		goodsFavorite: {
			url: 'v1/user/storeGoodsFavorite',
			name: '关注商品',
			type: 'GET',
			needToken: true
		},
		goodFavoriteCancel: {
			url: 'v1/user/deleteGoodsFavorite',
			name: '取消关注商品',
			type: 'GET',
			needToken: true
		},
		uploadImg: {
			url: 'v1/upload/image',
			name: '图片上传',
			type: 'POST',
			needToken: true
		},
		rateAdd: {
			url: 'v1/rate/add',
			name: '订单评价',
			type: 'POST',
			needToken: true
		},
		seckill: {
			url: 'v1/secKill/index',
			name: '秒杀活动主页',
			type: 'GET',
			needToken: false
		},
		seckillDetails: {
			url: 'v1/secKill/detail',
			name: '秒杀商品详情',
			type: 'GET',
			needToken: false
		},
		secKillStore: {
			url: 'v1/secKill/secKillStore',
			name: '秒杀抢购排队',
			type: 'POST',
			needToken: false
		},
		secKillWait: {
			url: 'v1/secKill/secKillWaiting',
			name: '等待秒杀资格',
			type: 'GET',
			needToken: false
		},
		couponCentre: {
			url: 'v1/coupon/lists',
			name: '领券中心/未登录',
			type: 'GET',
			needToken: false
		},
		couponCentreLogin: {
			url: 'v1/coupon/lists-login',
			name: '领券中心/已登录',
			type: 'GET',
			needToken: true
		},
		getCoupon: {
			url: 'v1/coupon/receive',
			name: '领取优惠券',
			type: 'POST',
			needToken: true
		},
		getCouponTab: {
			url: 'v1/coupon/classTab',
			name: '优惠券tab',
			type: 'GET',
			needToken: true
		},
		getUserCoupon: {
			url: 'v1/user/coupon',
			name: '用户优惠券列表',
			type: 'GET',
			needToken: true
		},
		getUserCouponDetail: {
			url: 'v1/user/coupon/detail',
			name: '用户优惠券详情',
			type: 'GET',
			needToken: true
		},
		platformCoupon: {
			url: 'v1/cart/platformCoupon',
			name: '可用的平台券',
			type: 'POST',
			needToken: true
		},
		setUserInfo: {
			url: 'v1/user/modifyProfiles',
			name: '修改用户信息',
			type: 'POST',
			needToken: true
		},
		getPoint: {
			url: 'v1/checkOrder/reckonPoint',
			name: '获取积分抵扣',
			type: 'GET',
			needToken: true
		},
		getSiblingsList: {
			url: 'v1/goodsClass/siblingsLists',
			name: '获取分类同级列表',
			type: 'GET',
			needToken: false
		},
		hotKeyWord: {
			url: 'v1/goods/hotkeyword',
			name: '热门搜索',
			type: 'GET',
			needToken: false
		},
		integralCentre: {
			url: 'v1/pointGoods/index',
			name: '积分中心',
			type: 'GET',
			needToken: true
		},
		userInfo: {
			url: 'v1/wechatmini/detail',
			name: '用户信息',
			type: 'GET',
			needToken: true
		},
		groupClass: {
			url: 'v1/group/getGoodsGroupCate',
			name: '团购分类',
			type: 'GET',
			needToken: false
		},
		groupGoods: {
			url: 'v1/group/groupGoodList',
			name: '团购分类',
			type: 'GET',
			needToken: false
		},
		groupGoodsOrder: {
			url: 'v1/group/goodsGroupOrderList',
			name: '已开团列表',
			type: 'GET',
			needToken: false
		},
		groupGoodsGroup: {
			url: 'v1/group/getUserGoodsGroup',
			name: '开团商品详情',
			type: 'GET',
			needToken: false
		},
		goodsGroupOrderInfo: {
			url: 'v1/group/goodsGroupOrderInfo',
			name: '拼团支付结果',
			type: 'GET',
			needToken: true
		},
		userActList: {
			url: 'v1/cart/userActList',
			name: '获取购物车活动选择',
			type: 'POST',
			needToken: true
		},
		getPeriods: {
			url: 'v1/secKill/getPeriods',
			name: '新商品秒杀',
			type: 'GET',
			needToken: false
		},
		seckillGoods: {
			url: 'v1/secKill/sec_kill_goods_list',
			name: '秒杀商品列表',
			type: 'GET',
			needToken: false
		},
		imagePop: {
			url: 'v1/index/imagePop',
			name: '首页弹窗',
			type: 'GET',
			needToken: false
		},
		showLive: {
			url: 'v1/index/showLive',
			name: '首页直播',
			type: 'GET',
			needToken: false
		},
		configItems: {
			url: 'v1/index/banner',
			name: '获取基础设置',
			type: 'GET',
			needToken: false
		},
		getShopTel: {
			url: 'v1/index/csmobile',
			name: '获取基础设置',
			type: 'GET',
			needToken: false
		},
		getServiceQr: {
			url: 'v1/index/csweixin',
			name: '获取客服微信',
			type: 'GET',
			needToken: false
		},
		setPerfectInfo: {
			url: 'v1/user/modifyProfiles',
			name: '提交订单完善信息',
			type: 'POST',
			needToken: true
		},
		pointGoodsList: {
			url: 'v1/pointGoods/index',
			name: '积分专区商品列表',
			type: 'GET',
			needToken: true
		},
		pointGoodsClass: {
			url: 'v1/pointGoods/class',
			name: '积分专区商品分类',
			type: 'GET',
			needToken: true
		},
		paymentGenerate:{
		  url: 'v1/payment/generate',
		  name: '请求支付网关',
		  type: 'POST',
		  needToken: true
		},
		// 甄选牛币模块（集团）
		getClassify: {
			name: '获取推荐商品分类',
			url: 'v1/index/recommend-title',
			type: 'GET',
			needToken: false
		},
    getRecommend: {
      name: '获取推荐商品列表',
      url: 'v1/index/getRecommend',
      type: 'GET',
      needToken: false
    },
		getSelfClassify: {
			name: '获取甄选推荐商品分类',
			url: 'v1/self-index/recommend-title',
			type: 'GET',
			needToken: false
		},

		getSelfRecommend: {
			name: '获取甄选推荐商品列表',
			url: 'v1/self-index/getRecommend',
			type: 'GET',
			needToken: false
		},
		getSelfWidgets: {
			name: '获取甄选挂件',
			url: 'v1/self-index/newWidgets',
			type: 'GET',
			needToken: false
		},
		platformPointList: {
			name: '可兑换的牛币的项目列表',
			url: 'v1/self-index/platformPointList',
			type: 'GET',
			needToken: false
		},
		refreshPoint: {
			name: '刷新当前项目积分',
			url: 'v1/user/refreshPoint',
			type: 'GET',
			needToken: true
		},
		cattleCoinGoods: {
			url: 'v1/pointGoods/index-group',
			name: '牛币专区商品列表',
			type: 'GET',
			needToken: true
		},
		cattleCoinClass: {
			url: 'v1/pointGoods/class-group',
			name: '牛币专区分类列表',
			type: 'GET',
			needToken: true
		},
		pointExchangeList: {
			url: 'v1/user/pointExchangeLog',
			name: '积分/牛币兑换列表',
			type: 'GET',
			needToken: true
		},
		exchangeSelfPoint: {
			url: 'v1/user/exchangeSelfPoint',
			name: '积分兑换牛币',
			type: 'POST',
			needToken: true
		},
		refreshSelfPoint: {
			name: '刷新牛币',
			url: 'v1/user/refreshSelfPoint',
			type: 'GET',
			needToken: true
		},
		getPointLog: {
			name: '积分明细',
			url: 'v1/user/getPointLog',
			type: 'GET',
			needToken: true
		},
		pointRule: {
			name: '积分规则',
			url: 'v1/user/pointRule',
			type: 'GET',
			needToken: true
		},
		getRule: {
			name: '规则详情',
			url: 'v1/user/getRule',
			type: 'GET',
			needToken: true
		},
		getPointDetail: {
			name: '积分明细',
			url: 'v1/user/pointDetail',
			type: 'GET',
			needToken: true
		},

		// 集团相关
		setPaltform: {
			name: '设置默认项目',
			url: 'v1/user/setPaltform',
			type: 'GET',
			needToken: false
		},
		hasSetDefault: {
			name: '判断是否设置默认项目',
			url: 'v1/user/platform/default',
			type: 'GET',
			needToken: true
		},

		// 文章
		articleList: {
			name: '文章列表',
			url: 'v1/article/lists',
			type: 'GET',
			needToken: true
		},
		articleDetail: {
			name: '文章详情',
			url: 'v1/article/detail',
			type: 'GET',
			needToken: false
		},
		// 会员卡列表
		userCardList: {
			name: '会员卡列表',
			url: 'v1/userCard/lists',
			type: 'GET',
			needToken: true
		},

    //转盘抽奖
    luckDraw: {
      url: 'v1/lottery/record/luckDraw',
      name: '点击抽奖',
      type: 'GET',
      needToken: true
    },
    lotteryLists: {
      url: 'v1/lottery/all',
      name: '获取奖品列表',
      type: 'GET',
      needToken: true
    },
    lotteryDetail: {
      url: 'v1/lottery/detail',
      name: '获取规则详情',
      type: 'GET',
      needToken: true
    },
    getlotteryDetail: {
      url: 'v1/lottery/getDetail',
      name: '获取线下转盘详情',
      type: 'GET',
      needToken: true
    },
    getRecordShowLists: {
      url: 'v1/lottery/record/show',
      name: '转盘活动获奖名单',
      type: 'GET',
      needToken: true
		},
		userShare: {
			url: 'v1/user/share',
			name: '用户分享记录',
			type: 'POST',
			needToken: true
		},
		recordLists: {
      url: 'v1/lottery/record/list',
      name: '会员中奖记录',
      type: 'GET',
      needToken: true
		},
		rewardUserList:{
      url: 'v1/reward/rewardUserList',
      name: '用户奖品列表',
      type: 'GET',
      needToken: true
    },
    rewardUserDetail:{
      url: 'v1/reward/rewardUserDetail',
      name: '用户奖品详情',
      type: 'GET',
      needToken: true
		},
		rewardCreateTrade:{
      url: 'v1/reward/rewardCreateTrade',
      name: '用户领取奖品',
      type: 'POST',
      needToken: true
    },
		// 自助积分
		uploadTicketImg: {
			name: '拍照上传',
			url: 'v1/self-help-integral/upload',
			type: 'POST',
			needToken: true
		},
		applyIntegralList: {
			name: '申请列表',
			url: 'v1/self-help-integral/lists',
			type: 'GET',
			needToken: true
		},
		applyIntegralDetail: {
			name: '申请积分详情',
			url: 'v1/self-help-integral/detail',
			type: 'GET',
			needToken: true
		},

    // 分销推广
    applyCheck:{
      url: 'v1/user/applyCheck',
      name: '推广员状态',
      type: 'GET',
      needToken: true
    },
    relatedLogsList:{
      url: 'v1/user/relatedLogsList',
      name: '推广员绑定关系列表新',
      type: 'GET',
      needToken: true
    },
    applyRecordLists:{
      url: 'v1/user/applyRecordLists',
      name: '推广员审核',
      type: 'GET',
      needToken: true
    },
    applyCashOutCheck:{
      url: 'v1/deposit/applyCashOutCheck',
      name: '推广员提现状态',
      type: 'GET',
      needToken: true
    },
    departmenta:{
      url: 'v1/deposit/department',
      name: '部门列表',
      type: 'GET',
      needToken: false
    },
    getPartnerShop:{
      url: 'v1/user/getPartnerShop',
      name: '小店邀请推广员海报',
      type: 'GET',
      needToken: false
    },
    createWxMiniQr:{
      url: 'v1/goods/createWxMiniQr',
      name: '推广员分享生成',
      type: 'GET',
      needToken: true
    },
    getPromoterInfo:{
      url: 'v1/user/getPromoterInfo',
      name: '推广员个人二维码',
      type: 'GET',
      needToken: true
    },
    getWxMiniGoodsPerson:{
      url: 'v1/goods/getWxMiniGoodsPerson',
      name: '获取推广员分享商品信息',
      type: 'GET',
      needToken: true
    },
    setGoodsRelated:{
      url: 'v1/goods/setGoodsRelated',
      name: '推广商品关联会员关系',
      type: 'GET',
      needToken: true
    },
    setRelated:{
      url: 'v1/goods/setRelated',
      name: '推广商品关联会员关系新的',
      type: 'GET',
      needToken: true
    },
    applyAction:{
      url: 'v1/user/applyAction',
      name: '申请推广员',
      type: 'POST',
      needToken: true
    },
    getPersonDistribution:{
      url: 'v1/user/getPersonDistribution',
      name: '推广员个人信息',
      type: 'GET',
      needToken: true
    },
    getPartnerDistribution:{
      url: 'v1/user/getPartnerDistribution',
      name: '小店主页',
      type: 'GET',
      needToken: true
    },
    checkPartner:{
      url: 'v1/user/checkPartner',
      name: '查询是否可以绑定推广员关系',
      type: 'GET',
      needToken: true
    },
    getPartnerInfo:{
      url: 'v1/user/getPartnerInfo',
      name: '获取小店二维码信息',
      type: 'GET',
      needToken: true
    },
    promoterList:{
      url: 'v1/user/promoterList',
      name: '我的推广员',
      type: 'GET',
      needToken: true
    },
    applyRecordDetail:{
      url: 'v1/user/applyRecordDetail',
      name: '推广员申请详情',
      type: 'GET',
      needToken: true
    },
    checkerExamine:{
      url: 'v1/user/checkerExamine',
      name: '审核推广员或者小店',
      type: 'POST',
      needToken: true
    },
    partnerRelated:{
      url: 'v1/user/partnerRelated',
      name: '推广员上级',
      type: 'GET',
      needToken: true
    },
    creatPartnerWxMiniQr:{
      url: 'v1/user/creatPartnerWxMiniQr',
      name: '创建小店二维码',
      type: 'GET',
      needToken: true
    },
    getWxMiniQr:{
      url: 'v1/user/getWxMiniQr',
      name: '创建个人二维码',
      type: 'GET',
      needToken: true
    },
    goodsSpreadLists:{
      url: 'v1/user/goodsSpreadLists',
      name: '推广员客户列表',
      type: 'GET',
      needToken: true
    },
    estimatesOrderLists:{
      url: 'v1/trade/estimatesOrderLists',
      name: '推广员订单列表新！',
      type: 'GET',
      needToken: true
    },
    tradeEstimatesLists:{
      url: 'v1/trade/tradeEstimatesLists',
      name: '推广员订单列表',
      type: 'GET',
      needToken: true
    },
    //  会员提现
    userDepositCashesList:{
      url: 'v1/deposit/userDepositCashesList',
      name: '提现列表',
      type: 'GET',
      needToken: true
    },
    getUserDeposit:{
      url: 'v1/deposit/getUserDetail',
      name: '提现详情',
      type: 'GET',
      needToken: true
    },
    applyCashOut:{
      url: 'v1/deposit/applyCashOut',
      name: '申请提现',
      type: 'POST',
      needToken: true
    },
		userTeam:{
			url: 'v1/user/team',
			name: '我的队友',
			type: 'GET',
			needToken: true
		},
		subscribe:{
			url: 'v1/user/getSubscribeTemplate',
			name: '消息推送列表',
			type: 'GET',
			needToken: false
		},
    checkVerified:{
      url: 'v1/user/check-verified',
      name: '判断是否实名认证',
      type: 'GET',
      needToken: true
    },

		// 送积分
		isSendPoints: {
			name: '会员弹窗送积分判断',
			url: 'v1/member/benefits/point',
			type: 'GET',
			needToken: true
		},
		rewardPoints: {
			name: '新会员领取赠送积分',
			url: 'v1/member/benefits/getPoint',
			type: 'GET',
			needToken: true
		},
		getSubscribe: {
			name: '服务通知',
			url: 'v1/user/getSubscribe',
			type: 'GET',
			needToken: true
		},
		nearbyProject: {
			name: '获取最近项目',
			url: 'v1/index-item/nearby',
			type: 'GET',
			needToken: false
		},
    nearbyShopNearby: {
    	name: '获取最近店铺',
    	url: 'v1/index-shop/shopNearby',
    	type: 'GET',
    	needToken: false
    },
		// 多次售后
		sendBackAddr:{
			url: 'v1/user/trade/afterSales/send-back-addr',
			name: '回寄地址读取',
			type: 'GET',
			needToken: true
		},
		confirmTradeAfterSales:{
			url: 'v1/user/trade/afterSales/confrim-after',
			name: '确认售后状态',
			type: 'POST',
			needToken: true
		},

    /******* 储值卡业务/ 钱包*********/
    hasPayPassword:{
      url: 'v1/user/wallet/hasPayPassword',
      name: '是否设置支付密码',
      type: 'GET',
      needToken: true
    },
		setPayPassword:{
			url: 'v1/user/wallet/setPayPassword',
			name: '设置支付密码',
			type: 'POST',
			needToken: true
		},
		sendCode:{
			url: 'v1/user/wallet/sendCode',
			name: '发送验证码',
			type: 'GET',
			needToken: true
		},
		checkCode:{
			url: 'v1/user/wallet/checkCode',
			name: '检验验证码',
			type: 'GET',
			needToken: true
		},
    checkPayPassword:{
      url: 'v1/user/wallet/checkPayPassword',
      name: '检验支付密码',
      type: 'GET',
      needToken: true
    },
    payCode:{
      url: 'v1/user/wallet/paycode',
      name: '显示支付码',
      type: 'GET',
      needToken: true
    },
		isPayment:{
			url: 'v1/user/wallet/notify',
			name: '动态请求-支付码支付状态',
			type: 'GET',
			needToken: true
		},
		walletRegister:{
			url: 'v1/wallet/register',
			name: '注册开户',
			type: 'GET',
			needToken: true
		},
		walletDetail:{
			url: 'v1/wallet/info',
			name: '用户钱包首页',
			type: 'GET',
			needToken: true
		},
		physicalCardList:{
			url: 'v1/wallet/physical/list',
			name: '实体卡列表',
			type: 'GET',
			needToken: true
		},
		bindCard:{
			url: 'v1/wallet/bind',
			name: '绑定实体卡',
			type: 'POST',
			needToken: true
		},
		paymentList:{
			url: 'v1/payment/list',
			name: '支付方式列表',
			type: 'GET',
			needToken: true
		},
		walletPay:{
			url: 'v1/wallet/pay/virtual',
			name: '钱包支付',
			type: 'POST',
			needToken: true
		},
		physicalPay:{
			url: 'v1/wallet/pay/physical',
			name: '实体卡支付',
			type: 'POST',
			needToken: true
		},
		walletHistory:{
			url: 'v1/wallet/history',
			name: '消费交易历史查询',
			type: 'GET',
			needToken: true
		},

    // 新增
    getTmplInfo: {
      name: '获取门店挂件',
      type: 'get',
      url: 'v1/shop/getTmplInfo',
      needToken: false
    },
    groupDetail: {
      url: 'v1/group/groupDetail',
      name: '获取拼团详情SKU',
      type: 'GET',
      needToken: true
    },
	},
	header: {
		Accept: 'application/json'
	}
};
export {
	config
}
