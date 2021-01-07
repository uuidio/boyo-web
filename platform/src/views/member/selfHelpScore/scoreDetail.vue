<template>
  <div class="content">
    <a-form>
      <a-form-item
        label="手机号"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <div>{{dataItem.mobile}}</div>
      </a-form-item>
      <a-form-item
        label="会员等级"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <div>{{dataItem.grade_name_text}}</div>
      </a-form-item>
      <a-form-item
        label="创建时间"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <div>{{dataItem.created_at}}</div>
      </a-form-item>
      <a-form-item
        label="小票图片"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 12,xs:24}"
      >
      <viewer :images="dataItem.imgs">
          <img style="width:200px" v-for="src in dataItem.imgs" :src="src.url" :key="src.title">
      </viewer>
      </a-form-item>

      <a-form-item
        label="消费店铺"
        :required="true"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="dataItem.status != 2"
      >
        <a-select
          showSearch
          v-model="dataItem.shop_id"
          placeholder="消费店铺"
          :allowClear="true"
          :filterOption="filterOption"
          :disabled="dataItem.status != 0"
        >
          <a-select-option
            v-for="item in this.shopLists"
            :value="item.id"
            :key="item.id"
          >{{ item.storeName }}
          </a-select-option>
        </a-select>
      </a-form-item>
<!--      <a-form-item-->
<!--        label="消费地点"-->
<!--        :label-col="{ md: 3,xs:24 }"-->
<!--        :wrapper-col="{ md: 6,xs:24}"-->
<!--        v-if="dataItem.status != 2"-->

<!--      >-->
<!--        <a-input-->
<!--          placeholder="消费地点(选填)"-->
<!--          v-model="dataItem.address"-->
<!--          v-if="dataItem.status == 0"-->
<!--        />-->
<!--        <div v-else>-->
<!--          {{dataItem.address}}-->
<!--        </div>-->
<!--      </a-form-item>-->
      <a-form-item
        :required="true"
        label="小票时间"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="dataItem.status != 2"
      >
        <a-date-picker
          :defaultValue="moment((dataItem.created_at), 'YYYY-MM-DD HH:mm:ss')"
          format="YYYY-MM-DD HH:mm:ss"
          showTime
          placeholder="请选择小票时间"
          @change="dateChange"
          v-if="dataItem.status == 0"
        />
        <div v-else>{{dataItem.invoice_at}}</div>
      </a-form-item>
      <a-form-item
        :required="true"
        label="小票号"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="dataItem.status != 2"
      >
        <a-input
          :disabled="dataItem.status != 0"
          placeholder="30字符以内"
          :maxLength="30"
          v-model="dataItem.ticket_id"
          v-if="dataItem.status == 0"
        />
        <div v-else>{{dataItem.ticket_id}}</div>
      </a-form-item>
      <a-form-item
        :required="true"
        label="消费金额"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
        v-if="dataItem.status != 2"
      >
        <a-input
          :disabled="dataItem.status != 0"
          placeholder="保留小数点后两位"
          v-model="dataItem.fee"
          v-if="dataItem.status == 0"
        />
        <div v-else>{{dataItem.fee}}</div>
      </a-form-item>
      <a-form-item
        label="申请状态"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <div>{{dataItem.status == 0 ? '等待审核' : dataItem.status == 1 ? '积分成功' : '积分失败'}}</div>
      </a-form-item>
      <a-form-item
        label="驳回原因"
        :label-col="{ md: 3,xs:24 }"
        :wrapper-col="{ md: 21,xs:24}"
        v-if=" dataItem.status == 2"
      >
        <div>{{dataItem.reject_reason}}</div>
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4,md: 12 ,xs:24}"
      >
        <a-button v-if="dataItem.status == 0" class="mr10" @click="verify" type="primary">提交</a-button>
        <a-button v-if="dataItem.status == 0" class="mr10" @click="showModal" type="danger">驳回</a-button>
        <a-button  @click="$router.back(-1)">返回</a-button>
      </a-form-item>
    </a-form>
    <a-modal
      width="600px"
      title="驳回申请"
      :visible="visible"
      @ok="handleOk"
      @cancel="handleCancel"
    >
      <a-form
      >
        <a-form-item
          label= "驳回原因"
          :label-col= "{ md: 4,xs:24 }"
          :wrapper-col= "{ md: 12,xs:24}"
        >
          <a-radio-group v-model="sltFill" name="radioType" :defaultValue="0" @change="changeSltFill">
            <a-radio :value="0">快捷选择</a-radio>
            <a-radio :value="1">自行输入</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item
          label= "选填内容"
          :label-col= "{ md: 4,xs:24 }"
          :wrapper-col= "{ md: 18,xs:24}"
        >
          <a-select v-if="sltFill === 0" :value="reject_reason" @change="handleChange">
            <a-select-option v-if="item.reject_status === '显示'" :value="item.term" v-for="item in rejectReasonList" :key="item.term">{{item.term}}</a-select-option>
          </a-select>
          <a-textarea
            v-else
            style="width: 100%"
            placeholder= "输入驳回原因"
            :rows= "4"
            v-model= "reject_reason"
          />
        </a-form-item>
      </a-form>
    </a-modal>
	<a-modal  v-model="daseVisible" cancelText="否" okText="是" @ok="dataHandleOk" @cancel="dataCancel">
		是否处理下一条
	</a-modal>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import Ueditor from '@C/ueditor/ueditor';
import moment from 'moment';

