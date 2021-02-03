<template>
	<view class="checkout-box">
		<view>
			<view class="account-box fxBox1" v-if="false">
				<text class="box-label fx0 text-30">购买账号</text>
				<input class="account-ipt fx1 text-30" type="text" placeholder="请填写正确的手机号" placeholder-style="color:#999;">
			</view>
			<view class="checkout-head">
				<view class="express-type">
					<view @click="typeClick(0)" :class="{ btn1: true, btn: true, active: active === 0 ? 'active' : '', disabledBtn: DisabledBtnOne ? true : false }">快递配送</view>
					<view @click="typeClick(1)" :class="{ btn2: true, btn: true, active: active === 1 ? 'active' : '', disabledBtn: DisabledBtnTwo ? true : false }">门店自提</view>
					<view class="btn3 btn" :class="{ disabledBtn: true }">门店配送</view>
				</view>
				<view v-show="pick_type === 0" @tap="initSw"><selectAddress @on-addr="getAddr" :addr-id="addr_id"></selectAddress></view>
				<view v-show="pick_type === 1" @tap="toPick">
					<view class="fxBox">
						<view class="pr-xs fx1">
							<view class="text-lg line2-p fw700 mb-xs" data-line="1">{{ zitiItem.selectAddr || '去填写' }}</view>
							<view v-if="zitiItem.receiver_name && zitiItem.receiver_tel">{{ zitiItem.receiver_name }} {{ zitiItem.receiver_tel }}</view>
							<view v-else class="col-red">请填写完整提货人信息</view>
						</view>
						<text class="emfont icon-right text-md mt-xs"></text>
					</view>
				</view>
			</view>
			<view class="checkout-shop border-radius5px" v-for="(item, index) in checkOutLists" :key="index">
				<view class="shop-info fxBox1">
					<text class="mr-xs text-l iconfont icon-shopfill col-red"></text>
					<text class="fw700 text-lg">{{ item.shopInfo.shop_name }}</text>
				</view>
				<view
					class="goods-info fxBox"
					@tap="
						toQueryLink('/pagesA/goods/detail', {
							id: goods_item.goods_id
						})
					"
					:key="goods_index"
					v-for="(goods_item, goods_index) in item.goods_lists"
				>
					<view class="imgBox"><image mode="widthFix" :src="goods_item.goods_image"></image></view>
					<view class="textBox fx1">
						<view>
							<view class="line2-p text-md">{{ goods_item.goods_name }}</view>
							<view class="col-666 text-sm mt-xs" v-if="goods_item.goods_info&&goods_item.goods_info.goods_info">{{ goods_item.goods_info.goods_info }}</view>
							<view v-if="goods_item.sku_info" class="col-666 text-sm mt-xs mb-xs">{{ goods_item.sku_info }}</view>
						</view>
						<view class="fxBox2">
							<view class="col-red">
								￥{{ goods_item.goods_price }}
								<text v-if="isIntegral">+{{ goods_item.point_fee }}{{checkOutInfo.point_unit}}</text>
							</view>
							<view class="text-sm col-666">x{{ goods_item.quantity }}</view>
						</view>
					</view>
				</view>
				<view class="fictitious-tips" v-if="false">
					<image class="warn-icon mr-xs" src="https://egoss1.ytholidayplaza.com/images/default/202008/14/QGgNrMUghyCDypxxG1AvMMYuvPyZ5sHhuHXgNX2F.png"></image>
					<text class="col-999 text-s">电子卡不支持退款</text>
				</view>
				<view class="express-info fxBox2 pt-md pb-md">
					<view>配送方式</view>
					<view>
						<text class="mr10">{{ active === 0 ? '快递' : '自提' }}</text>
					</view>
				</view>
				<view class="fxBox1 pt-md">
					<view class="mr-xs">订单备注</view>
					<input v-if="pick_type === 0" class="fx1" v-model="buyer_message[index].buyer_message" type="text" placeholder="选填，请和商家协商一致" />
					<input v-else class="fx1" v-model="buyer_message[index].buyer_message" type="text" placeholder="请输入备注" />
				</view>
				<view class="fxBox2 pt-md">
					<view class="mr-xs">运费</view>
					<text class="col-theme-red">¥{{ item.shopPostFee }}</text>
				</view>
				<view class="express-info fxBox2 pt-md pb-md" v-if="item.shopActivityList.length" @tap="selectActive(index)">
					<view>店铺优惠</view>
					<view class="fxBox2">
						<view class="col-666" v-if="selectType[index].type === 'coupon'"><text>不能与店铺优惠券共用</text></view>
						<view class="col-red" v-else-if="selectType[index].actIndex !== 0">
							<text>{{ `-¥${selectType[index].actItem.discount_fee}` }}</text>
						</view>
						<view v-else><text>不使用店铺优惠</text></view>
						<text class="emfont icon-right"></text>
					</view>
				</view>
				<view class="coupon-info border-radius5px pt-md bc-fff fxBox2" @tap="coupon_model(index)" v-if="useCoupon">
					<text>店铺优惠券</text>
					<text class="col-666 fxBox1">
						<text :class="{'col-red' : couponText[index] !== '选择店铺优惠券'}">{{ couponText[index] }}</text>
						<text class="emfont icon-right"></text>
					</text>
				</view>
			</view>
			<view class="border-radius5px price-box mt-md">
				<view class="p-md bc-fff fxBox2" v-if="point.show">
					<text>可用{{ point.info.consume_point_fee }}{{checkOutInfo.point_unit}}抵扣{{ point.info.points_fee }}元</text>
					<radio @tap="switchPoint" :checked="point.use" color="#E64340" v-if="point.enable" />
					<text v-else class="col-999">{{checkOutInfo.point_unit}}不足</text>
				</view>
				<view class="p-md bc-fff fxBox2" v-if="showCX">
					<text>
						促销：
						<text v-if="postFeeItem.status == 1">满{{ postFeeItem.rule_order_amount }}免邮费</text>
						<text v-else-if="postFeeItem.status == -1">
							<text v-if="postFeeItem.rule_order_amount">订单满{{ postFeeItem.rule_order_amount }}免邮</text>
							<text v-else>新人首单免邮</text>
						</text>
					</text>
					<text class="col-red" v-if="postFeeItem.status == 1">-{{ postFeeItem.decr_fee }}元邮费</text>
					<text v-else-if="postFeeItem.status == -1">订单免邮</text>
				</view>
				<view class="p-md fxBox2 bc-fff" @tap="platformCoupon_model" v-if="useCoupon">
					<text>平台优惠券</text>
					<text class="col-666 fxBox1">
						<text :class="{ 'col-red': platform_coupon_id !== '' }">{{ plarform_coupon_text }}</text>
						<text class="emfont icon-right"></text>
					</text>
				</view>
			</view>
			<view class="border-radius5px price-box mt-md">
				<view class="p-md bc-fff fxBox2" v-if="formatPrice(goodsPrice)>0">
					<text>商品总额</text>
					<text class="col-theme-red">￥{{ formatPrice(goodsPrice) }}</text>
				</view>
				<view class="p-md bc-fff fxBox2" v-if="isIntegral">
					<text>使用{{checkOutInfo.point_unit}}</text>
					<text>{{ pointFee }}</text>
				</view>
			</view>
			<view class="checkout-btn fxBox1">
				<view class="price-num fx1">
					<view>
						<block v-if="isIntegral && formatPrice(realPrice) <= 0">
							<text class="text-sm">实付{{checkOutInfo.point_unit}}：</text>
							<text class="col-red">
								<text class="text-md">{{ pointFee }}</text>
							</text>
						</block>
						<block v-else>
							<text class="text-sm">实付金额：</text>
							<text class="col-red">
								<text class="text-sm">￥</text>
								<text class="text-md" v-if="isIntegral">{{ formatPrice(realPrice) > 0 ? formatPrice(realPrice) : 0 }}</text>
								<text class="text-md" v-else>{{ formatPrice(realPrice) > 0 ? formatPrice(realPrice) : '-' }}</text>
							</text>
						</block>
					</view>
					<!--<view class="text-sm col-666">获得积分：{{Number(totalPrice/100)}}</view>-->
				</view>
				<view class="payment-btn"  @click="submit" v-if="payFlag">{{isIntegral ? '确认兑换' : '去支付'}}</view>
				<view class="payment-btn"  v-else>{{isIntegral ? '确认兑换' : '去支付'}}</view>
			</view>
			<view v-if="showPopup">
				<van-popup :show="showPopup" position="bottom" class="couponBox">
					<view class="text-center fw700 text-lg title fxBox1">
						<view class="fx1 text-center">优惠券</view>
						<view class="emfont icon-close text-lg" @click="showPopup = false"></view>
					</view>
					<view class="coupon-num">可使用优惠券</view>
					<view class="coupon-box">
						<van-radio-group :value="coupon_ids[showIndex].coupon_id" @change.stop="couponChange">
							<view class="mb-md fxBox2 p-md bc-fff" @click="couponClick(trimStr)">
								<text>不使用优惠券</text>
								<van-radio :name="trimStr" />
							</view>
							<view class="mb-md" @click="couponClick(item.coupon_id)" v-for="(item, coupon_index) in showCouponItem">
								<view class="coupon-info bc-fff fxBox">
									<view class="left fxBox">
										<view class="imgBox">
											<img src="../../static/images/coupon_orange.png" alt=""  v-if="item.shop_id === 0"/>
											<img src="../../static/images/coupon.png" alt="" v-else/>
										</view>
										<view class="coupon-price col-fff">
											<view class="mb-xs">
												<view v-if="item.coupon_info.type === 1">
													<text class="text-md">￥</text>
													<text class="price">{{ Number(item.coupon_info.denominations) }}</text>
												</view>
												<view v-else-if="item.coupon_info.type === 2">
													<text class="price">{{ item.coupon_info.discount }}</text>
													<text class="text-md">折</text>
												</view>
											</view>
											<view class="text-xs">满{{ Number(item.coupon_info.origin_condition) }}元可用</view>
										</view>
									</view>
									<view class="right fx1 p-md">
										<view>
											<view class="fw700 text-sm line2-p mb-md" data-line="1">{{ item.coupon_info.name }}</view>
											<view class="text-sm col-666">{{ item.coupon_info.start_at }} ~ {{ item.coupon_info.end_at }}</view>
										</view>
										<view class="fxBox2">
											<view class="fxBox1 col-666 text-sm" @click.stop="couponDetail(coupon_index)">
												详细信息
												<text
													:class="{
														emfont: true,
														'icon-unfold': coupon_show_desc[coupon_index] ? false : true,
														'icon-fold': coupon_show_desc[coupon_index] ? true : false
													}"
												></text>
											</view>
											<van-radio :name="item.coupon_id" />
										</view>
									</view>
								</view>
								<view class="coupon-text col-999 text-sm" v-show="coupon_show_desc[coupon_index]">{{ item.coupon_info.desc }}</view>
							</view>
						</van-radio-group>
					</view>
				</van-popup>
			</view>

			<view v-if="showPlatform">
				<van-popup :show="showPlatform" position="bottom" class="couponBox">
					<view class="text-center fw700 text-lg title fxBox1">
						<view class="fx1 text-center">平台优惠券</view>
						<view class="emfont icon-close text-lg" @click="showPlatform = false"></view>
					</view>
					<view class="coupon-num">可使用优惠券</view>
					<view class="coupon-box">
						<van-radio-group :value="platform_coupon_id" @change.stop="platformCouponChange">
							<view class="mb-md fxBox2 p-md bc-fff" @click="platformCouponClick(trimStr)">
								<text>不使用优惠券</text>
								<van-radio :name="trimStr" />
							</view>
							<view class="mb-md" @click="platformCouponClick(item.coupon_id)" v-for="(item, coupon_index) in plarformCoupon">
								<view class="coupon-info bc-fff fxBox">
									<view class="left fxBox">
										<view class="imgBox">
											<img src="../../static/images/coupon_orange.png" alt=""/>
										</view>
										<view class="coupon-price col-fff">
											<view class="mb-xs">
												<view v-if="item.coupon_info.type === 1">
													<text class="text-md">￥</text>
													<text class="price">{{ Number(item.coupon_info.denominations) }}</text>
												</view>
												<view v-else-if="item.coupon_info.type === 2">
													<text class="price">{{ item.coupon_info.discount }}</text>
													<text class="text-md">折</text>
												</view>
											</view>
											<view class="text-xs">满{{ Number(item.coupon_info.origin_condition) }}元可用</view>
										</view>
									</view>
									<view class="right fx1 p-md">
										<view>
											<view class="fw700 text-sm line2-p mb-md" data-line="1">{{ item.coupon_info.name }}</view>
											<view class="text-sm col-666">{{ item.coupon_info.start_at }} ~ {{ item.coupon_info.end_at }}</view>
										</view>
										<view class="fxBox2">
											<view class="fxBox1 col-666 text-sm" @click.stop="plarform_couponDetail(coupon_index)">
												详细信息
												<text
													:class="{
														emfont: true,
														'icon-unfold': plarform_coupon_show_desc[coupon_index] ? false : true,
														'icon-fold': plarform_coupon_show_desc[coupon_index] ? true : false
													}"
												></text>
											</view>
											<van-radio :name="item.coupon_id" />
										</view>
									</view>
								</view>
								<view class="coupon-text col-999 text-sm" v-show="plarform_coupon_show_desc[coupon_index]">{{ item.coupon_info.desc }}</view>
							</view>
						</van-radio-group>
					</view>
				</van-popup>
			</view>
		</view>
		<paymentPopup
			:type="checkoutType"
			:showDetail="showPayDetail"
			:actual-payment="formatPrice(realPrice) > 0 ? formatPrice(realPrice) : isIntegral ? 0 : '-'"
			:showPayPwd="isShowPayPwd"
			:current-pay-way="currentPay"
			@confirmPay="handleConfirmPay"
			@openPayDetail="handleOpenPayDetail"
			@closePayDetail="handleClosePayDetail"
			@changeShowPayPwd="handleChangeShowPayPwd"
			@changeCurrentPay="handleChangeCurrentPay"></paymentPopup>
	</view>
