<template>
  <div class="mr24">
    <!--<a-card :bordered="false" title="营销方式说明">-->
    <!--<div>-->
    <!--店铺级的促销方式，同一订单内，【特定】商品售价总金额，满【特定】金额【特定】会员可享受【特定】金额优惠；商家可设置生成的优惠券总数量。会员在【特定时限】内，通过点击领取优惠券，在购物车内订单结算时使用优惠券。该促销方式与其他不互斥。-->
    <!--</div>-->
    <!--</a-card>-->
    <a-card :bordered="false">
      <div slot="title">
        <router-link to="/promotion/seckill/add">
          <a-button type="primary" icon="plus">添加秒杀活动</a-button>
        </router-link>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1400,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
        <div slot="action" slot-scope="text, record">
          <a @click="goDetail(record)">查看</a>
          <a class="ml10 col-red" @click="del(record)">删除</a>
          <a class="ml10 col-red" @click="delItem(record)">强制删除</a>
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
        }
      };
    },
    computed: {
      ...mapState({
        fields: state => state.seckill.field,
        dataLists: state => state.seckill.dataLists,
        pages: state => state.seckill.pages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'seckill/fetchLists',
        delSeckill: 'seckill/delSeckill',
        delSeckillItem: 'seckill/delSeckillItem',
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
        const routeUrl = this.$router.resolve({
          path: `/promotion/seckill/detail/${item.id}`,
        });
        window.open(routeUrl.href, '_blank');
      },
      del(item) {
        const _this = this
        this.$confirm({
          title: '提示',
          content: '确认删除该数据？',
          okText: '确认',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            _this.delSeckill({ id: item.id, dataList: _this.dataLists });
          },
        });
      },
      delItem(item) {
        const _this = this
        this.$confirm({
          title: '提示',
          content: '此操作删除无法还原(包括活动中秒杀)，后果严重，请慎重考虑',
          okText: '确认删除',
          okType: 'danger',
          cancelText: '取消',
          onOk() {
            _this.delSeckillItem({ id: item.id, dataList: _this.dataLists });
          },
        });
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