export default {
  name: 'addArticle',
  components: {
    Ueditor,
  },
  data() {
    return {
      sltFill: 0,
      imgs:[],
      // rejectReasonList: [
      //   '亲，您的购物小票已在线下帮您积分成功（可查询积分记录），感谢您的光临，谢谢。',
      //   '亲，您好，请上传正确的购物小票【美团外卖、银联单、签购单、支付记录、发票不作为积分依据，请勿上传；餐饮小票请上传结账单（收银单、预打单、点菜单不予积分请勿上传）】，感谢您的光临。谢谢。',
      //   '亲，您好，您的积分小票已过积分有效期（7天内有效），感谢您的光临，谢谢。',
      //   '亲，您好，请上传完整清晰的单张购物小票（清晰、完整、店铺名称、店铺号、消费日期、交易号、消费金额），感谢您的光临，谢谢。',
      //   '亲，您好，请上传正确的购物小票，本店铺积分需提供含“益田假日世界”字样的小票，感谢您的光临，谢谢！',
      //   '亲，此店铺不参与积分，感谢您的光临，谢谢。',
      //   '亲，您的小票已积分，无需重复上传小票，谢谢。',
      //   '亲，您好，您的积分小票存在异常，请至客服中心查询，谢谢。',
      //   '亲，您好，此店铺充值单不给予积分，可上传已充值后消费的小票，感谢您的光临，谢谢。',
      // ],
      date: '',
      itemId: '',
      visible: false,
	  reject_reason: '',
	  score_id:'11',
	  daseVisible:false
    }
  },
  computed: {
    ...mapState({
      dataItem: state => state.member.dataItem,
      shopLists: state => state.member.shopLists,
      rejectReasonList: state => state.member.quickRejectList,
    }),
  },
  created() {
    if (this.$route.query.itemId) {
      this.itemId = this.$route.query.itemId;
      this.getDataItem(this.itemId);
    }
    this.getShopLists({
      per_page: 100000000,
      // shop_state: 1,
      // fit_up: 1,
    });
    this.getRejectReasonList();
  },
  mounted() {
  },
  methods: {
    ...mapActions({
      getDataItem: 'member/getDataItem',
      verifyDateItem: 'member/verifyDateItem',
      getShopLists: 'member/getShopLists',
      rejectApply: 'member/rejectApply',
      getRejectReasonList: 'member/getQuickRejectList',
    }),
    moment,
    changeSltFill(e) {
      this.reject_reason = '';
    },
    handleChange(value) {
      this.reject_reason = value;
    },
    dateChange(date, dateString) {
      this.dataItem.invoice_at = dateString;
    },
    // 店铺搜索
    filterOption(input, option) {
      return (
        option.componentOptions.children[0].text.toLowerCase().indexOf(input.toLowerCase()) >= 0
      );
    },
    showModal(item) {
      this.visible = true;
    },
    handleOk() {
      this.handleRejectApply({
        id: this.itemId,
        reject_reason: this.reject_reason,
      });
    },
    handleCancel() {
      this.visible = false;
    },
    handleRejectApply(data) {
      this.rejectApply(data);
    },
    verify() {
      if (!this.dataItem.shop_id) {
        this.$notification.error({
          message: '请选择消费店铺',
          description: '',
        });
        return false;
      }
      if (!this.dataItem.invoice_at) {
		this.dataItem.invoice_at = this.dataItem.created_at;
        // this.$notification.error({
        //   message: '请选择小票时间',
        //   description:
        //     '',
        // });
        // return false;
      }
      if (!this.dataItem.ticket_id) {
        this.$notification.error({
          message: '请输入小票号',
          description: '',
        });
        return false;
      }
      if (!this.dataItem.fee) {
        this.$notification.error({
          message: '请输入消费金额',
          description: '',
        });
        return false;
      } else if (this.dataItem.fee.indexOf('.') !== -1 && this.dataItem.fee.split('.')[1].length > 2) {
        this.$notification.error({
          message: '消费金额保留两位小数',
          description: '',
        });
        return false;
      }
      const data = {
        shop_id: this.dataItem.shop_id,
        // address: this.dataItem.address,
        invoice_at: this.dataItem.invoice_at,
        fee: this.dataItem.fee,
        ticket_id: this.dataItem.ticket_id,
        id: this.itemId,
      };
	  this.verifyDateItem({params:{data,collback:this.submitCollback}});
	},
	submitCollback(id){
		this.score_id=id;
		this.daseVisible=true
	},
	dataHandleOk() {
		this.daseVisible = false
		if (this.score_id == 0) {
      this.$router.push({path:'/member/selfHelpScore/scoreList'});
    } else {
		  this.itemId = this.score_id;
      this.getDataItem(this.score_id);
      const goLink = `/member/selfHelpScore/scoreDetail?itemId=${this.score_id}`;
      this.$router.replace({
        path: goLink,
      });
    }
	},
	dataCancel(){
		this.daseVisible=false
		this.$router.push({path:'/member/selfHelpScore/scoreList'});
	}
  },
  watch: {

  },
};
</script>

<style scoped lang="stylus">
>>> .ant-select-dropdown-menu-item-selected
  font-weight normal
>>> .option-first
    color #2d8cf0
.articleContentTit
  padding 8px 10px
  margin-bottom 20px
  background #efefef font-weight 700
.img-box
  width 150px
  img
    width 100%
.article-content
  1px solid #d9d9d9
  padding 10px
  border-radius 4px
</style>
