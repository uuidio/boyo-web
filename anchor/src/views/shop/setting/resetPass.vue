<template>
  <div class="content">
    <div>
      <!-- <a-button class="mr10" type="primary" @click="getExportList">高级导出</a-button> -->
    </div>
    <div class="mb20">
        <a-form
          ref="formLogin"
          :autoFormCreate="(form)=>{this.form = form}"
          id="formLogin"
        >
           <a-form-item
            fieldDecoratorId="old_password" class="input_style"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入原密码' }], validateTrigger: 'blur'}"
          >
            <a-input size="large" type="password" autocomplete="false" placeholder="原密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="password" class="input_style"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入新密码' }], validateTrigger: 'blur'}"
          >
            <a-input size="large" type="password" autocomplete="false" placeholder="新密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item
            fieldDecoratorId="password_confirmation" class="input_style"
            :fieldDecoratorOptions="{rules: [{ required: true, message: '请输入确认密码' }], validateTrigger: 'blur'}"
          >
            <a-input size="large" type="password" autocomplete="false" placeholder="确认密码">
              <a-icon slot="prefix" type="lock" :style="{ color: 'rgba(0,0,0,.25)' }"/>
            </a-input>
          </a-form-item>
          <a-form-item>
            <a-button
              class="btn_style ml10 mr10"
              type="primary"
              @click="handleSubmit"
              >确定修改</a-button
            >
          </a-form-item>
        </a-form>
    </div>
<!--    <div>-->
<!--      <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData" :pagination="false">-->
<!--        <div slot="action" slot-scope="text, record">-->
<!--          <a class="mr10" @click="goDetails(record)">订单详情</a>-->
<!--        </div>-->
<!--      </a-table>-->
<!--    </div>-->
  </div>
</template>

<script>
import { mapState, mapActions } from "vuex";
import http from '@/api/http';
import Server from '@/config/server';
import { USER_INFO } from '@/store/mutation-types';
import Cookies from "js-cookie";

export default {
  data() {
    return {
      loginBtn: false,
      formLogin: {
        username: '',
        old_password: '',
        password: '',
        password_confirmation: '',
        // rememberMe: true,
      },
    };
  },
  created() {
  },
  methods: {
    ...mapActions({
      memberlogout:'user/memberlogout'
    }),
    handleSubmit() {
      let flag = false;
      const that = this;
      this.form.validateFields(['old_password', 'password','password_confirmation'], { force: true }, (err, values) => {
        if (!err) {
          flag = true;
          that.formLogin.old_password = values.old_password;
          that.formLogin.password = values.password;
          that.formLogin.password_confirmation = values.password_confirmation;
        }
      });
      if (!flag) return;
      const info = JSON.parse(Cookies.get(USER_INFO))
      that.formLogin.username = info.username;

      http.post(Server.action.resetPass, that.formLogin)
        .then((resData) => {
          if (resData.code === 0) {
            that.memberlogout()
          }
        });
    },
  },
};
</script>
<style scoped lang="stylus">
.input_style {
  width 20rem
}
.btn_style {
  width 8rem
}
</style>