<template>
  <div class="content">
    <div class="plate-tit mb20">
      绑定管理员
    </div>
    <div class="plate-main">
      <div class="plate-head">
        <div class="head-l">
          <span>管理员</span>
        </div>
        <div class="head-r">
          <span>操作</span>
        </div>
      </div>
      <div class="plate-content">
        <div class="content-l">
          <span v-if="detail.set_mobile">{{detail.set_mobile}}</span>
          <span v-else>未设置管理员手机号</span>
        </div>
        <div class="content-r">
          <a @click="showModal('unbind')" class="operate-btn" v-if="detail.set_mobile">修改管理员</a>
          <a @click="showModal('bind ')" class="operate-btn" v-else>设置管理员</a>
        </div>
      </div>
    </div>
    <div class="plate-tit mb20" style="margin-top: 100px">
      绑定管理员
    </div>
    <div class="plate-main">
      <div class="plate-head">
        <div class="head-l">
          <span>秘钥</span>
        </div>
        <div class="head-r">
          <span>操作</span>
        </div>
      </div>
      <div class="plate-content">
        <div class="content-l">
          <span v-if="detail.set_public_key">**************</span>
          <span v-else>未设置秘钥</span>
        </div>
        <div class="content-r">
          <a class="operate-btn" @click="showKeyModal('save')">{{detail.set_public_key ? '重新设置' : '设置'}}秘钥</a>
        </div>
      </div>
    </div>
    <a-modal
      :title=" detail.set_mobile ? '修改管理员' : '设置管理员'"
      style="top: 20px;"
      :width="600"
      v-model="visible"
    >
      <a-form
        :form="menuForm"
      >
        <div class="unbind-tip" v-if="detail.set_mobile">* 修改管理员需要进行原管理员身份验证</div>
        <a-form-item
          :label="detail.set_mobile ? '原手机号' : '手机号'"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input :placeholder=" detail.set_mobile ? '请输入原管理员手机号' : '请输入'" v-model="param.mobile" style="width: 200px;"/>
        </a-form-item>
        <a-form-item
          label="验证码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input placeholder="输入收到的验证码" v-model="param.code" style="width: 200px;"/>
          <a-button v-if="times.flag" class="ml10"  @click="getCode">
            发送验证码
          </a-button>
          <a-button class="ml10" disabled v-else>
            重新获取{{times.time}}s
          </a-button>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button  @click="handleCancel">
          取消
        </a-button>
        <a-button  type="primary" @click="handleOk" v-if="!detail.set_mobile">
          确定
        </a-button>
        <a-button  type="primary" @click="confirmUnbind" v-else>
          下一步
        </a-button>
      </template>
    </a-modal>
    <a-modal
      title="生成秘钥"
      style="top: 20px;"
      :width="600"
      v-model="visible1"
    >
      <a-form
        :form="menuForm"
      >
        <div class="form-item-tit">第一步：输入秘钥信息</div>
        <a-textarea
          placeholder="请输入秘钥"
          :auto-size="{ minRows: 3, maxRows: 8 }"
          style="margin-left:15px;margin-bottom:25px;width:95%"
          v-model="public_key"
        />
        <div class="form-item-tit">第二步：验证管理员身份
        </div>

        <a-form-item
          label="手机号"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input placeholder="请输入" v-model="param.mobile" style="width: 200px;"/>
        </a-form-item>
        <a-form-item
          label="验证码"
          :label-col="labelCol"
          :wrapper-col="wrapperCol"
        >
          <a-input placeholder="输入收到的验证码" v-model="param.code" style="width: 200px;"/>
          <a-button v-if="times.flag" class="ml10"  @click="getCode">
            发送验证码
          </a-button>
          <a-button class="ml10" disabled v-else>
            重新获取{{times.time}}s
          </a-button>
        </a-form-item>
      </a-form>
      <template slot="footer">
        <a-button  @click="handleCancel1">
          取消
        </a-button>
        <a-button  type="primary" @click="handleOk1">
          确定
        </a-button>
      </template>
    </a-modal>

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
      detail: state => state.wallet.keyManageDetail,
    }),
  },
  data() {
    return {
      visible1: false,
      codeTimeOut: null,
      times: {
        flag: true,
        time: 60,
      },
      visible: false,
      public_key: '',
      type: 'bind',
      param: {
        mobile: '',
        code: '',
      },
      menuForm: this.$form.createForm(this),
      labelCol: {
        xs: { span: 24 },
        sm: { span: 3 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
  },
  methods: {
    ...mapActions({
      getKeyManageDetail: 'wallet/getKeyManageDetail',
      sendCode: 'wallet/sendCode',
      bindMobile: 'wallet/bindMobile',
      unbindMobile: 'wallet/unbindMobile',
      createSecretKey: 'wallet/createSecretKey',
    }),
    showKeyModal(type) {
      if (type !== this.type) {
        clearInterval(this.codeTimeOut);
        this.times = {
          flag: true,
          time: 60,
        };
        this.param = {
          mobile: '',
          code: '',
        };
      }
      this.type = type;
      this.visible1 = true;
    },
    handleOk1() {
      if (this.public_key === '') {
        this.$message.error('请输入秘钥信息');
        return;
      } else if (this.param.mobile === '' || this.param.mobile.length !== 11) {
        this.$message.error('请先输入正确的手机号');
        return;
      } else if (this.param.code === '') {
        this.$message.error('请先输入验证码');
        return;
      }
      const obj = {};
      obj.mobile = this.param.mobile;
      obj.code = this.param.code;
      obj.public_key = this.public_key;
      this.createSecretKey(obj);
    },
    handleCancel1() {
      this.visible1 = false;
    },
    unbindBack() {
      this.type = 'bind';
      clearInterval(this.codeTimeOut);
      this.times = {
        flag: true,
        time: 60,
      };
      this.param = {
        mobile: '',
        code: '',
      };
    },
    confirmUnbind() {
      if (this.param.mobile === '' || this.param.mobile.length !== 11) {
        this.$message.error('请先输入正确的手机号');
        return;
      } else if (this.param.code === '') {
        this.$message.error('请先输入验证码');
        return;
      }
      this.unbindMobile({ formItem: this.param, callback: this.unbindBack });
    },
    sendCodeBack() {
      const that = this;
      this.timeOut(that);
    },
    getCode() {
      if (this.param.mobile === '' || this.param.mobile.length !== 11) {
        // this.$warning({
        //   title: '温馨提示！',
        //   content: '请先输入正确的手机号',
        // });
        // this.$notification.error({
        //   message: '温馨提示',
        //   description: '请先输入正确的手机号',
        // });
        this.$message.error('请先输入正确的手机号');
        return;
      }
      const formItem = {};
      formItem.mobile = this.param.mobile;
      formItem.type = this.type;
      this.sendCode({ formItem: formItem, callback: this.sendCodeBack });
    },
    timeOut(that) {
      that.times.flag = false;
      that.codeTimeOut = setInterval(() => {
        that.times.time--;
        if (that.times.time === 0) {
          clearInterval(that.codeTimeOut);
          that.times.flag = true;
          that.times.time = 60;
        }
      }, 1000);
    },
    showModal(type) {
      if (type !== this.type) {
        clearInterval(this.codeTimeOut);
        this.times = {
          flag: true,
          time: 60,
        };
        this.param = {
          mobile: '',
          code: '',
        };
      }
      this.type = type;
      this.visible = true;
    },
    handleOk() {
      if (this.param.mobile === '' || this.param.mobile.length !== 11) {
        this.$message.error('请先输入正确的手机号');
        return;
      } else if (this.param.code === '') {
        this.$message.error('请先输入验证码');
        return;
      }
      this.bindMobile(this.param);
    },
    handleCancel() {
      this.visible = false
    },
  },
  watch: {
  },
  mounted() {
    this.getKeyManageDetail();
  },
};
</script>

<style lang="stylus" scoped>
  .plate-main
    font-size 13px
    .operate-btn
      color #4FBAFF
    .plate-head
      display flex
      justify-content space-between
      height 50px
      align-items center
      background #fafafa
      .head-l
        width 50%
        padding-left 50px
      .head-r
        width 50%
        text-align center
    .plate-content
      display flex
      justify-content space-between
      height 50px
      align-items center
      border-bottom 1px solid  #ddd
      .content-l
        color #666
        width 50%
        padding-left 50px
      .content-r
        width 50%
        text-align center
  .unbind-tip
    color #999
    margin-bottom 12px
  .form-item-tit
    font-size 16px
    margin-bottom 12px
    padding-left 15px
</style>
