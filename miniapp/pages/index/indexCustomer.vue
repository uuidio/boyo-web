<template>
	<view style="padding-bottom: 88rpx;" :style="{ paddingTop: myHeight + 37 + 'px'}">
		<view>
		<view class="boxHeight">
		<view class="index-box">
			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px'}">
				<view class="index-head" :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">
					<text class="my-text mt-md">极汇Go</text>
				</view>
			</view>
      <view v-if="shop_lists.length > 0" class="search_box" :style="{ position: 'fixed',zIndex: 999999, top: myHeight + 'px'}">
			  <view class="search_box_l" @click="jump">
			    <image src="../../static/icon/icon-triangle-down.png" class="icon-triangle"></image>
			    <view class="my-text">{{sltIndexItem.name}}</view>
			  </view>
			  <view class="search_box_r">
			    <text class="emfont icon-search mr-md"></text>
			    <input class="ser-input" type="text" value="搜索" disabled @tap="search"/>
			  </view>
      </view>
		<view class="pos-re100">
			<indexView :dataLists="lists"></indexView>
		</view>
		</view>
		<view class="fixedImg" v-if="showA">
			<view class="pos-re w100">
				<view class="imgBox"><image :src="alertItem.pop_url.value.image_url" mode="widthFix" @tap="toAlertLink"></image>
				<view class="closeItem fxBox1">
					<text class="mr-md text-md">{{ alertItem.pop_time.value }}s</text>
					<text @click.stop="closeAlert" class="emfont icon-round_close_light"></text>
				</view>
			</view>
		</view>
		</view>
		</view>
		</view>
    <van-popup :show="showPopup" :z-index="999999" class="integral-popup" @click-overlay="closeIntegralPopup">
      <view class="popup-main">
        <img mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202005/19/LvgIVJMjCwllF9N00X3MPaDxIEuoZlQUFvhw7cyS.png" alt="" class="popup-bg">
        <view class="icon-close-box">
          <image src="https://egoss1.ytholidayplaza.com/images/default/202005/19/CkTVkodtMn6zyIhb8hqdW0AeSuRa4rvWvW8OcMFK.png" @click="closeIntegralPopup" class="close-icon"></image>
        </view>
        <view class="popup-tit">恭喜获得</view>
        <view class="integral-box">
          <view class="integral-num">
            <text>{{rewardPoint}}</text>
            <text class="integral-unit">积分</text>
          </view>
          <view class="integral-label">领取后，请到【我的】-【积分】中查看</view>
        </view>
        <view class="btn-box">
          <image @click="rewardPoints" class="btn-img" mode="widthFix" src="https://egoss1.ytholidayplaza.com/images/default/202005/19/6AtnmaMqBoeVUUwmOOfCO5JYOSUlr6UBWhNrZweC.png"></image>
        </view>
      </view>
    </van-popup>
    <!--添加程序引导-->
    <van-popup :show="showGuidePopup" overlay-style="background:transparent" :custom-style="'top:' + guidePopupTop +'px;right:'+guidePopupRight+'px;'" position="right" :z-index="999999" class="guide-popup" @click-overlay="() => (showGuidePopup = false)">
      <view class="popup-main">
        <view class="popup-header">
          <view class="triangle" :style="'right:'+ guideTriangleRight+'px'"></view>
        </view>
        <view class="popup-content p-md">
          <view class="text-base text-center">点击“添加到我的小程序”</view>
          <view class="text-base text-center"> 随时随地享优惠</view>
        </view>
      </view>
    </van-popup>
    <tab-bar ref="tabbar" class="tab-bar-fixs" :actives='0'></tab-bar>
  </view>
</template>

