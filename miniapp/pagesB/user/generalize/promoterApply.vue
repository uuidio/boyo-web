<template>
  <view class="applyBox">
    <view class="w100 top-bg-box">
      <image mode="widthFix" class="w100" src="https://egoss1.ytholidayplaza.com/images/default/202006/05/LYMdX8EMhz52rtLzd4oN3ptb3WcQyvE47JJK94tj.png"></image>
      <view class="box-tit">申请成为推广员</view>
    </view>
    <view>
      <view class="apply-status-list">
        <view class="status-item active">
          <view class="item-num text-16 text-center" v-if="!isVerified">1</view>
          <view class="item-num-img" v-else>
            <image src="https://egoss1.ytholidayplaza.com/images/default/202006/01/X2I8lhfxiWPJyE6RmQNJQwZJpNKHmZLIZF2d75VD.png"></image>
          </view>
          <view class="ml-lg">
            <view class="item-label text-16 fw700 fxBox1"><text>实名认证</text><view class="ex_ac text-13 col-999" @click="toRefresh">（ 刷新<text class="iconfont icon-refresh ml-sm text-13"></text> ）</view></view>
            <view class="sub-label col-999 fw700 text-13 mt-5">跳转小程序进行认证</view>
          </view>
        </view>
        <view class="connecting-line" :class="{active: isVerified}">
        </view>
        <view class="status-item">
          <view class="item-num text-16 text-center" v-if="!isVerified">2</view>
          <view class="item-num-img" v-else>
            <image src="https://egoss1.ytholidayplaza.com/images/default/202006/01/X2I8lhfxiWPJyE6RmQNJQwZJpNKHmZLIZF2d75VD.png"></image>
          </view>
          <view class="ml-lg">
            <view class="item-label text-16 fw700">签约协议</view>
            <view class="sub-label col-999 fw700 text-13 mt-5">跳转小程序进行电子签约服务</view>
          </view>
        </view>
        <view class="connecting-line" :class="{active: isVerified}">
        </view>
        <view class="status-item" :class="{active: isVerified}">
          <view class="item-num text-16 text-center" v-if="!agree">3</view>
          <view class="item-num-img" v-if="agree">
            <image src="https://egoss1.ytholidayplaza.com/images/default/202006/01/X2I8lhfxiWPJyE6RmQNJQwZJpNKHmZLIZF2d75VD.png"></image>
          </view>
          <view class="ml-lg">
            <view class="agreement-box fxBox1 item-label text-16 fw700">
              <view class="agreement-slt" @click="changeAgree">
                <view class="slt-default" v-if="!agree"></view>
                <image v-else class="slt-checked" src="https://egoss1.ytholidayplaza.com/images/default/202005/17/UawE8Y7GeBUHTBmqLB8czqSM5ECgxLItDgz98iFq.png"></image>
              </view>
              <text>
                已阅并同意申请
              </text>
            </view>
            <view class="agreement-name text-13 mt-5" @click="openPopup">《商城分销推广员协议》
            </view>
          </view>
        </view>
      </view>
    </view>
    <van-popup class="agreement-popup" :show="showPopup" :z-index="999999" custom-style="height: 60%;width:80%;">
      <view class="popup-main">
        <view class="popup-header text-big text-center mb-lg">
          商城分销推广员协议
        </view>
        <view class="popup-content col-666">
          双方本着自愿、平等、公平和诚信原则，在遵守国家法律法规的基础上，就本微商城分销业务开展事宜达成一致意见如下，以兹共同遵守：<br>
          声明保证 <br>
          1.1乙方在确认本协议之时须为能够独立承担民事责任的自然人，并有资格以及能力从事本协议项下之交易。<br>
          1.2乙方了解互联网的相关服务，并熟悉在线商城相关的销售和推广知识和技能及互联分销系统业务流程等相关信息。<br>
          乙方的法律地位<br>
          2.1乙方以自身名义，成为甲方系统分销用户，并开展其业务。因此乙方必须遵从所有商业活动共同的法律要求。<br>
          分销政策<br>
          3.1微商佣金：具体佣金以商城推广的商品分佣金额为准<br>
          3.2分销佣金提现政策：佣金提现时间为销售产品后无退换货15天后提现。<br>
          甲方权利和义务<br>
          4.1甲方应保证系统正常、高效、不间断运转。当系统由于政策性或者网络安全性原因无法访问，甲方负责尽快恢复访问，如最终确认无法恢复，乙方提现账户余额款项，甲方将以微信支付方式支付，并终止协议，甲方不承担其他相关责任。4.2甲方有权审核乙方在分销开展其业务时发布的产品，凡是不符合要求、违反法律法规、公共道德准则、侵犯甲方以及供应商权益的内容，甲方将进行举报和要求删除。因乙方的以上行为给甲方及第三方造成的损失由乙方承担，甲方不承担由此产生的责任。<br>
          4.3甲方有权根据发展需要对系统的功能进行升级和调整，新增和变更的项目。<br>
          4．4甲方负责货品物流快递，客户通过乙方购买产品后甲方及时处理快递给客户。<br>
          4.5甲方安排指定客服人员负责与乙方沟通、协调和培训，以保证双方合作的有序、高效。甲方人员变动，应及时通知乙方。<br>
          乙方权利和义务<br>
          5.1乙方按照有关政策要求实名制，必须完善资料联系方式等。<br>
          5.2乙方可根据客户的需求，协助客户下订单并付款，此行为为乙方与客户双方的行为，所产生的一切责任与甲方无关。<br>
          5.3乙方作为系统分销推广员，应遵循甲方运营规范，认可甲方目前产品的表现形式，在合作期内，乙方可根据需要进行相应的系统宣传推广活<br>
          动，但应保证不损害甲方声誉和权益。<br>
          5.4乙方向客户推广产品，不能超出产品说明或者供应商所承诺的范围向客户进行额外承诺。乙方可随时联系甲方，了解更多的产品资讯。如乙方私自向客户进行额外承诺，所产生的一切责任由乙方负责。<br>
          5.5客户通过乙方购买产品，由甲方快递给客户。如非因乙方责任而发生服务质量问题或者安全责任问题，由甲方负责处理，与乙方无关，但乙方可根据情况进行协调。<br>
          第六条免责条款<br>
          6.1因可不抗力原因（包括非甲方原因造成的网路安全故陣、银联糸统故陣、政策性变动等）不能履行协议的，免除违约方责任。双方不对因不可抗力可能引起的违约行为负责。<br>
          第七条协议的解释<br>
          7.1本在线商城解释权归甲方所有，选择同意及为认同本协议！<br>
        </view>
        <view class="popup-footer">
          <view class="popup-btn" @click="closePopup">我已阅读</view>
        </view>
      </view>

    </van-popup>
    <view class="apply-btn text-30" v-if="!isVerified" @click="toApplet">开始实名认证</view>
    <view class="apply-btn text-30" :class="{disabled: !agree}" v-else  @click="toApply">立即申请</view>

  </view>
