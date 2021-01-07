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
              <!-- <upload-image :defaultImageList="deg" :maximum="1" ></upload-image> -->
              <a-button @click="ediImg">编辑</a-button>
            </template>
          </a-col>
        </a-row>
      </div>
      <a-button type="primary" size="large" @click="subConfig">确定</a-button>
    </div>

    <single-item
      :visible="visible"
      :defaultImage="defaultImg"
      :show_type="selectConfig.show_type"
      :selectList="selectConfig.list"
      :selectId="selectConfig.id"
      @ok="ok"
      @cancel="cancel"
      @cgSelect="changeSelect"
    >
    </single-item>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import singleItem from "../config/components/singleItem";

export default {
  computed: {},
  components: {
    singleItem,
  },
  data() {
    return {
      visible: false,
      temp: false,
      nowConfig: {},
      defaultImg: [
        {
          uid: "-1",
          name: "xxx.png",
          status: "done"
        }
      ],
      selectConfig: {
        id: 170,
        show_type: "goods",
        list: [
          { value: "goods", name: "商品" },
          { value: "shop", name: "店铺" },
          { value: "class", name: "分类" },
          { value: "directSeeding", name: "直播间" },
          { value: "article", name: "文章列表" },
          { value: "brandList", name: "品牌列表" },
          { value: "integral", name: "积分商城" },
          { value: "cattleCoinStore", name: "牛币商城" },
          { value: "activity", name: "活动页面" },
          { value: "xiaochengxu", name: "小程序跳转" },
          { value: "customActivity", name: "自定义活动" },
          { value: "customUrl", name: "自定义跳转" },
          { value: "developed", name: "功能开发中" },
        ]
      },
      new: {}
    };
  },
  computed: {
    ...mapState({
      alertConfig: state => state.config.alertConfig,
    })
  },
  created() {
    this.getAlert({params:{ page: "index", group: "pop" }});
  },
  mounted() {
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
    ediImg() {
      if (!this.temp) {
        let config = this.alertConfig[this.alertConfig.length - 1].value;
        if (config.image_url) {
          this.defaultImg[0].url = config.image_url;
          this.selectConfig.id = config.id;
          this.selectConfig.show_type = config.show_type;
          this.temp = true;
        }
      }
      this.visible = true;
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
    },
    subConfig() {
      this.setAlert({ page: 'index', group: 'pop', value: this.alertConfig });
    },
  },
  watch: {},
};
</script>

<style scoped lang="stylus">
.setTable {
  .item {
    margin-bottom 15px
  }
}
</style>
