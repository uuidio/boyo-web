<template>
  <div class="main">
    <a-form :form="form">
      <a-form-item>
        <a-input v-decorator="['p3',{ rules: [{ required: true, message: '请输入手机号'},{pattern:/^1[3456789]\d{9}$/,message:'请输入正确手机号'}]},]" placeholder="请输入手机号" size="large">
          <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(60% - 12px)' }">
          <a-input v-decorator="['p4',{ rules: [{ required: true, message: '请输入验证码' }] },]" size="large" type="text" placeholder="请输入验证码" style="width:100%;" >
            <a-icon slot="prefix" type="qrcode" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' , opacity: 0}">-</span>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(40% - 12px)' }">
          <a-button type="primary" size="large" style="width:100%;">发送验证码</a-button>
        </a-form-item>
      </a-form-item>
      <a-form-item style="margin-top: -25px;">
        <a-input-password v-decorator="['p5',{ rules: [{ required: true, message: '请输入密码' }] },]" size="large" type="password" autocomplete="false" placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-item>
      <a-form-item>
        <a-button size="large" type="primary" @click="check" style="width:100%;">
          提交
        </a-button>
      </a-form-item>
      <input type='hidden'></input>
      <input type='password' style="display: none"></input>
    </a-form>
    <div>
      <a-button @click="$router.push('/passport/Login')" type="link" style="margin-left: -16px;">登陆账号</a-button>
    </div>
  </div>

</template>
<script>
import http from '@/api/http';
import Server from '@/config/server';
import { setAccessToken, setUserInfo } from '@/utils/util';
import { regular, validateOrder } from '@/components/tools/validate.js'
export default {
  data() {
    return {
      form: this.$form.createForm(this, { name: 'dynamic_rule' }), //这是创建表单
      form_params: {
        p3:'',
        p4:'',
        p5:'',
      },
      checkNick: false,
    };
  },
  computed: {},
  created() {
  },
  methods: {
    handleSubmit() {
      let flag = false;
      const that = this;
      this.form.validateFields(['username', 'password'], { force: true }, (err, values) => {
        if (!err) {
          flag = true;
          that.formLogin.username = values.username;
          that.formLogin.password = values.password;
        }
      });

      if (!flag) return;
      http.post(Server.action.login, that.formLogin)
        .then((resData) => {
          if (resData.code === 0) {
            setAccessToken(resData.result.access_token);
            setUserInfo(JSON.stringify(resData.result));
            this.$router.push({
              path: '/dashboard/main',
            });
          }
        });
    },
    // 手机号码校验
    phoneCheck(rule, value, callbackFn) {
      const reg = /^[1][3,4,5,6,7,8,9][0-9]{9}$/;
      if (!reg.test(value)) {
        callbackFn('请输入手机号码');
        return;
      }
      callbackFn();
    },
    check() {
      this.form.validateFields(err => {
        if (!err) {
          console.info('success');
        }
      });
    },
    handleChange(e) {
      this.checkNick = e.target.checked;
      this.$nextTick(() => {
        this.form.validateFields(['nickname'], { force: true });
      });
    },
  },
};
</script>
<style lang="stylus" scoped>
  .user-layout-login
    label
      font-size: 14px;

    .getCaptcha
      display: block;
      width: 100%;
      height: 40px;

    .forge-password
      font-size: 14px;

    button.login-button
      padding: 0 15px;
      font-size: 16px;
      height: 40px;
      width: 100%;

    .user-login-other
      text-align: left;
      margin-top: 24px;
      line-height: 22px;

      .item-icon
        font-size: 24px;
        color: rgba(0, 0, 0, 0.2);
        margin-left: 16px;
        vertical-align: middle;
        cursor: pointer;
        transition: color 0.3s;

        :hover
          color: #1890ff;

      .register
        float: right;
</style>
