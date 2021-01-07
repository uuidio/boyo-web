<style scoped>
.tabbarMain{
	height: 88upx;
	position: fixed;
	z-index: 9999;
	width: 750upx;
	flex: 1;
	bottom: 0;
}
.cart-num{
   position:absolute;
   height:40rpx;
   width:40rpx;
   line-height:40rpx;
   text-align:center;
   color:#fff;
   background:#ff7370;
   border:1px solid #ffffff;
   border-radius:50%;
   top:0rpx;
   right:24rpx;
 }
.tabbarMainIphone{
	height: 88upx;
	padding-bottom: 64upx;
}
.tabBtnMina{
	width: 750upx;
	height: 88upx;
	position: absolute;
	z-index:2;
	bottom:0;
	flex-direction: row;
	/* #ifndef */
	padding-bottom: constant(safe-area-inset-top);
	padding-bottom: env(safe-area-inset-top);
	/* #endif */
	display: flex;
	background-color: #FFFFFF;
}
.tabBtnMinaIphone{
	height: 88upx;
	padding-bottom: 64upx;
}
.imgse{
	width: 48upx;
	height: 48upx;
}
.txtBtn{
	font-size: 22upx;
	color: #666666;
}
.txtBtnSel{
	font-size: 22upx;
	color: #333333;
}
.itmMain{
	/* width: 250upx; */
	width: 150upx;
  position: relative;
	justify-content: center;
	align-items: center;
	display: flex;
	flex-direction: column;
}
.imgseTs{
	width: 150upx;
	height: 140upx;
	margin-bottom: 90upx;
	position: relative;
	z-index:1;
	bottom: 0upx;
}

.btnfixMin{
	width: 96rpx;
	height: 96rpx;
	position: absolute;
	z-index: 3;
	bottom: 0;
	left: 50%;
	transform: translateX(-50%);
}
.btnfixMinIphone{
	bottom:64upx;
}
.fixTpm{
	width: 150upx;
	height: 140upx;
	flex-direction: row;
	justify-content: center;
	align-items: center;
	position: relative;
	z-index:0;
}
.imgseTsAnds{
	width: 150upx;
	height: 150upx;
	position: fixed;
	z-index:1;
	bottom: 10upx;
	left: 50%;
	border-radius: 150upx;
	transform: translateX(-50%);
}
</style>


<!-- 
    此版本需要注意
		1、如果此项目有地图模块功能的话   整个底部建议使用<cover-view><cover-image>进行标签改版      或者判断如果当前点击等于地图模块功能时候，却换成<cover-view><cover-image>进行原生渲染
 -->
 
<template>
	<view class="tabbarMain" :class="[flagTypeInfo? 'tabbarMainIphone':'']">
		<!-- 中间突起按钮 -->
		<image src="/static/images/tabbar/get_app.png" :fade-show='false' class="btnfixMin" :class="[flagTypeInfo? 'btnfixMinIphone':'']" mode="" @click.stop="switchTabFunc(2, '')"></image>
		<view class="tabBtnMina"  :class="[flagTypeInfo? 'tabBtnMinaIphone':'']" mode="">
			<view class="itmMain" @click.stop="switchTabFunc(0, '/pages/index/indexCustomer')">
				<image class="imgse" :fade-show='false' v-if="active!=0" src="/static/images/tabbar/homePage_false.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===0" src="/static/images/tabbar/homePage_true.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==0}">首页</text>
			</view>
			<view class="itmMain" @click.stop="switchTabFunc(1, '/pages/goods/platformClass')">
				<image class="imgse" :fade-show='false' v-if="active!=1" src="/static/images/tabbar/class_false.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===1" src="/static/images/tabbar/class_true.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==1}">分类</text>
			</view>
			<view class="itmMain"></view>
			<view class="itmMain" @click.stop="switchTabFunc(3, '/pages/cart/cart')">
        <view class="cart-num" v-if="cartNum!==0">{{ cartNum }}</view>
				<image class="imgse" :fade-show='false' v-if="active!=3" src="/static/images/tabbar/cart_false.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===3" src="/static/images/tabbar/cart_true.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==3}">购物车</text>
			</view>
			<view class="itmMain" @click.stop="switchTabFunc(4, '/pages/user/index')">
				<image class="imgse" :fade-show='false' v-if="active!=4" src="/static/images/tabbar/my_false.png"></image>
				<image class="imgse" :fade-show='false' v-if="active===4" src="/static/images/tabbar/my_true.png"></image>
				<text class="txtBtn" :class="{'txtBtnSel' :active==4}">我的</text>
			</view>
		</view>
	</view>
</template>

<script>
export default{
	data(){
		return{
			active: 0, // 当亲选择那个按钮
			platforms: '', // 终端调整兼容
			leftWidth: 0, // 安卓 端使用
			flagTypeInfo: false, // 检测当前是否是IPHONE 异形屏幕
      cartNum:0,
		}
	},
  computed:{
  },
  watch:{
  },
	mounted() {
		this.flagTypeInfo = this.$is_bang;
		let tempSystem = uni.getSystemInfoSync()
		this.platforms = tempSystem.platform
		// #ifdef APP-NVUE || APP-PLUS || APP-PLUS-NVUE ||APP-VUE
		if(this.platforms == 'android'){
			let temp = this.$refs.leftWidth
			this.leftWidth = tempSystem.screenWidth / 2
		}
		// #endif
		this.active = this.actives
	},
	props:{
		actives:{
			type: Number,
			default: 0
		},
	},
	inject:[], // 父级传递过来的函数
	methods:{
		/**
		 * @name 初始化当前点击索引
		 * 解决初始化闪烁图标问题
		 * */ 
		getSetting(numbers){
			this.active = numbers || 0;
		},
		/**
		 * @name tab点击事件
		 * @param {number} index 当前点击的索引
		 * @param {string} Urls 当前点击带进来的链接
		 * */
		initCartNumber(){
      let tempToken = uni.getStorageSync('user_token');
      if(!tempToken){
        this.cartNum = 0;
        return;
      }
      this.$http({
        aurl: 'getCarNum',
        success: res => {
          let num = 0;
          if (res.data.result.num <= 99) {
            num = res.data.result.num;
          } else {
            num = '99+';
          }
          this.cartNum = num;
        },
        fail: error => {
          console.log(error);
        },
      });
    },
		switchTabFunc(index, Urls) {
			if(index != 2){
				// uni.setStorageSync('setStatusIndexFunc', index)
				// this.active = index
				uni.switchTab({
					url: Urls,
				});
				// this._mainFuncInit() // 回调父级函数
			}
			if (index == 2) {
				console.log('弹出自定义')
				uni.navigateToMiniProgram({
				  appId: 'wx248441c47fd36885',
				  // appId: item.appid,
				  // path: 'pages/launch/index?id=087ee045-0e4b-4cb6-a95b-4cd95d902a04&url=%2fmodules%2fparking%2fpages%2fhome%2findex',
				  success: result => {
				    console.log(result);
				  },
				  fail: err => {
				    console.log(err);
				  },
				  complete: () => {}
				});
			} 
		}
	}
}
</script>
