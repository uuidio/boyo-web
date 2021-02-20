<template>
  <div class="user-wrapper">
    <!--<span class="action">-->
      <!--<a-icon type="question-circle-o"></a-icon>-->
    <!--</span>-->
    <!--<header-notice class="action"/>-->
    <span v-if="shopname">门店：{{shopname}}  </span>
    <a-dropdown>
      <span class="action ant-dropdown-link user-dropdown-menu">
        <a-avatar class="avatar" size="small" icon="user"  />
        <span>您好，{{name}}</span>
      </span>
      <a-menu slot="overlay" class="user-dropdown-menu-wrapper">
<!--        <a-menu-item key="0">-->
<!--          <router-link :to="{ name: 'setting' }">-->
<!--            <a-icon type="user"/>-->
<!--            <span>门店设置</span>-->
<!--          </router-link>-->
<!--        </a-menu-item>-->
        <a-menu-item key="1">
            <a-icon type="setting"/>
            <span @click="register_logout()">修改密码</span>
        </a-menu-item>
        <!--<a-menu-item key="2" disabled>-->
          <!--<a-icon type="setting"/>-->
          <!--<span>测试</span>-->
        <!--</a-menu-item>-->
        <!--<a-menu-divider/>-->
        <a-menu-item key="3">
          <a href="javascript:;" @click="handleLogout">
            <a-icon type="logout"/>
            <span>退出登录</span>
          </a>
        </a-menu-item>
      </a-menu>
    </a-dropdown>
  </div>
</template>
<script>
import { USER_INFO } from '@/store/mutation-types';
import { mapActions } from 'vuex';
import Cookies from 'js-cookie';
import HeaderNotice from './HeaderNotice';

export default {
  name: 'UserMenu',
  components: {
    HeaderNotice,
  },
  mounted() {
    this.userInfo();
  },
  data() {
    return {
      name: '管理员',
      shopname: '',
    };
  },
  methods: {
    ...mapActions({
      memberlogout: 'user/memberlogout',
    }),
    userInfo() {
      const info = JSON.parse(Cookies.get(USER_INFO));
      this.name = info.username;
      if (info.shopname) {
        this.shopname = info.shopname;
      }
    },
    register_logout() {
      const that = this;

      this.$confirm({
        title: '提示',
        content: '真的要注销登录去修改密码吗 ?',
        onOk() {
          that.$router.push('/passport/reset_password');
          that.memberlogout();
          // return that.Logout({})
          //   .then(() => {
          //     window.location.reload();
          //   })
          //   .catch((err) => {
          //     that.$message.error({
          //       title: '错误',
          //       description: err.message,
          //     });
          //   });
        },
        onCancel() {
        },
      });
    },
    handleLogout() {
      const that = this;

      this.$confirm({
        title: '提示',
        content: '真的要注销登录吗 ?',
        onOk() {
          that.memberlogout();
          // return that.Logout({})
          //   .then(() => {
          //     window.location.reload();
          //   })
          //   .catch((err) => {
          //     that.$message.error({
          //       title: '错误',
          //       description: err.message,
          //     });
          //   });
        },
        onCancel() {
        },
      });
    },
  },
};
</script>
<style scoped>
</style>
