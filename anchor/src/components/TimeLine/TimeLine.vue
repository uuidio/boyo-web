<template>
  <div class="goodsList">
      <div class="btn" @click="openModel">
        <slot></slot>
      </div>
      <a-modal
        style="top: 20px;"
        :width="760"
        title="售后记录"
        v-model="visible"
        :footer="null"
      >
        <a-timeline v-if="allAftersaleTrace.length">
          <a-timeline-item position="right" v-for="item in allAftersaleTrace" :key="item.id">
            <p>{{item.created_at}} 用户申请{{item.aftersales_type_text}}，{{item.progress_text}}。</p>
            <!-- <p>物流信息：{{item.logi_name}}; 快递单号：{{item.logi_code}}</p> -->
          </a-timeline-item>
        </a-timeline>
        <a-empty v-else/>
      </a-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'TimeLine',
  props: {
    oid: {
      type: [String, Number],
      required: true,
    },
  },
  data() {
    return {
      visible: false,
    };
  },
  computed: {
    ...mapState({
      allAftersaleTrace: state => state.afterSales.allAftersaleTrace,
    }),
  },
  methods: {
    ...mapActions({
      afterSaleGetAftersaleTrace: 'afterSales/afterSaleGetAftersaleTrace',
    }),
    openModel() {
      this.getData();
      this.visible = true;
    },
    getData() {
      this.afterSaleGetAftersaleTrace(this.oid);
    },
  },
};
</script>
<style lang="stylus" scoped>
  .btn {
    display inline-block
  }
</style>
