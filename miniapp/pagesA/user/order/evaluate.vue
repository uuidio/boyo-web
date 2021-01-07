<template>
  <view class="p-md rate-box">
     <view :key="index" class="border-radius5px bc-fff mb-sm p-md" v-for="(item,index) in formItem.rate_data">
       <view class="fxBox1">
          <view class="goods_img mr-md">
            <image :src="detail.trade_order[index].goods_image"></image>
          </view>
         <van-radio-group  :data-resultIndex="index" class="fxBox" :value="item.result" @change="evaChange">
           <van-radio class="mr-lg" name="good" checked-color="#e64340">好评</van-radio>
           <van-radio class="mr-lg" name="neutral" checked-color="#e64340">中评</van-radio>
           <van-radio name="bad" checked-color="#e64340">差评</van-radio>
         </van-radio-group>
       </view>
       <view class="eva-content">
         <view class="mb-xs">
           <input v-model="item.content" class="text-md" type="text" placeholder="请输入评价内容">
         </view>
          <view class="mt-md">
            <uploadImg :index="index" @on-img="getImgLists"></uploadImg>
          </view>
       </view>
       <view>
         <van-checkbox :value="item.anony" @tap="anonyChange(index,item.anony)" checked-color="#e64340">匿名</van-checkbox>
       </view>
     </view>
    <view class="border-radius5px bc-fff mb-sm p-sm">
     <view class="fxBox1 mb-md">
        <view class="text-16 mr-md">店铺评分</view><tui-rate :current="formItem.delivery_speed_score" @change="starChange1" :hollow="true"></tui-rate>
     </view>
      <view class="fxBox1 mb-md">
        <view class="text-16 mr-md">描述相符</view><tui-rate :current="formItem.tally_score" @change="starChange2" :hollow="true"></tui-rate>
      </view>
      <view class="fxBox1 mb-md">
        <view class="text-16  mr-md">服务态度</view><tui-rate :current="formItem.attitude_score" @change="starChange3" :hollow="true"></tui-rate>
      </view>
      <view class="fxBox1 mb-md">
        <view class="text-16  mr-md">物流服务</view><tui-rate :current="formItem.logistics_service_score" @change="starChange4" :hollow="true"></tui-rate>
      </view>
    </view>
    <view class="submitBtn" @tap="submit">
      提交
    </view>
  </view>
</template>

<script>
  import tuiRate from "../../../components/rate/rate";
  import uploadImg from "../../../components/uploadImg/uploadImg"
  export default {
    components:{
      tuiRate,
      uploadImg
    },
    data() {
      return {
        tid:'',
        percent:0,
        detail:{

        },
        lists:[],
        formItem:{
          tally_score:5,
          attitude_score:5,
          delivery_speed_score:5,
          logistics_service_score:5,
          rate_data:[],
          tid:''
        }
      };
    },
    methods: {
      submit(){
        const _this = this
        this.$http({
          aurl:'rateAdd',
          data:this.formItem,
          success:res => {
            if(res.data.code===0){
              uni.showToast({
                title: '评价成功',
                icon: 'none',
              })
              setTimeout(function(){
                _this.toBack()
              },500)
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
      getImgLists(imgItem){
        this.formItem.rate_data[imgItem.index].rate_pic = imgItem.lists
      },
      anonyChange(index,flag){
        this.formItem.rate_data[index].anony = !flag
      },
      evaChange(e){
        this.formItem.rate_data[e.currentTarget.dataset.resultindex].result = e.detail
      },
      evaCheckChange(e){
       this.formItem.anony = e.detail
      },
      starChange1(e){
        this.formItem.delivery_speed_score = e.index
      },
      starChange2(e){
        this.formItem.tally_score = e.index
      },
      starChange3(e){
        this.formItem.attitude_score = e.index
      },
      starChange4(e){
        this.formItem.logistics_service_score = e.index
      },
      getOrder(){
        this.$http({
          aurl:'orderDetail',
          params:{
            tid:this.tid
          },
          success:res => {
            if(res.data.code===0){
              this.detail = res.data.result
              this.detail.trade_order.forEach((item)=>{
                if(!item.after_sales_status){
                  this.lists.push(item)
                }else{
                  if(item.after_sales_status!=='SUCCESS'){
                    this.lists.push(item)
                  }
                }
              })
              this.lists.forEach((item) => {
                const items = {
                  anony:false,
                  oid:item.oid,
                  rate_pic:[],
                  content:'',
                  result:'good'
                }
                this.formItem.rate_data.push(items)
              })
              console.log(this.formItem)
            }
          },
          fail:error => {
            console.log(error)
          }
        })
      },
    },
    onLoad:function(options){
      this.tid = options.tid;
      this.formItem.tid = options.tid
      this.getOrder()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
.rate-box
  padding-bottom 100rpx
  .submitBtn
    height 90rpx
    width 100%
    text-align center
    font-size 28rpx
    line-height 90rpx
    color #fff
    position fixed
    bottom 0
    left 0
    background #e64340
.eva-content
  padding 20rpx 0
  margin 20rpx 0
  border-top 1px solid #e7e7e7
  border-bottom 1px solid #e7e7e7
.goods_img
  width 68rpx
  height 68rpx
  image
    width 100%
    height 100%
</style>
