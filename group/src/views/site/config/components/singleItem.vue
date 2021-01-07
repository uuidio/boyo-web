<template>
  <div class="content single-item">
    <a-modal :visible="visible" @ok="handleOk" @cancel="handCancel">
      <a-form-item label="图片">
        <UploadImage
          :defaultImageList="defaultImage"
          :maximum="max"
          ref="uploadImage"
        ></UploadImage>
      </a-form-item>

      <a-form-item label="数据类型">
        <a-select :value="show_type" style="width:190px" @change="changeSelect">
          <a-select-option
            v-for="(item, index) in selectList"
            :value="item.value"
            :key="item.value"
          >
            {{ item.name }}
          </a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="展示数据" v-if="show_type === 'goods'||show_type === 'shop'||show_type === 'class'">
        <div v-if="show_type === 'goods'">
          已选择商品ID：{{ selectResult.id }}
          <TableSelect
            selectionRef="radio"
            showType="goods"
            :selectionUrl="selectionGoodsUrl"
            @on-select-ok="selected"
          >
            选择商品
          </TableSelect>
        </div>
        <div v-if="show_type === 'shop'">
          已选择店铺ID：{{ selectResult.id||this.selectId }}
          <TableSelect
            :shopId="Number(selectResult.id)"
            selectionRef="radio"
            showType="shop"
            :selectionUrl="selectionShopUrl"
            @on-select-ok="selected"
          >
            选择店铺
          </TableSelect>
        </div>
        <div v-if="show_type==='class'">
          已选择分类ID：{{ selectResult.id ||this.selectId }}
          <div>
            <a-cascader  :options="classTree" @change="classChange" placeholder="请选择分类" />
          </div>
        </div>
      </a-form-item>
    </a-modal>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import UploadImage from "@C/upload/UploadImage";
import TableSelect from "@C/lists/TableSelect";
import { stringify } from "querystring";
import Server from "@/config/server";

export default {
  props: {
    visible: {
      type: Boolean,
      default: false
    },
    max: {
      type: Number,
      default: 1
    },
    defaultImage: {
      type: Array
    },
    selectObj: {
      type: Object
    },
    show_type: {
      type: String
    },
    selectList: {
      type: Array
    },
    selectId: {
      type:[String, Number],
      default:''
    }
  },
  computed: {
    ...mapState({
      classTree: state => state.config.classTree,
    })
  },
  components: {
    UploadImage,
    TableSelect
  },
  data() {
    return {
      selectionGoodsUrl: Server.action.goods_lists,
      selectionShopUrl: Server.action.shop_lists,
      selectResult: {
        image_url: "",
        show_type: "",
        id: "",
        shop_type:'',
      },
      inId: ""
    };
  },
  mounted() {
    this.getClassTree()
  },

  methods: {
    ...mapActions({
      getClassTree: 'config/getClassTree',
    }),
    classChange(item) {
      if (item.length === 3) {
        this.selectResult.id = item[2];
      }
    },
    handleOk() {
      this.selectResult.image_url = this.$refs.uploadImage.uploadImageList[0].url;
      this.selectResult.show_type =
      this.selectResult.show_type || this.show_type;
      if(this.selectResult.show_type==='shop'||this.selectResult.show_type==='goods'||this.selectResult.show_type==='class'){
        this.selectResult.id = this.selectResult.id || this.selectId;
      }else{
        this.selectResult.id = ''
      }
      if(this.selectResult.show_type!=='shop'){
        this.selectResult.shop_type = ''
      }
      console.log(this.selectResult);
      this.$emit("ok", this.selectResult);
    },
    handCancel() {
      this.$emit("cancel");
    },
    changeSelect(value) {
      this.selectResult.show_type = value;
      this.$emit("cgSelect", value);
    },
    selected(selection) {
      this.selectResult.id = selection[0].id;
      if(this.selectResult.show_type=='shop' || this.show_type=='shop'){
         this.selectResult.shop_type =  selection[0].shop_type
      }else{
        this.selectResult.shop_type = ''
      }
    }
  },
};
</script>

<style scoped lang="stylus"></style>
