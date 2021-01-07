<template>
  <a-modal
    title="提现审核"
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
        label="提现金额"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        {{formParams.amount}}
      </a-form-item>
      <a-form-item
        label="提现手续费"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        {{formParams.hand_fee}}
      </a-form-item>
      <a-form-item
        label="实际到账金额"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        {{formParams.real_amount}}
      </a-form-item>
      <a-form-item
        label="审核操作"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-radio-group v-model="saveData.status" name="radioGroup" >
          <a-radio value="VERIFIED">同意</a-radio>
          <a-radio value="DENIED">拒绝</a-radio>
        </a-radio-group>
        <!--<div v-if="saveData.apply_status==='fail'">-->
          <!--<a-textarea v-model="saveData.fail_reason" placeholder="请输入拒绝理由" :rows="4" />-->
        <!--</div>-->
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
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
    watch:{
      addVisible(v) {
        this.visible = v;
      },
    },
    data() {
      return {
        menuForm: this.$form.createForm(this),
        saveData:{
          status:'VERIFIED',
          id:'',
        },
        labelCol: {
          xs: { span: 24 },
          sm: { span: 5 },
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 },
        },
        visible:false
      };
    },
    methods: {
      ...mapActions({
        create: 'generalize/createDep',
      }),
      handleOk(){
        this.saveData.id = this.formParams.id
        this.create({formItem:this.saveData,callback:this.reload})
      },
      handleCancel(){
        this.$emit('on-change', this.visible);
      }
    },
    mounted() {
    },
  };
</script>

<style scoped>

</style>
