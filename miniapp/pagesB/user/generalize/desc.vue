<template>
  <view class="m-md p-md bc-fff border-radius5px" v-if="show">
    <rich-text :nodes="ruleInfo"></rich-text>
  </view>
</template>

<script>
  export default {
    data() {
      return {
        ruleInfo: '',
        gm_id: 0,
        content:'',
        show:false,
        act_id:17
      };
    },
    onLoad(options){
      // if(options.id){
      //   this.act_id = options.id
      // }
      // this.getAct()
      // this.gm_id = uni.getStorageSync('gmToken')
    },
    onShow(){
      this.getRule()
    },
    methods: {
      getRule(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'getRule',
          data: {
            gm_id: this.gm_id,
            type: 1,
          },
          success: res => {
            if (res.data.code === 0) {
              let result = res.data.result.content
              const regex = new RegExp('<img', 'gi');
              result = result.replace(regex, `<img style="max-width: 100%;"`);
              this.ruleInfo = result;
              uni.setNavigationBarTitle({
                title: res.data.result.title
              })
            }
          },
          fail: error => {
            console.log(error);
          },
          complete: () => {
            uni.hideLoading()
            this.show = true
          }
        });
      },

      getAct(){
        uni.showLoading({
          title: '加载中'
        });
        this.$http({
          aurl: 'articleDetail',
          params:{
            id:this.act_id
          },
          success: res => {
            console.log(res)
            if(res.data.code===0){
              let result = res.data.result.content
              const regex = new RegExp('<img', 'gi');
              result = result.replace(regex, `<img style="max-width: 100%;"`);
              this.content = result;
            }
          },
          fail: err => {
            console.log(err);
          },
          complete:res=>{
            uni.hideLoading()
            this.show = true
          }
        });
      },
    },
    mounted() {

    },
  };
</script>

<style scoped>

</style>