</template>

<script>
import selectAddress from '../../components/checkOut/selectAddress';
import toolFun from '../../static/base/toolFun';
import paymentPopup from '../../components/payment-popup/payment-popup';

export default {
	components: {
		selectAddress,
		paymentPopup
	},
	computed: {
		allGoodsPrice() {
			const total_fee = this.goods.reduce((total, item) => total + item.goods_price * 100 * item.quantity, 0);
			return total_fee;
		},
		realPrice() {
			let total_fee = 0;
			total_fee = this.goodsPrice + this.shopPostFee - (this.point.use ? this.point.fee * 100 : 0);
			this.allCouponPrice.forEach(item => {
				total_fee -= item * 100;
			});

			// 店铺活动
			if (this.selectType.length) {
				this.selectType.map((item, index) => {
					if (item.type === 'active' && item.actIndex !== 0) {
						total_fee -= item.actItem.discount_fee * 100;
					}
				});
			}
			total_fee -= this.plarform_coupon_price * 100;
			return total_fee;
		}
	},
	data() {
		return {
			currentPay: {},
			isShowPayPwd: false,
			showPayDetail: false,
			goodsPrice: 0,
			pointFee: 0,
			active: 0,
			trimStr: '',
			couponText: [],
			showPayment: true,
			showPopup: false,
			changeRadio: '',
			checkOutInfo: {},
			checkOutLists: [],
			showCouponItem: [],
			goods: [],
			buyer_message: [],
			addr_id: '',
			DisabledBtnOne: false,
			DisabledBtnTwo: false,
			pick_type: 0,
			ziti_addr: '',
			coupon_ids: [],
			checkoutType: '',
			coupon_show_desc: [],
			zitiItem: {},
			showIndex: 0,
			allCouponPrice: [],
			useCouponPrice: 0,
			actLists: [],
			point: {
				use: false,
				show: false,
				enable: false,
				fee: 0,
				info: {
					consume_point_fee: 0,
					points_fee: 0
				}
			},
			calcPrice: 0,
			shopPostFee: 0,
			plarformCoupon: [],
			showPlatform: false,
			plarform_coupon_text: '选择平台优惠券',
			plarform_coupon_price: 0,
			platform_coupon_id: '',
			plarform_coupon_show_desc: [],
			isGroup: false,
			isIntegral: false,
			singleGoods: {},
			allPrice: 0,
			postFeeItem: {},
			locaPostFee: 0,
			showCX: false,
			seckillOrder: false, //秒杀商品
			typeNumber: 0,
			typeFlat: false,
			isSubmit: false,
			payFlag:true,
			zitiLists: [],
			pickType: '',
			useCoupon: true, //能否使用优惠券
			selectType: [],
			act_ids: [], //店铺活动
			isInit: false,
		};
	},
	onLoad: function(option) {
		if (option.addr_id) {
			this.addr_id = option.addr_id;
		}
		this.checkoutType = uni.getStorageSync('type');
		if (option.isSeck) {
			this.checkoutType = option.isSeck;
			this.seckillOrder = true;
			this.useCoupon = false;
		}
	},
	onShow() {
		this.isInit = true;
	},
	watch: {},
	methods: {
		/** 混合支付 start **/
		handleConfirmPay(){
			const _this = this
			let data = {
				pick_type: this.pick_type
			};
			if (this.pick_type === 0) {
				data.addr_id = this.addr_id;
			} else {
				data.ziti_addr = {
					ziti_addr: this.zitiItem.selectAddr,
					receiver_name: this.zitiItem.receiver_name,
					receiver_tel: this.zitiItem.receiver_tel
				};
			}
			// 买家留言
			let messageArr = [];
			this.buyer_message.map(item => {
				if (item.buyer_message !== '') {
					messageArr.push(item);
				}
			});
			if (messageArr.length) data.buyer_message = messageArr;
			// 店铺活动
			let act_ids = [];
			this.selectType.map((item, index) => {
				if (item.type === 'active') {
					act_ids.push({ shop_id: item.actItem.shop_id, act_id: item.actItem.id });
				}
			});
			if (act_ids.length) data.act_ids = act_ids;
			// 店铺优惠券
			let coupon_ids = [];
			this.coupon_ids.map(item => {
				if (item.coupon_id !== '') {
					coupon_ids.push(item);
				}
			});
			if (coupon_ids.length) data.coupon_ids = coupon_ids;
			// 平台优惠券
			if (this.platform_coupon_id !== '') data.platform_coupon_id = this.platform_coupon_id;
			if (this.checkoutType) {
				data.fastbuy = 1;
			}
			if (this.point.use) {
				data.consume_point_fee = this.point.info.consume_point_fee;
				data.points_fee = this.point.info.points_fee;
			}
			data.pay_type = this.currentPay.pay_type
			this.payFlag = false
			this.$http({
				aurl: 'createOrder',
				data: data,
				success: res => {
					if (res.data.code === 0) {
						const payment_id = res.data.result.payment_id;
						const _this = this;
						//0元支付
						if(this.isIntegral && this.realPrice == 0) {
							_this.$http({
							  aurl: 'paymentGenerate',
							  params: {
								payment_id: payment_id,
								pay_type: 'online',
								pay_app:'Zero',
							  },
							  success: res => {
								if (res.data.code === 0) {
								  console.log('积分支付',res);
								  if(res.data.result.res == '6') {
									_this.redirectToLink('/pagesA/checkout/status', {
										status: 'succ',
										payment_id: payment_id
									});
								  }else{
									_this.redirectToLink('/pagesA/checkout/status', {
									  status: 'fail',
									  payment_id: payment_id
									});
								  }
								}
							  },
							  fail: error => {
								console.log(error);
								_this.redirectToLink('/pagesA/checkout/status', {
								  status: 'fail',
								  payment_id: payment_id
								});
							  }
							});
							return
						}
						if(_this.currentPay.id === 1){ // 微信支付
							uni.login({
								provider: 'weixin',
								success: function(loginRes) {
									_this.$http({
										aurl: 'wechatminipay',
										params: {
											code: loginRes.code,
											payment_id: payment_id
										},
										success: res => {
											if (res.data.code === 0) {
												const params = res.data.result.url;
												_this.payment(params, payment_id, _this);
											}
										},
										fail: error => {
											console.log(error);
										}
									});
								}
							});
						} else if (_this.currentPay.id === 2 || _this.currentPay.id === 3) { // 实体卡/钱包支付
							uni.showLoading({title: '支付中...'})
							_this.$http({
								aurl: _this.currentPay.id === 2 ? 'physicalPay' : 'walletPay',
								data: {
									payment_id: payment_id
								},
								success: res => {
									if (res.data.code === 0) {
										if (!_this.isGroup) {
											_this.redirectToLink('/pagesA/checkout/status', {
												status: 'succ',
												payment_id: payment_id
											});
										} else {
											_this.redirectToLink('/pagesA/checkout/groupStatus', {
												status: 'succ',
												payment_id: payment_id
											});
										}
									}
								},
								fail: error => {
									// console.log(error);
									_this.redirectToLink('/pagesA/checkout/status', {
										status: 'fail',
										payment_id: payment_id
									});
								},
								complete: res => {
									uni.hideLoading()
								},
							});
						}
					}
				},
				fail: error => {
					console.log(error);
				},
				complete:function(){
					setTimeout(function(){
						_this.payFlag = true
					},1000)
				}
			});
		},
		handleChangeShowPayPwd(bool){
			this.isShowPayPwd = bool
		},
		handleChangeCurrentPay(obj){
			this.currentPay = obj
		},
		handleOpenPayDetail(){
			this.showPayDetail = true
		},
		handleClosePayDetail(){
			this.showPayDetail = false
		},
		/** 混合支付 end **/
		initSw() {
			this.point.use = false;
		},
		platformCoupon_model() {
			this.plarform_coupon_show_desc = [];
			if (this.plarformCoupon.length === 0) {
				this.showAlert('暂无可用平台优惠券');
				return;
			}
			for (let i = 0; i < this.plarformCoupon.length; i++) {
				this.plarformCoupon[i].coupon_id = String(this.plarformCoupon[i].coupon_id);
				this.plarform_coupon_show_desc.push(false);
			}
			this.showPlatform = true;
		},
		switchPoint(e) {
			this.point.use = !this.point.use;
			if (this.point.use) {
				this.point.fee = this.point.info.points_fee;
			} else {
				this.point.fee = 0;
			}
		},
		calcPoint(total) {
			if(this.checkOutInfo.open_point === 0){
				return;
			}
			let type = '';
			if (this.checkoutType) {
				type = 'fastbuy';
			}
			if (total > 0) {
				this.$http({
					aurl: 'getPoint',
					data: {
						total_money: total,
						type:type
					},
					success: res => {
						if (res.data.code === 0) {
							if(this.point.show && res.data.result.consume_point_fee == 0){
								this.point.show = false;
								this.point.use = false;
								this.point.enable = res.data.result.is_enable;
							}
							if (res.data.result.consume_point_fee !== 0) {
								this.point.show = true;
								this.point.use = false;
								this.point.info = res.data.result;
								this.point.fee = res.data.result.points_fee;
								this.point.enable = res.data.result.is_enable;
							}
							if (res.data.result.freeOrderPost.status != 0) {
								this.postFeeItem = res.data.result.freeOrderPost;
								this.freeOrderPost(res.data.result.freeOrderPost);
								if (this.postFeeItem.status === 1) {
									if (this.postFeeItem.decr_fee > 0) {
										this.showCX = true;
									}
								} else {
									this.showCX = true;
								}
							}
						}
					},
					fial: err => {
						console.log(err);
					}
				});
			}
		},
		freeOrderPost(item) {
			if (item.status == 1) {
				this.shopPostFee -= Number(item.decr_fee * 100);
			} else if (item.status == -1) {
				this.shopPostFee = 0;
			}
		},
		coupon_model(index) {
			this.showIndex = index;
			this.coupon_show_desc = [];
			if (this.checkOutLists[index].shopCouponList.length === 0) {
				this.showAlert('该店铺暂无可用优惠券');
				return;
			}
			this.showCouponItem = this.checkOutLists[index].shopCouponList;
			for (let i = 0; i < this.showCouponItem.length; i++) {
				this.showCouponItem[i].coupon_id = String(this.showCouponItem[i].coupon_id);
				this.coupon_show_desc.push(false);
			}
			this.showPopup = true;
		},
		toPick() {
			let item = {};
			if (this.ziti_addr === '') {
				item = { tel: this.checkOutInfo.ziti_info.mobile, shopId: this.checkOutInfo.lists[0].shopInfo.id };
			} else {
				item = {
					tel: this.checkOutInfo.ziti_info.mobile,
					shopId: this.checkOutInfo.lists[0].shopInfo.id,
					ziti_addr: this.ziti_addr || '',
					receiver_name: this.zitiItem.receiver_name || '',
					selectAddr: this.zitiItem.selectAddr || ''
				};
			}
			this.toQueryLink('/pagesA/checkout/pickStore', item);
		},
		getAddr(id) {
			this.addr_id = id;
			this.getLists();
		},
		formatPrice(price) {
			return (price / 100).toFixed(2);
		},
		getLists() {
			this.goodsPrice = 0;
			this.pointFee = 0;
			this.shopPostFee = 0;
			this.goods = [];
			const data = {
				type: ''
			};
			if (this.addr_id !== '') {
				data.addr_id = this.addr_id;
				data.pick_type = this.pick_type;
			}
			if (this.checkoutType) {
				data.type = this.checkoutType;
			}
			this.$http({
				aurl: 'checkOrderLists',
				params: data,
				success: res => {
					this.checkOutInfo = res.data.result;
					this.checkOutLists = res.data.result.lists;
					if (!this.checkOutLists.length) {
						uni.navigateBack({
							delta: 1
						});
						return;
					}
					// 立即购买
					this.singleGoods = this.checkOutLists[0].goods_lists[0];
					//团购
					if (this.checkOutLists[0].goods_lists[0].actSign === 'is_group') {
						this.isGroup = true;
					}
					// 积分商城
					if (this.checkOutLists[0].goods_lists[0].actSign === 'point_goods') {
						this.isIntegral = true;
						this.useCoupon = false; //隐藏优惠券
					}
					this.plarformCoupon = this.checkOutInfo.coupons.platform;
					if (this.checkOutInfo.pick_type.indexOf('自提') === -1) {
						this.DisabledBtnTwo = true;
						this.pick_type = 0;
						this.active = 0;
					}
					if (this.checkOutInfo.pick_type.indexOf('快递') === -1) {
						this.DisabledBtnOne = true;
						this.pick_type = 1;
						this.active = 1;
						// 只支持自提 显示自提地址
						this.getZitiLists(this.checkOutInfo.lists[0].shopInfo.id);
					}
					res.data.result.lists.forEach((item, index) => {
						if (item.shopActivityList.length) {
							item.shopActivityList.unshift({ name: '不使用店铺优惠' });
							if (this.selectType[index] === undefined) {
								this.$set(this.selectType, index, { type: 'active', actIndex: 1, actItem: item.shopActivityList[1] });
							}
						}
						//运费
						if (item.shopPostFee !== 0) {
							this.shopPostFee += item.shopPostFee * 100;
						}
						// 商品价格
						item.goods_lists.forEach((goods, index) => {
							this.goodsPrice += goods.goods_price * goods.quantity * 100;
							this.pointFee += goods.point_fee * goods.quantity;
						});
						if (this.isInit) {
							this.getPlatformCoupon();
							// 初始化买家留言
							this.buyer_message.push({
								shop_id: item.shopInfo.id,
								buyer_message: ''
							});
							// 初始店铺优惠券
							this.coupon_ids.push({
								shop_id: item.shopInfo.id,
								coupon_id: ''
							});
						}
						this.couponText.push('选择店铺优惠券');
						this.allCouponPrice.push(0);
						item.goods_lists.forEach(goods_item => {
							this.goods.push(goods_item);
						});
					});
					this.locaPostFee = this.shopPostFee;
					// 积分抵扣商品 不能再使用积分
					if (this.isIntegral || this.checkOutInfo.open_point === 0 || this.seckillOrder) {
						return;
					}
					const _this = this;
					this.point.use = false;
					_this.calcPoint(_this.formatPrice(this.realPrice));
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		typeClick(num) {
			this.isInit = false;
			if (this.typeNumber === num) {
				this.typeFlat = false;
				return;
			}
			if (!this.typeFlat) {
				setTimeout(() => {
					this.typeFlat = false;
				}, 1000);
			} else {
				uni.showToast({
					title: '别着急,慢点操作～',
					icon: 'none'
				});
				return false;
			}
			this.initSw();
			this.typeFlat = true;
			this.typeNumber = num;
			if (num === 1) {
				if (this.zitiLists.length === 0) {
					this.getZitiLists(this.checkOutInfo.lists[0].shopInfo.id);
				}
				if (this.DisabledBtnTwo) {
					uni.showToast({
						title: '该订单不支持自提',
						icon: 'none'
					});
					return;
				}
			} else {
				if (this.DisabledBtnOne) {
					uni.showToast({
						title: '该订单不支持快递配送',
						icon: 'none'
					});
					return;
				}
			}
			this.active = num;
			this.pick_type = num;
			this.getLists();
		},
		couponChange(e) {
			this.coupon_ids[this.showIndex].coupon_id = e.detail;
			if (e.detail !== '') {
				this.couponTextUpdate(e.detail);
			} else {
				this.couponText[this.showIndex] = '选择店铺优惠券';
				this.$set(this.allCouponPrice, this.showIndex, 0);
			}
			this.getPlatformCoupon();
			this.point.use = false;
			this.calcPoint(this.formatPrice(this.realPrice));
			this.platform_coupon_id = '';
			this.showPopup = false;
		},
		platformCouponChange(e) {
			this.platform_coupon_id = e.detail;
			if (e.detail !== '') {
				this.platformCouponUpdate(e.detail);
			} else {
				this.plarform_coupon_text = '选择平台优惠券';
				this.$set(this, 'plarform_coupon_price', 0);
			}
			this.point.use = false;
			this.calcPoint(this.formatPrice(this.realPrice));
			this.showPlatform = false;
		},
		couponClick(id) {
			this.coupon_ids[this.showIndex].coupon_id = id;
			if (id !== '') {
				this.$set(this.selectType, this.showIndex, { type: 'coupon' });
				this.couponTextUpdate(id);
			} else {
				this.couponText[this.showIndex] = '选择店铺优惠券';
				this.$set(this.allCouponPrice, this.showIndex, 0);
			}
			this.getPlatformCoupon();
			this.point.use = false;
			this.calcPoint(this.formatPrice(this.realPrice));
			this.showPopup = false;
			this.platform_coupon_id = '';
		},
		platformCouponClick(id) {
			this.platform_coupon_id = id;
			if (id !== '') {
				this.platformCouponUpdate(id);
			} else {
				this.plarform_coupon_text = '选择平台优惠券';
				this.$set(this, 'plarform_coupon_price', 0);
			}
			this.point.use = false;
			this.calcPoint(this.formatPrice(this.realPrice));
			this.showPlatform = false;
		},
		platformCouponUpdate(id) {
			for (let i = 0; i < this.plarformCoupon.length; i++) {
				const item = this.plarformCoupon[i];
				if (item.coupon_id === id) {
					const info = item.coupon_info;
					if (info.type === 1) {
						this.plarform_coupon_text = '满' + Number(info.origin_condition) + '元减' + Number(info.denominations) + '元';
						this.$set(this, 'plarform_coupon_price', Number(info.denominations));
					}
					break;
				}
			}
		},
		couponTextUpdate(id) {
			for (let i = 0; i < this.showCouponItem.length; i++) {
				const item = this.showCouponItem[i];
				if (item.coupon_id === id) {
					const info = item.coupon_info;
					if (info.type === 1) {
						this.couponText[this.showIndex] = '满' + Number(info.origin_condition) + '元减' + Number(info.denominations) + '元';
						this.$set(this.allCouponPrice, this.showIndex, Number(info.denominations));
					}
					break;
				}
			}
		},
		couponDetail(index) {
			this.$set(this.coupon_show_desc, index, !this.coupon_show_desc[index]);
		},
		plarform_couponDetail(index) {
			this.$set(this.plarform_coupon_show_desc, index, !this.plarform_coupon_show_desc[index]);
		},
		getPlatformCoupon() {
			let ids = [];
			let type = '';
			for (let i = 0; i < this.coupon_ids.length; i++) {
				if (this.coupon_ids[i].coupon_id !== '') {
					ids.push(Number(this.coupon_ids[i].coupon_id));
				}
			}
			let actId = [];
			this.selectType.map(item => {
				if (item.type === 'active') {
					actId.push(item.actItem.id);
				}
			});
			if (this.checkoutType) {
				type = 'fastbuy';
			}
			this.$http({
				aurl: 'platformCoupon',
				data: {
					coupon_ids: ids,
					act_ids: actId,
					type
				},
				success: res => {
					this.plarformCoupon = res.data.result;
					this.plarform_coupon_text = '选择平台优惠券';
					this.plarform_coupon_price = 0;
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		submit() {
			if (this.isSubmit) {
				setTimeout(() => {
					this.isSubmit = false;
				}, 2000);
			}
			this.isSubmit = true;
			const _this = this
			if (this.pick_type === 0) {
				if (this.addr_id === '') {
					uni.showToast({
						title: '请填写收货人信息',
						icon: 'none'
					});
					return;
				}
			} else {
				if (!this.zitiItem.receiver_name || !this.zitiItem.receiver_tel) {
					uni.showToast({
						title: '请填写提货人信息',
						icon: 'none'
					});
					return;
				}
			}
			if(!this.isIntegral && this.realPrice <= 0){
				uni.showToast({
					title: '支付金额有误，请正常使用优惠规则',
					icon: 'none'
				});
				return;
			}
			// let data = {
			// 	pick_type: this.pick_type
			// };
			// if (this.pick_type === 0) {
			// 	data.addr_id = this.addr_id;
			// } else {
			// 	data.ziti_addr = {
			// 		ziti_addr: this.zitiItem.selectAddr,
			// 		receiver_name: this.zitiItem.receiver_name,
			// 		receiver_tel: this.zitiItem.receiver_tel
			// 	};
			// }
			// // 买家留言
			// let messageArr = [];
			// this.buyer_message.map(item => {
			// 	if (item.buyer_message !== '') {
			// 		messageArr.push(item);
			// 	}
			// });
			// if (messageArr.length) data.buyer_message = messageArr;
			// // 店铺活动
			// let act_ids = [];
			// this.selectType.map((item, index) => {
			// 	if (item.type === 'active') {
			// 		act_ids.push({ shop_id: item.actItem.shop_id, act_id: item.actItem.id });
			// 	}
			// });
			// if (act_ids.length) data.act_ids = act_ids;
			// // 店铺优惠券
			// let coupon_ids = [];
			// this.coupon_ids.map(item => {
			// 	if (item.coupon_id !== '') {
			// 		coupon_ids.push(item);
			// 	}
			// });
			// if (coupon_ids.length) data.coupon_ids = coupon_ids;
			// // 平台优惠券
			// if (this.platform_coupon_id !== '') data.platform_coupon_id = this.platform_coupon_id;
			// if (this.checkoutType) {
			// 	data.fastbuy = 1;
			// }
			// if (this.point.use) {
			// 	data.consume_point_fee = this.point.info.consume_point_fee;
			// 	data.points_fee = this.point.info.points_fee;
			// }
			// this.payFlag = false
			if(this.isIntegral && this.realPrice == 0){
				this.handleConfirmPay()
			} else {
				if(this.currentPay.id == 2 || this.currentPay.id == 3){
					this.isShowPayPwd = true
					setTimeout(function(){
						_this.isOnFocus = true
					}, 400)
				} else if (this.currentPay.id == 1){
					this.showPayDetail = true
				}
			}
			// this.$http({
			// 	aurl: 'createOrder',
			// 	data: data,
			// 	success: res => {
			// 		if (res.data.code === 0) {
			// 			const payment_id = res.data.result.payment_id;
			// 			const _this = this;
			// 			//0元支付
			// 			if(this.isIntegral && this.realPrice == 0) {
			// 				_this.$http({
			// 				  aurl: 'paymentGenerate',
			// 				  params: {
			// 					payment_id: payment_id,
			// 					pay_type: 'online',
			// 					pay_app:'Zero',
			// 				  },
			// 				  success: res => {
			// 					if (res.data.code === 0) {
			// 					  console.log('积分支付',res);
			// 					  if(res.data.result.res == '6') {
			// 						_this.redirectToLink('/pagesA/checkout/status', {
			// 							status: 'succ',
			// 							payment_id: payment_id
			// 						});
			// 					  }else{
			// 						_this.redirectToLink('/pagesA/checkout/status', {
			// 						  status: 'fail',
			// 						  payment_id: payment_id
			// 						});
			// 					  }
			// 					}
			// 				  },
			// 				  fail: error => {
			// 					console.log(error);
			// 					_this.redirectToLink('/pagesA/checkout/status', {
			// 					  status: 'fail',
			// 					  payment_id: payment_id
			// 					});
			// 				  }
			// 				});
			// 				return
			// 			}
			// 			uni.login({
			// 				provider: 'weixin',
			// 				success: function(loginRes) {
			// 					_this.$http({
			// 						aurl: 'wechatminipay',
			// 						params: {
			// 							code: loginRes.code,
			// 							payment_id: payment_id
			// 						},
			// 						success: res => {
			// 							if (res.data.code === 0) {
			// 								const params = res.data.result.url;
			// 								_this.payment(params, payment_id, _this);
			// 							}
			// 						},
			// 						fail: error => {
			// 							console.log(error);
			// 						}
			// 					});
			// 				}
			// 			});
			// 		}
			// 	},
			// 	fail: error => {
			// 		console.log(error);
			// 	},
			// 	complete:function(){
		  //           setTimeout(function(){
		  //             _this.payFlag = true
		  //           },1000)
		  //       }
			// });
		},
		payment(params, payment_id, _this) {
			uni.requestPayment({
				nonceStr: params.nonceStr,
				package: params.package,
				timeStamp: params.timeStamp,
				signType: params.signType,
				paySign: params.paySign,
				success: function(res) {
					if (!_this.isGroup) {
						_this.redirectToLink('/pagesA/checkout/status', {
							status: 'succ',
							payment_id: payment_id
						});
					} else {
						_this.redirectToLink('/pagesA/checkout/groupStatus', {
							status: 'succ',
							payment_id: payment_id
						});
					}
				},
				fail: function(err) {
					_this.redirectToLink('/pagesA/checkout/status', {
						status: 'fail',
						payment_id: payment_id
					});
				},
				complete: () => {
					if (_this.seckillOrder) {
						uni.removeStorageSync('seckillPayTime');
						uni.removeStorageSync('seckillSuccess');
					}
				}
			});
		},
		getZitiLists(shopid) {
			this.$http({
				aurl: 'ztLists',
				aPath: [shopid],
				success: res => {
					this.zitiLists = res.data.result;
					// 获取默认地址
					let defAdd = uni.getStorageSync('defAdd');
					this.zitiItem.selectAddr = this.zitiLists[0].address;
					this.zitiItem.receiver_name = defAdd.name;
					this.zitiItem.receiver_tel = defAdd.tel;
					this.ziti_addr = this.zitiItem;
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		selectActive(index) {
			let selectArr = [];
			this.checkOutLists[index].shopActivityList.map(item => {
				selectArr.push(item.name);
			});
			uni.showActionSheet({
				itemList: selectArr,
				success: res => {
					let actItem = this.checkOutLists[index].shopActivityList[res.tapIndex];
					this.$set(this.selectType, index, { type: 'active', actIndex: res.tapIndex, actItem: actItem });
					if (res.tapIndex !== 0) {
						this.couponClick(this.trimStr); //  取消选择的店铺优惠券
						this.platformCouponClick(this.trimStr); // 取消选择的平台券
					}
					else {
						this.getPlatformCoupon();
					}
				},
				fail: err => {
					console.log(err.errMsg);
				}
			});
		}
	},
	mounted() {},
	destroyed() {
		uni.removeStorageSync('type');
		console.log('销毁');
	}
};
</script>

<style scoped lang="stylus">
.fictitious-tips
	padding-left 180rpx
	display flex
	align-items center
	.warn-icon
		width 22rpx
		height 22rpx
.account-box
	height 86rpx
	border-radius 10rpx
	margin-top 10rpx
	background #ffffff
	padding 0 20rpx
	.box-label
		margin-right 54rpx
.checkout-box
	padding 20rpx 20rpx 0
	padding-bottom 90px
	width 100%
	box-sizing border-box
	.checkout-head
		margin-bottom 20rpx
		background #ffffff
		padding 30rpx 20rpx
		.express-type
			display flex
			width 100%
			margin-bottom 40rpx
			.btn
				flex 1
				height 60rpx
				line-height 60rpx
				text-align center
				border 1px solid #cccccc
				color #666
				font-size 28rpx
			.btn1
				border-radius 4px 0 0 4px
			.btn3
				border-radius 0 4px 4px 0
			.active
				border-color #e64340
				color #ffffff
				background #e64340
			.disabledBtn
				background #ccc
				color #666
				opacity 0.6
		.add-box
			position relative
	.checkout-shop
		padding 30rpx 20rpx
		background #fff
		margin-bottom 30rpx
		.goods-info
			padding 20rpx 0
			.imgBox
				width 160rpx
				margin-right 20rpx
				image
					width 100%
					border-radius 4px
			.textBox
				display flex
				flex-direction column
				justify-content space-between
				padding 10rpx 0
	.checkout-btn
		height 90rpx
		width 100%
		background #ffffff
		position fixed
		bottom 0
		left 0
		z-index 2
		.price-num
			text-align right
			padding-right 40rpx
		.payment-btn
			width 160rpx
			height 90rpx
			line-height 90rpx
			background #e64340
			color #fff
			text-align center
	.couponBox
		>>>.van-popup
			height 945rpx
			width 100%
			padding 0 20rpx
			box-sizing border-box
			background #f8f8f8
			.title
				height 100rpx
				line-height 100rpx
			.coupon-num
				height 60rpx
				line-height 60rpx
			.coupon-box
				height calc(100% - 160rpx)
				overflow-y scroll
				.coupon-text
					border 1px solid #D7D7D7
					margin 0 10rpx
					padding 10rpx 40rpx
					background #fff
				.coupon-info
					height 206rpx
					width 100%
					.left
						width 240rpx
						height 100%
						position relative
						.imgBox
							width 100%
							height 100%
							position absolute
							top 0
							left 0rpx
							image
								width 100%
								height 100%
						.coupon-price
							display flex
							flex-direction column
							align-items center
							justify-content center
							width 100%
							position relative
							z-index 2
							.price
								font-size 80rpx
					.right
						box-sizing border-box
						display flex
						flex-direction column
						justify-content space-between
</style>
