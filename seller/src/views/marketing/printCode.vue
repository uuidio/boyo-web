<template>
  <div class="content">
    <div class="mb10">
      <a-button @click="codePrint">批量打印二维码</a-button>
    </div>
    <div class="qrcodeBox" v-if="showCode" :key="index" v-for="(item,index) in data">
      <div :id="`qrcode${item.id}`" class="qrcode">
        <span style="display: none">{{item.qrcode_link}}</span>
      </div>
      <!--<p>{{item.bn}}</p>-->
    </div>

    <div id="getCode"></div>
  </div>
</template>

<script>
import http from '@/api/http';
import Server from '@/config/server';
import QRCode from 'qrcodejs2';

export default {
  data() {
    return {
      showCode: false,
      couponId: '',
      data: [],
    };
  },
  methods: {
    getCode(coupon_id, page) {
      http.get(Server.action.coupon_code_list, { coupon_id, page }).then((resData) => {
        if (resData.errorcode === 0) {
          this.data = resData.result.data;
          this.pages = resData.result;
          console.log(this.data);
          console.log(resData);
          this.showCode = true;
          setTimeout(() => {
            const lists = document.querySelectorAll('.qrcode');
            for (let i = 0; i < lists.length; i++) {
              const qrcode = new QRCode(lists[i].getAttribute('id'), {
                text: lists[i].children[0].innerHTML, // 二维码内容
                image: '',
                width: 100,
                height: 100,
              });
            }
          }, 5);
        }
      });
    },
    codePrint() {
      const head_str = '<html><head><title></title></head><body>';// 先生成头部
      const foot_str = '</body></html>';// 生成尾部
      // const content_str = '<div></div>';// 生成尾部
      const content_str = document.getElementById('getCode');// 生成尾部
      const list = document.querySelectorAll('.qrcodeBox');// 生成尾部
      for (let i = 0; i < list.length; i++) {
        const dataI = list[i];
        content_str.appendChild(dataI);
      }
      document.body.innerHTML = head_str + content_str.innerHTML + foot_str;
      window.print();
    },
  },
  mounted() {
    this.couponId = this.$route.params.id;
    this.getCode(this.couponId, 1);
  },
};
</script>

<style scoped lang="stylus">
  .qrcodeBox
    text-align center
    margin-bottom 20px
</style>
