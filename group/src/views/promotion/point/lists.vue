<template>
  <div class="mr24">
    <a-card :bordered="false">
      <div slot="title">
          <a-button @click="visible = true" type="primary" icon="plus">添加积分商品</a-button>
      </div>
      <template v-if="fields&&fields.length>0">
        <a-table :scroll="{ x: 1100,y:700 }"  :columns="fields" :dataSource="dataLists" :pagination="false">
          <div slot="goods_image" slot-scope="text, record">
            <img :src="record.goods_image" style="width:80px;height:80px;" alt="">
          </div>
          <div slot="action" slot-scope="text, record">
            <a class="ml10 col-red" @click="del(record)">删除</a>
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
    <a-modal title="添加积分商品" v-model="visible" @ok="handleSubmit" v-if="visible">
      <a-form :form="form" @submit="handleSubmit"

      >
        <a-form-item label="选择商品" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }" :required="true">
          <TableSelect selectionRef="radio" showType="goods" :selectionUrl="selectionGoodsUrl"
                       @on-select-ok="selectedGoods">
            选择商品
          </TableSelect>
          <div v-if="goods_item.id">
            <div> 已选商品：{{goods_item.goods_name}}</div>
            <div> 商品价格：￥{{goods_item.price}}</div>
          </div>
        </a-form-item>
        <a-form-item label="积分商品价格" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="请输入积分商品价格"
            type="number"
            v-decorator="['point_price', { rules: [{ required: true, message: '请输入积分商品价格' }] }]"
          />
        </a-form-item>
        <a-form-item label="商品所需积分" :label-col="{ span: 6 }" :wrapper-col="{ span: 12 }">
          <a-input
            placeholder="请输入商品所需积分"
            type="number"
            v-decorator="['point_fee', { rules: [{ required: true, message: '请输入商品所需积分' }] }]"
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
  export default {
    name: 'point_lists',
    components:{
      TableSelect
    },
    data() {
      return {
        visible:false,
        formItem:{
          page:1,
        },
        goods_item:{
          id:'',
          goods_name:'',
          price:''
        },
        form: this.$form.createForm(this),
        selectionGoodsUrl: Server.action.goods_lists,
      };
    },
    computed: {
      ...mapState({
        fields: state => state.point.field,
        dataLists: state => state.point.dataLists,
        pages: state => state.point.pages,
      }),
    },
    methods: {
      selectedGoods(item){
        this.goods_item = {
         id:item[0].id,
         goods_name:item[0].goods_name,
         price: item[0].goods_price
        }
      },
      handleSubmit(e) {
        e.preventDefault();
        this.form.validateFields((err, values) => {
          if (!err) {
            const params = {
              goods_id:this.goods_item.id,
              point_price:values.point_price,
              point_fee:values.point_fee,
            }
            this.addPointGoods({formItem:params})
          }
        });
      },
      ...mapActions({
        fetchLists: 'point/fetchLists',
        addPointGoods: 'point/addPointGoods',
        delPoint: 'point/delPoint',
      }),
      handleOk(){},
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
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
    },
  };
</script>

<style scoped lang="stylus">
  >>> .ant-card:not(:last-child)
    margin-bottom 24px
</style>
