<template>
  <view v-if="show">
    <view class="group-banner">
      <image mode="widthFix" :src="bannerUrl" alt="" />
<!--      <explain :content="desc">-->
<!--        <view class="rule text-md">活动规则</view>-->
<!--      </explain>-->
      <view class="rule text-md" @tap="ruleShow = true">活动规则</view>
    </view>
    <view class="navs" v-if="!params.shop_id">
      <scroll-view scroll-x="true" class="fxBox class-swiper w100" >
         <view @tap="navClick(item,index)" v-for="(item,index) in navs" :class="{'class-swiper-item':true,'text-center':true,'text-md':true,'active':active===index?true:false}">
           {{item.gc_name}}
         </view>
      </scroll-view>
    </view>
    <view class="goods-lists pl-md pr-md">
      <view class="goods-item fxBox" v-for="(item,index) in goodsLists" @tap="toGoodsDetail(item.goods_id)">
        <view class="goods-img mr-md">
          <image mode="widthFix" :src="item.goods_image"></image>
        </view>
        <view class="goods-text fx1 p-md">
          <view class="top">
            <view class="line2-p text-16" data-line="1">
              {{item.goods_name}}
            </view>
             <view class="count">
               <text class="emfont icon-hotfill mr-xs"></text> <text>{{item.count_group}}已拼团</text>
             </view>
          </view>
          <view class="bottom fxBox2">
            <view>
              <view class="col-red fw700">
                <text>￥</text><text class="text-16">{{item.group_price}}</text>
              </view>
              <view class="del-text text-xs col-666">
                ￥{{item.price}}
              </view>
            </view>
            <view class="goods-btn text-sm">马上抢</view>
          </view>
        </view>
      </view>
    </view>
    <uni-load-more :status="loadStatus"></uni-load-more>
    <tui-modal :show="ruleShow"  :custom="true" @cancel="ruleShow=false">
      <view class="tui-modal-custom">
        <view class="text-r">
          <text class="emfont icon-close icon-fontSize" @tap="ruleShow=false"></text>
        </view>
        <view class="text-16 model-title text-center">拼团规则</view>
        <view class="fxBox mb-lg" style="justify-content: center">
          <view class="col-666 text-sm mr-lg">
            <text class="emfont icon-goods_light text-md mr-xs fw700"></text>
            <text>开团/参团</text>
          </view>
          <view class="col-666 text-sm mr-lg">
            <text class="emfont icon-friend_add_light text-md mr-xs fw700"></text>
            <text>邀友参团</text>
          </view>
          <view class="col-666 text-sm">
            <text class="emfont icon-friend_light text-md mr-xs fw700"></text>
            <text>人满成团</text>
          </view>
        </view>
        <view class="text-sm pb-lg">
          支付开团或参团，邀请好友参团，在有效时间内达到成团人数则拼团成功，进行发货；若超时未达到拼团人数则拼团失败，系统将自动退款。
        </view>
      </view>
    </tui-modal>
  </view>
</template>

