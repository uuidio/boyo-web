<template>
  <view class="checkoutAdd">
    <view class="getWechatAdd border-radius5px fxBox2 p-md bc-fff" @tap="getAddr">
      <view class="fxBox1">
        <text class="emfont icon-locationfill mr-xs"></text>
        <text>获取微信收货地址</text>
      </view>
      <view class="emfont icon-right"></view>
    </view>
    <view class="checkoutAdd-lists mb-md">
      <view class="mt-md p-md bc-fff border-radius5px fxBox2" v-for="(item,index) in lists" :key="index">
          <view class="pr-md fx1">
            <view class="mb-xs">
              <text class="fw700 text-md mr-xs"><text class="col-red" v-if="item.id===default_id">[默认]</text> {{item.name}}</text>
              <text class="col-666 text-sm">{{item.tel}}</text>
            </view>
            <view class="line2-p col-666 text-sm" data-line="1">{{item.address}}</view>
          </view>
        <text class="emfont icon-write text-lg" @click="editAddr(item.id)"></text>
        <text class="emfont icon-delete_light text-lg ml-md" @click="deleteAddr(item.id)"></text>
      </view>
    </view>
    <view class="add-checkoutAdd col-red" @click="needTokenLink('/pagesA/user/addAddress')">
      <text class="emfont icon-roundadd mr-xs"></text><text>新增收货地址</text>
    </view>
  </view>
</template>

<script>
  import global from '../../mixins/global.js'

  export default {
    mixins: [global],
    data() {
      return {
        lists:[],
        default_id:'',
        addr_item:''
      };
    },
    onLoad:function(){
    },
    onShow(){
      this.getLists()
    },
    methods: {
      editAddr(id){
        this.toQueryLink('/pagesA/checkout/addCheckoutAdd',{addr_id:id})
      },
      deleteAddr(id){
        const _this = this
        uni.showModal({
          content:'确定删除该数据？',
          success: function (info) {
            if (info.confirm) {
              _this.$http({
                aurl:'deleteAddress',
                params:{
                  addr_id:id
                },
                success:res => {
                  if(res.data.code === 0){
                    _this.lists.forEach((item,index)=>{
                      if(item.id===id){
                        _this.lists.splice(index,1)
                      }
                    })
                  }
                },
                fail:error => {
                  console.log(error)
                }
              })
            }
          }
        })
      },
      getAddr(){
        const _this = this
        uni.getSetting({
          success(res) {
            if (res.authSetting['scope.address']) {
              uni.chooseAddress({
                success(res) {
                  const item ={
                    addr_id:0,
                    name:res.userName,
                    tel:res.telNumber,
                    province:res.provinceName,
                    city:res.cityName,
                    county:res.countyName,
                    address:res.detailInfo,
                    area_code:res.nationalCode,
                    is_default:0,
                    postal_code:res.postalCode
                  }
                  _this.$http({
                    aurl:'saveAddress',
                    data:item,
                    success:res => {
                      if(res.data.code===0){
                        _this.getLists()
                      }
                    },
                    fail:error => {
                      console.log(error)
                    }
                  })
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
                uni.chooseAddress({
                  success(res) {
                    const item ={
                      addr_id:0,
                      name:res.userName,
                      tel:res.telNumber,
                      province:res.provinceName,
                      city:res.cityName,
                      county:res.countyName,
                      address:res.detailInfo,
                      area_code:res.nationalCode,
                      is_default:0,
                      postal_code:res.postalCode
                    }
                    _this.$http({
                      aurl:'saveAddress',
                      data:item,
                      success:res => {
                        if(res.data.code===0){
                          _this.getLists()
                        }
                      },
                      fail:error => {
                        console.log(error)
                      }
                    })
                  }
                })
              }
            }
          }
        })
      },

      getLists(){
        this.$http({
          aurl:'userAddress',
          success:res => {
            this.lists = res.data.result.lists
            this.default_id = res.data.result.default_id
          },
          fail:error => {
            console.log(error)
          }
        })
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .checkoutAdd
    margin 20rpx 20rpx 0
    padding-bottom 90rpx
    >>>.van-radio
      align-items center
    .add-checkoutAdd
      position fixed
      bottom 0
      left 0
      width 100%
      background #ffffff
      height 90rpx
      line-height 90rpx
      text-align center
    >>>.van-radio
      flex 1
    >>>.van-radio__label
      flex 1
</style>
