<template>
  <div class="content">
    <a-table :scroll="{x:1100,y:700}" class="mt10" :columns="columns" :dataSource="data"></a-table>
  </div>
</template>

<script>
const columns = [{}];
const data = [{}];
export default {
  data() {
    return {
      data,
      columns,
    };
  },
};
</script>

<style scoped>

</style>
