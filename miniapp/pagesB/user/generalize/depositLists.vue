<template>
  <view v-if="show">
    <view class="fxBox1 pt-md pl-md pr-md">
      <text>提现微信手机号:</text>
      <text class="col-999 ml-md">{{mobile}}</text>
    </view>
    <view class="m-md p-lg bc-fff border-radius8 fxBox2">
      <view class="fxBox1">
        <text>可提现余额</text>
        <text class="col-red ml-md">￥{{detail.income}}</text>
      </view>
      <view class="fxBox1">
        <button class="deposit ml-md" @tap="getDepositType">去提现</button>
      </view>
    </view>
    <view>
      <view v-if="lists.length>0">
        <view class="m-md pl-lg pr-lg bc-fff border-radius8">
          <view v-for="(item,index) in lists" :key="index" class="list-item pt-md pb-md">
            <view class="fxBox2">
              <view>{{item.created_at}}</view>
              <text class="col-red">¥{{item.amount}}</text>
            </view>
            <view class="fxBox2 mt-sm">
              <view class="">提现状态</view>
              <text>{{item.status_text}}</text>
            </view>
            <view class="fxBox2 mt-sm">
              <view class="col-999">提现后余额</view>
              <text>￥{{item.balance}}</text>
            </view>
          </view>
        </view>
      </view>
      <view v-else>
        <noData></noData>
      </view>
      <uniLoadMore :status="loadStatus"></uniLoadMore>
    </view>
  </view>
</template>

<script>
  import noData from '../../../components/lists/nullData'
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      noData,
      uniLoadMore
    },
    data() {
      return {
        mobile: '',
        show: true, // false,
        lists:[
        ],
        formItem:{
          page:1,
          per_page:20,
          lastPage:1,
        },
        detail:{
          income: ''
        },
        loadStatus: 'more',
        pullUpOn : true,
      };
    },
    methods: {
      getDepositType(){
        this.needTokenLink('/pagesB/user/generalize/deposit')
        // this.$http({
        //   aurl: 'applyCashOutCheck',
        //   success: res => {
        //     if(res.data.result.status){
        //       if(res.data.result.status==1){
        //         this.needTokenLink('/pagesB/user/generalize/depositSuccess')
        //       }else if(res.data.result.status==3){
        //         this.needTokenLink('/pagesB/user/generalize/deposit')
        //       }else if(res.data.result.status==2){
        //         this.needTokenLink('/pagesB/user/generalize/depositFail')
        //       }else if(res.data.result.status==0){
        //         this.needTokenLink('/pagesB/user/generalize/deposit')
        //       }
        //     }
        //   },
        //   fail: error => {
        //     console.log(error);
        //   },
        //   complete:res=>{
        //
        //   }
        // });
      },
      getLists(init){
        if(init){
          this.formItem.page = 1
          this.formItem.lastPage = 1
          this.lists = []
          this.loadStatus = 'more'
          this.pullUpOn = true
          uni.showLoading({
            title: '加载中'
          });
        }
        this.$http({
          aurl: 'userDepositCashesList',
          success: res => {
            if(init){
              this.formItem.lastPage = res.data.result.lists.last_page
              this.getDetail()
            }
            for(let i=0;i<res.data.result.lists.data.length;i++){
              this.lists.push(res.data.result.lists.data[i])
            }
            if(this.formItem.lastPage===this.formItem.page){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
            if(res.data.result.lists.last_page===1){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      getDetail(){
        this.$http({
          aurl: 'getUserDeposit',
          success: res => {
            console.log(res)
            this.detail = res.data.result.info
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            uni.hideLoading()
            this.show = true
          }
        });
      },
    },
    onLoad(){
      this.mobile = JSON.parse(uni.getStorageSync('user_info')).mobile
    },
    onShow(){
      this.getLists(true)
    },
    mounted() {
    },
    onReachBottom(){
      if (!this.pullUpOn) return;
      this.formItem.page++
      this.getLists()
    },
  };
</script>

<style scoped lang="stylus">
  .list-item+.list-item
    border-top 1px solid #ddd
  .deposit
    height 50rpx
    padding 0 15rpx
    border-radius 40rpx
    line-height 50rpx
    background #f5222d
    color #ffffff
    text-align center
</style>
