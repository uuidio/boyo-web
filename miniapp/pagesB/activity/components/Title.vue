<template>
  <div class="wrap_title" :style="{'background-color':config.backColor,'text-align':config.direction,'margin':px(config.mT)+' '+px(config.mL)}">
	<view v-for="(item,index) in options">
		<view class="main_title">{{item.main_title}}</view>
		<view calss="main_p" v-if="config.subTemp">
		    <text class="date" v-if="item.date">{{item.date}}</text>
		    <text class="author" v-if="item.author">{{item.author}}</text>
		    <text class="link_addr" v-if="item.link_addr">{{item.link_addr}}</text>
		</view>
		<view v-else>
		    <text class="vice_title" v-if="item.vice_title">{{item.vice_title}}</text>
		</view>
	</view>
  </div>
</template>

<script>
export default {
  data() {
    return {
    
    };
  },
  props: {
	 options:{
	  type:Array,
	  default:[]
	},
	config: Object,
  },
  methods: {
	  px(num){
	    return uni.upx2px(num*2) + 'px'
	  },
  },
  mounted() {
   
  },
  watch:{
    config(val){
         console.log(val);
    },
    dataLists(val){
       
    }
    
  }

};
</script>
 
<style lang="less" scoped>
.wrap_title{
   padding: 10px;
   .main_title{ 
		margin: 0;
		font-size: 18px;
		line-height: 22px;
		.main_p {
			line-height: 1.6;
			font-size: 12px;
			font-weight: 400;
			margin-top: 3px;
			.date {
			   margin-right: 10px;
			}
			.author {
			   margin-right: 10px;
			}
			.link_addr {
			   text-decoration: none;
			   color: #607fa6;
			}
		}
  }
  
}
  
    
</style>
