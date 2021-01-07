<template>
  <view>
    <view v-for="(item,index) in dataLists">
       <view v-if="item.id==='Swipers'">
         <Swipers :options="item.options" :config="item.config"></Swipers>
       </view>
        <view v-else-if="item.id==='CustomImg'">
          <CustomImg :options="item.options" :config="item.config"></CustomImg>
        </view>
        <view v-else-if="item.id==='GrapNav'">
          <GrapNav :options="item.options" :config="item.config"></GrapNav>
        </view>
        <view v-else-if="item.id==='goodGroup'">
          <goodGroup :options="item.options" :config="item.config"></goodGroup>
        </view>
        <view v-else-if="item.id==='TV'">
          <TV :options="item.options" :config="item.config"></TV>
        </view>
      <view v-else-if="item.id==='TieBa'">
        <TieBa :options="item.options" :config="item.config"></TieBa>
      </view>
	  <view v-else-if="item.id==='Title'">
	    <Title :options="item.options" :config="item.config"></Title>
	  </view>
    </view>
  </view>
</template>

<script>
  import TieBa from './TieBa'
  import goodGroup from './goodsGroup'
  import CustomImg from './CustomImg'
  import GrapNav from './GrapNav'
  import Swipers from './Swipers'
  import TV from './TV'
  import Title from './Title'
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
      CustomImg,
      goodGroup,
      TV,
      TieBa,
	  Title
    },
    data() {
      return {};
    },
    methods: {},
    mounted() {
    },
  };
</script>

<style scoped>

</style>
