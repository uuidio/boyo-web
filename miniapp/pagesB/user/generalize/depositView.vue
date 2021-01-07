<template>
  <web-view :src="urlPath"></web-view>
</template>

<script>
  import {
    config
  } from '../../../static/base/server2.js'
  export default {
    data() {
      return {
        urlPath:''
      };
    },
    onLoad(options){
       this.urlPath = config.api_h5_url+'deposit.html?u='+options.u+''
       console.log(this.urlPath)
    },
    methods: {},
    mounted() {
    },
  };
</script>

<style scoped>

</style>
