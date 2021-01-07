<template>

  <div class="mr24">
    <a-card :bordered="false">
      <div class="det-info">
        <a-row class="mb20" v-if="showTips">
          <a-col  :xs="24" :md="8">
            <div class="result-tips-box">
              <div class="result-tips" v-if="showStatus === 1">
                <a-icon type="check-circle" :style="{ fontSize: '50px', color: '#00BE2D' }" theme="filled"/>
                <span class="tips-label">提货成功</span>
              </div>

              <div class="result-tips" v-if="showStatus === 2">
                <a-icon type="close-circle" :style="{ fontSize: '50px', color: '#FF173E' }" theme="filled"/>
                <span class="tips-label">提货失败</span>
              </div>

            </div>
          </a-col>
        </a-row>
        <a-row class="mb20" v-for="(item, index) in detail.trade_order" :key="index">
          <a-col  :xs="24" :md="8">
            <div class="info-box mb10">
              <span class="info-label">商品名称：</span>
              <p class="info-content">{{item.goods_name}}</p>
            </div>
            <div class="info-box">
              <span class="info-label">数量：</span>
              <p class="info-content">{{item.quantity}}</p>
            </div>
          </a-col>
        </a-row>
        <a-row class="mb20" v-if="stepCurrent === 1">
          <a-col  :xs="24" :md="8">
            <div class="btnBox">
              <a-button type="primary" @click="confirmBtn">确认提货</a-button>
            </div>
          </a-col>
        </a-row>

        <a-modal title="提货确认" v-model="deliveVisible" @ok="deliveHandleOk">
          您确定要提货吗？
        </a-modal>
      </div>
    </a-card>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'detail',
  computed: {
    ...mapState({
      detail: state => state.trade.detail,
    }),
  },
  data() {
    return {
      showTips: false,
      showStatus: '',
      deliveVisible: false,
      stepCurrent: 0,
      data: [],
      page: false,
    };
  },
  methods: {
    ...mapActions({
      getDetail: 'trade/getDetail',
      pickUpInfo: 'trade/pickUpInfo',
    }),
    callback(status) {
      this.showTips = true;
      this.showStatus = status;
      if (status === 1) {
        this.stepCurrent = 3;
      }
    },
    confirmBtn() {
      this.deliveVisible = true;
    },
    deliveHandleOk() {
      const itemId = this.detail.id;
      const code = this.detail.pick_code;
      this.pickUpInfo({
        InfoObj: {
          id: itemId,
          code: code,
        },
        callback: this.callback,
      });
      this.deliveVisible = false;
    },
    initDet() {
      switch (this.detail.status_text) {
        case '待付款':
          this.stepCurrent = 0;
          break;
        case '待发货':
          this.stepCurrent = 1;
          break;
        case '待收货':
          this.stepCurrent = 2;
          break;
        case '已完成':
          this.stepCurrent = 3;
          break;
        default:
      }
      this.data = this.detail.trade_order;
      console.log(this.detail);
    },
  },
  mounted() {
    this.getDetail({ id: this.$route.params.id });
  },
  watch: {
    detail() {
      this.initDet();
    },
  },
};
</script>

<style scoped lang="stylus">
  .result-tips-box
    width 80%
    .result-tips
      display flex
      align-items center
      .tips-label
        font-size 20px
        margin-left 20px
        font-weight bold
  .det-info
    line-height 1.5
    .info-box
      display flex
      .info-label
        width 80px
        flex-shrink 0
        text-align right
  .btnBox
    margin-top 30px
    display flex
  @media screen and (max-width:960px)
    .det-info
      width 80%
      margin 0 auto
      .btnBox
        display flex
        justify-content center;
      .result-tips
        justify-content center
  .fahuo
    text-align center
    margin-top 20px
  >>> .ant-card:not(:last-child)
    margin-bottom 20px

  >>> .det-info .ant-col-md-6
    margin-bottom 20px

  .det-title
    margin 20px 0
    padding-bottom 10px
    border-bottom 1px solid #e8e8e8

  >>> .userInfo .ant-row > div:first-child
    font-weight 700

  >>> .userInfo .ant-row:last-child > div
    border-bottom 0

  >>> .userInfo .ant-row > div
    padding 8px 0
    border-bottom 1px solid #e8e8e8

  .buyer
    margin-bottom 20px

  .det-remark .fs16
    margin-bottom 10px
    font-weight 700

  .buyer-info
    min-height 20px
    background-color #f5f5f5
    border 1px solid #e3e3e3
    padding 9px
    border-radius 3px

  @media (min-width: 765px)
    .det-time
      text-align right

    .buyer-info
      width 300px

</style>
