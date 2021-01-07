<template>
  <div>
    <div  @click="selectTableModal = true">
      <slot></slot>
    </div>
    <a-modal
      destroyOnClose
      title="请点击选择列表数据"
      width="80%"
      :visible="selectTableModal"
      @ok="selectOk"
      @cancel="handleCancel"
    >
      <template v-if="listField&&listField.length>0">
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="listField" :dataSource="listData" :pagination="false"
                 :rowSelection="{selectedRowKeys:selectedRowKeys,type: 'radio', onChange: selectRows}">
          <img slot="goods_image" slot-scope="goods_image" :src="goods_image" alt="" height="50">
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
    </a-modal>
  </div>
</template>

<script>
  import helper from '@/utils/helper';
  import http from '@/api/http';
  export default {
    data() {
      return {
        selectTableModal:false,
        selectedRowKeys:[],
        selectData:[],
        newSelectionUrl:'',
        listField:[],
        pages:{},
        listData:[],
      };
    },
    props: {
      showType: String,
      selectionUrl: String,
      selectId: [String,Number],
    },

    methods: {
      selectRows(selectionKey, selection) {
        this.selectedRowKeys = selectionKey;
        this.selectData = selection;
      },
      selectOk(){
        this.$emit('on-select-ok',this.selectedRowKeys);
        this.selectTableModal = false;
      },
      handleCancel(){
        this.selectTableModal = false;
      },
      pageChange(page) {
        this.getLists(page);
      },
      getLists(currentPage) {
        const params ={
          page:currentPage
        }
        if(this.showType==='coupon'){
           params.is_shop_coupon = false
        }
        http
          .get(this.newSelectionUrl,params)
          .then((response) => {
            if (response.code === 0) {
              this.listField = response.result.field;
              this.pages = response.result.lists;
              this.listField[4].scopedSlots = { customRender: 'goods_image' };
              this.listData = response.result.lists.data;
            } else {
              helper.showError(response.message);
            }
          })
          .catch((error) => {
            helper.showError(error);
          });
      }
    },
    mounted() {
      this.newSelectionUrl = this.selectionUrl;
      this.getLists(1);
    },
    watch:{
      selectionUrl(newUrl) {
        console.log(111)
        this.newSelectionUrl = newUrl;
        this.getLists(1);
      },
      selectId(val){
        if(val){
          this.selectedRowKeys = [val]
        }
      }
    }
  };
</script>

<style scoped>

</style>
