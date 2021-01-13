<template>
  <div class="content">
    <div class="mb10">
      <a-button @click="codePrint">打印二维码</a-button>
    </div>
	<template v-if="tabHead&&tabHead.length>0">
    <a-table  :loading="loading" :scroll="{ y: 800 }" :columns="tabHead" :dataSource="data" :pagination="false">
      <div v-if="showCode" :id="`qrcode${item.id}`" class="qrcode" slot="qrcode_link" slot-scope="text,item">
        <span style="display: none">{{item.qrcode_link}}</span>
      </div>
    </a-table>
    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :pageSize="pages.per_page"
        :defaultCurrent="1"
        @change="pageChange"
      />
    </div>
	</template>
  </div>
</template>

<script>
import http from '@/api/http';
import Server from '@/config/server';
import QRCode from 'qrcodejs2';

import { getLodop } from '@/utils/lodop';

const columns = [{
  dataIndex: 'id',
  title: '代金券id',
  width: 150,
},
  {
    dataIndex: 'bn',
    title: 'bn码',
  },
{
  dataIndex: 'qrcode_link',
  title: '二维码',
  width: 200,
  scopedSlots: { customRender: 'qrcode_link' },
},
{
  dataIndex: 'status',
  title: '代金券状态',
  width: 150,
},
{
  dataIndex: 'print',
  title: '是否打印',
  width: 150,
},
{
  dataIndex: 'created_at',
  title: '创建时间',
},
{
  dataIndex: 'updated_at',
  title: '更新时间',
},
];
export default {
  data() {
    return {
      couponId: '',
      tabHead: columns,
      data: [],
      loading: true,
      pages: {},
      showCode: false,
    };
  },
  methods: {
    getCode(coupon_id, page) {
      http.get(Server.action.coupon_code_list, { coupon_id, page }).then((resData) => {
        if (resData.errorcode === 0) {
          this.data = resData.result.data;
          this.pages = resData.result;
          this.showCode = true;
          console.log(resData)
          setTimeout(() => {
            const lists = document.querySelectorAll('.qrcode');
            for (let i = 0; i < lists.length; i++) {
              const qrcode = new QRCode(lists[i].getAttribute('id'), {
                text: lists[i].children[0].innerHTML, // 二维码内容
                image: '',
              });
            }
            this.loading = false;
          }, 5);
        }
      });
    },
    codePrint() {
      const routeUrl = this.$router.resolve({
        path: `/marketing/coupon_print/${this.couponId}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    pageChange(page) {
      this.loading = true;
      this.showCode = false;
      this.getCode(this.couponId, page);
    },
  },
  mounted() {
    this.couponId = this.$route.params.id;
    this.getCode(this.couponId, 1);
  },
};
</script>

<style scoped lang="stylus">
  >>> .qrcode img
    display block
    width 120px
</style>
