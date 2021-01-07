<template>
  <view>
    <view class="p-md bc-fff">
      <view class="fxBox1 mb-md">
        <view class="searchBox  fx1">
          <text class="emfont icon-search searchIcon"></text>
          <input class="fx1" v-model="formItem.nickname"  @confirm="searchBtn" placeholder="请输入用户名称">
        </view>
        <view class="ml-sm searchBtn" @tap="searchBtn">
          搜索
        </view>
      </view>
      <view class="pb-md fxBox2">
       <view>
         <view class="col-red">销售总计：{{money}}元</view>
         <view class="col-red">佣金总计：{{goods_amount}}元</view>
         <view class="col-red">未转可提现金额：{{un_rewark_amount}}元</view>
       </view>
        <view @tap="showTime">{{timeName}}</view>
      </view>
    </view>
    <view>
      <view class="tabs fxBox1 text-center">
        <view @tap="navsChange(index)" class="tabs-item fx1" v-for="(item,index) in navs" :class="{'active':active===index?true:false}">
          {{item.title}}
        </view>
      </view>
      <view v-if="showLists">
        <view v-if="lists.length>0" class="m-md">
          <view class="p-md mb-md border-radius5px bc-fff" v-for="(order,index) in lists">
            <view class="mb-xs">
              订单号：{{order.tid}}
            </view>
            <view class="mb-xs">
              创建时间：{{order.created_at}}
            </view><view class="mb-xs">
            购买人：{{order.wx_nikename}}
          </view>
            <view class="fxBox trade-item" v-for="(oid_item,oid_index) in order.trade_order">
              <view class="imgBox">
                <image :src="oid_item.goods_image"></image>
              </view>
              <view class="fx1 p-xs text-box">
                <view class="line2-p">
                  {{oid_item.goods_name}}
                </view>
                <view class="fxBox2 text-sm col-666">
                  <text  v-if="Number(oid_item.pt_estimates_value)>0">
                    邀请奖励：<text class="col-red">{{oid_item.pt_estimates_value}}</text>
                  </text>
                  <text v-if="Number(oid_item.shop_estimates_value)>0">
                    预估收益：<text class="col-red">{{oid_item.shop_estimates_value}}</text>
                  </text>
                </view>
                <view class="fxBox2 text-sm col-666">
                  <text>数量：x{{oid_item.quantity}}</text>

                </view>
              </view>
            </view>
          </view>
          <uniLoadMore :status="loadStatus"></uniLoadMore>
        </view>
        <view v-else>
          <noData></noData>
        </view>
      </view>
      <w-picker
          mode="range"
          :startDate="2020"
          :endYear="2050"
          :defaultVal="rangeDval"
          :current="false"
          @confirm="onConfirm"
          ref="range"
          themeColor="#f00"
      ></w-picker>
    </view>
  </view>
</template>

<script>
  import noData from '../../../components/lists/nullData'
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import wPicker from "../../components/w-picker/w-picker.vue";
  const navs =  [
    {title: '全部', status: ''},
    {title: '已付款', status: '1'},
    {title: '已完成', status: '2'},
    {title: '无效', status: '3'}
  ];
  export default {
    components:{
      noData,
      uniLoadMore,
      wPicker
    },
    data() {
      return {
        navs,
        active:0,
        showLists:false,
        rangeDval:['2020-1-1','2020-01-01'],
        timeName:'日期选择',
        formItem:{
          page:1,
          nickname:'',
          per_page:20,
          created_start_at:'',
          created_end_at:'',
        },
        show:false,
        lists:[],
        lastPage:1,
        loadStatus: 'more',
        pullUpOn : true,
        money:0,
        goods_amount:0,
        un_rewark_amount:0,
        type:0,
      };

    },
    onLoad(options){
      if(options.type){
        this.type = options.type
      }
      console.log(options)
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
      showTime(){
        this.$refs.range.show()
      },
      onConfirm(val){
        this.timeName = val.result
        this.formItem.created_start = val.from+' 00:00:00'
        this.formItem.created_end = val.to+' 23:59:59'
        this.getLists(true)
      },
      navsChange(i){
        this.active = i
        this.getLists(true)
      },
      init(){
        switch (this.active) {
          case 0:
            this.formItem.status = ''
            delete this.formItem.failure
            delete this.formItem.iord
            break
          case 1:
            this.formItem.status = 0
            delete this.formItem.iord
            delete this.formItem.failure
            break
          case 2:
            this.formItem.status = 0
            this.formItem.iord = 2
            delete this.formItem.failure
            break
          case 3:
             delete this.formItem.status
             delete this.formItem.iord
             this.formItem.failure = 1
            break
        }
        if(!this.formItem.nickname){
         delete this.formItem.nickname
        }
        this.formItem.page = 1
        this.lists = []
        this.lastPage = 1
        this.loadStatus = 'more'
        this.pullUpOn = true
        this.showLists = false
      },
      getLists(init){
        if(init){
          uni.showLoading({
            title: '加载中'
          });
          this.init()
        }
        if(this.type==3){
          this.formItem.type = 3
        }
        this.$http({
          aurl: 'estimatesOrderLists',
          data:this.formItem,
          success: res => {
            if(init){
              this.lastPage = res.data.result.lists.last_page
              this.money =  res.data.result.total
              this.goods_amount =  res.data.result.goods_amount
              this.un_rewark_amount =  res.data.result.un_rewark_amount
            }
            if(res.data.result.lists.data){
              for(let i=0;i<res.data.result.lists.data.length;i++){
                const item = res.data.result.lists.data[i]
                item.trade_order = []
                for(let key in item){
                  if(item[key].oid){
                    item.trade_order.push(item[key])
                  }
                }
                this.lists.push(item)
              }
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
                _this.showLists = true
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
  .text-box
    display flex
    flex-direction column
    justify-content space-between
  .searchBtn
    background #f5222d
    border-radius 6rpx
    color #ffffff
    padding 6rpx 15rpx
  .goods-btn
    padding 2rpx 6rpx
    border 1px solid #e7e7e7
    border-radius 8rpx
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
  .tabs
    background #fff
    border-bottom 1px solid #e7e7e7
    .tabs-item
      height 60rpx
      line-height 60rpx
    .active
      color #f5222d
  .trade-item
    margin-top 20rpx
    .imgBox
      width 170rpx
      height 170rpx
      image
        width 100%
        height 100%
</style>
