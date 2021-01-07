<template>
  <view>
    <view  v-if="show">
      <view class="p-md m-md bc-fff border-radius5px">
        <view class="mb-md fxBox">
          申请人姓名：{{detail.real_name}}
        </view>
        <view class="mb-md fxBox">
          小店手机号：{{detail.mobile}}
        </view>
        <view class="mb-md fxBox">
          店铺名称：{{detail.shop_name}}
        </view>
        <view class="mb-md fxBox">
          店铺地址：{{detail.address}}
        </view>
        <view class="mb-md fxBox">
          分销商手机号：{{detail.partner_mobile}}
        </view>
        <view class="mb-md fxBox">
          审核状态：{{getStatusText}}
        </view>
        <view class="mb-md"  v-if="detail.apply_status=='fail'">
          驳回原因：{{detail.fail_reason}}
        </view>
        <view class="mb-md"  v-if="detail.apply_status=='fail'">
          驳回时间：{{detail.updated_at}}
        </view>
        <view class="mb-md fxBox">
          申请来源：{{detail.register_type_text}}
        </view>
      </view>
      <view v-if="detail.apply_status=='apply'" class="m-lg fxBox1 apply-btn">
        <view class="fx1 blue-btn" @tap="submit">
          同意
        </view>
        <view class="fx1 ml-lg" @tap="cancel">
          驳回
        </view>
      </view>
      <tui-modal :show="medalShow"  :custom="true" @cancel="medalShow=false">
        <view class="mb-lg text-center">驳回原因</view>
        <textarea placeholder="请输入驳回理由" class="fail-text" v-model="fail_reason" rows="4"></textarea>
        <view class="fxBox1 mt-lg apply-btn">
          <view class="fx1 blue-btn" @tap="fail">
            确认
          </view>
          <view class="fx1 ml-lg" @tap="medalShow=false">
            取消
          </view>
        </view>
      </tui-modal>
    </view>
  </view>
</template>

<script>
  import tuiModal from '../../../components/modal/modal'
  export default {
    components:{
      tuiModal
    },
    computed:{
      getStatusText(){
        let status_text = ''
        switch (this.detail.apply_status) {
          case 'apply':
            status_text = '申请中'
            break
          case 'success':
            status_text = '已通过'
            break
          case 'fail':
            status_text = '已驳回'
            break
        }
        return status_text
      }
    },
    data() {
      return {
        detail:{},
        show:false,
        fail_reason:'',
        medalShow:false,
        id:''
      };
    },
    onLoad(options){
      this.id = options.id
      this.getDetail(options.id)
      uni.showLoading({
        title: '加载中'
      });
    },
    methods: {
      cancel(){
          this.medalShow = true
      },
      fail(){
        if(this.fail_reason==''){
          this.showAlert('请输入驳回原因')
          return
        }
        this.audit(false,this)
      },
      getDetail(id){
        this.$http({
          aurl: 'applyRecordDetail',
          params:{
            id:id
          },
          success: res => {
            if(res.data.code==0){
              this.detail= res.data.result
            }
            console.log(res)
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            setTimeout(()=>{
              uni.hideLoading()
              this.show = true
            },300)
          }
        });
      },
      audit(flag,_this){
        let params  = {
          id:_this.id,
        }
        if(flag){
          params.apply_status = 'success'
        }else{
          params.apply_status = 'fail'
          params.fail_reason = _this.fail_reason
        }
        uni.showLoading({
          title: '提交中'
        });
        console.log(params)
        this.$http({
          aurl: 'checkerExamine',
          data:params,
          success: res => {
            if(res.data.code==0){
              _this.getDetail(_this.id)
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
            _this.medalShow = false
          }
        });
      },
      submit(){
        const _this = this
        uni.showModal({
          content:'确认同意该申请？',
          success(res){
            if(res.confirm){
             _this.audit(true,_this)
            }
          }
        })
      }
    },
    mounted() {

    },
  };
</script>

<style scoped lang="stylus">
  .fail-text
    width 100%
    border 1px solid #e7e7e7
    box-sizing border-box
    padding 5rpx
  .apply-btn
    >view
      height 70rpx
      line-height 70rpx
      text-align center
      background #f5222d
      border-radius 10rpx
      box-sizing border-box
      color #fff
    .blue-btn
      background #2b85e4
</style>
