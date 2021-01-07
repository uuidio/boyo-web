<template>
  <a-modal
    title="添加奖品"
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
        label="奖品名称"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input placeholder="奖品名称" v-model="formParams.goods_name"/>
      </a-form-item>
      <a-form-item
        label="奖品主图"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <UploadImage  v-if="visible" :defaultImageList="imageLists"  :maximum="1" ref="uploadImageLists"></UploadImage>
      </a-form-item>
      <a-form-item
        label="奖品货号"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
        :required="true"
      >
        <a-input placeholder="奖品货号"  v-model="formParams.goods_serial"/>
      </a-form-item>

      <a-form-item
        label="商品信息"
        :label-col="labelCol"
        :wrapper-col="wrapperCol"
      >
        <Ueditor  ref="editor" editor_id="editor" v-model="formParams.goods_info">
        </Ueditor>
      </a-form-item>
    </a-form>
  </a-modal>
</template>
<script>
  import UploadImage from '@C/upload/UploadImage';
  import Ueditor from '@C/ueditor/ueditor';
  import {
    mapState,
    mapActions,
  } from 'vuex';
  export default {
    components:{
      UploadImage,
      Ueditor
    },
    computed: {
      ...mapState({
        helpLists: state => state.help.lists,
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
        imageLists:[],
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
    },
    methods: {
      ...mapActions({
        create: 'reward/create',
        update: 'reward/update',
        fetchLists:'help/fetchLists',
      }),
      handleOk() {
        this.formParams.goods_info = this.$refs.editor.tmpContent
        const imgs = this.$refs.uploadImageLists.uploadImageList;
        if(imgs.length>0){
          this.formParams.goods_image = imgs[0].url
        }
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
        this.create({formItem:this.formParams,callback:this.reload})
      },
      toUpdate() {
        this.update({formItem:this.formParams,callback:this.reload})
      },
    },
    watch: {
      addVisible(v) {
        this.visible = v;
      },
      formParams(val){
        if(this.formParams.goods_image){
          this.imageLists = [{
            url:this.formParams.goods_image,
            status: 'finished'
          }]
        }else{
          this.imageLists = [ ]
        }
        console.log(this.formParams)
      }
    },
  };
</script>
<style scoped>
</style>
