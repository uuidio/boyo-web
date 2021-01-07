<template>
  <view class="apply-promoter-wrap p-md">
    <view class="wrap-top p-md bc-fff border-radius8">
      <view class="authentication-status-list">
        <view class="status-item active">
          <view class="item-num text-16 text-center">1</view>
          <view class="item-label text-13 mt-sm">实名认证</view>
        </view>
        <view class="connecting-line">
        </view>
        <view class="status-item">
          <view class="item-num text-16 text-center">2</view>
          <view class="item-label text-13 mt-sm">签约协议</view>
        </view>
        <view class="connecting-line">
        </view>
        <view class="status-item">
          <view class="item-num text-16 text-center">3</view>
          <view class="item-label text-13 mt-sm">受理审核</view>
        </view>
      </view>
      <view class="mt-md" v-if="status === 1">
        <view class="col-999 text-12">认证方式：请拍拍摄并上传身份证</view>
        <view class="identity-card-box fxBox2 mt-lg">
          <view class="upload-box">
            <upload-identity-card :max="1" type="front" @on-img="getImgFront" :square="false"></upload-identity-card>
          </view>
          <view class="upload-box">
            <upload-identity-card :max="1" type="back" @on-img="getImgOther" :square="false"></upload-identity-card>
          </view>
        </view>
      </view>
      <view class="electronic-agreement-box pb-xs" v-if="status === 2">
        <view class="text-big text-center pb-lg">欢迎你使用XXX服务</view>
        <view class="agreement-content col-666">
          1、甲方保证签署本协议不违反甲方以前签署过的其他文件，也不会置乙方于违法或违约的境地。
          2、甲方有义务为乙方提供相关的设计资料，并保证该设计资料的合法性。<br/>
          3、乙方有义务按照甲方提供的资料和要求完成本协议内容的设计项目。<br/>
          4、甲乙双方有责任对本协议的内容进行保密。 5、乙方为甲方的独家合作伙伴，甲方可享有价格的优惠权。
        </view>

      </view>
    </view>

    <view class="border-radius8 mt-12 pl-md pr-md bc-fff form" v-if="status === 1">
      <view class="fxBox2 form-item">
        <view class="label text-md">姓名：</view>
        <view class="fx1"><input v-model="formItem.real_name"  placeholder="请输入您的真实姓名" class="form-inp" type="text"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">证件号：</view>
        <view class="fx1"><input v-model="formItem.idNum"  placeholder="请输入您的身份证号" class="form-inp" type="number"></view>
      </view>

<!--      <view class="fxBox1 form-item">-->
<!--        <view class="label text-md">手机号：</view>-->
<!--        <view class="fx1"><input v-model="formItem.mobile"  placeholder="请输入手机号" class="form-inp" type="number"></view>-->
<!--      </view>-->
      <!--<view class="fxBox1 form-item">-->
        <!--<view class="label text-md">部门：</view>-->
        <!--<view class="fx1">-->
          <!--<picker :class="{'col-666':picker_name=='请选择部门'?true:false}" class="form-inp" @change="bindPickerChange" :value="picker_index" :range="pickerAll">-->
            <!--{{picker_name}}-->
          <!--</picker>-->
        <!--</view>-->
      <!--</view>-->
