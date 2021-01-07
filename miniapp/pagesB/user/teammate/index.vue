<template>
  <view class="m-md bc-fff border-radius5px" v-if="showLists">
    <view v-if="lists.length > 0" class="prize-lists">
      <view class="ml-md mr-md pt-md pb-md" style="border-bottom:1px solid #dedede">
        邀请新用户（{{total}}）
      </view>
      <view class="navs p-md fxBox1 text-center">
        <view class="n1">序号</view>
        <view class="n2">头像</view>
        <view class="fx1">昵称</view>
        <view class="n3 text-r">入队时间</view>
      </view>
      <view class="prize-item fxBox1 p-md text-center" v-for="(item,index) in lists">
         <view class="n1">
           {{item.number}}
         </view>
        <view class="n2">
          <image class="headImg" :src="item.headimgurl"></image>
        </view>
        <view class="fx1 text-ellipsis">
          {{item.nick_name ||item.mobile}}
        </view>
        <view class="n3 text-r">
          {{item.created_at}}
        </view>
      </view>
      <uniLoadMore :status="loadStatus"></uniLoadMore>
    </view>
    <noData v-else></noData>
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
        lists:[],
        page:1,
        pullUpOn : true,
        loadStatus: 'more',
        showLists:false,
        lastPage:1,
        total:0,
      };
    },
    onReachBottom(){
      if (!this.pullUpOn) return;
      this.page++
      this.getLists()
    },
    onShow(){
      this.getLists(true)
    },
    methods: {
      getLists(init){
        if(init){
          uni.showLoading({
            title: '加载中'
          });
          this.showLists = false
          this.page = 1
          this.lists = []
          this.loadStatus='more'
          this.pullUpOn = true
        }
        this.$http({
          aurl: 'userTeam',
          params:{
            page:this.page
          },
          success: res => {
            if (res.data.code === 0) {
              if(init){
                this.lastPage = res.data.result.lists.last_page
                this.total =  res.data.result.lists.total
              }
              if(this.lastPage===this.page){
                this.pullUpOn = false;
                this.loadStatus = 'noMore'
              }
              if(res.data.result.lists.last_page===1){
                this.pullUpOn = false;
                this.loadStatus = 'noMore'
              }
              for(let i = 0;i < res.data.result.lists.data.length;i++){
                this.lists.push(res.data.result.lists.data[i])
              }
              console.log(this.lists)
            }
          },
          fail: error => {
            console.log(error);
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
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
 .n1
   width 100rpx
 .n2
   width 150rpx
   white-space nowrap
 .n3
   width 200rpx
 .headImg
   width 80rpx
   height 80rpx
   border-radius 50%
</style>
