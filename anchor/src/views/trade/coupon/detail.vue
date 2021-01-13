<template>
<div class="content">
	<div class="mr24">
			<div class="det-goods">
				优惠券名称：<span>{{couponDetail.name}}</span>
			</div>
			<div class="det-goods">
				优惠券描述：<span>{{couponDetail.desc}}</span>
			</div>
			<div class="det-goods">
				优惠券信息：
				<span v-if="couponDetail.type == 1">满 {{couponDetail.origin_condition}} 减 {{couponDetail.denominations}}</span>
			</div>
			<a-row style="line-height: 35px;flex:1;font-size:14px">
  			<a-col :xs="24" :md="8" > 
			<span>核销码：</span>
			<div class="det_code">
				<a-input :disabled="true" class="input_style"  v-model="couponDetail.bn"/>
				<div class="code_tip">核销码有效</div>
			</div>	
			<span>客户手机号：</span>
			<div>
				<a-input :disabled="true" class="input_style"  v-model="couponDetail.user_mobile"/>
			</div>
			<span>小票号：</span>
			<div>
				<a-input  class="input_style" placeholder="请输入小票号" v-model="forItem.trade_no"/>
			</div>
			<span>备注：</span>
			<div>
				<a-input  class="input_style" placeholder="备注" v-model="forItem.remark"/>
			</div>
			<span>上传凭证：</span>
			<div>
				<a-button
	              class="btn_style ml10 mr10"
	              type="primary"
	              @click="sweepCode"
	              >拍照上传</a-button
	            >	
				<UploadImage :defaultImageList="imageLists" :maximum="1" ref="uploadImageLists"></UploadImage>
			</div>
			<div class="btnBox">
				<a-button @click="$router.back(-1)" class="ml10" type="danger" style="margin-right: 20px">返回</a-button>

				<a-button type="primary" @click="confirmBtn()">核销</a-button>
			</div>
  			</a-col>
			</a-row>
			<a-modal title="核销" v-model="deliveVisible" @ok="deliveHandleOk">
				<div class="succ_tip">
					<div class="tip-iconfont"><a-icon type="check" class="iconfont"/></div><div class="tip_desc">核销成功</div>
				</div>
				<div class="tip-content">
					<div class="tip_text">优惠券名称：{{couponDetail.name}}</div>
					<div class="tip_text">优惠券信息：{{couponDetail.desc}}</div>
					<div class="tip_text">核销码：{{couponDetail.bn}}</div>
					<div class="tip_text">小票号：{{forItem.trade_no}}</div>
					<div class="tip_text">备注：{{forItem.remark}}</div>
					<div class="tip_img"><span>上传凭证：</span><img :src="forItem.voucher"/></div>
				</div>
			</a-modal>
	</div>
</div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';
export default {
  name: 'detail',
  computed: {
    ...mapState({
      couponDetail: state => state.trade.couponDetail,
      weixinUploadImage: state => state.trade.weixinUploadImage,
    }),
  },
  components: {
    UploadImage,
  },
  data() {
    return {
		deliveVisible: false,
		stepCurrent: 0,
		data: [],
		page: false,
		isWeixin:false,
		imageLists: [],
		minmun: 1,
		forItem:{
			trade_no:'',
			remark:'',
			bn:'',
			user_mobile:'',
			voucher:''
		}
    };
  },
  methods: {
	  	...mapActions({
	      wirtdOffCoupon: "trade/wirtdOffCoupon",
	      weixinCode3: "trade/weixinCode3"
	    }),
		confirmBtn(){
			this.forItem.bn=this.couponDetail.bn
			this.forItem.user_mobile=this.couponDetail.user_mobile
			// console.log(this.$refs.uploadImageLists.uploadImageList);
			if (this.$refs.uploadImageLists.uploadImageList.length > 0) {
				if(this.$refs.uploadImageLists.uploadImageList[0].response){
					this.forItem.voucher=this.$refs.uploadImageLists.uploadImageList[0].response.result.pic_url;
				}else{
					this.forItem.voucher=this.$refs.uploadImageLists.uploadImageList[0].url;
				}
			}
			// console.log(this.forItem);
			this.wirtdOffCoupon({InfoObj:this.forItem,callBack:this.showModel});
		},
		showModel(){
			this.deliveVisible = true
		},
		deliveHandleOk(){
			this.deliveVisible = false
			const jumpUrl = `/trade/coupon/writeoff`;
      		this.$router.push({ path: jumpUrl });
		},
		callbackImage(){
			console.log(this.weixinUploadImage)
			this.imageLists = [{ url: this.weixinUploadImage.pic_url, status: 'finished' }];
		},
		sweepCode() {
		  const test = encodeURIComponent(location.href.split("#")[0]);
	      this.weixinCode3({
	        api: ["chooseImage","uploadImage"],
	        url: test,
			callback: this.callbackImage,
	      });
	    }

  },
  mounted() {
  	let ua = navigator.userAgent.toLowerCase();
  	if ((/micromessenger/.test(ua))) {
  		this.isWeixin = true;
  		console.log('我是微信')
  	}else{
  		console.log('我no是微信')
  	}

    // if(navigator.userAgent.indexOf('Android') > -1 || navigator.userAgent.indexOf('Linux') > -1)
    // {
    // 	this.Android = true;
    // }
  },
  watch: {
    
  },
};
</script>

<style scoped lang="stylus">
.det-goods{
	line-height 35px
	font-size 14px
	color #666
}
.btn_style
	margin-bottom 10px
.btnBox
	margin-top 20px
.det_code
	position relative
	.code_tip
		position absolute
		right 10px
		top 0px
		font-size 14px
		color green	
.succ_tip
	text-align center
	padding 0 0 30px 0
	display flex
	align-items center
	justify-content: center;
	.tip_desc
		font-size 18px
		font-weight bold
	.tip-iconfont
		width 45px
		height 45px
		border-radius 50%
		display flex
		align-items center
		justify-content: center;
		color #ffffff
		background-color green
		margin-right 10px
		.iconfont
			color #fff
			font-size 24px	
.tip-content
	line-height 35px
	font-size 14px
	.tip_text
		position relative
	.tip_img
		position relative
		img 
			width 60px
			height 60px			
</style>
