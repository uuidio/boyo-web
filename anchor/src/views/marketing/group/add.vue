<template>
  <div class="mr24 coupon_show">
    <a-card class="mb20" title="选择商品" :bordered="false" v-if="!formItem.id">
      <getGoods
        @selectOk="getGoodsList"
        seleteType="radio"
      >
        <a-button type="primary" size="large" style="width:100%"
        >选择商品</a-button
        >
      </getGoods>
    </a-card>
    <a-card v-if="tableData.length>0" title="拼团活动信息" class="coupon-name">
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          拼团总人数：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <div v-if="id === 0">
            <a-input
              style="width:180px;margin-right: 5px"
              v-model="formItem.group_size"
              type="number"
              placeholder="不能超过6人"
              @blur="checkSize"
            />
            <span>人</span>
          </div>
          <span v-else>{{ formItem.group_size }}人</span>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          拼团等待时间：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <div v-if="id === 0">
            <a-input
              style="width:180px;margin-right: 5px"
              v-model="formItem.group_validhours"
              type="number"
              placeholder="请输入整数小时"
            />
            <span>小时</span>
          </div>
          <span v-else>{{ formItem.group_validhours }}小时</span>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          活动生效日期：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 7, offset: 1 }">
          <a-range-picker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            @change="timeChange2"
            v-if="id === 0"
          />
          <span v-else
            >{{ formItem.start_time }} ~ {{ formItem.end_time }}</span
          >
        </a-col>
      </a-row>
      <a-row type="flex" align="middle" v-if="is_rebate">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          推广佣金：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <div v-if="id === 0">
            <a-input
              style="width:180px;margin-right: 5px"
              v-model="formItem.rewards"
              type="number"
              placeholder="推广佣金"
            />
            <span>元</span>
          </div>
          <span v-else>{{ formItem.rewards }}元</span>
        </a-col>
      </a-row>
    </a-card>
    <a-card v-if="tableData.length>0"  title="商品规格信息填写" :bordered="false">
      <a-table
        :columns="listField" :dataSource="tableData"
        :pagination="false"
        :rowKey="record => record.sku_id"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: 'checkbox',
          getCheckboxProps:setCheckboxProps
        }"
      >
        <div slot="group_price" slot-scope="text,item">
          <a-input :disabled="sku_ids.indexOf(item.sku_id)!==-1" placeholder="请输入拼团金额" style="width:80%" type="number" v-model="item.group_price"></a-input>
        </div>
      </a-table>
      <p class="col-666 mt20" v-if="!formItem.id">
        *参加拼团的商品请在表格中勾选上，并且填上需要填的参数
      </p>
      <div class="mt20" v-if="!formItem.id">
        <a-button @click="handleSubmit" type="primary">提交</a-button>
        <a-button class="ml10" type="danger" @click="$router.back(-1)"
        >返回</a-button
        >
      </div>
    </a-card>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import getGoods from '@C/goodsList/goodsList';

