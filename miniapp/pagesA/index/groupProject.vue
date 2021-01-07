<template>
	<view class="group-project-wrap">
    <meHeader :showGoBack="noGmToken == 1 ? false : true" box-background="#fff" title="切换店铺" needPaddingTop="true"></meHeader>
		<view class="wrap-top">
			<veiw class="item-label">当前店铺</veiw>
			<view class="current-item" v-if="sltIndexItem.name">{{sltIndexItem.name}}</view>
			<view class="current-item no-slt" v-else>( 暂未选择店铺 )</view>
		</view>
		<view class="group-project-list">
			<view class="list-item fxBox2" v-for="(item, index) in indexItems" :key="index" @click="onSelect(item)">
				<view class="item-t">
					<view class="item-name">{{item.shop_name}}</view>
          <view v-if="item.address" class="mt-md col-666 text-sm">{{item.address}}</view>
				</view>
				<view class="item-b fxBox1" v-if="item.distance_text">
					<view class="mr-sm">{{item.distance_text}}</view>
          <view class="fxBox1" @click="toAddr(item)">
            <text class="iconfont icon-locationfill text-18"></text>
            <text>导航</text>
          </view>
				</view>
			</view>
			<!--<uni-load-more :status="currentArr[current].loadStatus"></uni-load-more>-->
		</view>
	</view>
</template>

<script>
import meHeader from '../../components/header/header'
import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
export default {
	components: {
		meHeader,
		uniLoadMore
	},
	data() {
		return {
			noGmToken: '',
		  userToken: '',
			indexItems: [],
			sltIndexItem: {
				name:'',
				id: '',
			},
      lng:'',
      lat:''
		};
	},
	onLoad: function(option) {
		this.noGmToken = option.noGmToken;
		this.userToken = uni.getStorageSync('user_token');
		this.getIndexItem();
	},
	onShow() {

	},
	onReachBottom() {
	},
	mounted() {
	},
	methods: {

		onSelect(item) {
			this.sltIndexItem.name = item.shop_name;
			this.sltIndexItem.shop_id = item.shop_id;
			let shop_id = uni.getStorageSync('shop_id')
			if(shop_id === item.shop_id){
				uni.navigateBack()
			}else{
				uni.setStorageSync('shop_id', item.shop_id);
				uni.reLaunch({
					url:'/pages/index/indexCustomer?isProject=1&shop_id='+item.shop_id
				})
			}
		},
    toAddr(item){
      if(!item.latitude){
        return false
      }
      uni.openLocation({
        latitude: Number(item.latitude),
        longitude: Number(item.longitude),
        name:item.shop_name,
        address:item.address,
        success: function () {
          console.log('success');
        },
        fail:function(error){
          console.log(error);
        }
      });
    },
    getLists(){
      let gmToken = uni.getStorageSync('gmToken');
      const params = {
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
          if (res.data.code === 0) {
            this.indexItems = res.data.result.shop_list;
            let shop_id = uni.getStorageSync('shop_id');
            if(this.indexItems.length > 0){
              for(var i = this.indexItems.length-1; i >= 0 ; i--){
                if (shop_id === this.indexItems[i].shop_id) {
                  this.sltIndexItem.name = this.indexItems[i].shop_name;
                  this.sltIndexItem.id = this.indexItems[i].shop_id;
                }
              }
            } else {
              uni.showToast({
                title: '请先添加店铺！',
                icon: 'none',
                position: 'bottom'
              });
            }
          }
        },
        fail: error => {
          console.log(error);
        }
      });
    },
		getIndexItem() {
      const that = this;
      uni.getLocation({
        type: 'wgs84',
        success (res) {
          let latitude,longitude;
          that.lat = latitude = res.latitude.toString();
          that.lng = longitude = res.longitude.toString();
          that.getLists()
        },
        fail(res){
          that.getLists()
        }
      });
		},

	},
};
</script>
<style>
	page{
		background: #fff ;
	}
</style>
<style scoped lang="stylus">
@import '../../variable.styl'
.wrap-top
	line-height 1
	padding 20rpx 20rpx
	border-bottom 1rpx solid #E1E1E1
	/*position fixed*/
	/*top 0*/
	/*left 0*/
	/*right 0*/
	background #fff
	z-index 1
	.item-label
		font-size 30rpx
		color #999
	.current-item
		font-size 32rpx
		color #333
		font-weight bold
		margin-top 20rpx
		&.no-slt
			color #999
.group-project-list
	/*margin-top 123rpx*/
	.list-item
		margin-left 20rpx
		padding 30rpx 20rpx 30rpx 0
		border-bottom 1rpx solid #E1E1E1
		line-height 1
		.item-t
			.item-name
				font-size 30rpx
				color #333
				font-weight bold
			.default-label
				height 45rpx
				border-radius 23rpx
				background #F2F3F4
				font-size 22rpx
				padding 0 18rpx
				line-height 45rpx
				color #666666
				&.active
					color #fff
					background #FF5A76
		.item-b
			font-size 26rpx
			color #999
			font-weight 500
</style>
