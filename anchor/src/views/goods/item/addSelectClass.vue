<template>
  <div class="content">
    <div class="classBox">
      <div class="mb10" v-if="$route.params.id">编辑分类选择：</div>
      <div class="mb10" v-else>分类选择：</div>
      <a-cascader style="width:300px" v-model="selectClass" :allowClear="true" @change="classChange" :options="option"
                  placeholder="选择分类"/>
      <a-button style="margin-left:10px" @click="goAdd" type="primary">确认选择</a-button>
      <a-button v-if="$route.params.id" class="ml10" type="danger" @click="$router.back(-1)">返回</a-button>
      <div class="mt10" v-if="oldSelectLists !== null">
        <a-dropdown>
          <div>
            <span>最近常用分类</span>
            <a-icon type="down"/>
          </div>
          <a-menu slot="overlay" style="width:300px">
            <a-menu-item :key="index" v-for="(item,index) of oldSelectLists" @click="oldSelect(item)">
              {{item[0].label}}/{{item[1].label}}/{{item[2].label}}
            </a-menu-item>
          </a-menu>
        </a-dropdown>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import helper from '@/utils/helper';

export default {
  computed: {
    ...mapState({
      goodsClassTree: state => state.goods.goodsClassTree,
      detail: state => state.goods.detail,
    }),
  },
  data() {
    return {
      oldSelectLists: JSON.parse(localStorage.getItem('oldSelectGoodsClass')),
      selectClass: [],
      selectClassData: [],
      option: [],
    };
  },
  methods: {
    ...mapActions({
      getGoodsClassTree: 'goods/getGoodsClassTree',
      getDetail: 'goods/getDetail',
    }),
    oldSelect(item) {
      this.selectClass = [item[0].value, item[1].value, item[2].value];
      this.selectClassData = [item[0], item[1], item[2]];
    },
    callback(data) {
      this.option = data;
    },
    classChange(val, data) {
      this.selectClass = val;
      this.selectClassData = data;
    },
    goAdd() {
      if (this.selectClass.length !== 3) {
        helper.showError('请选择正确商品分类，只有选到第3级分类才可以发布商品');
        return;
      }
      localStorage.setItem(
        'classItem',
        JSON.stringify(this.selectClassData),
      );
      this.setOldSelectClass(this.selectClassData);
      if (this.$route.params.id !== undefined) {
        const paramsId = this.$route.params.id;
        const jumpUrl = `/goods/edit/${paramsId}`;
        this.$router.push({ path: jumpUrl });
      } else {
        this.$router.push({ path: '/goods/add' });
      }
    },
    setOldSelectClass(selectClass) {
      const oldSelectClass = localStorage.getItem('oldSelectGoodsClass') === null
        ? []
        : JSON.parse(localStorage.getItem('oldSelectGoodsClass'));
      if (
        JSON.stringify(oldSelectClass).indexOf(JSON.stringify(selectClass))
          === -1
      ) {
        oldSelectClass.push(selectClass);
      }
      if (oldSelectClass.length === 5) {
        oldSelectClass.shift();
      }
      localStorage.setItem(
        'oldSelectGoodsClass',
        JSON.stringify(oldSelectClass),
      );
    },
  },
  mounted() {
    this.getGoodsClassTree(this.callback);
    if (this.$route.params.id !== undefined) {
      this.getDetail({ id: this.$route.params.id });
      console.log(this.detail);
    }
  },
};
</script>

<style scoped lang="stylus">
  .classBox
    min-height 500px
</style>
