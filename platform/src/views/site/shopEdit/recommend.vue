<template>
  <div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">首页推荐商品
            <!-- <a-tag class="ml10" color="blue">商品图建议使用尺寸750x200~250像素以上、大小不超过1M的图片</a-tag> -->
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createHomeRecommend = true">编辑</a-button>
          <CreateCarousel :is-open="createHomeRecommend"
                          :page="'index'"
                          :group="'recommend'"
                          type="show_list"
                          :max-num="20"
                          modelName="首页推荐"
                          :hotGoods="false"
                          :default-data="homeRecommendGoodList"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.site_id" :columns="hotGoods.field" :dataSource="homeRecommendGoodList">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
          <img slot="goods_image" slot-scope="goods_image" :src="goods_image" alt="" height="50">
        </a-table>
      </div>
    </div>
	<div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">会员推荐商品
            <!-- <a-tag class="ml10" color="blue">商品图建议使用尺寸750x200~250像素以上、大小不超过1M的图片</a-tag> -->
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createPersonRecommend = true">编辑</a-button>
          <CreateCarousel :is-open="createPersonRecommend"
                          :page="'member'"
                          :group="'recommend'"
                          :type="'show_list'"
                          :max-num="20"
                          modelName="会员推荐"
                          :hotGoods="false"
                          :default-data="personRecommendGoodList"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.site_id" :columns="hotGoods.field" :dataSource="personRecommendGoodList">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
          <img slot="goods_image" slot-scope="goods_image" :src="goods_image" alt="" height="50">
        </a-table>
      </div>
    </div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">购物车推荐商品
            <!-- <a-tag class="ml10" color="blue">商品图建议使用尺寸750x200~250像素以上、大小不超过1M的图片</a-tag> -->
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createCartRecommend = true">编辑</a-button>
          <CreateCarousel :is-open="createCartRecommend"
                          :page="'cart'"
                          :group="'recommend'"
                          :type="'show_list'"
                          :max-num="20"
                          modelName="购物车推荐"
                          :hotGoods="false"
                          :default-data="cartRecommendGoodList"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.site_id" :columns="hotGoods.field" :dataSource="cartRecommendGoodList">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
          <img slot="goods_image" slot-scope="goods_image" :src="goods_image" alt="" height="50">
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import CreateCarousel from './components/CreateCarousel';
import { mapState, mapActions } from 'vuex';
import { recommendFoodsField } from '@/config/site';
import helper from '@/utils/helper';
export default {
  name: 'index',
  components: {
    CreateCarousel,
  },
  data() {
    return {
      createCarousel: false,
	  createHomeRecommend:false,
    createPersonRecommend:false,
	  createCartRecommend:false,
      hotValue:[],
      carousels: {
        field: recommendFoodsField,
        data: [],
      },
      hotGoods:{
        field: recommendFoodsField,
        data: [],
      }
    };
  },
  computed: {
    ...mapState({
	  homeRecommendGoodList: state => state.config.homeRecommendGoodList,
	  personRecommendGoodList: state => state.config.personRecommendGoodList,
    cartRecommendGoodList:state => state.config.cartRecommendGoodList,
    }),
  },
  watch: {
    siteConfig() {
      if(this.siteConfig.hot_goods.length>0){
        this.hotValue = this.siteConfig.hot_goods[0].value
      }
    },
  },
  methods: {
    ...mapActions({
      getRecommendList: 'config/getRecommendList',
    }),
    handleCarousel(modalState, params) {
		// console.log('1',modalState)
		// console.log('2',params)
    this.createCarousel=modalState
	  this.createHomeRecommend=modalState
    this.createPersonRecommend=modalState
	  this.createCartRecommend=modalState
    //   if(params!==undefined){
    //     if(params.group==='hot_goods'||params.group==='goods_swiper'){
    //       if(params.value.length>0){
    //         let ids = []
    //         for(let j =  0;j < params.value.length;j++){
    //           ids.push([])
    //           for(let i=0;i<params.value[j].value.length;i++){
    //             ids[j].push(params.value[j].value[i].id)
    //           }
    //         }
    //         for(let o = 0;o<ids.length;o++){
    //           params.value[o].value = ids[o]
    //         }
    //         console.log(params)
    //       }
    //     }
    //   }

      if (params !== undefined) {
        this.$store.dispatch('config/addRecommendList', { params });
        helper.reload();
      }
	},

  },
  mounted() {
	this.getRecommendList({params:{ page: 'index' ,group:'recommend'}});//首页
  this.getRecommendList({params:{ page: 'member' ,group:'recommend'}});//会员
	this.getRecommendList({params:{ page: 'cart' ,group:'recommend'}});//购物车
  },
};
</script>
<style lang="stylus" scoped>
  @import "~@styles/detail.styl"
</style>
