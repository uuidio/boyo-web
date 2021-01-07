<template>
  <div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">轮播图
            <a-tag class="ml10" color="blue">建议使用尺寸750*420像素、大小不超过1M的图片</a-tag>
          </div>
          <a-button class="fr" icon="edit" type="primary" @click="createCarousel = true">编辑</a-button>
          <CreateCarousel :is-open="createCarousel"
                          :page="'index'"
                          :group="'carousel'"
                          :max-num="5"
                          modelName="轮播图"
                          :default-data="siteConfig.carousel"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="carousels.field" :dataSource="siteConfig.carousel">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
        </a-table>
      </div>
    </div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">品牌推荐
            <a-tag class="ml10" color="blue">
              品牌推荐尺寸标准(展示效果)：前两张图片建议345*150像素、后四张建议170*300像素、大小不超过1M的图片
            </a-tag>
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createQuickNav = true">编辑</a-button>
          <CreateCarousel :is-open="createQuickNav"
                          :page="'index'"
                          :group="'brands_item'"
                          :max-num="6"
                          modelName="品牌推荐"
                          :default-data="siteConfig.brands_item"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="quickNavs.field" :dataSource="siteConfig.brands_item">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
        </a-table>
      </div>
    </div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">热门分类
            <a-tag class="ml10" color="blue">建议使用尺寸225x130像素以上、大小不超过1M的图片</a-tag>
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createBestSelect = true">编辑</a-button>
          <CreateCarousel :is-open="createBestSelect"
                          :page="'index'"
                          :group="'hotClass'"
                          :max-num="6"
                          modelName="热门分类"
                          :default-data="siteConfig.hotClass"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="bestSelect.field" :dataSource="siteConfig.hotClass">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
        </a-table>
      </div>
    </div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">商品轮播
            <a-tag class="ml10" color="blue">banner图建议750*250像素、大小不超过1M的图片</a-tag>
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createDaySelect = true">编辑</a-button>
          <CreateCarousel :is-open="createDaySelect"
                          :page="'index'"
                          :group="'goods_swiper'"
                          :type="'show_list'"
                          :max-num="4"
                          modelName="商品轮播"
                          :isGoodsSwiper="true"
                          :default-data="siteConfig.goods_swiper"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="goodsSwiper.field" :dataSource="siteConfig.goods_swiper">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
          <span slot="value" slot-scope="text,item">
            {{item.value.length}}
          </span>
        </a-table>
      </div>
    </div>
    <div class="content">
      <div class="detail-wrap">
        <div class="tit">
          <div class="fl">热卖单品
            <a-tag class="ml10" color="blue">banner图建议使用尺寸750x200~250像素以上、大小不超过1M的图片</a-tag>
          </div>
          <a-button class="fr" type="primary" icon="ios-create" @click="createHotGoods = true">编辑</a-button>
          <CreateCarousel :is-open="createHotGoods"
                          :page="'index'"
                          :group="'hot_goods'"
                          :type="'show_list'"
                          :max-num="1"
                          modelName="热卖单品"
                          :hotGoods="true"
                          :default-data="siteConfig.hot_goods"
                          @on-change="handleCarousel">
          </CreateCarousel>
        </div>
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="hotGoods.field" :dataSource="hotValue">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
          <img slot="goods_image" slot-scope="goods_image" :src="goods_image" alt="" height="50">
        </a-table>
      </div>
    </div>
  </div>
</template>
<script>
import CreateCarousel from './components/index/CreateCarousel';
import { mapState, mapActions } from 'vuex';
import { imageSiteConfigField, listsSiteConfigField,hotGoodsField,goodsSwiperHead } from '@/config/site';
import helper from '@/utils/helper';
export default {
  name: 'index',
  components: {
    CreateCarousel,
  },
  data() {
    return {
      createCarousel: false,
      createQuickNav: false,
      createDaySelect: false,
      createBestSelect: false,
      createDayBest: false,
      createHotGoods:false,
      hotValue:[],
      carousels: {
        field: imageSiteConfigField,
        data: [],
      },
      quickNavs: {
        field: imageSiteConfigField,
        data: [],
      },
      daySelect: {
        field: listsSiteConfigField,
        data: [],
      },
      bestSelect: {
        field: imageSiteConfigField,
        data: [],
      },
      dayBest: {
        field: listsSiteConfigField,
        data: [],
      },
      hotGoods:{
        field: hotGoodsField,
        data: [],
      },
      goodsSwiper:{
        field: goodsSwiperHead,
        data: [],
      }
    };
  },
  computed: {
    ...mapState({
      siteConfig: state => state.config.configItems,
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
      getSiteConfig: 'config/getSiteConfig',
    }),
    handleCarousel(modalState, params) {
      this.createCarousel = modalState;
      this.createQuickNav = modalState;
      this.createDaySelect = modalState;
      this.createBestSelect = modalState;
      this.createDayBest = modalState;
      this.createHotGoods = modalState
      if(params!==undefined){
        if(params.group==='hot_goods'||params.group==='goods_swiper'){
          if(params.value.length>0){
            let ids = []
            for(let j =  0;j < params.value.length;j++){
              ids.push([])
              for(let i=0;i<params.value[j].value.length;i++){
                ids[j].push(params.value[j].value[i].id)
              }
            }
            for(let o = 0;o<ids.length;o++){
              params.value[o].value = ids[o]
            }
            console.log(params)
          }
        }
      }

      if (params !== undefined) {
        this.$store.dispatch('config/addSiteConfig', { params });
        helper.reload();
      }
    },
  },
  mounted() {
    this.getSiteConfig({ page: 'index' });
  },
};
</script>
<style lang="stylus" scoped>
  @import "~@styles/detail.styl"
</style>
