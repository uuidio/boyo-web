<template>
  <div class="content">
    <a-tabs  v-model="tabType">
<!--      <a-tab-pane tab="积分设置" key="integral"><div class="list">-->
<!--        <a-row v-for="(item,index) in integarlConfig">-->
<!--          <a-col :span="12">{{ item.name }}</a-col>-->
<!--          <a-col :span="12">-->
<!--            <div class="sw" v-if="item.type === 'switch'">-->
<!--              <a-switch-->
<!--                @change="changeSw(index,'integarl')"-->
<!--                :checked="item.value == 1"-->
<!--                :data-index="index"-->
<!--              />-->
<!--            </div>-->
<!--            <div class="ip" v-else>-->
<!--              <a-input :placeholder="item.value" v-model="item.value" />-->
<!--            </div>-->
<!--          </a-col>-->
<!--        </a-row>-->
<!--      </div></a-tab-pane>-->
<!--      <a-tab-pane tab="商品免邮设置" key="ree_order_amount">-->
<!--        <div v-if="settingShow">-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="3">-->
<!--              新用户首单免邮：-->
<!--            </a-col>-->
<!--            <a-col :span="12">-->
<!--              <a-switch-->
<!--                @change="new_user_rules_change"-->
<!--                :checked="ree_order_amount_item.new_user_rules.status == 1"-->
<!--              />-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="3">-->
<!--              减免规则：-->
<!--            </a-col>-->
<!--            <a-col :span="21">-->
<!--              <div><a-button @click="addRules">添加规则</a-button></div>-->
<!--              <div class="mt10 fxBox1" v-for="(item,index) in ree_order_amount_item.decr_rules">-->
<!--                <div class="fxBox1 mr10">-->
<!--                  <span>订单总金额:</span> <a-input style="width:150px;margin:0 5px" type="number"  v-model="item.order_amount"/> 元-->
<!--                </div>-->
<!--                <div class="fxBox1 mr10">-->
<!--                  <span>减免邮费:</span> <a-input style="width:150px;margin:0 5px" type="number" v-model="item.decr_post_fee"/> 元-->
<!--                </div>-->
<!--                <div class="fxBox1">-->
<!--                  <div class="mr5">-->
<!--                    是否启用：-->
<!--                    <a-switch-->
<!--                      @change="changeRules(index)"-->
<!--                      :checked="item.status == 1"-->
<!--                    />-->
<!--                  </div>-->
<!--                  <a-button size="small" type="danger" @click="delRules(index)">删除</a-button>-->
<!--                </div>-->
<!--              </div>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="3">-->
<!--              免邮设置：-->
<!--            </a-col>-->
<!--            <a-col :span="21">-->
<!--              <div class="fxBox1">-->
<!--                订单金额达到-->
<!--                <a-input class="ml10 mr10" type="number" style="width:150px" v-model="ree_order_amount_item.free_rules.free_order_amount"/> 元免邮-->
<!--                <a-switch-->
<!--                  class="ml10"-->
<!--                  @change="free_rules_change"-->
<!--                  :checked="ree_order_amount_item.free_rules.status == 1"-->
<!--                />-->
<!--              </div>-->

