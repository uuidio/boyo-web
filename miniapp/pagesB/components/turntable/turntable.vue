<template>
  <view>
    <view class="canvas-container" :style="{width: canvasWidth + 'px', height: canvasHeight + 'px'}">
      <canvas v-show="canvasShow" class="canvas" canvas-id="canvas" :style="'width:' + canvasWidth + 'px;height:' + canvasHeight + 'px;'"></canvas>
      <image v-if="!canvasShow" mode="widthFix" class="canvas" :style="'width:' + canvasWidth + 'px;height:' + canvasHeight + 'px;'" :src="ImgPath"></image>
      <cover-image v-show="canvasShow" mode="widthFix" src="https://ytxspt.ytholidayplaza.com/images/cj-activity/discBtn.png" class="start" @tap="playReward"></cover-image>
      <image v-if="ImgPath" class="start" mode="widthFix" src="https://ytxspt.ytholidayplaza.com/images/cj-activity/discBtn.png" @tap="playReward"></image>
    </view>
  </view>
</template>

<script>
  var turntable = require("./lib/turntable.js");
  export default {
    props: {
      // canvas 宽度
      canvasWidth: {
        type: Number,
        required: true
      },
      // canvas 高度
      canvasHeight: {
        type: Number,
        required: true
      },
      // 奖品列表
      prizeList: {
        type: Array,
        required: true
      },
      // 奖品名称所对应的 key 值
      strKey: {
        type: String,
        required: true
      },
      // 奖品图片所对应的 key 值
      imgKey: {
        type: String,
        required: true
      },
    },
    data() {
      return {
        ImgPath: '',
        canvasShow: false,
        showMyPrize: false,
        myPrizelist: [],
        showNoPrize: false,
        turntable: null,
        inLottery: false,
      }
    },
    mounted () {
      this.$nextTick(() => {
        setTimeout(() => {
          // 获取奖品列表
          this.initdata();
        }, 500)
      })
    },
    onReady: function(e) {},
    methods: {
      // 初始化抽奖数据
      initdata: function() {
        var that = this;
        // 画转盘
        var width = that.canvasWidth;
        var height = width;
        return new Promise(function(resolve, reject) {
          // uni.showLoading({
          //   title: '数据加载中'
          // });
          /*预下载所有的图片保存至本地,否则出现canvas绘制图片跨域,出现空白*/
          let tempIndex = 0;
          for (let i = 0; i < that.prizeList.length; i++) {
            uni.getImageInfo({
              src: that.prizeList[i][that.imgKey],
              success: imgInfo => {
                that.prizeList[i].localimage = imgInfo.path;
              },
              fail(err) {
                console.log('图片加载失败', err);
              },
              complete: () => {
                tempIndex++;
                if (tempIndex == that.prizeList.length) {
                  resolve('OK');
                }
              }
            });
          }
        })
        .then(function(r) {
          uni.hideLoading();
          that.turntable = turntable.wheelSurf("canvas", {
              $this: that,
              list: that.prizeList,
              strKey: that.strKey,
              imgKey: that.imgKey,
              width: width,
              height: height,
              outerCircle: {
                color: '#2F80E8' // 外圈颜色(可选)
              },
              innerCircle: {
                color: '#FBF099' // 里圈颜色(可选)
              },
              dots: ["#FBF0B0", "#FFFFFF"], // 装饰点颜色(可选)
              // disk: diskColor, //中心奖盘的颜色，默认7彩(可选)
              disk: ["#fbf3a6","#2F80E8"], //中心奖盘的颜色
              // disk: ["#FAFAFA","#BCF489","#EFB88E", "#EBE993", "#82E7D4","#19BD9F", "#16B960"], //中心奖盘的颜色，默认7彩(可选)
              // disk: ["#EE904A", "#D3D03D","#8AD049", "#16B960","#19BD9F","#17ABC1", "#EB678D","#F0675D"], //中心奖盘的颜色，默认7彩(可选)
              title: {
                color: '#B14A29',
                font: '13px Arial',
                lineHeight: 13
              }
          });
        },)
        .catch(function(reason) {
          uni.hideLoading();
          console.log('Failed: ' + reason);
        });
      },
      // 开启按钮开关及显示图片转盘
      initFlag(){
        this.inLottery = false
        this.canvasShow = false
      },
      playReward: function() {
        const token = uni.getStorageSync('user_token');
        if (!token) {
          this.toLink('/pagesB/user/bindUser')
          return
        }
        if (this.inLottery) return
        this.inLottery = true
        this.canvasShow = true
        this.$emit('actionStart')
        // this.lottery(false);
      },
      // 生成图片
      getImg(init=true){
        const that = this
        const width = this.canvasWidth;
        const height = width;
        uni.canvasToTempFilePath({
          width: width,
          height: height,
          canvasId: 'canvas',
          success: function(res) {
            that.ImgPath = res.tempFilePath
            if(init) {
              setTimeout(()=>{
                that.canvasShow = false
              },200)
              that.$emit('actionEnd')
            }
          }
        }, that)
      },
      //发起抽奖
      lottery(detail) {
        var that = this;
        var angel = 360 / that.prizeList.length;
        // 获取奖品
        var awards = detail;
        var count = 0;
        // 计算奖品角度
        for (var key in that.prizeList) {
          if (that.prizeList.hasOwnProperty(key)) {
            if (awards.id == that.prizeList[key].id) {
              break;
            }
            count++;
          }
        }
        that.turntable.lottery(count * angel + angel / 2, function() {
          // 计算转盘结束对时间，预加一些延迟确保转盘停止后触发结束事件
          let endTime = 0 * 1000 + 100
          setTimeout(function(){
            that.inLottery = false
            that.getImg()
          }, endTime)
        });
      },
    }
  }
</script>
<style lang="scss" scoped>
  /* 转盘 */
  .canvas-container {
    position: relative;
    left: 0;
    top: 0;
    margin: 0 auto;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .canvas {
    // width: 100%!important;
    position: absolute;
    // left: -9999px;
    // opacity: 0;
    display: flex;
    justify-content: center;
    align-items: center;

  }
  .start {
    position: absolute;
    top: calc(50% - 70rpx);
    left: calc(50% - 54rpx);
    width: 108rpx;
    height: 140rpx;
    // position: absolute;
    // top: 250rpx;
    // left: 50%;
    // transform:translateX(-50%);
    // width: 107rpx;
    // height: 140rpx;
    // cursor: pointer;
  }
</style>
