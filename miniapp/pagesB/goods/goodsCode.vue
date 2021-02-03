<template>
  <view>
    <view class="code-tabs fxBox1">
      <view @tap="active=0" :class="{active:active===0}" class="fx1 text-16">分享海报</view>
      <view @tap="active=1"  :class="{active:active===1}" class="fx1 text-16">商品素材</view>
    </view>
    <view v-if="active===0" class="pos-re code-box">
      <view class="bg" v-if="codeLodding"></view>
      <view class="pos-re100">
        <view class="mb-md pt-md text-center col-fff" v-if="codeLodding">
          邀请好友购买，你可赚{{detail.rewards}}元
        </view>
        <image v-if="codeLodding" :src="imagePath" mode="widthFix" class="showImg"></image>
        <painter style="position: absolute; top: -9999px;" :palette="template" @imgErr="imgErr" @imgOK="onImgOK" />
        <view class="btnLists fxBox1" v-if="codeLodding">
          <button class="fx1" open-type="share">
            分享好友
          </button>
          <view @tap="saveImg" class="fx1 ml-md">
            保存海报
          </view>
        </view>
      </view>

    </view>
    <view v-else>
      <view v-if="imgLists.length>0">
        <view class="p-md fxBox2">
          <view>
            选择图片
          </view>
          <view>
            已选择{{selectLists.length}}张图片
          </view>
        </view>
        <view class="imgLists">
          <view class="codeImgItem"  @tap="selectImg(item,index)" v-for="(item,index) in imgLists" :key='index'>
            <text  :class="{active:item.flag}" class="emfont icon-roundcheckfill checkIcon"></text>
            <image mode="aspectFill" :src="item.url"></image>
          </view>
        </view>
        <view class="p-md mt-sm bc-fff fxBox" v-if="detail.promo_article">
          <view class="copy-text line2-p fx1" data-line="3">
            推广文案：{{detail.promo_article}}
          </view>
          <view class="ml-xs copy-btn" @tap="copeCode">复制</view>
        </view>
        <view class="getImg" @tap="getImgs">保存图片</view>
      </view>
      <view v-else>
        <noData></noData>
      </view>
    </view>
  </view>
</template>

