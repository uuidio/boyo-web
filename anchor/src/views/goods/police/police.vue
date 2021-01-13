<template>
    <div class="content">
      <a-form-item
        label="设置报警库存"
        :label-col="{ md: 4,xs:24 }"
        :wrapper-col="{ md: 6,xs:24}"
      >
        <a-input />
      </a-form-item>
      <a-form-item
        :wrapper-col="{offset:4, md: 6,xs:24}"
      >
        <a-button type="primary">保存</a-button>
      </a-form-item>
    </div>
</template>

<script>
    export default {
        name: "police"
    }
</script>

<style scoped>

</style>
