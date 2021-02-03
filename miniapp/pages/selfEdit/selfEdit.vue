<template>
	<view>
		<view class="index-box">
			<view class="mp-search-box" :style="{ boxSizing: 'border-box', height: myHeight + 'px', paddingTop: myTop + 'px'}">
				<view class="index-head" :style="{ height: myHeight - myTop - 6 + 'px', lineHeight: myHeight - myTop - 6 + 'px' }">
					<text class="my-text mt-md">甄选</text>
				</view>
			</view>
      <view class="search_box" :style="{ paddingTop: myHeight + 'px' }">
<!--        <view class="search_box_l" @click="jump">-->
<!--&lt;!&ndash;          <van-icon class="location-icon" name="location-o" size="40rpx" color="#333"/>&ndash;&gt;-->
<!--          <image src="../../static/icon/icon-triangle-down.png" class="icon-triangle"></image>-->
<!--          <view class="my-text">{{sltIndexItem.name}}</view>-->
<!--        </view>-->
        <view class="search_box_r">
          <text class="emfont icon-search mr-md"></text>
          <input class="ser-input" type="text" value="搜索" disabled @tap="search"/>
        </view>
      </view>
      <view class="pos-re100">
        <indexView :dataLists="lists"></indexView>
      </view>
      <view class="fixedImg" v-if="showA">
        <view class="pos-re w100">
          <view class="imgBox" @tap="toAlertLink"><image :src="alertItem.pop_url.value.image_url" mode="widthFix"></image></view>
          <view class="closeItem fxBox1">
            <text class="mr-md text-md">{{ alertItem.pop_time.value }}s</text>
            <text @tap="closeAlert" class="emfont icon-round_close_light"></text>
          </view>
        </view>
      </view>
		</view>
    <button v-if="isVx" class="kefuBtn" type="contact" open-type="contact">
      <image src="https://egoss1.ytholidayplaza.com/images/default/202004/30/ZymAINYzJYmEbkziVYbcSDDCvvMks2iMhCjlCPm8.png"></image>
    </button>
    <view v-if="classifyList.length > 0">
      <recommendGoods :listsData="recommendList" :classifyList="classifyList" title="为你推荐" @changeClassify="handleChangeClassify"></recommendGoods>
      <uni-load-more :status="loadStatus" :contentText="loadText"></uni-load-more>
    </view>
    <!-- 集团项目选择 -->
<!--    <van-action-sheet :z-index="999999" :show="indexItemShow" :actions="indexItems" cancel-text="取消" @select="onSelect" @click-overlay="cancelModel" @cancel="cancelModel" />-->
  </view>
</template>

