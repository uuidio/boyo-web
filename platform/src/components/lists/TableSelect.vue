<template>
  <div>
    <a-button @click="selectTableModal = true" icon="search" size="small">
      点击选择
    </a-button>
    <a-modal
      destroyOnClose
      title="请点击选择列表数据"
      width="80%"
      :visible="selectTableModal"
      @ok="selectOk"
      @cancel="handleCancel"
    >
      <a-select
        v-if="showType != 'csutomActivity'"
        defaultValue="全部"
        style="width: 130px"
        :filter-option="SltFilterOption"
        show-search
        @change="handleSelectChange"
      >
        <a-select-option value="全部">全部</a-select-option>
        <a-select-option :value="item.id" v-for="(item, index) in shopList" :key="index">
          {{ item.shop_name }}
        </a-select-option>
      </a-select>
      <a-input-search
        v-if="showType != 'csutomActivity'"
        enterButton
        class="mb10"
        style="width: 18rem;"
        v-model="searchVal"
        placeholder="请输入名称或名称关键字搜索"
        @search="shopSearch"
      />
	   <a-form-item
            label="分类选择"
			style="display:inline-block;margin-left:10px;width:400px"
			:label-col="{ xs:{span: 24},md:{span:6}}"
            :wrapper-col="{ xs:{span: 24},md:{span:18}}"
          >
            <a-cascader :options="classTree"  placeholder="请选择分类" @change="changeClass" changeOnSelect />
          </a-form-item>
	<template v-if="listField&&listField.length>0">	  
      <a-table :scroll="{ x: 1100,y:700 }"
        :rowKey="record => record.id"
        :columns="listField"
        :dataSource="listData"
        :pagination="false"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          type: selectionRef,
          onChange: selectRows
        }"
      >
        <img
          slot="image_url"
          slot-scope="image_url"
          :src="image_url"
          alt=""
          height="50"
        />
      </a-table>
      <div class="pageBox">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="pages.per_page"
          :defaultCurrent="listPage.current"
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
import helper from "@/utils/helper";
import AppConfig from "@/config/common";
import fetch from "@/api/fetch";
 import {
    mapState,
    mapActions,
  } from 'vuex';
