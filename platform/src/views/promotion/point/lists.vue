<template>
  <div class="mr24">
    <a-card :bordered="false">
      <div class="fxBox2 mb20">
        <div slot="title">
          <a-button @click="openModal('build')" type="primary" icon="plus">添加{{UserType === 'normal' ? '积分' : '牛币'}}商品</a-button>
        </div>
        <div>
          <a-input-search enterButton placeholder="请输入商品名称搜索" @search="onSearch"/>
        </div>
      </div>

      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="goods_image" slot-scope="text, record">
            <img :src="record.goods_image" style="width:80px;height:80px;" alt="">
          </div>
          <div slot="action" slot-scope="text, record">
            <a @click="openModal('edit', record)">编辑</a>
            <a class="ml10 col-red" @click="del(record)">删除</a>
          </div>
        </a-table>
        <div class="pageBox">
          <a-pagination
            :total="pages.total"
            :showTotal="total => `共 ${total} 条数据`"
            :pageSize="formItem.per_page"
            :defaultCurrent="formItem.page"
            @change="pageChange"
          />
        </div>
      </template>
    </a-card>
    <a-modal :title="currentStatus === 'build' ? (UserType === 'normal' ? '添加积分商品' : '添加牛币商品') : (UserType === 'normal' ? '编辑积分商品' : '编辑牛币商品')" v-model="visible" @ok="handleSubmit" v-if="visible">
      <a-form :form="form" @submit="handleSubmit"

      >
        <a-form-item label="选择商品" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" :required="true">
          <TableSelect
            selectionRef="radio"
            showType="goods"
            :selectionUrl="selectionGoodsUrl"
            @on-select-ok="selectedGoods"
            :shopList="shopLists">
            选择商品
          </TableSelect>
          <div v-if="goods_item.id">
            <div> 已选商品：{{goods_item.goods_name}}</div>
            <div> 商品价格：￥{{goods_item.price}}</div>
          </div>
        </a-form-item>
        <a-form-item :label="UserType === 'normal' ? '积分分类' : '牛币分类'" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
           <a-cascader v-model="point_class_id" :options="options" @change="onChange" :placeholder="UserType === 'normal' ? '请选择积分分类' : '请选择牛币分类'" />
        </a-form-item>
		    <a-form-item
          label="排序号"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }"
        >
          <a-input v-model="sort" placeholder="请输入排序号"/>
        </a-form-item>
        <a-form-item
          label="每人总限购"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="number"
            placeholder="请输入每人总限购"
            v-model="buy_max"
          />
        </a-form-item>
        <a-form-item
          label="每人每日限购"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="number"
            placeholder="请输入每人每日限购"
            v-model="day_buy_max"
          />
        </a-form-item>
        <!-- <a-form-item
          label="活动期间每人限购"
          :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }"
        >
          <a-input
            type="number"
            placeholder="请输入活动期间内每人限购"
            v-model="activity_buy_max"
          />
        </a-form-item> -->
        <a-form-item
          :required="true"
          label="允许售后"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 12,xs:24}"
        >
          <a-radio-group v-model="allow_after" name="allow_after" >
            <a-radio :value="0">不允许</a-radio>
            <a-radio :value="1">允许</a-radio>
          </a-radio-group>
        </a-form-item>

        <a-form-item
          :required="true"
          label="支付类型"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 12,xs:24}"
        >
          <a-radio-group v-model="exchangeType" name="exchangeType" @change="changeExchangeType">
            <a-radio :value="0">纯{{UserType === 'normal' ? '积分' : '牛币'}}</a-radio>
            <a-radio :value="1">{{UserType === 'normal' ? '积分' : '牛币'}}+金额</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          :required="true"
          label="会员等级限制"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 12,xs:24}"
        >
          <a-radio-group v-model="is_grade_limit" name="is_grade_limit">
            <a-radio :value="1">启用</a-radio>
            <a-radio :value="0">不启用</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          v-if="is_grade_limit === 1"
          :required="true"
          label="会员等级限制"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-select
            mode="multiple"
            :defaultValue="grade_limit"
            style="width: 100%"
            @change="handleChange"
            placeholder="请选择会员等级"
          >
            <a-select-option v-for="item in listData" :key="item.card_code">{{
              item.card_name
              }}</a-select-option>
          </a-select>
        </a-form-item>


        <a-form-item
          :required="true"
          label="兑换时间"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-range-picker
            showTime
            :defaultValue="active_start ? [moment(active_start, 'YYYY-MM-DD HH:mm:ss'), moment(active_end, 'YYYY-MM-DD HH:mm:ss')] : []"
            format="YYYY-MM-DD HH:mm:ss"
            @change="timeChange1"
          />
        </a-form-item>
        <a-form-item
          :required="true"
          label="核销时间"
          :label-col="{ md: 6,xs:24 }"
          :wrapper-col="{ md: 18,xs:24}"
        >
          <a-range-picker
            showTime
            :defaultValue="write_off_start ? [moment(write_off_start, 'YYYY-MM-DD HH:mm:ss'), moment(write_off_end, 'YYYY-MM-DD HH:mm:ss')] : []"
            format="YYYY-MM-DD HH:mm:ss"
            @change="timeChange"
          />
        </a-form-item>
        <a-form-item :required="true" :label="UserType === 'normal' ? '积分商品价格' : '牛币商品价格'" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" v-if="exchangeType == 1">
