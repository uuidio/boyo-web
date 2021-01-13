<template>
  <div class="content">
    <div class="modal">
      <a-modal
        title="回寄地址"
				width="46rem"
        :visible="addVisible"
        @ok="handleOk"
        :confirmLoading="confirmLoading"
        @cancel="handleCancel"
      >
				<a-form-item
					label="商品回寄地址"
					:required="true"
					:label-col="{ md: 6,xs:24 }"
					:wrapper-col="{ md: 18,xs:24 }"
				>
					<a-textarea placeholder="请输入回寄地址" v-model="formItem.address"/>
				</a-form-item>
				<a-form-item
					label="收件人姓名"
					:required="true"
					:label-col="{ md: 6,xs:24 }"
					:wrapper-col="{ md: 18,xs:24 }"
				>
					<a-input placeholder="请输入收件人姓名" v-model="formItem.name"/>
				</a-form-item>
				<a-form-item
					label="收件人电话"
					:required="true"
					:label-col="{ md: 6,xs:24 }"
					:wrapper-col="{ md: 18,xs:24 }"
				>
					<a-input placeholder="请输入收件人电话" v-model="formItem.tel"/>
				</a-form-item>
				<a-form-item
					label="是否默认地址"
					:required="true"
					:label-col="{ md: 6,xs:24 }"
					:wrapper-col="{ md: 18,xs:24 }"
				>
					<a-radio-group v-model="formItem.is_default">
						<a-radio :value="0">否</a-radio>
						<a-radio :value="1">是</a-radio>
					</a-radio-group>
				</a-form-item>
      </a-modal>
    </div>
    <div class="mr10 mb20">
      <a-button type="primary" class="mr10" @click="addBtn">
        <a-icon type="plus" />添加回寄地址
      </a-button>
    </div>
    <div v-if="FieldsData&&FieldsData.length>0">
      <a-table
        class="mr10"
        :columns="FieldsData"
        :dataSource="listsData"
        :rowKey="record=> record.id"
        :pagination="false"
      >
        <div slot="action" slot-scope="text, item">
          <a-button class="mr10" @click="editBtn(item)" :key="item.id" size="small" type="primary">编辑</a-button>
          <a-button type="danger"  size="small" class="mr10 mt10" @click="delBtn(item)"> 删除</a-button>
        </div>
        <tagBoole slot="tag" slot-scope="text, item" :tagValue="text"></tagBoole>
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
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import tagBoole from "@C/Table/TagBoole.vue";
let itemIds = [];
const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(selectedRows);
    if (!selectedRows.length == 0) {
      itemIds = [];
      selectedRows.forEach(function(item, i) {
        itemIds.push(item.id);
      });
    } else {
      itemIds = [];
    }
  }
};
export default {
	name: "receive",
	components: {
		tagBoole
	},
  data() {
    return {
      rowSelection,
      confirmLoading: false,
      addVisible: false,
      delVisible: false,
			formItem: {
				address: "",
				name: "",
				tel: "",
				is_default: 0,
			},
      itemaddress: "",
      tipslText: "",
			tableItem: {},
			current: 1
    };
  },
  methods: {
    ...mapActions({
      getAddrsLists: "shop/getAddrsLists",
      addAddrs: "shop/addAddrs",
      delAddrs: "shop/delAddrs",
      editAddrs: "shop/editAddrs"
    }),
    handleCancel(e) {
      this.addVisible = false;
    },
    //添加按钮
    addBtn() {
			this.formItem = {
				address: "",
				name: "",
				tel: "",
				is_default: 0,
			},
      this.addVisible = true;
		},
		handleOk() {
			if (this.formItem.id) {
				this.editHandleOk()
			} else {
				this.addHandleOk()
			}
		},
    addHandleOk(e) {
      this.confirmLoading = true;
      this.addAddrs(this.formItem);
      setTimeout(() => {
        this.getAddrsLists({
					obj: {
						page: this.current,
					},
				});
        this.addVisible = false;
        this.confirmLoading = false;
      }, 1000);
		},
		editHandleOk(e) {
      this.confirmLoading = true;
			this.editAddrs(this.formItem);
      setTimeout(() => {
        this.getAddrsLists({
					obj: {
						page: this.current,
					},
				});
        this.addVisible = false;
        this.confirmLoading = false;
      }, 1000);
    },
    //删除按钮
    delBtn(item) {
			const that = this
			this.$confirm({
				title: '确定删除该数据?',
				content: '',
				okType: 'danger',
				onOk() {
					that.delAddrs(item.id);
				},
			});
    },
    //编辑按钮组
    editBtn(item) {
			console.log(item);
			this.formItem =  {
				id: item.id,
				address: item.address,
				name: item.name,
				tel: item.tel,
				is_default: item.is_default,
			},
      this.addVisible = true;
    },
    onChange(checked) {
      if (checked) {
        this.tableItem.statue = 1;
      } else {
        this.tableItem.statue = 0;
      }
    },
		pageChange(page) {
      this.current = page;
			this.fetchLists({
				obj: {
					page: this.current,
				},
			});
    },
  },
  computed: {
    ...mapState({
      listsData: state => state.shop.addrsLists,
			FieldsData: state => state.shop.addrsFields,
			pages: state => state.shop.addrsPages,
    })
  },
  mounted() {
		console.log("wc111");
    this.getAddrsLists({
      obj: {
        page: this.current,
      },
    });
  }
};
</script>

<style scoped>
</style>
