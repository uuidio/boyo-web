<template>
  <div class="mr24">
    <a-card :bordered="false" title="营销方式说明">
      <div>
        门店级的促销方式，同一订单内，【特定】商品售价总金额，满【特定】金额【特定】会员可享受【特定】金额优惠；门店可设置生成的优惠券总数量。会员在【特定时限】内，通过点击领取优惠券，在购物车内订单结算时使用优惠券。该促销方式与其他不互斥。
      </div>
    </a-card>
    <a-card :bordered="false">
      <div slot="title">
        <router-link to="/marketing/coupon_add">
          <a-button type="primary" icon="plus">添加优惠券</a-button>
        </router-link>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{x:1100,y:700}" :pagination="false" :columns="fields" :dataSource="dataLists">
          <div slot="action" slot-scope="text, record">
            上架状态
            <a-switch class="mr10" checkedChildren="是" unCheckedChildren="否" :defaultChecked="record.is_distribute ? true : false " :key="record.id" @change="act(record)" />
            <div class="mt10">
              <a @click="setNum(record)">增加库存</a>
            </div>
            <div class="mt10">
              <a @click="goDetail(record)">查看</a>
              <a class="ml10" v-if="record.type===3" @click="seeList(record)">查看二维码列表</a>
              <a class="col-red ml10" @click="del(record)">删除</a>
            </div>
          </div>
          <div slot="get_time" slot-scope="text, record">
            <p>
              {{text[0]}}<br>
              ~<br>
              {{text[1]}}
            </p>
          </div>
          <div slot="use_time" slot-scope="text, record">
            <p>
              {{text[0]}}<br>
              ~<br>
              {{text[1]}}
            </p>
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
    </a-card>
    <a-modal title="增加优惠券库存" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item label="增加库存数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input-number v-model="formItem.num" placeholder="增加数量"/>
          <!--          <p class="col-666 mt10">*只允许增加库存</p>-->
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'coupon',
  data() {
    return {
      params:{
        page:1
      },
      visible: false,
      formItem: {
        id: '',
        num: '',
        type: 1, // 1:增加 2: 减少 （默认增加）
      },
    };
  },
  computed: {
    ...mapState({
      fields: state => state.marketing.couponField,
      dataLists: state => state.marketing.couponData,
      pages: state => state.marketing.pages,
    }),
  },
  methods: {
    ...mapActions({
      fetchLists: 'marketing/fetchLists',
      delCoupon: 'marketing/delCoupon',
      actCoupon: 'marketing/actCoupon',
      updateIssuesNum: 'marketing/updateIssuesNum',
    }),
    handleOk() {
      if(this.formItem.num === ''){
        this.$notification.error(
          {
            message: '请输入优惠券库存!',
            description: '',
          });
        return false;
      } else if (this.formItem.num <= 0) {
        this.$notification.error(
          {
            message: '只允许增加库存！',
            description: '',
          });
        return false;
      } else if (this.formItem.num.toString().indexOf('.') !== -1) {
        this.$notification.error(
          {
            message: '只允许输入正整数！',
            description: '',
          });
        return false;
      }
      this.updateIssuesNum(this.formItem);
      this.visible = false;
    },
    setNum(record) {
      this.formItem.id = record.id;
      this.formItem.num = '';
      this.visible = true;
    },
    pageChange(page){
      this.params.page = page
      this.fetchLists(this.params);
    },
    seeList(item) {
      const routeUrl = this.$router.resolve({
        path: `/marketing/coupon_code/${item.id}`,
      });
      window.open(routeUrl.href, '_blank');
    },
    act(item) {
        let statusBool = 0;
        if (item.is_distribute) {
          statusBool = 0;
          item.is_distribute = false
          item.is_distribute_text = "否"
        } else if (!item.is_distribute) {
          statusBool = 1;
          item.is_distribute = true
          item.is_distribute_text = "是"
        }
        const params = {
          id: item.id,
          is_distribute: statusBool,
        };
        this.actCoupon({params});
      },
    goDetail(item) {
      const jumpUrl = `/marketing/coupon_show/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
    del(item) {
      if (confirm('确认删除该数据？')) {
        this.delCoupon({ id: item.id, dataList: this.dataLists });
      }
    },
  },
  mounted() {
    this.fetchLists(this.params);
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