<script>
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import tuiModal from '../../components/modal/modal'
  import explain from  '../../components/explain/index'

  export default {
    onShareAppMessage(res){
      let path = '/pagesA/activity/group';
      if(this.agent===1){
        const user_info  = uni.getStorageSync('user_info');
        const user_id = JSON.parse(user_info).user_id;
        path = '/pagesA/activity/group?t=goods&p='+user_id+''
      }
      console.log(path);
      return {
        path: path,
      }
    },
    mixins: [],
    components:{
      uniLoadMore,
      tuiModal,
      explain
    },
    data() {
      return {
        show:false,
        agent_id:'',
        agent:'',
        bannerUrl:'',
        loadStatus: 'more',
        ruleShow:false,
        pullUpOn : true,
        loadding:false,
        desc:'',
        navs:[
        ],
        active:0,
        params:{
          page:1,
          gc_id_3:'',
        },
        goodsLists:[],
      };
    },
    onLoad:function(options){
     uni.showLoading({
         title: '加载中'
      });
      if(options.shopid){
        if(options.shopid==='88888'){
          this.params.is_purchasing = 1;
        }
        uni.hideShareMenu();
      }
      this.getClass();
      this.getGoods(true);
      this.getUserBanner();
      // this.getAct();
      if(options.t){
        uni.setStorage({
          key: 'source',
          data:options.t,
          success: function () {
          }
        });
        uni.setStorage({
          key: 'pid',
          data:options.p,
          success: function () {
          }
        });
        this.agent_id = options.p
      }
    },
    onShow(){
      const token = uni.getStorageSync('user_token');
      if(token){
        this.getAgentType();
        if(this.agent_id){
          this.setGoodsRelated()
        }
      }else{
        if(this.agent_id){
          this.toLink('/pagesB/user/bindUser');
          return false
        }
      }
    },
    methods: {
      setGoodsRelated(){
        this.$http({
          aurl: 'setRelated',
          params: {
            pid:this.agent_id
          },
          success: res => {
            console.log(res)
          },
          fail: error => {
            console.log(error);
          }
        });
      },
      getAgentType(){
        this.$http({
          aurl: 'applyCheck',
          success: res => {
            this.agent = res.data.result.apply_status
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      getAct(){
        this.$http({
          aurl: 'articleDetail',
          params:{
            id:27
          },
          success: res => {
            if(res.data.code===0){
              this.desc = res.data.result.content
            }
          },
          fail: err => {
            console.log(err);
          },
          complete:res => {
            const _this = this;
            setTimeout(function(){
              _this.show = true;
              uni.hideLoading()
            },1000)
          }
        });
      },

      getUserBanner(){
        this.$http({
          aurl: 'configItems',
          success: res => {
            if(res.data.code===0){
              if(res.data.result.groups_banner.length>0){
                this.bannerUrl = res.data.result.groups_banner[0].url
              }
            }
          },
          fail: err => {
            this.showUser = true;
            console.log(err);
          }
        });
      },
      getClass(){
          this.$http({
            aurl:'groupClass',
            success:res => {
              this.navs = res.data.result;
              this.navs.unshift({
                id:'',
                gc_name:'全部'
              })
            },
            fail:error => {
              console.log(error)
            }
          })
      },
      init(){
        this.loadStatus = 'more';
        this.pullUpOn = true;
        this.loadding = false;
        this.params.page = 1;
        this.goodsLists = []
      },
      getGoods(init){
        if(init){
          this.init()
        }
        if (!this.pullUpOn) return;
        const params = this.params;
        this.$http({
          aurl:'groupGoods',
          params:params,
          success:res => {
            if(res.data.result.lists.data.length===0){
              this.loadding = false;
              this.pullUpOn = false;
              this.loadStatus = 'noMore';
            }else{
              for(let i = 0;i <res.data.result.lists.data.length;i++){
                this.goodsLists.push(res.data.result.lists.data[i])
              }
              this.params.page++;
              this.loadStatus = 'more';
              this.loadding = false;
            }
            if(init){
              if(res.data.result.lists.last_page===1){
                this.loadding = false;
                this.pullUpOn = false;
                this.loadStatus = 'noMore'
              }
            }
          },
          fail:error => {
            console.log(error)
          },
          complete: res => {
              uni.hideLoading();
              this.show = true
          }
        })
      },
      navClick(item,index){
        this.active = index;
        this.params.gc_id_3 = item.id;
        this.getGoods(true)
      }
    },
    onReachBottom(){
      this.getGoods()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .model-title
    padding-bottom 40rpx
  .icon-fontSize
    font-size 46rpx
  .group-banner
    position relative
    width 100%
    image
      width 100%
    .rule
      position absolute
      padding 6rpx 20rpx
      right 0
      top 36rpx
      color #fff
      background #e64340
      border-radius 20rpx 0 0 20rpx
      z-index 3
  .navs
    .class-swiper
      white-space: nowrap;
      .active
        color red
      .class-swiper-item
        width 18%
        text-align center
        padding 20rpx 0
        display inline-block
  .goods-item
    position relative
    margin-bottom 20rpx
    background #fff
    .goods-img
      width 210rpx
      display flex
      align-items center
      image
        width 100%
        border-radius 10rpx
    .goods-text
      display flex
      flex-direction column
      justify-content space-between
      .count
        background #fff0f0
        color #E64340
        border-radius 4rpx
        display inline-block
        margin-top 10rpx
        padding 0 10rpx
      .goods-btn
        padding 0 20rpx
        height 60rpx
        line-height 60rpx
        background #e64340
        color #fff
        border-radius 10rpx
</style>