<!--      <view class="fxBox1 form-item" v-if="!partner_id">-->
<!--        <view class="label text-md">工号：</view>-->
<!--        <view class="fx1"><input v-model="formItem.job_number" placeholder="请输入工号" class="form-inp" type="text"></view>-->
<!--      </view>-->
<!--      <view v-if="partner_id">-->
<!--        <view class="fxBox1 form-item">-->
<!--          <view class="label text-md">推荐人手机：</view>-->
<!--          <view class="fx1">-->
<!--            <view  class="form-inp">-->
<!--              {{partner_detail.mobile}}-->
<!--            </view>-->
<!--          </view>-->
<!--        </view>-->
<!--        <view class="fxBox1 form-item">-->
<!--          <view class="label text-md">店铺名称：</view>-->
<!--          <view class="fx1"><input v-model="shop_name" placeholder="店铺名称" class="form-inp" type="text"></view>-->
<!--        </view>-->
<!--        <view class="fxBox1 form-item">-->
<!--          <view class="label text-md">店铺地址：</view>-->
<!--          <view class="fx1"><input v-model="address" placeholder="店铺地址" class="form-inp" type="text"></view>-->
<!--        </view>-->
<!--        &lt;!&ndash;<view class="uploadBox fxBox1 mt-md" >&ndash;&gt;-->
<!--          &lt;!&ndash;<view class="mr-md fx1" >&ndash;&gt;-->
<!--            &lt;!&ndash;<uploadImg :max="1" :imgWidth100="true" @on-img="getImgPositive" :square="false">&ndash;&gt;-->
<!--              &lt;!&ndash;<view class="uploadItem">身份证正面</view>&ndash;&gt;-->
<!--            &lt;!&ndash;</uploadImg>&ndash;&gt;-->
<!--          &lt;!&ndash;</view>&ndash;&gt;-->
<!--          &lt;!&ndash;<view class="fx1">&ndash;&gt;-->
<!--            &lt;!&ndash;<uploadImg :max="1" :imgWidth100="true" @on-img="getImgOther" :square="false">&ndash;&gt;-->
<!--              &lt;!&ndash;<view class="uploadItem">身份证反面</view>&ndash;&gt;-->
<!--            &lt;!&ndash;</uploadImg>&ndash;&gt;-->
<!--          &lt;!&ndash;</view>&ndash;&gt;-->
<!--        &lt;!&ndash;</view>&ndash;&gt;-->
<!--      </view>-->
<!--      <view class="uploadBox fxBox1 mt-md" v-if="!partner_id">-->
<!--        <view class="mr-md" style="width:50%">-->
<!--          <uploadImg :max="1" :imgWidth100="true" @on-img="getImgListsOne" :square="false">-->
<!--            <view class="uploadItem">工牌上传</view>-->
<!--          </uploadImg>-->
<!--        </view>-->
<!--      </view>-->
    </view>
    <view v-if="status === 1" class="agreement-box fxBox1 mt-lg">
      <view class="agreement-slt" @click="changeAgree">
        <view class="slt-default" v-if="!formItem.agree"></view>
        <image v-else class="slt-checked" src="https://egoss1.ytholidayplaza.com/images/default/202005/17/UawE8Y7GeBUHTBmqLB8czqSM5ECgxLItDgz98iFq.png"></image>
      </view>
      <text class="agreement-label text-12 col-999" @click="changeAgree">
        我已阅读了解并同意
      </text>
      <text class="agreement-name text-12 " @click="openPopup">《商城分销推广员协议》</text>
    </view>
    <view v-if="status === 2" class="agreement-box fxBox1 mt-lg">
      <view class="agreement-slt" @click="changeAgree">
        <view class="slt-default" v-if="!formItem.agree"></view>
        <image v-else class="slt-checked" src="https://egoss1.ytholidayplaza.com/images/default/202005/17/UawE8Y7GeBUHTBmqLB8czqSM5ECgxLItDgz98iFq.png"></image>
      </view>
      <text class="agreement-label text-12 col-999" @click="changeAgree">
        同意
      </text>
      <text class="agreement-name text-12 " @click="openPopup">《电子签约服务协议》</text>
    </view>

    <van-popup class="agreement-popup" custom-class='abc' :show="showPopup" :z-index="999999" custom-style="height: 60%;width:80%;">
      <view class="popup-main">
        <view class="popup-header text-big text-center mb-lg">
          商城分销推广员协议
        </view>
        <view class="popup-content col-666">
          双方本着自愿、平等、公平和诚信原则，在遵守国家法律法规的基础上，就本微商城分销业务开展事宜达成一致意见如下，以兹共同遵守：
          声明保证<br/>
          1 . 1 乙方在确认本协议之时须为能够独立承担民事责任的自然人，并有资格以及能力从事本协议项下之交易。<br/>
          1 . 2 乙方了解互联网的相关服务，并熟悉在线商城相关的销售和推广知识和技能及互联分销系统业务流程等相关信息。
          乙方的法律地位<br/>
          2 . 1 乙方以自身名义，成为甲方系统分销用户，并开展其业务。因此乙方必须遵从所有商业活动共同的法律要求。<br/>
          分销政策：<br/>
          3 . 1 微商佣金：具体佣金以商城推广的商品分佣金额为准<br/>
          3 . 2 分销佣金提现政策：佣金提现时间为销售产品后无退换货15天后提现。<br/>
          甲方权利和义务<br/>
          4 . 1 甲方应保证系统正常、高效、不间断运转。当系统由于政策性或者网络安全性原因无法访问，甲方负责尽快恢复访问，如最终确认无法恢复，乙方提现账户余额款项，甲方将以微信支付方式支付，并终止协议，甲方不承担其他相关责任。
          4 . 2 甲方有权审核乙方在分销开展其业务时发布的产品，凡是不符合要求、违反法律法规、公共道德准则、侵犯甲方以及供应商权益的内容，甲方将进行举报和要求删除。因乙方的以上行为给甲方及第三方造成的损失由乙方承担，甲方不承担由此产生的责任。<br/>
          4 . 3 甲方有权根据发展需要对系统的功能进行升级和调整，新增和变更的项目。 <br/>
          4 . 4 甲方负责货品物流快递，客户通过乙方购买产品后甲方及时处理快递给客户。<br/>
          4 . 5 甲方安排指定客服人员负责与乙方沟通、协调和培训，以保证双方合作的有序、高效。甲方人员变动，应及时通知乙方。<br/>
          乙方权利和义务<br/>
          5 . 1 乙方按照有关政策要求实名制，必须完善资料联系方式等。<br/>
          5 . 2 乙方可根据客户的需求，协助客户下订单并付款，此行为为乙方与客户双方的行为，所产生的一切责任与甲方无关。<br/>
          5 . 3 乙方作为系统分销推广员，应遵循甲方运营规范，认可甲方目前产品的表现形式，在合作期内，乙方可根据需要进行相应的系统宣传推广活动，但应保证不损害甲方声誉和权益。<br/>
          5 . 4 乙方向客户推广产品，不能超出产品说明或者供应商所承诺的范围向客户进行额外承诺。乙方可随时联系甲方，了解更多的产品资讯。如乙方私自向客户进行额外承诺，所产生的一切责任由乙方负责。<br/>
          5 . 5 客户通过乙方购买产品，由甲方快递给客户。如非因乙方责任而发生服务质量问题或者安全责任问题，由甲方负责处理，与乙方无关，但乙方可根据情况进行协调。<br/>
          第六条免责条款<br/>
          6 . 1 因可不抗力原因（包括非甲方原因造成的网路安全故障、银联系统故障、政策性变动等）不能履行协议的，免除违约方责任。双方不对因不可抗力可能引起的违约行为负责。<br/>
          第七条协议的解释<br/>
          7 . 1 本在线商城解释权归甲方所有，选择同意及为认同本协议！
        </view>
        <view class="popup-footer">
          <view class="popup-btn" @click="closePopup">我已阅读</view>
        </view>
      </view>

    </van-popup>
    <button v-if="status === 1" :disabled="flag?true:false" class="apply-btn text-30" @tap="submit">提交申请</button>
    <button v-if="status === 2" :disabled="flag?true:false" class="apply-btn text-30" >确认签署</button>
  </view>
