<template>
  <div class="content">
		<div class="modal">
		  <a-modal title="添加自提地址" width="46rem"
				:visible="addVisible" @ok="addHandleOk" 
				:confirmLoading="confirmLoading" @cancel="handleCancel">
				<h3 class="mb20 ml10" style="color: #808080;">商品自提地址 :</h3>
				<a-input class="mb10" placeholder="请输入自提地址" v-model="address" ref="addressInput">
					<a-icon slot="prefix" type="form" />
					<a-icon v-if="address" slot="suffix" type="close-circle" @click="addEmitEmpty" />
				</a-input>
		  </a-modal>
			
			<a-modal title="温馨提示" width="46rem" v-model="delVisible" @ok="delHandleOk">
				<h2 class="mt10 mb10" style="color:#888888;text-align: center;">{{tipslText}}</h2>
			</a-modal>
			
			<a-modal title="编辑自提地址" width="46rem"
				:maskClosable="false"
				:visible="editVisible" @ok="editHandleOk" 
				:confirmLoading="confirmLoading" @cancel="handleCancel">
				<h3 class="mt10 mb20 ml10" style="color: #808080;">新的商品自提地址 :</h3>
				<a-input class="mb10" placeholder="请输入新的商品自提地址" v-model="itemaddress" ref="editInput">
					<a-icon slot="prefix" type="form" />
					<a-icon v-if="itemaddress" slot="suffix" type="close-circle" @click="editEmitEmpty" />
				</a-input>
				<div class="mt10 ml10" style="color: #808080;">
					是否可用：
					<a-switch class="mr10" checkedChildren="开" unCheckedChildren="关" :defaultChecked="tableItem.statue ? true : false "
					 :key="tableItem.id" @change="onChange" />
				</div>
			</a-modal>
		</div>
		
		<div class="mr10 mb20">
			<a-button type="primary" class="mr10" @click="addZitiBtn" >
				<a-icon type="plus" />添加自提地址
			</a-button>
			<a-button type="danger" class="mr10" @click="delZitiBtn">
				<a-icon type="close" />删除自提地址
			</a-button>
		</div>
    <a-table :scroll="{x:1100,y:700}" class="mr10" 
			:columns="FieldsData" :dataSource="listsData" 
			:rowSelection="rowSelection">
			<div slot="action" slot-scope="text, item">
				<a-button class="mr10" @click="editBtn(item)" :key="item.id" size="small" type="primary">
				  编辑
				</a-button>
			  <!-- <a class="mr10" @click="editBtn(item)">编辑</a> -->
			</div>
    </a-table>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
let itemIds = []
const rowSelection = {
	onChange: (selectedRowKeys, selectedRows) => {
		console.log(selectedRows);
		if (!selectedRows.length == 0) {
			itemIds = []
			selectedRows.forEach(function(item, i){
				itemIds.push(item.id)
			})
		}else{
			itemIds = []
		}
	},
};
export default {
  name: 'receive',
  data() {
    return {
			rowSelection,
      confirmLoading: false,
			addVisible: false,
			delVisible: false,
			editChecked: null,
			editVisible: false,
			address:'',
			itemaddress:'',
			tipslText:'',
			tableItem: {}
    };
  },
  methods: {
    ...mapActions({
      getZitiLists: 'goods/getZitiLists',
			addZiti: 'goods/addZiti',
			delZiti: 'goods/delZiti',
			editZiti: 'goods/editZiti',
    }),
    handleCancel(e) {
      this.addVisible = false
			this.delVisible = false
			this.editVisible = false
    },
		//添加按钮组
		addZitiBtn(){
			this.addVisible = true
		},
		addHandleOk(e) {
      this.confirmLoading = true;
			let address = this.address
			let obj = {
				address:address
			}
			this.addZiti( {obj} )
      setTimeout(() => {
				this.getZitiLists();
				this.address = ''
        this.addVisible = false;
        this.confirmLoading = false;
      }, 1000);
    },
		addEmitEmpty () {
      this.$refs.addressInput.focus()
      this.address = ''
    },
		
		//删除按钮组
		delZitiBtn(){
			if(itemIds.length == 0){
				this.delVisible = true
				this.tipslText = "亲，请先勾选要删除的地址!"
			}else{
				this.delVisible = true
				this.tipslText = "亲，你确定要删除这些地址吗？不能恢复的哦！"
			}
		},
		delHandleOk(){
			let delId = {
				id: itemIds
			}
			this.delZiti({
				delId
			})
			this.delVisible = false
		},
		
		//编辑按钮组
		editBtn(item) {
			let itemObj = {
				id: item.id,
				address: item.address,
				statue: item.statue,
			}
			this.tableItem = itemObj
			this.editVisible = true
		},
		onChange(checked){
			if(checked){
				this.tableItem.statue = 1
			}else{
				this.tableItem.statue = 0
			}
		},
		editHandleOk(e) {
		  this.confirmLoading = true;
			this.tableItem.address = this.itemaddress
			let editObj = this.tableItem
			this.editZiti( {editObj} )
		  setTimeout(() => {
				this.getZitiLists();
				this.itemaddress = ''
		    this.editVisible = false;
		    this.confirmLoading = false;
		  }, 1000);
		},
		editEmitEmpty () {
		  this.$refs.editInput.focus()
		  this.itemaddress = ''
		},
  },
  computed: {
    ...mapState({
      listsData: state => state.goods.zitiLists,
			FieldsData: state => state.goods.zitiFields, 
    }),
  },
	mounted() {
	  this.getZitiLists();
		
	},
};
</script>

<style scoped>

</style>
