<template>
  <a-modal
    title="推广员审核"
    style="top: 20px;"
    :width="800"
    v-model="visible"
    @ok="handleOk"
    @cancel="handleCancel"
  >
    <a-form
      :form="menuForm"
    >
<!--      <a-form-item-->
<!--        label="推广员名称"-->
<!--        :label-col="labelCol"-->
<!--        :wrapper-col="wrapperCol"-->
<!--        :required="true"-->
<!--      >-->
<!--        {{formParams.real_name}}-->
<!--      </a-form-item>-->
      <a-form-item
        label="推广员手机号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        {{formParams.mobile}}
      </a-form-item>
<!--      <a-form-item-->
<!--        label="推广员身份证号"-->
<!--        :label-col="labelCol"-->
<!--        :wrapper-col="wrapperCol"-->
<!--        :required="true"-->
<!--      >-->
<!--        {{formParams.verified_info.card || identityEncryption}}-->
<!--      </a-form-item>-->
<!--      <a-form-item-->
<!--        label="签约合同"-->
<!--        :label-col="labelCol"-->
<!--        :wrapper-col="wrapperCol"-->
<!--        :required="true"-->
<!--      >-->
<!--        <a :href="formParams.verified_info.url" target="_blank">合同查看</a>-->
<!--      </a-form-item>-->
<!--      <div  v-if="formParams.register_type=='pt'">-->
<!--        <a-form-item-->
<!--          label="推荐人手机号"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.partner_mobile}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="店铺名称"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.shop_name}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="店铺地址"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.address}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="身份证正面"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          <img width="300px" :src="formParams.photo.p" alt="">-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="身份证反面"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          <img width="300px" :src="formParams.photo.o" alt="">-->
<!--        </a-form-item>-->
<!--      </div>-->
<!--      <div v-else-if="formParams.register_type=='dt'">-->
<!--        <a-form-item-->
<!--          label="分销商手机号"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.partner_mobile}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="店铺名称"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.shop_name}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="店铺地址"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.address}}-->
<!--        </a-form-item>-->
<!--      </div>-->
<!--      <div v-else>-->
<!--        <a-form-item-->
<!--          label="部门"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          <div v-if="type">-->
<!--            {{formParams.department_name}}-->
<!--          </div>-->
<!--          <div v-else>-->
<!--            <a-select v-model="formParams.department_id" style="width: 250px">-->
<!--              <a-select-option v-for="(item,index) in listData" :value="item.id">{{item.name}}</a-select-option>-->
<!--            </a-select>-->
<!--          </div>-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="推广员工号"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          {{formParams.job_number}}-->
<!--        </a-form-item>-->
<!--        <a-form-item-->
<!--          label="工牌"-->
<!--          :label-col="labelCol"-->
<!--          :wrapper-col="wrapperCol"-->
<!--          :required="true"-->
<!--        >-->
<!--          <img width="300px" :src="formParams.department" alt="">-->
<!--        </a-form-item>-->
<!--      </div>-->
      <a-form-item
        label="审核操作"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
        v-if="type"
      >
        <a-radio-group v-model="saveData.apply_status" name="radioGroup" >
          <a-radio value="success">同意</a-radio>
          <a-radio value="fail">拒绝</a-radio>
        </a-radio-group>
        <div v-if="saveData.apply_status==='fail'">
          <a-textarea v-model="saveData.fail_reason" placeholder="请输入拒绝理由" :rows="4" />
        </div>
      </a-form-item>
    </a-form>
  </a-modal>
</template>

<script>
  import { mapState, mapActions } from 'vuex';
  export default {
    computed: {
      ...mapState({
        // listData: state => state.member.DepLists,
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
      type:Boolean
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
          apply_status:'success',
          user_id:'',
          fail_reason:'',
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
    filters: {
      identityEncryption(card) {
        return card.replace(/^(.{6})(?:\d+)(.{4})$/, '$1****$2');
      },
    },
    methods: {
      ...mapActions({
        create: 'generalize/create',
        setDepartment: 'generalize/setDepartment',
        // depLists: 'member/depLists',
      }),
      handleOk(){
        this.saveData.user_id = this.formParams.user_id
        if(this.type){
          this.create({formItem:this.saveData,callback:this.callback})
        }else{
          // this.visible = false
         // const params = {
         //   department_id:this.formParams.department_id,
         //   id:this.formParams.id
         // }
         // this.setDepartment({formItem:params,callback:this.callback})
          this.handleCancel()
        }
      },
      callback(){
        this.$emit('on-getLists')
        this.handleCancel()
      },
      handleCancel(){
        this.$emit('on-change', this.visible);
      }
    },
    mounted() {
      // this.depLists({per_page:100000})
    },
  };
</script>

<style scoped>

</style>
