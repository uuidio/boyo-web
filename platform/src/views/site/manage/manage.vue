<template>
  <div class="content">
    <div class="list">
      <a-row>
        <a-col :span="3">{{ params.name }}</a-col>
        <a-col :span="12">
          <div class="ip">
            <a-input :placeholder="params.value" v-model="params.value" />
          </div>
        </a-col>
      </a-row>
    </div>
    <a-button type="primary" size="large" @click="subConfig">确定</a-button>
  </div>
</template>

<script>
  import { mapActions, mapState } from "vuex";
  export default {
    computed: {},
    components: {},
    data() {
      return {
        params:{
          key: "manage_fee",
          name: "管理费",
          type: "number",
          value: 0
        }
      };
    },
    watch:{
      integarlConfig(){

      }
    },
    computed: {
      ...mapState({
        integarlConfig: state => state.config.integarlConfig
      })
    },
    mounted() {
      this.getIntegral({params:{ page: "shop", group: "manage" },callBack:this.callback});
    },
    methods: {
      callback(){
        this.integarlConfig.forEach((item)=>{
          if(item.key===this.params.key){
            this.params = item
          }
        })
      },
      ...mapActions({
        getIntegral: "config/getConfig",
        setIntegral: "config/setConfig"
      }),
      subConfig() {
        this.integarlConfig.forEach((item,index)=>{
          if(item.key===this.params.key){
            this.integarlConfig.splice(index,1)
          }
        })
        this.integarlConfig.push(this.params)
        this.setIntegral({
          page: "shop",
          group: "manage",
          value: this.integarlConfig
        });
      }
    },
    watch: {}
  };
</script>

<style scoped lang="stylus">
  .list {
    padding-bottom 20px
    .ant-row {
      margin-bottom 10px
    }
  }
</style>
