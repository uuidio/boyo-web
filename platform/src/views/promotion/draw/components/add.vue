<template>
  <a-modal
    title="添加抽奖活动"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="menuForm"
    >
      <a-form-item
        label="抽奖活动名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input placeholder="抽奖活动名称" v-model="formParams.name"/>
      </a-form-item>
      <a-form-item
        label="活动类型"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group  v-model="formParams.use_type">
          <a-radio :value="0">线上</a-radio>
          <a-radio :value="1">线下多转盘</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="每人每天抽奖次数"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input type="number" placeholder="每人每天抽奖次数" v-model="formParams.luck_draw_num"/>
      </a-form-item>
      <a-form-item
        label="抽奖扣减积分数"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input type="number" placeholder="抽奖扣减积分数" v-model="formParams.integral"/>
      </a-form-item>
      <a-form-item
        :required="true"
        label="活动时间"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <a-range-picker
          showTime
          :value="formParams.valid_start_at ? [moment(formParams.valid_start_at, 'YYYY-MM-DD HH:mm:ss'), moment(formParams.valid_end_at, 'YYYY-MM-DD HH:mm:ss')] : []"
          format="YYYY-MM-DD HH:mm:ss"
          @change="timeChange"
        />
      </a-form-item>


      <a-form-item
        label="活动启用状态"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group  v-model="formParams.status">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="0">不启用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="会员等级限制"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group  v-model="formParams.is_grade_limit">
          <a-radio :value="1">启用</a-radio>
          <a-radio :value="0">不启用</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        v-if="formParams.is_grade_limit === 1"
        label="会员等级限制"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-select
          mode="multiple"
          :defaultValue="formParams.grade_limit"
          style="width: 100%"
          @change="handleChange"
          placeholder="请选择会员等级"
        >
          <a-select-option v-for="item in listData" :key="item.card_code">{{
            item.card_name
            }}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="抽奖活动说明"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <Ueditor  ref="editor" editor_id="editor" v-model="formParams.desc">
        </Ueditor>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import {
    mapState,
    mapActions,
  } from 'vuex';
  import Ueditor from '@C/ueditor/ueditor';
  import moment from 'moment';

  export default {
    components:{
      Ueditor
    },
    computed: {
      ...mapState({
        listData: state => state.member.lists,
      }),
    },
    inject: ['reload'],
    props: {
      addVisible: {
        type: Boolean,
        default: false,
      },
      formParams: {
        type: Object,
        default: {},
      },
    },
    data() {
      return {
        menuForm: this.$form.createForm(this),
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        visible: false,
      };
    },
    mounted() {
      this.fetchLists();
    },
    methods: {
      ...mapActions({
        createLottery: 'draw/createLottery',
        updateLottery: 'draw/updateLottery',
        fetchLists: 'member/fetchCardLists',
      }),
      handleChange(value) {
        this.formParams.grade_limit = value;
      },
      moment,
      timeChange(dates, dateStrings) {
        this.formParams.valid_start_at = dateStrings[0];
        this.formParams.valid_end_at = dateStrings[1];
      },
      handleOk() {
        this.formParams.desc = this.$refs.editor.tmpContent
        if (this.formParams.id === undefined) {
          this.toCreate();
        }
        if (this.formParams.id > 0) {
          this.toUpdate();
        }
      },
      handleCancel() {
        this.$emit('on-change', this.visible);
      },
      toCreate() {
        this.createLottery({formItem:this.formParams,callback:this.reload})
      },
      toUpdate() {
        this.updateLottery({formItem:this.formParams,callback:this.reload})
      },
    },
    watch: {
      addVisible(v) {
        this.visible = v;
      },
    },
  };
</script>
<style scoped>
</style>
