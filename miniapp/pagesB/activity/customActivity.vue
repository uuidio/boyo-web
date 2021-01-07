<template>
	<view>
		<view class="index-box">
			<view class="pos-re100">
				<indexView :dataLists="lists"></indexView>
			</view>
			<view class="p-md text-center col-666">- 已经到底啦 -</view>
		</view>
	</view>
</template>

<script>
  import indexView from './components/indexView.vue'
  import Header from '../..//components/header/header'
  import redirect from '../../mixins/redirect.js';
  import global from '../../mixins/global.js';
  import cartNum from '../../mixins/cartNum';
  export default {
    mixins: [redirect, global,cartNum],
    components:{
	  Header,
      indexView
    },
    data() {
      return {
				custom_id: '',
				lists:[]
      };
    },
    onShow() {
      this.getCartNum()
    },
    onLoad:function(option){
    	this.custom_id = option.ac_id
      this.getDetail()
    },
    methods: {
      getDetail(){
        this.$http({
          aurl: 'indexWidgets',
          params:{
            page:'custom_activity',
						custom_id: this.custom_id
          },
          success: res => {
            this.lists = res.data.result
            this.lists.forEach(item=>{
				if(item.id == 'headerTitle') {
					uni.setNavigationBarTitle({
					    title: item.title
					});
				}
			})
          },
          fail: error => {
            console.log(error);
          },
        });
      }
    },
    mounted() {
    },
  };
</script>

<style lang="stylus" scoped>
@import '../../variable.styl'
.mp-search-box
  background:#ff4a41
  color #fff
.searchBox
  position relative
  z-index 888
.index-box
  position relative
  .indexBg
    position absolute
    top 0
    left 0
    width 100%
.index-head
  text-align right
  padding-right 90rpx
  box-sizing border-box
  width 100%
  font-size 36rpx
</style>
