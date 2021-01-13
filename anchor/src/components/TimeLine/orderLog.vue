<template>
  <div class="goodsList">
      <div class="btn" @click="openModel">
        <slot></slot>
      </div>
      <a-modal
        style="top: 20px;"
        :width="760"
        title="订单操作日志"
        v-model="visible"
        :footer="null"
      >
      <transition name="fade">
        <a-timeline v-if="logData&&logData.length">
          <a-timeline-item position="right" v-for="item in logData" :key="item.id">
            <p>{{item.created_at}} {{ ifOperator(item.operator) }}操作：{{item.note}}。</p>
          </a-timeline-item>
        </a-timeline>
        <a-empty v-else/>
      </transition>
      </a-modal>
    </div>
</template>
<script>
import { mapState, mapActions } from 'vuex';
export default {
  name: 'TimeLine',
  props:{
    logData:{
      type: Array,
      required: true,
      default: function () {
        return []
      }
    },
  },
  data() {
    return {
      visible: false,
    }
  },
  computed: {
  },
  methods: {
    openModel() {
      this.visible = true;
    },
    ifOperator(val) {
      switch (val) {
        case "user":
          return '用户'
          break;
        case "seller":
          return '门店'
          break;
        case "platform":
          return '平台'
          break;
        default:
      }
    }
  }
};
</script>
<style lang="stylus" scoped>
  .btn {
    display inline-block
  }
  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }
  .fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
    opacity: 0;
  }
</style>