export default {
  name: "TableSelect",
  props: {
    selectionRef: String,
    selectionUrl: String,
    showType: String,
    goodId: Array,
    shopId: Number,
    shopList: Array,
    activeId: Number,
    goodsMax: Number,
  },
 computed:{
	  ...mapState({
        classTree: state => state.config.classTree,
      }),
 },
  data() {
    return {
      searchVal: '',
      activityTit: '',
      selectTableModal: false,
      highlightRow: false,
      selectedRowKeys: [],
      listField: [],
      listData: [],
      pages: {},
      ids: [],
      shopType: "",
      listPage: {
        total: AppConfig.default_page_total,
        current: 1,
        page_size: AppConfig.default_page_count
      },
      selectData: [],
      all: {
        page: [],
        list: [],
        def: []
      },
      newSelectionUrl: "",
      selectRowId: 0,
	  selectShopId: null,
	  formItem:{
		  gc_id_1:'',
		  gc_id_2:'',
		  gc_id_3:''
	  }
    };
  },
  methods: {
	...mapActions({
        getClassTree: 'config/getClassTree',
	  }),
	changeClass(val) {
		console.log('11',val);
        if (val.length > 0) {
          this.formItem.gc_id_1 = val[0];
          this.formItem.gc_id_2 = val[1] || '';
          this.formItem.gc_id_3 = val[2] || '';
        } else {
          this.formItem.gc_id_1 = '';
          this.formItem.gc_id_2 = '';
          this.formItem.gc_id_3 = '';
        }

      },
    pageChange(page) {
      this.getLists(page);
      this.listPage.current = page;
    },
    shopSearch(val) {
      this.getLists(1);
    },
    getLists(currentPage) {
      let params = {
        page: currentPage,
        keyword: this.searchVal,
        shop_state: 1,
        goods_state: 1
      };
      if (this.selectShopId) {
        params.shop_id = this.selectShopId;
	  }
	  if(this.formItem.gc_id_1&& this.formItem.gc_id_1!=''){
		params.gc_id_1 = this.formItem.gc_id_1;
        params.gc_id_2 = this.formItem.gc_id_2;
        params.gc_id_3 = this.formItem.gc_id_3;
	  }
      fetch
        .get(this.newSelectionUrl, { params })
        .then(response => {
          if (response.data.code === 0) {
            this.listField = response.data.result.field;
            this.pages = response.data.result.lists;
            this.listField[2].scopedSlots = { customRender: "image_url" };
            this.listData = response.data.result.lists.data;

            if (this.all.page.indexOf(currentPage) === -1 || this.searchVal || this.selectShopId) {
              this.all.page.push(currentPage);
              response.data.result.lists.data.map(item => {
                let find = this.all.def.findIndex(
                  defItem => item.id === defItem.id
                );
                if (find === -1) {
                  this.all.list.push(item);
                }
              });
            }
          } else {
            helper.showError(response.data.code);
          }
        })
        .catch(error => {
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
      if (this.selectionRef === "radio") {
        this.selectedRowKeys = selectionKey;
        this.selectData = selection;
        if (selection !== []) {
          this.ids[0] = selection[0].id;
        }
        if (this.showType === "shop") {
          this.shopType = selection[0].shop_type;
        }
        if (this.showType === 'customActivity') {
          this.activityTit = selection[0].title;
        }
      } else {
        // this.ids = [];
        // this.selectData = [];
        if (this.goodsMax) {
          if (selectionKey.length > this.goodsMax) {
            helper.showError('最多只能选取' + this.goodsMax + '个商品');
            return false;
          }
        }
        this.selectedRowKeys.length = 0;
        this.selectedRowKeys = [...selectionKey];
      }
    },
    selectOk() {
      if (this.showType === "shop") {
        const item = {
          shop_type: this.shopType,
          data: this.selectData
        };
        this.$emit("on-select-ok", item);
      } else if (this.showType === 'customActivity') {
        const item = {
          activityTit : this.activityTit,
          data: this.selectData
        }
        this.$emit('on-select-ok',item);
      } else {
        //  多选商品
        // 数组去重
        function unique(arr) {
          var result = [];
          var obj = {};
          for (var i = 0; i < arr.length; i++) {
            if (!obj[arr[i].id]) {
              result.push(arr[i]);
              obj[arr[i].id] = true;
            }
          }
          return result;
        }
        let uniList = unique(this.all.list);
        this.selectedRowKeys.map(keyItem => {
          uniList.map(item => {
            if (item.id === keyItem) {
              this.selectData.push(item);
            }
          });
        });
        this.$emit("on-select-ok", this.selectData);
        this.listPage.current = 1;
        this.getLists(1);
      }
      this.ids = [];
      this.selectData = [];
      this.selectTableModal = false;
    },
    handleCancel() {
      //取消后初始化
      this.getLists(1);
      this.listPage.current = 1;

      this.ids = [];
      this.selectData = [];
      this.selectTableModal = false;
    },
    initSelect() {
      // this.selectedRowKeys = [];
      const data = this.listData;
      const ids = this.ids;
      for (let i = 0; i < data.length; i++) {
        if (ids.indexOf(data[i].id) !== -1) {
          this.selectedRowKeys.push(i);
        }
      }
    },
    handleSelectChange(id) {
      this.selectShopId = Number(id);
    }
  },
  mounted() {
    // 修复精致礼包选择不勾选已选商品
    if (this.selectionRef === "checkbox") {
      this.selectedRowKeys = [];
      const goodIdArr = [];
      if (this.goodId !== "") {
        this.goodId.forEach((item, i) => {
          goodIdArr.push(Number(item.id));
          this.all.def.push(item);
          this.all.list.push(item);
        });
      }
      this.selectedRowKeys = goodIdArr;
    } else {
      if (this.shopId) {
        const arr = [this.shopId];
        this.selectedRowKeys = arr;
      } else if (this.activeId) {
        const arr = [this.activeId]
        this.selectedRowKeys = arr;
      }
    }
    this.newSelectionUrl = this.selectionUrl;
	this.getLists(1);
	this.getClassTree();
  },
  watch: {
    // 深度监听解决父组件更新数据子组件不更新问题
    selectionUrl(newUrl) {
      this.newSelectionUrl = newUrl;
      this.getLists(1);
    },
    listData() {
      // if (this.selectionRef !== 'radio') {
      this.initSelect();
      // }
    }
  }
};
</script>
<style scoped>
</style>
