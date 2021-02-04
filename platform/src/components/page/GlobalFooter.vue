<template>
  <div class="footer">
    <div class="copyright">
      @2020-至今 © 版权所有 广州播丫科技有限公司
    </div>
  </div>
</template>
<script>
export default {
  name: 'LayoutFooter',
  data() {
    return {};
  },
};
</script>
<style lang="stylus" scoped>
  .footer
    padding: 0 16px;
    margin: 48px 0 24px;
    text-align: center;
    .links
      margin-bottom: 8px;
      a
        color: rgba(0, 0, 0, .45);
        :hover
          color: rgba(0, 0, 0, .65);
        :not(:last-child)
          margin-right: 40px;

    .copyright
      color: rgba(0, 0, 0, .45);
      font-size: 14px;
</style>
