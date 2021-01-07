<template>
	<view class="order-detail" :class="{ page_fixed: showCode }" v-if="loadOver">
		<view class="detail-header">
			<view class="fxBox2">
				<view class="detail-status fx1">
					<view class="text-18 mb-xs">{{ detail.status_text }}</view>
					<view class="text-16 closeTime fxBox1" v-if="detail.status === 'WAIT_BUYER_PAY' && close_time > 0">
						剩
						<uni-countdown
							color="#fff"
							borderColor="transparent"
							backgroundColor="none"
							splitorColor="#FFFFFF"
							:showDay="false"
							:second="getTime(detail.trade_close_end_time)"
						></uni-countdown>
						自动取消
					</view>
				</view>
				<view class="fx0">
					<image :src="statusIcon" class="icon-svg"></image>
					<!-- <image src="../../../static/images/WAIT_BUYER_PAY.svg"></image> -->
				</view>
			</view>
		</view>
		<view><image class="detail-bg" src="../../../static/images/banyuan.png"></image></view>
		<view class="detail-add" :style="{ margin: detail.invoice_no ? '-70rpx 20rpx 0' : '-100rpx 20rpx 0' }">
			<view @tap="needTokenQueryLink('/pagesA/user/order/logStep', { tid: detail.tid })" class="p-md bc-fff border-radius5px mb-md fxBox1" v-if="detail.invoice_no">
				<text class="emfont icon-deliver_fill col-666 text-lg mr-md"></text>
				<view v-if="logStep.name !== ''">
					<view class="line2-p mb-xs text-md" data-line="1">{{ logStep.name }}</view>
					<view class="col-666 text-sm">{{ logStep.time }}</view>
				</view>
				<text v-else>查看物流</text>
			</view>
			<view class="p-md bc-fff border-radius5px" v-if="detail.pick_type === 0">
				<view class="fxBox1">
					<view><text class="emfont icon-addressbook col-red mr-sm text-l"></text></view>
					<view class="fx1">
						<view>
							<text class="fw700 text-md">{{ detail.receiver_name }}</text>
							<text class="col-666 text-sm">{{ detail.receiver_tel }}</text>
						</view>
						<view class="line2-p col-666" data-line="1">{{ address }}</view>
					</view>
				</view>
			</view>
			<view class="p-md bc-fff border-radius5px" v-else-if="detail.pick_type === 1">
				<view class="fxBox1">
					<view class="fx1">
						<view class="mb-sm">自提信息</view>
						<view class="mb-sm fw700 text-md">
							<text class="mr-xs">提货人:</text>
							<text class="mr-xs">{{ detail.receiver_name }}</text>
							<text>{{ detail.receiver_tel }}</text>
						</view>
						<view class="fxBox1 col-666 text-sm">
							<view class="mr-xs">提货地址:</view>
							<view class="line2-p fx1" data-line="1">{{ detail.receiver_address }}</view>
						</view>
					</view>
					<view class="qrcode-iconBox" @tap="showCodeEwm" v-if="detail.pick_statue === 0">
						<view class="emfont icon-qrcode qrcode-icon"></view>
						<view>提货凭证</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-md">
			<view class="order-info" v-for="(item, index) in detail.trade_order">
				<view class="gm-name">
					{{item.gm_name}}
				</view>
				<view
					class="order-shop fxBox2"
					@tap="
						toQueryLink('/pagesB/shop/index', {
							shopid: detail.shop_info.id
						})
					"
				>
					<!--<image :src="item.shop_info.shop_logo" mode="widthFix"></image>-->
					<view>
						<text class="emfont icon-shop text-30 mr-xs col-red"></text>
						<text class="text-bold">{{ detail.shop_info.shop_name }}</text>
					</view>
					<view>
						<text class="col-666">{{ detail.status_text }}</text>
					</view>
				</view>
				<view class="order-goods bc-fff">
					<view class="imgBox" @tap="toGoodsDetail(item.goods_id)"><image mode="widthFix" :src="item.goods_image"></image></view>
					<view class="fx1 order-goods-text">
						<view class="order-goods-tit" @tap="toGoodsDetail(item.goods_id)">
							<view data-line="1" class="line2-p text-md">{{ item.goods_name }}</view>
						</view>
						<view class="col-666 fxBox2 mt-xs text-sm">
							<view class="fx1">
								<text v-if="item.sku_info">{{ item.sku_info }}</text>
							</view>
							<view class="text-md text-r col-666">x{{ item.quantity }}</view>
						</view>
						<view class="col-666 fxBox2 mt-xs text-sm">
							<view class="fx1">
								<view>
									￥{{ item.goods_price }}
									<text v-if="detail.consume_point_fee > 0">+{{ detail.consume_point_fee }}{{detail.point_unit}}</text>
								</view>
							</view>
						</view>

						<view class="text-r mt-sm">
							<block v-if="detail.activity_sign === 'point_goods'">
								<view
									v-if="item.status === 'TRADE_FINISHED' && !item.after_sales_status && item.allow_after === 1"
									@tap="toQueryLink('/pagesA/user/order/saleType', { oid: item.oid, tid: detail.tid })"
									class="sale border-radius5px border-666 col-666"
								>
									申请售后
								</view>
							</block>
							<block v-else>
								<view
									v-if="item.status === 'TRADE_FINISHED' && !item.after_sales_status && detail.activity_sign !== 'choujiang'"
									@tap="toQueryLink('/pagesA/user/order/saleType', { oid: item.oid, tid: detail.tid })"
									class="sale border-radius5px border-666 col-666"
								>
									申请售后
								</view>
							</block>

							<view
								class="sale border-radius5px border-666 col-666"
								@tap="toQueryLink('/pagesA/user/order/saleType', { oid: item.oid, tid: detail.tid })"
								v-if="detail.status_text === '待收货' && !item.after_sales_status"
							>
								申请退款
							</view>
							<view @tap="toLink('/pagesA/user/order/aftersalesLists')" v-if="item.after_sales_status" class="sale border-radius5px border-666 col-666">
								查看售后进度
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="mt-md ml-md mr-md p-md bc-fff border-radius5px fxBox2" v-if="detail.GroupOrder">
			<view v-if="detail.GroupOrder.status === 1">
				<view class="col-666 text-md mb-sm">还差{{ detail.GroupOrder.group_number - detail.GroupOrder.group_count }}人拼团成功</view>
				<view class="fxBox1 group-time">
					<view v-if="groupFail">
						<text class="col-red">该团已失效</text>
						<uni-countdown :second="time"></uni-countdown>
					</view>
					<view v-else>
						<text>拼团进行中</text>
						<uni-countdown :second="time" @timeup="activityTimeup"></uni-countdown>
					</view>
				</view>
			</view>
			<view v-else-if="detail.GroupOrder.status === 0 || detail.GroupOrder.status === 3">拼团失败</view>
			<view v-else>拼团成功</view>

			<view class="userImgBox">
				<view class="imgs">
					<view class="group-img" v-for="(user, imgIndex) in detail.GroupOrder.group_users"><image :src="user.wechat_head_img"></image></view>
					<view class="group-icon" v-if="detail.GroupOrder.status === 1"><image src="../../../static/images/adduser.png"></image></view>
				</view>
			</view>
		</view>
		<view class="mt-md detail-price p-md border-radius5px bc-fff  ml-md mr-md">
			<view v-if="detail.GroupOrder">
				<view class="fxBox2 mb-md" v-if="detail.pick_code && detail.GroupOrder.status === 2">
					<text>商品提货码</text>
					<text>{{ detail.pick_code }}</text>
				</view>
			</view>
			<view v-else>
				<view class="fxBox2 mb-md" v-if="detail.pick_code">
					<text>商品提货码</text>
					<text>{{ detail.pick_code }}</text>
				</view>
			</view>

			<view class="fxBox2 mb-md">
				<text>商品总额</text>
				<text>￥{{ detail.total_fee }}</text>
			</view>
			<!--<view class="fxBox2 mb-md">-->
			<!--<text>优惠券</text>-->
			<!--<text class="col-red">-￥30.00</text>-->
			<!--</view>-->
			<view class="fxBox2 mb-md">
				<text>运费</text>
				<text>￥{{ detail.post_fee }}</text>
			</view>
			<view class="fxBox2 mb-md" v-if="detail.obtain_point_fee > 0 && detail.trade_order[0].after_sales_status != 'SUCCESS'">
				<text>{{detail.point_unit}}增加</text>
				<text>{{ detail.obtain_point_fee }}</text>
			</view>
			<view class="fxBox2 mb-md" v-if="detail.discount_fee > 0">
				<text>优惠金额</text>
				<text>-￥{{ detail.discount_fee }}</text>
			</view>
			<view class="fxBox2 mb-md" v-if="detail.consume_point_fee > 0">
				<text>{{detail.point_unit}}消耗</text>
				<text>-{{ detail.consume_point_fee }}</text>
			</view>
			<view class="fxBox2 mb-md" v-if="detail.points_fee > 0">
				<text>{{detail.point_unit}}抵扣</text>
				<text>¥{{ detail.points_fee }}</text>
			</view>
			<view class="fxBox2">
				<text>实付款</text>
				<view>
					<text class="col-theme-red">￥{{ detail.amount }}</text>
					<text v-if="detail.consume_point_fee > 0">+{{ detail.consume_point_fee }}{{detail.point_unit}}</text>
				</view>
			</view>
		</view>
		<view class="mt-md detail-price p-md border-radius5px bc-fff  ml-md mr-md">
			<view class="mb-md fw700">订单信息</view>
			<view class="mb-md">
				<text>订单备注：</text>
				<text v-if="detail.buyer_message !== null">{{ detail.buyer_message }}</text>
				<text v-else></text>
			</view>
			<view class="mb-md">
				<text>订单编号：</text>
				<view class="col-red fxBox1"><view class="mr-lg">{{ detail.tid }} </view> <view @tap="copeCode" style="color:#096dd9">复制</view></view>
				<!-- <text class="col-red">{{ detail.tid }}</text> -->
			</view>
			<view class="mb-md">
				<text>下单时间：</text>
				<text>{{ detail.created_at }}</text>
			</view>
			<view class="mb-md" v-if="detail.pay_time">
				<text>支付时间：</text>
				<text>{{ detail.pay_time }}</text>
			</view>
			<view class="mb-md write-time-box" v-if="detail.activity_sign === 'point_goods'">
				<text class="box-label">自提有效时间：</text>
				<text class="box-content">{{ detail.write_off_time || '' }}</text>
			</view>
			<view class="mb-md">
				<text>配送方式：</text>
				<text>{{ detail.pick_type_name }}</text>
			</view>
			<view v-if="detail.pick_type">
				<text>完成时间：</text>
				<text>{{ detail.end_time || '未自提：请在规定时间内完成自提' }}</text>
			</view>
			<view class="mb-md" v-if="detail.add_remarks">
				<text>追加备注：</text>
				<text>{{ detail.add_remarks }}</text>
			</view>
		</view>
		<view class="wait-tip-wrap" v-if="detail.status === 'WAIT_BUYER_PAY'">
			<view class="wait-tip pl-md">
				<text class="iconfont icon-info"></text>
				<text class="col-666 text-sm">库存紧张，请尽快支付～</text>
			</view>
		</view>
		<view class="footer-btns fxBox2">
			<view class="btn border-radius5px border-666 col-666" @tap="callUp">联系客服</view>
			<view class="fxBox1">
				<view class="fxBox1" v-if="!btnIf">
					<view
						@tap="cancelTid(detail.tid)"
						v-if="(detail.status_text === '待付款' || detail.status_text === '待发货') && detail.cancel_text === '无取消' && detail.is_allow_cancel !== false"
						class="btn border-radius5px border-666 col-666 ml-md"
						@click="showPopup = true"
					>
						取消订单
					</view>
					<view v-if="detail.cancel_text !== '无取消'">{{ detail.cancel_text }}</view>
					<view @click="paymentOrder(detail.payment_id, detail.group_sign)" class="btn border-radius5px border-red col-red ml-md" v-if="detail.status_text === '待付款'">
						去支付
					</view>
					<view @tap="receiptOrder(detail.tid)" class="btn border-radius5px ml-md border-red col-red" v-if="detail.status === 'WAIT_BUYER_CONFIRM_GOODS'">确认收货</view>
					<view @tap="toEvaluate(detail.tid)" class="btn border-radius5px border-red col-red ml-md" v-if="detail.status === 'TRADE_FINISHED' && detail.buyer_rate !== 1">
						去评价
					</view>
				</view>
				<button open-type="share" v-if="detail.GroupOrder && detail.GroupOrder.status === 1 && detail.Group" class="btn border-radius5px border-red col-red ml-md">
					邀请好友拼团
				</button>
			</view>
		</view>
		<view class="code-popup" v-if="detail.ziti_qrcode">
			<uni-popup ref="codePop">
				<view class="text-md fxBox2" @tap="hideCode">
					<text>自提订单提货码凭证</text>
					<text class="emfont icon-close"></text>
				</view>
				<view class="pt-md pb-md mt-md mb-md" style="border-top:1px solid #D7D7D7;border-bottom:1px solid #d7d7d7">
					<view>
						<view class="text-center">
							<view class="mb-sm">商品提货码：{{ detail.pick_code }}</view>
							<view class="qrcodeItem">
								<view v-if="!codeSrc">提货码生成中...</view>
								<!-- <canvas v-if="!codeSrc" canvas-id="qrcode" :style="{ width: qrcode_w + 'px', height: qrcode_w + 'px' }"></canvas> -->
								<image v-else :src="codeSrc" mode="" class="maximg"></image>
							</view>
						</view>
						<view class="mb-sm">
							<text class="mr-xs">提货人:</text>
							{{ detail.receiver_name }}
						</view>
						<view class="mb-sm">
							<text class="mr-xs">联系电话：</text>
							{{ detail.receiver_tel }}
						</view>
						<view>
							<text class="mr-xs">提货地址：</text>
							{{ detail.receiver_address }}
						</view>
					</view>
				</view>
				<view>
					<view class="mb-sm">
						<text class="mr-xs">商品名称：</text>
						{{ detail.trade_order[0].goods_name }}
					</view>
					<view>
						<text class="mr-xs">实付金额：</text>
						￥{{ detail.amount }}
					</view>
				</view>
			</uni-popup>
		</view>
		<view class="cancel-popup">
			<van-popup :show="showPopup" position="bottom">
				<view class="text-center fw700 text-lg title mb-md fxBox1">
					<view class="fx1 text-center">取消订单</view>
					<view class="emfont icon-close text-lg" @tap="closeModel"></view>
				</view>
				<view class="mb-md text-md col-666">请选择取消原因</view>
				<van-radio-group :value="cancel.cancel_reason" @change="cancelChange">
					<view v-for="(item, index) in columns" class="fxBox2 pt-sm pb-sm text-md" @tap="cancelClick(index)">
						<text class="fx1">{{ item }}</text>
						<van-radio checked-color="#e64340" :name="item"></van-radio>
					</view>
				</van-radio-group>
				<view class="cancel-button fxBox">
					<view @tap="closeModel" class="fx1 btn1 btn">暂不取消</view>
					<view class="fx1 btn2 btn" @click="submitCancel">确认取消</view>
				</view>
			</van-popup>
		</view>
	</view>
