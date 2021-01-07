<template>
  <view>
    <view class="shop-header">
      <view class="home-icon text-center" @tap="toHome">
        <text class="iconfont icon-home text-l mb-xs"></text>
        <text style="display: block" class="text-xs">首页</text>
      </view>
      <view class="search-box">
        <view class="em-searchbox">
          <view class="em-search-input">
            <text class="iconfont icon-search"></text>
            <input
                confirm-type="search"
                placeholder="请输入关键词"
                placeholder-class="em-input-plholder"
                class="em-input"
                v-model.trim="keyword"
                @confirm="onSearch"
            />
            <text class="iconfont icon-close" @tap="cleanKeyword" v-show="keyword"></text>
          </view>
          <view class="em-cancle"  @tap="onSearch">搜索</view>
        </view>
      </view>
    </view>
    <view class="shop-content">
      <view class="shop-info fxBox2">
        <view class="fxBox2">
          <image mode="widthFix" :src="detail.shop_logo"></image>
          <text class="ml-md">{{detail.shop_name}}</text>
        </view>
          <view @tap="fansClick('favorite')" v-if="!detail.is_favorite" class="shop-btn">关注</view>
          <view @tap="fansClick('cancel')" v-else class="shop-btn">已关注</view>
      </view>
      <goods-lists
          :is-list="isList"
          :goods-lists="goodsLists"
          class="em-product-list"
      >
      </goods-lists>
      <uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
    </view>
  </view>
</template>

<script>
    import mta from '../../static/mta_analysis.js'
    import redirect from '../../mixins/redirect.js';
    import GoodsLists from '../../components/lists/GoodsLists.vue';
    import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
    export default {
        mixins: [redirect],
        components:{
            GoodsLists,
            uniLoadMore
        },
        data() {
            return {
                keyword:'',
                goodsLists: [],
                isList:false,
                loadding:false,
                loadStatus: 'more',
                pullUpOn : true,
                shop_id:'',
                detail:{},
                currentPage:1,
                lastPage:'',
				loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
            };
        },
        onLoad:function(option){
          this.shop_id = option.shopid
          this.getDetail()
          this.getShopGoods(true)
          mta.Page.init()
        },
        methods: {
            onSearch(){
              this.getShopGoods(true)
            },
            fansClick(type){
              if(type==='cancel'){
                this.$http({
                  aurl:'cancelShopFavorite',
                  params:{
                    shop_id:this.shop_id
                  },
                  success:res => {
                    uni.showToast({
                      title: '取消关注成功',
                      icon: 'none',
                    })
                    this.detail.is_favorite = 0
                  },
                  fail:error => {
                    console.log(error)
                  }
                })
              }else{
                this.$http({
                  aurl:'ShopFavorite',
                  params:{
                    shop_id:this.shop_id
                  },
                  success:res => {
                    uni.showToast({
                      title: '关注成功',
                      icon: 'none',
                    })
                    this.detail.is_favorite = 1
                  },
                  fail:error => {
                    console.log(error)
                  }
                })
              }

            },
            getDetail(){
              this.$http({
                aurl:'shopDetail',
                aPath:[this.shop_id],
                success:res => {
                  this.detail = res.data.result
                },
                fail:error => {
                  console.log(error)
                }
              })
            },
            getShopGoods(init){
              if(init){
                this.currentPage = 1;
                this.goodsLists = [];
                this.pullUpOn = true;
                this.loadding = true;
                this.loadStatus = 'More';
              }
              this.$http({
                aurl:'getCateList',
                params:{
                  shop_id:this.shop_id,
                  page:this.currentPage,
                  keyword:this.keyword
                },
                success:res => {
                  this.lastPage = res.data.result.last_page
                  res.data.result.data.forEach(item => {
                    this.goodsLists.push(item);
                  });
                  if (res.data.result.last_page === 1) {
                    this.loadding = false;
                    this.pullUpOn = false;
                    this.loadStatus = 'noMore';
                  }
                },
                fail:error => {
                  console.log(error)
                }
              })
            },
            cleanKeyword() {
                this.keyValue = '';
            },
        },
      onReachBottom() {
        if (!this.pullUpOn) return;
        this.loadding = true;
        this.loadStatus = 'loading';
        if (this.lastPage === this.currentPage) {
          this.loadding = false;
          this.pullUpOn = false;
          this.loadStatus = 'noMore';
        } else {
          this.currentPage++;
          setTimeout(() => {
            this.getShopGoods();
            this.loadding = false;
            this.loadStatus = 'more';
          }, 500);
        }
      },
        mounted() {
        },
    };
</script>

<style scoped lang="stylus">
.shop-header
  height 100rpx
  display flex
  align-items center
  padding 0 40rpx
  border-bottom 1px solid #f8f8f8
  position fixed
  top 0
  width 100%
  box-sizing border-box
  z-index 99
  background #fff
  border-top 1px solid #f8f8f8
  .search-box
   flex 1
  .em-searchbox
    box-sizing: border-box;
    display: flex;
    align-items: center;
    padding-left 20rpx
    .em-search-input
      height: 66rpx;
      border-radius: 35rpx;
      padding: 0 30rpx;
      box-sizing: border-box;
      background: #f8f8f8;
      display: flex;
      align-items: center;
      flex-wrap: nowrap;
      flex 1
      margin-right 20rpx
      .em-input
        flex: 1;
        color: #333;
        padding: 0 16rpx;
        font-size: 28rpx;
      .em-input-plholder
        font-size: 28rpx;
        color: #b2b2b2;

      .em-cancle
        color: #888;
        font-size: 28rpx;
        padding-left: 30rpx;
        flex-shrink: 0;
uni-view.shop-header
  top 44px
.shop-content
  padding-top 100rpx
  .shop-info
    padding 20rpx 40rpx
    background #ffffff
    margin-bottom 20rpx
    image
      width 80rpx
    .shop-btn
      width 120rpx
      height 60rpx
      line-height 60rpx
      border 1px solid #ebedf0
      border-radius 40rpx
      text-align center
</style>
