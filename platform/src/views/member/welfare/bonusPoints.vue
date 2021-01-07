<template>
  <div class="content">
    <div class="setTable">
      <div class="item">
        <a-row >
          <a-col :span="6">是否开启赠送积分</a-col>
          <a-col :span="12">
            <a-switch @change="changeSw" v-model="open_status" />
          </a-col>
        </a-row>
        <a-row class="mt20">
          <a-col :span="6">赠送积分值</a-col>
          <a-col :span="12">
            <a-input-number
              v-model="point"
            />
          </a-col>
        </a-row>
      </div>
      <a-button type="primary" size="large" @click="subConfig">确定</a-button>
    </div>

  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  components: {
  },
  data() {
    return {
      open_status: false,
      point: '',
    };
  },
  computed: {
    ...mapState({
      benefitsDetail: state => state.member.benefitsDetail,
    }),
  },
  mounted() {
    this.getBenefitsDetail({
      page: 'register',
      group: 'point',
    });
  },
  methods: {
    ...mapActions({
      getBenefitsDetail: 'member/getBenefitsDetail',
      setBenefits: 'member/setBenefits',
    }),
    initData() {
      if (this.benefitsDetail.open_status === 1) {
        this.open_status = true;
      } else {
        this.open_status = false;
      }
      this.point = this.benefitsDetail.point;
    },
    changeSw(bool) {
      console.log(bool);
    },
    subConfig() {
      const params = {
        open_status: this.open_status ? 1 : 0,
        point: this.point,
      }
      this.setBenefits(params);
    },
  },
  watch: {
    benefitsDetail() {
      this.initData();
    },
  },
};
</script>

<style scoped lang="stylus">
.setTable {
  .item {
    margin-bottom 15px
  }
}
</style>
