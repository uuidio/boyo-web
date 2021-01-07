<template>
  <a-card title="选择适用商品" :bordered="false">
    <getGoods @selectOk="getGoodsList">
      <a-button type="primary" size="large" style="width:100%">选择商品</a-button>
    </getGoods>
    <ul class="item-lists">
      <li v-for="(item,index) in formItem.limit_goods">
        <a-row type="flex" align="middle">
          <a-col :xs="12" :sm="18">
            <div class="goods-item">
              <div class="imgBox">
                <img :src="item.goods_image" alt="">
              </div>
              <div>
                <p>{{item.goods_name}}</p>
                <p class="col-red">￥{{item.goods_price}}</p>
              </div>
            </div>
          </a-col>
          <!--<a-col :xs="6" :sm="3">-->
            <!--<a>编辑sku</a>-->
          <!--</a-col>-->
          <a-col :xs="6" :sm="3">
            <a @click="delGoods(index)">删除</a>
          </a-col>
        </a-row>
      </li>
    </ul>
    <!--<div class="mt10">-->
      <!--<a-radio-group  name="radioGroup" v-model="formItem.is_bind_goods">-->
        <!--<a-radio value="1">以上选择商品参与优惠券活动</a-radio>-->
        <!--&lt;!&ndash;<a-radio value="2">以上选择商品不参与优惠券活动</a-radio>&ndash;&gt;-->
      <!--</a-radio-group>-->
      <!--&lt;!&ndash;<p class="col-666 mt10">&ndash;&gt;-->
        <!--&lt;!&ndash;（该选项在选择商品后选用，不选择商品默认全商品适用优惠券）&ndash;&gt;-->
      <!--&lt;!&ndash;</p>&ndash;&gt;-->
    <!--</div>-->
  </a-card>
</template>

<script>
  import getGoods from '@C/goodsList/goodsList';

  export default {
        components:{
          getGoods
        },
        data() {
            return {
              formItem:{
                limit_goods:[],
                is_bind_goods:'1'
              }
            };
        },
        methods: {
          getGoodsList(item) {
            if (this.formItem.limit_goods.length == 0) {
              let itemdata = [];
              for (let i = 0; i < item.length; i++) {
                itemdata[i] = {
                  id:item[i].id,
                  goods_name:item[i].goods_name,
                  goods_price:item[i].goods_price,
                  goods_image:item[i].goods_image,
                };
              }
              this.formItem.limit_goods = itemdata;
            } else {
              for (let i = 0; i < item.length; i++) {
                let itemdata = {
                  id:item[i].id,
                  goods_name:item[i].goods_name,
                  goods_price:item[i].goods_price,
                  goods_image:item[i].goods_image,
                };
                if(JSON.stringify(this.formItem.limit_goods).indexOf(JSON.stringify(itemdata))===-1){
                  this.formItem.limit_goods.push(itemdata)
                }
              }
            }
            // console.log('item',this.formItem.limit_goods);
          },
          delGoods(index) {
            this.formItem.limit_goods.splice(index, 1);
          },
        },
        mounted() {
        },
        watch:{
          formItem:{
            deep:true,
            handler:function(){
              this.$emit('get-goods',this.formItem.limit_goods)
            }
          },

        },
    };
</script>

<style scoped lang="stylus">
  .item-lists
    margin-top 10px
  li
    border 1px solid #efefef
    >>>.ant-row-flex>div
      padding 8px
      vertical-align middle
      .goods-item
        display flex
      .imgBox
        width 60px
        margin-right 15px
        img
          width 100%
  @media screen and (min-width:768px)
    >>>.ant-col-md-3
      text-align right
    .reduction
      display inline-block
</style>
