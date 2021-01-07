<template>
  <view class="home" v-if="show">
    <view class="p-lg fxBox2">
      <explain :content="drawDetail.desc" >
        <view class="btn col-fff">抽奖说明</view>
      </explain>
      <view class="btn col-fff" @tap="needTokenQueryLink('/pagesB/activity/prizeLists',{
      id:prizeID
      })">中奖记录</view>
    </view>
    <view class="draw-logo">
      <!-- <image class="w100" mode="widthFix" src="https://staticbbcimage.gdalpha.com/images/default/201912/27/zpdcj.png"></image> -->
    </view>
   <view class="col-000 m-lg">
      我的积分：{{point}}
    </view>
    <turntable
      ref="raffleWheel"
      :prizeList="prizeList"
      strKey="name"
      imgKey="image"
      :canvas-width="canvasData.width"
      :canvas-height="canvasData.height"
      @actionStart="handleActionStart"
      @actionEnd="handleActionEnd"
    ></turntable>
    <view class="mt-md col-1668CC text-md text-center" v-if="!act_id">
      <view v-if="drawDetail.integral">{{drawDetail.integral}}积分抽奖一次，每用户每日最多可抽奖{{drawDetail.luck_draw_num}}次</view>
    </view>
    <view class="col-1668CC text-md text-center name_list_box" v-if="!act_id">
      <view class="name_list_title">
        <view>用户名</view>
        <view>获取奖项</view>
        <view>中奖时间</view>
      </view>
      <swiper :circular="true" class="name_lists" :interval="2000" :touchable="false" :display-multiple-items="4" :indicator-dots="false" :autoplay="true" :vertical="true">
        <swiper-item class="name_list_item" v-for="(item,i) in lists" :key="i" >
          <view>{{item.user_account_name}}</view>
          <view>{{item.lottery_name}}</view>
          <view>{{item.grant_time}}</view>
        </swiper-item>
      </swiper>
<!--      <scroll-view class="name_lists" scroll-y @scrolltolower="scrollBottom" :scroll-top="scrollTop">
        <view class="name_list_item" v-for="(item,i) in lists" :key="i">
          <view>{{item.user_account_name}}</view>
          <view>{{item.lottery_name}}</view>
          <view>{{item.created_at}}</view>
        </view>
        <uniLoadMore :status="loadStatus"></uniLoadMore>
      </scroll-view> -->
    </view>
    <tui-modal class="model-box" :border-r="0" :width="80" :pad="0" :show="succShow"  :custom="true" @cancel="cancelModel">
      <view class="prize-box">
        <view class="imgBox w100 pos-re">
          <image :src="succImgUrl" class="w100" mode="widthFix"></image>
          <view class="prize-tit" v-if="detail.type!==0">恭喜你，中奖啦！</view>
        </view>
        <view class="draw-info" v-if="detail.type!==0">
          <view class="text-sm col-666 text-center mb-lg">
            <text v-if="detail.type===2">
              <view>
                恭喜您！获得{{detail.name}}，票券详细使用说明，请至【我的】-【我的票券】中查看吧！
              </view>
              <view class="getButton" @tap="toLink('/pagesB/user/ticket/index')">
                去查看
              </view>
            </text>
            <text v-else-if="detail.type===1">
              恭喜您！获得【{{detail.prize}}积分】，积分已入您的积分账户，请至【我的】-【积分】中查看吧！
            </text>
            <text v-if="detail.type===3">
              <view>
                恭喜您！获得{{detail.name}}，请至【我的】-【我的奖品】中查看吧！
              </view>
            </text>
            <text v-if="detail.type===4">
              <view>
                恭喜您！获得{{detail.name}}，请至【我的】-【优惠券】中查看吧！
              </view>
            </text>
          </view>
          <view class="prize-integral text-center" v-if="detail.type===1">
            <view class="imgBox">
              <image :src="succGBUrl"></image>
            </view>
            <view class="textBox">
              {{detail.prize}}积分
            </view>
          </view>
          <view class="fxBox border-radius5px p-md bc-fff prize" v-else-if="detail.type===2||detail.type===3||detail.type===4">
            <view class="imgBox mr-md">
              <image :src="detail.image"></image>
            </view>
            <view class="fxBox3 textBox pt-sm pb-sm">
              <view class="fw700 line2-p">{{detail.name}}</view>
            </view>
          </view>
          <view v-if="detail.type===2||detail.type===3||detail.type===4" class="toDet" @tap="toDetail">
            立即查看
          </view>
        </view>
        <view class="noPrize" v-else-if="detail.type===0">
          谢谢参与
        </view>
      </view>
      <view class="ex-close">
        <text @tap="cancelModel" class="emfont icon-roundclose col-fff"></text>
      </view>
    </tui-modal>
  </view>
