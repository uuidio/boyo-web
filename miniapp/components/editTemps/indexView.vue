<template>
  <view>
    <view v-for="(item,index) in dataLists" :key="index">
       <view v-if="item.id==='Swipers'">
         <Swipers :options="item.options" :config="item.config" :gm_Id="item.gm_id"></Swipers>
       </view>
        <view v-else-if="item.id==='CustomImg'">
          <CustomImg :options="item.options" :config="item.config" :gm_Id="item.gm_id"></CustomImg>
        </view>
        <view v-else-if="item.id==='GrapNav'">
          <GrapNav :options="item.options" :config="item.config" :gm_Id="item.gm_id"></GrapNav>
        </view>
        <view v-else-if="item.id==='SlideNav'">
          <SlideNav :options.sync="item.options" :config="item.config" :gm_Id="item.gm_id"></SlideNav>
        </view>
        <view v-else-if="item.id==='goodGroup'">
          <goodGroup :options="item.options" :config="item.config" :gm_Id="item.gm_id"></goodGroup>
        </view>
        <view v-else-if="item.id==='GoodSwiper'">
          <goodsSwiper :options="item.options" :config="item.config" :gm_Id="item.gm_id"></goodsSwiper>
        </view>
        <view v-else-if="item.id==='Title'">
          <title :options="item.options" :config="item.config" :gm_Id="item.gm_id"></title>
        </view>
        <view v-else-if="item.id==='ActivityGroup'">
          <ActivityGroup :options="item.options" :config="item.config" :gm_Id="item.gm_id"></ActivityGroup>
        </view>
		<view v-else-if="item.id==='Tetris'">
          <Tetris :options="item.options" :config="item.config" :gm_Id="item.gm_id"></Tetris>
        </view>
		<view v-else-if="item.id==='Special'">
          <Special :options="item.options" :config="item.config" :gm_Id="item.gm_id"></Special>
        </view>
		<view v-else-if="item.id==='GroupTemp'">
          <GroupTemp :options="item.options" :config="item.config" :gm_Id="item.gm_id"></GroupTemp>
        </view>
    </view>
    <view>
    </view>
  </view>
</template>

<script>
  import goodGroup from './goodsGroup'
  import CustomImg from './CustomImg'
  import GrapNav from './GrapNav'
  import SlideNav from './SlideNav'
  import Swipers from './Swipers'
  import goodsSwiper from './goodsSwiper'
  import title from './Title'
  import ActivityGroup from './activityGroup'
  import Tetris from './Tetris'
  import Special from './Special'
  import GroupTemp	from './GroupTemp'
  export default {
    props:{
      dataLists:{
        type:Array,
        default:[]
      }
    },
    components:{
      Swipers,
      GrapNav,
      SlideNav,
      CustomImg,
      goodGroup,
      goodsSwiper,
      title,
      ActivityGroup,
      Tetris,
      Special,
      GroupTemp
    },
    data() {
      return {
      };
    },
    methods: {},
    mounted() {
    },
  };
</script>

<style scoped>

</style>
