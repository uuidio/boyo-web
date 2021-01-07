<template>
  <div class="mr24 coupon_show">
    <a-card title="拼团活动信息" class="coupon-name">
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          拼团总人数：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <div v-if="id === 0">
            <a-input
              style="width:180px;margin-right: 5px"
              v-model="formItem.group_size"
              type="number"
              placeholder="不能超过6人"
              @blur="checkSize"
            />
            <span>人</span>
          </div>

          <span v-else>{{ formItem.group_size }}人</span>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          拼团等待时间：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <div v-if="id === 0">
            <a-input
              style="width:180px;margin-right: 5px"
              v-model="formItem.group_validhours"
              type="number"
              placeholder="请输入整数小时"
            />
            <span>小时</span>
          </div>
          <span v-else>{{ formItem.group_validhours }}小时</span>
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          活动生效日期：
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 7, offset: 1 }">
          <a-range-picker
            showTime
            format="YYYY/MM/DD HH:mm:ss"
            @change="timeChange2"
            v-if="id === 0"
          />
          <span v-else
            >{{ formItem.start_time }} ~ {{ formItem.end_time }}</span
          >
        </a-col>
      </a-row>
      <a-row type="flex" align="middle">
        <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
          与积分抵扣同享:
        </a-col>
        <a-col :xs="{ span: 24 }" :md="{ span: 6, offset: 1 }">
          <a-radio-group v-model="formItem.is_use_point" :disabled="id !== 0"  name="radioGroup">
            <a-radio :value="0">否</a-radio>
            <a-radio :value="1">是</a-radio>
          </a-radio-group>
        </a-col>
      </a-row>

    </a-card>
    <a-card title="拼团商品选择">
      <getGoods
        v-if="id === 0"
        @selectOk="getGoodsList"
        linkType="seckill"
        :otherParam="{ is_group: true }"
        seleteType="radio"
      >
        <a-button type="primary" size="large" style="width:100%"
          >选择商品</a-button
        >
      </getGoods>
      <div v-if="selectGoods.length !== 0" class="coupon-name">
        <ul class="item-lists">
          <li v-for="(item, index) in selectGoods" :key="index">
            <a-row type="flex" align="middle">
              <a-col :xs="12" :sm="18">
                <div class="goods-item">
                  <div class="imgBox">
                    <img :src="item.goods_image" alt="" />
                  </div>
                  <div>
                    <p>{{ item.goods_name }}</p>
                    <p
                      v-if="item.spec_sign"
                      class="col-666"
                      style="font-size:12px"
                    >
                      {{ item.spec_sign }}
                    </p>
                    <p class="col-red">￥{{ item.goods_price }}</p>
                  </div>
                </div>
              </a-col>
            </a-row>
          </li>
        </ul>
        <a-row type="flex" align="middle">
          <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
            拼团商品价格：
          </a-col>
          <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
            <a-input
              v-if="id === 0"
              v-model="goosItem.group_price"
              type="number"
              placeholder="请输入拼团商品价格"
            />
            <span v-else>
              {{ goosItem.group_price }}
            </span>
          </a-col>
        </a-row>
        <!-- <a-row type="flex" align="middle">
          <a-col :xs="{ span: 24 }" :md="{ span: 3 }" class="add-label">
            拼团商品库存：
          </a-col>
          <a-col :xs="{ span: 24 }" :md="{ span: 6 }">
            <a-input
              v-if="id === 0"
              v-model="goosItem.group_stock"
              type="number"
              placeholder="请输入拼团商品库存"
            />
            <span v-else>
              {{ goosItem.group_stock }}
            </span>
          </a-col>
        </a-row> -->
      </div>
    </a-card>
    <a-card title="提交设置" v-if="id === 0">
      <a-button @click="handleSubmit" type="primary">提交</a-button>
      <a-button class="ml10" type="danger" @click="$router.back(-1)"
        >返回</a-button
      >
    </a-card>
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
      detail: state => state.group.detail
    })
  },
  data() {
    return {
      id: 0,
      selectGoods: [],
      formItem: {
        start_time: "",
        end_time: "",
        group_size: "",
        group_validhours: "",
        goods_info: {},
        is_use_point: 1,
      },
      goosItem: {
        group_stock: "",
        group_price: ""
      },
      subThrottle: false
    };
  },

  methods: {
    ...mapActions({
      groupApplySave: "group/groupApplySave",
      getDetail: "group/getDetail"
    }),
    checkSize(e) {
      if (this.formItem.group_size > 6) {
        this.formItem.group_size = "";
        this.$message.info("拼团人数不能大于6");
        return;
      }
      if (this.formItem.group_size <= 1) {
        this.formItem.group_size = "";
        this.$message.info("拼团人数最少为2");
      }
    },
    getGoodsList(item) {
      this.goosItem = {
        group_stock: "",
        group_price: ""
      };
      this.selectGoods = item;
    },
    timeChange2(dates, dateStrings) {
      this.formItem.start_time = dateStrings[0];
      this.formItem.end_time = dateStrings[1];
    },
    handleSubmit() {
      if (this.subThrottle) {
        return;
      } else {
        setTimeout(() => {
          this.subThrottle = false;
        }, 1000);
      }
      this.subThrottle = true;
      if (this.goosItem.group_price === "") {
        this.$message.warning("请填写完成拼团商品信息");
        return;
      }
      this.formItem.goods_info = {
        goods_name: this.selectGoods[0].goods_name,
        goods_id: this.selectGoods[0].goods_id,
        sku_id: this.selectGoods[0].id,
        goods_price: this.selectGoods[0].goods_price,
        goods_image: this.selectGoods[0].goods_image,
        group_stock: this.goosItem.group_stock,
        spec_sign: this.selectGoods[0].spec_sign,
        gc_id_3: this.selectGoods[0].gc_id_3,
        group_price: this.goosItem.group_price,
        sort: ""
      };
      this.groupApplySave({
        formItem: this.formItem
      });
    }
  },
  watch: {
    detail() {
      console.log(this.detail);
      this.formItem.start_time = this.detail.start_time;
      this.formItem.end_time = this.detail.end_time;
      this.formItem.group_size = this.detail.group_size;
      this.formItem.is_use_point = this.detail.is_use_point  ;
      this.formItem.group_validhours = this.detail.group_validhours;
      this.selectGoods = [
        {
          goods_name: this.detail.goods_name,
          goods_id: this.detail.goods_id,
          sku_id: this.detail.id,
          goods_price: this.detail.price,
          goods_image: this.detail.goods_image,
          group_stock: this.detail.group_stock,
          spec_sign: this.detail.spec_sign,
          group_price: this.detail.group_price,
          gc_id_3: this.detail.gc_id_3,
          sort: ""
        }
      ];
      this.goosItem = {
        group_stock: this.detail.group_stock,
        group_price: this.detail.group_price
      };
    }
  },
  mounted() {
    if (this.$route.params.id !== undefined) {
      this.id = this.$route.params.id;
      this.getDetail({ id: this.$route.params.id });
    }
  }
};
</script>

<style scoped lang="stylus">
>>> .coupon-name .ant-row-flex:not(:last-child), .items .ant-row-flex:not(:last-child) {
  margin-bottom 15px
}
.coupon_show >>> .ant-card:not(:last-child) {
  margin-bottom 24px
}
.item-lists {
  margin-top 10px
  margin-bottom 15px
  li {
    border 1px solid #efefef
    >>>.ant-row-flex>div {
      padding 8px
      vertical-align middle
      .goods-item {
        display flex
      }
      .imgBox {
        width 80px
        margin-right 15px
        img {
          width 100%
        }
      }
    }
  }
}
</style>
