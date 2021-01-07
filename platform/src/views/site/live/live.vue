<template>
  <div class="content">
    <div class="setTable">
      <div class="item" v-for="(item, index) in alertConfig" :key="index">
        <a-row>
          <a-col :span="12">{{ item.name }}</a-col>
          <a-col :span="12">
            <template v-if="item.type === 'switch'">
              <a-switch @change="changeSw(index)" :checked="item.value == 1" />
            </template>
            <template v-else-if="item.type === 'number'">
              <a-input-number
                size="large"
                v-model="item.value"
                :min="1"
                :max="100"
                :defaultValue="item.value"
              />
              <!-- <a-input :placeholder="item.value"  /> -->
            </template>
            <template v-else-if="item.type === 'url'">
              <UploadImage :defaultImageList="defaultImg" :maximum="1" ref="uploadImage"></UploadImage>
              <!-- <a-button @click="ediImg">编辑</a-button> -->
            </template>
          </a-col>
        </a-row>
      </div>
      <a-button type="primary" size="large" @click="subConfig">确定</a-button>
    </div>

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
      visible: false,
      temp: false,
      nowConfig: {},
      defaultImg: [],
      selectConfig: {
        id: "",
        show_type: "goods",
        list: [
          { value: "goods", name: "商品" },
          { value: "shop", name: "店铺" },
          { value: "class", name: "分类" },
          { value: "seckill", name: "秒杀活动页面" },
          { value: "integral", name: "积分商城页面" },
          { value: "couponList", name: "领券中心页面" },
          { value: "group", name: "拼团购页面" },
          { value: "customActivity", name: "自定义活动" },
        ]
      },
      new: {}
    };
  },
  computed: {
    ...mapState({
      alertConfig: state => state.config.alertConfig
    })
  },
  mounted() {
    this.getAlert({params:{ page: "wechat", group: "live" },callBack:this.imgCallBack});
  },
  methods: {
    ...mapActions({
      getAlert: "config/getConfig",
      setAlert: "config/setConfig"
    }),
    changeSw(index) {
      let item = this.alertConfig[index];
      item.value = item.value > 0 ? 0 : 1;
      console.log(index);
    },
    imgCallBack(){
      this.defaultImg = this.alertConfig[2].value
      console.log(this.alertConfig)
    },
    ok(param) {
      this.alertConfig[2].value = param;
      this.visible = false;
    },
    cancel(e) {
      this.visible = false;
    },
    handleCarousel(e) {
      this.visible = false;
    },
    changeSelect(e) {
      this.selectConfig.show_type = e;
      console.log(this.selectConfig.show_type);
    },
    subConfig() {
      this.alertConfig[2].value = this.$refs.uploadImage[0].uploadImageList;
      // console.log(this.alertConfig);
      this.setAlert({ page: "wechat", group: "live", value: this.alertConfig });
    }
  },
  watch: {}
};
</script>

<style scoped lang="stylus">
.setTable {
  .item {
    margin-bottom 15px
  }
}
</style>