</template>

<script>
  export default {
    data() {
      return {
        showPopup: false,
        isVerified: false,
        agree: false,
        partner_id: '',
        formItem: {
          mobile: '',
        },
      };
    },
    props:{
    },
    onLoad(options) {
      const user_info =JSON.parse(uni.getStorageSync('user_info'))
      if(user_info.mobile){
        this.formItem.mobile = user_info.mobile
      }
      if(options.partner_id){
        this.partner_id = options.partner_id
      }
    },
    onShow() {
      this.checkVerified();
    },
    methods: {
      to(){
        this.customTo({})
      },
      toRefresh(){
        this.checkVerified()
      },
      checkVerified(){
        uni.showLoading({title: '加载中...'});
        this.$http({
          aurl: 'checkVerified',
          needErrTips: false,
          success: res => {
            if(res.data.code === 0){
              this.isVerified = true
            }
          },
          fail: res => {
            if(res.data.code === 500){
              this.isVerified = false
            }
          },
          complete:res=>{
            uni.hideLoading();
          }
        });

      },
      toApplet(){ // 跳转小程序
        wx.navigateToMiniProgram({
          appId: 'wx3f629dd1316416ec',//小程序appid
          path: 'pages/loading/index?q=https%3A%2F%2Fstatics.xinshuibao1.com%2Fwechat%2Fmsign%2Fsign%3Ffunction%3Dsign%26projectId%3D611',//跳转关联小程序app.json配置里面的地址
          extraData: {//需要传递给目标小程序的数据，目标小程序可在 App.onLaunch()，App.onShow() 中获取到这份数据。
            // foo: 'bar'
          },
          //**重点**要打开的小程序版本，有效值 develop（开发版），trial（体验版），release（正式版）
          envVersion: 'release',
          success(res) {
            // 打开成功
            console.log(res);
          },
          fail: err => {
            console.log(err);
          },
        })
      },
      closePopup(){
        this.showPopup = false
      },
      openPopup(){
        this.showPopup = true
      },
      changeAgree(){
        this.agree = !this.agree
      },
      toApply(){
        if(!this.isVerified){
          return
        } else if(!this.agree){
          this.showAlert('请先勾选同意协议！')
          return
        }
        uni.showLoading({
          title: '提交中'
        });
        this.$http({
          aurl: 'applyAction',
          data: {
            register_type: 'per',
          },
          success: res => {
            if(res.data.code===0){
              this.showAlert('申请成功')
              this.toBack()
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            uni.hideLoading()
          }
        });
      }
    },
    mounted() {

    },
  };
</script>

<style scoped lang="stylus">
  @import '../../../variable.styl';
  .top-bg-box
    position relative
    .box-tit
      position absolute
      bottom 24%
      font-weight bold
      font-size 42rpx
      color #ffffff
      text-align center
      width 100%
  .agreement-popup
    .popup-main
      width 100%
      height 100%
      display flex
      flex-direction column
      overflow hidden
      padding 40rpx 28rpx 0
      box-sizing border-box
    .popup-header
      flex-shrink 0
    .popup-content
      flex 1
      line-height 39rpx
      overflow auto
    .popup-footer
      flex-shrink 0
      padding 28rpx 0
      .popup-btn
        height 76rpx
        background $font-color-primary
        border-radius 16rpx
        color #fff
        font-size 30rpx
        text-align center
        line-height 76rpx
  .apply-status-list
    margin 85rpx 0
    padding-left 25%
    .status-item
      display flex
      align-items center
      &.active
        .item-num
          background $font-color-primary
      .item-num
        height 72rpx
        width 72rpx
        line-height 72rpx
        border-radius 50%
        background #C7C7C7
        color #fff
        flex-shrink 0
      .item-num-img
        width 72rpx
        height 72rpx
        flex-shrink 0
        image
          width 100%
          height 100%
    .connecting-line
      width 2rpx
      height 51rpx
      background #C7C7C7
      margin 15rpx 36rpx
      &.active
        background $font-color-primary

    .agreement-slt
      margin-right 12rpx
      width 32rpx
      height 32rpx
    .slt-default
      width 100%
      height 100%
      border-radius 8rpx
      border 2rpx solid #666
      box-sizing border-box
    .slt-checked
      width 100%
      height 100%
      vertical-align baseline
      position relative
    .agreement-name
      color #00ADFF
      margin-left -10rpx

  .apply-btn
    width 94%
    height 76rpx
    line-height 76rpx
    border-radius 16rpx
    color #ffffff
    text-align center
    background #ff4a41
    position fixed
    bottom 32rpx
    left 3%
    &.disabled
      opacity .5
</style>
