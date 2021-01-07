<template>
  <div class="content">
    <div class="content-main">
      <div class="main-l">
        钱包支付适用范围：
      </div>
      <div class="main-r">
        <a-radio-group v-model="param.status" :defaultValue="2">
          <a-radio :value="2">全部店铺适用</a-radio>
          <a-radio :value="1">指定不适用店铺 </a-radio>
        </a-radio-group>
        <div class="slt-num" v-if="param.status == 1 && param.limit_shop.length > 0">已选{{dataTotal.platformTotal}}个项目，{{dataTotal.shopTotal}}个店铺</div>
        <div class="slt-info-table" v-if="param.status == 1">
          <div class="table-head">
            <div class="head-th">
              项目
            </div>
            <div class="head-th">
              不适用店铺
            </div>
          </div>
          <div class="table-tr-empty" v-if="param.limit_shop.length == 0">
            暂未添加
          </div>
          <div class="table-tr" v-for="(item, index) in param.limit_shop" :key="index">
            <div class="tr-l">
              <a-select v-model="item.gm_id" placeholder="请选择项目" :disabled="detail.limit_shop && (index <= detail.limit_shop.length - 1)">
                <a-select-option v-for="(item) in gmListData" :value="item.gm_id" :disabled="isDisabled(item.gm_id)">{{item.platform_name}}</a-select-option>
              </a-select>
            </div>
            <div class="tr-r">
              <div class="tips" v-if="!item.gm_id">请先选择项目</div>
              <div class="shop-list" v-if="item.gm_id">
                <span v-for="(itm, idx) in item.shop_names" :key="idx">{{itm+'，'}}</span>
              </div>
              <a v-if="item.gm_id" class="operate-btn ml10" @click="showModal(index, item.gm_id)">{{item.shop_names.length > 0 ? '修改' : '选择'}}</a>
            </div>
          </div>
        </div>
        <div class="add-btn-box mt10" v-if="param.status == 1">
          <a-button @click="addItem" class="add-btn">+ 添加</a-button>
        </div>
        <div class="bottom-btn-box mt20">
          <a-button type="primary" @click="saveParam">保存</a-button>
          <a-button class="ml10" @click="reset">取消</a-button>
        </div>
      </div>
      <a-modal
        destroyOnClose
        title="选择不适用店铺"
        width="80%"
        :visible="selectTableModal"
        @cancel="hideModal"
      >
        <div class="btn-box" slot="footer">
          <a-button @click="handleSelectAll(true)" v-if="listData.length > 0 && checkAllKeys.length > selectedRowKeys.length">全选</a-button>
          <a-button @click="handleSelectAll(false)" v-if="listData.length > 0 && checkAllKeys.length == selectedRowKeys.length">取消全选</a-button>
          <div>
            <a-button @click="handleCancel">取消</a-button>
            <a-button @click="selectOk" type="primary" class="ml10">确定</a-button>
          </div>
        </div>
        <a-input-search  enterButton class="mb10" style="width: 18rem;" placeholder="请输入店铺名称" @search="shopSearch" v-model="searchVal"/>

        <template v-if="listField&&listField.length>0">
          <a-table
            :scroll="{ x: 1100,y:700 }"
            :rowKey="record => record.id"
            :columns="listField"
            :dataSource="listData"
            :pagination="false"
            :rowSelection="{selectedRowKeys:selectedRowKeys, onChange: selectRows}">
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
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';
import helper from '@/utils/helper';
import fetch from '@/api/fetch';
import Server from '@/config/server';

