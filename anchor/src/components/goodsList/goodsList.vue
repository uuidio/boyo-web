<template>
  <div class="goodsList" @click="getGoods()">
    <div @click="openModel">
      <slot></slot>
    </div>
    <a-modal width="80%" title="商品列表" v-model="visible" @ok="selectGoods">
      <div class="mb20 text-r">
        <a-input-search
          enterButton
          placeholder="请输入名称搜索"
          style="width: 22rem;"
          @search="onSearch"
        />
		<a-form-item
            label="分类选择"
			style="display:inline-block;margin-left:10px;width:400px"
			:label-col="{ xs:{span: 24},md:{span:6}}"
            :wrapper-col="{ xs:{span: 24},md:{span:18}}"
          >
            <a-cascader :options="classTree"  placeholder="请选择分类" @change="changeClass" changeOnSelect style="width:100%"/>
          </a-form-item>
      </div>
	  <template v-if="listField&&listField.length>0">
      <a-table 
        :rowKey="record => record.id"
        :scroll="{ y: 400, x: 1200 }"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange,
          type: seleteType
        }"
        :loading="tabLoading"
        :columns="listField"
        :dataSource="listData"
        class="components-table-demo-nested"
        :pagination="false"
      >
        <div slot="goods_image" slot-scope="text, record">
          <img
            style="width: 100px;height:100px"
            :src="record.goods_image"
            alt=""
          />
        </div>
      </a-table>
      <div class="pages">
        <a-pagination
          :total="pages.total"
          :showTotal="total => `共 ${total} 条数据`"
          :pageSize="Number(pages.per_page)"
          :defaultCurrent="1"
          @change="changePage"
        />
      </div>
	  </template>
    </a-modal>
  </div>
</template>

<script>
import Server from "@/config/server";
import http from "@/api/http";
import helper from "@/utils/helper";
 import {
    mapState,
    mapActions,
  } from 'vuex';
export default {
  name: "goodsList",
   computed: {
      ...mapState({
        // listData: state => state.shop.lists,
        // gmlistData: state => state.project.lists,
        classTree: state => state.goods.goodsClassTree,
      }),
    },
  data() {
    return {
      visible: false,
      tabLoading: true,
      params: {
        page: 1,
        keyword: "",
		goods_state: 1,
		gc_id_1: '',
        gc_id_2: '',
        gc_id_3: '',
      },
      selectedRowKeys: [],
      ids: [],
      selection: [],
      listData: [],
      listField: [],
	  pages: {},
	  shopParams: {
          per_page: 1000000,
          is_open: 1,
		},
    };
  },
  watch: {},
  props: {
    linkType: {
      type: String,
      default: "goods"
    },
    seleteType: {
      type: String,
      default: "checkbox"
    },
    maxNum: {
      type: Number,
      default: 100000
    },
    defaultKeys: {
      type: Array,
      default: () => [],
    },
    otherParam: {
      type: Object,
      default: () => {},
    },
  },
  mounted() {
    //默认选中
    if (this.defaultKeys.length > 0) {
      this.selectedRowKeys = this.defaultKeys;
    }
    // 传入参数
    if(this.otherParam) {
      console.log(this.otherParam);
      Object.assign(this.params,this.otherParam);
	}
	this.getClassTree();
  },
  methods: {
	...mapActions({
        // fetchLists: 'shop/fetchLists',
        // gmfetchLists: 'project/fetchLists',
        getClassTree: 'goods/getGoodsClassTree',
	  }),
	 changeClass(val) {
        if (val.length > 0) {
          this.params.gc_id_1 = val[0];
          this.params.gc_id_2 = val[1] || '';
          this.params.gc_id_3 = val[2] || '';
        } else {
          this.params.gc_id_1 = '';
          this.params.gc_id_2 = '';
          this.params.gc_id_3 = '';
        }

      },    
    changePage(page) {
      this.params.page = page;
      this.getGoods();
    },
    onSelectChange(keys, items) {
      if (this.seleteType === "checkbox") {
        if (keys.length > this.maxNum) {
          this.$message.warning("最大选择数量为" + this.maxNum);
          return;
        }
        this.selectedRowKeys = keys;
        for (let i = 0; i < items.length; i++) {
          if (this.ids.indexOf(items[i].id) === -1) {
            let itemdata = [];
            if (this.linkType === "goods") {
              itemdata.id = items[i].id;
              itemdata.goods_name = items[i].goods_name;
              itemdata.goods_price = items[i].goods_price;
              itemdata.goods_image = items[i].goods_image;
              this.selection.push(itemdata);
            } else {
              this.selection.push(items[i]);
            }
            this.ids.push(items[i].id);
          }
        }
        for (let i = this.selection.length - 1; i >= 0; i--) {
          if (keys.indexOf(this.selection[i].id) === -1) {
            this.selection.splice(i, 1);
            this.ids.splice(i, 1);
          }
        }
      } else {
        this.selectedRowKeys = keys;
        this.selection = items;
      }
      this.$emit("selected", this.selection);
    },
    onSearch(val) {
      this.params.page = 1;
      this.params.keyword = val;
      this.getGoods();
    },
    getGoods() {
      this.tabLoading = true;
      const params = this.params;
      let url = "";
      if (this.linkType === "goods") {
        url = Server.action.goods_lists;
      } else {
        url = Server.action.secKillGoodList;
      }
      http
        .get(url, params)
        .then(response => {
          if (response.code === 0) {
            this.listField = response.result.field;
            this.listField[0].width = 50;
            this.listField[1].width = 150;
            if (this.linkType === "goods") {
              this.listField[2].scopedSlots = { customRender: "goods_image" };
            } else {
              this.listField[3].scopedSlots = { customRender: "goods_image" };
            }
            this.listField[2].width = 120;
            this.listField[3].width = 120;
            this.listField[4].width = 120;
            this.listField[5].width = 120;
            this.listField[6].width = 120;
            this.listField[7].width = 120;
            this.pages = response.result.lists;
            this.listData = response.result.lists.data;
            this.tabLoading = false;
          } else {
            helper.showError(response.message);
          }
        })
        .catch(error => {
          helper.showError(error);
        });
    },
    openModel() {
      this.visible = true;
    },
    selectGoods() {
      this.visible = false;
      this.$emit("selectOk", this.selection);
    }
  }
};
</script>

<style scoped lang="stylus">
.goods-items {
  display flex
  flex-wrap wrap
  padding 10px
  background #efefef
  li.active {
    border 1px solid #1890ff
    box-sizing border-box
    &::before {
      content ''
      width 0
      height 0
      position absolute
      right -2px
      bottom -9px
      border-top solid 14px transparent
      transform rotate(45deg)
      border-left solid 14px #1890ff
      border-bottom solid 14px transparent
    }
    &::after {
      content ''
      width 12px
      height 12px
      background url('~@/assets/images/dui.png') no-repeat
      background-size 100% 100%
      position absolute
      right 0
      bottom 0
    }
  }
  li {
    width 140px
    border 1px solid #efefef
    padding 5px
    background #ffffff
    border-radius 4px
    margin-right 10px
    cursor pointer
    position relative
    .imgBox {
      width 100%
      img {
        display block
        width 100%
      }
    }
    .txtBox {
      padding-top 3px
      width 100%
      .p1 {
        width 100%
        overflow hidden
        text-overflow ellipsis
        white-space nowrap
        padding-bottom 3px
      }
    }
  }
}
.pages {
  text-align right
  margin-top 10px
}
</style>