const listField = [
  {
    dataIndex: 'spec_sign',
    title: '规格名称',
    key: 'spec_sign',
  },
  {
    dataIndex: 'price',
    title: '商品价格',
    key: 'price',
  },
  {
    dataIndex: 'group_price',
    title: '拼团金额',
    key: 'group_price',
    scopedSlots: { customRender: 'group_price' },
  },
];
export default {
  name: 'coupon_show',
  components: {
    getGoods,
  },
  computed: {
    ...mapState({
      detail: state => state.group.detail,
    }),
  },
  data() {
    return {
      listField,
      id: 0,
      selectedRowKeys: [],
      tableData: [],
      selectGoods: [],
      is_rebate: 0,
      formItem: {
        start_time: '',
        end_time: '',
        group_size: '',
        group_validhours: '',
        goods_info: [],
      },
      goosItem: {
        group_stock: '',
        group_price: '',
      },
      sku_ids: [],
      subThrottle: false,
    };
  },

  methods: {
    ...mapActions({
      groupApplySave: 'group/groupApplySave',
      getDetail: 'group/getDetail',
    }),
    onSelectChange(keys, items) {
      this.selectedRowKeys = keys;
    },
    setCheckboxProps(record) {
      if (this.formItem.id) {
        this.detail.GroupGoods.forEach((sku_item) => {
          this.sku_ids.push(sku_item.sku_id);
        });
        return {
          props: {
            disabled: this.sku_ids.indexOf(record.sku_id) !== -1,
          },
        };
      }
      return {};
    },
    initTable(goods_item) {
      console.log(goods_item);
      this.tableData = [];
      if (goods_item.sku.id) {
        const obj = {
          goods_name: goods_item.goods_name,
          goods_id: goods_item.id,
          sku_id: goods_item.sku.id,
          spec_sign: '默认规格',
          price: goods_item.goods_price,
          gc_id_3: goods_item.gc_id_3,
          goods_image: goods_item.goods_image,
          group_price: '',
        };
        this.tableData.push(obj);
      } else {
        goods_item.sku.forEach((item) => {
          const obj = {
            goods_name: goods_item.goods_name,
            goods_id: goods_item.id,
            sku_id: item.id,
            spec_sign: item.spec_sign,
            price: item.price,
            gc_id_3: goods_item.gc_id_3,
            goods_image: goods_item.goods_image,
            group_price: '',
          };
          this.tableData.push(obj);
        });
      }
    },
    checkSize(e) {
      if (this.formItem.group_size > 6) {
        this.formItem.group_size = '';
        this.$message.info('拼团人数不能大于6');
        return;
      }
      if (this.formItem.group_size <= 1) {
        this.formItem.group_size = '';
        this.$message.info('拼团人数最少为2');
      }
    },
    getGoodsList(item) {
      console.log(item);
      this.selectGoods = item;
    },

    timeChange2(dates, dateStrings) {
      this.formItem.start_time = dateStrings[0];
      this.formItem.end_time = dateStrings[1];
    },
    handleSubmit() {
      if (this.subThrottle) {
        return;
      }
      setTimeout(() => {
        this.subThrottle = false;
      }, 1000);

      this.subThrottle = true;
      if (this.selectedRowKeys.length === 0) {
        this.$message.warning('请勾选参加砍价的商品规格，并填写完整信息');
        return;
      }
      this.formItem.goods_info = [];
      this.selectedRowKeys.forEach((id) => {
        const selectArr = this.tableData.filter(item => item.sku_id === id);
        this.formItem.goods_info.push(selectArr[0]);
      });
      this.groupApplySave({
        formItem: this.formItem,
      });
    },
    initData() {
      this.formItem = {
        id: this.detail.Group.id,
        goods_id: this.detail.Group.goods_id,
        gc_id_3: this.detail.Group.gc_id_3,
        goods_name: this.detail.Group.goods_name,
        goods_price: this.detail.Group.goods_price,
        group_price: this.detail.Group.goods_price,
        goods_image: this.detail.Group.goods_image,
        group_desc: this.detail.Group.group_desc,
        start_time: this.detail.Group.start_time,
        end_time: this.detail.Group.end_time,
        group_size: this.detail.Group.group_size,
        group_validhours: this.detail.Group.group_validhours,
        goods_info: this.detail.GroupGoods,
        sort: 0,
      };
      if (this.detail.Group.rewards) {
        this.is_rebate = 1;
        this.formItem.rewards = this.detail.Group.rewards;
        this.formItem.profit_sharing = this.detail.Group.profit_sharing;
      }
      this.tableData = this.detail.GroupGoods;
    },
  },
  watch: {
    selectGoods() {
      const goods_item = this.selectGoods[0];
      this.formItem = {
        goods_id: goods_item.id,
        gc_id_3: goods_item.gc_id_3,
        goods_name: goods_item.goods_name,
        goods_price: goods_item.goods_price,
        group_price: goods_item.goods_price,
        goods_image: goods_item.goods_image,
        group_desc: '123',
        start_time: '',
        end_time: '',
        group_size: '',
        group_validhours: '',
        goods_info: [],
        sort: 0,
      };
      if (goods_item.is_rebate == 1) {
        this.is_rebate = 1;
        this.$set(this.formItem, 'rewards', '');
        this.$set(this.formItem, 'profit_sharing', '');
      }
      this.initTable(goods_item);
    },
    detail() {
      this.initData();
    },
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.formItem.id = this.$route.params.id;
      this.getDetail({ id: this.$route.params.id });
    }
  },
};
</script>

<style scoped lang="stylus">
>>> .coupon-name .ant-row-flex:not(:last-child), .items .ant-row-flex:not(:last-child) {
  margin-bottom 15px
}
.coupon_show >>> .ant-card:not(:last-child) {
  margin-bottom 24px
}
.item-lists {
  margin-top 10px
  margin-bottom 15px
  li {
    border 1px solid #efefef
    >>>.ant-row-flex>div {
      padding 8px
      vertical-align middle
      .goods-item {
        display flex
      }
      .imgBox {
        width 80px
        margin-right 15px
        img {
          width 100%
        }
      }
    }
  }
}
</style>
