<template>
  <view>
    <view class="m-md p-md bc-fff border-radius5px form">
      <view class="fxBox1 form-item">
        <view class="label text-md">姓名：</view>
        <view class="fx1"><input v-model="formItem.real_name"  placeholder="请输入真实姓名" class="form-inp" type="text"></view>
      </view>
      <view class="fxBox1 form-item">
        <view class="label text-md">手机号：</view>
        <view class="fx1"><input v-model="formItem.mobile"  placeholder="请输入手机号" class="form-inp" type="number"></view>
      </view>
      <!--<view class="fxBox1 form-item">-->
        <!--<view class="label text-md">部门：</view>-->
        <!--<view class="fx1">-->
          <!--<picker :class="{'col-666':picker_name=='请选择部门'?true:false}" class="form-inp" @change="bindPickerChange" :value="picker_index" :range="pickerAll">-->
            <!--{{picker_name}}-->
          <!--</picker>-->
        <!--</view>-->
      <!--</view>-->
      <view class="fxBox1 form-item" v-if="!partner_id">
        <view class="label text-md">工号：</view>
        <view class="fx1"><input v-model="formItem.job_number" placeholder="请输入工号" class="form-inp" type="text"></view>
      </view>
      <view v-if="partner_id">
        <view class="fxBox1 form-item">
          <view class="label text-md">推荐人手机：</view>
          <view class="fx1">
            <view  class="form-inp">
              {{partner_detail.mobile}}
            </view>
          </view>
        </view>
        <view class="fxBox1 form-item">
          <view class="label text-md">店铺名称：</view>
          <view class="fx1"><input v-model="shop_name" placeholder="店铺名称" class="form-inp" type="text"></view>
        </view>
        <view class="fxBox1 form-item">
          <view class="label text-md">店铺地址：</view>
          <view class="fx1"><input v-model="address" placeholder="店铺地址" class="form-inp" type="text"></view>
        </view>
        <!--<view class="uploadBox fxBox1 mt-md" >-->
          <!--<view class="mr-md fx1" >-->
            <!--<uploadImg :max="1" :imgWidth100="true" @on-img="getImgPositive" :square="false">-->
              <!--<view class="uploadItem">身份证正面</view>-->
            <!--</uploadImg>-->
          <!--</view>-->
          <!--<view class="fx1">-->
            <!--<uploadImg :max="1" :imgWidth100="true" @on-img="getImgOther" :square="false">-->
              <!--<view class="uploadItem">身份证反面</view>-->
            <!--</uploadImg>-->
          <!--</view>-->
        <!--</view>-->
      </view>
      <view class="uploadBox fxBox1 mt-md" v-if="!partner_id">
        <view class="mr-md" style="width:50%">
          <uploadImg :max="1" :imgWidth100="true" @on-img="getImgListsOne" :square="false">
            <view class="uploadItem">工牌上传</view>
          </uploadImg>
        </view>
      </view>
    </view>
    <button :disabled="flag?true:false" class="apply-btn text-18" @tap="submit">提交申请</button>
  </view>
</template>

<script>
  import uploadImg from "../../../components/uploadImg/uploadImg"
  export default {
    components:{
      uploadImg
    },
    data() {
      return {
        formItem:{
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
        this.checkPartner()
      }
      this.getDepartmenta()
    },
    methods: {
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
  .apply-btn
    position fixed
    width 80%
    left 10%
    bottom 40rpx
    height 90rpx
    line-height 90rpx
    border-radius 10rpx
    color #ffffff
    text-align center
    background #ff4a41
  .uploadItem
    width 100%
    height 150rpx
    line-height 150rpx
    color #666
    text-align center
    border 1px dashed #e7e7e7
    border-radius 10rpx
  .form-item
    height 80rpx
    margin-bottom 10rpx
    .label
      width 180rpx
      text-align right
    .form-inp
      height 80rpx
      border-bottom 1px solid #e7e7e7
      line-height 80rpx
      box-sizing border-box

</style>
