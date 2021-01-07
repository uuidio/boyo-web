<template>
    <div class="currencyBox">
        <div class="title_h4 mb20">线上售币</div>
        <div class="mb20 search">
          <a-button @click="today">今日</a-button>
          <a-range-picker @change="onChange"  class="ml10"/>
        </div>
      <a-row style="margin:0 -8px">
        <a-col :xs="24" :md="6" style="padding:0 8px;margin-bottom:10px;">
          <a-card :title="'活动页访问量'+time" :bordered=false>
            <p class="my_p">{{getData.visit_count}}</p>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="6" style="padding:0 8px;margin-bottom:10px;">
          <a-card :title="'购买按钮点击次数'+time" :bordered=false>
            <p class="my_p">{{getData.click_count}}</p>
          </a-card>
        </a-col>
        <a-col :xs="24" :md="6" style="padding:0 8px;margin-bottom:10px;">
          <a-card :title="'支付笔数'+time" :bordered=false>
            <p class="my_p">{{getData.currency_count}}</p>
          </a-card>
        </a-col>
      </a-row>
    </div>
</template>

<script>
import {
  mapState,
  mapActions,
} from 'vuex';

export default {
  computed: {
    ...mapState({
      getData: state => state.statistics.getData,
    }),
  },
  data() {
    return {
      time: '(今日)',
      formItem: {
        start_time: '',
        end_time: '',
      },
    };
  },
  methods: {
    ...mapActions({
      fetchLists: 'statistics/fetchLists',
    }),
    onChange(a, b) {
      console.log(b);
      if (b[0] !== '') {
        this.formItem = {
          start_time: `${b[0]} 00:00:00`,
          end_time: `${b[1]} 23:59:59`,
        };
        this.fetchLists(this.formItem);
        this.time = '';
      }
    },
    today() {
      this.formItem = {
        start_time: '',
        end_time: '',
      };
      this.time = '(今日)';
      this.fetchLists(this.formItem);
    },
  },
  mounted() {
    this.time = '(今日)';
    this.fetchLists(this.formItem);
  },
};
</script>

<style scoped lang="stylus">
.search
  display flex
  align-items center
.currencyBox
  margin 24px
>>>.ant-card-head-title
  font-size:14px;
  color:#666
.my_p
  font-size 24px
  color #333
  font-weight 700
</style>
