<template>
  <view class="page-wrap">
    <view class="wrap-top">
     <image class="top-bg" src="../static/images/camera-bg.png" mode="widthFix" @click="upload"></image>
    </view>
    <view class="wrap-main">
      <view class="wrap-content">
        <navigator class="link-item" hover-class="none"  :url="'/pagesA/user/point?gm_id='+gm_id">
          <view class="link-l">
            <view class="link-icon">
              <van-icon name="newspaper-o" size="80rpx"/>
            </view>
            <view class="link-content">
              <view class="link-name">
                积分明细
              </view>
              <view class="link-label">明细记录，查找容易</view>
            </view>
          </view>
          <view class="link-r">
            <text class="iconfont icon-right"></text>
          </view>

        </navigator>
        <navigator class="link-item" hover-class="none"  :url="'/pagesA/user/point?nav=1&gm_id='+gm_id">
          <view class="link-l">
            <view class="link-icon">
              <van-icon name="points" size="80rpx"/>
            </view>
            <view class="link-content">
              <view class="link-name">
                积分指南
              </view>
              <view class="link-label">积分使用规则，帮你解答</view>
            </view>
          </view>
          <view class="link-r">
            <text class="iconfont icon-right"></text>
          </view>

        </navigator>
        <navigator class="link-item" hover-class="none"  :url="'/pagesA/selfHelpScore/ticketRecord?gm_id=' + gm_id">
          <view class="link-l">
            <view class="link-icon">
              <van-icon name="notes-o" size="80rpx"/>
            </view>
            <view class="link-content">
              <view class="link-name">
                小票记录
              </view>
              <view class="link-label">
                自助积分审核，实时知晓</view>
            </view>
          </view>
          <view class="link-r">
            <text class="iconfont icon-right"></text>
          </view>

        </navigator>
      </view>
    </view>
  </view>
</template>

<script>
import { config } from "../../static/base/server2";
export default {
  components: {
  },
  data() {
    return {
      gm_id: '',
    };
  },
  onLoad: function(options) {
    if(options.gm_id){
      this.gm_id = options.gm_id;
      uni.setStorageSync('gmToken', this.gm_id);
      this.handleHasSetDefault();
    }
  },
  onShow() {},
  mounted() {},
  methods: {
    //选择图片
    upload(){
      const _this = this
      const _url = config.api_base_url + config.apiLinks.uploadImg.url
      let tempToken = uni.getStorageSync('user_token');
	  if (!tempToken) {
	    uni.navigateTo({
	      url: '/pagesA/user/bindUser',
	    });
	    throw "token无效";
		return;
	  }
      const headers = {
        Accept: 'application/json',
        Authorization: `Bearer ${tempToken}`,
      }
      uni.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
        sourceType: ['album', 'camera'],
        success: (chooseImageRes) => {
			uni.showLoading({
				title: '信息上传中...',
				icon: 'none'
			});
          const tempFilePaths = chooseImageRes.tempFilePaths;
          uni.uploadFile({
            url: _url,
            filePath: tempFilePaths[0],
            header:headers,
            name: 'image',
            success: (uploadFileRes) => {
              const item = JSON.parse(uploadFileRes.data)
              _this.$http({
                aurl: 'uploadTicketImg',
                data: {
                  uploaded_data: [item.result.pic_url],
                  gm_id: _this.gm_id,
                },
                success: res => {
                  if (res.data.code === 0) {
                    uni.showToast({
                      title: '上传成功',
                      icon: 'success',
                    })
                  }
                },
                fail: error => {
                  console.log(error);
                },
                complete: () => {
					uni.hideLoading();
                }
              });
            }
          });
        }
      });
    },
    handleHasSetDefault(){
      const _this = this
      this.$http({
        aurl: 'hasSetDefault',
        data:{
            gm_id: _this.gm_id,
        },
        success: res => {
          console.log(res);
        },
        error: err => {
          console.log(err);
        },
      });
    },
  }
};
</script>

<style scoped lang="stylus">
  .page-wrap
    /*&:before*/
    /*  content ''*/
    /*  width 100%*/
    /*  height 1rpx*/
    /*  background #D7D7D7*/
    /*  position fixed*/
    /*  top 0*/
    /*  left 0*/
    .wrap-top
      padding 30rpx 20rpx
      background #fff
      .top-bg
        width 100%
        vertical-align top
    .wrap-main
      padding 20rpx
      .wrap-content
        .link-item
          display flex
          align-items center
          justify-content space-between
          padding 40rpx 30rpx
          background #fff
          border-radius 16rpx
          margin-bottom 20rpx
          .link-l
            display flex
            align-items center
            .link-icon
              flex-shrink 0
              margin-right 40rpx
            .link-content
              .link-name
                font-size 26rpx
                color #333
              .link-label
                font-size 24rpx
                color #999
                margin-top 10rpx
        .link-r
          flex-shrink 0
          margin-left 20rpx
          .icon-right
            font-size 30rpx
            color #333
</style>
