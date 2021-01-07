<template>
  <div class="mr24">
    <a-card :bordered="false" title="营销方式说明">
      <div>
        品牌级的促销方式，同一订单内，选中的分类或者店铺内商品满足满减条件即可使用
      </div>
    </a-card>
    <a-card :bordered="false">
      <div slot="title">
        <router-link to="/promotion/coupon/add">
          <a-button type="primary" icon="plus">添加品牌优惠券</a-button>
        </router-link>
      </div>
      <searchItem class="mb20" @on-search="getSearch"></searchItem>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="action" slot-scope="text,item">
          上架状态
            <a-switch class="mr10" checkedChildren="是" unCheckedChildren="否" :defaultChecked="item.is_distribute ? true : false "
             :key="item.id" @change="act(item)" />
            <div class="mt10">
              <a @click="setNum(item)">增加库存</a>
            </div>
           <div class="mt10">
             <a @click="goDetail(item)"  class="mr10">查看</a>
             <a @click="del(item)" class="mr10  col-red">删除</a>
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
        <a-modal title="增加优惠券库存" v-model="visible" @ok="handleOk">
          <a-form>
            <a-form-item label="增加库存数量" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
              <a-input-number v-model="params.num" placeholder="增加数量" />
              <!--          <p class="col-666 mt10">*只允许增加库存</p>-->
            </a-form-item>
          </a-form>
        </a-modal>
      </template>
    </a-card>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import searchItem from './components/search'

  export default {
    name: 'coupon',
    data() {
      return {
        visible: false,
        params: {
          id: '',
          num: '',
          type: 1, // 1:增加 2: 减少 （默认增加）
        },
        searchOptions: {},
        formItem:{
          page:1,
          is_shop_coupon:false
        }
      };
    },
    components:{
      searchItem
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
        actCoupon:'coupon/actCoupon',
        updateIssuesNum: 'coupon/updateIssuesNum',
      }),
      handleOk() {
        console.log(typeof (this.params.num))
        if(this.params.num === ''){
          this.$notification.error(
            {
              message:'请输入增加库存数量!',
              description: '',
            });
          return false;
        } else if (this.params.num <= 0 ) {
          this.$notification.error(
            {
              message: '只允许增加库存！',
              description: '',
            });
          return false;
        } else if (this.params.num.toString().indexOf('.') !== -1) {this.$notification.error(
          {
            message: '只允许输入正整数！',
            description: '',
          });
          return false;
        }
        this.updateIssuesNum(this.params);
        this.visible = false;
      },
      setNum(record) {
        this.params.id = record.id;
        this.params.num = '';
        this.visible = true;
      },
      getSearch(item){
        this.searchOptions = item;
        this.formItem.page = 1;
        this.getLists();
      },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        let obj1 = this.formItem
        let obj2 = this.searchOptions
        const obj = Object.assign(obj2, obj1)
        this.fetchLists(obj)
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
