<template>
  <view class="bc-fff" v-if="showLists">
    <view v-if="lists.length>0">
      <view class="prizeNav fxBox1 pt-md pb-md borB">
        <view class="fx1 text-center">抽奖时间</view>
        <view class="fx1 text-center">使用积分</view>
        <view class="fx1 text-center">抽奖结果</view>
      </view>
      <view class="ml-md mr-md">
        <view class="fxBox1 pt-md pb-md col-666 borB" v-for="(item,index) in lists">
          <view class="fx1 text-center">{{item.created_at}}</view>
          <view class="fx1 text-center">-{{item.integral}}</view>
          <view class="fx1 text-r">{{item.lottery_name}}</view>
        </view>
      </view>
      <uniLoadMore :status="loadStatus"></uniLoadMore>
    </view>
    <view v-else>
      <noData></noData>
    </view>
  </view>
</template>

<script>
  import noData from '../../components/lists/nullData';
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  export default {
    components:{
      noData,
      uniLoadMore
    },
    data() {
      return {
        show:false,
        page:1,
        lists:[],
        loadStatus: 'more',
        pullUpOn : true,
        lastPage:1,
        showLists:false,
        act_id:''
      };
    },
    onLoad(options){
      this.act_id = options.id
      this.getLists(true)
    },
    methods: {
      getLists(init){
        if(init){
          uni.showLoading({
            title: '加载中'
          });
        }
        this.$http({
          aurl: 'recordLists',
          params:{
            page:this.page,
            activities_id:this.act_id
          },
          success: res => {
            if(init){
              this.lastPage = res.data.result.lists.last_page
            }
            for(let i=0;i<res.data.result.lists.data.length;i++){
              this.lists.push(res.data.result.lists.data[i])
            }
            if(this.lastPage===this.page){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
            if(res.data.result.lists.last_page===1){
              this.pullUpOn = false;
              this.loadStatus = 'noMore'
            }
          },
          fail: err => {
            console.log(err);
          },
          complete:res=>{
            if(init){
              uni.hideLoading()
              this.showLists = true
            }
          }
        });
      }
    },
    onReachBottom(){
      if (!this.pullUpOn) return;
      this.page++
      this.getLists()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
.borB
  border-bottom 1px solid #e7e7e7
</style>