</template>

<script>
import { toPayment, confirmOrder } from './orderFun';
import tool from '../../../static/base/toolFun.js';
// import qrCode from '../../static/qrcode/weapp-qrcode';
const columns = ['不想买了', '重复下单', '订单有误', '其它原因'];
import uniCountdown from '@dcloudio/uni-ui/lib/uni-count-down/uni-count-down.vue';
import uniPopup from '@dcloudio/uni-ui/lib/uni-popup/uni-popup.vue';

export default {
	components: {
		uniCountdown,
		uniPopup
	},
	onShareAppMessage: function(res) {
		const _this = this;
		if (res.from === 'button') {
			console.log('来自页面内转发按钮');
			console.log(_this.groups_bn);
		} else {
			console.log('来自右上角转发菜单');
		}
		return {
			title: '邀你来拼团',
			path: '/pagesB/activity/groupDetail?groups_bn=' + _this.groups_bn,
			imageUrl: _this.detail.trade_order[0].goods_image,
			success: res => {
				console.log('转发成功', res);
			},
			fail: res => {
				console.log('转发失败', res);
			}
		};
	},
	data() {
		return {
			loadOver: false,
			showCode: false,
			btnIf: false,
			columns,
			showPopup: false,
			cancelRadio: '',
			tid: '',
			detail: {},
			showTime: false,
			time: 0,
			groups_bn: '',
			cancel: {
				tid: '',
				cancel_reason: ''
			},
			close_time: 0,
			logStep: {
				name: '',
				time: ''
			},
			qrcode_w: uni.upx2px(300),
			statusIcon: '',
			address: '',
			groupFail: false,
			codeSrc: ''
		};
	},
	onLoad: function(option) {
		this.tid = option.tid;
		uni.hideShareMenu();
		// uni.showLoading({
		// 	title: '加载中... '
		// });
	},
	onShow() {
		this.getDetail();
	},
	methods: {
		// 倒计时结束
		activityTimeup(){
			this.getDetail();
		},
		copeCode(){
	        uni.setClipboardData({
	          data: String(this.detail.tid),
	          success: function(res) {
	            uni.getClipboardData({
	              success: function(res) {
	                uni.showToast({
	                  title: '已复制到剪贴板'
	                });
	              }
	            });
	          }
	        })
      	},
		getDatetime() {
			let d = new Date();
			let year = d.getFullYear();
			let month = change(d.getMonth() + 1);
			let day = change(d.getDate());
			let hour = change(d.getHours());
			let minute = change(d.getMinutes());
			let second = change(d.getSeconds());

			function change(t) {
				if (t < 10) {
					return '0' + t;
				} else {
					return t;
				}
			}

			let time = year + '/' + month + '/' + day + ' ' + hour + ':' + minute + ':' + second;

			return time;
		},
		showCodeEwm() {
			if (this.detail.GroupOrder) {
				if (this.detail.GroupOrder.status !== 2) {
					this.showAlert('拼团还未成功！');
					return;
				}
			}
			this.$refs.codePop.open();
			let _this = this;
			this.showCode = true;
			//2020-5-14 15:53:52 使用后端传二维码
			// setTimeout(() => {
			// 	uni.canvasToTempFilePath({
			// 		destWidth: 300,
			// 		destHeight: 300,
			// 		canvasId: 'qrcode',
			// 		success: function(res) {
			// 			_this.codeSrc = res.tempFilePath;
			// 		},
			// 		fail: function(err) {
			// 			console.log(err);
			// 		}
			// 	});
			// }, 100);
		},
		getTime(time) {
			let now_time = tool.toTimeStamp(tool.toFullTime()) / 1000;
			let end_time;
			if(time){
				end_time = tool.toTimeStamp(time) / 1000;
			}else{
				end_time = 0
			}
			return end_time - now_time;
		},
		//2020-5-14 15:53:52 使用后端传二维码
		// zitiCode(code) {
		// 	console.log(code);
		// 	new qrCode('qrcode', {
		// 		text: code,
		// 		width: this.qrcode_w,
		// 		height: this.qrcode_w,
		// 		colorDark: '#333333',
		// 		colorLight: '#FFFFFF'
		// 	});
		// },
		callUp() {
			if (!this.detail.shop_info.shop_phone) {
				this.showAlert('该店铺暂未设置客服电话，请到我的-联系客服');
				return;
			}
			uni.makePhoneCall({
				phoneNumber: this.detail.shop_info.shop_phone
			});
		},
		toEvaluate(tid) {
			this.toQueryLink('/pagesA/user/order/evaluate', {
				tid: tid
			});
		},
		receiptOrder(id) {
			confirmOrder(id, this.callBack);
		},
		paymentOrder(id, group_sign) {
			toPayment(id, group_sign);
		},
		callBack() {
			this.getDetail();
		},
		submitCancel() {
			if (this.cancelRadio === '') {
				this.showAlert('请选择取消原因');
				return;
			}
			this.$http({
				aurl: 'cancelOrder',
				data: this.cancel,
				success: res => {
					if (res.data.code === 0) {
						this.getDetail();
						this.showPopup = false;
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		cancelTid(tid) {
			this.cancel.tid = tid;
			this.showPopup = true;
		},
		closeModel() {
			this.cancelRadio = '';
			this.showPopup = false;
		},
		cancelChange(index) {
			console.log(index,8989)
			this.cancelRadio = String(index.detail);
			console.log(this.cancelRadio,999)
			this.cancel.cancel_reason = this.columns[index.detail];
		},
		cancelClick(index) {
			this.cancelRadio = String(index);
			this.cancel.cancel_reason = this.columns[index];
		},
		getLog() {
			this.$http({
				aurl: 'getLogisticsInfo',
				params: {
					tid: this.tid
				},
				success: res => {
					if (res.data.code === 0) {
						if (res.data.result.logisticsInfo.traces) {
							this.logStep.name = res.data.result.logisticsInfo.traces[res.data.result.logisticsInfo.traces.length - 1].remark;
							this.logStep.time = res.data.result.logisticsInfo.traces[res.data.result.logisticsInfo.traces.length - 1].operatingTime;
						}
					}
				},
				fail: error => {
					console.log(error);
				}
			});
		},
		getDetail() {
			this.$http({
				aurl: 'orderDetail',
				params: {
					tid: this.tid
				},
				success: res => {
					if (res.data.code === 0) {
						let result = res.data.result;
						this.detail = result;
						this.loadOver = true;
						this.statusIcon = `../../../static/images/${this.detail.status}.svg`;
						this.address = `${result.receiver_province}${result.receiver_city}${result.receiver_county} ${result.receiver_address}`;
						if (this.detail.GroupOrder) {
							this.groups_bn = this.detail.GroupOrder.groups_bn;
							this.time = this.getTime(result.GroupOrder.end_time);
							this.showTime = true;
							if (!this.detail.Group) {
								this.groupFail = true;
							}
						}
						if (this.detail.invoice_no) {
							this.getLog();
						}
						if (this.detail.status === 'WAIT_BUYER_PAY') {
							if (this.detail.trade_close_end_time) {
								this.close_time = this.getTime(this.detail.trade_close_end_time);
							}
						}
						for (let i = 0; i < this.detail.trade_order.length; i++) {
							const item = this.detail.trade_order[i];
							if (item.after_sales_status) {
								this.btnIf = true;
								if (item.after_sales_status === 'SELLER_REFUSE_BUYER' || item.after_sales_status === 'SELLER_SEND_GOODS') {
									this.btnIf = false;
									return;
								}
							}
						}
						if (this.detail.ziti_qrcode) {
							this.codeSrc = this.detail.ziti_qrcode_url;
							//使用后端二维码2020-5-14 15:55:30
							// this.zitiCode(this.detail.ziti_qrcode);
						}
					}
				},
				fail: error => {
					console.log(error);
				},
				complete: () => {
					uni.hideLoading();
				}
			});
		},
		hideCode() {
			this.showCode = false;
			this.$refs.codePop.close();
		}
	},
	mounted() {}
};
</script>

<style scoped lang="stylus">
.write-time-box
	display flex
	line-height 36rpx
	.box-label
		flex-shrink 0
	.box-content
		word-break break-all
.closeTime
	>>>.uni-countdown
		padding 0 !important
		font-size 32rpx !important
		align-items center
		.uni-countdown__splitor
			cpadding 0 !important
			margin 0 !important
			font-size 32rpx !important
		.uni-countdown__number
			border none !important
			padding 0 !important
			margin 0 !important
			font-size 32rpx !important
.group-time
	>>>.uni-countdown
		background #333
		padding 0 4px !important
		border-radius 8rpx
		margin-left 10rpx
		.uni-countdown__splitor
			color #fff !important
		.uni-countdown__number
			background transparent !important
			border none !important
			padding 0 !important
			margin 0 !important
			color #fff !important
.userImgBox
	.imgs
		display flex
		.group-img
			height 60rpx
			width 60rpx
			overflow hidden
			padding 1rpx
			box-sizing border-box
			border-radius 50%
			background #ea4a47
			overflow hidden
			image
				height 100%
				width 100%
				border-radius 50%
		.group-img:not(:first-child)
			margin-left -20rpx
		.group-icon
			height 60rpx
			width 60rpx
			margin-left -20rpx
			image
				width 100%
				height 100%
				border-radius 50%
/*.code-popup>>>.uni-popup__wrapper.uni-custom.center .uni-popup__wrapper-box*/
.code-popup>>>.uni-popup__wrapper-box
	width 80%
	border-radius 10rpx
	background #fff
	padding 30rpx
.qrcode-iconBox
	margin 0 70rpx 0 20rpx
	text-align center
	.qrcode-icon
		font-size 70rpx
.order-detail
	padding-bottom 120rpx
.detail-header
	height 300rpx
	background #eb3c3c
	color #fff
	display flex
	justify-content space-between
	.detail-icon
		font-size 160rpx
	.detail-status
		margin-top 90rpx
		line-height 40rpx
	.icon-svg
		height 150rpx
		width 150rpx
	.fxBox2
		width 100%
		padding 0 130rpx 70rpx 46rpx
.detail-bg
	width 100%
	height 36rpx
	background block
	margin-top -1px
.detail-add
	position relative
	z-index 1
.order-info
	margin 0 25rpx
	background #fff
	border-radius 10rpx
	overflow hidden
	.gm-name
		margin-left 20rpx
		height 85rpx
		line-height 85rpx
		border-bottom 1rpx solid #D7D7D7
		font-size 28rpx
		font-weight 500
		color #333
	.order-shop
		padding 0 20rpx
		height 80rpx
		image
			width 50rpx
			margin-right 20rpx
			border-radius 50%
	.order-goods
		padding 20rpx 20rpx
		display flex
		.imgBox
			width 160rpx
			margin-right 20rpx
			image
				border-radius 10rpx
				width 100%
		.order-goods-text
			padding 10rpx 0
			box-sizing border-box
			.order-goods-tit
				display flex
				justify-content space-between
.footer-btns
	position fixed
	height 100rpx
	width 100%
	background #ffffff
	bottom 0
	left 0
	box-sizing border-box
	padding 0 20rpx
	.btn
		padding 0 20rpx
		height 60rpx
		line-height 60rpx
.cancel-popup>>>.van-popup
	padding 30rpx 30rpx 350rpx
	.cancel-button
		height 90rpx
		position absolute
		bottom 0
		left 0
		width 100%
		.btn
			height 90rpx
			line-height 90rpx
			text-align center
			color #ffffff
		.btn1
			background #f8952f
		.btn2
			background #e64340
.sale
	display inline-block
	padding 0 20rpx
	height 60rpx
	line-height 60rpx
.page_fixed
	position fixed
	width 100%
	height 100%
	left 0
	top 0
.wait-tip-wrap
	height 70rpx
.wait-tip
	background #FAF5CF
	line-height 70rpx
	position fixed
	width 100%
	height 70rpx
	bottom 100rpx
	left 0
	text
		display inline-block
		vertical-align middle
		margin-right 10rpx
.qrcodeItem
	display inline-block
	margin 30rpx 0
	image
		width 300rpx
		height 300rpx

</style>
