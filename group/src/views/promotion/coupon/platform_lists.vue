<template>
  <div class="mr24">
    <a-card :bordered="false" title="营销方式说明">
      <div>
        平台级的促销方式，同一订单内，选中的分类或者店铺内商品满足满减条件即可使用
      </div>
    </a-card>
    <a-card :bordered="false">
      <div slot="title">
        <router-link to="/promotion/coupon/add">
          <a-button type="primary" icon="plus">添加平台优惠券</a-button>
        </router-link>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="action" slot-scope="text, record">
            <a @click="goDetail(record)">查看</a>
            <a class="col-red ml10" @click="del(record)">删除</a>
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
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';

  export default {
    name: 'coupon',
    data() {
      return {
        formItem:{
          page:1,
          is_shop_coupon:false
        }
      };
    },
    computed: {
      ...mapState({
        fields: state => state.coupon.couponField,
        dataLists: state => state.coupon.couponData,
        pages: state => state.coupon.pages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'coupon/fetchLists',
        delCoupon: 'coupon/delCoupon',
      }),
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },
      goDetail(item) {
        const jumpUrl = `/promotion/coupon/celler_detail/${item.id}`;
        this.$router.push({ path: jumpUrl });
      },
      del(item) {
        if (confirm('确认删除该数据？')) {
          this.delCoupon({ id: item.id, dataList: this.dataLists });
        }
      },
    },
    mounted() {
      this.getLists()
    },
  };
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
