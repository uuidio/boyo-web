<template>
  <div class="content">
    <div class="mb20">
      <a-button type="primary" @click="addItem">添加奖品</a-button>
    </div>
   <div v-if="fields&&fields.length>0">
     <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
       <div slot="image" slot-scope="text, record">
         <img :src="record.image" height="60px" alt="">
       </div>
       <action-column
         slot="action"
         slot-scope="text, record"
         :record="record"
         :actions="['edit']"
         @on-edit="handleEdit"
         @on-delete="handleDelete">
       </action-column>
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
    <a-modal title="抽奖规则" v-model="visible" :footer="null">
      <div v-html="desc"></div>
    </a-modal>
    <AddPrize
      :formParams="formParams"
      :addVisible="addVisible"
      @on-change="changeAdd"
    >

    </AddPrize>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import ActionColumn from '@/components/Table/ActionColumn';
  import AddPrize from './components/addPrize';
  export default {
    components:{
      ActionColumn,
      AddPrize
    },
    inject: ['reload'],
    computed: {
      ...mapState({
        fields: state => state.draw.lotteryPrizeFields,
        dataLists: state => state.draw.lotteryPrizeLists,
        pages: state => state.draw.lotteryPrizePages,
      }),
    },
    data() {
      return {
        formItem:{
          page:1,
          parent_id:this.$route.params.id
        },
        addVisible: false,
        formParams: {},
        visible:false,
        desc:''
      };
    },
    methods: {
      ...mapActions({
        lotteryPrize: 'draw/lotteryPrize',
        delPrize: 'draw/delPrize',
      }),
      changeAdd(visible) {
        this.addVisible = !visible;
      },
      addItem(){
        this.formParams ={
          name:'',
          type:0,
          image:'',
          prize:'',
          number:'',
          probability:'',
          status:1,
          is_show: 1,
          desc:'',
          parent_id:this.$route.params.id,
          activities_reward_goods_id:'',
          ticket_type:0,
          coupon_id:'',
          delivery_type:[1],
        }
        this.addVisible = true
      },
      handleEdit(item){
        this.formParams = {
          id:item.id,
          name:item.name,
          type:item.type,
          image:item.image,
          prize:item.prize,
          number:item.number,
          probability:item.probability,
          status:item.status,
          is_show:item.is_show,
          desc:item.desc,
          parent_id:item.parent_id,
          activities_reward_goods_id:item.prize,
          ticket_type:item.ticket_type,
          remnant_num:item.remnant_num,
          delivery_type:item.delivery_type || [],
        }
        this.addVisible = true;
      },
      handleDelete(item){
        this.delPrize({id:item.id,callback:this.reload})
      },
      pageChange(page){
        this.formItem.page = page
        this.lotteryLists(this.formItem)
      },
    },
    mounted() {
      if(this.$route.params.id){
        this.lotteryPrize(this.formItem)
      }
    },
  };
</script>

<style scoped>

</style>
