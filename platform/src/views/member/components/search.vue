<template>
  <div>
    <a-form layout="inline">
      <a-row>
        <a-col :md="24" :xs="24" class="mt20">
          <div class="flex-box">
            <a-form-item
              label="审核状态选择"
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-radio-group name="radioGroup" v-model="status">
                <a-radio value="">全部</a-radio>
                <a-radio value="0">待处理</a-radio>
                <a-radio value="1">已通过</a-radio>
                <a-radio value="2">未通过</a-radio>
              </a-radio-group>
            </a-form-item>
            <a-form-item
              :label-col="formItemLayout.labelCol"
              :wrapper-col="formItemLayout.wrapperCol"
            >
              <a-button @click="subSearch"  type="primary" class="mr15">查询</a-button>
            </a-form-item>
          </div>

        </a-col>
      </a-row>
    </a-form>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    md: {
      span: 5,
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
    }),
  },
  data() {
    return {
      formItemLayout,
      status: '',
    };
  },
  props: {
  },
  methods: {
    ...mapActions({
    }),
    subSearch() {
      const params = {
        status: this.status,
      };
      this.$emit('on-search', params);
    },
  },
  mounted() {
  },
};
</script>

<style scoped lang="stylus">
.flex-box
  display flex

>>>.ant-form-item
  width 100%
  .ant-form-item-label
    text-align left
</style>
