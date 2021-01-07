<template>
  <div class="m-md">
    <view class="p-md bc-fff border-radius5px mb-md">
		<view class="text-16">快递：{{logi_name}}</view>
		<view class="text-16 mb-md">运单号：{{logi_no}}</view>	  
    </view>
    <view class="p-md bc-fff border-radius5px">
      <van-steps
          :steps="steps"
          :active="active"
          direction="vertical"
          active-color="#ee0a24"
      />
    </view>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        active:0,
        steps: [

        ],
        logi_name:'',
        logi_no:'',
        tid:''
      };
    },
    methods: {
      getStep(){
        this.$http({
          aurl: 'getLogisticsInfo',
          params:{
            tid:this.tid
          },
          success: res => {
			console.log(res.data)
            if (res.data.code === 0) {
			  let result = res.data.result;
              this.logi_name = result.logi_name;
              this.logi_no = result.logi_no;
              if(result.logisticsInfo.data){
                this.initSteps(result.logisticsInfo.data)
              }

            }
          },
          fail: error => {
            console.log(error);
          }
        });
      },
      initSteps(data){
        for(let i = 0;i<data.length;i++){
          let obj = {
            text:data[i].context,
            desc:data[i].ftime
          }
          this.steps.push(obj);
        }
      }
    },
    onLoad:function(options){
      this.tid = options.tid
      this.getStep()
    },
    mounted() {
    },
  };
</script>

<style scoped lang="stylus">
>>>.van-step--vertical .van-step__active
    font-size:14px
>>>.van-step--process .van-step__title
    color #333!important
</style>