<!--          <a-input-number :min="0.01" :max="12" :value="number.value" @change="handleNumberChange" />-->
          <a-input
            :min="0.01"
            :placeholder="UserType === 'normal' ? '请输入积分商品价格' : '请输入牛币商品价格'"
            type="number"
            v-model="point_price"
          />
        </a-form-item>
        <a-form-item :required="true" :label="UserType === 'normal' ? '商品所需积分' : '商品所需牛币'" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            :min="1"
            :placeholder="UserType === 'normal' ? '请输入商品所需积分' : '请输入商品所需牛币'"
            type="number"
            v-model="point_fee"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import TableSelect from '@C/lists/TableSelect';
import Server from '@/config/server';
import http from '@/api/http';
import helper from '@/utils/helper';
import moment from 'moment';

// function validatePrimeNumber(number) {
//   if (number === 11) {
//     return {
//       validateStatus: 'success',
//       errorMsg: null,
//     };
//   }
//   return {
//     validateStatus: 'error',
//     errorMsg: 'The prime between 8 and 12 is 11!',
//   };
// }
export default {
  name: 'point_lists',
  components: {
    TableSelect,
  },
  data() {
    return {
      grade_limit: [],
      is_grade_limit: 0,
      active_start: '',
      active_end: '',
      write_off_start: '',
      write_off_end: '',
      allow_after: 1,
      day_buy_max: '',
      activity_buy_max: '',
      currentStatus: 'build',
      itemId: '',
      buy_max: '',
      point_fee: '',
      point_price: '',
      exchangeType: 1,
      visible: false,
      formItem: {
        page: 1,
        per_page: 15,
        goods_name: '',
      },
      goods_item: {
        id: '',
        goods_name: '',
        price: '',
      },
      point_class_id: [],
      sort: 0,
      form: this.$form.createForm(this),
      selectionGoodsUrl: Server.action.goods_lists,
    };
  },
  computed: {
    ...mapState({
      listData: state => state.member.lists,
      fields: state => state.point.field,
      dataLists: state => state.point.dataLists,
      pages: state => state.point.pages,
      integralLists: state => state.integral.dataLists,
      options: state => state.integral.options,
      shopLists: state => state.config.shopLists,
    }),
  },
  methods: {
    ...mapActions({
      fetchLists: 'point/fetchLists',
      addPointGoods: 'point/addPointGoods',
      delPoint: 'point/delPoint',
      integralClassLists: 'integral/fetchLists', // 积分分类列表
      getShopLists: 'config/getShopLists',
      updatePointGoods: 'point/updatePointGoods',
      fetchCardLists: 'member/fetchCardLists',
    }),
    moment,
    // 搜索
    onSearch(value) {
      this.formItem.goods_name = value;
      this.getLists();
    },
    handleChange(value) {
      this.grade_limit = value;
    },
    timeChange1(dates, dateStrings) {
      this.active_start = dateStrings[0];
      this.active_end = dateStrings[1];
    },
    timeChange(dates, dateStrings) {
      this.write_off_start = dateStrings[0];
      this.write_off_end = dateStrings[1];
    },
    getDataItem(id) {
      const hide = this.$message.loading('数据加载中...', 0)
      http
        .get(Server.action.pointGoodsDetail + '/' + id)
        .then((response) => {
          if (response.code === 0) {
            let detail = response.result;
            this.goods_item.id = detail.goods_id;
            this.goods_item.goods_name = detail.goods_name;
            this.goods_item.price = detail.goods_price;
            this.buy_max = detail.buy_max;
            this.sort = detail.sort;
            this.exchangeType = parseInt(detail.point_price) === 0 ? 0 : 1;
            this.point_price = detail.point_price;
            this.point_fee = detail.point_fee;
            this.point_class_id = [detail.point_class_id];
            this.allow_after = detail.allow_after;
            this.write_off_start = detail.write_off_start;
            this.write_off_end = detail.write_off_end;
            this.day_buy_max = detail.day_buy_max;
            this.activity_buy_max = detail.activity_buy_max;
            this.active_start = detail.active_start;
            this.active_end = detail.active_end;
            this.is_grade_limit = detail.is_grade_limit;
            this.grade_limit = detail.grade_limit;
            this.visible = true;
          } else {
            helper.showError(response.message);
          }
          hide();
        })
        .catch((error) => {
          hide();
          helper.showError(error);
        });
    },
    openModal(status, item) {
      if (status === 'edit') {
        this.currentStatus = 'edit';
        this.itemId = item.id;
        this.getDataItem(item.id);
      } else {
        this.is_grade_limit = 0;
        this.grade_limit = [];
        this.active_start = '';
        this.active_end = '';
        this.day_buy_max = '';
        this.activity_buy_max = '';
        this.allow_after = 1;
        this.write_off_start = '';
        this.write_off_end = '';
        this.itemId = '';
        this.currentStatus = 'build';
        this.goods_item.id = '';
        this.goods_item.goods_name = '';
        this.goods_item.price = '';
        this.buy_max = '';
        this.sort = '';
        this.exchangeType = 1;
        this.point_price = '';
        this.point_fee = '';
        this.point_class_id = [];
        this.visible = true;
      }
    },
    changeExchangeType(e) {
      if (e.target.value === 1) {
        this.point_price = '';
      } else {
        this.point_price = 0;
      }
    },
    onChange(val) {
      if (val.length > 0) {
        this.point_class_id = val;
      } else {
        this.point_class_id = [];
      }
    },
    selectedGoods(item) {
      this.goods_item = {
        id: item[0].id,
        goods_name: item[0].goods_name,
        price: item[0].goods_price,
      };
    },
    handleSubmit(e) {
      e.preventDefault();
      // this.form.validateFields((err, values) => {
      //   if (!err) {
      //     const params = {
      //       goods_id: this.goods_item.id,
      //       point_price: values.point_price,
      //       point_fee: values.point_fee,
      //       buy_max: values.buy_max,
      //       point_class_id: this.point_class_id,
      //       sort: this.sort,
      //     }
      //     this.addPointGoods({ formItem: params });
      //   }
      // });
      if (this.buy_max === '') {
        this.$notification.error({
          message: '请输入每人总限购',
          description: '',
        });
        // this.$message.error('请输入每人限购');
        return;
      }
      if (this.day_buy_max === '') {
        this.$notification.error({
          message: '请输入每人每日限购',
          description: '',
        });
        // this.$message.error('请输入每人每日限购');
        return;
      }
      if(this.is_grade_limit === 1 && this.grade_limit.length === 0){
        this.$notification.error({
          message: '请选择会员等级',
          description: '',
        });
      }
      // if (this.activity_buy_max === '') {
      //   this.$notification.error({
      //     message: '请输入活动期间内每人限购',
      //     description: '',
      //   });
      //   // this.$message.error('请输入每人限购');
      //   return;
      // }
      if (this.active_start === '' || this.active_end === '') {
        this.$notification.error({
          message: '请选择兑换时间',
          description: '',
        });
        // this.$message.error('请输入每人限购');
        return;
      }
      if (this.write_off_start === '' || this.write_off_end === '') {
        this.$notification.error({
          message: '请选择核销时间',
          description: '',
        });
        // this.$message.error('请输入每人限购');
        return;
      }
      if (this.point_price === '') {
        this.$notification.error({
          message: '请输入积分商品价格',
          description: '',
        });
        return;
      }
      if (this.point_fee === '') {
        this.$notification.error({
          message: '请输入商品所需积分',
          description: '',
        });
        return;
      }
      const params = {
        goods_id: this.goods_item.id,
        point_price: this.point_price,
        point_fee: this.point_fee,
        buy_max: this.buy_max,
        day_buy_max: this.day_buy_max,
        // activity_buy_max: this.activity_buy_max,
        point_class_id: this.point_class_id[0],
        sort: this.sort,
        write_off_start: this.write_off_start,
        write_off_end: this.write_off_end,
        allow_after: this.allow_after,
        active_start: this.active_start,
        active_end: this.active_end,
        is_grade_limit: this.is_grade_limit,
        grade_limit: this.grade_limit,
      }
      if (this.currentStatus === 'build') {
        this.addPointGoods({ formItem: params });
      } else {
        params.id = this.itemId;
        this.updatePointGoods(params);
      }
    },
    handleOk() {},
    pageChange(page) {
      this.formItem.page = page;
      this.getLists();
    },
    getLists() {
      const params = this.formItem;
      this.fetchLists(params);
    },

    del(item) {
      if (confirm('确认删除该数据？')) {
        this.delPoint({ id: item.id, dataList: this.dataLists });
      }
    },
  },
  mounted() {
    this.getLists()
    this.fetchCardLists()
    this.integralClassLists();
    const params = {
      per_page: 100000000,
      shop_state: 1,
      fit_up: 1,
    };
    this.getShopLists(params);
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
