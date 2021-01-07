<template>
  <div class="content">
   <template v-if="listField&&listField.length>0">
      <a-table :scroll="{ x: 1100,y:700 }" :columns="listField" :dataSource="listData" class="components-table-demo-nested" :pagination="false" :rowKey="row=>row.id">
        <div slot="action" slot-scope="text, item">
          <a-button class="btn-info mr10" size="small" @click="edit(item)">详情</a-button>
          <a-button class="btn-primary" type="primary" size="small" @click="showModal(item)" v-if="item.verify_status !=='审核通过'">去审核</a-button>
        </div>
      </a-table>

    <div class="pageBox">
      <a-pagination
        :total="pages.total"
        :showTotal="total => `共 ${total} 条数据`"
        :defaultPageSize="pages.per_page"
        :defaultCurrent="1"
        @change="pageChange"
      />
    </div>
   </template>
    <a-modal
      title="文章审核"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
      >
        <a-form-item
          label="文章标题"
          :label-col="{ md:4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <p>{{currentArticle.title}}</p>
        </a-form-item>
        <a-form-item
          label="审核状态"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24}"
        >
          <a-radio-group v-model="status" name="radioGroup">
            <a-radio :value="1">通过</a-radio>
            <a-radio :value="2">不通过</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label="备注"
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 12,xs:24}"
        >
          <a-textarea
            placeholder="审核备注"
            :rows="4"
            v-model="remark"
          />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.article.dataList,
      listField: state => state.article.dataField,
      pages: state => state.article.dataPages,
    }),
  },
  data() {
    return {
      currentArticle: {
        id: '',
        title: '',
      },
      status: 1,
      remark: '',
      visible: false,
      formItem: {
        page: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      getDateList: 'article/getDateList',
      verifyItem: 'article/verifyArticleItem',
    }),
    showModal(item) {
      this.visible = true;
      this.currentArticle.id = item.id;
      this.currentArticle.title = item.title;
    },
    handleOk() {
      this.verifyItem({
        id: this.currentArticle.id,
        status: this.status,
        remark: this.remark,
      });
    },
    handleCancel() {
      this.currentArticle.id = '';
      this.currentArticle.title = '';
      this.remark = '';
      this.status = '';
      this.visible = false;
    },
    verify(item) {
      this.verifyItem(item.id);
    },
    pageChange(page) {
      this.formItem.page = page;
      this.getLists({ formItem: this.formItem });
    },
    // 编辑
    edit(item) {
      const goLink = `/article/editArticle?articleId=${item.id}`;
      this.$router.push({
        path: goLink,
      });
    },
  },
  mounted() {
    this.getDateList();
  },
};
</script>

<style scoped lang="stylus">
  .list-nav
    display flex
    justify-content space-between
    flex-wrap wrap
</style>
