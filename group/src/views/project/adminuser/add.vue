<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="平台账号"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input  v-model="formItem.username" placeholder="请输入平台账号"/>
      </a-form-item>
      <a-form-item
        label="密码"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
       <a-input  v-model="formItem.password" placeholder="请输入密码"/>
      </a-form-item>
      <a-form-item
        label="确认密码"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
       <a-input  v-model="formItem.password_confirmation" placeholder="请确认密码"/>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button @click="submitShop" type="primary">提交</a-button>
        <a-button class="ml10" @click="$router.back(-1)" type="danger">返回</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script>
import {mapState, mapActions } from 'vuex';
import fetch from '@/api/fetch';
import Server from '@/config/server';
import helper from '@/utils/helper';
export default {
  components: {
    // UploadImage,
  },
  data() {
    return {
      id:0,
      formItem: {
        username: '',
        password: '',
        password_confirmation:'',
      },
    };
  },
  methods: {
    delAll(){
      this.formItem.rel_cat_id = [];
      this.$set(this.formItem,'rel_cat_id_data',[])
    },
    init(){
      this.id = this.detail.id
      this.formItem = {
        id:this.detail.id,
        shop_name:this.detail.shop_name,
        seller_name: this.detail.seller_name,
        shop_type:this.detail.shop_type,
        floors_id:this.detail.floors_id,
        rel_cat_id:this.detail.rel_cat_id,
        internal:this.detail.internal,
      }
      if(this.detail.rel_cat_id_data){
        this.$set(this.formItem,'rel_cat_id_data',JSON.parse(this.detail.rel_cat_id_data))
      }else{
        this.$set(this.formItem,'rel_cat_id_data',[])
      }
    },
    del(index){
      this.formItem.rel_cat_id_data.splice(index,1)
      this.formItem.rel_cat_id.splice(index,1)
    },
    classChange(e,item){
      if(e.length==2 && this.formItem.rel_cat_id.indexOf(e[1])===-1){
        this.formItem.rel_cat_id.push(e[1])
        this.formItem.rel_cat_id_data.push({
          one:item[0],
          two:item[1]
        })
        this.selectClass = []
      }
    },
    submitShop() {
     if(this.id===0){
        fetch.post(Server.action.adminuserAdd,this.formItem)
        .then((resData) => {
          console.log(resData);
          if (resData.data.code === 0) { 
            helper.showSuccess(resData.data.message);
          }else{
            helper.showError(resData.data.message);
          }
        });

     }else{
        fetch.get(Server.action.adminuserEdit,this.formItem)
        .then((resData) => {
          console.log(resData);
          if (resData.data.code === 0) { 
            helper.showSuccess(resData.data.message);
          }else{
            helper.showError(resData.data.message);
          }
        });
     }
    },
  },
  mounted() {
    console.log(this.$route);
   if(this.$route.params.id){
      this.id=this.$route.params.id
   }
  }
  
};
</script>

<style scoped lang="stylus">
.btns
  padding 0px 6px
  border-radius 4px
  border 1px solid #e7e7e7
  line-height 24px
  .closeItem
    cursor pointer
</style>