<script>
  import noData from '../../components/lists/nullData'
  export default {
    components:{
      noData
    },
    computed:{
      selectLists(){
        return this.imgLists.filter(item=>item.flag);
      }
    },

    onShareAppMessage(res) {
      const user_info  = uni.getStorageSync('user_info');
      const user_id = JSON.parse(user_info).user_id
      let path = '/pagesA/goods/detail?g='+this.goods_id +'&t=goods&p='+user_id+''
      console.log(path)
      this.goodsShare(user_id)
      return {
        title: '有好东西分享给你,快来看看',
        path: path,
        imageUrl: this.detail.goods_image,
        success: function(res){
          console.log('分享成功')
        },
      }
    },
    data() {
      return {
        goods_id:'',
        codeLodding:false,
        detail:{},
        template:'',
        imagePath:'',
        active:0,
        imgLists:[],
        flagLists:[]
      };
    },
    onLoad(options){
      uni.hideShareMenu();
      uni.showLoading({
        title: '加载中'
      });
      this.goods_id = options.id
      this.getDetail()
    },
    methods: {
      copeCode(){
        uni.setClipboardData({
          data: String(this.detail.promo_article),
          success: function(res) {
            uni.getClipboardData({
              success: function(res) {
                uni.showToast({
                  title: '已复制到剪贴板'
                });
              }
            });
          }
        })
      },
      goodsShare(id){
        this.$http({
          aurl: 'userShare',
          data:{
            share_type:'goods',
            fid:id
          },
          success: res => {
            console.log(res)
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      initData(){
        this.template = {
          background:'#fff',
          width: '700rpx',
          height: '930rpx',
          borderRadius:'20rpx',
          views: [
            {
              type: 'image',
              url:this.detail.shop.shop_logo,
              css: {
                top: '20rpx',
                left: '20rpx',
                width: '70rpx',
                height: '70rpx',
              },
            },
            {
              type: 'image',
              url:this.detail.goods_image,
              css: {
                top: '100rpx',
                left: '180rpx',
                width: '340rpx',
                height: '340rpx',
              },
            },
            {
              type: 'image',
              url:'https://egoss1.ytholidayplaza.com/images/default/202005/12/ucbztGijMeXL0y231oV3ASDawuaVxawhuzxSr3of.jpeg',
              css: {
                top: '570rpx',
                left: '0rpx',
                width: '700rpx',
                height: '50rpx',
              },
            },
            {
              type: 'text',
              text:this.detail.goods_name,
              css: {
                maxLines:2,
                top: '480rpx',
                left: '20rpx',
                width: '500rpx',
                fontSize: '32rpx',
                lineHeight:'40rpx',
              },
            },
            {
              type: 'text',
              text:'￥'+this.detail.goods_price,
              css: {
                top: '480rpx',
                right: '20rpx',
                width: '200rpx',
                textAlign:'right',
                fontSize: '32rpx',
                lineHeight:'40rpx',
                color:"red"
              },
            },
            {
              type: 'text',
              text:'价格￥'+this.detail.goods_marketprice,
              css: {
                top: '530rpx',
                right: '20rpx',
                width: '200rpx',
                textAlign:'right',
                fontSize: '24rpx',
                lineHeight:'40rpx',
                color:"#666",
              },
            },
            // {
            //   type: 'image',
            //   url:this.code,
            //   css: {
            //     bottom: '58rpx',
            //     left: '126rpx',
            //     width: '200rpx',
            //     height: '200rpx',
            //   },
            // },
            {
              type: 'image',
              url:this.code,
              css: {
                // bottom: '57rpx',
                // width: '200rpx',
                // height: '200rpx',
                // left: '163rpx',
                bottom: '118rpx',
                left: '126rpx',
                width: '140rpx',
                height: '140rpx',
              },
            },
            {
              type: 'text',
              text:'播丫Go小程序',
              css: {
                bottom: '56rpx',
                left: '102rpx',
                width: '200rpx',
                textAlign:'center',
                fontSize: '26rpx',
                lineHeight:'30rpx',
                color: "#333",
              },
            },
            {
              type: 'image',
              url:'https://egoss1.ytholidayplaza.com/images/default/202005/12/ZX0T5hn5sBv04U2saZW0MpxdvbvXm714aH8tY0q3.jpeg',
              css: {
                bottom: '57rpx',
                right: '126rpx',
                width: '146rpx',
                height: '200rpx',
              },
            },
          ],
        }
      },
      selectImg(item,index){
        item.flag = !item.flag;
      },
      getDetail() {
        this.$http({
          aurl: 'getWxMiniGoodsPerson',
          params:{
            id:this.goods_id
          },
          success: res => {
            if(res.data.code===0){
              console.log(res)
              this.detail = res.data.result.goods_info
              this.code = res.data.result.wx_mini_goods_person_qr;
              // this.detail.img_material = JSON.parse(this.detail.img_material)
              if(this.detail.img_material&&this.detail.img_material.length>0){
                this.imgLists =  this.detail.img_material.map(item=>{
                  return {
                    url:item.url,
                    flag:false
                  }
                })
              }
              this.initData()
            }
          },
          fail: error => {
            console.log(error);
          },
          complete:res=>{
          }
        });
      },
      onImgOK(e) {
        console.log(e)
        this.imagePath = e.detail.path;
        this.codeLodding = true
        uni.hideLoading();
      },
      imgErr(e){
        uni.hideLoading();
        uni.showModal({
          title:'提示',
          content:"生成海报失败，重新生成一下吧",
          showCancel:false,
        })
      },
      save(path){
        uni.saveImageToPhotosAlbum({
          filePath: path,
          success: (res) => {
            uni.showToast({
              title: '保存成功',
              icon: 'none'
            })
          },
          fail: (res) => {
            uni.getSetting({
              success: res => {
                let authSetting = res.authSetting
                if (!authSetting['scope.writePhotosAlbum']) {
                  uni.showModal({
                    title: '提示',
                    content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                    success(res) {
                      if (res.confirm) {
                        uni.openSetting()
                      }
                    }
                  })
                }
              }
            })
          }
        })
      },
      downloadImgs() {
        uni.getSetting({
          success: res => {
            let authSetting = res.authSetting
            if (!authSetting['scope.writePhotosAlbum']) {
              uni.showModal({
                title: '提示',
                content: '您未开启保存图片到相册的权限，请点击确定去开启权限！',
                success(res) {
                  if (res.confirm) {
                    uni.openSetting()
                  }
                }
              })
            }else{
              var _this = this
              // 获取保存到相册权限
              uni.showLoading({
                title: '加载中',
                mask: true
              })
              // 调用保存图片promise队列
              _this
                .queue(_this.selectLists)
                .then(res => {
                  uni.hideLoading()
                  uni.showToast({
                    title: '下载完成'
                  })
                })
                .catch(err => {
                  uni.hideLoading()
                  console.log(err)
                })
            }
          }
        })
      },
      queue(urls) {
        let promise = Promise.resolve()
        urls.forEach((item, index) => {
          promise = promise.then(() => {
            return this.download(item.url)
          })
        })
        return promise
      },
      download(url) {
        return new Promise((resolve, reject) => {
          uni.downloadFile({
            url: url,
            success: function(res) {
              var temp = res.tempFilePath
              uni.saveImageToPhotosAlbum({
                filePath: temp,
                success: function(res) {
                  resolve(res)
                },
                fail: function(err) {
                  reject(res)
                }
              })
            },
            fail: function(err) {
              reject(err)
            }
          })
        })
      },
      saveImg(){
        this.save(this.imagePath)
      },
      getImgs(){
        this.downloadImgs()
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .pos-re100
    position relative
  .copy-btn
    padding 0rpx 10rpx
    height 40rpx
    line-height 40rpx
    border-radius 8rpx
    background #f5222d
    color #fff
  .getImg
    width 80%
    position fixed
    bottom 40rpx
    left 10%
    border-radius 40rpx
    background #f5222d
    color #ffffff
    height 80rpx
    line-height 80rpx
    text-align center
  .imgLists
    display flex
    flex-wrap wrap
    padding 25rpx 25rpx 0
    background #fff
    .codeImgItem
      width 220rpx
      height 220rpx
      margin-bottom 25rpx
      position relative
      >image
        height 100%
        width 100%
      .checkIcon
        font-size 40rpx
        position absolute
        right 5rpx
        top 5rpx
        color #999
      .active
        color #f5222d
      &:not(:nth-child(3n))
        margin-right 20rpx
  .code-tabs
    >view
      height 90rpx
      line-height 90rpx
      text-align center
      color #999
      background #fff
      border-top 1px solid #e7e7e7
      box-sizing border-box
    .active
      color #f5222d
  .code-box
    position fixed
    height calc(100% - 90rpx)
    width 100%
    left 0
    top 90rpx
    overflow-y scroll
  .bg
    position fixed
    width 100%
    left 0
    top 90rpx
    height calc(100% - 90rpx)
    background #ff5650
  .showImg
    width 90%
    margin 0 auto
    display block
  .btnLists
    width 700rpx
    margin 20rpx auto 0
    >view,>button
      height 98rpx
      line-height 98rpx
      border-radius 10rpx
      font-size 36rpx
      color #333
      text-align center
      background #fff
</style>