</template>

<script>
  import turntable from '../components/turntable/turntable.vue';
  import uniLoadMore from '@dcloudio/uni-ui/lib/uni-load-more/uni-load-more.vue';
  import tuiModal from '../../components/modal/modal';
  import explain from  '../../components/explain/index'
  export default {
    name: 'Home',
    components: {
      turntable,
      tuiModal,
      explain,
      uniLoadMore
    },
    onLoad(options){
      this.gm_id = options.gm_id;
      if(options.scene){
        const str = decodeURIComponent(options.scene)
        const strArr = str.split('&')
        if(strArr.length===2){
          let t = strArr[0].substring(2)
          if(t==='c'){
            t = 'draw'
          }
          const f = strArr[1].substring(3)
          this.act_id = f
          this.prizeID = f
          this.getLoot()
          this.getRecordLists(true)
          console.log(t+'-'+f)
          uni.setStorage({
            key: 'source',
            data:t,
            success: function () {
            }
          });
          uni.setStorage({
            key: 'aid',
            data:f,
            success: function () {
            }
          });
        }
      }
    },
    onShow(){
      this.getLists();
      this.getDesc();
      this.getRefreshPoint();
      // const token = uni.getStorageSync('user_token');
      // if (token) {
      //   this.gm_id = uni.getStorageSync('gmToken')
      //   this.getRefreshPoint();
      // }
    },
    data () {
      return {
        succImgUrl:'https://ytxspt.ytholidayplaza.com/images/cj-activity/choujiangBG.png',
        succGBUrl:'https://ytxspt.ytholidayplaza.com/images/cj-activity/choujiangGB.png',
        detail:{},
        ruleShow:false,
        succShow:false,
        // canvas 宽高
        canvasData: {
          width: 320,
          height: 320
        },
        drawDetail:{},
        // 奖品数据
        prizeList: [
        ],
        // 中奖下标
        targetIndex: 0,
        // 中奖类目名称
        targetName: '',
        canvasImg: '',
        show:false,
        point:0,
        act_id:'',
        prizeID:'',
        scrollTop: 0,

        page:1,
        lists:[],
        loadStatus: 'more',
        pullUpOn : true,
        lastPage:1,
      }
    },
    methods: {
      cancelModel(){
        this.$refs.raffleWheel.initFlag() // 打开转盘抽奖开关
        this.succShow = false
      },
      getLoot(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'getlotteryDetail',
          aPath:[this.act_id],
          success: res => {
            console.log(res)
            this.drawDetail = res.data.result
            this.prizeList = res.data.result.lottery_detail
          },
          fail: err => {
          },
          complete:res=>{
            uni.hideLoading()
            this.show=true
          }
        });
      },
      scrollBottom() {
        if (!this.pullUpOn) return;
        this.page++
        this.getRecordLists()
      },
      getRecordLists(init){
        if(init){
          uni.showLoading({
            title: '加载中'
          });
        }
        this.$http({
          aurl: 'getRecordShowLists',
          params:{
            page:this.page,
            activities_id:this.prizeID
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
            }
          }
        });
      },
      toDetail(){
        console.log(this.detail,this.detail.type)
        switch (this.detail.type) {
          // case 2:
          //   this.needTokenQueryLink('/pagesB/user/ticket/index',{active:4})
          //   break
          case 3:
            this.toLink('/pagesB/prize/lists')
            break
          case 4:
            this.toLink('/pagesA/user/coupon')
            break
        }
      },
      getRefreshPoint () {
        this.$http({
          aurl: 'refreshPoint',
          data: {
            gm_id: this.gm_id || 1,
          },
          success: res => {
            if (res.data.code === 0) {
              this.point = res.data.result.point
              // this.visable=true
            }
          },
          fail: error => {
            console.log(error);
            // setTimeout(()=>{
            // 	this.visable=true
            // },2000)
          },
          complete: () => {

          }
        });
      },
      // 本次抽奖开始
      handleActionStart () {
        console.log('抽奖开始');
        // 请求抽奖接口
        this.getPrize()
      },
      getPrize(){
        const params = {
          gm_id: this.gm_id
        }
        if(this.act_id){
          params.lottery_id = this.act_id
        }
        this.$http({
          aurl: 'luckDraw',
          params,
          success: res => {
            if(res.data.code===0){
              this.detail = res.data.result
              this.$refs.raffleWheel.lottery(this.detail);
            } else {
              this.$refs.raffleWheel.initFlag()// 打开抽奖开关和切换为转盘图片
            }
            console.log(res)
          },
          fail: err => {
            this.$refs.raffleWheel.initFlag()
          },
          complete:res=>{
          }
        });
      },
      // 本次抽奖结束
      handleActionEnd () {
          this.getRefreshPoint();
          this.succShow = true
          this.getRecordLists(true)
      },
      getLists(){
		    let gm_id = this.gm_id;
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'lotteryLists',
          data:{gm_id:gm_id},
          success: res => {
            console.log(res.data.result)
            if(res.data.result.length>0){
              this.prizeList = res.data.result
            }
          },
          fail: err => {
            console.log(err);
          },
          complete:res=>{
            uni.hideLoading()
            this.show=true
          }
        });
      },
      getDesc(){
		    let gm_id = this.gm_id;
        this.$http({
          aurl: 'lotteryDetail',
		      data:{
            gm_id:gm_id,
          },
          needErrTips: false,
          success: res => {
            this.drawDetail = res.data.result
            this.prizeID = this.drawDetail.id
            console.log(this.drawDetail)
            this.getRecordLists(true)
          },
          fail: err => {
            console.log(err);
            uni.showModal({
              title: '温馨提示',
              content: err.message,
              showCancel: false,
              confirmColor: '#5C6F97',
              success (res) {
                if (res.confirm) {
                  uni.navigateBack();
                } else if (res.cancel) {
                  // console.log('用户点击取消')
                }
              }
            })
          },
          complete:res=>{
          }
        });
      },
    }
  }