</template>

<script>
  import uploadImg from "../../../components/uploadImg/uploadImg"
  import uploadIdentityCard from "../../components/uploadImg/uploadIdentityCard"

  export default {
    components:{
      uploadImg,
      uploadIdentityCard
    },
    data() {
      return {
        status: 1,
        showPopup: false,
        formItem:{
          agree: false,
          idNum: '',
          imgFront: '',
          imgBack: '',
          real_name:'',
          job_number:'',
          mobile:'',
          department:'',
          department_id:'',
          register_type:'per'
        },
        picker_name:'请选择部门',
        picker_index:'',
        lists:[],
        pickerAll:[],
        flag:false,
        partner_id:'',
        apply:false,
        partner_detail:{},
        shop_name:'',
        address:'',
        id_positive:'',
        id_other_side:'',
      };
    },
    onLoad(options){
      const user_info =JSON.parse(uni.getStorageSync('user_info'))
      if(user_info.mobile){
        this.formItem.mobile = user_info.mobile
      }
      if(options.partner_id){
        this.partner_id = options.partner_id
        // this.checkPartner()
      }
      // this.getDepartmenta()
    },
    methods: {
      closePopup(){
        this.showPopup = false
      },
      openPopup(){
        this.showPopup = true
      },
      changeAgree(){
        this.formItem.agree = !this.formItem.agree
      },
      getImgFront(url){
        this.formItem.imgFront = url
      },
      getImgBack(url){
        this.formItem.imgBack = url
      },
      getImgPositive(lists){
        if(lists.length>0){
          this.id_positive = lists[0]
        }else{
          this.id_positive = ''
        }
      },
      getImgOther(lists){
        if(lists.length>0){
          this.id_other_side = lists[0]
        }else{
          this.id_other_side = ''
        }
      },
      bindPickerChange(e){
        this.picker_index = e.target.value
        this.picker_name = this.pickerAll[this.picker_index]
        this.formItem.department_id = this.lists[this.picker_index].id
      },
      getImgListsOne(lists){
        if(lists.length>0){
          this.formItem.department = lists[0]
        }else{
          this.formItem.department = ''
        }
      },
      checkPartner(){
        this.$http({
          aurl: 'checkPartner',
          params:{
            partner_id:this.partner_id
          },
          success: res => {
            if(res.data.code===0){
              this.apply = res.data.result.apply
              this.partner_detail = res.data.result.partnerInfo
              console.log(res)
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      getDepartmenta(){
        this.$http({
          aurl: 'departmenta',
          success: res => {
            if(res.data.code===0){
              this.lists = res.data.result
              this.pickerAll = this.lists.map((item)=>{
                return item.name
              })
              console.log(this.pickerAll)
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      submit(){
        uni.showLoading({
          title: '提交中'
        });
        if(this.partner_id){
           delete this.formItem.job_number
           delete this.formItem.department
           delete this.formItem.department_id
           this.formItem.register_type = 'pt'
           this.formItem.address = this.address
           this.formItem.shop_name = this.shop_name
           this.formItem.partner_mobile = this.partner_detail.mobile
           this.formItem.partner_id = this.partner_id
           this.formItem.id_positive = this.id_positive
           this.formItem.id_other_side = this.id_other_side
        }
        this.flag = true
        this.$http({
          aurl: 'applyAction',
          data:this.formItem,
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
            const _this = this
            setTimeout(function(){
              uni.hideLoading()
              _this.flag = false
            },1000)
          }
        });
        console.log(this.formItem)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  @import '../../../variable.styl';
  .electronic-agreement-box
    margin-top 44rpx
    .agreement-content
      line-height 39rpx
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
  .agreement-box
    .agreement-slt
      margin-right 16rpx
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
  .identity-card-box
    .upload-box
      width 49%
  .authentication-status-list
    display flex
    justify-content center
    padding 36rpx 0
    .status-item
      display flex
      flex-direction column
      align-items center
      &.active
        .item-num
          background $font-color-primary
        .item-label
          color $font-color-primary
      .item-num
        height 72rpx
        width 72rpx
        line-height 72rpx
        border-radius 50%
        background #C7C7C7
        color #fff
      .item-label
        color #333
    .connecting-line
      height 2rpx
      background #c7c7c7
      width 15%
      margin-top 35rpx
      &.active
        background $font-color-primary
  .apply-btn
    position fixed
    width 94%
    left 3%
    bottom 32rpx
    height 76rpx
    line-height 76rpx
    border-radius 16rpx
    color #ffffff
    text-align center
    background $font-color-primary
  .uploadItem
    width 100%
    height 150rpx
    line-height 150rpx
    color #666
    text-align center
    border 1px dashed #e7e7e7
    border-radius 10rpx
  .form
    .form-item:last-of-type
      border-bottom 0
  .form-item
    height 88rpx
    border-bottom 1px solid #D7D7D7
    margin-left 20rpx
    .label
      flex-shrink 0
      color #777777
    .form-inp
      height 100%
      margin-left 20rpx
      text-align right
</style>