<script>
  import indexView from '../../components/editTemps/indexView'
  import redirect from '../../mixins/redirect.js';
  import global from '../../mixins/global.js';
  import cartNum from '../../mixins/cartNum';
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import recommendGoods from '../../components/lists/recommendGoods';

  export default {
    mixins: [redirect, global,cartNum],
    components:{
      indexView,
      uniLoadMore,
      recommendGoods,
    },
    data() {
      return {
        currentClassify: '',
        classifyList:[],
        loadText: { contentdown: '上拉显示更多', contentrefresh: '正在加载...', contentnomore: '持续更新中' },
        loadStatus: 'loading',
        recommendList: [],
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
        showA: false,
        timeOut: '',
        x: 500,
        y: 500,
        alertItem:{},
        isVx:false,
      };
    },
    onShow() {
      this.getIndexItem();
      // let gmToken = uni.getStorageSync('gmToken')
      // if(this.sltIndexItem.id !== gmToken){
      //   this.detail = {};
      //   this.recommendList = [];
      //   this.classifyList = []
      //   this.loadMore = {
      //     current: 1,
      //     last: 1,
      //     flat: false
      //   }
      //   this.getDetail()
      //   this.getIndexItem();
      //   this.getClassify()
      // }
    },
    onLoad:function(options){
      this.isVx = true
      // this.getDetail()
      // this.getIndexItem();
      // this.getClassify()
    },
    onReachBottom() {
      if (this.loadMore.flat) return;
      this.loadStatus = 'loading';
      setTimeout(() => {
        if (this.recommendList.length !== 0) {
          this.loadMore.current++;
        }
        this.getRecommend()
      }, 500);
    },
    methods: {
      jump(){
        uni.navigateTo({
          url: '/pagesA/index/groupProject',
        });
      },
      getClassify() {
        let that = this
        this.$http({
          aurl: 'getSelfClassify',
          data: {
            pages:'self'
          },
          success: res => {
            that.classifyList = []
            if(res.data.code == 0){
              for(let i = 0; i < res.data.result.length; i++){
                if(i === 0){
                  res.data.result[i].active = true
                  that.currentClassify = res.data.result[i].id
                } else {
                  res.data.result[i].active = false
                }
                that.classifyList.push(res.data.result[i])
              }
            }
          },
          error: err => {
            console.log(err);
          }
        });
      },
      handleChangeClassify(index){
        for(let i = 0; i < this.classifyList.length; i++){
        	if(i === index){
        		if(this.classifyList[i].active){
        			return false;
        		} else {
        			this.classifyList[i].active = true;
        			this.currentClassify = this.classifyList[i].id
              // this.recommendList = []
              this.loadMore = {
                current: 1,
                  last: 1,
                  flat: false
              },
              this.loadStatus = 'loading';
              this.getRecommend(true)
        		}
        	}else{
        		this.classifyList[i].active = false;
        	}
        }
      },
      getRecommend(bool) {
        var that = this
        this.$http({
          aurl: 'getSelfRecommend',
          data: {
            pages: 'self',
            title_id: that.currentClassify,
            page: this.loadMore.current
          },
          success: res => {
            // console.log(res)
            if(res.data.code === 0 && res.data.result.data){
              let data = res.data.result;
              this.loadMore.last = data.last_page;
              if(bool){
                this.recommendList = data.data
              }else{
                data.data.map(item => {
                  this.recommendList.push(item);
                });
              }
              if (this.loadMore.current === this.loadMore.last) {
                this.loadMore.flat = true;
                this.loadStatus = 'noMore';
              } else {
                this.loadStatus = 'more';
                this.loadMore.flat = false;
              }
            }
          },
          error: err => {
            console.log(err);
          }
        });
      },

      getMoreHot(isFirst) {
        this.$http({
          aurl: 'getMoreHot',
          data: {
            page: this.loadMore.current
          },
          success: res => {
            let data = res.data.result;
            this.loadMore.last = data.last_page;
            if (data.data.length) {
              data.data.map(item => {
                this.hotList.push(item);
              });
            }
            if (this.loadMore.current === this.loadMore.last) {
              this.loadMore.flat = true;
              this.loadStatus = 'noMore';
            } else {
              this.loadStatus = 'more';
              this.loadMore.flat = false;
            }
          },
          error: err => {
            console.log(err);
          }
        });
      },
      search() {
        uni.navigateTo({
          url: '/pagesA/goods/search'
        });
      },
      onSelect(e) {
        this.sltIndexItem = e.detail.name;
        uni.setStorageSync('gmToken', e.detail.gm_id)
        this.indexItemShow = false;
        this.detail = {};
        this.getDetail();
        this.getCartNum();
      },
      cancelModel() {
        this.indexItemShow = false;
      },
      getIndexItem() {
        let gmToken = uni.getStorageSync('gmToken')
        if (gmToken > 0) {
          this.$http({
            aurl: 'getIndexItem',
            success: res => {
              if (res.data.code === 0) {
                this.indexItems = res.data.result;
                if(this.indexItems.length > 0){
                  if(this.sltIndexItem.id != gmToken){
                    this.detail = {};
                    this.recommendList = [];
                    this.classifyList = []
                    this.loadMore = {
                      current: 1,
                      last: 1,
                      flat: false
                    }
                    let bool = false
                    for(var i = 0; i < this.indexItems.length; i++){
                      if (gmToken == this.indexItems[i].gm_id) {
                        this.sltIndexItem.name = this.indexItems[i].platform_name
                        this.sltIndexItem.id = this.indexItems[i].gm_id
                        bool = true
                      }
                    }
                    if (!bool) {
                      uni.navigateTo({
                        url: '/pagesA/index/groupProject',
                      });
                    }else{
                      this.getDetail()
                      this.getClassify()
                    }
                  }

                } else {
                  uni.showToast({
                    title: '请先添加项目！',
                    icon: 'none',
                    position: 'bottom'
                  });
                }
              }
            },
            fail: error => {
              console.log(error);
            },
            complete: () => {

            }
          });
        } else {
          uni.navigateTo({
            url: '/pagesA/index/groupProject?noGmToken=1',
          });
        }
        // this.$http({
        //   aurl: 'getIndexItem',
        //   success: res => {
        //     if (res.data.code === 0) {
        //       this.indexItems = res.data.result;
        //       let gmToken = uni.getStorageSync('gmToken')
        //       if(this.indexItems.length > 0){
        //         if(!gmToken){
        //           uni.setStorageSync('gmToken', this.indexItems[0].gm_id)
        //           this.sltIndexItem.name = this.indexItems[0].platform_name
        //           this.sltIndexItem.id = this.indexItems[0].gm_id
        //         }
        //         let bool = false
        //         for(var i = 0; i < this.indexItems.length; i++){
        //           if (gmToken === this.indexItems[i].gm_id) {
        //             this.sltIndexItem.name = this.indexItems[i].platform_name
        //             this.sltIndexItem.id = this.indexItems[i].gm_id
        //             bool = true
        //           }
        //         }
        //         if (!bool) {
        //           this.sltIndexItem.name = this.indexItems[0].platform_name
        //           this.sltIndexItem.id = this.indexItems[0].gm_id
        //         }
        //       } else {
        //         this.sltIndexItem.name = '播丫Go'
        //         this.sltIndexItem.id = ''
        //       }
        //
			  // if(this.indexItems.length < 5){
				//   this.getRecommend()
			  // }
        //     }
        //   },
        //   fail: error => {
        //     console.log(error);
        //   },
        //   complete: () => {
        //
        //   }
        // });
      },
      closeAlert() {
        clearInterval(this.timeOut);
        this.showA = false;
      },
      toAlertLink() {
        const item = this.alertItem.pop_url.value;
        if(item.show_type==='activity'){
           if(item.id==='transmit'){
             this.toLink('/pagesA/shareHelp/helpDesc')
           }else{
             this.toLink('/pagesA/activity/'+item.id+'')
           }
        }
      },
      showModel() {
        if (this.alertItem.pop_switch.value === 1) {
          let _this = this;
          this.timeOut = setInterval(function() {
            _this.alertItem.pop_time.value--;
            if (_this.alertItem.pop_time.value === 0) {
              clearInterval(_this.timeOut);
              _this.showA = false;
            }
          }, 1000);
          this.showA = true;
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
          }
        });
      },
      getDetail(){
        this.$http({
          aurl: 'getSelfWidgets',
          params:{
            page:'index_self'
          },
          success: res => {
            this.lists = res.data.result
            console.log(res)
          },
          fail: error => {
            // this.getAlert();
            console.log(error);
          },
          complete: () => {
            // this.getAlert();
          }
        });
      },
      getConfig(){
        this.$http({
          aurl: 'configIndex',
          params:{
            page:'index',
            group: "wxpage"
          },
          success: res => {
            if(res.data.result.length==3){
              this.wxItem = {
                logo:res.data.result[0].value.image_url,
                wx_code:res.data.result[1].value.image_url,
                is_open:res.data.result[2].value
              }
            }
          },
          fail: error => {
          },
          complete: () => {
          }
        });
      }
    },
    mounted() {
    },
  };
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'
.search_box
  .search_box_r
    .icon-search
      left 50%
      margin-left -60rpx
    .ser-input
      text-align center
      padding-left 0
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
    right 14%
    top 10rpx
    font-size 60rpx
    color #fff
  .imgBox
    width 80%
    margin 0 auto
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
</style>