<!--            </a-col>-->
<!--          </a-row>-->
<!--        </div>-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane tab="订单设置" key="trade">-->
<!--         <div class="list">-->
<!--           <a-row v-for="(item,index) in tradeConfig">-->
<!--           <a-col :span="12">{{ item.name }}</a-col>-->
<!--           <a-col :span="12">-->
<!--             <div class="sw" v-if="item.type === 'switch'">-->
<!--               <a-switch-->
<!--                 @change="changeSw(index,'trade')"-->
<!--                 :checked="item.value == 1"-->
<!--                 :data-index="index"-->
<!--               />-->
<!--             </div>-->
<!--             <div class="ip" v-else>-->
<!--               <a-input :placeholder="item.value" v-model="item.value" />-->
<!--             </div>-->
<!--           </a-col>-->
<!--         </a-row></div>-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane tab="banner图设置" key="member_img">-->
<!--        <div>-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="5">-->
<!--              会员中心底部banner设置：-->
<!--            </a-col>-->
<!--            <a-col :span="12">-->
<!--              <UploadImage :defaultImageList="memberImg" :maximum="1" ref="uploadImage"></UploadImage>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="5">-->
<!--              积分+现金活动banner设置：-->
<!--            </a-col>-->
<!--            <a-col :span="12">-->
<!--              <UploadImage :defaultImageList="pointImg" :maximum="1" ref="uploadImage2"></UploadImage>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="5">-->
<!--              拼团活动banner设置：-->
<!--            </a-col>-->
<!--            <a-col :span="12">-->
<!--              <UploadImage :defaultImageList="groupImg" :maximum="1" ref="uploadImage3"></UploadImage>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--        </div>-->
<!--      </a-tab-pane>-->
<!--      <a-tab-pane tab="客服电话设置" key="base">-->
<!--        <div class="list">-->
<!--          <a-row type="flex" align="middle" v-for="(item,index) in shopTel">-->
<!--            <a-col :span="3">{{ item.name }}</a-col>-->
<!--            <a-col :span="12">-->
<!--              <div>-->
<!--                <a-input style="width:200px" :placeholder="item.value" v-model="item.value" />-->
<!--              </div>-->
<!--            </a-col>-->
<!--          </a-row>-->
<!--        </div>-->
<!--      </a-tab-pane>-->
      <a-tab-pane tab="推广中心配置" key="platform_attrs">
        <div class="list">
          <a-row type="flex" align="middle" class="mb20">
            <a-col :span="3">自动审核推广员</a-col>
            <a-col :span="12">
              <div>
                <a-switch
                  @change="changeGen"
                  :checked="genItem.status == 0"
                />
              </div>
            </a-col>
          </a-row>
<!--          <a-row type="flex" align="middle" class="mb20">-->
<!--            <a-col :span="3">推广员分润扣点</a-col>-->
<!--            <a-col :span="12">-->
<!--              <div>-->
<!--                <a-input type="number" @change="inputChange" v-model="genItem.commission_rate" />-->
<!--              </div>-->
<!--              <p>*0.1代表商品的实付金额的10%</p>-->
<!--            </a-col>-->
<!--          </a-row>-->
          <a-row type="flex" align="middle" class="mb20">
            <a-col :span="3">绑定关系天数</a-col>
            <a-col :span="3">
              <div>
                <a-input type="number" v-model="genItem.last_day"/>
              </div>
            </a-col>
          </a-row>
          <a-row type="flex" align="middle" class="mb20">
            <a-col :span="3">最低提现金额</a-col>
            <a-col :span="3">
              <div>
                <a-input type="number" v-model="genItem.apply_amount"/>
              </div>
            </a-col>
          </a-row>
          <a-row type="flex" align="middle" class="mb20">
            <a-col :span="3">单笔提现限额</a-col>
            <a-col :span="3">
              <div>
                <a-input type="number" v-model="genItem.max_apply_amount"/>
              </div>
            </a-col>
          </a-row>

          <a-row type="flex" align="middle" class="mb20">
            <a-col :span="3">提现手续费</a-col>
            <a-col :span="3">
              <div>
                <a-input type="number" v-model="genItem.service_charge"/>
              </div>
            </a-col>
            <a-col :span="5">
              <div class="ml10">%（按百分比设置）</div>
            </a-col>
          </a-row>
        </div>
      </a-tab-pane>

    </a-tabs>

    <a-button type="primary" size="large" @click="subConfig">确定</a-button>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UploadImage from '@C/upload/UploadImage';
