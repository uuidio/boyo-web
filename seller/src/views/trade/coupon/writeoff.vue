<template>
  <div class="content">
    <div>
      <!-- <a-button class="mr10" type="primary" @click="getExportList">高级导出</a-button> -->
    </div>
    <div class="mb20">
      <a-spin :spinning="spinning">
        <a-form>
			<a-form-item>
        	核销码(使用扫码核销则无需填写)：
            <div>
				<a-input class="input_style" placeholder="请输入核销码" v-model="formItem.bn"/>
			</div>
          </a-form-item>	
          <a-form-item>
            客户手机号：
            <div>
				<a-input class="input_style" placeholder="请输入手机号" v-model="formItem.user_mobile"/>
			</div>
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
              >扫一扫核销</a-button
            >
          </a-form-item>
        </a-form>
      </a-spin>
    </div>
    <div>
      <!-- <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :pagination="false">
        <div slot="action" slot-scope="text, record">
          <a class="mr10" @click="goDetails(record)">优惠券详情</a>
        </div>
      </a-table> -->
    </div>
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
      listField: state => state.trade.couponListField,
      pages: state => state.trade.pages
    })
  },
  data() {
    return {
      current: 1,
      spinning: false,
      formItem: {
        bn: "",
        user_mobile: ""
      }
    };
  },
  methods: {
    ...mapActions({
      couponDetail: "trade/couponDetail",
      weixinCode2: "trade/weixinCode2"
    }),
    handleSubmit(e) {
      if (this.formItem.user_mobile == "" && this.formItem.bn == "") {
        this.$message.warning("请先输入手机号和核销码");
      } else if (this.formItem.user_mobile == "") {
        this.$message.warning("请先输入手机号");
      } else if (this.formItem.bn == "") {
        this.$message.warning("请先输入核销码");
      } else {
        if (!phoneRegExp.test(this.formItem.user_mobile)) {
          this.$message.warning("手机号码有误，请重填");
          return false;
        }
		this.couponDetail({fromObj:this.formItem,callBack:this.goDetails});
		
      }
    },
    goDetails() {
      const jumpUrl = `/trade/coupon/detail`;
      this.$router.push({ path: jumpUrl });
    },
    callback() {
      // this.spinning = false;
    },
    sweepCode() {
    // this.spinning = true;
	  const test = encodeURIComponent(location.href.split("#")[0]);
	  //const test= encodeURIComponent('https://egotest.ytholidayplaza.com/admin/seller/trade/coupon/writeoff');测试使用
      this.weixinCode2({
        api: ["scanQRCode"],
        url: test,
		callback: this.callback,
		reback:this.goDetails
      });
    }
  },
  mounted() {
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
  }
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
