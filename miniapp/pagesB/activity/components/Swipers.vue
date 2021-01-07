<template>
  <view :style="{'margin':px(config.mT)+' '+px(config.mL)}">
    <view class="pos-re" :style="{height:imgheights[swiperCurrent]+'rpx;'+'position: relative;'}">
      <swiper class="carousel" circular @change="swiperChange" :style="{height:imgheights[swiperCurrent]+'rpx'}" :autoplay="true">
        <swiper-item v-for="(item, index) in options" :key="index" class="carousel-item"  @tap="to(item)">
          <image :data-index='index' @load="imageLoad" :style="{'borderRadius':px(config.r),height:'100%'}" :src="item.url"/>
        </swiper-item>
      </swiper>
      <!-- 自定义swiper指示器 -->
      <view class="swiper-dots" v-if="options.length>0">
        <text class="num">{{ swiperCurrent + 1 }}</text>
        <text class="sign">/</text>
        <text class="num">{{ options.length }}</text>
      </view>
    </view>
  </view>
</template>

<script>
  export default {
    props: {
      options:{
        type:Array,
        default:[]
      },
      config: Object,
    },
    data() {
      return {
        swiperCurrent:0,
        imgheights:[],
      };
    },
    methods: {
      px(num){
        return uni.upx2px(num*2) + 'px'
      },
      to(item){
        if(!item.value){
          return
        }
        this.customTo(item)
      },
      swiperChange(e) {
        const index = e.detail.current;
        this.swiperCurrent = index;
        // this.titleNViewBackground = this.carouselList[index].background;
      },
      imageLoad: function (e) {
        //获取图片真实宽度
        var imgwidth = e.detail.width,
          imgheight = e.detail.height,
          //宽高比
          ratio = imgwidth / imgheight;
        console.log('图片',e);
        //计算的高度值
        var viewHeight = 750 / ratio;
        var imgheight = viewHeight
        var imgheights = this.imgheights
        //把每一张图片的高度记录到数组里
        imgheights[e.target.dataset['index']] = imgheight;// 改了这里 赋值给当前 index
        this.imgheights = [].concat(imgheights)
      },
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
  .carousel
    width 100%
    height: 420rpx;
    .carousel-item
      width 100%
      height 100%
      overflow hidden
      box-sizing border-box
    image
      width 100%
      height 100%
  .swiper-dots
    display flex
    position absolute
    left 45rpx
    bottom 15rpx
    width 72rpx
    height 36rpx
    background-image url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAABkCAYAAADDhn8LAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyZpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMTMyIDc5LjE1OTI4NCwgMjAxNi8wNC8xOS0xMzoxMzo0MCAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk4MzlBNjE0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk4MzlBNjA0NjU1MTFFOUExNjRFQ0I3RTQ0NEExQjMiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIDIwMTcgKFdpbmRvd3MpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6Q0E3RUNERkE0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6Q0E3RUNERkI0NjExMTFFOTg5NzI4MTM2Rjg0OUQwOEUiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz4Gh5BPAAACTUlEQVR42uzcQW7jQAwFUdN306l1uWwNww5kqdsmm6/2MwtVCp8CosQtP9vg/2+/gY+DRAMBgqnjIp2PaCxCLLldpPARRIiFj1yBbMV+cHZh9PURRLQNhY8kgWyL/WDtwujjI8hoE8rKLqb5CDJaRMJHokC6yKgSCR9JAukmokIknCQJpLOIrJFwMsBJELFcKHwM9BFkLBMKFxNcBCHlQ+FhoocgpVwwnv0Xn30QBJGMC0QcaBVJiAMiec/dcwKuL4j1QMsVCXFAJE4s4NQA3K/8Y6DzO4g40P7UcmIBJxbEesCKWBDg8wWxHrAiFgT4fEGsB/CwIhYE+AeBAAdPLOcV8HRmWRDAiQVcO7GcV8CLM8uCAE4sQCDAlHcQ7x+ABQEEAggEEAggEEAggEAAgQACASAQQCCAQACBAAIBBAIIBBAIIBBAIABe4e9iAe/xd7EAJxYgEGDeO4j3EODp/cOCAE4sYMyJ5cwCHs4rCwI4sYBxJ5YzC84rCwKcXxArAuthQYDzC2JF0H49LAhwYUGsCFqvx5EF2T07dMaJBetx4cRyaqFtHJ8EIhK0i8OJBQxcECuCVutxJhCRoE0cZwMRyRcFefa/ffZBVPogePihhyCnbBhcfMFFEFM+DD4m+ghSlgmDkwlOgpAl4+BkkJMgZdk4+EgaSCcpVX7bmY9kgXQQU+1TgE0c+QJZUUz1b2T4SBbIKmJW+3iMj2SBVBWz+leVfCQLpIqYbp8b85EskIxyfIOfK5Sf+wiCRJEsllQ+oqEkQfBxmD8BBgA5hVjXyrBNUQAAAABJRU5ErkJggg==')
    background-size 100% 100%
    align-items center
  .num
    width 36rpx
    height 36rpx
    border-radius 50px
    font-size 24rpx
    color #fff
    text-align center
    line-height 36rpx
  .sign
    position absolute
    top 0
    left 50%
    line-height 36rpx
    font-size 12rpx
    color #fff
    transform translateX(-50%)
</style>
