<template>
  <div class="content">
    <div>
      <a-table :scroll="{x:1100,y:700}" :columns="listField" :dataSource="listData">
        <div slot="action" slot-scope="text,record">
        </div>
      </a-table>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'lists',
  computed: {
    ...mapState({
      listData: state => state.trade.logistics,
      listField: state => state.trade.logisticsHead,
    }),
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions({
      fetchLists: 'trade/logisticsLists',
    }),
  },
  mounted() {
    this.fetchLists();
  },
};
</script>

<style scoped>

</style>
