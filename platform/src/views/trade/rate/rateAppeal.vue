<template>
  <div class="content">
	<template v-if="fieldsData&&fieldsData.length>0">  
    <a-table :scroll="{ x: 1100,y:700 }" class="mr10"  :columns="fieldsData" :dataSource="listsData" :pagination="false">
      <div v-if="record.status==='WAIT'" slot="action" slot-scope="text, record">
        <a href="javascript:;" @click="details(record)">审批</a>
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
    <a-modal title="评论申诉审批"  v-model="visible" @ok="handleOk">
      <a-row style="padding-bottom:20px">
        <a-col :xs="24" :md="5">
          是否同意申诉:
        </a-col>
        <a-col :xs="24" :md="19">
          <a-radio-group  v-model="formItem.result">
            <a-radio :value="true">同意</a-radio>
            <a-radio :value="false">不同意</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>
      <a-row>
        <a-col :xs="24" :md="5">
          审批备注:
        </a-col>
        <a-col :xs="24" :md="19">
          <a-textarea v-model="formItem.reject_reason" placeholder="选填" :rows="4"/>
        </a-col>
      </a-row>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';


export default {
  name: 'rateAppeal',
  data() {
    return {
			visible: false,
      formItem:{
        appeal_id:'',
        result:true,
        reject_reason:'',
      },
      page:1
    };
  },

  methods: {
    ...mapActions({
      fetchLists: 'rateAppeal/fetchLists',
      rateAppealCheck: 'rateAppeal/rateAppealCheck',
    }),
    pageChange(page){
      this.page = page
      this.fetchLists(this.page);
    },
    details(item){
      console.log(item)
      this.formItem = {
        appeal_id:item.id,
        result:true,
        reject_reason:'',
      }
      this.visible = true
    },
    handleOk(){
      this.rateAppealCheck({
        formItem:this.formItem,
        callback:(()=>{
          this.visible = false
          this.fetchLists(this.page);
        })
      })
    },
  },
  computed: {
    ...mapState({
      listsData: state => state.rateAppeal.lists,
      fieldsData: state => state.rateAppeal.fields,
      pages: state => state.rateAppeal.pages
    }),
  },
  mounted() {
    this.fetchLists(this.page);
  },
};
</script>

<style scoped>

</style>
