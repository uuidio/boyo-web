<template>
  <div class="main">
    <a-form-model ref="ruleForm" :model="form_params" :rules="rules">
      <a-form-model-item>
        <a-input v-model="form_params.company" placeholder="请输入公司名称" size="large">
          <a-icon slot="prefix" type="bank" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="username">
        <a-input v-model="form_params.username" placeholder="请输入用户名" size="large">
          <a-icon slot="prefix" type="user" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="mobile">
        <a-input v-model="form_params.mobile" placeholder="请输入手机号" size="large" @change="mobile_change">
          <a-icon slot="prefix" type="phone" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input>
      </a-form-model-item>
      <a-form-model-item prop="code">
        <a-form-item :style="{ display: 'inline-block', width: 'calc(60% - 12px)' }">
          <a-input v-model="form_params.code" size="large" type="text" placeholder="请输入验证码" style="width:100%;" >
            <a-icon slot="prefix" type="qrcode" :style="{ color: 'rgba(0,0,0,.25)' }"/>
          </a-input>
        </a-form-item>
        <span :style="{ display: 'inline-block', width: '24px', textAlign: 'center' , opacity: 0}">-</span>
        <a-form-item :style="{ display: 'inline-block', width: 'calc(40% - 12px)' }">
          <a-button type="primary" size="large" style="width:100%;" @click="send_code" :disabled="send_button_disable">{{send_button}}</a-button>
        </a-form-item>
      </a-form-model-item>
      <a-form-model-item prop="password" stye="margin-top:-20px;">
        <a-input-password v-model="form_params.password" size="large" type="password" autocomplete="false" placeholder="请输入密码">
          <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
        </a-input-password>
      </a-form-model-item>
      <a-form-model-item>
        <a-button type="primary" @click="onSubmit" style="width:100%;" size="large">
          点击注册
        </a-button>
      </a-form-model-item>
    </a-form-model>
    <div>
      <a-button @click="$router.push('/passport/Login')" type="link" style="margin-left: -16px;">登陆账号</a-button>
    </div>
  </div>
</template>
<script>
import http from '@/api/http';
import Server from '@/config/server';
import { setAccessToken, setUserInfo } from '@/utils/util';
import {regular, validateOrder} from '@/components/tools/validate.js'
export default {
  data() {
    return {
      form_params: {
        company: '',
        username: '',
        login_account: '',
        mobile: '',
        code: '',
        password: '',
      },
      rules: {
        company: [
          { required: true, message: '请输入公司名称', trigger: 'blur' },
        ],
        username: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
        ],
        mobile: [
          { required: true, message: '请输入手机号' },
          { pattern: /^1[3456789]\d{9}$/, message: '请输入正确手机号' },
        ],
        code: [
          { required: true, message: '请输入验证码', trigger: 'blur' },
        ],
        password: [
          { required: true, message: '请输入密码', trigger: 'blur' },
        ],

      },
      send_button: '发送验证码',
      send_button_time: 120,
      time_loop: '',
      send_button_disable: false,
    };
  },
  computed: {},
  created() {
  },
  methods: {
    mobile_change() {
      this.form_params.login_account = this.form_params.mobile
    },
    send_code() {
      const _this = this
      if(!(/^1[3456789]\d{9}$/.test(this.form_params.mobile))){
        this.xx('请填写正确手机号码')
        return false;
      } else {
        _this.$http.post('v1/anchor/code',{mobile:_this.form_params.mobile}).then((resData) => {
          // if (resData.code === 0) {
          //
          // }
          _this.time_loop = setInterval(() => {
            if ( _this.send_button_time==0 ) {
              _this.send_button_time = 120
              _this.send_button = '发送验证码'
              _this.send_button_disable = false
              clearInterval(_this.time_loop)
            } else {
              _this.send_button_time--
              _this.send_button = _this.send_button_time + '秒'
              _this.send_button_disable = true
            }
          },1000)
        });
      }
    },
    onSubmit() {
      const _this = this
      this.$refs.ruleForm.validate((valid) => {
        if (valid) {
          _this.$http.post('v1/anchor/register',_this.form_params).then((resData) => {
            if (resData.code === 0) {
              _this.Ok('注册成功,即将跳转...')
              setTimeout(()=>{
                _this.$router.push('/passport/Login')
              },1000)
            }
          });
        }
      });
    },
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
