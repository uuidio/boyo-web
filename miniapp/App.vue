<script>
export default {
  onLaunch: function(option) {
    uni.hideTabBar()
  },
  globalData: {
  },
  onShow: function(option) {
    uni.setStorageSync('gmToken', 1);
    if(option.query.gmToken){
      uni.removeStorageSync('gmToken');
    }
    console.log("App Show");
  },
  onHide: function() {
    console.log("App Hide");
  }
};
</script>

<style lang="stylus">
/*每个页面公共css */
@import "static/icon/iconfont/iconfont.css"
@import 'common.styl'
@import "wxcomponents/vant/common/index.wxss";
</style>