export default {
  computed: {},
  components: {
    UploadImage
  },
  data() {
    return {
      memberImg:[],
      groupImg:[],
      pointImg:[],
      tabType:'platform_attrs',
      settingShow:false,
      ree_order_amount_item:{
        new_user_rules:{
          status:1
        },
        decr_rules:[],
        free_rules:{
          free_order_amount:'',
          status:1
        }
      },
      allBanner:[],
      genItem:{
        status:'1',
        commission_rate:'',
        apply_amount:'',
        last_day:'',
        key:'platform_attrs',
        service_charge: '',
        max_apply_amount: '',
      },
    };
  },
  computed: {
    ...mapState({
      integarlConfig: state => state.config.integarlConfig,
      tradeConfig: state => state.config.tradeConfig,
      free_order_amount: state => state.config.free_order_amount,
      banners: state => state.config.banners,
      shopTel: state => state.config.shopTel,
      genLists: state => state.config.genLists,
    })
  },
  watch:{
  },
  mounted() {
    // this.getIntegral({params:{ page: "shop", group: "point" }});
    // this.getIntegral({params:{ page: "shop", group: "trade" }});
    // this.getIntegral({params:{ page: "shop", group: "base" }});
    // this.getIntegral({params:{ page: "shop", group: "banner" },callBack:this.imgCallBack});
    // this.getIntegral({params:{page: "shop",group:'free_order_amount'},callBack:this.myCallback});
    this.getIntegral({params:{ page: "group", group: "platform_attrs" }});
  },
  methods: {
    ...mapActions({
      getIntegral: "config/getConfig",
      setIntegral: "config/setConfig"
    }),
    inputChange(){
      if(this.genItem.commission_rate>1){
        this.$message.warning('推广员分润扣点不能大于1')
        this.genItem.commission_rate = 1
      }
    },
    changeGen(){
      this.genItem.status = Number(this.genItem.status) > 0? '0':'1'
    },
    new_user_rules_change(){
      this.ree_order_amount_item.new_user_rules.status = this.ree_order_amount_item.new_user_rules.status > 0 ? 0 : 1;
    },
    free_rules_change(){
      this.ree_order_amount_item.free_rules.status = this.ree_order_amount_item.free_rules.status > 0 ? 0 : 1;
    },
    imgCallBack(){
      if(this.banners[0].value){
         this.memberImg = this.banners[0].value
      }
      if(this.banners[1].value){
        this.pointImg = this.banners[1].value
      }
      if(this.banners[2].value){
        this.groupImg = this.banners[2].value
      }
      this.allBanner = this.banners
      console.log(this.banners)
    },
    myCallback(){
      if(this.free_order_amount.free_rules){
        this.ree_order_amount_item = this.free_order_amount
      }


      this.settingShow = true
    },
    changeSw(index,type) {
      let item;
      if(type==='trade'){
        item = this.tradeConfig[index];
      }else if(type==='integarl'){
        item = this.integarlConfig[index];
      }
      item.value = item.value > 0 ? 0 : 1;
    },
    changeRules(index) {
      let item = this.ree_order_amount_item.decr_rules[index];
      item.status = item.status > 0 ? 0 : 1;
    },
    delRules(index){
      this.ree_order_amount_item.decr_rules.splice(index,1)
    },
    addRules(){
      const obj = {
        order_amount: '',
        decr_post_fee: '',
        status: 1
      }
      this.ree_order_amount_item.decr_rules.push(obj)
    },
    subConfig() {
     if(this.tabType==='integral'){
       this.setIntegral({
         page: "shop",
         group: "point",
         value: this.integarlConfig
       });
     }else if(this.tabType==='base'){
       this.setIntegral({
         page: "shop",
         group: "base",
         value: this.shopTel
       });
     }
     else if(this.tabType==='ree_order_amount'){
       this.setIntegral({
         page: "shop",
         group: "free_order_amount",
         value: this.ree_order_amount_item
       });
     }else if(this.tabType==='trade'){
       this.setIntegral({
         page: "shop",
         group: "trade",
         value: this.tradeConfig
       });
     }
     else if(this.tabType==='platform_attrs'){
       const params = {
         page: "group",
         group: "platform_attrs",
         value: [this.genItem]
       }
       console.log( JSON.stringify(params))
       this.setIntegral(params);
     }
     else if(this.tabType === 'member_img'){
       this.allBanner[0].value = this.$refs.uploadImage.uploadImageList;
       this.allBanner[1].value = this.$refs.uploadImage2.uploadImageList;
       this.allBanner[2].value = this.$refs.uploadImage3.uploadImageList;
       this.setIntegral({
         page: "shop",
         group: "banner",
         value:this.allBanner
       });
       console.log(this.allBanner)
     }
    }
  },
  watch: {
    genLists(){
      if(this.genLists.length>0){
        this.genItem = this.genLists[0]
      }
    }
  }
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
