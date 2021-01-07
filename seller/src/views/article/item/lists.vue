<template>
  <div class="content">
		<div class="mb20">
			<!-- 目前做到添加文章弹窗 -->
			<a-button type="primary" class="mr10" icon="plus" @click="addarticleBtn">
				添加文章
			</a-button>
			<a-button type="danger" class="mr10 " icon="close" @click="delrticleBtn">
				删除文章
			</a-button>
		</div>
		<template v-if="listField&&listField.length>0">
			<a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :rowSelection="rowSelection" :pagination="false">
				<div slot="action" slot-scope="text,record">
					<a href="javascript:;" @click="edit(record)">操作</a>
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
			title="添加文章"
			:visible="addVisible"
			@ok="addOk"
			@cancel="addCancel"
		>
			<a-form layout='vertical'>
			<a-form-item label='标题:' required>
				<a-input placeholder="请输入文章标题" v-model="formItem.title"/>
			</a-form-item>
			<a-form-item label='主图:' required>
				<UploadImage :defaultImageList="imageLists"  :maximum="1" ref="uploadThumbImage"></UploadImage>
				<p class="setting_p">尺寸标准：290*84或者290*290 px</p>
			</a-form-item>
			<a-form-item label='分类id:'>
				<a-input placeholder="请输入分类id" v-model="formItem.cat_id"/>
			</a-form-item>
			<a-form-item label='排序:'>
				<a-input placeholder="请输入排序" v-model="formItem.listorder"/>
			</a-form-item>
			<a-form-item label='内容:'>
				<a-textarea placeholder="请输入内容" :rows="4" v-model="formItem.content" />
			</a-form-item>
			<a-form-item :label-col="{ md: 4,xs:24 }"
	  :wrapper-col="{ md: 4,xs:24 }" label='是否隐藏:'>
				<a-switch @change="switchBtn" checkedChildren="显示" unCheckedChildren="隐藏" defaultChecked/>
			</a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

const rowSelection = {
  onChange: (selectedRowKeys, selectedRows) => {
    console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
  },
  onSelect: (record, selected, selectedRows) => {
    console.log(record, selected, selectedRows);
  },
  onSelectAll: (selected, selectedRows, changeRows) => {
    console.log(selected, selectedRows, changeRows);
  },
};

export default {
  name: 'articleLists',
	components: {
	  UploadImage,
	},
  data() {
    return {
		UploadImage,
		rowSelection,
		status: 0,
		current: 1,
		addVisible: false, 
		imageLists: [],
		formItem: {
			title: '',
			article_url: '',
			cat_id: '',
			listorder: 0,
			content: '',
			is_show: 1,
		},
    };
  },
  methods: {
    ...mapActions({
      articleLists: 'article/articleLists',
			addArticle: 'article/addArticle',
    }),
		edit(item){
			console.log(item);
		},
    pageChange(page) {
      this.current = page;
      const status = this.status;
      if (this.status === 0) {
        this.articleLists({
          page: this.current,
        });
      } else {
        this.articleLists({
          status,
          page: this.current,
        });
      }
    },
    orderSearch(value) {
//         this.fetchLists({
//           tid: value,
//           page: 1,
//         });
    },
		addOk(){
			const uploadThumbImage = this.$refs.uploadThumbImage.uploadImageList;
			if (uploadThumbImage.length === 1) {
			  this.formItem.article_url = uploadThumbImage[0].url;
			}	
			// this.formItem.cat_id
			this.addVisible = false
			console.log(this.formItem);
			// this.addArticle({})
		},
		addCancel(){
			this.addVisible = false
		},
		addarticleBtn(){
			this.addVisible = true
		},
		initDetail() {
		  if (this.detail.article_url !== null) {
		    this.imageList = [{ url: this.detail.article_url, status: 'finished' }];
		  }
		  this.formItem = {
		    title: this.detail.title,
		    article_url: this.detail.article_url,
		    cat_id: this.detail.cat_id,
		    listorder: this.detail.listorder,
		    content: this.detail.content,
				is_show: this.detail.is_show
		  };
		},
		//显示隐藏开关
		switchBtn(checked){
			let checkedBool = null
			if(checked){
				checkedBool = 1
			}else {
				checkedBool = 0
			}
			this.formItem.is_show = checkedBool
		},
		delrticleBtn(){
			
		},
  },
  mounted () {
		this.articleLists({
			page: 1,
		})
  },
  computed: {
    ...mapState({
      listData: state => state.article.articleLists,
      pages: state => state.article.pages,
      listField: state => state.article.articleField,
    }),
  },
	watch: {
	  detail() {
	    this.initDetail();
	  },
	},
};
</script>

<style scoped lang="stylus">

</style>