<script>
  import indexView from '../../components/editTemps/indexView'
  import redirect from '../../mixins/redirect.js';
  import global from '../../mixins/global.js';
  import cartNum from '../../mixins/cartNum';
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import recommendGoods from '../../components/lists/recommendGoods';
  import tabBar from '../../components/tabbar/tabbar.vue';

  export default {
    mixins: [redirect, global,cartNum],
    components:{
      indexView,
      uniLoadMore,
      recommendGoods,
      tabBar
    },
    data() {
      return {
        addrAuthorization: false,
				agent:'',
				agent_id:'',
        showGuidePopup: false,
        rewardPoint: '',
        showPopup: false,
        showA: false,
        onLoadCount: 0,
        optionToken: '',
        gmToken: '',
        currentClassify: '',
        loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '暂无更多数据' },
        loadStatus: 'loading',
        loadMore: {
          current: 1,
          last: 1,
          flat: false
        },
        indexItemShow: false,
        sltIndexItem: {
          name: '',
          id: ''
        },
        indexItems: [],
        lists:[],
        timeOut: '',
        x: 500,
        y: 500,
        alertItem:{},
        scrollTop:0,
        boxHeight:0,
        topHeight:0,
        lng: '',
        lat: '',
        shop_lists:[],
        isProject:'',
      };
    },
    onLoad:function(options){
      if(options.isProject){
        this.isProject = options.isProject;
      }
      uni.hideTabBar();
			if(options.t){
				uni.setStorage({
					key: 'source',
					data:options.t,
					success: function () {
					}
				});
				uni.setStorage({
					key: 'pid',
					data:options.p,
					success: function () {
					}
				});
				this.agent_id = options.p
			}
			else if(options.scene){
				const str = decodeURIComponent(options.scene);
				// console.log(str);
				const strArr = str.split('&');
				// console.log(strArr);
				if(strArr.length===2){
					let t = strArr[0].substring(2);
					const user_id = strArr[1].substring(3);
					if(t==='g'){
						t='goods'
					}
					uni.setStorage({
						key: 'source',
						data:t,
						success: function () {
						}
					});
					uni.setStorage({
						key: 'pid',
						data:user_id,
						success: function () {
						}
					});
					this.agent_id = user_id
				}else{
					let t = strArr[0].substring(7);
					uni.setStorage({
						key: 'bounty',
						data:t,
						success: function () {
						}
					});
				}
			}
      this.isGetLocation();
      // if (uni.getStorageSync('isPerfect')) {
      //   uni.switchTab({
      //     url: '/pages/user/index'
      //   });
      // }
    },
    onShow() {
			const token = uni.getStorageSync('user_token');
      this.getCartNum();
      if(token){
				this.getAgentType();
				if(this.agent_id){
					this.setGoodsRelated();
				}
			}else{
				if(this.agent_id){
					this.toLink('/pagesB/user/bindUser?to=index');
				}
			}
	},
    onReachBottom() {
	},
		onPageScroll: function(e) {
		 //console.log('滚动高度',e.scrollTop,this.boxHeight);
		this.scrollTop= e.scrollTop
		// if(this.boxHeight>0&&this.scrollTop>=this.boxHeight){
		// 	console.log('导航置顶');
		// }
	},
    methods: {
      getCartNum() {
        if(this.$refs.tabbar){
          this.$refs.tabbar.initCartNumber()
        }
      },
      judgeLoad(){ //加载数据前判断
				this.addrAuthorization = false;
				let user_token_invalid = uni.getStorageSync('user_token_invalid');
        let userToken = uni.getStorageSync('user_token');
        if(userToken){
        	// 判断user_token是否失效
          if (user_token_invalid <= new Date().getTime()) {
            uni.removeStorageSync('user_token');
            uni.removeStorageSync('user_info');
          }
        }
        this.getIndexItem();

      },
      getIndexItem(){
        this.getDetail();
      },
      getNearbyProject(){ // 获取附近项目
        const that = this;
        const gmToken = uni.getStorageSync('gmToken');
        const params =  {
          gm_id:gmToken
        };
        if(this.lng){
          params.lng = this.lng;
          params.lat = this.lat;
        }
        this.$http({
          aurl: 'nearbyShopNearby',
          params:params,
          success: res => {
            const result = res.data.result;
            this.shop_lists = result.shop_list;
            if(this.shop_lists.length===0){
              this.showAlert('小程序还没有门店开张，敬请期待！');
              return false;
            }
            const shop_id = uni.getStorageSync('shop_id');
            if(this.lng){
              if(!shop_id){
                uni.setStorageSync('shop_id', result.nearby_shop.shop_id);
                this.sltIndexItem.name = result.nearby_shop.shop_name;
                this.sltIndexItem.id = result.nearby_shop.shop_id;
                that.judgeLoad();
              } else if(shop_id !== result.nearby_shop.shop_id && !this.isProject){
                uni.showModal({
                  title:'温馨提示',
                  content: '定位查询到附近门店为（'+result.nearby_shop.shop_name+'）,设置为当前门店？',
                  success(res){
                    if(res.confirm){
                      uni.setStorageSync('shop_id', result.nearby_shop.shop_id);
                      that.sltIndexItem.name = result.nearby_shop.shop_name;
                      that.sltIndexItem.id = result.nearby_shop.shop_id;
                      that.judgeLoad();
                    }else{
                      const initItem = that.shop_lists.filter((item)=>item.shop_id===shop_id);
                      that.sltIndexItem.name = initItem[0].shop_name;
                      that.sltIndexItem.id = initItem[0].shop_id;
                      that.judgeLoad();
                    }
                  },
                  fail(){
                  }
                })
              }else{
                const initItem = that.shop_lists.filter((item)=>item.shop_id===shop_id);
                that.sltIndexItem.name = initItem[0].shop_name;
                that.sltIndexItem.id = initItem[0].shop_id;
                that.judgeLoad();
              }
            }else{
              uni.setStorageSync('shop_id',this.shop_lists[0]);
              this.sltIndexItem.name = this.shop_lists[0].shop_name;
              this.sltIndexItem.id = this.shop_lists[0].shop_id;
              that.judgeLoad();
            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },
			getAuthorizeInfo(a="scope.userLocation"){  //1. uniapp弹窗弹出获取授权（地理，个人微信信息等授权信息）弹窗
				var that=this;
				uni.authorize({
					scope: a,
					success() { //1.1 允许授权
						that.getLocationInfo();
					},
					fail(){    //1.2 拒绝授权
            wx.showModal({
              title: '温馨提示',
              content: '您已拒绝授权，无法获得周边信息，是否去设置打开？',
              confirmText: "确认",
              cancelText: "取消",
              success: function(res) {
                if (res.confirm) {
									that.addrAuthorization = true;
									wx.openSetting({
                    success: (res) => {
                      if (!res.authSetting['scope.userLocation']) { // 用户没设置打开
                        that.getNearbyProject();
												console.log('客户没确认')
											}else{
												that.getLocationInfo();
												console.log('客户确认了')
											}
											// that.addrAuthorization = false;
										}
                  });
                } else {
                	// 点击了取消
									that.addrAuthorization = false;
									that.getNearbyProject();
                }
              }
            });
					}
				})
			},
			getLocationInfo(){  //2. 获取地理位置
				var that=this;
				uni.getLocation({
					type: 'wgs84',
					success (res) {
						let latitude,longitude;
						that.lat = latitude = res.latitude.toString();
            that.lng = longitude = res.longitude.toString();
            that.getNearbyProject()
					},
          fail(res){
					  // 获取定位失败
            that.getNearbyProject();
          }
				});
			},
			isGetLocation(a="scope.userLocation"){ // 3. 检查当前是否已经授权访问scope属性，参考下截图
				var that=this;
				uni.getSetting({
					success(res) {
						if (!res.authSetting[a]) {  //3.1 每次进入程序判断当前是否获得授权，如果没有就去获得授权，如果获得授权，就直接获取当前地理位置
							that.getAuthorizeInfo()
						}else{
							that.getLocationInfo()
						}
					}
				});
			},

    	setGoodsRelated(){
				console.log('pid'+this.agent_id);
				this.$http({
					aurl: 'setRelated',
					params: {
						pid:this.agent_id
					},
					success: res => {
						console.log(res)
					},
					fail: error => {
						console.log(error);
					}
				});
			},
			getAgentType(){
				this.$http({
					aurl: 'applyCheck',
					success: res => {
						this.agent = res.data.result.apply_status
					},
					fail: error => {
						console.log(error);
					},
					complete:res=>{
					}
				});
			},
	  scroll(e){
			this.scrollTop=e.detail.scrollTop
		},
	  getTop(){
		var query = uni.createSelectorQuery();
		//选择id
		let that=this
		query.select('.boxHeight').boundingClientRect(function (rect) {
			console.log('组件高度',rect.height);
			that.boxHeight=rect.height
		}).exec();
		query.select('.mp-search-box').boundingClientRect(function (rect) {
			that.topHeight=rect.height
		}).exec();
	  },
      openGuidePopup () {
        let guide_invalid = uni.getStorageSync('guide_invalid')
        if(guide_invalid){
          if(guide_invalid >= new Date().getTime()){
            return false;
          }
        }
        // 记录三天后再次弹出
        guide_invalid = new Date().getTime() + 3600*24*1000*3;
        uni.setStorageSync('guide_invalid',guide_invalid);
        this.showGuidePopup = true
      },
      closeGuidePopup () {
        this.showGuidePopup = false
      },
      handleGetPopup(){
        if(uni.getStorageSync('user_token') && uni.getStorageSync('user_token_invalid') > new Date().getTime()){
          this.getPopup(uni.getStorageSync('gmToken'))
        }else{
          this.openGuidePopup()
        }
      },
      rewardPoints(){
        // 新会员领取赠送积分
        this.$http({
          aurl: 'rewardPoints',
          data: {
            gm_id: uni.getStorageSync('gmToken')
          },
          success: res => {
            if (res.data.code === 0) {
              this.closeIntegralPopup();
              uni.showToast({
                title: res.data.message,
                icon: 'none'
              });
            }
          },
          fail: error => {
            console.log(error);
          }
        });

      },
      getPopup(gm_id){
        // 会员弹窗送积分判断
        this.$http({
          aurl: 'isSendPoints',
          data: {
            gm_id: gm_id,
          },
          success: res => {
            if (res.data.code === 0) {
              let result = res.data.result
              if(result.open_status){
                this.rewardPoint = result.point
                this.showIntegralPopup();
              }else{
                this.openGuidePopup();
              }
            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },
      showIntegralPopup () {
        this.showPopup = true
      },
      closeIntegralPopup () {
        this.showPopup = false
        this.openGuidePopup()
      },
      jump(){
        uni.navigateTo({
          url: '/pagesA/index/groupProject',
        });
      },
      search() {
        uni.navigateTo({
          url: '/pagesA/goods/search'
        });
      },
      cancelModel() {
        this.indexItemShow = false;
      },
      getDetail(){
        const shop_id = uni.getStorageSync('shop_id');
        this.$http({
          aurl: 'getTmplInfo',
          params:{
            type:'tmpl',
            page:'shop_home',
            shop_id:shop_id
          },
          success: res => {
            this.lists = res.data.result
          },
          fail: error => {
            this.getAlert();
            console.log(error);
          },
          complete: () => {
            this.getAlert();
          }
        });
      },
      toAlertLink() {
        const item = {
          urlType : this.alertItem.pop_url.value.show_type,
          shop_type : this.alertItem.pop_url.value.shop_type,
          value : this.alertItem.pop_url.value.value,
        };
        this.customTo(item);
      },
      closeAlert() {
        clearInterval(this.timeOut);
        this.showA = false;
        this.handleGetPopup();
      },
      showModel() {
        if (this.alertItem.pop_switch.value === 1) {
          let that = this;
          this.timeOut = setInterval(function() {
            that.alertItem.pop_time.value--;
            if (that.alertItem.pop_time.value === 0) {
              clearInterval(that.timeOut);
              that.showA = false;
              that.handleGetPopup();
            }
          }, 1000);
          this.showA = true;
        }else{
          this.handleGetPopup();
        }
      },
      getAlert() {
        this.$http({
          aurl: 'imagePop',
          success: res => {
            if (res.data.code === 0) {
              this.alertItem = res.data.result;
              this.showModel();
            }
          },
          fail: error => {
            console.log(error);
          },
          complete: () => {

          }
        });
      },
    },
    mounted() {
    },
  };
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'
.guide-popup
  >>>.van-popup
      background transparent
      .popup-main
        padding 15px
        .popup-header
          position relative
          height 16px
          .triangle
            width 0
            height 0
            border 8px solid transparent
            border-bottom-color #fff
            position absolute
            top 0
        .popup-content
          background #ffffff
          border-radius 16rpx
          box-shadow 0 0 20rpx 0 rgba(0,0,0,.2)
.integral-popup
  >>>.van-popup
    height auto
    width 79%
    background-color transparent
    .popup-main
      position relative
      .popup-bg
        width 100%
        vertical-align top
      .btn-box
        text-align center
        position absolute
        top 65%
        width 100%
        left 0
        .btn-img
          width 50%
          vertical-align top
      .icon-close-box
        display flex
        justify-content center
      .close-icon
        width 72rpx
        height 72rpx
        vertical-align top
      .popup-tit
        position absolute
        width 100%
        top 18%
        text-align center
        font-size 40rpx
        color #ED613E
      .integral-box
        position absolute
        top 31%
        width 100%
        .integral-num
          text-align center
          font-size 120rpx
          font-weight bold
          color #ED613E
          .integral-unit
            margin-top 46rpx
            font-size 32rpx
            font-weight normal
            margin-left 10rpx
        .integral-label
          font-size 22rpx
          color #ED613E
          text-align center
.closeIcon
  position absolute
  right 0
  top 0
.fixedImg
  position fixed
  height 100%
  width 100%
  top 0
  left 0
  display flex
  justify-content center
  align-items center
  background rgba(0, 0, 0, 0.3)
  z-index 9999
  .closeItem
    position absolute
    right -50rpx
    top -70rpx
    font-size 60rpx
    color #fff
  .imgBox
    width 80%
    margin 0 auto
    position relative
    image
      width 100%
.mp-search-box
  background #fff
  color $em-text-color

.index-box
  position relative
  /*background #fff*/
.index-head
  text-align center
  /*padding-right 90rpx*/
  box-sizing border-box
  width 100%
  font-size 37rpx
.box-bottom
	max-height 100%
	display flex
	align-items center
	/*height 400rpx*/
</style>
