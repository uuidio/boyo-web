<template>
  <div class="main">
    <a-form
      class="user-layout-login"
      ref="formLogin"
      :autoFormCreate="(form)=>{this.form = form}"
      id="formLogin"
    >
      <a-form-item
        fieldDecoratorId="username"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入帐户名' }]}"
      >
        <a-input size="large" type="text" placeholder="帐户名或邮箱地址">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item
        fieldDecoratorId="password"
        :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入密码' }], validateTrigger: 'blur'}"
      >
        <a-input size="large" type="password" autocomplete="false" placeholder="密码">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-item>
      <a-form-item style="margin-top:24px">
        <a-button
          size="large"
          type="primary"
          htmlType="submit"
          class="login-button"
          :loading="loginBtn"
          @click.stop.prevent="handleSubmit"
          :disabled="loginBtn"
        >确定
        </a-button>
      </a-form-item>
    </a-form>
    <div>
      <a-button @click="$router.push('/passport/register')" type="link" style="margin-left: -16px;">注册账号</a-button>
      <a-button @click="$router.push('/passport/reset_password')" type="link" style="margin-right:-16px;float: right">修改密码</a-button>
    </div>
  </div>
</template>
<script>
import http from '@/api/http';
import Server from '@/config/server';
import { setAccessToken, setUserInfo } from '@/utils/util';

export default {
  data() {
    return {
      loginBtn: false,
      formLogin: {
        username: '',
        password: '',
        // rememberMe: true,
      },
    };
  },
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
      http.post('v1/anchor/login', that.formLogin)
        .then((resData) => {
          if (resData.code === 0) {
            resData.result['frontend_permission'] = ['dashboard','desktop']
            setAccessToken(resData.result.access_token);
            setUserInfo(JSON.stringify(resData.result));
            this.$router.push({path: '/dashboard/main',});
          }
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
