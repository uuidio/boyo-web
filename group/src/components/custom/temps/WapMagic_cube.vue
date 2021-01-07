<template>
  <div class="magic_cube">
    <div v-if="ifMakeUrl">
        <div class="temp_list">
                  <div v-if="selectIndex==2">
                      <div class="item_2">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                              <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag-config.pad*2)/2+'px','height':(318-config.mag)/2+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==3">
                      <div class="item_3">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                              <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag*2-config.pad*2)/3+'px','height':(318-config.mag)/3+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==4">
                       <div class="item_4">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                              <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag*3-config.pad*2)/4+'px','height':(318-config.mag)/4+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div> 
                  </div>
                  <div v-if="selectIndex==5">
                        <div class="item_5">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                              <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag-config.pad*2)/2+'px','height':(318-config.mag)/2+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==6">
                        <div class="item_6">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                               <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag-config.pad*2)/2+'px','height':(318-config.mag)/(index==0?1:2)+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div>
                  </div>
                  <div v-if="selectIndex==7">
                        <div class="item_7">
                          <ul :style="{'margin':-config.mag/2+'px','padding-left':config.pad+'px','padding-right':config.pad+'px'}">
                              <li  v-for="(item,index) in dataLists" :key="index" :style="{'width':(318-config.mag-config.pad*2)/(index==0?1:2)+'px','height':(318-config.mag)/2+'px','margin':config.mag/2+'px'}"><img v-if="item.url" :src="item.url"/></li>
                          </ul>
                      </div>
                  </div>
              </div>
    </div>
    <div v-else>
        <div class="magic_description">
            点击编辑魔方
        </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectIndex:0,
      ifMakeUrl:false
    };
  },
  props: {
    dataLists:{
      type:Array,
      default:()=>[]
    },
    config: Object,
  },
  methods: {},
  mounted() {
     this.selectIndex=this.config.selectIndex;
  },
  watch:{
    config(val){
         console.log(val);
         this.selectIndex=val.selectIndex;
    },
    dataLists(val){
       val.forEach(element => {
           if(element.url!=''){
               this.ifMakeUrl=true;
           }
       });
    }
    
  }

};
</script>
 
<style lang="less" scoped>
.magic_cube{
        background-color: #ebf8fd;
        text-align: center;
        color: #88c4dc;
        .temp_list{
     .temp_item{
             width: 100px;
            height: 100px;
            display: inline-block;
            border: 1px solid #e5e5e5;
            margin: 0 10px 15px 0;
            padding-top: 5px;
            background-color: #fff;
            text-align: center;
            cursor: pointer;
            .item_img{
                width: 100px;
                height: 64px;
                padding: 0 5px;
                img{
                   height: auto;
                    max-width: 100%;
                    vertical-align: middle;
                    border: 0;
                    -ms-interpolation-mode: bicubic;
                    position: relative;
                }
            }
            .item_title{
               margin-top: 5px;
               height: 20px;
               line-height: 20px;
            }
     }
     ul{
          list-style: none;
          overflow: auto;
         li{
             float: left;
             position: relative;
                  background-color: #e8f7fd;
                    border: 1px solid #bdf;
                    text-align: center;
                    color: #88c4dc;
                    cursor: pointer;
             img{
                    width: 100%;
                    height: 100%;
             }
         }
         .active_li{
             border-color: #38f;
         }
     }
  }
    .magic_description{ 
       line-height: 136px;
       font-size: 14px;
  }
 
}
  
    
</style>
