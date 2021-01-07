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
      <a-input-search enterButton class="mb10" style="width: 18rem;" placeholder="请输入名称或名称关键字搜索" @search="shopSearch"/>
      <template v-if="listField&&listField.length>0">
        <a-table :scroll="{ x: 1100,y:700 }" :rowKey="record => record.id" :columns="listField" :dataSource="listData" :pagination="false"
                 :rowSelection="{selectedRowKeys:selectedRowKeys,type: selectionRef, onChange: selectRows}">
          <img slot="image_url" slot-scope="image_url" :src="image_url" alt="" height="50">
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
      <div v-if="selectionRef === 'selection'">
        <Button @click="handleSelectAll(true)">全选</Button>
        <Button @click="handleSelectAll(false)">取消全选</Button>
      </div>
    </a-modal>
  </div>
</template>
<script>
import helper from '@/utils/helper';
import AppConfig from '@/config/common';
import fetch from '@/api/fetch';

export default {
  name: 'TableSelect',
  props: {
    selectionRef: String,
    selectionUrl: String,
    showType: String,
    goodId: [Array,Number],
    shopId:Number
  },
  data() {
    return {
      selectTableModal: false,
      highlightRow: false,
      selectedRowKeys: [],
      listField: [],
      listData: [],
      pages: {},
      ids: [],
      shopType:'',
      listPage: {
        total: AppConfig.default_page_total,
        current: 1,
        page_size: AppConfig.default_page_count,
      },
      selectData: [],
      newSelectionUrl: '',
      selectRowId: 0,
    };
  },
  methods: {
    pageChange(page) {
      this.getLists(page);
    },
    shopSearch(val) {
      this.getLists(1, val);
    },
    getLists(currentPage, searchVal) {
      fetch
        .get(this.newSelectionUrl, {
          params: { page: currentPage, keyword: searchVal,shop_state:1,goods_state:1 },
        })
        .then((response) => {
          if (response.data.code === 0) {
            this.listField = response.data.result.field;
            this.pages = response.data.result.lists;
            this.listField[2].scopedSlots = { customRender: 'image_url' };
            this.listData = response.data.result.lists.data;
          } else {
            helper.showError(response.data.code);
          }
        })
        .catch((error) => {
          helper.showError(error);
        });
    },
    handleSelectAll(status) {
      this.$refs.selection.selectAll(status);
    },
    selectRow(currentRow) {
      this.selectRowId = currentRow.id;
      this.selectData = currentRow;
    },
    selectRows(selectionKey, selection) {
      if (this.selectionRef === 'radio') {
        this.selectedRowKeys = selectionKey;
        this.selectData = selection;
        if (selection !== []) {
          this.ids[0] = selection[0].id;
        }
        if(this.showType==='shop'){
          this.shopType = selection[0].shop_type
        }
      } else {
        if (selectionKey.length > 20) {
          helper.showError('最多只能选取20个商品');
          return;
        }
        this.selectedRowKeys = selectionKey;
        for (let i = 0; i < selection.length; i++) {
          if (this.ids.indexOf(selection[i].id) === -1 && JSON.stringify(this.selectData).indexOf(JSON.stringify(selection[i]) === -1)) {
            this.ids.push(selection[i].id);
            this.selectData.push(selection[i]);
          }
        }
        for(let i=this.selectData.length-1;i>=0;i--){
          if(selectionKey.indexOf(this.selectData[i].id)===-1){
            this.selectData.splice(i,1)
            this.ids.splice(i,1)
          }
        }
      }
    },
    selectOk() {
      if(this.showType==='shop'){
        const item = {
          shop_type : this.shopType,
          data: this.selectData
        }
        this.$emit('on-select-ok',item);
      }else{
        this.$emit('on-select-ok', this.selectData);
      }
      // this.ids=[]
      // this.selectData=[]
      this.selectTableModal = false;
    },
    handleCancel() {
      // this.ids = []
      // this.selectData = []
      this.selectTableModal = false;
    },
    initSelect() {
      const data = this.listData;
      const ids = this.ids;
      for (let i = 0; i < data.length; i++) {
        if (ids.indexOf(data[i].id) !== -1) {
          this.selectedRowKeys.push(i);
        }
      }
    },
  },
  mounted() {
    // 修复精致礼包选择不勾选已选商品
    if (this.selectionRef === 'checkbox') {
      this.selectedRowKeys = [];
      const goodIdArr = [];
      if (this.goodId) {
        this.selectData = this.goodId
        this.goodId.forEach((item, i) => {
          goodIdArr.push(Number(item.id));
        });
      }
      this.selectedRowKeys = goodIdArr;
      this.ids = goodIdArr;
    }else{
      if(this.shopId){
        const arr = [this.shopId]
        this.selectedRowKeys = arr
      }
      else if (this.goodId) {
        const arr = [this.goodId]
        this.selectedRowKeys = arr
      }
    }
    this.newSelectionUrl = this.selectionUrl;
    this.getLists(1);
  },
  watch: {
    selectionUrl(newUrl) {
      this.newSelectionUrl = newUrl;
      this.getLists(1);
    },
    goodId(){
      if (this.selectionRef === 'checkbox') {
        this.selectedRowKeys = [];
        const goodIdArr = [];
        if (this.goodId) {
          this.selectData = this.goodId
          this.goodId.forEach((item, i) => {
            goodIdArr.push(Number(item.id));
          });
        }
        this.selectedRowKeys = goodIdArr;
        this.ids = goodIdArr;
      }else{
         if (this.goodId) {
          const arr = [this.goodId]
          this.selectedRowKeys = arr
        }
      }
    },
    listData() {
      // if (this.selectionRef !== 'radio') {
      this.initSelect();
      // }
    },
  },
};
</script>
<style scoped>
</style>
