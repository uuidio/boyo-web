<template>
  <div class="mr24">
    <a-card :bordered="false" title="营销方式说明">
      <div>
        店铺级的促销方式，同一订单内，【特定】商品售价总金额，满【特定】金额【特定】会员可享受【特定】金额优惠；商家可设置生成的优惠券总数量。会员在【特定时限】内，通过点击领取优惠券，在购物车内订单结算时使用优惠券。该促销方式与其他不互斥。
      </div>
    </a-card>
    <a-card :bordered="false">
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="action" slot-scope="text, record">
            <a @click="goDetail(record)">查看</a>
            <!--<a class="col-red ml10" @click="del(record)">删除</a>-->
            <a @click="edit(record)" v-if="record.status==='SUCCESS'"> 编辑</a>
          </div>
          <div slot="get_time" slot-scope="text, record">
            <p>
              {{ text[0] }}<br />
              ~<br />
              {{ text[1] }}
            </p>
          </div>
          <div slot="use_time" slot-scope="text, record">
            <p>
              {{ text[0] }}<br />
              ~<br />
              {{ text[1] }}
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
    <a-modal title="修改优惠券名称" v-model="showEdit" @ok="editOk">
      <a-input placeholder="请输入优惠券名称" v-model="newName" />
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";

export default {
  name: "coupon",
  data() {
    return {
      formItem: {
        page: 1,
        is_shop_coupon: true
      },
      newName: "",
      actEdit: {},
      showEdit: false
    };
  },
  computed: {
    ...mapState({
      fields: state => state.coupon.couponField,
      dataLists: state => state.coupon.couponData,
      pages: state => state.coupon.pages
    })
  },
  methods: {
    ...mapActions({
      fetchLists: "coupon/fetchLists",
      delCoupon: "coupon/delCoupon",
      modName: "coupon/modCouponName"
    }),
    pageChange(page) {
      this.formItem.page = page;
      this.getLists();
    },
    getLists() {
      const params = this.formItem;
      this.fetchLists(params);
    },
    goDetail(item) {
      const jumpUrl = `/promotion/coupon/celler_detail/${item.id}`;
      this.$router.push({ path: jumpUrl });
    },
    del(item) {
      if (confirm("确认删除该数据？")) {
        this.delCoupon({ id: item.id, dataList: this.dataLists });
      }
    },
    edit(item) {
      this.actEdit = item;
      this.showEdit = true;
    },
    editOk() {
      if (!this.newName) {
        this.$message.info("请输入新活动名称");
      } else {
        let param = {
          id: this.actEdit.id,
          shop_id: this.actEdit.shop_id,
          name: this.newName
        };
        this.modName(param);
      }
    }
  },
  mounted() {
    this.getLists();
  }
};
</script>

<style scoped lang="stylus">
>>> .ant-card:not(:last-child) {
  margin-bottom 24px
}
</style>
