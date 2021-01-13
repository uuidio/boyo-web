<template>
    <div class="content">
      <a-form>
        <a-form-item
          label="用户名："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="设置密码："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="确认密码："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="联系姓名："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="联系手机："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="联系邮箱："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-input type="text" />
        </a-form-item>
        <a-form-item
          label="选择角色："
          :label-col="{ md: 4,xs:24 }"
          :wrapper-col="{ md: 6,xs:24 }"
        >
          <a-radio>子账号</a-radio>
        </a-form-item>
        <a-form-item
          :wrapper-col="{ md: 6,xs:24,offset:4 }"
        >
          <a-button  type="primary">保存</a-button>
        </a-form-item>
      </a-form>
    </div>
</template>

<script>
    export default {
        name: "add"
    }
</script>

<style scoped>

</style>
