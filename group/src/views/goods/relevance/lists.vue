<template>
    <div class="content">
      <div class="mb20 fxBox">
        <a-button  @click="allSubmit" :disabled="selectList.length===0?true:false" class="mr20" type="primary">批量关联</a-button>
        <div>
          <span>第三方分类：</span>
          <a-select v-model="item.source" :allowClear="true"  placeholder="请选择" style="width: 150px"  class="mr10">
            <a-select-option :key="index" v-for="(item,index) in allSelectItem" :value="item.id">{{
                item.label
              }}</a-select-option>
          </a-select>
          <a-button @click="itemSeach" type="primary">搜索</a-button>
        </div>
      </div>
	  <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :rowSelection="{onChange:onChange}" :columns="listField" :dataSource="listData" :pagination="false">
        <div slot="action" slot-scope="text,record">
          <a-button class="mr10" type="primary" @click="edit(record)">关联</a-button>
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
      <a-modal
        title="关联分类"
        v-model="visible"
        @ok="handleOk"
      >
        <div class="fxBox">
          <div>分类选择：</div>
          <a-cascader style="width:300px" v-model="selectClass" :allowClear="true" @change="classChange" :options="classItemTree"
                      placeholder="选择分类"/>
        </div>
        <div class="mt15 fxBox" v-if="selectClassData.length!==0">
          已选分类：<div>
          <span :key="index" v-for="(item,index)  in selectClassData">
            {{
            item.label
            }} <span v-if="index!==selectClassData.length-1">></span>
          </span>
        </div>
        </div>
      </a-modal>
    </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import { getArrayFilterKey } from '@/utils/tools';
import helper from '@/utils/helper';

export default {
  data() {
    return {
      selectList: [],
      allSelectItem: [],
      item: {
        page: 1,
        source: '',
      },
      visible: false,
      selectClass: [],
      selectClassData: [],
      option: [],
      formItem: {
        third_ids: [],
        class_id: '',
      },
    };
  },
  computed: {
    ...mapState({
      listData: state => state.relevance.lists,
      pages: state => state.relevance.pages,
      listField: state => state.relevance.fields,
      selectOpt: state => state.relevance.selectOpt,
      classItemTree: state => state.relevance.classItemTree,
    }),
  },
  methods: {
    ...mapActions({
      fetchLists: 'relevance/fetchLists',
      getClassTree: 'relevance/getClassTree',
      classThirdSubmit: 'relevance/classThirdSubmit',
    }),
    classChange(val, data) {
      if (val.length !== 0) {
        this.selectClass = val;
        this.selectClassData = data;
      } else {
        this.selectClassData = [];
        this.selectClass = [];
      }
    },
    allSubmit() {
      this.selectClass = [];
      this.selectClassData = [];
      this.formItem.third_ids = this.selectList;
      this.visible = true;
    },
    itemSeach() {
      this.item.page = 1;
      this.fetchLists(this.item);
    },
    handleOk() {
      if (this.selectClass.length !== 3) {
        helper.showError('请选择正确商品分类，只有选到第3级分类才可以关联分类');
        return;
      }
      this.formItem.class_id = this.selectClass[2];
      this.classThirdSubmit({
        formItem: this.formItem,
      });
      this.visible = false;
      console.log(this.formItem);
    },
    edit(item) {
      this.selectClass = [];
      this.selectClassData = [];
      this.formItem.third_ids = [item.id];
      console.log(this.formItem);
      this.visible = true;
    },
    pageChange(page) {
      this.item.page = page;
      this.fetchLists(this.item);
    },
    onChange(selectedRowKeys, selectedRows) {
      this.selectList = getArrayFilterKey(selectedRows, 'id');
      console.log(this.selectList);
    },
    initOpt() {
      this.allSelectItem = [];
      for (const index in this.selectOpt) {
        this.allSelectItem.push({
          id: index,
          label: this.selectOpt[index],
        });
      }
    },
  },
  mounted() {
    this.fetchLists(this.item);
    this.getClassTree();
  },
  watch: {
    selectOpt() {
      this.initOpt();
    },
  },
};
</script>

<style scoped>

</style>
