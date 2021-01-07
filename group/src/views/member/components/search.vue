<template>
  <div>
    <a-form layout="inline">
      <a-row style="margin-bottom:10px">
        <a-col :md="8" :xs="24">
          <a-form-item
            label="默认项目"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="default_gm_name" placeholder="请选择项目" allowClear>
              <a-select-option v-for="(item) in gmlistData" :value="item.gm_id">{{item.platform_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="所在项目"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select mode="multiple" placeholder="" :value="gm_ids" allowClear @change="changeGm">
              <a-select-option v-for="(item) in gmlistData" :value="item.gm_id" >{{item.platform_name}}</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
        <a-col :md="8" :xs="24">
          <a-form-item
            label="性别"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select v-model="sex" placeholder="请选择性别" allowClear>
              <a-select-option  :value="1">男</a-select-option>
              <a-select-option  :value="0">女</a-select-option>
            </a-select>
          </a-form-item>
        </a-col>
      </a-row>
      <a-row>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="关键字搜索"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-select  style="width: 120px" v-model="selectVal">
              <a-select-option value="account">会员账号搜索</a-select-option>
              <a-select-option value="mobile">手机号搜索</a-select-option>
            </a-select>
            <a-input style="width:200px" placeholder="请输入关键字" v-model="keyword" allowClear></a-input>
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24">
          <a-form-item
            label="创建时间"
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-range-picker
              v-model="createdTime"
              :show-time="{ format: 'HH:mm' }"
              format="YYYY-MM-DD HH:mm"
              :placeholder="['开始时间', '完成时间']"
              @change="timeChange"
              allowClear
            />
          </a-form-item>
        </a-col>
        <a-col :md="12" :xs="24" class="mt20">
          <a-form-item
            :label-col="formItemLayout.labelCol"
            :wrapper-col="formItemLayout.wrapperCol"
          >
            <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
            <a-button @click="resetSearch" class="ml10">重置</a-button>
          </a-form-item>
        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    md: {
      span: 6,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    md: {
      span: 16,
    },
  },
};
export default {
  computed: {
    ...mapState({
      listData: state => state.shop.lists,
      gmlistData: state => state.project.lists,
      classTree: state => state.goods.classTree,
    }),
  },
  data() {
    return {
      formItemLayout,
      selectVal: 'account',
      user_register_platform: [],
      keyword: '',
      createdTime: '',
      created_start: '',
      created_end: '',
      default_gm_name: '',
      sex: '',
      gm_ids: [],
      shopParams: {
        per_page: 1000000,
        is_open: 1,
      },
    };
  },
  methods: {
    ...mapActions({
      // fetchLists: 'shop/fetchLists',
      gmfetchLists: 'project/fetchLists',
      getClassTree: 'goods/getClassTree',
    }),
    changeGm(value) {
      this.gm_ids = value
      this.user_register_platform = value.join(',');
    },
    resetSearch() {
      this.selectVal = 'account';
      this.keyword = '';
      this.created_start = '';
      this.created_end = '';
      this.default_gm_name = '';
      this.sex = '';
      this.user_register_platform = '';
      this.gm_ids = [];
      this.createdTime = '';
    },
    timeChange(a, b) {
      if (b[0] === '') {
        this.created_start = '';
        this.created_end = '';
      } else {
        this.created_start = `${b[0]}`;
        this.created_end = `${b[1]}`;
      }
    },
    subSearch() {
      const params = {};
      params[this.selectVal] = this.keyword;
      params.created_start = this.created_start;
      params.created_end = this.created_end;
      params.default_gm_name = this.default_gm_name;
      params.user_register_platform = this.user_register_platform;
      params.sex = this.sex;
      console.log(params);
      this.$emit('on-search', params);
    },
  },
  mounted() {
    this.gmfetchLists(this.shopParams);
  },
};
</script>

<style scoped lang="stylus">
>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
