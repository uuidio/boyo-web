<template>
  <div class="content">
    <div class="mb20">
      <a-button type="primary" @click="addItem">添加转盘活动</a-button>
    </div>
   <div v-if="fields&&fields.length>0">
     <a-table :scroll="{ x: 1100,y:700 }" :columns="fields" :dataSource="dataLists" :pagination="false">
       <div slot="desc" slot-scope="text, record">
         <a-button @click="showModel(record)" type="primary">查看抽奖规则</a-button>
       </div>
       <div slot="wx_mini_qr" v-if="record.wx_mini_qr" slot-scope="text, record">
         <div>
           <img :src="record.wx_mini_qr" height="80px" alt="">
         </div>
         <a-button class="mt10" size="small" @click="showCode(record)" >查看二维码</a-button>
       </div>
       <div slot="action"  slot-scope="text, record">
         <action-column
           :record="record"
           :actions="['edit']"
           @on-edit="handleEdit"
           @on-delete="handleDelete">
         </action-column>
         <div class="mt10" >
           <a-button @click="toDetail(record)" size="small">奖项列表</a-button>
           <a-button v-if="record.use_type===1" class="ml10" @click="getCode(record)" type="dashed" size="small">生成二维码</a-button>
         </div>
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
    <a-modal title="抽奖规则" v-model="visible" :footer="null">
      <div v-html="desc"></div>
    </a-modal>
    <AddLottery
      :formParams="formParams"
      :addVisible="addVisible"
      @on-change="changeAdd"
    >

    </AddLottery>
    <a-modal
      title="转盘二维码"
      style="top: 20px;"
      :width="500"
      v-model="codeShow"
      :footer="null"
    >
      <a-form
      >
        <a-form-item
          label="转盘名称"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          {{showCodeItem.name}}
        </a-form-item>
        <a-form-item
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
          :required="true"
          class="imgItem"
        >
          <img :src="showCodeItem.url"  width="100%" alt="">
          <p class="col-666 mt20">*右键图片保存，将上面转盘名称设置为图片名称</p>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  import AddLottery from './components/add';
  import ActionColumn from '@/components/Table/ActionColumn';
  export default {
    components:{
      AddLottery,
      ActionColumn
    },
    inject: ['reload'],
    computed: {
      ...mapState({
        fields: state => state.draw.lotteryFields,
        dataLists: state => state.draw.lotteryLists,
        pages: state => state.draw.lotteryPages,
      }),
    },
    data() {
      return {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 18 },
        },
        formItem:{
          page:1
        },
        codeShow:false,
        addVisible: false,
        formParams: {},
        visible:false,
        desc:'',
        showCodeItem:{
          name:'',
          url:''
        }
      };
    },
    methods: {
      ...mapActions({
        lotteryLists: 'draw/lotteryLists',
        delLottery: 'draw/delLottery',
        createCode: 'draw/createCode',
      }),
      getCode(item){
       this.createCode({formItem:{
          id:item.id
       },
         callback:this.reload
       })
      },
      showCode(item){
        this.showCodeItem = {
          url:item.wx_mini_qr,
          name:item.name
        }
        this.codeShow = true
      },
      toDetail(item) {
        const jumpUrl = `/promotion/draw/prizeLists/${item.id}`;
        let routeData = this.$router.resolve({ path: jumpUrl });
        window.open(routeData.href, '_blank');
      },
      addItem(){
        this.formParams = {
          is_grade_limit: 0,
          grade_limit: [],
          name: '',
          status: 1,
          desc: '',
          use_type: 0,
          luck_draw_num: '',
          integral: '',
          valid_start_at: '',
          valid_end_at: '',
        };
        this.addVisible = true;
      },
      handleEdit(item){
        this.formParams = {
          id:item.id,
          name: item.name,
          status:item.status,
          desc: item.desc,
          use_type:item.use_type,
          luck_draw_num:item.luck_draw_num,
          integral:item.integral,
          valid_start_at: item.valid_start_at,
          valid_end_at: item.valid_end_at,
          is_grade_limit: item.is_grade_limit,
          grade_limit: item.grade_limit,
        }
        this.addVisible = true;
      },
      handleDelete(item){
        this.delLottery({id:item.id,callback:this.reload})
      },
      changeAdd(visible) {
        this.addVisible = !visible;
        this.formParams = {}
      },
      pageChange(page){
        this.formItem.page = page
        this.lotteryLists(this.formItem)
      },
      showModel(item){
        this.desc = item.desc
        this.visible = true
      }
    },
    mounted() {
      this.lotteryLists(this.formItem)
    },
  };
</script>

<style scoped lang="stylus">
  >>>.imgItem
    display flex
    justify-content center
</style>
