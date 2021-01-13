<template>
  <div class="content">
    <div>
      <!-- <a-button class="mr10" type="primary" @click="getExportList">高级导出</a-button> -->
    </div>
    <div class="mb20">
      <a-spin :spinning="spinning">
        <a-form>
          <a-form-item>
            客户手机号：
            <a-input
              class="input_style"
              placeholder="请输入手机号"
              v-model="formItem.mobile"
            />
          </a-form-item>
          <a-form-item>
            客户提货码：
            <a-input
              class="input_style"
              placeholder="请输入提货码(使用扫码核销则无需填写)"
              v-model="formItem.code"
            />
          </a-form-item>
          <a-form-item>
            <a-button
              class="btn_style ml10 mr10"
              type="primary"
              @click="handleSubmit"
              >查找</a-button
            >
            <a-button
              class="btn_style ml10 mr10"
              type="primary"
              @click="sweepCode"
              >扫一扫提货</a-button
            >
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
<!--    <div>-->
<!--      <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :pagination="false">-->
<!--        <div slot="action" slot-scope="text, record">-->
<!--          <a class="mr10" @click="goDetails(record)">订单详情</a>-->
<!--        </div>-->
<!--      </a-table>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import fetch from "@/api/fetch";
import Cookies from "js-cookie";
const phoneRegExp = /^1(3|4|5|6|7|8|9)\d{9}$/;
export default {
  name: "deliveList",
  computed: {
    ...mapState({
      listField: state => state.trade.PickUpListField,
      listData: state => state.trade.PickUpListData,
      pages: state => state.trade.pages
    })
  },
  data() {
    return {
      current: 1,
      spinning: false,
      formItem: {
        code: "",
        mobile: ""
      }
    };
  },
  methods: {
    ...mapActions({
      pickUpList: "trade/pickUpList",
      weixinCode: "trade/weixinCode"
    }),
    handleSubmit(e) {
      if (this.formItem.mobile == "" && this.formItem.code == "") {
        this.$message.warning("请先输入手机号和提货码");
      } else if (this.formItem.mobile == "") {
        this.$message.warning("请先输入手机号");
      } else if (this.formItem.code == "") {
        this.$message.warning("请先输入提货码");
      } else {
        if (!phoneRegExp.test(this.formItem.mobile)) {
          alert("手机号码有误，请重填");
          return false;
        }
        this.pickUpList(this.formItem);
      }
    },
    goDetails(item) {
      const jumpUrl = `/trade/deliveCode/detail/${item.tid}`;
      this.$router.push({ path: jumpUrl });
    },
    callback(res) {
      if (res) {
        this.formItem.mobile = res.mobile;
        this.formItem.code = res.code;
        this.handleSubmit();
      }
      this.spinning = false;
    },
    sweepCode() {
      this.spinning = true;
      const test = encodeURIComponent(location.href.split("#")[0]);
      this.weixinCode({
        api: ["scanQRCode"],
        url: test,
        callback: this.callback
      });
    }
  },
  mounted() {
    if (this.listData.length !== 0) {
      this.listData = [];
    }
  },
  beforeCreate() {
    let u = navigator.userAgent;
    let isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (isiOS) {
      if (Cookies.get("iosisRef") == undefined) {
        let expires = new Date(new Date() * 1 + 8 * 1000);
        Cookies.set("iosisRef", true, { expires: expires });
        location.reload();
      }
    }
  },
  watch: {
    listData() {
      if (this.listData.length > 0) {
        const jumpUrl = `/trade/confirmDelivery/${this.listData[0].tid}`;
        this.$router.push({ path: jumpUrl });
      }
    },
  },
};
</script>

<style scoped lang="stylus">
.input_style {
  width 20rem
}
.btn_style {
  width 8rem
}
</style>
