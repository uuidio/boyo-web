<template>
  <div class="mr24 coupon_show">
    <a-card title="秒杀活动信息">
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          秒杀活动名称：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <p class="coupon_p">{{ detail.activity_name }}</p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          秒杀活动描述：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <p class="coupon_p">{{ detail.activity_desc }}</p>
        </a-col>
      </a-row>
      <!--<a-row type="flex" align="middle">-->
      <!--<a-col :xs="{span:24}" :md="{span:3}" class="add-label">-->
      <!--秒杀报名商品限制数量：-->
      <!--</a-col>-->
      <!--<a-col :xs="{span:24}" :md="{span:6}">-->
      <!--<p class="coupon_p">{{detail.enroll_limit}}个</p>-->
      <!--</a-col>-->
      <!--</a-row>-->
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          活动报名时间：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <p class="coupon_p">
            {{ detail.apply_begin_time }} ~ {{ detail.apply_end_time }}
          </p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          活动生效时间：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <p class="coupon_p">
            {{ detail.start_time }} ~ {{ detail.end_time }}
          </p>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          秒杀活动状态：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
          <p class="coupon_p">{{ detail.validstatus }}</p>
        </a-col>
      </a-row>
    </a-card>
    <a-card title="选择商品">
      <getGoods
        @selectOk="confirmList"
        @selected="goodsSelected"
        linkType="seckill"
        :defaultKeys="defKey"
      >
        <a-button type="primary" size="large" style="width:100%"
          >选择商品</a-button
        >
      </getGoods>
      <ul class="item-lists">
        <li>
          <a-row type="flex" align="middle">
            <a-col
              class="col-item"
              v-for="(item, index) in goods_lists"
              :key="index"
              :xs="24"
              :sm="4"
            >
              <div class="goods-item">
                <div class="imgBox">
                  <img :src="item.goods_image" alt="" />
                </div>
                <div class="goods-info">
                  <p class="line-one-p">商品名称：{{ item.goods_name }}</p>
                  <p>商品原价格：￥{{ item.goods_price }}</p>
                  <p>商品原库存：{{ item.goods_stock }}</p>
                  <p>
                    商品SKU信息：{{
                      item.spec_sign ? item.spec_sign : "无规格"
                    }}
                  </p>
                  <p>
                    秒杀商品标题：<span v-if="item.title === ''" class="col-red"
                      >未填写</span
                    ><span v-else>{{ item.title }}</span>
                  </p>
                  <p>
                    秒杀商品价格：<span
                      v-if="item.seckill_price === ''"
                      class="col-red"
                      >未填写</span
                    ><span v-else>{{ item.seckill_price }}</span>
                  </p>
                  <p>
                    秒杀商品库存：<span
                      v-if="item.seckills_stock === ''"
                      class="col-red"
                      >未填写</span
                    ><span v-else>{{ item.seckills_stock }}</span>
                  </p>
                  <!-- <p>秒杀商品限购：<span v-if="item.stock_limit===''" class="col-red">未填写</span><span v-else>{{item.stock_limit}}</span></p> -->
                  <div><a @click="editGoods(index)">编辑秒杀商品信息</a></div>
                </div>
              </div>
            </a-col>
          </a-row>
        </li>
      </ul>
    </a-card>
    <a-card title="提交设置">
      <a-button @click="handleSubmit" type="primary" :disabled="goods_lists.length === 0" >提交</a-button>
      <a-button class="ml10" type="danger" @click="$router.back(-1)"
        >返回</a-button
      >
    </a-card>
    <a-modal title="编辑秒杀商品信息" v-model="visible" @ok="handleOk">
      <a-form>
        <a-form-item
          label="商品名称"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          {{ goosItem.name }}
        </a-form-item>
        <a-form-item
          label="商品SKU"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          {{ goosItem.spec_sign ? goosItem.spec_sign : "无规格" }}
        </a-form-item>
        <a-form-item
          label="商品原价格"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          ￥{{ goosItem.price }}
        </a-form-item>
        <a-form-item
          label="商品原库存"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          {{ goosItem.goods_stock }}
        </a-form-item>
        <a-form-item
          label="秒杀商品标题"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input style="width:200px" v-model="goosItem.title"></a-input>
        </a-form-item>
        <a-form-item
          label="秒杀商品价格"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input
            style="width:200px"
            v-model="goosItem.seckill_price"
            type="number"
          ></a-input>
        </a-form-item>
        <a-form-item
          label="秒杀商品库存"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 16 }"
        >
          <div>
            <a-input
              style="width:200px"
              v-model="goosItem.seckills_stock"
              type="number"
            ></a-input>
          </div>
          <div>*秒杀库存设置必须小于或等于商品原库存</div>
        </a-form-item>
        <!-- <a-form-item label="秒杀商品限购" :label-col="{ span: 5 }" :wrapper-col="{ span: 12 }">
          <a-input style="width:200px" v-model="goosItem.stock_limit" type="number"></a-input>
        </a-form-item> -->
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import getGoods from "@C/goodsList/goodsList";
export default {
  name: "coupon_show",
  components: {
    getGoods
  },
  computed: {
    ...mapState({
      detail: state => state.seckill.applyDetail,
      resApplyList: state => state.seckill.resApplyList
    })
  },
  data() {
    return {
      isReset: false,
      resetId: null,
      defKey: [""],
      tempList: [],
      id: "",
      goods_lists: [],
      visible: false,
      editIndex: 0,
      goosItem: {
        name: "",
        price: "",
        spec_sign: "",
        title: "",
        seckill_price: "",
        seckills_stock: "",
        stock_limit: ""
      }
    };
  },
  methods: {
    ...mapActions({
      getDetail: "seckill/getApplyDetail",
      seckillApplySave: "seckill/seckillApplySave",
      resApply: "seckill/resApplyEdit",
      getresetDetail: "seckill/getDetail"
    }),
    editGoods(index) {
      this.editIndex = index;
      this.goosItem = {
        name: this.goods_lists[index].goods_name,
        price: this.goods_lists[index].goods_price,
        goods_stock: this.goods_lists[index].goods_stock,
        spec_sign: this.goods_lists[index].spec_sign,
        title: this.goods_lists[index].title,
        seckill_price: this.goods_lists[index].seckill_price,
        seckills_stock: this.goods_lists[index].seckills_stock,
        stock_limit: this.goods_lists[index].stock_limit
      };
      this.visible = true;
    },
    handleOk() {
      if (
        this.goosItem.title === "" ||
        this.goosItem.seckill_price === "" ||
        this.goosItem.seckills_stock === ""
      ) {
        this.$message.warning("请填写完成秒杀商品信息");
        return;
      }
      this.goods_lists[this.editIndex].title = this.goosItem.title;
      this.goods_lists[
        this.editIndex
      ].seckill_price = this.goosItem.seckill_price;
      this.goods_lists[
        this.editIndex
      ].seckills_stock = this.goosItem.seckills_stock;
      this.goods_lists[this.editIndex].stock_limit = this.goosItem.stock_limit;
      this.visible = false;
    },
    confirmList() {
      if (this.tempList.length === 0) {
        return;
      }

      let arr = [];
      this.tempList.map((item, index) => {
        item.seckill_price = item.seckill_price ? item.seckill_price : "";
        item.title = item.title ? item.title : "";
        item.seckills_stock = item.seckills_stock ? item.seckills_stock : "";
        arr.push(item);
      });
      this.goods_lists = arr;
      this.tempList = [];
    },
    goodsSelected(list) {
      this.tempList = list;
    },
    handleSubmit() {
      let allArr = [];
      for (let i = 0; i < this.goods_lists.length; i++) {
        let goods = this.goods_lists[i];
        if (
          goods.title === "" ||
          goods.seckill_price === "" ||
          goods.seckills_stock === ""
        ) {
          this.$message.warning("请填写完成每个秒杀商品信息");
          return false;
        } else {
          let sku_id = goods.id;
          if (goods.sku_id > 0) {
            sku_id = goods.sku_id;
          }
          allArr.push({
            title: goods.title,
            goods_name: goods.goods_name,
            goods_id: goods.goods_id,
            sku_id: sku_id,
            goods_price: goods.goods_price,
            seckill_price: goods.seckill_price,
            goods_image: goods.goods_image,
            seckills_stock: goods.seckills_stock,
            spec_sign: goods.spec_sign,
            stock_limit: goods.stock_limit,
            sort: ""
          });
        }
      }
      const params = {
        seckill_ap_id: this.id,
        goods_info: allArr
      };
      if (this.isReset) {
        params.id = this.resetId;
        this.resApply(params).then(res => {
          this.$message.success("提交成功～");
          this.$router.back(-1);
        });
      } else {
        this.seckillApplySave({
          formItem: params
        });
      }
    }
  },
  mounted() {
    this.id = this.$route.params.id;
    if (this.$route.params.id !== undefined) {
      this.getDetail({ id: this.$route.params.id });
    }
    // 返回被驳回的商品列表
    if (this.$route.query.actid) {
      this.getresetDetail({ id: this.$route.query.actid, isRes: true });
      this.isReset = true;
      this.resetId = this.$route.query.actid;
    }
  },
  watch: {
    resApplyList() {
      //this.goods_lists = this.resApplyList;
      this.resApplyList.map((item, index) => {
        this.$set(this.defKey, index, item.sku_id);
        // item.seckill_price = item.seckill_price ? item.seckill_price : "";
        // item.title = item.title ? item.title : "";
        // item.seckills_stock = item.seckills_stock ? item.seckills_stock : "";
        // item.goods_stock = item.seckills_stock;
        this.goods_lists.push(item);
      });
    }
  }
};
</script>

<style scoped lang="stylus">
>>>.ant-form-item {
  margin-bottom 10px
}
.coupon_show >>> .ant-card:not(:last-child) {
  margin-bottom 24px
}
.coupon_p {
  line-height 32px
}
>>>.col-item {
  padding-right 10px
  box-sizing border-box
}
.goods-item {
  width 100%
  border 1px solid #e7e7e7
  margin-top 10px
  margin-right 10px
  img {
    display block
    width 150px
    height 150px
    margin 0 auto
  }
  .goods-info {
    padding 4px
    p {
      padding-bottom 4px
    }
  }
}
</style>