export default {
  data() {
    return {
      checkAllKeys: [],
      checkAllItems: [],
      currentIndex: 0,
      selectTableModal: false,
      pages: {},
      selectedRowKeys: [],
      listField: [],
      listData: [],
      searchVal: '',
      abc: 1,
      param: {
        status: 2,
        limit_shop: [],
      },
    };
  },
  computed: {
    ...mapState({
      detail: state => state.wallet.walletConfig,
      gmListData: state => state.project.lists,
    }),
    dataTotal() {
      const obj = {
        platformTotal: 0,
        shopTotal: 0,
        sltPlatform: [],
      };
      for (let i = 0; i < this.param.limit_shop.length; i++) {
        if (this.param.limit_shop[i].gm_id) {
          obj.platformTotal += 1;
          obj.sltPlatform.push(this.param.limit_shop[i].gm_id);
        }
        obj.shopTotal += this.param.limit_shop[i].shop_ids.length;
      }
      return obj;
    },
  },

  methods: {
    ...mapActions({
      getWalletConfig: 'wallet/getWalletConfig',
      gmfetchLists: 'project/fetchLists',
      saveWalletConfig: 'wallet/saveWalletConfig',
    }),
    isDisabled(gmId) {
      for (let i = 0; i < this.dataTotal.sltPlatform.length; i++) {
        if (gmId === this.dataTotal.sltPlatform[i]) {
          return true;
        }
      }
      return false;
    },
    reset() {
      this.getWalletConfig();
    },
    handleSelectAll(bool) {
      if (bool) {
        this.selectedRowKeys = this.checkAllKeys;
        this.selection = this.checkAllItems;
      } else {
        this.selectedRowKeys = [];
        this.selection = [];
      }
    },
    saveParam() {
      this.saveWalletConfig(this.param);
    },
    hideModal() {
      this.selectTableModal = false;
    },
    showModal(idx, gmId) {
      this.currentIndex = idx;
      this.selectedRowKeys = this.param.limit_shop[idx].shop_ids;
      this.getLists(1, gmId);
      this.getLists(1, '', 99999999);
      this.selectTableModal = true;
    },
    pageChange(page) {
      this.getLists(page);
    },
    selectOk() {
      this.param.limit_shop[this.currentIndex].shop_ids = this.selectedRowKeys;
      this.param.limit_shop[this.currentIndex].shop_names = [];
      for (let i = 0; i < this.selection.length; i++) {
        this.param.limit_shop[this.currentIndex].shop_names.push(this.selection[i].shop_name);
      }
      this.hideModal();
    },
    handleCancel() {
      // this.ids = []
      // this.selectData = []
      this.selectTableModal = false;
    },
    selectRows(selectionKey, selection) {
      this.selectedRowKeys = selectionKey;
      this.selection = selection;
    },

    getLists(currentPage, gmId, perPage) {
      const params = {
        page: currentPage,
        keyword: this.searchVal,
        gm_id: gmId,
        per_page: perPage || '',
      };
      fetch
        .get(Server.action.shop_lists, { params })
        .then((response) => {
          if (response.data.code === 0) {
            if (perPage) {
              const arr = response.data.result.lists.data;
              this.checkAllItems = arr;
              for (let i = 0; i < arr.length; i++) {
                this.checkAllKeys.push(arr[i].id);
              }
            } else {
              this.listField = response.data.result.field;
              this.pages = response.data.result.lists;
              this.listData = response.data.result.lists.data;
            }
          } else {
            helper.showError(response.data.code);
          }
        })
        .catch((error) => {
          helper.showError(error);
        });
    },

    shopSearch(val) {
      this.getLists(1);
    },
    addItem() {
      this.param.limit_shop.push({
        gm_id: '',
        shop_ids: [],
        shop_names_text: '',
        shop_names: [],
      });
    },
    init() {
      this.param.status = this.detail.status;
      if (this.detail.limit_shop) {
        this.param.limit_shop = [].concat(this.detail.limit_shop);
      } else {
        this.param.limit_shop = [];
      }
    },
  },
  watch: {
    detail() {
      this.init();
    },
  },
  mounted() {
    this.getWalletConfig();
    this.gmfetchLists({
      per_page: 1000000,
      status: 1,
    });
  },
};
</script>

<style lang="stylus" scoped>
  .content-main
    display flex
    .main-l
      flex-shrink 0
    .main-r
      flex 1
    .slt-num
      color #999
      margin-top 20px
    .slt-info-table
      margin-top 10px
      .table-head
        border 1px solid #E4E4E4
        background #F2F2F2
        height 40px
        text-align center
        display flex
        .head-th
          height 38px
          line-height 38px
          width 75%
          &:first-child
            border-right 1px solid #E4E4E4
            width 25%
            padding 0 10px
      .table-tr
        border 1px solid #E4E4E4
        border-top 0
        min-height 60px
        display flex
        .tr-l
          display flex
          align-items center
          width 25%
          border-right 1px solid #E4E4E4
          padding 15px 10px
          flex-shrink 0
          .ant-select
            width 100%
        .tr-r
          display flex
          justify-content center
          align-items center
          width 100%
          padding 15px 10px
          box-sizing border-box
          overflow hidden
          flex-flow nowrap
          .operate-btn
            flex-shrink 0
      .table-tr-empty
        border 1px solid #E4E4E4
        border-top 0
        color #999
        text-align center
        height 50px
        line-height 48px
  .tips
    color #999999
    text-align center
  .btn-box
    display flex
    justify-content space-between
    align-items center
    padding 10px 16px
  .add-btn
    border-style dashed
</style>
