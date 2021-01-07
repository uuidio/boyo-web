<template>
  <div class="content">
    <a-form
      :model="formItem"
    >
      <a-form-item
        label="店铺名称"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-input :disabled="id!==0" v-model="formItem.shop_name" placeholder="请输入店铺名称"/>
      </a-form-item>
      <a-form-item
        label="商家账号"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <!--<a-input v-model="formItem.seller_name" placeholder="请输入店铺账号"/>-->
        <a-select :disabled="id!==0" placeholder="请输入店铺账号" v-model="formItem.seller_name">
          <a-select-option :value="item.username" v-for="(item,index) in accountList" :key="index">{{item.username}}</a-select-option>
        </a-select>
        <p><span class="col-red">*</span>商家账号指商家自己注册或者平台添加的商家账号</p>
      </a-form-item>
      <a-form-item
        label="店铺场地类型"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-radio-group :disabled="id!==0" name="radioGroup" v-model="formItem.internal">
          <a-radio :value="0">外场</a-radio>
          <a-radio :value="1">内场</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="选择店铺类型"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
      >
        <a-radio-group :disabled="id!==0" name="radioGroup" v-model="formItem.shop_type">
          <a-radio value="flag">旗舰店</a-radio>
          <a-radio value="self">自营店</a-radio>
          <a-radio value="brand">品牌店</a-radio>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="选择店铺楼层"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 7,xs:24}"
        :required="true"
        v-if="formItem.internal===1"
      >
        <a-select placeholder="选择店铺楼层" v-model="formItem.floors_id">
          <a-select-option :value="item.id" v-for="(item,index) in listData" :key="index">{{item.name}}</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item
        label="选择商场分类"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 20,xs:24}"
        :required="true"
        v-if="formItem.internal===1"
      >
        <a-cascader style="width:345px" v-model="selectClass" :allowClear="true" @change="classChange" :options="option"
                    placeholder="选择分类"/>
        <div class="col-666">*品牌分类可多选</div>
        <div v-if="formItem.rel_cat_id_data.length > 0" class="fxBox1">已选分类：
          <div v-for="(item,index) in formItem.rel_cat_id_data" :key="index" class="mr10 btns" size="small">{{item.one.label}}/{{item.two.label}}
            <a-icon class="closeItem" @click="del(index)" type="close" />
          </div>
          <a @click="delAll">删除全部</a>
        </div>
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
// import UploadImage from '@C/upload/UploadImage';
import {mapState, mapActions } from 'vuex';

export default {
  components: {
    // UploadImage,
  },
  computed: {
    ...mapState({
      listData: state => state.floor.lists,
      option: state => state.marketClass.optionTree,
      accountList: state => state.shop.accountlists,
      detail: state => state.shop.detail,
    }),
  },
  data() {
    return {
      // imageList: [],
      // imageList2: [],
      brand_id:'',
      shopType:1,
      selectClass:[],
      id:0,
      formItem: {
        shop_name: '',
        seller_name: '',
        shop_type:'flag',
        floors_id:'',
        rel_cat_id:[],
        rel_cat_id_data:[],
        internal:0
      },
      selectItem:[]
    };
  },
  methods: {
    ...mapActions({
      addShop: 'shop/addShop',
      fetchLists: 'floor/fetchLists',
      treeLists: 'marketClass/getTree',
      accountLists: 'shop/accountLists',
      getDetail: 'shop/getDetail',
      editShop: 'shop/editShop',
    }),
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
      if(this.formItem.shop_type!=='brand'){
        this.formItem.brand_id = ''
      }
     if(this.id===0){
       this.addShop({
         formItem: this.formItem,
       });
     }else{
       this.editShop({
         formItem: this.formItem,
       })
     }
    },
  },
  mounted() {
    this.fetchLists({xx:1})
    this.treeLists({xx:1123})
    this.accountLists({
      obj: {
        per_page: 100000,
      },
    })
    if(this.$route.params.id){
      this.getDetail({id:this.$route.params.id})
    }
  },
  watch:{
    detail(){
      this.init()
      console.log(this.detail)
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