</script>

<style lang="stylus" scoped>
  $actionBgUrl = 'https://ytxspt.ytholidayplaza.com/images/cj-activity/';
  .col-1668CC {
    color #1668CC
  }
  .noPrize{
    padding 100rpx 0
    text-align center
    font-size 50rpx
  }
  .toDet{
    width:80%
    margin:20rpx auto 0
    background #f5222d
    border-radius 20rpx
    text-align center
    line-height 70rpx
    height 70rpx
    color #fff
  }
  .prize-tit{
    position absolute;
    left 0
    text-align center
    top 40rpx
    font-size 44rpx
    color #fff
    width 100%
  }
  .prize-integral .imgBox image{
    width 120rpx
    height 120rpx
    margin 0 auto
  }
  .prize-integral .textBox{
    font-size 36rpx
    color #D4870E
  }
  .draw-logo{
    padding:52rpx 25px
  }
  .prize .imgBox image{
    width:140rpx
    height:140rpx
  }
  .prize-box{
    background:#f8f8f8
  }
  .draw-info{
    padding:40rpx 20rpx
  }
  .ex-close{
    position:absolute;
    bottom:-100rpx;
    left:50%;
    transform:translateX(-50%)
    .icon-roundclose{
      font-size: 60rpx;
    }
  }
  .icon-fontSize{
    font-size:24px
  }
  .home {
    // position: fixed;
    width:100%;
    height:1683rpx;
    background: url($actionBgUrl + 'pageBg.jpg');
    background-size:100% 100%;
    // overflow-y:scroll ;
  }
  .home .btn {
    border: 2rpx solid #fff;
    padding: 10rpx 24rpx;
    border-radius: 24rpx;
  }
  .home-title {
    text-align: center;
    margin-bottom: 50px;
  }
  .home-title__text {
    color: #000;
    font-size: 40px;
    font-weight: bold;
  }
  .home-wheel {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 auto;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    background-image: url($actionBgUrl + 'disc.png');
    @media (-webkit-min-device-pixel-ratio: 2),(min-device-pixel-ratio: 2) {
      background-image: url($actionBgUrl + 'disc.png');
      // background-image: url('https://bbc-test.gdalpha.com/images/draw1' + ".png");
    }
    @media (-webkit-min-device-pixel-ratio: 3),(min-device-pixel-ratio: 3) {
      background-image: url($actionBgUrl + 'disc.png');
      // background-image: url('https://bbc-test.gdalpha.com/images/draw1' + ".png");
    }
  }
  .home-result {
    text-align: center;
    margin-top: 50px;
  }
  .home-result__text {
    color: #fff;
    font-size: 20px;
    font-weight: bold;
  }
  .name_list_box {
    width 688rpx
    height 635rpx
    margin 10rpx auto 0
    padding 25rpx
    background-size 100% 100%
    background-image url($actionBgUrl + 'nameListBg.png')
  }
  .name_list_title {
    display flex
    padding 87rpx 0 30rpx
    border-bottom 1px solid #1668CC
  }
  .name_list_title view {
    flex 1
  }
  .name_lists {
    height 460rpx
  }
  .name_list_item {
    display flex
    align-items center
    // padding-top 12rpx
  }
  .name_list_item view {
    flex 1
  }
  .model-box >>> .em-modal-box {
    padding 0
  }

</style>
