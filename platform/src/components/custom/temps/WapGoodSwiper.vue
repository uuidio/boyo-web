<template>
  <div>
    <div v-if="dataLists.length>0">
      <div class="goods-title fxBox2">
        <div class="fx1">{{config.title}}</div>
        <div><a-icon :type="config.is_open?'up':'down'" /></div>
      </div>
      <a-carousel :dots="true" :autoplay="true" v-show="config.is_open">
        <div v-for="(item,index) in goodsLists">
          <div class="goods-box">
            <div class="goods-item border-radius5px" v-for="(goods_item,goods_index) in item">
              <div class="w100 imgBox">
                <img class="w100 imgaa":src="goods_item.goods_image"/>
              </div>
              <div class="text-box" style="padding:5px">
                <div class="title">
                  {{goods_item.goods_name}}
                </div>
                <div>
                  <span class="col-red mr10">¥{{ goods_item.goods_price }}</span>
                  <span class="market-price">¥{{ goods_item.goods_marketprice }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-carousel>
    </div>
    <div v-else class="img_null">
      <p class="fs16">点击添加商品</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  computed:{
    goodsLists(){
      const arrs = []
      let arr = []
      for(let i = 0;i<this.dataLists.length;i++){
        arr.push(this.dataLists[i])
        if(i%4===3){
          arrs.push(arr)
          arr = []
        }
        if(i==this.dataLists.length-1&&arr.length>0){
          arrs.push(arr)
          arr = []
        }
      }
      return arrs
      console.log(arrs)
    }
  },
  props: {
    dataLists:{
      type:Array,
      default:[]
    },
    config: Object,
  },
  methods: {},
  mounted() {

  },
  watch:{
    dataLists(val){
    }
  }

};
</script>

<style lang="stylus" scoped>
  .goods-title
    padding 5px
    margin 0px 10px
    background #fff
  .title
    color #333
    font-weight 400
    font-size $font-base
    text-overflow ellipsis
    display -webkit-box
    -webkit-line-clamp 2
    -webkit-box-orient vertical
    margin-bottom 7px
    overflow hidden
    height 38px
  .money
    font-size $font-md
    line-height 40px
    .price
      color $font-color-primary
      font-size $font-lg
      font-weight bold
    .market-price
      font-size 12px
      color #a0a0a0
      text-decoration line-through
      padding-left 6rpx
  .goods-box
    padding 10px 10px 0
    display flex
    flex-wrap wrap
    .goods-item
      width 49%
      margin-bottom 10px
      background #ffffff
      &:nth-child(2n)
        margin-left 2%
      .imgBox
        width 100%
        img
          width 100%
</style>
