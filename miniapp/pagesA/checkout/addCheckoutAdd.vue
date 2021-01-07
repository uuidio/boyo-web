<template>
  <view class="addCheckoutAdd">
    <view class="getWechatAdd border-radius5px fxBox2 p-md bc-fff" @tap="getWeChatAddr">
      <view class="fxBox1">
        <text class="emfont icon-locationfill mr-xs"></text>
        <text>获取微信收货地址</text>
      </view>
      <view class="emfont icon-right"></view>
    </view>
    <view class="add-input-lists border-radius5px mt-md mb-md p-md bc-fff">
      <view class="add-input fxBox1">
        <view class="fw700 add-label">
          收货人
        </view>
        <input  type="text" v-model="formItem.name" class="fx1" placeholder="请填写收货人姓名">
      </view>
      <view class="add-input fxBox1">
        <view class="fw700 add-label">
          手机号码
        </view>
        <input type="number" v-model="formItem.tel" class="fx1" placeholder="请填写收货人手机号码">
      </view>
      <view class="add-input fxBox1">
        <view class="fw700 add-label">
          所在地区
        </view>
        <view class="fx1" @click="showSelect = true">
          <text class="col-666" v-if="areaLists.length===0">选择省/市/区</text>
          <text v-else>
            {{areaLists[0].name}} {{areaLists[1].name}} {{areaLists[2].name}}
          </text>
        </view>
      </view>
      <view class="add-input fxBox1">
        <view class="fw700 add-label">
          详细地址
        </view>
        <input type="text" v-model="formItem.address" class="fx1" placeholder="街道、楼牌号等">
      </view>
    </view>
    <view class="border-radius5px fxBox2 p-md bc-fff">
      <text class="fw700">设置默认地址</text>
      <van-switch
          :checked="formItem.is_default===0?false:true"
          active-color="#07c160"
          size="16px"
          @change="getSwitch"
      />
    </view>
    <view class="submit-add text-md" @click="saveAddress">
      保存地址
    </view>
    <van-popup :show="showSelect" position="bottom">
      <van-area  :area-list="chinaArea"   @confirm="getArea" @cancel="cancelShow"/>
    </van-popup>
  </view>
</template>

<script>
    import chinaArea from '../static/vantArea.json';
    export default {
        data() {
            return {
                chinaArea,
                showSelect:false,
                areaLists:[],
                initChecked:false,
                formItem:{
                  addr_id:0,
                  name:'',
                  tel:'',
                  province:'',
                  city:'',
                  county:'',
                  address:'',
                  area_code:'',
                  is_default:0,
                  postal_code:''
                },
            };
        },
        onLoad:function(option){
          if(option.addr_id){
            this.getAddrDetail(option.addr_id)
          }
        },
        methods: {
          getWeChatAddr(){
            const _this = this
            uni.getSetting({
              success(res) {
                if (res.authSetting['scope.address']) {
                  uni.chooseAddress({
                    success(res) {
                      _this.formItem.name = res.userName
                      _this.formItem.tel = res.telNumber
                      _this.formItem.province = res.provinceName
                      _this.formItem.city = res.cityName
                      _this.formItem.county = res.countyName
                      _this.formItem.address = res.detailInfo
                      _this.formItem.area_code = res.nationalCode
                      _this.formItem.postal_code = res.postalCode
                      _this.add()
                    }
                  })
                } else {
                  if (res.authSetting['scope.address'] == false) {
                    uni.openSetting({
                      success(res) {
                        console.log(res.authSetting)
                      }
                    })
                  } else {
                    _this.formItem.name = res.userName
                    _this.formItem.tel = res.telNumber
                    _this.formItem.province = res.provinceName
                    _this.formItem.city = res.cityName
                    _this.formItem.county = res.countyName
                    _this.formItem.address = res.detailInfo
                    _this.formItem.area_code = res.nationalCode
                    _this.formItem.postal_code = res.postalCode
                    _this.add()
                  }
                }
              }
            })
          },
            getAddrDetail(id){
              this.$http({
                aurl:'addressDetail',
                aPath:[id],
                success:res => {
                  const detail = res.data.result
                  this.formItem = {
                      addr_id:detail.id,
                      name:detail.name,
                      tel:detail.tel,
                      province:detail.province,
                      city:detail.city,
                      county:detail.county,
                      address:detail.address,
                      area_code:detail.area_code,
                      is_default:detail.is_default,
                      postal_code:detail.postal_code
                  }
                  this.areaLists[0]={name:detail.province}
                  this.areaLists[1]={name:detail.city}
                  this.areaLists[2]={name:detail.county}
                },
                fail:error => {
                  console.log(error)
                }
              })
            },
          cancelShow(){
            this.showSelect = false;
          },
            getArea(e){
                this.areaLists = e.detail.values
                this.formItem.province = this.areaLists[0].name
                this.formItem.city = this.areaLists[1].name
                this.formItem.county = this.areaLists[2].name
                this.formItem.area_code = this.areaLists[2].code
                this.showSelect = false
            },
            getSwitch(e){
                this.formItem.is_default = Number(e.detail)
            },
            saveAddress(){
              if(this.formItem.addr_id===0){
                this.add()
              }else{
                this.edit()
              }
            },
            edit(){
              this.$http({
                aurl:'addressEdit',
                data:this.formItem,
                success:res => {
                  if(res.data.code===0){
                    this.toBack()
                  }
                },
                fail:error => {
                  console.log(error)
                }
              })
            },
            add(){
              this.$http({
                aurl:'saveAddress',
                data:this.formItem,
                success:res => {
                  if(res.data.code===0){
                    this.toBack()
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
.addCheckoutAdd
  margin 20rpx 20rpx 0
  .add-input-lists
    background #ffffff
    .add-input
      margin-bottom 30rpx
      .add-label
        width 140rpx
    .add-input:last-child
      margin-bottom 0
  .submit-add
    position fixed
    bottom 0
    width 100%
    height 90rpx
    line-height 90rpx
    background #e64340
    color #fff
    width 100%
    left 0
    text-align center
</style>
