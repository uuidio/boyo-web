<template>
  <div class="content">
    <div>
      <a-button class="mb10" type="danger" @click="delImgBtn()">删除</a-button>
	  <template v-if="columns&&columns.length>0">
      <a-table :scroll="{x:1100,y:700}"
        class="mt10" :columns="columns" :dataSource="imgData" :rowSelection="rowSelection"
        :pagination="false"
      >
        <a slot="pic_url" target="_blank" slot-scope="text" :href="text">
          <img height="50px" :src="text" alt="">
        </a>
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
    </div>
    <a-modal title="温馨提示" v-model="visible" @ok="handleOk">
      <h2 class="mt10 mb10" style="color:#888888;text-align: center;">{{modalText}}</h2>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const columns = [
  {
    title: '图片Id',
    dataIndex: 'id',
    key: 'id',
  },
  {
    title: '图片名称',
    dataIndex: 'pic_name',
    key: 'pic_name',
  },
  {
    title: '图片',
    dataIndex: 'pic_url',
    key: 'pic_url',
    scopedSlots: { customRender: 'pic_url' },
  },
  {
    title: '上传时间',
    dataIndex: 'updated_at',
    key: 'updated_at',
  },
];
const data = [
  {
    id: 1,
    age: '微信图片',
    address: 'http://service.hyppmm.com//uploads/images/default/201903/04/Q29UJOnggxBTRQ9eXqEanZWeRy5w3sbRbtExDUVE.png',
    time: '2015-01-01',
  },
];
let itemIds = [];
// let imgLists = []
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    // console.log(selectedRows);
    if (!selectedRows.length == 0) {
      itemIds = [];
      // imgLists = []
      selectedRows.forEach((item, i) => {
        itemIds.push(item.id);
        // imgLists.push(item.pic_url)
      });
    } else {
      itemIds = [];
      // imgLists = []
    }
  },
};
export default {
  name: 'images',
  data() {
    return {
      columns,
      data,
      rowSelection,
      visible: false,
      imgLists: '',
      modalText: '',
    };
  },
  methods: {
    ...mapActions({
      getLists: 'goods/getImgs',
      delImg: 'goods/delImg',
    }),
    pageChange(page) {
      this.getLists(page);
    },
    delImgBtn() {
      console.log(itemIds);
      if (itemIds.length == 0) {
        this.visible = true;
        this.modalText = '亲，请先勾选要删除的图片!';
      } else {
        this.visible = true;
        this.modalText = '亲，你确定要删除图片吗？不能恢复的哦！';
      }
    },
    handleOk(e) {
      const imgId = {
        id: itemIds,
      };
      this.delImg({
        imgId,
      });
      this.visible = false;
    },
  },
  computed: {
    ...mapState({
      imgData: state => state.goods.imgs,
      pages: state => state.goods.imgsPage,
    }),
  },
  mounted() {
    this.getLists(1);
    // this.imgLists = imgLists
    // console.log(this.imgLists);
  },
};
</script>

<style scoped>

</style>
