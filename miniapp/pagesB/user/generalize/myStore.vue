<template>
  <view>
    <view class="p-md bc-fff">
      <view class="mb-md fxBox1">
        <view class="searchBox fx1">
          <text class="emfont icon-search searchIcon"></text>
          <input class="fx1" v-model="formItem.nickname" type="text" @confirm="searchBtn" placeholder="请输入用户名称">
        </view>
        <view class="ml-sm searchBtn" @tap="searchBtn">
          搜索
        </view>
      </view>
      <view class="tabs fxBox1 text">
        <view v-for="(item,index) in tabs" @tap="tabChange(index)" class="fx1 tab-item text-center" :class="{active:active===index?true:false}">
          <text>{{item.name}}</text>
        </view>
      </view>
    </view>
    <view class="m-md"  v-if="show">
      <view v-if="lists.length>0">
        <view v-for="(item,index) in lists" class="p-md mt-md fxBox bc-fff lists-item fxBox border-radius5px">
          <view class="lists-img">
            <image :src="item.wx_info.headimgurl"></image>
          </view>
          <view class="lists-text fx1">
            <view class="w100 fxBox2">
              <text>{{item.wx_info.nickname}}</text>
              <text>{{item.updated_at}}</text>
            </view>
            <view class="col-666">
              <text class="mr-md">成交额：{{item.reward_info.reward_value}}</text>
              <text>订单数：{{item.reward_info.count}}</text>
            </view>
          </view>
        </view>
        <uniLoadMore :status="loadStatus"></uniLoadMore>
      </view>
      <view v-else>
        <noData></noData>
      </view>
    </view>
  </view>
</template>

<script>
  const tabs = [
    {
     name:'有效店家',
     type:'1'
    },
    {
      name:'失效店家',
      type:'0'
    },
  ]
  import noData from '../../../components/lists/nullData'
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      noData,
      uniLoadMore
    },
    data() {
      return {
        show:false,
        tabs,
        active:0,
        formItem:{
          page:1,
          per_page:20,
          nickname:'',
          status:1,
          partner_id:''
        },
        lastPage:1,
        lists:[],
        loadStatus: 'more',
        pullUpOn : true,
      };
    },
    onLoad(){
      const user_info = uni.getStorageSync('user_info')
      if(user_info){
        this.formItem.partner_id = JSON.parse(user_info).user_id
      }
      this.getLists(true)
    },
    onReachBottom(){
      if (!this.pullUpOn) return;
      this.formItem.page++
      this.getLists()
    },
    methods: {
      searchBtn(){
        this.getLists(true)
      },
      tabChange(i){
        if(this.active === i){
          return
        }
        this.active = i
        this.formItem.status = i==0?1:0
        this.getLists(true)
      },
      init(){
        this.show=false
        this.formItem.page = 1
        this.lists = []
        this.lastPage = 1
        this.loadStatus = 'more'
        this.pullUpOn = true

      },
      getLists(init){
        if(init){
          uni.showLoading({
            title: '加载中'
          });
          this.init()
        }
        this.$http({
          // aurl: 'goodsSpreadLists',
          aurl: 'promoterList',
          data:this.formItem,
          success: res => {
            if(init){
              this.lastPage = res.data.result.lists.last_page
            }
            for(let i=0;i<res.data.result.lists.data.length;i++){
              this.lists.push(res.data.result.lists.data[i])
            }
            if(this.lastPage===this.formItem.page){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
            if(res.data.result.lists.last_page===1){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
            console.log(res)
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            if(init){
              const _this = this
             setTimeout(function(){
               uni.hideLoading()
               _this.show = true
             },300)
            }
          }
        });
      }
    },
    mounted() {

    },
  };
</script>

<style scoped lang="stylus">
  .searchBtn
    background #f5222d
    border-radius 6rpx
    color #ffffff
    padding 6rpx 15rpx
  .searchBox
    height 60rpx
    line-height 60rpx
    padding-left 60rpx
    position relative
    background #f4f4f4
    border-radius 40rpx
    .searchIcon
      position absolute
      top 50%
      left 20rpx
      transform translateY(-50%)
    input
      height 60rpx
      line-height 60rpx
  .tab-item
    height 60rpx
    >text
      display inline-block
      height 60rpx
      line-height 60rpx
  .active
    >text
      border-bottom 2px solid #f5222d
      color #f5222d
  .lists-img
    width 90rpx
    margin-right 20rpx
    image
      height 90rpx
      width 90rpx
      border-radius 50%
  .lists-text
    display flex
    flex-direction column
    justify-content space-between
</style>
