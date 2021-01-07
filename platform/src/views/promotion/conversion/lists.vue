<template>
  <div class="content">
    <div class="mb20">
      <a-button type="primary" @click="addItem">添加奖品</a-button>
    </div>
    <div v-if="fields&&fields.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
        <div slot="goods_image" slot-scope="text,record">
          <img :src="record.goods_image" height="80px" alt="">
        </div>
        <!-- <action-column
          slot="action"
          slot-scope="text, record"
          :record="record"
          :actions="['edit', 'delete']"
          @on-edit="handleEdit"
          @on-delete="handleDelete">
        </action-column> -->
		<div slot="action" slot-scope="text,record">
           <a-button type="primary" size="small" @click="handleEdit(record)" class="mb5 mr5" ><em-icon type="icon-edit"></em-icon>编辑</a-button>
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
    </div>
    <addConversion
      :formParams="formParams"
      :addVisible="addVisible"
      @on-change="changeAdd"
    >
    </addConversion>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import addConversion from './components/add'
  const formItemLayout = {
    labelCol: {
      xs:{
        span: 24
      },
      md:{
        span:5
      }
    },
    wrapperCol: {
      xs:{
        span: 24
      },
      md:{
        span:16
      }
    },
  };
  import ActionColumn from '@/components/Table/ActionColumn';
  export default {
    components:{
      addConversion,
      ActionColumn
    },
    name: 'coupon',
    inject: ['reload'],
    data() {
      return {
        formItem:{
          page:1,
        },
        addVisible: false,
        formParams:{},
        show:false,
        formItemLayout
      };
    },
    computed: {
      ...mapState({
        fields: state => state.reward.fields,
        dataLists: state => state.reward.lists,
        pages: state => state.reward.pages,
      }),
    },
    methods: {
      ...mapActions({
        fetchLists: 'reward/fetchLists',
        del: 'reward/del',
      }),
      changeAdd(visible) {
        this.addVisible = !visible;
      },
      handleEdit(item){
        this.formParams = {
          id:item.id,
          goods_name:item.goods_name,
          goods_image:item.goods_image,
          goods_info:item.goods_info,
          goods_serial:item.goods_serial,
        }
        this.addVisible = true;
      },
      handleDelete(item){
        this.del({id:item.id,callback:this.reload})
      },
      addItem(){
        this.formParams = {
          goods_name:'',
          goods_image:'',
          goods_info:'',
          goods_serial:'',
        }
        this.addVisible = true
      },
      pageChange(page){
        this.formItem.page=page
        this.getLists()
      },
      getLists(){
        const params = this.formItem
        this.fetchLists(params);
      },
      callBack(){
        this.show = true
      }
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
