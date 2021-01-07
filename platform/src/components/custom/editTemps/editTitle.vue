<template>
  <div class="shop_list">
    <div style="margin-bottom:10px;height:20px;border-bottom:1px solid #ccc">文本</div>
    <div class="add_shop">
      <div class="add_lable">标题名:</div>
      <div class="add_context">
        <input type="text"  required="true" v-model="showItem[0].main_title"/>
      </div>
    </div>
    <div class="add_shop">
      <div class="add_lable">副标题:</div>
      <div class="add_context">
        <input type="text" v-model="showItem[0].vice_title"/>
        <p class="tit-label">副标题不输入不显示</p>
      </div>
    </div>
<!--    <div class="list_item_style">-->
<!--      <span>标题模板:</span>-->
<!--      <a-radio-group name="radioGroup" :defaultValue="0" v-model="config.subTemp">-->
<!--        <a-radio :value="0" :style="style">传统样式</a-radio>-->
<!--        &lt;!&ndash; <a-radio :value="1" :style="style">模仿微信图文页样式</a-radio> &ndash;&gt;-->
<!--      </a-radio-group>-->
<!--    </div>-->
    <div class="list_item_style">
      <span>显示位置:</span>
      <a-radio-group name="radioGroup" defaultValue="left" v-model="config.direction">
        <a-radio value="left" :style="style">居左显示</a-radio>
        <a-radio value="center" :style="style">居中显示</a-radio>
        <a-radio value="right" :style="style">居右显示</a-radio>
      </a-radio-group>
    </div>
    <div v-if="config.subTemp">
      <div class="add_shop">
        <div class="add_lable">日期:</div>
        <div class="add_context">
          <a-date-picker @change="onChange"></a-date-picker>
        </div>
      </div>
      <div class="add_shop">
        <div class="add_lable">作者:</div>
        <div class="add_context">
          <input type="text"  required="true" v-model="showItem[0].author"/>
        </div>
      </div>
      <div class="add_shop">
        <div class="add_lable">链接标题:</div>
        <div class="add_context">
          <input type="text"  required="true" v-model="showItem[0].link_addr"/>
        </div>
      </div>
    </div>
    <div v-else>
<!--      <div class="add_shop">-->
<!--        <div class="add_lable">副标题:</div>-->
<!--        <div class="add_context">-->
<!--          <input type="text" v-model="showItem[0].vice_title"/>-->
<!--        </div>-->
<!--      </div>-->
      <div class="mt20">
        <div class="mb10">页面上外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mT" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面下外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mB" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面左外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mL" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面右外边距：</div>
        <div>
          <a-slider :min="0" v-model="config.mR" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面上内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pT" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面下内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pB" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面左内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pL" />
        </div>
      </div>
      <div class="mt20">
        <div class="mb10">页面右内边距：</div>
        <div>
          <a-slider :min="0" v-model="config.pR" />
        </div>
      </div>
    </div>
    <div class="add_shop">
      <div class="add_lable">背景色:</div>
      <div class="color-slt-obx">
        {{config.backColor}}
        <input style="margin-left: 5px;" type="color" v-model="config.backColor">
<!--        <a href="javascript:;" style="color: #38f;text-decoration: none;cursor: pointer;margin-left:10px" @click="backBackColor">重置</a>-->
      </div>
    </div>
  </div>
</template>
<script>
  import { mapActions } from 'vuex';
  export default {

    computed: {
      shop_list() {
        if (this.editType === 'index') {
          return this.$store.state.custom.customItems;
        } else if (this.editType === 'activity') {
          return this.$store.state.custom.activityItems;
        }
      },
      showItem() {
        return this.shop_list[this.editIndex].options;
      },
      config() {
        return this.shop_list[this.editIndex].config;
      },
    },
    props: {
      editIndex: Number,
      editType: {
        type: String,
        default: 'index',
      },
    },
    data(){
      return{
        // subTemp:0,
        // direction:'left',
        // backColor:'transparent',
        // date:'',
        style:{
          'cursor':'pointer',
          'font-weight':'400',
          'line-height': '14px',
          'margin': 0,
          'padding': 0,
          'margin-right': '15px',
          'vertical-align': 'middle',
          'width': '85px',
          'display':'inline-block',
          'font-size': '12px'
        },
      }
    },
    methods:{
      ...mapActions({
        setCustomItems: 'custom/setCustomItems',
      }),
      initData() {
        this.dataLists = this.shop_list[this.editIndex].options;
      },
      backBackColor(){
        this.backColor='transparent';
      },
      onChange(date, dateString) {
        this.date=dateString;
      },
    },
    mounted(){
      this.initData();
    },
    watch:{
      // showItem() {
      //   this.direction = this.shop_list[this.editIndex].config.direction
      //   this.backColor = this.shop_list[this.editIndex].config.backColor
      //   this.subTemp = this.shop_list[this.editIndex].config.subTemp
      // },
      // backColor(val){
      //   this.shop_list[this.editIndex].config={
      //       direction:this.direction,
      //       backColor:this.backColor,
      //       subTemp:this.subTemp
      //   };
      // },
      //  subTemp(val){
      //    this.shop_list[this.editIndex].config={
      //       direction:this.direction,
      //       backColor:this.backColor,
      //       subTemp:this.subTemp
      //   };
      //  },
      //  direction(val){
      //    this.shop_list[this.editIndex].config={
      //       direction:this.direction,
      //       backColor:this.backColor,
      //       subTemp:this.subTemp
      //   };
      //  },
      //  date(val){
      //       let urlList=this.shop_list[this.editIndex].options;
      //       urlList[0].date=val;
      //       this.shop_list[this.editIndex].options=[...urlList];
      //  }
    }
  }
</script>
<style lang="less" scoped>

  .add_shop{
    margin-bottom: 20px;
    display: flex;
    .add_lable{
      line-height: 30px;
      margin-top: 0;
      font-size: 12px;
      width: 55px;
      -ms-flex-negative: 0;
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      text-align: right;
      margin-right: 10px;
      float: left;
    }
    .add_context{
      position: relative;
      /*height: 30px;*/
      /*max-height: 36px;*/
      input{
        display: inline-block;
        min-width: 200px;
        height: 30px;
        -webkit-box-sizing: border-box;
        -moz-box-sizing: border-box;
        box-sizing: border-box;
        padding: 0 10px;
        margin: 0;
        border: 1px solid #bbb;
        color: #333;
        font-size: 12px;
        border-radius: 2px;
      }
    }
    .tit-label{
      color: #999;
      margin-top:6px;
    }
    .color-slt-obx{
      display: flex;
      align-items: center;
    }
  }
  .list_item_style{
    margin-bottom: 20px;
    display: flex;
    -webkit-box-align: center;
    align-items: center;

    div{
      -webkit-box-flex: 1;
      -ms-flex-positive: 1;
      -webkit-flex-grow: 1;
      -moz-box-flex: 1;
      flex-grow: 1;
    }
    span{
      margin-top: 0;
      align-self: flex-start;
      font-size: 12px;
      width: 60px;
      -ms-flex-negative: 0;
      -webkit-flex-shrink: 0;
      flex-shrink: 0;
      text-align: right;
      margin-right: 10px;
    }
  }
</style>
