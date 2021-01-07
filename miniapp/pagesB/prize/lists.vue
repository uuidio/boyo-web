<template>
  <view class="m-md bc-fff border-radius5px" v-if="showLists">
    <view v-if="lists.length > 0" class="prize-lists">
      <view class="prize-item fxBox p-md" v-for="(item,index) in lists">
        <view class="imgBox mr-md">
          <image :src="item.activities_reward_info.goods_info.goods_image"></image>
        </view>
        <view class="text-box pt-xs pb-xs fx1">
          <view class="line2-p">
            {{item.activities_reward_info.goods_info.goods_name}}
          </view>
          <view class="line2-p des">
            来源：{{item.gm_name}} 项目
          </view>
          <view class="text-r btnBox">
            <button v-if="item.is_redeem===0" @tap="needTokenQueryLink('/pagesB/prize/detail',{id:item.id})" class="btn redeem_one col-fff">立即兑换</button>
            <button  @click="needTokenQueryLink('/pagesA/user/order/detail',{tid:item.tid,type:'prize'})" v-else-if="item.is_redeem===1 || item.is_redeem===2" class="btn col-fff">订单详情</button>
          </view>
        </view>
      </view>
      <uniLoadMore :status="loadStatus"></uniLoadMore>
    </view>
    <noData v-else></noData>
  </view>
</template>

<script>
  import noData from '../../components/lists/nullData'
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
      };
    },
    onReachBottom(){
      if (!this.pullUpOn) return;
      this.page++
      this.loadStatus = 'more';
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
          this.loadStatus = 'more'
          this.pullUpOn = true
        }
        this.$http({
          aurl: 'rewardUserList',
          params:{
            page:this.page,
            reward_type:'kanjia'
          },
          success: res => {
            if (res.data.code === 0) {
              if(init){
                this.lastPage = res.data.result.lists.last_page
              }
              for(let i = 0;i < res.data.result.lists.data.length;i++){
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
              console.log(this.lists)
              console.log(res)
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
  .des
    color #999
  .prize-item
    position relative
    .imgBox
      width 170rpx
      height 170rpx
      image
        width 100%
        height 100%
    .text-box
      display flex
      flex-direction column
      justify-content space-between
      .btnBox
        display flex
        align-items flex-end
        justify-content flex-end
        .btn
          display inline-block
          width 180rpx
          height 50rpx
          line-height 50rpx
          text-align center
          border-radius 10rpx
          background #ff5840
          margin 0
        .redeem_one
          border 1px solid #e7e7e7
          color #333
          background #fff
</style>
