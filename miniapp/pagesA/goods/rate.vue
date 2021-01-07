<template>
  <view class="rate-box">
     <view class="header-tab">
       <view @tap="activeChange(index)" v-for="(item,index) in tabs"  :class="{'tab-son':true,'active':active===index?true:false}">
         {{item.name}}
       </view>
     </view>
    <view v-if="!rateLoading">
      <view v-if="rateLists.length>0" class="rate-lists">
        <view class="rate-item p-md mt-md bc-fff " v-for="(item,index) in rateLists">
          <view class="rate-head fxBox2 col-666 text-sm">
            <view class="fx1 fxBox1">
              <view class="imgBox mr-md">
                <image :src="item.headimgurl?item.headimgurl:'https://lanlnk-dev.oss-cn-shenzhen.aliyuncs.com/images/avatar.png'"></image>
              </view>
              <view>
                <view class="mb-xs">{{item.user_name}}</view>
                <view>{{item.created_at}}</view>
              </view>
            </view>
            <view class="fx1 text-r">
              <tui-rate :size="14" :current="item.result_star"  :hollow="true"></tui-rate>
              <view>
                推荐级别
              </view>
            </view>
          </view>
          <view class="text-md mt-md">
            <view v-if="item.content">
              {{item.content}}
            </view>
            <view v-else>
              此用户没有填写评价
            </view>
          </view>
          <view class="rate-imgs pt-md pb-md">
            <view v-for="(imgItem,imgIndex) in item.rate_pic" class="rate-imgBox">
              <image @tap="showImgs(imgIndex,item.rate_pic)" :src="imgItem"></image>
            </view>
          </view>
          <view v-if="item.spec_nature_info" class="text-md col-666">
            {{item.spec_nature_info}}
          </view>
          <view class="col-666 text-md" v-if="item.reply_content">
            商家回复：{{item.reply_content}}
          </view>
        </view>
      </view>
      <view v-else>
        <noData></noData>
      </view>
    </view>
    <uni-load-more v-if="rateLists.length>0" :status="loadStatus"></uni-load-more>
  </view>
</template>

<script>
  import tuiRate from "../../components/rate/rate";
  import noData from '../../components/lists/nullData'
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      tuiRate,
      noData,
      uniLoadMore
    },
    data() {
      return {
        rateLists:[],
        current:0,
        imgs:[],
        tabs:[
          {name:'全部',key:''},
          {name:'好评',key:'good'},
          {name:'中评',key:'neutral'},
          {name:'差评',key:'bad'}
        ],
        active:0,
        result:'',
        currentPage:1,
        id:'',
        rateLoading:true,
        pullUpOn:true,
        loadding: false,
        loadStatus: 'loading',
        lastPage:''
      };
    },
    onLoad:function(options){
      this.id = options.id
      this.getRate(true)
    },
    onReachBottom() {
      if (!this.pullUpOn) return;
      this.loadding = true;
      this.loadStatus = 'loading';
      if (this.listPage === this.currentPage) {
        this.loadding = false;
        this.pullUpOn = false;
        this.loadStatus = 'noMore';
      } else {
        this.currentPage++;
        setTimeout(() => {
          this.getRate();
          this.loadding = false;
          this.loadStatus = 'more';
        }, 500);
      }
    },
    methods: {
      showImgs(index,imgs){
        uni.previewImage({
          urls:imgs,
          current:index
        });
      },
      getRate(init){
        if(init){
          this.currentPage = 1;
          this.rateLists = [];
          this.rateLoading = true
        }
        this.$http({
          aurl:'getGoodsRate',
          aPath:[this.id],
          params:{
            result:this.result
          },
          success:res => {
            res.data.result.data.forEach((item)=>{
              this.rateLists.push(item)
            })
            if(init){
              this.lastPage = res.data.result.last_page;
              this.rateLoading = false
            }
            if(res.data.result.last_page===1){
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
      activeChange(index){
        this.active = index
        this.result = this.tabs[index].key
        this.getRate(true)
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
.rate-box
  padding-top 100rpx
  .header-tab
    height 100rpx
    position fixed
    padding 0 20rpx
    box-sizing border-box
    top 0
    left 0
    background #ffffff
    display flex
    align-items center
    width 100%
    .tab-son
      width 24%
      height 60rpx
      line-height 60rpx
      border 1px solid #f3f5f7
      border-radius 8rpx
      text-align center
      font-size 30rpx
      background #f3f5f7
    .active
      border-color #f25a2b
      color #f25a2b
      font-weight 700
    .tab-son:not(:nth-child(4n))
      margin-right 2%
  .rate-head
    .imgBox
      height 70rpx
      width 70rpx
      image
        width 100%
        height 100%
        border-radius 50%
  .rate-imgs
    display flex
    flex-wrap wrap
    .rate-imgBox
      width 210rpx
      height 210rpx
      margin-bottom 20rpx
      image
        height 100%
        width 100%
        border-radius 10rpx
    .rate-imgBox:not(:nth-child(3n))
      margin-right 20rpx
</style>
