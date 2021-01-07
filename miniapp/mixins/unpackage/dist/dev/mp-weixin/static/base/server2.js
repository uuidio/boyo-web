const config = {
	// api_base_url: 'https://ego.lanlnk.com/shop/',
	api_base_url: 'https://egotest.ytholidayplaza.com/shop/', //益购测试
	// api_base_url: 'https://ego.ytholidayplaza.com/shop/',//益购正式
	apiLinks: {
		wechatminipay: {
			// url: 'https://ego.lanlnk.com/payment/wechatminipay',
			url: 'https://egotest.ytholidayplaza.com/payment/wechatminipay',//益购测试
			// url: 'https://ego.ytholidayplaza.com/payment/wechatminipay',//益购正式
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
		bindUser: {
			name: '绑定用户',
			url: 'v1/wechatmini/creat-bind',
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
			needToken: false
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

	},
	header: {
		Accept: 'application/json',
	}
}
export {
	config
}
