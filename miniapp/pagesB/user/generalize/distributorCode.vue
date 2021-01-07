<template>
  <view>
    <image v-if="codeLodding" :src="imagePath" mode="widthFix" class="showImg"></image>
    <painter style="position: absolute; top: -9999px;" :palette="template" @imgErr="imgErr" @imgOK="onImgOK" />
    <view  v-if="codeLodding" class="saveBtn" @tap="getImg">
      保存海报
    </view>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        codeLodding:false,
        imagePath:'',
        template:{

        },
        detail:{}
      };
    },
    onLoad(options){
      uni.hideShareMenu();
      uni.showLoading({
        title: '加载中'
      });
      this.getDetail()
    },
    methods: {
      initData(){
        this.template = {
          background:'#f3f5f7',
          width: '750rpx',
          height: '1060rpx',
          views: [
            {
              type: 'rect',
              css: {
                borderRadius:'20rpx',
                top: '120rpx',
                left: '75rpx',
                width: '600rpx',
                height: '820rpx',
                color:'#ffffff'
              },
            },
            {
              type: 'image',
              url:this.detail.headimgurl,
              css: {
                borderRadius:'130rpx',
                top: '55rpx',
                left: '310rpx',
                width: '130rpx',
                height: '130rpx'
              },
            },
            {
              type: 'text',
              text:this.detail.nickname,
              css: {
                color:'#333',
                textAlign:'center',
                top: '190rpx',
                height:'30rpx',
                left: '75rpx',
                width: '600rpx',
                fontSize:'32rpx'
              },
            },
            {
              type: 'text',
              text:'邀您成为奥飞俱乐部小店快来申请吧!',
              css: {
                color:'#666666',
                textAlign:'center',
                top: '240rpx',
                height:'30rpx',
                left: '75rpx',
                width: '600rpx',
                fontSize:'26rpx'
              },
            },
            {
              type: 'image',
              url:this.detail.partnerInfo.pt_wx_mini_qr,
              css: {
                top: '310rpx',
                left: '225rpx',
                width: '300rpx',
                height: '300rpx',
                borderWidth:'4rpx',
                borderColor:'#e64557'
              },
            },
            {
              type: 'rect',
              css: {
                top: '610rpx',
                left: '225rpx',
                width: '300rpx',
                height: '50rpx',
                borderWidth:'4rpx',
                borderColor:'#e64557',
                color:'#e64557'
              },
            },
            {
              type: 'text',
              text:'识别二维码立即申请加入',
              css: {
                textAlign:'center',
                top: '620rpx',
                left: '225rpx',
                width: '300rpx',
                height:'50rpx',
                color:'#fff'
              },
            },
            {
              type: 'image',
              url:'https://egoss1.ytholidayplaza.com/images/default/202005/12/YCTOWhbhkYvGLdXScoEuATJRCSS9PJtXnSsRW5Mn.png',
              css: {
                top: '728rpx',
                left: '138rpx',
                width: '475rpx',
                height: '212rpx',
              },
            },
          ],
        }
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
      getDetail(){
        this.$http({
          aurl: 'getPartnerInfo',
          success: res => {
            if(res.data.code==0){
              this.detail = res.data.result
              this.initData()
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
      getImg(){
        this.save(this.imagePath)
      }
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .showImg
    width 100%
    display block
  .saveBtn
    width 90%;
    height 80rpx
    line-height 80rpx
    background #ff4a41
    color #ffffff
    text-align center
    position fixed
    bottom 40rpx
    left 5%
    border-radius 10rpx
</style>
