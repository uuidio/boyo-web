<template>
  <div class="goodsList" @click="getLists">
    <div @click="openModel">
      <slot></slot>
    </div>
    <a-modal
      width="80%"
      title="选择"
      v-model="visible"
      @ok="select"
    >
      <div class="mb20 text-r" v-if="selectType==='shop'">
        <a-input-search enterButton placeholder="请输入名称搜索" style="width: 22rem;" @search="onSearch" />
      </div>
	  <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1600,y:400 }" :rowKey="record => record.id"  :rowSelection="{selectedRowKeys: selectedRowKeys, onChange: onSelectChange}" :loading="tabLoading" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false">
        <div slot="class_icon" slot-scope="text, record">
          <img style="width: 100px;height:100px" :src="record.class_icon" alt="">
        </div>
      </a-table>
      <div class="pageBox" v-if="selectType==='shop'">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="1"
          @change="pageChange"
        />
      </div>
	  </template>
    </a-modal>
  </div>
</template>

<script>
  import Server from '@/config/server';
  import http from '@/api/http';
  import helper from '@/utils/helper';
  export default {
    name: 'selectShop',
    props:{
      selectType:{
        type:String,
        default:'shop'
      }
    },
    data() {
      return {
        visible: false,
        tabLoading:true,
        selectedRowKeys:[],
        params:{
          page:1,
          is_open:1,
          keyword:'',
          class_level:3
        },
        selectData:[],
        listField:[],
        listData:[],
        pages:{},
        ajaxUrl:'',
        ids:[]
      };
    },
    methods: {
      openModel() {
        this.visible = true;
      },
      onSelectChange(keys,items){
        this.selectedRowKeys = keys
        for(let i = 0;i < items.length;i++){
          if(this.ids.indexOf(items[i].id)===-1){
            this.selectData.push(items[i])
            this.ids.push(items[i].id)
          }
        }
        for(let i = this.selectData.length-1;i >= 0 ;i--){
          if(keys.indexOf(this.selectData[i].id)===-1){
            this.selectData.splice(i,1)
            this.ids.splice(i,1)
          }
        }
      },
      onSearch(val){
        this.params.page=1
        this.params.keyword = val
        this.getLists()
      },
      pageChange(page){
        this.params.page = page
        this.getLists()
      },
      getLists(){
        this.tabLoading = true
        const params = this.params
        http
          .get(this.ajaxUrl, params)
          .then((response) => {
            if (response.code === 0) {
              this.listField = response.result.field
              this.pages = response.result.lists
              if(this.selectType==='shop'){
                this.listData = response.result.lists.data
              }else{
                this.listField[5].scopedSlots = { customRender: 'class_icon' }
                this.listData = response.result.lists
              }
              this.tabLoading = false
            } else {
              helper.showError(response.message);
            }
          })
          .catch((error) => {
            helper.showError(error);
          });
      },
      select(){
        this.$emit('on-select',this.selectData)
        this.visible = false
      }
    },
    mounted() {
      if(this.selectType==='shop'){
        this.ajaxUrl = Server.action.shop_lists
      }else{
        this.ajaxUrl = Server.action.class_lists
      }
    }
  };
</script>

<style scoped lang="stylus">

</style>
