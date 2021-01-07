<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="商场分类名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.cat_name">
        </a-input>
      </a-form-item>
      <a-form-item
        label="商场分类父ID"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-select v-model="formItem.parent_id" defaultValue="0">
          <a-select-option class="option-first" :value="0">一级商场分类</a-select-option>
          <a-select-option v-for="item in lists" v-if="item.level < 2 &&item.cat_name!==formItem.cat_name" :value="item.id">{{item.cat_name}}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="是否隐藏"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-radio-group v-model="formItem.is_show" name="radioGroup" :defaultValue="0">
          <a-radio :value="0">显示</a-radio>
          <a-radio :value="1">隐藏</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="商场分类排序"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input v-model="formItem.order" placeholder="分类排序"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitClass" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import UploadImage from '@C/upload/UploadImage';

export default {
  name: 'add',
  computed: {
    ...mapState({
      lists: state => state.marketClass.lists,
      detail: state => state.marketClass.detail,
    }),
  },
  components: {
    UploadImage,
  },
  methods: {
    ...mapActions({
      fetchLists: 'marketClass/fetchLists',
      add: 'marketClass/add',
      getDetail: 'marketClass/getDetail',
      edit: 'marketClass/edit',
    }),
    submitClass() {
      if (this.id === 0) {
        this.add({
          formItem: this.formItem,
        });
      } else {
        const postData = Object.assign(this.formItem, { id: this.id });
        this.edit({ postData });
      }
    },
    initDetail() {
      this.formItem = {
        cat_name: this.detail.cat_name,
        parent_id: this.detail.parent_id,
        order: this.detail.order,
        is_show: this.detail.is_show,
      };
    },
  },
  data() {
    return {
      id: 0,
      formItem: {
        cat_name: '',
        parent_id: 0,
        order: 0,
        is_show: 0,
      },
    };
  },
  mounted() {
    this.fetchLists();
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getDetail({ id: this.id });
    }
  },
  watch: {
    detail() {
      this.initDetail();
    },
  },
};
</script>

<style scoped lang="stylus">
  >>> .ant-select-dropdown-menu-item-selected
    font-weight normal

  >>> .option-first
    color #2d8cf0
</style>
