<template>
  <view class="m-md">
    <view v-if="loading">
      <view class="bc-fff border-radius5px mb-md">
        <view class="billItem fxBox1 mr-md ml-md">
          <view class="text-md fw700 mr-md">物流公司</view>
          <view @tap="show = true" class="fx1"><text v-if="selectItem.name">{{selectItem.name}}</text><text v-else class="col-666">选择快递公司</text></view>
        </view>
        <view class="billItem fxBox1 mr-md ml-md" style="border-top:1px solid #e7e7e7">
          <view class="text-md fw700 mr-md">快递单号</view>
          <view class="fx1"><input type="number" v-model="formItem.logi_no" class="w100"  placeholder="请输入快递单号"></view>
        </view>
        <view v-if="type==='EXCHANGING_GOODS'">
          <view class="billItem fxBox1 mr-md ml-md" style="border-top:1px solid #e7e7e7">
            <view class="text-md fw700 mr-md">换货收货手机号</view>
            <view class="fx1"><input type="number" v-model="formItem.mobile" class="w100"  placeholder="请输入换货后商家寄回收货手机号"></view>
          </view>
          <view class="billItem fxBox1 mr-md ml-md" style="border-top:1px solid #e7e7e7">
            <view class="text-md fw700 mr-md">换货收货地址</view>
            <view class="fx1"><input type="text" v-model="formItem.receiver_address" class="w100"  placeholder="请输入换货后商家寄回收货地址"></view>
        </view>
        </view>
      </view>
      <view @tap="submit" class="submit-btn text-16">确定</view>
      <van-action-sheet
          :show="show"
          :actions="actions"
          @close="onClose"
          @select="onCodeSelect"
      />
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        loading:false,
        formItem:{
          aftersales_bn:'',
          corp_code:'',
          logi_name:'',
          logi_no:''
        },
        show:false,
        selectItem:{
          name:'',
          code:''
        },
        type:'',
        actions:[]
      };
    },
    onLoad:function(options){
      this.formItem.aftersales_bn = options.id
      this.type = options.type
      this.getExpress()
    },
    methods: {
      submit(){
        if(this.formItem.mobile){
          if(this.formItem.mobile.length!==11){
            uni.showToast({
              title: '请输入正确手机号',
              icon: 'none',
            })
            return
          }
        }
        this.$http({
          aurl:'sendback',
          data:this.formItem,
          success:res => {
            if(res.data.code===0){
              uni.showToast({
                title: '填写成功',
                icon: 'none',
              })
              setTimeout(function () {
                uni.navigateBack();
              },500)
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      onCodeSelect(e){
        this.selectItem = e.detail
        this.formItem.corp_code = e.detail.code
        this.formItem.logi_name = e.detail.name
        this.show = false
      },
      onClose(){
        this.show = false
      },
      getExpress(){
        this.$http({
          aurl:'getExpress',
          success:res => {
            if(res.data.code===0){
              for(let i=0;i<res.data.result.length;i++){
                const item = {
                  name:res.data.result[i].corp_name,
                  code:res.data.result[i].corp_code
               }
               this.actions.push(item)
                this.loading = true
              }
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
.billItem
  height 80rpx
.submit-btn
  height 90rpx
  line-height 90rpx
  background #e64340
  color #fff
  text-align center
  position fixed
  bottom 0
  left 0
  width 100%
</style>
